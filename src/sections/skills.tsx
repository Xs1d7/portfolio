"use client";

import { motion } from "framer-motion";
import { useTranslation } from "@/components/language-provider";
import { SectionHeading } from "@/components/section-heading";
import { skills, skillCategories, type SkillLevel } from "@/data/resume";

const CATEGORY_ICONS: Record<string, React.ReactNode> = {
  frontend: (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="16 18 22 12 16 6" />
      <polyline points="8 6 2 12 8 18" />
    </svg>
  ),
  backend: (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect width="20" height="8" x="2" y="2" rx="2" ry="2" />
      <rect width="20" height="8" x="2" y="14" rx="2" ry="2" />
      <line x1="6" x2="6.01" y1="6" y2="6" />
      <line x1="6" x2="6.01" y1="18" y2="18" />
    </svg>
  ),
  tools: (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z" />
    </svg>
  ),
database: (
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
    <ellipse cx="12" cy="5" rx="9" ry="3" />
    <path d="M3 5v6c0 1.7 4 3 9 3s9-1.3 9-3V5" />
    <path d="M3 11v6c0 1.7 4 3 9 3s9-1.3 9-3v-6" />
  </svg>
),
};

function LevelDots({ level }: { level: SkillLevel }) {
  return (
    <div className="flex gap-1">
      {Array.from({ length: 5 }).map((_, i) => (
        <div
          key={i}
          className={`h-2 w-2 rounded-full transition-colors ${
            i < level ? "bg-accent" : "bg-border"
          }`}
        />
      ))}
    </div>
  );
}

export function Skills() {
  const { t } = useTranslation();

  return (
    <section id="skills" className="scroll-mt-20 py-16 sm:py-24">
      <SectionHeading>{t.skills.title}</SectionHeading>

      <div className="grid gap-8 sm:grid-cols-2">
        {skillCategories.map((cat) => {
          const catSkills = skills.filter((s) => s.category === cat);

          return (
            <motion.div
              key={cat}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4 }}
              className="rounded-2xl border border-border bg-background p-5 sm:p-6"
            >
              {/* Category header */}
              <div className="mb-5 flex items-center gap-3">
                <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-accent/10 text-accent">
                  {CATEGORY_ICONS[cat]}
                </div>
                <h3 className="text-sm font-semibold uppercase tracking-wider text-foreground">
                  {t.skills.categories[cat as keyof typeof t.skills.categories]}
                </h3>
              </div>

              {/* Skills list */}
              <div className="space-y-3">
                {catSkills.map((skill) => (
                  <div key={skill.name} className="flex items-center justify-between gap-4">
                    <span className="min-w-0 text-sm text-foreground">{skill.name}</span>
                    <LevelDots level={skill.level} />
                  </div>
                ))}
              </div>
            </motion.div>
          );
        })}
      </div>
    </section>
  );
}
