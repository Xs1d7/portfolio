// ── Education ────────────────────────────────────────────

export interface Education {
  institution: string;
  degree: { pt: string; en: string };
  field: { pt: string; en: string };
  period: { start: string; end: string | null };
  description?: { pt: string; en: string };
}

export const education: Education[] = [
  {
    institution: "Universidade Federal de São Paulo",
    degree: { pt: "Bacharelado", en: "Bachelor's Degree" },
    field: { pt: "Ciência da Computação", en: "Computer Science" },
    period: { start: "2018", end: "2022" },
    description: {
      pt: "Foco em engenharia de software, estruturas de dados e desenvolvimento web.",
      en: "Focus on software engineering, data structures, and web development.",
    },
  },
  {
    institution: "ETEC São Paulo",
    degree: { pt: "Técnico", en: "Technical Diploma" },
    field: { pt: "Informática para Internet", en: "Internet Computing" },
    period: { start: "2016", end: "2017" },
  },
];

// ── Courses ──────────────────────────────────────────────

export interface Course {
  name: { pt: string; en: string };
  institution: string;
  year: string;
  hours: number;
  credential?: string;
}

export const courses: Course[] = [
  {
    name: { pt: "React Avançado — Aplicações com Next.js", en: "Advanced React — Apps with Next.js" },
    institution: "Udemy",
    year: "2024",
    hours: 95,
  },
  {
    name: { pt: "Formação TypeScript", en: "TypeScript Training" },
    institution: "Rocketseat",
    year: "2023",
    hours: 40,
  },
  {
    name: { pt: "UX/UI Design Fundamentals", en: "UX/UI Design Fundamentals" },
    institution: "Coursera",
    year: "2023",
    hours: 30,
  },
  {
    name: { pt: "Acessibilidade Web", en: "Web Accessibility" },
    institution: "W3Cx",
    year: "2022",
    hours: 20,
  },
  {
    name: { pt: "JavaScript Moderno — ES6+", en: "Modern JavaScript — ES6+" },
    institution: "Origamid",
    year: "2021",
    hours: 35,
  },
  {
    name: { pt: "Git e GitHub Completo", en: "Complete Git and GitHub" },
    institution: "Udemy",
    year: "2020",
    hours: 12,
  },
];

// ── Skills ───────────────────────────────────────────────

export type SkillLevel = 1 | 2 | 3 | 4 | 5;

export interface Skill {
  name: string;
  level: SkillLevel;
  category: "frontend" | "backend" | "tools" | "design";
}

export const skills: Skill[] = [
  // Frontend
  { name: "React", level: 5, category: "frontend" },
  { name: "Next.js", level: 5, category: "frontend" },
  { name: "TypeScript", level: 5, category: "frontend" },
  { name: "JavaScript", level: 5, category: "frontend" },
  { name: "HTML & CSS", level: 5, category: "frontend" },
  { name: "Tailwind CSS", level: 4, category: "frontend" },
  { name: "SASS", level: 4, category: "frontend" },
  { name: "Framer Motion", level: 3, category: "frontend" },
  // Backend
  { name: "Node.js", level: 3, category: "backend" },
  { name: "REST APIs", level: 4, category: "backend" },
  { name: "GraphQL", level: 3, category: "backend" },
  { name: "PostgreSQL", level: 2, category: "backend" },
  // Tools
  { name: "Git & GitHub", level: 5, category: "tools" },
  { name: "VS Code", level: 5, category: "tools" },
  { name: "Storybook", level: 3, category: "tools" },
  { name: "Testing Library", level: 3, category: "tools" },
  { name: "Webpack / Vite", level: 3, category: "tools" },
  // Design
  { name: "Figma", level: 4, category: "design" },
  { name: "UI Design", level: 3, category: "design" },
  { name: "Responsive Design", level: 5, category: "design" },
];

export const skillCategories = ["frontend", "backend", "tools", "design"] as const;

// ── Languages ────────────────────────────────────────────

export interface Language {
  name: { pt: string; en: string };
  level: "native" | "fluent" | "intermediate" | "basic";
  flag: string;
}

export const languages: Language[] = [
  { name: { pt: "Português", en: "Portuguese" }, level: "native", flag: "🇧🇷" },
  { name: { pt: "Inglês", en: "English" }, level: "fluent", flag: "🇺🇸" },
  { name: { pt: "Espanhol", en: "Spanish" }, level: "intermediate", flag: "🇪🇸" },
];

// ── Socials ──────────────────────────────────────────────

export interface Social {
  name: string;
  url: string;
  icon: "github" | "linkedin" | "email";
}

export const socials: Social[] = [
  { name: "GitHub", url: "https://github.com/andressa", icon: "github" },
  { name: "LinkedIn", url: "https://linkedin.com/in/andressa", icon: "linkedin" },
  { name: "Email", url: "mailto:andressa@email.com", icon: "email" },
];
