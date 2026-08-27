"use client";

import React, { useState, useRef, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useTranslation } from "@/lib/i18n/context";
import { SUPPORTED_LOCALES, Locale } from "@/lib/i18n/translations";
import { Languages, ChevronDown, Check } from "lucide-react";
import { cn } from "@/lib/utils";

export function LanguageSwitcher({ className }: { className?: string }) {
  const { locale, setLocale } = useTranslation();
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const currentOption = SUPPORTED_LOCALES.find((l) => l.code === locale) || SUPPORTED_LOCALES[0];

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleSelectLocale = (newLocale: Locale) => {
    setLocale(newLocale);
    setIsOpen(false);
    // Smoothly refresh server components with the new pf_locale cookie
    router.refresh();
  };

  return (
    <div className={cn("relative inline-block text-left", className)} ref={dropdownRef}>
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        aria-expanded={isOpen}
        aria-haspopup="listbox"
        className="inline-flex items-center gap-1.5 bg-white hover:bg-slate-50 border border-slate-200/90 hover:border-slate-300 text-zinc-800 text-xs sm:text-sm font-semibold px-2.5 sm:px-3 py-1.5 rounded-lg shadow-2xs transition-colors focus:outline-none focus:ring-2 focus:ring-teal-600 cursor-pointer"
        title="Select Language / भाषा चुनें"
      >
        <Languages className="w-4 h-4 text-teal-700 shrink-0" aria-hidden="true" />
        <span className="font-bold text-zinc-900">{currentOption.nativeLabel}</span>
        <ChevronDown className={cn("w-3.5 h-3.5 text-zinc-400 transition-transform", isOpen && "rotate-180")} aria-hidden="true" />
      </button>

      {isOpen && (
        <div
          role="listbox"
          aria-label="Select Language"
          className="absolute right-0 mt-1.5 w-60 bg-white border border-slate-200 rounded-xl shadow-lg shadow-slate-900/10 py-1.5 z-50 focus:outline-none animate-in fade-in zoom-in-95 duration-100"
        >
          <div className="px-3 py-1.5 border-b border-slate-100 text-[11px] font-semibold uppercase tracking-wider text-zinc-500">
            Select Language / भाषा चुनें
          </div>
          <div className="max-h-72 overflow-y-auto py-1">
            {SUPPORTED_LOCALES.map((option) => {
              const isSelected = option.code === locale;
              return (
                <button
                  key={option.code}
                  role="option"
                  aria-selected={isSelected}
                  type="button"
                  onClick={() => handleSelectLocale(option.code)}
                  className={cn(
                    "w-full text-left px-3 py-2 text-xs sm:text-sm flex items-center justify-between hover:bg-teal-50/70 transition-colors cursor-pointer",
                    isSelected ? "bg-teal-50/90 text-teal-950 font-bold" : "text-zinc-700"
                  )}
                >
                  <div>
                    <span className="font-bold block text-zinc-900">{option.nativeLabel}</span>
                    <span className="text-[10px] text-zinc-400 block font-normal">{option.label} • {option.region}</span>
                  </div>
                  {isSelected && <Check className="w-4 h-4 text-teal-700 shrink-0" aria-hidden="true" />}
                </button>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}
