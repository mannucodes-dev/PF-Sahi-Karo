"use client";

import React from "react";
import { useTranslation } from "@/lib/i18n/context";
import { Languages } from "lucide-react";
import { cn } from "@/lib/utils";

export function LanguageSwitcher({ className }: { className?: string }) {
  const { locale, setLocale } = useTranslation();

  return (
    <div
      role="region"
      aria-label="Language selection"
      className={cn(
        "inline-flex items-center gap-1 bg-slate-100 p-1 rounded-lg border border-slate-200 text-xs font-medium",
        className
      )}
    >
      <Languages className="w-3.5 h-3.5 text-zinc-500 ml-1 mr-0.5" aria-hidden="true" />
      <button
        type="button"
        onClick={() => setLocale("en")}
        aria-pressed={locale === "en"}
        className={cn(
          "px-2 py-1 rounded-md transition-all cursor-pointer",
          locale === "en"
            ? "bg-white text-teal-900 font-bold shadow-2xs border border-slate-200/80"
            : "text-zinc-600 hover:text-zinc-900"
        )}
      >
        English
      </button>
      <button
        type="button"
        onClick={() => setLocale("hi")}
        aria-pressed={locale === "hi"}
        className={cn(
          "px-2 py-1 rounded-md transition-all cursor-pointer",
          locale === "hi"
            ? "bg-white text-teal-900 font-bold shadow-2xs border border-slate-200/80"
            : "text-zinc-600 hover:text-zinc-900"
        )}
      >
        हिंदी
      </button>
    </div>
  );
}
