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
    <Card
      className={cn(
        "transition-all duration-200 overflow-hidden relative",
        isRejected
          ? "border-rose-400/80 bg-gradient-to-r from-rose-50/80 via-white to-white shadow-md ring-2 ring-rose-500/20 hover:border-rose-500"
          : "border-slate-200/90 bg-white hover:border-slate-300 shadow-2xs"
      )}
    >
      {isRejected && (
        <div className="absolute top-0 left-0 bottom-0 w-2 bg-rose-600" aria-hidden="true" />
      )}
      <CardContent className="p-5 sm:p-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div className="space-y-2 max-w-lg w-full sm:w-auto pl-1 sm:pl-2">
          <div className="flex flex-wrap items-center gap-2.5">
            <h3 className="font-extrabold text-base sm:text-lg text-zinc-900 tracking-tight">
              {claim.claim_type}
            </h3>
            <StatusBadge status={claim.status} />
          </div>

          <div className="text-xs sm:text-sm text-zinc-500 flex flex-wrap items-center gap-x-2.5 gap-y-1">
            <span>
              {t.common.submittedDate}: <strong className="text-zinc-800 font-medium">{formatDisplayDate(claim.submitted_at)}</strong>
            </span>
            {claim.settled_at && (
              <>
                <span className="text-zinc-300" aria-hidden="true">•</span>
                <span className="text-emerald-700 font-semibold">
                  {t.common.settledDate}: {formatDisplayDate(claim.settled_at)}
                </span>
              </>
            )}
            {isRejected && (
              <>
                <span className="text-zinc-300" aria-hidden="true">•</span>
                <span className="text-rose-700 font-bold flex items-center gap-1">
                  <AlertTriangle className="w-4 h-4 inline text-rose-600 shrink-0" aria-hidden="true" />
                  {t.common.actionRequired}
                </span>
              </>
            )}
          </div>
        </div>

        <div className="flex items-center justify-between sm:justify-end w-full sm:w-auto gap-5 pt-3 sm:pt-0 border-t sm:border-t-0 border-slate-100">
          <div className="text-left sm:text-right shrink-0">
            <div className="text-[11px] uppercase tracking-wider text-zinc-400 font-bold">
              {t.common.claimAmount}
            </div>
            <div className="font-extrabold text-zinc-900 text-base sm:text-xl flex items-center sm:justify-end">
              {formatCurrency(claim.amount)}
            </div>
          </div>

          <Link
            href={`/claims/${claim.id}`}
            className={cn(
              buttonVariants({
                size: isRejected ? "default" : "sm",
                variant: isRejected ? "default" : "outline",
              }),
              "shrink-0 transition-transform active:scale-[0.98]",
              isRejected
                ? "bg-rose-600 hover:bg-rose-700 text-white font-extrabold shadow-sm px-5 py-3 flex items-center gap-2 text-sm rounded-xl"
                : "border-slate-300 text-zinc-700 hover:bg-slate-50 px-4 py-2 text-xs font-semibold rounded-lg"
            )}
            aria-label={`${isRejected ? t.common.seeWhy : t.common.viewDetails} for ${claim.claim_type}`}
          >
            {isRejected ? (
              <>
                {t.common.seeWhy} <ArrowRight className="w-4 h-4 ml-0.5" aria-hidden="true" />
              </>
            ) : (
              t.common.viewDetails
            )}
          </Link>
        </div>
      </CardContent>
    </Card>
  );
}
