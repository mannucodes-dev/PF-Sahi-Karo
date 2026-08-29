import { createClient } from "../supabase/server";
import { Database, ResubmissionStatus } from "../supabase/types";
import { epfoClient } from "../integrations/epfo-client";
import { logAuditEvent } from "../audit/audit-events";
import { createClaimEvent } from "./claim-events";
import { updateClaimStatus } from "./claims";

export type ResubmissionRow = Database["public"]["Tables"]["resubmissions"]["Row"];

export async function getResubmissionByClaimId(
  claimId: string,
  profileId: string
): Promise<ResubmissionRow | null> {
  const supabase = await createClient();
  if (!supabase) return null;

  const { data, error } = await supabase
    .from("resubmissions")
    .select("*")
    .eq("claim_id", claimId)
    .eq("profile_id", profileId)
    .order("created_at", { ascending: false })
    .limit(1)
    .single();

  if (error || !data) return null;
  return data;
}

export interface SubmitResubmissionParams {
  claimId: string;
  profileId: string;
  maskedUan: string;
  remarkCode: string;
  idempotencyKey: string;
  notes?: string;
  documentIds?: string[];
}

export interface SubmitResubmissionResult {
  success: boolean;
  referenceId?: string;
  estimatedReviewDate?: string;
  error?: string;
}

/**
 * Handles the complete verified resubmission workflow:
 * 1. Idempotency check
 * 2. Database insertion of resubmission record
 * 3. EPFO integration dispatch
 * 4. Claim status update to 'resubmitted'
 * 5. Claim event audit record creation
 */
export async function submitResubmission(
  params: SubmitResubmissionParams
): Promise<SubmitResubmissionResult> {
  const supabase = await createClient();

  const referenceId = `EPFO-RSUB-${Math.floor(100000 + Math.random() * 900000)}`;
  const estimatedDate = new Date(Date.now() + 15 * 86400000).toISOString().split("T")[0];

  if (!supabase) {
    // In local demo mode
    await logAuditEvent({
      action: "RESUBMISSION_SUBMITTED_DEMO",
      resourceType: "claim",
      resourceId: params.claimId,
      metadata: {
        idempotencyKey: params.idempotencyKey,
        referenceId,
      },
    });

    return {
      success: true,
      referenceId,
      estimatedReviewDate: estimatedDate,
    };
  }

  // 1. Check idempotency
  const { data: existing } = await supabase
    .from("resubmissions")
    .select("*")
    .eq("idempotency_key", params.idempotencyKey)
    .single();

  if (existing) {
    return {
      success: true,
      referenceId: existing.external_reference || referenceId,
      estimatedReviewDate: estimatedDate,
    };
  }

  // 2. Dispatch to EPFO client adapter
  const epfoResult = await epfoClient.submitRectifiedClaim({
    resubmissionId: params.idempotencyKey,
    claimId: params.claimId,
    maskedUan: params.maskedUan,
    rectificationType: params.remarkCode,
    documentChecksums: [],
  });

  if (!epfoResult.success) {
    return {
      success: false,
      error: epfoResult.errorMessage || "EPFO gateway communication failed. Please try again.",
    };
  }

  const finalReference = epfoResult.acknowledgementNumber || referenceId;

  // 3. Persist resubmission record
  const { error: insertError } = await supabase.from("resubmissions").insert({
    claim_id: params.claimId,
    profile_id: params.profileId,
    status: "submitted" as ResubmissionStatus,
    idempotency_key: params.idempotencyKey,
    external_reference: finalReference,
    submitted_at: new Date().toISOString(),
    notes: params.notes || null,
  });

  if (insertError) {
    return {
      success: false,
      error: "Failed to persist resubmission record. Please contact support.",
    };
  }

  // 4. Update claim status to 'resubmitted'
  const statusUpdated = await updateClaimStatus(
    params.claimId,
    params.profileId,
    "resubmitted"
  );

  if (!statusUpdated) {
    return {
      success: false,
      error: "Unable to update the claim status securely.",
    };
  }

  // 5. Record claim event
  await createClaimEvent({
    claimId: params.claimId,
    eventType: "CLAIM_RESUBMITTED",
    statusFrom: "rejected",
    statusTo: "resubmitted",
    publicMessage: `Rectification submitted with reference ${finalReference}. Review in progress.`,
    source: "PF_SAHI_KARO_ASSISTANT",
  });

  // 6. Audit event
  await logAuditEvent({
    action: "CLAIM_RESUBMITTED",
    resourceType: "claim",
    resourceId: params.claimId,
    metadata: {
      referenceId: finalReference,
      remarkCode: params.remarkCode,
    },
  });

  return {
    success: true,
    referenceId: finalReference,
    estimatedReviewDate: epfoResult.estimatedReviewDate || estimatedDate,
  };
}
