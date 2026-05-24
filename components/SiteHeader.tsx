import Link from "next/link";
import { ArrowRight } from "lucide-react";

export default function SiteHeader() {
  return (
    <header className="sticky top-0 z-50 border-b border-white/10 bg-slate-950/80 backdrop-blur-xl">
      <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
        <Link href="/" className="text-2xl font-bold tracking-tight">
          CompareCSV
        </Link>

        <nav className="hidden md:flex items-center gap-8 text-sm text-slate-300">
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

        <Link
          href="/analyze"
          className="inline-flex items-center gap-2 rounded-2xl bg-cyan-500 hover:bg-cyan-400 transition px-5 py-3 font-semibold text-black"
        >
          Start Analysis
          <ArrowRight size={18} />
        </Link>
      </div>
    </header>
  );
}