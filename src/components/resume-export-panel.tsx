"use client";

import { useState } from "react";
import { useTranslation } from "@/components/language-provider";
import { useParticleOverlaySuppression } from "@/contexts/particle-background-context";
import {
  buildResumePdfPayload,
  resumeFileName,
  ROLE_FOCUS_OPTIONS,
  TECH_FOCUS_OPTIONS,
  type RoleFocus,
  type TechFocus,
} from "@/data/resume-focus";

export function ResumeExportPanel() {
  const { locale, t } = useTranslation();
  const [open, setOpen] = useState(false);
  const [roleFocus, setRoleFocus] = useState<RoleFocus>("full");
  const [techFocus, setTechFocus] = useState<TechFocus[]>([]);
  const [includeFreelances, setIncludeFreelances] = useState(true);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useParticleOverlaySuppression(open);

  const toggleTech = (tech: TechFocus) => {
    setTechFocus((prev) =>
      prev.includes(tech) ? prev.filter((x) => x !== tech) : [...prev, tech],
    );
  };

  const handleExport = async () => {
    setLoading(true);
    setError(null);
    try {
      const [{ pdf }, { ResumePdfDocument }] = await Promise.all([
        import("@react-pdf/renderer"),
        import("@/components/resume-pdf-document"),
      ]);

      const data = buildResumePdfPayload(
        locale,
        roleFocus,
        techFocus,
        {
          present: t.experience.present,
          types: t.experience.types,
          employment: {
            clt: t.experience.employmentClt,
            pj: t.experience.employmentPj,
          },
          languageLevels: {
            native: t.languages.native,
            fluent: t.languages.fluent,
            intermediate: t.languages.intermediate,
            basic: t.languages.basic,
          },
          location: t.about.location,
          focusPrefix: t.resumeExport.focusPrefix,
          skillPillars: t.resumeExport.skillPillars,
        },
        { includeFreelances },
      );

      const labels = {
        name: t.header.name,
        sections: t.resumeExport.sections,
      };

      const blob = await pdf(
        <ResumePdfDocument data={data} labels={labels} />,
      ).toBlob();

      const url = URL.createObjectURL(blob);
      const anchor = document.createElement("a");
      anchor.href = url;
      anchor.download = resumeFileName(roleFocus, techFocus);
      anchor.click();
      URL.revokeObjectURL(url);
    } catch {
      setError(t.resumeExport.error);
    } finally {
      setLoading(false);
    }
  };

  const roleLabel = (key: RoleFocus) =>
    t.resumeExport.roles[key as keyof typeof t.resumeExport.roles];

  const techLabel = (key: TechFocus) =>
    t.resumeExport.techs[key as keyof typeof t.resumeExport.techs];

  return (
    <div className="relative z-20 flex w-full flex-col items-start min-[380px]:w-auto">
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
        aria-controls="resume-export-panel"
        className="inline-flex h-11 items-center justify-center gap-1.5 rounded-full border border-border/80 px-4 text-xs font-medium text-muted transition-colors hover:border-accent/30 hover:text-foreground"
      >
        <svg
          width="14"
          height="14"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          aria-hidden
        >
          <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
          <polyline points="14 2 14 8 20 8" />
        </svg>
        {open ? t.resumeExport.toggleClose : t.resumeExport.toggleOpen}
        <svg
          width="14"
          height="14"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className={`transition-transform ${open ? "rotate-180" : ""}`}
          aria-hidden
        >
          <path d="m6 9 6 6 6-6" />
        </svg>
      </button>

      {open && (
        <div
          id="resume-export-panel"
          className="mt-3 w-full max-w-xl rounded-2xl border border-border bg-background/95 p-4 shadow-lg ring-1 ring-border/60 backdrop-blur-md sm:p-5"
        >
          <h2 className="text-sm font-semibold text-foreground">
            {t.resumeExport.title}
          </h2>
          <p className="mt-1 text-xs leading-relaxed text-muted">
            {t.resumeExport.subtitle}
          </p>

          <div className="mt-4">
            <p className="mb-2 text-xs font-medium uppercase tracking-wider text-muted">
              {t.resumeExport.roleLabel}
            </p>
            <div className="flex flex-wrap gap-1.5">
              {ROLE_FOCUS_OPTIONS.map((key) => (
                <button
                  key={key}
                  type="button"
                  onClick={() => {
                    setRoleFocus(key);
                    if (key === "full") setIncludeFreelances(true);
                  }}
                  className={`rounded-full px-3 py-1.5 text-xs font-medium transition-colors ${
                    roleFocus === key
                      ? "bg-accent text-white"
                      : "border border-border text-muted hover:border-accent/40 hover:text-foreground"
                  }`}
                >
                  {roleLabel(key)}
                </button>
              ))}
            </div>
          </div>

          <div className="mt-4">
            <p className="mb-2 text-xs font-medium uppercase tracking-wider text-muted">
              {t.resumeExport.techLabel}
            </p>
            <div className="flex flex-wrap gap-1.5">
              {TECH_FOCUS_OPTIONS.map((key) => (
                <button
                  key={key}
                  type="button"
                  onClick={() => toggleTech(key)}
                  className={`rounded-full px-3 py-1.5 text-xs font-medium transition-colors ${
                    techFocus.includes(key)
                      ? "bg-accent/15 text-accent ring-1 ring-accent/30"
                      : "border border-border text-muted hover:border-accent/40 hover:text-foreground"
                  }`}
                >
                  {techLabel(key)}
                </button>
              ))}
            </div>
          </div>

          <label className="mt-4 flex cursor-pointer items-center gap-2.5">
            <input
              type="checkbox"
              checked={includeFreelances}
              onChange={(e) => setIncludeFreelances(e.target.checked)}
              className="h-4 w-4 rounded border-border text-accent focus:ring-accent"
            />
            <span className="text-xs text-muted">
              {t.resumeExport.includeFreelances}
            </span>
          </label>

          <button
            type="button"
            onClick={handleExport}
            disabled={loading}
            className="mt-5 inline-flex h-11 w-full items-center justify-center gap-2 rounded-full bg-accent px-6 text-sm font-semibold text-white transition-colors hover:bg-accent-hover disabled:opacity-60 sm:w-auto"
          >
            {loading ? (
              <>
                <span className="h-4 w-4 animate-spin rounded-full border-2 border-white/30 border-t-white" />
                {t.resumeExport.generating}
              </>
            ) : (
              <>
                <svg
                  width="18"
                  height="18"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
                  <polyline points="14 2 14 8 20 8" />
                  <line x1="12" y1="18" x2="12" y2="12" />
                  <polyline points="9 15 12 18 15 15" />
                </svg>
                {t.resumeExport.download}
              </>
            )}
          </button>

          {error && (
            <p className="mt-2 text-xs text-red-600 dark:text-red-400">
              {error}
            </p>
          )}
        </div>
      )}
    </div>
  );
}
