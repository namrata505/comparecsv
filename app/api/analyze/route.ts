import { NextResponse } from "next/server";
import { auth } from "@clerk/nextjs/server";
import { checkAIUsage } from "@/lib/checkUsage";
import { incrementAIUsage } from "@/lib/incrementUsage";

export async function POST(req: Request) {
  try {
    const { userId } = await auth();

    if (!userId) {
      return NextResponse.json(
        {
          result: "Please sign in to use AI analysis.",
        },
        { status: 401 }
      );
    }

    const usage = await checkAIUsage(userId);

    if (!usage.allowed) {
      return NextResponse.json(
        {
          result:
            "Free AI limit reached. Upgrade to Pro for unlimited AI analysis.",
        },
        { status: 403 }
      );
    }

    const body = await req.json();

    const {
      prompt = "",
      rows = [],
      headers = [],
      mode = "Insights",
    } = body;

    if (!process.env.GROQ_API_KEY) {
      return NextResponse.json(
        {
          result: "Groq API key is missing on the server.",
        },
        { status: 500 }
      );
    }

    if (!rows.length) {
      return NextResponse.json(
        {
          result: "Please upload a CSV or Excel file before generating AI analysis.",
        },
        { status: 400 }
      );
    }

    const datasetPreview = rows
      .slice(0, 15)
      .map((row: any) => JSON.stringify(row))
      .join("\n");

    const systemPrompt = `
You are an AI spreadsheet analyst and data storytelling assistant for CompareCSV.

Your role:
- Analyze uploaded spreadsheet datasets
- Generate accurate insights based only on available data
- Identify trends, patterns, anomalies, missing values, and useful observations
- Create creator-friendly summaries for blogs, YouTube scripts, LinkedIn posts, reports, and SEO articles
- Avoid hallucinating numbers or facts not visible in the dataset sample
- Clearly mention when analysis is based on a sample preview
- Keep formatting clean, professional, and readable
`;

    const userPrompt = `
MODE:
${mode}

USER REQUEST:
${prompt || "Generate useful insights from this spreadsheet dataset."}

HEADERS:
${headers.join(", ")}

DATA SAMPLE:
${datasetPreview}
`;

    const response = await fetch(
      "https://api.groq.com/openai/v1/chat/completions",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${process.env.GROQ_API_KEY}`,
        },
        body: JSON.stringify({
          model: "llama-3.3-70b-versatile",
          messages: [
            {
              role: "system",
              content: systemPrompt,
            },
            {
              role: "user",
              content: userPrompt,
            },
          ],
          temperature: 0.7,
          max_tokens: 1200,
        }),
      }
    );

    const data = await response.json();

    if (!response.ok) {
      console.error("Groq API Error:", data);

      return NextResponse.json(
        {
          result:
            data?.error?.message ||
            "AI analysis could not be generated. Please try again.",
        },
        { status: response.status }
      );
    }

    const result =
      data?.choices?.[0]?.message?.content ||
      "AI analysis could not be generated.";

    await incrementAIUsage(userId);

    return NextResponse.json({
      result,
      usage,
    });
  } catch (error) {
    console.error("Analyze API Error:", error);

    return NextResponse.json(
      {
        result: "Server error while generating AI analysis.",
      },
      { status: 500 }
    );
  }
}