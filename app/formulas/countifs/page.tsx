export const metadata = {
  title: "Excel COUNTIFS Formula | CompareCSV",
  description:
    "Learn how to use COUNTIFS formula in Excel with syntax and examples.",
};

export default function CountifsPage() {
  return (
    <main className="min-h-screen bg-slate-950 text-white">

      <section className="max-w-5xl mx-auto px-6 py-20">

        <h1 className="text-5xl font-bold mb-8">
          Excel COUNTIFS Formula
        </h1>

        <p className="text-slate-300 text-lg leading-8 mb-8">
          COUNTIFS counts cells that match multiple conditions in Excel.
        </p>

        <div className="bg-black/40 rounded-2xl p-6 text-cyan-300 font-mono overflow-x-auto">
          =COUNTIFS(A:A,"HR",B:B,"Active")
        </div>

      </section>

    </main>
  );
}