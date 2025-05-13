
'use client';

import { Button } from '@/components/ui/button';
import { socialLinks, personalInfo } from '@/lib/data';
import { Container } from '@/components/shared/Container';
import Link from 'next/link';
import { DownloadCloud } from 'lucide-react';
import { useScrollAnimation } from '@/hooks/useScrollAnimation';
import { cn } from '@/lib/utils';

export function Hero() {
  const animation = useScrollAnimation<HTMLElement>();

  return (
    <section 
      id="hero" 
 ref={animation.ref}
 className={cn('bg-secondary py-20 md:py-32 w-full', animation.className)}
    >
 <Container className="text-center w-full max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold text-primary mb-6">
          {personalInfo.name}
        </h1>
        <p className="text-xl md:text-2xl text-foreground/90 mb-8 max-w-3xl mx-auto">
          <span className="typewriter-title">{personalInfo.title}</span>
        </p>
        <p className="text-md md:text-lg text-muted-foreground mb-10 max-w-2xl mx-auto">
          {personalInfo.bio}
        </p>
        <div className="flex justify-center gap-4 mb-12">
          <Button asChild size="lg" className="bg-accent hover:bg-accent/90 text-accent-foreground">
            <Link href={personalInfo.resumeUrl} target="_blank" rel="noopener noreferrer">
              <DownloadCloud className="mr-2 h-5 w-5" />
              View Resume
            </Link>
          </Button>
          <Button asChild variant="outline" size="lg">
            <Link href="#contact">
              Contact Me
            </Link>
          </Button>
        </div>
        <div className="flex justify-center space-x-6">
          {socialLinks.map((link) => (
            <Link
              key={link.name}
              href={link.url}
              target="_blank"
              rel="noopener noreferrer"
              className="text-muted-foreground hover:text-accent transition-colors"
              aria-label={link.name}
            >
              <link.icon className="h-7 w-7" />
            </Link>
          ))}
        </div>
      </Container>
    </section>
  );
}
