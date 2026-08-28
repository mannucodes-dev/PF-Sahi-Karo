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
    <section id="office-directory" className="scroll-mt-24 space-y-6">
      {/* Header */}
      <div className="space-y-2">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 border border-primary/20 text-primary text-xs font-bold w-fit">
          <span className="material-symbols-outlined text-[16px]">location_city</span>
          <span>{t.offices.badge}</span>
        </div>
        <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-on-surface">
          {t.offices.title}
        </h2>
        <p className="text-sm sm:text-base text-on-surface-variant max-w-2xl leading-relaxed">
          {t.offices.subtitle}
        </p>
      </div>

      {/* Filter Chips & Search Bar */}
      <div className="glass-card rounded-2xl p-6 space-y-4">
        {/* Search Input */}
        <div className="relative">
          <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-outline">
            search
          </span>
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder={t.offices.searchPlaceholder}
            className="w-full h-12 pl-12 pr-4 bg-surface-container-low border border-outline-variant rounded-xl text-sm sm:text-base font-medium text-on-surface focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary shadow-2xs"
          />
        </div>

        {/* State / City Filter Chips */}
        <div className="flex flex-wrap items-center gap-2 pt-1">
          <button
            type="button"
            onClick={() => setSelectedState("all")}
            className={`px-3.5 py-1.5 rounded-full text-xs font-semibold transition-all cursor-pointer ${
              selectedState === "all"
                ? "bg-primary text-on-primary shadow-2xs"
                : "bg-surface-container-highest text-on-surface-variant hover:bg-primary-container hover:text-on-primary-container"
            }`}
          >
            {t.offices.allStates}
          </button>
          {states.map((st) => (
            <button
              key={st}
              type="button"
              onClick={() => setSelectedState(st)}
              className={`px-3.5 py-1.5 rounded-full text-xs font-semibold transition-all cursor-pointer ${
                selectedState === st
                  ? "bg-primary text-on-primary shadow-2xs"
                  : "bg-surface-container-highest text-on-surface-variant hover:bg-primary-container hover:text-on-primary-container"
              }`}
            >
              {st}
            </button>
          ))}
        </div>
      </div>

      {/* Directory Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {filteredOffices.length > 0 ? (
          filteredOffices.map((office) => (
            <div
              key={office.id}
              className="glass-card rounded-2xl p-6 flex flex-col justify-between space-y-4 hover:border-primary/50 transition-all shadow-xs"
            >
              <div className="space-y-3">
                <div className="flex items-start justify-between gap-3 border-b border-outline-variant/30 pb-3">
                  <div>
                    <h3 className="font-bold text-base text-on-surface leading-snug">
                      {office.name}
                    </h3>
                    <span className="text-xs font-semibold text-primary bg-primary/10 border border-primary/20 px-2.5 py-0.5 rounded-md mt-1.5 inline-block">
                      {office.city}, {office.state}
                    </span>
                  </div>
                  <span className="material-symbols-outlined text-outline text-[24px]">
                    apartment
                  </span>
                </div>

                <div className="space-y-2 text-xs sm:text-sm text-on-surface-variant">
                  <p className="flex items-start gap-2 leading-relaxed">
                    <span className="material-symbols-outlined text-[18px] text-primary shrink-0 mt-0.5">
                      location_on
                    </span>
                    <span>{office.address} — <strong className="font-data-mono font-bold">PIN: {office.pincode}</strong></span>
                  </p>

                  <p className="flex items-center gap-2">
                    <span className="material-symbols-outlined text-[18px] text-primary shrink-0">
                      call
                    </span>
                    <span>Helpline: <a href={`tel:${office.helpline.replace(/-/g, '')}`} className="font-data-mono font-bold text-on-surface hover:underline">{office.helpline}</a></span>
                  </p>

                  <p className="flex items-center gap-2">
                    <span className="material-symbols-outlined text-[18px] text-primary shrink-0">
                      schedule
                    </span>
                    <span>Hours: <strong className="text-on-surface">{office.workingHours}</strong></span>
                  </p>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="pt-3 border-t border-outline-variant/30 flex flex-wrap items-center justify-between gap-2">
                <button
                  type="button"
                  onClick={() => handleCopyEmail(office.proEmail)}
                  className="text-xs font-bold text-primary hover:bg-primary/10 border border-primary/30 rounded-lg px-3 py-2 flex items-center gap-1.5 transition-colors cursor-pointer min-h-[38px]"
                >
                  {copiedEmail === office.proEmail ? (
                    <>
                      <span className="material-symbols-outlined text-[16px] text-success-emerald">check</span>
                      <span className="text-success-emerald">Copied PRO Email</span>
                    </>
                  ) : (
                    <>
                      <span className="material-symbols-outlined text-[16px]">mail</span>
                      <span>Copy PRO Email</span>
                    </>
                  )}
                </button>

                <a
                  href={`https://maps.google.com/?q=${encodeURIComponent(office.name + ' ' + office.city)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-xs font-semibold text-on-surface-variant hover:text-primary flex items-center gap-1 py-2 px-3 rounded-lg hover:bg-surface-container-low transition-colors min-h-[38px]"
                >
                  <span className="material-symbols-outlined text-[16px]">directions</span>
                  <span>Get Directions</span>
                </a>
              </div>
            </div>
          ))
        ) : (
          <div className="col-span-1 md:col-span-2 text-center py-12 glass-card rounded-2xl space-y-2">
            <p className="text-sm font-bold text-on-surface">
              No regional office found matching &ldquo;{searchQuery}&rdquo;.
            </p>
            <p className="text-xs text-on-surface-variant">
              Try searching by city name like Bengaluru, Delhi, Mumbai, Hyderabad, or Chennai.
            </p>
          </div>
        )}
      </div>

      {/* EPFiGMS Grievance Escalation Banner */}
      <div className="glass-card rounded-2xl p-5 flex flex-col sm:flex-row items-center justify-between gap-4 border border-outline-variant/40">
        <div className="text-xs sm:text-sm text-on-surface space-y-1 text-center sm:text-left">
          <strong className="text-on-surface text-sm block">
            Need to Escalate Directly to Ministry of Labour?
          </strong>
          <p className="text-on-surface-variant text-xs">
            Submit an official online grievance ticket on EPFiGMS with your UAN and rejection details.
          </p>
        </div>
        <a
          href="https://epfigms.gov.in"
          target="_blank"
          rel="noopener noreferrer"
          className="bg-primary text-on-primary hover:bg-surface-tint font-bold text-xs sm:text-sm px-5 py-2.5 rounded-xl shadow-xs inline-flex items-center gap-1.5 shrink-0 transition-colors min-h-[44px]"
        >
          <span>{t.offices.epfigmsBtn}</span>
          <span className="material-symbols-outlined text-[16px]">open_in_new</span>
        </a>
      </div>
    </section>
  );
}
