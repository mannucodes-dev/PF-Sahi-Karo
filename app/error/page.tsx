import React from "react";
import Link from "next/link";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { AlertTriangle, RotateCw, ArrowLeft } from "lucide-react";
import { Card } from "@/components/ui/card";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export default function ErrorPage() {
  return (
    <div className="min-h-screen flex flex-col bg-slate-50 text-zinc-900">
      <SiteHeader />

      <main id="main-content" className="max-w-md mx-auto px-4 py-16 sm:py-24 flex-1 flex items-center justify-center">
        <Card className="border-slate-200 bg-white p-6 sm:p-8 rounded-2xl shadow-sm text-center space-y-5">
          <div className="w-14 h-14 mx-auto rounded-full bg-amber-100 text-amber-800 flex items-center justify-center">
            <AlertTriangle className="w-8 h-8" aria-hidden="true" />
          </div>

          <div className="space-y-1.5">
            <h1 className="text-xl font-bold text-zinc-900">Service Request Interrupted</h1>
            <p className="text-xs sm:text-sm text-zinc-600 leading-relaxed">
              We encountered a temporary processing interruption while loading this resource.
            </p>
          </div>

          <div className="space-y-2 pt-2">
            <Link
              href="/dashboard"
              className={cn(
                buttonVariants({ size: "default" }),
                "w-full bg-teal-700 hover:bg-teal-800 text-white font-semibold flex items-center justify-center gap-2 text-sm"
              )}
            >
              <RotateCw className="w-4 h-4" aria-hidden="true" /> Retry from Dashboard
            </Link>

            <Link
              href="/"
              className={cn(
                buttonVariants({ variant: "outline", size: "sm" }),
                "w-full text-zinc-600 hover:text-zinc-900 text-xs"
              )}
            >
              <ArrowLeft className="w-3.5 h-3.5 mr-1" aria-hidden="true" /> Back to Home
            </Link>
          </div>
        </Card>
      </main>

      <SiteFooter />
    </div>
  );
}
