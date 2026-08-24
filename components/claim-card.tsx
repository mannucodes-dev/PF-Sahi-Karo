import React from "react";
import Link from "next/link";
import { Card, CardContent } from "@/components/ui/card";
import { buttonVariants } from "@/components/ui/button";
import { Claim } from "@/lib/mock-data";
import { StatusBadge } from "./status-badge";
import { IndianRupee } from "lucide-react";
import { cn } from "@/lib/utils";

interface ClaimCardProps {
  claim: Claim;
}

export function ClaimCard({ claim }: ClaimCardProps) {
  const isRejected = claim.status === "rejected";

  return (
    <Card className={`border-zinc-200 transition-all ${isRejected ? "border-rose-200 bg-rose-50/20" : ""}`}>
      <CardContent className="p-5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <h3 className="font-semibold text-zinc-900">{claim.claim_type}</h3>
            <StatusBadge status={claim.status} />
          </div>
          <div className="text-xs text-zinc-500 flex items-center gap-1">
            Submitted on {claim.submitted_date}
            {claim.settled_date && ` · Settled on ${claim.settled_date}`}
          </div>
        </div>

        <div className="flex items-center justify-between sm:justify-end w-full sm:w-auto gap-4">
          <div className="text-right">
            <div className="text-xs text-zinc-500">Amount</div>
            <div className="font-semibold text-zinc-900 flex items-center justify-end">
              <IndianRupee className="w-3.5 h-3.5" />
              {claim.amount.toLocaleString("en-IN")}
            </div>
          </div>

          <Link
            href={`/claims/${claim.id}`}
            className={cn(
              buttonVariants({
                size: "sm",
                variant: isRejected ? "default" : "outline",
              }),
              isRejected ? "bg-rose-600 hover:bg-rose-700 text-white" : ""
            )}
          >
            {isRejected ? "See why →" : "View"}
          </Link>
        </div>
      </CardContent>
    </Card>
  );
}
