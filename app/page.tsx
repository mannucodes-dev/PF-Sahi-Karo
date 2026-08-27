import React from "react";
import Link from "next/link";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { RejectionSearchTool } from "@/components/rejection-search-tool";
import { PfTaxCalculator } from "@/components/pf-tax-calculator";
import { EpfoOfficeLocator } from "@/components/epfo-office-locator";
import {
  ShieldCheck,
  ArrowRight,
  Sparkles,
  FileSearch,
  CheckCircle2,
  AlertCircle,
  BookOpen,
  Calculator,
  MapPin,
  ExternalLink,
} from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { getServerTranslation } from "@/lib/i18n/server";

export default async function LandingPage() {
  const { t } = await getServerTranslation();

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 text-zinc-900">
      <SiteHeader />

      <main id="main-content" className="flex-1 space-y-12 sm:space-y-16 pb-16">
        {/* Hero Section */}
        <section className="bg-gradient-to-b from-teal-900 via-teal-850 to-teal-950 text-white pt-12 sm:pt-20 pb-16 sm:pb-24 px-4 sm:px-6 relative overflow-hidden">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-teal-500/15 via-transparent to-transparent pointer-events-none" />

          <div className="max-w-4xl mx-auto text-center space-y-6 relative z-10">
            {/* National Initiative Badge */}
            <div className="inline-flex items-center gap-2 bg-teal-800/90 border border-teal-600/70 px-4 py-1.5 rounded-full text-xs sm:text-sm font-semibold text-teal-200 shadow-sm">
              <Sparkles className="w-4 h-4 text-teal-300" aria-hidden="true" />
              <span>{t.hero.badge}</span>
            </div>

            {/* Main Headline */}
            <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-white leading-tight sm:leading-tight">
              {t.hero.headline}
            </h1>

            {/* Subheadline */}
            <p className="text-base sm:text-xl text-teal-100/95 max-w-3xl mx-auto leading-relaxed font-normal">
              {t.hero.subheadline}
            </p>

            {/* Primary Action Buttons */}
            <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4">
              <Link
                href="/dashboard"
                className="w-full sm:w-auto bg-emerald-500 hover:bg-emerald-600 text-slate-950 font-extrabold px-8 py-4 rounded-xl shadow-lg shadow-emerald-950/25 inline-flex items-center justify-center gap-2.5 transition-transform active:scale-[0.98] text-base cursor-pointer"
              >
                <span>{t.hero.ctaPrimary}</span>
                <ArrowRight className="w-4 h-4" aria-hidden="true" />
              </Link>
              <Link
                href="#instant-decoder"
                className="w-full sm:w-auto bg-white/10 hover:bg-white/20 text-white border border-white/25 font-bold px-6 py-4 rounded-xl inline-flex items-center justify-center gap-2 transition-colors text-base"
              >
                <FileSearch className="w-4 h-4 text-teal-300" aria-hidden="true" />
                <span>{t.hero.ctaSecondary}</span>
              </Link>
            </div>

            {/* Impact Metric Counters */}
            <div className="pt-8 grid grid-cols-3 gap-3 sm:gap-6 border-t border-teal-800/80 max-w-2xl mx-auto">
              <div className="space-y-0.5">
                <span className="font-extrabold text-xl sm:text-3xl text-white block">
                  {t.hero.statsSubscribers}
                </span>
                <span className="text-xs sm:text-sm text-teal-200/80 block">
                  {t.hero.statsSubscribersLabel}
                </span>
              </div>
              <div className="space-y-0.5 border-x border-teal-800/80">
                <span className="font-extrabold text-xl sm:text-3xl text-rose-400 block">
                  {t.hero.statsRejection}
                </span>
                <span className="text-xs sm:text-sm text-teal-200/80 block">
                  {t.hero.statsRejectionLabel}
                </span>
              </div>
              <div className="space-y-0.5">
                <span className="font-extrabold text-xl sm:text-3xl text-emerald-400 block">
                  {t.hero.statsZeroCost}
                </span>
                <span className="text-xs sm:text-sm text-teal-200/80 block">
                  {t.hero.statsZeroCostLabel}
                </span>
              </div>
            </div>
          </div>
        </section>

        {/* Feature 1: Instant Public Rejection Remark Decoder (No Login Needed) */}
        <div className="max-w-5xl mx-auto px-4 sm:px-6">
          <RejectionSearchTool />
        </div>

        {/* 3-Step Process */}
        <section className="max-w-5xl mx-auto px-4 sm:px-6">
          <div className="text-center space-y-2 mb-8 sm:mb-12">
            <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-zinc-900">
              {t.steps.title}
            </h2>
            <p className="text-sm sm:text-base text-zinc-600 max-w-lg mx-auto">
              {t.steps.subtitle}
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            <Card className="border-slate-200/90 bg-white shadow-2xs rounded-2xl p-6 space-y-3">
              <div className="w-11 h-11 rounded-xl bg-teal-100 text-teal-900 flex items-center justify-center font-bold text-base shadow-2xs">
                1
              </div>
              <h3 className="font-bold text-base sm:text-lg text-zinc-900">
                {t.steps.step1Title}
              </h3>
              <p className="text-sm text-zinc-600 leading-relaxed">
                {t.steps.step1Desc}
              </p>
            </Card>

            <Card className="border-slate-200/90 bg-white shadow-2xs rounded-2xl p-6 space-y-3">
              <div className="w-11 h-11 rounded-xl bg-teal-100 text-teal-900 flex items-center justify-center font-bold text-base shadow-2xs">
                2
              </div>
              <h3 className="font-bold text-base sm:text-lg text-zinc-900">
                {t.steps.step2Title}
              </h3>
              <p className="text-sm text-zinc-600 leading-relaxed">
                {t.steps.step2Desc}
              </p>
            </Card>

            <Card className="border-slate-200/90 bg-white shadow-2xs rounded-2xl p-6 space-y-3">
              <div className="w-11 h-11 rounded-xl bg-teal-100 text-teal-900 flex items-center justify-center font-bold text-base shadow-2xs">
                3
              </div>
              <h3 className="font-bold text-base sm:text-lg text-zinc-900">
                {t.steps.step3Title}
              </h3>
              <p className="text-sm text-zinc-600 leading-relaxed">
                {t.steps.step3Desc}
              </p>
            </Card>
          </div>
        </section>

        {/* Feature 2: PF TDS & Net Settlement Tax Calculator */}
        <div className="max-w-5xl mx-auto px-4 sm:px-6">
          <PfTaxCalculator />
        </div>

        {/* Feature 3: EPFO Regional Office & PRO Directory */}
        <div className="max-w-5xl mx-auto px-4 sm:px-6">
          <EpfoOfficeLocator />
        </div>

        {/* Trust Boundaries & Scope */}
        <section className="max-w-5xl mx-auto px-4 sm:px-6">
          <Card className="border-slate-200 bg-white rounded-2xl overflow-hidden shadow-sm">
            <div className="bg-slate-900 text-white p-6 sm:p-8 space-y-2">
              <h2 className="text-xl sm:text-2xl font-bold tracking-tight flex items-center gap-2.5">
                <ShieldCheck className="w-6 h-6 text-teal-400" aria-hidden="true" />
                {t.trust.title}
              </h2>
              <p className="text-xs sm:text-sm text-slate-300">
                {t.trust.subtitle}
              </p>
            </div>

            <CardContent className="p-6 sm:p-8 grid grid-cols-1 sm:grid-cols-2 gap-6 text-sm">
              {/* What we do */}
              <div className="space-y-3">
                <h3 className="font-bold text-emerald-800 text-base flex items-center gap-2">
                  <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" aria-hidden="true" />
                  {t.trust.weProvideTitle}
                </h3>
                <ul className="space-y-2 text-zinc-700 list-disc list-inside leading-relaxed">
                  {t.trust.weProvideItems.map((item, idx) => (
                    <li key={idx}>{item}</li>
                  ))}
                </ul>
              </div>

              {/* What we cannot do */}
              <div className="space-y-3">
                <h3 className="font-bold text-rose-800 text-base flex items-center gap-2">
                  <AlertCircle className="w-5 h-5 text-rose-600 shrink-0" aria-hidden="true" />
                  {t.trust.weDoNotTitle}
                </h3>
                <ul className="space-y-2 text-zinc-700 list-disc list-inside leading-relaxed">
                  {t.trust.weDoNotItems.map((item, idx) => (
                    <li key={idx}>{item}</li>
                  ))}
                </ul>
              </div>
            </CardContent>
          </Card>
        </section>
      </main>

      <SiteFooter />
    </div>
  );
}
