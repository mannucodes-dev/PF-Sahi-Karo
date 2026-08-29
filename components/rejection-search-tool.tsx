"use client";

import React, { useState, useEffect, useRef } from "react";
import { useTranslation } from "@/lib/i18n/context";
import { BUILTIN_REMARK_CODES, type RemarkCodeRow } from "@/lib/decoder-rules";
import { Locale } from "@/lib/i18n/translations";
import {
  Search,
  Gavel,
  Languages,
  BookOpen,
  ExternalLink,
  Send,
  Check,
  Sparkles,
  X,
  AlertCircle,
  Loader2,
} from "lucide-react";
import { cn } from "@/lib/utils";

const QUICK_CATEGORY_KEYS: { code: string; labels: Record<Locale, string> }[] = [
  {
    code: "KYC_INCOMPLETE",
    labels: {
      en: "KYC Pending",
      hi: "केवाईसी लंबित",
      mr: "केवायसी प्रलंबित",
      ta: "KYC நிலுவையில்",
      te: "KYC పెండింగ్‌లో",
      kn: "KYC ಬಾಕಿ ಇದೆ",
      gu: "KYC બાકી",
      bn: "KYC মুলতুবি",
    },
  },
  {
    code: "UAN_AADHAAR_UNLINKED",
    labels: {
      en: "Aadhaar Not Seeded",
      hi: "आधार लिंक नहीं",
      mr: "आधार लिंक नाही",
      ta: "ஆதார் இணைக்கப்படவில்லை",
      te: "ఆధార్ లింక్ కాలేదు",
      kn: "ಆಧಾರ್ ಲಿಂಕ್ ಆಗಿಲ್ಲ",
      gu: "આધાર લિંક નથી",
      bn: "আধার লিংক নেই",
    },
  },
  {
    code: "SERVICE_PERIOD",
    labels: {
      en: "Date of Exit / Service",
      hi: "निकास तिथि / सेवा अवधि",
      mr: "एक्झिट तारीख / सेवा",
      ta: "விலகிய தேதி / பணிக்காலம்",
      te: "ఎగ్జిట్ తేదీ / సర్వీస్",
      kn: "ನಿರ್ಗಮನ ದಿನಾಂಕ / ಸೇವೆ",
      gu: "એક્ઝિટ તારીખ / સેવા",
      bn: "প্রস্থানের তারিখ / চাকরি",
    },
  },
  {
    code: "NAME_MISMATCH",
    labels: {
      en: "Aadhaar Name Mismatch",
      hi: "आधार नाम विसंगति",
      mr: "आधार नाव तफावत",
      ta: "ஆதார் பெயர் தவறு",
      te: "ఆధార్ పేరు తేడా",
      kn: "ಆಧಾರ್ ಹೆಸರು ವ್ಯತ್ಯಾಸ",
      gu: "આધાર નામ મેળ ખાતું નથી",
      bn: "আধার নামের অমিল",
    },
  },
  {
    code: "BANK_MISMATCH",
    labels: {
      en: "Bank / IFSC Error",
      hi: "बैंक खाता / IFSC त्रुटि",
      mr: "बँक / IFSC त्रुटी",
      ta: "வங்கி / IFSC பிழை",
      te: "బ్యాంక్ / IFSC లోపం",
      kn: "ಬ್ಯಾಂಕ್ / IFSC ದೋಷ",
      gu: "બેંક / IFSC ભૂલ",
      bn: "ব্যাংক / IFSC ত্রুটি",
    },
  },
];

const KEYWORD_MAP: Record<string, string> = {
  FATHER: "NAME_MISMATCH",
  NAME: "NAME_MISMATCH",
  SPELLING: "NAME_MISMATCH",
  AADHAAR: "UAN_AADHAAR_UNLINKED",
  SEEDED: "UAN_AADHAAR_UNLINKED",
  UNLINKED: "UAN_AADHAAR_UNLINKED",
  KYC: "KYC_INCOMPLETE",
  SIGNATURE: "KYC_INCOMPLETE",
  DSC: "KYC_INCOMPLETE",
  EMPLOYER: "KYC_INCOMPLETE",
  PENDING: "KYC_INCOMPLETE",
  BANK: "BANK_MISMATCH",
  IFSC: "BANK_MISMATCH",
  NEFT: "BANK_MISMATCH",
  CHEQUE: "BANK_MISMATCH",
  PASSBOOK: "BANK_MISMATCH",
  ACCOUNT: "BANK_MISMATCH",
  EXIT: "SERVICE_PERIOD",
  DOE: "SERVICE_PERIOD",
  DOJ: "SERVICE_PERIOD",
  SERVICE: "SERVICE_PERIOD",
  PERIOD: "SERVICE_PERIOD",
  JOINING: "SERVICE_PERIOD",
  YEARS: "SERVICE_PERIOD",
};

function searchRemark(term: string): string | null {
  if (!term) return null;
  const cleaned = term.trim().toUpperCase();

  // 1. Direct code check
  if (cleaned in BUILTIN_REMARK_CODES) return cleaned;

  // 2. Keyword map check
  for (const [kw, code] of Object.entries(KEYWORD_MAP)) {
    if (cleaned.includes(kw)) return code;
  }

  // 3. Search through all translations in all locales
  for (const [code, langMap] of Object.entries(BUILTIN_REMARK_CODES)) {
    for (const r of Object.values(langMap)) {
      if (
        r.official_text.toUpperCase().includes(cleaned) ||
        r.plain_text.toUpperCase().includes(cleaned) ||
        r.fix_steps.some((s) => s.toUpperCase().includes(cleaned))
      ) {
        return code;
      }
    }
  }

  return null;
}

export function RejectionSearchTool() {
  const { locale, t } = useTranslation();

  const [selectedCode, setSelectedCode] = useState<string>("NAME_MISMATCH");
  const [copied, setCopied] = useState(false);
  const [activeTab, setActiveTab] = useState<"citizen" | "employer">("citizen");
  const [searchTerm, setSearchTerm] = useState("");
  const [highlighted, setHighlighted] = useState(false);
  const [noResults, setNoResults] = useState(false);
  const [isSearching, setIsSearching] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const handleCustomDecode = (e: Event) => {
      const customEvent = e as CustomEvent<{ code: string; officialText?: string }>;
      if (customEvent.detail?.code) {
        setSelectedCode(customEvent.detail.code);
        if (customEvent.detail.officialText) {
          setSearchTerm(customEvent.detail.officialText);
        }
        setNoResults(false);
        setHighlighted(true);
        setTimeout(() => setHighlighted(false), 2500);
      }
    };

    window.addEventListener("pf-decode-remark", handleCustomDecode);
    return () => window.removeEventListener("pf-decode-remark", handleCustomDecode);
  }, []);

  const currentRule: RemarkCodeRow =
    BUILTIN_REMARK_CODES[selectedCode]?.[locale] ||
    BUILTIN_REMARK_CODES[selectedCode]?.en ||
    BUILTIN_REMARK_CODES["NAME_MISMATCH"].en;

  const handleCopyHrMessage = () => {
    const hrMessages: Record<Locale, string> = {
      en: `Dear HR Team,\n\nMy EPFO PF claim was returned with official remark:\n"${currentRule.official_text}"\n\nAs per EPFO circular (${currentRule.source_reference}), this requires digital approval from the establishment via Class 3 DSC on the Unified Portal.\n\nKindly approve the pending submission for my UAN record so I can resubmit the claim.\n\nThank you.`,
      hi: `आदरणीय एचआर टीम,\n\nमेरा ईपीएफओ दावा इस आधिकारिक कारण से अस्वीकृत हुआ है:\n"${currentRule.official_text}"\n\nईपीएफओ परिपत्र (${currentRule.source_reference}) के अनुसार, कृपया कंपनी के यूनिफाइड पोर्टल पर डिजिटल हस्ताक्षर (DSC) द्वारा मेरे यूएएन प्रोफाइल/केवाईसी को अनुमोदित करें ताकि मैं पुनः दावा सबमिट कर सकूं।\n\nधन्यवाद।`,
      mr: `आदरणीय एचआर टीम,\n\nमाझा ईपीएफओ दावा या कारणास्तव नाकारला गेला आहे:\n"${currentRule.official_text}"\n\nईपीएफओ परिपत्रकानुसार (${currentRule.source_reference}), कंपनीच्या पोर्टलवर डिजिटल स्वाक्षरीने (DSC) माझ्या प्रोफाइलला मंजुरी द्यावी ही विनंती.\n\nधन्यवाद.`,
      ta: `அன்புள்ள HR குழு,\n\nஎனது இபிஎஃப்ஓ கோரிக்கை இந்த காரணத்திற்காக நிராகரிக்கப்பட்டுள்ளது:\n"${currentRule.official_text}"\n\nசுற்றறிக்கையின்படி (${currentRule.source_reference}), போர்ட்டலில் டிஜிட்டல் கையொப்பம் (DSC) மூலம் எனது சுயவிவரத்திற்கு ஒப்புதல் அளிக்குமாறு கேட்டுக்கொள்கிறேன்.\n\nநன்றி.`,
      te: `గౌరవనీయులైన HR టీమ్,\n\nనా ఈపీఎఫ్‌ఓ క్లెయిమ్ ఈ అధికారిక కారణంతో తిరస్కరించబడింది:\n"${currentRule.official_text}"\n\nఈపీఎఫ్‌ఓ సర్క్యులర్ (${currentRule.source_reference}) ప్రకారం, దయచేసి పోర్టల్‌లో డిజిటల్ సంతకంతో (DSC) నా ప్రొఫైల్‌ను ఆమోదించండి.\n\nధన్యవాదాలు.`,
      kn: `ಆತ್ಮೀಯ HR ತಂಡ,\n\nನನ್ನ ಇಪಿಎಫ್‌ಒ ಕ್ಲೈಮ್ ಈ ಕಾರಣದಿಂದ ತಿರಸ್ಕರಿಸಲ್ಪಟ್ಟಿದೆ:\n"${currentRule.official_text}"\n\nಸುತ್ತೋಲೆಯ ಪ್ರಕಾರ (${currentRule.source_reference}), ದಯವಿಟ್ಟು ಡಿಜಿಟಲ್ ಸಹಿಯೊಂದಿಗೆ (DSC) ನನ್ನ ಪ್ರೊಫೈಲ್ ಅನ್ನು ಅನುಮೋದಿಸಿ.\n\nಧನ್ಯವಾದಗಳು.`,
      gu: `આદરણીય HR ટીમ,\n\nમારો ઇપીએફઓ ક્લેમ આ સત્તાવાર કારણસર નકારાયેલ છે:\n"${currentRule.official_text}"\n\nપરિપત્ર મુજબ (${currentRule.source_reference}), કંપની પોર્ટલ પર ડિજિટલ સહી (DSC) વડે મારી પ્રોફાઇલ મંજૂર કરવા વિનંતી.\n\nઆભાર.`,
      bn: `প্রিয় HR টিম,\n\nআমার ইপিএফও দাবিটি এই কারণে ফেরত দেওয়া হয়েছে:\n"${currentRule.official_text}"\n\nসার্কুলার অনুসারে (${currentRule.source_reference}), অনুগ্রহ করে ডিজিটাল স্বাক্ষরের (DSC) মাধ্যমে আমার প্রোফাইল অনুমোদন করুন।\n\nধন্যবাদ।`,
    };

    const hrText = hrMessages[locale] || hrMessages.en;

    if (typeof navigator !== "undefined" && navigator.clipboard) {
      navigator.clipboard.writeText(hrText);
      setCopied(true);
      setTimeout(() => setCopied(false), 3000);
    }
  };

  const handleSelectCode = (code: string) => {
    setSelectedCode(code);
    setSearchTerm("");
    setNoResults(false);
  };

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const term = (searchTerm || "").trim();
    if (!term) return;

    setIsSearching(true);
    setNoResults(false);

    setTimeout(() => {
      const foundCode = searchRemark(term);
      setIsSearching(false);
      if (foundCode) {
        setSelectedCode(foundCode);
        setNoResults(false);
        setHighlighted(true);
        setTimeout(() => setHighlighted(false), 2500);
      } else {
        setNoResults(true);
      }
    }, 300);
  };

  const handleClear = () => {
    setSearchTerm("");
    setNoResults(false);
    setIsSearching(false);
    inputRef.current?.focus();
  };

  const currentPill = QUICK_CATEGORY_KEYS.find((c) => c.code === selectedCode);
  const activeLabel = currentPill ? currentPill.labels[locale] || currentPill.labels.en : selectedCode;

  return (
    <section id="instant-decoder" className="scroll-mt-24 w-full">
      {/* Title & Introduction */}
      <div className="mb-6 sm:mb-8 max-w-2xl">
        <h2 className="text-2xl sm:text-3xl lg:text-[32px] font-bold text-slate-900 mb-2 tracking-tight">
          {t.decoderTool.title}
        </h2>
        <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
          {t.decoderTool.subtitle}
        </p>
      </div>

      {/* Search Section Card */}
      <div
        className={cn(
          "bg-white rounded-xl border border-slate-200/90 p-5 sm:p-6 shadow-xs mb-8 transition-all duration-500",
          highlighted && "ring-2 ring-[#005f56] ring-offset-2 shadow-lg bg-teal-50/20"
        )}
      >
        <label
          htmlFor="epfo-remark"
          className="block text-xs font-bold text-slate-500 mb-2.5 uppercase tracking-wider"
        >
          {t.decoderTool.selectLabel}
        </label>

        <form onSubmit={handleSearchSubmit} className="relative flex items-center">
          {isSearching ? (
            <Loader2 className="w-5 h-5 text-[#005f56] absolute left-4 pointer-events-none stroke-[2] animate-spin" />
          ) : (
            <Search className="w-5 h-5 text-slate-400 absolute left-4 pointer-events-none stroke-[2]" />
          )}
          <input
            ref={inputRef}
            id="epfo-remark"
            type="text"
            value={searchTerm}
            onChange={(e) => {
              setSearchTerm(e.target.value);
              if (noResults) setNoResults(false);
            }}
            placeholder={t.decoderTool.selectPlaceholder}
            className="w-full h-12 sm:h-14 pl-12 pr-28 sm:pr-32 rounded-lg bg-slate-50 border border-slate-200 text-sm sm:text-base font-medium text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-[#005c55] focus:border-[#005c55] transition-all"
          />
          {searchTerm && (
            <button
              type="button"
              onClick={handleClear}
              className="absolute right-[90px] sm:right-[106px] top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 p-1 cursor-pointer"
              aria-label="Clear search"
            >
              <X className="w-4 h-4" />
            </button>
          )}
          <button
            type="submit"
            disabled={isSearching}
            className="absolute right-2 top-1/2 -translate-y-1/2 bg-[#005c55] hover:bg-[#004742] disabled:opacity-60 text-white h-9 sm:h-10 px-4 sm:px-6 rounded-md font-bold text-xs sm:text-sm transition-colors cursor-pointer flex items-center justify-center gap-1.5 shadow-2xs"
          >
            {isSearching ? (
              <>
                <Loader2 className="w-3 h-3 animate-spin" />
                <span>...</span>
              </>
            ) : (
              <span>{locale === "en" ? "Decode" : "डिकोड"}</span>
            )}
          </button>
        </form>

        {/* No results state */}
        {noResults && (
          <div className="mt-3 flex items-start gap-2 bg-amber-50 border border-amber-200 rounded-lg px-4 py-3">
            <AlertCircle className="w-4 h-4 text-amber-600 mt-0.5 shrink-0" />
            <div>
              <p className="text-xs sm:text-sm font-semibold text-amber-800">
                {locale === "hi"
                  ? "कोई सटीक मेल नहीं मिला"
                  : locale === "mr"
                  ? "अचूक जुळणी सापडली नाही"
                  : "No exact match found"}
              </p>
              <p className="text-xs text-amber-700 mt-0.5">
                {locale === "hi"
                  ? 'कृपया छोटे शब्द लिखें जैसे "नाम", "KYC", "बैंक" या "आधार"। या नीचे दिए गए विकल्पों में से चुनें।'
                  : locale === "mr"
                  ? 'कृपया "नाव", "KYC", "बँक" किंवा "आधार" सारखे शब्द शोधा किंवा खालील पर्याय निवडा.'
                  : 'Try keywords like "name", "KYC", "bank", or "Aadhaar", or pick a popular reason below.'}
              </p>
            </div>
          </div>
        )}

        {/* Popular Quick Pills */}
        <div className="flex flex-wrap items-center gap-2 mt-4">
          <span className="text-xs font-semibold text-slate-500 mr-1 self-center">
            {t.decoderTool.orSearch}
          </span>
          {QUICK_CATEGORY_KEYS.map((cat) => {
            const pillLabel = cat.labels[locale] || cat.labels.en;
            return (
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
                {pillLabel}
              </button>
            );
          })}
        </div>

        {/* Currently showing indicator */}
        {!noResults && (
          <p className="mt-3 text-[11px] text-slate-400 font-medium">
            {locale === "hi" ? "वर्तमान में प्रदर्शित: " : "Showing: "}
            <span className="text-slate-700 font-bold font-mono">{activeLabel}</span>
          </p>
        )}
      </div>

      {/* Decoder Results Grid (2 Columns) */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8 items-stretch">
        {/* 1. What EPFO Said */}
        <div className="bg-white rounded-xl border border-slate-200/90 border-l-4 border-l-[#e11d48] overflow-hidden flex flex-col h-full shadow-xs">
          <div className="bg-slate-50/80 p-4 sm:p-4.5 border-b border-slate-200/80 flex justify-between items-center">
            <h3 className="text-sm sm:text-base font-bold text-slate-900 flex items-center gap-2">
              <Gavel className="w-5 h-5 text-[#e11d48] stroke-[2.25]" />
              <span>{t.decoderTool.officialRemarkLabel}</span>
            </h3>
            <span className="bg-red-100 text-red-700 px-2 py-0.5 rounded text-[11px] font-extrabold uppercase font-mono tracking-wider">
              {t.status.rejected}
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
              <span>{t.decoderTool.plainMeaningLabel}</span>
            </h3>
          </div>
          <div className="p-5 sm:p-6 bg-white flex-grow flex flex-col justify-between space-y-4">
            <p className="text-sm sm:text-base text-slate-900 font-medium leading-relaxed">
              {currentRule.plain_text}
            </p>
            <ul className="space-y-2 text-xs sm:text-sm text-slate-600 list-disc list-inside leading-relaxed pt-2 border-t border-slate-100">
              <li>
                {t.decoderTool.circularLabel}: <strong className="text-[#005c55] font-mono">{currentRule.source_reference}</strong>
              </li>
              <li>
                {t.decoderTool.timelineLabel}: <strong className="text-slate-900 font-mono">{currentRule.estimated_days}</strong>
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
              {t.decoderTool.stepByStepTitle}
            </h3>
            <p className="text-xs text-slate-500 flex items-center gap-1.5">
              <BookOpen className="w-4 h-4 text-[#005c55]" />
              <span>{t.decoderTool.circularLabel}: {currentRule.source_reference}</span>
            </p>
          </div>
          <a
            href={currentRule.source_url}
            target="_blank"
            rel="noopener noreferrer"
            className="text-xs font-bold text-[#005c55] hover:underline flex items-center gap-1 self-start sm:self-auto"
          >
            <span>{t.offices.viewCirculars}</span>
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
            {t.decoderTool.citizenMustDo}
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
            {t.decoderTool.employerMustDo}
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
                    {locale === "en" ? `Step ${idx + 1}` : `चरण ${idx + 1}`}: {step.split(".")[0]}
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
                      <span>{locale === "en" ? "Open Member Portal" : "मेंबर पोर्टल खोलें"}</span>
                      <ExternalLink className="w-3 h-3 ml-0.5" />
                    </a>
                  )}
                </div>
              ))}

              {/* Action: Copy WhatsApp Action Plan */}
              <div className="relative pl-8 sm:pl-10 pt-2">
                <div className="bg-slate-50/90 border border-slate-200/80 rounded-xl p-4 sm:p-5 space-y-3">
                  <h5 className="text-xs font-bold text-slate-600 uppercase tracking-wider">
                    {locale === "en" ? "Shareable Action Plan for HR" : "कंपनी एचआर के लिए साझा करने योग्य कार्य योजना"}
                  </h5>
                  <button
                    type="button"
                    onClick={handleCopyHrMessage}
                    className="w-full sm:w-auto bg-[#25D366] hover:bg-[#128C7E] text-white min-h-[44px] px-6 rounded-lg font-bold text-xs sm:text-sm flex items-center justify-center gap-2 transition-colors shadow-xs cursor-pointer"
                  >
                    {copied ? (
                      <>
                        <Check className="w-4 h-4" />
                        <span>{t.decoderTool.copiedNotice}</span>
                      </>
                    ) : (
                      <>
                        <Send className="w-4 h-4" />
                        <span>{t.decoderTool.copyHrMessage}</span>
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
                    {locale === "en" ? `Employer Action Requirement ${idx + 1}` : `नियोक्ता कार्रवाई आवश्यकता ${idx + 1}`}
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
