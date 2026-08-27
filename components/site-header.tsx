import React from "react";
import Link from "next/link";
import { ShieldCheck, LogIn, LayoutDashboard, Sparkles, Calculator, MapPin } from "lucide-react";
import { LanguageSwitcher } from "./language-switcher";
import { getSessionUser } from "@/lib/auth/session";
import { getServerTranslation } from "@/lib/i18n/server";

export async function SiteHeader() {
  const user = await getSessionUser();
  const { t } = await getServerTranslation();

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-slate-200/90 shadow-2xs">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 h-16 sm:h-18 flex items-center justify-between gap-3">
        {/* Brand Logo & Title */}
        <Link
          href="/"
          className="flex items-center gap-2.5 group focus:outline-none focus:ring-2 focus:ring-teal-600 rounded-xl p-1"
        >
          <div className="bg-gradient-to-br from-teal-700 to-teal-900 text-white w-9 h-9 sm:w-10 sm:h-10 rounded-xl flex items-center justify-center shadow-xs group-hover:scale-105 transition-transform">
            <ShieldCheck className="w-5 h-5 sm:w-6 sm:h-6" aria-hidden="true" />
          </div>
          <div>
            <span className="font-extrabold text-base sm:text-lg tracking-tight text-zinc-900 block leading-tight">
              PF Sahi Karo
            </span>
            <span className="text-[11px] text-zinc-500 hidden md:block font-medium">
              {t.common.tagline}
            </span>
          </div>
        </Link>

        {/* Navigation & Language Switcher */}
        <nav aria-label="Primary Navigation" className="flex items-center gap-2 sm:gap-3">
          {/* Quick Anchor Links for High-Value Citizen Tools */}
          <div className="hidden lg:flex items-center gap-1 text-xs font-semibold text-zinc-600">
            <Link
              href="/#instant-decoder"
              className="hover:text-teal-900 hover:bg-slate-100 px-2.5 py-1.5 rounded-lg transition-colors"
            >
              {t.nav.decoder}
            </Link>
            <Link
              href="/#tax-calculator"
              className="hover:text-teal-900 hover:bg-slate-100 px-2.5 py-1.5 rounded-lg transition-colors"
            >
              {t.nav.taxCalc}
            </Link>
            <Link
              href="/#office-directory"
              className="hover:text-teal-900 hover:bg-slate-100 px-2.5 py-1.5 rounded-lg transition-colors"
            >
              {t.nav.officeFinder}
            </Link>
            <Link
              href="/help"
              className="hover:text-teal-900 hover:bg-slate-100 px-2.5 py-1.5 rounded-lg transition-colors"
            >
              {t.nav.help}
            </Link>
          </div>

          <LanguageSwitcher />

          {/* Judge Demo Quick Action (1-Click Login to Suresh Profile with Rejected Claim) */}
          <Link
            href="/dashboard"
            className="bg-amber-400 hover:bg-amber-500 text-slate-950 text-xs font-extrabold px-3 py-2 rounded-lg shadow-xs flex items-center gap-1.5 transition-all active:scale-95 border border-amber-500/80 shrink-0"
            title="Instant 1-Click Evaluation for Hackathon Judges"
          >
            <Sparkles className="w-3.5 h-3.5 text-slate-900" aria-hidden="true" />
            <span className="hidden sm:inline">{t.nav.judgeDemo}</span>
            <span className="sm:hidden">Demo</span>
          </Link>

          {user ? (
            <Link
              href="/dashboard"
              className="bg-teal-700 hover:bg-teal-800 text-white text-xs sm:text-sm font-bold px-3.5 py-2 rounded-lg shadow-xs flex items-center gap-1.5 transition-all shrink-0"
            >
              <LayoutDashboard className="w-4 h-4" aria-hidden="true" />
              <span>{t.nav.dashboard}</span>
            </Link>
          ) : (
            <Link
              href="/login"
              className="bg-teal-700 hover:bg-teal-800 text-white text-xs sm:text-sm font-bold px-3.5 py-2 rounded-lg shadow-xs flex items-center gap-1.5 transition-all shrink-0"
            >
              <LogIn className="w-4 h-4" aria-hidden="true" />
              <span>{t.nav.signIn}</span>
            </Link>
          )}
        </nav>
      </div>
    </header>
  );
}
