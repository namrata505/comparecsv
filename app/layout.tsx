import Script from "next/script";
import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";


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
  title: "Compare CSV & Excel Files Online | Free VLOOKUP Tool",

  description:
    "CompareCSV is a free online tool to compare CSV and Excel files, find duplicates, missing rows, and export results instantly.",

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
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
