
'use client';

import { useState } from 'react';
import Image from 'next/image';import { motion, useInView } from 'framer-motion';
import { Card, CardHeader, CardTitle, CardContent, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { SectionTitle } from '@/components/shared/SectionTitle';
import { Container } from '@/components/shared/Container';
import { education as initialEducationData } from '@/lib/data';
import type { EducationItem as EducationItemType } from '@/types';
import { DescriptionAdjuster } from '@/components/ai/DescriptionAdjuster';
import { GraduationCap, PencilRuler } from 'lucide-react';
import { useRef } from 'react';
import { useScrollAnimation } from '@/hooks/useScrollAnimation';
import { cn } from '@/lib/utils';

interface EducationEntryProps {
  item: EducationItemType;
  onUpdateDescription: (itemId: string, newDescription: string) => void;
}

function EducationEntry({ item, onUpdateDescription }: EducationEntryProps) {
  const [isAdjusterOpen, setIsAdjusterOpen] = useState(false);
  const [textToAdjust, setTextToAdjust] = useState('');

  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { margin: "-100px" });

  const openAdjuster = (text: string) => {
    setTextToAdjust(text);
    setIsAdjusterOpen(true);
  };

  const handleDescriptionAdjusted = (adjustedText: string) => {
    onUpdateDescription(item.id, adjustedText);
  };

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, x: -100 }}
      animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -100 }}
      transition={{ duration: 0.5 }}
    >
      <Card className="mb-8 shadow-lg hover:shadow-xl transition-shadow duration-300 bg-card" data-ai-hint="Education entry card">
        <CardHeader className="flex flex-row items-start gap-4">
          {item.logoUrl && (
            <Image
              src={item.logoUrl}
              alt={`${item.institution} logo`}
              width={48}
              height={48}
              className="rounded-md border border-border"
              data-ai-hint={item.logoDataAiHint || "university logo"}
            />
          )}
          <div className="flex-1">
            <CardTitle className="text-xl font-semibold text-primary">{item.institution}</CardTitle>
            <CardDescription className="text-md text-muted-foreground">
              {item.degree} in {item.fieldOfStudy}
            </CardDescription>
            <Badge variant="secondary" className="mt-1">{item.startDate} - {item.endDate}</Badge>
          </div>
        </CardHeader>
        {item.description && (
          <CardContent className="relative group pt-0">
            <p className="text-sm text-foreground/90">{item.description}</p>
            <Button
              variant="ghost"
              size="icon"
              className="absolute -top-1 -right-1 h-7 w-7 opacity-0 group-hover:opacity-100 transition-opacity text-accent hover:text-accent/80"
              onClick={() => openAdjuster(item.description!)}
              title="Adjust with AI"
            >
              <PencilRuler className="h-4 w-4" />
            </Button>
          </CardContent>
        )}
      </Card>
      {isAdjusterOpen && item.description && (
        <DescriptionAdjuster
          isOpen={isAdjusterOpen}
          setIsOpen={setIsAdjusterOpen}
          initialText={textToAdjust}
          onTextAdjusted={handleDescriptionAdjusted}
        />
      )}
    </motion.div>
  );
}

export function Education() {
  const [currentEducationItems, setCurrentEducationItems] = useState<EducationItemType[]>(initialEducationData);
  const animation = useScrollAnimation<HTMLElement>();

  const handleUpdateDescription = (itemId: string, newDescription: string) => {
    setCurrentEducationItems(prev =>
      prev.map(item =>
        item.id === itemId ? { ...item, description: newDescription } : item
      )
    );
  };

  return (
    <section 
      id="education" 
      ref={animation.ref}
      className={cn('bg-secondary', animation.className)}
    >
      <Container>
        <SectionTitle>
          <GraduationCap className="inline-block mb-2 mr-2 h-8 w-8 text-accent" /> Education & Qualifications
        </SectionTitle>
        <div className="max-w-3xl mx-auto">
          {currentEducationItems.map((item) => (
            <EducationEntry
              key={item.id}
              item={item}
              onUpdateDescription={handleUpdateDescription}
            />
          ))}
        </div>
      </Container>
    </section>
  );
}
