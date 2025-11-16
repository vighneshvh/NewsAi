"use client";

import { useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Menu, X } from "lucide-react";
import { ThemeToggle } from "@/components/theme-toggle";
import { navItems } from "@/lib/constants";

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <header className='sticky top-0 z-50 w-full pl-6 border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60'>
      <div className='container flex h-16 items-center justify-between'>
        <div className='flex items-center gap-2'>
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

        {/* Desktop Navigation */}
        <nav className='hidden md:flex items-center gap-6'>
          {navItems.map((item) => (
            <Link
              key={item.title}
              href={item.href}
              className='text-sm font-medium hover:text-primary'
              target={item.external ? "_blank" : undefined}
              rel={item.external ? "noopener noreferrer" : undefined}>
              {item.title}
            </Link>
          ))}
        </nav>

        <div className='hidden md:flex items-center gap-4'>
          <ThemeToggle />
          <Link href='/signin'>
            <Button variant='outline' size='sm'>
              Log in
            </Button>
          </Link>
          <Link href='/signup'>
            <Button size='sm'>Get Started</Button>
          </Link>
        </div>

        <button className='md:hidden' onClick={toggleMenu}>
          {isMenuOpen ? (
            <X className='h-6 w-6' />
          ) : (
            <Menu className='h-6 w-6' />
          )}
        </button>
      </div>

      {/* Mobile Navigation */}
      {isMenuOpen && (
        <div className='md:hidden p-4 pt-0 bg-background border-b'>
          <nav className='flex flex-col space-y-4 py-4'>
            {navItems.map((item) => (
              <Link
                key={item.title}
                href={item.href}
                className='text-sm font-medium hover:text-primary'
                onClick={toggleMenu}
                target={item.external ? "_blank" : undefined}
                rel={item.external ? "noopener noreferrer" : undefined}>
                {item.title}
              </Link>
            ))}
            <div className='flex flex-col gap-2 pt-2'>
              <div className='flex justify-start py-2'>
                <ThemeToggle />
              </div>
              <Link href='/signin'>
                <Button variant='outline' size='sm' className='w-full'>
                  Log in
                </Button>
              </Link>
              <Link href='/signup'>
                <Button size='sm' className='w-full'>
                  Get Started
                </Button>
              </Link>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
}
