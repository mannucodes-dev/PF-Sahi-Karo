"use client";

import React, { useState } from "react";
import Link from "next/link";
import { getDecoderResult, RemarkCodeRow } from "@/lib/decoder-rules";
import { DecoderPanel } from "@/components/decoder-panel";
import { Card } from "@/components/ui/card";
import { buttonVariants } from "@/components/ui/button";
import { ArrowRight, Layers, Sparkles } from "lucide-react";
import { cn } from "@/lib/utils";

interface RejectionScenarioViewProps {
  claimId: string;
  defaultCode: string;
}

const SCENARIOS = [
  { code: "NAME_MISMATCH", label: "Aadhaar Name Mismatch", short: "Name Mismatch" },
  { code: "KYC_INCOMPLETE", label: "KYC Pending Employer Digital Signature", short: "KYC Incomplete" },
  { code: "BANK_MISMATCH", label: "NEFT Failed / Bank Inactive", short: "Bank Mismatch" },
  { code: "SERVICE_PERIOD", label: "Service Period Discrepancy", short: "Service Period" },
  { code: "UAN_AADHAAR_UNLINKED", label: "UAN-Aadhaar Linkage Missing", short: "UAN-Aadhaar" },
];

export function RejectionScenarioView({
  claimId,
  defaultCode,
}: RejectionScenarioViewProps) {
  const [selectedCode, setSelectedCode] = useState<string>(defaultCode);
  const activeRemark: RemarkCodeRow =
    getDecoderResult(selectedCode) || (getDecoderResult("NAME_MISMATCH") as RemarkCodeRow);

  const isDemo =
    process.env.NODE_ENV !== "production" &&
    process.env.NEXT_PUBLIC_DEMO_MODE === "true";

  return (
    <div className="space-y-6">
      {/* Evaluator Scenario Switcher (Protected behind Demo Mode flag) */}
      {isDemo && (
        <div className="bg-slate-100/90 border border-slate-200 rounded-xl p-3.5 sm:p-4 space-y-2.5 shadow-2xs">
          <div className="flex flex-wrap items-center justify-between gap-2">
            <div className="flex items-center gap-1.5 text-xs font-bold text-zinc-700">
              <Layers className="w-3.5 h-3.5 text-teal-700" aria-hidden="true" />
              <span>Development / Evaluator Tool: Switch Rejection Scenarios</span>
            </div>
            <span className="text-[11px] font-mono text-zinc-600 bg-white border border-slate-200 px-2 py-0.5 rounded">
              Active: {selectedCode}
            </span>
          </div>

          <div className="flex flex-wrap gap-1.5 pt-1" role="group" aria-label="Rejection scenarios">
            {SCENARIOS.map((scenario) => {
              const isSelected = selectedCode === scenario.code;
              return (
                <button
                  key={scenario.code}
                  type="button"
                  onClick={() => setSelectedCode(scenario.code)}
                  aria-pressed={isSelected}
                  className={cn(
                    "px-3 py-1.5 rounded-lg text-xs font-medium transition-all cursor-pointer select-none",
                    isSelected
                      ? "bg-teal-700 text-white shadow-xs font-semibold"
                      : "bg-white border border-slate-200 text-zinc-700 hover:bg-slate-50 hover:border-slate-300"
                  )}
                  title={scenario.label}
                >
                  {scenario.short}
                </button>
              );
            })}
          </div>
        </div>
      )}

      {/* Dynamic Decoder Panel */}
      <DecoderPanel remark={activeRemark} />

      {/* Action Bar / Primary CTA */}
      <Card className="border-teal-300 bg-gradient-to-r from-teal-50/90 via-teal-50/50 to-emerald-50/50 shadow-sm p-4 sm:p-6 rounded-xl">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="space-y-1 text-center sm:text-left">
            <h3 className="font-bold text-base sm:text-lg text-teal-950 flex items-center gap-2 justify-center sm:justify-start">
              <Sparkles className="w-4 h-4 text-teal-700" aria-hidden="true" />
              Ready to resolve this claim?
            </h3>
            <p className="text-xs sm:text-sm text-teal-800">
              Follow our step-by-step guided resubmission workflow to prepare a compliant claim.
            </p>
          </div>
          <Link
            href={`/claims/${claimId}/resubmit?code=${selectedCode}`}
            className={cn(
              buttonVariants({ size: "default" }),
              "w-full sm:w-auto bg-teal-700 hover:bg-teal-800 text-white font-semibold px-7 py-3 rounded-lg shadow-sm flex items-center justify-center gap-2 transition-transform active:scale-[0.98] text-sm cursor-pointer"
            )}
          >
            Start Guided Resubmission <ArrowRight className="w-4 h-4" aria-hidden="true" />
          </Link>
        </div>
      </Card>
    </div>
  );
}
