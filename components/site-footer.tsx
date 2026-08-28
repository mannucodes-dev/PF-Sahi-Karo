import React from "react";
import Link from "next/link";

export async function SiteFooter() {
  return (
    <footer className="bg-[#dfe3e6] w-full border-t border-slate-300/40 py-5 px-6 sm:px-12 mt-16">
      <div className="max-w-[1240px] mx-auto flex flex-col sm:flex-row justify-between items-center gap-4 text-xs font-semibold text-slate-700">
        <p className="font-normal text-slate-600 text-center sm:text-left">
          © 2024 PF Sahi Karo. An Independent Civic Tech Initiative.
        </p>

        <nav aria-label="Footer Links" className="flex flex-wrap items-center justify-center gap-6 text-slate-700">
          <Link
            href="/accessibility"
            className="hover:text-[#005f56] transition-colors"
          >
            Government Disclaimer
          </Link>
          <Link
            href="/privacy"
            className="hover:text-[#005f56] transition-colors"
          >
            Privacy Policy
          </Link>
          <Link
            href="/terms"
            className="hover:text-[#005f56] transition-colors"
          >
            Terms of Service
          </Link>
          <Link
            href="/help"
            className="hover:text-[#005f56] transition-colors"
          >
            API Documentation
          </Link>
        </nav>
      </div>
    </footer>
  );
}
