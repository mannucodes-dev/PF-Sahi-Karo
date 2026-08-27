"use client";

import React, { useState, Suspense } from "react";
import Link from "next/link";
import { useSearchParams, useRouter } from "next/navigation";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ShieldCheck, ArrowRight, Lock, UserCheck, AlertCircle, Loader2, Sparkles } from "lucide-react";
import { loginAction } from "@/app/actions/auth-actions";
import { useTranslation } from "@/lib/i18n/context";
import { LanguageSwitcher } from "@/components/language-switcher";

function LoginForm() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const redirectTo = searchParams?.get("redirect") || "/dashboard";
  const { t } = useTranslation();

  const [uan, setUan] = useState("100234567890");
  const [password, setPassword] = useState("DemoPass123!");
  const [isLoading, setIsLoading] = useState(false);
  const [isDemoLoading, setIsDemoLoading] = useState(false);
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
      // Next.js handles redirect
    } finally {
      setIsLoading(false);
    }
  };

  const handleJudgeInstantLogin = async () => {
    setIsDemoLoading(true);
    setErrorMessage(null);
    const formData = new FormData();
    formData.append("uan", "100234567890");
    formData.append("password", "DemoPass123!");
    formData.append("redirectTo", redirectTo);

    try {
      const res = await loginAction(null, formData);
      if (res && !res.success) {
        // Fallback directly to dashboard in demo mode
        router.push(redirectTo);
      }
    } catch {
      // Redirect handled
    } finally {
      setIsDemoLoading(false);
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
          <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-zinc-900">
            PF Sahi Karo
          </h1>
          <p className="text-xs sm:text-sm text-zinc-600 max-w-sm mx-auto font-medium">
            {t.common.tagline}
          </p>
          <div className="pt-1 flex justify-center">
            <LanguageSwitcher />
          </div>
        </div>

        {/* Login Card */}
        <Card className="border-slate-200 bg-white shadow-md rounded-2xl overflow-hidden">
          <CardHeader className="pb-4 pt-6 px-6 border-b border-slate-100">
            <CardTitle className="text-lg sm:text-xl font-bold text-zinc-900 tracking-tight">
              Sign In to Your Claim Dashboard
            </CardTitle>
            <CardDescription className="text-xs text-zinc-500">
              Enter your 12-digit Universal Account Number (UAN) to access active and previous claims.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4 p-6">
            {/* Hackathon Judge Instant 1-Click Login Button */}
            <div className="rounded-xl bg-gradient-to-br from-amber-50 to-teal-50 border border-amber-300/80 p-4 space-y-2.5 text-xs shadow-2xs">
              <div className="flex items-center justify-between">
                <span className="font-extrabold text-slate-900 flex items-center gap-1.5 text-xs sm:text-sm">
                  <Sparkles className="w-4 h-4 text-amber-600" aria-hidden="true" />
                  Hackathon Judge 1-Click Evaluation
                </span>
                <Badge className="bg-amber-400 text-slate-950 font-bold text-[10px] border-amber-500">
                  Pre-filled
                </Badge>
              </div>
              <p className="text-zinc-600 text-xs leading-relaxed">
                Test the complete citizen experience as <strong>Suresh Kumar</strong> (Factory Supervisor with 1 Rejected, 1 Settled, and 1 Pending claim).
              </p>
              <Button
                type="button"
                onClick={handleJudgeInstantLogin}
                disabled={isDemoLoading}
                className="w-full bg-amber-400 hover:bg-amber-500 text-slate-950 font-extrabold py-2.5 rounded-xl shadow-xs text-xs sm:text-sm flex items-center justify-center gap-2 transition-all active:scale-[0.98] border border-amber-500 cursor-pointer"
              >
                {isDemoLoading ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin mr-1" />
                    Signing in as Suresh...
                  </>
                ) : (
                  <>
                    <span>⚡ Log in as Suresh (1-Click Instant Demo)</span>
                    <ArrowRight className="w-4 h-4" />
                  </>
                )}
              </Button>
            </div>

            {/* Error banner */}
            {errorMessage && (
              <div
                role="alert"
                className="p-3.5 bg-rose-50 border border-rose-200 rounded-xl text-xs text-rose-800 flex items-start gap-2.5"
              >
                <AlertCircle className="w-4 h-4 text-rose-600 shrink-0 mt-0.5" aria-hidden="true" />
                <span className="font-medium">{errorMessage}</span>
              </div>
            )}

            <div className="relative flex py-1 items-center">
              <div className="flex-grow border-t border-slate-200"></div>
              <span className="flex-shrink mx-3 text-xs text-zinc-400 uppercase font-semibold">Or enter manually</span>
              <div className="flex-grow border-t border-slate-200"></div>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-1.5">
                <label
                  htmlFor="uan-input"
                  className="block text-xs sm:text-sm font-bold text-zinc-800"
                >
                  Universal Account Number (UAN)
                </label>
                <input
                  id="uan-input"
                  name="uan"
                  type="text"
                  inputMode="numeric"
                  autoComplete="username"
                  required
                  maxLength={12}
                  value={uan}
                  onChange={(e) => setUan(e.target.value.replace(/\D/g, ""))}
                  placeholder="e.g. 100234567890"
                  className="w-full px-3.5 py-2.5 text-sm bg-slate-50 border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-teal-600 focus:bg-white transition-all font-mono shadow-2xs"
                />
              </div>

              <div className="space-y-1.5">
                <label
                  htmlFor="password-input"
                  className="block text-xs sm:text-sm font-bold text-zinc-800"
                >
                  Member Portal Password
                </label>
                <input
                  id="password-input"
                  name="password"
                  type="password"
                  autoComplete="current-password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter your password"
                  className="w-full px-3.5 py-2.5 text-sm bg-slate-50 border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-teal-600 focus:bg-white transition-all shadow-2xs"
                />
              </div>

              <Button
                type="submit"
                disabled={isLoading}
                className="w-full bg-teal-700 hover:bg-teal-800 text-white font-extrabold py-3 rounded-xl shadow-xs text-sm flex items-center justify-center gap-2 transition-all active:scale-[0.98] cursor-pointer"
              >
                {isLoading ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin mr-2" aria-hidden="true" />
                    <span>Signing in...</span>
                  </>
                ) : (
                  <>
                    <span>Sign In</span>
                    <ArrowRight className="w-4 h-4" aria-hidden="true" />
                  </>
                )}
              </Button>
            </form>
          </CardContent>
        </Card>

        {/* Security & Privacy Notice */}
        <div className="text-center space-y-1 text-xs text-zinc-500">
          <p className="flex items-center justify-center gap-1">
            <Lock className="w-3.5 h-3.5 text-teal-700" aria-hidden="true" />
            <span>End-to-end simulated verification. Zero plaintext Aadhaar storage.</span>
          </p>
          <p>
            Independent citizen civic tech tool. Not affiliated with EPFO.
          </p>
        </div>
      </div>
    </div>
  );
}

export default function LoginPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen bg-slate-50 flex items-center justify-center text-sm text-zinc-500">
          Loading sign in...
        </div>
      }
    >
      <LoginForm />
    </Suspense>
  );
}
