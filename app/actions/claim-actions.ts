"use server";

import { requireUser } from "@/lib/auth/require-user";
import { resubmissionSchema } from "@/lib/validation/claim-schemas";
import { submitResubmission, SubmitResubmissionResult } from "@/lib/data/resubmissions";
import { getClaimById } from "@/lib/data/claims";

export interface ResubmitActionResult {
  success: boolean;
  referenceId?: string;
  estimatedReviewDate?: string;
  error?: string;
}

export async function submitClaimResubmissionAction(
  formData: FormData
): Promise<ResubmitActionResult> {
  const user = await requireUser();

  const claimId = formData.get("claimId") as string;
  const remarkCode = formData.get("remarkCode") as string;
  const hasConfirmedProfileFix = formData.get("hasConfirmedProfileFix") === "true";
  const hasConfirmedBankDetails = formData.get("hasConfirmedBankDetails") === "true";
  const notes = (formData.get("notes") as string) || undefined;
  const idempotencyKey = formData.get("idempotencyKey") as string;

  // Validate schema
  const parsed = resubmissionSchema.safeParse({
    claimId,
    remarkCode,
    hasConfirmedProfileFix,
    hasConfirmedBankDetails,
    notes,
    idempotencyKey,
  });

  if (!parsed.success) {
    const errorMsg = parsed.error.issues[0]?.message || "Validation failed on submitted fields";
    return { success: false, error: errorMsg };
  }

  // Verify claim ownership
  const claim = await getClaimById(claimId, user.id);
  if (!claim) {
    return {
      success: false,
      error: "Unauthorized: Claim does not belong to your verified profile or does not exist.",
    };
  }

  // Process resubmission through repository workflow
  const result: SubmitResubmissionResult = await submitResubmission({
    claimId: claim.id,
    profileId: user.id,
    maskedUan: user.masked_uan,
    remarkCode: parsed.data.remarkCode,
    idempotencyKey: parsed.data.idempotencyKey,
    notes: parsed.data.notes,
  });

  return result;
}
