import { supabaseAdmin } from "@/lib/supabaseAdmin";



//check usage for free users - limit is 5
/*
export async function checkAIUsage(clerkUserId: string) {
  const today = new Date().toISOString().split("T")[0];

  let { data } = await supabaseAdmin
    .from("user_subscriptions")
    .select("*")
    .eq("clerk_user_id", clerkUserId)
    .single();

  if (!data) {
    const { data: newUser } = await supabaseAdmin
      .from("user_subscriptions")
      .insert({
        clerk_user_id: clerkUserId,
        plan: "free",
        status: "free",
        ai_requests_today: 0,
        usage_date: today,
      })
      .select()
      .single();

    data = newUser;
  }

  if (!data) {
    return {
      allowed: false,
      reason: "User could not be created",
    };
  }

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

  if (data.plan === "pro") {
    return {
      allowed: true,
      plan: "pro",
      remaining: "unlimited",
    };
  }

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

*/

//unlimited usage for free users
export async function checkAIUsage(clerkUserId: string) {
  return {
    allowed: true,
    plan: "free",
    remaining: "unlimited",
    reason: "Temporary full free access enabled",
  };
}