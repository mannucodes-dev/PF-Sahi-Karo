"use client";

import React, { useState, useRef, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useTranslation } from "@/lib/i18n/context";
import { SUPPORTED_LOCALES, Locale } from "@/lib/i18n/translations";
import { Globe, ChevronDown, Check } from "lucide-react";
import { cn } from "@/lib/utils";

interface LanguageSwitcherProps {
  className?: string;
  direction?: "up" | "down" | "auto";
  align?: "left" | "right" | "auto";
}

export function LanguageSwitcher({
  className,
  direction = "auto",
  align = "auto",
}: LanguageSwitcherProps) {
  const { locale, setLocale } = useTranslation();
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);
  const [openUpwards, setOpenUpwards] = useState(false);
  const [alignLeft, setAlignLeft] = useState(false);
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

  const handleToggle = () => {
    if (!isOpen && dropdownRef.current) {
      const rect = dropdownRef.current.getBoundingClientRect();
      const spaceBelow = window.innerHeight - rect.bottom;
      const spaceLeft = rect.left;

      if (direction === "up") {
        setOpenUpwards(true);
      } else if (direction === "down") {
        setOpenUpwards(false);
      } else {
        // Auto: if less than 280px below, open upwards
        setOpenUpwards(spaceBelow < 280);
      }

      if (align === "left") {
        setAlignLeft(true);
      } else if (align === "right") {
        setAlignLeft(false);
      } else {
        // Auto: if near left edge, align to left so menu expands rightward
        setAlignLeft(spaceLeft < 220);
      }
    }
    setIsOpen(!isOpen);
  };

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
        onClick={handleToggle}
        aria-expanded={isOpen}
        aria-haspopup="listbox"
        className="flex items-center gap-1.5 text-slate-700 hover:text-[#005f56] text-sm font-semibold cursor-pointer py-1.5 px-2 rounded-lg hover:bg-slate-100/70 transition-colors"
        title="Select Language / भाषा चुनें"
      >
        <Globe className="w-4 h-4 text-slate-700 shrink-0 stroke-[1.75]" />
        <span className="font-semibold uppercase text-xs sm:text-sm">{locale.toUpperCase()}</span>
        <ChevronDown
          className={cn(
            "w-3.5 h-3.5 text-slate-600 transition-transform duration-200",
            isOpen && "rotate-180"
          )}
        />
      </button>

      {isOpen && (
        <div
          role="listbox"
          aria-label="Select Language"
          className={cn(
            "absolute w-56 bg-white rounded-xl shadow-2xl border border-slate-200/90 z-[9999] py-1.5 animate-in fade-in zoom-in-95 duration-100 max-h-80 overflow-y-auto",
            openUpwards ? "bottom-full mb-2" : "top-full mt-2",
            alignLeft ? "left-0" : "right-0"
          )}
        >
          <div className="px-3 py-1.5 border-b border-slate-100 text-[11px] font-bold text-slate-400 uppercase tracking-wider">
            Select Language / भाषा
          </div>
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
                  "w-full text-left px-3.5 py-2 text-xs sm:text-sm text-slate-700 hover:bg-teal-50 hover:text-[#005f56] transition-colors cursor-pointer flex items-center justify-between gap-2",
                  isSelected && "text-[#005f56] font-bold bg-teal-50/80"
                )}
              >
                <div className="flex flex-col">
                  <span className="font-medium text-slate-900">{option.nativeLabel}</span>
                  <span className="text-[11px] text-slate-500">{option.label}</span>
                </div>
                {isSelected && <Check className="w-4 h-4 text-[#005f56] shrink-0" />}
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
}
