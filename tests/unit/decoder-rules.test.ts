import { describe, it } from "node:test";
import assert from "node:assert/strict";
import { getDecoderResult, getAllDecoderRules } from "../../lib/decoder-rules";

describe("Decoder Rules Engine", () => {
  it("should look up NAME_MISMATCH with full official references", () => {
    const result = getDecoderResult("NAME_MISMATCH");
    assert.ok(result);
    assert.equal(result.code, "NAME_MISMATCH");
    assert.ok(result.official_text.includes("Aadhaar"));
    assert.ok(result.plain_text.length > 20);
    assert.ok(result.fix_steps.length >= 3);
    assert.ok(result.source_url.startsWith("https://"));
    assert.ok(result.reviewed_by.length > 0);
  });

  it("should return Hindi translation when requested", () => {
    const result = getDecoderResult("NAME_MISMATCH", "hi");
    assert.ok(result);
    assert.equal(result.locale, "hi");
    assert.ok(result.official_text.includes("दावा"));
  });

  it("should provide a safe fallback for unrecognized rejection codes", () => {
    const result = getDecoderResult("CUSTOM_UNRECOGNIZED_CODE");
    assert.ok(result);
    assert.equal(result.code, "CUSTOM_UNRECOGNIZED_CODE");
    assert.ok(result.plain_text.includes("discrepancy"));
  });

  it("should return all decoder rules", () => {
    const allRules = getAllDecoderRules();
    assert.ok(allRules.length >= 5);
  });
});
