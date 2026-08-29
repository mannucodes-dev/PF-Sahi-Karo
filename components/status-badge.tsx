"use client";

import React from "react";
import { Badge } from "@/components/ui/badge";
import { ClaimStatus } from "@/lib/supabase/types";
import {
  CheckCircle2,
  Clock,
  XCircle,
  FileText,
  AlertTriangle,
  RotateCw,
  HelpCircle,
  CheckCheck,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { useTranslation } from "@/lib/i18n/context";

interface StatusBadgeProps {
  status: ClaimStatus | string;
  className?: string;
}

export function StatusBadge({ status, className }: StatusBadgeProps) {
  const { t } = useTranslation();

  switch (status) {
    case "approved":
      return (
        <Badge
          variant="outline"
          aria-label={`Status: ${t.status.approved || "Settled"}`}
          className={cn(
            "bg-emerald-50 text-emerald-900 border-emerald-300 gap-1.5 font-semibold px-2.5 py-0.5 rounded-full text-xs shadow-2xs",
            className
          )}
        >
          <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" aria-hidden="true" />
          {t.status.approved || "Settled"}
        </Badge>
      );
    case "under_review":
    case "pending":
      return (
        <Badge
          variant="outline"
          aria-label={`Status: ${t.status.under_review || "Under Review"}`}
          className={cn(
            "bg-amber-50 text-amber-900 border-amber-300 gap-1.5 font-semibold px-2.5 py-0.5 rounded-full text-xs shadow-2xs",
            className
          )}
        >
          <Clock className="w-3.5 h-3.5 text-amber-600 shrink-0" aria-hidden="true" />
          {t.status.under_review || "Under Review"}
        </Badge>
      );
    case "rejected":
      return (
        <Badge
          variant="outline"
          aria-label={`Status: ${t.status.rejected || "Rejected"}`}
          className={cn(
            "bg-rose-50 text-rose-900 border-rose-300 gap-1.5 font-semibold px-2.5 py-0.5 rounded-full text-xs shadow-2xs",
            className
          )}
        >
          <XCircle className="w-3.5 h-3.5 text-rose-600 shrink-0" aria-hidden="true" />
          {t.status.rejected || "Rejected"}
        </Badge>
      );
    case "submitted":
      return (
        <Badge
          variant="outline"
          aria-label={`Status: ${t.status.submitted || "Submitted"}`}
          className={cn(
            "bg-blue-50 text-blue-900 border-blue-300 gap-1.5 font-semibold px-2.5 py-0.5 rounded-full text-xs shadow-2xs",
            className
          )}
        >
          <FileText className="w-3.5 h-3.5 text-blue-600 shrink-0" aria-hidden="true" />
          {t.status.submitted || "Submitted"}
        </Badge>
      );
    case "resubmitted":
      return (
        <Badge
          variant="outline"
          aria-label={`Status: ${t.status.resubmitted || "Resubmitted"}`}
          className={cn(
            "bg-teal-50 text-teal-900 border-teal-300 gap-1.5 font-semibold px-2.5 py-0.5 rounded-full text-xs shadow-2xs",
            className
          )}
        >
          <RotateCw className="w-3.5 h-3.5 text-teal-600 shrink-0" aria-hidden="true" />
          {t.status.resubmitted || "Resubmitted"}
        </Badge>
      );
    case "correction_started":
    case "resubmission_pending":
      return (
        <Badge
          variant="outline"
          aria-label={`Status: ${t.status.correction_started || "Correction in Progress"}`}
          className={cn(
            "bg-purple-50 text-purple-900 border-purple-300 gap-1.5 font-semibold px-2.5 py-0.5 rounded-full text-xs shadow-2xs",
            className
          )}
        >
          <AlertTriangle className="w-3.5 h-3.5 text-purple-600 shrink-0" aria-hidden="true" />
          {t.status.correction_started || "Correction In Progress"}
        </Badge>
      );
    case "pending_information":
      return (
        <Badge
          variant="outline"
          aria-label={`Status: ${t.status.pending_information || "Pending Info"}`}
          className={cn(
            "bg-orange-50 text-orange-900 border-orange-300 gap-1.5 font-semibold px-2.5 py-0.5 rounded-full text-xs shadow-2xs",
            className
          )}
        >
          <HelpCircle className="w-3.5 h-3.5 text-orange-600 shrink-0" aria-hidden="true" />
          {t.status.pending_information || "Pending Info"}
        </Badge>
      );
    case "closed":
      return (
        <Badge
          variant="outline"
          aria-label={`Status: ${t.status.closed || "Closed"}`}
          className={cn(
            "bg-zinc-100 text-zinc-800 border-zinc-300 gap-1.5 font-semibold px-2.5 py-0.5 rounded-full text-xs shadow-2xs",
            className
          )}
        >
          <CheckCheck className="w-3.5 h-3.5 text-zinc-600 shrink-0" aria-hidden="true" />
          {t.status.closed || "Closed"}
        </Badge>
      );
    default:
      return (
        <Badge
          variant="outline"
          aria-label={`Status: ${status}`}
          className={cn(
            "bg-slate-100 text-slate-800 border-slate-300 gap-1.5 font-semibold px-2.5 py-0.5 rounded-full text-xs shadow-2xs",
            className
          )}
        >
          <FileText className="w-3.5 h-3.5 text-slate-600 shrink-0" aria-hidden="true" />
          {status}
        </Badge>
      );
  }
}
