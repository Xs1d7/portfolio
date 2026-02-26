"use client";

import Image from "next/image";
import { useTranslation } from "@/components/language-provider";
import { SectionHeading } from "@/components/section-heading";
import { skills } from "@/data/resume";

const SKILL_ICONS: Record<string, React.ReactNode> = {
  code: (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="16 18 22 12 16 6" />
      <polyline points="8 6 2 12 8 18" />
    </svg>
  ),
  palette: (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="13.5" cy="6.5" r=".5" fill="currentColor" />
      <circle cx="17.5" cy="10.5" r=".5" fill="currentColor" />
      <circle cx="8.5" cy="7.5" r=".5" fill="currentColor" />
      <circle cx="6.5" cy="12.5" r=".5" fill="currentColor" />
      <path d="M12 2C6.5 2 2 6.5 2 12s4.5 10 10 10c.926 0 1.648-.746 1.648-1.688 0-.437-.18-.835-.437-1.125-.29-.289-.438-.652-.438-1.125a1.64 1.64 0 0 1 1.668-1.668h1.996c3.051 0 5.555-2.503 5.555-5.554C21.965 6.012 17.461 2 12 2z" />
    </svg>
  ),
  server: (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect width="20" height="8" x="2" y="2" rx="2" ry="2" />
      <rect width="20" height="8" x="2" y="14" rx="2" ry="2" />
      <line x1="6" x2="6.01" y1="6" y2="6" />
      <line x1="6" x2="6.01" y1="18" y2="18" />
    </svg>
  ),
  tool: (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z" />
    </svg>
  ),
};

export function About() {
  const { t } = useTranslation();

  return (
    <section id="about" className="scroll-mt-20 py-24">
      <SectionHeading>{t.about.title}</SectionHeading>

      {/* Photo + Text — side by side desktop, stacked mobile */}
      <div className="flex flex-col items-center gap-12 lg:flex-row lg:items-start lg:gap-16">
        {/* Photo */}
        <div className="shrink-0">
          <div className="relative">
            {/* Decorative ring */}
            <div className="absolute -inset-3 rounded-3xl border-2 border-accent/20" />
            {/* Decorative dot */}
            <div className="absolute -right-2 -top-2 h-4 w-4 rounded-full bg-accent" />

            <Image
              src="/profile-placeholder.svg"
              alt={t.about.photoAlt}
              width={280}
              height={280}
              className="relative rounded-2xl object-cover"
              priority
            />
          </div>
        </div>

        {/* Text content */}
        <div className="flex-1 space-y-6">
          <p className="text-base leading-relaxed text-muted sm:text-lg">
            {t.about.p1}
          </p>
          <p className="text-base leading-relaxed text-muted sm:text-lg">
            {t.about.p2}
          </p>

          {/* Location + availability */}
          <div className="flex flex-wrap gap-4 pt-2">
            <span className="inline-flex items-center gap-2 text-sm text-foreground">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-accent">
                <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z" />
                <circle cx="12" cy="10" r="3" />
              </svg>
              {t.about.location}
            </span>

            <span className="inline-flex items-center gap-2 text-sm text-foreground">
              <span className="h-2 w-2 animate-pulse rounded-full bg-green-500" />
              {t.about.available}
            </span>
          </div>
        </div>
      </div>

      {/* Skills */}
      <div className="mt-16">
        <h3 className="mb-6 text-lg font-semibold text-foreground">
          {t.about.skillsTitle}
        </h3>

        <div className="flex flex-wrap gap-3">
          {skills.map((skill) => (
            <span
              key={skill.name}
              className="inline-flex items-center gap-2 rounded-full border border-border px-4 py-2 text-sm font-medium text-foreground transition-colors duration-200 hover:border-accent/40 hover:text-accent"
            >
              <span className="text-accent">{SKILL_ICONS[skill.icon]}</span>
              {skill.name}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
