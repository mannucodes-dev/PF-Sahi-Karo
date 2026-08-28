"use client";

import React, { useState } from "react";
import Link from "next/link";
import { getDecoderResult, RemarkCodeRow } from "@/lib/decoder-rules";
import { DecoderPanel } from "@/components/decoder-panel";
import { Card } from "@/components/ui/card";
import { buttonVariants } from "@/components/ui/button";
import { ArrowRight, Layers, Sparkles } from "lucide-react";
import { cn } from "@/lib/utils";
import { useTranslation } from "@/lib/i18n/context";

interface RejectionScenarioViewProps {
  claimId: string;
  defaultCode: string;
}

const SCENARIOS = [
  { code: "NAME_MISMATCH", label: "Aadhaar Name Mismatch", short: "Name Mismatch" },
  { code: "KYC_INCOMPLETE", label: "KYC Pending Employer Digital Signature", short: "KYC Pending" },
  { code: "BANK_MISMATCH", label: "NEFT Failed / Bank Inactive", short: "Bank Error" },
  { code: "SERVICE_PERIOD", label: "Service Period Discrepancy", short: "Date of Exit" },
  { code: "UAN_AADHAAR_UNLINKED", label: "UAN-Aadhaar Linkage Missing", short: "UAN-Aadhaar" },
];

export function RejectionScenarioView({
  claimId,
  defaultCode,
}: RejectionScenarioViewProps) {
  const { t } = useTranslation();
  const [selectedCode, setSelectedCode] = useState<string>(defaultCode);
  const activeRemark: RemarkCodeRow =
    getDecoderResult(selectedCode) || (getDecoderResult("NAME_MISMATCH") as RemarkCodeRow);

  return (
    <div className="space-y-6">
      {/* Evaluator Scenario Switcher */}
      <div className="glass-card rounded-2xl p-4 sm:p-5 space-y-3 shadow-2xs">
        <div className="flex flex-wrap items-center justify-between gap-2">
          <div className="flex items-center gap-2 text-xs font-bold text-on-surface">
            <span className="material-symbols-outlined text-[18px] text-primary">science</span>
            <span>Judge Evaluation Tool: Test Different Rejection Scenarios</span>
          </div>
          <span className="text-[11px] font-mono text-on-surface-variant bg-surface-container-high border border-outline-variant/40 px-2.5 py-0.5 rounded-md font-bold">
            Active: {selectedCode}
          </span>
        </div>

        <div className="flex flex-wrap gap-2 pt-1" role="group" aria-label="Rejection scenarios">
          {SCENARIOS.map((scenario) => {
            const isSelected = selectedCode === scenario.code;
            return (
              <button
                key={scenario.code}
                type="button"
                onClick={() => setSelectedCode(scenario.code)}
                aria-pressed={isSelected}
                className={cn(
                  "px-3.5 py-1.5 rounded-full text-xs font-semibold transition-all cursor-pointer select-none",
                  isSelected
                    ? "bg-primary text-on-primary shadow-xs font-bold"
                    : "bg-surface-container-highest text-on-surface-variant hover:bg-primary-container hover:text-on-primary-container"
                )}
                title={scenario.label}
              >
                {scenario.short}
              </button>
            );
          })}
        </div>
      </div>

      {/* Dynamic Decoder Panel */}
      <DecoderPanel remark={activeRemark} />

      {/* Action Bar / Primary CTA */}
      <div className="glass-card border-primary/30 rounded-2xl p-5 sm:p-6 shadow-xs">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="space-y-1 text-center sm:text-left">
            <h3 className="font-extrabold text-base sm:text-lg text-on-surface flex items-center gap-2 justify-center sm:justify-start">
              <span className="material-symbols-outlined text-[20px] text-primary">auto_fix_high</span>
              <span>{t.claimDetail.readyToResolve}</span>
            </h3>
            <p className="text-xs sm:text-sm text-on-surface-variant">
              {t.claimDetail.readySubtitle}
            </p>
          </div>
          <Link
            href={`/claims/${claimId}/resubmit?code=${selectedCode}`}
            className="w-full sm:w-auto bg-primary hover:bg-surface-tint text-on-primary font-bold px-8 py-3.5 rounded-xl shadow-xs flex items-center justify-center gap-2 transition-transform active:scale-[0.98] text-sm cursor-pointer min-h-[44px]"
          >
            <span>{t.claimDetail.startResubmitBtn}</span>
            <span className="material-symbols-outlined text-[18px]">arrow_forward</span>
          </Link>
        </div>
      </div>
    </div>
  );
}
