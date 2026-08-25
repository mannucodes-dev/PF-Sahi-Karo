import React from "react";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { ContactForm } from "@/components/contact-form";
import { Card } from "@/components/ui/card";
import { LifeBuoy, Phone, Mail, ExternalLink } from "lucide-react";

export default function ContactPage() {
  return (
    <div className="min-h-screen flex flex-col bg-slate-50 text-zinc-900">
      <SiteHeader />

      <main id="main-content" className="max-w-4xl mx-auto px-4 sm:px-6 py-8 sm:py-12 flex-1 space-y-8">
        <div className="space-y-2">
          <div className="inline-flex items-center gap-1.5 text-xs font-semibold text-teal-800 bg-teal-50 border border-teal-200 px-3 py-1 rounded-full">
            <LifeBuoy className="w-3.5 h-3.5" aria-hidden="true" />
            <span>Citizen Assistance &amp; Feedback</span>
          </div>
          <h1 className="text-2xl sm:text-4xl font-bold tracking-tight text-zinc-900">
            Contact Support &amp; Grievance Assistance
          </h1>
          <p className="text-xs sm:text-sm text-zinc-600 max-w-2xl leading-relaxed">
            Need specialized help understanding a rejection reason or reporting an accessibility barrier? Submit an inquiry below.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Form */}
          <div className="md:col-span-2">
            <ContactForm />
          </div>

          {/* Official Helplines Sidebar */}
          <div className="space-y-4">
            <Card className="border-slate-200 bg-white p-5 rounded-2xl shadow-2xs space-y-3">
              <h2 className="font-bold text-sm text-zinc-900 flex items-center gap-1.5">
                <Phone className="w-4 h-4 text-teal-700" aria-hidden="true" />
                Official EPFO Toll-Free
              </h2>
              <p className="text-xs text-zinc-600 leading-relaxed">
                National Toll-Free: <strong>1800-118-005</strong><br />
                Available 09:15 AM to 05:45 PM on all working days.
              </p>
            </Card>

            <Card className="border-slate-200 bg-white p-5 rounded-2xl shadow-2xs space-y-3">
              <h2 className="font-bold text-sm text-zinc-900 flex items-center gap-1.5">
                <Mail className="w-4 h-4 text-teal-700" aria-hidden="true" />
                Official EPFO Grievance
              </h2>
              <p className="text-xs text-zinc-600 leading-relaxed">
                Lodge formal administrative grievances on the official portal:
              </p>
              <a
                href="https://epfigms.gov.in"
                target="_blank"
                rel="noopener noreferrer"
                className="text-xs font-semibold text-teal-700 hover:text-teal-900 underline inline-flex items-center gap-1"
              >
                Open EPFiGMS Portal <ExternalLink className="w-3 h-3" aria-hidden="true" />
              </a>
            </Card>
          </div>
        </div>
      </main>

      <SiteFooter />
    </div>
  );
}
