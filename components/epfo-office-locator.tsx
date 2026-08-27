"use client";

import React, { useState } from "react";
import { useTranslation } from "@/lib/i18n/context";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  MapPin,
  Search,
  Mail,
  Phone,
  Building2,
  ExternalLink,
  Clock,
  ShieldAlert,
  Copy,
  Check,
} from "lucide-react";

interface EpfoOffice {
  id: string;
  name: string;
  city: string;
  state: string;
  address: string;
  pincode: string;
  proEmail: string;
  helpline: string;
  workingHours: string;
}

const REGIONAL_OFFICES: EpfoOffice[] = [
  {
    id: "ro-blr-1",
    name: "Regional Office, Bengaluru Central (Karnataka)",
    city: "Bengaluru",
    state: "Karnataka",
    address: "Bhavishya Nidhi Bhavan, No. 13, Raja Ram Mohan Roy Road, PB No. 25146",
    pincode: "560025",
    proEmail: "ro.bangalore@epfindia.gov.in",
    helpline: "080-22271881",
    workingHours: "Mon–Fri, 9:30 AM – 6:00 PM",
  },
  {
    id: "ro-del-1",
    name: "Regional Office, Delhi Central (Wazirpur)",
    city: "Delhi",
    state: "Delhi NCR",
    address: "Plot No. 23, Community Centre, Wazirpur Industrial Area",
    pincode: "110052",
    proEmail: "ro.delhi.central@epfindia.gov.in",
    helpline: "011-27371190",
    workingHours: "Mon–Fri, 9:30 AM – 6:00 PM",
  },
  {
    id: "ro-bom-1",
    name: "Regional Office, Bandra (Mumbai - I)",
    city: "Mumbai",
    state: "Maharashtra",
    address: "Bhavishya Nidhi Bhavan, 341, Bandra East, Mumbai",
    pincode: "400051",
    proEmail: "ro.bandra@epfindia.gov.in",
    helpline: "022-26470712",
    workingHours: "Mon–Fri, 9:30 AM – 6:00 PM",
  },
  {
    id: "ro-hyd-1",
    name: "Regional Office, Hyderabad (Madhapur & Hitec City)",
    city: "Hyderabad",
    state: "Telangana",
    address: "Bhavishya Nidhi Bhavan, No. 3-4-763, Barkatpura, Hyderabad",
    pincode: "500027",
    proEmail: "ro.hyderabad1@epfindia.gov.in",
    helpline: "040-27563140",
    workingHours: "Mon–Fri, 9:30 AM – 6:00 PM",
  },
  {
    id: "ro-chn-1",
    name: "Regional Office, Chennai (Royapettah)",
    city: "Chennai",
    state: "Tamil Nadu",
    address: "Bhavishya Nidhi Bhavan, 37, Royapettah High Road",
    pincode: "600014",
    proEmail: "ro.chennai@epfindia.gov.in",
    helpline: "044-28139200",
    workingHours: "Mon–Fri, 9:30 AM – 6:00 PM",
  },
  {
    id: "ro-pun-1",
    name: "Regional Office, Pune (Cantonment)",
    city: "Pune",
    state: "Maharashtra",
    address: "Cantonment Board Building, Golibar Maidan, Pune",
    pincode: "411001",
    proEmail: "ro.pune@epfindia.gov.in",
    helpline: "020-26449195",
    workingHours: "Mon–Fri, 9:30 AM – 6:00 PM",
  },
  {
    id: "ro-ahm-1",
    name: "Regional Office, Ahmedabad",
    city: "Ahmedabad",
    state: "Gujarat",
    address: "Bhavishya Nidhi Bhavan, Near Income Tax Circle, Ashram Road",
    pincode: "380014",
    proEmail: "ro.ahmedabad@epfindia.gov.in",
    helpline: "079-27544061",
    workingHours: "Mon–Fri, 9:30 AM – 6:00 PM",
  },
  {
    id: "ro-kol-1",
    name: "Regional Office, Kolkata",
    city: "Kolkata",
    state: "West Bengal",
    address: "DK Block, Sector-II, Salt Lake City, Kolkata",
    pincode: "700091",
    proEmail: "ro.kolkata@epfindia.gov.in",
    helpline: "033-23594001",
    workingHours: "Mon–Fri, 9:30 AM – 6:00 PM",
  },
];

export function EpfoOfficeLocator() {
  const { t } = useTranslation();

  const [searchQuery, setSearchQuery] = useState("");
  const [selectedState, setSelectedState] = useState("all");
  const [copiedEmail, setCopiedEmail] = useState<string | null>(null);

  const states = Array.from(new Set(REGIONAL_OFFICES.map((o) => o.state)));

  const filteredOffices = REGIONAL_OFFICES.filter((office) => {
    const matchesSearch =
      office.city.toLowerCase().includes(searchQuery.toLowerCase()) ||
      office.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      office.pincode.includes(searchQuery);
    const matchesState = selectedState === "all" || office.state === selectedState;
    return matchesSearch && matchesState;
  });

  const handleCopyEmail = (email: string) => {
    if (typeof navigator !== "undefined" && navigator.clipboard) {
      navigator.clipboard.writeText(email);
      setCopiedEmail(email);
      setTimeout(() => setCopiedEmail(null), 2500);
    }
  };

  return (
    <section id="office-directory" className="scroll-mt-20">
      <Card className="border-slate-200 bg-white shadow-md rounded-2xl overflow-hidden">
        <CardHeader className="bg-gradient-to-r from-teal-950 via-slate-900 to-slate-950 text-white p-6 sm:p-8 space-y-2">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-teal-800/80 border border-teal-700 text-teal-200 text-xs font-semibold w-fit">
            <MapPin className="w-3.5 h-3.5 text-teal-300" aria-hidden="true" />
            <span>{t.offices.badge}</span>
          </div>
          <CardTitle className="text-2xl sm:text-3xl font-extrabold tracking-tight text-white">
            {t.offices.title}
          </CardTitle>
          <p className="text-sm sm:text-base text-slate-300 max-w-2xl leading-relaxed">
            {t.offices.subtitle}
          </p>
        </CardHeader>

        <CardContent className="p-6 sm:p-8 space-y-6">
          {/* Search & State Filter Controls */}
          <div className="flex flex-col sm:flex-row gap-3">
            <div className="relative flex-1">
              <Search className="w-4 h-4 text-zinc-400 absolute left-3.5 top-3.5" aria-hidden="true" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder={t.offices.searchPlaceholder}
                className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-300 rounded-xl text-sm font-medium text-zinc-900 focus:outline-none focus:ring-2 focus:ring-teal-600 focus:bg-white shadow-2xs"
              />
            </div>

            <select
              value={selectedState}
              onChange={(e) => setSelectedState(e.target.value)}
              className="bg-slate-50 border border-slate-300 text-zinc-900 text-sm font-medium rounded-xl px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-teal-600 focus:bg-white shadow-2xs"
            >
              <option value="all">{t.offices.allStates}</option>
              {states.map((s) => (
                <option key={s} value={s}>
                  {s}
                </option>
              ))}
            </select>
          </div>

          {/* Directory Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {filteredOffices.length > 0 ? (
              filteredOffices.map((office) => (
                <div
                  key={office.id}
                  className="border border-slate-200 bg-slate-50/70 hover:bg-white hover:border-teal-300/80 rounded-xl p-5 space-y-3.5 transition-all shadow-2xs"
                >
                  <div className="flex items-start justify-between gap-2 border-b border-slate-200/80 pb-2.5">
                    <div>
                      <h4 className="font-bold text-sm sm:text-base text-zinc-900 leading-snug">
                        {office.name}
                      </h4>
                      <span className="text-xs font-semibold text-teal-800 bg-teal-50 border border-teal-200 px-2 py-0.5 rounded mt-1 inline-block">
                        {office.city}, {office.state}
                      </span>
                    </div>
                  </div>

                  <div className="space-y-2 text-xs text-zinc-700">
                    <p className="flex items-start gap-2 leading-relaxed">
                      <Building2 className="w-4 h-4 text-zinc-400 shrink-0 mt-0.5" />
                      <span>{office.address} — <strong>PIN: {office.pincode}</strong></span>
                    </p>

                    <p className="flex items-center gap-2">
                      <Phone className="w-4 h-4 text-zinc-400 shrink-0" />
                      <span>Helpline: <strong>{office.helpline}</strong></span>
                    </p>

                    <p className="flex items-center gap-2">
                      <Clock className="w-4 h-4 text-zinc-400 shrink-0" />
                      <span>Hours: {office.workingHours}</span>
                    </p>
                  </div>

                  {/* PRO Email Contact & Action Bar */}
                  <div className="pt-2 border-t border-slate-200/80 flex items-center justify-between gap-2">
                    <button
                      type="button"
                      onClick={() => handleCopyEmail(office.proEmail)}
                      className="text-xs font-semibold text-teal-700 hover:text-teal-900 flex items-center gap-1.5 py-1 px-2.5 rounded-lg hover:bg-teal-50 transition-colors cursor-pointer"
                    >
                      {copiedEmail === office.proEmail ? (
                        <>
                          <Check className="w-3.5 h-3.5 text-emerald-600" />
                          <span>Copied PRO Email</span>
                        </>
                      ) : (
                        <>
                          <Mail className="w-3.5 h-3.5 text-teal-700" />
                          <span>Copy PRO Email ({office.proEmail})</span>
                        </>
                      )}
                    </button>
                  </div>
                </div>
              ))
            ) : (
              <div className="col-span-2 text-center py-10 border border-dashed border-slate-200 rounded-xl space-y-2">
                <p className="text-sm font-semibold text-zinc-600">
                  No regional office found matching &ldquo;{searchQuery}&rdquo;.
                </p>
                <p className="text-xs text-zinc-400">
                  Try searching by city name like Bengaluru, Delhi, Mumbai, Hyderabad, or Chennai.
                </p>
              </div>
            )}
          </div>

          {/* Grievance Escalation Link Banner */}
          <div className="bg-slate-100 border border-slate-200 rounded-xl p-4 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="text-xs sm:text-sm text-zinc-700 space-y-0.5 text-center sm:text-left">
              <strong>Need to Escalate Directly to Ministry of Labour?</strong>
              <p className="text-zinc-500 text-xs">
                Submit an online grievance ticket on EPFiGMS with your UAN and Claim ID.
              </p>
            </div>
            <a
              href="https://epfigms.gov.in"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-white hover:bg-slate-50 border border-slate-300 text-zinc-800 font-bold text-xs sm:text-sm px-4 py-2 rounded-xl shadow-2xs inline-flex items-center gap-1.5 shrink-0 transition-colors"
            >
              {t.offices.epfigmsBtn} <ExternalLink className="w-3.5 h-3.5" />
            </a>
          </div>
        </CardContent>
      </Card>
    </section>
  );
}
