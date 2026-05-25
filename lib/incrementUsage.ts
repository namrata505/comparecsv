import { supabaseAdmin } from "@/lib/supabaseAdmin";


//increment usage for free users - limit is 5
/*

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

*/

//unlimited usage for free users
export async function incrementAIUsage(clerkUserId: string) {
  return;
}