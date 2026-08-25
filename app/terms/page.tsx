import React from "react";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { Scale, FileText } from "lucide-react";
import { Card } from "@/components/ui/card";

export default function TermsPage() {
  return (
    <div className="min-h-screen flex flex-col bg-slate-50 text-zinc-900">
      <SiteHeader />

      <main id="main-content" className="max-w-4xl mx-auto px-4 sm:px-6 py-8 sm:py-12 flex-1 space-y-8">
        <div className="space-y-2">
          <div className="inline-flex items-center gap-1.5 text-xs font-semibold text-teal-800 bg-teal-50 border border-teal-200 px-3 py-1 rounded-full">
            <Scale className="w-3.5 h-3.5" aria-hidden="true" />
            <span>Service Terms &amp; Scope</span>
          </div>
          <h1 className="text-2xl sm:text-4xl font-bold tracking-tight text-zinc-900">
            Terms of Service
          </h1>
          <p className="text-xs sm:text-sm text-zinc-500">
            Effective Date: August 2026
          </p>
        </div>

        <Card className="border-slate-200 bg-white p-6 sm:p-8 rounded-2xl shadow-2xs space-y-6 text-xs sm:text-sm leading-relaxed text-zinc-700">
          <section className="space-y-2">
            <h2 className="text-base font-bold text-zinc-900 flex items-center gap-2">
              <FileText className="w-4 h-4 text-teal-700" aria-hidden="true" />
              1. Purpose of Service
            </h2>
            <p>
              PF Sahi Karo provides independent, informational guidance to assist Indian citizens in interpreting EPFO claim rejection remarks and preparing resubmissions. The service does not guarantee claim approval, settlement timelines, or financial outcomes.
            </p>
          </section>

          <section className="space-y-2">
            <h2 className="text-base font-bold text-zinc-900 flex items-center gap-2">
              <FileText className="w-4 h-4 text-teal-700" aria-hidden="true" />
              2. No Government Affiliation
            </h2>
            <p>
              PF Sahi Karo is an independent civic initiative. It is not an agency of the Employees&apos; Provident Fund Organisation (EPFO), Ministry of Labour and Employment, or the Government of India. Official claim submissions and administrative appeals must be executed via official government channels.
            </p>
          </section>

          <section className="space-y-2">
            <h2 className="text-base font-bold text-zinc-900 flex items-center gap-2">
              <FileText className="w-4 h-4 text-teal-700" aria-hidden="true" />
              3. Citizen Responsibility
            </h2>
            <p>
              Citizens are responsible for ensuring that all data submitted to official EPFO portals (including name spelling, bank details, and Aadhaar linkage) is accurate and authentic. Submitting forged or falsified documents to EPFO is a punishable offense under Indian law.
            </p>
          </section>

          <section className="space-y-2">
            <h2 className="text-base font-bold text-zinc-900 flex items-center gap-2">
              <FileText className="w-4 h-4 text-teal-700" aria-hidden="true" />
              4. Limitation of Liability
            </h2>
            <p>
              Under no circumstances shall PF Sahi Karo or its contributors be liable for any delayed settlements, employer disputes, or administrative rejection decisions issued by EPFO field offices.
            </p>
          </section>
        </Card>
      </main>

      <SiteFooter />
    </div>
  );
}
