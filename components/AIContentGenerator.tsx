"use client";

import { useMemo, useState } from "react";

interface Props {
  rows: any[];
  headers: string[];
}

export default function AIContentGenerator({
  rows,
  headers,
}: Props) {

  const [prompt, setPrompt] = useState("");
  const [mode, setMode] = useState("Insights");
  const [loading, setLoading] = useState(false);
  const [aiResult, setAiResult] = useState("");

  const insights = useMemo(() => {
    if (!rows.length) return null;

    const totalRows = rows.length;
    const totalColumns = headers.length;

    const numericColumns = headers.filter((header) => {
      return rows.some((row) => !isNaN(Number(row[header])));
    });

    const textColumns = headers.filter(
      (header) => !numericColumns.includes(header)
    );

    return {
      totalRows,
      totalColumns,
      numericColumns,
      textColumns,
    };
  }, [rows, headers]);

  const handleAIAnalysis = async () => {
    if (!rows.length) return;

    try {
      setLoading(true);

      setAiResult("");

      const response = await fetch("/api/analyze", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          prompt,
          rows,
          headers,
          mode,
        }),
      });

      const data = await response.json();

      setAiResult(data.result);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  if (!insights) return null;

  return (
    <section className="mt-20 space-y-10">

      {/* Heading */}
      <div>
        <h2 className="text-4xl font-bold mb-4">
          AI Content Generator
        </h2>

        <p className="text-slate-400 text-lg">
          Generate AI-powered insights, reports,
          blog content, and creator workflows
          from spreadsheet data.
        </p>
      </div>

      {/* AI Modes */}
      <div className="flex flex-wrap gap-4">

        {[
          "Insights",
          "Blog",
          "YouTube",
          "LinkedIn",
          "Report",
          "SEO Article",
        ].map((item) => (

          <button
            key={item}
            onClick={() => setMode(item)}
            className={`rounded-2xl px-5 py-3 font-medium transition ${
              mode === item
                ? "bg-cyan-500 text-black"
                : "border border-white/10 bg-white/5 hover:border-cyan-400/40 text-white"
            }`}
          >
            {item}
          </button>

        ))}

      </div>

      {/* AI Prompt */}
      <div className="rounded-3xl border border-white/10 bg-white/5 p-8">

        <h3 className="text-2xl font-semibold mb-6">
          Ask AI About Your Spreadsheet
        </h3>

        <textarea
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          placeholder="Example: Generate insights from this sales dataset..."
          className="w-full h-40 rounded-2xl border border-white/10 bg-black/30 p-6 outline-none text-slate-200"
        />

        <button
          onClick={handleAIAnalysis}
          disabled={loading}
          className="mt-6 rounded-2xl bg-cyan-500 hover:bg-cyan-400 transition px-8 py-4 font-semibold text-black"
        >
          {loading ? "Analyzing..." : "Generate AI Analysis"}
        </button>

      </div>

      {/* AI Output */}
      {aiResult && (

        <div className="rounded-3xl border border-cyan-400/20 bg-cyan-500/10 p-8">

          <div className="flex items-center justify-between mb-6">

            <h3 className="text-3xl font-bold">
              AI Generated Output
            </h3>

            <div className="rounded-full bg-cyan-400/20 px-4 py-2 text-sm text-cyan-300">
              {mode}
            </div>

          </div>

          <div className="whitespace-pre-wrap text-slate-200 leading-8 text-lg">
            {aiResult}
          </div>

        </div>

      )}

      {/* Executive Summary */}
      <div className="rounded-3xl border border-white/10 bg-white/5 p-8">

        <h3 className="text-2xl font-semibold mb-6">
          Executive Summary
        </h3>

        <div className="space-y-5 text-slate-300 leading-8 text-lg">

          <p>
            The uploaded dataset contains approximately
            <span className="text-cyan-400 font-semibold">
              {` ${insights.totalRows} `}
            </span>
            rows and
            <span className="text-cyan-400 font-semibold">
              {` ${insights.totalColumns} `}
            </span>
            columns.
          </p>

          <p>
            The spreadsheet includes structured information suitable
            for business intelligence, analytics,
            reporting, and creator workflows.
          </p>

          <p>
            Numeric columns can be used for charts,
            forecasting, comparisons,
            and automated insights generation.
          </p>

        </div>

      </div>

      {/* Blog Content */}
      <div className="rounded-3xl border border-white/10 bg-white/5 p-8">

        <h3 className="text-2xl font-semibold mb-6">
          AI Blog Paragraph
        </h3>

        <div className="rounded-2xl bg-black/30 p-6 text-slate-300 leading-8 text-lg">

          <p>
            Recent spreadsheet analysis performed using CompareCSV
            revealed multiple patterns and structured insights
            within the uploaded dataset.
          </p>

          <p className="mt-5">
            Automated AI analysis helps users transform raw spreadsheet
            data into readable business intelligence,
            reports, creator content,
            and visual storytelling assets.
          </p>

        </div>

      </div>

      {/* YouTube Script */}
      <div className="rounded-3xl border border-white/10 bg-white/5 p-8">

        <h3 className="text-2xl font-semibold mb-6">
          YouTube Video Talking Points
        </h3>

        <div className="space-y-4 text-slate-300 leading-8">

          <div className="rounded-2xl bg-black/30 p-5">
            1. Explain what the dataset represents.
          </div>

          <div className="rounded-2xl bg-black/30 p-5">
            2. Highlight important patterns and trends.
          </div>

          <div className="rounded-2xl bg-black/30 p-5">
            3. Show spreadsheet charts and comparisons.
          </div>

          <div className="rounded-2xl bg-black/30 p-5">
            4. Discuss insights and conclusions.
          </div>

          <div className="rounded-2xl bg-black/30 p-5">
            5. Share predictions and recommendations.
          </div>

        </div>

      </div>

      {/* Social Content */}
      <div className="rounded-3xl border border-white/10 bg-white/5 p-8">

        <h3 className="text-2xl font-semibold mb-6">
          Social Media Caption
        </h3>

        <div className="rounded-2xl bg-black/30 p-6 text-slate-300 leading-8 text-lg">
          AI spreadsheet analysis revealed powerful trends and insights 📊
          Generated automatically using CompareCSV —
          including reports, summaries, and creator-ready analytics.
        </div>

      </div>

      {/* Dataset Stats */}
      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">

        <div className="rounded-3xl border border-white/10 bg-white/5 p-8 text-center">

          <div className="text-4xl font-bold text-cyan-400 mb-3">
            {insights.totalRows}
          </div>

          <div className="text-slate-400">
            Total Rows
          </div>

        </div>

        <div className="rounded-3xl border border-white/10 bg-white/5 p-8 text-center">

          <div className="text-4xl font-bold text-cyan-400 mb-3">
            {insights.totalColumns}
          </div>

          <div className="text-slate-400">
            Total Columns
          </div>

        </div>

        <div className="rounded-3xl border border-white/10 bg-white/5 p-8 text-center">

          <div className="text-4xl font-bold text-cyan-400 mb-3">
            {insights.numericColumns.length}
          </div>

          <div className="text-slate-400">
            Numeric Fields
          </div>

        </div>

        <div className="rounded-3xl border border-white/10 bg-white/5 p-8 text-center">

          <div className="text-4xl font-bold text-cyan-400 mb-3">
            {insights.textColumns.length}
          </div>

          <div className="text-slate-400">
            Text Fields
          </div>

        </div>

      </div>

    </section>
  );
}