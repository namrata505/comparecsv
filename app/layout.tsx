import Script from "next/script";
import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import SiteHeader from "@/components/SiteHeader";
import SiteFooter from "@/components/SiteFooter";
import { ClerkProvider } from "@clerk/nextjs";


<Script
  async
  strategy="afterInteractive"
  src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-2947992394825647"
  crossOrigin="anonymous"
/>

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "CompareCSV",

  description:
    "AI Data Analysis and Story Telling Platform",

  keywords: [
    "CSV compare",
    "Excel compare",
    "compare csv online",
    "xlsx compare",
    "online vlookup",
    "csv duplicate finder",
  ],

  openGraph: {
    title: "CompareCSV",
    description:
      "Compare CSV and Excel files online instantly.",
    url: "https://comparecsv.org",
    siteName: "CompareCSV",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider>
      <html lang="en">
        <body>{children}</body>
      </html>
    </ClerkProvider>   
  );
}

