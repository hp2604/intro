
'use client';

import { Badge } from '@/components/ui/badge';
import { SectionTitle } from '@/components/shared/SectionTitle';
import { Container } from '@/components/shared/Container';
import { skills } from '@/lib/data';
import { CheckCircle2 } from 'lucide-react';
import { useScrollAnimation } from '@/hooks/useScrollAnimation';
import { cn } from '@/lib/utils';

export function Skills() {
  const animation = useScrollAnimation<HTMLElement>();

  return (
    <section 
      id="skills" 
      ref={animation.ref}
      className={cn('bg-secondary', animation.className)}
    >
      <Container>
        <SectionTitle>
          <CheckCircle2 className="inline-block mb-2 mr-2 h-8 w-8 text-accent" /> Skills & Expertise
        </SectionTitle>
        <div className="max-w-3xl mx-auto text-center">
          <div className="flex flex-wrap justify-center gap-3">
            {skills.map((skill) => (
              <Badge
                key={skill.id}
                variant="default"
                className="px-4 py-2 text-sm font-medium bg-primary text-primary-foreground hover:bg-primary/90 transition-all duration-200 ease-in-out shadow-md hover:shadow-lg transform hover:-translate-y-1"
              >
                {skill.icon && <skill.icon className="mr-2 h-4 w-4" />}
                {skill.name}
              </Badge>
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
}
