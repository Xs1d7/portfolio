export interface MediaItem {
  type: "image" | "video";
  src: string;
  alt?: string;
  poster?: string;
}

export type ExperienceType = "personal" | "fulltime" | "freelance";

export const TYPE_BADGE: Record<ExperienceType, string> = {
  personal:
    "bg-sky-500/10 text-sky-700 ring-1 ring-sky-500/20 dark:text-sky-400",
  fulltime:
    "bg-emerald-500/10 text-emerald-600 ring-1 ring-emerald-500/20 dark:text-emerald-400",
  freelance:
    "bg-amber-500/10 text-amber-600 ring-1 ring-amber-500/20 dark:text-amber-400",
};

export type EmploymentContract = "clt" | "pj";

export const EMPLOYMENT_BADGE: Record<EmploymentContract, string> = {
  clt: "bg-blue-500/10 text-blue-700 ring-1 ring-blue-500/20 dark:text-blue-400",
  pj: "bg-indigo-500/10 text-indigo-700 ring-1 ring-indigo-500/20 dark:text-indigo-400",
};

export type ClientRelationship = "direct" | "indirect";

export interface ExperienceClient {
  name: string;
  relationship: ClientRelationship;
}

/** Etapa de cargo com período explícito (empresa + senioridade + datas). */
export interface CareerTenure {
  company: string;
  role: { pt: string; en: string };
  period: { start: string; end: string | null };
  highlight?: { pt: string; en: string };
}

export interface ExperienceEntry {
  id: string;
  type: ExperienceType;
  /** Contrato de trabalho — apenas para vagas full-time */
  employment?: EmploymentContract;
  company: string;
  role: { pt: string; en: string };
  /** Período de calendário — carreira CLT/PJ/pessoal. Freelances não usam. */
  period?: { start: string; end: string | null };
  shortDescription: { pt: string; en: string };
  overview?: { pt: string; en: string };
  fullDescription: { pt: string; en: string };
  /** Evolução de cargos com duração por empresa (exibido no detalhe). */
  tenures?: CareerTenure[];
  /** Linha de impacto para recrutadores (PDF e resumos). */
  recruiterImpact?: { pt: string; en: string };
  /** Motivo da saída, quando relevante (ex.: layoff estrutural). */
  exitReason?: { pt: string; en: string };
  technologies: string[];
  clients?: ExperienceClient[];
  media: MediaItem[];
  link?: string;
  /** Freelance: tempo de produção do projeto (sem datas de calendário na UI). */
  productionDuration?: { pt: string; en: string };
  /** Ordem de exibição na seção Freelances (menor = primeiro). */
  freelanceOrder?: number;
  /** Exibir na Jornada (default: true para carreira; false para freelas e Prodia). */
  includeInJourney?: boolean;
}

export interface ExperienceSelection {
  entry: ExperienceEntry;
  tenureIndex: number | null;
}

export function getCareerEntries(): ExperienceEntry[] {
  return experienceEntries.filter((e) => e.type !== "freelance");
}

export function getFreelanceEntries(): ExperienceEntry[] {
  return experienceEntries
    .filter(
      (e) => e.type === "freelance" && e.id !== "grupo-domini-freelance",
    )
    .sort(
      (a, b) =>
        (a.freelanceOrder ?? 99) - (b.freelanceOrder ?? 99) ||
        a.id.localeCompare(b.id),
    );
}

export function getJourneyEntries(): ExperienceEntry[] {
  return experienceEntries.filter(
    (e) =>
      e.type !== "freelance" &&
      e.includeInJourney !== false &&
      !e.id.endsWith("-freelance"),
  );
}

export const experienceEntries: ExperienceEntry[] = [
  {
    id: "maos-livres",
    type: "personal",
    company: "Mãos Livres",
    period: { start: "2026-04", end: null },
    role: {
      pt: "Proprietário",
      en: "Owner",
    },
    tenures: [
      {
        company: "Mãos Livres",
        role: { pt: "Proprietário", en: "Owner" },
        period: { start: "2026-04", end: null },
        highlight: {
          pt: "Fundação do projeto solo em abril/2026 — automação, software e produtos sob medida para outras empresas, com diagnóstico gratuito em até 48h em maoslivres.com.",
          en: "Founded the solo venture in April 2026 — custom automation, software, and products for other companies, with a free 48-hour diagnosis at maoslivres.com.",
        },
      },
    ],
    recruiterImpact: {
      pt: "Empresa de automação e software sob medida: assumo a tecnologia de outras empresas para eliminar trabalho repetitivo e acelerar a operação.",
      en: "Custom automation and software company: I own the technology side for other businesses to remove repetitive work and speed up operations.",
    },
    shortDescription: {
      pt: "Automação, software e produtos — tecnologia sob medida para tirar o repetitivo da operação de outras empresas (desde abr/2026).",
      en: "Automation, software, and products — tailored technology to take repetitive work off other companies' operations (since Apr 2026).",
    },
    overview: {
      pt: `Fundei a **Mãos Livres** em **abril de 2026** — **automação, software e produtos** para empresas que precisam de tecnologia sem montar um time interno.

**Tecnologia sob medida** para tirar o repetitivo da sua operação. No **[maoslivres.com](https://maoslivres.com)** a empresa recebe o desafio do cliente e, em **até 48h**, retorna com **diagnóstico gratuito** e próximos passos — automação, software ou produto, conforme o que fizer sentido.`,
      en: `I founded **Mãos Livres** in **April 2026** — **automation, software, and products** for companies that need technology without building an in-house team.

**Tailored technology** to remove repetitive work from your operation. At **[maoslivres.com](https://maoslivres.com)** clients share their challenge and receive a **free diagnosis within 48 hours** with next steps — automation, software, or product, whichever fits best.`,
    },
    fullDescription: {
      pt: `A Mãos Livres existe para **automatizar processos** e **cuidar da parte de tecnologia** de outras empresas — do diagnóstico à entrega.

**Como trabalhamos**

- O cliente descreve o desafio operacional ou de sistemas
- Em **até 48 horas** devolvemos **diagnóstico gratuito** e plano de ação
- A solução pode ser **automação** (RPA, integrações, bots), **software sob medida** (APIs, painéis, backends) ou **produto** digital, conforme o caso

**Foco da atuação**

- Eliminar tarefas manuais e repetitivas em operações, financeiro, vendas e back-office
- Integrações entre ERPs, planilhas, WhatsApp, e-commerce e ferramentas do dia a dia
- Arquitetura e implementação ponta a ponta — sem depender de equipe técnica interna do cliente`,
      en: `Mãos Livres exists to **automate processes** and **own the technology side** for other companies — from diagnosis to delivery.

**How we work**

- The client describes their operational or systems challenge
- Within **48 hours** we return a **free diagnosis** and action plan
- The solution may be **automation** (RPA, integrations, bots), **custom software** (APIs, dashboards, backends), or a digital **product**, as appropriate

**What we focus on**

- Removing manual, repetitive work across operations, finance, sales, and back office
- Integrations across ERPs, spreadsheets, WhatsApp, e-commerce, and everyday tools
- End-to-end architecture and implementation — without requiring an in-house tech team at the client`,
    },
    technologies: [
      "Automação de Processos",
      "RPA",
      "Integrações & APIs",
      "Node.js",
      "TypeScript",
      "Python",
      "AWS",
      "IA / LLMs",
    ],
    link: "https://maoslivres.com",
    media: [],
  },
  {
    id: "prodia",
    type: "personal",
    includeInJourney: false,
    company: "Prodia",
    role: {
      pt: "Cofundador do Produto & Arquiteto Principal de IA",
      en: "Product Co-founder & Lead AI Architect",
    },
    period: { start: "2026-05", end: null },
    tenures: [
      {
        company: "Prodia",
        role: {
          pt: "Cofundador do Produto & Arquiteto Principal de IA",
          en: "Product Co-founder & Lead AI Architect",
        },
        period: { start: "2026-05", end: null },
        highlight: {
          pt: "Início em maio/2026, logo após a Mãos Livres — arquitetura do SaaS de anúncios com IA generativa (produto ainda em lançamento).",
          en: "Started in May 2026, right after Mãos Livres — architecture of the AI ads SaaS (product not launched yet).",
        },
      },
    ],
    shortDescription: {
      pt: "Produto do portfólio (mai/2026) — SaaS de anúncios com IA, iniciado logo após a Mãos Livres (abr/2026); em desenvolvimento.",
      en: "Portfolio product (May 2026) — AI ads SaaS, started right after Mãos Livres (Apr 2026); in development.",
    },
    overview: {
      pt: `O **Prodia** é um **produto independente** do portfólio da Mãos Livres: SaaS de **criação e otimização de anúncios** com IA generativa, **iniciado em maio de 2026** — logo após a fundação da empresa (abril). O produto **ainda não foi lançado**; dúvidas e parcerias pelo **Hub de contato** em **[maoslivres.com](https://maoslivres.com)**.`,
      en: `**Prodia** is a **standalone product** in the Mãos Livres portfolio: a SaaS for **creating and optimizing ads** with generative AI, **started in May 2026** — right after the company was founded (April). The product **has not launched yet**; inquiries and partnerships via the **contact Hub** at **[maoslivres.com](https://maoslivres.com)**.`,
    },
    fullDescription: {
      pt: `Arquitetei e cofundei o **Prodia** em **maio de 2026**, logo após criar a **Mãos Livres** — produto de anúncios separado das entregas de consultoria e automação da empresa.

Principais destaques:

- **Foco em anúncios:** textos e ativos de venda com alto índice de conversão para lojistas
- **Pipelines de IA generativa:** LLMs e engenharia de prompt em larga escala
- **Backend escalável:** preparado para alto volume de geração de conteúdo
- **Stack:** Go, Node.js, Python, OpenAI API, bancos vetoriais e AWS`,
      en: `I architected and co-founded **Prodia** in **May 2026**, right after launching **Mãos Livres** — an ads product separate from the company's consulting and automation work.

Key highlights:

- **Ads-first:** high-conversion sales copy and assets for merchants
- **Generative AI pipelines:** LLMs and prompt engineering at scale
- **Scalable backend:** built for high-volume content generation
- **Stack:** Go, Node.js, Python, OpenAI API, vector databases, and AWS`,
    },
    clients: [{ name: "Mãos Livres", relationship: "direct" }],
    technologies: [
      "Go",
      "Node.js",
      "Python",
      "OpenAI API",
      "Vector Databases",
      "AWS",
      "LLM Orchestration",
    ],
    link: "https://maoslivres.com",
    media: [],
  },
  {
    id: "pop-plus",
    type: "freelance",
    includeInJourney: false,
    freelanceOrder: 2,
    company: "POP+",
    role: {
      pt: "Engenheiro Full-Stack · Manutenção de Legado",
      en: "Full-Stack Engineer · Legacy Maintenance",
    },
    productionDuration: { pt: "3 meses", en: "3 months" },
    recruiterImpact: {
      pt: "Freelance de 3 meses em WMS legado — manutenção crítica nos módulos financeiro, comercial, marketing e estoque.",
      en: "3-month freelance on a legacy WMS — critical maintenance across finance, sales, marketing, and inventory modules.",
    },
    shortDescription: {
      pt: "Manutenção em sistema legado de larga escala — módulos financeiro, comercial, marketing e estoque (Vue.js e C# .NET).",
      en: "Maintenance on a large-scale legacy system — finance, sales, marketing, and inventory modules (Vue.js and C# .NET).",
    },
    fullDescription: {
      pt: `Projeto freelance de **3 meses** na **POP+** — **manutenção e evolução** de um WMS legado que cobre toda a operação do negócio.

**Módulos atendidos**

- **Financeiro:** rotinas contábeis, conciliações e relatórios críticos em produção
- **Comercial:** fluxos de vendas, precificação e integrações com canais
- **Marketing:** campanhas, promoções e regras de negócio no back-office
- **Estoque:** controle de inventário, movimentações e sincronização operacional

**Entregas**

- Correções e evoluções full-stack em **Vue.js** (front) e **C# (.NET)** (back)
- Manutenção de **APIs REST** e **SQL Server** sem interromper a operação
- Estabilização de funcionalidades legadas em ambiente de alta criticidade`,
      en: `A **3-month freelance** project at **POP+** — **maintenance and evolution** of a legacy WMS spanning the entire business operation.

**Modules covered**

- **Finance:** accounting routines, reconciliations, and critical production reports
- **Sales:** sales flows, pricing, and channel integrations
- **Marketing:** campaigns, promotions, and back-office business rules
- **Inventory:** stock control, movements, and operational synchronization

**Deliverables**

- Full-stack fixes and enhancements in **Vue.js** (front) and **C# (.NET)** (back)
- **REST API** and **SQL Server** maintenance without disrupting operations
- Legacy feature stabilization in a mission-critical environment`,
    },
    technologies: ["C# (.NET)", "Vue.js", "SQL Server", "REST APIs"],
    clients: [{ name: "POP+", relationship: "direct" }],
    media: [],
  },
  {
    id: "devnology-lead",
    type: "fulltime",
    employment: "pj",
    company: "Devnology",
    role: {
      pt: "Líder Técnico",
      en: "Tech Lead",
    },
    period: { start: "2025-01", end: "2026-03" },
    recruiterImpact: {
      pt: "Segunda passagem na Devnology (jan/2025–mar/2026): liderança técnica de squads em extração de dados, Go/Rust e engenharia reversa em escala.",
      en: "Second stint at Devnology (Jan 2025–Mar 2026): technical leadership of data-extraction squads, Go/Rust, and reverse engineering at scale.",
    },
    shortDescription: {
      pt: "Volta à Devnology como Líder Técnico (jan/2025–mar/2026) — squads, Go/Rust e engenharia reversa em escala.",
      en: "Return to Devnology as Tech Lead (Jan 2025–Mar 2026) — squads, Go/Rust, and reverse engineering at scale.",
    },
    tenures: [
      {
        company: "Devnology",
        role: { pt: "Líder Técnico", en: "Tech Lead" },
        period: { start: "2025-01", end: "2026-03" },
        highlight: {
          pt: "Recontratado após a Gomind para liderar squads de extração de dados — motores em Go/Rust, contorno de Akamai/Cloudflare e migração de legados para performance extrema.",
          en: "Rehired after Gomind to lead data-extraction squads — Go/Rust engines, Akamai/Cloudflare bypass, and legacy migrations for extreme performance.",
        },
      },
    ],
    fullDescription: {
      pt: `Retornei à Devnology para liderar squads técnicas e a arquitetura de projetos de elite em extração de dados e engenharia reversa.

Principais destaques:

- **Liderança técnica:** definição de arquitetura, padrões e qualidade em squads de engenharia
- **Engenharia reversa avançada:** motores em Go e Rust otimizados para contornar Akamai, Cloudflare e CAPTCHA
- **Alta performance:** migração de legados para linguagens compiladas com latência ultra-baixa e máxima concorrência
- **Operação em escala:** pipelines sob volumes massivos de dados com uso eficiente de CPU e recursos`,
      en: `I returned to Devnology to lead technical squads and architecture for elite data extraction and reverse-engineering projects.

Key highlights:

- **Technical leadership:** architecture, standards, and quality across engineering squads
- **Advanced reverse engineering:** Go and Rust engines optimized to bypass Akamai, Cloudflare, and CAPTCHA
- **High performance:** migration of legacy systems to compiled languages for ultra-low latency and maximum concurrency
- **Scale operations:** pipelines under massive data volumes with efficient CPU and resource utilization`,
    },
    technologies: [
      "Go",
      "Rust",
      "Python",
      "Puppeteer",
      "Playwright",
      "Reverse Engineering",
      "AWS",
      "Docker",
    ],
    clients: [
      { name: "Devnology", relationship: "direct" },
      { name: "123 Milhas", relationship: "indirect" },
      { name: "MaxMilhas", relationship: "indirect" },
    ],
    media: [],
  },
  {
    id: "gomind",
    type: "fulltime",
    employment: "pj",
    company: "Gomind",
    role: {
      pt: "Líder Técnico",
      en: "Tech Lead",
    },
    period: { start: "2023-11", end: "2025-01" },
    recruiterImpact: {
      pt: "Três evoluções na Gomind (nov/2023–jan/2025): Pleno RPA no MIA (automação contábil), Fullstack Sênior e Líder Técnico — RPA, SAP e automação em produção.",
      en: "Three progressions at Gomind (Nov 2023–Jan 2025): Mid-Level RPA on MIA (accounting automation), Senior Full-Stack, and Tech Lead — RPA, SAP, and production automation.",
    },
    shortDescription: {
      pt: "Três etapas na Gomind (nov/2023–jan/2025): Pleno RPA, Fullstack Sênior e Líder Técnico — produto MIA (automação contábil).",
      en: "Three stages at Gomind (Nov 2023–Jan 2025): Mid-Level RPA, Senior Full-Stack, and Tech Lead — MIA product (accounting automation).",
    },
    tenures: [
      {
        company: "Gomind",
        role: {
          pt: "Desenvolvedor RPA Pleno",
          en: "Mid-Level RPA Developer",
        },
        period: { start: "2023-11", end: "2024-05" },
        highlight: {
          pt: "**Realizado:** automação RPA e orquestração no **MIA** (automação contábil), integrações AWS e entregas em processos críticos. **Evolução:** promoção a Fullstack Sênior após ~6 meses por volume de entregas, domínio do produto e impacto técnico nas integrações.",
          en: "**Delivered:** RPA automation and orchestration on **MIA** (accounting automation), AWS integrations, and critical process deliveries. **Growth:** promoted to Senior Full-Stack after ~6 months for delivery volume, product mastery, and integration impact.",
        },
      },
      {
        company: "Gomind",
        role: {
          pt: "Desenvolvedor Fullstack Sênior",
          en: "Senior Full-Stack Developer",
        },
        period: { start: "2024-05", end: "2024-08" },
        highlight: {
          pt: "**Realizado:** frentes fullstack além do RPA, evolução do MIA e integrações de alto volume. **Evolução:** promoção a Líder Técnico após ~3 meses por liderança informal, qualidade de código e confiança da empresa em conduzir subgrupo.",
          en: "**Delivered:** full-stack work beyond RPA, MIA evolution, and high-volume integrations. **Growth:** promoted to Tech Lead after ~3 months for informal leadership, code quality, and company trust to run a subgroup.",
        },
      },
      {
        company: "Gomind",
        role: { pt: "Líder Técnico", en: "Tech Lead" },
        period: { start: "2024-08", end: "2025-01" },
        highlight: {
          pt: "**Realizado:** liderança de subgrupo, automação SAP, mentoria e code reviews em produção. **Saída:** retorno à Devnology em janeiro/2025 como Líder Técnico em projeto de maior escala técnica.",
          en: "**Delivered:** subgroup leadership, SAP automation, mentoring, and production code reviews. **Exit:** returned to Devnology in January 2025 as Tech Lead on a larger-scale technical project.",
        },
      },
    ],
    fullDescription: {
      pt: `Permanência na **Gomind** com evolução contínua de cargo (veja roadmap acima).

**MIA (produto Gomind)**

- Plataforma focada em **automatizar processos de contabilidade** — conciliações, rotinas fiscais e fluxos repetitivos do escritório contábil
- Integrações, orquestração e IA aplicada onde reduz trabalho manual

**Outros destaques técnicos**

- Automação SAP com workers para fluxos financeiros e logísticos
- Orquestração e integrações em ambiente de alto volume (Lambda, filas, APIs)
- Redução de latência e erros em processamento em segundo plano`,
      en: `Tenure at **Gomind** with continuous role progression (see roadmap above).

**MIA (Gomind product)**

- Platform focused on **automating accounting processes** — reconciliations, tax routines, and repetitive accounting-firm workflows
- Integrations, orchestration, and AI where it removes manual work

**Other technical highlights**

- SAP automation with workers for financial and logistics flows
- Orchestration and integrations in high-volume environments (Lambda, queues, APIs)
- Lower latency and fewer errors in background processing`,
    },
    technologies: [
      "Node.js",
      "TypeScript",
      "Python",
      "AWS Lambda",
      "SQS",
      "EventBridge",
      "API Gateway",
      "Docker",
      "Redis",
      "PostgreSQL",
      "SAP Integration",
      "SQL Server",
      "LLM Integrations",
    ],
    clients: [{ name: "Gomind", relationship: "direct" }],
    media: [],
  },
  {
    id: "grupo-domini-freelance",
    type: "freelance",
    includeInJourney: false,
    company: "Grupo Domini",
    role: {
      pt: "Engenheiro de IA · Sales Bot (Chat & Voz)",
      en: "AI Engineer · Sales Bot (Chat & Voice)",
    },
    productionDuration: { pt: "3 meses", en: "3 months" },
    recruiterImpact: {
      pt: "Freelance de 3 meses: Sales Bot omnicanal (chat e ligações) para vender o portfólio do Grupo Domini — incluindo a Gomind e o MIA (automação contábil).",
      en: "3-month freelance: omnichannel Sales Bot (chat and voice calls) to sell Grupo Domini's portfolio — including Gomind and MIA (accounting automation).",
    },
    shortDescription: {
      pt: "Freelance (fev–abr/2025): criação de Sales Bot em chat e voz para vender produtos do Grupo Domini, entre eles a Gomind e o MIA.",
      en: "Freelance (Feb–Apr 2025): built chat and voice Sales Bots to sell Grupo Domini products, including Gomind and MIA.",
    },
    fullDescription: {
      pt: `Projeto freelance de **3 meses** para o **Grupo Domini**, focado em um **Sales Bot** com dois canais:

- **Chat bot:** conversação para qualificar leads e apresentar o portfólio
- **Call bot:** ligações automatizadas com o mesmo objetivo comercial

**Produtos vendidos pelo bot**

- **Gomind** e o **MIA** — solução de **automação de processos contábeis** — entre outras ofertas do grupo

**Entregas**

- Arquitetura do orquestrador serverless na **AWS** (Lambda, EventBridge, API Gateway, SQS)
- **Agente de vendas com IA** no WhatsApp e fluxos de voz — orquestração de LLMs e integrações com mensagem e telefonia
- Protótipo e evolução iterativa com foco em conversão e clareza do discurso comercial`,
      en: `A **3-month freelance** project for **Grupo Domini**, focused on a **Sales Bot** across two channels:

- **Chat bot:** conversation to qualify leads and present the portfolio
- **Call bot:** automated calls with the same commercial goal

**Products sold through the bot**

- **Gomind** and **MIA** — **accounting process automation** — among other group offerings

**Deliverables**

- Serverless **AWS** orchestrator architecture (Lambda, EventBridge, API Gateway, SQS)
- **AI sales agent** on WhatsApp and voice flows — LLM orchestration and messaging/telephony integrations
- Iterative prototype evolution focused on conversion and clear commercial messaging`,
    },
    technologies: [
      "Node.js",
      "TypeScript",
      "Python",
      "LLM Integrations",
      "WhatsApp API",
      "Telefonia / Voz",
      "AWS Lambda",
      "EventBridge",
      "API Gateway",
      "SQS",
    ],
    clients: [{ name: "Grupo Domini", relationship: "direct" }],
    media: [],
  },
  {
    id: "andrinno",
    type: "freelance",
    includeInJourney: false,
    freelanceOrder: 1,
    company: "Andrinno Software House",
    role: {
      pt: "Especialista em Automação Web · Líder Técnico",
      en: "Web Automation Specialist · Technical Lead",
    },
    productionDuration: { pt: "7 meses", en: "7 months" },
    recruiterImpact: {
      pt: "Freelance de 7 meses: automação web para companhias aéreas — contratado como especialista; liderei 4 devs até a entrega.",
      en: "7-month freelance: web automation for airlines — hired as a specialist; led 4 developers through delivery.",
    },
    shortDescription: {
      pt: "Automação web de sites de companhias aéreas — contratado como especialista; liderei time de 4 devs na entrega das soluções.",
      en: "Web automation for airline company sites — hired as a specialist; led a team of 4 developers to delivery.",
    },
    fullDescription: {
      pt: `Projeto freelance de **7 meses** na **Andrinno Software House** — contratado como **especialista em automação web** para o setor de **companhias aéreas**, um dos nichos mais exigentes em scraping, anti-bot e alta concorrência.

**Papel**

- **Liderança técnica** de um time de **4 desenvolvedores** — arquitetura, code review e priorização de entregas
- Referência técnica pela experiência prévia em extração de alta concorrência

**Entregas**

- Automação de extração e integração com portais de companhias aéreas em produção
- Pipelines resilientes com tratamento de bloqueios, rate-limit e falhas intermitentes
- APIs e microsserviços para **alto volume de requisições concorrentes**
- Tuning de **PostgreSQL** e **Redis** para baixa latência sob carga`,
      en: `A **7-month freelance** project at **Andrinno Software House** — hired as a **web automation specialist** for the **airline** sector, one of the most demanding niches in scraping, anti-bot, and high concurrency.

**Role**

- **Technical leadership** of a **4-developer team** — architecture, code review, and delivery prioritization
- Technical reference based on prior experience in high-concurrency extraction

**Deliverables**

- Automation of extraction and integration with airline portals in production
- Resilient pipelines handling blocks, rate limits, and intermittent failures
- APIs and microservices for **high concurrent request volumes**
- **PostgreSQL** and **Redis** tuning for low latency under load`,
    },
    technologies: [
      "Web Scraping",
      "Python",
      "Node.js",
      "TypeScript",
      "Fastify",
      "Docker",
      "PostgreSQL",
      "Redis",
    ],
    clients: [{ name: "Andrinno Software House", relationship: "direct" }],
    media: [],
  },
  {
    id: "attus-bloom",
    type: "freelance",
    includeInJourney: false,
    freelanceOrder: 3,
    company: "Attus Bloom",
    role: {
      pt: "Engenheiro de Software · Sistema de Estoque",
      en: "Software Engineer · Inventory System",
    },
    productionDuration: {
      pt: "~2 meses (múltiplas entregas)",
      en: "~2 months (multiple engagements)",
    },
    recruiterImpact: {
      pt: "Freelance em sistema de controle de estoque — múltiplas entregas ao longo do tempo para compor a plataforma atual.",
      en: "Freelance inventory control system — multiple engagements over time to build the current platform.",
    },
    shortDescription: {
      pt: "Sistema de controle de estoque — conciliação, movimentações e alertas; prestei serviço mais de uma vez para compor a plataforma atual.",
      en: "Inventory control system — reconciliation, movements, and alerts; multiple engagements to build the current platform.",
    },
    fullDescription: {
      pt: `Projeto freelance na **Attus Bloom** — **sistema de controle de estoque** para dar visibilidade e previsibilidade à operação. Atuei em **mais de uma entrega** ao longo do tempo, cada ciclo com foco em evoluir a plataforma até o estado atual.

**Entregas**

- Modelagem e implementação de fluxos de **entrada, saída e conciliação** de estoque
- Integrações com ERPs e planilhas para sincronização em tempo quase real
- **Alertas de reabastecimento** e relatórios para o time operacional
- APIs e painéis para acompanhamento do inventário sem depender de processos manuais`,
      en: `Freelance project at **Attus Bloom** — an **inventory control system** to give operations visibility and predictability. I worked across **multiple engagements** over time, each cycle focused on evolving the platform to its current state.

**Deliverables**

- Modeling and implementation of **inbound, outbound, and reconciliation** stock flows
- Integrations with ERPs and spreadsheets for near-real-time synchronization
- **Replenishment alerts** and reports for the operations team
- APIs and dashboards for inventory tracking without manual processes`,
    },
    technologies: [
      "Node.js",
      "TypeScript",
      "PostgreSQL",
      "Integrações ERP",
      "APIs REST",
    ],
    clients: [{ name: "Attus Bloom", relationship: "direct" }],
    media: [],
  },
  {
    id: "beleza-tal",
    type: "freelance",
    includeInJourney: false,
    freelanceOrder: 4,
    company: "Beleza & Tal",
    role: {
      pt: "Engenheiro de Automação & IA",
      en: "Automation & AI Engineer",
    },
    productionDuration: { pt: "~2 meses", en: "~2 months" },
    recruiterImpact: {
      pt: "Freelance: automação de reposição e análise de vendas por IA via plataforma Google.",
      en: "Freelance: replenishment automation and AI-powered sales analysis on the Google platform.",
    },
    shortDescription: {
      pt: "Automação do sistema de reposição e análise de vendas por IA via plataforma Google.",
      en: "Replenishment automation and AI-powered sales analysis via the Google platform.",
    },
    fullDescription: {
      pt: `Projeto freelance para **Beleza & Tal** — automação da **reposição de produtos** e **análise de vendas** com apoio de IA.

**Entregas**

- Pipeline de **análise de vendas** com modelos de IA para identificar tendências e rupturas
- Automação de **sugestões de reposição** com base em histórico e sazonalidade
- Integração com **Google Cloud** e planilhas operacionais usadas pelo time comercial
- Redução de trabalho manual na leitura de dados e tomada de decisão de estoque`,
      en: `Freelance project for **Beleza & Tal** — **product replenishment** automation and **sales analysis** powered by AI.

**Deliverables**

- **Sales analysis** pipeline with AI models to identify trends and stockouts
- **Replenishment suggestion** automation based on history and seasonality
- Integration with **Google Cloud** and operational spreadsheets used by the sales team
- Less manual work reading data and making inventory decisions`,
    },
    technologies: [
      "Python",
      "Google Cloud",
      "IA / LLMs",
      "Automação",
      "Planilhas / APIs",
    ],
    clients: [{ name: "Beleza & Tal", relationship: "direct" }],
    media: [],
  },
  {
    id: "contmais",
    type: "freelance",
    includeInJourney: false,
    freelanceOrder: 5,
    company: "ContMais",
    role: {
      pt: "Desenvolvedor Web",
      en: "Web Developer",
    },
    productionDuration: { pt: "~2 meses", en: "~2 months" },
    recruiterImpact: {
      pt: "Freelance: sites WordPress/Elementor e gestão de domínios no Registro.br para a ContMais.",
      en: "Freelance: WordPress/Elementor sites and Registro.br domain management for ContMais.",
    },
    shortDescription: {
      pt: "Criação de websites com WordPress e Elementor; manutenção de domínios no Registro.br conforme solicitado pela empresa.",
      en: "WordPress and Elementor website builds; Registro.br domain maintenance as requested by the company.",
    },
    fullDescription: {
      pt: `Projeto freelance para a **ContMais** — criação e manutenção de presença digital.

**Entregas**

- **Websites** com **WordPress** e **Elementor** — layout, conteúdo e publicação
- Manutenção de **domínios no Registro.br** conforme solicitado pela empresa
- Acompanhamento de **vencimento e renovação** de domínios para evitar indisponibilidade
- Suporte pontual a ajustes visuais e atualizações de conteúdo`,
      en: `Freelance project for **ContMais** — building and maintaining their digital presence.

**Deliverables**

- **Websites** with **WordPress** and **Elementor** — layout, content, and publishing
- **Registro.br domain** maintenance as requested by the company
- Tracking **expiration and renewal** dates to prevent downtime
- Ad-hoc support for visual tweaks and content updates`,
    },
    technologies: ["WordPress", "Elementor", "PHP", "Registro.br", "HTML/CSS"],
    clients: [{ name: "ContMais", relationship: "direct" }],
    media: [],
  },
  {
    id: "barrarey-freelance",
    type: "freelance",
    includeInJourney: false,
    freelanceOrder: 6,
    company: "Barrarey",
    role: {
      pt: "Desenvolvedor de Automação",
      en: "Automation Developer",
    },
    productionDuration: { pt: "~2 meses", en: "~2 months" },
    recruiterImpact: {
      pt: "Freelance na Barrarey: automação de etiquetas e otimização da embalagem — listas de pedidos AWS e Bling (Python/PHP).",
      en: "Freelance at Barrarey: label printing automation and packing optimization — AWS and Bling order lists (Python/PHP).",
    },
    shortDescription: {
      pt: "Automação de impressão de etiquetas e otimização da operação de embalagem — listas de pedidos AWS e Bling em Python e PHP.",
      en: "Label printing automation and packing workflow optimization — AWS and Bling order lists in Python and PHP.",
    },
    fullDescription: {
      pt: `Projeto freelance na **Barrarey** — automação operacional do fluxo de **impressão de etiquetas** e **embalagem de pedidos**.

**Entregas**

- Sistema de **impressão automatizada de etiquetas** para expedição
- **Listas de pedidos** que ajudavam o time de embalagem a processar pedidos da **AWS** e do **Bling** sem se perder na operação
- Scripts em **Python** e **PHP** para sincronização e geração de filas de trabalho
- Redução de erros manuais e ganho de velocidade no picking e packing`,
      en: `Freelance project at **Barrarey** — operational automation for **label printing** and **order packing** workflows.

**Deliverables**

- **Automated label printing** system for shipping
- **Order lists** helping the packing team process **AWS** and **Bling** orders without losing track in operations
- **Python** and **PHP** scripts for synchronization and work-queue generation
- Fewer manual errors and faster picking and packing`,
    },
    technologies: ["Python", "PHP", "Bling ERP", "AWS", "MySQL", "Automação"],
    clients: [{ name: "Barrarey", relationship: "direct" }],
    media: [],
  },
  {
    id: "devnology-scraping",
    type: "fulltime",
    employment: "clt",
    company: "Devnology",
    role: {
      pt: "Engenheiro de Software Pleno",
      en: "Mid-Level Software Engineer",
    },
    period: { start: "2022-09", end: "2023-09" },
    recruiterImpact: {
      pt: "Primeira passagem na Devnology (set/2022–set/2023): Júnior a Pleno em 6 meses por impacto em plantões e entregas em scraping e RPA.",
      en: "First stint at Devnology (Sep 2022–Sep 2023): Junior to Mid-Level in 6 months for on-call and delivery impact in scraping and RPA.",
    },
    exitReason: {
      pt: "Saída em setembro de 2023 por layoff após a crise jurídica da 123 Milhas — desligamento estrutural do setor, não por desempenho.",
      en: "Left in September 2023 due to layoff after the 123 Milhas legal crisis — sector-wide restructuring, not performance-related.",
    },
    shortDescription: {
      pt: "1 ano na Devnology (set/2022–set/2023): 6 meses como Eng. Júnior e 7 meses como Eng. Pleno — promoção por plantões e entregas.",
      en: "1 year at Devnology (Sep 2022–Sep 2023): 6 months as Junior Engineer and 7 months as Mid-Level — promoted for on-call and delivery impact.",
    },
    tenures: [
      {
        company: "Devnology",
        role: {
          pt: "Engenheiro de Software Júnior",
          en: "Junior Software Engineer",
        },
        period: { start: "2022-09", end: "2023-02" },
        highlight: {
          pt: "**Realizado:** web scraping, automação e suporte a 123 Milhas/MaxMilhas (via Devnology) — plantões e entregas em extração de alta concorrência. **Evolução:** promoção a Pleno após 6 meses pelo impacto em desenvolvimento, confiabilidade em produção e resolução de incidentes.",
          en: "**Delivered:** web scraping, automation, and support for 123 Milhas/MaxMilhas (via Devnology) — on-call and high-concurrency extraction. **Growth:** promoted to Mid-Level after 6 months for development impact, production reliability, and incident resolution.",
        },
      },
      {
        company: "Devnology",
        role: {
          pt: "Engenheiro de Software Pleno",
          en: "Mid-Level Software Engineer",
        },
        period: { start: "2023-02", end: "2023-09" },
        highlight: {
          pt: "**Realizado:** liderança técnica informal em scraping/RPA, engenharia reversa e operação AWS. **Saída:** layoff em set/2023 pela crise da 123 Milhas — desligamento estrutural, não por desempenho; prestes a assumir Especialista em Scraping/RPA.",
          en: "**Delivered:** informal technical leadership in scraping/RPA, reverse engineering, and AWS operations. **Exit:** layoff in Sep 2023 due to the 123 Milhas crisis — structural, not performance-related; about to become Scraping/RPA Specialist.",
        },
      },
    ],
    fullDescription: {
      pt: `Primeira passagem na Devnology — **permanência de 1 ano** (set/2022 a set/2023), com evolução de Júnior para Pleno (veja roadmap acima). Em novembro de 2023 iniciei na Gomind.

**Destaques técnicos**

- Extração em larga escala com alta concorrência
- Engenharia reversa e contorno de anti-bots (frontend e rede)
- Puppeteer, Selenium, Python, JavaScript e operação na AWS`,
      en: `First stint at Devnology — **1 year total** (Sep 2022 to Sep 2023), with Junior-to-Mid-Level progression (see roadmap above). I joined Gomind in November 2023.

**Technical highlights**

- Large-scale extraction under high concurrency
- Reverse engineering and anti-bot bypass (frontend and network)
- Puppeteer, Selenium, Python, JavaScript, and AWS operations`,
    },
    technologies: [
      "Python",
      "JavaScript",
      "Puppeteer",
      "Selenium",
      "Web Scraping",
      "AWS",
    ],
    clients: [
      { name: "Devnology", relationship: "direct" },
      { name: "123 Milhas", relationship: "indirect" },
      { name: "MaxMilhas", relationship: "indirect" },
    ],
    media: [],
  },
  {
    id: "bbr-toys",
    type: "fulltime",
    employment: "clt",
    company: "BBR Toys",
    role: {
      pt: "Desenvolvedor Web Júnior",
      en: "Junior Web Developer",
    },
    period: { start: "2021-08", end: "2022-10" },
    recruiterImpact: {
      pt: "Primeiro emprego formal na área (ago/2021–out/2022): de Aprendiz a Web Júnior em e-commerce e desenvolvimento web.",
      en: "First formal industry role (Aug 2021–Oct 2022): from Apprentice to Junior Web Developer in e-commerce and web development.",
    },
    shortDescription: {
      pt: "BBR Toys (ago/2021–out/2022): Aprendiz (ago/21–ago/22) e Web Júnior (ago–out/22) — e-commerce e desenvolvimento web.",
      en: "BBR Toys (Aug 2021–Oct 2022): Apprentice (Aug 21–Aug 22) and Junior Web Developer (Aug–Oct 22) — e-commerce and web development.",
    },
    tenures: [
      {
        company: "BBR Toys",
        role: {
          pt: "Desenvolvedor Aprendiz",
          en: "Apprentice Developer",
        },
        period: { start: "2021-08", end: "2022-08" },
        highlight: {
          pt: "**Realizado (ago/2021–ago/2022):** suporte ao e-commerce, manutenção de sites e aprendizado prático em PHP, JavaScript e MySQL. **Evolução:** promoção a Web Júnior após 1 ano pela consistência nas entregas e autonomia crescente no front-end da loja.",
          en: "**Delivered (Aug 2021–Aug 2022):** e-commerce support, site maintenance, and hands-on PHP, JavaScript, and MySQL. **Growth:** promoted to Junior Web Developer after 1 year for consistent deliveries and growing front-end autonomy.",
        },
      },
      {
        company: "BBR Toys",
        role: {
          pt: "Desenvolvedor Web Júnior",
          en: "Junior Web Developer",
        },
        period: { start: "2022-08", end: "2022-10" },
        highlight: {
          pt: "**Realizado (3 meses):** entregas em front-end e integrações do e-commerce com maior responsabilidade. **Saída:** transição para a Devnology em setembro/2022 como Engenheiro de Software Júnior.",
          en: "**Delivered (3 months):** front-end work and e-commerce integrations with greater ownership. **Exit:** moved to Devnology in September 2022 as Junior Software Engineer.",
        },
      },
    ],
    fullDescription: {
      pt: `Carreira na **BBR Toys** (ago/2021–out/2022): **Aprendiz** de ago/2021 a ago/2022 e **Web Júnior** de ago a out/2022 (veja cada etapa acima).

**Destaques**

- E-commerce: manutenção, melhorias e integrações da loja online
- Desenvolvimento web com **PHP**, **JavaScript** e **MySQL**
- Base sólida para a carreira em scraping, automação e engenharia de software`,
      en: `Career at **BBR Toys** (Aug 2021–Oct 2022): **Apprentice** from Aug 2021 to Aug 2022 and **Junior Web Developer** from Aug to Oct 2022 (see each stage above).

**Highlights**

- E-commerce: maintenance, improvements, and online store integrations
- Web development with **PHP**, **JavaScript**, and **MySQL**
- Strong foundation for a career in scraping, automation, and software engineering`,
    },
    technologies: ["PHP", "JavaScript", "MySQL", "HTML/CSS", "E-commerce"],
    clients: [{ name: "BBR Toys", relationship: "direct" }],
    media: [],
  },
];
