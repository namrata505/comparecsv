import { NextResponse } from "next/server";
import { auth } from "@clerk/nextjs/server";

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

    if (!process.env.GROQ_API_KEY) {
      return NextResponse.json(
        { error: "Groq API key is missing." },
        { status: 500 }
      );
    }

    if (!rows.length || !headers.length) {
      return NextResponse.json(
        { error: "No dataset found." },
        { status: 400 }
      );
    }

    const dataRows = rows.slice(0, 80);

    const prompt = `
Analyze this spreadsheet dataset and return JSON only.

Headers:
${headers.join(", ")}

Rows:
${JSON.stringify(dataRows)}

Return this exact JSON structure:
{
  "datasetTitle": "short title",
  "datasetType": "sales | finance | HR | marketing | inventory | survey | education | operations | general",
  "summary": "short meaningful summary",
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
      "description": "meaningful description"
    },
    {
      "type": "pie",
      "title": "chart title",
      "categoryColumn": "existing column name",
      "description": "meaningful description"
    }
  ],
  "insights": [
    "insight 1",
    "insight 2",
    "insight 3"
  ]

  "keyColumns": [
    {
        "name": "column name",
        "role": "date | category | numeric | identifier | status",
        "reason": "why this column is important"
    }
    ],
    
    "suggestedYAxisColumns": ["column1", "column2"]
}

Rules:
- Use only columns that exist in headers.
- Recommend line chart only if a real date/time column exists.
- If no numeric column exists, recommend pie/count charts only.
- Do not include markdown.
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
              content:
                "You are a data analyst. Return only valid JSON. No markdown.",
            },
            {
              role: "user",
              content: prompt,
            },
          ],
          temperature: 0.1,
          max_tokens: 1200,
          response_format: {
            type: "json_object",
          },
        }),
      }
    );

    const data = await response.json();

    if (!response.ok) {
      console.error("Groq chart plan error:", data);

      return NextResponse.json(
        {
          error:
            data?.error?.message ||
            "AI chart planning failed.",
        },
        { status: response.status }
      );
    }

    const raw = data?.choices?.[0]?.message?.content || "{}";

    const result = JSON.parse(raw);

    return NextResponse.json(result);
  } catch (error) {
    console.error("AI chart plan route error:", error);

    return NextResponse.json(
      { error: "AI chart analysis failed." },
      { status: 500 }
    );
  }
}