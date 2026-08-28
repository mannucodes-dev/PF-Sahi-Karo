"use client";

import React, { useState } from "react";
import { useTranslation } from "@/lib/i18n/context";
import { BUILTIN_REMARK_CODES, type RemarkCodeRow } from "@/lib/decoder-rules";
import { Search, Gavel, Languages, BookOpen, ExternalLink, Send, Check, Sparkles } from "lucide-react";
import { cn } from "@/lib/utils";

const QUICK_CATEGORIES = [
  { label: "KYC Pending", code: "KYC_INCOMPLETE" },
  { label: "Aadhaar Not Seeded", code: "UAN_AADHAAR_UNLINKED" },
  { label: "Date of Joining Mismatch", code: "SERVICE_PERIOD" },
  { label: "Aadhaar Name Mismatch", code: "NAME_MISMATCH" },
  { label: "Bank Account Mismatch", code: "BANK_MISMATCH" },
];

export function RejectionSearchTool() {
  const { locale, t } = useTranslation();
  const langKey = locale === "hi" ? "hi" : "en";

  const [selectedCode, setSelectedCode] = useState<string>("NAME_MISMATCH");
  const [copied, setCopied] = useState(false);
  const [activeTab, setActiveTab] = useState<"citizen" | "employer">("citizen");
  const [searchTerm, setSearchTerm] = useState("");

  const currentRule: RemarkCodeRow =
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

  const handleSelectCode = (code: string) => {
    setSelectedCode(code);
    const rule = BUILTIN_REMARK_CODES[code]?.[langKey] || BUILTIN_REMARK_CODES[code]?.en;
    if (rule) {
      setSearchTerm(rule.official_text);
    }
  };

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const term = (searchTerm || "").trim().toUpperCase();
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
    <section id="instant-decoder" className="scroll-mt-24 w-full">
      {/* Title & Introduction matching Stitch Screen 5 */}
      <div className="mb-6 sm:mb-8 max-w-2xl">
        <h2 className="text-2xl sm:text-3xl lg:text-[32px] font-bold text-slate-900 mb-2 tracking-tight">
          Rejection Decoder
        </h2>
        <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
          Paste or search your EPFO rejection remark below to understand exactly what went wrong and how to fix it.
        </p>
      </div>

      {/* Search Section Card */}
      <div className="bg-white rounded-xl border border-slate-200/90 p-5 sm:p-6 shadow-xs mb-8">
        <label
          htmlFor="epfo-remark"
          className="block text-xs font-bold text-slate-500 mb-2.5 uppercase tracking-wider"
        >
          Search Official Remarks
        </label>

        <form onSubmit={handleSearchSubmit} className="relative flex items-center">
          <Search className="w-5 h-5 text-slate-400 absolute left-4 pointer-events-none stroke-[2]" />
          <input
            id="epfo-remark"
            type="text"
            value={searchTerm || currentRule.official_text}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="e.g. 'FATHER NAME DIFFERS' or 'KYC PENDING'"
            className="w-full h-12 sm:h-14 pl-12 pr-24 sm:pr-28 rounded-lg bg-slate-50 border border-slate-200 text-sm sm:text-base font-medium text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-[#005c55] focus:border-[#005c55] transition-all"
          />
          <button
            type="submit"
            className="absolute right-2 top-1/2 -translate-y-1/2 bg-[#005c55] hover:bg-[#004742] text-white h-9 sm:h-10 px-4 sm:px-6 rounded-md font-bold text-xs sm:text-sm transition-colors cursor-pointer flex items-center justify-center shadow-2xs"
          >
            Decode
          </button>
        </form>

        {/* Popular Quick Pills */}
        <div className="flex flex-wrap items-center gap-2 mt-4">
          <span className="text-xs font-semibold text-slate-500 mr-1 self-center">Popular:</span>
          {QUICK_CATEGORIES.map((cat) => (
            <button
              key={cat.code}
              type="button"
              onClick={() => handleSelectCode(cat.code)}
              className={cn(
                "px-3 py-1 rounded-full text-xs font-medium transition-all cursor-pointer",
                selectedCode === cat.code
                  ? "bg-[#005c55] text-white shadow-2xs"
                  : "bg-slate-100 text-slate-700 hover:bg-slate-200"
              )}
            >
              {cat.label}
            </button>
          ))}
        </div>
      </div>

      {/* Decoder Results Grid (2 Columns) */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8 items-stretch">
        {/* 1. What EPFO Said */}
        <div className="bg-white rounded-xl border border-slate-200/90 border-l-4 border-l-[#e11d48] overflow-hidden flex flex-col h-full shadow-xs">
          <div className="bg-slate-50/80 p-4 sm:p-4.5 border-b border-slate-200/80 flex justify-between items-center">
            <h3 className="text-sm sm:text-base font-bold text-slate-900 flex items-center gap-2">
              <Gavel className="w-5 h-5 text-[#e11d48] stroke-[2.25]" />
              <span>What EPFO Said</span>
            </h3>
            <span className="bg-red-100 text-red-700 px-2 py-0.5 rounded text-[11px] font-extrabold uppercase font-mono tracking-wider">
              REJECTED
            </span>
          </div>
          <div className="p-5 sm:p-6 bg-white flex-grow flex items-center justify-center">
            <p className="font-mono text-xs sm:text-sm text-[#e11d48] bg-red-50/70 p-4 rounded-lg border border-red-200/70 w-full break-words leading-relaxed">
              &ldquo;{currentRule.official_text}&rdquo;
            </p>
          </div>
        </div>

        {/* 2. What It Actually Means */}
        <div className="bg-white rounded-xl border border-slate-200/90 border-l-4 border-l-[#005c55] overflow-hidden flex flex-col h-full shadow-xs">
          <div className="bg-teal-50/50 p-4 sm:p-4.5 border-b border-slate-200/80 flex justify-between items-center">
            <h3 className="text-sm sm:text-base font-bold text-[#005c55] flex items-center gap-2">
              <Languages className="w-5 h-5 text-[#005c55] stroke-[2.25]" />
              <span>What It Actually Means</span>
            </h3>
          </div>
          <div className="p-5 sm:p-6 bg-white flex-grow flex flex-col justify-between space-y-4">
            <p className="text-sm sm:text-base text-slate-900 font-medium leading-relaxed">
              {currentRule.plain_text}
            </p>
            <ul className="space-y-2 text-xs sm:text-sm text-slate-600 list-disc list-inside leading-relaxed pt-2 border-t border-slate-100">
              <li>EPFO automated rules enforce exact character and spacing matches.</li>
              <li>
                Official Circular: <strong className="text-[#005c55] font-mono">{currentRule.source_reference}</strong>
              </li>
              <li>
                Estimated Resolution: <strong className="text-slate-900 font-mono">{currentRule.estimated_days}</strong>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Resolution Pathway Card */}
      <div className="bg-white rounded-xl border border-slate-200/90 overflow-hidden shadow-xs">
        <div className="bg-slate-50/80 p-5 sm:p-6 border-b border-slate-200/80 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div>
            <h3 className="text-lg sm:text-xl font-bold text-slate-900 mb-1">
              Resolution Pathway
            </h3>
            <p className="text-xs text-slate-500 flex items-center gap-1.5">
              <BookOpen className="w-4 h-4 text-[#005c55]" />
              <span>Based on EPFO Circular No. {currentRule.source_reference}</span>
            </p>
          </div>
          <a
            href={currentRule.source_url}
            target="_blank"
            rel="noopener noreferrer"
            className="text-xs font-bold text-[#005c55] hover:underline flex items-center gap-1 self-start sm:self-auto"
          >
            <span>View Official Circular</span>
            <ExternalLink className="w-3.5 h-3.5" />
          </a>
        </div>

        {/* Citizen vs Employer Tabs */}
        <div className="flex border-b border-slate-200/80 bg-white">
          <button
            type="button"
            onClick={() => setActiveTab("citizen")}
            className={`flex-1 py-3.5 sm:py-4 text-center text-xs sm:text-sm font-bold transition-colors cursor-pointer border-b-2 ${
              activeTab === "citizen"
                ? "border-[#005c55] text-[#005c55] bg-slate-50/60"
                : "border-transparent text-slate-600 hover:bg-slate-50"
            }`}
          >
            Citizen Action
          </button>
          <button
            type="button"
            onClick={() => setActiveTab("employer")}
            className={`flex-1 py-3.5 sm:py-4 text-center text-xs sm:text-sm font-bold transition-colors cursor-pointer border-b-2 ${
              activeTab === "employer"
                ? "border-[#005c55] text-[#005c55] bg-slate-50/60"
                : "border-transparent text-slate-600 hover:bg-slate-50"
            }`}
          >
            Employer / HR Action
          </button>
        </div>

        {/* Pathway Steps with Timeline */}
        <div className="p-5 sm:p-8 bg-white">
          {activeTab === "citizen" ? (
            <div className="relative border-l-2 border-slate-200 ml-4 sm:ml-6 space-y-8 py-2">
              {currentRule.fix_steps.map((step: string, idx: number) => (
                <div key={idx} className="relative pl-8 sm:pl-10">
                  <div
                    className={cn(
                      "absolute -left-[17px] top-0 w-8 h-8 rounded-full flex items-center justify-center font-bold text-xs sm:text-sm shadow-xs ring-4 ring-white",
                      idx === 0
                        ? "bg-[#005c55] text-white"
                        : "bg-slate-100 text-slate-700 border border-slate-300"
                    )}
                  >
                    {idx + 1}
                  </div>
                  <h4 className="text-sm sm:text-base font-bold text-slate-900 mb-1.5">
                    Step {idx + 1}: {step.split(".")[0]}
                  </h4>
                  <p className="text-xs sm:text-sm text-slate-600 leading-relaxed mb-2.5">
                    {step}
                  </p>
                  {idx === 0 && (
                    <a
                      href="https://unifiedportal-mem.epfindia.gov.in"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1 text-[#005c55] font-bold hover:underline text-xs"
                    >
                      <span>Open Member Portal</span>
                      <ExternalLink className="w-3 h-3 ml-0.5" />
                    </a>
                  )}
                </div>
              ))}

              {/* Action: Copy WhatsApp Action Plan */}
              <div className="relative pl-8 sm:pl-10 pt-2">
                <div className="bg-slate-50/90 border border-slate-200/80 rounded-xl p-4 sm:p-5 space-y-3">
                  <h5 className="text-xs font-bold text-slate-600 uppercase tracking-wider">
                    Shareable Action Plan for HR
                  </h5>
                  <button
                    type="button"
                    onClick={handleCopyHrMessage}
                    className="w-full sm:w-auto bg-[#25D366] hover:bg-[#128C7E] text-white min-h-[44px] px-6 rounded-lg font-bold text-xs sm:text-sm flex items-center justify-center gap-2 transition-colors shadow-xs cursor-pointer"
                  >
                    {copied ? (
                      <>
                        <Check className="w-4 h-4" />
                        <span>Action Plan Copied to Clipboard!</span>
                      </>
                    ) : (
                      <>
                        <Send className="w-4 h-4" />
                        <span>📲 Copy Ready-to-Send Action Plan for HR</span>
                      </>
                    )}
                  </button>
                </div>
              </div>
            </div>
          ) : (
            <div className="relative border-l-2 border-slate-200 ml-4 sm:ml-6 space-y-6 py-2">
              {currentRule.authority_actions.map((action: string, idx: number) => (
                <div key={idx} className="relative pl-8 sm:pl-10">
                  <div className="absolute -left-[17px] top-0 w-8 h-8 rounded-full bg-[#855300] text-white flex items-center justify-center font-bold text-xs sm:text-sm shadow-xs ring-4 ring-white">
                    {idx + 1}
                  </div>
                  <h4 className="text-sm sm:text-base font-bold text-slate-900 mb-1">
                    Employer Action Requirement {idx + 1}
                  </h4>
                  <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
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
