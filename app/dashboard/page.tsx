import { currentUser } from "@clerk/nextjs/server";
import { supabaseAdmin } from "@/lib/supabaseAdmin";
import Link from "next/link";

export default async function DashboardPage() {
  const user = await currentUser();

  if (!user) {
    return (
      <main className="min-h-screen bg-slate-950 text-white px-6 py-24">
        <h1 className="text-4xl font-bold mb-6">Please sign in</h1>
        <p className="text-slate-400">
          Sign in to view your CompareCSV dashboard.
        </p>
      </main>
    );
  }

  const { data } = await supabaseAdmin
    .from("user_subscriptions")
    .select("*")
    .eq("clerk_user_id", user.id)
    .single();

  return (
    <main className="min-h-screen bg-slate-950 text-white px-6 py-24">
      <section className="max-w-5xl mx-auto">
        <h1 className="text-5xl font-bold mb-8">
          Dashboard
        </h1>

        <div className="rounded-3xl border border-white/10 bg-white/5 p-10">
          <h2 className="text-3xl font-bold mb-6">
            Your Plan
          </h2>

          <p className="text-slate-300 text-lg mb-4">
            Email: {user.emailAddresses?.[0]?.emailAddress}
          </p>

          <p className="text-slate-300 text-lg mb-4">
            Plan:{" "}
            <span className="text-cyan-400 font-semibold">
              {data?.plan || "free"}
            </span>
          </p>

          <p className="text-slate-300 text-lg mb-8">
            Status:{" "}
            <span className="text-cyan-400 font-semibold">
              {data?.status || "free"}
            </span>
          </p>

          <Link
            href="/pricing"
            className="inline-flex rounded-2xl bg-cyan-500 px-6 py-3 font-semibold text-black"
          >
            Manage Plan
          </Link>
        </div>
      </section>
    </main>
  );
}