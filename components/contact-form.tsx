"use client";

import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Send, CheckCircle2, Loader2, AlertCircle } from "lucide-react";
import { submitSupportCaseAction } from "@/app/actions/support-actions";
import { SupportCategory } from "@/lib/supabase/types";

export function ContactForm() {
  const [category, setCategory] = useState<SupportCategory>("claim_rejection");
  const [description, setDescription] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submittedCaseId, setSubmittedCaseId] = useState<string | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setErrorMessage(null);

    try {
      const res = await submitSupportCaseAction(category, description);

      if (res.success && res.caseId) {
        setSubmittedCaseId(res.caseId);
      } else {
        setErrorMessage(res.error || "Failed to dispatch support request. Please try again.");
      }
    } catch {
      setErrorMessage("An unexpected error occurred. Please contact the helpline directly.");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (submittedCaseId) {
    return (
      <Card className="border-emerald-200 bg-white p-6 sm:p-8 rounded-2xl shadow-sm text-center space-y-4">
        <div className="w-14 h-14 mx-auto rounded-full bg-emerald-100 text-emerald-800 flex items-center justify-center">
          <CheckCircle2 className="w-8 h-8" aria-hidden="true" />
        </div>
        <h2 className="text-xl font-bold text-zinc-900">Inquiry Received</h2>
        <p className="text-xs sm:text-sm text-zinc-600 max-w-md mx-auto leading-relaxed">
          Your assistance inquiry has been registered under reference:
        </p>
        <div className="font-mono font-bold text-teal-900 bg-teal-50 border border-teal-200 px-4 py-2 rounded-lg inline-block text-sm">
          {submittedCaseId}
        </div>
        <p className="text-xs text-zinc-500">
          Our compliance support team will review your question. For urgent official grievances, use EPFiGMS directly.
        </p>
      </Card>
    );
  }

  return (
    <Card className="border-slate-200 bg-white rounded-2xl shadow-2xs overflow-hidden">
      <CardHeader className="p-5 sm:p-6 border-b border-slate-100">
        <CardTitle className="text-base sm:text-lg font-bold text-zinc-900">
          Submit a Support Request
        </CardTitle>
        <CardDescription className="text-xs text-zinc-500">
          We assist with rejection code clarification and portal step navigation.
        </CardDescription>
      </CardHeader>

      <CardContent className="p-5 sm:p-6">
        {errorMessage && (
          <div className="mb-4 p-3 bg-rose-50 border border-rose-200 rounded-lg text-xs text-rose-800 flex items-center gap-2">
            <AlertCircle className="w-4 h-4 text-rose-600 shrink-0" aria-hidden="true" />
            <span>{errorMessage}</span>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-1.5">
            <label htmlFor="category-select" className="text-xs font-semibold text-zinc-700 block">
              Inquiry Category
            </label>
            <select
              id="category-select"
              value={category}
              onChange={(e) => setCategory(e.target.value as SupportCategory)}
              className="w-full h-10 px-3 text-xs sm:text-sm rounded-lg border border-slate-300 bg-white focus:ring-2 focus:ring-teal-600 focus:outline-none"
            >
              <option value="claim_rejection">Claim Rejection Clarification</option>
              <option value="kyc_issue">KYC / Aadhaar Seeding Issue</option>
              <option value="employer_delay">Employer Approval Delay</option>
              <option value="accessibility_feedback">Accessibility Barrier Report</option>
              <option value="general_query">General Query</option>
            </select>
          </div>

          <div className="space-y-1.5">
            <label htmlFor="desc-input" className="text-xs font-semibold text-zinc-700 block">
              Describe Your Query / Rejection Notice
            </label>
            <textarea
              id="desc-input"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              required
              rows={4}
              placeholder="Please include the exact remark text shown on your portal (do NOT include passwords or full Aadhaar numbers)..."
              className="w-full p-3 text-xs sm:text-sm rounded-lg border border-slate-300 bg-white focus:ring-2 focus:ring-teal-600 focus:outline-none"
            />
          </div>

          <Button
            type="submit"
            disabled={isSubmitting}
            className="w-full bg-teal-700 hover:bg-teal-800 text-white font-semibold py-2.5 rounded-lg flex items-center justify-center gap-2 cursor-pointer text-xs sm:text-sm"
          >
            {isSubmitting ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" aria-hidden="true" /> Submitting...
              </>
            ) : (
              <>
                <Send className="w-4 h-4" aria-hidden="true" /> Submit Inquiry
              </>
            )}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}
