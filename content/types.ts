export type Language = 'zh' | 'en';
export type ThemePreference = 'dark' | 'light' | 'system';
export type LocalizedText = { zh: string; en: string };
export type ResearchStatus = 'active' | 'exploring' | 'archived';

export interface Profile {
  name: LocalizedText;
  role: LocalizedText;
  tagline: LocalizedText;
  bio: LocalizedText;
  statement: LocalizedText;
  avatar?: string;
  resume?: string;
}

export interface ResearchArea {
  id: string;
  index: string;
  title: LocalizedText;
  summary: LocalizedText;
  topics: LocalizedText[];
  status: ResearchStatus;
}

export interface Project {
  id: string;
  slug: string;
  title: LocalizedText;
  summary: LocalizedText;
  category: LocalizedText;
  status: LocalizedText;
  period?: LocalizedText;
  role: LocalizedText;
  technologies: string[];
  highlights: { zh: string[]; en: string[] };
  details: {
    problem: LocalizedText;
    route: LocalizedText;
    system: LocalizedText;
    implementation: LocalizedText;
    result: LocalizedText;
    challenge: LocalizedText;
    solution: LocalizedText;
    current: LocalizedText;
  };
  cover?: string;
  gallery?: string[];
  repository?: string;
  demo?: string;
  paper?: string;
  featured: boolean;
  emphasis: 'primary' | 'secondary';
}

export interface ExperienceItem {
  id: string;
  period: LocalizedText;
  type: LocalizedText;
  title: LocalizedText;
  summary: LocalizedText;
}

export interface Output {
  id: string;
  type: 'research' | 'software' | 'award' | 'report';
  title: LocalizedText;
  year?: number;
  status: LocalizedText;
  summary: LocalizedText;
  area: LocalizedText;
  links?: { pdf?: string; code?: string; project?: string; video?: string };
}

export interface NoteMeta {
  slug: string;
  title: LocalizedText;
  summary: LocalizedText;
  date?: string;
  tags: string[];
  readingMinutes?: number;
  published: boolean;
}
