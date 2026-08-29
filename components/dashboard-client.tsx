"use client";

import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { useSearchParams, useRouter } from "next/navigation";
import { useTranslation } from "@/lib/i18n/context";
import { LanguageSwitcher } from "@/components/language-switcher";
import { PfTaxCalculator } from "@/components/pf-tax-calculator";
import { RejectionSearchTool } from "@/components/rejection-search-tool";
import { ClaimCard } from "@/components/claim-card";
import { ClaimRow } from "@/lib/data/claims";
import { CitizenUser } from "@/lib/auth/session";
import { signOutAction } from "@/app/actions/auth-actions";
import { formatCurrency, formatDisplayDate, cn } from "@/lib/utils";
import {
  LayoutDashboard,
  Sparkles,
  Calculator,
  Building2,
  Settings,
  Plus,
  HelpCircle,
  LogOut,
  CheckCircle2,
  ArrowRight,
  ChevronRight,
  Download,
  Send,
  UploadCloud,
  FileText,
  Check,
  Copy,
  ExternalLink,
  ShieldCheck,
  AlertTriangle,
  Phone,
  Mail,
  Compass,
  Calendar,
  Search,
  Filter,
  ArrowLeft,
  X,
  Clock,
  QrCode,
  Printer,
  Share2,
  User,
  MapPin,
  FileCheck,
} from "lucide-react";

export type DashboardTab = "dashboard" | "decoder" | "calculator" | "offices" | "settings";

interface DashboardClientProps {
  user: CitizenUser;
  claims: ClaimRow[];
}

interface EpfoOfficeCard {
  id: string;
  name: string;
  jurisdiction: string;
  city: string;
  state: string;
  address: string;
  pincode: string;
  proName: string;
  proPhone: string;
  commissionerEmail: string;
  roomNo: string;
}

const DASHBOARD_OFFICES: EpfoOfficeCard[] = [
  {
    id: "ro-blr-1",
    name: "RO Bengaluru (Koramangala)",
    jurisdiction: "Jurisdiction: Bengaluru South",
    city: "Bengaluru",
    state: "Karnataka",
    address: "Bhavishya Nidhi Enclave, HMT Main Road, Jalahalli, Bengaluru",
    pincode: "560013",
    proName: "Mr. Ramesh K.",
    proPhone: "080-23372251",
    commissionerEmail: "ro.bengaluru@epfindia.gov.in",
    roomNo: "Room 104, Ground Floor (Grievance Facilitation Desk)",
  },
  {
    id: "ro-bom-1",
    name: "RO Mumbai (Bandra)",
    jurisdiction: "Jurisdiction: Mumbai Suburban",
    city: "Mumbai",
    state: "Maharashtra",
    address: "341, Bhavishya Nidhi Bhavan, Bandra Kurla Complex, Mumbai",
    pincode: "400051",
    proName: "Mrs. Anjali D.",
    proPhone: "022-26470001",
    commissionerEmail: "ro.mumbai@epfindia.gov.in",
    roomNo: "PRO Counter 3, 1st Floor, Main Wing",
  },
  {
    id: "ro-del-1",
    name: "RO Delhi Central (Wazirpur)",
    jurisdiction: "Jurisdiction: Central & North Delhi",
    city: "Delhi",
    state: "Delhi NCR",
    address: "Plot No. 23, Community Centre, Wazirpur Industrial Area, New Delhi",
    pincode: "110052",
    proName: "Mr. Rajesh Sharma",
    proPhone: "011-27371190",
    commissionerEmail: "ro.delhi.central@epfindia.gov.in",
    roomNo: "Hall B, Member Assistance Hub",
  },
  {
    id: "ro-hyd-1",
    name: "RO Hyderabad (Barkatpura & Hitec City)",
    jurisdiction: "Jurisdiction: Hyderabad & Rangareddy",
    city: "Hyderabad",
    state: "Telangana",
    address: "Bhavishya Nidhi Bhavan, No. 3-4-763, Barkatpura, Hyderabad",
    pincode: "500027",
    proName: "Mr. V. Sastry",
    proPhone: "040-27563140",
    commissionerEmail: "ro.hyderabad@epfindia.gov.in",
    roomNo: "Citizen Desk 12, Ground Floor",
  },
  {
    id: "ro-chn-1",
    name: "RO Chennai (Royapettah)",
    jurisdiction: "Jurisdiction: Chennai District",
    city: "Chennai",
    state: "Tamil Nadu",
    address: "Bhavishya Nidhi Bhavan, 37, Royapettah High Road, Chennai",
    pincode: "600014",
    proName: "Mrs. Meenakshi S.",
    proPhone: "044-28139200",
    commissionerEmail: "ro.chennai@epfindia.gov.in",
    roomNo: "Grievance Redressal Chamber 2",
  },
  {
    id: "ro-pun-1",
    name: "RO Pune (Cantonment)",
    jurisdiction: "Jurisdiction: Pune & Pimpri-Chinchwad",
    city: "Pune",
    state: "Maharashtra",
    address: "Cantonment Board Building, Golibar Maidan, Pune",
    pincode: "411001",
    proName: "Mr. Sunil Patil",
    proPhone: "020-26449195",
    commissionerEmail: "ro.pune@epfindia.gov.in",
    roomNo: "Counter 8, Front Office",
  },
];

const APPOINTMENT_REASONS = [
  {
    id: "joint_declaration",
    title: "Physical Joint Declaration Form Submission",
    desc: "Submission of employer-attested Joint Declaration form for name, DOB, or exit date correction.",
  },
  {
    id: "claim_escalation",
    title: "Rejected Claim In-Person Grievance & Escalation",
    desc: "Direct hearing with PRO / Assistant PF Commissioner regarding claim rejection remarks.",
  },
  {
    id: "kyc_biometric",
    title: "KYC Biometrics & Aadhaar / Bank Linking Help",
    desc: "Assistance with pending Aadhaar OTP authentication or employer DSC signature delays.",
  },
  {
    id: "pension_death",
    title: "EPS Pension & Scheme Certificate Verification",
    desc: "Form 10D / 10C physical certificate verification and pension disbursement inquiry.",
  },
];

const TIME_SLOTS = [
  "10:00 AM – 10:30 AM",
  "11:30 AM – 12:00 PM",
  "02:30 PM – 03:00 PM (Fast-track)",
  "04:00 PM – 04:30 PM",
];

export function DashboardClient({ user, claims }: DashboardClientProps) {
  const { locale, t } = useTranslation();
  const searchParams = useSearchParams();
  const router = useRouter();

  // Tab State
  const initialTab = (searchParams.get("tab") as DashboardTab) || "dashboard";
  const [activeTab, setActiveTab] = useState<DashboardTab>(initialTab);

  // Guided Resubmission states
  const [checklistPortal, setChecklistPortal] = useState(true);
  const [checklistBank, setChecklistBank] = useState(true);
  const [resubmitFile, setResubmitFile] = useState<File | null>(null);
  const [isResubmitted, setIsResubmitted] = useState(false);
  const [decoderMode, setDecoderMode] = useState<"resubmit" | "search">("resubmit");

  // Offices filter states
  const [officeSearch, setOfficeSearch] = useState("");
  const [selectedState, setSelectedState] = useState("all");
  const [copiedEmail, setCopiedEmail] = useState<string | null>(null);

  // Appointment Modal States
  const [bookingOffice, setBookingOffice] = useState<EpfoOfficeCard | null>(null);
  const [bookingReason, setBookingReason] = useState<string>("joint_declaration");
  const [bookingDate, setBookingDate] = useState<string>("Tomorrow (Next Working Day)");
  const [bookingSlot, setBookingSlot] = useState<string>("11:30 AM – 12:00 PM");
  const [bookingPhone, setBookingPhone] = useState<string>("+91 98765 43210");
  const [confirmedBooking, setConfirmedBooking] = useState<{
    token: string;
    office: EpfoOfficeCard;
    reason: string;
    date: string;
    slot: string;
    phone: string;
  } | null>(null);

  // Escape key handler for booking modal
  useEffect(() => {
    if (!bookingOffice) return;

    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setBookingOffice(null);
      }
    };

    document.addEventListener("keydown", handleEscape);
    return () => document.removeEventListener("keydown", handleEscape);
  }, [bookingOffice]);

  // Sync tab with URL
  useEffect(() => {
    const tabFromUrl = searchParams.get("tab") as DashboardTab;
    if (tabFromUrl && ["dashboard", "decoder", "calculator", "offices", "settings"].includes(tabFromUrl)) {
      setActiveTab(tabFromUrl);
    }
  }, [searchParams]);

  const handleTabChange = (tab: DashboardTab) => {
    setActiveTab(tab);
    window.scrollTo({ top: 0, behavior: "smooth" });
    const url = new URL(window.location.href);
    url.searchParams.set("tab", tab);
    window.history.pushState({}, "", url.toString());
  };

  const handleCopyEmail = (email: string) => {
    if (typeof navigator !== "undefined" && navigator.clipboard) {
      navigator.clipboard.writeText(email);
      setCopiedEmail(email);
      setTimeout(() => setCopiedEmail(null), 2500);
    }
  };

  const openBookingModal = (office: EpfoOfficeCard) => {
    setBookingOffice(office);
    setConfirmedBooking(null);
  };

  const handleConfirmAppointment = (e: React.FormEvent) => {
    e.preventDefault();
    if (!bookingOffice) return;

    const randomNum = Math.floor(1000 + Math.random() * 9000);
    const token = `EPFO-PRO-${bookingOffice.city.slice(0, 3).toUpperCase()}-2026-${randomNum}`;

    setConfirmedBooking({
      token,
      office: bookingOffice,
      reason: APPOINTMENT_REASONS.find((r) => r.id === bookingReason)?.title || bookingReason,
      date: bookingDate,
      slot: bookingSlot,
      phone: bookingPhone,
    });
  };

  const filteredOffices = DASHBOARD_OFFICES.filter((office) => {
    const matchesQuery =
      office.name.toLowerCase().includes(officeSearch.toLowerCase()) ||
      office.city.toLowerCase().includes(officeSearch.toLowerCase()) ||
      office.address.toLowerCase().includes(officeSearch.toLowerCase()) ||
      office.pincode.includes(officeSearch);
    const matchesState = selectedState === "all" || office.state === selectedState;
    return matchesQuery && matchesState;
  });

  const totalBalance = 184320;

  return (
    <div className="min-h-screen bg-[#f7f9fb] text-slate-900 flex flex-col md:flex-row">
      {/* Desktop Left Sidebar */}
      <aside className="hidden md:flex flex-col h-screen w-64 fixed left-0 top-0 bg-white border-r border-slate-200/80 py-5 space-y-4 z-40">
        {/* Brand & Identity Header */}
        <div className="px-5 mb-2 flex flex-col items-center">
          <Link href="/" className="flex items-center gap-2.5 mb-5 self-start">
            <img src="/logo.png" alt="PF Sahi Karo Logo" className="h-8 w-8 object-contain rounded-lg" />
            <span className="font-bold text-lg text-[#005f56] tracking-tight">{t.common.brandName}</span>
          </Link>

          {/* User Avatar Card */}
          <div className="w-14 h-14 rounded-full bg-[#005f56] text-white flex items-center justify-center font-bold text-lg mb-2 shadow-xs ring-4 ring-teal-50">
            {user.full_name.split(" ").map((n) => n[0]).slice(0, 2).join("")}
          </div>
          <h2 className="text-sm font-bold text-slate-900 text-center">{user.full_name}</h2>
          <p className="text-[11px] text-slate-500 font-mono text-center mt-0.5">
            UAN: {user.masked_uan}
          </p>
        </div>

        {/* Navigation Items */}
        <div className="px-3 flex-1 overflow-y-auto space-y-1">
          <button
            type="button"
            onClick={() => handleTabChange("dashboard")}
            className={cn(
              "w-full flex items-center px-3.5 py-2.5 rounded-xl text-xs sm:text-sm font-semibold transition-all cursor-pointer text-left",
              activeTab === "dashboard"
                ? "bg-[#005f56] text-white shadow-xs font-bold"
                : "text-slate-600 hover:bg-slate-100 hover:text-slate-900"
            )}
          >
            <LayoutDashboard className="w-4 h-4 mr-3 shrink-0" />
            <span>{t.nav.dashboard}</span>
          </button>

          <button
            type="button"
            onClick={() => handleTabChange("decoder")}
            className={cn(
              "w-full flex items-center px-3.5 py-2.5 rounded-xl text-xs sm:text-sm font-semibold transition-all cursor-pointer text-left",
              activeTab === "decoder"
                ? "bg-[#005f56] text-white shadow-xs font-bold"
                : "text-slate-600 hover:bg-slate-100 hover:text-slate-900"
            )}
          >
            <Sparkles className="w-4 h-4 mr-3 shrink-0" />
            <span>{t.nav.decoder}</span>
          </button>

          <button
            type="button"
            onClick={() => handleTabChange("calculator")}
            className={cn(
              "w-full flex items-center px-3.5 py-2.5 rounded-xl text-xs sm:text-sm font-semibold transition-all cursor-pointer text-left",
              activeTab === "calculator"
                ? "bg-[#005f56] text-white shadow-xs font-bold"
                : "text-slate-600 hover:bg-slate-100 hover:text-slate-900"
            )}
          >
            <Calculator className="w-4 h-4 mr-3 shrink-0" />
            <span>{t.nav.taxCalc}</span>
          </button>

          <button
            type="button"
            onClick={() => handleTabChange("offices")}
            className={cn(
              "w-full flex items-center px-3.5 py-2.5 rounded-xl text-xs sm:text-sm font-semibold transition-all cursor-pointer text-left",
              activeTab === "offices"
                ? "bg-[#005f56] text-white shadow-xs font-bold"
                : "text-slate-600 hover:bg-slate-100 hover:text-slate-900"
            )}
          >
            <Building2 className="w-4 h-4 mr-3 shrink-0" />
            <span>{t.nav.officeFinder}</span>
          </button>

          <button
            type="button"
            onClick={() => handleTabChange("settings")}
            className={cn(
              "w-full flex items-center px-3.5 py-2.5 rounded-xl text-xs sm:text-sm font-semibold transition-all cursor-pointer text-left",
              activeTab === "settings"
                ? "bg-[#005f56] text-white shadow-xs font-bold"
                : "text-slate-600 hover:bg-slate-100 hover:text-slate-900"
            )}
          >
            <Settings className="w-4 h-4 mr-3 shrink-0" />
            <span>{locale === "hi" ? "सेटिंग्स" : "Settings"}</span>
          </button>
        </div>

        {/* Start New Claim CTA Button */}
        <div className="px-3 mb-2">
          <button
            type="button"
            onClick={() => handleTabChange("decoder")}
            className="w-full bg-[#005f56] hover:bg-[#004742] text-white font-bold py-2.5 px-4 rounded-xl transition-colors flex items-center justify-center min-h-[42px] text-xs shadow-xs cursor-pointer gap-1.5"
          >
            <Plus className="w-4 h-4" />
            <span>{locale === "hi" ? "नया दावा शुरू करें" : "Start New Claim"}</span>
          </button>
        </div>

        {/* Bottom Actions */}
        <div className="px-3 pb-2 border-t border-slate-100 pt-3 mt-auto space-y-1">
          <div className="px-2 pb-1">
            <LanguageSwitcher direction="up" align="left" />
          </div>

          <Link
            href="/help#top"
            className="flex items-center px-3.5 py-2 text-slate-600 hover:bg-slate-100 rounded-xl transition-all text-xs font-semibold"
          >
            <HelpCircle className="w-4 h-4 mr-2.5 text-slate-500" />
            <span>{t.nav.help}</span>
          </Link>

          <form action={signOutAction}>
            <button
              type="submit"
              className="w-full flex items-center px-3.5 py-2 text-slate-600 hover:text-red-600 hover:bg-red-50 rounded-xl transition-all text-xs font-semibold cursor-pointer"
            >
              <LogOut className="w-4 h-4 mr-2.5 text-slate-500" />
              <span>{t.common.signOut}</span>
            </button>
          </form>
        </div>
      </aside>

      {/* Main Content Area */}
      <div className="flex-1 md:ml-64 flex flex-col min-h-screen">
        {/* Mobile / Tablet Header Bar */}
        <header className="md:hidden bg-white border-b border-slate-200 px-4 py-3 sticky top-0 z-30 flex items-center justify-between shadow-2xs">
          <Link href="/" className="flex items-center gap-2">
            <img src="/logo.png" alt="PF Sahi Karo Logo" className="h-7 w-7 object-contain rounded-lg" />
            <span className="font-bold text-base text-[#005f56]">{t.common.brandName}</span>
          </Link>
          <div className="flex items-center gap-2">
            <LanguageSwitcher direction="down" align="right" />
            <form action={signOutAction}>
              <button
                type="submit"
                className="p-2 text-slate-600 hover:text-red-600 rounded-lg cursor-pointer"
                title="Sign out"
              >
                <LogOut className="w-4 h-4" />
              </button>
            </form>
          </div>
        </header>

        {/* Mobile Horizontal Tab Navigation Strip */}
        <div className="md:hidden bg-white border-b border-slate-200 px-3 py-2 flex items-center gap-1.5 overflow-x-auto">
          {[
            { id: "dashboard", label: t.nav.dashboard, icon: LayoutDashboard },
            { id: "decoder", label: t.nav.decoder, icon: Sparkles },
            { id: "calculator", label: t.nav.taxCalc, icon: Calculator },
            { id: "offices", label: t.nav.officeFinder, icon: Building2 },
            { id: "settings", label: "Settings", icon: Settings },
          ].map((tab) => {
            const Icon = tab.icon;
            const isTabActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                type="button"
                onClick={() => handleTabChange(tab.id as DashboardTab)}
                className={cn(
                  "px-3 py-1.5 rounded-lg text-xs font-semibold flex items-center gap-1.5 whitespace-nowrap cursor-pointer transition-colors",
                  isTabActive
                    ? "bg-[#005f56] text-white font-bold shadow-2xs"
                    : "bg-slate-100 text-slate-700 hover:bg-slate-200"
                )}
              >
                <Icon className="w-3.5 h-3.5" />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>

        {/* Main Canvas Area */}
        <main id="main-content" className="flex-1 p-4 sm:p-6 lg:p-8 space-y-6 max-w-[1280px] w-full mx-auto">
          {/* ========================================================================= */}
          {/* TAB 1: DASHBOARD VIEW (Stitch Screen 2) */}
          {/* ========================================================================= */}
          {activeTab === "dashboard" && (
            <div className="space-y-6 animate-in fade-in duration-200">
              {/* Profile Banner */}
              <section className="w-full bg-white rounded-2xl p-6 sm:p-7 border border-slate-200/80 shadow-xs flex flex-col md:flex-row justify-between items-start md:items-center gap-6 relative overflow-hidden">
                <div className="space-y-2 z-10">
                  <div className="inline-flex items-center gap-1.5 bg-emerald-50 text-emerald-800 px-3 py-1 rounded-full border border-emerald-200 text-xs font-bold shadow-2xs">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                    <span>{t.dashboard.memberAccount}</span>
                  </div>

                  <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
                    {t.dashboard.greeting}, {user.full_name}
                  </h1>

                  <div className="flex flex-wrap gap-x-6 gap-y-1.5 text-xs sm:text-sm text-slate-600">
                    <span className="font-mono">
                      UAN: <span className="tracking-widest">••••••••</span>{user.masked_uan.slice(-4)}
                    </span>
                    <span className="font-mono">
                      Bank: ending in <span className="tracking-widest">••••</span>{(user.masked_bank_account || "").replace(/\D/g, "").slice(-4) || "0000"}
                    </span>
                  </div>
                </div>

                <div className="w-full md:w-auto z-10">
                  <button
                    type="button"
                    onClick={() => handleTabChange("decoder")}
                    className="w-full md:w-auto min-h-[42px] px-5 bg-slate-100 hover:bg-slate-200 text-slate-800 rounded-xl font-semibold text-xs sm:text-sm transition-colors flex items-center justify-center gap-2 border border-slate-200 cursor-pointer shadow-2xs"
                  >
                    <FileText className="w-4 h-4 text-slate-600" />
                    <span>{locale === "hi" ? "केवाईसी / संयुक्त घोषणा अपडेट करें" : "Update KYC / Joint Declaration"}</span>
                  </button>
                </div>
              </section>

              {/* Balance Card & Claims Activity */}
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
                {/* Left: Total PF Balance Card (Stitch Exact Styling) */}
                <div className="lg:col-span-4 flex flex-col h-full">
                  <div className="bg-[#004d44] text-white rounded-2xl p-6 sm:p-7 flex flex-col justify-between h-full min-h-[260px] shadow-md relative overflow-hidden">
                    <div className="space-y-4">
                      <div className="flex items-center justify-between text-teal-200">
                        <h3 className="text-xs font-bold uppercase tracking-wider">
                          {t.dashboard.totalBalance}
                        </h3>
                        <Download className="w-4 h-4 opacity-80" />
                      </div>

                      <div>
                        <div className="text-3xl sm:text-4xl font-extrabold font-mono text-white tracking-tight">
                          {formatCurrency(totalBalance)}
                        </div>
                        <div className="flex items-center gap-1.5 text-xs text-teal-200 mt-2 font-medium">
                          <span className="w-2 h-2 rounded-full bg-emerald-400" />
                          <span>{t.dashboard.balanceSubtitle}</span>
                        </div>
                      </div>
                    </div>

                    {/* Passbook Download Button */}
                    <div className="pt-6">
                      <button
                        type="button"
                        onClick={() => alert("Downloading official EPFO Passbook statement (PDF)...")}
                        className="w-full bg-[#00665a] hover:bg-[#007a6c] text-white py-2.5 px-4 rounded-xl text-xs font-bold flex items-center justify-center gap-2 transition-colors cursor-pointer border border-teal-600/50"
                      >
                        <Download className="w-3.5 h-3.5" />
                        <span>{locale === "hi" ? "पासबुक डाउनलोड करें" : "Download Passbook"}</span>
                      </button>
                    </div>
                  </div>
                </div>

                {/* Right: Recent Claims Activity (Stitch Exact Cards) */}
                <div className="lg:col-span-8 space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <h2 className="text-lg sm:text-xl font-bold text-slate-900 tracking-tight">
                        {locale === "hi" ? "हाल के दावों की गतिविधि" : "Recent Claims Activity"}
                      </h2>
                      <p className="text-xs text-slate-500">
                        {t.dashboard.claimsSubtitle}
                      </p>
                    </div>
                    <span className="bg-slate-100 text-slate-700 font-bold px-3 py-1 rounded-full text-xs font-mono">
                      {claims.length} {t.dashboard.claimsCount}
                    </span>
                  </div>

                  {/* Claims List */}
                  <div className="space-y-3.5">
                    {claims.map((claim) => (
                      <ClaimCard key={claim.id} claim={claim} />
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* ========================================================================= */}
          {/* TAB 2: REJECTION DECODER & GUIDED RESUBMISSION (Stitch Screen 3) */}
          {/* ========================================================================= */}
          {activeTab === "decoder" && (
            <div className="space-y-6 animate-in fade-in duration-200">
              {/* Top Navigation & Mode Switcher */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-2 border-b border-slate-200/80">
                <button
                  type="button"
                  onClick={() => handleTabChange("dashboard")}
                  className="text-slate-600 hover:text-[#005f56] font-semibold text-xs sm:text-sm flex items-center gap-1.5 cursor-pointer w-fit"
                >
                  <ArrowLeft className="w-4 h-4" />
                  <span>{locale === "hi" ? "डैशबोर्ड पर वापस जाएं" : "Back to Dashboard"}</span>
                </button>

                <div className="flex items-center gap-2 bg-slate-100 p-1 rounded-xl w-fit">
                  <button
                    type="button"
                    onClick={() => setDecoderMode("resubmit")}
                    className={cn(
                      "px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer",
                      decoderMode === "resubmit"
                        ? "bg-white text-[#005f56] shadow-xs"
                        : "text-slate-600 hover:text-slate-900"
                    )}
                  >
                    {locale === "hi" ? "निर्देशित पुनः सबमिशन" : "Guided Resubmission"}
                  </button>
                  <button
                    type="button"
                    onClick={() => setDecoderMode("search")}
                    className={cn(
                      "px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer",
                      decoderMode === "search"
                        ? "bg-white text-[#005f56] shadow-xs"
                        : "text-slate-600 hover:text-slate-900"
                    )}
                  >
                    {locale === "hi" ? "अस्वीकृति खोज टूल" : "Search Rejection Remarks"}
                  </button>
                </div>
              </div>

              {decoderMode === "resubmit" ? (
                /* Stitch Screen 3: Guided Resubmission Flow */
                <div className="space-y-6 max-w-4xl mx-auto">
                  {/* Header Title */}
                  <div className="space-y-1">
                    <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
                      {t.resubmit.pageTitle}
                    </h1>
                    <p className="text-sm text-slate-600">
                      {locale === "hi"
                        ? "फॉर्म 19 — आधार नाम विसंगति समाधान एवं पुनः सबमिशन"
                        : "Form 19 – Resolving Aadhaar Mismatch"}
                    </p>
                  </div>

                  {/* 3-Step Progress Stepper (Stitch Style) */}
                  <div className="bg-white rounded-2xl p-4 sm:p-6 border border-slate-200/80 shadow-xs">
                    <div className="flex items-center justify-between max-w-xl mx-auto">
                      <div className="flex items-center gap-2">
                        <div className="w-8 h-8 rounded-full bg-emerald-600 text-white flex items-center justify-center font-bold text-xs shadow-xs">
                          <Check className="w-4 h-4" />
                        </div>
                        <span className="text-xs sm:text-sm font-bold text-slate-900">
                          {locale === "hi" ? "1. त्रुटि पहचान" : "1. Identify Error"}
                        </span>
                      </div>

                      <div className="h-0.5 w-12 sm:w-20 bg-emerald-500" />

                      <div className="flex items-center gap-2">
                        <div className="w-8 h-8 rounded-full bg-emerald-600 text-white flex items-center justify-center font-bold text-xs shadow-xs">
                          <Check className="w-4 h-4" />
                        </div>
                        <span className="text-xs sm:text-sm font-bold text-slate-900">
                          {locale === "hi" ? "2. विवरण सुधार" : "2. Correct Data"}
                        </span>
                      </div>

                      <div className="h-0.5 w-12 sm:w-20 bg-slate-300" />

                      <div className="flex items-center gap-2">
                        <div className="w-8 h-8 rounded-full border-2 border-[#005f56] text-[#005f56] bg-teal-50 flex items-center justify-center font-bold text-xs">
                          3
                        </div>
                        <span className="text-xs sm:text-sm font-bold text-[#005f56]">
                          {locale === "hi" ? "3. सत्यापन व प्रेषण" : "3. Final Verify & Submit"}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Pre-Submission Checklist Card */}
                  <div className="bg-white rounded-2xl p-6 sm:p-7 border border-slate-200/80 shadow-xs space-y-4">
                    <div>
                      <h3 className="text-base sm:text-lg font-bold text-slate-900">
                        {t.resubmit.checklistTitle}
                      </h3>
                      <p className="text-xs sm:text-sm text-slate-500 mt-0.5">
                        {t.resubmit.checklistSubtitle}
                      </p>
                    </div>

                    <div className="space-y-3 pt-2">
                      <label className="flex items-start gap-3 p-4 rounded-xl border border-slate-200 bg-slate-50/50 hover:bg-slate-50 cursor-pointer transition-colors">
                        <input
                          type="checkbox"
                          checked={checklistPortal}
                          onChange={(e) => setChecklistPortal(e.target.checked)}
                          className="w-5 h-5 rounded text-[#005f56] focus:ring-[#005f56] mt-0.5 cursor-pointer"
                        />
                        <div>
                          <div className="text-xs sm:text-sm font-bold text-slate-900">
                            {locale === "hi" ? "पोर्टल प्रोफाइल विवरण सत्यापित" : "Portal Profile Updated"}
                          </div>
                          <p className="text-xs text-slate-600 mt-0.5 leading-relaxed">
                            {t.resubmit.confirmPortalCheck}
                          </p>
                        </div>
                      </label>

                      <label className="flex items-start gap-3 p-4 rounded-xl border border-slate-200 bg-slate-50/50 hover:bg-slate-50 cursor-pointer transition-colors">
                        <input
                          type="checkbox"
                          checked={checklistBank}
                          onChange={(e) => setChecklistBank(e.target.checked)}
                          className="w-5 h-5 rounded text-[#005f56] focus:ring-[#005f56] mt-0.5 cursor-pointer"
                        />
                        <div>
                          <div className="text-xs sm:text-sm font-bold text-slate-900">
                            {locale === "hi" ? "सक्रिय बैंक खाता व केवाईसी लिंक" : "Bank Account Active"}
                          </div>
                          <p className="text-xs text-slate-600 mt-0.5 leading-relaxed">
                            {t.resubmit.confirmBankCheck}
                          </p>
                        </div>
                      </label>
                    </div>
                  </div>

                  {/* Supporting Documents (Optional) Card */}
                  <div className="bg-white rounded-2xl p-6 sm:p-7 border border-slate-200/80 shadow-xs space-y-4">
                    <div>
                      <h3 className="text-base sm:text-lg font-bold text-slate-900 flex items-center gap-2">
                        <FileText className="w-5 h-5 text-amber-500" />
                        <span>{t.resubmit.uploadTitle}</span>
                      </h3>
                      <p className="text-xs sm:text-sm text-slate-500 mt-0.5">
                        {t.resubmit.uploadSubtitle}
                      </p>
                    </div>

                    {/* Drag and Drop Box */}
                    <div className="border-2 border-dashed border-slate-200 hover:border-teal-500 rounded-2xl p-8 text-center bg-slate-50/60 hover:bg-teal-50/20 transition-all space-y-3">
                      <div className="w-12 h-12 rounded-full bg-slate-100 text-slate-600 flex items-center justify-center mx-auto">
                        <UploadCloud className="w-6 h-6" />
                      </div>

                      <div>
                        <p className="text-sm font-bold text-slate-900">
                          {resubmitFile ? resubmitFile.name : (locale === "hi" ? "फाइल यहाँ खींचें या चुनें" : "Drag and drop files here")}
                        </p>
                        <p className="text-xs text-slate-500 mt-0.5">
                          {t.resubmit.uploadInstructions}
                        </p>
                      </div>

                      <label className="inline-block bg-white hover:bg-slate-50 text-slate-700 font-semibold text-xs py-2 px-4 rounded-lg border border-slate-300 shadow-2xs cursor-pointer transition-colors">
                        <span>{locale === "hi" ? "फाइल चुनें" : "Browse Files"}</span>
                        <input
                          type="file"
                          className="sr-only"
                          accept=".pdf,.png,.jpg,.jpeg"
                          onChange={(e) => {
                            if (e.target.files && e.target.files[0]) {
                              setResubmitFile(e.target.files[0]);
                            }
                          }}
                        />
                      </label>
                    </div>
                  </div>

                  {/* Submission Confirmation Banner */}
                  {isResubmitted && (
                    <div className="bg-emerald-50 border border-emerald-200 rounded-2xl p-6 text-center space-y-2 animate-in fade-in zoom-in-95">
                      <div className="w-12 h-12 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center mx-auto">
                        <CheckCircle2 className="w-6 h-6" />
                      </div>
                      <h4 className="text-base sm:text-lg font-bold text-emerald-900">
                        {t.resubmit.confirmationTitle}
                      </h4>
                      <p className="text-xs sm:text-sm text-emerald-800 max-w-md mx-auto">
                        {t.resubmit.confirmationSubtitle}
                      </p>
                      <div className="inline-block bg-white border border-emerald-200 px-4 py-1.5 rounded-lg text-xs font-mono font-bold text-emerald-900 mt-2">
                        {t.resubmit.refNo}: PSK-2026-RESUB-7890
                      </div>
                    </div>
                  )}

                  {/* Bottom Action Buttons */}
                  <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-2">
                    <button
                      type="button"
                      onClick={() => alert("Draft saved locally for your session.")}
                      className="w-full sm:w-auto bg-white hover:bg-slate-50 text-slate-700 font-bold text-xs sm:text-sm py-3 px-6 rounded-xl border border-slate-300 shadow-2xs transition-colors cursor-pointer"
                    >
                      {t.common.saveDraft}
                    </button>

                    <button
                      type="button"
                      disabled={!checklistPortal || !checklistBank}
                      onClick={() => {
                        setIsResubmitted(true);
                        setTimeout(() => {
                          window.scrollTo({ top: document.body.scrollHeight, behavior: "smooth" });
                        }, 200);
                      }}
                      className="w-full sm:w-auto bg-[#fa9d1b] hover:bg-[#f59510] disabled:opacity-50 text-[#291500] font-bold text-xs sm:text-sm py-3 px-8 rounded-xl shadow-xs transition-colors flex items-center justify-center gap-2 cursor-pointer"
                    >
                      <Send className="w-4 h-4" />
                      <span>{locale === "hi" ? "अंतिम प्रेषण (Final Dispatch)" : "Final Dispatch"}</span>
                    </button>
                  </div>
                </div>
              ) : (
                /* Instant Search Decoder Embedded */
                <div className="bg-white rounded-2xl p-6 sm:p-8 border border-slate-200/80 shadow-xs">
                  <RejectionSearchTool />
                </div>
              )}
            </div>
          )}

          {/* ========================================================================= */}
          {/* TAB 3: TDS CALCULATOR (Stitch Section 192A) */}
          {/* ========================================================================= */}
          {activeTab === "calculator" && (
            <div className="space-y-6 animate-in fade-in duration-200">
              <div className="pb-2 border-b border-slate-200/80">
                <button
                  type="button"
                  onClick={() => handleTabChange("dashboard")}
                  className="text-slate-600 hover:text-[#005f56] font-semibold text-xs sm:text-sm flex items-center gap-1.5 cursor-pointer"
                >
                  <ArrowLeft className="w-4 h-4" />
                  <span>{locale === "hi" ? "डैशबोर्ड पर वापस जाएं" : "Back to Dashboard"}</span>
                </button>
              </div>

              <div className="bg-white rounded-2xl p-4 sm:p-6 md:p-8 border border-slate-200/80 shadow-xs">
                <PfTaxCalculator />
              </div>
            </div>
          )}

          {/* ========================================================================= */}
          {/* TAB 4: OFFICE DIRECTORY (Stitch Screen 4) */}
          {/* ========================================================================= */}
          {activeTab === "offices" && (
            <div className="space-y-6 animate-in fade-in duration-200">
              {/* Back Link */}
              <div className="pb-2 border-b border-slate-200/80">
                <button
                  type="button"
                  onClick={() => handleTabChange("dashboard")}
                  className="text-slate-600 hover:text-[#005f56] font-semibold text-xs sm:text-sm flex items-center gap-1.5 cursor-pointer"
                >
                  <ArrowLeft className="w-4 h-4" />
                  <span>{locale === "hi" ? "डैशबोर्ड पर वापस जाएं" : "Back to Dashboard"}</span>
                </button>
              </div>

              {/* Title Section (Stitch Style) */}
              <div className="space-y-1">
                <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
                  {t.offices.title}
                </h1>
                <p className="text-xs sm:text-sm text-slate-600 max-w-2xl leading-relaxed">
                  {t.offices.subtitle}
                </p>
              </div>

              {/* Filter Bar (Search input + State dropdown + Filters Button) */}
              <div className="bg-white rounded-2xl p-4 sm:p-5 border border-slate-200/80 shadow-xs flex flex-col sm:flex-row items-center gap-3">
                <div className="relative flex-1 w-full">
                  <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    value={officeSearch}
                    onChange={(e) => setOfficeSearch(e.target.value)}
                    placeholder={t.offices.searchPlaceholder}
                    className="w-full h-11 pl-10 pr-4 bg-slate-50 border border-slate-200 rounded-xl text-xs sm:text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-[#005f56]"
                  />
                  {officeSearch && (
                    <button
                      type="button"
                      onClick={() => setOfficeSearch("")}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  )}
                </div>

                <div className="flex items-center gap-2.5 w-full sm:w-auto">
                  <select
                    value={selectedState}
                    onChange={(e) => setSelectedState(e.target.value)}
                    className="h-11 px-3 bg-slate-50 border border-slate-200 rounded-xl text-xs sm:text-sm font-semibold text-slate-700 focus:outline-none focus:ring-2 focus:ring-[#005f56] cursor-pointer"
                  >
                    <option value="all">{t.offices.allStates}</option>
                    <option value="Karnataka">Karnataka</option>
                    <option value="Maharashtra">Maharashtra</option>
                    <option value="Delhi NCR">Delhi NCR</option>
                    <option value="Telangana">Telangana</option>
                    <option value="Tamil Nadu">Tamil Nadu</option>
                    <option value="Gujarat">Gujarat</option>
                    <option value="West Bengal">West Bengal</option>
                  </select>

                  <button
                    type="button"
                    onClick={() => {
                      setOfficeSearch("");
                      setSelectedState("all");
                    }}
                    className="h-11 px-4 bg-[#005f56] hover:bg-[#004742] text-white rounded-xl text-xs sm:text-sm font-bold flex items-center gap-1.5 shadow-2xs transition-colors cursor-pointer whitespace-nowrap"
                  >
                    <Filter className="w-3.5 h-3.5" />
                    <span>Filters</span>
                  </button>
                </div>
              </div>

              {/* Office Cards Grid (Stitch 2-Column Cards) */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {filteredOffices.map((office) => (
                  <div
                    key={office.id}
                    className="bg-white rounded-2xl p-6 border border-slate-200/90 shadow-xs flex flex-col justify-between space-y-4 hover:border-teal-500/60 transition-all"
                  >
                    <div className="space-y-3">
                      {/* Card Header with Active Badge */}
                      <div className="flex items-start justify-between gap-2 border-b border-slate-100 pb-3">
                        <div>
                          <h3 className="font-extrabold text-base sm:text-lg text-slate-900 leading-snug">
                            {office.name}
                          </h3>
                          <span className="text-[11px] font-medium text-slate-500 mt-0.5 block">
                            {office.jurisdiction}
                          </span>
                        </div>
                        <span className="bg-emerald-50 text-emerald-700 border border-emerald-200 px-2.5 py-0.5 rounded-full text-[11px] font-bold shrink-0">
                          Active
                        </span>
                      </div>

                      {/* Address & PRO Details */}
                      <div className="grid grid-cols-2 gap-3 text-xs">
                        <div>
                          <div className="font-bold text-slate-400 uppercase text-[10px] tracking-wider mb-0.5">
                            Office Address
                          </div>
                          <p className="text-slate-700 leading-relaxed font-medium">
                            {office.address} — PIN: {office.pincode}
                          </p>
                        </div>
                        <div>
                          <div className="font-bold text-slate-400 uppercase text-[10px] tracking-wider mb-0.5">
                            PRO Details
                          </div>
                          <p className="text-slate-900 font-bold">{office.proName}</p>
                          <a
                            href={`tel:${office.proPhone.replace(/-/g, "")}`}
                            className="text-[#005f56] font-mono font-semibold hover:underline mt-0.5 inline-flex items-center gap-1"
                          >
                            <Phone className="w-3 h-3" />
                            <span>{office.proPhone}</span>
                          </a>
                        </div>
                      </div>

                      {/* Escalation Contact Box (Stitch Red Outline) */}
                      <div className="bg-red-50/60 border border-red-200/80 rounded-xl p-3 space-y-1">
                        <div className="flex items-center gap-1.5 text-[11px] font-bold text-red-700 uppercase tracking-wider">
                          <AlertTriangle className="w-3.5 h-3.5 text-red-600" />
                          <span>Escalation Contact</span>
                        </div>
                        <div className="text-xs font-bold text-slate-900">
                          Regional PF Commissioner
                        </div>
                        <div className="flex items-center justify-between gap-2 pt-0.5">
                          <span className="font-mono text-xs text-red-800 truncate">
                            {office.commissionerEmail}
                          </span>
                          <button
                            type="button"
                            onClick={() => handleCopyEmail(office.commissionerEmail)}
                            className="p-1 rounded hover:bg-red-100 text-red-700 cursor-pointer"
                            title="Copy Email"
                          >
                            {copiedEmail === office.commissionerEmail ? (
                              <Check className="w-3.5 h-3.5 text-emerald-600" />
                            ) : (
                              <Copy className="w-3.5 h-3.5" />
                            )}
                          </button>
                        </div>
                      </div>
                    </div>

                    {/* Bottom Buttons: Get Directions + Book Appointment */}
                    <div className="pt-2 border-t border-slate-100 flex items-center justify-between gap-3">
                      <a
                        href={`https://maps.google.com/?q=${encodeURIComponent(office.name + " " + office.city)}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-xs font-bold text-slate-700 hover:text-[#005f56] flex items-center gap-1.5 py-2 px-3 rounded-lg hover:bg-slate-100 transition-colors"
                      >
                        <Compass className="w-4 h-4 text-[#005f56]" />
                        <span>Get Directions</span>
                      </a>

                      <button
                        type="button"
                        onClick={() => openBookingModal(office)}
                        className="bg-[#fa9d1b] hover:bg-[#f59510] text-[#291500] font-bold text-xs py-2 px-4 rounded-lg transition-colors cursor-pointer shadow-2xs flex items-center gap-1"
                      >
                        <Calendar className="w-3.5 h-3.5" />
                        <span>{locale === "hi" ? "अपॉइंटमेंट बुक करें" : "Book Appointment"}</span>
                      </button>
                    </div>
                  </div>
                ))}
              </div>

              {/* Still unresolved? File a Grievance Banner (Stitch Bottom Banner) */}
              <div className="bg-white rounded-2xl p-6 border border-slate-200/90 shadow-xs flex flex-col sm:flex-row items-center justify-between gap-4">
                <div className="space-y-1 text-center sm:text-left">
                  <div className="flex items-center gap-2 justify-center sm:justify-start">
                    <ShieldCheck className="w-5 h-5 text-[#005f56]" />
                    <h3 className="text-base sm:text-lg font-bold text-slate-900">
                      {locale === "hi" ? "समस्या का समाधान नहीं हुआ? शिकायत दर्ज करें" : "Still unresolved? File a Grievance"}
                    </h3>
                  </div>
                  <p className="text-xs sm:text-sm text-slate-600 max-w-xl">
                    {locale === "hi"
                      ? "यदि क्षेत्रीय कार्यालय से 15 दिनों में समाधान न मिले, तो आधिकारिक EPFiGMS पोर्टल पर शिकायत दर्ज करें।"
                      : "If contacting the regional office hasn't resolved your issue within 15 days, escalate it via the official EPFiGMS portal."}
                  </p>
                </div>

                <a
                  href="https://epfigms.gov.in"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-[#005f56] hover:bg-[#004742] text-white font-bold text-xs sm:text-sm py-3 px-5 rounded-xl shadow-xs inline-flex items-center gap-2 shrink-0 transition-colors"
                >
                  <span>{locale === "hi" ? "EPFiGMS पर शिकायत दर्ज करें" : "Register Grievance on EPFiGMS"}</span>
                  <ExternalLink className="w-4 h-4" />
                </a>
              </div>
            </div>
          )}

          {/* ========================================================================= */}
          {/* TAB 5: SETTINGS VIEW */}
          {/* ========================================================================= */}
          {activeTab === "settings" && (
            <div className="space-y-6 animate-in fade-in duration-200">
              <div className="pb-2 border-b border-slate-200/80">
                <button
                  type="button"
                  onClick={() => handleTabChange("dashboard")}
                  className="text-slate-600 hover:text-[#005f56] font-semibold text-xs sm:text-sm flex items-center gap-1.5 cursor-pointer"
                >
                  <ArrowLeft className="w-4 h-4" />
                  <span>{locale === "hi" ? "डैशबोर्ड पर वापस जाएं" : "Back to Dashboard"}</span>
                </button>
              </div>

              <div className="bg-white rounded-2xl p-6 sm:p-8 border border-slate-200/80 shadow-xs space-y-6 max-w-3xl">
                <h1 className="text-2xl font-bold text-slate-900">
                  {locale === "hi" ? "खाता और प्राथमिकताएं" : "Account & System Preferences"}
                </h1>

                <div className="space-y-4 divide-y divide-slate-100 text-xs sm:text-sm">
                  <div className="pt-2 flex justify-between items-center">
                    <div>
                      <div className="font-bold text-slate-900">Member Full Name</div>
                      <div className="text-slate-500">{user.full_name}</div>
                    </div>
                    <span className="bg-emerald-50 text-emerald-700 px-2.5 py-1 rounded-full font-bold text-xs border border-emerald-200">
                      Verified
                    </span>
                  </div>

                  <div className="pt-4 flex justify-between items-center">
                    <div>
                      <div className="font-bold text-slate-900">Masked UAN Number</div>
                      <div className="text-slate-500 font-mono">{user.masked_uan}</div>
                    </div>
                  </div>

                  <div className="pt-4 flex justify-between items-center">
                    <div>
                      <div className="font-bold text-slate-900">Language Preference</div>
                      <div className="text-slate-500">Active interface locale</div>
                    </div>
                    <LanguageSwitcher direction="up" align="right" />
                  </div>
                </div>
              </div>
            </div>
          )}
        </main>

        {/* Dashboard Footer */}
        <footer className="border-t border-slate-200 py-4 px-6 text-center text-xs text-slate-500 bg-white mt-auto">
          {t.common.officialDisclaimer}
        </footer>
      </div>

      {/* ========================================================================= */}
      {/* INTERACTIVE APPOINTMENT BOOKING MODAL & GATE PASS SLIP */}
      {/* ========================================================================= */}
      {bookingOffice && (
        <div
          className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4 overflow-y-auto animate-in fade-in duration-200"
          role="presentation"
        >
          <div
            role="dialog"
            aria-modal="true"
            aria-labelledby="appointment-dialog-title"
            className="bg-white rounded-2xl max-w-2xl w-full border border-slate-200 shadow-2xl overflow-hidden my-8"
          >
            {!confirmedBooking ? (
              /* FORM STATE: BOOKING DETAILS */
              <form onSubmit={handleConfirmAppointment} className="flex flex-col">
                {/* Modal Header */}
                <div className="bg-[#005f56] text-white p-5 sm:p-6 flex items-start justify-between">
                  <div>
                    <div className="inline-flex items-center gap-1 bg-teal-800/80 px-2.5 py-0.5 rounded-full text-[11px] font-bold text-teal-200 uppercase tracking-wider mb-1.5">
                      <Building2 className="w-3.5 h-3.5" />
                      <span>EPFO Official PRO In-Person Desk</span>
                    </div>
                    <h2
                      id="appointment-dialog-title"
                      className="text-xl sm:text-2xl font-bold tracking-tight text-white"
                    >
                      Book Official Appointment
                    </h2>
                    <p className="text-xs text-teal-100 mt-0.5 font-medium">
                      {bookingOffice.name} — {bookingOffice.roomNo}
                    </p>
                  </div>
                  <button
                    type="button"
                    onClick={() => setBookingOffice(null)}
                    aria-label="Close dialog"
                    className="text-teal-200 hover:text-white p-1 rounded-lg hover:bg-teal-700/50 cursor-pointer"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>

                <div className="p-6 space-y-5 max-h-[70vh] overflow-y-auto">
                  {/* Step 1: Select Purpose */}
                  <div className="space-y-2">
                    <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider">
                      1. Select Appointment Purpose
                    </label>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                      {APPOINTMENT_REASONS.map((r) => (
                        <label
                          key={r.id}
                          className={cn(
                            "p-3 rounded-xl border cursor-pointer transition-all flex flex-col justify-between",
                            bookingReason === r.id
                              ? "border-[#005f56] bg-teal-50/40 text-slate-900 ring-2 ring-[#005f56]/20 font-bold"
                              : "border-slate-200 bg-white text-slate-600 hover:bg-slate-50"
                          )}
                        >
                          <div className="flex items-start gap-2">
                            <input
                              type="radio"
                              name="bookingReason"
                              value={r.id}
                              checked={bookingReason === r.id}
                              onChange={(e) => setBookingReason(e.target.value)}
                              className="mt-0.5 text-[#005f56] focus:ring-[#005f56]"
                            />
                            <div>
                              <div className="text-xs font-bold text-slate-900">{r.title}</div>
                              <p className="text-[11px] text-slate-500 font-normal mt-0.5 leading-relaxed">
                                {r.desc}
                              </p>
                            </div>
                          </div>
                        </label>
                      ))}
                    </div>
                  </div>

                  {/* Step 2: Select Date & Time Slot */}
                  <div className="space-y-3 pt-3 border-t border-slate-100">
                    <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider">
                      2. Select Preferred Date &amp; Time Slot
                    </label>

                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                      {[
                        "Tomorrow (Next Working Day)",
                        "Monday, 01 Sep 2026",
                        "Tuesday, 02 Sep 2026",
                      ].map((d) => (
                        <button
                          key={d}
                          type="button"
                          onClick={() => setBookingDate(d)}
                          className={cn(
                            "py-2.5 px-3 rounded-xl text-xs font-bold text-center border transition-all cursor-pointer",
                            bookingDate === d
                              ? "border-[#005f56] bg-[#005f56] text-white shadow-xs"
                              : "border-slate-200 bg-slate-50 text-slate-700 hover:bg-slate-100"
                          )}
                        >
                          {d}
                        </button>
                      ))}
                    </div>

                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 pt-1">
                      {TIME_SLOTS.map((slot) => (
                        <button
                          key={slot}
                          type="button"
                          onClick={() => setBookingSlot(slot)}
                          className={cn(
                            "p-2.5 rounded-xl text-[11px] font-semibold text-center border transition-all cursor-pointer",
                            bookingSlot === slot
                              ? "border-teal-600 bg-teal-50 text-[#005f56] font-bold ring-2 ring-teal-600/30"
                              : "border-slate-200 bg-white text-slate-700 hover:bg-slate-50"
                          )}
                        >
                          <Clock className="w-3.5 h-3.5 mx-auto mb-1 text-slate-400" />
                          <span>{slot}</span>
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Step 3: Member Pre-fill & SMS Confirmation Mobile */}
                  <div className="space-y-3 pt-3 border-t border-slate-100">
                    <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider">
                      3. Member Details &amp; SMS Token Delivery
                    </label>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 bg-slate-50 p-4 rounded-xl border border-slate-200">
                      <div>
                        <div className="text-[11px] text-slate-500 font-medium">Attending Member</div>
                        <div className="text-xs font-bold text-slate-900">{user.full_name}</div>
                        <div className="text-[11px] text-slate-500 font-mono">UAN: {user.masked_uan}</div>
                      </div>
                      <div>
                        <label className="block text-[11px] text-slate-500 font-medium mb-1">
                          Mobile No. for Gate Pass SMS
                        </label>
                        <input
                          type="tel"
                          value={bookingPhone}
                          onChange={(e) => setBookingPhone(e.target.value)}
                          className="w-full h-8 px-2.5 bg-white border border-slate-300 rounded-lg text-xs font-mono font-bold text-slate-900 focus:outline-none focus:ring-2 focus:ring-[#005f56]"
                        />
                      </div>
                    </div>
                  </div>

                  {/* Checklist of What to Bring */}
                  <div className="bg-amber-50/80 border border-amber-200/80 rounded-xl p-4 space-y-1.5">
                    <div className="flex items-center gap-1.5 text-xs font-bold text-amber-900">
                      <FileCheck className="w-4 h-4 text-amber-700 shrink-0" />
                      <span>What to bring to the EPFO Regional Office:</span>
                    </div>
                    <ul className="text-[11px] text-amber-800 space-y-1 list-disc list-inside leading-relaxed">
                      <li>Original Aadhaar Card + 1 photocopy self-attested</li>
                      <li>Original Cancelled Bank Cheque with printed member name</li>
                      <li>Signed Joint Declaration form (if attending for Joint Declaration submission)</li>
                    </ul>
                  </div>
                </div>

                {/* Modal Footer */}
                <div className="bg-slate-50 p-4 sm:p-5 border-t border-slate-200 flex items-center justify-between gap-3">
                  <button
                    type="button"
                    onClick={() => setBookingOffice(null)}
                    className="text-xs font-bold text-slate-600 hover:text-slate-900 px-4 py-2.5 rounded-xl cursor-pointer"
                  >
                    Cancel
                  </button>

                  <button
                    type="submit"
                    className="bg-[#fa9d1b] hover:bg-[#f59510] text-[#291500] font-bold text-xs sm:text-sm py-2.5 px-6 rounded-xl shadow-xs transition-colors cursor-pointer flex items-center gap-1.5"
                  >
                    <Check className="w-4 h-4" />
                    <span>Confirm &amp; Generate Gate Pass</span>
                  </button>
                </div>
              </form>
            ) : (
              /* CONFIRMATION STATE: OFFICIAL GATE PASS & SLIP */
              <div className="flex flex-col">
                <div className="bg-emerald-700 text-white p-6 text-center space-y-2 relative overflow-hidden">
                  <button
                    type="button"
                    onClick={() => setBookingOffice(null)}
                    aria-label="Close dialog"
                    className="absolute top-4 right-4 text-emerald-200 hover:text-white p-1 rounded-lg cursor-pointer"
                  >
                    <X className="w-5 h-5" />
                  </button>

                  <div className="w-12 h-12 rounded-full bg-emerald-100 text-emerald-800 flex items-center justify-center mx-auto shadow-xs">
                    <CheckCircle2 className="w-7 h-7" />
                  </div>

                  <h3 className="text-xl sm:text-2xl font-bold tracking-tight text-white">
                    Appointment Slot Reserved!
                  </h3>
                  <p className="text-xs text-emerald-100 max-w-md mx-auto">
                    Your appointment token and gate pass have been recorded in the regional EPFO field office registry.
                  </p>
                </div>

                {/* Printable Gate Pass Card */}
                <div className="p-6 space-y-4 max-h-[70vh] overflow-y-auto">
                  <div className="border-2 border-dashed border-slate-300 rounded-2xl p-5 bg-slate-50/60 space-y-4">
                    <div className="flex items-start justify-between border-b border-slate-200 pb-3">
                      <div>
                        <span className="text-[10px] uppercase font-bold text-slate-400 tracking-wider">
                          Official Appointment Token
                        </span>
                        <div className="text-lg sm:text-xl font-extrabold text-[#005f56] font-mono">
                          {confirmedBooking.token}
                        </div>
                      </div>
                      <span className="bg-emerald-100 text-emerald-800 text-[11px] font-bold px-2.5 py-1 rounded-full">
                        Confirmed Entry Pass
                      </span>
                    </div>

                    <div className="grid grid-cols-2 gap-3 text-xs">
                      <div>
                        <div className="text-slate-400 text-[10px] uppercase font-bold">Office &amp; Counter</div>
                        <div className="font-bold text-slate-900">{confirmedBooking.office.name}</div>
                        <div className="text-slate-600 text-[11px]">{confirmedBooking.office.roomNo}</div>
                      </div>
                      <div>
                        <div className="text-slate-400 text-[10px] uppercase font-bold">Designated Officer</div>
                        <div className="font-bold text-slate-900">{confirmedBooking.office.proName}</div>
                        <div className="text-slate-600 text-[11px]">Public Relations Officer</div>
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-3 text-xs pt-2 border-t border-slate-200">
                      <div>
                        <div className="text-slate-400 text-[10px] uppercase font-bold">Scheduled Date &amp; Time</div>
                        <div className="font-bold text-slate-900">{confirmedBooking.date}</div>
                        <div className="text-teal-700 font-semibold">{confirmedBooking.slot}</div>
                      </div>
                      <div>
                        <div className="text-slate-400 text-[10px] uppercase font-bold">Purpose of Visit</div>
                        <div className="font-bold text-slate-900 leading-tight">{confirmedBooking.reason}</div>
                      </div>
                    </div>

                    <div className="bg-white p-3 rounded-xl border border-slate-200 text-xs flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <User className="w-4 h-4 text-slate-500" />
                        <div>
                          <div className="font-bold text-slate-900">{user.full_name}</div>
                          <div className="text-[11px] text-slate-500 font-mono">UAN: {user.masked_uan}</div>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="text-[10px] text-slate-400 font-bold uppercase">SMS Confirmation</div>
                        <div className="font-mono text-xs text-slate-700">{confirmedBooking.phone}</div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Actions: Print / Download Pass / Close */}
                <div className="bg-slate-50 p-4 sm:p-5 border-t border-slate-200 flex flex-wrap items-center justify-between gap-3">
                  <div className="flex items-center gap-2">
                    <button
                      type="button"
                      onClick={() => window.print()}
                      className="bg-white hover:bg-slate-100 text-slate-700 font-bold text-xs py-2 px-3 rounded-xl border border-slate-300 shadow-2xs flex items-center gap-1.5 cursor-pointer"
                    >
                      <Printer className="w-3.5 h-3.5" />
                      <span>Print Gate Pass</span>
                    </button>

                    <button
                      type="button"
                      onClick={() => alert(`Appointment pass for ${confirmedBooking.token} downloaded as PDF!`)}
                      className="bg-white hover:bg-slate-100 text-slate-700 font-bold text-xs py-2 px-3 rounded-xl border border-slate-300 shadow-2xs flex items-center gap-1.5 cursor-pointer"
                    >
                      <Download className="w-3.5 h-3.5" />
                      <span>Download PDF</span>
                    </button>
                  </div>

                  <button
                    type="button"
                    onClick={() => setBookingOffice(null)}
                    className="bg-[#005f56] hover:bg-[#004742] text-white font-bold text-xs sm:text-sm py-2 px-5 rounded-xl cursor-pointer shadow-xs"
                  >
                    Done
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
