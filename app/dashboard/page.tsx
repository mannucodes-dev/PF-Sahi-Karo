"use client";

import React from "react";
import Link from "next/link";
import { MOCK_USER, MOCK_CLAIMS } from "@/lib/mock-data";
import { ClaimCard } from "@/components/claim-card";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  ShieldCheck,
  IndianRupee,
  LogOut,
  Landmark,
  User,
  AlertCircle,
  FileText,
} from "lucide-react";

export default function DashboardPage() {
  const user = MOCK_USER;
  const claims = MOCK_CLAIMS;

  return (
    <div className="min-h-screen bg-slate-50 text-zinc-900 flex flex-col">
      {/* Top Navbar */}
      <header className="sticky top-0 z-30 bg-white/95 backdrop-blur-md border-b border-slate-200/80 shadow-2xs">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="bg-teal-700 text-white w-9 h-9 rounded-xl flex items-center justify-center shadow-xs">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div>
              <span className="font-bold text-base tracking-tight text-zinc-900">
                PF Sahi Karo
              </span>
              <span className="hidden sm:inline-block text-xs text-zinc-500 ml-2 border-l border-slate-200 pl-2">
                EPFO Claim Assistance
              </span>
            </div>
          </div>

          <div className="flex items-center gap-3 sm:gap-4">
            <div className="flex items-center gap-2 text-xs text-zinc-700 bg-slate-100 px-3 py-1.5 rounded-full border border-slate-200/60">
              <User className="w-3.5 h-3.5 text-teal-700 shrink-0" />
              <span className="font-medium">{user.full_name}</span>
              <span className="text-zinc-300 hidden md:inline">|</span>
              <span className="font-mono text-[11px] text-zinc-500 hidden md:inline">UAN: {user.uan}</span>
            </div>
            <Link
              href="/login"
              className="text-xs text-zinc-500 hover:text-zinc-900 flex items-center gap-1.5 py-1.5 px-2.5 rounded-md hover:bg-slate-100 transition-colors font-medium"
              title="Sign out & return to Login"
            >
              <LogOut className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Sign out</span>
            </Link>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-5xl w-full mx-auto px-4 sm:px-6 py-6 sm:py-8 space-y-7 flex-1">
        {/* Profile & PF Balance Banner */}
        <Card className="border-teal-800/20 bg-gradient-to-br from-teal-900 via-teal-800 to-teal-950 text-white shadow-md overflow-hidden relative rounded-2xl">
          <div className="absolute right-0 top-0 translate-x-8 -translate-y-8 w-72 h-72 bg-teal-400/10 rounded-full blur-3xl pointer-events-none" />
          <CardContent className="p-6 sm:p-8 relative z-10">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6">
              <div className="space-y-2.5">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-teal-800/90 border border-teal-700/80 text-teal-200 text-xs font-semibold shadow-2xs">
                  <Landmark className="w-3.5 h-3.5" /> EPFO Member Account
                </div>
                <h1 className="text-2xl sm:text-3xl font-bold tracking-tight">
                  Namaste, {user.full_name}
                </h1>
                <p className="text-xs sm:text-sm text-teal-100/85 flex flex-wrap items-center gap-x-3 gap-y-1">
                  <span>UAN (Universal Account Number): <strong className="font-mono text-white">{user.uan}</strong></span>
                  <span className="hidden sm:inline text-teal-400">•</span>
                  <span>Bank: ending in <strong className="font-mono text-white">XXXX{user.bank_account_last4}</strong></span>
                </p>
              </div>

              {/* Large PF Balance Display */}
              <div className="bg-white/10 backdrop-blur-md border border-white/15 rounded-2xl p-4 sm:p-5 text-left sm:text-right min-w-[220px] shadow-sm">
                <div className="text-[11px] uppercase tracking-wider text-teal-200 font-semibold mb-1">
                  Total PF Balance
                </div>
                <div className="text-2xl sm:text-3xl font-extrabold tracking-tight text-white flex items-center sm:justify-end">
                  <IndianRupee className="w-6 h-6 sm:w-7 sm:h-7 text-teal-300 mr-0.5 shrink-0" />
                  {user.pf_balance.toLocaleString("en-IN")}
                </div>
                <div className="text-[11px] text-teal-200/80 mt-1 flex items-center gap-1 sm:justify-end">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400"></span>
                  Verified against EPFO passbook
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Claims Section */}
        <section className="space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
            <div>
              <h2 className="text-lg sm:text-xl font-bold text-zinc-900 flex items-center gap-2 tracking-tight">
                <FileText className="w-5 h-5 text-teal-700 shrink-0" />
                Your Claims
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
                <AlertCircle className="w-8 h-8 text-slate-400 mx-auto" />
                <p className="text-sm font-semibold text-zinc-700">No claims found</p>
                <p className="text-xs text-zinc-500">Your submitted claims will appear here.</p>
              </div>
            )}
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="border-t border-slate-200/80 bg-white py-4 mt-auto">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 text-center text-xs text-zinc-400">
          PF Sahi Karo · Citizen-facing EPFO Claim Assistance Prototype · Mocked Test Environment
        </div>
      </footer>
    </div>
  );
}
