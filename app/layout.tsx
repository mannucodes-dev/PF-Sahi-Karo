import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { LanguageProvider } from "@/lib/i18n/context";
import { SkipToContent } from "@/components/skip-to-content";
import { FAQWidget } from "@/components/faq-widget";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "PF Sahi Karo — EPFO Claim Rejection Decoder & Resolution Guidance",
  description:
    "An independent citizen service helping Indian workers understand EPFO Provident Fund rejection reasons in plain English and Hindi with verified correction steps.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col relative bg-slate-50 text-zinc-900 selection:bg-teal-100 selection:text-teal-900">
        <LanguageProvider>
          <SkipToContent />
          {children}
          <FAQWidget />
        </LanguageProvider>
      </body>
    </html>
  );
}
