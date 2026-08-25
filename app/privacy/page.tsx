import React from "react";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { ShieldCheck, Lock, EyeOff, Trash2 } from "lucide-react";
import { Card } from "@/components/ui/card";

export default function PrivacyPage() {
  return (
    <div className="min-h-screen flex flex-col bg-slate-50 text-zinc-900">
      <SiteHeader />

      <main id="main-content" className="max-w-4xl mx-auto px-4 sm:px-6 py-8 sm:py-12 flex-1 space-y-8">
        <div className="space-y-2">
          <div className="inline-flex items-center gap-1.5 text-xs font-semibold text-teal-800 bg-teal-50 border border-teal-200 px-3 py-1 rounded-full">
            <Lock className="w-3.5 h-3.5" aria-hidden="true" />
            <span>DPDP Act Compliance &amp; Data Protection</span>
          </div>
          <h1 className="text-2xl sm:text-4xl font-bold tracking-tight text-zinc-900">
            Privacy Policy &amp; Citizen Data Protection
          </h1>
          <p className="text-xs sm:text-sm text-zinc-500">
            Last Updated: August 2026 · Compliant with Digital Personal Data Protection Act, 2023
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <Card className="border-slate-200 bg-white p-5 rounded-xl shadow-2xs space-y-2">
            <EyeOff className="w-6 h-6 text-teal-700" aria-hidden="true" />
            <h2 className="font-bold text-sm text-zinc-900">No Full Aadhaar Stored</h2>
            <p className="text-xs text-zinc-600 leading-relaxed">
              We never store or log 12-digit Aadhaar numbers. All identifiers are masked to the last 4 digits by default.
            </p>
          </Card>

          <Card className="border-slate-200 bg-white p-5 rounded-xl shadow-2xs space-y-2">
            <ShieldCheck className="w-6 h-6 text-emerald-700" aria-hidden="true" />
            <h2 className="font-bold text-sm text-zinc-900">Encrypted in Transit &amp; Rest</h2>
            <p className="text-xs text-zinc-600 leading-relaxed">
              All communications use TLS 1.3 encryption. Uploaded documents are stored in private, access-controlled buckets.
            </p>
          </Card>

          <Card className="border-slate-200 bg-white p-5 rounded-xl shadow-2xs space-y-2">
            <Trash2 className="w-6 h-6 text-rose-700" aria-hidden="true" />
            <h2 className="font-bold text-sm text-zinc-900">30-Day Auto Retention</h2>
            <p className="text-xs text-zinc-600 leading-relaxed">
              Uploaded rectification drafts and temporary document checksums are automatically expunged after 30 days.
            </p>
          </Card>
        </div>

        <Card className="border-slate-200 bg-white p-6 sm:p-8 rounded-2xl shadow-2xs space-y-6 text-xs sm:text-sm leading-relaxed text-zinc-700">
          <section className="space-y-2">
            <h2 className="text-base font-bold text-zinc-900">1. Information We Collect</h2>
            <p>
              When using PF Sahi Karo, we collect minimal operational information strictly required to decode rejection remarks and generate resubmission checklists:
            </p>
            <ul className="list-disc list-inside space-y-1">
              <li>Masked Universal Account Number (e.g. ••••••••7890).</li>
              <li>Rejection remark codes recorded on your EPFO member portal.</li>
              <li>Optional supporting documents (Aadhaar correction receipt or Joint Declaration copy) uploaded for private checklist verification.</li>
            </ul>
          </section>

          <section className="space-y-2">
            <h2 className="text-base font-bold text-zinc-900">2. What We Never Do</h2>
            <ul className="list-disc list-inside space-y-1">
              <li>We never sell, broker, or monetize citizen information.</li>
              <li>We never include third-party advertising or commercial tracking cookies.</li>
              <li>We never log raw citizen passwords, banking PINs, or biometric tokens.</li>
            </ul>
          </section>

          <section className="space-y-2">
            <h2 className="text-base font-bold text-zinc-900">3. Citizen Rights (Correction &amp; Erasure)</h2>
            <p>
              Under the DPDP Act, you possess the full right to review, update, or permanently delete your profile and uploaded documents. To request immediate purge of your records, contact our Data Privacy Officer via <a href="/contact" className="text-teal-700 font-semibold underline">Contact Support</a>.
            </p>
          </section>
        </Card>
      </main>

      <SiteFooter />
    </div>
  );
}
