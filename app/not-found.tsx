import React from "react";
import Link from "next/link";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { FileQuestion, ArrowLeft } from "lucide-react";
import { Card } from "@/components/ui/card";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export default function NotFound() {
  return (
    <div className="min-h-screen flex flex-col bg-slate-50 text-zinc-900">
      <SiteHeader />

      <main id="main-content" className="max-w-md mx-auto px-4 py-16 sm:py-24 flex-1 flex items-center justify-center">
        <Card className="border-slate-200 bg-white p-6 sm:p-8 rounded-2xl shadow-sm text-center space-y-5">
          <div className="w-14 h-14 mx-auto rounded-full bg-slate-100 text-slate-700 flex items-center justify-center">
            <FileQuestion className="w-8 h-8" aria-hidden="true" />
          </div>

          <div className="space-y-1.5">
            <h1 className="text-xl font-bold text-zinc-900">Page or Record Not Found</h1>
            <p className="text-xs sm:text-sm text-zinc-600 leading-relaxed">
              The requested claim, document, or guide does not exist or may have been moved.
            </p>
          </div>

          <div className="pt-2">
            <Link
              href="/dashboard"
              className={cn(
                buttonVariants({ size: "default" }),
                "w-full bg-teal-700 hover:bg-teal-800 text-white font-semibold flex items-center justify-center gap-2 text-sm"
              )}
            >
              <ArrowLeft className="w-4 h-4" aria-hidden="true" /> Return to Claims Dashboard
            </Link>
          </div>
        </Card>
      </main>

      <SiteFooter />
    </div>
  );
}
