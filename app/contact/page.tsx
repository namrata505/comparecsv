export default function ContactPage() {
  return (
    <main className="min-h-screen bg-slate-950 text-white">

      <section className="max-w-5xl mx-auto px-6 py-24">

        <div className="inline-flex items-center rounded-full border border-cyan-400/20 bg-cyan-400/10 px-4 py-2 text-cyan-300 text-sm mb-8">
          Contact:Comparecsv-AI Storytelling Platform
        </div>

        <h1 className="text-5xl md:text-6xl font-bold leading-tight mb-10">

          Get in Touch
          <span className="block text-cyan-400 mt-2">
            We’d Love to Hear From You
          </span>

        </h1>

        <div className="space-y-8 text-slate-300 text-lg leading-8">

          <p>
            CompareCSV is continuously evolving to help users analyze,
            compare, and transform spreadsheet data using modern AI workflows.
          </p>

          <p>
            Whether you have questions, feedback,
            partnership opportunities, feature suggestions,
            bug reports, or business inquiries,
            we welcome your message.
          </p>

          <p>
            Our goal is to build a powerful and accessible
            AI spreadsheet analysis platform for creators,
            businesses, analysts, researchers,
            and spreadsheet users worldwide.
          </p>

        </div>

      </section>

      {/* Contact Cards */}

      <section className="max-w-6xl mx-auto px-6 pb-24">

        <div className="grid md:grid-cols-2 gap-8">

          <div className="rounded-[32px] border border-white/10 bg-white/5 p-10">

            <h2 className="text-3xl font-bold mb-6">
              General Inquiries
            </h2>

            <p className="text-slate-300 text-lg leading-8 mb-6">

              For general questions, feedback,
              or support requests, contact us at:

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

              For business inquiries, collaborations,
              partnerships, integrations,
              or advertising opportunities:

            </p>

            <div className="rounded-2xl bg-black/30 p-5 text-cyan-300 text-lg break-all">
              business@comparecsv.org
            </div>

          </div>

        </div>

      </section>

      {/* Contact Form */}

      <section className="max-w-5xl mx-auto px-6 pb-24">

        <div className="rounded-[32px] border border-cyan-400/20 bg-cyan-500/10 p-12">

          <h2 className="text-4xl font-bold mb-8">
            Send Us a Message
          </h2>

          <div className="space-y-6">

            <input
              type="text"
              placeholder="Your Name"
              className="w-full rounded-2xl border border-white/10 bg-slate-900 p-5 outline-none text-white placeholder:text-slate-500"
            />

            <input
              type="email"
              placeholder="Your Email"
              className="w-full rounded-2xl border border-white/10 bg-slate-900 p-5 outline-none text-white placeholder:text-slate-500"
            />

            <textarea
              placeholder="Your Message"
              className="w-full h-44 rounded-2xl border border-white/10 bg-slate-900 p-5 outline-none text-white placeholder:text-slate-500"
            />

            <button
              className="rounded-2xl bg-cyan-500 hover:bg-cyan-400 transition px-8 py-4 text-black font-semibold"
            >
              Send Message
            </button>

          </div>

        </div>

      </section>

      {/* FAQ */}

      <section className="max-w-6xl mx-auto px-6 pb-24">

        <div className="rounded-[32px] border border-white/10 bg-white/5 p-12">

          <h2 className="text-4xl font-bold mb-10">
            Frequently Asked Questions
          </h2>

          <div className="space-y-8">

            <div>

              <h3 className="text-2xl font-semibold mb-3">
                Does CompareCSV-AI Storytelling Platform store uploaded files?
              </h3>

              <p className="text-slate-400 leading-7">
                Uploaded files are processed temporarily for analysis workflows.
                We continuously work toward improving privacy,
                security, and browser-based processing capabilities.
              </p>

            </div>

            <div>

              <h3 className="text-2xl font-semibold mb-3">
                What file formats are supported?
              </h3>

              <p className="text-slate-400 leading-7">
                CompareCSV currently supports CSV, XLSX,
                and Excel spreadsheet uploads.
              </p>

            </div>

            <div>

              <h3 className="text-2xl font-semibold mb-3">
                Can I request new features?
              </h3>

              <p className="text-slate-400 leading-7">
                Yes. We actively welcome feature suggestions
                and user feedback to improve the platform.
              </p>

            </div>

          </div>

        </div>

      </section>

      {/* CTA */}

      <section className="max-w-5xl mx-auto px-6 pb-32 text-center">

        <h2 className="text-4xl md:text-5xl font-bold leading-tight mb-8">

          Start Analyzing Spreadsheet Data
          <span className="block text-cyan-400 mt-2">
            With AI-Powered Insights
          </span>

        </h2>

        <p className="text-slate-300 text-lg leading-8 max-w-3xl mx-auto mb-10">

          Upload CSV and Excel files,
          compare datasets,
          generate AI summaries,
          create charts,
          and transform raw spreadsheet data into meaningful insights.

        </p>

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