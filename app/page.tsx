import FileUpload from "@/components/FileUpload";
import AdBanner from "@/components/AdBanner";

export default function Home() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 text-white">

      {/* Header */}
      <header className="border-b border-white/10 backdrop-blur-md">
        <div className="max-w-7xl mx-auto px-6 py-5 flex items-center justify-between">

          <h1 className="text-2xl font-bold tracking-tight">
            CompareCSV
          </h1>

          <nav className="hidden md:flex gap-6 text-sm text-slate-300">
            <a href="/privacy-policy">Privacy</a>
            <a href="/terms">Terms</a>
            <a href="/about">About</a>
            <a href="/contact">Contact</a>
          </nav>

          <button className="bg-cyan-500 hover:bg-cyan-400 transition px-5 py-2 rounded-xl font-medium">
            Compare Files
          </button>

        </div>
      </header>

      <AdBanner slot="1111111111" />

      {/* Hero Section */}
      <section className="max-w-7xl mx-auto px-6 pt-24 pb-20 text-center">

        <div className="inline-flex items-center rounded-full border border-cyan-400/20 bg-cyan-400/10 px-4 py-2 text-sm text-cyan-300 mb-8">
          CSV & Excel Comparison Tool
        </div>

        <h2 className="text-5xl md:text-7xl font-bold leading-tight tracking-tight max-w-5xl mx-auto">
          Compare CSV & Excel Files
          <span className="block text-cyan-400">
            Instantly Online
          </span>
        </h2>

        <p className="mt-8 text-lg text-slate-300 max-w-2xl mx-auto leading-relaxed">
          Upload CSV or Excel files, compare rows like Excel VLOOKUP,
          find duplicates, detect missing values, and download results instantly.
        </p>

        <div className="mt-12 flex flex-col sm:flex-row gap-4 justify-center">

          <button className="bg-cyan-500 hover:bg-cyan-400 transition px-8 py-4 rounded-2xl font-semibold text-lg shadow-lg shadow-cyan-500/20">
            Start Comparing
          </button>

          <button className="border border-white/10 hover:border-cyan-400/40 transition px-8 py-4 rounded-2xl font-semibold text-lg bg-white/5">
            Learn More
          </button>

        </div>

        <div className="mt-20 max-w-4xl mx-auto">
          <FileUpload />
          <AdBanner slot="2222222222" />
        </div>

      </section>

      <section className="max-w-5xl mx-auto px-6 py-16 text-gray-700">
        <h2 className="text-3xl font-bold text-white mb-4">
          What is CompareCSV?
        </h2>

        <p className="mb-4 text-slate-300">
          CompareCSV is a free online tool that allows users to compare CSV and Excel (XLSX) files instantly. It helps detect differences, missing rows, duplicates, and mismatched data without installing any software.
        </p>

        <p className="mb-4 text-slate-400">
          The tool is widely used in data analysis, HR management, finance reconciliation, inventory tracking, and database validation tasks.
        </p>

        <p className="text-slate-300">
          Simply upload two files, compare them, and download the results in CSV format.
        </p>
      </section>

      <a
        href="/formulas"
        className="hover:text-cyan-400 transition"
      >
        Formula Library
      </a>
      {/* Features */}
      <section className="max-w-7xl mx-auto px-6 pb-24">

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

          <div className="rounded-3xl border border-white/10 bg-white/5 p-8">
            <h3 className="text-2xl font-semibold mb-4">CSV & XLSX Support</h3>
            <p className="text-slate-300 leading-relaxed">
              Upload and compare CSV and Excel files with drag-and-drop interface.
            </p>
          </div>

          <div className="rounded-3xl border border-white/10 bg-white/5 p-8">
            <h3 className="text-2xl font-semibold mb-4">Smart Comparison</h3>
            <p className="text-slate-300 leading-relaxed">
              Detect duplicates, missing values, and differences instantly.
            </p>
          </div>

          <div className="rounded-3xl border border-white/10 bg-white/5 p-8">
            <h3 className="text-2xl font-semibold mb-4">Export Results</h3>
            <p className="text-slate-300 leading-relaxed">
              Download comparison results as CSV files.
            </p>
          </div>

        </div>

      </section>

      {/* Trust */}
      <section className="max-w-6xl mx-auto px-6 py-10 grid md:grid-cols-3 gap-6 text-center">
          <div>
            <h3 className="font-semibold">Free to Use</h3>
            <p className="text-sm text-gray-600">No signup required</p>
          </div>

          <div>
            <h3 className="font-semibold">Secure Processing</h3>
            <p className="text-sm text-gray-600">Files processed in browser</p>
          </div>

          <div>
            <h3 className="font-semibold">Fast Results</h3>
            <p className="text-sm text-gray-600">Instant comparison output</p>
          </div>
        </section>

      {/* SEO Content */}
      <section className="max-w-7xl mx-auto px-6 py-24 border-t border-white/10">

        <div className="max-w-5xl">

          <h2 className="text-4xl font-bold mb-6">
            Online CSV and Excel Comparison Tool
          </h2>

          <p className="text-slate-300 leading-7 mb-4">
            CompareCSV helps users compare spreadsheets online without installing Excel.
            Upload CSV or XLSX files and instantly detect differences, duplicates, and missing data.
          </p>

          <AdBanner slot="3333333333" />

          <p className="text-slate-300 leading-7">
            Used for HR, finance, inventory, and data analysis workflows.
          </p>

        </div>

      </section>

      {/* FAQ */}
      <section className="max-w-7xl mx-auto px-6 pb-24">

        <div className="max-w-5xl">

          <h2 className="text-4xl font-bold mb-12">
            Frequently Asked Questions
          </h2>

          <div className="space-y-6">

            <div className="rounded-3xl border border-white/10 bg-white/5 p-8">
              <h3 className="text-2xl font-semibold mb-4">How do I compare CSV files?</h3>
              <p className="text-slate-300">Upload files and CompareCSV will detect differences automatically.</p>
            </div>

            <div className="rounded-3xl border border-white/10 bg-white/5 p-8">
              <h3 className="text-2xl font-semibold mb-4">Is it free?</h3>
              <p className="text-slate-300">Yes, CompareCSV is completely free to use.</p>
            </div>

          </div>

        </div>

      </section>

      {/* CTA */}
      <section className="max-w-7xl mx-auto px-6 pb-32">

        <div className="rounded-3xl border border-cyan-400/20 bg-cyan-500/10 p-12 text-center">

          <h2 className="text-4xl font-bold mb-6">
            Start Comparing Now
          </h2>

          <p className="text-slate-300 mb-8">
            Compare CSV and Excel files instantly with professional accuracy.
          </p>

          <a
            href="#"
            className="inline-flex bg-cyan-400 text-black px-8 py-4 rounded-2xl font-semibold"
          >
            Compare Files
          </a>

        </div>

      </section>

      {/* SINGLE FOOTER */}
      <footer className="border-t border-white/10 py-10 text-center text-slate-400">
        © 2026 CompareCSV. All rights reserved.
      </footer>

    </main>
  );
}