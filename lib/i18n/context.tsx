"use client";

import React, { createContext, useContext, useState, useEffect } from "react";
import { Locale, translations, Translations } from "./translations";

interface LanguageContextType {
  locale: Locale;
  setLocale: (loc: Locale) => void;
  t: Translations;
}

const LanguageContext = createContext<LanguageContextType>({
  locale: "en",
  setLocale: () => {},
  t: translations.en,
});

const VALID_LOCALES: Locale[] = ["en", "hi", "mr", "ta", "te", "kn", "gu", "bn"];

export function LanguageProvider({
  children,
  initialLocale = "en",
}: {
  children: React.ReactNode;
  initialLocale?: Locale;
}) {
  const [locale, setLocaleState] = useState<Locale>(() => {
    if (typeof window !== "undefined") {
      const saved = localStorage.getItem("pf_sahi_karo_locale") as Locale | null;
      if (saved && VALID_LOCALES.includes(saved)) {
        return saved;
      }
    }
    return initialLocale;
  });

  useEffect(() => {
    if (typeof window !== "undefined") {
      document.documentElement.lang = locale;
      document.cookie = `pf_locale=${locale}; path=/; max-age=31536000; SameSite=Lax`;
    }
  }, [locale]);

  const setLocale = (newLocale: Locale) => {
    if (!VALID_LOCALES.includes(newLocale)) return;
    setLocaleState(newLocale);
    if (typeof window !== "undefined") {
      localStorage.setItem("pf_sahi_karo_locale", newLocale);
      document.cookie = `pf_locale=${newLocale}; path=/; max-age=31536000; SameSite=Lax`;
      document.documentElement.lang = newLocale;
    }
  };

  return (
    <LanguageContext.Provider
      value={{
        locale,
        setLocale,
        t: translations[locale] || translations.en,
      }}
    >
      {children}
    </LanguageContext.Provider>
  );
}

export function useTranslation() {
  return useContext(LanguageContext);
}
