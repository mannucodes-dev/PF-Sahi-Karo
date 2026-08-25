import React from "react";
import Link from "next/link";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import {
  ShieldCheck,
  ArrowRight,
  Sparkles,
  FileSearch,
  CheckCircle2,
  AlertCircle,
  Clock,
  HelpCircle,
  ExternalLink,
  BookOpen,
} from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { getAllBuiltinRemarkCodes } from "@/lib/data/remark-codes";

export default async function LandingPage() {
  const remarkCodes = getAllBuiltinRemarkCodes("en");

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 text-zinc-900">
      <SiteHeader />

      <main id="main-content" className="flex-1 space-y-12 sm:space-y-16 pb-12">
        {/* Hero Section */}
        <section className="bg-gradient-to-b from-teal-900 via-teal-850 to-teal-950 text-white pt-12 sm:pt-20 pb-16 sm:pb-24 px-4 sm:px-6 relative overflow-hidden">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-teal-500/10 via-transparent to-transparent pointer-events-none" />

          <div className="max-w-4xl mx-auto text-center space-y-6 relative z-10">
            <div className="inline-flex items-center gap-2 bg-teal-800/80 border border-teal-600/60 px-3.5 py-1.5 rounded-full text-xs font-semibold text-teal-200 shadow-sm">
              <Sparkles className="w-3.5 h-3.5 text-teal-300" aria-hidden="true" />
              <span>Independent Citizen Guidance Service for EPF Members</span>
            </div>

            <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-white leading-tight sm:leading-tight">
              Understand Why Your EPFO Claim Was Rejected — And How to Fix It.
            </h1>

            <p className="text-sm sm:text-lg text-teal-100/90 max-w-2xl mx-auto leading-relaxed">
              We translate cryptic rejection remarks into plain-language steps, verified against official EPFO circulars. Fix your records and prepare a compliant resubmission.
            </p>

            <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4">
              <Link
                href="/login"
                className="w-full sm:w-auto bg-emerald-500 hover:bg-emerald-600 text-slate-950 font-bold px-8 py-3.5 rounded-xl shadow-lg shadow-emerald-950/20 inline-flex items-center justify-center gap-2 transition-transform active:scale-[0.98] text-sm sm:text-base cursor-pointer"
              >
                Access My Claims <ArrowRight className="w-4 h-4" aria-hidden="true" />
              </Link>
              <Link
                href="/help"
                className="w-full sm:w-auto bg-white/10 hover:bg-white/20 text-white border border-white/20 font-semibold px-6 py-3.5 rounded-xl inline-flex items-center justify-center gap-2 transition-colors text-sm sm:text-base"
              >
                <BookOpen className="w-4 h-4" aria-hidden="true" />
                Browse Common Rejection Reasons
              </Link>
            </div>
          </div>
        </section>

        {/* 3-Step Process */}
        <section className="max-w-5xl mx-auto px-4 sm:px-6">
          <div className="text-center space-y-2 mb-8 sm:mb-12">
            <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-zinc-900">
              How PF Sahi Karo Helps You
            </h2>
            <p className="text-xs sm:text-sm text-zinc-500 max-w-md mx-auto">
              A transparent, step-by-step resolution path for rejected PF, Pension, and Transfer claims.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            <Card className="border-slate-200/90 bg-white shadow-2xs rounded-2xl p-6 space-y-3">
              <div className="w-10 h-10 rounded-xl bg-teal-100 text-teal-800 flex items-center justify-center font-bold text-sm">
                1
              </div>
              <h3 className="font-bold text-base text-zinc-900">Plain Language Decode</h3>
              <p className="text-xs sm:text-sm text-zinc-600 leading-relaxed">
                Raw EPFO portal remarks like &ldquo;Name mismatch with Aadhaar&rdquo; are decoded into clear explanations with zero bureaucratic jargon.
              </p>
            </Card>

            <Card className="border-slate-200/90 bg-white shadow-2xs rounded-2xl p-6 space-y-3">
              <div className="w-10 h-10 rounded-xl bg-teal-100 text-teal-800 flex items-center justify-center font-bold text-sm">
                2
              </div>
              <h3 className="font-bold text-base text-zinc-900">Actionable Checklist</h3>
              <p className="text-xs sm:text-sm text-zinc-600 leading-relaxed">
                Get concrete instructions on whether you need an online modification, an employer DSC approval, or a Joint Declaration form.
              </p>
            </Card>

            <Card className="border-slate-200/90 bg-white shadow-2xs rounded-2xl p-6 space-y-3">
              <div className="w-10 h-10 rounded-xl bg-teal-100 text-teal-800 flex items-center justify-center font-bold text-sm">
                3
              </div>
              <h3 className="font-bold text-base text-zinc-900">Guided Resubmission</h3>
              <p className="text-xs sm:text-sm text-zinc-600 leading-relaxed">
                Verify each rectification step before resubmitting your claim to minimize the risk of secondary rejections.
              </p>
            </Card>
          </div>
        </section>

        {/* Clear Trust Boundaries & Scope */}
        <section className="max-w-5xl mx-auto px-4 sm:px-6">
          <Card className="border-slate-200 bg-white rounded-2xl overflow-hidden shadow-sm">
            <div className="bg-slate-900 text-white p-6 sm:p-8 space-y-2">
              <h2 className="text-xl sm:text-2xl font-bold tracking-tight flex items-center gap-2.5">
                <ShieldCheck className="w-6 h-6 text-teal-400" aria-hidden="true" />
                Service Scope, Trust &amp; Boundaries
              </h2>
              <p className="text-xs sm:text-sm text-slate-300">
                Complete transparency about what PF Sahi Karo can and cannot do for you.
              </p>
            </div>

            <CardContent className="p-6 sm:p-8 grid grid-cols-1 sm:grid-cols-2 gap-6 text-xs sm:text-sm">
              {/* What we do */}
              <div className="space-y-3">
                <h3 className="font-bold text-zinc-900 text-sm sm:text-base flex items-center gap-2 text-emerald-800">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" aria-hidden="true" />
                  What PF Sahi Karo provides:
                </h3>
                <ul className="space-y-2 text-zinc-700 list-disc list-inside">
                  <li>Decodes cryptic EPFO rejection codes based on official published circulars.</li>
                  <li>Guides you on exact portal forms (Joint Declaration, Mark Exit, Modify Details).</li>
                  <li>Provides bilingual guidance in English and Hindi.</li>
                  <li>Maintains private, secure document checklists with zero third-party ad trackers.</li>
                </ul>
              </div>

              {/* What we cannot do */}
              <div className="space-y-3">
                <h3 className="font-bold text-zinc-900 text-sm sm:text-base flex items-center gap-2 text-rose-800">
                  <AlertCircle className="w-4 h-4 text-rose-600 shrink-0" aria-hidden="true" />
                  What PF Sahi Karo does NOT do:
                </h3>
                <ul className="space-y-2 text-zinc-700 list-disc list-inside">
                  <li>We do <strong>not</strong> make official claim approval or settlement decisions.</li>
                  <li>We can <strong>not</strong> bypass mandatory employer DSC authorization.</li>
                  <li>We are <strong>not</strong> an official EPFO office or affiliated government agency.</li>
                  <li>We never ask for or store full Aadhaar numbers or banking passwords.</li>
                </ul>
              </div>
            </CardContent>
          </Card>
        </section>

        {/* Featured Remark Codes */}
        <section className="max-w-5xl mx-auto px-4 sm:px-6 space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
            <div>
              <h2 className="text-xl sm:text-2xl font-bold tracking-tight text-zinc-900 flex items-center gap-2">
                <FileSearch className="w-5 h-5 text-teal-700" aria-hidden="true" />
                Verified Rejection Remark Directory
              </h2>
              <p className="text-xs text-zinc-500">
                Sample rules maintained by the PF Sahi Karo compliance board.
              </p>
            </div>
            <Link
              href="/help"
              className="text-xs font-semibold text-teal-700 hover:text-teal-900 inline-flex items-center gap-1"
            >
              View all rejection reasons <ArrowRight className="w-3.5 h-3.5" aria-hidden="true" />
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {remarkCodes.slice(0, 4).map((rule) => (
              <Card key={rule.code} className="border-slate-200 bg-white p-5 rounded-xl space-y-2.5 shadow-2xs">
                <div className="flex items-center justify-between">
                  <span className="text-[11px] font-mono font-bold text-teal-900 bg-teal-50 border border-teal-200 px-2 py-0.5 rounded">
                    {rule.code}
                  </span>
                  <span className="text-[11px] text-zinc-500 flex items-center gap-1">
                    <Clock className="w-3 h-3" aria-hidden="true" /> {rule.estimated_days}
                  </span>
                </div>
                <h3 className="font-semibold text-sm text-zinc-900 leading-snug">
                  {rule.plain_text}
                </h3>
                <p className="text-xs text-zinc-500 font-mono line-clamp-1 border-t border-slate-100 pt-2">
                  Portal Text: &ldquo;{rule.official_text}&rdquo;
                </p>
              </Card>
            ))}
          </div>
        </section>

        {/* Official EPFO Helpdesk Notice */}
        <section className="max-w-5xl mx-auto px-4 sm:px-6">
          <div className="bg-slate-100 border border-slate-200 rounded-2xl p-6 sm:p-8 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
            <div className="space-y-1.5 max-w-xl">
              <h2 className="font-bold text-base sm:text-lg text-zinc-900 flex items-center gap-2">
                <HelpCircle className="w-5 h-5 text-teal-700 shrink-0" aria-hidden="true" />
                Need Official EPFO Grievance Registration?
              </h2>
              <p className="text-xs sm:text-sm text-zinc-600 leading-relaxed">
                If your claim has been unfairly withheld or your employer is unresponsive, you can lodge an official grievance directly on the Government of India EPFiGMS portal.
              </p>
            </div>
            <a
              href="https://epfigms.gov.in"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-white border border-slate-300 hover:bg-slate-50 text-zinc-800 font-semibold px-5 py-2.5 rounded-lg shadow-2xs text-xs sm:text-sm inline-flex items-center gap-2 shrink-0 transition-colors"
            >
              Go to EPFiGMS <ExternalLink className="w-4 h-4 text-zinc-500" aria-hidden="true" />
            </a>
          </div>
        </section>
      </main>

      <SiteFooter />
    </div>
  );
}
