"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useTranslation } from "@/components/language-provider";
import { MediaGallery } from "@/components/media-gallery";
import type { ExperienceEntry } from "@/data/experience";

interface Props {
  entry: ExperienceEntry;
  onClose: () => void;
}

export function ExperienceDetail({ entry, onClose }: Props) {
  const { locale, t } = useTranslation();

  return (
    <AnimatePresence>
      <motion.div
        key="exp-overlay"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-[90] bg-black/60 backdrop-blur-sm"
        onClick={onClose}
      />

      <motion.div
        key="exp-panel"
        initial={{ opacity: 0, x: "100%" }}
        animate={{ opacity: 1, x: 0 }}
        exit={{ opacity: 0, x: "100%" }}
        transition={{ type: "spring", damping: 30, stiffness: 300 }}
        className="fixed bottom-0 right-0 top-0 z-[91] w-full overflow-y-auto bg-background shadow-2xl sm:w-[540px] lg:w-[600px]"
      >
        <div className="p-5 sm:p-8">
          {/* Close */}
          <button
            onClick={onClose}
            className="mb-6 flex h-9 w-9 items-center justify-center rounded-full border border-border text-foreground transition-colors hover:bg-accent/10"
            aria-label="Fechar"
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M18 6 6 18" /><path d="m6 6 12 12" />
            </svg>
          </button>

          {/* Header */}
          <div className="mb-6">
            <p className="text-sm font-medium text-accent">{entry.company}</p>
            <h3 className="mt-1 text-xl font-bold tracking-tight text-foreground sm:text-2xl">
              {entry.role[locale]}
            </h3>
            <p className="mt-1 text-sm text-muted">
              {formatPeriod(entry.period.start, entry.period.end, locale, t.experience.present)}
            </p>
          </div>

          {/* Description */}
          <p className="mb-8 text-base leading-relaxed text-muted">
            {entry.fullDescription[locale]}
          </p>

          {/* Technologies */}
          <div className="mb-8">
            <h4 className="mb-3 text-sm font-semibold uppercase tracking-wider text-foreground">
              {t.experience.technologies}
            </h4>
            <div className="flex flex-wrap gap-2">
              {entry.technologies.map((tech) => (
                <span
                  key={tech}
                  className="rounded-full bg-accent/10 px-3 py-1.5 text-xs font-medium text-accent"
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>

          {/* Gallery */}
          {entry.media.length > 0 && (
            <div>
              <h4 className="mb-3 text-sm font-semibold uppercase tracking-wider text-foreground">
                {t.experience.gallery}
              </h4>
              <MediaGallery items={entry.media} />
            </div>
          )}
        </div>
      </motion.div>
    </AnimatePresence>
  );
}

function formatPeriod(start: string, end: string | null, locale: string, presentLabel: string) {
  const fmt = (d: string) => {
    const date = new Date(d.length === 7 ? d + "-01" : d + "-01-01");
    return date.toLocaleDateString(locale === "pt" ? "pt-BR" : "en-US", {
      month: "short",
      year: "numeric",
    });
  };
  return `${fmt(start)} — ${end ? fmt(end) : presentLabel}`;
}
