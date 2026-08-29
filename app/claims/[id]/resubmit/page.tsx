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
    typeof crypto !== "undefined" && typeof crypto.randomUUID === "function"
      ? crypto.randomUUID()
      : "c0000000-0000-0000-0000-000000000001"
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
    <div className="min-h-screen bg-background text-on-surface flex flex-col">
      {/* Top Navbar */}
      <header className="glass-nav sticky top-0 z-30 border-b border-outline-variant/30">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 h-16 sm:h-18 flex items-center justify-between">
          <Link
            href={`/claims/${claimId}`}
            className="text-on-surface-variant hover:text-primary flex items-center gap-1.5 text-xs sm:text-sm font-bold py-2 px-3 rounded-xl hover:bg-surface-container-high transition-colors"
          >
            <span className="material-symbols-outlined text-[18px]">arrow_back</span>
            <span>{t.common.backToDashboard}</span>
          </Link>
          <div className="flex items-center gap-3">
            <LanguageSwitcher direction="down" align="right" />
            <div className="flex items-center gap-2">
              <img src="/logo.png" alt="Logo" className="w-7 h-7 object-contain rounded-md" />
              <span className="font-bold text-sm text-primary hidden sm:inline">PF Sahi Karo</span>
            </div>
          </div>
        </div>
      </header>

      {/* Main Container */}
      <main id="main-content" className="max-w-3xl w-full mx-auto px-4 sm:px-6 py-6 sm:py-8 space-y-8 flex-1">
        {/* Confirmation State */}
        {isSubmitted ? (
          <div className="space-y-6 animate-in fade-in zoom-in-95 duration-300">
            <div className="glass-card border-success-emerald/30 rounded-2xl overflow-hidden text-center shadow-md">
              <div className="bg-primary p-8 sm:p-10 text-on-primary relative overflow-hidden">
                <div className="w-16 h-16 sm:w-20 sm:h-20 mx-auto bg-white text-primary rounded-full flex items-center justify-center shadow-lg mb-4">
                  <span className="material-symbols-outlined text-4xl text-primary font-bold">check_circle</span>
                </div>
                <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
                  {t.resubmit.confirmationTitle}
                </h1>
                <p className="text-primary-fixed-dim text-xs sm:text-sm mt-2 max-w-md mx-auto leading-relaxed">
                  {t.resubmit.confirmationSubtitle}
                </p>
              </div>

              <div className="p-6 sm:p-8 space-y-6">
                {/* Timeline Box */}
                <div className="bg-primary/10 border border-primary/20 rounded-xl p-4 sm:p-5 text-left space-y-2">
                  <div className="flex items-center gap-2 text-primary font-bold text-sm sm:text-base">
                    <span className="material-symbols-outlined text-[18px]">schedule</span>
                    <span>{t.resubmit.expectedTimeline}</span>
                  </div>
                  <p className="text-xs sm:text-sm text-on-surface leading-relaxed">
                    Estimated field office review target: <strong className="font-data-mono">{estimatedReviewDate}</strong>. Regional EPFO staff will cross-verify updated records against UIDAI and employer DSC approvals.
                  </p>
                </div>

                {/* Submission Details */}
                <div className="border border-outline-variant/40 rounded-xl p-4 sm:p-5 text-left space-y-3 text-xs sm:text-sm text-on-surface-variant bg-surface-container-low">
                  <div className="flex justify-between items-center pb-2.5 border-b border-outline-variant/30">
                    <span>{t.resubmit.refNo}</span>
                    <span className="font-data-mono font-bold text-on-surface">{referenceId}</span>
                  </div>
                  <div className="flex justify-between items-center pb-2.5 border-b border-outline-variant/30">
                    <span>Rectification Focus</span>
                    <span className="font-bold text-on-surface font-data-mono">{decoderResult.code}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span>Verification Status</span>
                    <span className="font-bold text-success-emerald flex items-center gap-1">
                      <span className="material-symbols-outlined text-[16px]">verified</span>
                      <span>Checklist Compliant</span>
                    </span>
                  </div>
                </div>

                {/* Primary CTA Back to Dashboard */}
                <div className="pt-2">
                  <Link
                    href="/dashboard"
                    className="w-full sm:w-auto bg-primary hover:bg-surface-tint text-on-primary font-bold px-8 py-3.5 rounded-xl shadow-xs inline-flex items-center justify-center gap-2 transition-transform active:scale-[0.98] text-sm min-h-[44px]"
                  >
                    <span>{t.common.backToDashboard}</span>
                    <span className="material-symbols-outlined text-[18px]">arrow_forward</span>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        ) : (
          /* Guided Resubmit Form */
          <div className="space-y-6">
            {/* 4-Step Progress Stepper (Stitch Screen 8) */}
            <div className="glass-card rounded-2xl p-4 sm:p-6 shadow-2xs">
              <div className="grid grid-cols-4 items-center text-center gap-2">
                {/* Step 1 */}
                <div className="flex flex-col items-center gap-1.5">
                  <div className="w-8 h-8 rounded-full bg-success-emerald text-white flex items-center justify-center text-xs font-bold shadow-2xs">
                    <span className="material-symbols-outlined text-[16px]">check</span>
                  </div>
                  <span className="text-[11px] font-bold text-success-emerald hidden sm:inline">1. Identify Error</span>
                  <span className="text-[10px] font-bold text-success-emerald sm:hidden">1. Error</span>
                </div>

                {/* Step 2 */}
                <div className="flex flex-col items-center gap-1.5">
                  <div className="w-8 h-8 rounded-full bg-primary text-on-primary flex items-center justify-center text-xs font-bold shadow-xs ring-4 ring-primary/20">
                    2
                  </div>
                  <span className="text-[11px] font-bold text-primary hidden sm:inline">2. Correct Data</span>
                  <span className="text-[10px] font-bold text-primary sm:hidden">2. Correct</span>
                </div>

                {/* Step 3 */}
                <div className="flex flex-col items-center gap-1.5">
                  <div className="w-8 h-8 rounded-full bg-surface-container-highest border border-outline-variant text-on-surface-variant flex items-center justify-center text-xs font-semibold">
                    3
                  </div>
                  <span className="text-[11px] font-medium text-on-surface-variant hidden sm:inline">3. Upload Proof</span>
                  <span className="text-[10px] font-medium text-on-surface-variant sm:hidden">3. Proof</span>
                </div>

                {/* Step 4 */}
                <div className="flex flex-col items-center gap-1.5">
                  <div className="w-8 h-8 rounded-full bg-surface-container-highest border border-outline-variant text-on-surface-variant flex items-center justify-center text-xs font-semibold">
                    4
                  </div>
                  <span className="text-[11px] font-medium text-on-surface-variant hidden sm:inline">4. Submit</span>
                  <span className="text-[10px] font-medium text-on-surface-variant sm:hidden">4. Submit</span>
                </div>
              </div>
            </div>

            {/* Rejection Header Banner */}
            <div className="glass-card border-l-4 border-l-alert-crimson rounded-2xl p-6 shadow-xs space-y-3">
              <div className="flex flex-wrap items-center justify-between gap-2">
                <span className="bg-error-container text-on-error-container font-data-mono font-bold text-xs px-2.5 py-1 rounded-md uppercase">
                  Rejection: {decoderResult.code}
                </span>
                <span className="text-xs font-mono text-on-surface-variant">
                  Claim ID: {claimId}
                </span>
              </div>
              <h1 className="text-xl sm:text-2xl font-extrabold text-on-surface tracking-tight">
                {t.resubmit.pageTitle}
              </h1>
              <p className="text-xs sm:text-sm text-on-surface-variant leading-relaxed">
                {decoderResult.plain_text}
              </p>
              <div className="text-xs text-primary font-semibold flex items-center gap-1 pt-1">
                <span className="material-symbols-outlined text-[16px]">menu_book</span>
                <span>Authorized per {decoderResult.source_reference}</span>
              </div>
            </div>

            {/* Error Banner */}
            {serverError && (
              <div
                role="alert"
                className="p-4 bg-error-container/40 border border-alert-crimson/40 rounded-xl text-xs text-alert-crimson flex items-start gap-2.5"
              >
                <span className="material-symbols-outlined text-alert-crimson text-[18px] shrink-0 mt-0.5">error</span>
                <div>
                  <strong className="block font-bold">Submission Incomplete</strong>
                  <span>{serverError}</span>
                </div>
              </div>
            )}

            {/* Resubmit Form */}
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="glass-card rounded-2xl p-6 sm:p-8 space-y-6 shadow-xs">
                <div>
                  <h2 className="text-base sm:text-lg font-bold text-on-surface">
                    {t.resubmit.checklistTitle}
                  </h2>
                  <p className="text-xs text-on-surface-variant mt-0.5">
                    {t.resubmit.checklistSubtitle}
                  </p>
                </div>

                {/* Verification Checkboxes */}
                <div className="space-y-3">
                  <label
                    className={cn(
                      "flex items-start gap-3.5 p-4 rounded-xl border transition-colors cursor-pointer select-none",
                      hasConfirmedProfileFix
                        ? "bg-primary/10 border-primary ring-1 ring-primary/20"
                        : "bg-surface-container-low border-outline-variant/40 hover:bg-surface-container"
                    )}
                  >
                    <input
                      type="checkbox"
                      checked={hasConfirmedProfileFix}
                      onChange={(e) => setHasConfirmedProfileFix(e.target.checked)}
                      className="w-5 h-5 rounded border-outline-variant text-primary focus:ring-primary shrink-0 mt-0.5"
                    />
                    <div className="space-y-0.5">
                      <span className="text-xs sm:text-sm font-semibold text-on-surface block leading-snug">
                        {t.resubmit.confirmPortalCheck}
                      </span>
                      <span className="text-[11px] text-on-surface-variant block">
                        Mandatory: Confirm correction on UAN Member Portal before resubmitting.
                      </span>
                    </div>
                  </label>

                  <label
                    className={cn(
                      "flex items-start gap-3.5 p-4 rounded-xl border transition-colors cursor-pointer select-none",
                      hasConfirmedBankDetails
                        ? "bg-primary/10 border-primary ring-1 ring-primary/20"
                        : "bg-surface-container-low border-outline-variant/40 hover:bg-surface-container"
                    )}
                  >
                    <input
                      type="checkbox"
                      checked={hasConfirmedBankDetails}
                      onChange={(e) => setHasConfirmedBankDetails(e.target.checked)}
                      className="w-5 h-5 rounded border-outline-variant text-primary focus:ring-primary shrink-0 mt-0.5"
                    />
                    <div className="space-y-0.5">
                      <span className="text-xs sm:text-sm font-semibold text-on-surface block leading-snug">
                        {t.resubmit.confirmBankCheck}
                      </span>
                      <span className="text-[11px] text-on-surface-variant block">
                        Mandatory: Check that the bank account is active and seeded with Aadhaar.
                      </span>
                    </div>
                  </label>
                </div>

                {/* Supporting Document Upload Dropzone */}
                <div className="space-y-2 pt-3 border-t border-outline-variant/30">
                  <label className="text-xs sm:text-sm font-bold text-on-surface block">
                    {t.resubmit.uploadTitle} (Optional Supporting Document)
                  </label>
                  <p className="text-xs text-on-surface-variant">
                    {t.resubmit.uploadSubtitle}
                  </p>

                  <div className="border-2 border-dashed border-outline-variant hover:border-primary rounded-xl p-6 text-center transition-colors bg-surface-container-low/60">
                    <input
                      type="file"
                      id="supporting-doc"
                      onChange={handleFileChange}
                      accept=".pdf,.jpg,.jpeg,.png"
                      className="sr-only"
                    />
                    <label htmlFor="supporting-doc" className="cursor-pointer block space-y-2">
                      {selectedFile ? (
                        <div className="flex items-center justify-center gap-2 text-primary font-semibold text-xs sm:text-sm">
                          <span className="material-symbols-outlined text-success-emerald text-[22px]">
                            description
                          </span>
                          <span>{selectedFile.name} ({(selectedFile.size / 1024).toFixed(1)} KB)</span>
                        </div>
                      ) : (
                        <>
                          <span className="material-symbols-outlined text-outline text-4xl mx-auto block">
                            cloud_upload
                          </span>
                          <span className="text-xs font-bold text-primary block">
                            Click to attach PDF / Cancelled Cheque / Joint Declaration
                          </span>
                          <span className="text-[11px] text-on-surface-variant block">
                            {t.resubmit.uploadInstructions}
                          </span>
                        </>
                      )}
                    </label>
                  </div>

                  {fileError && (
                    <p className="text-xs text-alert-crimson font-medium flex items-center gap-1">
                      <span className="material-symbols-outlined text-[16px]">error</span>
                      <span>{fileError}</span>
                    </p>
                  )}
                </div>

                {/* Clarification Notes */}
                <div className="space-y-1.5 pt-3 border-t border-outline-variant/30">
                  <label htmlFor="resubmit-notes" className="text-xs sm:text-sm font-bold text-on-surface block">
                    Additional Notes for Field Officer
                  </label>
                  <textarea
                    id="resubmit-notes"
                    rows={2}
                    value={notes}
                    onChange={(e) => setNotes(e.target.value)}
                    placeholder="e.g. Aadhaar name updated online and employer approved on Unified Portal on 2026-08-25..."
                    className="w-full text-xs sm:text-sm p-3 rounded-xl border border-outline-variant bg-surface-container-low text-on-surface focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary"
                  />
                </div>

                {/* Submission Action Button */}
                <div className="pt-4 border-t border-outline-variant/30 flex flex-col sm:flex-row items-center justify-end gap-3">
                  <Link
                    href={`/claims/${claimId}`}
                    className="w-full sm:w-auto text-xs font-bold text-on-surface-variant hover:text-on-surface py-2.5 px-4 rounded-xl hover:bg-surface-container transition-colors text-center"
                  >
                    {t.common.cancel}
                  </Link>
                  <button
                    type="submit"
                    disabled={isSubmitting || !hasConfirmedProfileFix || !hasConfirmedBankDetails}
                    className="w-full sm:w-auto bg-primary hover:bg-surface-tint text-on-primary font-bold px-8 py-3 rounded-xl shadow-xs text-xs sm:text-sm disabled:opacity-50 cursor-pointer min-h-[44px] flex items-center justify-center gap-2 transition-all"
                  >
                    {isSubmitting ? (
                      <>
                        <span className="material-symbols-outlined text-[18px] animate-spin">refresh</span>
                        <span>{t.common.submitting}</span>
                      </>
                    ) : (
                      <>
                        <span>Validate & Submit Corrected Claim</span>
                        <span className="material-symbols-outlined text-[16px]">send</span>
                      </>
                    )}
                  </button>
                </div>
              </div>
            </form>
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
