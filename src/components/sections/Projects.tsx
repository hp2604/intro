
'use client';

import { useState, useRef } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { SectionTitle } from '@/components/shared/SectionTitle';
import { Container } from '@/components/shared/Container';
import { projects as initialProjects } from '@/lib/data';
import type { ProjectItem as ProjectItemType } from '@/types';
import { DescriptionAdjuster } from '@/components/ai/DescriptionAdjuster';
import { Github, ExternalLink, Lightbulb, PencilRuler } from 'lucide-react';
import { useScrollAnimation } from '@/hooks/useScrollAnimation';
import { cn } from '@/lib/utils';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import Autoplay from "embla-carousel-autoplay";

interface ProjectCardProps {
  project: ProjectItemType;
  onUpdateDescription: (projectId: string, newDescription: string) => void;
}

function ProjectCard({ project, onUpdateDescription }: ProjectCardProps) {
  const [isAdjusterOpen, setIsAdjusterOpen] = useState(false);
  const [textToAdjust, setTextToAdjust] = useState('');

  const openAdjuster = (text: string) => {
    setTextToAdjust(text);
    setIsAdjusterOpen(true);
  };

  const handleDescriptionAdjusted = (adjustedText: string) => {
    onUpdateDescription(project.id, adjustedText);
  };
  
  return (
    <>
      <Card className="flex flex-col h-full shadow-lg hover:shadow-xl transition-shadow duration-300 bg-card overflow-hidden">
        <div className="relative w-full h-48 md:h-56">
          <Image
            src={project.imageUrl}
            alt={project.title}
            layout="fill"
            objectFit="cover"
            className="transition-transform duration-300 group-hover:scale-105"
            data-ai-hint={project.imageDataAiHint || "project technology"}
          />
        </div>
        <CardHeader>
          <CardTitle className="text-xl font-semibold text-primary">{project.title}</CardTitle>
        </CardHeader>
        <CardContent className="flex-grow relative group">
          <p className="text-sm text-foreground/90 mb-3">{project.description}</p>
          <Button
            variant="ghost"
            size="icon"
            className="absolute top-0 right-0 h-7 w-7 opacity-0 group-hover:opacity-100 transition-opacity text-accent hover:text-accent/80"
            onClick={() => openAdjuster(project.description)}
            title="Adjust with AI"
          >
            <PencilRuler className="h-4 w-4" />
          </Button>
          <div className="flex flex-wrap gap-2 mt-auto">
            {project.tags.map((tag) => (
              <Badge key={tag} variant="secondary" className="text-xs">{tag}</Badge>
            ))}
          </div>
        </CardContent>
        <CardFooter className="mt-auto pt-4 border-t">
          <div className="flex justify-start space-x-3">
            {project.repoLink && (
              <Button variant="outline" size="sm" asChild>
                <Link href={project.repoLink} target="_blank" rel="noopener noreferrer">
                  <Github className="mr-2 h-4 w-4" /> GitHub
                </Link>
              </Button>
            )}
            {project.liveLink && (
              <Button variant="default" size="sm" asChild className="bg-accent hover:bg-accent/90 text-accent-foreground">
                <Link href={project.liveLink} target="_blank" rel="noopener noreferrer">
                  <ExternalLink className="mr-2 h-4 w-4" /> Live Demo
                </Link>
              </Button>
            )}
          </div>
        </CardFooter>
      </Card>
      {isAdjusterOpen && (
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

export function Projects() {
  const [currentProjects, setCurrentProjects] = useState<ProjectItemType[]>(initialProjects);
  const animation = useScrollAnimation<HTMLElement>();

  const autoplayPlugin = useRef(
    Autoplay({ delay: 4000, stopOnInteraction: true, stopOnMouseEnter: false })
  );

  const handleUpdateDescription = (projectId: string, newDescription: string) => {
    setCurrentProjects(prev =>
      prev.map(proj =>
        proj.id === projectId ? { ...proj, description: newDescription } : proj
      )
    );
  };

  if (!currentProjects || currentProjects.length === 0) {
    return null;
  }

  return (
    <section 
      id="projects" 
      ref={animation.ref}
      className={cn('bg-background', animation.className)}
    >
      <Container>
        <SectionTitle>
           <Lightbulb className="inline-block mb-2 mr-2 h-8 w-8 text-accent" /> Projects Showcase
        </SectionTitle>
        
        <Carousel
          plugins={[autoplayPlugin.current]}
          opts={{
            align: "start",
            loop: currentProjects.length > 1, // Loop only if more than one project
          }}
          className="w-full max-w-xs sm:max-w-md md:max-w-2xl lg:max-w-4xl xl:max-w-6xl mx-auto"
        >
          <CarouselContent className="-ml-4"> {/* Negative margin to offset item padding */}
            {currentProjects.map((project) => (
              <CarouselItem key={project.id} className="pl-4 md:basis-1/2 lg:basis-1/3">
                <div className="h-full"> {/* Ensure card container takes full height */}
                  <ProjectCard 
                    project={project} 
                    onUpdateDescription={handleUpdateDescription}
                  />
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
          {currentProjects.length > 1 && (
            <>
              <CarouselPrevious />
              <CarouselNext />
            </>
          )}
        </Carousel>
      </Container>
    </section>
  );
}
