"use client";

import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  MessageCircleQuestion,
  X,
  Sparkles,
  ChevronRight,
  RotateCcw,
  Bot,
  User,
  ExternalLink,
  LifeBuoy,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { useTranslation } from "@/lib/i18n/context";

interface FAQItem {
  id: string;
  question: string;
  answer: string;
  officialRef: string;
}

const FAQ_DATA_EN: FAQItem[] = [
  {
    id: "form-10c",
    question: "What is Form 10C and when should I file it?",
    officialRef: "EPFO Scheme Rules Paragraph 68",
    answer:
      "Form 10C is used to withdraw your EPS (Employees' Pension Scheme) accumulated amount or to claim a Scheme Certificate when leaving an establishment before completing 10 years of pension-eligible service.",
  },
  {
    id: "uan-inactive",
    question: "Why does the portal say my UAN is inactive?",
    officialRef: "EPFO Member Portal Circular 2023",
    answer:
      "A UAN is marked inactive if it hasn't been activated on the Member Sewa portal or if mandatory Aadhaar-OTP linkage has not been completed. Visit the Unified Member Portal and select 'Activate UAN'.",
  },
  {
    id: "resubmit-timeline",
    question: "How long does EPFO take to process a resubmitted claim?",
    officialRef: "Citizen Charter 2024 (15 Working Days standard)",
    answer:
      "Resubmitted claims typically undergo field office review within 10 to 15 standard working days once your employer digitally approves the rectification on the Unified Portal.",
  },
  {
    id: "missing-document",
    question: "What should I do if my employer has not approved my KYC?",
    officialRef: "EPFO Master Circular on Employer DSC",
    answer:
      "Employer approval requires a Class 3 Digital Signature (DSC). Contact your company HR/PF department. If the establishment is closed or uncooperative, you can submit a Joint Declaration attested by an authorized bank manager or local EPFO PRO.",
  },
  {
    id: "partial-withdraw",
    question: "Can I file for partial PF advance while employed?",
    officialRef: "Form 31 Guidelines (Para 68B, 68H, 68K)",
    answer:
      "Yes. Form 31 allows non-refundable PF advances for specific emergencies: medical illness, house construction, child education, or marriage, without resigning from service.",
  },
];

const FAQ_DATA_HI: FAQItem[] = [
  {
    id: "form-10c",
    question: "फॉर्म 10C क्या है और इसे कब दाखिल करना चाहिए?",
    officialRef: "ईपीएफओ योजना नियम पैरा 68",
    answer:
      "फॉर्म 10C का उपयोग 10 वर्ष से कम सेवा पर नौकरी छोड़ने के बाद ईपीएस (पेंशन) राशि निकालने या स्कीम सर्टिफिकेट प्राप्त करने के लिए किया जाता है।",
  },
  {
    id: "uan-inactive",
    question: "पोर्टल पर मेरा यूएएन निष्क्रिय (Inactive) क्यों दिख रहा है?",
    officialRef: "ईपीएफओ मेंबर पोर्टल परिपत्र 2023",
    answer:
      "यदि यूएएन एक्टिवेट नहीं किया गया है या अनिवार्य आधार-ओटीपी लिंकिंग पूरी नहीं हुई है, तो यूएएन निष्क्रिय रहता है। मेंबर सेवा पोर्टल पर 'Activate UAN' चुनें।",
  },
  {
    id: "resubmit-timeline",
    question: "पुनः सबमिट किए गए दावे के निपटान में कितना समय लगता है?",
    officialRef: "नागरिक चार्टर 2024 (15 कार्य दिवस)",
    answer:
      "नियोक्ता द्वारा यूनिफाइड पोर्टल पर डिजिटल अनुमोदन के बाद क्षेत्रीय कार्यालय द्वारा सामान्यतः 10 से 15 कार्य दिवस लगते हैं।",
  },
  {
    id: "missing-document",
    question: "यदि कंपनी एचआर मेरा केवाईसी अप्रूव न करे तो क्या करें?",
    officialRef: "ईपीएफओ नियोक्ता डीएससी मास्टर परिपत्र",
    answer:
      "कंपनी के एचआर/पीएफ डेस्क से संपर्क करें। यदि कंपनी बंद हो चुकी है या सहयोग नहीं कर रही है, तो बैंक प्रबंधक या स्थानीय ईपीएफओ पीआरओ द्वारा सत्यापित संयुक्त घोषणा (Joint Declaration) पत्र जमा करें।",
  },
  {
    id: "partial-withdraw",
    question: "क्या नौकरी में रहते हुए पीएफ एडवांस निकाला जा सकता है?",
    officialRef: "फॉर्म 31 दिशानिर्देश (पैरा 68B, 68H, 68K)",
    answer:
      "हाँ, फॉर्म 31 द्वारा चिकित्सा आपातकाल, गृह निर्माण, बच्चों की उच्च शिक्षा या विवाह के लिए बिना नौकरी छोड़े गैर-वापसी योग्य एडवांस निकाला जा सकता है।",
  },
];

export function FAQWidget() {
  const { locale, t } = useTranslation();
  const faqData = locale === "hi" ? FAQ_DATA_HI : FAQ_DATA_EN;

  const [isOpen, setIsOpen] = useState(false);
  const [selectedFAQ, setSelectedFAQ] = useState<FAQItem | null>(null);
  const [chatHistory, setChatHistory] = useState<FAQItem[]>([]);

  const triggerButtonRef = useRef<HTMLButtonElement>(null);
  const modalRef = useRef<HTMLDivElement>(null);

  // Close modal on Escape key and restore focus
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isOpen) {
        setIsOpen(false);
        triggerButtonRef.current?.focus();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen]);

  // Focus modal when opened
  useEffect(() => {
    if (isOpen) {
      modalRef.current?.focus();
    }
  }, [isOpen]);

  const handleSelectQuestion = (faq: FAQItem) => {
    setSelectedFAQ(faq);
    if (!chatHistory.some((item) => item.id === faq.id)) {
      setChatHistory((prev) => [...prev, faq]);
    }
  };

  const handleReset = () => {
    setSelectedFAQ(null);
    setChatHistory([]);
  };

  const handleClose = () => {
    setIsOpen(false);
    triggerButtonRef.current?.focus();
  };

  return (
    <aside
      aria-label="EPFO Claim Knowledge Assistant"
      className="fixed bottom-4 right-4 sm:bottom-6 sm:right-6 z-50"
    >
      {/* Floating Toggle Button */}
      {!isOpen && (
        <button
          ref={triggerButtonRef}
          type="button"
          onClick={() => setIsOpen(true)}
          className="group bg-teal-700 hover:bg-teal-800 text-white font-extrabold p-3 rounded-full shadow-lg hover:shadow-xl flex items-center transition-all duration-300 active:scale-95 cursor-pointer border border-teal-600 focus:outline-none focus:ring-4 focus:ring-teal-400/50"
          aria-expanded={isOpen}
          aria-haspopup="dialog"
          aria-label="Open Claim Assistance FAQ dialog"
        >
          <div className="w-6 h-6 rounded-full bg-teal-800 flex items-center justify-center shrink-0" aria-hidden="true">
            <MessageCircleQuestion className="w-4 h-4 text-teal-200" />
          </div>
          <div className="flex items-center overflow-hidden max-w-0 group-hover:max-w-[300px] group-hover:ml-2.5 transition-all duration-300 ease-in-out opacity-0 group-hover:opacity-100 whitespace-nowrap gap-2">
            <span className="text-xs sm:text-sm">
              {locale === "hi" ? "सहायक एवं अक्सर पूछे जाने वाले प्रश्न" : "Claim Help & FAQ"}
            </span>
            <Badge className="bg-teal-900 text-teal-200 border-teal-700 text-[10px] px-1.5 py-0 font-mono shrink-0">
              {locale === "hi" ? "मार्गदर्शन" : "Guidance"}
            </Badge>
          </div>
        </button>
      )}

      {/* Accessible Dialog Modal */}
      {isOpen && (
        <div
          ref={modalRef}
          role="dialog"
          aria-modal="true"
          aria-labelledby="faq-dialog-title"
          tabIndex={-1}
          className="focus:outline-none"
        >
          <Card className="w-[calc(100vw-2rem)] sm:w-[440px] max-h-[580px] border-slate-200 bg-white shadow-2xl rounded-2xl flex flex-col overflow-hidden animate-in fade-in slide-in-from-bottom-4 duration-200">
            {/* Header */}
            <CardHeader className="bg-gradient-to-r from-teal-800 to-teal-950 text-white p-4 flex flex-row items-center justify-between shrink-0">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-xl bg-teal-700/80 border border-teal-600 flex items-center justify-center" aria-hidden="true">
                  <Bot className="w-4 h-4 text-teal-200" />
                </div>
                <div>
                  <CardTitle id="faq-dialog-title" className="text-sm font-bold tracking-tight text-white flex items-center gap-1.5">
                    {locale === "hi" ? "ईपीएफओ दावा सहायक" : "EPFO Claim Assistance FAQ"}
                    <Sparkles className="w-3.5 h-3.5 text-teal-300" aria-hidden="true" />
                  </CardTitle>
                  <p className="text-[11px] text-teal-200/85">
                    {locale === "hi" ? "सत्यापित नियमों पर आधारित मार्गदर्शन" : "Rules-based guidance · Verified by circulars"}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-1">
                {chatHistory.length > 0 && (
                  <button
                    type="button"
                    onClick={handleReset}
                    className="text-teal-200 hover:text-white p-1.5 rounded-lg hover:bg-white/10 transition-colors focus:ring-2 focus:ring-white"
                    title="Clear history"
                    aria-label="Clear chat history"
                  >
                    <RotateCcw className="w-3.5 h-3.5" aria-hidden="true" />
                  </button>
                )}
                <button
                  type="button"
                  onClick={handleClose}
                  className="text-teal-200 hover:text-white p-1.5 rounded-lg hover:bg-white/10 transition-colors focus:ring-2 focus:ring-white"
                  title="Close dialog (Escape)"
                  aria-label="Close dialog"
                >
                  <X className="w-4 h-4" aria-hidden="true" />
                </button>
              </div>
            </CardHeader>

            {/* Body */}
            <CardContent className="p-4 overflow-y-auto space-y-4 flex-1 text-xs sm:text-sm bg-slate-50/60">
              {/* Disclaimer Notice */}
              <div className="bg-amber-50 border border-amber-200 rounded-xl p-3 text-[11px] text-amber-900 leading-relaxed">
                <strong>Notice:</strong> This assistant provides guidance based on official published circulars. For official grievance filing, visit{" "}
                <a
                  href="https://epfigms.gov.in"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-semibold underline inline-flex items-center gap-0.5 text-amber-950"
                >
                  EPFiGMS <ExternalLink className="w-2.5 h-2.5" aria-hidden="true" />
                </a>.
              </div>

              {/* Intro message */}
              <div className="flex items-start gap-2.5">
                <div className="w-6 h-6 rounded-full bg-teal-100 text-teal-800 flex items-center justify-center shrink-0 mt-0.5 font-bold text-[10px]" aria-hidden="true">
                  PF
                </div>
                <div className="bg-white border border-slate-200/80 rounded-2xl rounded-tl-xs p-3 shadow-2xs text-zinc-800 space-y-1 max-w-[88%]">
                  <p className="font-medium">
                    {locale === "hi"
                      ? "नमस्ते! नीचे दिए गए किसी भी विषय पर क्लिक करके स्पष्टीकरण देखें:"
                      : "Namaste! Select a topic below to view verified explanations and guidelines:"}
                  </p>
                </div>
              </div>

              {/* Chat History */}
              {chatHistory.map((item) => (
                <div key={item.id} className="space-y-3">
                  {/* User query */}
                  <div className="flex items-start justify-end gap-2">
                    <div className="bg-teal-700 text-white rounded-2xl rounded-tr-xs p-3 shadow-2xs max-w-[85%] font-medium text-xs sm:text-sm">
                      {item.question}
                    </div>
                    <div className="w-6 h-6 rounded-full bg-slate-200 text-slate-700 flex items-center justify-center shrink-0 mt-0.5" aria-hidden="true">
                      <User className="w-3.5 h-3.5" />
                    </div>
                  </div>

                  {/* Assistant response */}
                  <div className="flex items-start gap-2.5">
                    <div className="w-6 h-6 rounded-full bg-teal-100 text-teal-800 flex items-center justify-center shrink-0 mt-0.5 font-bold text-[10px]" aria-hidden="true">
                      PF
                    </div>
                    <div className="bg-white border border-teal-100 rounded-2xl rounded-tl-xs p-3.5 shadow-2xs text-zinc-900 space-y-2 max-w-[88%] leading-relaxed">
                      <p className="text-xs sm:text-sm text-zinc-800">{item.answer}</p>
                      <div className="text-[10px] text-zinc-500 font-mono border-t border-slate-100 pt-1.5">
                        Ref: {item.officialRef}
                      </div>
                    </div>
                  </div>
                </div>
              ))}

              {/* FAQ Questions List */}
              <div className="pt-2 space-y-2">
                <div className="text-[11px] font-semibold uppercase tracking-wider text-zinc-500">
                  {locale === "hi" ? "प्रमुख विषय:" : "Common Topics:"}
                </div>
                <div className="flex flex-col gap-2">
                  {faqData.map((faq) => (
                    <button
                      key={faq.id}
                      type="button"
                      onClick={() => handleSelectQuestion(faq)}
                      className={cn(
                        "text-left p-2.5 rounded-xl border text-xs sm:text-sm font-medium transition-all flex items-center justify-between gap-2 cursor-pointer focus:ring-2 focus:ring-teal-600 focus:outline-none",
                        selectedFAQ?.id === faq.id
                          ? "bg-teal-50 border-teal-300 text-teal-950 shadow-2xs font-semibold"
                          : "bg-white border-slate-200 text-zinc-800 hover:bg-slate-100 hover:border-slate-300"
                      )}
                    >
                      <span className="flex items-center gap-2">
                        <span className="text-teal-700 font-bold" aria-hidden="true">•</span>
                        <span>{faq.question}</span>
                      </span>
                      <ChevronRight className="w-3.5 h-3.5 text-zinc-400 shrink-0" aria-hidden="true" />
                    </button>
                  ))}
                </div>
              </div>
            </CardContent>

            {/* Footer with escalation link */}
            <div className="bg-slate-100 px-4 py-2.5 border-t border-slate-200 flex items-center justify-between text-[11px] text-zinc-600 shrink-0">
              <span>{locale === "hi" ? "अन्य प्रश्न हैं?" : "Still have questions?"}</span>
              <Link
                href="/contact"
                onClick={handleClose}
                className="font-semibold text-teal-700 hover:text-teal-900 inline-flex items-center gap-1"
              >
                <LifeBuoy className="w-3 h-3" aria-hidden="true" /> {locale === "hi" ? "संपर्क करें" : "Contact Support"}
              </Link>
            </div>
          </Card>
        </div>
      )}
    </aside>
  );
}
