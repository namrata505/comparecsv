import Link from "next/link";

export default function SiteFooter() {
  return (
    <footer className="border-t border-white/10 py-12 bg-slate-950 text-white">
      <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-6">
        <p className="text-slate-400 text-sm">
          © 2026 CompareCSV. All rights reserved.
        </p>

        <div className="flex flex-wrap items-center justify-center gap-6 text-sm text-slate-400">
          <Link href="/analyze" className="hover:text-cyan-400 transition">
          <Link href="/" className="hover:text-cyan-400 transition">
            Home
          </Link>
            AI Analyzer
          </Link>
          <Link href="/formulas" className="hover:text-cyan-400 transition">
            Formula Library
          </Link>
          <Link href="/about" className="hover:text-cyan-400 transition">
            About
          </Link>
          <Link href="/contact" className="hover:text-cyan-400 transition">
            Contact
          </Link>
          <Link href="/privacy-policy" className="hover:text-cyan-400 transition">
            Privacy Policy
          </Link>
          <Link href="/terms" className="hover:text-cyan-400 transition">
            Terms
          </Link>
        </div>
      </div>
    </footer>
  );
}