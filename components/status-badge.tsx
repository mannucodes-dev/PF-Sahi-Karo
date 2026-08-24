import React from "react";
import { Badge } from "@/components/ui/badge";
import { ClaimStatus } from "@/lib/mock-data";
import { CheckCircle2, Clock, XCircle } from "lucide-react";
import { cn } from "@/lib/utils";

interface StatusBadgeProps {
  status: ClaimStatus;
  className?: string;
}

export function StatusBadge({ status, className }: StatusBadgeProps) {
  switch (status) {
    case "approved":
      return (
        <Badge
          variant="outline"
          className={cn(
            "bg-emerald-50 text-emerald-800 border-emerald-300/80 gap-1.5 font-semibold px-2.5 py-0.5 rounded-full text-xs shadow-2xs",
            className
          )}
        >
          <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
          Approved
        </Badge>
      );
    case "pending":
      return (
        <Badge
          variant="outline"
          className={cn(
            "bg-amber-50 text-amber-800 border-amber-300/80 gap-1.5 font-semibold px-2.5 py-0.5 rounded-full text-xs shadow-2xs",
            className
          )}
        >
          <Clock className="w-3.5 h-3.5 text-amber-600 shrink-0" />
          Under review
        </Badge>
      );
    case "rejected":
      return (
        <Badge
          variant="outline"
          className={cn(
            "bg-rose-50 text-rose-800 border-rose-300/90 gap-1.5 font-semibold px-2.5 py-0.5 rounded-full text-xs shadow-2xs",
            className
          )}
        >
          <XCircle className="w-3.5 h-3.5 text-rose-600 shrink-0" />
          Rejected
        </Badge>
      );
  }
}
