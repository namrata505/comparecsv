"use client";

import { useMemo, useState } from "react";
import Papa from "papaparse";
import * as XLSX from "xlsx";

type Props = {
  slug: string;
};

type Row = Record<string, any>;

type ParsedFile = {
  name: string;
  rows: Row[];
  headers: string[];
};

async function parseFile(file: File): Promise<ParsedFile> {
  const extension = file.name.split(".").pop()?.toLowerCase();

  if (extension === "csv") {
    const text = await file.text();

    const parsed = Papa.parse<Row>(text, {
      header: true,
      skipEmptyLines: true,
    });

    const rows = parsed.data || [];
    const headers = rows.length > 0 ? Object.keys(rows[0]) : [];

    return {
      name: file.name,
      rows,
      headers,
    };
  }

  if (extension === "xlsx" || extension === "xls") {
    const buffer = await file.arrayBuffer();
    const workbook = XLSX.read(buffer);
    const sheetName = workbook.SheetNames[0];
    const sheet = workbook.Sheets[sheetName];
    const rows = XLSX.utils.sheet_to_json<Row>(sheet);
    const headers = rows.length > 0 ? Object.keys(rows[0]) : [];

    return {
      name: file.name,
      rows,
      headers,
    };
  }

  return {
    name: file.name,
    rows: [],
    headers: [],
  };
}

function parseCSV(text: string): Row[] {
  const parsed = Papa.parse<Row>(text, {
    header: true,
    skipEmptyLines: true,
  });

  return parsed.data || [];
}

function downloadCSV(rows: Row[], filename: string) {
  if (!rows.length) return;

  const csv = Papa.unparse(rows);
  const blob = new Blob([csv], {
    type: "text/csv;charset=utf-8;",
  });

  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");

  link.href = url;
  link.download = filename;
  link.click();

  URL.revokeObjectURL(url);
}

export default function FormulaTool({ slug }: Props) {
  const [fileA, setFileA] = useState<ParsedFile | null>(null);
  const [fileB, setFileB] = useState<ParsedFile | null>(null);

  const [fileAKey, setFileAKey] = useState("");
  const [fileBKey, setFileBKey] = useState("");
  const [returnColumn, setReturnColumn] = useState("");

  const [lookupResults, setLookupResults] = useState<Row[]>([]);

  const [csvText, setCsvText] = useState(
`id,name,department,salary
101,Asha,Marketing,50000
102,Ravi,Finance,65000
103,Neha,HR,45000`
  );

  const [criteriaColumn, setCriteriaColumn] = useState("department");
  const [criteriaValue, setCriteriaValue] = useState("Finance");
  const [sumColumn, setSumColumn] = useState("salary");

  const rows = useMemo(() => parseCSV(csvText), [csvText]);
  const headers = rows.length > 0 ? Object.keys(rows[0]) : [];

  const isLookupTool = slug === "vlookup" || slug === "xlookup";

  async function handleFileA(selectedFile: File | null) {
    if (!selectedFile) return;

    const parsed = await parseFile(selectedFile);

    setFileA(parsed);
    setLookupResults([]);

    if (parsed.headers.length > 0) {
      setFileAKey(parsed.headers[0]);
    }
  }

  async function handleFileB(selectedFile: File | null) {
    if (!selectedFile) return;

    const parsed = await parseFile(selectedFile);

    setFileB(parsed);
    setLookupResults([]);

    if (parsed.headers.length > 0) {
      setFileBKey(parsed.headers[0]);
      setReturnColumn(parsed.headers[0]);
    }
  }

  function runLookup() {
    if (!fileA || !fileB || !fileAKey || !fileBKey || !returnColumn) return;

    const result = fileA.rows.map((rowA) => {
      const lookupValue = String(rowA[fileAKey] ?? "").trim();

      const matchedRow = fileB.rows.find((rowB) => {
        return String(rowB[fileBKey] ?? "").trim() === lookupValue;
      });

      return {
        ...rowA,
        [`${slug.toUpperCase()}_${returnColumn}`]: matchedRow
          ? matchedRow[returnColumn] ?? ""
          : "",
        Match_Status: matchedRow ? "Matched" : "Missing",
      };
    });

    setLookupResults(result);
  }

  const sumifsResult = useMemo(() => {
    return rows
      .filter((row) => String(row[criteriaColumn]) === String(criteriaValue))
      .reduce((sum, row) => sum + Number(row[sumColumn] || 0), 0);
  }, [rows, criteriaColumn, criteriaValue, sumColumn]);

  const countifsResult = useMemo(() => {
    return rows.filter(
      (row) => String(row[criteriaColumn]) === String(criteriaValue)
    ).length;
  }, [rows, criteriaColumn, criteriaValue]);

  if (!["vlookup", "xlookup", "sumifs", "countifs"].includes(slug)) {
    return null;
  }

  if (isLookupTool) {
    return (
      <section className="mt-16 rounded-3xl border border-cyan-400/20 bg-cyan-500/10 p-8">

        <h2 className="text-3xl font-bold mb-4">
          Try {slug.toUpperCase()} with Two Files
        </h2>

        <p className="text-slate-300 leading-7 mb-8">
          Upload two CSV or Excel files. Select matching columns from both files,
          choose the value you want to return from File B, and generate a
          lookup result like Excel {slug.toUpperCase()}.
        </p>

        <div className="grid md:grid-cols-2 gap-6">

          <div className="rounded-2xl border border-white/10 bg-black/30 p-6">
            <h3 className="text-xl font-semibold mb-4">
              File A — Main Data
            </h3>

            <input
              type="file"
              accept=".csv,.xlsx,.xls"
              onChange={(e) => handleFileA(e.target.files?.[0] || null)}
              className="block w-full text-slate-300"
            />

            {fileA && (
              <p className="mt-4 text-sm text-slate-400">
                {fileA.name} · {fileA.rows.length} rows · {fileA.headers.length} columns
              </p>
            )}
          </div>

          <div className="rounded-2xl border border-white/10 bg-black/30 p-6">
            <h3 className="text-xl font-semibold mb-4">
              File B — Lookup Data
            </h3>

            <input
              type="file"
              accept=".csv,.xlsx,.xls"
              onChange={(e) => handleFileB(e.target.files?.[0] || null)}
              className="block w-full text-slate-300"
            />

            {fileB && (
              <p className="mt-4 text-sm text-slate-400">
                {fileB.name} · {fileB.rows.length} rows · {fileB.headers.length} columns
              </p>
            )}
          </div>

        </div>

        {fileA && fileB && (
          <div className="mt-8 grid md:grid-cols-3 gap-4">

            <div>
              <label className="block text-sm text-slate-400 mb-2">
                File A Matching Column
              </label>

              <select
                value={fileAKey}
                onChange={(e) => setFileAKey(e.target.value)}
                className="w-full rounded-2xl bg-slate-900 border border-white/10 p-4 text-white"
              >
                {fileA.headers.map((header) => (
                  <option key={header} value={header}>
                    {header}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm text-slate-400 mb-2">
                File B Matching Column
              </label>

              <select
                value={fileBKey}
                onChange={(e) => setFileBKey(e.target.value)}
                className="w-full rounded-2xl bg-slate-900 border border-white/10 p-4 text-white"
              >
                {fileB.headers.map((header) => (
                  <option key={header} value={header}>
                    {header}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm text-slate-400 mb-2">
                Return Column from File B
              </label>

              <select
                value={returnColumn}
                onChange={(e) => setReturnColumn(e.target.value)}
                className="w-full rounded-2xl bg-slate-900 border border-white/10 p-4 text-white"
              >
                {fileB.headers.map((header) => (
                  <option key={header} value={header}>
                    {header}
                  </option>
                ))}
              </select>
            </div>

          </div>
        )}

        {fileA && fileB && (
          <button
            onClick={runLookup}
            className="mt-8 rounded-2xl bg-cyan-500 hover:bg-cyan-400 transition px-8 py-4 text-black font-semibold"
          >
            Run {slug.toUpperCase()}
          </button>
        )}

        {lookupResults.length > 0 && (
          <div className="mt-10">

            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">

              <h3 className="text-2xl font-bold">
                Lookup Results
              </h3>

              <button
                onClick={() =>
                  downloadCSV(
                    lookupResults,
                    `${slug}-results.csv`
                  )
                }
                className="rounded-2xl border border-white/10 bg-white/5 hover:border-cyan-400/40 transition px-5 py-3 font-semibold"
              >
                Download CSV
              </button>

            </div>

            <div className="overflow-x-auto rounded-2xl border border-white/10 bg-black/30">

              <table className="w-full text-left">

                <thead>
                  <tr className="border-b border-white/10">
                    {Object.keys(lookupResults[0]).map((header) => (
                      <th key={header} className="p-4 text-cyan-300">
                        {header}
                      </th>
                    ))}
                  </tr>
                </thead>

                <tbody>
                  {lookupResults.slice(0, 20).map((row, index) => (
                    <tr key={index} className="border-b border-white/5">
                      {Object.keys(lookupResults[0]).map((header) => (
                        <td key={header} className="p-4 text-slate-300">
                          {String(row[header] ?? "")}
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>

              </table>

            </div>

            <p className="mt-4 text-sm text-slate-400">
              Showing first 20 rows.
            </p>

          </div>
        )}

      </section>
    );
  }

  return (
    <section className="mt-16 rounded-3xl border border-cyan-400/20 bg-cyan-500/10 p-8">

      <h2 className="text-3xl font-bold mb-4">
        Try This Formula Online
      </h2>

      <p className="text-slate-300 leading-7 mb-8">
        Paste sample CSV data below and test how this formula works directly in your browser.
      </p>

      <textarea
        value={csvText}
        onChange={(e) => setCsvText(e.target.value)}
        className="w-full h-48 rounded-2xl border border-white/10 bg-slate-900 p-5 text-white font-mono outline-none"
      />

      {(slug === "sumifs" || slug === "countifs") && (
        <div className="mt-8 grid md:grid-cols-3 gap-4">

          {slug === "sumifs" && (
            <select
              value={sumColumn}
              onChange={(e) => setSumColumn(e.target.value)}
              className="rounded-2xl bg-slate-900 border border-white/10 p-4 text-white"
            >
              {headers.map((header) => (
                <option key={header} value={header}>
                  {header}
                </option>
              ))}
            </select>
          )}

          <select
            value={criteriaColumn}
            onChange={(e) => setCriteriaColumn(e.target.value)}
            className="rounded-2xl bg-slate-900 border border-white/10 p-4 text-white"
          >
            {headers.map((header) => (
              <option key={header} value={header}>
                {header}
              </option>
            ))}
          </select>

          <input
            value={criteriaValue}
            onChange={(e) => setCriteriaValue(e.target.value)}
            placeholder="Criteria value"
            className="rounded-2xl bg-slate-900 border border-white/10 p-4 text-white"
          />

        </div>
      )}

      <div className="mt-8 rounded-2xl bg-black/30 border border-white/10 p-6">

        <h3 className="text-xl font-semibold mb-3">
          Result
        </h3>

        <div className="text-3xl font-bold text-cyan-300">
          {slug === "sumifs" ? sumifsResult : countifsResult}
        </div>

      </div>

    </section>
  );
}