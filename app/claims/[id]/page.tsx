import React from "react";
import Link from "next/link";
import { notFound } from "next/navigation";
import { MOCK_CLAIMS, MOCK_USER } from "@/lib/mock-data";
import { getDecoderResult } from "@/lib/decoder-rules";
import { StatusBadge } from "@/components/status-badge";
import { DecoderPanel } from "@/components/decoder-panel";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { buttonVariants } from "@/components/ui/button";
import {
  ArrowLeft,
  ArrowRight,
  IndianRupee,
  Calendar,
  ShieldCheck,
  CheckCircle2,
  Clock,
  Landmark,
  FileCheck,
  Send,
} from "lucide-react";
import { cn } from "@/lib/utils";

interface PageProps {
  params: Promise<{ id: string }>;
}

export default async function ClaimDetailPage({ params }: PageProps) {
  const { id } = await params;
  const claim = MOCK_CLAIMS.find((c) => c.id === id);

  if (!claim) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center p-6 text-zinc-900">
        <Card className="max-w-md w-full text-center p-6 border-zinc-200">
          <CardTitle className="text-lg font-bold">Claim Not Found</CardTitle>
          <CardDescription className="mt-2 text-sm text-zinc-600">
            No claim matching the ID &ldquo;{id}&rdquo; was found in the system.
          </CardDescription>
          <div className="mt-6">
            <Link
              href="/dashboard"
              className={cn(buttonVariants({ variant: "outline" }), "w-full")}
            >
              <ArrowLeft className="w-4 h-4 mr-2" /> Back to Dashboard
            </Link>
          </div>
        </Card>
      </div>
    );
  }

  const isRejected = claim.status === "rejected";
  const isApproved = claim.status === "approved";
  const isPending = claim.status === "pending";

  // Resolve decoder result dynamically from lookup table
  const decoderResult = isRejected ? getDecoderResult(claim.remark_code) : null;

  return (
    <div className="min-h-screen bg-slate-50 text-zinc-900 flex flex-col">
      {/* Top Navbar */}
      <header className="sticky top-0 z-30 bg-white border-b border-zinc-200/80">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Link
              href="/dashboard"
              className="text-zinc-600 hover:text-zinc-900 flex items-center gap-1.5 text-xs sm:text-sm font-medium py-1.5 px-2.5 rounded-md hover:bg-zinc-100 transition-colors"
            >
              <ArrowLeft className="w-4 h-4" /> Back to Dashboard
            </Link>
          </div>
          <div className="flex items-center gap-2 text-xs text-zinc-500">
            <ShieldCheck className="w-4 h-4 text-teal-600" />
            <span className="font-semibold text-zinc-700">PF Sahi Karo</span>
          </div>
        </div>
      </header>

      {/* Main Container */}
      <main className="max-w-4xl w-full mx-auto px-4 sm:px-6 py-6 sm:py-8 space-y-6 flex-1">
        {/* 1. Claim Summary Header Card */}
        <Card className="border-slate-200/90 bg-white shadow-sm overflow-hidden rounded-xl">
          <CardContent className="p-5 sm:p-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-100 pb-5">
              <div className="space-y-1.5">
                <div className="flex flex-wrap items-center gap-2.5">
                  <h1 className="text-xl sm:text-2xl font-bold text-zinc-900 tracking-tight">
                    {claim.claim_type}
                  </h1>
                  <StatusBadge status={claim.status} />
                </div>
                <div className="text-xs text-zinc-500 font-mono flex items-center gap-2">
                  <span>Claim ID: <strong className="text-zinc-700">{claim.id}</strong></span>
                </div>
              </div>

              {/* Amount Display */}
              <div className="text-left sm:text-right bg-slate-50 sm:bg-transparent p-3 sm:p-0 rounded-lg shrink-0">
                <div className="text-[11px] uppercase tracking-wider text-zinc-400 font-semibold">
                  Claim Amount
                </div>
                <div className="text-2xl sm:text-3xl font-extrabold text-zinc-900 flex items-center sm:justify-end">
                  <IndianRupee className="w-5 h-5 text-zinc-700 shrink-0" />
                  {claim.amount.toLocaleString("en-IN")}
                </div>
              </div>
            </div>

            {/* Key Dates & Meta Info */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-4 text-xs text-zinc-600">
              <div className="flex items-center gap-2">
                <Calendar className="w-4 h-4 text-slate-400 shrink-0" />
                <span>
                  Submitted Date: <strong className="text-zinc-800">{claim.submitted_date}</strong>
                </span>
              </div>

              {claim.settled_date && (
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>
                    Settled Date: <strong className="text-zinc-800">{claim.settled_date}</strong>
                  </span>
                </div>
              )}

              <div className="flex items-center gap-2">
                <Landmark className="w-4 h-4 text-slate-400 shrink-0" />
                <span>
                  UAN <span className="text-zinc-400 text-[11px]">(Universal Account Number)</span>: <strong className="font-mono text-zinc-800">{MOCK_USER.uan}</strong>
                </span>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* 2. State-Specific Content */}

        {/* A. REJECTED STATE: The centerpiece decoder & CTA */}
        {isRejected && decoderResult && (
          <div className="space-y-6">
            <div className="border-l-4 border-rose-500 pl-3.5 py-0.5">
              <h2 className="text-base sm:text-lg font-bold text-zinc-900 tracking-tight">
                EPFO Rejection Analysis & Resolution Path
              </h2>
              <p className="text-xs text-zinc-500">
                Official rejection notice decoded into plain language with verified action steps
              </p>
            </div>

            {/* Decoder Panel */}
            <DecoderPanel remark={decoderResult} />

            {/* Action Bar / Primary CTA */}
            <Card className="border-teal-300 bg-gradient-to-r from-teal-50/90 via-teal-50/50 to-emerald-50/50 shadow-sm p-4 sm:p-6 rounded-xl">
              <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
                <div className="space-y-1 text-center sm:text-left">
                  <h3 className="font-bold text-base sm:text-lg text-teal-950">
                    Ready to resolve this claim?
                  </h3>
                  <p className="text-xs sm:text-sm text-teal-800">
                    Follow our guided resubmission workflow to ensure complete compliance.
                  </p>
                </div>
                <Link
                  href={`/claims/${claim.id}/resubmit`}
                  className={cn(
                    buttonVariants({ size: "default" }),
                    "w-full sm:w-auto bg-teal-700 hover:bg-teal-800 text-white font-semibold px-7 py-3 rounded-lg shadow-sm flex items-center justify-center gap-2 transition-transform active:scale-[0.98] text-sm cursor-pointer"
                  )}
                >
                  Sahi Karo → Resubmit claim <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </Card>
          </div>
        )}

        {/* B. APPROVED STATE */}
        {isApproved && (
          <Card className="border-emerald-200 bg-gradient-to-br from-emerald-50/60 via-white to-emerald-50/30 shadow-sm rounded-xl overflow-hidden">
            <CardHeader className="pb-2 pt-5 px-5 sm:px-6">
              <div className="flex items-center gap-2.5 text-emerald-900 font-bold text-base sm:text-lg">
                <div className="w-8 h-8 rounded-full bg-emerald-600 text-white flex items-center justify-center shadow-2xs shrink-0">
                  <CheckCircle2 className="w-5 h-5" />
                </div>
                Settlement Completed Successfully
              </div>
            </CardHeader>
            <CardContent className="space-y-4 px-5 sm:px-6 pb-6 pt-1">
              <p className="text-sm text-zinc-800 leading-relaxed">
                Your claim of <strong className="text-zinc-900 font-semibold">₹{claim.amount.toLocaleString("en-IN")}</strong> has been approved by the EPFO field office. Funds were electronically credited via NEFT to your KYC-verified bank account ending in <strong className="font-mono text-zinc-900 font-semibold">{MOCK_USER.bank_account_last4}</strong> on <strong className="text-zinc-900 font-semibold">{claim.settled_date}</strong>.
              </p>
              <div className="p-4 bg-white border border-emerald-100 rounded-lg text-xs font-mono text-zinc-600 space-y-1.5 shadow-2xs">
                <div className="flex justify-between"><span className="text-zinc-400 font-sans">Payment Mode:</span> <span className="font-semibold text-zinc-800">Electronic NEFT Transfer</span></div>
                <div className="flex justify-between"><span className="text-zinc-400 font-sans">Transfer Status:</span> <span className="font-semibold text-emerald-700">Settled & Disbursed</span></div>
                <div className="flex justify-between"><span className="text-zinc-400 font-sans">Beneficiary Name:</span> <span className="font-semibold text-zinc-800">{MOCK_USER.full_name}</span></div>
              </div>
              <div className="pt-2">
                <Link
                  href="/dashboard"
                  className={cn(buttonVariants({ variant: "outline" }), "text-xs font-medium")}
                >
                  <ArrowLeft className="w-3.5 h-3.5 mr-1.5" /> Return to Claims Dashboard
                </Link>
              </div>
            </CardContent>
          </Card>
        )}

        {/* C. PENDING STATE */}
        {isPending && (
          <Card className="border-amber-200 bg-gradient-to-br from-amber-50/50 via-white to-amber-50/30 shadow-sm rounded-xl overflow-hidden">
            <CardHeader className="pb-2 pt-5 px-5 sm:px-6">
              <div className="flex items-center gap-2.5 text-amber-900 font-bold text-base sm:text-lg">
                <div className="w-8 h-8 rounded-full bg-amber-500 text-white flex items-center justify-center shadow-2xs shrink-0">
                  <Clock className="w-5 h-5" />
                </div>
                Claim Under Active Field Office Processing
              </div>
            </CardHeader>
            <CardContent className="space-y-6 px-5 sm:px-6 pb-6 pt-1">
              <p className="text-sm text-zinc-800 leading-relaxed">
                Your claim of <strong className="text-zinc-900 font-semibold">₹{claim.amount.toLocaleString("en-IN")}</strong> is currently being processed by the regional EPFO Field Office. Standard settlement processing typically takes between 15 to 20 working days from submission date.
              </p>

              {/* 3-Step Progress Tracker */}
              <div className="bg-white border border-amber-200/80 rounded-xl p-5 sm:p-6 shadow-2xs">
                <div className="text-xs font-bold text-zinc-700 uppercase tracking-wider mb-5">
                  Processing Stage
                </div>
                <div className="grid grid-cols-3 gap-2 relative">
                  {/* Step 1 */}
                  <div className="text-center space-y-2">
                    <div className="w-9 h-9 mx-auto rounded-full bg-emerald-100 text-emerald-800 flex items-center justify-center font-bold text-xs shadow-2xs">
                      ✓
                    </div>
                    <div className="font-semibold text-xs sm:text-sm text-zinc-900">Submitted</div>
                    <div className="text-[11px] text-zinc-500">{claim.submitted_date}</div>
                  </div>

                  {/* Step 2 */}
                  <div className="text-center space-y-2">
                    <div className="w-9 h-9 mx-auto rounded-full bg-amber-500 text-white flex items-center justify-center font-bold text-xs shadow-2xs ring-4 ring-amber-100">
                      2
                    </div>
                    <div className="font-semibold text-xs sm:text-sm text-amber-950">Under Review</div>
                    <div className="text-[11px] text-amber-700 font-medium">Regional Office</div>
                  </div>

                  {/* Step 3 */}
                  <div className="text-center space-y-2 opacity-50">
                    <div className="w-9 h-9 mx-auto rounded-full bg-slate-100 text-slate-400 flex items-center justify-center font-bold text-xs">
                      3
                    </div>
                    <div className="font-semibold text-xs sm:text-sm text-zinc-600">Decision</div>
                    <div className="text-[11px] text-zinc-400">Pending</div>
                  </div>
                </div>
              </div>

              <div className="pt-2">
                <Link
                  href="/dashboard"
                  className={cn(buttonVariants({ variant: "outline" }), "text-xs font-medium")}
                >
                  <ArrowLeft className="w-3.5 h-3.5 mr-1.5" /> Return to Claims Dashboard
                </Link>
              </div>
            </CardContent>
          </Card>
        )}
      </main>

      {/* Footer */}
      <footer className="border-t border-zinc-200/80 bg-white py-4 mt-auto">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 text-center text-xs text-zinc-400">
          PF Sahi Karo · EPFO Claim Assistance Platform · Deterministic Rules Engine
        </div>
      </footer>
    </div>
  );
}
