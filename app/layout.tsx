import type { Metadata } from "next";
import { Plus_Jakarta_Sans, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import { LanguageProvider } from "@/lib/i18n/context";
import { SkipToContent } from "@/components/skip-to-content";
import { ScrollToTop } from "@/components/scroll-to-top";
import { FAQWidget } from "@/components/faq-widget";
import { getServerLocale } from "@/lib/i18n/server";

const jakartaSans = Plus_Jakarta_Sans({
  variable: "--font-sans",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-mono",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "PF Sahi Karo — EPFO Claim Rejection Decoder & Resolution Guidance",
  description:
    "An independent citizen service helping Indian workers understand EPFO Provident Fund rejection reasons in plain English and Hindi with verified correction steps.",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const initialLocale = await getServerLocale();

  return (
    <html
      lang={initialLocale}
      className={`${jakartaSans.variable} ${jetbrainsMono.variable} h-full antialiased`}
    >
      <head>
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200"
        />
      </head>
      <body className="min-h-full flex flex-col relative bg-[#f7f9fb] text-[#191c1e] selection:bg-[#a3faef] selection:text-[#00201d] font-sans text-base">
        <LanguageProvider initialLocale={initialLocale}>
          <ScrollToTop />
          <SkipToContent />
          {children}
          <FAQWidget />
        </LanguageProvider>
      </body>
    </html>
  );
}
