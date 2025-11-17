import { Button } from "@/components/ui/button";
import { ArrowRight, Sparkles } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export default function Hero() {
  return (
    <section className='py-20 md:py-32 bg-gradient-to-b from-background via-primary/5 to-background dark:from-background dark:via-primary/10 dark:to-background'>
      <div className='container px-4 md:px-6'>
        <div className='grid gap-8 lg:grid-cols-2 lg:gap-12 items-center'>
          <div className='flex flex-col justify-center space-y-6'>
            <div className='inline-flex items-center gap-2 w-fit px-3 py-1 rounded-full bg-primary/10 border border-primary/20'>
              <Sparkles className='h-4 w-4 text-primary' />
              <span className='text-sm font-medium text-primary'>
                AI-Powered News Curation
              </span>
            </div>
            <div className='space-y-4'>
              <h1 className='text-4xl font-bold tracking-tighter sm:text-5xl xl:text-6xl/none'>
                Your Personalized <br />
                <span className='text-primary'>News Feed</span>
              </h1>
              <p className='max-w-[600px] text-lg text-muted-foreground md:text-xl'>
                Subscribe to domains and keywords that matter to you. Get a
                curated feed of relevant news articles from thousands of trusted
                sources worldwide, updated in real-time.
              </p>
            </div>
            <div className='flex flex-col gap-3 min-[400px]:flex-row'>
              <Link href='/signup'>
                <Button size='lg' className='gap-2'>
                  Start Reading <ArrowRight className='h-4 w-4' />
                </Button>
              </Link>
            </div>
            <div className='flex items-center gap-3 text-sm pt-2'>
              <div className='flex -space-x-2'>
                <div className='h-8 w-8 rounded-full border-2 border-background bg-gradient-to-br from-blue-400 to-blue-600'></div>
                <div className='h-8 w-8 rounded-full border-2 border-background bg-gradient-to-br from-purple-400 to-purple-600'></div>
                <div className='h-8 w-8 rounded-full border-2 border-background bg-gradient-to-br from-pink-400 to-pink-600'></div>
              </div>
              <div className='text-muted-foreground'>
                Loved by{" "}
                <span className='font-semibold text-foreground'>50,000+</span>{" "}
                readers worldwide
              </div>
            </div>
          </div>
          <div className='mx-auto lg:ml-auto flex items-center justify-center w-full'>
            <div className='relative w-full max-w-[500px] aspect-video rounded-2xl overflow-hidden shadow-2xl'>
              <div className='absolute inset-0 bg-gradient-to-br from-primary/30 to-primary/10 z-10'></div>
              <Image
                src='/placeholder.svg?height=500&width=800'
                alt='NewsAi Dashboard'
                className='w-full h-full object-cover'
                width={500}
                height={500}
              />
              <div className='absolute inset-0 rounded-2xl border border-primary/20 z-20'></div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
