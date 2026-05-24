"use client";

import { useMemo, useState } from "react";
import Papa from "papaparse";

type Props = {
  slug: string;
};

type Row = Record<string, string>;

function parseCSV(text: string): Row[] {
  const parsed = Papa.parse<Row>(text, {
    header: true,
    skipEmptyLines: true,
  });

  return parsed.data;
}

export default function FormulaTool({ slug }: Props) {
  const [csvText, setCsvText] = useState(
`id,name,department,salary
101,Asha,Marketing,50000
102,Ravi,Finance,65000
103,Neha,HR,45000`
  );

  const [lookupValue, setLookupValue] = useState("102");
  const [lookupColumn, setLookupColumn] = useState("id");
  const [returnColumn, setReturnColumn] = useState("name");

  const [criteriaColumn, setCriteriaColumn] = useState("department");
  const [criteriaValue, setCriteriaValue] = useState("Finance");
  const [sumColumn, setSumColumn] = useState("salary");

  const rows = useMemo(() => parseCSV(csvText), [csvText]);
  const headers = rows.length > 0 ? Object.keys(rows[0]) : [];

  const lookupResult = useMemo(() => {
    const match = rows.find(
      (row) => String(row[lookupColumn]) === String(lookupValue)
    );

    return match ? match[returnColumn] : "No match found";
  }, [rows, lookupColumn, lookupValue, returnColumn]);

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

      {(slug === "vlookup" || slug === "xlookup") && (
        <div className="mt-8 grid md:grid-cols-3 gap-4">

          <input
            value={lookupValue}
            onChange={(e) => setLookupValue(e.target.value)}
            placeholder="Lookup value"
            className="rounded-2xl bg-slate-900 border border-white/10 p-4 text-white"
          />

          <select
            value={lookupColumn}
            onChange={(e) => setLookupColumn(e.target.value)}
            className="rounded-2xl bg-slate-900 border border-white/10 p-4 text-white"
          >
            {headers.map((header) => (
              <option key={header} value={header}>{header}</option>
            ))}
          </select>

          <select
            value={returnColumn}
            onChange={(e) => setReturnColumn(e.target.value)}
            className="rounded-2xl bg-slate-900 border border-white/10 p-4 text-white"
          >
            {headers.map((header) => (
              <option key={header} value={header}>{header}</option>
            ))}
          </select>

        </div>
      )}

      {(slug === "sumifs" || slug === "countifs") && (
        <div className="mt-8 grid md:grid-cols-3 gap-4">

          {slug === "sumifs" && (
            <select
              value={sumColumn}
              onChange={(e) => setSumColumn(e.target.value)}
              className="rounded-2xl bg-slate-900 border border-white/10 p-4 text-white"
            >
              {headers.map((header) => (
                <option key={header} value={header}>{header}</option>
              ))}
            </select>
          )}

          <select
            value={criteriaColumn}
            onChange={(e) => setCriteriaColumn(e.target.value)}
            className="rounded-2xl bg-slate-900 border border-white/10 p-4 text-white"
          >
            {headers.map((header) => (
              <option key={header} value={header}>{header}</option>
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
          {slug === "sumifs"
            ? sumifsResult
            : slug === "countifs"
            ? countifsResult
            : lookupResult}
        </div>

      </div>

    </section>
  );
}