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
    <div className="min-h-screen bg-background text-on-surface flex flex-col">
      {/* Top Navbar */}
      <header className="glass-nav sticky top-0 z-30 border-b border-outline-variant/30">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 h-16 sm:h-18 flex items-center justify-between">
          <Link
            href="/dashboard"
            className="text-on-surface-variant hover:text-primary flex items-center gap-1.5 text-xs sm:text-sm font-bold py-2 px-3 rounded-xl hover:bg-surface-container-high transition-colors"
          >
            <span className="material-symbols-outlined text-[18px]">arrow_back</span>
            <span>{t.common.backToDashboard}</span>
          </Link>

          <div className="flex items-center gap-3">
            <LanguageSwitcher />
            <div className="flex items-center gap-2">
              <img src="/logo.png" alt="Logo" className="w-7 h-7 object-contain rounded-md" />
              <span className="font-bold text-sm text-primary hidden sm:inline">PF Sahi Karo</span>
            </div>
          </div>
        </div>
      </header>

      {/* Main Container */}
      <main id="main-content" className="max-w-4xl w-full mx-auto px-4 sm:px-6 py-6 sm:py-8 space-y-6 flex-1">
        {/* 1. Claim Summary Header Card */}
        <div className="glass-card rounded-2xl p-6 sm:p-8 shadow-xs">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-outline-variant/30 pb-5">
            <div className="space-y-1.5">
              <div className="flex flex-wrap items-center gap-2.5">
                <h1 className="text-xl sm:text-3xl font-extrabold text-on-surface tracking-tight">
                  {claim.claim_type}
                </h1>
                <StatusBadge status={claim.status} />
              </div>
              <div className="text-xs sm:text-sm text-on-surface-variant font-mono flex items-center gap-2">
                <span>Claim Ref: <strong className="text-on-surface font-bold font-data-mono">{claim.external_claim_id || claim.id}</strong></span>
              </div>
            </div>

            {/* Amount Display */}
            <div className="text-left sm:text-right bg-surface-container-low sm:bg-transparent p-3 sm:p-0 rounded-xl shrink-0">
              <div className="text-xs uppercase tracking-wider text-on-surface-variant font-bold">
                {t.common.claimAmount}
              </div>
              <div className="text-2xl sm:text-3xl font-extrabold text-on-surface flex items-center sm:justify-end font-data-mono">
                {formatCurrency(claim.amount)}
              </div>
            </div>
          </div>

          {/* Key Dates & Meta Info */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-4 text-xs sm:text-sm text-on-surface-variant">
            <div className="flex items-center gap-2">
              <span className="material-symbols-outlined text-[18px] text-primary">calendar_today</span>
              <span>
                {t.common.submittedDate}: <strong className="text-on-surface font-semibold">{formatDisplayDate(claim.submitted_at)}</strong>
              </span>
            </div>

            {claim.settled_at && (
              <div className="flex items-center gap-2">
                <span className="material-symbols-outlined text-[18px] text-success-emerald">check_circle</span>
                <span>
                  {t.common.settledDate}: <strong className="text-on-surface font-semibold">{formatDisplayDate(claim.settled_at)}</strong>
                </span>
              </div>
            )}

            <div className="flex items-center gap-2">
              <span className="material-symbols-outlined text-[18px] text-primary">badge</span>
              <span>
                UAN: <strong className="font-data-mono text-on-surface font-semibold">{user.masked_uan}</strong>
              </span>
            </div>
          </div>
        </div>

        {/* 2. State-Specific Content */}

        {/* A. REJECTED STATE: The centerpiece decoder & CTA */}
        {isRejected && (
          <div className="space-y-4">
            <div className="border-l-4 border-alert-crimson pl-3.5 py-0.5">
              <h2 className="text-lg sm:text-xl font-extrabold text-on-surface tracking-tight">
                {t.claimDetail.analysisTitle}
              </h2>
              <p className="text-xs sm:text-sm text-on-surface-variant">
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
          <div className="glass-card border-success-emerald/30 rounded-2xl p-6 sm:p-8 space-y-4 shadow-xs">
            <div className="flex items-center gap-2.5 text-success-emerald font-extrabold text-base sm:text-lg">
              <span className="material-symbols-outlined text-[24px]">verified</span>
              <span>Settlement Completed Successfully</span>
            </div>
            <p className="text-sm sm:text-base text-on-surface leading-relaxed">
              Your claim of <strong className="text-on-surface font-bold">{formatCurrency(claim.amount)}</strong> has been approved by the EPFO field office. Funds were electronically credited via NEFT to your KYC-verified bank account ending in <strong className="font-data-mono text-on-surface font-semibold">{user.masked_bank_account}</strong> on <strong className="text-on-surface font-semibold">{formatDisplayDate(claim.settled_at)}</strong>.
            </p>
            <div className="p-4 bg-surface-container-low border border-outline-variant/30 rounded-xl text-xs sm:text-sm font-data-mono text-on-surface-variant space-y-2">
              <div className="flex justify-between"><span>Payment Mode:</span> <span className="font-semibold text-on-surface font-sans">Electronic NEFT Transfer</span></div>
              <div className="flex justify-between"><span>Transfer Status:</span> <span className="font-semibold text-success-emerald font-sans">Settled &amp; Disbursed</span></div>
              <div className="flex justify-between"><span>Beneficiary Name:</span> <span className="font-semibold text-on-surface font-sans">{user.full_name}</span></div>
            </div>
            <div className="pt-2">
              <Link
                href="/dashboard"
                className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-bold text-primary hover:underline min-h-[44px]"
              >
                <span className="material-symbols-outlined text-[16px]">arrow_back</span>
                <span>{t.common.backToDashboard}</span>
              </Link>
            </div>
          </div>
        )}

        {/* C. PENDING STATE */}
        {isPending && (
          <div className="glass-card border-secondary-container/40 rounded-2xl p-6 sm:p-8 space-y-4 shadow-xs">
            <div className="flex items-center gap-2.5 text-secondary font-extrabold text-base sm:text-lg">
              <span className="material-symbols-outlined text-[24px]">schedule</span>
              <span>Claim Under Active Field Office Processing</span>
            </div>
            <p className="text-sm sm:text-base text-on-surface leading-relaxed">
              Your claim of <strong className="text-on-surface font-bold">{formatCurrency(claim.amount)}</strong> is currently being processed by the regional EPFO Field Office. Standard settlement processing typically takes between 15 to 20 working days from submission date.
            </p>

            <div className="pt-2">
              <Link
                href="/dashboard"
                className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-bold text-primary hover:underline min-h-[44px]"
              >
                <span className="material-symbols-outlined text-[16px]">arrow_back</span>
                <span>{t.common.backToDashboard}</span>
              </Link>
            </div>
          </div>
        )}
      </main>

      {/* Civic Footer */}
      <footer className="border-t border-outline-variant/30 py-4 px-6 text-center text-xs text-on-surface-variant bg-surface-container-low mt-auto">
        {t.common.officialDisclaimer}
      </footer>
    </div>
  );
}
