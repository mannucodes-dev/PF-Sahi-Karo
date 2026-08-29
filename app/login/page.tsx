"use client";

import React, { useState, Suspense } from "react";
import Link from "next/link";
import { useSearchParams, useRouter } from "next/navigation";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ShieldCheck, ArrowRight, Lock, AlertCircle, Loader2, Sparkles } from "lucide-react";
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
    <div className="min-h-[100dvh] bg-[#f7f9fb] flex flex-col items-center justify-center p-2.5 sm:p-3 text-slate-900">
      <div className="w-full max-w-[390px] space-y-2 my-auto">
        {/* Brand Header */}
        <div className="text-center space-y-1">
          <Link
            href="/"
            className="inline-flex mx-auto bg-[#005f56] text-white w-9 h-9 rounded-xl items-center justify-center shadow-xs ring-4 ring-teal-50 focus:outline-none focus:ring-2 focus:ring-teal-600"
            aria-label="PF Sahi Karo Home"
          >
            <ShieldCheck className="w-5 h-5 text-teal-100" aria-hidden="true" />
          </Link>
          <div>
            <h1 className="text-lg sm:text-xl font-extrabold tracking-tight text-[#005f56] leading-none">
              {t.common.brandName}
            </h1>
            <p className="text-[11px] text-slate-500 max-w-xs mx-auto font-medium leading-tight mt-0.5">
              {t.common.tagline}
            </p>
          </div>
          <div className="pt-0 flex justify-center">
            <LanguageSwitcher direction="down" align="right" />
          </div>
        </div>

        {/* Compact Login Card */}
        <Card className="border-slate-200/90 bg-white shadow-xs rounded-2xl overflow-hidden">
          <CardHeader className="py-2.5 px-4 border-b border-slate-100 space-y-0.5">
            <CardTitle className="text-sm font-bold text-slate-900 tracking-tight">
              {t.login.title}
            </CardTitle>
            <CardDescription className="text-[11px] text-slate-500 leading-tight">
              {t.login.subtitle}
            </CardDescription>
          </CardHeader>

          <CardContent className="space-y-2.5 p-3 sm:p-3.5">
            {/* Hackathon Judge Instant 1-Click Login Button */}
            <div className="rounded-xl bg-gradient-to-br from-amber-50/90 to-teal-50/40 border border-amber-300/80 p-2.5 space-y-1.5 text-xs shadow-2xs">
              <div className="flex items-center justify-between">
                <span className="font-extrabold text-slate-900 flex items-center gap-1 text-[11.5px]">
                  <Sparkles className="w-3.5 h-3.5 text-amber-600 shrink-0" aria-hidden="true" />
                  <span>{t.login.judgeTitle}</span>
                </span>
                <Badge className="bg-amber-400 text-slate-950 font-bold text-[9px] px-1.5 py-0 border-amber-500">
                  {t.login.prefilledBadge}
                </Badge>
              </div>
              <p className="text-slate-600 text-[10.5px] leading-tight">
                {t.login.judgeDesc}
              </p>
              <Button
                type="button"
                onClick={handleJudgeInstantLogin}
                disabled={isDemoLoading}
                className="w-full bg-[#fa9d1b] hover:bg-[#f59510] text-[#291500] font-extrabold h-8 py-1 rounded-lg shadow-xs text-xs flex items-center justify-center gap-1.5 transition-all active:scale-[0.98] border border-amber-500 cursor-pointer"
              >
                {isDemoLoading ? (
                  <>
                    <Loader2 className="w-3.5 h-3.5 animate-spin mr-1" />
                    <span>{t.login.judgeLoading}</span>
                  </>
                ) : (
                  <>
                    <span>⚡ {t.login.judgeBtn}</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </>
                )}
              </Button>
            </div>

            {/* Error banner */}
            {errorMessage && (
              <div
                role="alert"
                className="p-2 bg-rose-50 border border-rose-200 rounded-lg text-xs text-rose-800 flex items-start gap-1.5"
              >
                <AlertCircle className="w-3.5 h-3.5 text-rose-600 shrink-0 mt-0.5" aria-hidden="true" />
                <span className="font-medium text-[11px]">{errorMessage}</span>
              </div>
            )}

            {/* Divider */}
            <div className="relative flex py-0 items-center">
              <div className="flex-grow border-t border-slate-200"></div>
              <span className="flex-shrink mx-2 text-[9.5px] text-slate-400 uppercase font-bold tracking-wider">
                {t.login.orDivider}
              </span>
              <div className="flex-grow border-t border-slate-200"></div>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit} className="space-y-2">
              <div className="space-y-0.5">
                <label
                  htmlFor="uan-input"
                  className="block text-[11px] font-bold text-slate-800"
                >
                  {t.login.uanLabel}
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
                  placeholder={t.login.uanPlaceholder}
                  className="w-full h-8 px-2.5 text-xs bg-slate-50 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#005f56] focus:bg-white transition-all font-mono shadow-2xs"
                />
              </div>

              <div className="space-y-0.5">
                <label
                  htmlFor="password-input"
                  className="block text-[11px] font-bold text-slate-800"
                >
                  {t.login.passwordLabel}
                </label>
                <input
                  id="password-input"
                  name="password"
                  type="password"
                  autoComplete="current-password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder={t.login.passwordPlaceholder}
                  className="w-full h-8 px-2.5 text-xs bg-slate-50 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#005f56] focus:bg-white transition-all shadow-2xs"
                />
              </div>

              <Button
                type="submit"
                disabled={isLoading}
                className="w-full bg-[#005f56] hover:bg-[#004742] text-white font-extrabold h-8.5 py-1 rounded-lg shadow-xs text-xs flex items-center justify-center gap-1.5 transition-all active:scale-[0.98] cursor-pointer mt-0.5"
              >
                {isLoading ? (
                  <>
                    <Loader2 className="w-3.5 h-3.5 animate-spin mr-1.5" aria-hidden="true" />
                    <span>{t.login.signingIn}</span>
                  </>
                ) : (
                  <>
                    <span>{t.login.signInBtn}</span>
                    <ArrowRight className="w-3.5 h-3.5" aria-hidden="true" />
                  </>
                )}
              </Button>
            </form>
          </CardContent>
        </Card>

        {/* Security & Privacy Notice */}
        <div className="text-center space-y-0.5 text-[10.5px] text-slate-400">
          <p className="flex items-center justify-center gap-1">
            <Lock className="w-3 h-3 text-[#005f56]" aria-hidden="true" />
            <span>{t.login.securityNote}</span>
          </p>
          <p className="text-[10px]">
            {t.login.disclaimer}
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
        <div className="min-h-screen bg-slate-50 flex items-center justify-center text-xs text-slate-500">
          Loading sign in...
        </div>
      }
    >
      <LoginForm />
    </Suspense>
  );
}
