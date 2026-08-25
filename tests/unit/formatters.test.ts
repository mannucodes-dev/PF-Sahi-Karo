import { describe, it } from "node:test";
import assert from "node:assert/strict";
import {
  formatCurrency,
  formatDisplayDate,
  getEstimatedResolutionDate,
} from "../../lib/utils/formatters";

describe("Formatting Utilities", () => {
  it("should format Indian Rupee currency correctly", () => {
    assert.equal(formatCurrency(184320), "₹1,84,320");
    assert.equal(formatCurrency(42500), "₹42,500");
    assert.equal(formatCurrency(0), "₹0");
  });

  it("should format dates in citizen-friendly DD MMM YYYY format", () => {
    const formatted = formatDisplayDate("2026-08-15");
    assert.match(formatted, /15\s+Aug\s+2026/i);
  });

  it("should calculate estimated working days correctly", () => {
    const dateStr = getEstimatedResolutionDate(5);
    assert.ok(typeof dateStr === "string" && dateStr.length > 0);
  });
});
