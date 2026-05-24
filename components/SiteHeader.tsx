"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { SignInButton, UserButton, useUser } from "@clerk/nextjs";

export default function SiteHeader() {
  const { isSignedIn } = useUser();

  return (
    <header className="sticky top-0 z-50 border-b border-white/10 bg-slate-950/80 backdrop-blur-xl">
      <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between gap-6">
        <div>
          <Link
            href="/"
            className="text-2xl font-bold tracking-tight text-white"
          >
            CompareCSV
          </Link>

          <p className="text-xs text-slate-400 mt-1">
            AI Data Analysis and Storytelling Platform
          </p>
        </div>

        <nav className="hidden md:flex items-center gap-8 text-sm text-slate-300">
          <Link href="/" className="hover:text-cyan-400 transition">
            Home
          </Link>

          <Link href="/analyze" className="hover:text-cyan-400 transition">
            AI Analyzer
          </Link>

          <Link href="/formulas" className="hover:text-cyan-400 transition">
            Formulas
          </Link>

          <Link href="/about" className="hover:text-cyan-400 transition">
            About
          </Link>

          <Link href="/contact" className="hover:text-cyan-400 transition">
            Contact
          </Link>
        </nav>

        <div className="flex items-center gap-3">
          {!isSignedIn && (
            <SignInButton mode="modal">
              <button className="rounded-2xl border border-white/10 bg-white/5 px-5 py-3 text-white font-semibold hover:border-cyan-400/40 transition">
                Sign In
              </button>
            </SignInButton>
          )}

          {isSignedIn && <UserButton />}

          <Link
            href="/analyze"
            className="hidden sm:inline-flex items-center gap-2 rounded-2xl bg-cyan-500 hover:bg-cyan-400 transition px-5 py-3 font-semibold text-black"
          >
            Start Analysis
            <ArrowRight size={18} />
          </Link>
        </div>
      </div>
    </header>
  );
}