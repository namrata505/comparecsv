import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const body = await req.json();

    const {
      rows = [],
      headers = [],
      prompt = "",
      mode = "Insights",
    } = body;

    if (!rows.length) {
      return NextResponse.json({
        result: "No spreadsheet data was uploaded.",
      });
    }

    const previewRows = rows.slice(0, 25);

    const systemPrompt = `
You are an AI spreadsheet analyst inside CompareCSV.

Your job:
- Analyze spreadsheet datasets
- Generate clean insights
- Create SEO-safe content
- Generate creator-friendly summaries
- Produce business intelligence explanations
- Write readable paragraphs
- Avoid hallucinations
- Avoid fake statistics
- Be concise but valuable

Output format:
- Clean markdown
- No code blocks
- No dangerous HTML
- No fake claims
`;

    let modeInstruction = "";

    switch (mode) {
      case "Blog":
        modeInstruction = `
Write a professional blog-style analysis of the dataset.
Use readable paragraphs and insights.
`;
        break;

      case "YouTube":
        modeInstruction = `
Generate YouTube talking points and video narration ideas from the dataset.
`;
        break;

      case "LinkedIn":
        modeInstruction = `
Generate a professional LinkedIn post based on dataset insights.
`;
        break;

      case "Report":
        modeInstruction = `
Generate an executive business report from the spreadsheet data.
`;
        break;

      case "SEO Article":
        modeInstruction = `
Generate an SEO-friendly article using spreadsheet insights.
Use headings and readable structure.
`;
        break;

      default:
        modeInstruction = `
Generate spreadsheet insights and important findings.
`;
    }

    const finalPrompt = `
${modeInstruction}

User Request:
${prompt}

Dataset Headers:
${headers.join(", ")}

Dataset Preview:
${JSON.stringify(previewRows, null, 2)}
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
              content: finalPrompt,
            },
          ],
          temperature: 0.7,
          max_tokens: 1200,
        }),
      }
    );

    const data = await response.json();

    const result =
      data?.choices?.[0]?.message?.content ||
      "AI analysis could not be generated.";

    return NextResponse.json({
      result,
    });
  } catch (error) {
    console.error(error);

    return NextResponse.json({
      result: "AI analysis failed.",
    });
  }
}