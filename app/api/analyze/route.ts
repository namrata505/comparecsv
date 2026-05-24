import { NextResponse } from "next/server";

export async function POST(req: Request) {

  try {

    const body = await req.json();

    const {
      prompt,
      rows,
      headers,
      mode,
    } = body;

    const datasetPreview = rows
      ?.slice(0, 5)
      ?.map((row: any) => JSON.stringify(row))
      ?.join("\n");

    const systemPrompt = `
You are an AI spreadsheet analyst.

Analyze uploaded spreadsheet datasets.

Generate:
- insights
- summaries
- trends
- creator-friendly analysis
- blog content
- YouTube talking points
- business reports

Keep formatting clean and readable.
`;

    const userPrompt = `
MODE:
${mode}

USER REQUEST:
${prompt}

HEADERS:
${headers?.join(", ")}

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

    console.log(data);

    const result =
      data?.choices?.[0]?.message?.content ||
      "AI analysis could not be generated.";

    return NextResponse.json({
      result,
    });

  } catch (error) {

    console.error(error);

    return NextResponse.json({
      result: "Server error while generating AI analysis.",
    });

  }

}