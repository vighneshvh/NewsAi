import type React from "react";

import { features } from "@/lib/constants";

// SVG Animation Components
const AnimatedRss = () => (
  <svg className='w-12 h-12' viewBox='0 0 24 24' fill='none' xmlns='http://www.w3.org/2000/svg'>
    <style>{`
      @keyframes pulse-ring {
        0% { r: 2; opacity: 1; }
        100% { r: 8; opacity: 0; }
      }
      .pulse-circle { animation: pulse-ring 2s infinite; }
    `}</style>
    <circle cx='4' cy='20' r='2' fill='currentColor' />
    <path d='M4 4a12 12 0 0 1 12 12' stroke='currentColor' strokeWidth='2' fill='none' />
    <path d='M4 10a6 6 0 0 1 6 6' stroke='currentColor' strokeWidth='2' fill='none' />
    <circle cx='4' cy='20' r='2' fill='currentColor' className='pulse-circle' opacity='0.5' />
  </svg>
);

const AnimatedBell = () => (
  <svg className='w-12 h-12' viewBox='0 0 24 24' fill='none' xmlns='http://www.w3.org/2000/svg'>
    <style>{`
      @keyframes ring {
        0%, 100% { transform: rotate(0deg); }
        10%, 20% { transform: rotate(-10deg); }
        30%, 50%, 70%, 90% { transform: rotate(10deg); }
        40%, 60%, 80% { transform: rotate(-10deg); }
      }
      .ring-bell { animation: ring 2s infinite; transform-origin: top center; }
    `}</style>
    <g className='ring-bell'>
      <path d='M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9' stroke='currentColor' strokeWidth='2' fill='none' />
      <path d='M13.73 21a2 2 0 0 1-3.46 0' stroke='currentColor' strokeWidth='2' fill='none' />
    </g>
  </svg>
);

const AnimatedFilter = () => (
  <svg className='w-12 h-12' viewBox='0 0 24 24' fill='none' xmlns='http://www.w3.org/2000/svg'>
    <style>{`
      @keyframes slide {
        0%, 100% { transform: translateY(0); }
        50% { transform: translateY(-2px); }
      }
      .filter-line { animation: slide 2s infinite; }
    `}</style>
    <path d='M4 6h16M6 12h12M8 18h8' stroke='currentColor' strokeWidth='2' fill='none' className='filter-line' />
  </svg>
);

const AnimatedStar = () => (
  <svg className='w-12 h-12' viewBox='0 0 24 24' fill='none' xmlns='http://www.w3.org/2000/svg'>
    <style>{`
      @keyframes twinkle {
        0%, 100% { opacity: 0.3; }
        50% { opacity: 1; }
      }
      .star { animation: twinkle 2s infinite; }
    `}</style>
    <path d='M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z' fill='currentColor' className='star' />
  </svg>
);

const AnimatedBookmark = () => (
  <svg className='w-12 h-12' viewBox='0 0 24 24' fill='none' xmlns='http://www.w3.org/2000/svg'>
    <style>{`
      @keyframes bounce {
        0%, 100% { transform: translateY(0); }
        50% { transform: translateY(-3px); }
      }
      .bookmark { animation: bounce 2s infinite; }
    `}</style>
    <path d='M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z' stroke='currentColor' strokeWidth='2' fill='none' className='bookmark' />
  </svg>
);

const AnimatedGlobe = () => (
  <svg className='w-12 h-12' viewBox='0 0 24 24' fill='none' xmlns='http://www.w3.org/2000/svg'>
    <style>{`
      @keyframes rotate {
        from { transform: rotate(0deg); }
        to { transform: rotate(360deg); }
      }
      .globe { animation: rotate 8s linear infinite; }
    `}</style>
    <circle cx='12' cy='12' r='10' stroke='currentColor' strokeWidth='2' fill='none' className='globe' />
    <path d='M2 12h20M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z' stroke='currentColor' strokeWidth='2' fill='none' className='globe' />
  </svg>
);

const AnimatedSearch = () => (
  <svg className='w-12 h-12' viewBox='0 0 24 24' fill='none' xmlns='http://www.w3.org/2000/svg'>
    <style>{`
      @keyframes search {
        0%, 100% { transform: translate(0, 0); }
        50% { transform: translate(2px, 2px); }
      }
      .search-circle { animation: search 2s infinite; }
    `}</style>
    <circle cx='11' cy='11' r='8' stroke='currentColor' strokeWidth='2' fill='none' className='search-circle' />
    <path d='m21 21-4.35-4.35' stroke='currentColor' strokeWidth='2' fill='none' className='search-circle' />
  </svg>
);

const AnimatedShare = () => (
  <svg className='w-12 h-12' viewBox='0 0 24 24' fill='none' xmlns='http://www.w3.org/2000/svg'>
    <style>{`
      @keyframes share-pulse {
        0%, 100% { opacity: 0.5; }
        50% { opacity: 1; }
      }
      .share-dot { animation: share-pulse 1.5s infinite; }
    `}</style>
    <circle cx='18' cy='5' r='3' fill='currentColor' className='share-dot' />
    <circle cx='6' cy='12' r='3' fill='currentColor' className='share-dot' style={{ animationDelay: '0.3s' }} />
    <circle cx='18' cy='19' r='3' fill='currentColor' className='share-dot' style={{ animationDelay: '0.6s' }} />
    <line x1='18' y1='8' x2='6' y2='14' stroke='currentColor' strokeWidth='2' />
    <line x1='18' y1='16' x2='6' y2='14' stroke='currentColor' strokeWidth='2' />
  </svg>
);

const AnimatedLock = () => (
  <svg className='w-12 h-12' viewBox='0 0 24 24' fill='none' xmlns='http://www.w3.org/2000/svg'>
    <style>{`
      @keyframes lock-click {
        0%, 100% { transform: scale(1); }
        50% { transform: scale(1.05); }
      }
      .lock { animation: lock-click 2s infinite; }
    `}</style>
    <rect x='3' y='11' width='18' height='11' rx='2' stroke='currentColor' strokeWidth='2' fill='none' className='lock' />
    <path d='M7 11V7a5 5 0 0 1 10 0v4' stroke='currentColor' strokeWidth='2' fill='none' className='lock' />
  </svg>
);

const svgAnimations: Record<string, React.ReactNode> = {
  rss: <AnimatedRss />,
  bell: <AnimatedBell />,
  filter: <AnimatedFilter />,
  star: <AnimatedStar />,
  bookmark: <AnimatedBookmark />,
  globe: <AnimatedGlobe />,
  search: <AnimatedSearch />,
  share: <AnimatedShare />,
  lock: <AnimatedLock />,
};

export default function Features() {
  return (
    <section id='features' className='py-20 md:py-28 bg-background'>
      <div className='container px-4 md:px-6'>
        <div className='text-center mb-12'>
          <h2 className='text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl'>
            Powerful Features for News Enthusiasts
          </h2>
          <p className='mt-4 text-lg text-muted-foreground max-w-[700px] mx-auto'>
            Everything you need to stay informed with personalized news curation, advanced filtering, and intelligent recommendations
          </p>
        </div>

        {/* Tight Bento Grid */}
        <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4'>
          {features.map((feature, index) => (
            <div
              key={index}
              className='group relative bg-gradient-to-br from-muted/50 to-muted/30 dark:from-muted/20 dark:to-muted/5 rounded-lg p-5 border border-muted-foreground/10 hover:border-primary/30 transition-all duration-300 hover:shadow-lg hover:shadow-primary/10 overflow-hidden'>
              
              {/* Animated background gradient */}
              <div className='absolute inset-0 bg-gradient-to-r from-primary/0 via-primary/5 to-primary/0 opacity-0 group-hover:opacity-100 transition-opacity duration-300' />
              
              {/* Content */}
              <div className='relative z-10 flex flex-col items-start h-full'>
                {/* SVG Animation */}
                <div className='text-primary/80 group-hover:text-primary transition-colors duration-300 mb-3'>
                  {svgAnimations[feature.icon.toLowerCase()] || (
                    <div className='w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center'>
                      <span className='text-xs font-bold'>{feature.icon[0]}</span>
                    </div>
                  )}
                </div>
                
                {/* Title */}
                <h3 className='text-sm font-semibold text-foreground mb-2 line-clamp-2'>
                  {feature.title}
                </h3>
                
                {/* Description */}
                <p className='text-xs text-muted-foreground line-clamp-3 flex-grow'>
                  {feature.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
