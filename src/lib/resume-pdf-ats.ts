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

function enrichExperience(
  exp: PdfExperienceItem,
  locale: Locale,
): PdfExperienceItem {
  return {
    ...exp,
    impact: expandAtsAcronyms(exp.impact, locale),
    highlights: exp.highlights
      .map((h) => ensureActionBullet(h, locale))
      .slice(0, 4),
  };
}

function enrichFreelance(
  project: PdfFreelanceItem,
  locale: Locale,
): PdfFreelanceItem {
  return {
    ...project,
    impact: expandAtsAcronyms(project.impact, locale),
    highlights: project.highlights
      .map((h) => ensureActionBullet(h, locale))
      .slice(0, 4),
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
