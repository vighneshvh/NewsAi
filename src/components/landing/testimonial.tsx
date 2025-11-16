import { Card, CardContent } from "@/components/ui/card";
import { testimonials } from "@/lib/constants";
import { QuoteIcon } from "lucide-react";
import Image from "next/image";

export default function Testimonials() {
  return (
    <section
      id='testimonials'
      className='py-20 md:py-28 bg-muted/30 dark:bg-muted/5'>
      <div className='container px-4 md:px-6'>
        <div className='text-center mb-16'>
          <h2 className='text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl'>
            Loved by Readers Everywhere
          </h2>
          <p className='mt-4 text-lg text-muted-foreground max-w-[700px] mx-auto'>
            Discover how NewsAi is helping people stay informed and save time
          </p>
        </div>

        <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
          {testimonials.map((testimonial, index) => (
            <Card key={index} className='border bg-background dark:bg-muted/10'>
              <CardContent className='p-6'>
                <QuoteIcon className='h-8 w-8 text-primary/40 mb-4' />
                <p className='text-lg mb-6'>{testimonial.content}</p>
                <div className='flex items-center'>
                  {testimonial.author.image && (
                    <div className='mr-4'>
                      <div className='h-12 w-12 rounded-full overflow-hidden'>
                        <Image
                          src={testimonial.author.image || "/placeholder.svg"}
                          alt={testimonial.author.name}
                          width={48}
                          height={48}
                          className='h-full w-full object-cover'
                        />
                      </div>
                    </div>
                  )}
                  <div>
                    <h4 className='font-semibold'>{testimonial.author.name}</h4>
                    <p className='text-sm text-muted-foreground'>
                      {testimonial.author.role}, {testimonial.author.company}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
