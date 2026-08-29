import React from "react";
import Link from "next/link";
import { getServerTranslation } from "@/lib/i18n/server";

export async function SiteFooter() {
  const { locale, t } = await getServerTranslation();

  return (
    <footer className="bg-[#dfe3e6] w-full border-t border-slate-300/40 py-5 px-6 sm:px-12 mt-16">
      <div className="max-w-[1240px] mx-auto flex flex-col sm:flex-row justify-between items-center gap-4 text-xs font-semibold text-slate-700">
        <p className="font-normal text-slate-600 text-center sm:text-left">
          © 2026 {t.common.brandName}. {locale === "en" ? "An Independent Citizen Civic Tech Initiative." : "एक स्वतंत्र नागरिक सहायता सेवा।"}
        </p>

        <nav aria-label="Footer Links" className="flex flex-wrap items-center justify-center gap-6 text-slate-700">
          <Link
            href="/accessibility"
            className="hover:text-[#005f56] transition-colors"
          >
            {locale === "en" ? "Government Disclaimer" : "सरकारी अस्वीकरण"}
          </Link>
          <Link
            href="/privacy"
            className="hover:text-[#005f56] transition-colors"
          >
            {locale === "en" ? "Privacy Policy" : "गोपनीयता नीति"}
          </Link>
          <Link
            href="/terms"
            className="hover:text-[#005f56] transition-colors"
          >
            {locale === "en" ? "Terms of Service" : "सेवा की शर्तें"}
          </Link>
          <Link
            href="/help"
            className="hover:text-[#005f56] transition-colors"
          >
            {t.nav.help}
          </Link>
        </nav>
      </div>
    </footer>
  );
}
