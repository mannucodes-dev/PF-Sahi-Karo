import { createClient } from "../supabase/server";
import { Database, DocumentType, ScanStatus } from "../supabase/types";
import { ALLOWED_MIME_TYPES, MAX_FILE_SIZE_BYTES } from "../validation/upload-schemas";
import { logAuditEvent } from "../audit/audit-events";

export type DocumentRow = Database["public"]["Tables"]["documents"]["Row"];

export interface UploadRequestParams {
  profileId: string;
  resubmissionId?: string;
  documentType: DocumentType;
  originalFilename: string;
  contentType: string;
  fileSize: number;
  checksum: string;
}

export interface SignedUploadResponse {
  success: boolean;
  documentId?: string;
  uploadUrl?: string;
  storagePath?: string;
  error?: string;
}

/**
 * Validates document metadata and issues a signed upload path for private Supabase Storage.
 */
export async function createDocumentUploadSession(
  params: UploadRequestParams
): Promise<SignedUploadResponse> {
  // Enforce server-side MIME type verification
  if (!ALLOWED_MIME_TYPES.includes(params.contentType as (typeof ALLOWED_MIME_TYPES)[number])) {
    return {
      success: false,
      error: "Unsupported file type. Only PDF, JPG, and PNG documents are accepted.",
    };
  }

  // Enforce maximum file size
  if (params.fileSize <= 0 || params.fileSize > MAX_FILE_SIZE_BYTES) {
    return {
      success: false,
      error: "File size exceeds the 5MB limit.",
    };
  }

  // Sanitize filename
  const sanitizedName = params.originalFilename
    .replace(/[^a-zA-Z0-9_\-.]/g, "_")
    .slice(0, 100);
  const storagePath = `private/${params.profileId}/${Date.now()}_${sanitizedName}`;

  const supabase = await createClient();

  if (!supabase) {
    // In local demo mode
    return {
      success: true,
      documentId: `doc-${Date.now()}`,
      storagePath,
      uploadUrl: `/api/demo-upload-target?path=${encodeURIComponent(storagePath)}`,
    };
  }

  // Create signed upload URL in private storage bucket 'citizen-documents'
  const { data: uploadData, error: uploadError } = await supabase.storage
    .from("citizen-documents")
    .createSignedUploadUrl(storagePath);

  if (uploadError || !uploadData) {
    return {
      success: false,
      error: "Failed to generate secure upload session. Please retry.",
    };
  }

  // Persist document record with pending scan status
  const { data: docRecord, error: dbError } = await supabase
    .from("documents")
    .insert({
      profile_id: params.profileId,
      resubmission_id: params.resubmissionId || null,
      document_type: params.documentType,
      storage_path: storagePath,
      original_filename: sanitizedName,
      content_type: params.contentType,
      file_size: params.fileSize,
      checksum: params.checksum,
      scan_status: "pending" as ScanStatus,
      expires_at: new Date(Date.now() + 30 * 86400000).toISOString(),
    })
    .select()
    .single();

  if (dbError || !docRecord) {
    return {
      success: false,
      error: "Database error initializing document upload metadata.",
    };
  }

  await logAuditEvent({
    actorId: params.profileId,
    action: "DOCUMENT_UPLOAD_INITIATED",
    resourceType: "document",
    resourceId: docRecord.id,
    metadata: {
      filename: sanitizedName,
      fileSize: params.fileSize,
      contentType: params.contentType,
    },
  });

  return {
    success: true,
    documentId: docRecord.id,
    uploadUrl: uploadData.signedUrl,
    storagePath,
  };
}

/**
 * Generates a short-lived (5 minute) signed download URL for private documents.
 */
export async function getSignedDocumentDownloadUrl(
  documentId: string,
  profileId: string
): Promise<{ success: boolean; url?: string; error?: string }> {
  const supabase = await createClient();
  if (!supabase) {
    return { success: true, url: "#demo-document" };
  }

  const { data: doc } = await supabase
    .from("documents")
    .select("*")
    .eq("id", documentId)
    .eq("profile_id", profileId)
    .single();

  if (!doc) {
    return { success: false, error: "Document not found or unauthorized access." };
  }

  const { data: signed, error } = await supabase.storage
    .from("citizen-documents")
    .createSignedUrl(doc.storage_path, 300); // 300 seconds (5 minutes)

  if (error || !signed) {
    return { success: false, error: "Failed to generate secure download link." };
  }

  await logAuditEvent({
    actorId: profileId,
    action: "DOCUMENT_DOWNLOAD_ACCESSED",
    resourceType: "document",
    resourceId: documentId,
  });

  return { success: true, url: signed.signedUrl };
}
