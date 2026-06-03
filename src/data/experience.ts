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
  period: { start: string; end: string | null };
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
}

export const experienceEntries: ExperienceEntry[] = [
  {
    id: "maos-livres",
    type: "personal",
    company: "Mãos Livres",
    role: {
      pt: "Fundador & Tech Lead",
      en: "Founder & Tech Lead",
    },
    period: { start: "2026-03", end: null },
    recruiterImpact: {
      pt: "Empresa de automação e software sob medida: assumo a tecnologia de outras empresas para eliminar trabalho repetitivo e acelerar a operação.",
      en: "Custom automation and software company: I own the technology side for other businesses to remove repetitive work and speed up operations.",
    },
    shortDescription: {
      pt: "Automação, software e produtos — tecnologia sob medida para tirar o repetitivo da operação de outras empresas (desde mar/2026).",
      en: "Automation, software, and products — tailored technology to take repetitive work off other companies' operations (since Mar 2026).",
    },
    overview: {
      pt: `Fundei a **Mãos Livres** em **março de 2026** — **automação, software e produtos** para empresas que precisam de tecnologia sem montar um time interno.

**Tecnologia sob medida** para tirar o repetitivo da sua operação. No **[maoslivres.com](https://maoslivres.com)** a empresa recebe o desafio do cliente e, em **até 48h**, retorna com **diagnóstico gratuito** e próximos passos — automação, software ou produto, conforme o que fizer sentido.`,
      en: `I founded **Mãos Livres** in **March 2026** — **automation, software, and products** for companies that need technology without building an in-house team.

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
    company: "Prodia",
    role: {
      pt: "Cofundador do Produto & Arquiteto Principal de IA",
      en: "Product Co-founder & Lead AI Architect",
    },
    period: { start: "2026-04", end: null },
    shortDescription: {
      pt: "Produto do portfólio (abr/2026) — SaaS de anúncios com IA, iniciado logo após a Mãos Livres (mar/2026); em desenvolvimento.",
      en: "Portfolio product (Apr 2026) — AI ads SaaS, started right after Mãos Livres (Mar 2026); in development.",
    },
    overview: {
      pt: `O **Prodia** é um **produto independente** do portfólio da Mãos Livres: SaaS de **criação e otimização de anúncios** com IA generativa, **iniciado em abril de 2026** — um mês após a fundação da empresa (março). O produto **ainda não foi lançado**; dúvidas e parcerias pelo **Hub de contato** em **[maoslivres.com](https://maoslivres.com)**.`,
      en: `**Prodia** is a **standalone product** in the Mãos Livres portfolio: a SaaS for **creating and optimizing ads** with generative AI, **started in April 2026** — one month after the company was founded (March). The product **has not launched yet**; inquiries and partnerships via the **contact Hub** at **[maoslivres.com](https://maoslivres.com)**.`,
    },
    fullDescription: {
      pt: `Arquitetei e cofundei o **Prodia** em **abril de 2026**, logo após criar a **Mãos Livres** — produto de anúncios separado das entregas de consultoria e automação da empresa.

Principais destaques:

- **Foco em anúncios:** textos e ativos de venda com alto índice de conversão para lojistas
- **Pipelines de IA generativa:** LLMs e engenharia de prompt em larga escala
- **Backend escalável:** preparado para alto volume de geração de conteúdo
- **Stack:** Go, Node.js, Python, OpenAI API, bancos vetoriais e AWS`,
      en: `I architected and co-founded **Prodia** in **April 2026**, right after launching **Mãos Livres** — an ads product separate from the company's consulting and automation work.

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
    id: "gomind",
    type: "fulltime",
    employment: "pj",
    company: "Gomind",
    role: {
      pt: "Dev Pleno RPA → Sênior · Tech Lead",
      en: "Mid-Level RPA Dev → Senior · Tech Lead",
    },
    period: { start: "2023-10", end: "2025-01" },
    recruiterImpact: {
      pt: "Três evoluções na Gomind (out/2023–jan/2025): Pleno RPA com atuação no MIA (automação contábil), Sênior e Tech Lead do subgrupo Baker Hughes — RPA e automação SAP em produção.",
      en: "Three progressions at Gomind (Oct 2023–Jan 2025): Mid-Level RPA on MIA (accounting automation), Senior, and Tech Lead of the Baker Hughes subgroup — production RPA and SAP automation.",
    },
    shortDescription: {
      pt: "Três etapas na Gomind (out/2023–jan/2025): Pleno RPA, Sênior e Tech Lead — produto MIA (automação contábil) e entregas para Baker Hughes.",
      en: "Three stages at Gomind (Oct 2023–Jan 2025): Mid-Level RPA, Senior, and Tech Lead — MIA product (accounting automation) and Baker Hughes deliveries.",
    },
    tenures: [
      {
        company: "Gomind",
        role: {
          pt: "Desenvolvedor Pleno RPA",
          en: "Mid-Level RPA Developer",
        },
        period: { start: "2023-10", end: "2024-08" },
        highlight: {
          pt: "Ingresso em outubro de 2023, logo após a Devnology. Automação e orquestração de processos críticos, com atuação no **MIA** — produto da Gomind para **automatizar processos de contabilidade**.",
          en: "Joined in October 2023, right after Devnology. Automation and orchestration of critical processes, including work on **MIA** — Gomind's product to **automate accounting processes**.",
        },
      },
      {
        company: "Gomind",
        role: {
          pt: "Desenvolvedor Sênior",
          en: "Senior Developer",
        },
        period: { start: "2024-09", end: "2024-10" },
        highlight: {
          pt: "Nova evolução por entregas e qualidade técnica nas frentes de RPA e automação em escala.",
          en: "Further advancement through delivery impact and technical quality across RPA and large-scale automation.",
        },
      },
      {
        company: "Gomind",
        role: { pt: "Tech Lead", en: "Tech Lead" },
        period: { start: "2024-11", end: "2025-01" },
        highlight: {
          pt: "Liderança de subgrupo que orquestrava entregas para a Baker Hughes; automação SAP, mentoria e code reviews.",
          en: "Led a subgroup orchestrating deliveries for Baker Hughes; SAP automation, mentoring, and code reviews.",
        },
      },
    ],
    fullDescription: {
      pt: `Permanência na **Gomind** com evolução contínua de cargo (veja roadmap acima).

**MIA (produto Gomind)**

- Plataforma focada em **automatizar processos de contabilidade** — conciliações, rotinas fiscais e fluxos repetitivos do escritório contábil
- Integrações, orquestração e IA aplicada onde reduz trabalho manual

**Outros destaques técnicos**

- Automação SAP com workers para fluxos financeiros e logísticos (Baker Hughes)
- Orquestração e integrações em ambiente de alto volume (Lambda, filas, APIs)
- Redução de latência e erros em processamento em segundo plano`,
      en: `Tenure at **Gomind** with continuous role progression (see roadmap above).

**MIA (Gomind product)**

- Platform focused on **automating accounting processes** — reconciliations, tax routines, and repetitive accounting-firm workflows
- Integrations, orchestration, and AI where it removes manual work

**Other technical highlights**

- SAP automation with workers for financial and logistics flows (Baker Hughes)
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
    clients: [
      { name: "Gomind", relationship: "direct" },
      { name: "Baker Hughes", relationship: "indirect" },
    ],
    media: [],
  },
  {
    id: "grupo-domini-freelance",
    type: "freelance",
    company: "Grupo Domini",
    role: {
      pt: "Engenheiro de IA · Sales Bot (Chat & Voz)",
      en: "AI Engineer · Sales Bot (Chat & Voice)",
    },
    period: { start: "2025-02", end: "2025-04" },
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
    company: "Andrinno Software House",
    role: {
      pt: "Engenheiro de Backend Sênior",
      en: "Senior Backend Engineer",
    },
    period: { start: "2024-03", end: "2024-10" },
    shortDescription: {
      pt: "Freelance (2024) para empresa parceira — APIs escaláveis, microsserviços de alta concorrência e tuning de PostgreSQL e Redis.",
      en: "Freelance (2024) for a partner company — scalable APIs, high-concurrency microservices, and PostgreSQL and Redis tuning.",
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
    employment: "clt",
    company: "Devnology",
    role: {
      pt: "Desenvolvedor Júnior → Pleno · Scraping & RPA",
      en: "Junior → Mid-Level Developer · Scraping & RPA",
    },
    period: { start: "2022-09", end: "2023-09" },
    recruiterImpact: {
      pt: "Promovido de Júnior a Pleno em 6 meses por impacto em plantões e entregas; trajetória até quase Especialista em Scraping/RPA.",
      en: "Promoted from Junior to Mid-Level in 6 months for on-call and delivery impact; path toward Scraping/RPA Specialist.",
    },
    exitReason: {
      pt: "Saída em setembro de 2023 por layoff após a crise jurídica da 123 Milhas — desligamento estrutural do setor, não por desempenho.",
      en: "Left in September 2023 due to layoff after the 123 Milhas legal crisis — sector-wide restructuring, not performance-related.",
    },
    shortDescription: {
      pt: "1 ano na Devnology (set/2022–set/2023): 6 meses como Júnior e 7 meses como Pleno — promoção por impacto em plantões e entregas.",
      en: "1 year at Devnology (Sep 2022–Sep 2023): 6 months as Junior and 7 months as Mid-Level — promoted for on-call and delivery impact.",
    },
    tenures: [
      {
        company: "Devnology",
        role: {
          pt: "Desenvolvedor Júnior",
          en: "Junior Developer",
        },
        period: { start: "2022-09", end: "2023-02" },
        highlight: {
          pt: "Web scraping, automação e suporte a clientes do setor de viagens (123 Milhas e MaxMilhas, via Devnology).",
          en: "Web scraping, automation, and support for travel-sector clients (123 Milhas and MaxMilhas, via Devnology).",
        },
      },
      {
        company: "Devnology",
        role: {
          pt: "Desenvolvedor Pleno",
          en: "Mid-Level Developer",
        },
        period: { start: "2023-03", end: "2023-09" },
        highlight: {
          pt: "Promovido após 6 meses pelo impacto no desenvolvimento, plantões e entregas. Prestes a assumir Especialista em Web Scraping e RPA quando um layoff no setor (crise jurídica da 123 Milhas) encerrou a operação em setembro de 2023.",
          en: "Promoted after 6 months for development impact, on-call rotations, and deliveries. About to become Scraping/RPA Specialist when a sector layoff (123 Milhas legal crisis) ended the operation in September 2023.",
        },
      },
    ],
    fullDescription: {
      pt: `Primeira passagem na Devnology — **permanência de 1 ano** (set/2022 a set/2023), com evolução explícita de Júnior para Pleno (veja datas acima). Em outubro de 2023 iniciei no Grupo Domini/Gomind.

**Destaques técnicos**

- Extração em larga escala com alta concorrência
- Engenharia reversa e contorno de anti-bots (frontend e rede)
- Puppeteer, Selenium, Python, JavaScript e operação na AWS`,
      en: `First stint at Devnology — **1 year total** (Sep 2022 to Sep 2023), with a clear Junior-to-Mid-Level progression (see dates above). I joined Grupo Domini/Gomind in October 2023.

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
    id: "bbr-barrarey",
    type: "fulltime",
    employment: "clt",
    company: "BBR / Barrarey",
    role: {
      pt: "Desenvolvedor de Software Júnior (Desenvolvedor Único)",
      en: "Junior Software Developer (Sole Developer)",
    },
    period: { start: "2019-07", end: "2021-01" },
    recruiterImpact: {
      pt: "Primeiro emprego na área como desenvolvedor único — autonomia ponta a ponta em e-commerce, automação ERP e evolução do stack para React.",
      en: "First industry role as the sole developer — end-to-end ownership across e-commerce, ERP automation, and stack evolution toward React.",
    },
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
