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
      <header className="sticky top-0 z-30 bg-white border-b border-zinc-200/80">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="bg-teal-600 text-white w-9 h-9 rounded-xl flex items-center justify-center shadow-sm">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div>
              <span className="font-bold text-base tracking-tight text-zinc-900">
                PF Sahi Karo
              </span>
              <span className="hidden sm:inline-block text-xs text-zinc-500 ml-2 border-l border-zinc-200 pl-2">
                EPFO Claim Assistance
              </span>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <div className="hidden sm:flex items-center gap-2 text-xs text-zinc-600 bg-zinc-100/80 px-3 py-1.5 rounded-full">
              <User className="w-3.5 h-3.5 text-zinc-500" />
              <span>{user.full_name}</span>
              <span className="text-zinc-300">|</span>
              <span className="font-mono text-[11px]">UAN: {user.uan}</span>
            </div>
            <Link
              href="/login"
              className="text-xs text-zinc-500 hover:text-zinc-800 flex items-center gap-1 py-1.5 px-2.5 rounded-md hover:bg-zinc-100 transition-colors"
              title="Sign out & return to Login"
            >
              <LogOut className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Sign out</span>
            </Link>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-5xl w-full mx-auto px-4 sm:px-6 py-6 sm:py-8 space-y-6 flex-1">
        {/* Profile & PF Balance Banner */}
        <Card className="border-teal-100 bg-gradient-to-br from-teal-900 via-teal-800 to-teal-950 text-white shadow-md overflow-hidden relative">
          <div className="absolute right-0 top-0 translate-x-8 -translate-y-8 w-64 h-64 bg-teal-500/10 rounded-full blur-2xl pointer-events-none" />
          <CardContent className="p-6 sm:p-8 relative z-10">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6">
              <div className="space-y-2">
                <div className="inline-flex items-center gap-2 px-2.5 py-1 rounded-full bg-teal-800/80 border border-teal-700 text-teal-200 text-xs font-medium">
                  <Landmark className="w-3.5 h-3.5" /> EPFO Member Account
                </div>
                <h1 className="text-xl sm:text-2xl font-bold tracking-tight">
                  Namaste, {user.full_name}
                </h1>
                <p className="text-xs sm:text-sm text-teal-100/80 flex items-center gap-2">
                  <span>UAN: <strong className="font-mono text-white">{user.uan}</strong></span>
                  <span>•</span>
                  <span>Bank: ending in <strong className="font-mono text-white">XXXX{user.bank_account_last4}</strong></span>
                </p>
              </div>

              {/* Large PF Balance Display */}
              <div className="bg-white/10 backdrop-blur-sm border border-white/10 rounded-xl p-4 sm:p-5 text-left sm:text-right min-w-[200px]">
                <div className="text-xs uppercase tracking-wider text-teal-200 font-medium mb-1">
                  Total PF Balance
                </div>
                <div className="text-2xl sm:text-3xl font-extrabold tracking-tight text-white flex items-center sm:justify-end">
                  <IndianRupee className="w-6 h-6 sm:w-7 sm:h-7 text-teal-300 mr-0.5" />
                  {user.pf_balance.toLocaleString("en-IN")}
                </div>
                <div className="text-[11px] text-teal-200/70 mt-1">
                  Updated as per latest EPFO passbook
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Claims Section */}
        <section className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-lg font-bold text-zinc-900 flex items-center gap-2">
                <FileText className="w-5 h-5 text-teal-700" />
                Your Claims
              </h2>
              <p className="text-xs text-zinc-500">
                Track previous and active claim requests submitted to EPFO
              </p>
            </div>
            <Badge variant="outline" className="bg-white text-zinc-600 border-zinc-200">
              {claims.length} Claims on Record
            </Badge>
          </div>

          {/* List of Claims */}
          <div className="space-y-3">
            {claims.length > 0 ? (
              claims.map((claim) => (
                <ClaimCard key={claim.id} claim={claim} />
              ))
            ) : (
              <div className="rounded-xl border border-dashed border-zinc-300 p-8 text-center bg-white space-y-2">
                <AlertCircle className="w-8 h-8 text-zinc-400 mx-auto" />
                <p className="text-sm font-medium text-zinc-700">No claims found</p>
                <p className="text-xs text-zinc-500">Your submitted claims will appear here.</p>
              </div>
            )}
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="border-t border-zinc-200/80 bg-white py-4 mt-auto">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 text-center text-xs text-zinc-400">
          PF Sahi Karo · Citizen-facing EPFO Claim Assistance Prototype · Mocked Test Environment
        </div>
      </footer>
    </div>
  );
}
