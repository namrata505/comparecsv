"use client";

import { useEffect, useMemo, useState } from "react";
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  PieChart,
  Pie,
  Cell,
  LineChart,
  Line,
  Legend,
} from "recharts";

type Props = {
  rows: any[];
  headers: string[];
};

type ChartItem = {
  type: "bar" | "pie" | "line";
  title: string;
  categoryColumn?: string;
  numericColumn?: string;
  dateColumn?: string;
  description: string;
};

type ChartPlan = {
  datasetTitle: string;
  datasetType: string;
  summary: string;
  categoryColumn: string;
  numericColumn: string;
  dateColumn: string;
  statusColumn: string;
  charts: ChartItem[];
  insights: string[];
};

const COLORS = [
  "#06b6d4",
  "#22c55e",
  "#f59e0b",
  "#8b5cf6",
  "#3b82f6",
  "#ef4444",
  "#14b8a6",
  "#eab308",
];

function isNumber(value: any) {
  return value !== "" && value !== null && value !== undefined && !isNaN(Number(value));
}

function buildBarData(rows: any[], categoryColumn: string, numericColumn: string) {
  const grouped: Record<string, number> = {};

  rows.forEach((row) => {
    const key = String(row[categoryColumn] || "Unknown");
    const value = Number(row[numericColumn] || 0);

    grouped[key] = (grouped[key] || 0) + value;
  });

  return Object.entries(grouped)
    .map(([name, value]) => ({ name: name.slice(0, 28), value }))
    .sort((a, b) => b.value - a.value)
    .slice(0, 12);
}

function buildPieData(rows: any[], categoryColumn: string) {
  const grouped: Record<string, number> = {};

  rows.forEach((row) => {
    const key = String(row[categoryColumn] || "Unknown");
    grouped[key] = (grouped[key] || 0) + 1;
  });

  return Object.entries(grouped)
    .map(([name, value]) => ({ name: name.slice(0, 28), value }))
    .sort((a, b) => b.value - a.value)
    .slice(0, 8);
}

function buildLineData(rows: any[], dateColumn: string, numericColumn: string) {
  const grouped: Record<string, number> = {};

  rows.forEach((row) => {
    const rawDate = row[dateColumn];

    if (!rawDate) return;

    const key = String(rawDate).slice(0, 10);
    const value = Number(row[numericColumn] || 0);

    grouped[key] = (grouped[key] || 0) + value;
  });

  return Object.entries(grouped)
    .map(([name, value]) => ({ name, value }))
    .sort((a, b) => a.name.localeCompare(b.name))
    .slice(0, 30);
}

function fallbackPlan(rows: any[], headers: string[]): ChartPlan {
  const numericColumn =
    headers.find((header) => rows.some((row) => isNumber(row[header]))) || "";

  const categoryColumn =
    headers.find((header) => header !== numericColumn) || headers[0] || "";

  return {
    datasetTitle: "Spreadsheet Dataset Analysis",
    datasetType: "general",
    summary:
      "This dataset has been analyzed using available columns. CompareCSV generated practical charts based on detected category and numeric fields.",
    categoryColumn,
    numericColumn,
    dateColumn: "",
    statusColumn: "",
    charts: [
      numericColumn && categoryColumn
        ? {
            type: "bar",
            title: `${numericColumn} by ${categoryColumn}`,
            categoryColumn,
            numericColumn,
            description:
              "This chart compares numeric values across categories to highlight the largest and smallest groups.",
          }
        : {
            type: "pie",
            title: `Distribution by ${categoryColumn}`,
            categoryColumn,
            description:
              "This chart shows how records are distributed across the selected category.",
          },
      {
        type: "pie",
        title: `Record Distribution by ${categoryColumn}`,
        categoryColumn,
        description:
          "This distribution helps understand which groups appear most often in the uploaded dataset.",
      },
    ].filter(Boolean) as ChartItem[],
    insights: [
      `The dataset contains ${rows.length} rows and ${headers.length} columns.`,
      numericColumn
        ? `The detected numeric column is ${numericColumn}.`
        : "No strong numeric column was detected.",
      categoryColumn
        ? `The detected category column is ${categoryColumn}.`
        : "No strong category column was detected.",
    ],
  };
}

export default function ChartsPanel({ rows, headers }: Props) {
  const [plan, setPlan] = useState<ChartPlan | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    async function generatePlan() {
      if (!rows.length || !headers.length) return;

      setLoading(true);
      setError("");

      try {
        const response = await fetch("/api/ai-chart-plan", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            rows,
            headers,
          }),
        });

        const data = await response.json();

        if (!response.ok) {
          throw new Error(data.error || "AI chart planning failed");
        }

        setPlan(data);
      } catch (err) {
        console.error(err);
        setError("AI chart planning failed. Showing fallback charts.");
        setPlan(fallbackPlan(rows, headers));
      } finally {
        setLoading(false);
      }
    }

    generatePlan();
  }, [rows, headers]);

  const chartData = useMemo(() => {
    if (!plan) return {};

    const data: Record<number, any[]> = {};

    plan.charts.forEach((chart, index) => {
      if (chart.type === "bar" && chart.categoryColumn && chart.numericColumn) {
        data[index] = buildBarData(rows, chart.categoryColumn, chart.numericColumn);
      }

      if (chart.type === "pie" && chart.categoryColumn) {
        data[index] = buildPieData(rows, chart.categoryColumn);
      }

      if (chart.type === "line" && chart.dateColumn && chart.numericColumn) {
        data[index] = buildLineData(rows, chart.dateColumn, chart.numericColumn);
      }
    });

    return data;
  }, [plan, rows]);

  if (!rows.length || !headers.length) return null;

  return (
    <section className="mt-20 space-y-10">
      <div>
        <h2 className="text-4xl font-bold mb-4">
          AI-Powered Chart Analysis
        </h2>

        <p className="text-slate-400 text-lg leading-8">
          CompareCSV uses AI to understand the uploaded dataset, detect its
          subject and scope, recommend relevant charts, and explain what each
          visualization means.
        </p>
      </div>

      {loading && (
        <div className="rounded-3xl border border-cyan-400/20 bg-cyan-500/10 p-8 text-cyan-300">
          AI is analyzing your dataset and preparing relevant charts...
        </div>
      )}

      {error && (
        <div className="rounded-3xl border border-yellow-400/20 bg-yellow-500/10 p-6 text-yellow-300">
          {error}
        </div>
      )}

      {plan && (
        <>
          <div className="rounded-[32px] border border-cyan-400/20 bg-cyan-500/10 p-10">
            <div className="inline-flex rounded-full border border-cyan-400/20 bg-cyan-400/10 px-4 py-2 text-sm text-cyan-300 mb-6">
              {plan.datasetType}
            </div>

            <h3 className="text-4xl font-bold mb-6">
              {plan.datasetTitle}
            </h3>

            <p className="text-slate-300 text-lg leading-8">
              {plan.summary}
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="rounded-3xl border border-white/10 bg-white/5 p-6">
              <p className="text-slate-400 text-sm mb-2">Category Column</p>
              <p className="text-xl font-bold text-cyan-400">
                {plan.categoryColumn || "Not detected"}
              </p>
            </div>

            <div className="rounded-3xl border border-white/10 bg-white/5 p-6">
              <p className="text-slate-400 text-sm mb-2">Numeric Column</p>
              <p className="text-xl font-bold text-green-400">
                {plan.numericColumn || "Not detected"}
              </p>
            </div>

            <div className="rounded-3xl border border-white/10 bg-white/5 p-6">
              <p className="text-slate-400 text-sm mb-2">Date Column</p>
              <p className="text-xl font-bold text-yellow-400">
                {plan.dateColumn || "Not detected"}
              </p>
            </div>

            <div className="rounded-3xl border border-white/10 bg-white/5 p-6">
              <p className="text-slate-400 text-sm mb-2">Rows Analyzed</p>
              <p className="text-xl font-bold text-purple-400">
                {rows.length}
              </p>
            </div>
          </div>

          <div className="space-y-8">
            {plan.charts.map((chart, index) => {
              const data = chartData[index] || [];

              if (!data.length) return null;

              return (
                <div
                  key={`${chart.type}-${index}`}
                  className="rounded-3xl border border-white/10 bg-white/5 p-8"
                >
                  <h3 className="text-2xl font-semibold mb-3">
                    {chart.title}
                  </h3>

                  <p className="text-slate-400 leading-7 mb-8">
                    {chart.description}
                  </p>

                  <div className="h-[380px]">
                    <ResponsiveContainer width="100%" height="100%">
                      {chart.type === "bar" ? (
                        <BarChart data={data}>
                          <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
                          <XAxis dataKey="name" stroke="#94a3b8" />
                          <YAxis stroke="#94a3b8" />
                          <Tooltip />
                          <Bar dataKey="value" radius={[8, 8, 0, 0]}>
                            {data.map((_, i) => (
                              <Cell
                                key={i}
                                fill={COLORS[i % COLORS.length]}
                              />
                            ))}
                          </Bar>
                        </BarChart>
                      ) : chart.type === "pie" ? (
                        <PieChart>
                          <Pie
                            data={data}
                            dataKey="value"
                            nameKey="name"
                            outerRadius={120}
                            label
                          >
                            {data.map((_, i) => (
                              <Cell
                                key={i}
                                fill={COLORS[i % COLORS.length]}
                              />
                            ))}
                          </Pie>
                          <Tooltip />
                          <Legend />
                        </PieChart>
                      ) : (
                        <LineChart data={data}>
                          <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
                          <XAxis dataKey="name" stroke="#94a3b8" />
                          <YAxis stroke="#94a3b8" />
                          <Tooltip />
                          <Line
                            type="monotone"
                            dataKey="value"
                            stroke="#06b6d4"
                            strokeWidth={4}
                            dot={{ r: 5, fill: "#06b6d4" }}
                          />
                        </LineChart>
                      )}
                    </ResponsiveContainer>
                  </div>
                </div>
              );
            })}
          </div>

          <div className="rounded-[32px] border border-cyan-400/20 bg-cyan-500/10 p-10">
            <h3 className="text-3xl font-bold mb-8">
              AI Chart Insights
            </h3>

            <div className="space-y-5">
              {plan.insights.map((insight, index) => (
                <div
                  key={index}
                  className="rounded-2xl border border-white/10 bg-black/20 p-5 text-slate-300 leading-7"
                >
                  {insight}
                </div>
              ))}
            </div>
          </div>
        </>
      )}
    </section>
  );
}