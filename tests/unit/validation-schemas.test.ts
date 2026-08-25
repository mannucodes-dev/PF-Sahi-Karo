import { describe, it } from "node:test";
import assert from "node:assert/strict";
import { loginSchema } from "../../lib/validation/auth-schemas";
import { resubmissionSchema } from "../../lib/validation/claim-schemas";
import { documentUploadSchema } from "../../lib/validation/upload-schemas";

describe("Validation Schemas", () => {
  it("should validate a valid 12-digit UAN", () => {
    const valid = loginSchema.safeParse({
      uan: "100234567890",
      password: "password123",
    });
    assert.ok(valid.success);
  });

  it("should reject invalid UANs (less than 12 digits or letters)", () => {
    const invalidShort = loginSchema.safeParse({
      uan: "12345",
      password: "password123",
    });
    assert.ok(!invalidShort.success);

    const invalidAlpha = loginSchema.safeParse({
      uan: "10023456789A",
      password: "password123",
    });
    assert.ok(!invalidAlpha.success);
  });

  it("should require both confirmation checkboxes on resubmission", () => {
    const validResubmission = resubmissionSchema.safeParse({
      claimId: "c3000000-0000-0000-0000-000000000003",
      remarkCode: "NAME_MISMATCH",
      hasConfirmedProfileFix: true,
      hasConfirmedBankDetails: true,
      idempotencyKey: "idemp_test_123456789",
    });
    assert.ok(validResubmission.success);

    const unconfirmed = resubmissionSchema.safeParse({
      claimId: "c3000000-0000-0000-0000-000000000003",
      remarkCode: "NAME_MISMATCH",
      hasConfirmedProfileFix: false,
      hasConfirmedBankDetails: true,
      idempotencyKey: "idemp_test_123456789",
    });
    assert.ok(!unconfirmed.success);
  });

  it("should enforce file upload MIME types and size constraints", () => {
    const validUpload = documentUploadSchema.safeParse({
      filename: "aadhaar_rectification.pdf",
      contentType: "application/pdf",
      fileSize: 1024 * 500, // 500 KB
      documentType: "aadhaar_rectification",
    });
    assert.ok(validUpload.success);

    const invalidMime = documentUploadSchema.safeParse({
      filename: "malicious.exe",
      contentType: "application/x-msdownload",
      fileSize: 1024,
      documentType: "other",
    });
    assert.ok(!invalidMime.success);

    const oversized = documentUploadSchema.safeParse({
      filename: "large.pdf",
      contentType: "application/pdf",
      fileSize: 10 * 1024 * 1024, // 10 MB > 5MB limit
      documentType: "other",
    });
    assert.ok(!oversized.success);
  });
});
