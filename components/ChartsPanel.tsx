"use client";

import { useMemo } from "react";
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

const COLORS = {
  primary: "#06b6d4",
  success: "#22c55e",
  warning: "#f59e0b",
  danger: "#ef4444",
  purple: "#8b5cf6",
  blue: "#3b82f6",
  slate: "#94a3b8",
};

const CATEGORY_COLORS = [
  COLORS.primary,
  COLORS.success,
  COLORS.warning,
  COLORS.purple,
  COLORS.blue,
  COLORS.danger,
];

export default function ChartsPanel({ rows, headers }: Props) {
  const analysis = useMemo(() => {
    if (!rows.length || !headers.length) return null;

    const numericColumns = headers.filter((header) =>
      rows.some((row) => {
        const value = row[header];
        return value !== "" && value !== null && !isNaN(Number(value));
      })
    );

    const textColumns = headers.filter(
      (header) => !numericColumns.includes(header)
    );

    const firstNumeric = numericColumns[0];
    const firstCategory = textColumns[0] || headers[0];

    const numericChartData = rows.slice(0, 12).map((row, index) => ({
      name: row[firstCategory]
        ? String(row[firstCategory]).slice(0, 18)
        : `Row ${index + 1}`,
      value: Number(row[firstNumeric]) || 0,
    }));

    const categoryCounts: Record<string, number> = {};

    if (firstCategory) {
      rows.forEach((row) => {
        const key = String(row[firstCategory] || "Unknown");
        categoryCounts[key] = (categoryCounts[key] || 0) + 1;
      });
    }

    const pieData = Object.entries(categoryCounts)
      .slice(0, 6)
      .map(([name, value]) => ({
        name,
        value,
      }));

    let missingValues = 0;
    let filledValues = 0;

    rows.forEach((row) => {
      headers.forEach((header) => {
        if (
          row[header] === "" ||
          row[header] === null ||
          row[header] === undefined
        ) {
          missingValues++;
        } else {
          filledValues++;
        }
      });
    });

    const qualityData = [
      {
        name: "Filled Values",
        value: filledValues,
        color: COLORS.success,
      },
      {
        name: "Missing Values",
        value: missingValues,
        color: COLORS.danger,
      },
    ];

    const total = numericChartData.reduce(
      (sum, item) => sum + item.value,
      0
    );

    const average =
      numericChartData.length > 0
        ? total / numericChartData.length
        : 0;

    const highest = numericChartData.reduce(
      (max, item) => (item.value > max.value ? item : max),
      numericChartData[0]
    );

    const lowest = numericChartData.reduce(
      (min, item) => (item.value < min.value ? item : min),
      numericChartData[0]
    );

    return {
      numericColumns,
      textColumns,
      firstNumeric,
      firstCategory,
      numericChartData,
      pieData,
      qualityData,
      total,
      average,
      highest,
      lowest,
      missingValues,
      filledValues,
    };
  }, [rows, headers]);

  if (!analysis) return null;

  if (!analysis.firstNumeric) {
    return (
      <section className="mt-16 rounded-3xl border border-white/10 bg-white/5 p-10">
        <h2 className="text-3xl font-bold mb-4">
          Data Visualization
        </h2>

        <p className="text-slate-400 leading-7">
          No numeric columns were detected. Charts require at least one numeric
          column such as sales, amount, salary, quantity, revenue, score, or
          price.
        </p>
      </section>
    );
  }

  return (
    <section className="mt-20 space-y-10">
      <div>
        <h2 className="text-4xl font-bold mb-4">
          Smart Charts & Data Visualizations
        </h2>

        <p className="text-slate-400 text-lg leading-8">
          Charts are automatically generated from your dataset using detected
          numeric and category columns. Colors are used consistently: green for
          healthy/filled data, red for missing data, cyan for primary values,
          and orange for attention areas.
        </p>
      </div>

      <div className="grid md:grid-cols-4 gap-6">
        <div className="rounded-3xl border border-white/10 bg-white/5 p-6">
          <p className="text-slate-400 text-sm mb-2">Numeric Column</p>
          <p className="text-2xl font-bold text-cyan-400">
            {analysis.firstNumeric}
          </p>
        </div>

        <div className="rounded-3xl border border-white/10 bg-white/5 p-6">
          <p className="text-slate-400 text-sm mb-2">Average</p>
          <p className="text-2xl font-bold text-green-400">
            {analysis.average.toLocaleString(undefined, {
              maximumFractionDigits: 2,
            })}
          </p>
        </div>

        <div className="rounded-3xl border border-white/10 bg-white/5 p-6">
          <p className="text-slate-400 text-sm mb-2">Highest Value</p>
          <p className="text-2xl font-bold text-cyan-400">
            {analysis.highest?.value?.toLocaleString()}
          </p>
        </div>

        <div className="rounded-3xl border border-white/10 bg-white/5 p-6">
          <p className="text-slate-400 text-sm mb-2">Missing Values</p>
          <p className="text-2xl font-bold text-red-400">
            {analysis.missingValues}
          </p>
        </div>
      </div>

      <div className="grid lg:grid-cols-2 gap-8">
        <div className="rounded-3xl border border-white/10 bg-white/5 p-8">
          <h3 className="text-2xl font-semibold mb-3">
            Value Comparison Chart
          </h3>

          <p className="text-slate-400 mb-8 leading-7">
            This chart compares the first detected numeric field across rows.
            Cyan bars show primary values. Taller bars represent higher values.
          </p>

          <div className="h-[340px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={analysis.numericChartData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
                <XAxis dataKey="name" stroke="#94a3b8" />
                <YAxis stroke="#94a3b8" />
                <Tooltip />
                <Bar dataKey="value" radius={[8, 8, 0, 0]}>
                  {analysis.numericChartData.map((item, index) => (
                    <Cell
                      key={index}
                      fill={
                        item.value >= analysis.average
                          ? COLORS.primary
                          : COLORS.warning
                      }
                    />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>

          <p className="mt-6 text-sm text-slate-400">
            Cyan = above or equal to average. Orange = below average.
          </p>
        </div>

        <div className="rounded-3xl border border-white/10 bg-white/5 p-8">
          <h3 className="text-2xl font-semibold mb-3">
            Category Distribution
          </h3>

          <p className="text-slate-400 mb-8 leading-7">
            This chart shows how records are distributed across the detected
            category column:{" "}
            <span className="text-cyan-300">
              {analysis.firstCategory}
            </span>
            .
          </p>

          <div className="h-[340px]">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={analysis.pieData}
                  dataKey="value"
                  nameKey="name"
                  outerRadius={115}
                  label
                >
                  {analysis.pieData.map((_, index) => (
                    <Cell
                      key={index}
                      fill={CATEGORY_COLORS[index % CATEGORY_COLORS.length]}
                    />
                  ))}
                </Pie>

                <Tooltip />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </div>

          <p className="mt-6 text-sm text-slate-400">
            Each color represents a different category group.
          </p>
        </div>
      </div>

      <div className="rounded-3xl border border-white/10 bg-white/5 p-8">
        <h3 className="text-2xl font-semibold mb-3">
          Trend Line Analysis
        </h3>

        <p className="text-slate-400 mb-8 leading-7">
          This line chart shows movement across the first rows of your dataset.
          It helps identify rising, falling, or inconsistent patterns in the
          selected numeric field.
        </p>

        <div className="h-[360px]">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={analysis.numericChartData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
              <XAxis dataKey="name" stroke="#94a3b8" />
              <YAxis stroke="#94a3b8" />
              <Tooltip />
              <Line
                type="monotone"
                dataKey="value"
                stroke={COLORS.primary}
                strokeWidth={4}
                dot={{
                  r: 5,
                  fill: COLORS.primary,
                }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className="rounded-3xl border border-white/10 bg-white/5 p-8">
        <h3 className="text-2xl font-semibold mb-3">
          Data Quality Chart
        </h3>

        <p className="text-slate-400 mb-8 leading-7">
          This chart explains how complete your uploaded dataset is. Green
          values are filled cells. Red values are missing or blank cells.
        </p>

        <div className="h-[320px]">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={analysis.qualityData}
                dataKey="value"
                nameKey="name"
                outerRadius={115}
                label
              >
                {analysis.qualityData.map((item) => (
                  <Cell key={item.name} fill={item.color} />
                ))}
              </Pie>

              <Tooltip />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </div>

        <div className="mt-6 grid md:grid-cols-2 gap-4">
          <div className="rounded-2xl bg-green-500/10 border border-green-400/20 p-5">
            <p className="text-green-400 font-semibold">
              Green = Filled Values
            </p>
            <p className="text-slate-400 text-sm mt-2">
              These cells contain usable data for analysis.
            </p>
          </div>

          <div className="rounded-2xl bg-red-500/10 border border-red-400/20 p-5">
            <p className="text-red-400 font-semibold">
              Red = Missing Values
            </p>
            <p className="text-slate-400 text-sm mt-2">
              These cells are blank, missing, or unavailable.
            </p>
          </div>
        </div>
      </div>

      <div className="rounded-3xl border border-cyan-400/20 bg-cyan-500/10 p-8">
        <h3 className="text-2xl font-semibold mb-4">
          Chart Interpretation
        </h3>

        <div className="space-y-4 text-slate-300 leading-8">
          <p>
            The main numeric field detected is{" "}
            <span className="text-cyan-300 font-semibold">
              {analysis.firstNumeric}
            </span>
            . The average visible value is{" "}
            <span className="text-green-400 font-semibold">
              {analysis.average.toLocaleString(undefined, {
                maximumFractionDigits: 2,
              })}
            </span>
            .
          </p>

          <p>
            The highest visible value appears in{" "}
            <span className="text-cyan-300 font-semibold">
              {analysis.highest?.name}
            </span>{" "}
            with a value of{" "}
            <span className="text-cyan-300 font-semibold">
              {analysis.highest?.value?.toLocaleString()}
            </span>
            .
          </p>

          <p>
            The dataset contains{" "}
            <span className="text-red-400 font-semibold">
              {analysis.missingValues}
            </span>{" "}
            missing values and{" "}
            <span className="text-green-400 font-semibold">
              {analysis.filledValues}
            </span>{" "}
            filled values.
          </p>
        </div>
      </div>
    </section>
  );
}