import {
  experienceEntries,
  getJourneyEntries,
  type ExperienceEntry,
} from "@/data/experience";
import {
  expandExperienceSteps,
  sortExperienceSteps,
  type ExperienceStep,
} from "@/lib/experience-steps";

export type JourneyMilestoneKind = "origin" | "education" | "experience";

export interface JourneyMilestone {
  id: string;
  kind: JourneyMilestoneKind;
  sortKey: string;
  yearLabel: string;
  period?: { start: string; end: string | null };
  title: { pt: string; en: string };
  subtitle: { pt: string; en: string };
  story: { pt: string; en: string };
  technologies: string[];
  experienceId?: string;
  tenureIndex?: number | null;
  stepInCompany?: number;
  totalInCompany?: number;
}

const ORIGIN: JourneyMilestone = {
  id: "origin-graduation",
  kind: "origin",
  sortKey: "2021-01",
  yearLabel: "2021",
  title: {
    pt: "O início da jornada",
    en: "Where it started",
  },
  subtitle: {
    pt: "Ingresso em Análise e Desenvolvimento de Sistemas",
    en: "Enrolling in Systems Analysis and Development",
  },
  story: {
    pt: "Em 2021, decidi transformar curiosidade em carreira e ingressar em Análise e Desenvolvimento de Sistemas na Estácio. Foi o marco que abriu a porta para cada experiência profissional que viria depois.",
    en: "In 2021, I decided to turn curiosity into a career and enroll in Systems Analysis and Development at Estácio. That choice opened the door to every professional experience that followed.",
  },
  technologies: ["Fundamentos de software", "Lógica", "Primeiros projetos"],
};

const MBA_MILESTONE: JourneyMilestone = {
  id: "education-mba",
  kind: "education",
  sortKey: "2025-01",
  yearLabel: "2025",
  title: {
    pt: "Evolução contínua",
    en: "Continuous growth",
  },
  subtitle: {
    pt: "MBA PUCRS — IA & Data Science",
    en: "PUCRS MBA — AI & Data Science",
  },
  story: {
    pt: "Em 2025, iniciei o MBA na PUCRS em IA, Data Science e Big Data — em paralelo à carreira, alinhando visão de negócio com engenharia de ponta.",
    en: "In 2025, I started the PUCRS MBA in AI, Data Science, and Big Data — in parallel with my career, aligning business vision with cutting-edge engineering.",
  },
  technologies: ["IA", "Data Science", "Big Data", "Estratégia de negócios"],
};

function periodYearLabel(start: string, end: string | null): string {
  const startYear = start.slice(0, 4);
  const endYear = end ? end.slice(0, 4) : null;
  if (!endYear || startYear === endYear) return startYear;
  return `${startYear}–${endYear}`;
}

function stepToMilestone(step: ExperienceStep): JourneyMilestone {
  return {
    id: `exp-${step.id}`,
    kind: "experience",
    sortKey: step.period.start,
    yearLabel: periodYearLabel(step.period.start, step.period.end),
    period: step.period,
    title: step.role,
    subtitle: { pt: step.company, en: step.company },
    story: step.summary,
    technologies: step.entry.technologies,
    experienceId: step.entry.id,
    tenureIndex: step.tenureIndex,
    stepInCompany: step.stepInCompany,
    totalInCompany: step.totalInCompany,
  };
}

/** Marcos da jornada — uma etapa por cargo; exclui freelances e entradas com includeInJourney: false. */
export function getCareerMilestones(): JourneyMilestone[] {
  const steps = sortExperienceSteps(
    expandExperienceSteps(getJourneyEntries(), { excludeFreelance: true }),
    "asc",
  );
  const experiences = steps.map(stepToMilestone);
  return [ORIGIN, ...experiences, MBA_MILESTONE].sort(
    (a, b) =>
      a.sortKey.localeCompare(b.sortKey) || a.id.localeCompare(b.id),
  );
}

export function getExperienceById(id: string): ExperienceEntry | undefined {
  return experienceEntries.find((e) => e.id === id);
}
