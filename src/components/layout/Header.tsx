
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
        
        {/* Theme Toggle Button - Desktop */}
        <div className="hidden md:flex items-center ml-auto md:ml-4">
           <ThemeToggleButton />
        </div>


        {/* Mobile Navigation Trigger and Theme Toggle */}
        <div className="md:hidden flex items-center flex-shrink-0 ml-auto">
          <ThemeToggleButton />
          <Sheet open={isMobileMenuOpen} onOpenChange={setIsMobileMenuOpen}>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" aria-label="Open navigation menu" className="ml-2">
                <Menu className="h-6 w-6" />
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-[280px] p-0 bg-background flex flex-col">
              <SheetHeader className="p-4 border-b border-border/30 flex flex-row justify-between items-center">
                {/* Added SheetTitle for accessibility, visually hidden if not desired */}
                <SheetTitle className="text-lg font-semibold">Menu</SheetTitle> 
                <SheetClose asChild>
                  <Button variant="ghost" size="icon" aria-label="Close navigation menu">
                    <X className="h-6 w-6" />
                  </Button>
                </SheetClose>
              </SheetHeader>
              <nav className="flex-grow flex flex-col space-y-2 p-4">
                {navItems.map((item) => (
                  <SheetClose key={item.label} asChild>
                     <Link
                      href={item.href}
                      className="block px-3 py-2 rounded-md text-base font-medium text-foreground/90 hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground focus:outline-none"
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      {item.label}
                    </Link>
                  </SheetClose>
                ))}
              </nav>
            </SheetContent>
          </Sheet>
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
