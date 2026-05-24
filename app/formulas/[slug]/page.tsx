import { formulas } from "@/app/lib/formulas";
import { notFound } from "next/navigation";

type Props = {
  params: Promise<{
    slug: string;
  }>;
};

export async function generateMetadata({ params }: Props) {
  const { slug } = await params;

  const formula = formulas.find((f) => f.slug === slug);

  if (!formula) {
    return {
      title: "Formula Not Found",
    };
  }

  return {
    title: formula.title,
    description: formula.description,
  };
}

export default async function FormulaPage({ params }: Props) {
  const { slug } = await params;

  const formula = formulas.find((f) => f.slug === slug);

  if (!formula) {
    notFound();
  }

  return (
    <main className="min-h-screen bg-slate-950 text-white">

      <section className="max-w-5xl mx-auto px-6 py-20">

        <h1 className="text-5xl font-bold mb-6">
          {formula.title}
        </h1>

        <p className="text-slate-300 text-lg leading-8 mb-10">
          {formula.description}
        </p>

        <div className="rounded-3xl border border-white/10 bg-white/5 p-8 mb-10">

          <h2 className="text-2xl font-semibold mb-4">
            Syntax
          </h2>

          <div className="bg-black/40 rounded-2xl p-6 text-cyan-300 font-mono overflow-x-auto">
            {formula.syntax}
          </div>

        </div>

        <div className="rounded-3xl border border-white/10 bg-white/5 p-8 mb-10">

          <h2 className="text-2xl font-semibold mb-4">
            Example
          </h2>

          <div className="bg-black/40 rounded-2xl p-6 text-cyan-300 font-mono overflow-x-auto">
            {formula.example}
          </div>

        </div>

        <div className="text-slate-300 text-lg leading-8">
          {formula.content}
        </div>

      </section>

    </main>
  );
}