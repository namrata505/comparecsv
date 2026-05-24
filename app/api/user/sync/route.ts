import { NextResponse } from "next/server";
import { currentUser } from "@clerk/nextjs/server";
import { supabaseAdmin } from "@/lib/supabaseAdmin";

export async function POST() {
  try {
    const user = await currentUser();

    if (!user) {
      return NextResponse.json(
        { error: "Not authenticated" },
        { status: 401 }
      );
    }

    const email = user.emailAddresses?.[0]?.emailAddress || "";

    const { error } = await supabaseAdmin
      .from("user_subscriptions")
      .upsert(
        {
          clerk_user_id: user.id,
          email,
          plan: "free",
          status: "free",
          updated_at: new Date().toISOString(),
        },
        {
          onConflict: "clerk_user_id",
        }
      );

    if (error) {
      return NextResponse.json({ error }, { status: 500 });
    }

    return NextResponse.json({
      success: true,
      clerkUserId: user.id,
    });
  } catch (error) {
    return NextResponse.json(
      { error: "User sync failed" },
      { status: 500 }
    );
  }
}