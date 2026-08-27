"use client";

import React, { useState } from "react";
import { useTranslation } from "@/lib/i18n/context";
import { BUILTIN_REMARK_CODES } from "@/lib/data/remark-constants";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  FileSearch,
  Sparkles,
  CheckCircle2,
  Building2,
  UserCheck,
  Clock,
  ExternalLink,
  Copy,
  Check,
  FileWarning,
  ArrowRight,
  ShieldCheck,
} from "lucide-react";
import { cn } from "@/lib/utils";
import Link from "next/link";

interface QuickCategory {
  label: string;
  code: string;
}

const QUICK_CATEGORIES: QuickCategory[] = [
  { label: "Aadhaar Name Mismatch", code: "NAME_MISMATCH" },
  { label: "Employer KYC Pending", code: "KYC_INCOMPLETE" },
  { label: "Bank NEFT Failed", code: "BANK_MISMATCH" },
  { label: "Date of Exit Missing", code: "SERVICE_PERIOD" },
  { label: "UAN Aadhaar Unlinked", code: "UAN_AADHAAR_UNLINKED" },
];

export function RejectionSearchTool() {
  const { locale, t } = useTranslation();
  const langKey = locale === "hi" ? "hi" : "en";

  const [selectedCode, setSelectedCode] = useState<string>("NAME_MISMATCH");
  const [copied, setCopied] = useState(false);

  const currentRule =
    BUILTIN_REMARK_CODES[selectedCode]?.[langKey] ||
    BUILTIN_REMARK_CODES[selectedCode]?.en ||
    BUILTIN_REMARK_CODES["NAME_MISMATCH"].en;

  const handleCopyHrMessage = () => {
    const hrText =
      locale === "hi"
        ? `आदरणीय एचआर टीम,\n\nमेरा ईपीएफओ दावा इस आधिकारिक कारण से अस्वीकृत हुआ है:\n"${currentRule.official_text}"\n\nईपीएफओ परिपत्र (${currentRule.source_reference}) के अनुसार, कृपया कंपनी के यूनिफाइड पोर्टल पर डिजिटल हस्ताक्षर (DSC) द्वारा मेरे यूएएन प्रोफाइल/केवाईसी को अनुमोदित करें ताकि मैं पुनः दावा सबमिट कर सकूं।\n\nधन्यवाद।`
        : `Dear HR Team,\n\nMy EPFO PF claim was returned with official system remark:\n"${currentRule.official_text}"\n\nAs per official EPFO guidance (${currentRule.source_reference}), this requires digital approval from the establishment via Class 3 DSC on the Unified Employer Portal.\n\nKindly approve the pending submission for my UAN record so I can resubmit the claim.\n\nThank you.`;

    if (typeof navigator !== "undefined" && navigator.clipboard) {
      navigator.clipboard.writeText(hrText);
      setCopied(true);
      setTimeout(() => setCopied(false), 3000);
    }
  };

  return (
    <section id="instant-decoder" className="scroll-mt-20">
      <Card className="border-teal-200/80 bg-white shadow-md rounded-2xl overflow-hidden ring-1 ring-teal-500/15">
        <CardHeader className="bg-gradient-to-r from-teal-900 via-teal-850 to-teal-950 text-white p-6 sm:p-8 space-y-2">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-teal-800/90 border border-teal-700/80 text-teal-200 text-xs font-semibold w-fit">
            <Sparkles className="w-3.5 h-3.5 text-teal-300" aria-hidden="true" />
            <span>{t.decoderTool.badge}</span>
          </div>
          <CardTitle className="text-2xl sm:text-3xl font-extrabold tracking-tight text-white">
            {t.decoderTool.title}
          </CardTitle>
          <p className="text-sm sm:text-base text-teal-100/90 max-w-2xl leading-relaxed">
            {t.decoderTool.subtitle}
          </p>
        </CardHeader>

        <CardContent className="p-6 sm:p-8 space-y-6">
          {/* Quick Selection Dropdown and Category Pills */}
          <div className="space-y-3">
            <label htmlFor="rejection-select" className="block text-sm font-bold text-zinc-900">
              {t.decoderTool.selectLabel}
            </label>
            <div className="flex flex-col sm:flex-row gap-3">
              <select
                id="rejection-select"
                value={selectedCode}
                onChange={(e) => setSelectedCode(e.target.value)}
                className="w-full bg-slate-50 border border-slate-300 text-zinc-900 text-sm font-medium rounded-xl p-3.5 focus:outline-none focus:ring-2 focus:ring-teal-600 focus:bg-white shadow-2xs"
              >
                {Object.keys(BUILTIN_REMARK_CODES).map((code) => {
                  const rule = BUILTIN_REMARK_CODES[code][langKey] || BUILTIN_REMARK_CODES[code].en;
                  return (
                    <option key={code} value={code}>
                      {rule.code}: {rule.official_text.slice(0, 75)}...
                    </option>
                  );
                })}
              </select>
            </div>

            {/* Quick Pills */}
            <div className="flex flex-wrap items-center gap-2 pt-1">
              <span className="text-xs font-semibold text-zinc-500 mr-1">{t.decoderTool.orSearch}</span>
              {QUICK_CATEGORIES.map((cat) => (
                <button
                  key={cat.code}
                  type="button"
                  onClick={() => setSelectedCode(cat.code)}
                  className={cn(
                    "px-3 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer",
                    selectedCode === cat.code
                      ? "bg-teal-700 text-white shadow-2xs"
                      : "bg-slate-100 text-zinc-700 hover:bg-slate-200"
                  )}
                >
                  {cat.label}
                </button>
              ))}
            </div>
          </div>

          {/* Active Rejection Display Card */}
          <div className="space-y-5 pt-2">
            {/* 1. What EPFO said (Official Cryptic Portal Remark) */}
            <div className="border border-slate-800 bg-slate-950 text-slate-100 rounded-xl overflow-hidden shadow-sm">
              <div className="bg-slate-900 px-4 py-2.5 border-b border-slate-800 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-rose-500" />
                  <span className="w-2.5 h-2.5 rounded-full bg-amber-500" />
                  <span className="w-2.5 h-2.5 rounded-full bg-emerald-500" />
                  <span className="text-xs font-mono text-slate-400 font-medium ml-1">
                    {t.decoderTool.officialRemarkLabel}
                  </span>
                </div>
                <span className="text-[11px] font-mono bg-rose-950 text-rose-300 border border-rose-800 px-2 py-0.5 rounded font-bold">
                  {currentRule.code}
                </span>
              </div>
              <div className="p-4 font-mono text-sm text-amber-300 select-all leading-relaxed">
                &ldquo;{currentRule.official_text}&rdquo;
              </div>
            </div>

            {/* 2. Plain Language Explanation */}
            <div className="border border-teal-200 bg-teal-50/50 rounded-xl p-5 space-y-3">
              <div className="flex items-center gap-2 text-teal-950 font-bold text-base">
                <Sparkles className="w-5 h-5 text-teal-700" aria-hidden="true" />
                <span>{t.decoderTool.plainMeaningLabel}</span>
              </div>
              <p className="text-sm sm:text-base text-zinc-800 leading-relaxed font-normal bg-white border border-teal-100 rounded-lg p-4 shadow-2xs">
                {currentRule.plain_text}
              </p>

              {/* Citizen vs Authority actions */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-1">
                <div className="bg-white border border-slate-200 rounded-xl p-4 space-y-2">
                  <div className="font-bold text-sm text-teal-950 flex items-center gap-1.5">
                    <UserCheck className="w-4 h-4 text-teal-700" />
                    <span>{t.decoderTool.citizenMustDo}</span>
                  </div>
                  <ul className="space-y-1.5 text-xs sm:text-sm text-zinc-700 list-disc list-inside">
                    {currentRule.citizen_actions.map((act, i) => (
                      <li key={i}>{act}</li>
                    ))}
                  </ul>
                </div>

                <div className="bg-white border border-slate-200 rounded-xl p-4 space-y-2">
                  <div className="font-bold text-sm text-slate-900 flex items-center gap-1.5">
                    <Building2 className="w-4 h-4 text-slate-700" />
                    <span>{t.decoderTool.employerMustDo}</span>
                  </div>
                  <ul className="space-y-1.5 text-xs sm:text-sm text-zinc-700 list-disc list-inside">
                    {currentRule.authority_actions.map((act, i) => (
                      <li key={i}>{act}</li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>

            {/* 3. Step-by-Step Resolution */}
            <div className="border border-slate-200 bg-white rounded-xl p-5 space-y-4 shadow-2xs">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-100 pb-3">
                <div className="flex items-center gap-2 font-bold text-base text-zinc-900">
                  <CheckCircle2 className="w-5 h-5 text-emerald-600" aria-hidden="true" />
                  <span>{t.decoderTool.stepByStepTitle}</span>
                </div>
                <div className="flex items-center gap-1 text-xs font-semibold text-zinc-600 bg-slate-100 px-3 py-1 rounded-full w-fit">
                  <Clock className="w-3.5 h-3.5 text-zinc-500" />
                  <span>{t.decoderTool.timelineLabel}: {currentRule.estimated_days}</span>
                </div>
              </div>

              <div className="space-y-2.5">
                {currentRule.fix_steps.map((step, idx) => (
                  <div
                    key={idx}
                    className="flex items-start gap-3 p-3.5 rounded-lg bg-slate-50 border border-slate-100 text-xs sm:text-sm text-zinc-800"
                  >
                    <span className="flex-shrink-0 w-6 h-6 rounded-full bg-teal-700 text-white flex items-center justify-center font-bold text-xs shadow-2xs mt-0.5">
                      {idx + 1}
                    </span>
                    <span className="leading-relaxed font-medium pt-0.5">{step}</span>
                  </div>
                ))}
              </div>

              {/* Action Bar: WhatsApp Share & Circular link */}
              <div className="pt-3 flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 border-t border-slate-100">
                <button
                  type="button"
                  onClick={handleCopyHrMessage}
                  className="bg-emerald-600 hover:bg-emerald-700 text-white text-xs sm:text-sm font-bold px-4 py-2.5 rounded-xl shadow-xs inline-flex items-center justify-center gap-2 transition-colors cursor-pointer"
                >
                  {copied ? (
                    <>
                      <Check className="w-4 h-4 text-emerald-200" aria-hidden="true" />
                      <span>{t.decoderTool.copiedNotice}</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-4 h-4 text-emerald-200" aria-hidden="true" />
                      <span>{t.decoderTool.copyHrMessage}</span>
                    </>
                  )}
                </button>

                <div className="flex items-center gap-3 justify-end text-xs text-zinc-500">
                  <span className="flex items-center gap-1">
                    <ShieldCheck className="w-4 h-4 text-teal-700" />
                    <span>{currentRule.source_reference}</span>
                  </span>
                  <a
                    href={currentRule.source_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-teal-700 hover:text-teal-900 font-semibold inline-flex items-center gap-1 underline underline-offset-2"
                  >
                    {t.decoderTool.circularLabel} <ExternalLink className="w-3 h-3" />
                  </a>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </section>
  );
}
