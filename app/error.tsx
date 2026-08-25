"use client";

import React, { useEffect } from "react";
import Link from "next/link";
import { AlertTriangle, RotateCw, ArrowLeft } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button, buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Log redacted error digest for observability
    console.error("[PF Sahi Karo Error Boundary]:", error.message);
  }, [error]);

  return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center p-4 sm:p-6 text-zinc-900">
      <Card className="max-w-md w-full border-slate-200 bg-white p-6 sm:p-8 rounded-2xl shadow-sm text-center space-y-5">
        <div className="w-14 h-14 mx-auto rounded-full bg-rose-100 text-rose-800 flex items-center justify-center">
          <AlertTriangle className="w-8 h-8" aria-hidden="true" />
        </div>

        <div className="space-y-1.5">
          <h1 className="text-xl font-bold text-zinc-900">Application Error Occurred</h1>
          <p className="text-xs sm:text-sm text-zinc-600 leading-relaxed">
            A temporary client exception was caught by our safety boundary. Your data has not been compromised.
          </p>
        </div>

        <div className="space-y-2 pt-2">
          <Button
            onClick={() => reset()}
            className="w-full bg-teal-700 hover:bg-teal-800 text-white font-semibold flex items-center justify-center gap-2 text-sm cursor-pointer"
          >
            <RotateCw className="w-4 h-4" aria-hidden="true" /> Try Again
          </Button>

          <Link
            href="/dashboard"
            className={cn(
              buttonVariants({ variant: "outline", size: "sm" }),
              "w-full text-zinc-600 hover:text-zinc-900 text-xs"
            )}
          >
            <ArrowLeft className="w-3.5 h-3.5 mr-1" aria-hidden="true" /> Return to Dashboard
          </Link>
        </div>
      </Card>
    </div>
  );
}
