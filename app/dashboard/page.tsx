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
    <div className="min-h-screen bg-background text-on-surface flex flex-col md:flex-row">
      {/* Desktop Left Sidebar (Stitch Screen 7) */}
      <aside className="hidden md:flex flex-col h-screen w-64 fixed left-0 top-0 bg-surface-container-low border-r border-outline-variant/30 py-6 space-y-4 z-40">
        {/* Brand & Identity */}
        <div className="px-6 mb-4 flex flex-col items-center">
          <Link href="/" className="flex items-center gap-2 mb-6 self-start">
            <img src="/logo.png" alt="PF Sahi Karo Logo" className="h-8 w-8 object-contain rounded-lg" />
            <span className="font-bold text-lg text-primary tracking-tight">PF Sahi Karo</span>
          </Link>

          <div className="w-16 h-16 rounded-full bg-primary-container text-on-primary-container flex items-center justify-center font-bold text-xl mb-3 shadow-xs">
            SK
          </div>
          <h2 className="text-base font-bold text-primary text-center">
            {user.full_name}
          </h2>
          <p className="text-xs text-on-surface-variant text-center mt-0.5 font-data-mono">
            UAN: {user.masked_uan}
          </p>
        </div>

        {/* Navigation Links */}
        <div className="px-3 flex-1 overflow-y-auto">
          <ul className="space-y-1.5">
            <li>
              <Link
                href="/dashboard"
                className="flex items-center px-4 py-3 bg-primary-container text-on-primary-container font-bold rounded-xl transition-all shadow-2xs"
              >
                <span className="material-symbols-outlined mr-3 text-[20px]">dashboard</span>
                <span className="text-xs font-bold">{t.nav.dashboard}</span>
              </Link>
            </li>
            <li>
              <Link
                href="/#instant-decoder"
                className="flex items-center px-4 py-3 text-on-surface-variant hover:bg-surface-container-high rounded-xl transition-all group"
              >
                <span className="material-symbols-outlined mr-3 text-[20px] text-on-surface-variant group-hover:text-primary transition-colors">
                  troubleshoot
                </span>
                <span className="text-xs font-semibold">{t.nav.decoder}</span>
              </Link>
            </li>
            <li>
              <Link
                href="/#tax-calculator"
                className="flex items-center px-4 py-3 text-on-surface-variant hover:bg-surface-container-high rounded-xl transition-all group"
              >
                <span className="material-symbols-outlined mr-3 text-[20px] text-on-surface-variant group-hover:text-primary transition-colors">
                  calculate
                </span>
                <span className="text-xs font-semibold">{t.nav.taxCalc}</span>
              </Link>
            </li>
            <li>
              <Link
                href="/#office-directory"
                className="flex items-center px-4 py-3 text-on-surface-variant hover:bg-surface-container-high rounded-xl transition-all group"
              >
                <span className="material-symbols-outlined mr-3 text-[20px] text-on-surface-variant group-hover:text-primary transition-colors">
                  location_city
                </span>
                <span className="text-xs font-semibold">{t.nav.officeFinder}</span>
              </Link>
            </li>
          </ul>
        </div>

        {/* Start New Claim CTA */}
        <div className="px-4 mb-2">
          <Link
            href="/#instant-decoder"
            className="w-full bg-primary hover:bg-surface-tint text-on-primary font-bold py-3 px-4 rounded-xl transition-colors flex items-center justify-center min-h-[44px] text-xs shadow-2xs"
          >
            <span className="material-symbols-outlined mr-2 text-[18px]">add</span>
            <span>Start New Claim</span>
          </Link>
        </div>

        {/* Bottom Actions */}
        <div className="px-3 pb-2 border-t border-outline-variant/30 pt-3 mt-auto space-y-1">
          <div className="px-3 pb-2">
            <LanguageSwitcher />
          </div>
          <Link
            href="/help"
            className="flex items-center px-4 py-2.5 text-on-surface-variant hover:bg-surface-container-high rounded-xl transition-all text-xs font-semibold"
          >
            <span className="material-symbols-outlined mr-3 text-[18px]">help</span>
            <span>{t.nav.help}</span>
          </Link>
          <form action={signOutAction}>
            <button
              type="submit"
              className="w-full flex items-center px-4 py-2.5 text-on-surface-variant hover:text-alert-crimson hover:bg-error-container/20 rounded-xl transition-all text-xs font-semibold cursor-pointer"
            >
              <span className="material-symbols-outlined mr-3 text-[18px]">logout</span>
              <span>{t.common.signOut}</span>
            </button>
          </form>
        </div>
      </aside>

      {/* Main Content Area */}
      <div className="flex-1 md:ml-64 flex flex-col min-h-screen">
        {/* Mobile Header (Hidden on md) */}
        <header className="md:hidden glass-nav border-b border-outline-variant/30 px-4 py-3 sticky top-0 z-30 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2">
            <img src="/logo.png" alt="PF Sahi Karo Logo" className="h-8 w-8 object-contain rounded-lg" />
            <span className="font-bold text-base text-primary">PF Sahi Karo</span>
          </Link>
          <div className="flex items-center gap-2">
            <LanguageSwitcher />
            <form action={signOutAction}>
              <button
                type="submit"
                className="p-2 text-on-surface-variant hover:text-alert-crimson rounded-lg"
                title="Sign out"
              >
                <span className="material-symbols-outlined text-[20px]">logout</span>
              </button>
            </form>
          </div>
        </header>

        {/* Main Canvas */}
        <main id="main-content" className="flex-1 p-4 sm:p-6 lg:p-8 space-y-6 max-w-[1280px] w-full mx-auto relative overflow-x-hidden">
          {/* Subtle Ambient Background Gradient */}
          <div className="absolute top-0 left-0 w-full h-80 bg-gradient-to-b from-primary/5 to-transparent -z-10 pointer-events-none" />

          {/* Section 1: Profile Banner from Stitch Screen 7 */}
          <section className="w-full glass-card rounded-2xl p-6 sm:p-8 shadow-xs flex flex-col md:flex-row justify-between items-start md:items-center gap-6 relative overflow-hidden">
            {/* Subtle internal blur blob */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-primary-container/10 rounded-full blur-3xl -z-10 transform translate-x-1/2 -translate-y-1/2" />

            <div className="space-y-3 z-10">
              <div className="inline-flex items-center gap-1.5 bg-success-emerald/10 text-success-emerald px-3 py-1.5 rounded-full border border-success-emerald/25 shadow-2xs">
                <span
                  className="material-symbols-outlined text-[16px]"
                  style={{ fontVariationSettings: "'FILL' 1" }}
                >
                  verified
                </span>
                <span className="text-xs font-bold uppercase tracking-wider">
                  Verified Member Account
                </span>
              </div>

              <h1 className="text-2xl sm:text-3xl font-extrabold text-on-surface tracking-tight">
                {t.dashboard.greeting}, {user.full_name}
              </h1>

              <div className="flex flex-wrap gap-x-6 gap-y-2 mt-2">
                <div className="flex items-center gap-2 text-on-surface-variant text-xs sm:text-sm">
                  <span className="material-symbols-outlined text-[18px]">badge</span>
                  <span className="font-data-mono">
                    UAN: <span className="tracking-widest">••••••••</span>{user.masked_uan.slice(-4)}
                  </span>
                </div>
                <div className="flex items-center gap-2 text-on-surface-variant text-xs sm:text-sm">
                  <span className="material-symbols-outlined text-[18px]">account_balance</span>
                  <span className="font-data-mono">
                    Bank: ending in <span className="tracking-widest">••••</span>{user.masked_bank_account.slice(-4)}
                  </span>
                </div>
              </div>
            </div>

            <div className="w-full md:w-auto z-10">
              <Link
                href="/#instant-decoder"
                className="w-full md:w-auto min-h-[44px] px-6 bg-surface-container-high text-on-surface rounded-xl font-semibold text-xs sm:text-sm hover:bg-surface-container-highest transition-colors flex items-center justify-center gap-2 border border-outline-variant/40 shadow-2xs cursor-pointer"
              >
                <span className="material-symbols-outlined text-[18px]">edit_document</span>
                <span>Update KYC / Joint Declaration</span>
              </Link>
            </div>
          </section>

          {/* Balance Card & Claims Layout Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
            {/* Section 2: Balance Card (Left, 4 cols) */}
            <div className="lg:col-span-4 flex flex-col h-full">
              <div className="bg-primary text-on-primary rounded-2xl p-6 sm:p-8 flex flex-col justify-between h-full deep-shadow relative overflow-hidden">
                {/* Glow effects */}
                <div className="absolute -bottom-12 -right-12 w-48 h-48 bg-white/10 rounded-full blur-2xl pointer-events-none" />
                <div className="absolute top-4 right-4 w-24 h-24 bg-primary-fixed/20 rounded-full blur-xl pointer-events-none" />

                <div className="space-y-6 z-10">
                  <div className="flex items-center justify-between">
                    <h3 className="text-xs font-bold text-primary-fixed-dim uppercase tracking-wider">
                      {t.dashboard.totalBalance}
                    </h3>
                    <span className="material-symbols-outlined text-primary-fixed-dim opacity-80">
                      account_balance_wallet
                    </span>
                  </div>

                  <div>
                    <div className="text-3xl sm:text-4xl font-extrabold font-data-mono text-white tracking-tight">
                      {formatCurrency(totalBalance)}
                    </div>
                    <div className="flex items-center gap-1.5 text-xs text-primary-fixed-dim mt-2 font-medium">
                      <span className="w-2 h-2 rounded-full bg-success-emerald" />
                      <span>{t.dashboard.balanceSubtitle}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Section 3: Claims Section (Right, 8 cols) */}
            <div className="lg:col-span-8 space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-xl font-bold text-on-surface tracking-tight">
                    {t.dashboard.claimsTitle}
                  </h2>
                  <p className="text-xs text-on-surface-variant">
                    {t.dashboard.claimsSubtitle}
                  </p>
                </div>
                <span className="bg-surface-container-high text-on-surface-variant font-bold px-3 py-1 rounded-full text-xs font-data-mono">
                  {claims.length} {t.dashboard.claimsCount}
                </span>
              </div>

              {/* Claims List */}
              <div className="space-y-4">
                {claims.length > 0 ? (
                  claims.map((claim) => (
                    <ClaimCard key={claim.id} claim={claim} />
                  ))
                ) : (
                  <div className="rounded-2xl border border-dashed border-outline-variant/60 p-8 text-center glass-card space-y-2">
                    <span className="material-symbols-outlined text-slate-accent text-4xl">
                      inbox
                    </span>
                    <p className="text-sm font-bold text-on-surface">
                      {t.dashboard.noClaims}
                    </p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </main>

        {/* Footer */}
        <footer className="border-t border-outline-variant/30 py-4 px-6 text-center text-xs text-on-surface-variant bg-surface-container-low mt-auto">
          {t.common.officialDisclaimer}
        </footer>
      </div>
    </div>
  );
}
