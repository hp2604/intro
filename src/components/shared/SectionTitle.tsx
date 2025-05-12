import { cn } from '@/lib/utils';

interface SectionTitleProps {
  children: React.ReactNode;
  className?: string;
}

export function SectionTitle({ children, className }: SectionTitleProps) {
  return (
    <h2 className={cn('text-3xl md:text-4xl font-bold text-center mb-12 md:mb-16 text-primary', className)}>
      {children}
    </h2>
  );
}
