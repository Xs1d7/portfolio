"use client";

import { motion } from "framer-motion";
import { useTranslation } from "@/components/language-provider";
import { SectionHeading } from "@/components/section-heading";
import { courses } from "@/data/resume";

export function Courses() {
  const { t, locale } = useTranslation();

  const maxHours = Math.max(...courses.map((c) => c.hours));

  return (
    <section id="courses" className="scroll-mt-20 py-24">
      <SectionHeading>{t.courses.title}</SectionHeading>

      <div className="grid gap-4 sm:grid-cols-2">
        {courses.map((course, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: i * 0.06 }}
            className="group rounded-2xl border border-border p-6 transition-all duration-200 hover:border-accent/30 hover:shadow-lg hover:shadow-accent/5"
          >
            <div className="flex items-start gap-4">
              {/* Certificate icon */}
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-accent/10 text-accent">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="12" cy="8" r="6" />
                  <path d="M15.477 12.89 17 22l-5-3-5 3 1.523-9.11" />
                </svg>
              </div>

              <div className="min-w-0 flex-1">
                <h3 className="text-sm font-semibold leading-snug text-foreground sm:text-base">
                  {course.name[locale]}
                </h3>
                <p className="mt-1 text-sm font-medium text-accent">
                  {course.institution}
                </p>

                {/* Meta */}
                <div className="mt-3 flex items-center gap-3 text-xs text-muted">
                  <span>{course.year}</span>
                  <span className="h-1 w-1 rounded-full bg-border" />
                  <span>{course.hours}h</span>
                </div>

                {/* Hours bar */}
                <div className="mt-3 h-1.5 overflow-hidden rounded-full bg-border">
                  <motion.div
                    className="h-full rounded-full bg-accent"
                    initial={{ width: 0 }}
                    whileInView={{ width: `${(course.hours / maxHours) * 100}%` }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8, delay: 0.2 + i * 0.06 }}
                  />
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
