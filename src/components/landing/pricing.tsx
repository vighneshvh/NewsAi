import { Button } from "@/components/ui/button";
import { Check } from "lucide-react";
import { pricingPlans } from "@/lib/constants";

export default function Pricing() {
  return (
    <section
      id='pricing'
      className='py-20 md:py-28 bg-muted/30 dark:bg-background'>
      <div className='container px-4 md:px-6'>
        <div className='text-center mb-16'>
          <h2 className='text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl'>
            Simple, Transparent Pricing
          </h2>
          <p className='mt-4 text-lg text-muted-foreground max-w-[700px] mx-auto'>
            Choose the perfect plan for your news consumption needs. Start free,
            upgrade anytime.
          </p>
        </div>

        <div className='grid grid-cols-1 md:grid-cols-3 gap-8'>
          {pricingPlans.map((plan) => (
            <div
              key={plan.name}
              className='flex flex-col p-6 bg-background dark:bg-muted/10 rounded-xl border shadow-sm relative'>
              {plan.popular && (
                <div className='absolute top-0 right-0 bg-primary text-primary-foreground px-3 py-1 text-xs font-medium rounded-bl-lg rounded-tr-lg'>
                  Popular
                </div>
              )}
              <div className='mb-4'>
                <h3 className='text-xl font-bold'>{plan.name}</h3>
                <p className='text-muted-foreground mt-1'>{plan.description}</p>
              </div>
              <div className='mb-4'>
                <span className='text-4xl font-bold'>${plan.price}</span>
                <span className='text-muted-foreground'>/month</span>
              </div>
              <ul className='space-y-3 mb-6 flex-grow'>
                {plan.features.map((feature, index) => (
                  <li key={index} className='flex items-center'>
                    <Check className='h-5 w-5 text-primary mr-2' />
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
              <Button
                variant={plan.buttonVariant || "default"}
                className='w-full'>
                {plan.buttonText}
              </Button>
            </div>
          ))}
        </div>

        <div className='mt-16 text-center bg-gradient-to-r from-primary/10 to-primary/5 dark:from-primary/20 dark:to-primary/10 p-8 rounded-2xl max-w-3xl mx-auto border border-primary/20'>
          <h3 className='text-2xl font-bold'>Looking for something more?</h3>
          <p className='mt-3 text-muted-foreground text-lg'>
            Contact our team for enterprise solutions with custom features, API
            access, and dedicated support.
          </p>
          <Button className='mt-6' size='lg'>
            Get in Touch
          </Button>
        </div>
      </div>
    </section>
  );
}
