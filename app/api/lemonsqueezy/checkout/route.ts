import { NextResponse } from "next/server";
import { currentUser } from "@clerk/nextjs/server";

export async function POST() {
  try {
    const user = await currentUser();

    if (!user) {
      return NextResponse.json(
        { error: "Please sign in before upgrading." },
        { status: 401 }
      );
    }

    const apiKey = process.env.LEMONSQUEEZY_API_KEY;
    const storeId = process.env.LEMONSQUEEZY_STORE_ID;
    const variantId = process.env.LEMONSQUEEZY_PRO_VARIANT_ID;
    const appUrl = process.env.NEXT_PUBLIC_APP_URL || "https://comparecsv.org";

    if (!apiKey || !storeId || !variantId) {
      return NextResponse.json(
        {
          error: "Missing environment variables",
          details: {
            hasApiKey: Boolean(apiKey),
            storeId,
            variantId,
          },
        },
        { status: 500 }
      );
    }

    const userEmail =
      user.emailAddresses?.[0]?.emailAddress || "";

    const response = await fetch(
      "https://api.lemonsqueezy.com/v1/checkouts",
      {
        method: "POST",
        headers: {
          Accept: "application/vnd.api+json",
          "Content-Type": "application/vnd.api+json",
          Authorization: `Bearer ${apiKey}`,
        },
        body: JSON.stringify({
          data: {
            type: "checkouts",
            attributes: {
              checkout_data: {
                email: userEmail,
                custom: {
                  clerk_user_id: user.id,
                  email: userEmail,
                  source: "comparecsv_pricing_page",
                },
              },
              checkout_options: {
                embed: false,
                media: false,
                logo: true,
              },
              product_options: {
                redirect_url: `${appUrl}/payment-success`,
                receipt_button_text: "Go to CompareCSV",
                receipt_link_url: `${appUrl}/analyze`,
              },
            },
            relationships: {
              store: {
                data: {
                  type: "stores",
                  id: String(storeId),
                },
              },
              variant: {
                data: {
                  type: "variants",
                  id: String(variantId),
                },
              },
            },
          },
        }),
      }
    );

    const data = await response.json();

    if (!response.ok) {
      console.error("Lemon Squeezy checkout failed:", data);

      return NextResponse.json(
        {
          error: "Lemon Squeezy checkout failed",
          details: data,
        },
        { status: response.status }
      );
    }

    return NextResponse.json({
      url: data?.data?.attributes?.url,
    });
  } catch (error) {
    console.error("Checkout error:", error);

    return NextResponse.json(
      {
        error: "Failed to create checkout",
        details: String(error),
      },
      { status: 500 }
    );
  }
}