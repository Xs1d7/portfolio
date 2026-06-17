"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import {
  AnimatePresence,
  motion,
  useReducedMotion,
} from "framer-motion";
import { useTranslation } from "@/components/language-provider";
import {
  getCareerMilestones,
  getExperienceById,
  type JourneyMilestone,
  type JourneyMilestoneKind,
} from "@/data/career-journey";
import { TYPE_BADGE, type ExperienceSelection } from "@/data/experience";
import {
  formatMonthRange,
  formatMonthRangeCompact,
} from "@/lib/tenure-duration";

const KIND_RING: Record<JourneyMilestoneKind, string> = {
  origin: "ring-sky-500/40",
  education: "ring-violet-500/40",
  experience: "ring-accent/40",
};

const KIND_DOT: Record<JourneyMilestoneKind, string> = {
  origin: "bg-sky-500",
  education: "bg-violet-500",
  experience: "bg-accent",
};

function stripMarkdown(text: string): string {
  return text.replace(/\*\*(.*?)\*\*/g, "$1").replace(/\[(.*?)\]\(.*?\)/g, "$1");
}

interface Props {
  onOpenDetail: (selection: ExperienceSelection) => void;
}

export function ExperienceJourney({ onOpenDetail }: Props) {
  const { t, locale } = useTranslation();
  const prefersReducedMotion = useReducedMotion();
  const milestones = useMemo(() => getCareerMilestones(), []);
  const [activeIndex, setActiveIndex] = useState(0);

  const displayIndex = activeIndex;
  const active = milestones[displayIndex];
  const linkedEntry = active.experienceId
    ? getExperienceById(active.experienceId)
    : undefined;

  const go = useCallback(
    (index: number) => {
      const next = Math.max(0, Math.min(milestones.length - 1, index));
      setActiveIndex(next);
    },
    [milestones.length],
  );

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight" || e.key === "ArrowDown") {
        e.preventDefault();
        go(displayIndex + 1);
      }
      if (e.key === "ArrowLeft" || e.key === "ArrowUp") {
        e.preventDefault();
        go(displayIndex - 1);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [displayIndex, go]);

  const progress =
    milestones.length > 1 ? (displayIndex / (milestones.length - 1)) * 100 : 0;

  const openLinkedDetail = useCallback(() => {
    if (!linkedEntry || !active.experienceId) return;
    onOpenDetail({
      entry: linkedEntry,
      tenureIndex: active.tenureIndex ?? null,
    });
  }, [linkedEntry, active.experienceId, active.tenureIndex, onOpenDetail]);

  return (
    <div className="space-y-6">
      <p className="text-center text-sm text-muted sm:text-left">
        {t.experience.journeyIntro}
      </p>

      {/* Progress track */}
      <div className="relative px-1">
        <div className="h-1 overflow-hidden rounded-full bg-border">
          <motion.div
            className="h-full rounded-full bg-accent"
            initial={false}
            animate={{ width: `${progress}%` }}
            transition={
              prefersReducedMotion
                ? { duration: 0 }
                : { type: "spring", stiffness: 120, damping: 22 }
            }
          />
        </div>

        {/* Step dots */}
        <div className="mt-4 flex justify-between gap-1">
          {milestones.map((m, i) => (
            <button
              key={m.id}
              type="button"
              onClick={() => go(i)}
              aria-label={`${m.yearLabel} — ${m.title[locale]}`}
              aria-current={i === displayIndex ? "step" : undefined}
              className="group flex flex-1 flex-col items-center gap-1.5 focus-visible:outline-none"
            >
              <motion.span
                animate={{
                  scale: i === displayIndex ? 1.15 : 1,
                  opacity:
                    i === displayIndex ? 1 : i < displayIndex ? 0.85 : 0.45,
                }}
                transition={{ duration: 0.25 }}
                className={`h-3 w-3 rounded-full ring-2 ${KIND_DOT[m.kind]} ${KIND_RING[m.kind]} transition-shadow ${
                  i === displayIndex
                    ? "shadow-[0_0_0_6px] shadow-accent/15"
                    : "group-hover:opacity-80"
                }`}
              />
              <span
                className={`hidden max-w-[4.5rem] text-center text-[10px] leading-tight font-medium sm:block ${
                  i === displayIndex ? "text-accent" : "text-muted"
                }`}
              >
                {m.period
                  ? formatMonthRangeCompact(
                      m.period.start,
                      m.period.end,
                      locale,
                      t.experience.present,
                    )
                  : m.yearLabel}
              </span>
            </button>
          ))}
        </div>
      </div>

      {/* Story card */}
      <div className="relative min-h-[320px] sm:min-h-[300px]">
        <AnimatePresence mode="wait">
          <motion.article
            key={active.id}
            initial={prefersReducedMotion ? false : { opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={prefersReducedMotion ? undefined : { opacity: 0, y: -12 }}
            transition={{ duration: 0.35, ease: "easeOut" }}
            role={linkedEntry ? "button" : undefined}
            tabIndex={linkedEntry ? 0 : undefined}
            onClick={linkedEntry ? openLinkedDetail : undefined}
            onKeyDown={
              linkedEntry
                ? (e) => {
                    if (e.key === "Enter" || e.key === " ") {
                      e.preventDefault();
                      openLinkedDetail();
                    }
                  }
                : undefined
            }
            className={`rounded-2xl border border-border bg-linear-to-br from-accent/3 via-transparent to-transparent p-5 shadow-sm sm:p-8${
              linkedEntry
                ? " cursor-pointer transition-colors hover:border-accent/30 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent/40"
                : ""
            }`}
          >
            <div className="flex flex-wrap items-start justify-between gap-3">
              <div>
                <span className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-widest text-accent">
                  <span
                    className={`h-2 w-2 rounded-full ${KIND_DOT[active.kind]}`}
                  />
                  {active.period
                    ? formatMonthRange(
                        active.period.start,
                        active.period.end,
                        locale,
                        t.experience.present,
                      )
                    : active.yearLabel}
                </span>
                <h3 className="mt-2 text-xl font-bold tracking-tight text-foreground sm:text-2xl">
                  {active.title[locale]}
                </h3>
                <p className="mt-1 text-sm font-medium text-muted">
                  {active.subtitle[locale]}
                </p>
              </div>

              {linkedEntry && (
                <span
                  className={`shrink-0 rounded-full px-2.5 py-0.5 text-xs font-semibold ${TYPE_BADGE[linkedEntry.type]}`}
                >
                  {t.experience.types[linkedEntry.type]}
                </span>
              )}
            </div>

            <p className="mt-5 text-base leading-relaxed text-muted sm:text-lg">
              {stripMarkdown(active.story[locale])}
            </p>

            {active.technologies.length > 0 && (
              <div className="mt-6">
                <p className="mb-2.5 text-xs font-semibold uppercase tracking-wider text-foreground">
                  {t.experience.technologies}
                </p>
                <div className="flex flex-wrap gap-2">
                  {active.technologies.map((tech, i) => (
                    <motion.span
                      key={tech}
                      initial={
                        prefersReducedMotion ? false : { opacity: 0, scale: 0.9 }
                      }
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: 0.05 + i * 0.04, duration: 0.25 }}
                      className="rounded-full border border-border bg-background px-3 py-1 text-xs font-medium text-foreground"
                    >
                      {tech}
                    </motion.span>
                  ))}
                </div>
              </div>
            )}

            {linkedEntry && (
              <div className="mt-6 flex flex-wrap items-center gap-4">
                <motion.button
                  type="button"
                  whileHover={prefersReducedMotion ? undefined : { x: 4 }}
                  onClick={(e) => {
                    e.stopPropagation();
                    openLinkedDetail();
                  }}
                  className="inline-flex items-center gap-2 text-sm font-semibold text-accent transition-colors hover:text-accent-hover"
                >
                  {t.experience.journeyExplore}
                  <svg
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M5 12h14" />
                    <path d="m12 5 7 7-7 7" />
                  </svg>
                </motion.button>

                {linkedEntry.link && (
                  <a
                    href={linkedEntry.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={(e) => e.stopPropagation()}
                    className="inline-flex items-center gap-2 rounded-full border border-border px-4 py-2 text-sm font-semibold text-foreground transition-colors hover:border-accent/40 hover:text-accent"
                  >
                    {linkedEntry.id === "maos-livres"
                      ? t.experience.visitHub
                      : t.experience.visitSite}
                    <svg
                      width="14"
                      height="14"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path d="M7 7h10v10" />
                      <path d="M7 17 17 7" />
                    </svg>
                  </a>
                )}
              </div>
            )}
          </motion.article>
        </AnimatePresence>
      </div>

      {/* Navigation */}
      <div className="flex items-center justify-between gap-4">
        <NavButton
          direction="prev"
          disabled={displayIndex === 0}
          label={t.experience.journeyPrev}
          onClick={() => go(displayIndex - 1)}
        />

        <p className="text-center text-xs text-muted">
          {t.experience.journeyStep
            .replace("{current}", String(displayIndex + 1))
            .replace("{total}", String(milestones.length))}
        </p>

        <NavButton
          direction="next"
          disabled={displayIndex === milestones.length - 1}
          label={t.experience.journeyNext}
          onClick={() => go(displayIndex + 1)}
        />
      </div>

      <p className="text-center text-xs text-muted">
        {t.experience.journeyHint}
      </p>
    </div>
  );
}

function NavButton({
  direction,
  disabled,
  label,
  onClick,
}: {
  direction: "prev" | "next";
  disabled: boolean;
  label: string;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      disabled={disabled}
      onClick={onClick}
      className="inline-flex items-center gap-2 rounded-full border border-border px-4 py-2 text-sm font-medium text-foreground transition-colors hover:border-accent/40 hover:text-accent disabled:pointer-events-none disabled:opacity-35"
    >
      {direction === "prev" && (
        <svg
          width="16"
          height="16"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="m15 18-6-6 6-6" />
        </svg>
      )}
      {label}
      {direction === "next" && (
        <svg
          width="16"
          height="16"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="m9 18 6-6-6-6" />
        </svg>
      )}
    </button>
  );
}
