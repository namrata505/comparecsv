import { NextResponse } from "next/server";
import { currentUser } from "@clerk/nextjs/server";
import { supabaseAdmin } from "@/lib/supabaseAdmin";

async function syncUser() {
  try {
    const user = await currentUser();

    if (!user) {
      return NextResponse.json(
        { error: "Not signed in" },
        { status: 401 }
      );
    }

    const email = user.emailAddresses?.[0]?.emailAddress || "";

    const { data, error } = await supabaseAdmin
      .from("user_subscriptions")
      .upsert(
        {
          clerk_user_id: user.id,
          email,
          plan: "free",
          status: "free",
          ai_requests_today: 0,
          uploads_today: 0,
          usage_date: new Date().toISOString().split("T")[0],
          updated_at: new Date().toISOString(),
        },
        {
          onConflict: "clerk_user_id",
        }
      )
      .select()
      .single();

    if (error) {
      return NextResponse.json(
        {
          error: error.message,
          details: error,
        },
        { status: 500 }
      );
    }

    return NextResponse.json({
      success: true,
      user: data,
    });
  } catch (error) {
    return NextResponse.json(
      {
        error: "User sync failed",
        details: String(error),
      },
      { status: 500 }
    );
  }
}

export async function GET() {
  return syncUser();
}

export async function POST() {
  return syncUser();
}