import Link from "next/link";

export const metadata = {
  title: "Excel Formula Library | CompareCSV",
  description:
    "Learn Excel formulas online with syntax, examples, explanations, and spreadsheet guides.",
};

const formulas = [
  {
    name: "VLOOKUP",
    slug: "vlookup",
    desc: "Search values vertically in Excel tables.",
  },
  {
    name: "XLOOKUP",
    slug: "xlookup",
    desc: "Modern replacement for VLOOKUP.",
  },
  {
    name: "IF Formula",
    slug: "if",
    desc: "Perform logical tests in Excel.",
  },
  {
    name: "SUMIFS",
    slug: "sumifs",
    desc: "Sum values using multiple conditions.",
  },
  {
    name: "COUNTIFS",
    slug: "countifs",
    desc: "Count rows matching conditions.",
  },
];

export default function FormulaLibraryPage() {
  return (
    <main className="min-h-screen bg-slate-950 text-white">

      <section className="max-w-7xl mx-auto px-6 py-20">

        <div className="text-center mb-16">

          <div className="inline-flex rounded-full border border-cyan-400/20 bg-cyan-400/10 px-4 py-2 text-sm text-cyan-300 mb-6">
            Excel Formula Library
          </div>

          <h1 className="text-5xl md:text-6xl font-bold mb-6">
            Learn Excel Formulas Online
          </h1>

          <p className="text-slate-300 text-lg max-w-3xl mx-auto leading-8">
            Explore Excel formulas with syntax, examples,
            explanations, and spreadsheet tutorials.
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
                {formula.name}
              </h2>

              <p className="text-slate-400 leading-7">
                {formula.desc}
              </p>
            </Link>
          ))}

        </div>

      </section>

    </main>
  );
}