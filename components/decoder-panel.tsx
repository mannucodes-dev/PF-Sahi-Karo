import React from "react";
import { RemarkCode } from "@/lib/mock-data";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import {
  FileWarning,
  Sparkles,
  CheckCircle2,
  AlertTriangle,
  ArrowRight,
} from "lucide-react";

interface DecoderPanelProps {
  remark: RemarkCode;
}

export function DecoderPanel({ remark }: DecoderPanelProps) {
  return (
    <div className="space-y-5">
      {/* 1. What EPFO said (Official Cryptic Portal Remark) */}
      <Card className="border-slate-800 bg-slate-950 text-slate-100 shadow-md overflow-hidden rounded-xl">
        {/* Terminal Header Bar */}
        <div className="bg-slate-900/90 px-4 py-2.5 border-b border-slate-800 flex flex-wrap items-center justify-between gap-2">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-rose-500 animate-pulse shrink-0" />
            <span className="w-2.5 h-2.5 rounded-full bg-amber-500 shrink-0" />
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 shrink-0" />
            <span className="text-xs font-mono text-slate-400 font-medium ml-1">
              EPFO Portal · Automated System Notice
            </span>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-[11px] font-mono bg-rose-950/80 text-rose-300 border border-rose-800/60 px-2 py-0.5 rounded font-semibold">
              REMARK: {remark.code}
            </span>
          </div>
        </div>

        {/* Terminal Content */}
        <CardContent className="p-4 sm:p-5 font-mono">
          <div className="text-[11px] uppercase tracking-wider text-slate-500 mb-2 font-sans font-medium flex items-center gap-1.5">
            <FileWarning className="w-3.5 h-3.5 text-amber-400 shrink-0" />
            <span>1. What EPFO said (Raw rejection reason on portal)</span>
          </div>

          <div className="bg-black/50 border border-slate-800 rounded-lg p-3.5 sm:p-4 text-xs sm:text-sm text-amber-300 leading-relaxed font-mono select-all">
            &ldquo;{remark.raw_remark}&rdquo;
          </div>

          <p className="text-[11px] text-slate-400 mt-2.5 font-sans">
            ⚠️ Sent to member portal without explanation, context, or clear resolution instructions.
          </p>
        </CardContent>
      </Card>

      {/* Visual Transformation Bridge */}
      <div className="flex items-center justify-center my-1">
        <div className="inline-flex items-center gap-2 bg-gradient-to-r from-teal-600 to-emerald-600 text-white text-xs font-semibold px-4 py-1.5 rounded-full shadow-sm">
          <Sparkles className="w-3.5 h-3.5 text-teal-100 animate-spin-slow" />
          <span>Decoded into Plain English · Zero Jargon</span>
          <ArrowRight className="w-3.5 h-3.5 text-teal-100" />
        </div>
      </div>

      {/* 2. What this actually means (Plain English Decode) */}
      <Card className="border-teal-200 bg-gradient-to-br from-teal-50/70 via-white to-emerald-50/40 shadow-sm ring-1 ring-teal-500/20 overflow-hidden rounded-xl">
        <CardHeader className="pb-2 pt-4 sm:pt-5 px-5 sm:px-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2.5 text-teal-950 text-sm sm:text-base font-bold">
              <div className="w-7 h-7 rounded-lg bg-teal-700 text-white flex items-center justify-center shadow-xs shrink-0">
                <Sparkles className="w-4 h-4" />
              </div>
              <span>2. What this actually means</span>
            </div>
            <span className="text-[11px] font-semibold bg-teal-100 text-teal-800 px-2.5 py-0.5 rounded-full">
              Verified Decode
            </span>
          </div>
        </CardHeader>
        <CardContent className="px-5 sm:px-6 pb-6 pt-1 space-y-3">
          <p className="text-sm sm:text-base text-zinc-900 leading-relaxed font-normal bg-white border border-teal-100/80 rounded-lg p-4 shadow-2xs">
            {remark.plain_explanation}
          </p>

          <div className="p-3 bg-teal-50/80 border border-teal-100 rounded-lg text-xs text-teal-900 flex items-start gap-2">
            <span className="font-bold text-teal-700 shrink-0">💡 Quick Insight:</span>
            <span>
              Yeh common clerical issue hai. EPFO automated checks require exact character-to-character matching. Correcting this usually resolves the claim smoothly.
            </span>
          </div>
        </CardContent>
      </Card>

      {/* 3. How to fix it (Numbered Concrete Steps) */}
      <Card className="border-slate-200 bg-white shadow-sm rounded-xl overflow-hidden">
        <CardHeader className="pb-3 pt-4 sm:pt-5 px-5 sm:px-6 border-b border-slate-100">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
            <div className="flex items-center gap-2.5 text-zinc-900 text-sm sm:text-base font-bold">
              <div className="w-7 h-7 rounded-lg bg-zinc-900 text-white flex items-center justify-center font-mono text-xs shadow-xs shrink-0">
                <CheckCircle2 className="w-4 h-4 text-emerald-400" />
              </div>
              <span>3. How to fix it (Step-by-Step Resolution)</span>
            </div>
            <span className="text-[11px] font-medium text-zinc-500 bg-zinc-100 px-2.5 py-1 rounded-md w-fit">
              Estimated resolution: 2–3 working days
            </span>
          </div>
        </CardHeader>
        <CardContent className="px-5 sm:px-6 pb-6 pt-4">
          <ol className="space-y-3">
            {remark.fix_steps.map((step, index) => (
              <li
                key={index}
                className="flex items-start gap-3.5 p-3.5 rounded-lg bg-slate-50 border border-slate-100 hover:bg-teal-50/40 hover:border-teal-100 transition-colors text-xs sm:text-sm text-zinc-800"
              >
                <span className="flex-shrink-0 w-6 h-6 rounded-full bg-teal-700 text-white flex items-center justify-center font-bold text-xs shadow-2xs mt-0.5">
                  {index + 1}
                </span>
                <span className="leading-relaxed pt-0.5 font-medium">{step}</span>
              </li>
            ))}
          </ol>
        </CardContent>
      </Card>
    </div>
  );
}
