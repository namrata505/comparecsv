import Link from "next/link";
import { formulas } from "@//app/lib/formulas";

export const metadata = {
  title: "Excel Formula Library | CompareCSV",
  description:
    "Learn Excel formulas with syntax, examples, and guides.",
};

export default function FormulasPage() {
  return (
    <main className="min-h-screen bg-slate-950 text-white">

      <section className="max-w-7xl mx-auto px-6 py-20">

        <div className="text-center mb-16">

          <h1 className="text-5xl font-bold mb-6">
            Excel Formula Library
          </h1>

          <p className="text-slate-300 text-lg">
            Learn popular Excel formulas with examples and syntax.
          </p>

        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">

          {formulas.map((formula) => (
            <Link
              key={formula.slug}
              href={`/formulas/${formula.slug}`}
              className="rounded-3xl border border-white/10 bg-white/5 p-8 hover:border-cyan-400/40 transition"
            >
              <h2 className="text-2xl font-semibold mb-4">
                {formula.title}
              </h2>

              <p className="text-slate-400">
                {formula.description}
              </p>

            </Link>
          ))}

        </div>

      </section>

    </main>
  );
}