import Link from "next/link";
import { currentUser } from "@clerk/nextjs/server";
import { supabaseAdmin } from "@/lib/supabaseAdmin";

import {
  Sparkles,
  Database,
  Crown,
  Upload,
  BarChart3,
  ArrowRight,
} from "lucide-react";

export default async function DashboardPage() {
  const user = await currentUser();

  if (!user) {
    return (
      <main className="min-h-screen bg-slate-950 text-white px-6 py-24">
        <section className="max-w-4xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 rounded-full border border-cyan-400/20 bg-cyan-400/10 px-4 py-2 text-cyan-300 text-sm mb-8">
            <Sparkles size={16} />
            CompareCSV Dashboard
          </div>

          <h1 className="text-5xl font-bold mb-8">
            Please Sign In
          </h1>

          <p className="text-slate-400 text-lg leading-8 mb-10">
            Sign in to access your AI dashboard,
            usage analytics, subscription details,
            and saved reports.
          </p>

          <Link
            href="/"
            className="inline-flex items-center gap-2 rounded-2xl bg-cyan-500 hover:bg-cyan-400 px-8 py-4 font-semibold text-black transition"
          >
            Go Home
            <ArrowRight size={18} />
          </Link>
        </section>
      </main>
    );
  }

  const { data } = await supabaseAdmin
    .from("user_subscriptions")
    .select("*")
    .eq("clerk_user_id", user.id)
    .single();

  const plan = data?.plan || "free";

  const usageToday = data?.ai_requests_today || 0;

  const isPro = plan === "pro";

  const freeLimit = 5;

  const remaining = isPro
    ? "Unlimited"
    : Math.max(0, freeLimit - usageToday);

  return (
    <main className="min-h-screen bg-slate-950 text-white">

      {/* HERO */}
      <section className="max-w-7xl mx-auto px-6 py-20">

        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-10">

          <div>

            <div className="inline-flex items-center gap-2 rounded-full border border-cyan-400/20 bg-cyan-400/10 px-4 py-2 text-sm text-cyan-300 mb-6">
              <Sparkles size={16} />
              CompareCSV Dashboard
            </div>

            <h1 className="text-5xl md:text-6xl font-bold leading-tight mb-6">
              Welcome Back
              <span className="block text-cyan-400 mt-2">
                {user.firstName || "User"}
              </span>
            </h1>

            <p className="text-slate-300 text-lg leading-8 max-w-3xl">
              Manage your AI analysis usage,
              subscription plan,
              and spreadsheet intelligence workflow.
            </p>

          </div>

          <div className="rounded-[32px] border border-cyan-400/20 bg-cyan-500/10 p-10 min-w-[320px]">

            <div className="flex items-center gap-3 mb-6">

              <Crown className="text-cyan-400" />

              <h2 className="text-2xl font-bold">
                {isPro ? "Pro Plan" : "Free Plan"}
              </h2>

            </div>

            <p className="text-slate-300 mb-4">
              {user.emailAddresses?.[0]?.emailAddress}
            </p>

            <div className="text-5xl font-bold mb-4 text-cyan-400">
              {isPro ? "PRO" : "FREE"}
            </div>

            <p className="text-slate-400 leading-7">
              {isPro
                ? "Unlimited AI generations and advanced spreadsheet analysis."
                : "Upgrade to Pro for unlimited AI reports and advanced features."}
            </p>

          </div>

        </div>

      </section>

      {/* STATS */}
      <section className="max-w-7xl mx-auto px-6">

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">

          <div className="rounded-3xl border border-white/10 bg-white/5 p-8">

            <Database className="text-cyan-400 mb-5" size={32} />

            <div className="text-4xl font-bold mb-2">
              {usageToday}
            </div>

            <div className="text-slate-400">
              AI Requests Today
            </div>

          </div>

          <div className="rounded-3xl border border-white/10 bg-white/5 p-8">

            <BarChart3 className="text-cyan-400 mb-5" size={32} />

            <div className="text-4xl font-bold mb-2">
              {remaining}
            </div>

            <div className="text-slate-400">
              Remaining Requests
            </div>

          </div>

          <div className="rounded-3xl border border-white/10 bg-white/5 p-8">

            <Upload className="text-cyan-400 mb-5" size={32} />

            <div className="text-4xl font-bold mb-2">
              {isPro ? "Unlimited" : "Basic"}
            </div>

            <div className="text-slate-400">
              Upload Access
            </div>

          </div>

          <div className="rounded-3xl border border-white/10 bg-white/5 p-8">

            <Crown className="text-cyan-400 mb-5" size={32} />

            <div className="text-4xl font-bold mb-2">
              {isPro ? "Active" : "Free"}
            </div>

            <div className="text-slate-400">
              Subscription Status
            </div>

          </div>

        </div>

      </section>

      {/* PLAN DETAILS */}
      <section className="max-w-7xl mx-auto px-6 py-20">

        <div className="grid lg:grid-cols-2 gap-8">

          {/* PLAN */}
          <div className="rounded-[32px] border border-white/10 bg-white/5 p-10">

            <h2 className="text-3xl font-bold mb-8">
              Your Subscription
            </h2>

            <div className="space-y-6 text-lg">

              <div className="flex items-center justify-between border-b border-white/10 pb-4">
                <span className="text-slate-400">
                  Current Plan
                </span>

                <span className="text-cyan-400 font-semibold capitalize">
                  {plan}
                </span>
              </div>

              <div className="flex items-center justify-between border-b border-white/10 pb-4">
                <span className="text-slate-400">
                  AI Usage Today
                </span>

                <span className="text-white font-semibold">
                  {usageToday}
                </span>
              </div>

              <div className="flex items-center justify-between border-b border-white/10 pb-4">
                <span className="text-slate-400">
                  Remaining
                </span>

                <span className="text-white font-semibold">
                  {remaining}
                </span>
              </div>

            </div>

            {!isPro && (

              <div className="mt-10">

                <Link
                  href="/pricing"
                  className="inline-flex items-center gap-2 rounded-2xl bg-cyan-500 hover:bg-cyan-400 px-8 py-4 font-semibold text-black transition"
                >
                  Upgrade to Pro
                  <ArrowRight size={18} />
                </Link>

              </div>

            )}

          </div>

          {/* FEATURES */}
          <div className="rounded-[32px] border border-white/10 bg-white/5 p-10">

            <h2 className="text-3xl font-bold mb-8">
              Pro Features
            </h2>

            <div className="space-y-5">

              {[
                "Unlimited AI generations",
                "Advanced spreadsheet analysis",
                "Multi-file AI workflows",
                "Business intelligence reports",
                "Blog and YouTube content generation",
                "Future PDF exports",
                "Future saved dashboards",
              ].map((item) => (

                <div
                  key={item}
                  className="rounded-2xl border border-white/10 bg-black/20 p-5 text-slate-300"
                >
                  {item}
                </div>

              ))}

            </div>

          </div>

        </div>

      </section>

      {/* QUICK ACTIONS */}
      <section className="max-w-7xl mx-auto px-6 pb-24">

        <div className="rounded-[36px] border border-cyan-400/20 bg-cyan-500/10 p-12">

          <h2 className="text-4xl font-bold mb-8">
            Continue Your Workflow
          </h2>

          <div className="flex flex-wrap gap-5">

            <Link
              href="/analyze"
              className="inline-flex items-center gap-2 rounded-2xl bg-cyan-500 hover:bg-cyan-400 px-8 py-4 font-semibold text-black transition"
            >
              Open AI Analyzer
              <ArrowRight size={18} />
            </Link>

            <Link
              href="/formulas"
              className="inline-flex items-center gap-2 rounded-2xl border border-white/10 bg-white/5 hover:border-cyan-400/40 px-8 py-4 font-semibold transition"
            >
              Explore Formulas
            </Link>

          </div>

        </div>

      </section>

    </main>
  );
}