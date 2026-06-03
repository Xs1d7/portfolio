import {
  experienceEntries,
  type ExperienceEntry,
} from "@/data/experience";

export type JourneyMilestoneKind = "origin" | "education" | "experience";

export interface JourneyMilestone {
  id: string;
  kind: JourneyMilestoneKind;
  sortKey: string;
  yearLabel: string;
  /** Período com mês/ano (experiências profissionais). */
  period?: { start: string; end: string | null };
  title: { pt: string; en: string };
  subtitle: { pt: string; en: string };
  story: { pt: string; en: string };
  technologies: string[];
  experienceId?: string;
}

const ORIGIN: JourneyMilestone = {
  id: "origin-graduation",
  kind: "origin",
  sortKey: "2018-01",
  yearLabel: "2018",
  title: {
    pt: "O início da jornada",
    en: "Where it started",
  },
  subtitle: {
    pt: "Decisão de cursar tecnologia",
    en: "Choosing a tech degree",
  },
  story: {
    pt: "Decidi transformar curiosidade em carreira e ingressar em Análise e Desenvolvimento de Sistemas. Foi o marco que abriu a porta para cada experiência que viria depois.",
    en: "I decided to turn curiosity into a career and enroll in Systems Analysis and Development. That choice opened the door to every experience that followed.",
  },
  technologies: ["Fundamentos de software", "Lógica", "Primeiros projetos"],
};

const MBA_MILESTONE: JourneyMilestone = {
  id: "education-mba",
  kind: "education",
  sortKey: "2025-01",
  yearLabel: "2025",
  title: {
    pt: "Evolução contínua",
    en: "Continuous growth",
  },
  subtitle: {
    pt: "MBA PUCRS — IA & Data Science",
    en: "PUCRS MBA — AI & Data Science",
  },
  story: {
    pt: "Em 2025, iniciei o MBA na PUCRS em IA, Data Science e Big Data — em paralelo à carreira, alinhando visão de negócio com engenharia de ponta.",
    en: "In 2025, I started the PUCRS MBA in AI, Data Science, and Big Data — in parallel with my career, aligning business vision with cutting-edge engineering.",
  },
  technologies: ["IA", "Data Science", "Big Data", "Estratégia de negócios"],
};

/** Destaques narrativos por experiência (storytelling para o roadmap) */
const EXPERIENCE_STORIES: Record<
  string,
  { story: { pt: string; en: string } }
> = {
  "bbr-barrarey": {
    story: {
      pt: "Meu primeiro emprego na área: único desenvolvedor da empresa. Aprendi a entregar ponta a ponta — do PHP e Python à automação do Bling ERP e à transição para React.",
      en: "My first job in the field: the company's sole developer. I learned end-to-end delivery — from PHP and Python to Bling ERP automation and the shift to React.",
    },
  },
  "devnology-scraping": {
    story: {
      pt: "Júnior por 6 meses, Pleno pelo impacto em plantões e entregas, quase Especialista em Scraping/RPA — até o layoff quando a crise jurídica da 123 Milhas derrubou o setor.",
      en: "Junior for 6 months, Mid-Level for on-call and delivery impact, almost Scraping/RPA Specialist — until layoff when the 123 Milhas legal crisis hit the sector.",
    },
  },
  gomind: {
    story: {
      pt: "Na Gomind, de Pleno RPA (MIA — automação contábil) a Tech Lead do subgrupo Baker Hughes — RPA, SAP e automação em escala.",
      en: "At Gomind, from Mid-Level RPA (MIA — accounting automation) to Tech Lead of the Baker Hughes subgroup — RPA, SAP, and automation at scale.",
    },
  },
  "grupo-domini-freelance": {
    story: {
      pt: "Freelance no Grupo Domini: Sales Bot em chat e voz para vender Gomind, MIA e o restante do portfólio — 3 meses em 2025.",
      en: "Freelance at Grupo Domini: chat and voice Sales Bot to sell Gomind, MIA, and the wider portfolio — 3 months in 2025.",
    },
  },
  "maos-livres": {
    story: {
      pt: "Desde março de 2026, a Mãos Livres automatiza processos e assume a tecnologia de outras empresas — diagnóstico gratuito em até 48h em maoslivres.com.",
      en: "Since March 2026, Mãos Livres automates processes and handles technology for other companies — free diagnosis within 48 hours at maoslivres.com.",
    },
  },
  andrinno: {
    story: {
      pt: "Em paralelo, construí APIs e microsserviços de alta concorrência na Andrinno — com PostgreSQL e Redis tunados para baixa latência.",
      en: "In parallel, I built high-concurrency APIs and microservices at Andrinno — with PostgreSQL and Redis tuned for low latency.",
    },
  },
  "devnology-lead": {
    story: {
      pt: "Voltei à Devnology como Tech Lead: squads em Go e Rust, motores anti-Akamai/Cloudflare e migração de legados para performance extrema.",
      en: "I returned to Devnology as Tech Lead: Go and Rust squads, anti-Akamai/Cloudflare engines, and legacy migrations for extreme performance.",
    },
  },
  prodia: {
    story: {
      pt: "Em abril de 2026, logo após a Mãos Livres, iniciei o Prodia — SaaS de anúncios com IA, ainda em lançamento; contato pelo Hub em maoslivres.com.",
      en: "In April 2026, right after Mãos Livres, I started Prodia — AI ads SaaS, not launched yet; reach out via the Hub at maoslivres.com.",
    },
  },
  "pop-plus": {
    story: {
      pt: "Atuei na modernização de um WMS legado de larga escala — Vue.js no front e C# (.NET) no back em ambiente crítico de vendas e estoque.",
      en: "I worked on modernizing a large-scale legacy WMS — Vue.js on the front and C# (.NET) on the back in a critical sales and inventory environment.",
    },
  },
};

function periodYearLabel(start: string, end: string | null): string {
  const startYear = start.slice(0, 4);
  const endYear = end ? end.slice(0, 4) : null;
  if (!endYear || startYear === endYear) return startYear;
  return `${startYear}–${endYear}`;
}

function experienceToMilestone(entry: ExperienceEntry): JourneyMilestone {
  const narrative = EXPERIENCE_STORIES[entry.id];
  return {
    id: `exp-${entry.id}`,
    kind: "experience",
    sortKey: entry.period.start,
    yearLabel: periodYearLabel(entry.period.start, entry.period.end),
    period: entry.period,
    title: entry.role,
    subtitle: { pt: entry.company, en: entry.company },
    story:
      narrative?.story ?? {
        pt: entry.shortDescription.pt,
        en: entry.shortDescription.en,
      },
    technologies: entry.technologies,
    experienceId: entry.id,
  };
}

export function getCareerMilestones(): JourneyMilestone[] {
  const experiences = experienceEntries.map(experienceToMilestone);
  return [ORIGIN, ...experiences, MBA_MILESTONE].sort(
    (a, b) =>
      a.sortKey.localeCompare(b.sortKey) || a.id.localeCompare(b.id),
  );
}

export function getExperienceById(id: string): ExperienceEntry | undefined {
  return experienceEntries.find((e) => e.id === id);
}
