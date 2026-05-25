import { NextResponse } from "next/server";
import { auth } from "@clerk/nextjs/server";

function safeJsonParse(text: string) {
  const cleaned = text
    .replace(/```json/g, "")
    .replace(/```/g, "")
    .trim();

  const firstBrace = cleaned.indexOf("{");
  const lastBrace = cleaned.lastIndexOf("}");

  if (firstBrace === -1 || lastBrace === -1) {
    throw new Error("No JSON found");
  }

  return JSON.parse(cleaned.slice(firstBrace, lastBrace + 1));
}

export async function POST(req: Request) {
  try {
    const { userId } = await auth();

    if (!userId) {
      return NextResponse.json(
        { error: "Please sign in first." },
        { status: 401 }
      );
    }

    const { rows = [], headers = [] } = await req.json();

    if (!rows.length || !headers.length) {
      return NextResponse.json(
        { error: "No dataset found." },
        { status: 400 }
      );
    }

    const dataRows = rows.slice(0, 200);

    const prompt = `
You are an expert data analyst.

Analyze the uploaded spreadsheet dataset.

Return ONLY valid JSON. No markdown. No explanation outside JSON.

Dataset headers:
${headers.join(", ")}

Dataset rows:
${JSON.stringify(dataRows, null, 2)}

Your task:
- Detect dataset context, subject, and scope.
- Identify best category, numeric, date/time, and status columns.
- Recommend only relevant charts.
- Explain every chart in meaningful context.
- Use only column names that exist in headers.
- Do not invent columns.
- If no date column exists, do not recommend a trend line chart.
- If no numeric column exists, recommend distribution/count charts only.

Return JSON exactly in this shape:

{
  "datasetTitle": "short useful title",
  "datasetType": "sales | finance | HR | marketing | inventory | survey | education | operations | general",
  "summary": "meaningful paragraph about what this dataset appears to represent",
  "categoryColumn": "existing column name or empty string",
  "numericColumn": "existing column name or empty string",
  "dateColumn": "existing column name or empty string",
  "statusColumn": "existing column name or empty string",
  "charts": [
    {
      "type": "bar",
      "title": "chart title",
      "categoryColumn": "existing column name",
      "numericColumn": "existing column name",
      "description": "why this chart matters for this dataset"
    },
    {
      "type": "pie",
      "title": "chart title",
      "categoryColumn": "existing column name",
      "description": "why this distribution matters"
    },
    {
      "type": "line",
      "title": "chart title",
      "dateColumn": "existing column name",
      "numericColumn": "existing column name",
      "description": "what trend this chart explains"
    }
  ],
  "insights": [
    "specific insight based on the dataset",
    "specific insight based on the dataset",
    "specific insight based on the dataset"
  ]
}
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
          messages: [{ role: "user", content: prompt }],
          temperature: 0.2,
          max_tokens: 1600,
        }),
      }
    );

    const data = await response.json();

    if (!response.ok) {
      return NextResponse.json(
        {
          error:
            data?.error?.message || "AI chart planning failed.",
        },
        { status: response.status }
      );
    }

    const raw = data?.choices?.[0]?.message?.content || "{}";
    const result = safeJsonParse(raw);

    return NextResponse.json(result);
  } catch (error) {
    console.error("AI chart plan error:", error);

    return NextResponse.json(
      { error: "AI chart analysis failed." },
      { status: 500 }
    );
  }
}