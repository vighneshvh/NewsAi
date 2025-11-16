export type FAQItem = {
  question: string;
  answer: string;
};

export const faqItems: FAQItem[] = [
  {
    question: "How do I subscribe to news topics?",
    answer:
      "Simply browse our extensive library of domains and keywords, and click subscribe on the ones you're interested in. Your personalized feed will instantly populate with relevant news articles. You can manage your subscriptions anytime from your dashboard.",
  },
  {
    question: "Can I subscribe to multiple domains and keywords?",
    answer:
      "Absolutely! Subscribe to as many domains and keywords as you want. Our smart algorithm will aggregate all relevant news and display them in your personalized feed, organized by topic and recency.",
  },
  {
    question: "How often is the news feed updated?",
    answer:
      "Your feed is updated in real-time as new articles are published. We continuously crawl thousands of news sources worldwide to ensure you never miss important updates on topics you care about.",
  },
  {
    question: "Can I customize my feed preferences?",
    answer:
      "Yes! You can customize notification frequency, filter by source credibility, set reading time preferences, and choose how articles are sorted. Our AI learns your preferences over time to improve recommendations.",
  },
  {
    question: "Is there a free version available?",
    answer:
      "Yes, we offer a free tier with up to 5 subscriptions and basic features. Premium plans unlock unlimited subscriptions, advanced filtering, and exclusive features like saved articles and reading history.",
  },
  {
    question: "Can I export or save articles?",
    answer:
      "Absolutely! Save articles to your personal library, export them as PDF, or share them with colleagues. Premium users get unlimited storage and advanced organization features.",
  },
];

export type FeatureItem = {
  title: string;
  description: string;
  icon: string;
  size?: "small" | "large" | "wide";
  image?: {
    src: string;
    alt: string;
  };
};

export const features: FeatureItem[] = [
  {
    title: "Smart Subscriptions",
    description:
      "Subscribe to domains and keywords to get a curated feed of relevant news articles tailored to your interests.",
    icon: "Rss",
  },
  {
    title: "Real-Time Updates",
    description:
      "Get instant notifications when new articles matching your interests are published. Never miss breaking news.",
    icon: "Bell",
  },
  {
    title: "Advanced Filtering",
    description:
      "Filter by source credibility, publication date, content length, and more. Customize your feed exactly how you want it.",
    icon: "Filter",
  },
  {
    title: "Personalized Feed",
    description:
      "AI-powered recommendations that learn from your reading habits and preferences to surface the most relevant stories.",
    icon: "Sparkles",
  },
  {
    title: "Save & Organize",
    description:
      "Save articles to your personal library, create custom collections, and organize by tags for easy reference.",
    icon: "Bookmark",
  },
  {
    title: "Multi-Source Aggregation",
    description:
      "We aggregate news from thousands of trusted sources worldwide. Get comprehensive coverage from multiple perspectives.",
    icon: "Globe",
  },
  {
    title: "Search & Discovery",
    description:
      "Powerful search capabilities to find articles by keyword, date range, source, or topic. Discover trending stories.",
    icon: "Search",
  },
  {
    title: "Export & Share",
    description:
      "Export articles as PDF, share with colleagues, or integrate with your workflow tools. Full control over your content.",
    icon: "Share2",
  },
  {
    title: "Privacy First",
    description:
      "Your reading history and preferences are private. We never sell your data. Full control over your privacy settings.",
    icon: "Lock",
  },
];

export type NavItem = {
  title: string;
  href: string;
  external?: boolean;
};

export const navItems: NavItem[] = [
  {
    title: "Features",
    href: "#features",
  },
  {
    title: "Pricing",
    href: "#pricing",
  },
  {
    title: "Testimonials",
    href: "#testimonials",
  },
  {
    title: "Contact",
    href: "#contact",
  },
];

export const footerNavigation = {
  product: [
    { title: "Features", href: "#features" },
    { title: "Pricing", href: "#pricing" },
    { title: "Integrations", href: "#integrations" },
    { title: "Changelog", href: "#changelog" },
    { title: "Roadmap", href: "#roadmap" },
  ],
  company: [
    { title: "About", href: "#about" },
    { title: "Blog", href: "#blog" },
    { title: "Careers", href: "#careers" },
    { title: "Customers", href: "#customers" },
    { title: "Contact", href: "#contact" },
  ],
  legal: [
    { title: "Privacy Policy", href: "#privacy" },
    { title: "Terms of Service", href: "#terms" },
    { title: "Cookie Policy", href: "#cookies" },
  ],
  social: [
    { title: "Facebook", href: "#", icon: "Facebook" },
    { title: "Twitter", href: "#", icon: "Twitter" },
    { title: "Instagram", href: "#", icon: "Instagram" },
    { title: "LinkedIn", href: "#", icon: "Linkedin" },
    { title: "GitHub", href: "#", icon: "Github" },
  ],
};

export type PricingPlan = {
  name: string;
  description: string;
  price: number;
  popular?: boolean;
  features: string[];
  buttonText: string;
  buttonVariant?: "default" | "outline";
};

export const pricingPlans: PricingPlan[] = [
  {
    name: "Free",
    description: "Perfect to get started",
    price: 0,
    features: [
      "Up to 5 subscriptions",
      "Basic news feed",
      "Standard notifications",
      "Community support",
      "7-day article history",
    ],
    buttonText: "Get Started",
    buttonVariant: "outline",
  },
  {
    name: "Pro",
    description: "For power users",
    price: 9,
    popular: true,
    features: [
      "Unlimited subscriptions",
      "Advanced filtering & search",
      "Priority notifications",
      "Email support",
      "Unlimited article history",
      "Save & organize articles",
      "PDF export",
    ],
    buttonText: "Start Free Trial",
  },
  {
    name: "Team",
    description: "For organizations",
    price: 29,
    features: [
      "Everything in Pro",
      "Up to 10 team members",
      "Shared collections",
      "Team analytics",
      "Priority support",
      "API access",
      "Custom integrations",
    ],
    buttonText: "Contact Sales",
    buttonVariant: "outline",
  },
];

export type Testimonial = {
  content: string;
  author: {
    name: string;
    role: string;
    company: string;
    image?: string;
  };
};

export const testimonials: Testimonial[] = [
  {
    content:
      "NewsAi has completely changed how I stay informed. Instead of scrolling through endless feeds, I get exactly the news I care about. The personalization is incredible!",
    author: {
      name: "Sarah Chen",
      role: "Product Manager",
      company: "TechStart Co.",
      image: "/placeholder.svg?height=100&width=100",
    },
  },
  {
    content:
      "As a journalist, I use NewsAi daily to track stories across multiple domains. The real-time updates and multi-source aggregation save me hours of research time.",
    author: {
      name: "Marcus Johnson",
      role: "Senior Journalist",
      company: "Digital News Network",
      image: "/placeholder.svg?height=100&width=100",
    },
  },
  {
    content:
      "The ability to save and organize articles has transformed my research workflow. I can now easily reference past stories and share them with my team.",
    author: {
      name: "Lisa Rodriguez",
      role: "Research Director",
      company: "Analytics Firm",
      image: "/placeholder.svg?height=100&width=100",
    },
  },
  {
    content:
      "NewsAi's filtering options are fantastic. I can focus on credible sources and avoid misinformation. It's exactly what I needed for staying informed.",
    author: {
      name: "David Thompson",
      role: "Business Analyst",
      company: "Investment Group",
      image: "/placeholder.svg?height=100&width=100",
    },
  },
];
