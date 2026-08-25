/**
 * PII Masking Utilities for PF Sahi Karo
 * Compliant with Indian Data Protection (DPDP) and Aadhaar security guidelines.
 */

/**
 * Masks a 12-digit UAN, displaying only the last 4 digits.
 * Example: '100234567890' -> '••••••••7890'
 */
export function maskUan(uan?: string | null): string {
  if (!uan) return "••••••••••••";
  const cleaned = uan.replace(/\s+/g, "");
  if (cleaned.length < 4) return "••••••••••••";
  const last4 = cleaned.slice(-4);
  return `••••••••${last4}`;
}

/**
 * Masks a bank account number, displaying only the last 4 digits.
 * Example: '12345678904821' -> '••••4821'
 */
export function maskBankAccount(account?: string | null): string {
  if (!account) return "••••••••";
  const cleaned = account.replace(/\s+/g, "");
  if (cleaned.length < 4) return "••••••••";
  const last4 = cleaned.slice(-4);
  return `••••${last4}`;
}

/**
 * Masks an Aadhaar number, strictly showing only the last 4 digits.
 * Under no circumstances may a full 12-digit Aadhaar be displayed or stored.
 * Example: '123456789012' -> '•••• •••• 9012'
 */
export function maskAadhaar(aadhaar?: string | null): string {
  if (!aadhaar) return "•••• •••• ••••";
  const cleaned = aadhaar.replace(/\s+/g, "");
  if (cleaned.length < 4) return "•••• •••• ••••";
  const last4 = cleaned.slice(-4);
  return `•••• •••• ${last4}`;
}

/**
 * Redacts common sensitive PII fields from object dictionaries before logging or audit storage.
 */
export function redactPii(obj: Record<string, unknown>): Record<string, unknown> {
  const SENSITIVE_KEYS = [
    "aadhaar",
    "uan",
    "password",
    "pin",
    "bank_account",
    "account_number",
    "ifsc",
    "mobile",
    "phone",
    "email",
    "token",
    "secret",
    "key",
  ];

  const redacted: Record<string, unknown> = {};

  for (const [key, value] of Object.entries(obj)) {
    const lowerKey = key.toLowerCase();
    const isSensitive = SENSITIVE_KEYS.some((sensitive) => lowerKey.includes(sensitive));

    if (isSensitive) {
      if (typeof value === "string") {
        redacted[key] = value.length >= 4 ? `••••${value.slice(-4)}` : "[REDACTED]";
      } else {
        redacted[key] = "[REDACTED]";
      }
    } else if (typeof value === "object" && value !== null && !Array.isArray(value)) {
      redacted[key] = redactPii(value as Record<string, unknown>);
    } else {
      redacted[key] = value;
    }
  }

  return redacted;
}
