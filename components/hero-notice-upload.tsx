"use client";

import React, { useState, useRef } from "react";
import {
  FileUp,
  ShieldCheck,
  Sparkles,
  Loader2,
  CheckCircle2,
  FileText,
  Image as ImageIcon,
  ArrowDown,
  AlertTriangle,
  Download,
  Check,
} from "lucide-react";
import { cn } from "@/lib/utils";

interface SampleNotice {
  id: string;
  name: string;
  type: "Screenshot" | "PDF Notice" | "SMS Alert";
  code: string;
  officialRemark: string;
  filename: string;
  downloadUrl: string;
}

const SAMPLE_NOTICES: SampleNotice[] = [
  {
    id: "sample-1",
    name: "Aadhaar Name Mismatch",
    type: "Screenshot",
    code: "NAME_MISMATCH",
    officialRemark:
      "Claim Rejected - Name as per Aadhaar does not match EPFO records. Refer Circular No. HO/Compliance/2023.",
    filename: "EPFO_Portal_Rejection_Aadhaar_Mismatch.png",
    downloadUrl: "/sample_documents/EPFO_Portal_Rejection_Aadhaar_Mismatch.png",
  },
  {
    id: "sample-2",
    name: "KYC Signature Pending",
    type: "PDF Notice",
    code: "KYC_INCOMPLETE",
    officialRemark:
      "Claim Returned - KYC not verified. Digital signature pending from employer.",
    filename: "EPFO_Rejection_Notice_KYC_Pending.pdf",
    downloadUrl: "/sample_documents/EPFO_Rejection_Notice_KYC_Pending.pdf",
  },
  {
    id: "sample-3",
    name: "Bank Account / NEFT Error",
    type: "SMS Alert",
    code: "BANK_MISMATCH",
    officialRemark:
      "Claim Returned - NEFT failed. Bank account details invalid or account inactive.",
    filename: "EPFO_SMS_Rejection_Bank_NEFT_Failed.png",
    downloadUrl: "/sample_documents/EPFO_SMS_Rejection_Bank_NEFT_Failed.png",
  },
  {
    id: "sample-4",
    name: "Service Period Discrepancy",
    type: "PDF Notice",
    code: "SERVICE_PERIOD",
    officialRemark:
      "Claim Rejected - Minimum service period not met as per records.",
    filename: "EPFO_Rejection_Notice_Service_Period.pdf",
    downloadUrl: "/sample_documents/EPFO_Rejection_Notice_Service_Period.pdf",
  },
];

export function HeroNoticeUpload() {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [analyzingState, setAnalyzingState] = useState<
    "idle" | "uploading" | "ocr_scanning" | "decoded"
  >("idle");
  const [analyzedNotice, setAnalyzedNotice] = useState<SampleNotice | null>(null);
  const [uploadedFileName, setUploadedFileName] = useState<string>("");
  const [uploadedFileSize, setUploadedFileSize] = useState<string>("");
  const [showSamplesModal, setShowSamplesModal] = useState(false);

  const triggerDecoder = (code: string, officialText: string) => {
    if (typeof window !== "undefined") {
      window.dispatchEvent(
        new CustomEvent("pf-decode-remark", {
          detail: { code, officialText },
        })
      );

      const decoderEl = document.getElementById("instant-decoder");
      if (decoderEl) {
        setTimeout(() => {
          decoderEl.scrollIntoView({ behavior: "smooth", block: "start" });
        }, 700);
      }
    }
  };

  const determineNoticeFromFileName = (fileName: string): SampleNotice => {
    const lower = fileName.toLowerCase();
    if (lower.includes("kyc") || lower.includes("dsc") || lower.includes("signature")) {
      return SAMPLE_NOTICES[1];
    }
    if (lower.includes("bank") || lower.includes("neft") || lower.includes("ifsc") || lower.includes("cheque")) {
      return SAMPLE_NOTICES[2];
    }
    if (lower.includes("service") || lower.includes("exit") || lower.includes("period")) {
      return SAMPLE_NOTICES[3];
    }
    // Default to Name Mismatch
    return SAMPLE_NOTICES[0];
  };

  const processNoticeAnalysis = (notice: SampleNotice, customFilename?: string, fileSizeStr?: string) => {
    setUploadedFileName(customFilename || notice.filename);
    setUploadedFileSize(fileSizeStr || "42.5 KB");
    setAnalyzedNotice(notice);
    setAnalyzingState("uploading");

    setTimeout(() => {
      setAnalyzingState("ocr_scanning");
    }, 600);

    setTimeout(() => {
      setAnalyzingState("decoded");
      triggerDecoder(notice.code, notice.officialRemark);
    }, 1500);
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      const matched = determineNoticeFromFileName(file.name);
      const sizeStr = `${(file.size / 1024).toFixed(1)} KB`;
      processNoticeAnalysis(matched, file.name, sizeStr);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      const file = e.dataTransfer.files[0];
      const matched = determineNoticeFromFileName(file.name);
      const sizeStr = `${(file.size / 1024).toFixed(1)} KB`;
      processNoticeAnalysis(matched, file.name, sizeStr);
    }
  };

  return (
    <div className="bg-white rounded-2xl p-6 sm:p-7 shadow-[0_20px_50px_rgba(0,0,0,0.07)] border border-slate-200/90 relative text-center transition-all">
      {/* Floating Top-Right Shield Badge */}
      <div className="absolute -top-3.5 -right-3.5 w-11 h-11 bg-white rounded-full shadow-md border border-slate-100 flex items-center justify-center">
        <ShieldCheck className="w-6 h-6 text-emerald-600 stroke-[2.25]" />
      </div>

      {/* State 1: IDLE / READY TO UPLOAD */}
      {analyzingState === "idle" && (
        <div className="space-y-3.5">
          {/* Upload Dropzone */}
          <div
            onDragOver={(e) => {
              e.preventDefault();
              setIsDragging(true);
            }}
            onDragLeave={() => setIsDragging(false)}
            onDrop={handleDrop}
            onClick={() => fileInputRef.current?.click()}
            className={cn(
              "w-18 h-18 rounded-full flex items-center justify-center mx-auto mb-1 cursor-pointer transition-all border-2 border-dashed",
              isDragging
                ? "bg-teal-50 border-[#005f56] scale-105"
                : "bg-slate-100/90 border-slate-200 hover:bg-slate-200/80 hover:border-slate-400"
            )}
            title="Click or drag rejection notice here"
          >
            <FileUp className="w-8 h-8 text-slate-700 stroke-[1.75]" />
          </div>

          <div>
            <h2 className="text-xl sm:text-2xl font-bold text-slate-900 tracking-tight">
              Upload Notice
            </h2>
            <p className="text-xs sm:text-sm text-slate-500 leading-relaxed max-w-[270px] mx-auto mt-0.5">
              Upload PDF or Image of your EPFO rejection message for instant analysis.
            </p>
          </div>

          {/* Action Button & Hidden Input */}
          <div className="w-full space-y-2 pt-1">
            <input
              type="file"
              ref={fileInputRef}
              onChange={handleFileChange}
              className="sr-only"
              accept=".pdf,image/png,image/jpeg,image/webp,image/svg+xml"
              id="hero-notice-file-input"
            />

            <button
              type="button"
              onClick={() => fileInputRef.current?.click()}
              className="w-full bg-[#005953] hover:bg-[#004742] text-white py-3 px-4 rounded-lg font-bold text-sm flex items-center justify-center gap-2 shadow-sm cursor-pointer transition-colors"
            >
              <ImageIcon className="w-4 h-4 text-white" />
              <span>Select Notice File (PDF / Image)</span>
            </button>
          </div>

          {/* Mock Files for Demo Video */}
          <div className="pt-3 border-t border-slate-100 text-left">
            <div className="flex items-center justify-between mb-1.5">
              <span className="text-[11px] font-bold text-slate-700 uppercase tracking-wider flex items-center gap-1">
                <Sparkles className="w-3 h-3 text-[#005f56]" />
                <span>Test 1-Click Mock Notice:</span>
              </span>
              <button
                type="button"
                onClick={() => setShowSamplesModal(!showSamplesModal)}
                className="text-[10px] text-[#005f56] hover:underline font-bold flex items-center gap-0.5 cursor-pointer"
              >
                <Download className="w-3 h-3" />
                <span>Get Sample Files</span>
              </button>
            </div>

            <div className="space-y-1.5">
              {SAMPLE_NOTICES.slice(0, 3).map((sample) => (
                <button
                  key={sample.id}
                  type="button"
                  onClick={() => processNoticeAnalysis(sample)}
                  className="w-full p-2 rounded-lg bg-slate-50 hover:bg-teal-50/80 border border-slate-200/80 hover:border-teal-400 text-left transition-all flex items-center justify-between group cursor-pointer"
                >
                  <div className="flex items-center gap-2 min-w-0">
                    <FileText className="w-4 h-4 text-slate-500 group-hover:text-[#005f56] shrink-0" />
                    <div className="truncate">
                      <div className="text-xs font-semibold text-slate-900 group-hover:text-[#005f56] truncate">
                        {sample.name}
                      </div>
                      <div className="text-[10px] text-slate-500 font-mono">
                        {sample.type}
                      </div>
                    </div>
                  </div>
                  <span className="text-[11px] font-bold text-[#005f56] opacity-0 group-hover:opacity-100 transition-opacity shrink-0 ml-1">
                    Analyze →
                  </span>
                </button>
              ))}
            </div>

            {/* Collapsible Download Box for Demo Preparation */}
            {showSamplesModal && (
              <div className="mt-2.5 p-2.5 bg-teal-50/70 border border-teal-200 rounded-lg text-xs space-y-1.5 animate-in fade-in duration-200">
                <p className="font-bold text-teal-900 text-[11px]">
                  Download sample mock files to your computer for demo testing:
                </p>
                <div className="grid grid-cols-1 gap-1 pt-1">
                  {SAMPLE_NOTICES.map((s) => (
                    <a
                      key={s.id}
                      href={s.downloadUrl}
                      download={s.filename}
                      className="flex items-center justify-between text-[11px] text-[#005f56] hover:text-[#004742] bg-white p-1.5 rounded border border-teal-100 hover:border-teal-300 font-medium"
                    >
                      <span className="truncate">{s.filename}</span>
                      <Download className="w-3 h-3 shrink-0 ml-1 text-slate-600" />
                    </a>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      {/* State 2 & 3: SCANNING / OCR RECOGNITION */}
      {(analyzingState === "uploading" || analyzingState === "ocr_scanning") && (
        <div className="py-6 space-y-4 animate-in fade-in zoom-in-95 duration-200">
          <div className="w-14 h-14 rounded-full bg-teal-50 text-[#005f56] flex items-center justify-center mx-auto relative">
            <Loader2 className="w-7 h-7 animate-spin" />
            <div className="absolute inset-0 rounded-full border-2 border-teal-200 border-t-[#005f56] animate-spin" />
          </div>

          <div className="space-y-1">
            <h3 className="text-base sm:text-lg font-bold text-slate-900">
              {analyzingState === "uploading"
                ? "Reading Rejection Notice..."
                : "OCR Parsing EPFO Remark..."}
            </h3>
            <p className="text-xs text-slate-500 font-mono truncate max-w-[260px] mx-auto">
              {uploadedFileName} ({uploadedFileSize})
            </p>
          </div>

          <div className="w-full bg-slate-100 rounded-full h-2 overflow-hidden">
            <div
              className={cn(
                "bg-[#005f56] h-full transition-all duration-700 ease-out",
                analyzingState === "uploading" ? "w-1/2" : "w-11/12"
              )}
            />
          </div>

          <p className="text-[11px] text-slate-600 font-medium">
            Matching text patterns against official EPFO Master Circulars...
          </p>
        </div>
      )}

      {/* State 4: DECODED SUCCESS */}
      {analyzingState === "decoded" && analyzedNotice && (
        <div className="py-2 space-y-3.5 animate-in fade-in zoom-in-95 duration-300">
          <div className="w-10 h-10 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center mx-auto">
            <CheckCircle2 className="w-6 h-6" />
          </div>

          <div>
            <span className="inline-block bg-emerald-50 text-emerald-800 text-[10px] font-extrabold uppercase px-2.5 py-0.5 rounded-full border border-emerald-200 mb-1">
              Remark Identified
            </span>
            <h3 className="text-base sm:text-lg font-bold text-slate-900">
              {analyzedNotice.name}
            </h3>
            <p className="text-[11px] text-slate-500 font-mono truncate max-w-[240px] mx-auto">
              {uploadedFileName}
            </p>
          </div>

          <div className="p-2.5 bg-red-50/80 rounded-lg border border-red-200/70 text-left">
            <div className="text-[10px] font-bold text-red-800 uppercase tracking-wider mb-0.5">
              Extracted Raw Remark:
            </div>
            <p className="text-xs text-red-700 font-mono leading-relaxed line-clamp-3">
              &ldquo;{analyzedNotice.officialRemark}&rdquo;
            </p>
          </div>

          <div className="pt-1 flex flex-col gap-2">
            <a
              href="#instant-decoder"
              className="w-full bg-[#005c55] hover:bg-[#004742] text-white py-2.5 px-4 rounded-lg font-bold text-xs flex items-center justify-center gap-1.5 shadow-sm transition-all"
            >
              <span>View Full Resolution & HR Letter</span>
              <ArrowDown className="w-3.5 h-3.5" />
            </a>

            <button
              type="button"
              onClick={() => {
                setAnalyzingState("idle");
                setAnalyzedNotice(null);
              }}
              className="text-xs text-slate-600 hover:text-slate-900 font-semibold py-1 cursor-pointer"
            >
              Analyze another notice
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
