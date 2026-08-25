import React from "react";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { getAllBuiltinRemarkCodes } from "@/lib/data/remark-codes";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { HelpCircle, BookOpen, Clock, ShieldCheck, ExternalLink, ArrowRight } from "lucide-react";
import Link from "next/link";
import { formatDisplayDate } from "@/lib/utils";

export default function HelpPage() {
  const remarkCodes = getAllBuiltinRemarkCodes("en");

  const GLOSSARY_ITEMS = [
    {
      term: "UAN (Universal Account Number)",
      description: "A permanent 12-digit number allotted by EPFO to every salaried worker. It links multiple Member IDs allotted by different employers across your career.",
    },
    {
      term: "KYC (Know Your Customer)",
      description: "Mandatory verification documents (Aadhaar, PAN, Bank details) digitally linked to your UAN and authenticated by your employer.",
    },
    {
      term: "Joint Declaration Form",
      description: "A standardized physical or online application signed jointly by the employee and employer to rectify name spelling, father's name, date of birth, or date of exit.",
    },
    {
      term: "NEFT (National Electronic Funds Transfer)",
      description: "The electronic banking network used by EPFO field offices to directly disburse approved claim amounts to your validated bank account.",
    },
    {
      term: "DSC (Digital Signature Certificate)",
      description: "A secure cryptographic token (Class 3) used by employer authorized signatories on the EPFO Unified Portal to digitally approve employee KYC and claims.",
    },
  ];

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 text-zinc-900">
      <SiteHeader />

      <main id="main-content" className="max-w-5xl mx-auto px-4 sm:px-6 py-8 sm:py-12 flex-1 space-y-10">
        <div className="space-y-2">
          <div className="inline-flex items-center gap-1.5 text-xs font-semibold text-teal-800 bg-teal-50 border border-teal-200 px-3 py-1 rounded-full">
            <BookOpen className="w-3.5 h-3.5" aria-hidden="true" />
            <span>Knowledge Base &amp; Decoder Rules</span>
          </div>
          <h1 className="text-2xl sm:text-4xl font-bold tracking-tight text-zinc-900">
            EPFO Rejection Reasons &amp; Resolution Rules
          </h1>
          <p className="text-xs sm:text-sm text-zinc-600 max-w-2xl leading-relaxed">
            Browse official rejection remark definitions, plain-language translations, action checklists, and policy circulars.
          </p>
        </div>

        {/* Rejection Codes List */}
        <section className="space-y-4">
          <h2 className="text-lg sm:text-xl font-bold text-zinc-900 flex items-center gap-2">
            <HelpCircle className="w-5 h-5 text-teal-700" aria-hidden="true" />
            Published Rejection Decoder Catalog
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
                    <span>Est: {rule.estimated_days}</span>
                  </div>
                </CardHeader>

                <CardContent className="p-4 sm:p-6 space-y-4 text-xs sm:text-sm">
                  <div>
                    <div className="text-[11px] uppercase font-bold text-zinc-400 mb-1">
                      Official Portal Remark Text
                    </div>
                    <p className="font-mono text-zinc-800 bg-slate-50 border border-slate-200 p-3 rounded-lg">
                      &ldquo;{rule.official_text}&rdquo;
                    </p>
                  </div>

                  <div className="space-y-2">
                    <div className="text-xs font-bold text-zinc-900">
                      Step-by-Step Resolution Steps:
                    </div>
                    <ol className="space-y-1.5 list-decimal list-inside text-zinc-700">
                      {rule.fix_steps.map((step, idx) => (
                        <li key={idx} className="leading-relaxed">
                          {step}
                        </li>
                      ))}
                    </ol>
                  </div>

                  <div className="border-t border-slate-100 pt-3 flex flex-wrap items-center justify-between gap-3 text-xs text-zinc-500">
                    <div className="flex items-center gap-2">
                      <ShieldCheck className="w-4 h-4 text-teal-700" aria-hidden="true" />
                      <span>Reference: <strong>{rule.source_reference}</strong></span>
                      <span>•</span>
                      <span>Reviewed: {formatDisplayDate(rule.reviewed_at)}</span>
                    </div>

                    <a
                      href={rule.source_url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-teal-700 hover:text-teal-900 font-semibold inline-flex items-center gap-1 underline"
                    >
                      Official Source <ExternalLink className="w-3 h-3" aria-hidden="true" />
                    </a>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* Glossary of Terms */}
        <section className="space-y-4 pt-4 border-t border-slate-200">
          <h2 className="text-lg sm:text-xl font-bold text-zinc-900">
            Key EPFO Terminology Glossary
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {GLOSSARY_ITEMS.map((item, idx) => (
              <Card key={idx} className="border-slate-200 bg-white p-5 rounded-xl space-y-1.5 shadow-2xs">
                <h3 className="font-bold text-sm text-zinc-900">{item.term}</h3>
                <p className="text-xs text-zinc-600 leading-relaxed">{item.description}</p>
              </Card>
            ))}
          </div>
        </section>

        {/* CTA to Login */}
        <div className="bg-gradient-to-r from-teal-800 to-teal-950 text-white rounded-2xl p-6 sm:p-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="space-y-1 text-center sm:text-left">
            <h2 className="text-lg sm:text-xl font-bold">Have a rejected claim to decode?</h2>
            <p className="text-xs sm:text-sm text-teal-200">
              Sign in with your UAN to decode your specific rejection notice and initiate a guided resubmission.
            </p>
          </div>
          <Link
            href="/login"
            className="bg-emerald-500 hover:bg-emerald-600 text-slate-950 font-bold px-6 py-2.5 rounded-lg text-xs sm:text-sm inline-flex items-center gap-1.5 shrink-0"
          >
            Access My Claims <ArrowRight className="w-4 h-4" aria-hidden="true" />
          </Link>
        </div>
      </main>

      <SiteFooter />
    </div>
  );
}
