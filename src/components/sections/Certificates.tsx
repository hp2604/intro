
'use client';

import { useState, useRef } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Card, CardHeader, CardTitle, CardContent, CardDescription, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { SectionTitle } from '@/components/shared/SectionTitle';
import { Container } from '@/components/shared/Container';
import { certificates as initialCertificatesData } from '@/lib/data';
import type { CertificateItem as CertificateItemType } from '@/types';
import { DescriptionAdjuster } from '@/components/ai/DescriptionAdjuster';
import { Award, ExternalLink, PencilRuler, ArrowRight } from 'lucide-react';
import { useScrollAnimation } from '@/hooks/useScrollAnimation';
import { cn } from '@/lib/utils';
import { motion, useInView } from 'framer-motion'; // Import motion

interface CertificateCardProps {
  item: CertificateItemType;
  onUpdateDescription: (itemId: string, newDescription: string) => void;
}

function CertificateCard({ item, onUpdateDescription }: CertificateCardProps) {
  const [isAdjusterOpen, setIsAdjusterOpen] = useState(false);
  const [textToAdjust, setTextToAdjust] = useState('');

  const openAdjuster = (text: string) => {
    setTextToAdjust(text);
    setIsAdjusterOpen(true);
  };

  const handleDescriptionAdjusted = (adjustedText: string) => {
    onUpdateDescription(item.id, adjustedText);
  };

  return (
    <>
      <Card className="mb-8 shadow-lg hover:shadow-xl transition-shadow duration-300 bg-card flex flex-col h-full">
        <CardHeader className="flex flex-row items-start gap-4">
          {item.logoUrl && (
            <Image
              src={item.logoUrl}
              alt={`${item.issuingOrganization} logo`}
              width={40}
              height={40}
              className="rounded-md border border-border"
              data-ai-hint={item.logoDataAiHint || "organization logo"}
            />
          )}
          <div className="flex-1">
            <CardTitle className="text-lg font-semibold text-primary">{item.name}</CardTitle>
            <CardDescription className="text-sm text-muted-foreground">
              Issued by: {item.issuingOrganization}
            </CardDescription>
            <Badge variant="secondary" className="mt-1 text-xs">
              Issued: {item.issueDate}
            </Badge>
          </div>
        </CardHeader>
        {item.description && (
          <CardContent className="relative group pt-0 flex-grow">
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
        {(item.credentialID || item.credentialUrl) && (
          <CardFooter className="mt-auto pt-4 border-t">
            <div className="flex flex-col sm:flex-row gap-2 items-start w-full">
              {item.credentialID && (
                <p className="text-xs text-muted-foreground">Credential ID: {item.credentialID}</p>
              )}
              {item.credentialUrl && (
                <Button variant="outline" size="sm" asChild className="sm:ml-auto">
                  <Link href={item.credentialUrl} target="_blank" rel="noopener noreferrer">
                    <ExternalLink className="mr-2 h-4 w-4" /> View Credential
                  </Link>
                </Button>
              )}
            </div>
          </CardFooter>
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
    </>
  );
}

export function Certificates() {
  const [currentCertificates, setCurrentCertificates] = useState<CertificateItemType[]>(initialCertificatesData);
  const sectionAnimation = useScrollAnimation<HTMLElement>(); // For the whole section
  const ref = useRef(null);
  const inView = useInView(ref, { amount: 0.2 });

  const cardVariants = {
    hidden: { opacity: 0, scale: 0.8, y: 50 },
    visible: { opacity: 1, scale: 1.05, y: 0, transition: { type: "spring", stiffness: 100, damping: 10 } },
  };


 
  const handleUpdateDescription = (itemId: string, newDescription: string) => {
    setCurrentCertificates(prev =>
      prev.map(item =>
        item.id === itemId ? { ...item, description: newDescription } : item
      )
    );
  };

  if (!currentCertificates || currentCertificates.length === 0) {
    return null; // Optionally render a message if no certificates
  }

  return (
    <section 
      id="certificates"
      ref={ref} 
      className={cn('bg-secondary', sectionAnimation.className)} 
    >
      <Container>
        <SectionTitle>
          <Award className="inline-block mb-2 mr-2 h-8 w-8 text-accent" /> Certificates & Awards
        </SectionTitle>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {currentCertificates.map((item) => (
            <motion.div
              key={`certificate-${item.id}`}
              variants={cardVariants}
              initial="hidden"
              animate={inView ? "visible" : "hidden"}
            >
              <CertificateCard
                item={item}
                onUpdateDescription={handleUpdateDescription}
              />
            </motion.div>
          ))}
        </div>
        <div className="mt-12 text-center">
          <Button asChild size="lg" className="bg-primary hover:bg-primary/90 text-primary-foreground">
            <Link href="https://drive.google.com/drive/folders/18ClsSohkC2cXihn7k0Hrnaemv780azNU" target="_blank" rel="noopener noreferrer"> 
              Explore All Certificates
              <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
          </Button>
        </div>
      </Container>
    </section>
  );
}
