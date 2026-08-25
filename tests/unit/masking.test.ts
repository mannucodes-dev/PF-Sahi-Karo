import { describe, it } from "node:test";
import assert from "node:assert/strict";
import {
  maskUan,
  maskBankAccount,
  maskAadhaar,
  redactPii,
} from "../../lib/utils/masking";

describe("PII Masking Utilities", () => {
  it("should mask 12-digit UAN showing only the last 4 digits", () => {
    assert.equal(maskUan("100234567890"), "••••••••7890");
    assert.equal(maskUan(" 1002 3456 7890 "), "••••••••7890");
    assert.equal(maskUan(null), "••••••••••••");
    assert.equal(maskUan(""), "••••••••••••");
  });

  it("should mask bank account numbers showing only the last 4 digits", () => {
    assert.equal(maskBankAccount("12345678904821"), "••••4821");
    assert.equal(maskBankAccount("4821"), "••••4821");
    assert.equal(maskBankAccount(null), "••••••••");
  });

  it("should mask Aadhaar number and NEVER reveal more than 4 digits", () => {
    assert.equal(maskAadhaar("123456789012"), "•••• •••• 9012");
    assert.equal(maskAadhaar("1234 5678 9012"), "•••• •••• 9012");
    assert.equal(maskAadhaar(null), "•••• •••• ••••");
  });

  it("should redact sensitive fields from objects in logging pipelines", () => {
    const sensitive = {
      uan: "100234567890",
      full_name: "Suresh Kumar",
      password: "secret_password_123",
      account_number: "98765432104821",
      metadata: {
        pin: "1234",
        notes: "Verified",
      },
    };

    const redacted = redactPii(sensitive) as {
      uan: string;
      full_name: string;
      password: string;
      account_number: string;
      metadata: {
        pin: string;
        notes: string;
      };
    };

    assert.equal(redacted.uan, "••••7890");
    assert.equal(redacted.full_name, "Suresh Kumar");
    assert.equal(redacted.password, "••••_123");
    assert.equal(redacted.account_number, "••••4821");
    assert.equal(redacted.metadata.pin, "••••1234");
    assert.equal(redacted.metadata.notes, "Verified");
  });
});
