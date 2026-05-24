export default function PaymentSuccessPage() {
  return (
    <main className="min-h-screen bg-slate-950 text-white">
      <section className="max-w-4xl mx-auto px-6 py-24 text-center">
        <div className="inline-flex items-center rounded-full border border-cyan-400/20 bg-cyan-400/10 px-4 py-2 text-cyan-300 text-sm mb-8">
          Payment Successful
        </div>

        <h1 className="text-5xl font-bold mb-8">
          Welcome to CompareCSV Pro
        </h1>

        <p className="text-slate-300 text-lg leading-8 mb-10">
          Your payment was completed successfully. You can now continue using
          CompareCSV AI tools.
        </p>

        <a
          href="/analyze"
          className="inline-flex rounded-2xl bg-cyan-500 hover:bg-cyan-400 px-8 py-4 text-black font-semibold transition"
        >
          Open AI Analyzer
        </a>
      </section>
    </main>
  );
}