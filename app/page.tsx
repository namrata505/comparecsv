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

    </main>
  );
}