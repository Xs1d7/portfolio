"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { useTranslation } from "@/components/language-provider";
import { SectionHeading } from "@/components/section-heading";

export function About() {
  const { t } = useTranslation();

  return (
    <section id="about" className="scroll-mt-20 py-24">
      <SectionHeading>{t.about.title}</SectionHeading>

      {/* Photo + Text — side by side desktop, stacked mobile */}
      <div className="flex flex-col items-center gap-12 lg:flex-row lg:items-start lg:gap-16">
        {/* Photo */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="shrink-0"
        >
          <div className="relative">
            {/* Decorative ring */}
            <div className="absolute -inset-3 rounded-3xl border-2 border-accent/20" />
            {/* Decorative dot */}
            <div className="absolute -right-2 -top-2 h-4 w-4 rounded-full bg-accent" />
            <Image
              src="/andressa_picture.jpeg"
              alt={t.about.photoAlt}
              width={280}
              height={280}
              className="relative rounded-2xl object-cover"
              priority
            />
          </div>
        </motion.div>

        {/* Text content */}
        <div className="flex-1 space-y-6">
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: 0.1 }}
            className="text-base leading-relaxed text-muted sm:text-lg"
          >
            {t.about.p1}
          </motion.p>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: 0.2 }}
            className="text-base leading-relaxed text-muted sm:text-lg"
          >
            {t.about.p2}
          </motion.p>

          {/* Location + availability */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: 0.3 }}
            className="flex flex-wrap gap-4 pt-2"
          >
            <span className="inline-flex items-center gap-2 text-sm text-foreground">
              <svg
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="text-accent"
              >
                <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z" />
                <circle cx="12" cy="10" r="3" />
              </svg>
              {t.about.location}
            </span>

            <span className="inline-flex items-center gap-2 text-sm text-foreground">
              <span className="h-2 w-2 animate-pulse rounded-full bg-green-500" />
              {t.about.available}
            </span>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
