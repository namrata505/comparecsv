import FileUpload from "@/components/FileUpload";
export default function Home() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 text-white">

      {/* Header */}
      <header className="border-b border-white/10 backdrop-blur-md">
        <div className="max-w-7xl mx-auto px-6 py-5 flex items-center justify-between">
          <h1 className="text-2xl font-bold tracking-tight">
            CompareCSV
          </h1>

          <h1 style={{ color: "red", fontSize: "40px" }}>
            DEPLOY TEST 999
          </h1>

          <button className="bg-cyan-500 hover:bg-cyan-400 transition px-5 py-2 rounded-xl font-medium">
            Compare Files
          </button>
        </div>
      </header>

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
        </div>

      </section>

      {/* Features */}
      <section className="max-w-7xl mx-auto px-6 pb-24">

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

          <div className="rounded-3xl border border-white/10 bg-white/5 p-8 backdrop-blur-md">
            <h3 className="text-2xl font-semibold mb-4">
              CSV & XLSX Support
            </h3>

            <p className="text-slate-300 leading-relaxed">
              Upload and compare both CSV and Excel files with a modern drag-and-drop interface.
            </p>
          </div>

          <div className="rounded-3xl border border-white/10 bg-white/5 p-8 backdrop-blur-md">
            <h3 className="text-2xl font-semibold mb-4">
              Smart Comparison
            </h3>

            <p className="text-slate-300 leading-relaxed">
              Compare rows, detect duplicates, find missing values, and merge datasets instantly.
            </p>
          </div>

          <div className="rounded-3xl border border-white/10 bg-white/5 p-8 backdrop-blur-md">
            <h3 className="text-2xl font-semibold mb-4">
              Export Results
            </h3>

            <p className="text-slate-300 leading-relaxed">
              Download processed comparison reports as CSV files with one click.
            </p>
          </div>

        </div>

      </section>

      {/* Footer */}
      <footer className="border-t border-white/10 py-10 text-center text-slate-400">
        © 2026 CompareCSV. All rights reserved.
      </footer>

      <footer className="border-t border-white/10 mt-20 py-10">

        <div className="max-w-7xl mx-auto px-6 flex flex-wrap gap-6 text-slate-400">

          <a href="/privacy-policy" className="hover:text-cyan-400">
            Privacy Policy
          </a>

          <a href="/terms" className="hover:text-cyan-400">
            Terms
          </a>

          <a href="/about" className="hover:text-cyan-400">
            About
          </a>

          <a href="/contact" className="hover:text-cyan-400">
            Contact
          </a>

        </div>

      </footer>

    {/* SEO Content Section */}

      <section className="max-w-7xl mx-auto px-6 py-24">

        <div className="max-w-5xl">

          <h2 className="text-4xl md:text-5xl font-bold mb-8">
            Compare CSV & Excel Files Online Instantly
          </h2>

          <div className="space-y-6 text-slate-300 leading-8 text-lg">

            <p>
              CompareCSV is a free online CSV and Excel comparison tool
              that helps users compare spreadsheets quickly and accurately.
            </p>

            <p>
              Upload CSV or XLSX files to detect duplicate rows,
              identify missing data, compare records like VLOOKUP,
              and export comparison results instantly.
            </p>

            <p>
              The tool works directly in your browser and supports
              fast spreadsheet comparison without requiring software installation.
            </p>

            <p>
              CompareCSV is useful for data analysts, HR teams,
              accountants, developers, researchers, and businesses
              working with spreadsheet datasets.
            </p>

          </div>

        </div>

      </section>

      {/* Features Section */}

      <section className="max-w-7xl mx-auto px-6 pb-24">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">

          <div className="rounded-3xl border border-white/10 bg-white/5 p-8">
            <h3 className="text-2xl font-semibold mb-4">
              CSV Comparison
            </h3>

            <p className="text-slate-400 leading-7">
              Compare two CSV files online and detect matched,
              missing, or changed records instantly.
            </p>
          </div>

          <div className="rounded-3xl border border-white/10 bg-white/5 p-8">
            <h3 className="text-2xl font-semibold mb-4">
              Excel File Support
            </h3>

            <p className="text-slate-400 leading-7">
              Upload Excel XLSX spreadsheets and compare rows
              without needing Microsoft Excel.
            </p>
          </div>

          <div className="rounded-3xl border border-white/10 bg-white/5 p-8">
            <h3 className="text-2xl font-semibold mb-4">
              Duplicate Detection
            </h3>

            <p className="text-slate-400 leading-7">
              Automatically detect duplicate entries,
              repeated IDs, and matching rows.
            </p>
          </div>

          <div className="rounded-3xl border border-white/10 bg-white/5 p-8">
            <h3 className="text-2xl font-semibold mb-4">
              Missing Row Finder
            </h3>

            <p className="text-slate-400 leading-7">
              Identify rows missing between spreadsheets
              for audits and reconciliation.
            </p>
          </div>

          <div className="rounded-3xl border border-white/10 bg-white/5 p-8">
            <h3 className="text-2xl font-semibold mb-4">
              Export Results
            </h3>

            <p className="text-slate-400 leading-7">
              Download comparison results in CSV format
              for reporting and analysis.
            </p>
          </div>

          <div className="rounded-3xl border border-white/10 bg-white/5 p-8">
            <h3 className="text-2xl font-semibold mb-4">
              Fast & Secure
            </h3>

            <p className="text-slate-400 leading-7">
              Files are processed quickly with a modern,
              privacy-focused interface.
            </p>
          </div>

        </div>

      </section>

      {/* FAQ Section */}

      <section className="max-w-7xl mx-auto px-6 pb-24">
         <div className="max-w-5xl">

          <h2 className="text-4xl md:text-5xl font-bold mb-12">
            Frequently Asked Questions
          </h2>

          <div className="space-y-6">

            <div className="rounded-3xl border border-white/10 bg-white/5 p-8">
              <h3 className="text-2xl font-semibold mb-4">
                How do I compare two CSV files online?
              </h3>

              <p className="text-slate-400 leading-7">
                Upload two CSV files into CompareCSV.
                The tool automatically compares rows,
                detects missing entries, duplicates,
                and generates downloadable results.
              </p>
            </div>

            <div className="rounded-3xl border border-white/10 bg-white/5 p-8">
              <h3 className="text-2xl font-semibold mb-4">
                Can I compare Excel files online?
              </h3>

              <p className="text-slate-400 leading-7">
                Yes. CompareCSV supports both CSV and XLSX Excel files.
              </p>
            </div>

            <div className="rounded-3xl border border-white/10 bg-white/5 p-8">
              <h3 className="text-2xl font-semibold mb-4">
                Is CompareCSV free?
              </h3>

              <p className="text-slate-400 leading-7">
                Yes. CompareCSV currently provides free spreadsheet
                comparison features online.
              </p>
            </div>

            <div className="rounded-3xl border border-white/10 bg-white/5 p-8">
              <h3 className="text-2xl font-semibold mb-4">
                Does CompareCSV store uploaded files?
              </h3>

              <p className="text-slate-400 leading-7">
                Uploaded files are processed temporarily for comparison purposes.
              </p>
            </div>

            <div className="rounded-3xl border border-white/10 bg-white/5 p-8">
              <h3 className="text-2xl font-semibold mb-4">
                Can I download comparison results?
              </h3>

              <p className="text-slate-400 leading-7">
                Yes. Comparison results can be exported and downloaded as CSV files.
              </p>
            </div>

          </div>

        </div>

      </section>

      {/* CTA Section */}

      <section className="max-w-7xl mx-auto px-6 pb-32">

        <div className="rounded-3xl border border-cyan-400/20 bg-cyan-500/10 p-12 text-center">

          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            Start Comparing CSV Files Now
          </h2>

          <p className="text-slate-300 text-lg max-w-3xl mx-auto leading-8 mb-8">
            Compare spreadsheets, detect duplicates,
            identify missing rows, and export results instantly.
          </p>

          <a
            href="#top"
            className="inline-flex items-center justify-center rounded-2xl bg-cyan-400 px-8 py-4 text-black font-semibold hover:scale-105 transition"
          >
            Compare Files
          </a>

        </div>

      </section>

    </main>
  );
}