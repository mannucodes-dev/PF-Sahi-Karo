import { createClient } from "../supabase/server";
import { Database } from "../supabase/types";

export type ClaimEventRow = Database["public"]["Tables"]["claim_events"]["Row"];

export async function getEventsByClaimId(claimId: string): Promise<ClaimEventRow[]> {
  const supabase = await createClient();
  if (!supabase) {
    return [
      {
        id: "evt-001",
        claim_id: claimId,
        event_type: "CLAIM_SUBMITTED",
        status_from: null,
        status_to: "submitted",
        public_message: "Claim application received electronically via EPFO Portal.",
        source: "EPFO_PORTAL",
        occurred_at: new Date(Date.now() - 20 * 86400000).toISOString(),
      },
      {
        id: "evt-002",
        claim_id: claimId,
        event_type: "REJECTED_REMARK_RECORDED",
        status_from: "under_review",
        status_to: "rejected",
        public_message: "Field office recorded discrepancy remark: Name mismatch with Aadhaar.",
        source: "EPFO_FIELD_OFFICE",
        occurred_at: new Date(Date.now() - 5 * 86400000).toISOString(),
      },
    ];
  }

  const { data, error } = await supabase
    .from("claim_events")
    .select("*")
    .eq("claim_id", claimId)
    .order("occurred_at", { ascending: true });

  if (error || !data) return [];
  return data;
}

export async function createClaimEvent(params: {
  claimId: string;
  eventType: string;
  statusFrom?: string | null;
  statusTo: string;
  publicMessage: string;
  source?: string;
}): Promise<boolean> {
  const supabase = await createClient();
  if (!supabase) return true;

  const { error } = await supabase.from("claim_events").insert({
    claim_id: params.claimId,
    event_type: params.eventType,
    status_from: params.statusFrom || null,
    status_to: params.statusTo,
    public_message: params.publicMessage,
    source: params.source || "PF_SAHI_KARO_ASSISTANT",
  });

  return !error;
}
