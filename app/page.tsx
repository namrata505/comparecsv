import Link from "next/link";
import {
  ArrowRight,
  CheckCircle2,
  Database,
  FileSpreadsheet,
  Shield,
  Sparkles,
  Zap,
} from "lucide-react";
export default function HomePage() {
  return (
    <main className="min-h-screen bg-slate-950 text-white overflow-hidden">

      {/* Background Glow */}
      <div className="absolute inset-0 -z-10 overflow-hidden">
        <div className="absolute top-0 left-1/2 h-[500px] w-[500px] -translate-x-1/2 rounded-full bg-cyan-500/10 blur-3xl" />
      </div>

      {/* Header */}
      <header className="sticky top-0 z-50 border-b border-white/10 bg-slate-950/80 backdrop-blur-xl">

        <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">

          <Link
            href="/"
            className="text-2xl font-bold tracking-tight"
          >
            CompareCSV
          </Link>

          <nav className="hidden md:flex items-center gap-8 text-sm text-slate-300">
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
            className="inline-flex items-center gap-2 rounded-2xl bg-cyan-500 hover:bg-cyan-400 transition px-5 py-3 font-semibold text-black shadow-lg shadow-cyan-500/20"
          >
            Start Analysis
            <ArrowRight size={18} />
          </Link>

        </div>

      </header>

      {/* Hero */}
      <section className="max-w-7xl mx-auto px-6 pt-24 pb-20">

        <div className="max-w-5xl mx-auto text-center">

          <div className="inline-flex items-center gap-2 rounded-full border border-cyan-400/20 bg-cyan-400/10 px-5 py-2 text-sm text-cyan-300 mb-8">
            <Sparkles size={16} />
            AI Spreadsheet Analysis Platform
          </div>

          <h1 className="text-5xl md:text-7xl font-bold tracking-tight leading-tight">
            Upload CSV & Excel Files
            <span className="block text-cyan-400 mt-2">
              Get AI Insights Instantly
            </span>
          </h1>

          <p className="mt-8 text-lg md:text-xl text-slate-300 leading-8 max-w-3xl mx-auto">
            Analyze spreadsheets, detect trends, compare datasets,
            generate charts, create blog-ready insights,
            and turn raw data into stories.
          </p>

          <div className="mt-12 flex flex-col sm:flex-row items-center justify-center gap-5">

            <Link
              href="/analyze"
              className="inline-flex items-center justify-center gap-2 rounded-2xl bg-cyan-500 hover:bg-cyan-400 transition px-8 py-5 text-lg font-semibold text-black shadow-xl shadow-cyan-500/20"
            >
              Start AI Analysis
              <ArrowRight size={20} />
            </Link>

            <Link
              href="/formulas"
              className="inline-flex items-center justify-center rounded-2xl border border-white/10 bg-white/5 hover:border-cyan-400/40 transition px-8 py-5 text-lg font-semibold"
            >
              Explore Excel Formulas
            </Link>

          </div>


          {/* Trust Row */}
          <div className="mt-14 flex flex-wrap items-center justify-center gap-6 text-sm text-slate-400">

            <div className="flex items-center gap-2">
              <CheckCircle2 size={16} className="text-cyan-400" />
              No Signup Required
            </div>

            <div className="flex items-center gap-2">
              <Shield size={16} className="text-cyan-400" />
              Secure File Processing
            </div>

            <div className="flex items-center gap-2">
              <Zap size={16} className="text-cyan-400" />
              Instant AI Insights
            </div>

          </div>

        </div>

      </section>


      {/* AI Content Generatorion Section */}
      <section className="max-w-7xl mx-auto px-6 py-20">

        <div className="rounded-[32px] border border-white/10 bg-white/5 p-12 text-center">

          <div className="inline-flex items-center rounded-full bg-cyan-500/10 border border-cyan-400/20 px-4 py-2 text-cyan-300 text-sm mb-8">
            AI Spreadsheet Intelligence
          </div>

          <h2 className="text-5xl font-bold leading-tight mb-8">
            Turn Spreadsheet Data Into
            <span className="block text-cyan-400">
              Charts, Reports & Content
            </span>
          </h2>

          <p className="text-slate-300 text-lg max-w-3xl mx-auto leading-8 mb-10">
            Upload CSV or Excel files and automatically generate
            visual insights, business reports, blog content,
            creator summaries, and analytics dashboards.
          </p>

          <a
            href="/analyze"
            className="inline-flex items-center justify-center rounded-2xl bg-cyan-500 hover:bg-cyan-400 transition px-8 py-4 text-black font-semibold"
          >
            Open AI Analyzer
          </a>

        </div>

      </section>


      {/* Ask AI */}
      <section className="max-w-7xl mx-auto px-6 py-24">

        <div className="grid lg:grid-cols-2 gap-12 items-center">

          <div>
            <div className="inline-flex items-center rounded-full border border-cyan-400/20 bg-cyan-400/10 px-4 py-2 text-cyan-300 text-sm mb-8">
              AI Spreadsheet Assistant
            </div>

            <h2 className="text-5xl font-bold leading-tight mb-8">

              Ask AI Questions

              <span className="block text-cyan-400 mt-2">
                About Your Spreadsheet
              </span>

            </h2>   

            <p className="text-slate-300 text-lg leading-8 mb-10">
              Upload CSV or Excel files and instantly generate
              AI-powered insights, reports, blog posts,
              YouTube scripts, business summaries,
              and chart explanations.
            </p>

            <Link
              href="/analyze"
              className="inline-flex items-center justify-center rounded-2xl bg-cyan-500 hover:bg-cyan-400 transition px-8 py-4 text-black font-semibold"
            >
              Try AI Analyzer
            </Link>

            </div>

            <div className="rounded-[32px] border border-white/10 bg-white/5 p-10 space-y-5">

              <div className="rounded-2xl bg-black/30 p-5 text-slate-300">
                “Generate a business report from this sales dataset”
              </div>

              <div className="rounded-2xl bg-black/30 p-5 text-slate-300">
                “Create YouTube talking points from this spreadsheet”
              </div>

              <div className="rounded-2xl bg-black/30 p-5 text-slate-300">
                “Find hidden trends in this CSV file”
              </div>

              <div className="rounded-2xl bg-cyan-500/10 border border-cyan-400/20 p-5 text-cyan-300">
                AI analysis generated successfully.
              </div>

            </div>

          </div>

        </section>
      



      {/* Features */}
      <section className="max-w-7xl mx-auto px-6 pb-24">

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">

          <div className="rounded-3xl border border-white/10 bg-white/5 p-8 backdrop-blur-xl">
            <Database className="text-cyan-400 mb-5" size={32} />

            <h3 className="text-2xl font-semibold mb-4">
              AI Data Insights
            </h3>

            <p className="text-slate-400 leading-7">
              Automatically detect patterns, trends,
              missing values, and important findings.
            </p>
          </div>

          <div className="rounded-3xl border border-white/10 bg-white/5 p-8 backdrop-blur-xl">
            <FileSpreadsheet className="text-cyan-400 mb-5" size={32} />

            <h3 className="text-2xl font-semibold mb-4">
              CSV & Excel Support
            </h3>

            <p className="text-slate-400 leading-7">
              Upload CSV, XLSX, and spreadsheet datasets
              directly in your browser.
            </p>
          </div>

          <div className="rounded-3xl border border-white/10 bg-white/5 p-8 backdrop-blur-xl">
            <Sparkles className="text-cyan-400 mb-5" size={32} />

            <h3 className="text-2xl font-semibold mb-4">
              Content Generation
            </h3>

            <p className="text-slate-400 leading-7">
              Generate blog insights, video talking points,
              and data storytelling summaries.
            </p>
          </div>

          <div className="rounded-3xl border border-white/10 bg-white/5 p-8 backdrop-blur-xl">
            <Zap className="text-cyan-400 mb-5" size={32} />

            <h3 className="text-2xl font-semibold mb-4">
              Fast Processing
            </h3>

            <p className="text-slate-400 leading-7">
              Analyze spreadsheets instantly with
              a modern high-performance interface.
            </p>
          </div>

        </div>

      </section>


      {/* SEO Section */}
      <section className="max-w-6xl mx-auto px-6 pb-24">

        <div className="rounded-[32px] border border-white/10 bg-white/5 p-10 md:p-14 backdrop-blur-xl">

          <h2 className="text-4xl md:text-5xl font-bold mb-8 leading-tight">
            What is CompareCSV?
          </h2>

          <div className="space-y-6 text-slate-300 text-lg leading-8">

            <p>
              CompareCSV is a modern AI-powered spreadsheet analysis platform
              that helps users upload CSV and Excel files,
              compare datasets, detect duplicates,
              identify missing rows, and generate intelligent insights instantly.
            </p>

            <p>
              The platform is designed for content creators,
              analysts, businesses, researchers, finance teams,
              HR professionals, and developers working with spreadsheet data.
            </p>

            <p>
              Users can transform spreadsheet data into
              charts, summaries, reports, blog-ready paragraphs,
              and video talking points without installing any software.
            </p>

          </div>

        </div>

      </section>


      {/* Use Cases */}
      <section className="max-w-7xl mx-auto px-6 pb-24">

        <div className="text-center mb-14">

          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            Popular Use Cases
          </h2>

          <p className="text-slate-400 text-lg max-w-3xl mx-auto">
            CompareCSV helps users analyze and transform spreadsheet data
            across multiple industries and workflows.
          </p>

        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">

          {[
            "YouTube Data Videos",
            "Business Reports",
            "Sales Analysis",
            "Finance Reconciliation",
            "HR Spreadsheet Analysis",
            "Market Research",
          ].map((item) => (
            <div
              key={item}
              className="rounded-3xl border border-white/10 bg-white/5 p-8 text-lg font-medium text-slate-300"
            >
              {item}
            </div>
          ))}

        </div>

      </section>


      {/* CTA */}
      <section className="max-w-6xl mx-auto px-6 pb-28">

        <div className="rounded-[36px] border border-cyan-400/20 bg-cyan-500/10 p-12 md:p-16 text-center backdrop-blur-xl">

          <h2 className="text-4xl md:text-6xl font-bold leading-tight mb-8">
            Turn Spreadsheet Data
            <span className="block text-cyan-400 mt-2">
              Into Insights & Stories
            </span>
          </h2>

          <p className="text-slate-300 text-lg leading-8 max-w-3xl mx-auto mb-10">
            Upload your CSV and Excel files to generate AI-powered analysis,
            charts, reports, and content-ready summaries instantly.
          </p>

          <Link
            href="/analyze"
            className="inline-flex items-center justify-center gap-2 rounded-2xl bg-cyan-400 hover:bg-cyan-300 transition px-10 py-5 text-lg font-semibold text-black shadow-xl shadow-cyan-500/20"
          >
            Launch AI Analyzer
            <ArrowRight size={20} />
          </Link>

        </div>

      </section>


      {/* Footer */}
      <footer className="border-t border-white/10 py-12">

        <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-6">

          <div className="text-slate-400 text-sm">
            © 2026 CompareCSV. All rights reserved.
          </div>

          <div className="flex flex-wrap items-center justify-center gap-6 text-sm text-slate-400">

            <Link href="/privacy-policy" className="hover:text-cyan-400 transition">
              Privacy Policy
            </Link>

            <Link href="/terms" className="hover:text-cyan-400 transition">
              Terms
            </Link>

            <Link href="/about" className="hover:text-cyan-400 transition">
              About
            </Link>

            <Link href="/contact" className="hover:text-cyan-400 transition">
              Contact
            </Link>

          </div>

        </div>

      </footer>

    </main>
  );
}