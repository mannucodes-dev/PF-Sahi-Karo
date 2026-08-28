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

  const [activeTab, setActiveTab] = useState<"citizen" | "employer">("citizen");
  const [searchTerm, setSearchTerm] = useState("");

  const handleSelectCode = (code: string) => {
    setSelectedCode(code);
    const rule = BUILTIN_REMARK_CODES[code]?.[langKey] || BUILTIN_REMARK_CODES[code]?.en;
    if (rule) {
      setSearchTerm(rule.official_text);
    }
  };

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const term = searchTerm.trim().toUpperCase();
    if (!term) return;

    // Find best match in codes
    const foundCode = Object.keys(BUILTIN_REMARK_CODES).find((code) => {
      const r = BUILTIN_REMARK_CODES[code].en;
      return (
        code.includes(term) ||
        r.official_text.toUpperCase().includes(term) ||
        r.plain_text.toUpperCase().includes(term)
      );
    });

    if (foundCode) {
      setSelectedCode(foundCode);
    }
  };

  return (
    <section id="instant-decoder" className="scroll-mt-24 space-y-8">
      {/* Title & Introduction */}
      <div className="max-w-3xl">
        <h2 className="text-3xl sm:text-4xl font-extrabold text-on-surface tracking-tight mb-3">
          {t.decoderTool.title}
        </h2>
        <p className="text-base sm:text-lg text-on-surface-variant leading-relaxed">
          {t.decoderTool.subtitle}
        </p>
      </div>

      {/* Search Section Card */}
      <div className="glass-card rounded-2xl p-6 sm:p-8">
        <label
          htmlFor="epfo-remark"
          className="block text-xs font-bold text-on-surface-variant mb-2.5 uppercase tracking-wider"
        >
          {t.decoderTool.selectLabel}
        </label>

        <form onSubmit={handleSearchSubmit} className="relative">
          <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-outline">
            search
          </span>
          <input
            id="epfo-remark"
            type="text"
            value={searchTerm || currentRule.official_text}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="e.g. 'FATHER NAME DIFFERS' or 'KYC PENDING'"
            className="w-full h-14 pl-12 pr-28 rounded-xl bg-surface-container-low border border-outline-variant text-sm sm:text-base font-medium text-on-surface focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary transition-all shadow-2xs"
          />
          <button
            type="submit"
            className="absolute right-2 top-1/2 -translate-y-1/2 bg-primary text-on-primary h-10 px-5 rounded-lg font-bold text-xs sm:text-sm hover:bg-surface-tint transition-colors cursor-pointer"
          >
            Decode
          </button>
        </form>

        {/* Popular Quick Pills */}
        <div className="flex flex-wrap items-center gap-2 mt-4">
          <span className="text-xs font-bold text-on-surface-variant mr-1">Popular:</span>
          {QUICK_CATEGORIES.map((cat) => (
            <button
              key={cat.code}
              type="button"
              onClick={() => handleSelectCode(cat.code)}
              className={cn(
                "px-3 py-1.5 rounded-full text-xs font-semibold transition-all cursor-pointer",
                selectedCode === cat.code
                  ? "bg-primary text-on-primary shadow-2xs"
                  : "bg-surface-container-highest text-on-surface-variant hover:bg-primary-container hover:text-on-primary-container"
              )}
            >
              {cat.label}
            </button>
          ))}
        </div>
      </div>

      {/* Decoder Results Grid (2 Columns) */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8">
        {/* 1. What EPFO Said */}
        <div className="glass-card rounded-2xl overflow-hidden flex flex-col h-full border-l-4 border-l-alert-crimson shadow-xs">
          <div className="bg-surface-container p-4 sm:p-5 border-b border-outline-variant/30 flex justify-between items-center">
            <h3 className="text-sm sm:text-base font-bold text-on-surface flex items-center gap-2">
              <span className="material-symbols-outlined text-alert-crimson text-[20px]">gavel</span>
              <span>{t.decoderTool.officialRemarkLabel}</span>
            </h3>
            <span className="bg-error-container text-on-error-container px-2.5 py-1 rounded-md text-[11px] font-extrabold uppercase font-data-mono">
              {currentRule.code}
            </span>
          </div>
          <div className="p-6 bg-surface-container-lowest flex-grow flex items-center justify-center">
            <p className="font-data-mono text-xs sm:text-sm text-alert-crimson bg-error-container/25 p-4 rounded-xl border border-error-container/60 w-full break-words leading-relaxed">
              &ldquo;{currentRule.official_text}&rdquo;
            </p>
          </div>
        </div>

        {/* 2. What It Actually Means */}
        <div className="glass-card rounded-2xl overflow-hidden flex flex-col h-full border-l-4 border-l-primary shadow-xs">
          <div className="bg-primary/10 p-4 sm:p-5 border-b border-outline-variant/30 flex justify-between items-center">
            <h3 className="text-sm sm:text-base font-bold text-primary flex items-center gap-2">
              <span className="material-symbols-outlined text-primary text-[20px]">translate</span>
              <span>{t.decoderTool.plainMeaningLabel}</span>
            </h3>
          </div>
          <div className="p-6 bg-surface-container-lowest flex-grow space-y-4">
            <p className="text-sm sm:text-base text-on-surface font-semibold leading-relaxed">
              {currentRule.plain_text}
            </p>
            <ul className="space-y-2 text-xs sm:text-sm text-on-surface-variant list-disc list-inside leading-relaxed">
              <li>EPFO system enforces exact string match across Aadhaar and employer records.</li>
              <li>Official Authority: <strong className="text-primary font-mono">{currentRule.source_reference}</strong></li>
              <li>Estimated Resolution Time: <strong className="text-on-surface font-mono">{currentRule.estimated_days}</strong></li>
            </ul>
          </div>
        </div>
      </div>

      {/* Resolution Pathway Card */}
      <div className="glass-card rounded-2xl overflow-hidden shadow-xs">
        <div className="bg-surface p-6 border-b border-outline-variant/30 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div>
            <h3 className="text-xl font-bold text-on-surface mb-1">
              Resolution Pathway
            </h3>
            <p className="text-xs text-on-surface-variant flex items-center gap-1.5">
              <span className="material-symbols-outlined text-[16px] text-primary">menu_book</span>
              <span>Authorized guidance based on {currentRule.source_reference}</span>
            </p>
          </div>
          <a
            href={currentRule.source_url}
            target="_blank"
            rel="noopener noreferrer"
            className="text-xs font-bold text-primary hover:underline flex items-center gap-1 self-start sm:self-auto"
          >
            <span>{t.decoderTool.circularLabel}</span>
            <span className="material-symbols-outlined text-[14px]">open_in_new</span>
          </a>
        </div>

        {/* Citizen vs Employer Tabs */}
        <div className="flex border-b border-outline-variant/30 bg-surface-container-lowest">
          <button
            type="button"
            onClick={() => setActiveTab("citizen")}
            className={`flex-1 py-4 text-center text-xs sm:text-sm font-bold transition-colors cursor-pointer border-b-2 ${
              activeTab === "citizen"
                ? "border-primary text-primary bg-surface-container-low"
                : "border-transparent text-on-surface-variant hover:bg-surface-container-low"
            }`}
          >
            {t.decoderTool.citizenMustDo}
          </button>
          <button
            type="button"
            onClick={() => setActiveTab("employer")}
            className={`flex-1 py-4 text-center text-xs sm:text-sm font-bold transition-colors cursor-pointer border-b-2 ${
              activeTab === "employer"
                ? "border-primary text-primary bg-surface-container-low"
                : "border-transparent text-on-surface-variant hover:bg-surface-container-low"
            }`}
          >
            {t.decoderTool.employerMustDo}
          </button>
        </div>

        {/* Pathway Steps with timeline */}
        <div className="p-6 sm:p-8 bg-surface-container-lowest">
          {activeTab === "citizen" ? (
            <div className="relative border-l-2 border-outline-variant/50 ml-4 sm:ml-6 space-y-8 py-2">
              {currentRule.fix_steps.map((step, idx) => (
                <div key={idx} className="relative pl-8 sm:pl-10">
                  <div className="absolute -left-[17px] top-0 w-8 h-8 rounded-full bg-primary text-on-primary flex items-center justify-center font-bold text-xs sm:text-sm shadow-xs ring-4 ring-surface-container-lowest">
                    {idx + 1}
                  </div>
                  <h4 className="text-sm sm:text-base font-bold text-on-surface mb-1.5">
                    Step {idx + 1}
                  </h4>
                  <p className="text-xs sm:text-sm text-on-surface-variant leading-relaxed mb-2">
                    {step}
                  </p>
                  {idx === 0 && (
                    <a
                      href="https://unifiedportal-mem.epfindia.gov.in"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1 text-primary font-bold hover:underline text-xs"
                    >
                      <span>Open UAN Member Portal</span>
                      <span className="material-symbols-outlined text-[14px]">open_in_new</span>
                    </a>
                  )}
                </div>
              ))}

              {/* Action: Copy WhatsApp Action Plan */}
              <div className="relative pl-8 sm:pl-10 pt-2">
                <div className="bg-surface-container-low border border-outline-variant/50 rounded-xl p-5 space-y-3">
                  <h5 className="text-xs font-bold text-on-surface-variant uppercase tracking-wider">
                    Shareable Action Plan for HR
                  </h5>
                  <button
                    type="button"
                    onClick={handleCopyHrMessage}
                    className="w-full sm:w-auto bg-[#25D366] text-white min-h-[44px] px-6 rounded-xl font-bold text-xs sm:text-sm flex items-center justify-center gap-2 hover:bg-[#128C7E] transition-colors shadow-xs cursor-pointer"
                  >
                    <span className="material-symbols-outlined text-[18px]">send</span>
                    <span>{copied ? t.decoderTool.copiedNotice : "📲 Copy Ready-to-Send Action Plan for HR"}</span>
                  </button>
                </div>
              </div>
            </div>
          ) : (
            <div className="relative border-l-2 border-outline-variant/50 ml-4 sm:ml-6 space-y-6 py-2">
              {currentRule.authority_actions.map((action, idx) => (
                <div key={idx} className="relative pl-8 sm:pl-10">
                  <div className="absolute -left-[17px] top-0 w-8 h-8 rounded-full bg-secondary text-white flex items-center justify-center font-bold text-xs sm:text-sm shadow-xs ring-4 ring-surface-container-lowest">
                    {idx + 1}
                  </div>
                  <h4 className="text-sm sm:text-base font-bold text-on-surface mb-1">
                    Employer Action Requirement {idx + 1}
                  </h4>
                  <p className="text-xs sm:text-sm text-on-surface-variant leading-relaxed">
                    {action}
                  </p>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
