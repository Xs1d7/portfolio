"use client";

import { useState } from "react";
import { useTranslation } from "@/components/language-provider";
import { SectionHeading } from "@/components/section-heading";
import { ExperienceDetail } from "@/components/experience-detail";
import { ExperienceFreelanceList } from "@/components/experience-freelance-list";
import {
  getFreelanceEntries,
  type ExperienceSelection,
} from "@/data/experience";

export function Freelances() {
  const { t } = useTranslation();
  const [selected, setSelected] = useState<ExperienceSelection | null>(null);
  const entries = getFreelanceEntries();

  return (
    <section id="freelances" className="scroll-mt-20 border-t border-border/60 py-16 sm:py-24">
      <SectionHeading>{t.freelances.title}</SectionHeading>
      <p className="mx-auto mb-8 max-w-2xl text-center text-sm text-muted sm:text-base">
        {t.freelances.subtitle}
      </p>

      <ExperienceFreelanceList entries={entries} onSelect={setSelected} />

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
