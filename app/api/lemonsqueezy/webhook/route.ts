import crypto from "crypto";
import { NextResponse } from "next/server";
import { supabaseAdmin } from "@/lib/supabaseAdmin";

function verifySignature(rawBody: string, signature: string | null) {
  const secret = process.env.LEMONSQUEEZY_WEBHOOK_SECRET;

  if (!secret || !signature) return false;

  const hmac = crypto
    .createHmac("sha256", secret)
    .update(rawBody)
    .digest("hex");

  return crypto.timingSafeEqual(
    Buffer.from(hmac),
    Buffer.from(signature)
  );
}

export async function POST(req: Request) {
  try {
    const rawBody = await req.text();

    const signature = req.headers.get("x-signature");

    const isValid = verifySignature(rawBody, signature);

    if (!isValid) {
      return NextResponse.json(
        { error: "Invalid signature" },
        { status: 401 }
      );
    }

    const event = JSON.parse(rawBody);

    const eventName = event.meta?.event_name;

    const customData = event.meta?.custom_data || {};

    const clerkUserId = customData.clerk_user_id;

    const attributes = event.data?.attributes || {};

    const lemonSubscriptionId = String(event.data?.id || "");
    const lemonCustomerId = String(attributes.customer_id || "");
    const lemonVariantId = String(attributes.variant_id || "");
    const status = attributes.status || "unknown";

    if (!clerkUserId) {
      return NextResponse.json({
        received: true,
        warning: "Missing Clerk user ID",
      });
    }

    if (
      eventName === "subscription_created" ||
      eventName === "subscription_updated" ||
      eventName === "subscription_resumed" ||
      eventName === "subscription_payment_success"
    ) {
      await supabaseAdmin
        .from("user_subscriptions")
        .upsert(
          {
            clerk_user_id: clerkUserId,
            plan: status === "active" ? "pro" : "free",
            status,
            lemon_customer_id: lemonCustomerId,
            lemon_subscription_id: lemonSubscriptionId,
            lemon_variant_id: lemonVariantId,
            updated_at: new Date().toISOString(),
          },
          {
            onConflict: "clerk_user_id",
          }
        );
    }

    if (
      eventName === "subscription_cancelled" ||
      eventName === "subscription_expired" ||
      eventName === "subscription_paused"
    ) {
      await supabaseAdmin
        .from("user_subscriptions")
        .upsert(
          {
            clerk_user_id: clerkUserId,
            plan: "free",
            status,
            lemon_customer_id: lemonCustomerId,
            lemon_subscription_id: lemonSubscriptionId,
            lemon_variant_id: lemonVariantId,
            updated_at: new Date().toISOString(),
          },
          {
            onConflict: "clerk_user_id",
          }
        );
    }

    return NextResponse.json({
      received: true,
    });
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      { error: "Webhook failed" },
      { status: 500 }
    );
  }
}