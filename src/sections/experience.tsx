"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { useTranslation } from "@/components/language-provider";
import { SectionHeading } from "@/components/section-heading";
import { ExperienceDetail } from "@/components/experience-detail";
import { ExperienceJourney } from "@/components/experience-journey";
import { ExperienceList } from "@/components/experience-list";
import { getCareerMilestones } from "@/data/career-journey";
import {
  getCareerEntries,
  type ExperienceSelection,
  type ExperienceType,
} from "@/data/experience";
import { useMediaCapabilities } from "@/hooks/use-media-capabilities";
import { useScrollMilestone } from "@/hooks/use-scroll-milestone";
import { useParticleBackground } from "@/contexts/particle-background-context";

type ViewMode = "list" | "journey";

const CAREER_FILTERS: Array<ExperienceType | "all"> = [
  "all",
  "personal",
  "fulltime",
];

const SCROLL_VH_PER_MILESTONE = 75;

export function Experience() {
  const { t } = useTranslation();
  const [selected, setSelected] = useState<ExperienceSelection | null>(null);
  const [filter, setFilter] = useState<ExperienceType | "all">("all");
  const [view, setView] = useState<ViewMode>("journey");
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [overrideUntil, setOverrideUntil] = useState(0);

  const milestones = useMemo(() => getCareerMilestones(), []);
  const { registerExperienceJourney } = useParticleBackground();
  const { isMobile, prefersReducedMotion } = useMediaCapabilities();
  const scrollEnabled =
    view === "journey" && !isMobile && !prefersReducedMotion;

  const { activeIndex: scrollIndex, setActiveIndex: setScrollIndex } =
    useScrollMilestone({
      containerRef: scrollContainerRef,
      count: milestones.length,
      enabled: scrollEnabled,
    });

  useEffect(() => {
    if (!overrideUntil) return;
    const remaining = overrideUntil - Date.now();
    if (remaining <= 0) {
      setOverrideUntil(0);
      return;
    }
    const timer = window.setTimeout(() => setOverrideUntil(0), remaining);
    return () => window.clearTimeout(timer);
  }, [overrideUntil]);

  const careerEntries = getCareerEntries();
  const filtered =
    filter === "all"
      ? careerEntries
      : careerEntries.filter((entry) => entry.type === filter);

  const filterLabel = (key: ExperienceType | "all") =>
    key === "all" ? t.experience.filterAll : t.experience.types[key];

  const openDetail = (selection: ExperienceSelection) => setSelected(selection);

  const markUserOverride = useCallback(() => {
    setOverrideUntil(Date.now() + 1500);
  }, []);

  const resolvedScrollIndex =
    scrollEnabled && overrideUntil <= Date.now() ? scrollIndex : undefined;

  const journeyContainerRef = useCallback(
    (el: HTMLDivElement | null) => {
      scrollContainerRef.current = el;
      registerExperienceJourney(
        scrollEnabled ? el : null,
        milestones.length,
      );
    },
    [scrollEnabled, milestones.length, registerExperienceJourney],
  );

  return (
    <section id="experience" className="scroll-mt-20 py-16 sm:py-24">
      <SectionHeading>{t.experience.title}</SectionHeading>

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
        <div
          ref={journeyContainerRef}
          style={
            scrollEnabled
              ? { height: `${milestones.length * SCROLL_VH_PER_MILESTONE}vh` }
              : undefined
          }
        >
          <div
            className={
              scrollEnabled ? "sticky top-20 space-y-6" : "space-y-6"
            }
          >
            <ExperienceJourney
              onOpenDetail={openDetail}
              scrollActiveIndex={resolvedScrollIndex}
              scrollEnabled={scrollEnabled}
              onUserNavigate={(index) => {
                markUserOverride();
                setScrollIndex(index);
              }}
            />
          </div>
        </div>
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
