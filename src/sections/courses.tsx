"use client";

import { useTranslation } from "@/components/language-provider";
import { SectionHeading } from "@/components/section-heading";
import { courses } from "@/data/resume";

export function Courses() {
  const { t, locale } = useTranslation();

  return (
    <section id="courses" className="scroll-mt-20 py-24">
      <SectionHeading>{t.courses.title}</SectionHeading>

      <div className="grid gap-4 sm:grid-cols-2">
        {courses.map((course, i) => (
          <div
            key={i}
            className="rounded-2xl border border-border p-6 transition-colors duration-200 hover:border-accent/30"
          >
            <h3 className="font-semibold text-foreground">
              {course.name[locale]}
            </h3>
            <p className="mt-1 text-sm text-accent">{course.institution}</p>
            <div className="mt-3 flex items-center gap-3 text-xs text-muted">
              <span>{course.year}</span>
              <span className="h-1 w-1 rounded-full bg-border" />
              <span>
                {course.hours} {t.courses.hours}
              </span>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
