import type { WorkExperienceItem, ProjectItem, SkillItem, SocialLink, NavItem, EducationItem, CertificateItem } from '@/types';
// Assuming SoftwareItem type is defined in '@/types'
import { Github, Linkedin, Twitter, Briefcase, Lightbulb, Mail, Phone, MapPin, BrainCircuit, PencilLine, GraduationCap, Award, Cpu, GitFork, TerminalSquare, Code } from 'lucide-react';

export const navItems: NavItem[] = [
  { label: 'Work', href: '#work' },
  { label: 'Education', href: '#education' },
  { label: 'Certificates', href: '#certificates' },
  { label: 'Projects', href: '#projects' },
  { label: 'Skills', href: '#skills' },
  { label: 'Software', href: '#software' },
  { label: 'Contact', href: '#contact' },
];

export const socialLinks: SocialLink[] = [
  { name: 'GitHub', url: 'https://github.com/hp2604', icon: Github },
  { name: 'LinkedIn', url: 'https://linkedin.com/in/harshprajapati2604', icon: Linkedin },
  { name: 'Twitter', url: 'https://twitter.com/harsh_p5900', icon: Twitter },
];

export const personalInfo = {
  name: 'Harsh Prajapati',
  title: 'Java Developer',
  bio: "Passionate about building innovative solutions that blend cutting-edge technology with user-centric design. Experienced in developing scalable web applications and exploring the frontiers of artificial intelligence.",
  email: 'harshprajapati0139@gmail.com',
  phone: '+91 8959551239 ',
  location: 'Ujjain',
  resumeUrl: '/harsh_prajapati_resume.pdf', 
};

export const workExperience: WorkExperienceItem[] = [
  {
    id: 'work1',
    title: 'Java Developer  Intern',
    company: 'Syn Intern',
    startDate: 'Feb 2024',
    endDate: 'Mar 2024',
    responsibilities: [
      'Worked and Learned about various concept of Java OOP.',
      'Worked on backend of web page',
    ],
  },
  {
    id: 'work2',
    title: 'Java Developer Intern',
    company: 'CodSoft',
    startDate: 'Sep 2023',
    endDate: 'Oct 2023',
    responsibilities: [
      'Developed Java Application like ATM Interface, guessing game. ',
      'Learned about how to use Java OOP in real world',
    ],
  },
  {
    id: 'work3',
    title: 'Web Developer Intern',
    company: 'Oasis Info Byte',
    startDate: 'Jan 2023',
    endDate: 'Feb 2023',
    responsibilities: [
      'Developed a working  Temperature converter web application. ',
      'Learned about Version Control Git',
    ],
  },
  
];

export const education: EducationItem[] = [
  {
    id: 'edu1',
    institution: 'Mahakal Institute of Technology ',
    degree: 'Bachelor of Technology',
    fieldOfStudy: 'Information Technology',
    startDate: 'Nov 2021',
    endDate: 'Jun 2025',
    description: 'Relevant coursework: Data Structures and Algorithms, Database Management Systems, Operating Systems, Software Engineering. Actively participated in coding competitions and tech fests.',
  },
  {
    id: 'edu2',
    institution: 'Vinay Adarsh H.S School',
    degree: 'Higher Secondary Education (12th)',
    fieldOfStudy: 'Physics, Chemistry, Maths (PCM)',
    startDate: 'Apr 2020',
    endDate: 'Mar 2021',
    description: 'Achieved a strong academic record, focusing on science and mathematics.',
  },
  {
    id: 'edu3',
    institution: 'Vindhyachal Public School',
    degree: 'Secondary Education (10th)',
    fieldOfStudy: 'General Studies',
    startDate: 'Apr 2018',
    endDate: 'Mar 2019',
    description: 'Completed secondary education with distinction.',
  }
];

export const certificates: CertificateItem[] = [
  {
    id: 'cert1',
    name: 'Java with DSA and System Design',
    issuingOrganization: 'PW Skill',
    issueDate: 'August 2024',
    credentialUrl: 'http://bit.ly/3H53Zta',
    description: 'Demonstrated proficiency in Java SE programming, covering core concepts and best practices.',
  },
  {
    id: 'cert2',
    name: 'TCS Ion Carrier Edge -Young Profession',
    issuingOrganization: 'TCS Ion',
    issueDate: 'June 2023',
    credentialUrl: 'https://bit.ly/3GQNGjI', 
    description: 'Developed effective communication and professional skills.',
  },
  {
    id: 'cert3',
    name: 'TCS CodeVita Rank Certificate',
    issuingOrganization: 'TCS',
    issueDate: 'March 2024',
    credentialUrl: 'https://bit.ly/4jNbYcR', 
    description: 'Achieved a notable rank in the TCS CodeVita coding competition.',
  },
  {
    id: 'cert4',
    name: 'SQL Certification',
    issuingOrganization: 'IntelliPaat Academy',
    issueDate: 'January 2025',
    credentialUrl: 'https://bit.ly/3GOtQ8G', 
    description: 'Completed comprehensive SQL training, mastering database querying and management.',
  },
];


export const projects: ProjectItem[] = [
  {
    id: 'proj1',
    title: 'School Management System',
    description: 'The School Management System is a full-stack web application designed to streamline and manage various administrative and academic tasks within a school environment. It provides functionality for different user roles such as Admin, Teachers, Students, and Parents.',
    imageUrl: 'https://res.cloudinary.com/dcruh7av2/image/upload/v1747045916/School_vkrrmw.jpg',
    tags: ['Java', 'SpringBoot','Restful API' ,'React', 'SQL'],
    repoLink: 'https://github.com/hp2604/School_Management',
  },
  {
    id: 'proj2',
    title: 'AirLine Reservation System',
    description: 'The Airline Reservation System is  web-based Java application that allows users to search for flights, make bookings, and manage airline reservations. It is designed to simulate the core functionalities of real-world airline booking systems and helps airlines manage schedules, seat availability, and passenger records.',
    imageUrl: 'https://res.cloudinary.com/dcruh7av2/image/upload/v1747057469/Aeroplane_etglj2.jpg',
    tags: ['Java', 'JSP', 'Servlet', 'SQL' ,'JDBC'],
    repoLink: 'https://github.com/hp2604/AirLine_Reservation_System',
  },
  {
    id: 'proj3',
    title: 'Domain Selling Website ',
    description: 'The Domain Selling Website is a web-based application developed using Java that allows users to search for available domain names, purchase them, and manage their domain portfolio. It simulates the core functionality of domain registrar platforms like GoDaddy or Namecheap, offering a user-friendly interface for domain registration and sales.',
    imageUrl: 'https://res.cloudinary.com/dcruh7av2/image/upload/v1747059496/domain_e5jork.png',
    tags: ['Java','JSP','Servlet', 'SQL', 'JDBC'],
    repoLink: 'https://github.com/hp2604/Domain_Selling',
  },
  {
    id: 'proj4',
    title: 'Hospital Management System',
    description: 'The Hospital Management System is a simple, menu-driven console-based application developed using Core Java. It helps manage basic operations of a hospital such as storing patient records, managing doctor schedules, handling appointments, and generating simple reports — all through a command-line interface.',
    imageUrl: 'https://res.cloudinary.com/dcruh7av2/image/upload/v1747061732/hospital_esz4vn.jpg',
    tags: ['Java','JDBC','SQL'],
    repoLink: 'https://github.com/hp2604/Nk_Hospital_Console',
  },
  {
    id: 'proj5',
    title: 'Speech To Text Website ',
    description: 'The Speech-to-Text Website is a modern web application built using React that allows users to convert spoken language into written text in real time. It utilizes the browser’s built-in speech recognition capabilities to capture and transcribe speech, making it useful for note-taking, accessibility tools, and voice-based input applications.',
    imageUrl: 'https://res.cloudinary.com/dcruh7av2/image/upload/v1747060277/speech_bolp13.png',
    tags: ['React','JavaScript'],
    repoLink: 'https://github.com/hp2604/SpeechApp',
  },
  
];

export const skills: SkillItem[] = [
  { id: 'skill1', name: 'Java', icon: BrainCircuit },
  { id: 'skill2', name: 'JDBC', icon: BrainCircuit },
  { id: 'skill3', name: 'Servlet', icon: BrainCircuit },
  { id: 'skill4', name: 'JSP', icon: BrainCircuit },
  { id: 'skill5', name: 'Hibernate', icon: BrainCircuit },
  { id: 'skill6', name: 'Spring Boot', icon: PencilLine },
  { id: 'skill7', name: 'RESTful API', icon: BrainCircuit },
  { id: 'skill8', name: 'SQL (MySQL)', icon: BrainCircuit },
  { id: 'skill9', name: 'HTML', icon: BrainCircuit },
  { id: 'skill10', name: 'CSS', icon: BrainCircuit },
  { id: 'skill11', name: 'React', icon: PencilLine },
  { id: 'skill12', name: 'Problem Solving', icon: BrainCircuit },
  
];

export type SoftwareItem = {
  id: string;
  name: string;
  icon?: React.ElementType; 
  category?: string;
}
export const software: SoftwareItem[] = [ 
  { id: 'software1', name: 'VS Code',icon : Code, category: 'IDE' },
  { id: 'software2', name: 'Apache NetBeans', icon: Code, category: 'IDE' },
  { id: 'software3', name: 'Eclipse', icon: Code, category: 'IDE' },
  { id: 'software3', name: 'Git', icon: GitFork, category: 'Version Control' },
  { id: 'software4', name: 'GitHub', icon: Github, category: 'Version Control' },
  { id: 'software5', name: 'MySQL Workbench', icon: Cpu, category: 'Database Tool' },
  { id: 'software6', name: 'Postman', icon: TerminalSquare, category: 'API Testing' },
  { id: 'software7', name: 'Windows', icon: TerminalSquare, category: 'Operating System' },
  { id: 'software8', name: 'Maven', icon: Cpu, category: 'Build Tool' },
  
];


export const contactMethods = [
  { icon: Mail, text: personalInfo.email, href: `mailto:${personalInfo.email}` },
  { icon: Phone, text: personalInfo.phone, href: `tel:${personalInfo.phone.replace(/\s/g, "")}` },
  { icon: MapPin, text: personalInfo.location, href: '#' },
];


export { Award, Briefcase, BrainCircuit, GraduationCap, Lightbulb, Mail, MapPin, PencilLine, Phone, Cpu, GitFork, TerminalSquare, Code };
