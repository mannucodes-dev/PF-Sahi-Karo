import { describe, it } from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import path from "node:path";

describe("Row Level Security (RLS) Policy Audit", () => {
  const rlsMigrationPath = path.resolve(
    process.cwd(),
    "supabase/migrations/002_row_level_security.sql"
  );

  it("should exist and enable RLS on all citizen tables", () => {
    assert.ok(fs.existsSync(rlsMigrationPath), "002_row_level_security.sql must exist");
    const content = fs.readFileSync(rlsMigrationPath, "utf-8");

    const requiredTables = [
      "profiles",
      "claims",
      "claim_events",
      "resubmissions",
      "documents",
      "support_cases",
      "audit_events",
    ];

    for (const table of requiredTables) {
      const regex = new RegExp(`ALTER\\s+TABLE\\s+${table}\\s+ENABLE\\s+ROW\\s+LEVEL\\s+SECURITY`, "i");
      assert.ok(regex.test(content), `Table ${table} must have RLS explicitly enabled`);
    }
  });

  it("must NEVER contain permissive 'USING (true)' for private citizen tables", () => {
    const content = fs.readFileSync(rlsMigrationPath, "utf-8");

    const lines = content.split("\n");
    for (let i = 0; i < lines.length; i++) {
      const line = lines[i];
      if (line.includes("USING (true)") || line.includes("WITH CHECK (true)")) {
        // Only remark_codes may be public
        const isRemarkCodesPolicy = content.slice(Math.max(0, content.indexOf(line) - 200), content.indexOf(line)).includes("remark_codes");
        assert.ok(
          isRemarkCodesPolicy,
          `Permissive policy detected on line ${i + 1}: ${line}`
        );
      }
    }
  });
});
