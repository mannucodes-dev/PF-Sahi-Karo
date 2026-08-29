import React from "react";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { getAllBuiltinRemarkCodes } from "@/lib/data/remark-constants";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { HelpCircle, BookOpen, Clock, ShieldCheck, ExternalLink, ArrowRight } from "lucide-react";
import Link from "next/link";
import { getServerTranslation } from "@/lib/i18n/server";

export default async function HelpPage() {
  const { locale, t } = await getServerTranslation();
  const remarkCodes = getAllBuiltinRemarkCodes(locale);

  const GLOSSARY_ITEMS = [
    {
      term: t.glossary.uan.term,
      description: t.glossary.uan.explanation,
    },
    {
      term: t.glossary.kyc.term,
      description: t.glossary.kyc.explanation,
    },
    {
      term: locale === "hi" ? "संयुक्त घोषणा पत्र (Joint Declaration)" : locale === "mr" ? "संयुक्त घोषणा पत्र (Joint Declaration)" : "Joint Declaration Form",
      description:
        locale === "hi"
          ? "नाम, जन्म तिथि या सेवा विवरण में सुधार के लिए कर्मचारी और नियोक्ता द्वारा संयुक्त रूप से हस्ताक्षरित आधिकारिक आवेदन।"
          : locale === "mr"
          ? "नाव, जन्मतारीख किंवा निकास तारीख सुधारण्यासाठी कर्मचारी आणि कंपनीने संयुक्तपणे स्वाक्षरी केलेला अर्ज."
          : "A standardized physical or online application signed jointly by the employee and employer to rectify name spelling, date of birth, or date of exit.",
    },
    {
      term: t.glossary.neft.term,
      description: t.glossary.neft.explanation,
    },
    {
      term: t.glossary.eps.term,
      description: t.glossary.eps.explanation,
    },
    {
      term: t.glossary.epfo.term,
      description: t.glossary.epfo.explanation,
    },
  ];

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 text-zinc-900">
      <div id="top" className="scroll-mt-0" />
      <SiteHeader />

      <main id="main-content" className="max-w-5xl mx-auto px-4 sm:px-6 py-8 sm:py-12 flex-1 space-y-10">
        <div className="space-y-2">
          <div className="inline-flex items-center gap-1.5 text-xs font-bold text-teal-800 bg-teal-50 border border-teal-200 px-3 py-1 rounded-full">
            <BookOpen className="w-3.5 h-3.5" aria-hidden="true" />
            <span>{locale === "hi" ? "नियम संग्रह एवं डिकोडर नियम" : locale === "mr" ? "नियम संग्रह व डिकोडर नियम" : "Knowledge Base & Decoder Rules"}</span>
          </div>
          <h1 className="text-2xl sm:text-4xl font-extrabold tracking-tight text-zinc-900">
            {locale === "hi"
              ? "ईपीएफओ अस्वीकृति कारण एवं समाधान नियम"
              : locale === "mr"
              ? "ईपीएफओ नकार कारणे व निवारण नियम"
              : "EPFO Rejection Reasons & Resolution Rules"}
          </h1>
          <p className="text-sm sm:text-base text-zinc-600 max-w-2xl leading-relaxed">
            {locale === "hi"
              ? "आधिकारिक अस्वीकृति टिप्पणियों की परिभाषाएं, सरल भाषा में व्याख्या, समाधान चेकलिस्ट और सरकारी परिपत्र देखें।"
              : locale === "mr"
              ? "अधिकृत नकार शेरे, सोप्या भाषेतील स्पष्टीकरण, निवारण पायऱ्या आणि सरकारी परिपत्रके पहा."
              : "Browse official rejection remark definitions, plain-language translations, action checklists, and policy circulars."}
          </p>
        </div>

        {/* Rejection Codes List */}
        <section className="space-y-4">
          <h2 className="text-lg sm:text-xl font-extrabold text-zinc-900 flex items-center gap-2">
            <HelpCircle className="w-5 h-5 text-teal-700" aria-hidden="true" />
            <span>{locale === "hi" ? "प्रकाशित अस्वीकृति डिकोडर सूची" : locale === "mr" ? "प्रकाशित नकार डिकोडर सूची" : "Published Rejection Decoder Catalog"}</span>
          </h2>

          <div className="space-y-4">
            {remarkCodes.map((rule) => (
              <Card key={rule.code} className="border-slate-200 bg-white rounded-2xl shadow-2xs overflow-hidden">
                <CardHeader className="bg-slate-50/80 border-b border-slate-100 p-4 sm:p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                  <div className="space-y-1">
                    <span className="text-xs font-mono font-bold text-teal-900 bg-teal-100/70 border border-teal-300/80 px-2.5 py-0.5 rounded-full">
                      REMARK CODE: {rule.code}
                    </span>
                    <CardTitle className="text-base sm:text-lg font-bold text-zinc-900 pt-1">
                      {rule.plain_text}
                    </CardTitle>
                  </div>
                  <div className="flex items-center gap-1.5 text-xs text-zinc-600 bg-white border border-slate-200 px-3 py-1 rounded-lg w-fit">
                    <Clock className="w-3.5 h-3.5 text-zinc-500" aria-hidden="true" />
                    <span>{t.decoderTool.timelineLabel}: {rule.estimated_days}</span>
                  </div>
                </CardHeader>

                <CardContent className="p-4 sm:p-6 space-y-4 text-xs sm:text-sm">
                  <div>
                    <div className="text-[11px] uppercase font-bold text-zinc-400 mb-1">
                      {t.decoderTool.officialRemarkLabel}
                    </div>
                    <p className="font-mono text-zinc-800 bg-slate-50 border border-slate-200 p-3 rounded-lg">
                      &ldquo;{rule.official_text}&rdquo;
                    </p>
                  </div>

                  <div className="space-y-2">
                    <div className="text-xs sm:text-sm font-bold text-zinc-900">
                      {t.decoderTool.stepByStepTitle}:
                    </div>
                    <ol className="space-y-1.5 list-decimal list-inside text-zinc-700 leading-relaxed">
                      {rule.fix_steps.map((step, idx) => (
                        <li key={idx}>
                          {step}
                        </li>
                      ))}
                    </ol>
                  </div>

                  <div className="pt-2 border-t border-slate-100 flex flex-wrap items-center justify-between gap-3 text-xs text-zinc-500">
                    <span className="flex items-center gap-1">
                      <ShieldCheck className="w-3.5 h-3.5 text-teal-700" aria-hidden="true" />
                      <span>{t.common.source}: <strong>{rule.source_reference}</strong></span>
                    </span>

                    {rule.source_url && (
                      <a
                        href={rule.source_url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-teal-700 hover:text-teal-900 font-semibold inline-flex items-center gap-1 underline underline-offset-2"
                      >
                        {t.offices.viewCirculars} <ExternalLink className="w-3 h-3" aria-hidden="true" />
                      </a>
                    )}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* EPFO Terms Glossary */}
        <section className="space-y-4">
          <h2 className="text-lg sm:text-xl font-extrabold text-zinc-900 flex items-center gap-2">
            <BookOpen className="w-5 h-5 text-teal-700" aria-hidden="true" />
            <span>{t.glossary.title}</span>
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {GLOSSARY_ITEMS.map((item, index) => (
              <Card key={index} className="border-slate-200 bg-white p-5 rounded-xl space-y-2 shadow-2xs">
                <h3 className="font-bold text-sm text-zinc-900">{item.term}</h3>
                <p className="text-xs text-zinc-600 leading-relaxed">{item.description}</p>
              </Card>
            ))}
          </div>
        </section>
      </main>

      <SiteFooter />
    </div>
  );
}
