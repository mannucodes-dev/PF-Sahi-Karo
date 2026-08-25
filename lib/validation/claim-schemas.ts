import { z } from "zod";

export const resubmissionSchema = z.object({
  claimId: z.string().min(5, { message: "Invalid claim identifier" }),
  remarkCode: z.string().min(1, { message: "Remark code is required" }),
  hasConfirmedProfileFix: z.literal(true, {
    message: "You must confirm you verified and rectified your details on the Member Sewa portal",
  }),
  hasConfirmedBankDetails: z.literal(true, {
    message: "You must confirm that your bank account is active and verified",
  }),
  notes: z.string().max(500, { message: "Notes must not exceed 500 characters" }).optional(),
  idempotencyKey: z.string().min(10, { message: "Idempotency key missing" }),
  documentId: z.string().min(5).optional(),
});

export const supportCaseSchema = z.object({
  claimId: z.string().min(5).optional(),
  category: z.enum([
    "claim_rejection",
    "kyc_issue",
    "portal_error",
    "employer_delay",
    "accessibility_feedback",
    "general_query",
  ]),
  description: z
    .string()
    .min(10, { message: "Please provide at least 10 characters describing your issue" })
    .max(1000, { message: "Description must not exceed 1000 characters" }),
});

export type ResubmissionInput = z.infer<typeof resubmissionSchema>;
export type SupportCaseInput = z.infer<typeof supportCaseSchema>;
