export default function AboutPage() {
  return (
    <main className="min-h-screen bg-slate-950 text-white">

      <section className="max-w-5xl mx-auto px-6 py-24">

        <div className="inline-flex items-center rounded-full border border-cyan-400/20 bg-cyan-400/10 px-4 py-2 text-cyan-300 text-sm mb-8">
          About CompareCSV
        </div>

        <h1 className="text-5xl md:text-6xl font-bold leading-tight mb-10">

          AI Spreadsheet Analysis
          <span className="block text-cyan-400 mt-2">
            Built for Modern Data Workflows
          </span>

        </h1>

        <div className="space-y-8 text-slate-300 text-lg leading-8">

          <p>
            CompareCSV is an AI-powered spreadsheet analysis platform
            designed to help users upload, compare, merge,
            analyze, and transform CSV and Excel datasets instantly.
          </p>

          <p>
            The platform helps businesses, analysts, content creators,
            researchers, finance teams, HR professionals,
            marketers, and developers generate intelligent insights
            from spreadsheet data without requiring advanced technical skills.
          </p>

          <p>
            Users can upload one or multiple CSV or Excel files,
            compare records using common columns,
            detect duplicates and missing rows,
            generate charts, and create AI-powered reports,
            summaries, blog content, and creator-ready insights.
          </p>

          <p>
            CompareCSV combines spreadsheet processing,
            data visualization, AI analysis,
            and content generation into a single modern workflow.
          </p>

        </div>

      </section>

      {/* Mission Section */}

      <section className="max-w-6xl mx-auto px-6 pb-24">

        <div className="rounded-[32px] border border-white/10 bg-white/5 p-12">

          <h2 className="text-4xl font-bold mb-8">
            Our Mission
          </h2>

          <div className="space-y-6 text-slate-300 text-lg leading-8">

            <p>
              Our mission is to simplify spreadsheet analysis
              and make data insights accessible to everyone.
            </p>

            <p>
              Traditional spreadsheet workflows are often slow,
              repetitive, and difficult to scale.
              CompareCSV helps users automate analysis,
              discover trends, and transform raw datasets
              into meaningful information instantly.
            </p>

            <p>
              We believe modern AI tools should help users
              understand data faster,
              communicate insights better,
              and create content more efficiently.
            </p>

          </div>

        </div>

      </section>

      {/* Features */}

      <section className="max-w-7xl mx-auto px-6 pb-24">

        <div className="text-center mb-14">

          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            What CompareCSV Offers
          </h2>

          <p className="text-slate-400 text-lg max-w-3xl mx-auto">
            A modern AI-powered toolkit for spreadsheet analysis,
            data comparison, and creator-focused workflows.
          </p>

        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">

          {[
            {
              title: "CSV & Excel Comparison",
              text: "Compare multiple spreadsheet files using common columns and detect differences instantly.",
            },
            {
              title: "AI Data Insights",
              text: "Generate intelligent summaries, business insights, and automated analysis from datasets.",
            },
            {
              title: "Charts & Visualization",
              text: "Transform spreadsheet data into charts and visual analytics dashboards.",
            },
            {
              title: "Content Generation",
              text: "Create blog paragraphs, reports, social media content, and creator-ready summaries.",
            },
            {
              title: "Formula Library",
              text: "Explore Excel formulas, examples, explanations, and spreadsheet workflows.",
            },
            {
              title: "Modern Browser-Based Workflow",
              text: "No software installation required. Everything works directly in your browser.",
            },
          ].map((item) => (

            <div
              key={item.title}
              className="rounded-3xl border border-white/10 bg-white/5 p-8"
            >

              <h3 className="text-2xl font-semibold mb-4">
                {item.title}
              </h3>

              <p className="text-slate-400 leading-7">
                {item.text}
              </p>

            </div>

          ))}

        </div>

      </section>

      {/* Use Cases */}

      <section className="max-w-6xl mx-auto px-6 pb-24">

        <div className="rounded-[32px] border border-cyan-400/20 bg-cyan-500/10 p-12">

          <h2 className="text-4xl font-bold mb-8">
            Who Uses CompareCSV?
          </h2>

          <div className="grid md:grid-cols-2 gap-6 text-slate-300 text-lg">

            <div className="space-y-4">

              <p>• Business analysts</p>
              <p>• Finance & accounting teams</p>
              <p>• HR & recruitment professionals</p>
              <p>• Data researchers</p>

            </div>

            <div className="space-y-4">

              <p>• Content creators & YouTubers</p>
              <p>• Marketing teams</p>
              <p>• Spreadsheet power users</p>
              <p>• Developers & startup teams</p>

            </div>

          </div>

        </div>

      </section>

      {/* Final CTA */}

      <section className="max-w-5xl mx-auto px-6 pb-32 text-center">

        <h2 className="text-4xl md:text-5xl font-bold leading-tight mb-8">

          Transform Spreadsheet Data
          <span className="block text-cyan-400 mt-2">
            Into Insights & Stories
          </span>

        </h2>

        <p className="text-slate-300 text-lg leading-8 max-w-3xl mx-auto mb-10">

          Upload CSV and Excel files,
          generate AI-powered analysis,
          compare datasets,
          create charts,
          and turn raw data into meaningful content.

        </p>

        <a
          href="/analyze"
          className="inline-flex items-center justify-center rounded-2xl bg-cyan-500 hover:bg-cyan-400 transition px-8 py-4 text-black font-semibold"
        >
          Start AI Analysis
        </a>

      </section>

    </main>
  );
}