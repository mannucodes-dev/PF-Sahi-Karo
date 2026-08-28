"use client";

import React from "react";
import Link from "next/link";
import { Card, CardContent } from "@/components/ui/card";
import { buttonVariants } from "@/components/ui/button";
import { ClaimRow } from "@/lib/data/claims";
import { StatusBadge } from "./status-badge";
import { ArrowRight, AlertTriangle } from "lucide-react";
import { cn, formatDisplayDate, formatCurrency } from "@/lib/utils";
import { useTranslation } from "@/lib/i18n/context";

interface ClaimCardProps {
  claim: ClaimRow;
}

export function ClaimCard({ claim }: ClaimCardProps) {
  const { t } = useTranslation();
  const isRejected = claim.status === "rejected";

  return (
    <div
      className={cn(
        "glass-card rounded-2xl p-5 sm:p-6 transition-all duration-200 overflow-hidden relative shadow-xs flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4",
        isRejected
          ? "border-l-4 border-l-alert-crimson bg-error-container/10 hover:border-alert-crimson/80"
          : "hover:border-primary/40"
      )}
    >
      <div className="space-y-2 max-w-lg w-full sm:w-auto">
        <div className="flex flex-wrap items-center gap-2.5">
          <h3 className="font-extrabold text-base sm:text-lg text-on-surface tracking-tight">
            {claim.claim_type}
          </h3>
          <StatusBadge status={claim.status} />
        </div>

        <div className="text-xs sm:text-sm text-on-surface-variant flex flex-wrap items-center gap-x-2.5 gap-y-1">
          <span>
            {t.common.submittedDate}:{" "}
            <strong className="text-on-surface font-medium">
              {formatDisplayDate(claim.submitted_at)}
            </strong>
          </span>
          {claim.settled_at && (
            <>
              <span className="text-outline-variant" aria-hidden="true">•</span>
              <span className="text-success-emerald font-semibold">
                {t.common.settledDate}: {formatDisplayDate(claim.settled_at)}
              </span>
            </>
          )}
          {isRejected && (
            <>
              <span className="text-outline-variant" aria-hidden="true">•</span>
              <span className="text-alert-crimson font-bold flex items-center gap-1">
                <span className="material-symbols-outlined text-[16px]">warning</span>
                {t.common.actionRequired}
              </span>
            </>
          )}
        </div>
      </div>

      <div className="flex items-center justify-between sm:justify-end w-full sm:w-auto gap-5 pt-3 sm:pt-0 border-t sm:border-t-0 border-outline-variant/30">
        <div className="text-left sm:text-right shrink-0">
          <div className="text-[11px] uppercase tracking-wider text-on-surface-variant font-bold">
            {t.common.claimAmount}
          </div>
          <div className="font-extrabold font-data-mono text-on-surface text-base sm:text-xl flex items-center sm:justify-end">
            {formatCurrency(claim.amount)}
          </div>
        </div>

        <Link
          href={`/claims/${claim.id}`}
          className={cn(
            "min-h-[44px] shrink-0 transition-transform active:scale-[0.98] flex items-center gap-1.5 text-xs sm:text-sm font-bold rounded-xl px-5 cursor-pointer shadow-xs",
            isRejected
              ? "bg-alert-crimson hover:bg-rose-700 text-white"
              : "bg-surface-container-high hover:bg-surface-container-highest text-on-surface border border-outline-variant/40"
          )}
          aria-label={`${isRejected ? t.common.seeWhy : t.common.viewDetails} for ${claim.claim_type}`}
        >
          {isRejected ? (
            <>
              <span>{t.common.seeWhy}</span>
              <span className="material-symbols-outlined text-[16px]">arrow_forward</span>
            </>
          ) : (
            <span>{t.common.viewDetails}</span>
          )}
        </Link>
      </div>
    </div>
  );
}
