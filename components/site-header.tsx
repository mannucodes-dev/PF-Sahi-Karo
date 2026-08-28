import React from "react";
import Link from "next/link";
import { Zap, CircleUserRound, Menu } from "lucide-react";
import { LanguageSwitcher } from "./language-switcher";
import { getSessionUser } from "@/lib/auth/session";

export async function SiteHeader() {
  const user = await getSessionUser();

  return (
    <header className="w-full bg-white border-b border-slate-200/60 sticky top-0 z-50">
      <div className="max-w-[1240px] mx-auto px-6 sm:px-8 py-3.5 flex items-center justify-between">
        {/* Logo & Brand */}
        <Link href="/" className="flex items-center gap-3">
          <img
            alt="PF Sahi Karo Logo"
            className="h-8 w-8 object-contain"
            src="/logo.png"
          />
          <span className="text-[22px] font-bold text-[#005f56] tracking-tight">
            PF Sahi Karo
          </span>
        </Link>

        {/* Navigation Links (Desktop) */}
        <nav aria-label="Main Navigation" className="hidden md:flex items-center gap-8 text-[15px]">
          <Link
            href="/#instant-decoder"
            className="text-[#005f56] font-bold border-b-2 border-[#005f56] pb-1 transition-all"
          >
            Instant Decoder
          </Link>
          <Link
            href="/#tax-calculator"
            className="text-slate-600 hover:text-[#005f56] font-medium transition-colors"
          >
            TDS Calculator
          </Link>
          <Link
            href="/#office-directory"
            className="text-slate-600 hover:text-[#005f56] font-medium transition-colors"
          >
            Office Directory
          </Link>
          <Link
            href="/help"
            className="text-slate-600 hover:text-[#005f56] font-medium transition-colors"
          >
            Rules & FAQ
          </Link>
        </nav>

        {/* Action Controls */}
        <div className="flex items-center gap-5">
          <LanguageSwitcher />

          <Link
            href="/dashboard"
            className="bg-[#fa9d1b] hover:bg-[#f59510] text-[#291500] px-4 py-2 rounded-lg font-bold text-sm flex items-center gap-1.5 shadow-2xs transition-all h-[40px]"
            title="Instant 1-Click Evaluation for Hackathon Judges"
          >
            <Zap className="w-4 h-4 text-[#291500] fill-[#291500]" />
            <span>Judge Demo</span>
          </Link>

          <Link
            href={user ? "/dashboard" : "/login"}
            aria-label="Account"
            className="text-slate-700 hover:text-[#005f56] transition-colors p-1 flex items-center justify-center"
          >
            <CircleUserRound className="w-6 h-6 text-slate-700 stroke-[1.75]" />
          </Link>

          <Link
            href="/#instant-decoder"
            aria-label="Mobile Menu"
            className="md:hidden text-slate-700 p-1 flex items-center justify-center"
          >
            <Menu className="w-6 h-6 text-slate-700" />
          </Link>
        </div>
      </div>
    </header>
  );
}
