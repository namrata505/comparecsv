import { supabaseAdmin } from "@/lib/supabaseAdmin";

export async function incrementAIUsage(clerkUserId: string) {
  const { data } = await supabaseAdmin
    .from("user_subscriptions")
    .select("ai_requests_today")
    .eq("clerk_user_id", clerkUserId)
    .single();

  const current = data?.ai_requests_today || 0;

  await supabaseAdmin
    .from("user_subscriptions")
    .update({
      ai_requests_today: current + 1,
    })
    .eq("clerk_user_id", clerkUserId);
}