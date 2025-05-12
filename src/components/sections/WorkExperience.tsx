
'use client';

import { useState, useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import Image from 'next/image';
import { Card, CardHeader, CardTitle, CardContent, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { SectionTitle } from '@/components/shared/SectionTitle';
import { Container } from '@/components/shared/Container';
import { workExperience as initialWorkExperience } from '@/lib/data';
import type { WorkExperienceItem as WorkExperienceItemType } from '@/types';
import { DescriptionAdjuster } from '@/components/ai/DescriptionAdjuster';
import { Briefcase, PencilRuler } from 'lucide-react';
import { useScrollAnimation } from '@/hooks/useScrollAnimation';
import { cn } from '@/lib/utils'; // Assuming cn is still needed for other classes

interface WorkExperienceItemProps {
  item: WorkExperienceItemType;
  onUpdateResponsibilities: (itemId: string, newResponsibilities: string[]) => void;
}

function WorkExperienceItem({ item, onUpdateResponsibilities }: WorkExperienceItemProps) {
  const [isAdjusterOpen, setIsAdjusterOpen] = useState(false);
  const [textToAdjust, setTextToAdjust] = useState('');
  const [responsibilityIndexToAdjust, setResponsibilityIndexToAdjust] = useState<number | null>(null);

  const openAdjuster = (text: string, index: number) => {
    setTextToAdjust(text);
    setResponsibilityIndexToAdjust(index);
    setIsAdjusterOpen(true);
  };

  const handleResponsibilityAdjusted = (adjustedText: string) => {
    if (responsibilityIndexToAdjust !== null) {
      const newResponsibilities = [...item.responsibilities];
      newResponsibilities[responsibilityIndexToAdjust] = adjustedText;
      onUpdateResponsibilities(item.id, newResponsibilities);
    }
  };

  const cardRef = useRef(null);
  const isInView = useInView(cardRef, { amount: 0.1 }); // Trigger when 10% visible


  // Define animation variants within the component to access index
  const cardVariants = {
    hiddenLeft: { opacity: 0, x: -100 },
    hiddenRight: { opacity: 0, x: 100 },
    visible: { opacity: 1, x: 0, transition: { duration: 0.6 } },
  };

  // Find the index of the current item in the original data to determine animation direction
  const itemIndex = initialWorkExperience.findIndex(exp => exp.id === item.id);

  return (
    <>
      <motion.div
        ref={cardRef}
        variants={cardVariants}
        initial={itemIndex % 2 === 0 ? "hiddenLeft" : "hiddenRight"}
        animate={isInView ? "visible" : "hidden"}
        className="mb-8" // Add bottom margin here instead of on Card
      >
        <Card className="shadow-lg hover:shadow-xl transition-shadow duration-300 bg-card">
          <CardHeader className="flex flex-row items-start gap-4">
            {item.logoUrl && (
              <Image
                src={item.logoUrl}
                alt={`${item.company} logo`}
                width={50}
                height={70}
                className="rounded-md border border-border"
                data-ai-hint={item.logoDataAiHint || "company logo"}
              />
            )}
            <div className="flex-1">
              <CardTitle className="text-xl font-semibold text-primary">{item.title}</CardTitle>
              <CardDescription className="text-md text-muted-foreground">{item.company}</CardDescription>
              <Badge variant="secondary" className="mt-1">{item.startDate} - {item.endDate}</Badge>
            </div>
          </CardHeader>
          <CardContent>
            <ul className="list-disc list-outside space-y-2 pl-5 text-foreground/90">
              {item.responsibilities.map((resp, index) => (
                <li key={index} className="group relative">
                  {resp}
                  <Button
                    variant="ghost"
                    size="icon"
                    className="absolute -top-1 -right-1 h-7 w-7 opacity-0 group-hover:opacity-100 transition-opacity text-accent hover:text-accent/80"
                    onClick={() => openAdjuster(resp, index)}
                    title="Adjust with AI"
                  >
                    <PencilRuler className="h-4 w-4" />
                  </Button>
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>
      </motion.div>
      {isAdjusterOpen && (
        <DescriptionAdjuster
          isOpen={isAdjusterOpen}
          setIsOpen={setIsAdjusterOpen}
          initialText={textToAdjust}
          onTextAdjusted={handleResponsibilityAdjusted}
          />
      )}
    </>
  );
}

export function WorkExperience() {
  const [currentWorkExperience, setCurrentWorkExperience] = useState<WorkExperienceItemType[]>(initialWorkExperience);
  const animation = useScrollAnimation<HTMLElement>(); // Keep this if you still use it for the section title/description

  const handleUpdateResponsibilities = (itemId: string, newResponsibilities: string[]) => {
    setCurrentWorkExperience(prev => 
      prev.map(item => 
        item.id === itemId ? { ...item, responsibilities: newResponsibilities } : item
      )
    );
  };

  return (
    <section
      id="work"
      ref={animation.ref} 
      className={cn('bg-background', animation.className)}
    >
      <Container>
        <SectionTitle>
          <Briefcase className="inline-block mb-2 mr-2 h-8 w-8 text-accent" /> Work Experience
        </SectionTitle>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
          {currentWorkExperience.map((item) => (
            <WorkExperienceItem
              key={item.id}
              item={item} 
              onUpdateResponsibilities={handleUpdateResponsibilities}
            />
          ))}
        </div>
      </Container>
    </section>
  );
}
