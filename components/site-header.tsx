import React from "react";
import Link from "next/link";
import { ShieldCheck, LogIn, LayoutDashboard } from "lucide-react";
import { LanguageSwitcher } from "./language-switcher";
import { getSessionUser } from "@/lib/auth/session";

export async function SiteHeader() {
  const user = await getSessionUser();

  return (
    <header className="sticky top-0 z-30 bg-white/95 backdrop-blur-md border-b border-slate-200/80 shadow-2xs">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
        {/* Brand Logo & Title */}
        <Link href="/" className="flex items-center gap-2.5 group focus:outline-none focus:ring-2 focus:ring-teal-600 rounded-lg p-1">
          <div className="bg-teal-700 text-white w-9 h-9 rounded-xl flex items-center justify-center shadow-xs group-hover:bg-teal-800 transition-colors">
            <ShieldCheck className="w-5 h-5" aria-hidden="true" />
          </div>
          <div>
            <span className="font-bold text-base tracking-tight text-zinc-900 block leading-tight">
              PF Sahi Karo
            </span>
            <span className="text-[11px] text-zinc-500 hidden sm:block">
              EPFO Claim Rejection Assistance
            </span>
          </div>
        </Link>

        {/* Navigation & Language Switcher */}
        <nav aria-label="Primary Navigation" className="flex items-center gap-2 sm:gap-4">
          <LanguageSwitcher />

          <div className="hidden md:flex items-center gap-3 text-xs font-medium text-zinc-600 border-l border-slate-200 pl-3">
            <Link href="/about" className="hover:text-zinc-900 transition-colors py-1">
              About
            </Link>
            <Link href="/help" className="hover:text-zinc-900 transition-colors py-1">
              Help & Rules
            </Link>
            <Link href="/service-status" className="hover:text-zinc-900 transition-colors py-1">
              Status
            </Link>
          </div>

          {user ? (
            <Link
              href="/dashboard"
              className="bg-teal-700 hover:bg-teal-800 text-white text-xs font-semibold px-3.5 py-2 rounded-lg shadow-xs flex items-center gap-1.5 transition-all"
            >
              <LayoutDashboard className="w-3.5 h-3.5" aria-hidden="true" />
              <span>Dashboard</span>
            </Link>
          ) : (
            <Link
              href="/login"
              className="bg-teal-700 hover:bg-teal-800 text-white text-xs font-semibold px-3.5 py-2 rounded-lg shadow-xs flex items-center gap-1.5 transition-all"
            >
              <LogIn className="w-3.5 h-3.5" aria-hidden="true" />
              <span>Sign In</span>
            </Link>
          )}
        </nav>
      </div>
    </header>
  );
}
