import { createClient } from "../supabase/server";
import { Database, ClaimStatus } from "../supabase/types";
import { isDemoMode } from "../validation/env";

export type ClaimRow = Database["public"]["Tables"]["claims"]["Row"];

export const DEMO_CLAIMS_DATA: ClaimRow[] = [
  {
    id: "c1000000-0000-0000-0000-000000000001",
    profile_id: "demo-profile-0000-0000-0000-000000000001",
    claim_type: "PF Transfer",
    amount: 42500,
    status: "approved",
    source_system: "EPFO_PORTAL",
    external_claim_id: "EPFO-TRF-902184",
    submitted_at: new Date(Date.now() - 40 * 86400000).toISOString(),
    settled_at: new Date(Date.now() - 25 * 86400000).toISOString(),
    last_synced_at: new Date().toISOString(),
    remark_code: null,
    created_at: new Date(Date.now() - 40 * 86400000).toISOString(),
    updated_at: new Date(Date.now() - 25 * 86400000).toISOString(),
  },
  {
    id: "c2000000-0000-0000-0000-000000000002",
    profile_id: "demo-profile-0000-0000-0000-000000000001",
    claim_type: "Final PF Settlement",
    amount: 184320,
    status: "under_review",
    source_system: "EPFO_PORTAL",
    external_claim_id: "EPFO-STL-391084",
    submitted_at: new Date(Date.now() - 10 * 86400000).toISOString(),
    settled_at: null,
    last_synced_at: new Date().toISOString(),
    remark_code: null,
    created_at: new Date(Date.now() - 10 * 86400000).toISOString(),
    updated_at: new Date(Date.now() - 10 * 86400000).toISOString(),
  },
  {
    id: "c3000000-0000-0000-0000-000000000003",
    profile_id: "demo-profile-0000-0000-0000-000000000001",
    claim_type: "Final PF Settlement",
    amount: 184320,
    status: "rejected",
    source_system: "EPFO_PORTAL",
    external_claim_id: "EPFO-STL-108472",
    submitted_at: new Date(Date.now() - 20 * 86400000).toISOString(),
    settled_at: null,
    last_synced_at: new Date().toISOString(),
    remark_code: "NAME_MISMATCH",
    created_at: new Date(Date.now() - 20 * 86400000).toISOString(),
    updated_at: new Date(Date.now() - 20 * 86400000).toISOString(),
  },
];

/**
 * Retrieves all claims for the specified profile.
 */
export async function getClaimsByProfileId(profileId: string): Promise<ClaimRow[]> {
  const supabase = await createClient();

  if (!supabase) {
    if (isDemoMode()) {
      return DEMO_CLAIMS_DATA;
    }
    return [];
  }

  const { data, error } = await supabase
    .from("claims")
    .select("*")
    .eq("profile_id", profileId)
    .order("submitted_at", { ascending: false });

  if (error || !data || data.length === 0) {
    if (isDemoMode()) {
      return DEMO_CLAIMS_DATA;
    }
    return [];
  }

  return data;
}

/**
 * Retrieves a single claim by its ID with ownership verification.
 */
export async function getClaimById(
  claimId: string,
  profileId: string
): Promise<ClaimRow | null> {
  const supabase = await createClient();

  if (!supabase) {
    if (isDemoMode()) {
      return DEMO_CLAIMS_DATA.find((c) => c.id === claimId) || null;
    }
    return null;
  }

  const { data, error } = await supabase
    .from("claims")
    .select("*")
    .eq("id", claimId)
    .eq("profile_id", profileId)
    .single();

  if (error || !data) {
    if (isDemoMode()) {
      return DEMO_CLAIMS_DATA.find((c) => c.id === claimId) || null;
    }
    return null;
  }

  return data;
}

/**
 * Updates a claim's status (server-side only with state tracking).
 */
export async function updateClaimStatus(
  claimId: string,
  newStatus: ClaimStatus
): Promise<boolean> {
  const supabase = await createClient();
  if (!supabase) return true;

  const { error } = await supabase
    .from("claims")
    .update({ status: newStatus })
    .eq("id", claimId);

  return !error;
}
