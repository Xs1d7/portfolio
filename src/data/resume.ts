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
    institution: "Unigranrio Afya",
    degree: {
      pt: "Tecnólogo",
      en: "Associate Degree",
    },
    field: {
      pt: "Análise e Desenvolvimento de Sistemas",
      en: "Systems Analysis and Development",
    },
    period: { start: "2023-08", end: "2025-12" },
    description: {
      pt: "Formação focada em desenvolvimento de software, arquitetura de sistemas, banco de dados e práticas modernas de engenharia de software.",
      en: "Program focused on software development, systems architecture, databases, and modern software engineering practices.",
    },
  },

  {
    institution: "Aulas Particulares de Inglês",
    degree: {
      pt: "Formação em Idioma",
      en: "Language Studies",
    },
    field: {
      pt: "Inglês (Nível A2/B1)",
      en: "English (A2/B1 Level)",
    },
    period: { start: "2024-07", end: null },
    description: {
      pt: "Aulas particulares com foco no desenvolvimento da fluência, comunicação profissional e compreensão em contextos técnicos e cotidianos.",
      en: "Private lessons focused on fluency development, professional communication, and comprehension in both technical and everyday contexts.",
    },
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
    name: {
      pt: "Curso ADVPL e TOTVS Protheus",
      en: "ADVPL and TOTVS Protheus Development Course",
    },
    institution: "LF Soluções",
    year: "2025",
    hours: 40,
    credential: "ADVPL · TOTVS Protheus · SQL Server · SSMS",
  },

  {
    name: {
      pt: "AWS S3 — Manipulação e Armazenamento de Objetos na Nuvem",
      en: "AWS S3 — Object Storage and Management in the Cloud",
    },
    institution: "Alura",
    year: "2024",
    hours: 10,
  },

  {
    name: {
      pt: "AWS EC2 — Alta Disponibilidade e Escalabilidade",
      en: "AWS EC2 — High Availability and Scalability",
    },
    institution: "Alura",
    year: "2024",
    hours: 10,
  },

  {
    name: {
      pt: "Java e Spring Security — Protegendo Aplicações Web",
      en: "Java and Spring Security — Securing Web Applications",
    },
    institution: "Alura",
    year: "2024",
    hours: 12,
  },

  {
    name: {
      pt: "Java — Lambdas, Streams e Spring Framework",
      en: "Java — Lambdas, Streams and Spring Framework",
    },
    institution: "Alura",
    year: "2024",
    hours: 12,
  },

  {
    name: {
      pt: "Java — Aplicando Orientação a Objetos",
      en: "Java — Applying Object-Oriented Programming",
    },
    institution: "Alura",
    year: "2024",
    hours: 10,
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
  { name: "React", level: 4, category: "frontend" },
  { name: "Next.js", level: 3, category: "frontend" },
  { name: "TypeScript", level: 5, category: "frontend" },
  { name: "JavaScript", level: 5, category: "frontend" },
  { name: "HTML & CSS", level: 5, category: "frontend" },
  { name: "Tailwind CSS", level: 4, category: "frontend" },
  { name: "SASS", level: 4, category: "frontend" },
  // Backend
  { name: "Node.js", level: 5, category: "backend" },
  { name: "REST APIs", level: 4, category: "backend" },
  { name: "PostgreSQL", level: 2, category: "backend" },
  // Tools
  { name: "Git & GitHub", level: 5, category: "tools" },
  { name: "VS Code", level: 5, category: "tools" },
  // Design
  { name: "Figma", level: 3, category: "design" },
  { name: "UI Design", level: 2, category: "design" },
  { name: "Responsive Design", level: 2, category: "design" },
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
  { name: { pt: "Inglês", en: "English" }, level: "intermediate", flag: "🇺🇸" },
  { name: { pt: "Espanhol", en: "Spanish" }, level: "basic", flag: "🇪🇸" },
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
  { name: "Email", url: "mailto:andressaricardo.developer@gmail.com", icon: "email" },
];
