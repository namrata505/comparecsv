"use client";

import { useCallback, useState } from "react";
import { useDropzone } from "react-dropzone";
import Papa from "papaparse";
import * as XLSX from "xlsx";
import { saveAs } from "file-saver";

type ParsedData = {
  headers: string[];
  rows: any[];
};

export default function FileUpload() {

  const [fileA, setFileA] = useState<ParsedData | null>(null);
  const [fileB, setFileB] = useState<ParsedData | null>(null);

  const [fileAName, setFileAName] = useState("");
  const [fileBName, setFileBName] = useState("");

  const [selectedA, setSelectedA] = useState("");
  const [selectedB, setSelectedB] = useState("");

  const [results, setResults] = useState<any[]>([]);
  const [matchedCount, setMatchedCount] = useState(0);
  const [duplicateCount, setDuplicateCount] = useState(0);
  const [missingCount, setMissingCount] = useState(0);

  const parseFile = async (file: File): Promise<ParsedData> => {

    if (file.name.endsWith(".csv")) {

      return new Promise((resolve) => {

        Papa.parse(file, {
          header: true,
          skipEmptyLines: true,
          complete: (result) => {

            resolve({
              headers: result.meta.fields || [],
              rows: result.data as any[],
            });

          },
        });

      });

    }

    const buffer = await file.arrayBuffer();

    const workbook = XLSX.read(buffer);

    const sheetName = workbook.SheetNames[0];

    const worksheet = workbook.Sheets[sheetName];

    const jsonData = XLSX.utils.sheet_to_json(worksheet);

    return {
      headers: Object.keys(jsonData[0] || {}),
      rows: jsonData,
    };

  };

  const compareFiles = () => {

    if (!fileA || !fileB || !selectedA || !selectedB) return;

    const mapB = new Map();

    fileB.rows.forEach((row) => {
      mapB.set(row[selectedB], row);
    });

    const seen = new Set();

    const output = fileA.rows.map((rowA) => {

        const key = rowA[selectedA];

        const match = mapB.get(key);

        const isDuplicate = seen.has(key);

        seen.add(key);

        return {
            ...rowA,
            status: match ? "Matched" : "Missing",
            duplicate: isDuplicate ? "Yes" : "No",
        };

    });

    setResults(output);

    const matched = output.filter(
    (row) => row.status === "Matched"
    ).length;

    const missing = output.filter(
    (row) => row.status === "Missing"
    ).length;

    setMatchedCount(matched);
    setMissingCount(missing);
    const duplicates = output.filter(
        (row) => row.duplicate === "Yes"
    ).length;

    setDuplicateCount(duplicates);

  };

  const downloadCSV = () => {

    const csv = Papa.unparse(results);

    const blob = new Blob([csv], {
      type: "text/csv;charset=utf-8;",
    });

    saveAs(blob, "compare-results.csv");

  };

  const onDropA = useCallback(async (acceptedFiles: File[]) => {

    const file = acceptedFiles[0];

    if (!file) return;

    setFileAName(file.name);

    const parsed = await parseFile(file);

    setFileA(parsed);

  }, []);

  const onDropB = useCallback(async (acceptedFiles: File[]) => {

    const file = acceptedFiles[0];

    if (!file) return;

    setFileBName(file.name);

    const parsed = await parseFile(file);

    setFileB(parsed);

  }, []);

  const dropzoneA = useDropzone({
    onDrop: onDropA,
    multiple: false,
  });

  const dropzoneB = useDropzone({
    onDrop: onDropB,
    multiple: false,
  });

  return (
    <div className="space-y-10">

      {/* Upload Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

        {/* File A */}
        <div
          {...dropzoneA.getRootProps()}
          className="border-2 border-dashed border-cyan-400/30 hover:border-cyan-400 transition rounded-3xl p-10 text-center bg-white/5 cursor-pointer"
        >

          <input {...dropzoneA.getInputProps()} />

          <h3 className="text-2xl font-semibold mb-3">
            Upload File A
          </h3>

          <p className="text-slate-400">
            CSV or XLSX
          </p>

          {
            fileAName && (
              <p className="mt-4 text-cyan-300">
                {fileAName}
              </p>
            )
          }

        </div>

        {/* File B */}
        <div
          {...dropzoneB.getRootProps()}
          className="border-2 border-dashed border-cyan-400/30 hover:border-cyan-400 transition rounded-3xl p-10 text-center bg-white/5 cursor-pointer"
        >

          <input {...dropzoneB.getInputProps()} />

          <h3 className="text-2xl font-semibold mb-3">
            Upload File B
          </h3>

          <p className="text-slate-400">
            CSV or XLSX
          </p>

          {
            fileBName && (
              <p className="mt-4 text-cyan-300">
                {fileBName}
              </p>
            )
          }

        </div>

      </div>

      {/* Column Selectors */}
      {
        fileA && fileB && (
          <div className="rounded-3xl border border-white/10 bg-white/5 p-8">

            <h3 className="text-2xl font-semibold mb-8">
              Select Matching Columns
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

              <div>

                <label className="block mb-3 text-slate-300">
                  File A Column
                </label>

                <select
                  value={selectedA}
                  onChange={(e) => setSelectedA(e.target.value)}
                  className="w-full rounded-2xl bg-slate-900 border border-white/10 p-4"
                >

                  <option value="">
                    Select Column
                  </option>

                  {
                    fileA.headers.map((header) => (
                      <option key={header} value={header}>
                        {header}
                      </option>
                    ))
                  }

                </select>

              </div>

              <div>

                <label className="block mb-3 text-slate-300">
                  File B Column
                </label>

                <select
                  value={selectedB}
                  onChange={(e) => setSelectedB(e.target.value)}
                  className="w-full rounded-2xl bg-slate-900 border border-white/10 p-4"
                >

                  <option value="">
                    Select Column
                  </option>

                  {
                    fileB.headers.map((header) => (
                      <option key={header} value={header}>
                        {header}
                      </option>
                    ))
                  }

                </select>

              </div>

            </div>

            <button
              onClick={compareFiles}
              className="mt-8 bg-cyan-500 hover:bg-cyan-400 transition px-8 py-4 rounded-2xl font-semibold"
            >
              Compare Files
            </button>

          </div>
        )
      }

      {/* Results */}
      {
        results.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-5 gap-6">

            <div className="rounded-3xl bg-cyan-500/10 border border-cyan-400/20 p-6">
                <p className="text-slate-400 mb-2">
                Total Rows
                </p>

                <h3 className="text-4xl font-bold">
                {results.length}
                </h3>
            </div>

            <div className="rounded-3xl bg-emerald-500/10 border border-emerald-400/20 p-6">
                <p className="text-slate-400 mb-2">
                Matched
                </p>

                <h3 className="text-4xl font-bold text-emerald-400">
                {matchedCount}
                </h3>
            </div>

            <div className="rounded-3xl bg-red-500/10 border border-red-400/20 p-6">
                <p className="text-slate-400 mb-2">
                Missing
                </p>

                <h3 className="text-4xl font-bold text-red-400">
                {missingCount}
                </h3>
            </div>

            <div className="rounded-3xl bg-violet-500/10 border border-violet-400/20 p-6">
                <p className="text-slate-400 mb-2">
                Match Rate
                </p>

                <h3 className="text-4xl font-bold text-violet-400">
                {Math.round((matchedCount / results.length) * 100)}%
                </h3>
            </div>

            <div className="rounded-3xl bg-amber-500/10 border border-amber-400/20 p-6">
                <p className="text-slate-400 mb-2">
                    Duplicates
                </p>

                <h3 className="text-4xl font-bold text-amber-400">
                    {duplicateCount}
                </h3>
            </div>

          </div>
        )
      }
      {
        results.length > 0 && (
          <div className="rounded-3xl border border-white/10 bg-white/5 p-8">

            <div className="flex items-center justify-between mb-6">

              <h3 className="text-2xl font-semibold">
                Comparison Results
              </h3>

              <button
                onClick={downloadCSV}
                className="bg-emerald-500 hover:bg-emerald-400 transition px-6 py-3 rounded-2xl font-medium"
              >
                Download CSV
              </button>

            </div>

            <div className="overflow-auto max-h-[700px] rounded-2xl border border-white/10">
            <table className="w-full border-collapse min-w-[900px]">

              <thead>

                <tr className="border-b border-white/10 bg-slate-950 sticky top-0 z-10">

                  {
                    Object.keys(results[0]).map((key) => (
                      <th
                        key={key}
                        className="text-left p-4"
                      >
                        {key}
                      </th>
                    ))
                  }

                </tr>

              </thead>

              <tbody>

                {
                  results.slice(0, 20).map((row, index) => (

                    <tr
                      key={index}
                      className="border-b border-white/5"
                    >

                      {
                        Object.entries(row).map(([key, value]: any, idx) => (
                        <td
                            key={idx}
                            className="p-4 text-slate-300"
                        >

                            {
                            key === "status" ? (
                                <span
                                    className={`px-3 py-1 rounded-full text-sm font-medium ${
                                    value === "Matched"
                                        ? "bg-emerald-500/20 text-emerald-400"
                                        : "bg-red-500/20 text-red-400"
                                    }`}
                                >
                                    {String(value)}
                                </span>
                                ) : key === "duplicate" ? (
                                <span
                                    className={`px-3 py-1 rounded-full text-sm font-medium ${
                                    value === "Yes"
                                        ? "bg-amber-500/20 text-amber-400"
                                        : "bg-slate-500/20 text-slate-300"
                                    }`}
                                >
                                    {String(value)}
                                </span>
                                ) : (
                                String(value)
                                )
                            }

                        </td>
                        ))
                      }

                    </tr>

                  ))
                }

              </tbody>

            </table>
            </div>

            <p className="mt-6 text-slate-400">
              Showing first 20 rows
            </p>

            <div className="mt-10">

                <h4 className="text-xl font-semibold mb-4 text-red-400">
                    Missing Rows
                </h4>

                <div className="space-y-3">

                    {
                    results
                        .filter((row) => row.status === "Missing")
                        .slice(0, 10)
                        .map((row, index) => (

                        <div
                            key={index}
                            className="rounded-2xl bg-red-500/10 border border-red-400/20 p-4"
                        >

                            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">

                            {
                                Object.entries(row).map(([key, value]: any) => (

                                <div
                                    key={key}
                                    className="rounded-xl bg-black/20 p-3"
                                >

                                    <p className="text-xs uppercase tracking-wide text-slate-500 mb-1">
                                    {key}
                                    </p>

                                    <p className="text-slate-200 break-all">
                                    {String(value)}
                                    </p>

                                </div>

                                ))
                            }

                            </div>

                        </div>

                        ))
                    }

                </div>

            </div>

          </div>
        )
      }

      {/* footer Ad Section */}

        <div className="rounded-3xl border border-dashed border-cyan-400/20 bg-white/5 p-12 text-center">

        <p className="text-slate-400 mb-2">
            Advertisement Space
        </p>

        <h3 className="text-2xl font-semibold">
            Google AdSense Placement
        </h3>

        </div>

    </div>
  );
}