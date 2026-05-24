export const metadata = {
  title: "Excel VLOOKUP Formula Explained | CompareCSV",
  description:
    "Learn how to use Excel VLOOKUP formula with syntax, examples, and explanations.",
};

export default function VlookupPage() {
  return (
    <main className="min-h-screen bg-slate-950 text-white">

      <section className="max-w-5xl mx-auto px-6 py-20">

        <div className="mb-12">

          <div className="inline-flex rounded-full border border-cyan-400/20 bg-cyan-400/10 px-4 py-2 text-sm text-cyan-300 mb-6">
            Excel Lookup Formula
          </div>

          <h1 className="text-5xl font-bold mb-6">
            Excel VLOOKUP Formula
          </h1>

          <p className="text-slate-300 text-lg leading-8">
            Learn how to use VLOOKUP in Excel to search and retrieve data
            from tables quickly and efficiently.
          </p>

        </div>

        <div className="rounded-3xl border border-white/10 bg-white/5 p-8 mb-10">

          <h2 className="text-2xl font-semibold mb-4">
            VLOOKUP Syntax
          </h2>

          <div className="bg-black/40 rounded-2xl p-6 text-cyan-300 font-mono text-lg overflow-x-auto">
            =VLOOKUP(lookup_value, table_array, col_index_num, [range_lookup])
          </div>

        </div>

        <div className="space-y-10 text-slate-300 leading-8">

          <div>
            <h2 className="text-3xl font-bold text-white mb-4">
              What Does VLOOKUP Do?
            </h2>

            <p>
              VLOOKUP searches for a value in the first column of a table
              and returns data from another column in the same row.
            </p>
          </div>

          <div>
            <h2 className="text-3xl font-bold text-white mb-4">
              Example
            </h2>

            <div className="bg-black/40 rounded-2xl p-6 text-cyan-300 font-mono overflow-x-auto">
              =VLOOKUP(A2, D2:F20, 2, FALSE)
            </div>
          </div>

          <div>
            <h2 className="text-3xl font-bold text-white mb-4">
              Common Uses
            </h2>

            <ul className="list-disc pl-6 space-y-2">
              <li>Employee record lookup</li>
              <li>Inventory search</li>
              <li>Product pricing</li>
              <li>Data reconciliation</li>
            </ul>
          </div>

        </div>

      </section>

    </main>
  );
}