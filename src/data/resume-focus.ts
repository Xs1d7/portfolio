import {
  experienceEntries,
  type ExperienceEntry,
} from "@/data/experience";
import {
  courses,
  education,
  languages,
  skills,
  EMAIL_ADDRESS,
  type Skill,
} from "@/data/resume";
import type { Locale } from "@/components/language-provider";
import {
  formatMonthRange,
  formatTenureDuration,
} from "@/lib/tenure-duration";

export type RoleFocus =
  | "full"
  | "frontend"
  | "backend"
  | "fullstack"
  | "rpa"
  | "tech-lead"
  | "ai";

export type TechFocus =
  | "python"
  | "go"
  | "rust"
  | "node"
  | "dotnet"
  | "vue"
  | "react"
  | "aws"
  | "scraping";

export const ROLE_FOCUS_OPTIONS: RoleFocus[] = [
  "full",
  "fullstack",
  "backend",
  "frontend",
  "rpa",
  "tech-lead",
  "ai",
];

export const TECH_FOCUS_OPTIONS: TechFocus[] = [
  "python",
  "go",
  "rust",
  "node",
  "dotnet",
  "vue",
  "react",
  "aws",
  "scraping",
];

/** Tags por experiência para filtro de currículo */
export const EXPERIENCE_FOCUS_TAGS: Record<string, (RoleFocus | TechFocus)[]> = {
  "maos-livres": ["fullstack", "backend", "tech-lead", "node", "aws"],
  prodia: ["ai", "backend", "fullstack", "go", "node", "python"],
  "pop-plus": ["fullstack", "frontend", "backend", "dotnet", "vue"],
  "devnology-lead": [
    "backend",
    "rpa",
    "tech-lead",
    "ai",
    "go",
    "rust",
    "python",
    "scraping",
    "aws",
  ],
  gomind: ["backend", "rpa", "tech-lead", "node", "python", "aws"],
  "grupo-domini-freelance": ["ai", "backend", "rpa", "node", "tech-lead"],
  andrinno: ["backend", "node", "fullstack"],
  "devnology-scraping": [
    "backend",
    "rpa",
    "scraping",
    "python",
    "node",
    "aws",
  ],
  "bbr-barrarey": ["fullstack", "frontend", "backend", "python", "react"],
};

const ROLE_PROFILE: Record<
  RoleFocus,
  {
    headline: { pt: string; en: string };
    summary: { pt: string; en: string };
    skillCategories: Skill["category"][];
  }
> = {
  full: {
    headline: {
      pt: "Tech Lead · Engenheiro de Software Sênior",
      en: "Tech Lead · Senior Software Engineer",
    },
    summary: {
      pt: "Tech Lead e Engenheiro Sênior com visão 360°: backend de alta performance (Go, Rust, Node, Python), frontend moderno, RPA, scraping em escala, agentes de IA e arquitetura em nuvem (AWS).",
      en: "Tech Lead and Senior Engineer with a 360° view: high-performance backends (Go, Rust, Node, Python), modern frontends, RPA, large-scale scraping, AI agents, and cloud architecture (AWS).",
    },
    skillCategories: ["frontend", "backend", "tools", "database"],
  },
  fullstack: {
    headline: {
      pt: "Engenheiro Full-Stack Sênior",
      en: "Senior Full-Stack Engineer",
    },
    summary: {
      pt: "Entrega ponta a ponta com Vue.js, React, C# (.NET), Node.js e TypeScript — do frontend responsivo a APIs e microsserviços escaláveis.",
      en: "End-to-end delivery with Vue.js, React, C# (.NET), Node.js, and TypeScript — from responsive frontends to scalable APIs and microservices.",
    },
    skillCategories: ["frontend", "backend", "database", "tools"],
  },
  frontend: {
    headline: {
      pt: "Engenheiro Frontend Sênior",
      en: "Senior Frontend Engineer",
    },
    summary: {
      pt: "Especialista em interfaces modernas com Vue.js, React, Next.js e TypeScript — foco em UX, performance e integração com APIs.",
      en: "Specialist in modern interfaces with Vue.js, React, Next.js, and TypeScript — focused on UX, performance, and API integration.",
    },
    skillCategories: ["frontend", "tools"],
  },
  backend: {
    headline: {
      pt: "Engenheiro de Backend Sênior",
      en: "Senior Backend Engineer",
    },
    summary: {
      pt: "Backend de alta performance com Go, Rust, Node.js, Python e NestJS — microsserviços, APIs REST, filas, bancos relacionais e arquitetura em AWS.",
      en: "High-performance backends with Go, Rust, Node.js, Python, and NestJS — microservices, REST APIs, queues, relational databases, and AWS architecture.",
    },
    skillCategories: ["backend", "database", "tools"],
  },
  rpa: {
    headline: {
      pt: "Engenheiro de Automação & RPA Sênior",
      en: "Senior Automation & RPA Engineer",
    },
    summary: {
      pt: "Automação avançada, web scraping em larga escala, engenharia reversa (anti-bot), integração SAP e orquestração de processos críticos em produção.",
      en: "Advanced automation, large-scale web scraping, reverse engineering (anti-bot), SAP integration, and orchestration of critical production processes.",
    },
    skillCategories: ["backend", "tools"],
  },
  "tech-lead": {
    headline: {
      pt: "Tech Lead · Engenheiro de Software",
      en: "Tech Lead · Software Engineer",
    },
    summary: {
      pt: "Liderança técnica de squads, arquitetura de sistemas, code reviews e entrega de soluções escaláveis em ambientes de alto volume e alta criticidade.",
      en: "Technical squad leadership, systems architecture, code reviews, and delivery of scalable solutions in high-volume, mission-critical environments.",
    },
    skillCategories: ["backend", "tools", "database"],
  },
  ai: {
    headline: {
      pt: "Engenheiro de Software · IA & Agentes",
      en: "Software Engineer · AI & Agents",
    },
    summary: {
      pt: "Arquitetura de agentes de IA, orquestração de LLMs, pipelines generativos e produtos SaaS com foco em conversão e automação inteligente.",
      en: "AI agent architecture, LLM orchestration, generative pipelines, and SaaS products focused on conversion and intelligent automation.",
    },
    skillCategories: ["backend", "tools"],
  },
};

const SKILL_TECH_TAGS: Record<string, TechFocus[]> = {
  Python: ["python"],
  Go: ["go"],
  Rust: ["rust"],
  "Node.js": ["node"],
  NestJS: ["node"],
  Fastify: ["node"],
  "C# (.NET)": ["dotnet"],
  "Vue.js": ["vue"],
  "React.js": ["node", "react"],
  "Next.js": ["react"],
  JavaScript: ["react"],
  AWS: ["aws"],
  "Web Scraping & RPA": ["scraping", "python"],
};

export function stripMarkdown(text: string): string {
  return text
    .replace(/\*\*(.*?)\*\*/g, "$1")
    .replace(/\[(.*?)\]\(.*?\)/g, "$1")
    .replace(/^[-*]\s+/gm, "• ")
    .replace(/\n{3,}/g, "\n\n")
    .trim();
}

function entryTags(id: string): (RoleFocus | TechFocus)[] {
  return EXPERIENCE_FOCUS_TAGS[id] ?? ["backend", "fullstack"];
}

export function experienceMatchesFocus(
  entry: ExperienceEntry,
  roleFocus: RoleFocus,
  techFocus: TechFocus[],
): boolean {
  const tags = entryTags(entry.id);

  const roleOk =
    roleFocus === "full" ||
    tags.includes(roleFocus) ||
    (roleFocus === "rpa" && tags.includes("scraping"));

  const techOk =
    techFocus.length === 0 ||
    techFocus.some((t) => tags.includes(t));

  return roleOk && techOk;
}

export function skillMatchesFocus(
  skill: Skill,
  roleFocus: RoleFocus,
  techFocus: TechFocus[],
): boolean {
  if (roleFocus === "full" && techFocus.length === 0) return true;

  const techTags = SKILL_TECH_TAGS[skill.name] ?? [];
  const techOk =
    techFocus.length === 0 ||
    techFocus.some((t) => techTags.includes(t));

  if (techFocus.length > 0) return techOk;

  const profile = ROLE_PROFILE[roleFocus];
  return profile.skillCategories.includes(skill.category);
}

export interface PdfEvolutionStep {
  step: number;
  role: string;
  company: string;
  period: string;
  duration: string;
  highlight: string;
}

export interface PdfExperienceItem {
  company: string;
  role: string;
  period: string;
  typeLabel: string;
  employmentLabel?: string;
  impact: string;
  evolution: PdfEvolutionStep[];
  highlights: string[];
  exitReason?: string;
  technologies: string[];
}

export interface ResumePdfPayload {
  locale: Locale;
  headline: string;
  summary: string;
  careerNarrative: string;
  focusLabel: string;
  contact: {
    email: string;
    linkedin: string;
    github: string;
    location: string;
  };
  skills: { name: string; level: number }[];
  experiences: PdfExperienceItem[];
  education: { institution: string; degree: string; field: string; period: string }[];
  courses: { name: string; institution: string; year: string }[];
  languages: { name: string; level: string }[];
}

function bulletsFromDescription(text: string, max: number): string[] {
  return text
    .split("\n")
    .map((line) => line.trim())
    .filter((line) => line.startsWith("-"))
    .map((line) => stripMarkdown(line.replace(/^[-*]\s+/, "")))
    .slice(0, max);
}

function buildEvolution(
  entry: ExperienceEntry,
  locale: Locale,
  presentLabel: string,
): PdfEvolutionStep[] {
  if (!entry.tenures?.length) return [];

  return entry.tenures.map((t, index) => ({
    step: index + 1,
    role: t.role[locale],
    company: t.company,
    period: formatMonthRange(
      t.period.start,
      t.period.end,
      locale,
      presentLabel,
    ),
    duration: formatTenureDuration(
      t.period.start,
      t.period.end,
      locale,
      presentLabel,
    ),
    highlight: t.highlight ? stripMarkdown(t.highlight[locale]) : "",
  }));
}

function buildHighlights(entry: ExperienceEntry, locale: Locale): string[] {
  const lines: string[] = [];

  lines.push(...bulletsFromDescription(entry.fullDescription[locale], 5));

  if (lines.length === 0) {
    lines.push(stripMarkdown(entry.shortDescription[locale]));
  }

  const seen = new Set<string>();
  return lines.filter((line) => {
    if (seen.has(line)) return false;
    seen.add(line);
    return true;
  }).slice(0, 5);
}

function buildCareerNarrative(
  entries: ExperienceEntry[],
  locale: Locale,
): string {
  const withTenures = entries.filter((e) => (e.tenures?.length ?? 0) > 0);
  const roleSteps = withTenures.reduce(
    (acc, e) => acc + (e.tenures?.length ?? 0),
    0,
  );
  const promotions = withTenures.length;

  if (locale === "pt") {
    return `Trajetória com evolução contínua: ${roleSteps} etapas de cargo documentadas em ${promotions} empresas, com promoções por impacto técnico, liderança progressiva e stack ampliado (Python → Node/Go/Rust → IA e cloud AWS).`;
  }
  return `Career path with continuous growth: ${roleSteps} documented role stages across ${promotions} companies, with promotions driven by technical impact, progressive leadership, and an expanding stack (Python → Node/Go/Rust → AI and AWS cloud).`;
}

export function buildResumePdfPayload(
  locale: Locale,
  roleFocus: RoleFocus,
  techFocus: TechFocus[],
  labels: {
    present: string;
    types: Record<ExperienceEntry["type"], string>;
    employment: { clt: string; pj: string };
    languageLevels: Record<string, string>;
    location: string;
    focusPrefix: string;
  },
): ResumePdfPayload {
  const profile = ROLE_PROFILE[roleFocus];

  const filteredExperiences = experienceEntries
    .filter((e) => experienceMatchesFocus(e, roleFocus, techFocus))
    .sort((a, b) => b.period.start.localeCompare(a.period.start));

  const filteredSkills = skills
    .filter((s) => skillMatchesFocus(s, roleFocus, techFocus))
    .sort((a, b) => b.level - a.level);

  const techPart =
    techFocus.length > 0 ? ` + ${techFocus.join(", ")}` : "";
  const focusLabel = `${labels.focusPrefix}: ${roleFocus}${techPart}`;

  return {
    locale,
    headline: profile.headline[locale],
    summary: profile.summary[locale],
    careerNarrative: buildCareerNarrative(filteredExperiences, locale),
    focusLabel,
    contact: {
      email: EMAIL_ADDRESS,
      linkedin: "linkedin.com/in/jeffersonalves7",
      github: "github.com/Xs1d7",
      location: labels.location,
    },
    skills: filteredSkills.map((s) => ({ name: s.name, level: s.level })),
    experiences: filteredExperiences.map((entry) => ({
      company: entry.company,
      role: entry.role[locale],
      period: formatMonthRange(
        entry.period.start,
        entry.period.end,
        locale,
        labels.present,
      ),
      typeLabel: labels.types[entry.type],
      employmentLabel:
        entry.type === "fulltime" && entry.employment
          ? labels.employment[entry.employment]
          : undefined,
      impact:
        entry.recruiterImpact?.[locale] ??
        stripMarkdown(entry.shortDescription[locale]),
      evolution: buildEvolution(entry, locale, labels.present),
      highlights: buildHighlights(entry, locale),
      exitReason: entry.exitReason?.[locale],
      technologies: entry.technologies,
    })),
    education: education.map((e) => ({
      institution: e.institution,
      degree: e.degree[locale],
      field: e.field[locale],
      period: formatMonthRange(e.period.start, e.period.end, locale, labels.present),
    })),
    courses: courses.map((c) => ({
      name: c.name[locale],
      institution: c.institution,
      year: c.year,
    })),
    languages: languages.map((l) => {
      const base = labels.languageLevels[l.level] ?? l.level;
      return {
        name: l.name[locale],
        level: l.detail ? `${base} — ${l.detail[locale]}` : base,
      };
    }),
  };
}

export function resumeFileName(
  roleFocus: RoleFocus,
  techFocus: TechFocus[],
): string {
  const tech = techFocus.length ? `-${techFocus.join("-")}` : "";
  return `Jefferson-Alves-CV-${roleFocus}${tech}.pdf`;
}
