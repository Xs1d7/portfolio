import {
  getFreelanceEntries,
  getJourneyEntries,
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
  expandExperienceSteps,
  sortExperienceSteps,
} from "@/lib/experience-steps";
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
  andrinno: ["backend", "rpa", "scraping", "python", "node", "tech-lead"],
  "attus-bloom": ["backend", "node", "fullstack"],
  "beleza-tal": ["ai", "python", "backend"],
  contmais: ["frontend", "fullstack"],
  "barrarey-freelance": ["backend", "rpa", "python", "fullstack"],
  "devnology-scraping": [
    "backend",
    "rpa",
    "scraping",
    "python",
    "node",
    "aws",
  ],
  "bbr-toys": ["fullstack", "frontend", "backend"],
};

type SkillPillarKey = "fullstack" | "automation" | "aiData" | "infra" | "other";

const SKILL_PILLAR_MAP: Record<string, SkillPillarKey> = {
  TypeScript: "fullstack",
  "React.js": "fullstack",
  "Vue.js": "fullstack",
  "Next.js": "fullstack",
  JavaScript: "fullstack",
  "HTML & CSS": "fullstack",
  "Node.js": "fullstack",
  NestJS: "fullstack",
  Fastify: "fullstack",
  "C# (.NET)": "fullstack",
  "REST APIs": "fullstack",
  Python: "automation",
  "Web Scraping & RPA": "automation",
  "LLM & AI Agents": "aiData",
  Go: "infra",
  Rust: "infra",
  AWS: "infra",
  Docker: "infra",
  "Git & GitHub": "infra",
  "CI/CD": "infra",
  PostgreSQL: "infra",
  MySQL: "infra",
  Redis: "infra",
  "SQL Server": "infra",
};

const ROLE_PROFILE: Record<
  RoleFocus,
  {
    headline: { pt: string; en: string };
    summary: { pt: string; en: string };
    coreStrengths: { pt: string[]; en: string[] };
    skillCategories: Skill["category"][];
  }
> = {
  full: {
    headline: {
      pt: "Tech Lead · Engenheiro de Software Sênior",
      en: "Tech Lead · Senior Software Engineer",
    },
    summary: {
      pt: "Tech Lead e Engenheiro Sênior especializado em automação de processos e software sob medida. Atuação full-stack, análise de dados e IA aplicada (LLMs, agentes), com backends de alta performance (Go, Rust, Python, Node) e cloud AWS. MBA em IA, Data Science e Big Data (PUCRS, em andamento).",
      en: "Tech Lead and Senior Engineer specialized in process automation and tailored software. Full-stack delivery, applied data analysis and AI (LLMs, agents), with high-performance backends (Go, Rust, Python, Node) and AWS cloud. MBA in AI, Data Science and Big Data (PUCRS, in progress).",
    },
    coreStrengths: {
      pt: ["Automação & RPA", "Full-stack", "IA & Dados", "Cloud AWS"],
      en: ["Automation & RPA", "Full-stack", "AI & Data", "AWS Cloud"],
    },
    skillCategories: ["frontend", "backend", "tools", "database"],
  },
  fullstack: {
    headline: {
      pt: "Engenheiro Full-Stack Sênior",
      en: "Senior Full-Stack Engineer",
    },
    summary: {
      pt: "Entrega ponta a ponta com Vue.js, React, C# (.NET), Node.js e TypeScript — do frontend responsivo a APIs e microsserviços escaláveis, com base sólida em automação e integrações.",
      en: "End-to-end delivery with Vue.js, React, C# (.NET), Node.js, and TypeScript — from responsive frontends to scalable APIs and microservices, with a strong automation and integration background.",
    },
    coreStrengths: {
      pt: ["Full-stack", "APIs & integrações", "Automação", "Cloud AWS"],
      en: ["Full-stack", "APIs & integrations", "Automation", "AWS Cloud"],
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
    coreStrengths: {
      pt: ["Frontend moderno", "TypeScript", "Performance", "Integração APIs"],
      en: ["Modern frontend", "TypeScript", "Performance", "API integration"],
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
    coreStrengths: {
      pt: ["Backends compilados", "APIs & microsserviços", "Alta escala", "AWS"],
      en: ["Compiled backends", "APIs & microservices", "High scale", "AWS"],
    },
    skillCategories: ["backend", "database", "tools"],
  },
  rpa: {
    headline: {
      pt: "Engenheiro de Automação & RPA Sênior",
      en: "Senior Automation & RPA Engineer",
    },
    summary: {
      pt: "Especialista em automação avançada — web scraping em larga escala, engenharia reversa (anti-bot), RPA, integração SAP e orquestração de processos críticos em produção. Diferencial construído ao longo da carreira em CLT, PJ e projetos freelance.",
      en: "Specialist in advanced automation — large-scale web scraping, reverse engineering (anti-bot), RPA, SAP integration, and orchestration of critical production processes. Core strength built across full-time roles and freelance projects.",
    },
    coreStrengths: {
      pt: ["Automação & RPA", "Scraping em escala", "Integrações", "Produção crítica"],
      en: ["Automation & RPA", "Large-scale scraping", "Integrations", "Mission-critical"],
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
    coreStrengths: {
      pt: ["Liderança técnica", "Arquitetura", "Squads ágeis", "Entrega em escala"],
      en: ["Technical leadership", "Architecture", "Agile squads", "Scale delivery"],
    },
    skillCategories: ["backend", "tools", "database"],
  },
  ai: {
    headline: {
      pt: "Engenheiro de Software · IA, Dados & Agentes",
      en: "Software Engineer · AI, Data & Agents",
    },
    summary: {
      pt: "Arquitetura de agentes de IA, orquestração de LLMs, pipelines generativos e análise de dados aplicada — produtos SaaS e automação inteligente com foco em conversão e eficiência operacional. MBA PUCRS em IA, Data Science e Big Data.",
      en: "AI agent architecture, LLM orchestration, generative pipelines, and applied data analysis — SaaS products and intelligent automation focused on conversion and operational efficiency. PUCRS MBA in AI, Data Science and Big Data.",
    },
    coreStrengths: {
      pt: ["IA & LLMs", "Análise de dados", "Agentes", "Automação inteligente"],
      en: ["AI & LLMs", "Data analysis", "Agents", "Intelligent automation"],
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
    techFocus.length === 0 || techFocus.some((t) => tags.includes(t));

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
    techFocus.length === 0 || techFocus.some((t) => techTags.includes(t));

  if (techFocus.length > 0) return techOk;

  const profile = ROLE_PROFILE[roleFocus];
  return profile.skillCategories.includes(skill.category);
}

export interface PdfExperienceItem {
  id: string;
  company: string;
  role: string;
  period: string;
  duration: string;
  typeLabel: string;
  employmentLabel?: string;
  impact: string;
  highlights: string[];
  exitReason?: string;
  technologies: string[];
}

export interface PdfFreelanceItem {
  id: string;
  company: string;
  role: string;
  productionDuration: string;
  impact: string;
  highlights: string[];
  technologies: string[];
}

export interface SkillPillarGroup {
  key: SkillPillarKey;
  label: string;
  skills: string[];
}

export interface ResumePdfPayload {
  locale: Locale;
  headline: string;
  summary: string;
  coreStrengths: string[];
  careerNarrative: string;
  focusLabel: string | null;
  contact: {
    email: string;
    linkedin: string;
    github: string;
    location: string;
  };
  skillPillars: SkillPillarGroup[];
  experiences: PdfExperienceItem[];
  freelanceProjects: PdfFreelanceItem[];
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

function buildCareerNarrative(stepCount: number, locale: Locale): string {
  if (locale === "pt") {
    return `${stepCount} etapas de carreira documentadas — evolução de Aprendiz a Tech Lead, com automação, full-stack, dados/IA e entrega em produção em escala.`;
  }
  return `${stepCount} documented career stages — from Apprentice to Tech Lead, with automation, full-stack, data/AI, and production delivery at scale.`;
}

function buildSkillPillars(
  filteredSkills: Skill[],
  pillarLabels: Record<SkillPillarKey, string>,
): SkillPillarGroup[] {
  const buckets: Record<SkillPillarKey, string[]> = {
    fullstack: [],
    automation: [],
    aiData: [],
    infra: [],
    other: [],
  };

  for (const skill of filteredSkills) {
    const pillar = SKILL_PILLAR_MAP[skill.name] ?? "other";
    buckets[pillar].push(skill.name);
  }

  const order: SkillPillarKey[] = [
    "fullstack",
    "automation",
    "aiData",
    "infra",
    "other",
  ];

  return order
    .filter((key) => buckets[key].length > 0)
    .map((key) => ({
      key,
      label: pillarLabels[key],
      skills: buckets[key],
    }));
}

function stepToPdfExperience(
  step: ReturnType<typeof expandExperienceSteps>[number],
  locale: Locale,
  labels: {
    present: string;
    types: Record<ExperienceEntry["type"], string>;
    employment: { clt: string; pj: string };
  },
): PdfExperienceItem {
  const { entry } = step;
  const isLastTenure =
    step.tenureIndex != null && entry.tenures
      ? step.tenureIndex === entry.tenures.length - 1
      : true;

  const impact = stripMarkdown(step.summary[locale]);
  const highlights = bulletsFromDescription(entry.fullDescription[locale], 3);

  return {
    id: step.id,
    company: step.company,
    role: step.role[locale],
    period: formatMonthRange(
      step.period.start,
      step.period.end,
      locale,
      labels.present,
    ),
    duration: formatTenureDuration(
      step.period.start,
      step.period.end,
      locale,
      labels.present,
    ),
    typeLabel: labels.types[entry.type],
    employmentLabel:
      entry.type === "fulltime" && entry.employment
        ? labels.employment[entry.employment]
        : undefined,
    impact,
    highlights: highlights.length > 0 ? highlights : [],
    exitReason:
      isLastTenure && entry.exitReason
        ? entry.exitReason[locale]
        : undefined,
    technologies: entry.technologies.slice(0, 8),
  };
}

function freelanceToPdfItem(
  entry: ExperienceEntry,
  locale: Locale,
): PdfFreelanceItem {
  return {
    id: entry.id,
    company: entry.company,
    role: entry.role[locale],
    productionDuration:
      entry.productionDuration?.[locale] ?? "—",
    impact:
      entry.recruiterImpact?.[locale] ??
      stripMarkdown(entry.shortDescription[locale]),
    highlights: bulletsFromDescription(entry.fullDescription[locale], 3),
    technologies: entry.technologies.slice(0, 6),
  };
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
    skillPillars: Record<SkillPillarKey, string>;
  },
  options?: { includeFreelances?: boolean },
): ResumePdfPayload {
  const profile = ROLE_PROFILE[roleFocus];
  const includeFreelances = options?.includeFreelances ?? roleFocus === "full";

  const careerSteps = sortExperienceSteps(
    expandExperienceSteps(
      getJourneyEntries().filter((e) =>
        experienceMatchesFocus(e, roleFocus, techFocus),
      ),
    ),
    "desc",
  );

  const filteredSkills = skills
    .filter((s) => skillMatchesFocus(s, roleFocus, techFocus))
    .sort((a, b) => b.level - a.level);

  const freelanceProjects =
    includeFreelances
      ? getFreelanceEntries()
          .filter((e) => experienceMatchesFocus(e, roleFocus, techFocus))
          .map((e) => freelanceToPdfItem(e, locale))
      : [];

  const techPart =
    techFocus.length > 0 ? ` + ${techFocus.join(", ")}` : "";
  const focusLabel =
    roleFocus === "full" && techFocus.length === 0
      ? null
      : `${labels.focusPrefix}: ${roleFocus}${techPart}`;

  return {
    locale,
    headline: profile.headline[locale],
    summary: profile.summary[locale],
    coreStrengths: profile.coreStrengths[locale],
    careerNarrative: buildCareerNarrative(careerSteps.length, locale),
    focusLabel,
    contact: {
      email: EMAIL_ADDRESS,
      linkedin: "linkedin.com/in/jeffersonalves7",
      github: "github.com/Xs1d7",
      location: labels.location,
    },
    skillPillars: buildSkillPillars(filteredSkills, labels.skillPillars),
    experiences: careerSteps.map((step) =>
      stepToPdfExperience(step, locale, labels),
    ),
    freelanceProjects,
    education: education.map((e) => ({
      institution: e.institution,
      degree: e.degree[locale],
      field: e.field[locale],
      period: formatMonthRange(
        e.period.start,
        e.period.end,
        locale,
        labels.present,
      ),
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
