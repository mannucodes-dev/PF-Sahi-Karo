"use server";

import { createSupportCase } from "@/lib/data/support-cases";
import { supportCaseSchema } from "@/lib/validation/claim-schemas";
import { SupportCategory } from "@/lib/supabase/types";

export interface SupportActionResult {
  success: boolean;
  caseId?: string;
  error?: string;
}

export async function submitSupportCaseAction(
  category: SupportCategory,
  description: string,
  claimId?: string
): Promise<SupportActionResult> {
  const parsed = supportCaseSchema.safeParse({
    category,
    description,
    claimId,
  });

  if (!parsed.success) {
    const errorMsg = parsed.error.issues[0]?.message || "Invalid support inquiry parameters";
    return { success: false, error: errorMsg };
  }

  return await createSupportCase({
    profileId: "public-citizen-inquiry",
    category: parsed.data.category,
    description: parsed.data.description,
    claimId: parsed.data.claimId,
  });
}
