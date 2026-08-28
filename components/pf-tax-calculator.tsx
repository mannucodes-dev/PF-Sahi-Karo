"use client";

import React, { useState } from "react";
import { Info, Check, PiggyBank } from "lucide-react";

export function PfTaxCalculator() {
  const [claimAmount, setClaimAmount] = useState<number>(50000);
  const [duration, setDuration] = useState<"less" | "more">("less");
  const [isPanLinked, setIsPanLinked] = useState<boolean>(true);
  const [hasForm15G, setHasForm15G] = useState<boolean>(false);

  // Formatting helper with Indian commas (e.g. 50,000 or 10,00,000)
  const formatNum = (num: number) => {
    return num.toLocaleString("en-IN");
  };

  // Section 192A Rule Calculation matching Stitch HTML logic
  let rate = 0;
  let reason = "";

  if (duration === "more") {
    rate = 0;
    reason = "Service >= 5 yrs, TDS Nil";
  } else if (claimAmount < 50000) {
    rate = 0;
    reason = "Amount < ₹50k, TDS Nil";
  } else if (hasForm15G) {
    rate = 0;
    reason = "Form 15G submitted, TDS Nil";
  } else if (isPanLinked) {
    rate = 10;
    reason = "PAN submitted, 10% TDS";
  } else {
    rate = 30; // Max marginal rate under Section 192A / 206AA
    reason = "No PAN, 30% TDS";
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
              <div className="text-2xl sm:text-[26px] font-bold text-[#005c55] font-mono tracking-tight">
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
                className={`p-4 rounded-lg border-2 transition-all text-center flex flex-col justify-center min-h-[80px] cursor-pointer ${
                  duration === "less"
                    ? "border-[#005c55] bg-[#005c55]/5 text-[#005c55] font-bold shadow-2xs"
                    : "border-slate-200 bg-white text-slate-700 font-semibold hover:border-slate-300"
                }`}
              >
                <span className="text-sm sm:text-base">Less than 5 Years</span>
              </button>

              <button
                type="button"
                onClick={() => setDuration("more")}
                className={`p-4 rounded-lg border-2 transition-all text-center flex flex-col justify-center min-h-[80px] cursor-pointer ${
                  duration === "more"
                    ? "border-[#005c55] bg-[#005c55]/5 text-[#005c55] font-bold shadow-2xs"
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

          {/* Document Status Card */}
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

        {/* Right Column: Results & Education */}
        <div className="lg:col-span-5 flex flex-col gap-5">
          {/* Real-time Results Card with dynamic background */}
          <div
            className={`rounded-xl p-6 sm:p-7 text-white relative overflow-hidden shadow-lg transition-colors duration-300 ${
              rate > 0 ? "bg-[#e11d48]" : "bg-[#005c55]"
            }`}
          >
            {/* Decorative background element */}
            <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -mr-10 -mt-10 blur-xl pointer-events-none" />

            <h2 className="text-xl sm:text-2xl font-semibold mb-6 text-white tracking-tight">
              TDS Breakdown
            </h2>

            <div className="flex flex-col gap-4">
              {/* Gross Amount */}
              <div className="flex justify-between items-center border-b border-white/20 pb-4">
                <span className="text-sm sm:text-base text-white/90">
                  Gross Withdrawal Amount
                </span>
                <span className="font-mono text-base sm:text-lg font-bold">
                  ₹{formatNum(claimAmount)}
                </span>
              </div>

              {/* TDS Rate & Amount */}
              <div className="flex justify-between items-center border-b border-white/20 pb-4">
                <div className="flex flex-col">
                  <span className="text-sm sm:text-base text-white/90">
                    TDS Applicable Rate
                  </span>
                  <span className="text-xs text-white/75 mt-0.5 font-medium">
                    {reason}
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="bg-white/20 px-2.5 py-1 rounded text-xs font-bold text-white">
                    {rate}%
                  </span>
                  <span className="font-mono text-base sm:text-lg font-bold text-[#ffddb8]">
                    -₹{formatNum(tdsAmount)}
                  </span>
                </div>
              </div>

              {/* Final Disbursement */}
              <div className="flex justify-between items-center pt-2">
                <span className="text-base sm:text-lg font-bold text-white">
                  Final Bank Disbursement
                </span>
                <span className="font-mono text-3xl sm:text-4xl font-extrabold text-[#a3faef] tracking-tight">
                  ₹{formatNum(finalAmount)}
                </span>
              </div>
            </div>

            {/* Disclaimer note */}
            <div className="mt-6 pt-4 border-t border-white/20 flex gap-2 items-start text-xs text-white/90 leading-relaxed">
              <Info className="w-4 h-4 text-[#ffddb8] shrink-0 mt-0.5" />
              <p>
                Disclaimer: This is an estimate based on Section 192A rules. Actual deductions may vary based on EPFO processing and current IT rules.
              </p>
            </div>
          </div>

          {/* Educational Warning Box: Form 15G */}
          <div className="bg-[#fcf8f0] border border-[#fea619]/30 rounded-xl p-5 sm:p-6 flex flex-col gap-3 shadow-2xs">
            <div className="flex items-center gap-2 text-[#855300] font-bold">
              <PiggyBank className="w-5 h-5 text-[#855300] shrink-0" />
              <h3 className="text-base sm:text-lg font-bold">
                How Form 15G Saves Your Money
              </h3>
            </div>

            <p className="text-xs sm:text-sm text-slate-700 leading-relaxed">
              If your total annual income (including PF withdrawal) is below the basic exemption limit (₹2.5 Lakh / ₹3 Lakh depending on regime), submitting Form 15G (or 15H for senior citizens) prevents EPFO from deducting TDS.
            </p>

            <div className="bg-white p-4 rounded-lg border border-slate-200/60 mt-1">
              <h4 className="text-xs sm:text-sm font-bold text-slate-900 mb-2">
                When to submit:
              </h4>
              <ul className="list-disc pl-5 text-xs sm:text-sm text-slate-600 space-y-1.5 leading-relaxed">
                <li>Withdrawal amount is ₹50,000 or more.</li>
                <li>Service duration is less than 5 years.</li>
                <li>Total income is not taxable.</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
