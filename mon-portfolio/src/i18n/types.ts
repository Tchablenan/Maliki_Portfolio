import type { ProjectId, ServiceIcon } from "@/data/profile";

export interface NavItem {
  id: string;
  label: string;
}

export interface Service {
  icon: ServiceIcon;
  title: string;
  description: string;
  tags: string[];
}

export interface Project {
  id: ProjectId;
  title: string;
  period: string;
  place: string;
  description: string;
  tags: string[];
}

export interface Experience {
  period: string;
  role: string;
  organization: string;
  location: string;
  highlights: string[];
}

export interface Publication {
  year: string;
  title: string;
  venue: string;
  href?: string;
}

export interface Distinction {
  year: string;
  title: string;
  issuer: string;
}

export interface Degree {
  year: string;
  title: string;
  school: string;
}

export interface LanguageSkill {
  name: string;
  level: string;
  /** 0 – 100, width of the gauge */
  value: number;
}

export interface Dictionary {
  meta: {
    title: string;
    description: string;
    keywords: string[];
  };
  nav: {
    items: NavItem[];
    openMenu: string;
    closeMenu: string;
    toggleTheme: string;
    language: string;
    skip: string;
    menuContactTitle: string;
    menuContactText: string;
    follow: string;
  };
  hero: {
    headline: string;
    greeting: string;
    name: string;
    badge: string;
    cta: string;
    intro: string;
    photoAlt: string;
  };
  partnersLabel: string;
  about: {
    title: string;
    text: string;
    yearsValue: string;
    yearsLabel: string;
    statement: string;
    cta: string;
    cv: string;
    photoAlt: string;
    portraitAlt: string;
    stats: { value: string; label: string }[];
  };
  services: {
    kicker: string;
    lead: string;
    text: string;
    title: string;
    items: Service[];
  };
  projects: {
    title: string;
    text: string;
    linkLabel: string;
    items: Project[];
  };
  marquee: string[];
  experience: {
    title: string;
    text: string;
    items: Experience[];
  };
  research: {
    title: string;
    text: string;
    publicationsTitle: string;
    publications: Publication[];
    distinctionsTitle: string;
    distinctions: Distinction[];
    membershipsTitle: string;
    memberships: string[];
    readLabel: string;
  };
  education: {
    title: string;
    text: string;
    degrees: Degree[];
    languagesTitle: string;
    languages: LanguageSkill[];
    softwareTitle: string;
    software: string[];
  };
  contact: {
    title: string;
    text: string;
    formTitle: string;
    formText: string;
    name: string;
    namePlaceholder: string;
    email: string;
    emailPlaceholder: string;
    subject: string;
    subjects: string[];
    message: string;
    messagePlaceholder: string;
    submit: string;
    sending: string;
    success: string;
    error: string;
    location: string;
  };
  footer: {
    title: string;
    text: string;
    rights: string;
    backToTop: string;
  };
  notFound: {
    title: string;
    text: string;
    back: string;
  };
}
