import React from "react";
import Link from "next/link";
import { Card, CardContent } from "@/components/ui/card";
import { buttonVariants } from "@/components/ui/button";
import { Claim } from "@/lib/mock-data";
import { StatusBadge } from "./status-badge";
import { IndianRupee, ArrowRight, AlertTriangle } from "lucide-react";
import { cn } from "@/lib/utils";

interface ClaimCardProps {
  claim: Claim;
}

export function ClaimCard({ claim }: ClaimCardProps) {
  const isRejected = claim.status === "rejected";

  return (
    <Card
      className={cn(
        "transition-all duration-200 overflow-hidden relative",
        isRejected
          ? "border-rose-300 bg-gradient-to-r from-rose-50/70 via-white to-white shadow-sm ring-2 ring-rose-500/20 hover:border-rose-400"
          : "border-slate-200/90 bg-white hover:border-slate-300 shadow-2xs"
      )}
    >
      {isRejected && (
        <div className="absolute top-0 left-0 bottom-0 w-1.5 bg-rose-500" />
      )}
      <CardContent className="p-5 sm:p-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div className="space-y-2 max-w-lg w-full sm:w-auto">
          <div className="flex flex-wrap items-center gap-2.5">
            <h3 className="font-semibold text-base sm:text-lg text-zinc-900 tracking-tight">
              {claim.claim_type}
            </h3>
            <StatusBadge status={claim.status} />
          </div>

          <div className="text-xs text-zinc-500 flex flex-wrap items-center gap-x-2.5 gap-y-1">
            <span>Submitted: <strong className="text-zinc-700 font-medium">{claim.submitted_date}</strong></span>
            {claim.settled_date && (
              <>
                <span className="text-zinc-300">•</span>
                <span className="text-emerald-700 font-medium">
                  Settled: {claim.settled_date}
                </span>
              </>
            )}
            {isRejected && (
              <>
                <span className="text-zinc-300">•</span>
                <span className="text-rose-700 font-semibold flex items-center gap-1">
                  <AlertTriangle className="w-3.5 h-3.5 inline text-rose-600 shrink-0" /> Action required
                </span>
              </>
            )}
          </div>
        </div>

        <div className="flex items-center justify-between sm:justify-end w-full sm:w-auto gap-4 pt-3 sm:pt-0 border-t sm:border-t-0 border-slate-100">
          <div className="text-left sm:text-right shrink-0">
            <div className="text-[10px] sm:text-[11px] uppercase tracking-wider text-zinc-400 font-semibold">
              Claim Amount
            </div>
            <div className="font-bold text-zinc-900 text-base sm:text-xl flex items-center sm:justify-end">
              <IndianRupee className="w-4 h-4 text-zinc-700 shrink-0" />
              {claim.amount.toLocaleString("en-IN")}
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
                ? "bg-rose-600 hover:bg-rose-700 text-white font-semibold shadow-xs px-4 sm:px-5 py-2.5 flex items-center gap-1.5 text-sm"
                : "border-slate-300 text-zinc-700 hover:bg-slate-50 px-3.5 py-2 text-xs font-medium"
            )}
          >
            {isRejected ? (
              <>
                See why <ArrowRight className="w-4 h-4 ml-0.5" />
              </>
            ) : (
              "View details"
            )}
          </Link>
        </div>
      </CardContent>
    </Card>
  );
}
