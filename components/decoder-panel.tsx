"use client";

import React, { useState } from "react";
import { RemarkCodeRow } from "@/lib/data/remark-codes";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import {
  FileWarning,
  Sparkles,
  CheckCircle2,
  ExternalLink,
  ShieldCheck,
  Building2,
  UserCheck,
  Clock,
  Copy,
  Check,
} from "lucide-react";
import { formatDisplayDate } from "@/lib/utils";
import { useTranslation } from "@/lib/i18n/context";

interface DecoderPanelProps {
  remark: RemarkCodeRow;
}

export function DecoderPanel({ remark }: DecoderPanelProps) {
  const { locale, t } = useTranslation();
  const [copied, setCopied] = useState(false);

  const handleCopyHrMessage = () => {
    const hrText =
      locale === "hi"
        ? `आदरणीय एचआर टीम,\n\nमेरा ईपीएफओ दावा इस आधिकारिक कारण से अस्वीकृत हुआ है:\n"${remark.official_text}"\n\nईपीएफओ परिपत्र (${remark.source_reference}) के अनुसार, कृपया कंपनी के यूनिफाइड पोर्टल पर डिजिटल हस्ताक्षर (DSC) द्वारा मेरे यूएएन प्रोफाइल/केवाईसी को अनुमोदित करें ताकि मैं पुनः दावा सबमिट कर सकूं।\n\nधन्यवाद।`
        : `Dear HR Team,\n\nMy EPFO PF claim was returned with official system remark:\n"${remark.official_text}"\n\nAs per official EPFO guidance (${remark.source_reference}), this requires digital approval from the establishment via Class 3 DSC on the Unified Employer Portal.\n\nKindly approve the pending submission for my UAN record so I can resubmit the claim.\n\nThank you.`;

    if (typeof navigator !== "undefined" && navigator.clipboard) {
      navigator.clipboard.writeText(hrText);
      setCopied(true);
      setTimeout(() => setCopied(false), 3000);
    }
  };

  return (
    <div className="space-y-5">
      {/* 1. What EPFO said (Official Cryptic Portal Remark) */}
      <Card className="border-slate-800 bg-slate-950 text-slate-100 shadow-md overflow-hidden rounded-xl">
        <div className="bg-slate-900 px-4 py-2.5 border-b border-slate-800 flex flex-wrap items-center justify-between gap-2">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-rose-500" aria-hidden="true" />
            <span className="w-2.5 h-2.5 rounded-full bg-amber-500" aria-hidden="true" />
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-500" aria-hidden="true" />
            <span className="text-xs font-mono text-slate-400 font-medium ml-1">
              {t.claimDetail.whatEpfoSaid}
            </span>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-[11px] font-mono bg-rose-950/90 text-rose-300 border border-rose-800/80 px-2.5 py-0.5 rounded font-semibold">
              CODE: {remark.code}
            </span>
          </div>
        </div>

        <CardContent className="p-4 sm:p-5 font-mono">
          <div className="text-[11px] uppercase tracking-wider text-slate-400 mb-2 font-sans font-medium flex items-center gap-1.5">
            <FileWarning className="w-3.5 h-3.5 text-amber-400 shrink-0" aria-hidden="true" />
            <span>Raw Rejection Reason Recorded on Member Portal</span>
          </div>

          <div className="bg-black/60 border border-slate-800 rounded-lg p-3.5 sm:p-4 text-xs sm:text-sm text-amber-300 leading-relaxed font-mono select-all">
            &ldquo;{remark.official_text}&rdquo;
          </div>

          <p className="text-[11px] text-slate-400 mt-2.5 font-sans">
            {t.claimDetail.rawNoticeDesc}
          </p>
        </CardContent>
      </Card>

      {/* 2. What this actually means (Plain Language Guidance) */}
      <Card className="border-teal-200 bg-gradient-to-br from-teal-50/70 via-white to-emerald-50/40 shadow-sm ring-1 ring-teal-500/20 overflow-hidden rounded-xl">
        <CardHeader className="pb-2 pt-4 sm:pt-5 px-5 sm:px-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
            <div className="flex items-center gap-2.5 text-teal-950 text-sm sm:text-base font-bold">
              <div className="w-7 h-7 rounded-lg bg-teal-700 text-white flex items-center justify-center shadow-xs shrink-0">
                <Sparkles className="w-4 h-4" aria-hidden="true" />
              </div>
              <span>{t.claimDetail.whatItMeans}</span>
            </div>
            <span className="text-[11px] font-semibold bg-teal-100 text-teal-900 border border-teal-200 px-2.5 py-0.5 rounded-full w-fit">
              {t.claimDetail.plainBadge}
            </span>
          </div>
        </CardHeader>
        <CardContent className="px-5 sm:px-6 pb-6 pt-1 space-y-4">
          <p className="text-sm sm:text-base text-zinc-900 leading-relaxed font-normal bg-white border border-teal-100/80 rounded-lg p-4 shadow-2xs">
            {remark.plain_text}
          </p>

          {/* Citizen vs Authority Responsibility Breakdown */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
            <div className="bg-white border border-slate-200 rounded-lg p-3.5 space-y-2 text-xs sm:text-sm">
              <div className="font-bold text-zinc-900 flex items-center gap-1.5 text-teal-950">
                <UserCheck className="w-4 h-4 text-teal-700 shrink-0" aria-hidden="true" />
                <span>{t.claimDetail.citizenCanDo}</span>
              </div>
              <ul className="space-y-1 text-zinc-700 list-disc list-inside">
                {remark.citizen_actions && remark.citizen_actions.length > 0 ? (
                  remark.citizen_actions.map((act, i) => <li key={i}>{act}</li>)
                ) : (
                  <li>Follow the numbered resolution steps below.</li>
                )}
              </ul>
            </div>

            <div className="bg-white border border-slate-200 rounded-lg p-3.5 space-y-2 text-xs sm:text-sm">
              <div className="font-bold text-zinc-900 flex items-center gap-1.5 text-slate-900">
                <Building2 className="w-4 h-4 text-slate-700 shrink-0" aria-hidden="true" />
                <span>{t.claimDetail.authorityMustDo}</span>
              </div>
              <ul className="space-y-1 text-zinc-700 list-disc list-inside">
                {remark.authority_actions && remark.authority_actions.length > 0 ? (
                  remark.authority_actions.map((act, i) => <li key={i}>{act}</li>)
                ) : (
                  <li>Field office verification upon submission.</li>
                )}
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* 3. Step-by-Step Resolution Path */}
      <Card className="border-slate-200 bg-white shadow-sm rounded-xl overflow-hidden">
        <CardHeader className="pb-3 pt-4 sm:pt-5 px-5 sm:px-6 border-b border-slate-100">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
            <div className="flex items-center gap-2.5 text-zinc-900 text-sm sm:text-base font-bold">
              <div className="w-7 h-7 rounded-lg bg-zinc-900 text-white flex items-center justify-center font-mono text-xs shadow-xs shrink-0">
                <CheckCircle2 className="w-4 h-4 text-emerald-400" aria-hidden="true" />
              </div>
              <span>{t.claimDetail.stepByStepTitle}</span>
            </div>
            <div className="flex items-center gap-1 text-[11px] font-medium text-zinc-600 bg-zinc-100 px-2.5 py-1 rounded-md w-fit">
              <Clock className="w-3.5 h-3.5 text-zinc-500" aria-hidden="true" />
              <span>Estimated timeline: {remark.estimated_days}</span>
            </div>
          </div>
        </CardHeader>
        <CardContent className="px-5 sm:px-6 pb-6 pt-4 space-y-4">
          <ol className="list-none p-0 m-0 space-y-3">
            {remark.fix_steps.map((step, index) => (
              <li
                key={index}
                className="flex items-start gap-3.5 p-3.5 rounded-lg bg-slate-50 border border-slate-100 hover:bg-teal-50/40 hover:border-teal-100 transition-colors text-xs sm:text-sm text-zinc-800"
              >
                <span className="flex-shrink-0 w-6 h-6 rounded-full bg-teal-700 text-white flex items-center justify-center font-bold text-xs shadow-2xs mt-0.5">
                  {index + 1}
                </span>
                <span className="leading-relaxed pt-0.5 font-medium">{step}</span>
              </li>
            ))}
          </ol>

          {/* WhatsApp Share Action Button */}
          <div className="pt-2">
            <button
              type="button"
              onClick={handleCopyHrMessage}
              className="w-full sm:w-auto bg-emerald-600 hover:bg-emerald-700 text-white text-xs sm:text-sm font-bold px-4 py-2.5 rounded-xl shadow-xs inline-flex items-center justify-center gap-2 transition-colors cursor-pointer"
            >
              {copied ? (
                <>
                  <Check className="w-4 h-4 text-emerald-200" aria-hidden="true" />
                  <span>Message Copied! Forward to Company HR via WhatsApp</span>
                </>
              ) : (
                <>
                  <Copy className="w-4 h-4 text-emerald-200" aria-hidden="true" />
                  <span>{t.claimDetail.shareHrBtn}</span>
                </>
              )}
            </button>
          </div>

          {/* Official Source & Verification Metadata */}
          <div className="mt-4 pt-4 border-t border-slate-100 bg-slate-50/60 -mx-5 -mb-6 p-4 sm:px-6 rounded-b-xl flex flex-wrap items-center justify-between gap-3 text-[11px] text-zinc-500">
            <div className="flex flex-wrap items-center gap-x-4 gap-y-1">
              <span className="flex items-center gap-1">
                <ShieldCheck className="w-3.5 h-3.5 text-teal-700" aria-hidden="true" />
                <span>Source: <strong>{remark.source_reference}</strong></span>
              </span>
              <span>•</span>
              <span>Reviewed on: <strong>{formatDisplayDate(remark.reviewed_at)}</strong></span>
              <span>•</span>
              <span>Reviewer: <strong>{remark.reviewed_by}</strong></span>
            </div>

            {remark.source_url && (
              <a
                href={remark.source_url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-teal-700 hover:text-teal-900 font-semibold inline-flex items-center gap-1 underline underline-offset-2"
              >
                View Official Circular <ExternalLink className="w-3 h-3" aria-hidden="true" />
              </a>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
