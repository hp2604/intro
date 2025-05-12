import type { LucideIcon } from 'lucide-react';

export interface NavItem {
  label: string;
  href: string;
}

export interface SocialLink {
  name: string;
  url: string;
  icon: LucideIcon;
}

export interface WorkExperienceItem {
  id: string;
  title: string;
  company: string;
  startDate: string;
  endDate: string | 'Present';
  responsibilities: string[];
  logoUrl?: string;
  logoDataAiHint?: string;
}

export interface ProjectItem {
  id: string;
  title: string;
  description: string;
  imageUrl: string;
  tags: string[];
  liveLink?: string;
  repoLink?: string;
  imageDataAiHint?: string;
}

export interface SkillItem {
  id: string;
  name: string;
  icon?: LucideIcon;
}

export interface EducationItem {
  id: string;
  institution: string;
  degree: string;
  fieldOfStudy: string;
  startDate: string;
  endDate: string | 'Present';
  description?: string;
  logoUrl?: string;
  logoDataAiHint?: string;
}

export interface CertificateItem {
  id: string;
  name: string;
  issuingOrganization: string;
  issueDate: string;
  credentialID?: string;
  credentialUrl?: string;
  logoUrl?: string;
  logoDataAiHint?: string;
  description?: string; // Optional description if needed
}

export interface SoftwareItem {
  id: string;
  name: string;
  icon?: LucideIcon;
  category?: string;
  imageUrl?: string;
  logoDataAiHint?: string;
}
