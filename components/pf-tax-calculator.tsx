"use client";

import React, { useState } from "react";
import { useTranslation } from "@/lib/i18n/context";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Calculator, AlertTriangle, CheckCircle2, Info, ArrowRight, ShieldAlert } from "lucide-react";
import { formatCurrency } from "@/lib/utils";

export function PfTaxCalculator() {
  const { t } = useTranslation();

  const [claimAmount, setClaimAmount] = useState<number>(75000);
  const [serviceYears, setServiceYears] = useState<number>(3);
  const [isPanLinked, setIsPanLinked] = useState<boolean>(true);
  const [hasForm15G, setHasForm15G] = useState<boolean>(false);

  // Section 192A Tax Calculation Logic
  const isExemptByService = serviceYears >= 5;
  const isExemptByAmount = claimAmount < 50000;
  const isExemptByForm15G = hasForm15G && isPanLinked;

  let tdsRate = 0;
  let reason = "";

  if (isExemptByService) {
    tdsRate = 0;
    reason = "Service >= 5 continuous years: Entire PF withdrawal is completely tax-exempt.";
  } else if (isExemptByAmount) {
    tdsRate = 0;
    reason = "Claim amount < ₹50,000: No TDS deduction under Section 192A threshold.";
  } else if (isExemptByForm15G) {
    tdsRate = 0;
    reason = "Form 15G/15H submitted with verified PAN: 0% TDS applicable.";
  } else if (isPanLinked) {
    tdsRate = 0.10; // 10% TDS with PAN
    reason = "Service < 5 years & Amount >= ₹50,000: 10% standard TDS deducted with verified PAN.";
  } else {
    tdsRate = 0.20; // 20% TDS without PAN (Section 192A amendment)
    reason = "PAN not linked: Higher TDS rate of 20% applied under Section 192A.";
  }

  const tdsAmount = Math.round(claimAmount * tdsRate);
  const netCredit = claimAmount - tdsAmount;

  return (
    <section id="tax-calculator" className="scroll-mt-24">
      <div className="mb-6 space-y-2">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 border border-primary/20 text-primary text-xs font-bold w-fit">
          <span className="material-symbols-outlined text-[16px]">calculate</span>
          <span>{t.taxCalc.badge}</span>
        </div>
        <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-on-surface">
          {t.taxCalc.title}
        </h2>
        <p className="text-sm sm:text-base text-on-surface-variant max-w-3xl leading-relaxed">
          {t.taxCalc.subtitle}
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-start">
        {/* Controls Column (7 cols) */}
        <div className="lg:col-span-7 flex flex-col gap-5">
          {/* Amount Slider Card */}
          <div className="glass-card rounded-2xl p-6">
            <div className="flex justify-between items-end mb-4">
              <label htmlFor="claim-amount" className="text-sm font-bold text-on-surface">
                {t.taxCalc.amountLabel}
              </label>
              <div className="text-2xl sm:text-3xl text-primary font-data-mono font-bold tracking-tight">
                {formatCurrency(claimAmount)}
              </div>
            </div>
            <input
              id="claim-amount"
              type="range"
              min={10000}
              max={1000000}
              step={5000}
              value={claimAmount}
              onChange={(e) => setClaimAmount(Number(e.target.value))}
              className="w-full h-2.5 bg-surface-container-high rounded-lg appearance-none cursor-pointer mb-2 accent-primary"
            />
            <div className="flex justify-between text-xs text-on-surface-variant font-data-mono font-medium">
              <span>₹10,000</span>
              <span>₹5,00,000</span>
              <span>₹10,00,000</span>
            </div>
          </div>

          {/* Service Duration Card */}
          <div className="glass-card rounded-2xl p-6">
            <h3 className="text-sm font-bold text-on-surface mb-3">
              {t.taxCalc.serviceLabel}
            </h3>
            <div className="grid grid-cols-2 gap-3 sm:gap-4">
              <button
                type="button"
                onClick={() => setServiceYears(3)}
                className={`p-4 rounded-xl border-2 transition-all text-center flex flex-col justify-center min-h-[72px] cursor-pointer ${
                  serviceYears < 5
                    ? "border-primary bg-primary/10 text-primary font-bold shadow-xs"
                    : "border-outline-variant/60 bg-surface-container-lowest text-on-surface font-medium hover:bg-surface-container-low"
                }`}
              >
                <span className="text-sm font-bold">Less than 5 Years</span>
                <span className="text-[11px] opacity-75 mt-0.5">Subject to Sec 192A</span>
              </button>

              <button
                type="button"
                onClick={() => setServiceYears(5)}
                className={`p-4 rounded-xl border-2 transition-all text-center flex flex-col justify-center min-h-[72px] cursor-pointer ${
                  serviceYears >= 5
                    ? "border-primary bg-primary/10 text-primary font-bold shadow-xs"
                    : "border-outline-variant/60 bg-surface-container-lowest text-on-surface font-medium hover:bg-surface-container-low"
                }`}
              >
                <span className="text-sm font-bold">5 Years or More</span>
                <span className="text-[11px] opacity-75 mt-0.5">100% Tax-Exempt</span>
              </button>
            </div>
            <p className="text-xs text-on-surface-variant mt-3 flex items-center gap-1.5">
              <span className="material-symbols-outlined text-[16px] text-primary">info</span>
              Service includes continuous tenure from previous employers if PF was transferred.
            </p>
          </div>

          {/* Document Status Card */}
          <div className="glass-card rounded-2xl p-6 flex flex-col gap-5">
            <h3 className="text-sm font-bold text-on-surface">Document Submission Status</h3>

            {/* PAN Card Toggle */}
            <div className="flex items-center justify-between gap-4 py-2 border-b border-outline-variant/30">
              <div>
                <div className="text-sm font-bold text-on-surface">
                  {t.taxCalc.panLinkedLabel}
                </div>
                <div className="text-xs text-on-surface-variant">
                  Required to prevent higher marginal tax rate (20%).
                </div>
              </div>
              <button
                type="button"
                role="switch"
                aria-checked={isPanLinked}
                onClick={() => {
                  const nextState = !isPanLinked;
                  setIsPanLinked(nextState);
                  if (!nextState) setHasForm15G(false);
                }}
                className={`w-14 h-8 rounded-full p-1 transition-colors duration-200 ease-in-out cursor-pointer flex items-center shrink-0 ${
                  isPanLinked ? "bg-primary" : "bg-surface-container-high"
                }`}
              >
                <div
                  className={`w-6 h-6 rounded-full bg-white shadow-xs transform transition-transform duration-200 ease-in-out ${
                    isPanLinked ? "translate-x-6" : "translate-x-0"
                  }`}
                />
              </button>
            </div>

            {/* Form 15G/15H Toggle */}
            <div className="flex items-center justify-between gap-4 py-1">
              <div>
                <div className="text-sm font-bold text-on-surface">
                  {t.taxCalc.form15gLabel}
                </div>
                <div className="text-xs text-on-surface-variant">
                  Applicable if total annual income is below the taxable threshold.
                </div>
              </div>
              <button
                type="button"
                role="switch"
                aria-checked={hasForm15G}
                disabled={!isPanLinked}
                onClick={() => setHasForm15G(!hasForm15G)}
                className={`w-14 h-8 rounded-full p-1 transition-colors duration-200 ease-in-out cursor-pointer flex items-center shrink-0 ${
                  !isPanLinked ? "opacity-40 cursor-not-allowed bg-surface-container-high" : hasForm15G ? "bg-primary" : "bg-surface-container-high"
                }`}
              >
                <div
                  className={`w-6 h-6 rounded-full bg-white shadow-xs transform transition-transform duration-200 ease-in-out ${
                    hasForm15G ? "translate-x-6" : "translate-x-0"
                  }`}
                />
              </button>
            </div>
          </div>
        </div>

        {/* Results Column (Right, 5 cols) */}
        <div className="lg:col-span-5 flex flex-col gap-5">
          <div className="bg-primary text-on-primary rounded-2xl p-6 sm:p-8 deep-shadow relative overflow-hidden">
            {/* Glowing blur orb */}
            <div className="absolute top-0 right-0 w-36 h-36 bg-white/10 rounded-full blur-2xl pointer-events-none -mr-8 -mt-8" />

            <div className="flex items-center justify-between mb-6 border-b border-white/15 pb-4">
              <h3 className="text-xl font-bold">TDS Breakdown</h3>
              <span className="bg-white/20 text-white text-xs font-data-mono font-bold px-3 py-1 rounded-full border border-white/20">
                Rate: {tdsRate * 100}%
              </span>
            </div>

            <div className="space-y-4 font-data-mono">
              <div className="flex justify-between items-center text-sm text-teal-100">
                <span className="font-sans font-medium">{t.taxCalc.grossAmount}:</span>
                <span className="font-bold text-white text-base">{formatCurrency(claimAmount)}</span>
              </div>

              <div className="flex justify-between items-center text-sm text-teal-100">
                <span className="font-sans font-medium">{t.taxCalc.tdsDeduction}:</span>
                <span className={`font-bold text-base ${tdsAmount > 0 ? "text-amber-300" : "text-emerald-300"}`}>
                  {tdsAmount > 0 ? `- ${formatCurrency(tdsAmount)}` : "₹0 (Exempt)"}
                </span>
              </div>

              <div className="pt-4 border-t border-white/20 flex flex-col sm:flex-row sm:items-baseline justify-between gap-1">
                <span className="font-sans font-bold text-white text-base">{t.taxCalc.netCredit}:</span>
                <span className="text-2xl sm:text-3xl font-extrabold text-primary-fixed tracking-tight">
                  {formatCurrency(netCredit)}
                </span>
              </div>
            </div>

            {/* Rule explanation card */}
            <div className="mt-6 p-4 rounded-xl bg-white/10 border border-white/15 text-xs text-teal-50 leading-relaxed space-y-1">
              <div className="font-bold text-white flex items-center gap-1.5">
                <span className="material-symbols-outlined text-[16px] text-primary-fixed">verified</span>
                <span>Rule Application</span>
              </div>
              <p>{reason}</p>
            </div>

            {/* Advisory note */}
            <div className="mt-4 p-3.5 rounded-xl bg-black/20 text-xs text-teal-100/90 leading-relaxed">
              <strong>Tip:</strong> {t.taxCalc.taxTip}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
