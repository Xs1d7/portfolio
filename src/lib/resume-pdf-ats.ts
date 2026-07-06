import type { Locale } from "@/components/language-provider";
import type {
  PdfExperienceItem,
  PdfFreelanceItem,
  ResumePdfPayload,
  SkillPillarGroup,
} from "@/data/resume-focus";

const ATS_MONTH_EN = [
  "Jan", "Feb", "Mar", "Apr", "May", "Jun",
  "Jul", "Aug", "Sep", "Oct", "Nov", "Dec",
] as const;

const ATS_MONTH_PT = [
  "jan", "fev", "mar", "abr", "mai", "jun",
  "jul", "ago", "set", "out", "nov", "dez",
] as const;

function parseMonth(date: string): { year: number; month: number } {
  const [year, month] = date.split("-").map(Number);
  return { year, month };
}

/** Formato canônico para ATS: "Sep 2022 — Mar 2026" */
export function formatAtsMonthLabel(date: string, locale: Locale): string {
  const { year, month } = parseMonth(date);
  const abbr = locale === "pt" ? ATS_MONTH_PT[month - 1] : ATS_MONTH_EN[month - 1];
  return `${abbr} ${year}`;
}

export function formatAtsMonthRange(
  start: string,
  end: string | null,
  locale: Locale,
  presentLabel: string,
): string {
  const startLabel = formatAtsMonthLabel(start, locale);
  if (!end) return `${startLabel} — ${presentLabel}`;
  return `${startLabel} — ${formatAtsMonthLabel(end, locale)}`;
}

const ACTION_VERB_PT =
  /^(liderei|implementei|desenvolvi|arquitetei|otimizei|reduzi|automatizei|entreguei|coordenei|migrei|estabeleci|conduzi|criei|melhorei|orquestrei|defini|mentorei|estabilizei|modelei|integrei|construí|gerenciei|promovi|executei|padronizei|garanti|aumentei|acelerei)/i;

const ACTION_VERB_EN =
  /^(led|implemented|developed|architected|optimized|reduced|automated|delivered|coordinated|migrated|established|conducted|created|improved|orchestrated|defined|mentored|stabilized|modeled|integrated|built|managed|promoted|executed|standardized|ensured|increased|accelerated)/i;

export function ensureActionBullet(text: string, locale: Locale): string {
  const cleaned = text.replace(/^[-•*]\s*/, "").trim();
  const hasVerb =
    locale === "pt"
      ? ACTION_VERB_PT.test(cleaned)
      : ACTION_VERB_EN.test(cleaned);

  if (hasVerb) {
    return cleaned.endsWith(".") ? cleaned : `${cleaned}.`;
  }

  const fallback =
    locale === "pt" ? `Entreguei ${cleaned}` : `Delivered ${cleaned}`;

  return fallback.endsWith(".") ? fallback : `${fallback}.`;
}

export function expandAtsAcronyms(text: string, locale: Locale): string {
  const replacements: [RegExp, string][] =
    locale === "pt"
      ? [
          [/\baccounts payable\b/gi, "accounts payable (AP)"],
          [/\baccounts receivable\b/gi, "accounts receivable (AR)"],
          [/\bmarketing automation\b/gi, "marketing automation (automação de marketing)"],
          [/\bCI\/CD\b/g, "pipeline CI/CD"],
        ]
      : [
          [/\baccounts payable\b/gi, "accounts payable (AP)"],
          [/\baccounts receivable\b/gi, "accounts receivable (AR)"],
          [/\bmarketing automation\b/gi, "marketing automation"],
          [/\bCI\/CD\b/g, "CI/CD pipeline"],
        ];

  let result = text;
  for (const [pattern, replacement] of replacements) {
    result = result.replace(pattern, replacement);
  }
  return result;
}

function enrichSummary(summary: string, locale: Locale): string {
  const additions =
    locale === "pt"
      ? " Experiência com testes automatizados, QA, Docker, REST API e pipelines CI/CD (GitHub Actions)."
      : " Experience with automated testing, QA, Docker, REST APIs, and CI/CD pipelines (GitHub Actions).";

  const base = expandAtsAcronyms(summary, locale);
  if (/testes|QA|GitHub Actions|CI\/CD pipeline/i.test(base)) return base;
  return `${base}${additions}`;
}

const ATS_EXTRA_SKILLS = {
  pt: ["Testes automatizados", "QA", "GitHub Actions", "REST API"],
  en: ["Automated testing", "QA", "GitHub Actions", "REST API"],
} as const;

function enrichSkillPillars(
  pillars: SkillPillarGroup[],
  locale: Locale,
): SkillPillarGroup[] {
  const extras = ATS_EXTRA_SKILLS[locale];
  const infra = pillars.find((p) => p.key === "infra");

  if (infra) {
    const merged = [...infra.skills];
    for (const skill of extras) {
      if (!merged.some((s) => s.toLowerCase() === skill.toLowerCase())) {
        merged.push(skill);
      }
    }
    return pillars.map((p) =>
      p.key === "infra" ? { ...p, skills: merged } : p,
    );
  }

  return [
    ...pillars,
    {
      key: "infra" as const,
      label: locale === "pt" ? "Infra & Qualidade" : "Infra & Quality",
      skills: [...extras],
    },
  ];
}

type ExperienceAtsOverlay = {
  impact?: { pt: string; en: string };
  highlights: { pt: string[]; en: string[] };
};

const EXPERIENCE_ATS_OVERLAYS: Record<string, ExperienceAtsOverlay> = {
  "devnology-lead-0": {
    impact: {
      pt: "Liderei squads de extração de dados com motores Go/Rust, reduzindo latência de pipelines legados e aumentando throughput sob volumes massivos de requisições.",
      en: "Led data-extraction squads with Go/Rust engines, reducing legacy pipeline latency and increasing throughput under massive request volumes.",
    },
    highlights: {
      pt: [
        "Defini arquitetura, padrões de código e QA em code reviews para 2 squads de engenharia.",
        "Migrei motores críticos para Go/Rust com pipeline CI/CD (GitHub Actions, Docker) em produção AWS.",
        "Orquestrei pipelines de extração resilientes com testes automatizados e monitoramento de falhas.",
      ],
      en: [
        "Defined architecture, coding standards, and QA in code reviews for 2 engineering squads.",
        "Migrated critical engines to Go/Rust with CI/CD pipelines (GitHub Actions, Docker) on AWS production.",
        "Orchestrated resilient extraction pipelines with automated testing and failure monitoring.",
      ],
    },
  },
  "gomind-0": {
    highlights: {
      pt: [
        "Implementei automação RPA no produto MIA (accounts payable/AP e accounts receivable/AR) com integrações AWS.",
        "Entreguei pipelines CI/CD com Docker e testes em processos contábeis críticos em produção.",
      ],
      en: [
        "Implemented RPA automation on MIA (accounts payable/AP and accounts receivable/AR) with AWS integrations.",
        "Delivered CI/CD pipelines with Docker and testing on mission-critical accounting processes in production.",
      ],
    },
  },
  "gomind-1": {
    highlights: {
      pt: [
        "Desenvolvi integrações REST API de alto volume no MIA, acelerando fluxos financeiros do escritório contábil.",
        "Promovido a Líder Técnico em ~3 meses por liderança informal, qualidade de código e entregas consistentes.",
      ],
      en: [
        "Developed high-volume REST API integrations on MIA, accelerating accounting-firm financial flows.",
        "Promoted to Tech Lead in ~3 months for informal leadership, code quality, and consistent delivery.",
      ],
    },
  },
  "gomind-2": {
    impact: {
      pt: "Liderei subgrupo técnico na Gomind com automação SAP, mentoria e QA via code reviews em ambiente de produção crítica.",
      en: "Led a technical subgroup at Gomind with SAP automation, mentoring, and QA through code reviews in mission-critical production.",
    },
    highlights: {
      pt: [
        "Conduzi code reviews e testes de regressão em integrações SAP e workers financeiros.",
        "Estabeleci padrões de pipeline CI/CD (GitHub Actions) para deploy seguro em AWS Lambda.",
      ],
      en: [
        "Conducted code reviews and regression testing on SAP integrations and financial workers.",
        "Established CI/CD pipeline standards (GitHub Actions) for safe deploys on AWS Lambda.",
      ],
    },
  },
  "devnology-scraping-0": {
    highlights: {
      pt: [
        "Desenvolvi web scraping e automação para 123 Milhas/MaxMilhas com testes em plantões de produção.",
        "Promovido a Pleno em 6 meses por impacto em entregas, confiabilidade e resolução de incidentes.",
      ],
      en: [
        "Developed web scraping and automation for 123 Milhas/MaxMilhas with on-call production testing.",
        "Promoted to Mid-Level in 6 months for delivery impact, reliability, and incident resolution.",
      ],
    },
  },
  "devnology-scraping-1": {
    highlights: {
      pt: [
        "Otimizei pipelines de extração com Docker e REST APIs, melhorando estabilidade sob alta concorrência.",
        "Executei QA e testes automatizados em motores de scraping antes de releases em produção.",
      ],
      en: [
        "Optimized extraction pipelines with Docker and REST APIs, improving stability under high concurrency.",
        "Executed QA and automated testing on scraping engines before production releases.",
      ],
    },
  },
  "pop-plus": {
    highlights: {
      pt: [
        "Mantive módulos financeiro, comercial, marketing automation e estoque em WMS legado de alta criticidade.",
        "Estabilizei APIs REST e SQL Server em Vue.js e C# (.NET) sem interrupção da operação.",
      ],
      en: [
        "Maintained finance, sales, marketing automation, and inventory modules on a mission-critical legacy WMS.",
        "Stabilized REST APIs and SQL Server in Vue.js and C# (.NET) without disrupting operations.",
      ],
    },
  },
  "andrinno": {
    impact: {
      pt: "Liderei time de 4 desenvolvedores em automação web para companhias aéreas, entregando APIs de alto volume com baixa latência.",
      en: "Led a 4-developer team on web automation for airlines, delivering high-volume APIs with low latency.",
    },
    highlights: {
      pt: [
        "Arquitetei microsserviços com Docker, PostgreSQL e Redis para milhares de requisições concorrentes.",
        "Implementei testes e QA em pipelines resilientes com tratamento de bloqueios e rate-limit.",
      ],
      en: [
        "Architected microservices with Docker, PostgreSQL, and Redis for thousands of concurrent requests.",
        "Implemented testing and QA on resilient pipelines handling blocks and rate limits.",
      ],
    },
  },
  "maos-livres-0": {
    highlights: {
      pt: [
        "Fundei empresa de automação e software sob medida com diagnóstico gratuito em até 48 horas.",
        "Entreguei integrações REST API, RPA e pipelines CI/CD (GitHub Actions, Docker) em AWS.",
      ],
      en: [
        "Founded a custom automation and software company with free diagnosis within 48 hours.",
        "Delivered REST API integrations, RPA, and CI/CD pipelines (GitHub Actions, Docker) on AWS.",
      ],
    },
  },
};

function enrichExperience(
  exp: PdfExperienceItem,
  locale: Locale,
): PdfExperienceItem {
  const overlay = EXPERIENCE_ATS_OVERLAYS[exp.id];

  const highlights =
    overlay?.highlights[locale]?.map((h) => ensureActionBullet(h, locale)) ??
    exp.highlights.map((h) => ensureActionBullet(h, locale));

  const impact = overlay?.impact?.[locale]
    ? expandAtsAcronyms(overlay.impact[locale], locale)
    : expandAtsAcronyms(exp.impact, locale);

  return {
    ...exp,
    impact,
    highlights: highlights.slice(0, 4),
  };
}

function enrichFreelance(
  project: PdfFreelanceItem,
  locale: Locale,
): PdfFreelanceItem {
  const overlay = EXPERIENCE_ATS_OVERLAYS[project.id];

  const highlights =
    overlay?.highlights[locale]?.map((h) => ensureActionBullet(h, locale)) ??
    project.highlights.map((h) => ensureActionBullet(h, locale));

  const impact = overlay?.impact?.[locale]
    ? expandAtsAcronyms(overlay.impact[locale], locale)
    : expandAtsAcronyms(project.impact, locale);

  return {
    ...project,
    impact,
    highlights: highlights.slice(0, 4),
  };
}

export function enrichResumePdfPayloadForAts(
  payload: ResumePdfPayload,
): ResumePdfPayload {
  const { locale } = payload;

  return {
    ...payload,
    summary: enrichSummary(payload.summary, locale),
    skillPillars: enrichSkillPillars(payload.skillPillars, locale),
    experiences: payload.experiences.map((exp) =>
      enrichExperience(exp, locale),
    ),
    freelanceProjects: payload.freelanceProjects.map((p) =>
      enrichFreelance(p, locale),
    ),
  };
}
