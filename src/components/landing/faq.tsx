import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { faqItems } from "@/lib/constants";

export default function FAQ() {
  return (
    <section id='faq' className='py-20 md:py-28 bg-background '>
      <div className='container px-4 md:px-6 max-w-4xl mx-auto '>
        <div className='text-center mb-16'>
          <h2 className='text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl'>
            Frequently Asked Questions
          </h2>
          <p className='mt-4 text-lg text-muted-foreground max-w-[700px] mx-auto'>
            Have questions? We have answers. Learn more about NewsAi and how it
            works.
          </p>
        </div>

        <Accordion type='single' collapsible className='w-full'>
          {faqItems.map((item, index) => (
            <AccordionItem key={index} value={`item-${index}`}>
              <AccordionTrigger className='text-left text-lg font-medium'>
                {item.question}
              </AccordionTrigger>
              <AccordionContent className='text-muted-foreground'>
                {item.answer}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </section>
  );
}
