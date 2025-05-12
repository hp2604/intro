
'use client';

import { SectionTitle } from '@/components/shared/SectionTitle';
import { Container } from '@/components/shared/Container';
import { software } from '@/lib/data';
import { Cpu } from 'lucide-react'; 
import { useScrollAnimation } from '@/hooks/useScrollAnimation';
import { cn } from '@/lib/utils';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import type { SoftwareItem as SoftwareItemType } from '@/types';
export function Software() {
  const animation = useScrollAnimation<HTMLElement>();

  const categorizedSoftware = software.reduce((acc, tool) => {
    const category = tool.category || 'Other Tools';
    if (!acc[category]) {
      acc[category] = [];
    }
    acc[category].push(tool);
    return acc;
  }, {} as Record<string, SoftwareItemType[]>);

  return (
    <section
      id="software"
      ref={animation.ref}
      className={cn('bg-background py-16 md:py-24', animation.className)}
    >
      <Container>
        <SectionTitle>
          <Cpu className="inline-block mb-2 mr-2 h-8 w-8 text-accent" /> Software & Tools
        </SectionTitle>

        <Accordion type="multiple" className="w-full space-y-4 max-w-4xl mx-auto">
          {Object.entries(categorizedSoftware).map(([category, tools]) => (
            <AccordionItem key={category} value={category} className="border rounded-lg shadow-sm hover:shadow-md transition-shadow bg-card">
              <AccordionTrigger className="px-6 py-4 hover:no-underline">
                <h3 className="text-xl md:text-2xl font-semibold text-primary">{category}</h3>
              </AccordionTrigger>
              <AccordionContent className="px-6 pb-6 pt-0">
                <ul className="list-disc list-inside space-y-2 pt-4">
                  {tools.map((tool) => (
                    <li key={tool.id} className="flex items-center text-foreground/90 text-lg">
                      {tool.imageUrl ? (
                        <img src={tool.imageUrl} alt={`${tool.name} logo`} className="h-6 w-6 mr-3" />
                      ) : (tool.icon && <tool.icon className="h-6 w-6 text-accent mr-3" />)}
                      {tool.name}
                    </li>
                  ))}
                </ul>
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </Container>
    </section>
  );
}
