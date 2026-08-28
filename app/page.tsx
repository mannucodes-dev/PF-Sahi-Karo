import React from "react";
import Link from "next/link";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { RejectionSearchTool } from "@/components/rejection-search-tool";
import { HeroNoticeUpload } from "@/components/hero-notice-upload";
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
  Check,
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

          {/* Right Column: Interactive Upload Notice Card */}
          <div className="lg:col-span-5 relative z-10 w-full max-w-[440px] mx-auto lg:ml-auto mt-6 lg:mt-2">
            <HeroNoticeUpload />
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

        {/* Trust Boundaries & Scope Section matching reference card design */}
        <section className="max-w-[1240px] mx-auto px-4 sm:px-8 lg:px-12">
          <div className="bg-white rounded-2xl border border-slate-200/90 shadow-[0_10px_35px_rgba(0,0,0,0.06)] overflow-hidden">
            {/* Dark Navy Header Banner */}
            <div className="bg-[#0b1b36] text-white px-6 sm:px-8 lg:px-10 py-6 sm:py-7">
              <div className="flex items-center gap-4 sm:gap-5">
                {/* Shield Outline with Inner Shield Outline */}
                <div className="shrink-0">
                  <svg
                    className="w-10 h-10 sm:w-11 sm:h-11 text-white"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.8"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    aria-hidden="true"
                  >
                    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
                    <path
                      d="M12 18.5s5.5-2.8 5.5-7V6.5l-5.5-2-5.5 2v5c0 4.2 5.5 7 5.5 7z"
                      strokeWidth="1.3"
                    />
                  </svg>
                </div>

                <div>
                  <h2 className="text-xl sm:text-2xl lg:text-[25px] font-bold text-white tracking-tight leading-tight">
                    {t.trust.title}
                  </h2>
                  <p className="text-xs sm:text-sm text-slate-300 font-normal mt-1 leading-normal">
                    {t.trust.subtitle}
                  </p>
                </div>
              </div>
            </div>

            {/* Two-Column Content Area */}
            <div className="p-6 sm:p-8 lg:p-10 grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-0">
              {/* Left Column: What PF Sahi Karo provides */}
              <div className="md:pr-8 lg:pr-12">
                {/* Column Header */}
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-6 h-6 rounded-full bg-[#237834] text-white flex items-center justify-center shrink-0 shadow-2xs">
                    <Check className="w-3.5 h-3.5 text-white stroke-[3.2]" />
                  </div>
                  <h3 className="text-lg sm:text-xl font-bold text-slate-900 tracking-tight">
                    {t.trust.weProvideTitle}
                  </h3>
                </div>

                {/* List Items */}
                <ul className="space-y-4 sm:space-y-5">
                  {t.trust.weProvideItems.map((item, idx) => (
                    <li key={idx} className="flex items-start gap-3 sm:gap-3.5">
                      <div className="w-5 h-5 rounded-full bg-[#237834] text-white flex items-center justify-center shrink-0 mt-0.5 shadow-2xs">
                        <Check className="w-3 h-3 text-white stroke-[3.2]" />
                      </div>
                      <span className="text-[14.5px] sm:text-[15px] text-slate-800 leading-relaxed font-normal">
                        {item}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Right Column: What PF Sahi Karo does NOT do */}
              <div className="md:border-l border-slate-200/90 md:pl-8 lg:pl-12">
                {/* Column Header */}
                <div className="flex items-center gap-3 mb-6">
                  <svg
                    className="w-6 h-6 shrink-0"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    aria-hidden="true"
                  >
                    <path
                      d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"
                      fill="#b91c1c"
                    />
                    <line
                      x1="12"
                      y1="9"
                      x2="12"
                      y2="13.5"
                      stroke="white"
                      strokeWidth="2.2"
                      strokeLinecap="round"
                    />
                    <circle cx="12" cy="17" r="1.1" fill="white" />
                  </svg>
                  <h3 className="text-lg sm:text-xl font-bold text-slate-900 tracking-tight">
                    {t.trust.weDoNotTitle}
                  </h3>
                </div>

                {/* List Items */}
                <ul className="space-y-4 sm:space-y-5">
                  {t.trust.weDoNotItems.map((item, idx) => (
                    <li key={idx} className="flex items-start gap-3 sm:gap-3.5">
                      <svg
                        className="w-5 h-5 shrink-0 mt-0.5"
                        viewBox="0 0 24 24"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                        aria-hidden="true"
                      >
                        <path
                          d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"
                          fill="#b91c1c"
                        />
                        <line
                          x1="12"
                          y1="9"
                          x2="12"
                          y2="13.5"
                          stroke="white"
                          strokeWidth="2.2"
                          strokeLinecap="round"
                        />
                        <circle cx="12" cy="17" r="1.1" fill="white" />
                      </svg>
                      <span className="text-[14.5px] sm:text-[15px] text-slate-800 leading-relaxed font-normal">
                        {item}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </section>
      </div>

      <SiteFooter />
    </div>
  );
}
