import { Container } from '@/components/shared/Container';
import { personalInfo } from '@/lib/data';
import { Code2 } from 'lucide-react';

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-primary text-primary-foreground py-8">
      <Container className="text-center">
        <div className="flex justify-center items-center mb-2">
          <Code2 className="h-6 w-6 text-accent mr-2" />
          <p className="text-sm">
             &copy;  All rights reserved to  {personalInfo.name} 
          </p>
        </div>
        <p className="text-xs text-primary-foreground/70">
          Built by Harsh Prajapati..
        </p>
      </Container>
    </footer>
  );
}
