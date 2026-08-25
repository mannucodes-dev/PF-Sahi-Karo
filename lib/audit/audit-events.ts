import { createAdminClient } from "../supabase/admin";
import { createClient } from "../supabase/server";
import { redactPii } from "../utils/masking";
import { Json } from "../supabase/types";

export interface AuditEventParams {
  actorId?: string | null;
  action: string;
  resourceType: string;
  resourceId: string;
  metadata?: Record<string, unknown>;
  ipAddress?: string;
}

/**
 * Records an immutable audit log event with automatic PII redaction.
 */
export async function logAuditEvent(params: AuditEventParams): Promise<void> {
  const redacted = (params.metadata ? redactPii(params.metadata) : {}) as Json;

  // Try server client first; fallback to admin client
  const serverClient = await createClient();
  if (serverClient) {
    try {
      await serverClient.from("audit_events").insert({
        actor_id: params.actorId || null,
        action: params.action,
        resource_type: params.resourceType,
        resource_id: params.resourceId,
        redacted_metadata: redacted,
        ip_address: params.ipAddress || null,
      });
      return;
    } catch {
      // Fall through to admin client if RLS or context requires
    }
  }

  const adminClient = createAdminClient();
  if (adminClient) {
    try {
      await adminClient.from("audit_events").insert({
        actor_id: params.actorId || null,
        action: params.action,
        resource_type: params.resourceType,
        resource_id: params.resourceId,
        redacted_metadata: redacted,
        ip_address: params.ipAddress || null,
      });
    } catch (err) {
      console.error("[AuditLog] Failed to persist audit event:", err);
    }
  } else {
    // In local development without Supabase connected, log safely to console with redacted metadata
    if (process.env.NODE_ENV !== "production") {
      console.info(`[AuditLog:DEMO] ${params.action} on ${params.resourceType}:${params.resourceId}`, redacted);
    }
  }
}
