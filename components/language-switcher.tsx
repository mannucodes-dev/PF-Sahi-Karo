"use client";

import React, { useState, useRef, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useTranslation } from "@/lib/i18n/context";
import { SUPPORTED_LOCALES, Locale } from "@/lib/i18n/translations";
import { Globe, Languages, ChevronDown, Check } from "lucide-react";
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
        className="flex items-center gap-1.5 text-slate-700 hover:text-[#005f56] text-sm font-semibold cursor-pointer py-1 px-1 transition-colors"
        title="Select Language / भाषा चुनें"
      >
        <Globe className="w-4 h-4 text-slate-700 shrink-0 stroke-[1.75]" />
        <span className="font-semibold uppercase text-xs sm:text-sm">{locale.toUpperCase()}</span>
        <ChevronDown
          className={cn(
            "w-3.5 h-3.5 text-slate-600 transition-transform",
            isOpen && "rotate-180"
          )}
        />
      </button>

      {isOpen && (
        <div
          role="listbox"
          aria-label="Select Language"
          className="absolute right-0 mt-2 w-48 bg-white rounded-xl shadow-xl border border-slate-200/80 z-50 py-1.5 animate-in fade-in zoom-in-95 duration-100"
        >
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
                  "block w-full text-left px-4 py-2 text-xs sm:text-sm text-slate-700 hover:bg-teal-50 hover:text-[#005f56] transition-colors cursor-pointer",
                  isSelected && "text-[#005f56] font-bold bg-teal-50/70"
                )}
              >
                {option.nativeLabel} ({option.label})
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
}
