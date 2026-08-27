import React from "react";
import Link from "next/link";
import { ShieldAlert, ExternalLink } from "lucide-react";
import { getServerTranslation } from "@/lib/i18n/server";

export async function SiteFooter() {
  const { t } = await getServerTranslation();

  return (
    <footer className="border-t border-slate-200 bg-white mt-auto text-xs text-zinc-600">
      {/* Official Disclaimer Banner */}
      <div className="bg-slate-50 border-b border-slate-200 py-3.5 px-4 sm:px-6">
        <div className="max-w-6xl mx-auto flex items-start gap-2.5 text-xs text-zinc-600 leading-relaxed">
          <ShieldAlert className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" aria-hidden="true" />
          <p>
            <strong>Important Government Disclaimer:</strong> {t.common.officialDisclaimer} For official portals, visit{" "}
            <a
              href="https://www.epfindia.gov.in"
              target="_blank"
              rel="noopener noreferrer"
              className="text-teal-700 underline font-semibold inline-flex items-center gap-0.5"
            >
              epfindia.gov.in <ExternalLink className="w-2.5 h-2.5" aria-hidden="true" />
            </a>{" "}
            or the grievance portal at{" "}
            <a
              href="https://epfigms.gov.in"
              target="_blank"
              rel="noopener noreferrer"
              className="text-teal-700 underline font-semibold inline-flex items-center gap-0.5"
            >
              EPFiGMS <ExternalLink className="w-2.5 h-2.5" aria-hidden="true" />
            </a>.
          </p>
        </div>
      </div>

      {/* Footer Navigation Links */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-6 sm:py-8">
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-6">
          <div className="space-y-2">
            <div className="font-bold text-zinc-900 text-xs uppercase tracking-wider">
              Citizen Tools
            </div>
            <ul className="space-y-1.5">
              <li>
                <Link href="/#instant-decoder" className="hover:text-zinc-900 transition-colors">
                  {t.nav.decoder}
                </Link>
              </li>
              <li>
                <Link href="/#tax-calculator" className="hover:text-zinc-900 transition-colors">
                  {t.nav.taxCalc}
                </Link>
              </li>
              <li>
                <Link href="/#office-directory" className="hover:text-zinc-900 transition-colors">
                  {t.nav.officeFinder}
                </Link>
              </li>
            </ul>
          </div>

          <div className="space-y-2">
            <div className="font-bold text-zinc-900 text-xs uppercase tracking-wider">
              Assistance &amp; Help
            </div>
            <ul className="space-y-1.5">
              <li>
                <Link href="/help" className="hover:text-zinc-900 transition-colors">
                  {t.nav.help}
                </Link>
              </li>
              <li>
                <Link href="/about" className="hover:text-zinc-900 transition-colors">
                  {t.nav.about}
                </Link>
              </li>
              <li>
                <Link href="/service-status" className="hover:text-zinc-900 transition-colors">
                  {t.nav.serviceStatus}
                </Link>
              </li>
            </ul>
          </div>

          <div className="space-y-2">
            <div className="font-bold text-zinc-900 text-xs uppercase tracking-wider">
              Legal &amp; Trust
            </div>
            <ul className="space-y-1.5">
              <li>
                <Link href="/privacy" className="hover:text-zinc-900 transition-colors">
                  Privacy Policy &amp; DPDP
                </Link>
              </li>
              <li>
                <Link href="/terms" className="hover:text-zinc-900 transition-colors">
                  Terms of Service
                </Link>
              </li>
              <li>
                <Link href="/accessibility" className="hover:text-zinc-900 transition-colors">
                  Accessibility Statement (WCAG 2.2 AA)
                </Link>
              </li>
            </ul>
          </div>

          <div className="space-y-2">
            <div className="font-bold text-zinc-900 text-xs uppercase tracking-wider">
              Official EPFO Helplines
            </div>
            <p className="text-[11px] text-zinc-500 leading-normal">
              EPFO Toll Free: 1800-118-005<br />
              Hours: 9:15 AM to 5:45 PM (Mon–Fri)<br />
              Helpdesk Email: employeefeedback@epfindia.gov.in
            </p>
          </div>
        </div>

        <div className="mt-8 pt-6 border-t border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-3 text-[11px] text-zinc-400">
          <p>© {new Date().getFullYear()} PF Sahi Karo — Built for citizen empowerment &amp; administrative transparency.</p>
          <p>Strictly compliant with Digital Personal Data Protection (DPDP) Act.</p>
        </div>
      </div>
    </footer>
  );
}
