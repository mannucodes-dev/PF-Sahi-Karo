// Mock Data & Type Definitions for PF Sahi Karo
// Source of truth: DATA-SCHEMA.md

export interface User {
  id: string;
  full_name: string;
  uan: string;
  pf_balance: number;
  bank_account_last4: string;
}

export type ClaimType =
  | "Final PF Settlement"
  | "PF Transfer"
  | "Form 10C - Pension Withdrawal";

export type ClaimStatus = "approved" | "pending" | "rejected";

export type RemarkCodeKey =
  | "NAME_MISMATCH"
  | "KYC_INCOMPLETE"
  | "BANK_MISMATCH"
  | "SERVICE_PERIOD"
  | "UAN_AADHAAR_UNLINKED";

export interface RemarkCode {
  code: RemarkCodeKey;
  raw_remark: string;
  plain_explanation: string;
  fix_steps: string[];
}

export interface Claim {
  id: string;
  user_id: string;
  claim_type: ClaimType;
  amount: number;
  status: ClaimStatus;
  submitted_date: string;
  settled_date?: string | null;
  remark_code?: RemarkCodeKey | null;
}

// 1. Remark Codes Dictionary (Exact copy from DATA-SCHEMA.md)
export const MOCK_REMARK_CODES: Record<RemarkCodeKey, RemarkCode> = {
  NAME_MISMATCH: {
    code: "NAME_MISMATCH",
    raw_remark:
      "Claim Rejected - Name as per Aadhaar does not match EPFO records. Refer Circular No. HO/Compliance/2023.",
    plain_explanation:
      "Your name doesn't match exactly between your Aadhaar and your EPFO records — even a small spelling difference (like 'Mohd' vs 'Mohammad') is enough to trigger this. EPFO's system checks for an exact character match, not just a close one.",
    fix_steps: [
      "Check your name exactly as it appears on your Aadhaar card.",
      "Compare it to the name on your EPFO UAN profile (Member Sewa portal, under 'Manage' → 'Modify Basic Details').",
      "Update whichever one is wrong to match the other exactly, including spacing and initials.",
      "Resubmit your claim once the update is confirmed — this usually takes 2-3 working days to reflect.",
    ],
  },
  KYC_INCOMPLETE: {
    code: "KYC_INCOMPLETE",
    raw_remark:
      "Claim Returned - KYC not verified. Digital signature pending from employer.",
    plain_explanation:
      "Your KYC documents (Aadhaar, PAN, or bank details) haven't been digitally verified and approved by your employer yet — EPFO won't process a claim until that verification is complete on their end, not yours.",
    fix_steps: [
      "Log in to the Member Sewa portal and check your KYC status under 'Manage' → 'KYC.'",
      "If it shows 'Pending Employer Approval,' contact your (former) employer's HR/PF desk directly — this step can't be done from your side.",
      "Once your employer approves it digitally, resubmit your claim.",
    ],
  },
  BANK_MISMATCH: {
    code: "BANK_MISMATCH",
    raw_remark:
      "Claim Returned - NEFT failed. Bank account details invalid or account inactive.",
    plain_explanation:
      "The bank account linked to your claim couldn't accept the transfer — usually because the account number or IFSC code doesn't match your KYC-verified bank record, or the account has gone inactive.",
    fix_steps: [
      "Verify your bank account is active and matches the details on your EPFO KYC exactly.",
      "If details are outdated, update your bank details under 'Manage' → 'KYC' and wait for employer approval.",
      "Resubmit the claim once your bank details show as verified.",
    ],
  },
  SERVICE_PERIOD: {
    code: "SERVICE_PERIOD",
    raw_remark:
      "Claim Rejected - Minimum service period not met as per records.",
    plain_explanation:
      "EPFO's records show a shorter employment duration than what's needed for this type of claim — often because a previous employer didn't update your exit date, making your service period look shorter than it actually was.",
    fix_steps: [
      "Check your Service History under 'View' → 'Service History' on the Member Sewa portal.",
      "If a previous employer's exit date is missing or wrong, request them to update it via the EPFO employer portal.",
      "Once corrected, your eligibility recalculates automatically — resubmit after that reflects.",
    ],
  },
  UAN_AADHAAR_UNLINKED: {
    code: "UAN_AADHAAR_UNLINKED",
    raw_remark: "Claim Rejected - UAN not seeded with Aadhaar.",
    plain_explanation:
      "Your UAN (Universal Account Number) isn't linked to your Aadhaar yet. This linkage is mandatory for any online claim — without it, the system can't verify your identity to release funds.",
    fix_steps: [
      "Go to the UAN Member Portal → 'Manage' → 'Link UAN-Aadhaar.'",
      "Complete the OTP-based Aadhaar verification.",
      "Resubmit your claim once the link is confirmed (usually instant to a few hours).",
    ],
  },
};

// 2. Mock User: Suresh Kumar
export const MOCK_USER: User = {
  id: "a0eebc99-9c0b-4ef8-bb6d-6bb9bd380a11",
  full_name: "Suresh Kumar",
  uan: "100234567890",
  pf_balance: 184320,
  bank_account_last4: "4821",
};

// 3. Helper to generate realistic dates relative to today
const getRelativeDateString = (daysAgo: number): string => {
  const d = new Date();
  d.setDate(d.getDate() - daysAgo);
  return d.toISOString().split("T")[0];
};

// 4. Mock Claims (3 claims shown on dashboard)
export const MOCK_CLAIMS: Claim[] = [
  {
    id: "c1000000-0000-0000-0000-000000000001",
    user_id: "a0eebc99-9c0b-4ef8-bb6d-6bb9bd380a11",
    claim_type: "PF Transfer",
    amount: 42500,
    status: "approved",
    submitted_date: getRelativeDateString(40),
    settled_date: getRelativeDateString(25),
    remark_code: null,
  },
  {
    id: "c2000000-0000-0000-0000-000000000002",
    user_id: "a0eebc99-9c0b-4ef8-bb6d-6bb9bd380a11",
    claim_type: "Final PF Settlement",
    amount: 184320,
    status: "pending",
    submitted_date: getRelativeDateString(10),
    settled_date: null,
    remark_code: null,
  },
  {
    id: "c3000000-0000-0000-0000-000000000003",
    user_id: "a0eebc99-9c0b-4ef8-bb6d-6bb9bd380a11",
    claim_type: "Final PF Settlement",
    amount: 184320,
    status: "rejected",
    submitted_date: getRelativeDateString(20),
    settled_date: null,
    remark_code: "NAME_MISMATCH",
  },
];
