'use client';

import { Header } from '@/components/layout/Header';
import { Hero } from '@/components/sections/Hero';
import { WorkExperience } from '@/components/sections/WorkExperience';
import { Education } from '@/components/sections/Education';
import { Certificates } from '@/components/sections/Certificates';
import { Projects } from '@/components/sections/Projects';
import { Skills } from '@/components/sections/Skills';
import { Software } from '@/components/sections/Software';
import { Contact } from '@/components/sections/Contact';
import { Footer } from '@/components/layout/Footer';
import { useScrollAnimation } from '@/hooks/useScrollAnimation';

export default function HomePage() {
  const heroAnimation = useScrollAnimation();
  const workExperienceAnimation = useScrollAnimation();
  const educationAnimation = useScrollAnimation();
  const certificatesAnimation = useScrollAnimation();
  const projectsAnimation = useScrollAnimation();
  const skillsAnimation = useScrollAnimation();
  const softwareAnimation = useScrollAnimation();
  const contactAnimation = useScrollAnimation();

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-grow bg-blue-100">
        <div ref={heroAnimation.ref} className={heroAnimation.className}>
          <Hero />
        </div>

        <div ref={workExperienceAnimation.ref} className={workExperienceAnimation.className}>
          <WorkExperience />
        </div>

        <div ref={educationAnimation.ref} className={educationAnimation.className}>
          <Education />
        </div>

        <div ref={certificatesAnimation.ref} className={certificatesAnimation.className}>
          <Certificates />
        </div>

        <div ref={projectsAnimation.ref} className={projectsAnimation.className}>
          <Projects />
        </div>

        <div ref={skillsAnimation.ref} className={skillsAnimation.className}>
          <Skills />
        </div>

        <div ref={softwareAnimation.ref} className={softwareAnimation.className}>
          <Software />
        </div>

        <div ref={contactAnimation.ref} className={contactAnimation.className}>
          <Contact />
        </div>

      </main>
      <Footer />
    </div>
  );
}
