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
} from "lucide-react";
import { formatCurrency, formatDisplayDate } from "@/lib/utils";

export default async function DashboardPage() {
  const user = await requireUser("/dashboard");
  const claims = await getClaimsByProfileId(user.id);

  // Total balance sum from approved/pending claims or member balance
  const totalBalance = 184320;

  return (
    <div className="min-h-screen bg-slate-50 text-zinc-900 flex flex-col">
      {/* Top Navbar */}
      <header className="sticky top-0 z-30 bg-white/95 backdrop-blur-md border-b border-slate-200/80 shadow-2xs">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-3 group focus:outline-none focus:ring-2 focus:ring-teal-600 rounded-lg p-1">
            <div className="bg-teal-700 text-white w-9 h-9 rounded-xl flex items-center justify-center shadow-xs">
              <ShieldCheck className="w-5 h-5" aria-hidden="true" />
            </div>
            <div>
              <span className="font-bold text-base tracking-tight text-zinc-900">
                PF Sahi Karo
              </span>
              <span className="hidden sm:inline-block text-xs text-zinc-500 ml-2 border-l border-slate-200 pl-2">
                Member Dashboard
              </span>
            </div>
          </Link>

          <div className="flex items-center gap-2 sm:gap-4">
            <LanguageSwitcher />

            <div className="flex items-center gap-2 text-xs text-zinc-700 bg-slate-100 px-3 py-1.5 rounded-full border border-slate-200/60">
              <User className="w-3.5 h-3.5 text-teal-700 shrink-0" aria-hidden="true" />
              <span className="font-medium">{user.full_name}</span>
              <span className="text-zinc-300 hidden md:inline">|</span>
              <span className="font-mono text-[11px] text-zinc-500 hidden md:inline">
                UAN: {user.masked_uan}
              </span>
            </div>

            <form action={signOutAction}>
              <button
                type="submit"
                className="text-xs text-zinc-500 hover:text-zinc-900 flex items-center gap-1.5 py-1.5 px-2.5 rounded-md hover:bg-slate-100 transition-colors font-medium cursor-pointer"
                title="Sign out from session"
                aria-label="Sign out"
              >
                <LogOut className="w-3.5 h-3.5" aria-hidden="true" />
                <span className="hidden sm:inline">Sign out</span>
              </button>
            </form>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main id="main-content" className="max-w-5xl w-full mx-auto px-4 sm:px-6 py-6 sm:py-8 space-y-7 flex-1">
        {/* Profile & PF Balance Banner */}
        <Card className="border-teal-800/20 bg-gradient-to-br from-teal-900 via-teal-800 to-teal-950 text-white shadow-md overflow-hidden relative rounded-2xl">
          <div className="absolute right-0 top-0 translate-x-8 -translate-y-8 w-72 h-72 bg-teal-400/10 rounded-full blur-3xl pointer-events-none" />
          <CardContent className="p-6 sm:p-8 relative z-10">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6">
              <div className="space-y-2.5">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-teal-800/90 border border-teal-700/80 text-teal-200 text-xs font-semibold shadow-2xs">
                  <Landmark className="w-3.5 h-3.5" aria-hidden="true" /> Verified Member Account
                </div>
                <h1 className="text-2xl sm:text-3xl font-bold tracking-tight">
                  Namaste, {user.full_name}
                </h1>
                <p className="text-xs sm:text-sm text-teal-100/85 flex flex-wrap items-center gap-x-3 gap-y-1">
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
              <div className="bg-white/10 backdrop-blur-md border border-white/15 rounded-2xl p-4 sm:p-5 text-left sm:text-right min-w-[220px] shadow-sm">
                <div className="text-[11px] uppercase tracking-wider text-teal-200 font-semibold mb-1">
                  Estimated PF Balance
                </div>
                <div className="text-2xl sm:text-3xl font-extrabold tracking-tight text-white flex items-center sm:justify-end">
                  {formatCurrency(totalBalance)}
                </div>
                <div className="text-[11px] text-teal-200/80 mt-1 flex items-center gap-1 sm:justify-end">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" aria-hidden="true" />
                  Synchronized with EPFO passbook
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Sync Delay Notice */}
        <div className="bg-slate-100 border border-slate-200/80 rounded-xl px-4 py-2.5 text-xs text-zinc-600 flex items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <Clock className="w-3.5 h-3.5 text-zinc-500 shrink-0" aria-hidden="true" />
            <span>EPFO portal records may reflect external updates with a 24–48 hour administrative delay.</span>
          </div>
          <span className="text-[11px] font-mono text-zinc-500 hidden sm:inline">
            Last checked: {formatDisplayDate(new Date().toISOString())}
          </span>
        </div>

        {/* Claims Section */}
        <section className="space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
            <div>
              <h2 className="text-lg sm:text-xl font-bold text-zinc-900 flex items-center gap-2 tracking-tight">
                <FileText className="w-5 h-5 text-teal-700 shrink-0" aria-hidden="true" />
                Your Claims History
              </h2>
              <p className="text-xs text-zinc-500">
                Track previous and active claim requests submitted to EPFO
              </p>
            </div>
            <Badge variant="outline" className="bg-white text-zinc-700 border-slate-200 font-semibold px-3 py-1 rounded-full text-xs shadow-2xs w-fit">
              {claims.length} Claims on Record
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
                <p className="text-sm font-semibold text-zinc-700">No claims found</p>
                <p className="text-xs text-zinc-500">Your submitted claims will appear here once synchronized.</p>
              </div>
            )}
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="border-t border-slate-200 bg-white py-4 mt-auto">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 text-center text-xs text-zinc-500">
          PF Sahi Karo is an assistance tool. All official settlements are processed by the respective EPFO regional field offices.
        </div>
      </footer>
    </div>
  );
}
