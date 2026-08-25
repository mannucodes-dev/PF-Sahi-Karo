"use client";

import React, { useState, Suspense } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ShieldCheck, ArrowRight, Lock, UserCheck, AlertCircle, Loader2 } from "lucide-react";
import { loginAction } from "@/app/actions/auth-actions";

function LoginForm() {
  const searchParams = useSearchParams();
  const redirectTo = searchParams?.get("redirect") || "/dashboard";

  const isDemo =
    process.env.NODE_ENV !== "production" &&
    process.env.NEXT_PUBLIC_DEMO_MODE === "true";

  const [uan, setUan] = useState(isDemo ? "100234567890" : "");
  const [password, setPassword] = useState(isDemo ? "DemoPass123!" : "");
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setErrorMessage(null);

    const formData = new FormData();
    formData.append("uan", uan);
    formData.append("password", password);
    formData.append("redirectTo", redirectTo);

    try {
      const res = await loginAction(null, formData);
      if (res && !res.success) {
        setErrorMessage(res.error || "Authentication failed. Please verify your credentials.");
      }
    } catch {
      // If action redirects, Next.js throws redirect exception caught by router
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col items-center justify-center p-4 sm:p-6 text-zinc-900">
      <div className="w-full max-w-md space-y-6">
        {/* Brand Header */}
        <div className="text-center space-y-2">
          <Link
            href="/"
            className="inline-flex mx-auto bg-gradient-to-br from-teal-700 to-teal-900 text-white w-14 h-14 rounded-2xl items-center justify-center shadow-md shadow-teal-900/15 ring-4 ring-teal-50 focus:outline-none focus:ring-2 focus:ring-teal-600"
            aria-label="PF Sahi Karo Home"
          >
            <ShieldCheck className="w-8 h-8 text-teal-100" aria-hidden="true" />
          </Link>
          <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-zinc-900">
            PF Sahi Karo
          </h1>
          <p className="text-xs sm:text-sm text-zinc-600 max-w-sm mx-auto font-medium">
            Understand your EPFO claim rejection and follow a verified fix
          </p>
        </div>

        {/* Login Card */}
        <Card className="border-slate-200 bg-white shadow-sm rounded-2xl overflow-hidden">
          <CardHeader className="pb-4 pt-6 px-6 border-b border-slate-100">
            <CardTitle className="text-lg font-bold text-zinc-900 tracking-tight">
              Sign In to Your Claim Dashboard
            </CardTitle>
            <CardDescription className="text-xs text-zinc-500">
              Enter your 12-digit Universal Account Number (UAN) to access active and previous claims.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4 p-6">
            {/* Demo Notice (strictly isolated to development mode) */}
            {isDemo && (
              <div className="rounded-xl bg-teal-50/90 border border-teal-200/80 p-3.5 space-y-2 text-xs">
                <div className="flex items-center justify-between">
                  <span className="font-bold text-teal-950 flex items-center gap-1.5">
                    <UserCheck className="w-3.5 h-3.5 text-teal-700" aria-hidden="true" />
                    Development Demo Mode Active
                  </span>
                  <Badge variant="outline" className="text-[10px] bg-white text-teal-800 border-teal-300 font-semibold">
                    Pre-filled
                  </Badge>
                </div>
                <div className="grid grid-cols-2 gap-2 pt-1 font-mono text-[11px] text-teal-950">
                  <div className="bg-white rounded-lg p-2 border border-teal-100 shadow-2xs">
                    <span className="text-teal-600 block text-[10px] font-sans font-medium">Mock Citizen</span>
                    <span className="font-bold">Suresh Kumar</span>
                  </div>
                  <div className="bg-white rounded-lg p-2 border border-teal-100 shadow-2xs">
                    <span className="text-teal-600 block text-[10px] font-sans font-medium">UAN</span>
                    <span className="font-bold">••••••••7890</span>
                  </div>
                </div>
              </div>
            )}

            {/* Error Message */}
            {errorMessage && (
              <div
                role="alert"
                className="p-3 bg-rose-50 border border-rose-200 rounded-lg text-xs text-rose-800 flex items-center gap-2"
              >
                <AlertCircle className="w-4 h-4 text-rose-600 shrink-0" aria-hidden="true" />
                <span>{errorMessage}</span>
              </div>
            )}

            {/* Form */}
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-1.5">
                <label htmlFor="uan-input" className="text-xs font-semibold text-zinc-700 block">
                  Universal Account Number (UAN)
                </label>
                <input
                  id="uan-input"
                  type="text"
                  name="uan"
                  value={uan}
                  onChange={(e) => setUan(e.target.value)}
                  required
                  pattern="[0-9]{12}"
                  maxLength={12}
                  className="w-full h-11 px-3 py-2 text-sm rounded-lg border border-slate-300 bg-slate-50/60 focus:bg-white focus:outline-none focus:ring-2 focus:ring-teal-600 focus:border-transparent font-mono"
                  placeholder="Enter 12-digit UAN (e.g. 100234567890)"
                />
              </div>

              <div className="space-y-1.5">
                <label htmlFor="password-input" className="text-xs font-semibold text-zinc-700 block">
                  Password
                </label>
                <div className="relative">
                  <input
                    id="password-input"
                    type="password"
                    name="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    className="w-full h-11 px-3 py-2 text-sm rounded-lg border border-slate-300 bg-slate-50/60 focus:bg-white focus:outline-none focus:ring-2 focus:ring-teal-600 focus:border-transparent"
                    placeholder="Enter password"
                  />
                  <Lock className="w-4 h-4 text-zinc-400 absolute right-3 top-3.5" aria-hidden="true" />
                </div>
              </div>

              <Button
                type="submit"
                disabled={isLoading}
                className="w-full h-11 bg-teal-700 hover:bg-teal-800 text-white font-semibold flex items-center justify-center gap-2 transition-transform active:scale-[0.98] mt-3 rounded-lg shadow-sm cursor-pointer"
              >
                {isLoading ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" aria-hidden="true" /> Verifying Session...
                  </>
                ) : (
                  <>
                    Sign In to Dashboard <ArrowRight className="w-4 h-4" aria-hidden="true" />
                  </>
                )}
              </Button>
            </form>
          </CardContent>
        </Card>

        {/* Footer Note */}
        <p className="text-center text-xs text-zinc-500">
          PF Sahi Karo is an independent citizen assistance service. We never store or log your credentials.
        </p>
      </div>
    </div>
  );
}

export default function LoginPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen bg-slate-50 flex items-center justify-center p-6 text-zinc-600">
          <div className="flex items-center gap-2 text-sm font-medium">
            <Loader2 className="w-5 h-5 animate-spin text-teal-700" aria-hidden="true" />
            Loading authentication portal...
          </div>
        </div>
      }
    >
      <LoginForm />
    </Suspense>
  );
}
