"use client";

import React, { useState } from "react";
import { Info, Check, ShieldCheck } from "lucide-react";

export function PfTaxCalculator() {
  const [claimAmount, setClaimAmount] = useState<number>(125000);
  const [duration, setDuration] = useState<"less" | "more">("less");
  const [isPanLinked, setIsPanLinked] = useState<boolean>(true);
  const [hasForm15G, setHasForm15G] = useState<boolean>(false);

  // Formatting helper with Indian commas (e.g. 1,25,000)
  const formatNum = (num: number) => {
    return num.toLocaleString("en-IN");
  };

  // Section 192A Rule Calculation matching official rules & screenshot
  let rate = 0;
  let reason = "";

  if (duration === "more") {
    rate = 0;
    reason = "Service >= 5 continuous years: Entire PF withdrawal is completely tax-exempt.";
  } else if (claimAmount < 50000) {
    rate = 0;
    reason = "Claim amount < ₹50,000: No TDS deduction under Section 192A threshold.";
  } else if (hasForm15G) {
    rate = 0;
    reason = "Form 15G/15H submitted with verified PAN: 0% TDS applicable.";
  } else if (isPanLinked) {
    rate = 10;
    reason = "Service < 5 years & Amount >= ₹50,000: 10% standard TDS deducted with verified PAN.";
  } else {
    rate = 30; // Max marginal rate
    reason = "No PAN linked: Higher TDS rate of 30% applied under Section 192A.";
  }

  const tdsAmount = Math.round((claimAmount * rate) / 100);
  const finalAmount = claimAmount - tdsAmount;

  return (
    <section id="tax-calculator" className="scroll-mt-24 w-full">
      {/* Header Section */}
      <div className="mb-6 sm:mb-8">
        <h2 className="text-2xl sm:text-3xl lg:text-[32px] font-bold text-slate-900 mb-2 tracking-tight">
          Section 192A PF TDS Tax Calculator
        </h2>
        <p className="text-sm sm:text-base text-slate-600 max-w-3xl leading-relaxed">
          Estimate your tax deduction on Provident Fund withdrawals before you apply. Avoid unexpected deductions with clear insights into rules regarding PAN and Form 15G.
        </p>
      </div>

      {/* Main Grid: Left Inputs (7 cols), Right Results (5 cols) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-start">
        {/* Left Column: Calculator Inputs */}
        <div className="lg:col-span-7 flex flex-col gap-5">
          {/* Amount Input Card */}
          <div className="bg-white rounded-xl border border-slate-200/90 p-5 sm:p-6 shadow-xs">
            <div className="flex justify-between items-end mb-4">
              <label
                htmlFor="withdrawalAmount"
                className="text-sm sm:text-base font-semibold text-slate-900"
              >
                Withdrawal Amount
              </label>
              <div className="text-2xl sm:text-[26px] font-bold text-[#015d55] font-mono tracking-tight">
                ₹<span id="amountDisplay">{formatNum(claimAmount)}</span>
              </div>
            </div>

            <input
              id="withdrawalAmount"
              type="range"
              min={10000}
              max={1000000}
              step={5000}
              value={claimAmount}
              onChange={(e) => setClaimAmount(Number(e.target.value))}
              className="pf-slider w-full appearance-none cursor-pointer mb-2"
            />

            <div className="flex justify-between text-xs font-semibold text-slate-500">
              <span>₹10,000</span>
              <span>₹10L</span>
            </div>
          </div>

          {/* Service Duration Card */}
          <div className="bg-white rounded-xl border border-slate-200/90 p-5 sm:p-6 shadow-xs">
            <h3 className="text-sm sm:text-base font-semibold text-slate-900 mb-4">
              Continuous Service Duration
            </h3>
            <div className="grid grid-cols-2 gap-3 sm:gap-4">
              <button
                type="button"
                onClick={() => setDuration("less")}
                className={`p-4 rounded-lg border-2 transition-all text-center flex flex-col justify-center min-h-[76px] cursor-pointer ${
                  duration === "less"
                    ? "border-[#015d55] bg-[#015d55]/5 text-[#015d55] font-bold shadow-2xs"
                    : "border-slate-200 bg-white text-slate-700 font-semibold hover:border-slate-300"
                }`}
              >
                <span className="text-sm sm:text-base">Less than 5 Years</span>
              </button>

              <button
                type="button"
                onClick={() => setDuration("more")}
                className={`p-4 rounded-lg border-2 transition-all text-center flex flex-col justify-center min-h-[76px] cursor-pointer ${
                  duration === "more"
                    ? "border-[#015d55] bg-[#015d55]/5 text-[#015d55] font-bold shadow-2xs"
                    : "border-slate-200 bg-white text-slate-700 font-semibold hover:border-slate-300"
                }`}
              >
                <span className="text-sm sm:text-base">5 Years or More</span>
              </button>
            </div>

            <p className="text-xs text-slate-500 mt-3 flex items-start gap-1.5 leading-relaxed">
              <Info className="w-3.5 h-3.5 text-slate-400 shrink-0 mt-0.5" />
              <span>Service includes tenure from previous employers if PF was transferred.</span>
            </p>
          </div>

          {/* Document Submission Status Card */}
          <div className="bg-white rounded-xl border border-slate-200/90 p-5 sm:p-6 shadow-xs flex flex-col gap-6">
            <h3 className="text-sm sm:text-base font-semibold text-slate-900">
              Document Submission Status
            </h3>

            {/* PAN Card Toggle */}
            <div className="flex items-center justify-between gap-4">
              <div>
                <div className="text-sm sm:text-base font-semibold text-slate-900">
                  PAN Card linked/submitted?
                </div>
                <div className="text-xs text-slate-500 mt-0.5">
                  Required to avoid maximum marginal tax rate.
                </div>
              </div>

              <button
                type="button"
                role="checkbox"
                aria-checked={isPanLinked}
                aria-label="PAN Card linked or submitted"
                onClick={() => {
                  const nextVal = !isPanLinked;
                  setIsPanLinked(nextVal);
                  if (!nextVal) setHasForm15G(false);
                }}
                className="cursor-pointer focus:outline-none focus:ring-2 focus:ring-[#2563eb] rounded-full"
              >
                {isPanLinked ? (
                  <div className="w-6 h-6 rounded-full bg-[#2563eb] text-white flex items-center justify-center shadow-xs transition-all">
                    <Check className="w-4 h-4 stroke-[3]" />
                  </div>
                ) : (
                  <div className="w-6 h-6 rounded-full border-2 border-slate-300 bg-white hover:border-slate-400 transition-all" />
                )}
              </button>
            </div>

            {/* Form 15G/15H Toggle */}
            <div className="flex items-center justify-between gap-4">
              <div>
                <div className="text-sm sm:text-base font-semibold text-slate-900">
                  Form 15G/15H submitted?
                </div>
                <div className="text-xs text-slate-500 mt-0.5">
                  Applicable if total income is below taxable limit.
                </div>
              </div>

              <button
                type="button"
                role="checkbox"
                aria-checked={hasForm15G}
                aria-label="Form 15G or 15H submitted"
                disabled={!isPanLinked}
                onClick={() => setHasForm15G(!hasForm15G)}
                className={`cursor-pointer focus:outline-none focus:ring-2 focus:ring-[#2563eb] rounded-full ${
                  !isPanLinked ? "opacity-40 cursor-not-allowed" : ""
                }`}
              >
                {hasForm15G ? (
                  <div className="w-6 h-6 rounded-full bg-[#2563eb] text-white flex items-center justify-center shadow-xs transition-all">
                    <Check className="w-4 h-4 stroke-[3]" />
                  </div>
                ) : (
                  <div className="w-6 h-6 rounded-full border-2 border-slate-300 bg-white hover:border-slate-400 transition-all" />
                )}
              </button>
            </div>
          </div>
        </div>

        {/* Right Column: Exact Card matching uploaded image media_1787892307861.png */}
        <div className="lg:col-span-5 flex flex-col">
          <div
            style={{ backgroundColor: "#015d55" }}
            className="rounded-[28px] p-7 sm:p-9 text-white shadow-xl flex flex-col"
          >
            {/* Top Header */}
            <div className="flex items-center justify-between">
              <h2 className="text-2xl sm:text-[26px] font-bold text-white tracking-tight">
                TDS Breakdown
              </h2>
              <span className="text-sm font-mono text-white bg-white/15 px-3.5 py-1 rounded-full border border-white/20">
                Rate: {rate}%
              </span>
            </div>

            {/* Divider */}
            <div className="border-b border-white/20 my-5" />

            {/* Row 1: Gross Claim */}
            <div className="flex justify-between items-center py-1">
              <span className="text-white/90 text-base font-normal">
                Gross PF Claim:
              </span>
              <span className="font-mono text-lg font-bold text-white">
                ₹{formatNum(claimAmount)}
              </span>
            </div>

            {/* Row 2: TDS Deducted */}
            <div className="flex justify-between items-center py-1">
              <span className="text-white/90 text-base font-normal">
                TDS Deducted (Sec 192A):
              </span>
              <span className="font-mono text-lg font-bold text-[#facc15]">
                {tdsAmount > 0 ? `- ₹${formatNum(tdsAmount)}` : "₹0"}
              </span>
            </div>

            {/* Divider */}
            <div className="border-b border-white/20 my-5" />

            {/* Row 3: Estimated Net Bank Credit */}
            <div className="flex justify-between items-center py-1">
              <span className="text-white font-bold text-base sm:text-lg">
                Estimated Net Bank Credit:
              </span>
              <span className="font-mono text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
                ₹{formatNum(finalAmount)}
              </span>
            </div>

            {/* Rule Application Inset Card */}
            <div className="rounded-2xl border border-white/25 bg-white/5 p-4 sm:p-5 mt-6">
              <div className="flex items-center gap-2 text-white font-bold text-base">
                <ShieldCheck className="w-5 h-5 text-white stroke-[2.25]" />
                <span>Rule Application</span>
              </div>
              <p className="text-xs sm:text-sm text-white/90 leading-relaxed mt-2">
                {reason}
              </p>
            </div>

            {/* Bottom Tip */}
            <p className="mt-6 text-xs sm:text-sm text-white/90 leading-relaxed">
              <strong>Tip:</strong> Tax-Saving Advisory: If your total taxable income is below basic exemption limit (₹3 Lakh), submit Form 15G online on Member Sewa to stop the 10% TDS deduction completely.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
