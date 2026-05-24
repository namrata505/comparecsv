import { NextResponse } from "next/server";

export async function POST() {
  try {
    const apiKey = process.env.LEMONSQUEEZY_API_KEY;
    const storeId = process.env.LEMONSQUEEZY_STORE_ID;
    const variantId = process.env.LEMONSQUEEZY_PRO_VARIANT_ID;
    const appUrl = process.env.NEXT_PUBLIC_APP_URL || "https://comparecsv.org";

    if (!apiKey || !storeId || !variantId) {
      return NextResponse.json(
        { error: "Lemon Squeezy environment variables are missing." },
        { status: 500 }
      );
    }

    const response = await fetch("https://api.lemonsqueezy.com/v1/checkouts", {
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
            checkout_options: {
              embed: false,
              media: false,
              logo: true,
            },
            checkout_data: {
              custom: {
                source: "comparecsv_pricing_page",
              },
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
                id: storeId,
              },
            },
            variant: {
              data: {
                type: "variants",
                id: variantId,
              },
            },
          },
        },
      }),
    });

    const data = await response.json();

    if (!response.ok) {
      return NextResponse.json(
        { error: data },
        { status: response.status }
      );
    }

    return NextResponse.json({
      url: data.data.attributes.url,
    });
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      { error: "Failed to create checkout." },
      { status: 500 }
    );
  }
}