"use client";

import { useEffect, useState, useCallback } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import { Check } from "lucide-react";
import { toast } from "sonner";

const AVAILABLE_TOPICS = [
  "Technology",
  "Business",
  "Science",
  "Health",
  "Sports",
  "Entertainment",
  "Politics",
  "World",
  "Finance",
  "Education",
  "Environment",
  "Travel",
  "Food",
  "Lifestyle",
  "Gaming",
];

export default function Dashboard() {
  const router = useRouter();
  const [selectedTopics, setSelectedTopics] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);
  const [saved, setSaved] = useState(false);
  const [isInitializing, setIsInitializing] = useState(true);

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

  const handleTopicToggle = (topic: string) => {
    setSelectedTopics((prev) =>
      prev.includes(topic) ? prev.filter((t) => t !== topic) : [...prev, topic]
    );
    setSaved(false);
  };

  const handleSaveTopics = async () => {
    if (selectedTopics.length === 0) {
      toast.error("Please select at least one topic");
      return;
    }

    setLoading(true);
    try {
      await axios.post("/api/topics/subscribe", { topics: selectedTopics });
      setSaved(true);
      toast.success("Topics saved successfully");
      setTimeout(() => setSaved(false), 3000);
    } catch (error) {
      console.error("Error saving topics:", error);
      toast.error("Failed to save topics");
    } finally {
      setLoading(false);
    }
  };

  if (isInitializing) {
    return (
      <div className='min-h-screen bg-background flex items-center justify-center'>
        <div className='text-foreground'>Loading...</div>
      </div>
    );
  }

  return (
    <div className='min-h-screen bg-background p-8'>
      <div className='max-w-4xl mx-auto'>
        <div className='mb-12'>
          <h1 className='text-4xl font-bold text-foreground mb-2'>
            Your Dashboard
          </h1>
          <p className='text-muted-foreground'>Manage your selected topics</p>
        </div>

        <div className='bg-card rounded-lg p-8 shadow-lg border border-border'>
          <h2 className='text-xl font-semibold text-foreground mb-6'>
            Selected Topics
          </h2>
          <div className='flex flex-wrap gap-2'>
            {selectedTopics.map((topic) => (
              <div
                key={topic}
                className='bg-muted text-foreground px-4 py-2 rounded-lg text-sm border border-border'>
                {topic}
              </div>
            ))}
          </div>
        </div>

        {/* <div className='mt-8 bg-card rounded-lg p-8 shadow-lg border border-border'>
            <h2 className='text-lg font-semibold text-foreground mb-6'>
              Manage Topics
            </h2>
            <div className='grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mb-8'>
              {AVAILABLE_TOPICS.map((topic) => (
                <button
                  key={topic}
                  onClick={() => handleTopicToggle(topic)}
                  className={`relative p-4 rounded-lg font-medium transition-all duration-200 flex items-center justify-between ${
                    selectedTopics.includes(topic)
                      ? "bg-foreground text-background border border-foreground"
                      : "bg-muted text-foreground hover:bg-muted/80 border border-border"
                  }`}>
                  <span>{topic}</span>
                  {selectedTopics.includes(topic) && (
                    <Check size={18} className='ml-2' />
                  )}
                </button>
              ))}
            </div>

            <div className='flex flex-col sm:flex-row gap-4 items-center justify-between'>
              <div className='text-muted-foreground'>
                <span className='font-semibold text-foreground'>
                  {selectedTopics.length}
                </span>{" "}
                topic{selectedTopics.length !== 1 ? "s" : ""} selected
              </div>

              <button
                onClick={handleSaveTopics}
                disabled={loading || selectedTopics.length === 0}
                className={`px-8 py-3 rounded-lg font-semibold transition-all duration-200 ${
                  saved
                    ? "bg-foreground text-background"
                    : "bg-foreground text-background hover:bg-foreground/90 disabled:bg-muted disabled:text-muted-foreground disabled:cursor-not-allowed"
                }`}>
                {loading ? "Saving..." : saved ? "✓ Saved" : "Save Topics"}
              </button>
            </div>
          </div> */}
      </div>
    </div>
  );
}
