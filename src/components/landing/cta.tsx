import { Button } from "@/components/ui/button";
import { ArrowRight, Zap } from "lucide-react";

export default function CTA() {
  return (
    <section className='py-20 md:py-28 bg-gradient-to-r from-primary/10 via-primary/5 to-primary/10 dark:from-primary/20 dark:via-primary/10 dark:to-primary/20'>
      <div className='container px-4 md:px-6'>
        <div className='max-w-3xl mx-auto text-center'>
          <div className='inline-flex items-center gap-2 mb-6 px-3 py-1 rounded-full bg-primary/10 border border-primary/20'>
            <Zap className='h-4 w-4 text-primary' />
            <span className='text-sm font-medium text-primary'>Limited Time Offer</span>
          </div>
          
          <h2 className='text-3xl md:text-5xl font-bold tracking-tight mb-6'>
            Start Your Personalized News Journey Today
          </h2>
          
          <p className='text-lg text-muted-foreground mb-8 max-w-2xl mx-auto'>
            Join thousands of readers who are already using NewsAi to stay informed. Get your personalized feed in seconds—no credit card required.
          </p>
          
          <div className='flex flex-col sm:flex-row gap-4 justify-center'>
            <Button size='lg' className='gap-2'>
              Start Free Trial <ArrowRight className='h-4 w-4' />
            </Button>
            <Button size='lg' variant='outline'>
              See How It Works
            </Button>
          </div>
          
          <p className='text-sm text-muted-foreground mt-8'>
            ✓ Free forever plan available • ✓ No credit card needed • ✓ Cancel anytime
          </p>
        </div>
      </div>
    </section>
  );
}
