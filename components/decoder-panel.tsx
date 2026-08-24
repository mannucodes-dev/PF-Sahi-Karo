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
    <div className="space-y-6">
      {/* 1. What EPFO said (Cryptic System Remark) */}
      <Card className="border-amber-200/90 bg-amber-50/50 shadow-sm overflow-hidden">
        <CardHeader className="pb-2 pt-4 px-5">
          <div className="flex items-center justify-between">
            <span className="flex items-center gap-2 text-amber-900 text-xs sm:text-sm font-bold uppercase tracking-wide">
              <FileWarning className="w-4 h-4 text-amber-700" />
              What EPFO said (Official Portal Remark)
            </span>
            <span className="text-[10px] font-mono bg-amber-200/70 text-amber-900 px-2 py-0.5 rounded font-semibold">
              Raw Remark Code: {remark.code}
            </span>
          </div>
        </CardHeader>
        <CardContent className="px-5 pb-5 pt-1">
          <div className="relative font-mono text-xs sm:text-sm bg-zinc-900 text-amber-300 border border-zinc-800 rounded-lg p-4 leading-relaxed shadow-inner">
            <div className="text-[10px] uppercase text-zinc-500 font-sans tracking-widest mb-1.5 flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-rose-500 animate-pulse"></span>
              EPFO System Error Message
            </div>
            &ldquo;{remark.raw_remark}&rdquo;
          </div>
        </CardContent>
      </Card>

      {/* 2. What this actually means (Plain English Decode) */}
      <Card className="border-teal-200 bg-gradient-to-br from-teal-50/60 via-white to-teal-50/30 shadow-sm">
        <CardHeader className="pb-2 pt-4 px-5">
          <div className="flex items-center gap-2 text-teal-900 text-sm sm:text-base font-bold">
            <div className="w-6 h-6 rounded-md bg-teal-600 text-white flex items-center justify-center">
              <Sparkles className="w-3.5 h-3.5" />
            </div>
            What this actually means
          </div>
        </CardHeader>
        <CardContent className="px-5 pb-5 pt-1">
          <p className="text-sm sm:text-base text-zinc-800 leading-relaxed bg-white/90 border border-teal-100 rounded-lg p-4">
            {remark.plain_explanation}
          </p>
        </CardContent>
      </Card>

      {/* 3. How to fix it (Numbered Concrete Steps) */}
      <Card className="border-zinc-200/90 bg-white shadow-sm">
        <CardHeader className="pb-2 pt-4 px-5">
          <div className="flex items-center gap-2 text-zinc-900 text-sm sm:text-base font-bold">
            <div className="w-6 h-6 rounded-md bg-zinc-900 text-white flex items-center justify-center font-mono text-xs">
              ✓
            </div>
            How to fix it (Step-by-Step Resolution)
          </div>
        </CardHeader>
        <CardContent className="px-5 pb-5 pt-2">
          <ol className="space-y-3">
            {remark.fix_steps.map((step, index) => (
              <li
                key={index}
                className="flex items-start gap-3.5 p-3 rounded-lg bg-zinc-50 border border-zinc-100/80 hover:bg-teal-50/30 hover:border-teal-100 transition-colors text-sm text-zinc-800"
              >
                <span className="flex-shrink-0 w-6 h-6 rounded-full bg-teal-700 text-white flex items-center justify-center font-semibold text-xs shadow-xs mt-0.5">
                  {index + 1}
                </span>
                <span className="leading-snug pt-0.5">{step}</span>
              </li>
            ))}
          </ol>
        </CardContent>
      </Card>
    </div>
  );
}
