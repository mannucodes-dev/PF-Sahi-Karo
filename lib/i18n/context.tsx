"use client";

import React, { createContext, useContext, useState } from "react";
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
      if (saved === "en" || saved === "hi") {
        return saved;
      }
    }
    return initialLocale;
  });

  const setLocale = (newLocale: Locale) => {
    setLocaleState(newLocale);
    if (typeof window !== "undefined") {
      localStorage.setItem("pf_sahi_karo_locale", newLocale);
      document.documentElement.lang = newLocale;
    }
  };

  return (
    <LanguageContext.Provider
      value={{
        locale,
        setLocale,
        t: translations[locale],
      }}
    >
      {children}
    </LanguageContext.Provider>
  );
}

export function useTranslation() {
  return useContext(LanguageContext);
}
