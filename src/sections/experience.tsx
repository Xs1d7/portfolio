"use client";

import { useMemo, useState } from "react";
import { useTranslation } from "@/components/language-provider";
import { SectionHeading } from "@/components/section-heading";
import { ExperienceDetail } from "@/components/experience-detail";
import { ExperienceJourney } from "@/components/experience-journey";
import { ExperienceList } from "@/components/experience-list";
import { MaosLivresHighlight } from "@/components/maos-livres-highlight";
import {
  getCareerEntries,
  type ExperienceSelection,
  type ExperienceType,
} from "@/data/experience";

type ViewMode = "list" | "journey";

const CAREER_FILTERS: Array<ExperienceType | "all"> = [
  "all",
  "personal",
  "fulltime",
];

export function Experience() {
  const { t } = useTranslation();
  const [selected, setSelected] = useState<ExperienceSelection | null>(null);
  const [filter, setFilter] = useState<ExperienceType | "all">("all");
  const [view, setView] = useState<ViewMode>("journey");

  const careerEntries = getCareerEntries();
  const filtered =
    filter === "all"
      ? careerEntries
      : careerEntries.filter((entry) => entry.type === filter);

  const filterLabel = (key: ExperienceType | "all") =>
    key === "all" ? t.experience.filterAll : t.experience.types[key];

  const openDetail = (selection: ExperienceSelection) => setSelected(selection);

  return (
    <section id="experience" className="scroll-mt-20 py-16 sm:py-24">
      <SectionHeading>{t.experience.title}</SectionHeading>

      <MaosLivresHighlight />

      <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div
          className="inline-flex rounded-full border border-border p-1"
          role="tablist"
          aria-label={t.experience.viewModeLabel}
        >
          {(["journey", "list"] as const).map((mode) => (
            <button
              key={mode}
              type="button"
              role="tab"
              aria-selected={view === mode}
              onClick={() => setView(mode)}
              className={`rounded-full px-4 py-2 text-xs font-semibold transition-colors sm:text-sm ${
                view === mode
                  ? "bg-accent text-white"
                  : "text-muted hover:text-foreground"
              }`}
            >
              {mode === "journey"
                ? t.experience.viewJourney
                : t.experience.viewList}
            </button>
          ))}
        </div>

        {view === "list" && (
          <div className="flex flex-wrap gap-2">
            {CAREER_FILTERS.map((key) => (
              <button
                key={key}
                onClick={() => setFilter(key)}
                className={`rounded-full px-3.5 py-1.5 text-xs font-medium transition-colors ${
                  filter === key
                    ? "bg-accent text-white"
                    : "border border-border text-muted hover:border-accent/40 hover:text-foreground"
                }`}
              >
                {filterLabel(key)}
              </button>
            ))}
          </div>
        )}
      </div>

      {view === "journey" ? (
        <ExperienceJourney onOpenDetail={openDetail} />
      ) : (
        <>
          <ExperienceList entries={filtered} onSelect={openDetail} />
          <p className="mt-3 text-center text-xs text-muted">
            {t.experience.scrollHint}
          </p>
        </>
      )}

      {selected && (
        <ExperienceDetail
          entry={selected.entry}
          tenureIndex={selected.tenureIndex}
          onClose={() => setSelected(null)}
        />
      )}
    </section>
  );
}
