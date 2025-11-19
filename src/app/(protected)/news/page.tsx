"use client";

import { useEffect, useState, useCallback } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import {
  Loader2,
  ExternalLink,
  Calendar,
  Globe,
  Search,
  X,
  ChevronDown,
} from "lucide-react";
import { toast } from "sonner";
import Image from "next/image";

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

interface NewsResponse {
  articles: NewsArticle[];
  totalArticles: number;
}

const SUPPORTED_COUNTRIES = [
  { code: "us", name: "United States" },
  { code: "gb", name: "United Kingdom" },
  { code: "ca", name: "Canada" },
  { code: "au", name: "Australia" },
  { code: "in", name: "India" },
  { code: "de", name: "Germany" },
  { code: "fr", name: "France" },
  { code: "jp", name: "Japan" },
  { code: "br", name: "Brazil" },
  { code: "mx", name: "Mexico" },
];

const SUPPORTED_LANGUAGES = [
  { code: "en", name: "English" },
  { code: "es", name: "Spanish" },
  { code: "fr", name: "French" },
  { code: "de", name: "German" },
  { code: "it", name: "Italian" },
  { code: "pt", name: "Portuguese" },
  { code: "ru", name: "Russian" },
  { code: "ja", name: "Japanese" },
  { code: "zh", name: "Chinese" },
];

export default function NewsPage() {
  const router = useRouter();
  const [selectedTopics, setSelectedTopics] = useState<string[]>([]);
  const [news, setNews] = useState<NewsArticle[]>([]);
  const [loading, setLoading] = useState(false);
  const [isInitializing, setIsInitializing] = useState(true);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [currentView, setCurrentView] = useState<"feed" | "explore">("feed");

  // Explore filters
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCountry, setSelectedCountry] = useState("us");
  const [selectedLanguage, setSelectedLanguage] = useState("en");
  const [showCountryDropdown, setShowCountryDropdown] = useState(false);
  const [showLanguageDropdown, setShowLanguageDropdown] = useState(false);

  const fetchUserTopics = useCallback(async () => {
    try {
      const response = await axios.get("/api/topics/subscribe");
      const topics = response.data.topics || [];
      setSelectedTopics(topics);

      if (topics.length === 0) {
        router.push("/onboard");
      }
    } catch (error) {
      console.error("Error fetching topics:", error);
      router.push("/onboard");
    } finally {
      setIsInitializing(false);
    }
  }, [router]);

  useEffect(() => {
    fetchUserTopics();
  }, [fetchUserTopics]);

  const fetchFeedNews = useCallback(async () => {
    if (selectedTopics.length === 0) return;
    setLoading(true);
    try {
      const response = await axios.get<NewsResponse>("/api/news", {
        params: {
          mode: "feed",
          topics: selectedTopics.join(","),
          country: selectedCountry,
          lang: selectedLanguage,
        },
      });
      setNews(response.data.articles || []);
    } catch (error) {
      console.error("Error fetching news:", error);
      toast.error("Failed to fetch news");
    } finally {
      setLoading(false);
    }
  }, [selectedTopics, selectedCountry, selectedLanguage]);

  const fetchExploreNews = useCallback(async () => {
    if (!searchQuery.trim()) {
      toast.error("Please enter a search query");
      return;
    }
    setLoading(true);
    try {
      const response = await axios.get<NewsResponse>("/api/news", {
        params: {
          mode: "explore",
          q: searchQuery,
          country: selectedCountry,
          lang: selectedLanguage,
        },
      });
      setNews(response.data.articles || []);
    } catch (error) {
      console.error("Error fetching news:", error);
      toast.error("Failed to fetch news");
    } finally {
      setLoading(false);
    }
  }, [searchQuery, selectedCountry, selectedLanguage]);

  useEffect(() => {
    if (currentView === "feed") {
      fetchFeedNews();
    }
  }, [currentView, fetchFeedNews]);

  const handleExploreSearch = () => {
    fetchExploreNews();
  };

  if (isInitializing) {
    return (
      <div className='flex items-center justify-center h-screen'>
        <div className='text-center'>
          <Loader2 className='w-8 h-8 animate-spin text-foreground mx-auto mb-2' />
          <p className='text-muted-foreground'>Loading...</p>
        </div>
      </div>
    );
  }

  return (
    /* Main Container: h-screen prevents the whole page from scrolling */
    <div className='flex h-screen w-full overflow-hidden bg-background'>
      {/* Sidebar */}
      <div
        className={`fixed inset-y-0 left-0 z-40 w-64 bg-card border-r border-border transform transition-transform duration-300 lg:relative lg:translate-x-0 flex flex-col ${
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        }`}>
        {/* Sidebar Header (Fixed) */}
        <div className='p-6 border-b border-border shrink-0'>
          <h2 className='text-lg font-semibold text-foreground'>Navigation</h2>
        </div>

        {/* Scrollable List Area (Takes remaining space) */}
        <div className='flex-1 overflow-y-auto p-4'>
          <div className='space-y-2'>
            {/* Feed Button */}
            <button
              onClick={() => {
                setCurrentView("feed");
                setSidebarOpen(false);
              }}
              className={`w-full text-left px-4 py-3 rounded-lg font-medium transition-all duration-200 ${
                currentView === "feed"
                  ? "bg-foreground text-background"
                  : "text-foreground hover:bg-muted border border-transparent hover:border-border"
              }`}>
              📰 Feed
            </button>

            {/* Explore Button */}
            <button
              onClick={() => {
                setCurrentView("explore");
                setSidebarOpen(false);
              }}
              className={`w-full text-left px-4 py-3 rounded-lg font-medium transition-all duration-200 ${
                currentView === "explore"
                  ? "bg-foreground text-background"
                  : "text-foreground hover:bg-muted border border-transparent hover:border-border"
              }`}>
              🔍 Explore
            </button>

            {/* Subscribed Topics Section */}
            {selectedTopics.length > 0 && (
              <div className='mt-6 pt-4 border-t border-border'>
                <p className='text-xs font-semibold text-muted-foreground uppercase mb-3'>
                  Your Topics
                </p>
                <div className='space-y-2'>
                  {selectedTopics.map((topic) => (
                    <div
                      key={topic}
                      className='px-3 py-2 rounded-lg bg-muted text-sm text-foreground flex items-center justify-between'>
                      <span className='truncate'>{topic}</span>
                      <span className='text-xs text-muted-foreground'>✓</span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Manage Topics Footer (Fixed at bottom) */}
        <div className='p-4 border-t border-border shrink-0 mt-auto bg-card'>
          <button
            onClick={() => router.push("/dashboard")}
            className='w-full px-4 py-2 rounded-lg bg-muted text-foreground hover:bg-muted/80 font-medium transition-all duration-200'>
            Manage Topics
          </button>
        </div>
      </div>

      {/* Mobile Sidebar Overlay */}
      {sidebarOpen && (
        <div
          className='fixed inset-0 z-30 bg-black/50 lg:hidden'
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Main Content Area */}
      <div className='flex-1 flex flex-col h-full overflow-hidden relative'>
        {/* Mobile Header */}
        <div className='lg:hidden flex items-center justify-between p-4 bg-card border-b border-border shrink-0'>
          <h1 className='text-lg font-bold text-foreground'>
            {currentView === "feed" ? "📰 Feed" : "🔍 Explore"}
          </h1>
          <button
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className='text-foreground hover:text-muted-foreground'>
            <svg
              className='w-6 h-6'
              fill='none'
              stroke='currentColor'
              viewBox='0 0 24 24'>
              <path
                strokeLinecap='round'
                strokeLinejoin='round'
                strokeWidth={2}
                d='M4 6h16M4 12h16M4 18h16'
              />
            </svg>
          </button>
        </div>

        {/* Scrollable Content */}
        <div className='flex-1 overflow-y-auto'>
          <div className='p-4 sm:p-6 lg:p-8'>
            {/* Feed View */}
            {currentView === "feed" && (
              <>
                <div className='mb-8'>
                  <h1 className='text-3xl sm:text-4xl font-bold text-foreground mb-2'>
                    📰 Your News Feed
                  </h1>
                  <p className='text-muted-foreground'>
                    Latest news from all your subscribed topics
                  </p>
                </div>

                {loading ? (
                  <div className='flex items-center justify-center py-12'>
                    <div className='text-center'>
                      <Loader2 className='w-8 h-8 animate-spin text-foreground mx-auto mb-2' />
                      <p className='text-muted-foreground'>Fetching news...</p>
                    </div>
                  </div>
                ) : news.length > 0 ? (
                  <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 pb-10'>
                    {news.map((article, index) => (
                      <a
                        key={index}
                        href={article.url}
                        target='_blank'
                        rel='noopener noreferrer'
                        className='group bg-card rounded-lg overflow-hidden border border-border hover:border-foreground/30 transition-all duration-300 hover:shadow-lg flex flex-col h-full'>
                        {article.image && (
                          <div className='relative w-full h-48 overflow-hidden bg-muted shrink-0'>
                            <Image
                              src={article.image}
                              alt={article.title}
                              width={500}
                              height={500}
                              className='w-full h-full object-cover group-hover:scale-105 transition-transform duration-300'
                            />
                          </div>
                        )}

                        <div className='p-4 flex flex-col flex-1'>
                          <h3 className='text-lg font-semibold text-foreground mb-2 line-clamp-2 group-hover:text-foreground/80 transition-colors'>
                            {article.title}
                          </h3>

                          <p className='text-sm text-muted-foreground mb-4 line-clamp-3 flex-1'>
                            {article.description}
                          </p>

                          <div className='space-y-3 pt-4 border-t border-border mt-auto'>
                            <div className='flex items-center gap-2 text-xs text-muted-foreground'>
                              <Globe size={14} />
                              <span className='truncate'>
                                {article.source.name}
                              </span>
                            </div>

                            <div className='flex items-center gap-2 text-xs text-muted-foreground'>
                              <Calendar size={14} />
                              <span>
                                {new Date(
                                  article.publishedAt
                                ).toLocaleDateString("en-US", {
                                  month: "short",
                                  day: "numeric",
                                  year: "numeric",
                                })}
                              </span>
                            </div>

                            <div className='flex items-center gap-2 text-xs font-medium text-foreground group-hover:text-foreground/70 transition-colors'>
                              Read More
                              <ExternalLink size={14} />
                            </div>
                          </div>
                        </div>
                      </a>
                    ))}
                  </div>
                ) : (
                  <div className='flex items-center justify-center py-12'>
                    <div className='text-center'>
                      <p className='text-muted-foreground mb-4'>
                        No news found. Try adjusting your filters or subscribe
                        to more topics.
                      </p>
                      <button
                        onClick={() => fetchFeedNews()}
                        className='px-4 py-2 bg-foreground text-background rounded-lg font-medium hover:bg-foreground/90 transition-all duration-200'>
                        Refresh
                      </button>
                    </div>
                  </div>
                )}
              </>
            )}

            {/* Explore View */}
            {currentView === "explore" && (
              <>
                <div className='mb-8'>
                  <h1 className='text-3xl sm:text-4xl font-bold text-foreground mb-2'>
                    🔍 Explore News
                  </h1>
                  <p className='text-muted-foreground'>
                    Search for news with advanced filters
                  </p>
                </div>

                {/* Search and Filters */}
                <div className='mb-8 space-y-4'>
                  {/* Search Input */}
                  <div className='relative'>
                    <input
                      type='text'
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      onKeyPress={(e) =>
                        e.key === "Enter" && handleExploreSearch()
                      }
                      placeholder='Search for news topics, keywords...'
                      className='w-full px-4 py-3 rounded-lg bg-card border border-border text-foreground placeholder-muted-foreground focus:outline-none focus:border-foreground/50 transition-colors'
                    />
                    <button
                      onClick={handleExploreSearch}
                      className='absolute right-2 top-1/2 -translate-y-1/2 p-2 text-muted-foreground hover:text-foreground transition-colors'>
                      <Search size={20} />
                    </button>
                  </div>

                  {/* Filters Row */}
                  <div className='grid grid-cols-1 sm:grid-cols-2 gap-4'>
                    {/* Country Dropdown */}
                    <div className='relative'>
                      <button
                        onClick={() => {
                          setShowCountryDropdown(!showCountryDropdown);
                          setShowLanguageDropdown(false);
                        }}
                        className='w-full px-4 py-3 rounded-lg bg-card border border-border text-foreground hover:border-foreground/50 transition-colors flex items-center justify-between'>
                        <span>
                          Country:{" "}
                          {SUPPORTED_COUNTRIES.find(
                            (c) => c.code === selectedCountry
                          )?.name || "US"}
                        </span>
                        <ChevronDown
                          size={18}
                          className={`transition-transform ${
                            showCountryDropdown ? "rotate-180" : ""
                          }`}
                        />
                      </button>

                      {showCountryDropdown && (
                        <div className='absolute top-full left-0 right-0 mt-2 bg-card border border-border rounded-lg shadow-lg z-50 max-h-64 overflow-y-auto'>
                          {SUPPORTED_COUNTRIES.map((country) => (
                            <button
                              key={country.code}
                              onClick={() => {
                                setSelectedCountry(country.code);
                                setShowCountryDropdown(false);
                              }}
                              className={`w-full text-left px-4 py-2 hover:bg-muted transition-colors ${
                                selectedCountry === country.code
                                  ? "bg-muted text-foreground font-semibold"
                                  : "text-foreground"
                              }`}>
                              {country.name}
                            </button>
                          ))}
                        </div>
                      )}
                    </div>

                    {/* Language Dropdown */}
                    <div className='relative'>
                      <button
                        onClick={() => {
                          setShowLanguageDropdown(!showLanguageDropdown);
                          setShowCountryDropdown(false);
                        }}
                        className='w-full px-4 py-3 rounded-lg bg-card border border-border text-foreground hover:border-foreground/50 transition-colors flex items-center justify-between'>
                        <span>
                          Language:{" "}
                          {SUPPORTED_LANGUAGES.find(
                            (l) => l.code === selectedLanguage
                          )?.name || "English"}
                        </span>
                        <ChevronDown
                          size={18}
                          className={`transition-transform ${
                            showLanguageDropdown ? "rotate-180" : ""
                          }`}
                        />
                      </button>

                      {showLanguageDropdown && (
                        <div className='absolute top-full left-0 right-0 mt-2 bg-card border border-border rounded-lg shadow-lg z-50 max-h-64 overflow-y-auto'>
                          {SUPPORTED_LANGUAGES.map((language) => (
                            <button
                              key={language.code}
                              onClick={() => {
                                setSelectedLanguage(language.code);
                                setShowLanguageDropdown(false);
                              }}
                              className={`w-full text-left px-4 py-2 hover:bg-muted transition-colors ${
                                selectedLanguage === language.code
                                  ? "bg-muted text-foreground font-semibold"
                                  : "text-foreground"
                              }`}>
                              {language.name}
                            </button>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>
                </div>

                {/* Results */}
                {loading ? (
                  <div className='flex items-center justify-center py-12'>
                    <div className='text-center'>
                      <Loader2 className='w-8 h-8 animate-spin text-foreground mx-auto mb-2' />
                      <p className='text-muted-foreground'>Searching news...</p>
                    </div>
                  </div>
                ) : news.length > 0 ? (
                  <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 pb-10'>
                    {news.map((article, index) => (
                      <a
                        key={index}
                        href={article.url}
                        target='_blank'
                        rel='noopener noreferrer'
                        className='group bg-card rounded-lg overflow-hidden border border-border hover:border-foreground/30 transition-all duration-300 hover:shadow-lg flex flex-col h-full'>
                        {article.image && (
                          <div className='relative w-full h-48 overflow-hidden bg-muted shrink-0'>
                            <Image
                              src={article.image}
                              alt={article.title}
                              width={500}
                              height={500}
                              className='w-full h-full object-cover group-hover:scale-105 transition-transform duration-300'
                            />
                          </div>
                        )}

                        <div className='p-4 flex flex-col flex-1'>
                          <h3 className='text-lg font-semibold text-foreground mb-2 line-clamp-2 group-hover:text-foreground/80 transition-colors'>
                            {article.title}
                          </h3>

                          <p className='text-sm text-muted-foreground mb-4 line-clamp-3 flex-1'>
                            {article.description}
                          </p>

                          <div className='space-y-3 pt-4 border-t border-border mt-auto'>
                            <div className='flex items-center gap-2 text-xs text-muted-foreground'>
                              <Globe size={14} />
                              <span className='truncate'>
                                {article.source.name}
                              </span>
                            </div>

                            <div className='flex items-center gap-2 text-xs text-muted-foreground'>
                              <Calendar size={14} />
                              <span>
                                {new Date(
                                  article.publishedAt
                                ).toLocaleDateString("en-US", {
                                  month: "short",
                                  day: "numeric",
                                  year: "numeric",
                                })}
                              </span>
                            </div>

                            <div className='flex items-center gap-2 text-xs font-medium text-foreground group-hover:text-foreground/70 transition-colors'>
                              Read More
                              <ExternalLink size={14} />
                            </div>
                          </div>
                        </div>
                      </a>
                    ))}
                  </div>
                ) : (
                  <div className='flex items-center justify-center py-12'>
                    <div className='text-center'>
                      <p className='text-muted-foreground mb-4'>
                        {searchQuery
                          ? "No news found for your search. Try different keywords."
                          : "Enter a search query to get started."}
                      </p>
                    </div>
                  </div>
                )}
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
