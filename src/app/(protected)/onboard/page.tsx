"use client";

import { useState } from "react";
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

export default function Onboard() {
  const router = useRouter();
  const [selectedTopics, setSelectedTopics] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);

  const handleTopicToggle = (topic: string) => {
    setSelectedTopics((prev) =>
      prev.includes(topic) ? prev.filter((t) => t !== topic) : [...prev, topic]
    );
  };

  const handleSaveTopics = async () => {
    if (selectedTopics.length === 0) {
      toast.error("Please select at least one topic");
      return;
    }

    setLoading(true);
    try {
      await axios.post("/api/topics/subscribe", { topics: selectedTopics });
      toast.success("Topics saved successfully");
      router.push("/dashboard");
    } catch (error) {
      console.error("Error saving topics:", error);
      toast.error("Failed to save topics");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className='min-h-screen bg-background p-8'>
      <div className='max-w-4xl mx-auto'>
        <div className='mb-12'>
          <h1 className='text-4xl font-bold text-foreground mb-2'>
            Get Started
          </h1>
          <p className='text-muted-foreground'>
            Select at least one topic to personalize your news feed
          </p>
        </div>

        <div className='bg-card rounded-lg p-8 shadow-lg border border-border'>
          <h2 className='text-lg font-semibold text-foreground mb-6'>
            Choose Your Interests
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
                loading
                  ? "bg-muted text-muted-foreground cursor-not-allowed"
                  : selectedTopics.length === 0
                  ? "bg-muted text-muted-foreground cursor-not-allowed"
                  : "bg-foreground text-background hover:bg-foreground/90"
              }`}>
              {loading ? "Setting up..." : "Continue"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
