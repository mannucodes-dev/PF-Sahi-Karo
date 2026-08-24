import React from "react";
import { RemarkCode } from "@/lib/mock-data";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { AlertCircle, CheckCircle2, FileText, Wrench } from "lucide-react";

interface DecoderPanelProps {
  remark: RemarkCode;
}

export function DecoderPanel({ remark }: DecoderPanelProps) {
  return (
    <div className="space-y-6">
      {/* 1. What EPFO said */}
      <Card className="border-amber-200 bg-amber-50/40">
        <CardHeader className="pb-2">
          <div className="flex items-center gap-2 text-amber-800 text-sm font-semibold">
            <FileText className="w-4 h-4" />
            What EPFO said (Raw Remark)
          </div>
        </CardHeader>
        <CardContent>
          <div className="font-mono text-xs bg-white/80 border border-amber-200/60 rounded-md p-3 text-zinc-800 leading-relaxed">
            {remark.raw_remark}
          </div>
        </CardContent>
      </Card>

      {/* 2. What this actually means */}
      <Card className="border-teal-200 bg-teal-50/40">
        <CardHeader className="pb-2">
          <div className="flex items-center gap-2 text-teal-800 text-sm font-semibold">
            <AlertCircle className="w-4 h-4" />
            What this actually means (Plain English)
          </div>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-zinc-800 leading-relaxed">
            {remark.plain_explanation}
          </p>
        </CardContent>
      </Card>

      {/* 3. How to fix it */}
      <Card className="border-zinc-200">
        <CardHeader className="pb-2">
          <div className="flex items-center gap-2 text-zinc-900 text-sm font-semibold">
            <Wrench className="w-4 h-4 text-teal-700" />
            How to fix it (Step-by-Step)
          </div>
        </CardHeader>
        <CardContent>
          <ol className="space-y-3 pt-1">
            {remark.fix_steps.map((step, index) => (
              <li key={index} className="flex items-start gap-3 text-sm text-zinc-700">
                <span className="flex-shrink-0 w-6 h-6 rounded-full bg-teal-100 text-teal-800 flex items-center justify-center font-medium text-xs">
                  {index + 1}
                </span>
                <span className="pt-0.5 leading-snug">{step}</span>
              </li>
            ))}
          </ol>
        </CardContent>
      </Card>
    </div>
  );
}
