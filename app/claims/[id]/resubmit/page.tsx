"use client";

import React, { useState, useEffect, Suspense } from "react";
import Link from "next/link";
import { useParams, useRouter, useSearchParams } from "next/navigation";
import { MOCK_CLAIMS, MOCK_USER, Claim, RemarkCodeKey } from "@/lib/mock-data";
import { getDecoderResult } from "@/lib/decoder-rules";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button, buttonVariants } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  ArrowLeft,
  ArrowRight,
  ShieldCheck,
  CheckCircle2,
  UploadCloud,
  FileCheck,
  AlertCircle,
  Clock,
  Sparkles,
  RefreshCw,
  Loader2,
  Calendar,
} from "lucide-react";
import { cn } from "@/lib/utils";

function ClaimResubmitContent() {
  const params = useParams();
  const router = useRouter();
  const searchParams = useSearchParams();
  const claimId = params?.id as string;
  const codeParam = searchParams?.get("code") as RemarkCodeKey | null;

  const [claim, setClaim] = useState<Claim | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [selectedFile, setSelectedFile] = useState<string | null>(null);
  const [hasConfirmedFix, setHasConfirmedFix] = useState(true);
  const [referenceId, setReferenceId] = useState("");

  useEffect(() => {
    if (claimId) {
      const found = MOCK_CLAIMS.find((c) => c.id === claimId);
      setClaim(found || null);
    }
  }, [claimId]);

  if (!claim) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center p-6 text-zinc-900">
        <Card className="max-w-md w-full text-center p-6 border-zinc-200">
          <CardTitle className="text-lg font-bold">Claim Not Found</CardTitle>
          <CardDescription className="mt-2 text-sm text-zinc-600">
            No claim matching this ID was found.
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

  const effectiveCode: RemarkCodeKey =
    codeParam && (codeParam in (getDecoderResult(codeParam) ? { [codeParam]: true } : {}))
      ? codeParam
      : claim.remark_code || "NAME_MISMATCH";

  const decoderResult = getDecoderResult(effectiveCode);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Realistic 1.5s loading state per UI-UX-FLOW.md
    setTimeout(() => {
      setIsSubmitting(false);
      setReferenceId(`EPFO-RSUB-${Math.floor(100000 + Math.random() * 900000)}`);
      setIsSubmitted(true);
    }, 1500);
  };

  const handleMockFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setSelectedFile(e.target.files[0].name);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 text-zinc-900 flex flex-col">
      {/* Top Navbar */}
      <header className="sticky top-0 z-30 bg-white border-b border-zinc-200/80">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
          <Link
            href={`/claims/${claim.id}`}
            className="text-zinc-600 hover:text-zinc-900 flex items-center gap-1.5 text-xs sm:text-sm font-medium py-1.5 px-2.5 rounded-md hover:bg-zinc-100 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" /> Back to Claim Detail
          </Link>
          <div className="flex items-center gap-2 text-xs text-zinc-500">
            <ShieldCheck className="w-4 h-4 text-teal-600" />
            <span className="font-semibold text-zinc-700">PF Sahi Karo</span>
          </div>
        </div>
      </header>

      {/* Main Container */}
      <main className="max-w-3xl w-full mx-auto px-4 sm:px-6 py-6 sm:py-8 space-y-6 flex-1">
        {/* SCREEN 5: Confirmation State */}
        {isSubmitted ? (
          <div className="space-y-6 animate-in fade-in zoom-in-95 duration-300">
            <Card className="border-emerald-200 bg-white shadow-md overflow-hidden text-center rounded-2xl">
              <div className="bg-gradient-to-r from-emerald-700 via-teal-700 to-teal-800 p-7 sm:p-10 text-white">
                <div className="w-16 h-16 sm:w-20 sm:h-20 mx-auto bg-white text-emerald-600 rounded-full flex items-center justify-center shadow-lg mb-4">
                  <CheckCircle2 className="w-10 h-10 sm:w-12 sm:h-12" />
                </div>
                <h1 className="text-2xl sm:text-3xl font-bold tracking-tight">
                  Resubmitted Successfully!
                </h1>
                <p className="text-teal-100 text-xs sm:text-sm mt-2 max-w-md mx-auto leading-relaxed">
                  Your corrected claim documents and resolution confirmation have been submitted for EPFO processing.
                </p>
              </div>

              <CardContent className="p-5 sm:p-8 space-y-6">
                {/* Timeline Box */}
                <div className="bg-emerald-50/80 border border-emerald-200/80 rounded-xl p-4 sm:p-5 text-left space-y-2.5">
                  <div className="flex items-center gap-2 text-emerald-950 font-bold text-sm sm:text-base">
                    <Clock className="w-4 h-4 text-emerald-700 shrink-0" />
                    Expected Review Timeline
                  </div>
                  <p className="text-xs sm:text-sm text-emerald-900 leading-relaxed">
                    <strong>Expected update within 15 working days.</strong> Regional field office will review your rectified records against the Aadhaar central database.
                  </p>
                </div>

                {/* Submission Details */}
                <div className="border border-slate-200 rounded-xl p-4 sm:p-5 text-left space-y-3 text-xs sm:text-sm text-zinc-600 bg-slate-50/70">
                  <div className="flex justify-between items-center pb-2.5 border-b border-slate-200">
                    <span className="text-zinc-500 font-sans">Resubmission Ref No.</span>
                    <span className="font-mono font-bold text-zinc-900">{referenceId}</span>
                  </div>
                  <div className="flex justify-between items-center pb-2.5 border-b border-slate-200">
                    <span className="text-zinc-500 font-sans">Claim Type</span>
                    <span className="font-semibold text-zinc-900">{claim.claim_type}</span>
                  </div>
                  <div className="flex justify-between items-center pb-2.5 border-b border-slate-200">
                    <span className="text-zinc-500 font-sans">Claim Amount</span>
                    <span className="font-semibold text-zinc-900">₹{claim.amount.toLocaleString("en-IN")}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-zinc-500 font-sans">Correction Verified</span>
                    <span className="font-semibold text-emerald-700 flex items-center gap-1">
                      <CheckCircle2 className="w-3.5 h-3.5" />
                      {decoderResult ? decoderResult.code : "Discrepancy Rectified"}
                    </span>
                  </div>
                </div>

                {/* Primary CTA Back to Dashboard */}
                <div className="pt-2">
                  <Link
                    href="/dashboard"
                    className={cn(
                      buttonVariants({ size: "default" }),
                      "w-full sm:w-auto bg-teal-700 hover:bg-teal-800 text-white font-semibold px-8 py-3 rounded-lg shadow-sm inline-flex items-center justify-center gap-2 transition-transform active:scale-[0.98] text-sm"
                    )}
                  >
                    Back to Dashboard <ArrowRight className="w-4 h-4" />
                  </Link>
                </div>
              </CardContent>
            </Card>
          </div>
        ) : (
          /* SCREEN 4: Guided Resubmit Form */
          <div className="space-y-6">
            <div className="space-y-1">
              <h1 className="text-xl sm:text-2xl font-bold text-zinc-900 flex items-center gap-2.5 tracking-tight">
                <RefreshCw className="w-6 h-6 text-teal-700 shrink-0" />
                Guided Claim Resubmission
              </h1>
              <p className="text-xs sm:text-sm text-zinc-500">
                Verify your corrections before resubmitting to ensure smooth EPFO clearance
              </p>
            </div>

            {/* 1. Fix Required Recap */}
            <Card className="border-teal-200 bg-gradient-to-r from-teal-50/90 to-emerald-50/50 shadow-2xs rounded-xl overflow-hidden">
              <CardContent className="p-4 sm:p-5 flex items-start gap-3.5">
                <div className="w-8 h-8 rounded-lg bg-teal-700 text-white flex items-center justify-center flex-shrink-0 mt-0.5 shadow-2xs">
                  <Sparkles className="w-4 h-4" />
                </div>
                <div className="space-y-1">
                  <div className="text-xs font-bold text-teal-950 uppercase tracking-wide">
                    Recap: Required Fix
                  </div>
                  <p className="text-xs sm:text-sm font-medium text-teal-900 leading-relaxed">
                    {effectiveCode === "NAME_MISMATCH"
                      ? "Ensure your name spelling on EPFO Member Sewa portal matches your Aadhaar card character-for-character before submitting."
                      : decoderResult?.plain_explanation ||
                        "Resolve the specific remark items noted in the rejection report."}
                  </p>
                </div>
              </CardContent>
            </Card>

            {/* Resubmit Form */}
            <form onSubmit={handleSubmit}>
              <Card className="border-slate-200 bg-white shadow-sm rounded-xl overflow-hidden">
                <CardHeader className="pb-4 pt-5 px-5 sm:px-6 border-b border-slate-100">
                  <CardTitle className="text-base sm:text-lg font-bold text-zinc-900">
                    Correction Checklist & Supporting Document
                  </CardTitle>
                  <CardDescription className="text-xs text-zinc-500">
                    Confirm rectified details before dispatching to EPFO
                  </CardDescription>
                </CardHeader>

                <CardContent className="space-y-5 p-5 sm:p-6">
                  {/* Verification Checkboxes */}
                  <div className="space-y-3">
                    <label className="flex items-start gap-3 p-3.5 rounded-xl border border-slate-200 bg-slate-50/70 hover:bg-teal-50/40 hover:border-teal-200 cursor-pointer transition-colors select-none">
                      <input
                        type="checkbox"
                        checked={hasConfirmedFix}
                        onChange={(e) => setHasConfirmedFix(e.target.checked)}
                        className="mt-0.5 h-4 w-4 rounded border-slate-300 text-teal-700 focus:ring-teal-500 shrink-0 cursor-pointer"
                      />
                      <span className="text-xs sm:text-sm text-zinc-800 leading-snug font-medium">
                        I have verified and updated my profile details on the EPFO Member Sewa portal according to the decode instructions.
                      </span>
                    </label>

                    <label className="flex items-start gap-3 p-3.5 rounded-xl border border-slate-200 bg-slate-50/70 hover:bg-teal-50/40 hover:border-teal-200 cursor-pointer transition-colors select-none">
                      <input
                        type="checkbox"
                        defaultChecked
                        className="mt-0.5 h-4 w-4 rounded border-slate-300 text-teal-700 focus:ring-teal-500 shrink-0 cursor-pointer"
                      />
                      <span className="text-xs sm:text-sm text-zinc-800 leading-snug font-medium">
                        I confirm that the bank account ending in <strong className="font-mono">{MOCK_USER.bank_account_last4}</strong> is active and linked with my UAN.
                      </span>
                    </label>
                  </div>

                  {/* Mock Document Upload Area */}
                  <div className="space-y-2">
                    <label className="text-xs font-semibold text-zinc-700 block">
                      Upload Corrected Supporting Document (Optional for Demo)
                    </label>
                    <div className="border-2 border-dashed border-slate-300 hover:border-teal-400 rounded-xl p-6 sm:p-7 text-center bg-slate-50/60 transition-colors">
                      <UploadCloud className="w-8 h-8 sm:w-10 sm:h-10 mx-auto text-slate-400 mb-2" />
                      <div className="text-xs sm:text-sm text-zinc-700 mb-1">
                        {selectedFile ? (
                          <span className="font-bold text-teal-800 flex items-center justify-center gap-1.5">
                            <FileCheck className="w-4 h-4 text-teal-600" /> {selectedFile} (Attached)
                          </span>
                        ) : (
                          <span>
                            Click or drag to attach updated Aadhaar copy or Joint Declaration Form
                          </span>
                        )}
                      </div>
                      <p className="text-[11px] text-zinc-400">
                        PDF, JPG, PNG up to 5MB (Any file accepted for mock demo)
                      </p>
                      <input
                        type="file"
                        onChange={handleMockFileChange}
                        className="mt-4 block w-full text-xs text-zinc-500 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-xs file:font-semibold file:bg-teal-100/70 file:text-teal-900 hover:file:bg-teal-200 cursor-pointer mx-auto max-w-xs"
                      />
                    </div>
                  </div>

                  {/* Submission Action */}
                  <div className="pt-3 border-t border-slate-100 flex flex-col-reverse sm:flex-row items-center justify-between gap-3">
                    <Link
                      href={`/claims/${claim.id}`}
                      className={cn(
                        buttonVariants({ variant: "ghost", size: "sm" }),
                        "text-zinc-500 hover:text-zinc-800 w-full sm:w-auto text-center font-medium"
                      )}
                    >
                      Cancel
                    </Link>

                    <Button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full sm:w-auto bg-teal-700 hover:bg-teal-800 text-white font-semibold px-7 py-2.5 rounded-lg shadow-sm flex items-center justify-center gap-2 transition-transform active:scale-[0.98] cursor-pointer text-sm"
                    >
                      {isSubmitting ? (
                        <>
                          <Loader2 className="w-4 h-4 animate-spin" /> Submitting Correction...
                        </>
                      ) : (
                        <>
                          Submit correction <ArrowRight className="w-4 h-4" />
                        </>
                      )}
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </form>
          </div>
        )}
      </main>

      {/* Footer */}
      <footer className="border-t border-zinc-200/80 bg-white py-4 mt-auto">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 text-center text-xs text-zinc-400">
          PF Sahi Karo · Guided Resubmission Engine · Citizen Assistance Demo
        </div>
      </footer>
    </div>
  );
}

export default function ClaimResubmitPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen bg-slate-50 flex items-center justify-center text-zinc-600">
          <div className="flex items-center gap-2 text-sm font-medium">
            <Loader2 className="w-5 h-5 animate-spin text-teal-700" />
            Loading resubmission portal...
          </div>
        </div>
      }
    >
      <ClaimResubmitContent />
    </Suspense>
  );
}
