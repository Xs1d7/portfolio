import type { ExperienceEntry } from "@/data/experience";

/** Um bloco de carreira — um cargo com período (etapa de evolução ou experiência única). */
export interface ExperienceStep {
  id: string;
  entry: ExperienceEntry;
  tenureIndex: number | null;
  role: { pt: string; en: string };
  company: string;
  period: { start: string; end: string | null };
  summary: { pt: string; en: string };
  stepInCompany: number;
  totalInCompany: number;
}

export function expandExperienceSteps(
  entries: ExperienceEntry[],
  options?: { excludeFreelance?: boolean },
): ExperienceStep[] {
  const filtered = options?.excludeFreelance
    ? entries.filter((e) => e.type !== "freelance")
    : entries;

  const steps: ExperienceStep[] = [];

  for (const entry of filtered) {
    if (entry.tenures && entry.tenures.length > 0) {
      const total = entry.tenures.length;
      entry.tenures.forEach((tenure, index) => {
        steps.push({
          id: `${entry.id}-${index}`,
          entry,
          tenureIndex: index,
          role: tenure.role,
          company: tenure.company,
          period: tenure.period,
          summary: tenure.highlight ?? entry.shortDescription,
          stepInCompany: index + 1,
          totalInCompany: total,
        });
      });
    } else if (entry.period) {
      steps.push({
        id: entry.id,
        entry,
        tenureIndex: null,
        role: entry.role,
        company: entry.company,
        period: entry.period,
        summary: entry.shortDescription,
        stepInCompany: 1,
        totalInCompany: 1,
      });
    }
  }

  return steps;
}

export function sortExperienceSteps(
  steps: ExperienceStep[],
  order: "asc" | "desc" = "asc",
): ExperienceStep[] {
  return [...steps].sort((a, b) => {
    const cmp =
      a.period.start.localeCompare(b.period.start) ||
      a.id.localeCompare(b.id);
    return order === "asc" ? cmp : -cmp;
  });
}
