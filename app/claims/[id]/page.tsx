import React from "react";
import Link from "next/link";
import { requireUser } from "@/lib/auth/require-user";
import { getClaimById } from "@/lib/data/claims";
import { getEventsByClaimId } from "@/lib/data/claim-events";
import { StatusBadge } from "@/components/status-badge";
import { RejectionScenarioView } from "@/components/rejection-scenario-view";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { buttonVariants } from "@/components/ui/button";
import { LanguageSwitcher } from "@/components/language-switcher";
import {
  ArrowLeft,
  Calendar,
  ShieldCheck,
  CheckCircle2,
  Clock,
  Landmark,
  FileSearch,
} from "lucide-react";
import { cn, formatDisplayDate, formatCurrency } from "@/lib/utils";
import { getServerTranslation } from "@/lib/i18n/server";

interface PageProps {
  params: Promise<{ id: string }>;
}

export default async function ClaimDetailPage({ params }: PageProps) {
  const user = await requireUser("/dashboard");
  const { id } = await params;
  const { t } = await getServerTranslation();

  const claim = await getClaimById(id, user.id);
  const events = claim ? await getEventsByClaimId(claim.id) : [];

  if (!claim) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center p-6 text-zinc-900">
        <Card className="max-w-md w-full text-center p-6 border-slate-200 bg-white rounded-2xl shadow-sm space-y-4">
          <div className="w-12 h-12 mx-auto rounded-full bg-slate-100 text-slate-700 flex items-center justify-center">
            <FileSearch className="w-6 h-6" aria-hidden="true" />
          </div>
          <div className="space-y-1">
            <h1 className="text-lg font-bold text-zinc-900">Claim Record Not Found</h1>
            <p className="text-xs text-zinc-600">
              No claim matching ID &ldquo;{id}&rdquo; was found under your verified member account.
            </p>
          </div>
          <div className="pt-2">
            <Link
              href="/dashboard"
              className={cn(buttonVariants({ variant: "outline" }), "w-full text-xs")}
            >
              <ArrowLeft className="w-4 h-4 mr-2" aria-hidden="true" /> {t.common.backToDashboard}
            </Link>
          </div>
        </Card>
      </div>
    );
  }

  const isRejected = claim.status === "rejected";
  const isApproved = claim.status === "approved";
  const isPending = claim.status === "under_review" || claim.status === "submitted" || claim.status === "resubmitted";

  return (
    <div className="min-h-screen bg-slate-50 text-zinc-900 flex flex-col">
      {/* Top Navbar */}
      <header className="sticky top-0 z-30 bg-white/95 backdrop-blur-md border-b border-slate-200/80">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 h-16 sm:h-18 flex items-center justify-between">
          <Link
            href="/dashboard"
            className="text-zinc-600 hover:text-zinc-900 flex items-center gap-1.5 text-xs sm:text-sm font-bold py-1.5 px-3 rounded-lg hover:bg-slate-100 transition-colors focus:ring-2 focus:ring-teal-600"
          >
            <ArrowLeft className="w-4 h-4" aria-hidden="true" /> {t.common.backToDashboard}
          </Link>

          <div className="flex items-center gap-3">
            <LanguageSwitcher />
            <div className="flex items-center gap-1.5 text-xs text-zinc-500 hidden sm:flex">
              <ShieldCheck className="w-4 h-4 text-teal-700" aria-hidden="true" />
              <span className="font-bold text-zinc-800">PF Sahi Karo</span>
            </div>
          </div>
        </div>
      </header>

      {/* Main Container */}
      <main id="main-content" className="max-w-4xl w-full mx-auto px-4 sm:px-6 py-6 sm:py-8 space-y-6 flex-1">
        {/* 1. Claim Summary Header Card */}
        <Card className="border-slate-200 bg-white shadow-sm overflow-hidden rounded-2xl">
          <CardContent className="p-5 sm:p-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-100 pb-5">
              <div className="space-y-1.5">
                <div className="flex flex-wrap items-center gap-2.5">
                  <h1 className="text-xl sm:text-3xl font-extrabold text-zinc-900 tracking-tight">
                    {claim.claim_type}
                  </h1>
                  <StatusBadge status={claim.status} />
                </div>
                <div className="text-xs sm:text-sm text-zinc-500 font-mono flex items-center gap-2">
                  <span>Claim Ref: <strong className="text-zinc-800 font-bold">{claim.external_claim_id || claim.id}</strong></span>
                </div>
              </div>

              {/* Amount Display */}
              <div className="text-left sm:text-right bg-slate-50 sm:bg-transparent p-3 sm:p-0 rounded-xl shrink-0">
                <div className="text-xs uppercase tracking-wider text-zinc-400 font-bold">
                  {t.common.claimAmount}
                </div>
                <div className="text-2xl sm:text-3xl font-extrabold text-zinc-900 flex items-center sm:justify-end font-mono">
                  {formatCurrency(claim.amount)}
                </div>
              </div>
            </div>

            {/* Key Dates & Meta Info */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-4 text-xs sm:text-sm text-zinc-600">
              <div className="flex items-center gap-2">
                <Calendar className="w-4 h-4 text-slate-400 shrink-0" aria-hidden="true" />
                <span>
                  {t.common.submittedDate}: <strong className="text-zinc-800 font-semibold">{formatDisplayDate(claim.submitted_at)}</strong>
                </span>
              </div>

              {claim.settled_at && (
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" aria-hidden="true" />
                  <span>
                    {t.common.settledDate}: <strong className="text-zinc-800 font-semibold">{formatDisplayDate(claim.settled_at)}</strong>
                  </span>
                </div>
              )}

              <div className="flex items-center gap-2">
                <Landmark className="w-4 h-4 text-slate-400 shrink-0" aria-hidden="true" />
                <span>
                  UAN: <strong className="font-mono text-zinc-800 font-semibold">{user.masked_uan}</strong>
                </span>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* 2. State-Specific Content */}

        {/* A. REJECTED STATE: The centerpiece decoder & CTA */}
        {isRejected && (
          <div className="space-y-4">
            <div className="border-l-4 border-rose-500 pl-3.5 py-0.5">
              <h2 className="text-lg sm:text-xl font-extrabold text-zinc-900 tracking-tight">
                {t.claimDetail.analysisTitle}
              </h2>
              <p className="text-xs sm:text-sm text-zinc-500">
                {t.claimDetail.analysisSubtitle}
              </p>
            </div>

            {/* Interactive Scenario & Decoder View */}
            <RejectionScenarioView
              claimId={claim.id}
              defaultCode={claim.remark_code || "NAME_MISMATCH"}
            />
          </div>
        )}

        {/* B. APPROVED STATE */}
        {isApproved && (
          <Card className="border-emerald-200 bg-gradient-to-br from-emerald-50/60 via-white to-emerald-50/30 shadow-sm rounded-2xl overflow-hidden">
            <CardHeader className="pb-2 pt-5 px-5 sm:px-6">
              <div className="flex items-center gap-2.5 text-emerald-900 font-extrabold text-base sm:text-lg">
                <div className="w-8 h-8 rounded-full bg-emerald-600 text-white flex items-center justify-center shadow-2xs shrink-0" aria-hidden="true">
                  <CheckCircle2 className="w-5 h-5" />
                </div>
                Settlement Completed Successfully
              </div>
            </CardHeader>
            <CardContent className="space-y-4 px-5 sm:px-6 pb-6 pt-1">
              <p className="text-sm sm:text-base text-zinc-800 leading-relaxed">
                Your claim of <strong className="text-zinc-900 font-bold">{formatCurrency(claim.amount)}</strong> has been approved by the EPFO field office. Funds were electronically credited via NEFT to your KYC-verified bank account ending in <strong className="font-mono text-zinc-900 font-semibold">{user.masked_bank_account}</strong> on <strong className="text-zinc-900 font-semibold">{formatDisplayDate(claim.settled_at)}</strong>.
              </p>
              <div className="p-4 bg-white border border-emerald-100 rounded-xl text-xs sm:text-sm font-mono text-zinc-600 space-y-1.5 shadow-2xs">
                <div className="flex justify-between"><span className="text-zinc-400 font-sans">Payment Mode:</span> <span className="font-semibold text-zinc-800">Electronic NEFT Transfer</span></div>
                <div className="flex justify-between"><span className="text-zinc-400 font-sans">Transfer Status:</span> <span className="font-semibold text-emerald-700">Settled &amp; Disbursed</span></div>
                <div className="flex justify-between"><span className="text-zinc-400 font-sans">Beneficiary Name:</span> <span className="font-semibold text-zinc-800">{user.full_name}</span></div>
              </div>
              <div className="pt-2">
                <Link
                  href="/dashboard"
                  className={cn(buttonVariants({ variant: "outline" }), "text-xs sm:text-sm font-semibold rounded-lg")}
                >
                  <ArrowLeft className="w-4 h-4 mr-1.5" aria-hidden="true" /> {t.common.backToDashboard}
                </Link>
              </div>
            </CardContent>
          </Card>
        )}

        {/* C. PENDING STATE */}
        {isPending && (
          <Card className="border-amber-200 bg-gradient-to-br from-amber-50/50 via-white to-amber-50/30 shadow-sm rounded-2xl overflow-hidden">
            <CardHeader className="pb-2 pt-5 px-5 sm:px-6">
              <div className="flex items-center gap-2.5 text-amber-900 font-extrabold text-base sm:text-lg">
                <div className="w-8 h-8 rounded-full bg-amber-500 text-white flex items-center justify-center shadow-2xs shrink-0" aria-hidden="true">
                  <Clock className="w-5 h-5" />
                </div>
                Claim Under Active Field Office Processing
              </div>
            </CardHeader>
            <CardContent className="space-y-6 px-5 sm:px-6 pb-6 pt-1">
              <p className="text-sm sm:text-base text-zinc-800 leading-relaxed">
                Your claim of <strong className="text-zinc-900 font-bold">{formatCurrency(claim.amount)}</strong> is currently being processed by the regional EPFO Field Office. Standard settlement processing typically takes between 15 to 20 working days from submission date.
              </p>

              <div className="pt-2">
                <Link
                  href="/dashboard"
                  className={cn(buttonVariants({ variant: "outline" }), "text-xs sm:text-sm font-semibold rounded-lg")}
                >
                  <ArrowLeft className="w-4 h-4 mr-1.5" aria-hidden="true" /> {t.common.backToDashboard}
                </Link>
              </div>
            </CardContent>
          </Card>
        )}
      </main>

      {/* Footer */}
      <footer className="border-t border-slate-200 bg-white py-4 mt-auto">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 text-center text-xs text-zinc-500">
          {t.common.officialDisclaimer}
        </div>
      </footer>
    </div>
  );
}
