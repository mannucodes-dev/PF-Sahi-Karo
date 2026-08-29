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

const VALID_LOCALES: Locale[] = [
  "en",
  "hi",
  "mr",
  "ta",
  "te",
  "kn",
  "gu",
  "bn",
];

function isValidLocale(value: string | null): value is Locale {
  return Boolean(value && VALID_LOCALES.includes(value as Locale));
}

export function LanguageProvider({
  children,
  initialLocale = "en",
}: {
  children: React.ReactNode;
  initialLocale?: Locale;
}) {
  const [locale, setLocaleState] = useState<Locale>(initialLocale);

  useEffect(() => {
    const saved = window.localStorage.getItem("pf_locale");
    const nextLocale = isValidLocale(saved) ? saved : initialLocale;

    if (nextLocale !== initialLocale) {
      setLocaleState(nextLocale);
    }

    document.documentElement.lang = nextLocale;
    document.cookie = `pf_locale=${nextLocale}; path=/; max-age=31536000; SameSite=Lax`;
  }, [initialLocale]);

  useEffect(() => {
    document.documentElement.lang = locale;
    document.cookie = `pf_locale=${locale}; path=/; max-age=31536000; SameSite=Lax`;
    window.localStorage.setItem("pf_locale", locale);
  }, [locale]);

  const setLocale = (newLocale: Locale) => {
    if (!VALID_LOCALES.includes(newLocale)) return;
    setLocaleState(newLocale);
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
