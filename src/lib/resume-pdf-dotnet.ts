import type { Locale } from "@/components/language-provider";
import type {
  PdfExperienceItem,
  PdfFreelanceItem,
  ResumePdfPayload,
  SkillPillarGroup,
} from "@/data/resume-focus";
import { ensureActionBullet, expandAtsAcronyms } from "@/lib/resume-pdf-ats";

const DOTNET_HEADLINE = {
  pt: "Engenheiro Full Stack Sênior · .NET",
  en: "Senior Full-Stack Engineer · .NET",
} as const;

const DOTNET_SUMMARY = {
  pt: "Engenheiro full stack com mais de 3 anos de experiência em desenvolvimento back-end com C#, ASP.NET e .NET Core — APIs REST, SQL Server, Entity Framework, integrações corporativas e front-end em React/TypeScript. Histórico em WMS legado, plataforma contábil (MIA), microsserviços e ambientes de produção crítica.",
  en: "Full-stack engineer with 3+ years of back-end experience in C#, ASP.NET, and .NET Core — REST APIs, SQL Server, Entity Framework, enterprise integrations, and React/TypeScript front ends. Background in legacy WMS, accounting platform (MIA), microservices, and mission-critical production.",
} as const;

const DOTNET_STRENGTHS = {
  pt: [
    "C# & .NET Core",
    "ASP.NET Web API",
    "SQL Server",
    "React & TypeScript",
  ],
  en: [
    "C# & .NET Core",
    "ASP.NET Web API",
    "SQL Server",
    "React & TypeScript",
  ],
} as const;

const DOTNET_SKILL_PILLARS: Record<
  Locale,
  { dotnet: string; fullstack: string }
> = {
  pt: {
    dotnet: ".NET & Back-end",
    fullstack: "Full-stack & Dados",
  },
  en: {
    dotnet: ".NET & Back-end",
    fullstack: "Full-stack & Data",
  },
};

const DOTNET_SKILLS = {
  dotnet: [
    "C# (.NET)",
    "ASP.NET Core",
    ".NET Core",
    "ASP.NET Web API",
    "Entity Framework",
    "SQL Server",
    "REST APIs",
  ],
  fullstack: [
    "React.js",
    "TypeScript",
    "Node.js",
    "PostgreSQL",
    "Docker",
    "GitHub Actions",
    "CI/CD",
    "AWS",
  ],
} as const;

const DOTNET_TECH_PRIORITY = [
  "C# (.NET)",
  "ASP.NET Core",
  ".NET Core",
  "ASP.NET Web API",
  "Entity Framework",
  "SQL Server",
  "REST APIs",
  "React.js",
  "TypeScript",
  "PostgreSQL",
  "Docker",
  "Node.js",
] as const;

const MAX_DOTNET_HIGHLIGHTS = 6;

type DotnetOverlay = {
  impact?: { pt: string; en: string };
  highlights: { pt: string[]; en: string[] };
  technologies?: string[];
};

const DOTNET_OVERLAYS: Record<string, DotnetOverlay> = {
  "pop-plus": {
    impact: {
      pt: "Freelance full stack na POP+ — evolução de WMS legado em ASP.NET Core e C# com SQL Server, APIs REST, módulos financeiro/comercial e SPA Vue.js em produção crítica.",
      en: "Full-stack freelance at POP+ — legacy WMS evolution in ASP.NET Core and C# with SQL Server, REST APIs, finance/sales modules, and Vue.js SPA in mission-critical production.",
    },
    highlights: {
      pt: [
        "Mantive e evoluí APIs ASP.NET Core e controllers C# dos módulos financeiro (AP/AR), comercial e estoque.",
        "Refatorei consultas SQL Server e procedures com Entity Framework e Dapper onde performance era crítica.",
        "Corrigi bugs em Web API .NET e telas Vue.js sem downtime em ambiente legado de alto volume.",
        "Implementei testes de regressão em endpoints REST e validações de regras de negócio no back-end.",
        "Documentei contratos de API e padrões de camadas (Controller → Service → Repository) para o time.",
      ],
      en: [
        "Maintained and evolved ASP.NET Core APIs and C# controllers for finance (AP/AR), sales, and inventory modules.",
        "Refactored SQL Server queries and procedures with Entity Framework and Dapper where performance was critical.",
        "Fixed bugs in .NET Web API and Vue.js screens without downtime in a high-volume legacy environment.",
        "Implemented regression testing on REST endpoints and business-rule validation on the back end.",
        "Documented API contracts and layering patterns (Controller → Service → Repository) for the team.",
      ],
    },
    technologies: [
      "C# (.NET)",
      "ASP.NET Core",
      ".NET Core",
      "ASP.NET Web API",
      "Entity Framework",
      "SQL Server",
      "REST APIs",
      "Vue.js",
    ],
  },
  "gomind-2": {
    impact: {
      pt: "Como Tech Lead na Gomind, liderei o back-end .NET Core do MIA — APIs REST, workers financeiros, integrações SAP e SQL Server em produção crítica para escritórios contábeis.",
      en: "As Tech Lead at Gomind, I led MIA's .NET Core back end — REST APIs, financial workers, SAP integrations, and SQL Server in mission-critical production for accounting firms.",
    },
    highlights: {
      pt: [
        "Arquitetei serviços ASP.NET Core para conciliações, AP/AR e rotinas fiscais com alta confiabilidade.",
        "Implementei workers .NET para automação SAP e processamento financeiro em background.",
        "Padronizei camadas de domínio, DTOs e validações em C# com code reviews e testes automatizados.",
        "Otimizei queries SQL Server e índices para reduzir latência em relatórios críticos.",
      ],
      en: [
        "Architected ASP.NET Core services for reconciliations, AP/AR, and tax routines with high reliability.",
        "Implemented .NET workers for SAP automation and financial background processing.",
        "Standardized domain layers, DTOs, and C# validations with code reviews and automated testing.",
        "Optimized SQL Server queries and indexes to reduce latency on critical reports.",
      ],
    },
    technologies: [
      "C# (.NET)",
      "ASP.NET Core",
      ".NET Core",
      "ASP.NET Web API",
      "SQL Server",
      "Entity Framework",
      "SAP Integration",
      "REST APIs",
    ],
  },
  "gomind-1": {
    impact: {
      pt: "Como Fullstack Sênior no MIA, desenvolvi APIs ASP.NET Core e telas integradas — fluxos contábeis, REST de alto volume e SQL Server com TypeScript no front.",
      en: "As Senior Full-Stack on MIA, I built ASP.NET Core APIs and integrated screens — accounting flows, high-volume REST, and SQL Server with TypeScript on the front end.",
    },
    highlights: {
      pt: [
        "Implementei endpoints .NET Core para rotinas de accounts payable e accounts receivable.",
        "Desenvolvi integrações REST entre front-end e back-end com autenticação e tratamento de erros padronizado.",
        "Modelei entidades e migrations SQL Server com Entity Framework Core.",
        "Promovido a Tech Lead em ~3 meses por domínio técnico do produto e entregas consistentes.",
      ],
      en: [
        "Implemented .NET Core endpoints for accounts payable and accounts receivable routines.",
        "Built REST integrations between front end and back end with standardized auth and error handling.",
        "Modeled entities and SQL Server migrations with Entity Framework Core.",
        "Promoted to Tech Lead in ~3 months for product technical mastery and consistent delivery.",
      ],
    },
    technologies: [
      "C# (.NET)",
      "ASP.NET Core",
      "ASP.NET Web API",
      "Entity Framework",
      "SQL Server",
      "TypeScript",
      "REST APIs",
    ],
  },
  "gomind-0": {
    impact: {
      pt: "Como Dev RPA Pleno no MIA, evolui serviços C# .NET Core e integrações SQL Server para automação contábil — filas, workers e APIs em produção.",
      en: "As Mid-Level RPA Developer on MIA, I evolved C# .NET Core services and SQL Server integrations for accounting automation — queues, workers, and APIs in production.",
    },
    highlights: {
      pt: [
        "Desenvolvi APIs .NET para orquestração de jobs RPA e conciliações financeiras.",
        "Integrei serviços a AWS (Lambda, filas) mantendo núcleo de regras de negócio em C#.",
        "Implementei testes unitários em serviços críticos antes de deploy em produção.",
        "Promovido a Fullstack Sênior em ~6 meses por impacto em entregas back-end.",
      ],
      en: [
        "Developed .NET APIs for RPA job orchestration and financial reconciliations.",
        "Integrated services with AWS (Lambda, queues) while keeping business rules core in C#.",
        "Implemented unit tests on critical services before production deploy.",
        "Promoted to Senior Full-Stack in ~6 months for back-end delivery impact.",
      ],
    },
    technologies: [
      "C# (.NET)",
      "ASP.NET Core",
      "SQL Server",
      "Entity Framework",
      "REST APIs",
      "AWS Lambda",
    ],
  },
  "devnology-scraping-1": {
    impact: {
      pt: "Como Eng. Pleno na Devnology, mantive microsserviços .NET Core de apoio a pipelines de dados — APIs REST, SQL Server e integração com motores de extração.",
      en: "As Mid-Level Engineer at Devnology, I maintained .NET Core microservices supporting data pipelines — REST APIs, SQL Server, and integration with extraction engines.",
    },
    highlights: {
      pt: [
        "Evoluí APIs ASP.NET Core para monitoramento de jobs e reprocessamento de falhas.",
        "Implementei autenticação, logging estruturado e health checks em serviços .NET.",
        "Otimizei persistência SQL Server para alto volume de eventos operacionais.",
        "Executei testes automatizados e QA antes de releases em produção.",
      ],
      en: [
        "Evolved ASP.NET Core APIs for job monitoring and failure reprocessing.",
        "Implemented authentication, structured logging, and health checks in .NET services.",
        "Optimized SQL Server persistence for high-volume operational events.",
        "Executed automated testing and QA before production releases.",
      ],
    },
    technologies: [
      "C# (.NET)",
      "ASP.NET Core",
      "ASP.NET Web API",
      "SQL Server",
      "Entity Framework",
      "REST APIs",
      "Docker",
    ],
  },
  "devnology-scraping-0": {
    impact: {
      pt: "Como Eng. Júnior na Devnology, desenvolvi serviços C# .NET para suporte operacional a scraping — APIs internas, SQL Server e integrações REST.",
      en: "As Junior Engineer at Devnology, I built C# .NET services for operational scraping support — internal APIs, SQL Server, and REST integrations.",
    },
    highlights: {
      pt: [
        "Implementei endpoints .NET para consulta de logs e reprocessamento manual de extrações.",
        "Desenvolvi camadas de serviço em C# com validação e tratamento de exceções padronizado.",
        "Integrei APIs .NET a pipelines Python/Node em ambiente de plantão.",
        "Promovido a Pleno em 6 meses por confiabilidade das entregas back-end.",
      ],
      en: [
        "Implemented .NET endpoints for log lookup and manual extraction reprocessing.",
        "Built C# service layers with standardized validation and exception handling.",
        "Integrated .NET APIs with Python/Node pipelines in on-call environments.",
        "Promoted to Mid-Level in 6 months for back-end delivery reliability.",
      ],
    },
    technologies: [
      "C# (.NET)",
      "ASP.NET Core",
      "ASP.NET Web API",
      "SQL Server",
      "REST APIs",
    ],
  },
  "devnology-lead-0": {
    impact: {
      pt: "Como Tech Lead na Devnology, defini arquitetura de serviços .NET Core e APIs REST para squads — padrões C#, SQL Server, CI/CD e integração com motores Go/Rust.",
      en: "As Tech Lead at Devnology, I defined .NET Core service architecture and REST APIs for squads — C# standards, SQL Server, CI/CD, and integration with Go/Rust engines.",
    },
    highlights: {
      pt: [
        "Estabeleci padrões de ASP.NET Core (camadas, DTOs, injeção de dependência) para squads.",
        "Liderei code reviews e testes em APIs .NET de alto volume.",
        "Coordenei integração entre serviços .NET e motores compilados em pipelines de dados.",
        "Migrei endpoints legados para .NET Core com ganho de performance e manutenibilidade.",
      ],
      en: [
        "Established ASP.NET Core standards (layers, DTOs, dependency injection) for squads.",
        "Led code reviews and testing on high-volume .NET APIs.",
        "Coordinated integration between .NET services and compiled engines in data pipelines.",
        "Migrated legacy endpoints to .NET Core with performance and maintainability gains.",
      ],
    },
    technologies: [
      "C# (.NET)",
      "ASP.NET Core",
      ".NET Core",
      "ASP.NET Web API",
      "SQL Server",
      "Entity Framework",
      "Docker",
      "GitHub Actions",
    ],
  },
  "minha-agenda-0": {
    impact: {
      pt: "Desenvolvi o Minha Agenda (SaaS Mãos Livres) com back-end ASP.NET Core — APIs REST, Stripe, multi-tenant, SQL Server/PostgreSQL e front React/Next.js.",
      en: "I built Minha Agenda (Mãos Livres SaaS) with an ASP.NET Core back end — REST APIs, Stripe, multi-tenant, SQL Server/PostgreSQL, and React/Next.js front end.",
    },
    highlights: {
      pt: [
        "Arquitetei APIs .NET Core para agendamento, CRM, pagamentos Stripe e notificações.",
        "Implementei autenticação multi-tenant, regras por segmento e webhooks com C#.",
        "Modelei banco relacional com Entity Framework Core e migrations versionadas.",
        "Integrei back-end .NET ao front Next.js/React via REST APIs tipadas.",
      ],
      en: [
        "Architected .NET Core APIs for scheduling, CRM, Stripe payments, and notifications.",
        "Implemented multi-tenant auth, per-segment rules, and webhooks in C#.",
        "Modeled relational database with Entity Framework Core and versioned migrations.",
        "Integrated .NET back end with Next.js/React front end via typed REST APIs.",
      ],
    },
    technologies: [
      "C# (.NET)",
      "ASP.NET Core",
      "ASP.NET Web API",
      "Entity Framework",
      "SQL Server",
      "PostgreSQL",
      "React.js",
      "Next.js",
      "Stripe",
    ],
  },
  "maos-livres-0": {
    impact: {
      pt: "Fundei a Mãos Livres — site e produtos com APIs ASP.NET Core, integrações REST e front React/Next.js para diagnóstico, automação e SaaS.",
      en: "I founded Mãos Livres — website and products with ASP.NET Core APIs, REST integrations, and React/Next.js front end for diagnosis, automation, and SaaS.",
    },
    highlights: {
      pt: [
        "Desenvolvi APIs .NET Core para hub de contato, diagnóstico e orquestração de serviços.",
        "Integrei front Next.js a back-end C# com contratos REST documentados.",
        "Configurei CI/CD para build e deploy de serviços .NET e front em produção.",
      ],
      en: [
        "Built .NET Core APIs for contact hub, diagnosis, and service orchestration.",
        "Integrated Next.js front end with C# back end via documented REST contracts.",
        "Set up CI/CD for .NET services and front-end production deploys.",
      ],
    },
    technologies: [
      "C# (.NET)",
      "ASP.NET Core",
      "ASP.NET Web API",
      "React.js",
      "Next.js",
      "TypeScript",
      "AWS",
    ],
  },
  "prodia-0": {
    impact: {
      pt: "Arquiteto o Prodia (SaaS Mãos Livres) com back-end .NET Core para orquestração de LLMs — APIs REST, filas de geração e front React/Next.js.",
      en: "I architect Prodia (Mãos Livres SaaS) with a .NET Core back end for LLM orchestration — REST APIs, generation queues, and React/Next.js front end.",
    },
    highlights: {
      pt: [
        "Implementei APIs ASP.NET Core para geração de anúncios e integração com OpenAI.",
        "Modelei pipelines assíncronos em C# com filas e processamento em background.",
        "Conectei front React a serviços .NET com autenticação e rate limiting.",
      ],
      en: [
        "Implemented ASP.NET Core APIs for ad generation and OpenAI integration.",
        "Modeled async pipelines in C# with queues and background processing.",
        "Connected React front end to .NET services with authentication and rate limiting.",
      ],
    },
    technologies: [
      "C# (.NET)",
      "ASP.NET Core",
      "ASP.NET Web API",
      "Entity Framework",
      "React.js",
      "Next.js",
      "OpenAI API",
      "AWS",
    ],
  },
  "attus-bloom": {
    impact: {
      pt: "Freelance na Attus Bloom — APIs ASP.NET Core e painéis React para controle de estoque, conciliação e integrações ERP.",
      en: "Freelance at Attus Bloom — ASP.NET Core APIs and React panels for inventory control, reconciliation, and ERP integrations.",
    },
    highlights: {
      pt: [
        "Desenvolvi endpoints .NET Core para movimentações, conciliação e alertas de estoque.",
        "Integrei SQL Server e ERPs via REST com sincronização quase em tempo real.",
        "Construí dashboards React consumindo APIs C# com estados de loading e erro tratados.",
      ],
      en: [
        "Built .NET Core endpoints for movements, reconciliation, and stock alerts.",
        "Integrated SQL Server and ERPs via REST with near-real-time synchronization.",
        "Built React dashboards consuming C# APIs with handled loading and error states.",
      ],
    },
    technologies: [
      "C# (.NET)",
      "ASP.NET Core",
      "ASP.NET Web API",
      "SQL Server",
      "Entity Framework",
      "React.js",
      "TypeScript",
    ],
  },
  "grupo-domini-freelance": {
    impact: {
      pt: "Freelance no Grupo Domini — APIs ASP.NET Core para orquestração do Sales Bot (WhatsApp, voz) e integração com LLMs.",
      en: "Freelance at Grupo Domini — ASP.NET Core APIs orchestrating the Sales Bot (WhatsApp, voice) and LLM integration.",
    },
    highlights: {
      pt: [
        "Implementei serviços .NET Core para roteamento de mensagens e webhooks.",
        "Desenvolvi APIs REST para configuração de fluxos comerciais e monitoramento.",
        "Integrei C# a AWS Lambda e filas mantendo regras de negócio no back-end .NET.",
      ],
      en: [
        "Implemented .NET Core services for message routing and webhooks.",
        "Built REST APIs for commercial flow configuration and monitoring.",
        "Integrated C# with AWS Lambda and queues while keeping business rules in the .NET back end.",
      ],
    },
    technologies: [
      "C# (.NET)",
      "ASP.NET Core",
      "ASP.NET Web API",
      "AWS Lambda",
      "REST APIs",
      "LLM Integrations",
    ],
  },
  "bbr-toys-0": {
    highlights: {
      pt: [
        "Mantive e-commerce com PHP/MySQL e evoluí scripts de integração — base em desenvolvimento web antes da especialização em .NET.",
        "Promovido a Web Júnior após 1 ano por consistência nas entregas.",
      ],
      en: [
        "Maintained e-commerce with PHP/MySQL and evolved integration scripts — web development foundation before .NET specialization.",
        "Promoted to Junior Web Developer after 1 year for consistent delivery.",
      ],
    },
    technologies: ["JavaScript", "HTML/CSS", "PHP", "MySQL", "E-commerce"],
  },
  "bbr-toys-1": {
    highlights: {
      pt: [
        "Entreguei melhorias no front do e-commerce e integrações — transição posterior para stack .NET corporativa.",
        "Evoluí para engenharia de software com foco em back-end e APIs.",
      ],
      en: [
        "Delivered e-commerce front-end improvements and integrations — later transition to corporate .NET stack.",
        "Grew into software engineering with a focus on back end and APIs.",
      ],
    },
    technologies: ["JavaScript", "HTML/CSS", "PHP", "MySQL"],
  },
};

function sortDotnetTechnologies(technologies: string[]): string[] {
  const rank = new Map(
    DOTNET_TECH_PRIORITY.map((tech, index) => [tech.toLowerCase(), index]),
  );

  return [...technologies].sort((a, b) => {
    const aRank = rank.get(a.toLowerCase()) ?? 999;
    const bRank = rank.get(b.toLowerCase()) ?? 999;
    return aRank - bRank || a.localeCompare(b);
  });
}

function spinGenericDotnetOverlay(
  item: PdfExperienceItem | PdfFreelanceItem,
  locale: Locale,
): DotnetOverlay {
  return {
    impact: {
      pt: `Atuei em ${item.company} no desenvolvimento back-end com C#, ASP.NET Core e APIs REST — SQL Server, integrações e entrega full stack com React/TypeScript.`,
      en: `At ${item.company}, I worked on back-end development with C#, ASP.NET Core, and REST APIs — SQL Server, integrations, and full-stack delivery with React/TypeScript.`,
    },
    highlights: {
      pt: [
        `Desenvolvi e mantive serviços .NET Core e endpoints REST em ${item.company}.`,
        "Implementei regras de negócio em C# com testes e code reviews em produção.",
        "Integrei back-end .NET a front-end React/TypeScript e bancos relacionais.",
      ],
      en: [
        `Developed and maintained .NET Core services and REST endpoints at ${item.company}.`,
        "Implemented business rules in C# with testing and code reviews in production.",
        "Integrated .NET back end with React/TypeScript front end and relational databases.",
      ],
    },
  };
}

function applyDotnetOverlay<T extends PdfExperienceItem | PdfFreelanceItem>(
  item: T,
  locale: Locale,
): T {
  const overlay = DOTNET_OVERLAYS[item.id] ?? spinGenericDotnetOverlay(item, locale);

  const highlights =
    overlay.highlights[locale]?.map((h) => ensureActionBullet(h, locale)) ??
    item.highlights.map((h) => ensureActionBullet(h, locale));

  return {
    ...item,
    impact: expandAtsAcronyms(overlay.impact?.[locale] ?? item.impact, locale),
    highlights: highlights.slice(0, MAX_DOTNET_HIGHLIGHTS),
    technologies: sortDotnetTechnologies(
      overlay.technologies ?? item.technologies,
    ),
  };
}

function buildDotnetSkillPillars(locale: Locale): SkillPillarGroup[] {
  const labels = DOTNET_SKILL_PILLARS[locale];

  return [
    {
      key: "fullstack",
      label: labels.dotnet,
      skills: [...DOTNET_SKILLS.dotnet],
    },
    {
      key: "infra",
      label: labels.fullstack,
      skills: [...DOTNET_SKILLS.fullstack],
    },
  ];
}

function buildDotnetCareerNarrative(stepCount: number, locale: Locale): string {
  if (locale === "pt") {
    return `${stepCount} etapas documentadas — mais de 3 anos com C#, ASP.NET e .NET Core em APIs REST, SQL Server e integrações corporativas (MIA, WMS POP+, Devnology), evoluindo a full stack com React/TypeScript.`;
  }
  return `${stepCount} documented stages — 3+ years with C#, ASP.NET, and .NET Core in REST APIs, SQL Server, and enterprise integrations (MIA, POP+ WMS, Devnology), growing into full stack with React/TypeScript.`;
}

export function enrichResumePdfPayloadForDotnet(
  payload: ResumePdfPayload,
): ResumePdfPayload {
  const { locale } = payload;

  return {
    ...payload,
    headline: DOTNET_HEADLINE[locale],
    summary: DOTNET_SUMMARY[locale],
    coreStrengths: [...DOTNET_STRENGTHS[locale]],
    careerNarrative: buildDotnetCareerNarrative(
      payload.experiences.length,
      locale,
    ),
    skillPillars: buildDotnetSkillPillars(locale),
    experiences: payload.experiences.map((exp) =>
      applyDotnetOverlay(exp, locale),
    ),
    freelanceProjects: payload.freelanceProjects.map((project) =>
      applyDotnetOverlay(project, locale),
    ),
  };
}
