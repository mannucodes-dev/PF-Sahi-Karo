// Rejection Reason Decoder Engine for PF Sahi Karo
// Deterministic TypeScript rules lookup per TECH-STACK.md and DATA-SCHEMA.md

import {
  MOCK_REMARK_CODES,
  RemarkCode,
  RemarkCodeKey,
} from "./mock-data";

/**
 * Looks up the plain-English decode, raw remark, and action steps for a given remark code.
 * Deterministic lookup - zero external API latency, 100% reliable for demo/judging.
 */
export function getDecoderResult(
  code: string | null | undefined
): RemarkCode | null {
  if (!code) return null;

  const normalizedCode = code.trim().toUpperCase() as RemarkCodeKey;

  if (normalizedCode in MOCK_REMARK_CODES) {
    return MOCK_REMARK_CODES[normalizedCode];
  }

  // Fallback if an unknown code is encountered
  return {
    code: normalizedCode,
    raw_remark: `Claim Rejected/Returned - Remark code: ${code}`,
    plain_explanation:
      "EPFO returned or rejected this claim due to a documentation or verification discrepancy. Review your Member Sewa portal records to inspect the specific remark details.",
    fix_steps: [
      "Log in to the EPFO Member Sewa portal with your UAN and password.",
      "Check the 'Track Claim Status' section under 'Online Services' to view complete remarks.",
      "Rectify any discrepancies noted in your profile details or contact your employer if approval is pending.",
      "Resubmit your claim once the profile data is verified.",
    ],
  };
}

/**
 * Returns all available remark code definitions (for decoder dictionary / reference).
 */
export function getAllDecoderRules(): RemarkCode[] {
  return Object.values(MOCK_REMARK_CODES);
}
