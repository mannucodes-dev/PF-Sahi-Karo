import { cookies } from "next/headers";
import { Locale, translations, Translations } from "./translations";

export async function getServerLocale(): Promise<Locale> {
  const cookieStore = await cookies();
  const rawLocale = cookieStore.get("pf_locale")?.value;
  if (
    rawLocale === "en" ||
    rawLocale === "hi" ||
    rawLocale === "mr" ||
    rawLocale === "ta" ||
    rawLocale === "te" ||
    rawLocale === "kn" ||
    rawLocale === "gu" ||
    rawLocale === "bn"
  ) {
    return rawLocale;
  }
  return "en";
}

export async function getServerTranslation(): Promise<{ locale: Locale; t: Translations }> {
  const locale = await getServerLocale();
  return {
    locale,
    t: translations[locale] || translations.en,
  };
}
