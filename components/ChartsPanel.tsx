"use client";

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
} from "recharts";

const COLORS = [
  "#06b6d4",
  "#3b82f6",
  "#8b5cf6",
  "#14b8a6",
  "#22c55e",
  "#f59e0b",
];

type Props = {
  rows: any[];
  headers: string[];
};

export default function ChartsPanel({ rows, headers }: Props) {
  if (!rows.length) return null;

  const numericColumns = headers.filter((header) => {
    return rows.some((row) => !isNaN(Number(row[header])));
  });

  const firstNumeric = numericColumns[0];

  if (!firstNumeric) {
    return (
      <div className="rounded-3xl border border-white/10 bg-white/5 p-10 text-slate-300">
        No numeric columns found for chart generation.
      </div>
    );
  }

  const chartData = rows.slice(0, 10).map((row, index) => ({
    name: `Row ${index + 1}`,
    value: Number(row[firstNumeric]) || 0,
  }));

  return (
    <section className="mt-16 space-y-10">

      <div>
        <h2 className="text-4xl font-bold mb-4">
          AI Charts & Visualizations
        </h2>

        <p className="text-slate-400 text-lg">
          Automatically generated charts based on uploaded spreadsheet data.
        </p>
      </div>

      <div className="grid lg:grid-cols-2 gap-8">

        {/* Bar Chart */}
        <div className="rounded-3xl border border-white/10 bg-white/5 p-8">

          <h3 className="text-2xl font-semibold mb-8">
            Bar Chart Analysis
          </h3>

          <div className="h-[320px]">

            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={chartData}>

                <CartesianGrid strokeDasharray="3 3" stroke="#334155" />

                <XAxis dataKey="name" stroke="#94a3b8" />

                <YAxis stroke="#94a3b8" />

                <Tooltip />

                <Bar dataKey="value" radius={[8, 8, 0, 0]}>
                  {chartData.map((_, index) => (
                    <Cell
                      key={index}
                      fill={COLORS[index % COLORS.length]}
                    />
                  ))}
                </Bar>

              </BarChart>
            </ResponsiveContainer>

          </div>

        </div>

        {/* Pie Chart */}
        <div className="rounded-3xl border border-white/10 bg-white/5 p-8">

          <h3 className="text-2xl font-semibold mb-8">
            Distribution Analysis
          </h3>

          <div className="h-[320px]">

            <ResponsiveContainer width="100%" height="100%">
              <PieChart>

                <Pie
                  data={chartData}
                  dataKey="value"
                  nameKey="name"
                  outerRadius={120}
                  label
                >
                  {chartData.map((_, index) => (
                    <Cell
                      key={index}
                      fill={COLORS[index % COLORS.length]}
                    />
                  ))}
                </Pie>

                <Tooltip />

              </PieChart>
            </ResponsiveContainer>

          </div>

        </div>

      </div>

      {/* Line Chart */}
      <div className="rounded-3xl border border-white/10 bg-white/5 p-8">

        <h3 className="text-2xl font-semibold mb-8">
          Trend Analysis
        </h3>

        <div className="h-[350px]">

          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={chartData}>

              <CartesianGrid strokeDasharray="3 3" stroke="#334155" />

              <XAxis dataKey="name" stroke="#94a3b8" />

              <YAxis stroke="#94a3b8" />

              <Tooltip />

              <Line
                type="monotone"
                dataKey="value"
                stroke="#06b6d4"
                strokeWidth={4}
              />

            </LineChart>
          </ResponsiveContainer>

        </div>

      </div>

    </section>
  );
}