import type React from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import * as LucideIcons from "lucide-react";
import { footerNavigation } from "@/lib/constants";

export default function Footer() {
  return (
    <footer className='bg-muted dark:bg-muted/10 py-12 border-t'>
      <div className='container px-4 md:px-6'>
        <div className='grid grid-cols-1 md:grid-cols-4 gap-8'>
          <div className='md:col-span-1'>
            <div className='flex items-center gap-2 mb-4'>
              <svg
                xmlns='http://www.w3.org/2000/svg'
                viewBox='0 0 24 24'
                fill='none'
                stroke='currentColor'
                strokeWidth='2'
                strokeLinecap='round'
                strokeLinejoin='round'
                className='h-6 w-6 text-primary'>
                <path d='M4 11a9 9 0 0 1 9 9' />
                <path d='M4 4a16 16 0 0 1 16 16' />
                <circle cx='5' cy='19' r='1' />
              </svg>
              <span className='text-xl font-bold'>NewsAi</span>
            </div>
            <p className='text-muted-foreground mb-4'>
              Your personalized news feed powered by AI. Stay informed with
              curated content from thousands of trusted sources.
            </p>
            <div className='flex space-x-4'>
              {footerNavigation.social.map((item) => {
                const IconComponent = LucideIcons[
                  item.icon as keyof typeof LucideIcons
                ] as React.FC<LucideIcons.LucideProps>;
                return (
                  <Link
                    key={item.title}
                    href={item.href}
                    className='text-muted-foreground hover:text-primary'>
                    <IconComponent className='h-5 w-5' />
                    <span className='sr-only'>{item.title}</span>
                  </Link>
                );
              })}
            </div>
          </div>

          <div>
            <h3 className='font-semibold text-lg mb-4'>Product</h3>
            <ul className='space-y-3'>
              {footerNavigation.product.map((item) => (
                <li key={item.title}>
                  <Link
                    href={item.href}
                    className='text-muted-foreground hover:text-primary'>
                    {item.title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className='font-semibold text-lg mb-4'>Company</h3>
            <ul className='space-y-3'>
              {footerNavigation.company.map((item) => (
                <li key={item.title}>
                  <Link
                    href={item.href}
                    className='text-muted-foreground hover:text-primary'>
                    {item.title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className='font-semibold text-lg mb-4'>Subscribe</h3>
            <p className='text-muted-foreground mb-4'>
              Stay updated with the latest features and releases.
            </p>
            <div className='flex flex-col sm:flex-row gap-2'>
              <Input
                type='email'
                placeholder='Enter your email'
                className='max-w-[300px]'
              />
              <Button type='submit'>Subscribe</Button>
            </div>
          </div>
        </div>

        <div className='border-t mt-12 pt-8 flex flex-col md:flex-row justify-between items-center'>
          <p className='text-sm text-muted-foreground'>
            © {new Date().getFullYear()} NewsAi. All rights reserved.
          </p>
          <div className='flex gap-4 mt-4 md:mt-0'>
            {footerNavigation.legal.map((item) => (
              <Link
                key={item.title}
                href={item.href}
                className='text-sm text-muted-foreground hover:text-primary'>
                {item.title}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
