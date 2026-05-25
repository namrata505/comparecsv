"use client";

import { useEffect, useMemo, useState } from "react";
import {
  ResponsiveContainer,
  LineChart,
  Line,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  Legend,
} from "recharts";

type Props = {
  rows: any[];
  headers: string[];
};

type KeyColumn = {
  name: string;
  role: string;
  reason: string;
};

type ChartPlan = {
  datasetTitle: string;
  datasetType: string;
  summary: string;
  categoryColumn: string;
  numericColumn: string;
  dateColumn: string;
  statusColumn: string;
  keyColumns?: KeyColumn[];
  suggestedYAxisColumns?: string[];
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
];

function parseNumber(value: any) {
  if (value === null || value === undefined || value === "") return null;

  const cleaned = String(value)
    .replace(/,/g, "")
    .replace(/[₹$€£,%]/g, "")
    .trim();

  const number = Number(cleaned);

  return isNaN(number) ? null : number;
}

function isNumericColumn(rows: any[], column: string) {
  return rows.some((row) => parseNumber(row[column]) !== null);
}

function compressRows(
  rows: any[],
  xColumn: string,
  yColumns: string[],
  sections: number
) {
  if (!rows.length || !xColumn || !yColumns.length) return [];

  const chunkSize = Math.ceil(rows.length / sections);

  const chunks = [];

  for (let i = 0; i < rows.length; i += chunkSize) {
    const chunk = rows.slice(i, i + chunkSize);

    const startLabel = String(chunk[0]?.[xColumn] ?? `Row ${i + 1}`);
    const endLabel = String(
      chunk[chunk.length - 1]?.[xColumn] ?? `Row ${i + chunk.length}`
    );

    const item: any = {
      name:
        startLabel === endLabel
          ? startLabel
          : `${startLabel} → ${endLabel}`,
    };

    yColumns.forEach((col) => {
      const values = chunk
        .map((row) => parseNumber(row[col]))
        .filter((value): value is number => value !== null);

      const avg =
        values.length > 0
          ? values.reduce((sum, value) => sum + value, 0) / values.length
          : 0;

      item[col] = Number(avg.toFixed(2));
    });

    chunks.push(item);
  }

  return chunks;
}

function getMaxChartValue(data: any[], yColumns: string[]) {
  let max = 0;

  data.forEach((row) => {
    yColumns.forEach((column) => {
      const value = parseNumber(row[column]);

      if (value !== null && value > max) {
        max = value;
      }
    });
  });

  return max;
}

function getRoundedMax(value: number) {
  if (value <= 0) return 10;

  const paddedValue = value * 1.15;
  const magnitude = Math.pow(10, Math.floor(Math.log10(paddedValue)));
  const normalized = paddedValue / magnitude;

  let rounded;

  if (normalized <= 2) {
    rounded = 2 * magnitude;
  } else if (normalized <= 5) {
    rounded = 5 * magnitude;
  } else {
    rounded = 10 * magnitude;
  }

  return rounded;
}

export default function ChartsPanel({ rows, headers }: Props) {
  const [plan, setPlan] = useState<ChartPlan | null>(null);
  const [loading, setLoading] = useState(false);

  const numericColumns = useMemo(
    () => headers.filter((header) => isNumericColumn(rows, header)),
    [rows, headers]
  );

  const defaultXColumn =
    plan?.dateColumn ||
    plan?.categoryColumn ||
    headers[0] ||
    "";

  const defaultYColumns =
    plan?.suggestedYAxisColumns?.filter((col) =>
      numericColumns.includes(col)
    ) ||
    numericColumns.slice(0, 2);

  const [xColumn, setXColumn] = useState("");
  const [selectedYColumns, setSelectedYColumns] = useState<string[]>([]);
  const [sections, setSections] = useState(12);
  const [chartType, setChartType] = useState<"line" | "bar">("line");

  useEffect(() => {
    async function generatePlan() {
      if (!rows.length || !headers.length) return;

      setLoading(true);

      try {
        const response = await fetch("/api/ai-chart-plan", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ rows, headers }),
        });

        const data = await response.json();

        setPlan(data);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    }

    generatePlan();
  }, [rows, headers]);

  useEffect(() => {
    if (!plan) return;

    setXColumn(defaultXColumn);
    setSelectedYColumns(defaultYColumns);
  }, [plan]);

  const chartData = useMemo(() => {
    return compressRows(
      rows,
      xColumn,
      selectedYColumns,
      sections
    );
  }, [rows, xColumn, selectedYColumns, sections]);

  const yAxisMax = useMemo(() => {
  const maxValue = getMaxChartValue(chartData, selectedYColumns);

    return getRoundedMax(maxValue);
  }, [chartData, selectedYColumns]);


  function toggleYColumn(column: string) {
    setSelectedYColumns((prev) =>
      prev.includes(column)
        ? prev.filter((item) => item !== column)
        : [...prev, column]
    );
  }

  if (!rows.length) return null;

  return (
    <section className="mt-20 space-y-10">
      <div>
        <h2 className="text-4xl font-bold mb-4">
          AI Chart Builder
        </h2>

        <p className="text-slate-400 text-lg leading-8">
          CompareCSV identifies key columns using AI, then compresses large
          datasets into equal chart sections so trends remain visible even when
          the file contains many rows.
        </p>
      </div>

      {loading && (
        <div className="rounded-3xl border border-cyan-400/20 bg-cyan-500/10 p-8 text-cyan-300">
          AI is identifying key columns and chart structure...
        </div>
      )}

      {plan && (
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
      )}

      {plan?.keyColumns && (
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {plan.keyColumns.map((col) => (
            <div
              key={col.name}
              className="rounded-3xl border border-white/10 bg-white/5 p-6"
            >
              <p className="text-cyan-400 font-semibold mb-2">
                {col.name}
              </p>

              <p className="text-sm text-slate-400 uppercase mb-3">
                {col.role}
              </p>

              <p className="text-slate-300 text-sm leading-6">
                {col.reason}
              </p>
            </div>
          ))}
        </div>
      )}

      <div className="rounded-[32px] border border-white/10 bg-white/5 p-8">
        <h3 className="text-3xl font-bold mb-8">
          Customize Chart
        </h3>

        <div className="grid md:grid-cols-4 gap-6">
          <div>
            <label className="block text-sm text-slate-400 mb-2">
              X-Axis Column
            </label>

            <select
              value={xColumn}
              onChange={(e) => setXColumn(e.target.value)}
              className="w-full rounded-2xl bg-slate-900 border border-white/10 p-4 text-white"
            >
              {headers.map((header) => (
                <option key={header} value={header}>
                  {header}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm text-slate-400 mb-2">
              Compress X-Axis Into Sections
            </label>

            <select
              value={sections}
              onChange={(e) => setSections(Number(e.target.value))}
              className="w-full rounded-2xl bg-slate-900 border border-white/10 p-4 text-white"
            >
              {[6, 8, 10, 12, 16, 20, 30, 50].map((num) => (
                <option key={num} value={num}>
                  {num} sections
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm text-slate-400 mb-2">
              Chart Type
            </label>

            <select
              value={chartType}
              onChange={(e) =>
                setChartType(e.target.value as "line" | "bar")
              }
              className="w-full rounded-2xl bg-slate-900 border border-white/10 p-4 text-white"
            >
              <option value="line">Line Chart</option>
              <option value="bar">Bar Chart</option>
            </select>
          </div>

          <div>
            <label className="block text-sm text-slate-400 mb-2">
              Rows Per Section
            </label>

            <div className="rounded-2xl bg-slate-900 border border-white/10 p-4 text-cyan-300">
              ~{Math.ceil(rows.length / sections)} rows
            </div>
          </div>
        </div>

        <div className="mt-8">
          <p className="text-sm text-slate-400 mb-4">
            Select Y-Axis Columns
          </p>

          <div className="flex flex-wrap gap-3">
            {numericColumns.map((column) => (
              <button
                key={column}
                onClick={() => toggleYColumn(column)}
                className={`rounded-2xl px-5 py-3 text-sm font-medium transition ${
                  selectedYColumns.includes(column)
                    ? "bg-cyan-500 text-black"
                    : "border border-white/10 bg-white/5 text-slate-300"
                }`}
              >
                {column}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="rounded-3xl border border-white/10 bg-white/5 p-8">
        <h3 className="text-2xl font-semibold mb-3">
          Compressed Trend Chart
        </h3>

        <p className="text-slate-400 leading-7 mb-8">
          The dataset is divided into {sections} equal X-axis sections.
          Each point represents the average value of selected Y-axis columns
          inside that section. This makes large row datasets readable while
          preserving the overall trend.
        </p>

        <div className="h-[460px]">
          <ResponsiveContainer width="100%" height="100%">
            {chartType === "line" ? (

              <LineChart data={chartData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
                <XAxis dataKey="name" stroke="#94a3b8" />
                <YAxis
                  stroke="#94a3b8"
                  domain={[0, yAxisMax]}
                  allowDataOverflow={false}
                />
                <Tooltip />
                <Legend />

                {selectedYColumns.map((col, index) => (
                  <Line
                    key={col}
                    type="monotone"
                    dataKey={col}
                    stroke={COLORS[index % COLORS.length]}
                    strokeWidth={3}
                    dot={false}
                  />
                ))}
              </LineChart>
            ) : (

              <BarChart data={chartData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
                <XAxis dataKey="name" stroke="#94a3b8" />
                <YAxis
                  stroke="#94a3b8"
                  domain={[0, yAxisMax]}
                  
                />
                <Tooltip />
                <Legend />

                {selectedYColumns.map((col, index) => (
                  <Bar
                    key={col}
                    dataKey={col}
                    fill={COLORS[index % COLORS.length]}
                    radius={[6, 6, 0, 0]}
                  />
                ))}
              </BarChart>
            )}
          </ResponsiveContainer>
        </div>
      </div>

      {plan?.insights && (
        <div className="rounded-[32px] border border-cyan-400/20 bg-cyan-500/10 p-10">
          <h3 className="text-3xl font-bold mb-8">
            AI Interpretation
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
      )}
    </section>
  );
}