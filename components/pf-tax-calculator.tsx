"use client";

import React, { useState } from "react";
import { useTranslation } from "@/lib/i18n/context";
import { Info, Check, ShieldCheck } from "lucide-react";

export function PfTaxCalculator() {
  const { locale, t } = useTranslation();
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
    reason =
      locale === "hi"
        ? "सेवा अवधि ≥ 5 निरंतर वर्ष: पूरा पीएफ निकासी कर-मुक्त है।"
        : locale === "mr"
        ? "सेवा कालावधी ≥ ५ वर्षे: संपूर्ण पीएफ रक्कम करमुक्त आहे."
        : "Service >= 5 continuous years: Entire PF withdrawal is completely tax-exempt.";
  } else if (claimAmount < 50000) {
    rate = 0;
    reason =
      locale === "hi"
        ? "दावा राशि < ₹50,000: धारा 192A सीमा के तहत कोई टीडीएस कटौती नहीं।"
        : locale === "mr"
        ? "दावा रक्कम < ₹५०,०००: कलम १९२ए अंतर्गत कोणतीही कर कपात नाही."
        : "Claim amount < ₹50,000: No TDS deduction under Section 192A threshold.";
  } else if (hasForm15G) {
    rate = 0;
    reason =
      locale === "hi"
        ? "सत्यापित पैन के साथ फॉर्म 15G/15H जमा: 0% टीडीएस लागू।"
        : locale === "mr"
        ? "पॅनसह फॉर्म १५जी/१५एच सादर: ०% टीडीएस लागू."
        : "Form 15G/15H submitted with verified PAN: 0% TDS applicable.";
  } else if (isPanLinked) {
    rate = 10;
    reason =
      locale === "hi"
        ? "सेवा < 5 वर्ष और राशि ≥ ₹50,000: सत्यापित पैन के साथ 10% मानक टीडीएस।"
        : locale === "mr"
        ? "सेवा < ५ वर्षे आणि रक्कम ≥ ₹५०,०००: पॅनसह १०% टीडीएस कपात."
        : "Service < 5 years & Amount >= ₹50,000: 10% standard TDS deducted with verified PAN.";
  } else {
    rate = 30; // Max marginal rate
    reason =
      locale === "hi"
        ? "पैन लिंक नहीं: धारा 192A के तहत 30% की उच्च टीडीएस दर लागू।"
        : locale === "mr"
        ? "पॅन लिंक नाही: कलम १९२ए अंतर्गत ३०% उच्च टीडीएस दर लागू."
        : "No PAN linked: Higher TDS rate of 30% applied under Section 192A.";
  }

  const tdsAmount = Math.round((claimAmount * rate) / 100);
  const finalAmount = claimAmount - tdsAmount;

  return (
    <section id="tax-calculator" className="scroll-mt-24 w-full">
      {/* Header Section */}
      <div className="mb-6 sm:mb-8">
        <h2 className="text-2xl sm:text-3xl lg:text-[32px] font-bold text-slate-900 mb-2 tracking-tight">
          {t.taxCalc.title}
        </h2>
        <p className="text-sm sm:text-base text-slate-600 max-w-3xl leading-relaxed">
          {t.taxCalc.subtitle}
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
                {t.taxCalc.amountLabel}
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
              <span>₹10,00,000 (10L)</span>
            </div>
          </div>

          {/* Service Duration Card */}
          <div className="bg-white rounded-xl border border-slate-200/90 p-5 sm:p-6 shadow-xs">
            <h3 className="text-sm sm:text-base font-semibold text-slate-900 mb-4">
              {t.taxCalc.serviceLabel}
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
                <span className="text-sm sm:text-base">
                  {locale === "hi" ? "5 वर्ष से कम" : locale === "mr" ? "५ वर्षांपेक्षा कमी" : "Less than 5 Years"}
                </span>
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
                <span className="text-sm sm:text-base">
                  {locale === "hi" ? "5 वर्ष या अधिक" : locale === "mr" ? "५ वर्षे किंवा अधिक" : "5 Years or More"}
                </span>
              </button>
            </div>

            <p className="text-xs text-slate-500 mt-3 flex items-start gap-1.5 leading-relaxed">
              <Info className="w-3.5 h-3.5 text-slate-400 shrink-0 mt-0.5" />
              <span>
                {locale === "hi"
                  ? "यदि पीएफ ट्रांसफर किया गया था तो पूर्व कंपनियों की सेवा अवधि भी शामिल होती है।"
                  : locale === "mr"
                  ? "जर पीएफ ट्रान्सफर केला असेल तर मागील कंपन्यांचा कालावधीही जोडला जातो."
                  : "Service includes tenure from previous employers if PF was transferred."}
              </span>
            </p>
          </div>

          {/* Document Submission Status Card */}
          <div className="bg-white rounded-xl border border-slate-200/90 p-4 sm:p-6 shadow-xs flex flex-col gap-5 sm:gap-6">
            <h3 className="text-sm sm:text-base font-semibold text-slate-900">
              {locale === "hi" ? "दस्तावेज़ स्थिति" : locale === "mr" ? "कागदपत्र स्थिती" : "Document Submission Status"}
            </h3>

            {/* PAN Card Toggle */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 sm:gap-4">
              <div className="min-w-0 flex-1">
                <div className="text-sm sm:text-base font-semibold text-slate-900">
                  {t.taxCalc.panLinkedLabel}
                </div>
                <div className="text-xs text-slate-500 mt-0.5 leading-relaxed">
                  {locale === "hi"
                    ? "30% की अधिकतम कर दर से बचने के लिए आवश्यक।"
                    : locale === "mr"
                    ? "३०% उच्च कर कपात टाळण्यासाठी आवश्यक."
                    : "Required to avoid maximum marginal tax rate (30%)."}
                </div>
              </div>

              <div className="flex items-center gap-1 bg-slate-100 p-1 rounded-lg shrink-0 self-start sm:self-center">
                <button
                  type="button"
                  onClick={() => setIsPanLinked(true)}
                  className={`px-3.5 py-1.5 rounded-md text-xs font-bold transition-all cursor-pointer ${
                    isPanLinked
                      ? "bg-white text-[#015d55] shadow-xs"
                      : "text-slate-600 hover:text-slate-900"
                  }`}
                >
                  {t.taxCalc.yes}
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setIsPanLinked(false);
                    setHasForm15G(false);
                  }}
                  className={`px-3.5 py-1.5 rounded-md text-xs font-bold transition-all cursor-pointer ${
                    !isPanLinked
                      ? "bg-white text-slate-900 shadow-xs"
                      : "text-slate-600 hover:text-slate-900"
                  }`}
                >
                  {t.taxCalc.no}
                </button>
              </div>
            </div>

            {/* Form 15G / 15H Toggle */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 sm:gap-4 pt-4 border-t border-slate-100">
              <div className="min-w-0 flex-1">
                <div className="text-sm sm:text-base font-semibold text-slate-900">
                  {t.taxCalc.form15gLabel}
                </div>
                <div className="text-xs text-slate-500 mt-0.5 leading-relaxed">
                  {locale === "hi"
                    ? "यदि कुल वार्षिक आय कर सीमा से कम है तो 0% टीडीएस हेतु।"
                    : locale === "mr"
                    ? "जर वार्षिक उत्पन्न करमर्यादेपेक्षा कमी असेल तर ०% टीडीएससाठी."
                    : "Submitted on portal if annual taxable income is below exemption limit."}
                </div>
              </div>

              <div className="flex items-center gap-1 bg-slate-100 p-1 rounded-lg shrink-0 self-start sm:self-center">
                <button
                  type="button"
                  disabled={!isPanLinked}
                  onClick={() => setHasForm15G(true)}
                  className={`px-3.5 py-1.5 rounded-md text-xs font-bold transition-all ${
                    !isPanLinked
                      ? "opacity-50 cursor-not-allowed text-slate-400"
                      : hasForm15G
                      ? "bg-white text-[#015d55] shadow-xs cursor-pointer"
                      : "text-slate-600 hover:text-slate-900 cursor-pointer"
                  }`}
                >
                  {t.taxCalc.yes}
                </button>
                <button
                  type="button"
                  disabled={!isPanLinked}
                  onClick={() => setHasForm15G(false)}
                  className={`px-3.5 py-1.5 rounded-md text-xs font-bold transition-all ${
                    !isPanLinked
                      ? "opacity-50 cursor-not-allowed text-slate-400"
                      : !hasForm15G
                      ? "bg-white text-slate-900 shadow-xs cursor-pointer"
                      : "text-slate-600 hover:text-slate-900 cursor-pointer"
                  }`}
                >
                  {t.taxCalc.no}
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column: Estimated Deduction Card */}
        <div className="lg:col-span-5 w-full">
          <div className="bg-[#0b1b36] text-white rounded-xl p-5 sm:p-7 shadow-lg flex flex-col justify-between">
            <div>
              <div className="flex items-center gap-2 text-xs font-bold text-teal-300 uppercase tracking-wider mb-4">
                <ShieldCheck className="w-4 h-4 text-teal-400 shrink-0" />
                <span>{t.taxCalc.badge}</span>
              </div>

              <h3 className="text-xl sm:text-2xl font-bold tracking-tight text-white mb-2">
                {locale === "hi" ? "अनुमानित बैंक भुगतान" : locale === "mr" ? "अपेक्षित बँक जमा रक्कम" : "Net Payout Estimate"}
              </h3>

              <p className="text-xs sm:text-sm text-slate-300 mb-6 leading-relaxed">
                {reason}
              </p>

              {/* Amount Breakdown */}
              <div className="space-y-3.5 py-5 border-y border-slate-700/80">
                <div className="flex justify-between items-center gap-3 text-sm">
                  <span className="text-slate-300 min-w-0">{t.taxCalc.grossAmount}</span>
                  <span className="font-mono font-semibold text-white shrink-0 text-right whitespace-nowrap">
                    ₹{formatNum(claimAmount)}
                  </span>
                </div>

                <div className="flex justify-between items-start sm:items-center gap-2 sm:gap-3 text-sm">
                  <div className="text-slate-300 flex flex-wrap items-center gap-1.5 min-w-0 flex-1">
                    <span>{t.taxCalc.tdsDeduction}</span>
                    <span className="inline-flex items-center bg-red-950/90 text-red-300 border border-red-800/50 px-1.5 py-0.5 rounded text-[11px] font-bold font-mono shrink-0">
                      {rate}%
                    </span>
                  </div>
                  <span className="font-mono font-bold text-red-400 shrink-0 text-right whitespace-nowrap">
                    -₹{formatNum(tdsAmount)}
                  </span>
                </div>

                <div className="flex justify-between items-center gap-3 pt-2">
                  <span className="text-sm sm:text-base font-bold text-white min-w-0">
                    {t.taxCalc.netCredit}
                  </span>
                  <span className="text-xl sm:text-2xl font-bold text-teal-300 font-mono shrink-0 text-right whitespace-nowrap">
                    ₹{formatNum(finalAmount)}
                  </span>
                </div>
              </div>
            </div>

            {/* Bottom Advisory */}
            <div className="mt-6 bg-slate-800/80 rounded-lg p-3.5 border border-slate-700/60 text-xs text-slate-300 leading-relaxed">
              <p>{t.taxCalc.taxTip}</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
