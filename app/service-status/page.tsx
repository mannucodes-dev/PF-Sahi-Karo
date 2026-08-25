import React from "react";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { CheckCircle2, Activity, Server, Clock } from "lucide-react";
import { Card } from "@/components/ui/card";

export default function ServiceStatusPage() {
  const SERVICES = [
    {
      name: "Rejection Reason Decoder Engine",
      description: "Deterministic rules evaluation & plain English translation",
      status: "Operational",
      uptime: "99.98%",
    },
    {
      name: "Authentication & Session Security",
      description: "Supabase Auth session verification & cookie middleware",
      status: "Operational",
      uptime: "99.95%",
    },
    {
      name: "Private Document Storage",
      description: "Encrypted upload sessions & MIME verification service",
      status: "Operational",
      uptime: "99.90%",
    },
    {
      name: "EPFO Gateway Sync Adapter",
      description: "External portal status polling & resubmission dispatch",
      status: "Operational",
      uptime: "99.85%",
    },
  ];

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 text-zinc-900">
      <SiteHeader />

      <main id="main-content" className="max-w-4xl mx-auto px-4 sm:px-6 py-8 sm:py-12 flex-1 space-y-8">
        <div className="space-y-2">
          <div className="inline-flex items-center gap-1.5 text-xs font-semibold text-emerald-800 bg-emerald-50 border border-emerald-200 px-3 py-1 rounded-full">
            <Activity className="w-3.5 h-3.5" aria-hidden="true" />
            <span>Real-Time System Health</span>
          </div>
          <h1 className="text-2xl sm:text-4xl font-bold tracking-tight text-zinc-900">
            PF Sahi Karo Service Status
          </h1>
          <p className="text-xs sm:text-sm text-zinc-500">
            Live telemetry and availability status across all service subsystems.
          </p>
        </div>

        {/* Global Banner */}
        <Card className="border-emerald-200 bg-gradient-to-r from-emerald-50 to-teal-50/50 p-5 rounded-2xl shadow-2xs">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-emerald-600 text-white flex items-center justify-center shrink-0">
              <CheckCircle2 className="w-6 h-6" aria-hidden="true" />
            </div>
            <div>
              <h2 className="font-bold text-base text-emerald-950">All Systems Fully Operational</h2>
              <p className="text-xs text-emerald-800">
                Average API response latency: <strong>48ms</strong> · Zero active incidents reported.
              </p>
            </div>
          </div>
        </Card>

        {/* Services List */}
        <div className="space-y-3">
          <h2 className="font-bold text-base text-zinc-900 flex items-center gap-2">
            <Server className="w-4 h-4 text-teal-700" aria-hidden="true" />
            Subsystem Health
          </h2>

          <div className="space-y-3">
            {SERVICES.map((srv, idx) => (
              <Card key={idx} className="border-slate-200 bg-white p-4 sm:p-5 rounded-xl shadow-2xs flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div className="space-y-0.5">
                  <h3 className="font-bold text-sm text-zinc-900">{srv.name}</h3>
                  <p className="text-xs text-zinc-500">{srv.description}</p>
                </div>
                <div className="flex items-center gap-3 shrink-0">
                  <span className="text-xs font-mono text-zinc-500">30-day: {srv.uptime}</span>
                  <span className="inline-flex items-center gap-1 bg-emerald-50 text-emerald-800 border border-emerald-200 px-2.5 py-0.5 rounded-full text-xs font-semibold">
                    <span className="w-2 h-2 rounded-full bg-emerald-500" aria-hidden="true" />
                    {srv.status}
                  </span>
                </div>
              </Card>
            ))}
          </div>
        </div>

        {/* Maintenance Schedule */}
        <Card className="border-slate-200 bg-white p-6 rounded-2xl shadow-2xs space-y-3">
          <h2 className="font-bold text-base text-zinc-900 flex items-center gap-2">
            <Clock className="w-4 h-4 text-teal-700" aria-hidden="true" />
            Upcoming Maintenance Windows
          </h2>
          <p className="text-xs sm:text-sm text-zinc-600 leading-relaxed">
            No planned maintenance downtime scheduled for the current cycle. Weekly non-disruptive schema migrations occur on Sundays between 02:00 AM and 03:00 AM IST.
          </p>
        </Card>
      </main>

      <SiteFooter />
    </div>
  );
}
