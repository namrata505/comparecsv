"use client";

import { useState } from "react";

export default function PricingPage() {
  const [loading, setLoading] = useState(false);

  async function handleCheckout() {
    try {
      setLoading(true);

      const response = await fetch("/api/lemonsqueezy/checkout", {
        method: "POST",
      });

      const data = await response.json();

      if (data.url) {
        window.location.href = data.url;
      } else {
        alert("Checkout could not be created.");
      }
    } catch (error) {
      console.error(error);
      alert("Something went wrong.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="min-h-screen bg-slate-950 text-white">
      <section className="max-w-6xl mx-auto px-6 py-24 text-center">
        <div className="inline-flex items-center rounded-full border border-cyan-400/20 bg-cyan-400/10 px-4 py-2 text-cyan-300 text-sm mb-8">
          CompareCSV Pricing
        </div>

        <h1 className="text-5xl md:text-6xl font-bold leading-tight mb-8">
          Simple Pricing for
          <span className="block text-cyan-400 mt-2">
            AI Data Storytelling
          </span>
        </h1>

        <p className="text-slate-300 text-lg leading-8 max-w-3xl mx-auto">
          Start free and upgrade when you need more AI analysis, exports,
          reports, and advanced spreadsheet workflows.
        </p>
      </section>

      <section className="max-w-6xl mx-auto px-6 pb-32">
        <div className="grid md:grid-cols-2 gap-8">
          <div className="rounded-[32px] border border-white/10 bg-white/5 p-10">
            <h2 className="text-3xl font-bold mb-4">Free</h2>

            <p className="text-slate-400 mb-8">
              For trying CompareCSV and basic spreadsheet analysis.
            </p>

            <div className="text-5xl font-bold mb-8">
              $0
              <span className="text-lg text-slate-400 font-normal">
                /month
              </span>
            </div>

            <ul className="space-y-4 text-slate-300 text-left mb-10">
              <li>• CSV and Excel upload</li>
              <li>• Basic AI insights</li>
              <li>• Formula tools</li>
              <li>• Dataset preview</li>
              <li>• Basic charts</li>
            </ul>

            <a
              href="/analyze"
              className="inline-flex w-full justify-center rounded-2xl border border-white/10 bg-white/5 hover:border-cyan-400/40 px-6 py-4 font-semibold transition"
            >
              Start Free
            </a>
          </div>

          <div className="rounded-[32px] border border-cyan-400/30 bg-cyan-500/10 p-10">
            <h2 className="text-3xl font-bold mb-4">Pro</h2>

            <p className="text-slate-300 mb-8">
              For creators, analysts, businesses, and teams using AI reports.
            </p>

            <div className="text-5xl font-bold mb-8">
              $12
              <span className="text-lg text-slate-400 font-normal">
                /month
              </span>
            </div>

            <ul className="space-y-4 text-slate-300 text-left mb-10">
              <li>• Higher AI generation limits</li>
              <li>• Multi-file analysis</li>
              <li>• Advanced AI reports</li>
              <li>• PDF export later</li>
              <li>• Saved reports later</li>
              <li>• Priority features</li>
            </ul>

            <button
              onClick={handleCheckout}
              disabled={loading}
              className="inline-flex w-full justify-center rounded-2xl bg-cyan-500 hover:bg-cyan-400 disabled:opacity-60 px-6 py-4 font-semibold text-black transition"
            >
              {loading ? "Opening Checkout..." : "Upgrade to Pro"}
            </button>
          </div>
        </div>
      </section>
    </main>
  );
}