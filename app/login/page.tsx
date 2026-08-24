"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ShieldCheck, ArrowRight, Lock, UserCheck } from "lucide-react";
import { MOCK_USER } from "@/lib/mock-data";

export default function LoginPage() {
  const router = useRouter();
  const [uan, setUan] = useState(MOCK_USER.uan);
  const [password, setPassword] = useState("••••••••");
  const [isLoading, setIsLoading] = useState(false);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    // Smooth transition to dashboard for the demo
    setTimeout(() => {
      router.push("/dashboard");
    }, 400);
  };

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col items-center justify-center p-4 sm:p-6 text-zinc-900">
      <div className="w-full max-w-md space-y-6">
        {/* Brand Header */}
        <div className="text-center space-y-2.5">
          <div className="mx-auto bg-gradient-to-br from-teal-700 to-teal-900 text-white w-14 h-14 rounded-2xl flex items-center justify-center shadow-md shadow-teal-900/15 ring-4 ring-teal-50">
            <ShieldCheck className="w-8 h-8 text-teal-100" />
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-zinc-900">
            PF Sahi Karo
          </h1>
          <p className="text-xs sm:text-sm text-zinc-600 max-w-sm mx-auto font-medium">
            Samajh, sirf apne PF claim ka · Understand your PF claim, instantly
          </p>
        </div>

        {/* Login Card */}
        <Card className="border-slate-200/90 shadow-sm bg-white rounded-2xl overflow-hidden">
          <CardHeader className="pb-4 pt-6 px-6 border-b border-slate-100">
            <CardTitle className="text-lg font-bold text-zinc-900 tracking-tight">
              Sign In to Your PF Account
            </CardTitle>
            <CardDescription className="text-xs text-zinc-500">
              Access your claim status, track settlements, and decode rejection reasons.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4 p-6">
            {/* Demo Notice for Judges */}
            <div className="rounded-xl bg-teal-50/90 border border-teal-200/80 p-3.5 space-y-2 text-xs">
              <div className="flex items-center justify-between">
                <span className="font-bold text-teal-950 flex items-center gap-1.5">
                  <UserCheck className="w-3.5 h-3.5 text-teal-700" />
                  Demo login — pre-filled for judges
                </span>
                <Badge variant="outline" className="text-[10px] bg-white text-teal-800 border-teal-300 font-semibold">
                  Pre-configured
                </Badge>
              </div>
              <div className="grid grid-cols-2 gap-2 pt-1 font-mono text-[11px] text-teal-950">
                <div className="bg-white rounded-lg p-2 border border-teal-100/90 shadow-2xs">
                  <span className="text-teal-600 block text-[10px] font-sans font-medium">Mock Citizen</span>
                  <span className="font-bold">{MOCK_USER.full_name}</span>
                </div>
                <div className="bg-white rounded-lg p-2 border border-teal-100/90 shadow-2xs">
                  <span className="text-teal-600 block text-[10px] font-sans font-medium">UAN (12-digit)</span>
                  <span className="font-bold">{MOCK_USER.uan}</span>
                </div>
              </div>
            </div>

            {/* Form */}
            <form onSubmit={handleLogin} className="space-y-4">
              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-zinc-700 block">
                  Universal Account Number (UAN)
                </label>
                <div className="relative">
                  <input
                    type="text"
                    value={uan}
                    onChange={(e) => setUan(e.target.value)}
                    required
                    className="w-full h-11 px-3 py-2 text-sm rounded-lg border border-slate-300 bg-slate-50/60 focus:bg-white focus:outline-none focus:ring-2 focus:ring-teal-600 focus:border-transparent font-mono"
                    placeholder="Enter 12-digit UAN"
                  />
                  <div className="absolute right-3 top-3 text-zinc-400 text-xs font-sans font-medium">
                    Auto-filled
                  </div>
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-zinc-700 block">
                  Password / PIN
                </label>
                <div className="relative">
                  <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    className="w-full h-11 px-3 py-2 text-sm rounded-lg border border-slate-300 bg-slate-50/60 focus:bg-white focus:outline-none focus:ring-2 focus:ring-teal-600 focus:border-transparent"
                  />
                  <Lock className="w-4 h-4 text-zinc-400 absolute right-3 top-3.5" />
                </div>
              </div>

              <Button
                type="submit"
                disabled={isLoading}
                className="w-full h-11 bg-teal-700 hover:bg-teal-800 text-white font-semibold flex items-center justify-center gap-2 transition-transform active:scale-[0.98] mt-3 rounded-lg shadow-sm cursor-pointer"
              >
                {isLoading ? (
                  "Logging in..."
                ) : (
                  <>
                    Log in <ArrowRight className="w-4 h-4" />
                  </>
                )}
              </Button>
            </form>
          </CardContent>
        </Card>

        {/* Footer Note */}
        <p className="text-center text-xs text-zinc-500">
          Demo prototype for EPFO Claim Grievance Hackathon · Deterministic offline mode active
        </p>
      </div>
    </div>
  );
}
