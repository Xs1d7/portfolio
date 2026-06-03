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

export interface ExperienceEntry {
  id: string;
  type: ExperienceType;
  /** Contrato de trabalho — apenas para vagas full-time */
  employment?: EmploymentContract;
  company: string;
  role: { pt: string; en: string };
  period: { start: string; end: string | null };
  shortDescription: { pt: string; en: string };
  overview?: { pt: string; en: string };
  fullDescription: { pt: string; en: string };
  technologies: string[];
  clients?: ExperienceClient[];
  media: MediaItem[];
  link?: string;
}

export const experienceEntries: ExperienceEntry[] = [
  {
    id: "pop-plus",
    type: "fulltime",
    employment: "pj",
    company: "POP+",
    role: {
      pt: "Engenheiro Full-Stack Sênior",
      en: "Senior Full-Stack Engineer",
    },
    period: { start: "2026-02", end: "2026-05" },
    shortDescription: {
      pt: "Modernização e evolução de um WMS legado de larga escala, com entregas full-stack em Vue.js e C# (.NET).",
      en: "Modernization and evolution of a large-scale legacy WMS, with full-stack delivery in Vue.js and C# (.NET).",
    },
    fullDescription: {
      pt: `Atuei na manutenção crítica e evolução de funcionalidades em um sistema WMS (Warehouse Management System) legado complexo, com módulos de vendas, marketing, autenticação e controle de estoque.

Principais destaques:

- **Modernização de sistema legado:** evolução de funcionalidades em ambiente de alta complexidade e escala
- **Entrega full-stack:** interfaces responsivas em Vue.js e regras de negócio seguras em C# (.NET) no backend
- **APIs REST:** integração e manutenção de serviços para suporte operacional do WMS`,
      en: `I worked on critical maintenance and feature evolution for a complex legacy Warehouse Management System (WMS), covering sales, marketing, authentication, and inventory control modules.

Key highlights:

- **Legacy system modernization:** feature evolution in a high-complexity, large-scale environment
- **Full-stack delivery:** responsive Vue.js interfaces and secure business rules in C# (.NET) on the backend
- **REST APIs:** integration and maintenance of services supporting WMS operations`,
    },
    technologies: ["C# (.NET)", "Vue.js", "SQL Server", "REST APIs"],
    clients: [{ name: "POP+", relationship: "direct" }],
    media: [],
  },
  {
    id: "prodia",
    type: "personal",
    company: "Prodia",
    role: {
      pt: "Cofundador & Arquiteto Principal de IA",
      en: "Co-founder & Lead AI Architect",
    },
    period: { start: "2025-06", end: null },
    shortDescription: {
      pt: "SaaS de IA em pré-lançamento para automatizar criação e otimização de anúncios de e-commerce com pipelines generativos e backend escalável.",
      en: "Pre-launch AI SaaS to automate creation and optimization of e-commerce product ads with generative pipelines and scalable backend.",
    },
    fullDescription: {
      pt: `Cofundei e arquitetei o Prodia, uma aplicação SaaS de alta escala focada em automatizar a criação e otimização de anúncios de vendas com alto índice de conversão para lojistas corporativos.

Principais destaques:

- **Pipelines de IA generativa:** geração de textos para anúncios com LLMs e engenharia de prompt em larga escala
- **Visão de produto:** arquitetura pensada para multiplicar ativos de vendas com baixo custo operacional
- **Backend resiliente:** infraestrutura preparada para alto volume de geração de texto e dados
- **Stack:** Go, Node.js, Python, OpenAI API, bancos vetoriais e AWS`,
      en: `I co-founded and architected Prodia, a high-scale AI SaaS application focused on automating creation and optimization of high-conversion sales ads for corporate e-commerce merchants.

Key highlights:

- **Generative AI pipelines:** ad copy generation with LLMs and prompt engineering at scale
- **Product vision:** architecture designed to multiply sales assets with minimal operational cost
- **Resilient backend:** infrastructure built for high-volume text and data generation
- **Stack:** Go, Node.js, Python, OpenAI API, vector databases, and AWS`,
    },
    technologies: [
      "Go",
      "Node.js",
      "Python",
      "OpenAI API",
      "Vector Databases",
      "AWS",
      "LLM Orchestration",
    ],
    media: [],
  },
  {
    id: "devnology-lead",
    type: "fulltime",
    employment: "pj",
    company: "Devnology",
    role: {
      pt: "Tech Lead / Engenheiro de Automação Avançada",
      en: "Tech Lead / Advanced Automation Engineer",
    },
    period: { start: "2025-03", end: "2026-03" },
    shortDescription: {
      pt: "Liderança técnica de squads e motores de scraping em Go/Rust com engenharia reversa para contornar Akamai, Cloudflare e CAPTCHA.",
      en: "Technical leadership of squads and Go/Rust scraping engines with reverse engineering to bypass Akamai, Cloudflare, and CAPTCHA.",
    },
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
    id: "maos-livres",
    type: "personal",
    company: "Mãos Livres",
    role: {
      pt: "Fundador & Tech Lead",
      en: "Founder & Tech Lead",
    },
    period: { start: "2024-01", end: null },
    shortDescription: {
      pt: "Agência e hub digital de automação: ERP ATTUS, motor de frete multicanal e gestão preditiva de estoque integrada ao Tiny ERP.",
      en: "Automation agency and digital hub: ATTUS ERP, multichannel freight engine, and predictive inventory synced with Tiny ERP.",
    },
    fullDescription: {
      pt: `Fundei a Mãos Livres como agência especializada em eliminar gargalos operacionais manuais para clientes corporativos por meio de arquitetura personalizada.

Principais destaques:

- **ERP ATTUS:** microsserviços híbridos com NestJS, PHP, PostgreSQL e AWS (EC2 / S3)
- **Motor de frete:** cálculo multicanal com APIs do Mercado Livre, AWS e Google Cloud, com filas e rate-limiting rigoroso
- **Gestão preditiva de estoque:** conciliação em tempo real com Tiny ERP e alertas de reabastecimento baseados em histórico de vendas
- **Consultoria:** automação estratégica para escalar margens e eficiência operacional`,
      en: `I founded Mãos Livres as an agency focused on eliminating manual operational bottlenecks for corporate clients through custom architecture.

Key highlights:

- **ATTUS ERP:** hybrid microservices with NestJS, PHP, PostgreSQL, and AWS (EC2 / S3)
- **Freight engine:** multichannel calculation with Mercado Livre and AWS APIs, Google Cloud, queues, and strict rate limiting
- **Predictive inventory:** real-time reconciliation with Tiny ERP and replenishment alerts based on sales history
- **Consulting:** strategic automation to scale margins and operational efficiency`,
    },
    technologies: [
      "NestJS",
      "TypeScript",
      "PHP",
      "PostgreSQL",
      "AWS",
      "Google Cloud",
      "Mercado Livre API",
      "Tiny ERP",
    ],
    media: [],
  },
  {
    id: "gomind",
    type: "fulltime",
    employment: "pj",
    company: "Gomind",
    role: {
      pt: "Tech Lead / Engenheiro de Software Sênior",
      en: "Tech Lead / Senior Software Engineer",
    },
    period: { start: "2023-10", end: "2025-01" },
    shortDescription: {
      pt: "Trajetória contínua na Gomind (antes Grupo Domini): orquestrador AWS, agente de vendas com IA, promoção a Tech Lead e automação SAP após transferência interna.",
      en: "Continuous journey at Gomind (formerly Grupo Domini): AWS orchestrator, AI sales agent, promotion to Tech Lead, and SAP automation after an internal transfer.",
    },
    fullDescription: {
      pt: `Iniciei no Grupo Domini (posteriormente integrado à trajetória Gomind), fui promovido a Tech Lead em seis meses e, após transferência estratégica, assumi a liderança da equipe de backend e automação na Gomind.

Principais destaques:

- **Orquestrador AWS:** Lambda, EventBridge, API Gateway, SQS e EC2 para agendamento de bots, com redução drástica de custos de infraestrutura
- **Agente de vendas com IA:** WhatsApp integrado a LLMs e sistemas internos para automatizar conversões
- **Liderança de squad:** code reviews, mentoria e decisões arquiteturais em operações de alto volume
- **Automação SAP:** workers integrados ao ERP SAP para fluxos financeiros e logísticos de clientes corporativos
- **Performance:** redução de latência em processamento pesado em segundo plano e menos erros operacionais manuais`,
      en: `I started at Grupo Domini (later part of the Gomind journey), was promoted to Tech Lead within six months, and after a strategic transfer took over backend and automation team leadership at Gomind.

Key highlights:

- **AWS orchestrator:** Lambda, EventBridge, API Gateway, SQS, and EC2 for bot scheduling with major infrastructure cost reduction
- **AI sales agent:** WhatsApp integrated with LLMs and internal systems to automate conversions
- **Squad leadership:** code reviews, mentoring, and architectural decisions for high-volume operations
- **SAP automation:** workers integrated with SAP ERP for corporate financial and logistics flows
- **Performance:** lower latency for heavy background processing and fewer manual operational errors`,
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
    id: "andrinno",
    type: "freelance",
    company: "Andrinno Software House",
    role: {
      pt: "Engenheiro de Backend Sênior",
      en: "Senior Backend Engineer",
    },
    period: { start: "2024-03", end: "2024-10" },
    shortDescription: {
      pt: "APIs RESTful escaláveis, microsserviços de alta concorrência e tuning de PostgreSQL e Redis.",
      en: "Scalable REST APIs, high-concurrency microservices, and PostgreSQL and Redis performance tuning.",
    },
    fullDescription: {
      pt: `Construí e mantive APIs RESTful escaláveis e microsserviços preparados para altos volumes de requisições concorrentes.

Principais destaques:

- **APIs e microsserviços:** arquitetura backend para cargas concorrentes elevadas
- **Bancos de dados:** modelagem relacional e não relacional com tuning de queries e indexação
- **Baixa latência:** otimização de respostas em cenários de alto throughput`,
      en: `I built and maintained scalable RESTful APIs and microservices designed for high concurrent request volumes.

Key highlights:

- **APIs and microservices:** backend architecture for heavy concurrent loads
- **Databases:** relational and non-relational modeling with query and indexing tuning
- **Low latency:** response optimization under high-throughput scenarios`,
    },
    technologies: [
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
    id: "devnology-scraping",
    type: "fulltime",
    employment: "pj",
    company: "Devnology",
    role: {
      pt: "Especialista em Scraping de Dados e Automação",
      en: "Data Scraping & Automation Specialist",
    },
    period: { start: "2021-01", end: "2023-10" },
    shortDescription: {
      pt: "Web scrapers resilientes em larga escala, pipelines de dados e contorno de detecção de bots para clientes corporativos do setor de viagens.",
      en: "Large-scale resilient web scrapers, data pipelines, and bot-detection bypass for corporate travel-sector clients.",
    },
    fullDescription: {
      pt: `Especializei-me na construção de scrapers velozes e pipelines de dados para grandes clientes corporativos, com regras estritas de performance e resiliência.

Principais destaques:

- **Extração em larga escala:** coleta massiva de dados sob alta concorrência
- **Contorno de bots:** engenharia reversa em barreiras de frontend e rede (anti-bot avançado)
- **Automação:** Puppeteer, Selenium e scripts Python/JavaScript em produção
- **Cloud:** deploy e operação com AWS`,
      en: `I specialized in building fast scrapers and data pipelines for large corporate clients, with strict performance and resilience requirements.

Key highlights:

- **Large-scale extraction:** massive data collection under high concurrency
- **Bot bypass:** reverse engineering of frontend and network barriers (advanced anti-bot)
- **Automation:** Puppeteer, Selenium, and Python/JavaScript scripts in production
- **Cloud:** deployment and operations on AWS`,
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
    id: "bbr-barrarey",
    type: "fulltime",
    employment: "clt",
    company: "BBR / Barrarey",
    role: {
      pt: "Desenvolvedor de Software Júnior (Desenvolvedor Único)",
      en: "Junior Software Developer (Sole Developer)",
    },
    period: { start: "2019-07", end: "2021-01" },
    shortDescription: {
      pt: "Único desenvolvedor da empresa: e-commerce, automação Bling ERP em Python e transição do frontend para React.js.",
      en: "Company's sole developer: e-commerce, Bling ERP automation in Python, and frontend transition to React.js.",
    },
    fullDescription: {
      pt: `Atuei como o único desenvolvedor, com responsabilidade ponta a ponta sobre produtos digitais, manutenção e deploy.

Principais destaques:

- **Autonomia total:** gestão completa do ciclo de desenvolvimento
- **Automação Bling ERP:** scripts Python para sincronização em tempo real e otimização operacional
- **Web e e-commerce:** sites institucionais em PHP e evolução para React.js
- **Banco de dados:** modelagem e operação com MySQL`,
      en: `I worked as the sole developer with end-to-end ownership of digital products, maintenance, and deployment.

Key highlights:

- **Full autonomy:** complete ownership of the development lifecycle
- **Bling ERP automation:** Python scripts for real-time sync and operational optimization
- **Web and e-commerce:** institutional sites in PHP and evolution toward React.js
- **Database:** modeling and operations with MySQL`,
    },
    technologies: ["Python", "PHP", "React.js", "JavaScript", "Bling ERP", "MySQL"],
    clients: [{ name: "BBR / Barrarey", relationship: "direct" }],
    media: [],
  },
];
