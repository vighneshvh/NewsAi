import { auth } from "@/auth";
import { NextRequest, NextResponse } from "next/server";

// Define interface for better type safety
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

    // 1. Format the user content (The actual data to process)
    const newsContext = newsArticles
      .map(
        (article: NewsArticle, index: number) =>
          `Article ${index + 1}:
Title: ${article.title}
Description: ${article.description}
Source: ${article.source.name}
Published: ${new Date(article.publishedAt).toLocaleDateString()}
URL: ${article.url}
---`
      )
      .join("\n\n");

    const systemInstruction = `You are an expert news analyst. 
    Provide a comprehensive summary that:
    1. Highlights the main topics and themes

    2. Identifies key trends and patterns
    3. Provides context and connections between different stories
    4. Keeps the summary concise but informative (around 700-800 words)`;

    const response = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${apiKey}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          // Move persona to system_instruction for better adherence
          system_instruction: {
            parts: [{ text: systemInstruction }],
          },
          contents: [
            {
              role: "user",
              parts: [{ text: `Here are the news articles to summarize:\n\n${newsContext}` }],
            },
          ],
          generationConfig: {
            temperature: 0.7,
            topK: 40,
            topP: 0.95,
            maxOutputTokens: 1024,
          },
        }),
      }
    );

    if (!response.ok) {
      const errorData = await response.json();
      console.error("Gemini API error:", JSON.stringify(errorData, null, 2));
      return NextResponse.json(
        { error: "Failed to generate summary", details: errorData },
        { status: response.status }
      );
    }

    const data = await response.json();
    const candidate = data.candidates?.[0];
    const summary = candidate?.content?.parts?.[0]?.text;

    if (!summary) {
      console.error("Gemini generated no text. Finish reason:", candidate?.finishReason);
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