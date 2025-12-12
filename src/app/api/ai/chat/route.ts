import { auth } from "@/auth";
import { NextRequest, NextResponse } from "next/server";

// 1. Define interfaces for type safety
interface NewsArticle {
  title: string;
  description: string;
  source: { name: string };
  publishedAt: string;
}

interface ChatMessage {
  role: "user" | "assistant" | "model"; // Handle common role names
  content: string;
}

export async function POST(request: NextRequest) {
  try {
    const session = await auth();

    if (!session?.user?.email) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { message, newsContext, chatHistory } = await request.json();

    if (!message || typeof message !== "string") {
      return NextResponse.json(
        { error: "Message is required" },
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

    // 2. Build the System Instruction (Persona + Context)
    // This is better than injecting it as a fake user message
    let systemInstructionText = `You are a helpful news assistant. 
    You have access to the provided news articles (News Context).
    Use them to answer questions accurately. 
    If the answer isn't in the context, use your general knowledge but mention that it's outside the provided news.
    Be informative, accurate, and concise.`;

    if (newsContext && newsContext.length > 0) {
      const formattedNews = newsContext
        .map(
          (article: NewsArticle, index: number) =>
            `Article ${index + 1}:
Title: ${article.title}
Description: ${article.description}
Source: ${article.source.name}
Published: ${new Date(article.publishedAt).toLocaleDateString()}
---`
        )
        .join("\n\n");
      
      systemInstructionText += `\n\n### NEWS CONTEXT ###\n${formattedNews}`;
    }

    // 3. Build the Conversation History
    const contents = [];

    // Add previous history if it exists
    if (chatHistory && Array.isArray(chatHistory)) {
      chatHistory.forEach((msg: ChatMessage) => {
        contents.push({
          role: msg.role === "user" ? "user" : "model", // API expects 'model', not 'assistant'
          parts: [{ text: msg.content }],
        });
      });
    }

    // Add the current user message
    contents.push({
      role: "user",
      parts: [{ text: message }],
    });

    // 4. Call Gemini 2.5 Flash
    const response = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${apiKey}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          system_instruction: {
            parts: [{ text: systemInstructionText }],
          },
          contents,
          generationConfig: {
            temperature: 0.7,
            topK: 40,
            topP: 0.95,
            maxOutputTokens: 2048,
          },
        }),
      }
    );

    if (!response.ok) {
      const errorData = await response.json();
      console.error("Gemini API error:", JSON.stringify(errorData, null, 2));
      return NextResponse.json(
        { error: "Failed to get response from AI", details: errorData },
        { status: response.status }
      );
    }

    const data = await response.json();
    
    // 5. Safe Response Extraction
    const candidate = data.candidates?.[0];
    const reply = candidate?.content?.parts?.[0]?.text;

    if (!reply) {
       // Handle cases where safety settings block the response
       console.warn("Empty response. Finish reason:", candidate?.finishReason);
       return NextResponse.json(
        { reply: "I'm sorry, I couldn't generate a response based on that input." },
        { status: 200 } 
      );
    }

    return NextResponse.json(
      { reply },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error in chat:", error);
    return NextResponse.json(
      { error: "Failed to process chat message" },
      { status: 500 }
    );
  }
}