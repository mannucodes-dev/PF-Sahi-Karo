"use client";

import React, { useState } from "react";
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
} from "lucide-react";
import { cn } from "@/lib/utils";

interface FAQItem {
  id: string;
  question: string;
  answer: string;
  tag: string;
}

const FAQ_DATA: FAQItem[] = [
  {
    id: "form-10c",
    question: "What is Form 10C?",
    tag: "Pension",
    answer:
      "Form 10C is used to withdraw your EPS (Employees' Pension Scheme) accumulated benefit or obtain a Scheme Certificate when leaving a job before completing 10 years of eligible pension service. If you have worked less than 10 years and are currently not employed in a covered establishment, you can submit Form 10C to claim your pension fund amount.",
  },
  {
    id: "uan-inactive",
    question: "Why is my UAN inactive?",
    tag: "Account",
    answer:
      "Your UAN (Universal Account Number) is usually marked inactive if it has never been activated on the Member Sewa portal or if mandatory KYC (Know Your Customer verification — Aadhaar & Bank details) hasn't been linked. To activate it, visit the Unified Member Portal, click 'Activate UAN', enter your Member ID or Aadhaar, and complete the OTP verification sent to your Aadhaar-linked mobile number.",
  },
  {
    id: "resubmit-timeline",
    question: "How long does a resubmission take?",
    tag: "Timeline",
    answer:
      "A resubmitted PF claim typically takes between 7 to 15 working days to process after your corrected details (like name spelling or KYC approval) reflect on the EPFO portal. Once the field office verifies the corrected documents, settlement funds are credited directly to your bank account via NEFT.",
  },
  {
    id: "missing-document",
    question: "What if I don't have the corrected document yet?",
    tag: "Documents",
    answer:
      "If you don't have the required document (like an updated Aadhaar or Joint Declaration form signed by your employer), don't submit a blind claim — it will trigger an immediate automatic rejection. First, obtain the corrected copy or ask your former employer's HR/PF department to upload the digital authorization. Once approved in the portal, resubmit your claim.",
  },
  {
    id: "partial-withdraw",
    question: "Can I withdraw partially instead?",
    tag: "Withdrawal",
    answer:
      "Yes! You can file an Advance PF Claim (Form 31) for specific approved reasons such as medical emergencies, illness, house construction, child's higher education, marriage, or pre-retirement without resigning. Partial withdrawals have simpler clearance criteria and don't require leaving employment.",
  },
];

export function FAQWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedFAQ, setSelectedFAQ] = useState<FAQItem | null>(null);
  const [chatHistory, setChatHistory] = useState<FAQItem[]>([]);

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

  return (
    <aside aria-label="EPFO Claim FAQ Assistant" className="fixed bottom-4 right-4 sm:bottom-6 sm:right-6 z-50">
      {/* Floating Toggle Button */}
      {!isOpen && (
        <button
          onClick={() => setIsOpen(true)}
          className="bg-teal-700 hover:bg-teal-800 text-white font-semibold px-4 py-3 rounded-full shadow-lg hover:shadow-xl flex items-center gap-2.5 transition-all duration-200 active:scale-95 cursor-pointer border border-teal-600"
          aria-label="Open EPFO Claim FAQ Assistant"
        >
          <div className="w-6 h-6 rounded-full bg-teal-800 flex items-center justify-center">
            <MessageCircleQuestion className="w-4 h-4 text-teal-200" />
          </div>
          <span className="text-xs sm:text-sm">Ask about your claim</span>
          <Badge className="bg-teal-900 text-teal-200 border-teal-700 text-[10px] px-1.5 py-0 font-mono">
            FAQ
          </Badge>
        </button>
      )}

      {/* Floating Chat Modal */}
      {isOpen && (
        <Card className="w-[calc(100vw-2rem)] sm:w-[420px] max-h-[580px] border-slate-200 bg-white shadow-2xl rounded-2xl flex flex-col overflow-hidden animate-in fade-in slide-in-from-bottom-4 duration-200">
          {/* Header */}
          <CardHeader className="bg-gradient-to-r from-teal-800 to-teal-950 text-white p-4 flex flex-row items-center justify-between shrink-0">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-xl bg-teal-700/80 border border-teal-600 flex items-center justify-center">
                <Bot className="w-4 h-4 text-teal-200" />
              </div>
              <div>
                <CardTitle className="text-sm font-bold tracking-tight text-white flex items-center gap-1.5">
                  EPFO Claim FAQ Assistant
                  <Sparkles className="w-3.5 h-3.5 text-teal-300" />
                </CardTitle>
                <p className="text-[11px] text-teal-200/80">
                  Rules-based instant guidance · Zero wait time
                </p>
              </div>
            </div>

            <div className="flex items-center gap-1">
              {chatHistory.length > 0 && (
                <button
                  onClick={handleReset}
                  className="text-teal-200 hover:text-white p-1.5 rounded-lg hover:bg-white/10 transition-colors"
                  title="Clear conversation"
                  aria-label="Reset conversation"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                </button>
              )}
              <button
                onClick={() => setIsOpen(false)}
                className="text-teal-200 hover:text-white p-1.5 rounded-lg hover:bg-white/10 transition-colors"
                title="Close FAQ"
                aria-label="Close FAQ modal"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          </CardHeader>

          {/* Body: Chat & Question Chips */}
          <CardContent className="p-4 overflow-y-auto space-y-4 flex-1 text-xs sm:text-sm bg-slate-50/50">
            {/* Intro Message */}
            <div className="flex items-start gap-2.5">
              <div className="w-6 h-6 rounded-full bg-teal-100 text-teal-800 flex items-center justify-center shrink-0 mt-0.5 font-bold text-[10px]">
                PF
              </div>
              <div className="bg-white border border-slate-200/80 rounded-2xl rounded-tl-xs p-3 shadow-2xs text-zinc-800 space-y-1 max-w-[85%]">
                <p className="font-medium">
                  Namaste! Have questions regarding EPFO claims, forms, or rejection terms?
                </p>
                <p className="text-zinc-500 text-[11px]">
                  Select any question below for a verified plain-English explanation:
                </p>
              </div>
            </div>

            {/* Conversation History */}
            {chatHistory.map((item) => (
              <div key={item.id} className="space-y-3">
                {/* User Bubble */}
                <div className="flex items-start justify-end gap-2">
                  <div className="bg-teal-700 text-white rounded-2xl rounded-tr-xs p-3 shadow-2xs max-w-[85%] font-medium">
                    {item.question}
                  </div>
                  <div className="w-6 h-6 rounded-full bg-slate-200 text-slate-700 flex items-center justify-center shrink-0 mt-0.5">
                    <User className="w-3.5 h-3.5" />
                  </div>
                </div>

                {/* Assistant Answer Bubble */}
                <div className="flex items-start gap-2.5">
                  <div className="w-6 h-6 rounded-full bg-teal-100 text-teal-800 flex items-center justify-center shrink-0 mt-0.5 font-bold text-[10px]">
                    PF
                  </div>
                  <div className="bg-white border border-teal-100 rounded-2xl rounded-tl-xs p-3.5 shadow-2xs text-zinc-900 space-y-2 max-w-[88%] leading-relaxed">
                    <div className="flex items-center gap-1.5 text-[10px] uppercase font-bold tracking-wider text-teal-700">
                      <Sparkles className="w-3 h-3" /> Plain-English Explanation
                    </div>
                    <p className="text-xs sm:text-sm text-zinc-800">{item.answer}</p>
                  </div>
                </div>
              </div>
            ))}

            {/* Question Chips */}
            <div className="pt-2 space-y-2">
              <div className="text-[11px] font-semibold uppercase tracking-wider text-zinc-400">
                Common Questions:
              </div>
              <div className="flex flex-col gap-2">
                {FAQ_DATA.map((faq) => (
                  <button
                    key={faq.id}
                    onClick={() => handleSelectQuestion(faq)}
                    className={cn(
                      "text-left p-2.5 rounded-xl border text-xs font-medium transition-all flex items-center justify-between gap-2 cursor-pointer",
                      selectedFAQ?.id === faq.id
                        ? "bg-teal-50 border-teal-300 text-teal-900 shadow-2xs"
                        : "bg-white border-slate-200 text-zinc-700 hover:bg-slate-100 hover:border-slate-300"
                    )}
                  >
                    <span className="flex items-center gap-2">
                      <span className="text-teal-600 font-bold">•</span>
                      <span>{faq.question}</span>
                    </span>
                    <ChevronRight className="w-3.5 h-3.5 text-zinc-400 shrink-0" />
                  </button>
                ))}
              </div>
            </div>
          </CardContent>

          {/* Footer Note */}
          <div className="bg-slate-100 px-4 py-2 border-t border-slate-200 text-[10px] text-zinc-500 text-center shrink-0">
            Rules-based offline assistant · No personal data stored
          </div>
        </Card>
      )}
    </aside>
  );
}
