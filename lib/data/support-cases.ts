import { createClient } from "../supabase/server";
import { Database, SupportCategory, SupportStatus } from "../supabase/types";
import { logAuditEvent } from "../audit/audit-events";

export type SupportCaseRow = Database["public"]["Tables"]["support_cases"]["Row"];

export async function createSupportCase(params: {
  profileId: string;
  claimId?: string;
  category: SupportCategory;
  description: string;
}): Promise<{ success: boolean; caseId?: string; error?: string }> {
  const supabase = await createClient();

  if (!supabase) {
    const caseId = `case-${Date.now()}`;
    await logAuditEvent({
      actorId: params.profileId,
      action: "SUPPORT_CASE_CREATED_DEMO",
      resourceType: "support_case",
      resourceId: caseId,
      metadata: { category: params.category },
    });
    return { success: true, caseId };
  }

  const { data, error } = await supabase
    .from("support_cases")
    .insert({
      profile_id: params.profileId,
      claim_id: params.claimId || null,
      category: params.category,
      description: params.description,
      status: "open" as SupportStatus,
    })
    .select()
    .single();

  if (error || !data) {
    return {
      success: false,
      error: "Failed to submit support case. Please retry or contact helpline directly.",
    };
  }

  await logAuditEvent({
    actorId: params.profileId,
    action: "SUPPORT_CASE_CREATED",
    resourceType: "support_case",
    resourceId: data.id,
    metadata: { category: params.category },
  });

  return { success: true, caseId: data.id };
}

export async function getSupportCasesByProfileId(profileId: string): Promise<SupportCaseRow[]> {
  const supabase = await createClient();
  if (!supabase) return [];

  const { data, error } = await supabase
    .from("support_cases")
    .select("*")
    .eq("profile_id", profileId)
    .order("created_at", { ascending: false });

  if (error || !data) return [];
  return data;
}
