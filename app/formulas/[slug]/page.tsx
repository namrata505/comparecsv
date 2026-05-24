"use client";

import { Copy } from "lucide-react";
import { formulas } from "@/lib/formulas";
import { notFound } from "next/navigation";

type Props = {
  params: {
    slug: string;
  };
};

export default function FormulaPage({ params }: Props) {
  const formula = formulas.find((f) => f.slug === params.slug);

  if (!formula) {
    notFound();
  }

  return (
    <main className="min-h-screen bg-slate-950 text-white">

      <section className="max-w-5xl mx-auto px-6 py-20">

        {/* Title */}

        <h1 className="text-5xl font-bold mb-6">
          {formula.title}
        </h1>

        <p className="text-slate-300 text-lg leading-8 mb-10">
          {formula.description}
        </p>

        {/* Syntax */}

        <div className="rounded-3xl border border-white/10 bg-white/5 p-8 mb-10">

          <div className="flex items-center justify-between mb-4">

            <h2 className="text-2xl font-semibold">
              Syntax
            </h2>

            <button
              onClick={() => navigator.clipboard.writeText(formula.syntax)}
              className="flex items-center gap-2 bg-cyan-500 hover:bg-cyan-400 text-black px-4 py-2 rounded-xl font-medium transition"
            >
              <Copy size={18} />
              Copy
            </button>

          </div>

          <div className="bg-black/40 rounded-2xl p-6 text-cyan-300 font-mono overflow-x-auto">
            {formula.syntax}
          </div>

        </div>

        {/* Example */}

        <div className="rounded-3xl border border-white/10 bg-white/5 p-8 mb-10">

          <h2 className="text-2xl font-semibold mb-4">
            Example
          </h2>

          <div className="bg-black/40 rounded-2xl p-6 text-cyan-300 font-mono overflow-x-auto">
            {formula.example}
          </div>

        </div>

        {/* Playground */}

        <div className="rounded-3xl border border-white/10 bg-white/5 p-8 mb-10">

          <h2 className="text-2xl font-semibold mb-6">
            Try Formula
          </h2>

          <textarea
            placeholder="Type your Excel formula here..."
            className="w-full h-40 rounded-2xl bg-black/40 border border-white/10 p-6 outline-none text-cyan-300 font-mono"
          />

        </div>

        {/* Content */}

        <div className="text-slate-300 text-lg leading-8 mb-16">
          {formula.content}
        </div>

        {/* Examples Table */}

        {formula.examples && formula.examples.length > 0 && (

          <div className="mt-16">

            <h2 className="text-3xl font-bold mb-6">
              Formula Examples
            </h2>

            <div className="overflow-x-auto rounded-3xl border border-white/10">

              <table className="w-full text-left">

                <thead className="bg-white/10">
                  <tr>
                    <th className="p-4">Input</th>
                    <th className="p-4">Formula</th>
                    <th className="p-4">Output</th>
                  </tr>
                </thead>

                <tbody>

                  {formula.examples.map((item, index) => (

                    <tr
                      key={index}
                      className="border-t border-white/10"
                    >

                      <td className="p-4 text-slate-300">
                        {item.input}
                      </td>

                      <td className="p-4 text-cyan-300 font-mono">
                        {item.formula}
                      </td>

                      <td className="p-4 text-green-400">
                        {item.output}
                      </td>

                    </tr>

                  ))}

                </tbody>

              </table>

            </div>

          </div>

        )}

        {/* Related Formulas */}

        {formula.related && formula.related.length > 0 && (

          <div className="mt-20">

            <h2 className="text-3xl font-bold mb-8">
              Related Formulas
            </h2>

            <div className="flex flex-wrap gap-4">

              {formula.related.map((slug) => {
                const relatedFormula = formulas.find(
                  (f) => f.slug === slug
                );

                if (!relatedFormula) return null;

                return (
                  <a
                    key={slug}
                    href={`/formulas/${slug}`}
                    className="rounded-2xl border border-white/10 bg-white/5 px-6 py-4 hover:border-cyan-400/40 transition"
                  >
                    {relatedFormula.title}
                  </a>
                );
              })}

            </div>

          </div>

        )}

      </section>

    </main>
  );
}