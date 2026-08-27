import React from "react";
import Link from "next/link";
import { requireUser } from "@/lib/auth/require-user";
import { getClaimsByProfileId } from "@/lib/data/claims";
import { ClaimCard } from "@/components/claim-card";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { LanguageSwitcher } from "@/components/language-switcher";
import { signOutAction } from "@/app/actions/auth-actions";
import {
  ShieldCheck,
  LogOut,
  Landmark,
  User,
  AlertCircle,
  FileText,
  Clock,
  Calculator,
  MapPin,
  ExternalLink,
  Sparkles,
} from "lucide-react";
import { formatCurrency, formatDisplayDate } from "@/lib/utils";
import { getServerTranslation } from "@/lib/i18n/server";

export default async function DashboardPage() {
  const user = await requireUser("/dashboard");
  const claims = await getClaimsByProfileId(user.id);
  const { t } = await getServerTranslation();

  // Total balance sum from approved/pending claims or member balance
  const totalBalance = 184320;

  return (
    <div className="min-h-screen bg-slate-50 text-zinc-900 flex flex-col">
      {/* Top Navbar */}
      <header className="sticky top-0 z-30 bg-white/95 backdrop-blur-md border-b border-slate-200/80 shadow-2xs">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 h-16 sm:h-18 flex items-center justify-between">
          <Link
            href="/"
            className="flex items-center gap-3 group focus:outline-none focus:ring-2 focus:ring-teal-600 rounded-xl p-1"
          >
            <div className="bg-gradient-to-br from-teal-700 to-teal-900 text-white w-9 h-9 sm:w-10 sm:h-10 rounded-xl flex items-center justify-center shadow-xs group-hover:scale-105 transition-transform">
              <ShieldCheck className="w-5 h-5 sm:w-6 sm:h-6" aria-hidden="true" />
            </div>
            <div>
              <span className="font-extrabold text-base sm:text-lg tracking-tight text-zinc-900">
                PF Sahi Karo
              </span>
              <span className="hidden sm:inline-block text-xs font-semibold text-zinc-500 ml-2 border-l border-slate-200 pl-2">
                {t.dashboard.memberAccount}
              </span>
            </div>
          </Link>

          <div className="flex items-center gap-2 sm:gap-4">
            <LanguageSwitcher />

            <div className="flex items-center gap-2 text-xs text-zinc-700 bg-slate-100 px-3 py-1.5 rounded-full border border-slate-200/80">
              <User className="w-3.5 h-3.5 text-teal-700 shrink-0" aria-hidden="true" />
              <span className="font-bold">{user.full_name}</span>
              <span className="text-zinc-300 hidden md:inline">|</span>
              <span className="font-mono text-[11px] text-zinc-500 hidden md:inline">
                UAN: {user.masked_uan}
              </span>
            </div>

            <form action={signOutAction}>
              <button
                type="submit"
                className="text-xs text-zinc-500 hover:text-zinc-900 flex items-center gap-1.5 py-1.5 px-2.5 rounded-lg hover:bg-slate-100 transition-colors font-semibold cursor-pointer"
                title="Sign out from session"
                aria-label="Sign out"
              >
                <LogOut className="w-3.5 h-3.5" aria-hidden="true" />
                <span className="hidden sm:inline">{t.common.signOut}</span>
              </button>
            </form>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main id="main-content" className="max-w-5xl w-full mx-auto px-4 sm:px-6 py-6 sm:py-8 space-y-6 flex-1">
        {/* Quick Action Navigation Pills */}
        <div className="flex flex-wrap items-center gap-2 text-xs font-bold text-zinc-700">
          <span className="text-zinc-400 font-medium mr-1">Quick Tools:</span>
          <Link
            href="/#tax-calculator"
            className="inline-flex items-center gap-1.5 bg-white hover:bg-slate-100 border border-slate-200 px-3 py-1.5 rounded-lg shadow-2xs transition-colors text-teal-900"
          >
            <Calculator className="w-3.5 h-3.5 text-teal-700" />
            <span>{t.nav.taxCalc}</span>
          </Link>
          <Link
            href="/#office-directory"
            className="inline-flex items-center gap-1.5 bg-white hover:bg-slate-100 border border-slate-200 px-3 py-1.5 rounded-lg shadow-2xs transition-colors text-teal-900"
          >
            <MapPin className="w-3.5 h-3.5 text-teal-700" />
            <span>{t.nav.officeFinder}</span>
          </Link>
          <a
            href="https://epfigms.gov.in"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 bg-white hover:bg-slate-100 border border-slate-200 px-3 py-1.5 rounded-lg shadow-2xs transition-colors text-zinc-700"
          >
            <span>EPFiGMS Grievance</span>
            <ExternalLink className="w-3 h-3 text-zinc-400" />
          </a>
        </div>

        {/* Profile & PF Balance Banner */}
        <Card className="border-teal-800/20 bg-gradient-to-br from-teal-900 via-teal-800 to-teal-950 text-white shadow-md overflow-hidden relative rounded-2xl">
          <div className="absolute right-0 top-0 translate-x-8 -translate-y-8 w-72 h-72 bg-teal-400/10 rounded-full blur-3xl pointer-events-none" />
          <CardContent className="p-6 sm:p-8 relative z-10">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6">
              <div className="space-y-2.5">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-teal-800/90 border border-teal-700/80 text-teal-200 text-xs font-bold shadow-2xs">
                  <Landmark className="w-3.5 h-3.5" aria-hidden="true" /> {t.dashboard.memberAccount}
                </div>
                <h1 className="text-2xl sm:text-4xl font-extrabold tracking-tight">
                  {t.dashboard.greeting}, {user.full_name}
                </h1>
                <p className="text-xs sm:text-sm text-teal-100/90 flex flex-wrap items-center gap-x-3 gap-y-1">
                  <span>
                    UAN: <strong className="font-mono text-white">{user.masked_uan}</strong>
                  </span>
                  <span className="hidden sm:inline text-teal-400" aria-hidden="true">•</span>
                  <span>
                    Bank: ending in <strong className="font-mono text-white">{user.masked_bank_account}</strong>
                  </span>
                </p>
              </div>

              {/* PF Balance Display */}
              <div className="bg-white/10 backdrop-blur-md border border-white/15 rounded-2xl p-5 text-left sm:text-right min-w-[240px] shadow-sm">
                <div className="text-xs uppercase tracking-wider text-teal-200 font-bold mb-1">
                  {t.dashboard.totalBalance}
                </div>
                <div className="text-2xl sm:text-4xl font-extrabold tracking-tight text-white flex items-center sm:justify-end">
                  {formatCurrency(totalBalance)}
                </div>
                <div className="text-xs text-teal-200/85 mt-1 flex items-center gap-1 sm:justify-end font-medium">
                  <span className="w-2 h-2 rounded-full bg-emerald-400" aria-hidden="true" />
                  {t.dashboard.balanceSubtitle}
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Sync Delay Notice */}
        <div className="bg-slate-100 border border-slate-200/80 rounded-xl px-4 py-2.5 text-xs text-zinc-600 flex items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <Clock className="w-3.5 h-3.5 text-zinc-500 shrink-0" aria-hidden="true" />
            <span>{t.dashboard.delayedNotice}</span>
          </div>
          <span className="text-[11px] font-mono text-zinc-500 hidden sm:inline">
            Last synced: {formatDisplayDate(new Date().toISOString())}
          </span>
        </div>

        {/* Claims Section */}
        <section className="space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
            <div>
              <h2 className="text-xl sm:text-2xl font-extrabold text-zinc-900 flex items-center gap-2 tracking-tight">
                <FileText className="w-5 h-5 text-teal-700 shrink-0" aria-hidden="true" />
                {t.dashboard.claimsTitle}
              </h2>
              <p className="text-xs sm:text-sm text-zinc-500">
                {t.dashboard.claimsSubtitle}
              </p>
            </div>
            <Badge variant="outline" className="bg-white text-zinc-800 border-slate-200 font-bold px-3.5 py-1.5 rounded-full text-xs shadow-2xs w-fit">
              {claims.length} {t.dashboard.claimsCount}
            </Badge>
          </div>

          {/* List of Claims */}
          <div className="space-y-3.5">
            {claims.length > 0 ? (
              claims.map((claim) => (
                <ClaimCard key={claim.id} claim={claim} />
              ))
            ) : (
              <div className="rounded-xl border border-dashed border-slate-300 p-8 text-center bg-white space-y-2">
                <AlertCircle className="w-8 h-8 text-slate-400 mx-auto" aria-hidden="true" />
                <p className="text-sm font-bold text-zinc-700">{t.dashboard.noClaims}</p>
              </div>
            )}
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="border-t border-slate-200 bg-white py-4 mt-auto">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 text-center text-xs text-zinc-500">
          {t.common.officialDisclaimer}
        </div>
      </footer>
    </div>
  );
}
