import { supabaseAdmin } from "@/lib/supabaseAdmin";

export async function checkAIUsage(clerkUserId: string) {
  const today = new Date().toISOString().split("T")[0];

  const { data, error } = await supabaseAdmin
    .from("user_subscriptions")
    .select("*")
    .eq("clerk_user_id", clerkUserId)
    .single();

  if (error || !data) {
    return {
      allowed: false,
      reason: "User not found",
    };
  }

  // Reset usage daily
  if (data.usage_date !== today) {
    await supabaseAdmin
      .from("user_subscriptions")
      .update({
        ai_requests_today: 0,
        usage_date: today,
      })
      .eq("clerk_user_id", clerkUserId);

    data.ai_requests_today = 0;
  }

  // Pro users unlimited
  if (data.plan === "pro") {
    return {
      allowed: true,
      plan: "pro",
      remaining: "unlimited",
    };
  }

  // Free limit
  const FREE_LIMIT = 5;

  if (data.ai_requests_today >= FREE_LIMIT) {
    return {
      allowed: false,
      plan: "free",
      remaining: 0,
      reason: "Daily AI limit reached",
    };
  }

  return {
    allowed: true,
    plan: "free",
    remaining: FREE_LIMIT - data.ai_requests_today,
  };
}