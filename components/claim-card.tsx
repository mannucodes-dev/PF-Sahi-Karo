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
        "transition-all duration-200 overflow-hidden",
        isRejected
          ? "border-rose-300/80 bg-gradient-to-r from-rose-50/50 via-white to-white shadow-sm ring-1 ring-rose-200/50"
          : "border-zinc-200/80 bg-white hover:border-zinc-300"
      )}
    >
      <CardContent className="p-5 sm:p-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div className="space-y-1.5 max-w-md">
          <div className="flex flex-wrap items-center gap-2">
            <h3 className="font-semibold text-base text-zinc-900">
              {claim.claim_type}
            </h3>
            <StatusBadge status={claim.status} />
          </div>

          <div className="text-xs text-zinc-500 flex flex-wrap items-center gap-x-2 gap-y-1">
            <span>Submitted: {claim.submitted_date}</span>
            {claim.settled_date && (
              <>
                <span>•</span>
                <span className="text-emerald-700 font-medium">
                  Settled: {claim.settled_date}
                </span>
              </>
            )}
            {isRejected && (
              <>
                <span>•</span>
                <span className="text-rose-700 font-medium flex items-center gap-1">
                  <AlertTriangle className="w-3 h-3 inline" /> Action required
                </span>
              </>
            )}
          </div>
        </div>

        <div className="flex items-center justify-between sm:justify-end w-full sm:w-auto gap-4 pt-2 sm:pt-0 border-t sm:border-t-0 border-zinc-100">
          <div className="text-left sm:text-right">
            <div className="text-[11px] uppercase tracking-wider text-zinc-400 font-medium">
              Amount
            </div>
            <div className="font-bold text-zinc-900 text-base sm:text-lg flex items-center sm:justify-end">
              <IndianRupee className="w-4 h-4 text-zinc-700" />
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
              isRejected
                ? "bg-rose-600 hover:bg-rose-700 text-white font-semibold shadow-sm px-4 py-2 flex items-center gap-1.5"
                : "border-zinc-300 text-zinc-700 hover:bg-zinc-50 px-3 py-1.5"
            )}
          >
            {isRejected ? (
              <>
                See why <ArrowRight className="w-4 h-4" />
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
