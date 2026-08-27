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
    <section id="tax-calculator" className="scroll-mt-20">
      <Card className="border-slate-200 bg-white shadow-md rounded-2xl overflow-hidden">
        <CardHeader className="bg-gradient-to-r from-slate-900 via-slate-850 to-teal-950 text-white p-6 sm:p-8 space-y-2">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-teal-800/80 border border-teal-700 text-teal-200 text-xs font-semibold w-fit">
            <Calculator className="w-3.5 h-3.5 text-teal-300" aria-hidden="true" />
            <span>{t.taxCalc.badge}</span>
          </div>
          <CardTitle className="text-2xl sm:text-3xl font-extrabold tracking-tight text-white">
            {t.taxCalc.title}
          </CardTitle>
          <p className="text-sm sm:text-base text-slate-300 max-w-2xl leading-relaxed">
            {t.taxCalc.subtitle}
          </p>
        </CardHeader>

        <CardContent className="p-6 sm:p-8 grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Controls Column */}
          <div className="lg:col-span-7 space-y-6">
            {/* Amount Slider */}
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <label htmlFor="claim-amount" className="text-sm font-bold text-zinc-900">
                  {t.taxCalc.amountLabel}
                </label>
                <span className="font-mono font-extrabold text-base text-teal-800 bg-teal-50 px-3 py-1 rounded-lg border border-teal-200">
                  {formatCurrency(claimAmount)}
                </span>
              </div>
              <input
                id="claim-amount"
                type="range"
                min={10000}
                max={500000}
                step={5000}
                value={claimAmount}
                onChange={(e) => setClaimAmount(Number(e.target.value))}
                className="w-full h-2.5 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-teal-700"
              />
              <div className="flex justify-between text-[11px] text-zinc-400 font-mono">
                <span>₹10,000</span>
                <span>₹2,50,000</span>
                <span>₹5,00,000</span>
              </div>
            </div>

            {/* Service Duration */}
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <label htmlFor="service-years" className="text-sm font-bold text-zinc-900">
                  {t.taxCalc.serviceLabel}
                </label>
                <span className="font-mono font-extrabold text-base text-zinc-900 bg-slate-100 px-3 py-1 rounded-lg border border-slate-200">
                  {serviceYears} {serviceYears === 1 ? "Year" : "Years"}
                </span>
              </div>
              <input
                id="service-years"
                type="range"
                min={0}
                max={10}
                step={1}
                value={serviceYears}
                onChange={(e) => setServiceYears(Number(e.target.value))}
                className="w-full h-2.5 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-teal-700"
              />
              <div className="flex justify-between text-[11px] text-zinc-400 font-mono">
                <span>0 Yrs (High TDS)</span>
                <span>5 Yrs (TDS-Free Threshold)</span>
                <span>10 Yrs</span>
              </div>
            </div>

            {/* Radio Options: PAN Linked & Form 15G */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-1">
              <div className="border border-slate-200 rounded-xl p-4 space-y-2 bg-slate-50">
                <span className="text-xs font-bold text-zinc-900 block">
                  {t.taxCalc.panLinkedLabel}
                </span>
                <div className="flex items-center gap-3 pt-1">
                  <button
                    type="button"
                    onClick={() => setIsPanLinked(true)}
                    className={`flex-1 py-1.5 rounded-lg text-xs font-bold transition-colors cursor-pointer ${
                      isPanLinked
                        ? "bg-teal-700 text-white shadow-2xs"
                        : "bg-white text-zinc-700 border border-slate-200"
                    }`}
                  >
                    {t.taxCalc.yes} (10% TDS)
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      setIsPanLinked(false);
                      setHasForm15G(false);
                    }}
                    className={`flex-1 py-1.5 rounded-lg text-xs font-bold transition-colors cursor-pointer ${
                      !isPanLinked
                        ? "bg-rose-700 text-white shadow-2xs"
                        : "bg-white text-zinc-700 border border-slate-200"
                    }`}
                  >
                    {t.taxCalc.no} (20% TDS)
                  </button>
                </div>
              </div>

              <div className="border border-slate-200 rounded-xl p-4 space-y-2 bg-slate-50">
                <span className="text-xs font-bold text-zinc-900 block">
                  {t.taxCalc.form15gLabel}
                </span>
                <div className="flex items-center gap-3 pt-1">
                  <button
                    type="button"
                    disabled={!isPanLinked}
                    onClick={() => setHasForm15G(true)}
                    className={`flex-1 py-1.5 rounded-lg text-xs font-bold transition-colors cursor-pointer ${
                      hasForm15G
                        ? "bg-emerald-700 text-white shadow-2xs"
                        : "bg-white text-zinc-700 border border-slate-200 disabled:opacity-50"
                    }`}
                  >
                    {t.taxCalc.yes} (0% TDS)
                  </button>
                  <button
                    type="button"
                    onClick={() => setHasForm15G(false)}
                    className={`flex-1 py-1.5 rounded-lg text-xs font-bold transition-colors cursor-pointer ${
                      !hasForm15G
                        ? "bg-slate-800 text-white shadow-2xs"
                        : "bg-white text-zinc-700 border border-slate-200"
                    }`}
                  >
                    {t.taxCalc.no}
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Results Display Column */}
          <div className="lg:col-span-5 bg-gradient-to-br from-slate-50 to-teal-50/60 border border-teal-200/80 rounded-2xl p-6 space-y-5 flex flex-col justify-between shadow-2xs">
            <div className="space-y-4">
              <div className="flex items-center justify-between border-b border-slate-200 pb-3">
                <span className="text-xs font-bold uppercase tracking-wider text-zinc-500">
                  Tax Calculation Breakdown
                </span>
                <span className="text-xs font-mono font-bold bg-white border border-slate-200 px-2 py-0.5 rounded text-zinc-700">
                  TDS Rate: {tdsRate * 100}%
                </span>
              </div>

              <div className="space-y-3 font-mono">
                <div className="flex items-center justify-between text-sm text-zinc-600">
                  <span>{t.taxCalc.grossAmount}:</span>
                  <span className="font-bold text-zinc-900">{formatCurrency(claimAmount)}</span>
                </div>

                <div className="flex items-center justify-between text-sm text-rose-700">
                  <span className="flex items-center gap-1">
                    {tdsAmount > 0 ? <AlertTriangle className="w-4 h-4" /> : <CheckCircle2 className="w-4 h-4 text-emerald-600" />}
                    {t.taxCalc.tdsDeduction}:
                  </span>
                  <span className="font-bold font-mono">
                    {tdsAmount > 0 ? `- ${formatCurrency(tdsAmount)}` : "₹0 (Exempt)"}
                  </span>
                </div>

                <div className="pt-3 border-t border-slate-300 flex items-baseline justify-between text-base sm:text-lg text-teal-950 font-sans font-extrabold">
                  <span>{t.taxCalc.netCredit}:</span>
                  <span className="font-mono text-xl sm:text-2xl text-emerald-700">
                    {formatCurrency(netCredit)}
                  </span>
                </div>
              </div>

              <p className="text-xs text-zinc-600 bg-white border border-slate-200 p-3 rounded-xl leading-relaxed">
                <Info className="w-3.5 h-3.5 text-teal-700 inline mr-1 -mt-0.5" />
                <strong>Rule Note:</strong> {reason}
              </p>
            </div>

            {/* Advisory Box */}
            <div className="bg-teal-900 text-white p-4 rounded-xl space-y-1.5 shadow-sm">
              <span className="text-[11px] uppercase tracking-wider font-bold text-teal-300 block">
                Citizen Advisory
              </span>
              <p className="text-xs text-teal-100 leading-relaxed">
                {t.taxCalc.taxTip}
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </section>
  );
}
