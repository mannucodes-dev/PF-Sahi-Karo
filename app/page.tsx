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
  AlertTriangle,
  Search,
  Zap,
  FileUp,
  Image as ImageIcon,
} from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { getServerTranslation } from "@/lib/i18n/server";

export default async function LandingPage() {
  const { t } = await getServerTranslation();

  return (
    <div className="min-h-screen flex flex-col bg-[#fafbfb] text-slate-900 antialiased selection:bg-teal-100 selection:text-teal-900">
      <SiteHeader />

      {/* Main Hero Section matching reference image exactly */}
      <main className="w-full px-4 sm:px-8 lg:px-12 py-8 sm:py-12 lg:py-16 max-w-[1240px] mx-auto min-h-[70vh] flex flex-col justify-center relative overflow-hidden">
        {/* Atmospheric Glow Elements */}
        <div className="absolute top-0 right-0 w-[550px] h-[550px] bg-gradient-to-br from-teal-200/35 to-transparent rounded-full blur-3xl pointer-events-none -z-10" />
        <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-gradient-to-tr from-amber-200/40 to-transparent rounded-full blur-3xl pointer-events-none -z-10" />

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
          {/* Left Column (Hero Text Content) */}
          <div className="lg:col-span-7 flex flex-col z-10">
            {/* National Rejection Rate Warning Pill */}
            <div className="inline-flex items-center gap-1.5 bg-[#fef2f2] border border-[#fecaca] px-3.5 py-1 rounded-full text-[11px] font-bold text-[#b91c1c] uppercase tracking-wider mb-5 sm:mb-6 w-max shadow-2xs">
              <AlertTriangle className="w-3.5 h-3.5 text-[#dc2626] stroke-[2.25]" />
              <span>34% NATIONAL REJECTION RATE</span>
            </div>

            {/* Main Headline - Exactly 3 distinct lines matching reference image */}
            <h1 className="text-[28px] sm:text-4xl md:text-[44px] lg:text-[50px] font-extrabold text-slate-900 leading-[1.14] tracking-tight mb-5 sm:mb-6">
              <span className="block">Claim Rejected by EPFO?</span>
              <span className="block">
                <span className="text-[#005f56]">We Decode Why</span> and Help
              </span>
              <span className="block">You Fix It.</span>
            </h1>

            {/* Subtext */}
            <p className="text-[15px] sm:text-[16px] md:text-[17px] text-slate-600 leading-relaxed max-w-xl mb-7 sm:mb-8">
              Navigating Provident Fund rejections can be confusing. Upload your rejection notice, and our secure, civic tech tool will instantly explain the issue and guide you on the exact steps to resolution.
            </p>

            {/* Dual CTA Action Buttons */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3.5 mb-8 sm:mb-10 w-full sm:w-auto">
              <a
                href="#instant-decoder"
                className="bg-[#005953] hover:bg-[#004742] text-white px-5 sm:px-6 py-3 rounded-lg font-bold text-sm sm:text-base flex items-center justify-center gap-2.5 h-[46px] sm:h-[44px] shadow-sm transition-all cursor-pointer whitespace-nowrap"
              >
                <Search className="w-4 h-4 text-white stroke-[2.5]" />
                <span>Decode Rejection Notice</span>
              </a>

              <Link
                href="/dashboard"
                className="bg-[#fa9d1b] hover:bg-[#f59510] text-[#291500] px-5 sm:px-6 py-3 rounded-lg font-bold text-sm sm:text-base flex items-center justify-center gap-2 h-[46px] sm:h-[44px] shadow-sm transition-all cursor-pointer whitespace-nowrap"
              >
                <Zap className="w-4 h-4 text-[#291500] fill-[#291500]" />
                <span>Judge Demo Evaluation</span>
              </Link>
            </div>

            {/* Stats Row */}
            <div className="flex items-center gap-6 sm:gap-8 pt-6 border-t border-slate-200/80 max-w-md">
              <div>
                <div className="text-2xl sm:text-[26px] lg:text-[28px] font-extrabold text-[#005f56] tracking-tight">
                  29+ Crore
                </div>
                <div className="text-xs sm:text-sm text-slate-500 font-normal mt-0.5">
                  Active Members
                </div>
              </div>
              <div className="h-10 w-px bg-slate-200" />
              <div>
                <div className="text-2xl sm:text-[26px] lg:text-[28px] font-extrabold text-[#005f56] tracking-tight">
                  ₹0
                </div>
                <div className="text-xs sm:text-sm text-slate-500 font-normal mt-0.5">
                  Free Public Service
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Upload Notice Card - Positioned in line with headline */}
          <div className="lg:col-span-5 relative z-10 w-full max-w-[430px] mx-auto lg:ml-auto mt-6 lg:mt-2">
            <div className="bg-white rounded-2xl p-7 sm:p-9 lg:p-10 shadow-[0_20px_50px_rgba(0,0,0,0.06)] border border-slate-100 relative text-center">
              {/* Floating Top-Right Shield Badge */}
              <div className="absolute -top-3.5 -right-3.5 w-11 h-11 bg-white rounded-full shadow-md border border-slate-100 flex items-center justify-center">
                <ShieldCheck className="w-6 h-6 text-emerald-600 stroke-[2.25]" />
              </div>

              {/* Upload Document Icon */}
              <div className="w-20 h-20 bg-slate-100/90 rounded-full flex items-center justify-center mx-auto mb-6">
                <FileUp className="w-8 h-8 text-slate-500 stroke-[1.75]" />
              </div>

              {/* Title */}
              <h2 className="text-2xl font-bold text-slate-900 mb-2">
                Upload Notice
              </h2>

              {/* Description */}
              <p className="text-sm text-slate-500 leading-relaxed max-w-[270px] mx-auto mb-6">
                Upload PDF or Image of your EPFO rejection message for instant analysis.
              </p>

              {/* Select File Button */}
              <div className="w-full space-y-3">
                <label
                  htmlFor="hero-upload-file"
                  className="w-full bg-[#e2e8f0]/90 hover:bg-[#e2e8f0] text-slate-800 py-3 px-4 rounded-lg font-medium text-sm flex items-center justify-center gap-2 border border-slate-300/50 shadow-2xs cursor-pointer transition-colors"
                >
                  <ImageIcon className="w-4 h-4 text-slate-700" />
                  <span>Select File</span>
                </label>
                <input
                  type="file"
                  id="hero-upload-file"
                  className="sr-only"
                  accept=".pdf,image/*"
                />

                <a
                  href="#instant-decoder"
                  className="block text-[11px] font-bold text-slate-500 uppercase tracking-wider hover:text-[#005f56] transition-colors pt-1"
                >
                  OR PASTE REJECTION TEXT BELOW
                </a>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Embedded Tools: TDS Calculator directly below Hero, then Instant Decoder, Steps, Offices */}
      <div className="w-full space-y-16 pb-16">

        {/* Feature 1: Section 192A PF TDS & Net Settlement Tax Calculator (Directly below Hero) */}
        <div className="max-w-[1240px] mx-auto px-4 sm:px-8 lg:px-12 pt-2">
          <PfTaxCalculator />
        </div>

        {/* Feature 2: Instant Public Rejection Remark Decoder (No Login Needed) */}
        <div className="max-w-[1240px] mx-auto px-4 sm:px-8 lg:px-12">
          <RejectionSearchTool />
        </div>

        {/* 3-Step Process */}
        <section className="max-w-[1240px] mx-auto px-4 sm:px-8 lg:px-12">
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

        {/* Feature 3: EPFO Regional Office & PRO Directory */}
        <div className="max-w-[1240px] mx-auto px-4 sm:px-8 lg:px-12">
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
      </div>

      <SiteFooter />
    </div>
  );
}
