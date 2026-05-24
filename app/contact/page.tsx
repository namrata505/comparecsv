"use client";

import { useState } from "react";

export default function ContactPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState("");

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    setLoading(true);
    setStatus("");

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name, email, message }),
      });

      const data = await res.json();

      if (res.ok) {
        setStatus("Message sent successfully.");
        setName("");
        setEmail("");
        setMessage("");
      } else {
        setStatus(data.error || "Something went wrong.");
      }
    } catch {
      setStatus("Failed to send message.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="min-h-screen bg-slate-950 text-white">
      <section className="max-w-5xl mx-auto px-6 py-24">
        <div className="inline-flex items-center rounded-full border border-cyan-400/20 bg-cyan-400/10 px-4 py-2 text-cyan-300 text-sm mb-8">
          Contact CompareCSV
        </div>

        <h1 className="text-5xl md:text-6xl font-bold leading-tight mb-10">
          Get in Touch
          <span className="block text-cyan-400 mt-2">
            We’d Love to Hear From You
          </span>
        </h1>

        <div className="space-y-8 text-slate-300 text-lg leading-8">
          <p>
            CompareCSV helps users analyze, compare, and transform spreadsheet
            data using AI-powered workflows.
          </p>

          <p>
            Contact us for support, feedback, bug reports, feature requests,
            business inquiries, or partnership opportunities.
          </p>
        </div>
      </section>

      <section className="max-w-6xl mx-auto px-6 pb-24">
        <div className="grid md:grid-cols-2 gap-8">
          <div className="rounded-[32px] border border-white/10 bg-white/5 p-10">
            <h2 className="text-3xl font-bold mb-6">General Inquiries</h2>

            <p className="text-slate-300 text-lg leading-8 mb-6">
              For questions, support, or feedback:
            </p>

            <div className="rounded-2xl bg-black/30 p-5 text-cyan-300 text-lg break-all">
              support@comparecsv.org
            </div>
          </div>

          <div className="rounded-[32px] border border-white/10 bg-white/5 p-10">
            <h2 className="text-3xl font-bold mb-6">
              Business & Partnerships
            </h2>

            <p className="text-slate-300 text-lg leading-8 mb-6">
              For collaborations, integrations, or advertising:
            </p>

            <div className="rounded-2xl bg-black/30 p-5 text-cyan-300 text-lg break-all">
              business@comparecsv.org
            </div>
          </div>
        </div>
      </section>

      <section className="max-w-5xl mx-auto px-6 pb-24">
        <div className="rounded-[32px] border border-cyan-400/20 bg-cyan-500/10 p-12">
          <h2 className="text-4xl font-bold mb-8">Send Us a Message</h2>

          <form onSubmit={handleSubmit} className="space-y-6">
            <input
              type="text"
              placeholder="Your Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full rounded-2xl border border-white/10 bg-slate-900 p-5 outline-none text-white placeholder:text-slate-500"
              required
            />

            <input
              type="email"
              placeholder="Your Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full rounded-2xl border border-white/10 bg-slate-900 p-5 outline-none text-white placeholder:text-slate-500"
              required
            />

            <textarea
              placeholder="Your Message"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              className="w-full h-44 rounded-2xl border border-white/10 bg-slate-900 p-5 outline-none text-white placeholder:text-slate-500"
              required
            />

            <button
              type="submit"
              disabled={loading}
              className="rounded-2xl bg-cyan-500 hover:bg-cyan-400 disabled:opacity-60 transition px-8 py-4 text-black font-semibold"
            >
              {loading ? "Sending..." : "Send Message"}
            </button>

            {status && <p className="text-cyan-300">{status}</p>}
          </form>
        </div>
      </section>

      <section className="max-w-6xl mx-auto px-6 pb-24">
        <div className="rounded-[32px] border border-white/10 bg-white/5 p-12">
          <h2 className="text-4xl font-bold mb-10">
            Frequently Asked Questions
          </h2>

          <div className="space-y-8">
            <div>
              <h3 className="text-2xl font-semibold mb-3">
                What file formats are supported?
              </h3>
              <p className="text-slate-400 leading-7">
                CompareCSV currently supports CSV, XLSX, and Excel spreadsheet
                uploads.
              </p>
            </div>

            <div>
              <h3 className="text-2xl font-semibold mb-3">
                Can I request new features?
              </h3>
              <p className="text-slate-400 leading-7">
                Yes. We welcome feature suggestions and feedback.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="max-w-5xl mx-auto px-6 pb-32 text-center">
        <h2 className="text-4xl md:text-5xl font-bold leading-tight mb-8">
          Start Analyzing Spreadsheet Data
          <span className="block text-cyan-400 mt-2">
            With AI-Powered Insights
          </span>
        </h2>

        <a
          href="/analyze"
          className="inline-flex items-center justify-center rounded-2xl bg-cyan-500 hover:bg-cyan-400 transition px-8 py-4 text-black font-semibold"
        >
          Open AI Analyzer
        </a>
      </section>
    </main>
  );
}