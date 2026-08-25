import React from "react";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { ShieldCheck, Target, HeartHandshake, FileCheck2 } from "lucide-react";
import { Card } from "@/components/ui/card";

export default function AboutPage() {
  return (
    <div className="min-h-screen flex flex-col bg-slate-50 text-zinc-900">
      <SiteHeader />

      <main id="main-content" className="max-w-4xl mx-auto px-4 sm:px-6 py-8 sm:py-12 flex-1 space-y-8">
        <div className="space-y-2 text-center sm:text-left">
          <div className="inline-flex items-center gap-1.5 text-xs font-semibold text-teal-800 bg-teal-50 border border-teal-200 px-3 py-1 rounded-full">
            <ShieldCheck className="w-3.5 h-3.5" aria-hidden="true" />
            <span>Civic Purpose &amp; Mission</span>
          </div>
          <h1 className="text-2xl sm:text-4xl font-bold tracking-tight text-zinc-900">
            About PF Sahi Karo
          </h1>
          <p className="text-xs sm:text-sm text-zinc-600 max-w-2xl leading-relaxed">
            Empowering Indian workers with transparent, plain-language guidance to resolve EPFO provident fund rejections smoothly.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          <Card className="border-slate-200 bg-white p-6 rounded-2xl shadow-2xs space-y-3">
            <div className="w-10 h-10 rounded-xl bg-teal-100 text-teal-800 flex items-center justify-center">
              <Target className="w-5 h-5" aria-hidden="true" />
            </div>
            <h2 className="font-bold text-base text-zinc-900">Our Mission</h2>
            <p className="text-xs sm:text-sm text-zinc-600 leading-relaxed">
              Every month, thousands of Indian citizens face rejection remarks on the EPFO member portal without plain explanations or actionable guidance. Our mission is to bridge this administrative knowledge gap with clear, accessible, and verified instructions.
            </p>
          </Card>

          <Card className="border-slate-200 bg-white p-6 rounded-2xl shadow-2xs space-y-3">
            <div className="w-10 h-10 rounded-xl bg-emerald-100 text-emerald-800 flex items-center justify-center">
              <HeartHandshake className="w-5 h-5" aria-hidden="true" />
            </div>
            <h2 className="font-bold text-base text-zinc-900">Independent Citizen Service</h2>
            <p className="text-xs sm:text-sm text-zinc-600 leading-relaxed">
              PF Sahi Karo is an independent civic assistance initiative. We are not a government agency and do not charge citizens for core guidance. All claim settlement and record rectifications are carried out directly by authorized EPFO field offices.
            </p>
          </Card>
        </div>

        <Card className="border-slate-200 bg-white p-6 sm:p-8 rounded-2xl shadow-2xs space-y-4">
          <h2 className="font-bold text-lg text-zinc-900 flex items-center gap-2">
            <FileCheck2 className="w-5 h-5 text-teal-700" aria-hidden="true" />
            Content Governance &amp; Verification Principles
          </h2>
          <div className="space-y-3 text-xs sm:text-sm text-zinc-700 leading-relaxed">
            <p>
              Every rejection code and resolution guide on PF Sahi Karo is curated against official published circulars issued by the Employees&apos; Provident Fund Organisation (EPFO), Ministry of Labour and Employment, Government of India.
            </p>
            <p>
              We periodically review our guidance against updated circulars (e.g. Joint Declaration Standard Operating Procedures 2023, Aadhaar linkage mandates, and Bank Account KYC penny-drop guidelines).
            </p>
          </div>
        </Card>
      </main>

      <SiteFooter />
    </div>
  );
}
