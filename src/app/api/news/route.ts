import { auth } from "@/auth";
import { NextRequest, NextResponse } from "next/server";
import axios from "axios";

interface GNewsArticle {
  title: string;
  description: string;
  url: string;
  image: string;
  publishedAt: string;
  source: {
    name: string;
    url: string;
  };
}

interface GNewsResponse {
  articles: GNewsArticle[];
  totalArticles: number;
}

export async function GET(request: NextRequest) {
  try {
    const session = await auth();

    if (!session?.user?.email) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const searchParams = request.nextUrl.searchParams;
    const topics = searchParams.get("topics")?.split(",") || [];
    const query = searchParams.get("q");
    const country = searchParams.get("country") || "us";
    const lang = searchParams.get("lang") || "en";
    const mode = searchParams.get("mode") || "feed"; // "feed" or "explore"

    const apiKey = process.env.GNEWS_API_KEY;

    if (!apiKey) {
      return NextResponse.json(
        { error: "API key not configured" },
        { status: 500 }
      );
    }

    let allArticles: GNewsArticle[] = [];

    if (mode === "feed" && topics.length > 0) {
      // Fetch news for each subscribed topic
      const requests = topics.map((topic) =>
        axios.get<GNewsResponse>("https://gnews.io/api/v4/search", {
          params: {
            q: topic.trim(),
            lang,
            country,
            max: 10,
            token: apiKey,
          },
        })
      );

      const responses = await Promise.all(requests);
      allArticles = responses.flatMap((res) => res.data.articles || []);
    } else if (mode === "explore" && query) {
      // Explore mode with custom search
      const response = await axios.get<GNewsResponse>(
        "https://gnews.io/api/v4/search",
        {
          params: {
            q: query,
            lang,
            country,
            max: 30,
            token: apiKey,
          },
        }
      );
      allArticles = response.data.articles || [];
    } else {
      return NextResponse.json(
        { error: "Invalid parameters for the requested mode" },
        { status: 400 }
      );
    }

    // Sort by date (newest first) and remove duplicates
    const uniqueArticles = Array.from(
      new Map(allArticles.map((article) => [article.url, article])).values()
    ).sort(
      (a, b) =>
        new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime()
    );

    return NextResponse.json(
      {
        articles: uniqueArticles.map((article) => ({
          title: article.title,
          description: article.description,
          url: article.url,
          image: article.image,
          publishedAt: article.publishedAt,
          source: {
            name: article.source.name,
            url: article.source.url,
          },
        })),
        totalArticles: uniqueArticles.length,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error fetching news:", error);

    if (axios.isAxiosError(error)) {
      if (error.response?.status === 401) {
        return NextResponse.json(
          { error: "Invalid API key" },
          { status: 401 }
        );
      }
      if (error.response?.status === 429) {
        return NextResponse.json(
          { error: "Rate limit exceeded" },
          { status: 429 }
        );
      }
    }

    return NextResponse.json(
      { error: "Failed to fetch news" },
      { status: 500 }
    );
  }
}
