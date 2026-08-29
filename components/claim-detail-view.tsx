"use client";

import React from "react";
import Link from "next/link";
import { ClaimRow } from "@/lib/data/claims";
import { CitizenUser } from "@/lib/auth/session";
import { StatusBadge } from "@/components/status-badge";
import { RejectionScenarioView } from "@/components/rejection-scenario-view";
import { LanguageSwitcher } from "@/components/language-switcher";
import { ArrowLeft, CheckCircle2, Clock, Calendar, Landmark, Badge as BadgeIcon } from "lucide-react";
import { formatDisplayDate, formatCurrency, cn } from "@/lib/utils";
import { useTranslation } from "@/lib/i18n/context";
import { getLocalizedClaimType, getLocalizedClaimDetails } from "@/lib/i18n/claim-helpers";

interface ClaimDetailViewProps {
  claim: ClaimRow;
  user: CitizenUser;
}

export function ClaimDetailView({ claim, user }: ClaimDetailViewProps) {
  const { locale, t } = useTranslation();

  const isRejected = claim.status === "rejected";
  const isApproved = claim.status === "approved";
  const isPending = claim.status === "under_review" || claim.status === "submitted" || claim.status === "resubmitted";

  const details = getLocalizedClaimDetails(locale, claim, user);
  const localizedTitle = getLocalizedClaimType(claim.claim_type, locale);

  return (
    <div className="min-h-screen bg-[#f7f9fb] text-slate-900 flex flex-col">
      {/* Top Navbar */}
      <header className="glass-nav sticky top-0 z-30 border-b border-slate-200/80 bg-white/90 backdrop-blur-md">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 h-16 sm:h-18 flex items-center justify-between">
          <Link
            href="/dashboard"
            className="text-slate-600 hover:text-[#005f56] flex items-center gap-1.5 text-xs sm:text-sm font-bold py-2 px-3 rounded-xl hover:bg-slate-100 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>{t.common.backToDashboard}</span>
          </Link>

          <div className="flex items-center gap-3">
            <LanguageSwitcher direction="down" align="right" />
            <div className="flex items-center gap-2">
              <img src="/logo.png" alt="Logo" className="w-7 h-7 object-contain rounded-md" />
              <span className="font-bold text-sm text-[#005f56] hidden sm:inline">{t.common.brandName}</span>
            </div>
          </div>
        </div>
      </header>

      {/* Main Container */}
      <main id="main-content" className="max-w-4xl w-full mx-auto px-4 sm:px-6 py-6 sm:py-8 space-y-6 flex-1">
        {/* 1. Claim Summary Header Card */}
        <div className="bg-white rounded-2xl p-6 sm:p-8 border border-slate-200/80 shadow-xs">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-100 pb-5">
            <div className="space-y-1.5">
              <div className="flex flex-wrap items-center gap-2.5">
                <h1 className="text-xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
                  {localizedTitle}
                </h1>
                <StatusBadge status={claim.status} />
              </div>
              <div className="text-xs sm:text-sm text-slate-500 font-mono flex items-center gap-2">
                <span>{details.claimRefLabel} <strong className="text-slate-900 font-bold font-mono">{claim.external_claim_id || claim.id}</strong></span>
              </div>
            </div>

            {/* Amount Display */}
            <div className="text-left sm:text-right bg-slate-50 sm:bg-transparent p-3 sm:p-0 rounded-xl shrink-0">
              <div className="text-xs uppercase tracking-wider text-slate-500 font-bold">
                {t.common.claimAmount}
              </div>
              <div className="text-2xl sm:text-3xl font-extrabold text-slate-900 flex items-center sm:justify-end font-mono">
                {formatCurrency(claim.amount)}
              </div>
            </div>
          </div>

          {/* Key Dates & Meta Info */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-4 text-xs sm:text-sm text-slate-600">
            <div className="flex items-center gap-2">
              <Calendar className="w-4 h-4 text-[#005f56]" />
              <span>
                {t.common.submittedDate}: <strong className="text-slate-900 font-semibold">{formatDisplayDate(claim.submitted_at)}</strong>
              </span>
            </div>

            {claim.settled_at && (
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                <span>
                  {t.common.settledDate}: <strong className="text-slate-900 font-semibold">{formatDisplayDate(claim.settled_at)}</strong>
                </span>
              </div>
            )}

            <div className="flex items-center gap-2">
              <BadgeIcon className="w-4 h-4 text-[#005f56]" />
              <span>
                UAN: <strong className="font-mono text-slate-900 font-semibold">{user.masked_uan}</strong>
              </span>
            </div>
          </div>
        </div>

        {/* 2. State-Specific Content */}

        {/* A. REJECTED STATE: The centerpiece decoder & CTA */}
        {isRejected && (
          <div className="space-y-4 animate-in fade-in duration-200">
            <div className="border-l-4 border-rose-500 pl-3.5 py-0.5">
              <h2 className="text-lg sm:text-xl font-extrabold text-slate-900 tracking-tight">
                {t.claimDetail.analysisTitle}
              </h2>
              <p className="text-xs sm:text-sm text-slate-600">
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
          <div className="bg-white border border-emerald-200 rounded-2xl p-6 sm:p-8 space-y-5 shadow-xs animate-in fade-in duration-200">
            <div className="flex items-center gap-2.5 text-emerald-700 font-extrabold text-base sm:text-lg">
              <CheckCircle2 className="w-6 h-6 text-emerald-600" />
              <span>{details.settlementTitle}</span>
            </div>
            <p className="text-sm sm:text-base text-slate-700 leading-relaxed font-normal">
              {details.settlementDesc}
            </p>
            <div className="p-4 bg-slate-50 border border-slate-200 rounded-xl text-xs sm:text-sm text-slate-600 space-y-2.5">
              <div className="flex justify-between items-center">
                <span>{details.paymentModeLabel}</span>
                <span className="font-semibold text-slate-900">{details.paymentModeValue}</span>
              </div>
              <div className="flex justify-between items-center">
                <span>{details.transferStatusLabel}</span>
                <span className="font-semibold text-emerald-700">{details.transferStatusValue}</span>
              </div>
              <div className="flex justify-between items-center">
                <span>{details.beneficiaryNameLabel}</span>
                <span className="font-semibold text-slate-900">{user.full_name}</span>
              </div>
            </div>
            <div className="pt-2">
              <Link
                href="/dashboard"
                className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-bold text-[#005f56] hover:underline"
              >
                <ArrowLeft className="w-4 h-4" />
                <span>{t.common.backToDashboard}</span>
              </Link>
            </div>
          </div>
        )}

        {/* C. PENDING STATE */}
        {isPending && (
          <div className="bg-white border border-amber-200 rounded-2xl p-6 sm:p-8 space-y-5 shadow-xs animate-in fade-in duration-200">
            <div className="flex items-center gap-2.5 text-amber-700 font-extrabold text-base sm:text-lg">
              <Clock className="w-6 h-6 text-amber-600" />
              <span>{details.pendingTitle}</span>
            </div>
            <p className="text-sm sm:text-base text-slate-700 leading-relaxed">
              {details.pendingDesc}
            </p>

            <div className="pt-2">
              <Link
                href="/dashboard"
                className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-bold text-[#005f56] hover:underline"
              >
                <ArrowLeft className="w-4 h-4" />
                <span>{t.common.backToDashboard}</span>
              </Link>
            </div>
          </div>
        )}
      </main>

      {/* Footer */}
      <footer className="border-t border-slate-200 py-4 px-6 text-center text-xs text-slate-500 bg-white mt-auto">
        {t.common.officialDisclaimer}
      </footer>
    </div>
  );
}
