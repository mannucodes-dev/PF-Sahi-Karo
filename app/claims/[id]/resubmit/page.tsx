"use client";

import React, { useState, Suspense } from "react";
import Link from "next/link";
import { useParams, useSearchParams } from "next/navigation";
import { getDecoderResult, RemarkCodeRow } from "@/lib/decoder-rules";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button, buttonVariants } from "@/components/ui/button";
import {
  ArrowLeft,
  ArrowRight,
  ShieldCheck,
  CheckCircle2,
  UploadCloud,
  FileCheck,
  Clock,
  Sparkles,
  RefreshCw,
  Loader2,
  AlertCircle,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { submitClaimResubmissionAction } from "@/app/actions/claim-actions";
import { useTranslation } from "@/lib/i18n/context";
import { LanguageSwitcher } from "@/components/language-switcher";

function ClaimResubmitContent() {
  const params = useParams();
  const searchParams = useSearchParams();
  const claimId = params?.id as string;
  const codeParam = searchParams?.get("code");
  const { t } = useTranslation();

  const [idempotencyKey] = useState(() =>
    typeof crypto !== "undefined" && crypto.randomUUID
      ? crypto.randomUUID()
      : `key_${Date.now()}_${Math.random()}`
  );

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [fileError, setFileError] = useState<string | null>(null);
  const [hasConfirmedProfileFix, setHasConfirmedProfileFix] = useState(false);
  const [hasConfirmedBankDetails, setHasConfirmedBankDetails] = useState(false);
  const [notes, setNotes] = useState("");
  const [referenceId, setReferenceId] = useState("");
  const [estimatedReviewDate, setEstimatedReviewDate] = useState("");
  const [serverError, setServerError] = useState<string | null>(null);

  const effectiveCode = codeParam || "NAME_MISMATCH";
  const decoderResult: RemarkCodeRow =
    getDecoderResult(effectiveCode) || (getDecoderResult("NAME_MISMATCH") as RemarkCodeRow);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFileError(null);
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      const validMimes = ["application/pdf", "image/jpeg", "image/png"];

      if (!validMimes.includes(file.type)) {
        setFileError("Invalid format. Please attach a valid PDF, JPG, or PNG file.");
        setSelectedFile(null);
        return;
      }

      if (file.size > 5 * 1024 * 1024) {
        setFileError("File size exceeds 5MB limit. Please compress the file.");
        setSelectedFile(null);
        return;
      }

      setSelectedFile(file);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setServerError(null);

    if (!hasConfirmedProfileFix || !hasConfirmedBankDetails) {
      setServerError("Please confirm all required verification checkboxes before submitting.");
      return;
    }

    setIsSubmitting(true);

    const formData = new FormData();
    formData.append("claimId", claimId);
    formData.append("remarkCode", effectiveCode);
    formData.append("hasConfirmedProfileFix", String(hasConfirmedProfileFix));
    formData.append("hasConfirmedBankDetails", String(hasConfirmedBankDetails));
    formData.append("idempotencyKey", idempotencyKey);
    if (notes) formData.append("notes", notes);

    try {
      const res = await submitClaimResubmissionAction(formData);

      if (res.success && res.referenceId) {
        setReferenceId(res.referenceId);
        setEstimatedReviewDate(res.estimatedReviewDate || "15 working days");
        setIsSubmitted(true);
      } else {
        setServerError(res.error || "Submission failed. Please verify your data and retry.");
      }
    } catch {
      setServerError("Network error connecting to the submission service. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 text-zinc-900 flex flex-col">
      {/* Top Navbar */}
      <header className="sticky top-0 z-30 bg-white border-b border-slate-200/80">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 h-16 sm:h-18 flex items-center justify-between">
          <Link
            href={`/claims/${claimId}`}
            className="text-zinc-600 hover:text-zinc-900 flex items-center gap-1.5 text-xs sm:text-sm font-bold py-1.5 px-3 rounded-lg hover:bg-slate-100 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" aria-hidden="true" /> Back to Claim Detail
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
      <main id="main-content" className="max-w-3xl w-full mx-auto px-4 sm:px-6 py-6 sm:py-8 space-y-6 flex-1">
        {/* Confirmation State */}
        {isSubmitted ? (
          <div className="space-y-6 animate-in fade-in zoom-in-95 duration-300">
            <Card className="border-emerald-200 bg-white shadow-md overflow-hidden text-center rounded-2xl">
              <div className="bg-gradient-to-r from-emerald-700 via-teal-700 to-teal-800 p-7 sm:p-10 text-white">
                <div className="w-16 h-16 sm:w-20 sm:h-20 mx-auto bg-white text-emerald-600 rounded-full flex items-center justify-center shadow-lg mb-4">
                  <CheckCircle2 className="w-10 h-10 sm:w-12 sm:h-12" aria-hidden="true" />
                </div>
                <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
                  {t.resubmit.confirmationTitle}
                </h1>
                <p className="text-teal-100 text-xs sm:text-sm mt-2 max-w-md mx-auto leading-relaxed">
                  {t.resubmit.confirmationSubtitle}
                </p>
              </div>

              <CardContent className="p-5 sm:p-8 space-y-6">
                {/* Timeline Box */}
                <div className="bg-emerald-50 border border-emerald-200 rounded-xl p-4 sm:p-5 text-left space-y-2">
                  <div className="flex items-center gap-2 text-emerald-950 font-bold text-sm sm:text-base">
                    <Clock className="w-4 h-4 text-emerald-700 shrink-0" aria-hidden="true" />
                    {t.resubmit.expectedTimeline}
                  </div>
                  <p className="text-xs sm:text-sm text-emerald-900 leading-relaxed">
                    Estimated field office review target: <strong>{estimatedReviewDate}</strong>. Regional EPFO staff will cross-verify updated records against UIDAI and employer DSC approvals.
                  </p>
                </div>

                {/* Submission Details */}
                <div className="border border-slate-200 rounded-xl p-4 sm:p-5 text-left space-y-3 text-xs sm:text-sm text-zinc-600 bg-slate-50/70">
                  <div className="flex justify-between items-center pb-2.5 border-b border-slate-200">
                    <span className="text-zinc-500 font-sans">{t.resubmit.refNo}</span>
                    <span className="font-mono font-bold text-zinc-900">{referenceId}</span>
                  </div>
                  <div className="flex justify-between items-center pb-2.5 border-b border-slate-200">
                    <span className="text-zinc-500 font-sans">Rectification Focus</span>
                    <span className="font-bold text-zinc-900">{decoderResult.code}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-zinc-500 font-sans">Verification Status</span>
                    <span className="font-bold text-emerald-700 flex items-center gap-1">
                      <CheckCircle2 className="w-4 h-4" aria-hidden="true" />
                      Checklist Compliant
                    </span>
                  </div>
                </div>

                {/* Primary CTA Back to Dashboard */}
                <div className="pt-2">
                  <Link
                    href="/dashboard"
                    className={cn(
                      buttonVariants({ size: "default" }),
                      "w-full sm:w-auto bg-teal-700 hover:bg-teal-800 text-white font-extrabold px-8 py-3.5 rounded-xl shadow-sm inline-flex items-center justify-center gap-2 transition-transform active:scale-[0.98] text-sm"
                    )}
                  >
                    {t.common.backToDashboard} <ArrowRight className="w-4 h-4" aria-hidden="true" />
                  </Link>
                </div>
              </CardContent>
            </Card>
          </div>
        ) : (
          /* Guided Resubmit Form */
          <div className="space-y-6">
            <div className="space-y-1">
              <h1 className="text-xl sm:text-3xl font-extrabold text-zinc-900 flex items-center gap-2.5 tracking-tight">
                <RefreshCw className="w-6 h-6 text-teal-700 shrink-0" aria-hidden="true" />
                {t.resubmit.pageTitle}
              </h1>
              <p className="text-xs sm:text-sm text-zinc-500">
                {t.resubmit.pageSubtitle}
              </p>
            </div>

            {/* Recap of Required Fix */}
            <Card className="border-teal-200 bg-gradient-to-r from-teal-50/90 to-emerald-50/50 shadow-2xs rounded-xl overflow-hidden">
              <CardContent className="p-4 sm:p-5 flex items-start gap-3.5">
                <div className="w-8 h-8 rounded-lg bg-teal-700 text-white flex items-center justify-center shrink-0 mt-0.5 shadow-2xs">
                  <Sparkles className="w-4 h-4" aria-hidden="true" />
                </div>
                <div className="space-y-1">
                  <div className="text-xs font-bold text-teal-950 uppercase tracking-wide">
                    {t.resubmit.recapTitle}: {decoderResult.code}
                  </div>
                  <p className="text-xs sm:text-sm font-medium text-teal-900 leading-relaxed">
                    {decoderResult.plain_text}
                  </p>
                </div>
              </CardContent>
            </Card>

            {/* Error Banner */}
            {serverError && (
              <div
                role="alert"
                className="p-4 bg-rose-50 border border-rose-200 rounded-xl text-xs text-rose-800 flex items-start gap-2.5"
              >
                <AlertCircle className="w-4 h-4 text-rose-600 shrink-0 mt-0.5" aria-hidden="true" />
                <div>
                  <strong className="block font-bold">Submission Incomplete</strong>
                  <span>{serverError}</span>
                </div>
              </div>
            )}

            {/* Resubmit Form */}
            <form onSubmit={handleSubmit}>
              <Card className="border-slate-200 bg-white shadow-sm rounded-xl overflow-hidden">
                <CardHeader className="pb-4 pt-5 px-5 sm:px-6 border-b border-slate-100">
                  <CardTitle className="text-base sm:text-lg font-bold text-zinc-900">
                    {t.resubmit.checklistTitle}
                  </CardTitle>
                  <CardDescription className="text-xs text-zinc-500">
                    {t.resubmit.checklistSubtitle}
                  </CardDescription>
                </CardHeader>

                <CardContent className="space-y-5 p-5 sm:p-6">
                  {/* Verification Checkboxes (Unchecked by default) */}
                  <div className="space-y-3">
                    <label
                      className={cn(
                        "flex items-start gap-3.5 p-4 rounded-xl border transition-colors cursor-pointer select-none",
                        hasConfirmedProfileFix
                          ? "bg-teal-50/70 border-teal-300 ring-1 ring-teal-500/20"
                          : "bg-slate-50 border-slate-200 hover:bg-slate-100"
                      )}
                    >
                      <input
                        type="checkbox"
                        checked={hasConfirmedProfileFix}
                        onChange={(e) => setHasConfirmedProfileFix(e.target.checked)}
                        className="w-5 h-5 rounded border-slate-300 text-teal-700 focus:ring-teal-600 shrink-0 mt-0.5"
                      />
                      <div className="space-y-0.5">
                        <span className="text-xs sm:text-sm font-semibold text-zinc-900 block leading-snug">
                          {t.resubmit.confirmPortalCheck}
                        </span>
                        <span className="text-[11px] text-zinc-500 block">
                          Mandatory: Confirm correction before proceeding.
                        </span>
                      </div>
                    </label>

                    <label
                      className={cn(
                        "flex items-start gap-3.5 p-4 rounded-xl border transition-colors cursor-pointer select-none",
                        hasConfirmedBankDetails
                          ? "bg-teal-50/70 border-teal-300 ring-1 ring-teal-500/20"
                          : "bg-slate-50 border-slate-200 hover:bg-slate-100"
                      )}
                    >
                      <input
                        type="checkbox"
                        checked={hasConfirmedBankDetails}
                        onChange={(e) => setHasConfirmedBankDetails(e.target.checked)}
                        className="w-5 h-5 rounded border-slate-300 text-teal-700 focus:ring-teal-600 shrink-0 mt-0.5"
                      />
                      <div className="space-y-0.5">
                        <span className="text-xs sm:text-sm font-semibold text-zinc-900 block leading-snug">
                          {t.resubmit.confirmBankCheck}
                        </span>
                        <span className="text-[11px] text-zinc-500 block">
                          Mandatory: Check that the bank account is active.
                        </span>
                      </div>
                    </label>
                  </div>

                  {/* Supporting Document Upload */}
                  <div className="space-y-2 pt-2 border-t border-slate-100">
                    <label className="text-xs sm:text-sm font-bold text-zinc-900 block">
                      {t.resubmit.uploadTitle} (Optional Demo Attachment)
                    </label>
                    <p className="text-xs text-zinc-500">
                      {t.resubmit.uploadSubtitle}
                    </p>

                    <div className="border-2 border-dashed border-slate-200 hover:border-teal-400 rounded-xl p-5 text-center transition-colors bg-slate-50/50">
                      <input
                        type="file"
                        id="supporting-doc"
                        onChange={handleFileChange}
                        accept=".pdf,.jpg,.jpeg,.png"
                        className="sr-only"
                      />
                      <label htmlFor="supporting-doc" className="cursor-pointer block space-y-2">
                        {selectedFile ? (
                          <div className="flex items-center justify-center gap-2 text-teal-800 font-semibold text-xs sm:text-sm">
                            <FileCheck className="w-5 h-5 text-emerald-600" />
                            <span>{selectedFile.name} ({(selectedFile.size / 1024).toFixed(1)} KB)</span>
                          </div>
                        ) : (
                          <>
                            <UploadCloud className="w-8 h-8 mx-auto text-slate-400" />
                            <span className="text-xs font-semibold text-teal-700 hover:text-teal-900 block">
                              Click to attach document
                            </span>
                            <span className="text-[11px] text-zinc-400 block">
                              {t.resubmit.uploadInstructions}
                            </span>
                          </>
                        )}
                      </label>
                    </div>

                    {fileError && (
                      <p className="text-xs text-rose-600 font-medium flex items-center gap-1">
                        <AlertCircle className="w-3.5 h-3.5 inline" /> {fileError}
                      </p>
                    )}
                  </div>

                  {/* Clarification Notes */}
                  <div className="space-y-1.5 pt-2 border-t border-slate-100">
                    <label htmlFor="resubmit-notes" className="text-xs sm:text-sm font-bold text-zinc-900 block">
                      Additional Notes for Reviewing Field Office
                    </label>
                    <textarea
                      id="resubmit-notes"
                      rows={2}
                      value={notes}
                      onChange={(e) => setNotes(e.target.value)}
                      placeholder="e.g. Aadhaar name updated online and employer approved on Unified Portal on 2026-08-25..."
                      className="w-full text-xs sm:text-sm p-3 rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-teal-600"
                    />
                  </div>

                  {/* Submission Action Button */}
                  <div className="pt-4 border-t border-slate-100 flex flex-col sm:flex-row items-center justify-end gap-3">
                    <Link
                      href={`/claims/${claimId}`}
                      className={cn(buttonVariants({ variant: "outline" }), "w-full sm:w-auto text-xs")}
                    >
                      {t.common.cancel}
                    </Link>
                    <Button
                      type="submit"
                      disabled={isSubmitting || !hasConfirmedProfileFix || !hasConfirmedBankDetails}
                      className="w-full sm:w-auto bg-teal-700 hover:bg-teal-800 text-white font-extrabold px-6 py-2.5 rounded-xl shadow-xs text-xs sm:text-sm disabled:opacity-50 cursor-pointer"
                    >
                      {isSubmitting ? (
                        <>
                          <Loader2 className="w-4 h-4 animate-spin mr-2" />
                          {t.common.submitting}
                        </>
                      ) : (
                        t.common.submit
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
      <footer className="border-t border-slate-200 bg-white py-4 mt-auto">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 text-center text-xs text-zinc-500">
          {t.common.officialDisclaimer}
        </div>
      </footer>
    </div>
  );
}

export default function ClaimResubmitPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen bg-slate-50 flex items-center justify-center p-6 text-zinc-500 text-sm">
          Loading resubmission form...
        </div>
      }
    >
      <ClaimResubmitContent />
    </Suspense>
  );
}
