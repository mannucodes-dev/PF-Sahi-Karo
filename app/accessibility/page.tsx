import React from "react";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { CheckCircle2, Accessibility, Keyboard, Eye, MessageSquare } from "lucide-react";
import { Card } from "@/components/ui/card";

export default function AccessibilityPage() {
  return (
    <div className="min-h-screen flex flex-col bg-slate-50 text-zinc-900">
      <SiteHeader />

      <main id="main-content" className="max-w-4xl mx-auto px-4 sm:px-6 py-8 sm:py-12 flex-1 space-y-8">
        <div className="space-y-2">
          <div className="inline-flex items-center gap-1.5 text-xs font-semibold text-teal-800 bg-teal-50 border border-teal-200 px-3 py-1 rounded-full">
            <Accessibility className="w-3.5 h-3.5" aria-hidden="true" />
            <span>Inclusive Design Commitment</span>
          </div>
          <h1 className="text-2xl sm:text-4xl font-bold tracking-tight text-zinc-900">
            Accessibility Statement (WCAG 2.2 AA)
          </h1>
          <p className="text-xs sm:text-sm text-zinc-500">
            Target Standard: Web Content Accessibility Guidelines (WCAG) 2.2 Level AA
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <Card className="border-slate-200 bg-white p-5 rounded-xl shadow-2xs space-y-2">
            <Keyboard className="w-6 h-6 text-teal-700" aria-hidden="true" />
            <h2 className="font-bold text-sm text-zinc-900">100% Keyboard Operable</h2>
            <p className="text-xs text-zinc-600 leading-relaxed">
              Every interactive element, modal, and form can be navigated using Tab, Shift+Tab, Enter, Space, and Escape.
            </p>
          </Card>

          <Card className="border-slate-200 bg-white p-5 rounded-xl shadow-2xs space-y-2">
            <Eye className="w-6 h-6 text-teal-700" aria-hidden="true" />
            <h2 className="font-bold text-sm text-zinc-900">High Contrast &amp; Non-Color Reliance</h2>
            <p className="text-xs text-zinc-600 leading-relaxed">
              Text satisfies at least 4.5:1 contrast ratio. Status badges pair color with text and distinct SVG icons.
            </p>
          </Card>

          <Card className="border-slate-200 bg-white p-5 rounded-xl shadow-2xs space-y-2">
            <MessageSquare className="w-6 h-6 text-teal-700" aria-hidden="true" />
            <h2 className="font-bold text-sm text-zinc-900">Screen Reader Optimized</h2>
            <p className="text-xs text-zinc-600 leading-relaxed">
              Tested with VoiceOver and NVDA. Landmarks, live regions, and descriptive ARIA labels communicate status changes.
            </p>
          </Card>
        </div>

        <Card className="border-slate-200 bg-white p-6 sm:p-8 rounded-2xl shadow-2xs space-y-6 text-xs sm:text-sm leading-relaxed text-zinc-700">
          <section className="space-y-3">
            <h2 className="text-base font-bold text-zinc-900">Accessibility Features Implemented</h2>
            <ul className="space-y-2 list-none">
              <li className="flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" aria-hidden="true" />
                <span><strong>Skip-to-Content:</strong> A bypass link enables keyboard users to skip top navigation directly to main content.</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" aria-hidden="true" />
                <span><strong>Accessible Dialogs:</strong> Modals trap focus, restore focus upon dismissal, and support the Escape key.</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" aria-hidden="true" />
                <span><strong>Bilingual Language Attributes:</strong> HTML documents dynamically set <code className="bg-slate-100 px-1 py-0.5 rounded font-mono">lang=&quot;en&quot;</code> or <code className="bg-slate-100 px-1 py-0.5 rounded font-mono">lang=&quot;hi&quot;</code> to guide text-to-speech synthesizers.</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" aria-hidden="true" />
                <span><strong>Touch Target Size:</strong> Interactive targets maintain a minimum dimension of 44×44 CSS pixels.</span>
              </li>
            </ul>
          </section>

          <section className="space-y-2 border-t border-slate-100 pt-4">
            <h2 className="text-base font-bold text-zinc-900">Accessibility Feedback &amp; Support</h2>
            <p>
              If you experience any accessibility barrier while using PF Sahi Karo, please let us know via our <a href="/contact" className="text-teal-700 font-semibold underline">Accessibility Feedback Channel</a>. We prioritize accessibility fixes within 48 hours.
            </p>
          </section>
        </Card>
      </main>

      <SiteFooter />
    </div>
  );
}
