"use client";

import { Hero } from "@/sections/hero";
import { Experience } from "@/sections/experience";
import { Freelances } from "@/sections/freelances";
import { Skills } from "@/sections/skills";
import { Education } from "@/sections/education";
import { Courses } from "@/sections/courses";
import { Languages } from "@/sections/languages-section";
import { Contact } from "@/sections/contact";

export default function Home() {
  return (
    <main>
      <Hero />
      <Experience />
      <Freelances />
      <Skills />
      <Education />
      <Courses />
      <Languages />
      <Contact />
    </main>
  );
}
