"use client";

import { motion, AnimatePresence } from "framer-motion";
import ReactMarkdown, { type Components } from "react-markdown";
import { useTranslation } from "@/components/language-provider";
import { MediaGallery } from "@/components/media-gallery";
import { ExperienceTenures } from "@/components/experience-tenures";
import { formatMonthRange } from "@/lib/tenure-duration";
import {
  EMPLOYMENT_BADGE,
  TYPE_BADGE,
  type ExperienceEntry,
} from "@/data/experience";

interface Props {
  entry: ExperienceEntry;
  onClose: () => void;
}

const markdownComponents: Components = {
  p: ({ children }) => (
    <p className="leading-8 text-muted">{children}</p>
  ),
  ul: ({ children }) => (
    <ul className="my-5 space-y-2.5 pl-1">{children}</ul>
  ),
  li: ({ children }) => (
    <li className="flex gap-3 leading-7 text-muted">
      <span className="mt-3 h-1.5 w-1.5 shrink-0 rounded-full bg-accent ring-4 ring-accent/10" />
      <span className="min-w-0">{children}</span>
    </li>
  ),
  strong: ({ children }) => (
    <strong className="font-semibold text-foreground">{children}</strong>
  ),
};

export function ExperienceDetail({ entry, onClose }: Props) {
  const { locale, t } = useTranslation();

  const employmentLabel =
    entry.employment === "clt"
      ? t.experience.employmentClt
      : entry.employment === "pj"
        ? t.experience.employmentPj
        : null;

  return (
    <AnimatePresence>
      <motion.div
        key="exp-overlay"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-90 bg-black/60 backdrop-blur-sm"
        onClick={onClose}
      />

      <motion.div
        key="exp-panel"
        initial={{ opacity: 0, x: "100%" }}
        animate={{ opacity: 1, x: 0 }}
        exit={{ opacity: 0, x: "100%" }}
        transition={{ type: "spring", damping: 30, stiffness: 300 }}
        className="fixed bottom-0 right-0 top-0 z-91 w-full overflow-y-auto bg-background shadow-2xl sm:w-135 lg:w-150"
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
            <div className="flex flex-wrap items-center gap-2">
              <p className="text-sm font-medium text-accent">{entry.company}</p>
              <span
                className={`shrink-0 rounded-full px-2.5 py-0.5 text-xs font-semibold ${TYPE_BADGE[entry.type]}`}
              >
                {t.experience.types[entry.type]}
              </span>
              {entry.type === "fulltime" && entry.employment && employmentLabel && (
                <span
                  className={`shrink-0 rounded-full px-2.5 py-0.5 text-xs font-semibold ${EMPLOYMENT_BADGE[entry.employment]}`}
                >
                  {employmentLabel}
                </span>
              )}
            </div>
            <h3 className="mt-1 text-xl font-bold tracking-tight text-foreground sm:text-2xl">
              {entry.role[locale]}
            </h3>
            <p className="mt-1 text-sm text-muted">
              {formatMonthRange(entry.period.start, entry.period.end, locale, t.experience.present)}
            </p>
            {entry.tenures && entry.tenures.length > 0 && (
              <p className="mt-2 text-xs text-muted">
                {t.experience.careerPathHint.replace(
                  "{count}",
                  String(entry.tenures.length),
                )}
              </p>
            )}
          </div>

          {entry.tenures && entry.tenures.length > 0 && (
            <ExperienceTenures tenures={entry.tenures} />
          )}

          {/* Overview — what the project is */}
          {entry.overview && (
            <div className="mb-6">
              <h4 className="mb-3 text-sm font-semibold uppercase tracking-wider text-foreground">
                {t.experience.overview}
              </h4>
              <div className="rounded-2xl border border-border/70 bg-foreground/1.5 p-5 text-base shadow-sm dark:bg-white/2.5 sm:p-6">
                <div className="space-y-4">
                  <ReactMarkdown components={markdownComponents}>
                    {entry.overview[locale]}
                  </ReactMarkdown>
                </div>
              </div>
            </div>
          )}

          {entry.exitReason && (
            <div className="mb-8">
              <h4 className="mb-3 text-sm font-semibold uppercase tracking-wider text-foreground">
                {t.experience.exitReason}
              </h4>
              <p className="rounded-2xl border border-amber-500/20 bg-amber-500/5 px-5 py-4 text-sm leading-relaxed text-muted">
                {entry.exitReason[locale]}
              </p>
            </div>
          )}

          {/* Description — my work on it */}
          <div className="mb-8">
            <h4 className="mb-3 text-sm font-semibold uppercase tracking-wider text-foreground">
              {entry.tenures?.length
                ? t.experience.contributionExtra
                : t.experience.contribution}
            </h4>
            <div className="rounded-2xl border border-border/70 bg-foreground/1.5 p-5 text-base shadow-sm dark:bg-white/2.5 sm:p-6">
              <div className="space-y-4">
                <ReactMarkdown components={markdownComponents}>
                  {entry.fullDescription[locale]}
                </ReactMarkdown>
              </div>
            </div>
          </div>

          {/* Clients */}
          {entry.clients && entry.clients.length > 0 && (
            <div className="mb-8">
              <h4 className="mb-3 text-sm font-semibold uppercase tracking-wider text-foreground">
                {t.experience.clients}
              </h4>
              <div className="flex flex-wrap gap-2">
                {entry.clients.map((client) => (
                  <span
                    key={`${client.name}-${client.relationship}`}
                    className="inline-flex items-center gap-2 rounded-full border border-border bg-foreground/2 px-3 py-1.5 text-xs font-medium text-foreground"
                  >
                    {client.name}
                    <span
                      className={
                        client.relationship === "direct"
                          ? "rounded-full bg-emerald-500/15 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wide text-emerald-700 dark:text-emerald-400"
                          : "rounded-full bg-slate-500/15 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wide text-slate-600 dark:text-slate-400"
                      }
                    >
                      {entry.id === "prodia" && client.name === "Mãos Livres"
                        ? t.experience.parentCompany
                        : client.relationship === "direct"
                          ? t.experience.clientDirect
                          : t.experience.clientIndirect}
                    </span>
                  </span>
                ))}
              </div>
            </div>
          )}

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

          {/* Link */}
          {entry.link && (
            <div className="mb-8">
              {entry.id === "prodia" && (
                <p className="mb-3 text-sm text-muted">{t.experience.comingSoon}</p>
              )}
              <a
                href={entry.link}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-full bg-accent px-5 py-2.5 text-sm font-semibold text-white transition-opacity hover:opacity-90"
              >
                {entry.id === "maos-livres"
                  ? t.experience.visitHub
                  : entry.id === "prodia"
                    ? t.experience.visitParentSite
                    : t.experience.visitSite}
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M7 7h10v10" /><path d="M7 17 17 7" />
                </svg>
              </a>
            </div>
          )}

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
