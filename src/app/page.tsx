"use client";

import { Hero } from "@/sections/hero";
import { About } from "@/sections/about";
import { Experience } from "@/sections/experience";
import { Education } from "@/sections/education";
import { Courses } from "@/sections/courses";
import { Languages } from "@/sections/languages-section";
import { Contact } from "@/sections/contact";

export default function Home() {
  return (
    <main>
      <Hero />
      <About />
      <Experience />
      <Education />
      <Courses />
      <Languages />
      <Contact />
    </main>
  );
}
