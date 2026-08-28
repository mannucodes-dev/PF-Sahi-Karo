"use client";

import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Zap,
  CircleUserRound,
  Menu,
  X,
  ArrowRight,
  Sparkles,
  MapPin,
  Calculator,
  BookOpen,
} from "lucide-react";
import { LanguageSwitcher } from "./language-switcher";
import type { CitizenUser } from "@/lib/auth/session";

interface SiteHeaderClientProps {
  user: CitizenUser | null;
}

interface NavItem {
  id: string;
  label: string;
  mobileLabel: string;
  href: string;
  badge?: string;
  subtext?: string;
  icon: React.ComponentType<{ className?: string }>;
}

const NAV_ITEMS: NavItem[] = [
  {
    id: "tds-calculator",
    label: "TDS Calculator",
    mobileLabel: "PF TDS Tax Calculator",
    href: "/#tax-calculator",
    subtext: "Section 192A",
    icon: Calculator,
  },
  {
    id: "instant-decoder",
    label: "Instant Decoder",
    mobileLabel: "Instant Rejection Decoder",
    href: "/#instant-decoder",
    badge: "Primary",
    icon: Sparkles,
  },
  {
    id: "office-directory",
    label: "Office Directory",
    mobileLabel: "EPFO Office Directory",
    href: "/#office-directory",
    subtext: "138+ Offices",
    icon: MapPin,
  },
  {
    id: "rules-faq",
    label: "Rules & FAQ",
    mobileLabel: "Rejection Rules & FAQ",
    href: "/help",
    icon: BookOpen,
  },
];

function resolveActiveId(pathname: string, hash: string): string {
  if (pathname.startsWith("/help")) {
    return "rules-faq";
  }

  const cleanHash = (hash || "").toLowerCase().replace(/^#/, "");

  if (cleanHash === "tds-calculator" || cleanHash === "tax-calculator" || cleanHash === "calculator") {
    return "tds-calculator";
  }
  if (cleanHash === "office-directory" || cleanHash === "offices" || cleanHash === "office-locator") {
    return "office-directory";
  }
  if (cleanHash === "instant-decoder" || cleanHash === "decoder" || cleanHash === "rejection-decoder") {
    return "instant-decoder";
  }
  if (cleanHash === "rules-faq" || cleanHash === "faq" || cleanHash === "rules") {
    return "rules-faq";
  }

  if (pathname === "/") {
    return "instant-decoder";
  }

  return "";
}

export function SiteHeaderClient({ user }: SiteHeaderClientProps) {
  const pathname = usePathname();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  // Close mobile menu on resize to desktop or ESC key
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1024) {
        setIsMobileMenuOpen(false);
      }
    };
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setIsMobileMenuOpen(false);
      }
    };

    window.addEventListener("resize", handleResize);
    window.addEventListener("keydown", handleKeyDown);
    return () => {
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  const handleNavClick = () => {
    setIsMobileMenuOpen(false);
  };

  return (
    <header className="w-full bg-white border-b border-slate-200/60 sticky top-0 z-50 transition-all">
      <div className="max-w-[1240px] mx-auto px-4 sm:px-6 lg:px-8 py-3.5 flex items-center justify-between">
        {/* Left: Logo & Brand Name */}
        <Link
          href="/"
          className="flex items-center gap-3 shrink-0 focus:outline-none rounded-lg p-0.5"
          onClick={() => {
            setIsMobileMenuOpen(false);
          }}
        >
          <img
            alt="PF Sahi Karo Logo"
            className="h-8 w-8 object-contain shrink-0"
            src="/logo.png"
          />
          <span className="text-xl sm:text-[22px] font-bold text-[#005f56] tracking-tight whitespace-nowrap">
            PF Sahi Karo
          </span>
        </Link>

        {/* Center: Navigation Links (Desktop: >= 1024px) */}
        <nav aria-label="Main Navigation" className="hidden lg:flex items-center gap-8 text-[15px]">
          {NAV_ITEMS.map((item) => {
            return (
              <Link
                key={item.id}
                href={item.href}
                onClick={handleNavClick}
                className="transition-all whitespace-nowrap pb-1 text-slate-600 hover:text-[#005f56] font-medium"
              >
                {item.label}
              </Link>
            );
          })}
        </nav>

        {/* Right: Actions */}
        <div className="flex items-center gap-2.5 sm:gap-4 lg:gap-5 shrink-0">
          <LanguageSwitcher />

          {/* Judge Demo Button (Desktop & Tablet) */}
          <Link
            href="/dashboard"
            className="bg-[#fa9d1b] hover:bg-[#f59510] text-[#291500] px-3.5 sm:px-4 py-2 rounded-lg font-bold text-xs sm:text-sm flex items-center gap-1.5 shadow-2xs transition-all h-[38px] sm:h-[40px] whitespace-nowrap"
            title="Instant 1-Click Evaluation for Hackathon Judges"
          >
            <Zap className="w-4 h-4 text-[#291500] fill-[#291500] shrink-0" />
            <span className="hidden sm:inline">Judge Demo</span>
            <span className="sm:hidden">Demo</span>
          </Link>

          {/* Account Icon (Desktop & Tablet) */}
          <Link
            href={user ? "/dashboard" : "/login"}
            aria-label="Account"
            className="text-slate-700 hover:text-[#005f56] transition-colors p-1 hidden sm:flex items-center justify-center shrink-0"
          >
            <CircleUserRound className="w-6 h-6 text-slate-700 stroke-[1.75]" />
          </Link>

          {/* Mobile/Tablet Menu Button (< 1024px) */}
          <button
            type="button"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-expanded={isMobileMenuOpen}
            aria-label={isMobileMenuOpen ? "Close navigation menu" : "Open navigation menu"}
            className="lg:hidden text-slate-700 hover:text-[#005f56] hover:bg-slate-100/70 p-2 rounded-lg transition-colors flex items-center justify-center focus:outline-none focus:ring-2 focus:ring-[#005f56]"
          >
            {isMobileMenuOpen ? (
              <X className="w-6 h-6 text-slate-800" />
            ) : (
              <Menu className="w-6 h-6 text-slate-800" />
            )}
          </button>
        </div>
      </div>

      {/* Mobile & Tablet Interactive Navigation Drawer */}
      {isMobileMenuOpen && (
        <div
          ref={menuRef}
          className="lg:hidden border-t border-slate-200/80 bg-white shadow-xl animate-in slide-in-from-top-2 duration-200"
        >
          <div className="max-w-[1240px] mx-auto px-4 sm:px-6 py-5 space-y-4">
            {/* Primary Navigation Links */}
            <div className="space-y-1.5">
              {NAV_ITEMS.map((item) => {
                const IconComponent = item.icon;
                return (
                  <Link
                    key={item.id}
                    href={item.href}
                    onClick={handleNavClick}
                    className="flex items-center justify-between px-3.5 py-2.5 rounded-lg text-sm transition-colors font-medium text-slate-700 hover:bg-slate-50 hover:text-[#005f56] border border-transparent"
                  >
                    <div className="flex items-center gap-2.5">
                      <IconComponent className="w-4 h-4 text-slate-500" />
                      <span>{item.mobileLabel}</span>
                    </div>
                    {item.badge && (
                      <span className="text-[10px] font-bold uppercase tracking-wider bg-[#005f56] text-white px-2 py-0.5 rounded-full">
                        {item.badge}
                      </span>
                    )}
                    {item.subtext && (
                      <span className="text-[11px] text-slate-400 font-normal">{item.subtext}</span>
                    )}
                    {item.id === "rules-faq" && !item.badge && !item.subtext && (
                      <ArrowRight className="w-3.5 h-3.5 text-slate-400" />
                    )}
                  </Link>
                );
              })}
            </div>

            {/* Mobile User Actions Footer */}
            <div className="pt-3 border-t border-slate-100 flex flex-col gap-2.5">
              <Link
                href="/dashboard"
                onClick={() => setIsMobileMenuOpen(false)}
                className="w-full bg-[#fa9d1b] hover:bg-[#f59510] text-[#291500] font-bold text-sm py-2.5 px-4 rounded-lg flex items-center justify-center gap-2 shadow-2xs transition-colors"
              >
                <Zap className="w-4 h-4 text-[#291500] fill-[#291500]" />
                <span>Evaluate Demo (Suresh Kumar)</span>
              </Link>

              <Link
                href={user ? "/dashboard" : "/login"}
                onClick={() => setIsMobileMenuOpen(false)}
                className="w-full border border-slate-200 hover:bg-slate-50 text-slate-700 font-semibold text-sm py-2.5 px-4 rounded-lg flex items-center justify-center gap-2 transition-colors"
              >
                <CircleUserRound className="w-4 h-4 text-slate-600" />
                <span>{user ? `Signed in as ${user.full_name}` : "Citizen / Member Login"}</span>
              </Link>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
