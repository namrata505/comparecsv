"use client";

import { useMemo, useState } from "react";
import Papa from "papaparse";
import * as XLSX from "xlsx";
import {
  Upload,
  FileSpreadsheet,
  BarChart3,
  Sparkles,
  AlertTriangle,
  Database,
} from "lucide-react";
import ChartsPanel from "@/components/ChartsPanel";



export default function AnalyzePage() {
    const [files, setFiles] = useState<File[]>([]);
    const [rows, setRows] = useState<any[]>([]);
    const [headers, setHeaders] = useState<string[]>([]);
    const [loading, setLoading] = useState(false);

    async function handleFiles(selectedFiles: FileList | null) {
        if (!selectedFiles) return;

        const uploaded = Array.from(selectedFiles);

        setFiles(uploaded);

        setLoading(true);

        try {
        let combinedRows: any[] = [];

        for (const file of uploaded) {
            const extension = file.name.split(".").pop()?.toLowerCase();

            if (extension === "csv") {
            const text = await file.text();

            const parsed = Papa.parse(text, {
                header: true,
                skipEmptyLines: true,
            });

            combinedRows = [...combinedRows, ...(parsed.data as any[])];
            }

            if (extension === "xlsx" || extension === "xls") {
            const buffer = await file.arrayBuffer();

            const workbook = XLSX.read(buffer);

            const sheetName = workbook.SheetNames[0];

            const sheet = workbook.Sheets[sheetName];

            const json = XLSX.utils.sheet_to_json(sheet);

            combinedRows = [...combinedRows, ...(json as any[])];
            }
        }

        setRows(combinedRows);

        if (combinedRows.length > 0) {
            setHeaders(Object.keys(combinedRows[0]));
        }
        } catch (error) {
        console.error(error);
        }

        setLoading(false);
    }

    const insights = useMemo(() => {
    if (rows.length === 0) return null;

    const totalRows = rows.length;
    const totalColumns = headers.length;

    let missingValues = 0;

    rows.forEach((row) => {
      headers.forEach((header) => {
        if (
          row[header] === null ||
          row[header] === undefined ||
          row[header] === ""
        ) {
          missingValues++;
        }
      });
    });

        const duplicateCount = totalRows - new Set(JSON.stringify(rows)).size;

    const numericColumns = headers.filter((header) => {
      return rows.some((row) => !isNaN(Number(row[header])));
    });

    const topInsights: string[] = [];

    topInsights.push(
      `The uploaded dataset contains ${totalRows} rows and ${totalColumns} columns.`
    );

    topInsights.push(
      `Detected ${missingValues} missing values across uploaded files.`
    );

        topInsights.push(
      `${numericColumns.length} numeric columns were identified for analysis.`
    );

    if (duplicateCount > 0) {
      topInsights.push(
        `${duplicateCount} possible duplicate rows were detected.`
      );
    }


    return {
      totalRows,
      totalColumns,
      missingValues,
      duplicateCount,
      numericColumns,
      topInsights,
    };
  }, [rows, headers]);


    return (
    <main className="min-h-screen bg-slate-950 text-white">

      <section className="max-w-7xl mx-auto px-6 py-20">

        <div className="text-center max-w-4xl mx-auto mb-16">

          <div className="inline-flex items-center gap-2 rounded-full border border-cyan-400/20 bg-cyan-400/10 px-4 py-2 text-sm text-cyan-300 mb-6">
            <Sparkles size={16} />
            AI Spreadsheet Analyzer
          </div>

          <h1 className="text-5xl md:text-7xl font-bold leading-tight mb-8">
            Upload Files.
            <span className="block text-cyan-400">
              Get AI Insights.
            </span>
          </h1>

          <p className="text-slate-300 text-lg leading-8 max-w-3xl mx-auto">
            Upload CSV or Excel files and instantly generate insights,
            summaries, statistics, trends, and content-ready analysis.
          </p>

        </div>

        <div className="rounded-3xl border border-white/10 bg-white/5 p-10 backdrop-blur-xl">

          <label className="border-2 border-dashed border-cyan-400/20 rounded-3xl p-16 flex flex-col items-center justify-center text-center cursor-pointer hover:border-cyan-400/50 transition">

            <Upload className="w-16 h-16 text-cyan-400 mb-6" />

            <h2 className="text-2xl font-semibold mb-3">
              Upload CSV or Excel Files
            </h2>

            <p className="text-slate-400 mb-6 max-w-xl">
              Supports CSV, XLSX, and multiple spreadsheet uploads.
            </p>

            <div className="bg-cyan-500 hover:bg-cyan-400 transition px-6 py-3 rounded-2xl text-black font-semibold">
              Choose Files
            </div>

            <input
              type="file"
              multiple
              accept=".csv,.xlsx,.xls"
              className="hidden"
              onChange={(e) => handleFiles(e.target.files)}
            />

          </label>

        </div>

        {loading && (
          <div className="mt-10 text-center text-cyan-300 text-lg">
            Analyzing uploaded files...
          </div>
        )}

        {insights && (
          <>

            <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mt-16">

              <div className="rounded-3xl border border-white/10 bg-white/5 p-8">
                <Database className="mb-4 text-cyan-400" />
                <div className="text-4xl font-bold mb-2">
                  {insights.totalRows}
                </div>
                <div className="text-slate-400">
                  Total Rows
                </div>
              </div>

              <div className="rounded-3xl border border-white/10 bg-white/5 p-8">
                <FileSpreadsheet className="mb-4 text-cyan-400" />
                <div className="text-4xl font-bold mb-2">
                  {insights.totalColumns}
                </div>
                <div className="text-slate-400">
                  Columns
                </div>
              </div>

              <div className="rounded-3xl border border-white/10 bg-white/5 p-8">
                <AlertTriangle className="mb-4 text-cyan-400" />
                <div className="text-4xl font-bold mb-2">
                  {insights.missingValues}
                </div>
                <div className="text-slate-400">
                  Missing Values
                </div>
              </div>

              <div className="rounded-3xl border border-white/10 bg-white/5 p-8">
                <BarChart3 className="mb-4 text-cyan-400" />
                <div className="text-4xl font-bold mb-2">
                  {insights.duplicateCount}
                </div>
                <div className="text-slate-400">
                  Duplicates
                </div>
              </div>

            </section>

            <section className="mt-16 grid lg:grid-cols-2 gap-8">

              <div className="rounded-3xl border border-white/10 bg-white/5 p-10">

                <h2 className="text-3xl font-bold mb-8">
                  AI Dataset Insights
                </h2>

                <div className="space-y-5">

                  {insights.topInsights.map((item, index) => (
                    <div
                      key={index}
                      className="rounded-2xl border border-white/10 bg-black/20 p-5 text-slate-300 leading-7"
                    >
                      {item}
                    </div>
                  ))}

                </div>

              </div>

              <div className="rounded-3xl border border-white/10 bg-white/5 p-10">

                <h2 className="text-3xl font-bold mb-8">
                  Content Creator Summary
                </h2>

                <div className="space-y-6 text-slate-300 leading-8">

                  <p>
                    The uploaded spreadsheet dataset contains
                    <span className="text-cyan-400 font-semibold">
                      {` ${insights.totalRows} `}
                    </span>
                    records across
                    <span className="text-cyan-400 font-semibold">
                      {` ${insights.totalColumns} `}
                    </span>
                    columns.
                  </p>

                  <p>
                    Automated analysis detected
                    <span className="text-cyan-400 font-semibold">
                      {` ${insights.missingValues} missing values `}
                    </span>
                    and
                    <span className="text-cyan-400 font-semibold">
                      {` ${insights.duplicateCount} possible duplicate rows`}.
                    </span>
                  </p>

                  <p>
                    The dataset includes
                    <span className="text-cyan-400 font-semibold">
                      {` ${insights.numericColumns.length} numeric columns `}
                    </span>
                    suitable for trend analysis, chart generation,
                    and statistical reporting.
                  </p>

                </div>

              </div>

            </section>

            <section className="mt-16 rounded-3xl border border-white/10 bg-white/5 p-10 overflow-x-auto">

              <h2 className="text-3xl font-bold mb-8">
                Dataset Preview
              </h2>

              <table className="w-full text-left">

                <thead>
                  <tr className="border-b border-white/10">
                    {headers.map((header) => (
                      <th key={header} className="p-4 text-cyan-300">
                        {header}
                      </th>
                    ))}
                  </tr>
                </thead>

                <tbody>
                  {rows.slice(0, 10).map((row, index) => (
                    <tr
                      key={index}
                      className="border-b border-white/5"
                    >
                      {headers.map((header) => (
                        <td
                          key={header}
                          className="p-4 text-slate-300"
                        >
                          {String(row[header] ?? "")}
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>

              </table>

            </section>
            
            <ChartsPanel rows={rows} headers={headers} />

            <div className="rounded-2xl border border-cyan-400/20 bg-cyan-500/10 p-6 text-slate-300 leading-8 mt-8">

                <h3 className="text-2xl font-semibold text-white mb-4">
                    AI Findings
                </h3>

                <p className="mb-4">
                    The uploaded dataset appears suitable for business intelligence,
                    reporting, and content analysis workflows.
                </p>

                <p className="mb-4">
                    Numeric columns can be used for trend analysis,
                    forecasting, and chart generation.
                </p>

                <p>
                    CompareCSV automatically transforms spreadsheet data
                    into readable insights for blogs, videos, reports,
                    and presentations.
                </p>

            </div>

            <div className="mt-10 flex flex-wrap gap-4">

                <button className="rounded-2xl bg-cyan-500 hover:bg-cyan-400 transition px-6 py-3 font-semibold text-black">
                    Export Report
                </button>

                <button className="rounded-2xl border border-white/10 bg-white/5 hover:border-cyan-400/40 transition px-6 py-3 font-semibold">
                    Download Charts
                </button>

            </div>

          </>
        )}

      </section>

    </main>
  );
}