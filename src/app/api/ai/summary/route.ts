import { auth } from "@/auth";
import { NextRequest, NextResponse } from "next/server";

interface NewsArticle {
  title: string;
  description: string;
  source: { name: string };
  publishedAt: string;
  url: string;
}

export async function POST(request: NextRequest) {
  try {
    const session = await auth();

    if (!session?.user?.email) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { newsArticles } = await request.json();

    if (!newsArticles || !Array.isArray(newsArticles)) {
      return NextResponse.json(
        { error: "News articles are required" },
        { status: 400 }
      );
    }

    const apiKey = process.env.GEMINI_API_KEY;

    if (!apiKey) {
      return NextResponse.json(
        { error: "Gemini API key not configured" },
        { status: 500 }
      );
    }

  
    const newsContext = newsArticles
      .map(
        (article: NewsArticle, index: number) => `
Article ${index + 1}
Title: ${article.title}
Description: ${article.description}
Source: ${article.source.name}
Published: ${new Date(article.publishedAt).toLocaleDateString()}
URL: ${article.url}
---`
      )
      .join("\n");

    const systemInstruction = `
You are an expert news analyst preparing a professional intelligence briefing.

MANDATORY REQUIREMENTS:
- Produce a brief short-form analytical report of AT LEAST 400 words.
- The output MUST be detailed but concise (20 to 30 lines maximum).
- Do NOT generate a short or high-level summary.
- Expand using background context, implications, and relationships between stories.
- Maintain a neutral, professional, analytical tone.

STRUCTURE (FOLLOW EXACTLY):
1. Executive Overview
2. Major Themes and Topics
3. Cross-Article Connections and Patterns
4. Emerging Trends and Implications
5. Broader Context (Geopolitical, Economic, or Social)
6. Concluding Insights

Each section MUST contain multiple paragraphs.
`;

    const response = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${apiKey}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          system_instruction: {
            parts: [{ text: systemInstruction }],
          },
          contents: [
            {
              role: "user",
              parts: [
                {
                  text: `Analyze and synthesize the following news articles in detail:\n\n${newsContext}`,
                },
              ],
            },
          ],
          generationConfig: {
            temperature: 0.6,
            topK: 40,
            topP: 0.95,
          },
        }),
      }
    );


    if (!response.ok) {
      const errorData = await response.json();
      console.error("Gemini API error:", JSON.stringify(errorData, null, 2));

      return NextResponse.json(
        {
          error: "Failed to generate summary",
          details: errorData,
        },
        { status: response.status }
      );
    }


    const data = await response.json();
    const candidate = data.candidates?.[0];
    const summary = candidate?.content?.parts?.[0]?.text;

    if (!summary) {
      console.error(
        "Gemini generated no content. Finish reason:",
        candidate?.finishReason
      );

      return NextResponse.json(
        { error: "AI could not generate a summary for this content." },
        { status: 422 }
      );
    }

    return NextResponse.json(
      {
        summary,
        articleCount: newsArticles.length,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error generating summary:", error);

    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
