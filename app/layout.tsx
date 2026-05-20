import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "CompareCSV - Compare CSV & Excel Files Online",

  description:
    "Free online tool to compare CSV and Excel files, detect duplicates, find missing rows, and export results instantly.",

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
