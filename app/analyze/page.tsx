"use client";

import { useMemo, useState } from "react";
import Papa from "papaparse";
import * as XLSX from "xlsx";
import { exportAIReportPDF } from "@/lib/exportPDF";

import {
  Upload,
  FileSpreadsheet,
  BarChart3,
  Sparkles,
  AlertTriangle,
  Database,
  Merge,
} from "lucide-react";

import ChartsPanel from "@/components/ChartsPanel";
import AIContentGenerator from "@/components/AIContentGenerator";

type UploadedDataset = {
  fileName: string;
  rows: any[];
  headers: string[];
};

export default function AnalyzePage() {
  const [datasets, setDatasets] = useState<UploadedDataset[]>([]);
  const [rows, setRows] = useState<any[]>([]);
  const [headers, setHeaders] = useState<string[]>([]);

  const [selectedKey, setSelectedKey] = useState("");
  const [loading, setLoading] = useState(false);

  const [prompt, setPrompt] = useState("");
  const [aiResult, setAiResult] = useState("");
  const [mode, setMode] = useState("Insights");

  async function parseFile(file: File): Promise<UploadedDataset> {
    const extension = file.name.split(".").pop()?.toLowerCase();

    if (extension === "csv") {
      const text = await file.text();

      const parsed = Papa.parse(text, {
        header: true,
        skipEmptyLines: true,
      });

      const parsedRows = parsed.data as any[];
      const parsedHeaders =
        parsedRows.length > 0 ? Object.keys(parsedRows[0]) : [];

      return {
        fileName: file.name,
        rows: parsedRows,
        headers: parsedHeaders,
      };
    }

    if (extension === "xlsx" || extension === "xls") {
      const buffer = await file.arrayBuffer();
      const workbook = XLSX.read(buffer);
      const sheetName = workbook.SheetNames[0];
      const sheet = workbook.Sheets[sheetName];
      const json = XLSX.utils.sheet_to_json(sheet) as any[];

      const parsedHeaders = json.length > 0 ? Object.keys(json[0]) : [];

      return {
        fileName: file.name,
        rows: json,
        headers: parsedHeaders,
      };
    }

    return {
      fileName: file.name,
      rows: [],
      headers: [],
    };
  }

  async function handleFiles(selectedFiles: FileList | null) {
    if (!selectedFiles) return;

    const uploaded = Array.from(selectedFiles);

    setLoading(true);

    setRows([]);
    setHeaders([]);
    setSelectedKey("");

    try {
      const parsedDatasets = await Promise.all(
        uploaded.map((file) => parseFile(file))
      );

      const mergedDatasets = [
        ...datasets,
        ...parsedDatasets,
      ].slice(0, 3);

      setDatasets(mergedDatasets);

      if (mergedDatasets.length === 1) {
        setRows(mergedDatasets[0].rows);
        setHeaders(mergedDatasets[0].headers);
      }

    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  }


  function removeDataset(fileName: string) {
    const updatedDatasets = datasets.filter(
      (dataset) => dataset.fileName !== fileName
    );

    setDatasets(updatedDatasets);

    if (updatedDatasets.length === 0) {
      setRows([]);
      setHeaders([]);
      setSelectedKey("");
      return;
    }

    if (updatedDatasets.length === 1) {
      setRows(updatedDatasets[0].rows);
      setHeaders(updatedDatasets[0].headers);
      setSelectedKey("");
      return;
    }

    setRows([]);
    setHeaders([]);
    setSelectedKey("");
  }


  const commonColumns = useMemo(() => {
    if (datasets.length < 2) return [];

    const firstHeaders = datasets[0].headers;

    return firstHeaders.filter((header) =>
      datasets.every((dataset) => dataset.headers.includes(header))
    );
  }, [datasets]);

  function mergeDatasetsByKey(key: string) {
    if (!key || datasets.length === 0) return;

    if (datasets.length === 1) {
      setRows(datasets[0].rows);
      setHeaders(datasets[0].headers);
      return;
    }

    const baseDataset = datasets[0];

    const mergedRows = baseDataset.rows.map((baseRow) => {
      let mergedRow: any = {
        ...baseRow,
      };

      const keyValue = String(baseRow[key] ?? "").trim();

      datasets.slice(1).forEach((dataset, datasetIndex) => {
        const matchedRow = dataset.rows.find(
          (row) => String(row[key] ?? "").trim() === keyValue
        );

        dataset.headers.forEach((header) => {
          if (header === key) return;

          const newHeader = `${dataset.fileName}_${header}`;

          mergedRow[newHeader] = matchedRow ? matchedRow[header] ?? "" : "";
        });

        if (!matchedRow) {
          mergedRow[`Match_Status_File_${datasetIndex + 2}`] = "Missing";
        } else {
          mergedRow[`Match_Status_File_${datasetIndex + 2}`] = "Matched";
        }
      });

      return mergedRow;
    });

    const mergedHeaders =
      mergedRows.length > 0 ? Object.keys(mergedRows[0]) : [];

    setRows(mergedRows);
    setHeaders(mergedHeaders);
  }

  async function handleAIAnalysis() {
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
      setAiResult("AI analysis could not be generated.");
    } finally {
      setLoading(false);
    }
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

    const duplicateCount =
      totalRows - new Set(rows.map((row) => JSON.stringify(row))).size;

    const numericColumns = headers.filter((header) =>
      rows.some((row) => !isNaN(Number(row[header])))
    );

    return {
      totalRows,
      totalColumns,
      missingValues,
      duplicateCount,
      numericColumns,
      topInsights: [
        `The resultant dataset contains ${totalRows} rows and ${totalColumns} columns.`,
        `Detected ${missingValues} missing values in the resultant dataset.`,
        `${numericColumns.length} numeric columns were identified for analysis.`,
        `${duplicateCount} possible duplicate rows were detected.`,
      ],
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
            Upload Multiple Files.
            <span className="block text-cyan-400">
              Merge & Analyze with AI.
            </span>
          </h1>

          <p className="text-slate-300 text-lg leading-8 max-w-3xl mx-auto">
            Upload up to 3 CSV or Excel files, select a common column,
            merge the data, and generate AI-powered insights.
          </p>
        </div>

        <div className="rounded-3xl border border-white/10 bg-white/5 p-6 backdrop-blur-xl">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">
            <div>
              <h2 className="text-2xl font-semibold mb-2">
                Upload CSV or Excel Files
              </h2>

              <p className="text-slate-400">
                Upload up to 3 files. Add or remove files anytime before analysis.
              </p>
            </div>

            <label className="inline-flex items-center justify-center gap-3 rounded-2xl bg-cyan-500 hover:bg-cyan-400 transition px-6 py-4 text-black font-semibold cursor-pointer">
              <Upload size={20} />
              {datasets.length > 0 ? "Add More Files" : "Choose Files"}

              <input
                type="file"
                multiple
                accept=".csv,.xlsx,.xls"
                className="hidden"
                onChange={(e) => handleFiles(e.target.files)}
              />
            </label>
          </div>
        </div>

        {datasets.length > 0 && (
          <section className="mt-8 rounded-3xl border border-white/10 bg-white/5 p-6">
            <div className="flex items-center justify-between gap-4 mb-6">
              <h2 className="text-2xl font-bold">
                Uploaded Files
              </h2>

              <p className="text-sm text-slate-400">
                {datasets.length}/3 files uploaded
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-4">
              {datasets.map((dataset) => (
                <div
                  key={dataset.fileName}
                  className="rounded-2xl bg-black/30 p-5 border border-white/10"
                >
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <p className="font-semibold text-cyan-300 break-all">
                        {dataset.fileName}
                      </p>

                      <p className="text-slate-400 text-sm mt-2">
                        {dataset.rows.length} rows · {dataset.headers.length} columns
                      </p>
                    </div>

                    <button
                      onClick={() => removeDataset(dataset.fileName)}
                      className="rounded-xl border border-red-400/20 bg-red-500/10 px-3 py-2 text-sm text-red-300 hover:bg-red-500/20 transition"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

        {datasets.length > 1 && (
          <section className="mt-10 rounded-3xl border border-cyan-400/20 bg-cyan-500/10 p-8">
            <div className="flex items-center gap-3 mb-6">
              <Merge className="text-cyan-300" />
              <h2 className="text-2xl font-bold">
                Select Common Column to Merge Files
              </h2>
            </div>

            {commonColumns.length > 0 ? (
              <>
                <select
                  value={selectedKey}
                  onChange={(e) => setSelectedKey(e.target.value)}
                  className="w-full rounded-2xl border border-white/10 bg-slate-900 p-4 text-white outline-none"
                >
                  <option value="">Select common column</option>

                  {commonColumns.map((column) => (
                    <option key={column} value={column}>
                      {column}
                    </option>
                  ))}
                </select>

                <button
                  onClick={() => mergeDatasetsByKey(selectedKey)}
                  disabled={!selectedKey}
                  className="mt-6 rounded-2xl bg-cyan-500 hover:bg-cyan-400 disabled:opacity-50 transition px-8 py-4 font-semibold text-black"
                >
                  Merge Files & Analyze Result
                </button>
              </>
            ) : (
              <p className="text-slate-300">
                No common columns were found across uploaded files.
              </p>
            )}
          </section>
        )}

        {loading && (
          <div className="mt-10 text-center text-cyan-300 text-lg">
            Processing dataset...
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
                <div className="text-slate-400">Total Rows</div>
              </div>

              <div className="rounded-3xl border border-white/10 bg-white/5 p-8">
                <FileSpreadsheet className="mb-4 text-cyan-400" />
                <div className="text-4xl font-bold mb-2">
                  {insights.totalColumns}
                </div>
                <div className="text-slate-400">Columns</div>
              </div>

              {insights.missingValues > 0 && (
                <div className="rounded-3xl border border-white/10 bg-white/5 p-8">
                  <AlertTriangle className="mb-4 text-cyan-400" />
                  <div className="text-4xl font-bold mb-2">
                    {insights.missingValues}
                  </div>
                  <div className="text-slate-400">
                    Missing Values
                  </div>
                </div>
              )}

              {insights.duplicateCount > 0 && (
                <div className="rounded-3xl border border-white/10 bg-white/5 p-8">
                  <BarChart3 className="mb-4 text-cyan-400" />
                  <div className="text-4xl font-bold mb-2">
                    {insights.duplicateCount}
                  </div>
                  <div className="text-slate-400">
                    Duplicates
                  </div>
                </div>
              )}
            </section>

            <ChartsPanel rows={rows} headers={headers} />

            <AIContentGenerator rows={rows} headers={headers} />

            <section className="mt-20">
              <h2 className="text-4xl font-bold mb-8">
                Ask AI About Your Resultant Dataset
              </h2>

              <div className="flex flex-wrap gap-4 mb-6">
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
                        : "border border-white/10 bg-white/5 hover:border-cyan-400/40"
                    }`}
                  >
                    {item}
                  </button>
                ))}
              </div>

              <textarea
                value={prompt}
                onChange={(e) => setPrompt(e.target.value)}
                placeholder="Example: Generate business insights, summarize trends, create a YouTube script..."
                className="w-full h-44 rounded-3xl border border-cyan-400/20 bg-slate-900 p-6 outline-none text-white placeholder:text-slate-500 focus:border-cyan-400 focus:ring-2 focus:ring-cyan-400/20"
              />

              <button
                onClick={handleAIAnalysis}
                className="mt-6 rounded-2xl bg-cyan-500 hover:bg-cyan-400 transition px-8 py-4 font-semibold text-black"
              >
                Generate AI Analysis
              </button>
            </section>

            {aiResult && (
              <section className="mt-16">
                <div className="rounded-3xl border border-cyan-400/20 bg-cyan-500/10 p-10">
                  <div className="flex items-center justify-between mb-6">
                    <h2 className="text-3xl font-bold">
                      AI Generated Output
                    </h2>

                    <div className="rounded-full bg-cyan-400/20 px-4 py-2 text-sm text-cyan-300">
                      {mode}
                    </div>
                  </div>

                  <div className="whitespace-pre-wrap text-slate-200 leading-8 text-lg">
                    {aiResult}
                  </div>

                  <button
                    onClick={() =>
                      exportAIReportPDF({
                        title: "CompareCSV AI Report",
                        mode,
                        aiResult,
                        totalRows: insights.totalRows,
                        totalColumns: insights.totalColumns,
                        missingValues: insights.missingValues,
                        duplicateCount: insights.duplicateCount,
                      })
                    }
                    className="mt-8 rounded-2xl bg-cyan-500 hover:bg-cyan-400 transition px-8 py-4 font-semibold text-black"
                  >
                    Download PDF Report
                  </button>
                  
                </div>
              </section>
            )}
          </>
        )}
      </section>
    </main>
  );
}