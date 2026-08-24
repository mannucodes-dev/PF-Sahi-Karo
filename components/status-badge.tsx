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
            "bg-emerald-50 text-emerald-700 border-emerald-200 gap-1 font-medium",
            className
          )}
        >
          <CheckCircle2 className="w-3.5 h-3.5" />
          Approved
        </Badge>
      );
    case "pending":
      return (
        <Badge
          variant="outline"
          className={cn(
            "bg-amber-50 text-amber-700 border-amber-200 gap-1 font-medium",
            className
          )}
        >
          <Clock className="w-3.5 h-3.5" />
          Under review
        </Badge>
      );
    case "rejected":
      return (
        <Badge
          variant="outline"
          className={cn(
            "bg-rose-50 text-rose-700 border-rose-200 gap-1 font-medium",
            className
          )}
        >
          <XCircle className="w-3.5 h-3.5" />
          Rejected
        </Badge>
      );
  }
}
