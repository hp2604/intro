
'use client';

import type { FC } from 'react';
import Link from 'next/link';
import { Container } from '@/components/shared/Container';
import { navItems } from '@/lib/data';
import { Menu, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTrigger, SheetClose, SheetTitle, SheetHeader, SheetDescription } from '@/components/ui/sheet';
import { useState, useEffect } from 'react';
import { cn } from '@/lib/utils';
import { ThemeToggleButton } from '@/components/theme/ThemeToggleButton';


export const Header: FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Initial check
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);


  return (
    <header
      className={cn(
        'fixed top-0 left-0 right-0 z-50 transition-all duration-300 ease-in-out',
        isScrolled ? 'bg-background/95 shadow-lg backdrop-blur-md' : 'bg-transparent',
        'border-b border-transparent',
        isScrolled && 'border-border/30'
      )}
    >
      <Container className="flex h-16 items-center justify-between">
        {/* Desktop Navigation - Centered */}
        <nav className="hidden md:flex items-center space-x-1 flex-1 justify-center">
          {navItems.map((item) => (
            <Button
              key={item.label}
              variant="ghost"
              asChild
              className="text-foreground/80 hover:text-primary hover:bg-accent/10 px-3 py-2"
            >
              <Link href={item.href}>{item.label}</Link>
            </Button>
          ))}
        </nav>
        {/* Mobile Navigation */}
        <div className="md:hidden flex items-center">
          <Button variant="ghost" size="icon" aria-label="Toggle Menu" onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}>
            {isMobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </Button>
          {/* Mobile Menu Container */}
          <div className={cn(
            "absolute top-16 left-0 right-0 bg-background/95 shadow-lg backdrop-blur-md py-4 transition-all duration-300 ease-in-out",
            isMobileMenuOpen ? "translate-y-0 opacity-100 visible" : "-translate-y-full opacity-0 invisible"
          )}>
            <nav className="flex flex-col items-center space-y-4">
              {navItems.map((item) => (
                <Button key={item.label} variant="ghost" asChild className="text-foreground hover:text-primary hover:bg-accent/10 px-3 py-2 text-lg">
                  <Link href={item.href} onClick={() => setIsMobileMenuOpen(false)}>{item.label}</Link>
                </Button>
              ))}
              </nav>
          </div>
        </div>

        {/* Theme Toggle Button */}
        <div className="flex items-center ml-auto">
           <ThemeToggleButton />
        </div>

        {/* Placeholder for desktop to balance the centered nav if ThemeToggle was not on the right.
            Adjust width if necessary or remove if nav truly takes full width or centering is absolute.
            Making it 0 width as ThemeToggleButton now serves a similar balancing purpose on desktop.
        */}
        <div className="hidden md:flex flex-shrink-0" style={{ width: '0px' }}>
          {/* This div helps maintain layout consistency. */}
        </div>
      </Container>
    </header>
  );
};
