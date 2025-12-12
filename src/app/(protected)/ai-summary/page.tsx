"use client";

import { useEffect, useState, useRef } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import {
  Loader2,
  Send,
  Sparkles,
  MessageSquare,
  ArrowLeft,
  RefreshCw,
} from "lucide-react";
import { toast } from "sonner";

interface NewsArticle {
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

interface ChatMessage {
  role: "user" | "assistant";
  content: string;
  timestamp: Date;
}

export default function AISummaryPage() {
  const router = useRouter();
  const [news, setNews] = useState<NewsArticle[]>([]);
  const [summary, setSummary] = useState<string>("");
  const [loading, setLoading] = useState(true);
  const [generatingSummary, setGeneratingSummary] = useState(false);
  const [chatMessages, setChatMessages] = useState<ChatMessage[]>([]);
  const [inputMessage, setInputMessage] = useState("");
  const [sendingMessage, setSendingMessage] = useState(false);
  const chatEndRef = useRef<HTMLDivElement>(null);

  // Fetch news from feed
  const fetchNews = async () => {
    setLoading(true);
    try {
      // Get user topics first
      const topicsResponse = await axios.get("/api/topics/subscribe");
      const topics = topicsResponse.data.topics || [];

      if (topics.length === 0) {
        toast.error("Please subscribe to topics first");
        router.push("/onboard");
        return;
      }

      // Fetch news
      const newsResponse = await axios.get("/api/news", {
        params: {
          mode: "feed",
          topics: topics.join(","),
          country: "us",
          lang: "en",
        },
      });

      const articles = newsResponse.data.articles || [];
      setNews(articles);

      // Auto-generate summary
      if (articles.length > 0) {
        await generateSummary(articles);
      } else {
        toast.error("No news articles found");
      }
    } catch (error) {
      console.error("Error fetching news:", error);
      toast.error("Failed to fetch news");
    } finally {
      setLoading(false);
    }
  };

  // Generate AI summary
  const generateSummary = async (articles: NewsArticle[]) => {
    setGeneratingSummary(true);
    try {
      const response = await axios.post("/api/ai/summary", {
        newsArticles: articles,
      });

      setSummary(response.data.summary);
      toast.success("Summary generated successfully!");
    } catch (error) {
      console.error("Error generating summary:", error);
      toast.error("Failed to generate summary");
    } finally {
      setGeneratingSummary(false);
    }
  };

  // Send chat message
  const sendMessage = async () => {
    if (!inputMessage.trim()) return;

    const userMessage: ChatMessage = {
      role: "user",
      content: inputMessage,
      timestamp: new Date(),
    };

    setChatMessages((prev) => [...prev, userMessage]);
    setInputMessage("");
    setSendingMessage(true);

    try {
      const response = await axios.post("/api/ai/chat", {
        message: inputMessage,
        newsContext: news,
        chatHistory: chatMessages.map((msg) => ({
          role: msg.role,
          content: msg.content,
        })),
      });

      const assistantMessage: ChatMessage = {
        role: "assistant",
        content: response.data.reply,
        timestamp: new Date(),
      };

      setChatMessages((prev) => [...prev, assistantMessage]);
    } catch (error) {
      console.error("Error sending message:", error);
      toast.error("Failed to send message");
    } finally {
      setSendingMessage(false);
    }
  };

  // Auto-scroll chat
  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [chatMessages]);

  // Initial fetch
  useEffect(() => {
    fetchNews();
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen bg-background">
        <div className="text-center">
          <Loader2 className="w-8 h-8 animate-spin text-foreground mx-auto mb-2" />
          <p className="text-muted-foreground">Loading news...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="sticky top-0 z-10 bg-card border-b border-border backdrop-blur-sm bg-opacity-95">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <button
                onClick={() => router.push("/news")}
                className="p-2 hover:bg-muted rounded-lg transition-colors"
              >
                <ArrowLeft className="w-5 h-5 text-foreground" />
              </button>
              <div>
                <h1 className="text-2xl font-bold text-foreground flex items-center gap-2">
                  <Sparkles className="w-6 h-6 text-purple-500" />
                  AI News Summary
                </h1>
                <p className="text-sm text-muted-foreground">
                  {news.length} articles analyzed
                </p>
              </div>
            </div>
            <button
              onClick={() => fetchNews()}
              disabled={generatingSummary}
              className="flex items-center gap-2 px-4 py-2 bg-foreground text-background rounded-lg font-medium hover:bg-foreground/90 transition-all duration-200 disabled:opacity-50"
            >
              <RefreshCw
                className={`w-4 h-4 ${generatingSummary ? "animate-spin" : ""}`}
              />
              Refresh
            </button>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Summary Section */}
          <div className="bg-card rounded-xl border border-border p-6 shadow-lg">
            <div className="flex items-center gap-2 mb-4">
              <Sparkles className="w-5 h-5 text-purple-500" />
              <h2 className="text-xl font-bold text-foreground">
                AI Generated Summary
              </h2>
            </div>

            {generatingSummary ? (
              <div className="flex items-center justify-center py-12">
                <div className="text-center">
                  <Loader2 className="w-8 h-8 animate-spin text-foreground mx-auto mb-2" />
                  <p className="text-muted-foreground">
                    Generating summary...
                  </p>
                </div>
              </div>
            ) : summary ? (
              <div className="prose prose-sm max-w-none">
                <div className="text-foreground whitespace-pre-wrap leading-relaxed">
                  {summary}
                </div>
              </div>
            ) : (
              <div className="text-center py-12">
                <p className="text-muted-foreground">No summary available</p>
              </div>
            )}
          </div>

          {/* Chat Section */}
          <div className="bg-card rounded-xl border border-border shadow-lg flex flex-col h-[600px]">
            {/* Chat Header */}
            <div className="p-4 border-b border-border">
              <div className="flex items-center gap-2">
                <MessageSquare className="w-5 h-5 text-blue-500" />
                <h2 className="text-xl font-bold text-foreground">
                  Ask About the News
                </h2>
              </div>
              <p className="text-sm text-muted-foreground mt-1">
                Chat with AI about your news feed
              </p>
            </div>

            {/* Chat Messages */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4">
              {chatMessages.length === 0 ? (
                <div className="flex items-center justify-center h-full">
                  <div className="text-center">
                    <MessageSquare className="w-12 h-12 text-muted-foreground mx-auto mb-2 opacity-50" />
                    <p className="text-muted-foreground">
                      Start a conversation about the news
                    </p>
                    <p className="text-sm text-muted-foreground mt-2">
                      Try asking: "What are the main topics?" or "Tell me more
                      about..."
                    </p>
                  </div>
                </div>
              ) : (
                <>
                  {chatMessages.map((msg, index) => (
                    <div
                      key={index}
                      className={`flex ${
                        msg.role === "user" ? "justify-end" : "justify-start"
                      }`}
                    >
                      <div
                        className={`max-w-[80%] rounded-lg p-3 ${
                          msg.role === "user"
                            ? "bg-foreground text-background"
                            : "bg-muted text-foreground"
                        }`}
                      >
                        <p className="text-sm whitespace-pre-wrap">
                          {msg.content}
                        </p>
                        <p
                          className={`text-xs mt-1 ${
                            msg.role === "user"
                              ? "text-background/70"
                              : "text-muted-foreground"
                          }`}
                        >
                          {msg.timestamp.toLocaleTimeString([], {
                            hour: "2-digit",
                            minute: "2-digit",
                          })}
                        </p>
                      </div>
                    </div>
                  ))}
                  {sendingMessage && (
                    <div className="flex justify-start">
                      <div className="bg-muted text-foreground rounded-lg p-3">
                        <Loader2 className="w-4 h-4 animate-spin" />
                      </div>
                    </div>
                  )}
                  <div ref={chatEndRef} />
                </>
              )}
            </div>

            {/* Chat Input */}
            <div className="p-4 border-t border-border">
              <div className="flex gap-2">
                <input
                  type="text"
                  value={inputMessage}
                  onChange={(e) => setInputMessage(e.target.value)}
                  onKeyPress={(e) => e.key === "Enter" && sendMessage()}
                  placeholder="Ask a question about the news..."
                  disabled={sendingMessage}
                  className="flex-1 px-4 py-2 rounded-lg bg-background border border-border text-foreground placeholder-muted-foreground focus:outline-none focus:border-foreground/50 transition-colors disabled:opacity-50"
                />
                <button
                  onClick={sendMessage}
                  disabled={sendingMessage || !inputMessage.trim()}
                  className="px-4 py-2 bg-foreground text-background rounded-lg font-medium hover:bg-foreground/90 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <Send className="w-5 h-5" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
