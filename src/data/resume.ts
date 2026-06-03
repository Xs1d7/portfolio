export interface Education {
  institution: string;
  degree: { pt: string; en: string };
  field: { pt: string; en: string };
  period: { start: string; end: string | null };
  description?: { pt: string; en: string };
}

export const education: Education[] = [
  {
    institution: "PUCRS",
    degree: {
      pt: "MBA",
      en: "MBA",
    },
    field: {
      pt: "Tecnologia para Negócios: IA, Data Science e Big Data",
      en: "Business Technology: AI, Data Science and Big Data",
    },
    period: { start: "2025-01", end: null },
    description: {
      pt: "Formação executiva em inteligência artificial, ciência de dados e big data aplicados a negócios. Iniciado em 2025. Em andamento.",
      en: "Executive program in artificial intelligence, data science, and big data applied to business. Started in 2025. In progress.",
    },
  },
  {
    institution: "Universidade Estácio de Sá",
    degree: {
      pt: "Graduação",
      en: "Bachelor's Degree",
    },
    field: {
      pt: "Análise e Desenvolvimento de Sistemas",
      en: "Systems Analysis and Development",
    },
    period: { start: "2018-01", end: "2022-12" },
    description: {
      pt: "Base em engenharia de software, arquitetura de sistemas, bancos de dados e desenvolvimento full-stack.",
      en: "Foundation in software engineering, systems architecture, databases, and full-stack development.",
    },
  },
];

export interface Course {
  name: { pt: string; en: string };
  institution: string;
  year: string;
  hours: number;
  credential?: string;
}

export const courses: Course[] = [
  {
    name: {
      pt: "Professional Scrum Master (PSM I)",
      en: "Professional Scrum Master (PSM I)",
    },
    institution: "Agile School",
    year: "2024",
    hours: 16,
  },
];

export type SkillLevel = 1 | 2 | 3 | 4 | 5;

export interface Skill {
  name: string;
  level: SkillLevel;
  category: "frontend" | "backend" | "tools" | "database";
}

export const skills: Skill[] = [
  { name: "TypeScript", level: 5, category: "frontend" },
  { name: "React.js", level: 4, category: "frontend" },
  { name: "Vue.js", level: 4, category: "frontend" },
  { name: "Next.js", level: 4, category: "frontend" },
  { name: "JavaScript", level: 5, category: "frontend" },
  { name: "HTML & CSS", level: 5, category: "frontend" },

  { name: "Node.js", level: 5, category: "backend" },
  { name: "Go", level: 4, category: "backend" },
  { name: "Rust", level: 3, category: "backend" },
  { name: "Python", level: 5, category: "backend" },
  { name: "C# (.NET)", level: 4, category: "backend" },
  { name: "NestJS", level: 4, category: "backend" },
  { name: "Fastify", level: 4, category: "backend" },
  { name: "REST APIs", level: 5, category: "backend" },
  { name: "LLM & AI Agents", level: 4, category: "backend" },

  { name: "AWS", level: 4, category: "tools" },
  { name: "Docker", level: 4, category: "tools" },
  { name: "Git & GitHub", level: 5, category: "tools" },
  { name: "CI/CD", level: 4, category: "tools" },
  { name: "Web Scraping & RPA", level: 5, category: "tools" },

  { name: "PostgreSQL", level: 4, category: "database" },
  { name: "MySQL", level: 4, category: "database" },
  { name: "Redis", level: 4, category: "database" },
  { name: "SQL Server", level: 3, category: "database" },
];

export const skillCategories = [
  "frontend",
  "backend",
  "tools",
  "database",
] as const;

export interface Language {
  name: { pt: string; en: string };
  level: "native" | "fluent" | "intermediate" | "basic";
  flag: string;
  /** Texto extra (ex.: faixa CEFR). */
  detail?: { pt: string; en: string };
  /** Barra de progresso na seção de idiomas (0–100). */
  levelPercent?: number;
}

export const languages: Language[] = [
  { name: { pt: "Português", en: "Portuguese" }, level: "native", flag: "🇧🇷" },
  {
    name: { pt: "Inglês", en: "English" },
    level: "intermediate",
    flag: "🇺🇸",
    detail: {
      pt: "B2–C1 · converso bem, não fluente",
      en: "B2–C1 · conversational, not fully fluent",
    },
    levelPercent: 72,
  },
];

export interface Social {
  name: string;
  url: string;
  icon: "github" | "linkedin" | "email";
}

export const socials: Social[] = [
  {
    name: "GitHub",
    url: "https://github.com/Xs1d7",
    icon: "github",
  },
  {
    name: "LinkedIn",
    url: "https://www.linkedin.com/in/jeffersonalves7/",
    icon: "linkedin",
  },
  {
    name: "Email",
    url: "mailto:jeffersonalves.developer@gmail.com",
    icon: "email",
  },
];

export const EMAIL_ADDRESS = "jeffersonalves.developer@gmail.com";
