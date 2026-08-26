import type { Locale } from "@/components/language-provider";
import type {
  PdfExperienceItem,
  PdfFreelanceItem,
  ResumePdfPayload,
  SkillPillarGroup,
} from "@/data/resume-focus";
import { ensureActionBullet, expandAtsAcronyms } from "@/lib/resume-pdf-ats";

const RPA_HEADLINE = {
  pt: "Especialista em Automação & RPA Sênior",
  en: "Senior Automation & RPA Specialist",
} as const;

const RPA_SUMMARY = {
  pt: "Especialista em automação avançada e hyperautomation — orquestração distribuída de workers e bots, filas com Dead Letter Queue (DLQ), logs centralizados para auditoria, integração SAP, scraping em larga escala e agentes de IA/LLMs em fluxos RPA. Histórico em Gomind (MIA), Devnology e projetos freelance com foco em ROI operacional, governança e sustentação em produção crítica.",
  en: "Specialist in advanced automation and hyperautomation — distributed worker and bot orchestration, Dead Letter Queue (DLQ) pipelines, centralized audit logs, SAP integration, large-scale scraping, and AI/LLM agents in RPA flows. Track record at Gomind (MIA), Devnology, and freelance projects focused on operational ROI, governance, and mission-critical sustainment.",
} as const;

const RPA_STRENGTHS = {
  pt: [
    "Orquestração & Governança",
    "RPA & Hyperautomation",
    "ROI Operacional",
    "Produção crítica",
  ],
  en: [
    "Orchestration & Governance",
    "RPA & Hyperautomation",
    "Operational ROI",
    "Mission-critical ops",
  ],
} as const;

const RPA_SKILL_PILLARS: Record<
  Locale,
  { automation: string; orchestration: string }
> = {
  pt: {
    automation: "Automação & RPA",
    orchestration: "Orquestração & Cloud",
  },
  en: {
    automation: "Automation & RPA",
    orchestration: "Orchestration & Cloud",
  },
};

const RPA_SKILLS = {
  automation: [
    "Web Scraping & RPA",
    "Python",
    "Node.js",
    "SAP Integration",
    "REST APIs",
    "Puppeteer",
    "Playwright",
  ],
  orchestration: [
    "AWS Lambda",
    "SQS",
    "EventBridge",
    "Docker",
    "GitHub Actions",
    "CI/CD",
    "LLM Integrations",
  ],
} as const;

const RPA_TECH_PRIORITY = [
  "Web Scraping & RPA",
  "Python",
  "AWS Lambda",
  "SQS",
  "SAP Integration",
  "LLM Integrations",
  "Node.js",
  "Docker",
  "GitHub Actions",
  "CI/CD",
  "REST APIs",
  "Go",
  "Rust",
] as const;

const MAX_RPA_HIGHLIGHTS = 6;

const MAOS_LIVRES_PRODUCT_BASE_IDS = new Set(["minha-agenda", "prodia"]);

type RpaOverlay = {
  impact?: { pt: string; en: string };
  highlights: { pt: string[]; en: string[] };
  technologies?: string[];
};

const RPA_OVERLAYS: Record<string, RpaOverlay> = {
  "roboteasy-0": {
    impact: {
      pt: "Arquiteto de Software de IA na Roboteasy (desde 27/jul/2026) — entregas contínuas e apoio ao backend Java Spring em grande refatoração, em um time organizado; mudança para Santa Catarina em 27/set/2026.",
      en: "AI Software Architect at Roboteasy (since 27 Jul 2026) — ongoing deliveries and Java Spring backend support on a large-scale refactor, in an organized team; relocating to Santa Catarina on 27 Sep 2026.",
    },
    highlights: {
      pt: [
        "Entreguei evoluções contínuas no backend Java Spring durante uma grande refatoração em produção.",
        "Prestei apoio técnico ao time de backend nos primeiros meses, acelerando entregas em um ambiente organizado.",
        "Integrei visão de arquitetura de IA com a sustentação do backend Java Spring.",
      ],
      en: [
        "Delivered ongoing Java Spring backend improvements during a large-scale production refactor.",
        "Provided backend support in the first months, accelerating deliveries in an organized environment.",
        "Integrated AI software architecture with Java Spring backend sustainment.",
      ],
    },
    technologies: ["Java", "Spring", "Spring Boot", "REST APIs", "IA / LLMs"],
  },
  "gomind-2": {
    impact: {
      pt: "Como Líder Técnico na Gomind, governei a sustentação do MIA — dezenas de fluxos RPA contábeis em produção com orquestração de workers, DLQ para reprocessamento, logs centralizados e integração de agentes de IA/LLMs para classificação semântica de documentos fiscais.",
      en: "As Tech Lead at Gomind, I governed MIA sustainment — dozens of accounting RPA flows in production with worker orchestration, DLQ reprocessing, centralized logs, and AI/LLM agent integration for semantic classification of tax documents.",
    },
    highlights: {
      pt: [
        "Desenhei arquitetura de orquestração distribuída de bots com filas SQS, Dead Letter Queues e reprocessamento automático em falhas.",
        "Implementei logs centralizados e trilhas de auditoria para dezenas de robôs simultâneos no MIA — rastreabilidade ponta a ponta.",
        "Integrei agentes de Inteligência Artificial e LLMs aos fluxos RPA para análise semântica de documentos fiscais e classificação inteligente de dados operacionais.",
        "Liderei automação SAP com workers financeiros, reduzindo esforço manual de squads parceiras e mitigando erros em produção.",
        "Padronizei QA, testes de regressão e pipeline CI/CD (GitHub Actions, Docker) para deploy seguro em AWS Lambda.",
      ],
      en: [
        "Designed distributed bot orchestration architecture with SQS queues, Dead Letter Queues, and automatic failure reprocessing.",
        "Implemented centralized logs and audit trails for dozens of concurrent robots on MIA — end-to-end traceability.",
        "Integrated AI agents and LLMs into RPA flows for semantic analysis of tax documents and intelligent operational data classification.",
        "Led SAP automation with financial workers, reducing manual effort for partner squads and mitigating production errors.",
        "Standardized QA, regression testing, and CI/CD pipelines (GitHub Actions, Docker) for safe AWS Lambda deploys.",
      ],
    },
    technologies: [
      "Python",
      "Node.js",
      "AWS Lambda",
      "SQS",
      "EventBridge",
      "SAP Integration",
      "LLM Integrations",
      "Docker",
      "GitHub Actions",
      "CI/CD",
    ],
  },
  "gomind-1": {
    impact: {
      pt: "Como Fullstack Sênior no MIA, evolui integrações REST API de alto volume e automações contábeis — plataforma focada em reduzir esforço operacional manual de escritórios parceiros e acelerar conciliações AP/AR.",
      en: "As Senior Full-Stack on MIA, I evolved high-volume REST API integrations and accounting automations — platform focused on reducing manual operational effort for partner firms and accelerating AP/AR reconciliations.",
    },
    highlights: {
      pt: [
        "Desenvolvi orquestração de workers para processamento financeiro em background com filas e retry visível ao time contábil.",
        "Implementei integrações REST API de alto volume com tratamento de falhas, reprocessamento e monitoramento de latência.",
        "Conectei fluxos RPA a pipelines AWS (Lambda, SQS) mantendo governança de estados e logs por job.",
        "Promovido a Líder Técnico em ~3 meses por liderança informal, QA em code reviews e entregas consistentes.",
      ],
      en: [
        "Built worker orchestration for financial background processing with queues and accounting-team-visible retry.",
        "Implemented high-volume REST API integrations with failure handling, reprocessing, and latency monitoring.",
        "Connected RPA flows to AWS pipelines (Lambda, SQS) with job-level state governance and logging.",
        "Promoted to Tech Lead in ~3 months for informal leadership, QA in code reviews, and consistent delivery.",
      ],
    },
    technologies: [
      "Node.js",
      "TypeScript",
      "Python",
      "REST APIs",
      "AWS Lambda",
      "SQS",
      "PostgreSQL",
      "Docker",
    ],
  },
  "gomind-0": {
    impact: {
      pt: "Como Dev RPA Pleno no MIA, desenvolvi plataforma de automação contábil e fiscal — fluxos AP/AR, conciliações e rotinas fiscais com integrações AWS, reduzindo trabalho manual repetitivo de squads parceiras.",
      en: "As Mid-Level RPA Developer on MIA, I built an accounting and tax automation platform — AP/AR flows, reconciliations, and tax routines with AWS integrations, reducing repetitive manual work for partner squads.",
    },
    highlights: {
      pt: [
        "Automatizei processos de accounts payable (AP) e accounts receivable (AR) com orquestração de jobs e acompanhamento em tempo real.",
        "Implementei integrações REST API e filas AWS para processamento assíncrono de rotinas contábeis em produção.",
        "Configurei pipeline CI/CD com Docker e testes antes de deploy — reduzindo regressões em ambiente crítico.",
        "Promovido a Fullstack Sênior em ~6 meses por volume de entregas RPA e impacto técnico no produto MIA.",
      ],
      en: [
        "Automated accounts payable (AP) and accounts receivable (AR) processes with job orchestration and real-time tracking.",
        "Implemented REST API integrations and AWS queues for asynchronous processing of accounting routines in production.",
        "Set up CI/CD pipelines with Docker and testing before deploy — reducing regressions in a critical environment.",
        "Promoted to Senior Full-Stack in ~6 months for RPA delivery volume and technical impact on the MIA product.",
      ],
    },
    technologies: [
      "Python",
      "Node.js",
      "REST APIs",
      "AWS Lambda",
      "SQS",
      "Docker",
      "GitHub Actions",
      "CI/CD",
    ],
  },
  "devnology-lead-0": {
    impact: {
      pt: "Como Líder Técnico na Devnology, governei squads de extração e automação em escala — motores Go/Rust de alta concorrência, orquestração distribuída de workers, DLQ e migração de legados para throughput extremo sob volumes massivos.",
      en: "As Tech Lead at Devnology, I governed extraction and automation squads at scale — high-concurrency Go/Rust engines, distributed worker orchestration, DLQ, and legacy migrations for extreme throughput under massive volumes.",
    },
    highlights: {
      pt: [
        "Desenhei arquitetura para orquestração distribuída de bots de extração, garantindo resiliência e filas de reprocessamento (Dead Letter Queues).",
        "Liderei migração de pipelines legados para Go/Rust — redução drástica de latência e aumento de throughput sob milhares de requisições concorrentes.",
        "Estabeleci governança técnica: padrões de código, QA em code reviews, testes automatizados e logs centralizados para auditoria.",
        "Contornei barreiras anti-bot (Cloudflare, Akamai, CAPTCHA) com engenharia reversa e motores compilados em produção.",
      ],
      en: [
        "Designed architecture for distributed extraction bot orchestration with resilience and Dead Letter Queue reprocessing.",
        "Led legacy pipeline migration to Go/Rust — drastic latency reduction and throughput increase under thousands of concurrent requests.",
        "Established technical governance: code standards, QA in code reviews, automated testing, and centralized audit logs.",
        "Bypassed anti-bot barriers (Cloudflare, Akamai, CAPTCHA) with reverse engineering and compiled engines in production.",
      ],
    },
    technologies: [
      "Go",
      "Rust",
      "Python",
      "Web Scraping & RPA",
      "Docker",
      "GitHub Actions",
      "CI/CD",
      "AWS",
    ],
  },
  "devnology-scraping-1": {
    impact: {
      pt: "Como Eng. Pleno na Devnology, otimizei pipelines de scraping e RPA com Docker, REST APIs e QA automatizado — sustentação de motores em plantão com reprocessamento de falhas e monitoramento operacional.",
      en: "As Mid-Level Engineer at Devnology, I optimized scraping and RPA pipelines with Docker, REST APIs, and automated QA — on-call engine sustainment with failure reprocessing and operational monitoring.",
    },
    highlights: {
      pt: [
        "Evoluí orquestração de workers de extração com filas de reprocessamento e health checks antes de releases.",
        "Implementei testes automatizados e QA em motores de scraping — reduzindo incidentes em plantões de produção.",
        "Otimizei pipelines Docker e REST APIs para maior throughput sob alta concorrência.",
        "Mantive logs centralizados e alertas para rastreabilidade de jobs em ambiente crítico.",
      ],
      en: [
        "Evolved extraction worker orchestration with reprocessing queues and health checks before releases.",
        "Implemented automated testing and QA on scraping engines — reducing incidents during production on-call.",
        "Optimized Docker pipelines and REST APIs for higher throughput under high concurrency.",
        "Maintained centralized logs and alerts for job traceability in a critical environment.",
      ],
    },
    technologies: [
      "Python",
      "JavaScript",
      "Puppeteer",
      "Web Scraping & RPA",
      "Docker",
      "REST APIs",
      "AWS",
    ],
  },
  "devnology-scraping-0": {
    impact: {
      pt: "Como Eng. Júnior na Devnology, desenvolvi automações de web scraping e suporte operacional a 123 Milhas/MaxMilhas — extração em larga escala com plantões, reprocessamento e engenharia reversa anti-bot.",
      en: "As Junior Engineer at Devnology, I built web scraping automations and operational support for 123 Milhas/MaxMilhas — large-scale extraction with on-call, reprocessing, and anti-bot reverse engineering.",
    },
    highlights: {
      pt: [
        "Implementei bots de extração com Puppeteer/Selenium sob alta concorrência e monitoramento de taxa de sucesso.",
        "Desenvolvi rotinas de reprocessamento manual e automático para falhas de rede e bloqueios anti-bot.",
        "Executei plantões de produção com testes e validação antes de releases em motores críticos.",
        "Promovido a Pleno em 6 meses por impacto em entregas, confiabilidade e resolução de incidentes.",
      ],
      en: [
        "Implemented extraction bots with Puppeteer/Selenium under high concurrency and success-rate monitoring.",
        "Built manual and automatic reprocessing routines for network failures and anti-bot blocks.",
        "Ran production on-call with testing and validation before releases on critical engines.",
        "Promoted to Mid-Level in 6 months for delivery impact, reliability, and incident resolution.",
      ],
    },
    technologies: [
      "Python",
      "JavaScript",
      "Puppeteer",
      "Selenium",
      "Web Scraping & RPA",
      "REST APIs",
      "AWS",
    ],
  },
  andrinno: {
    impact: {
      pt: "Freelance de 7 meses na Andrinno — liderei 4 devs em automação web para companhias aéreas, APIs de alto volume com latência baixa sob milhares de requisições concorrentes e orquestração de workers anti-bot.",
      en: "7-month freelance at Andrinno — led 4 developers on web automation for airlines, high-volume APIs with low latency under thousands of concurrent requests and anti-bot worker orchestration.",
    },
    highlights: {
      pt: [
        "Arquitetei motores de automação web com orquestração distribuída e filas de retry para contornar bloqueios.",
        "Liderei time de 4 desenvolvedores na entrega de APIs de extração com SLA de baixa latência.",
        "Implementei monitoramento de throughput, taxa de sucesso e reprocessamento em falhas de rede.",
        "Entreguei soluções em produção para clientes indiretos do setor aéreo (123 Milhas/MaxMilhas).",
      ],
      en: [
        "Architected web automation engines with distributed orchestration and retry queues to bypass blocks.",
        "Led a team of 4 developers delivering extraction APIs with low-latency SLAs.",
        "Implemented throughput monitoring, success rates, and reprocessing on network failures.",
        "Delivered production solutions for indirect airline-sector clients (123 Milhas/MaxMilhas).",
      ],
    },
    technologies: [
      "Python",
      "Node.js",
      "Web Scraping & RPA",
      "REST APIs",
      "Docker",
      "AWS",
    ],
  },
  "grupo-domini-freelance": {
    impact: {
      pt: "Freelance no Grupo Domini — hyperautomation com Sales Bot omnicanal (chat e voz): orquestrador serverless AWS, agentes de IA/LLMs no WhatsApp e telefonia para vender MIA e portfólio Gomind.",
      en: "Freelance at Grupo Domini — hyperautomation with omnichannel Sales Bot (chat and voice): AWS serverless orchestrator, AI/LLM agents on WhatsApp and telephony to sell MIA and the Gomind portfolio.",
    },
    highlights: {
      pt: [
        "Arquitetei orquestrador serverless na AWS (Lambda, EventBridge, API Gateway, SQS) com DLQ para falhas de conversa.",
        "Integrei agentes de Inteligência Artificial e LLMs aos fluxos de chat e voz para qualificação e conversão de leads.",
        "Desenvolvi monitoramento de campanhas, taxa de conversão e logs centralizados do bot comercial.",
        "Conectei automação de vendas ao portfólio MIA (RPA contábil) e produtos do Grupo Domini.",
      ],
      en: [
        "Architected AWS serverless orchestrator (Lambda, EventBridge, API Gateway, SQS) with DLQ for conversation failures.",
        "Integrated AI agents and LLMs into chat and voice flows for lead qualification and conversion.",
        "Built campaign monitoring, conversion rates, and centralized commercial bot logs.",
        "Connected sales automation to the MIA portfolio (accounting RPA) and Grupo Domini products.",
      ],
    },
    technologies: [
      "Node.js",
      "Python",
      "LLM Integrations",
      "WhatsApp API",
      "AWS Lambda",
      "SQS",
      "EventBridge",
      "API Gateway",
    ],
  },
  "barrarey-freelance": {
    impact: {
      pt: "Freelance na Barrarey — automação operacional de etiquetas e embalagem com filas de pedidos AWS/Bling, reduzindo erros manuais e acelerando picking/packing da equipe de expedição.",
      en: "Freelance at Barrarey — operational label and packing automation with AWS/Bling order queues, reducing manual errors and accelerating the shipping team's picking/packing.",
    },
    highlights: {
      pt: [
        "Desenvolvi sistema de impressão automatizada de etiquetas com fila de trabalho e status por pedido.",
        "Implementei listas de pedidos sincronizadas AWS/Bling — eliminando retrabalho manual na expedição.",
        "Criei scripts Python/PHP para orquestração de jobs e geração de filas de picking.",
        "Reduzi erros de embalagem e ganho de velocidade operacional mensurável para o time.",
      ],
      en: [
        "Built automated label printing with work queues and per-order status.",
        "Implemented synchronized AWS/Bling order lists — eliminating manual rework in shipping.",
        "Created Python/PHP scripts for job orchestration and picking queue generation.",
        "Reduced packing errors and delivered measurable operational speed gains for the team.",
      ],
    },
    technologies: [
      "Python",
      "PHP",
      "Web Scraping & RPA",
      "AWS",
      "MySQL",
    ],
  },
  "attus-bloom": {
    impact: {
      pt: "Freelance na Attus Bloom — automação de integrações e fluxos operacionais com Node.js, reduzindo tarefas manuais em processos de back-office.",
      en: "Freelance at Attus Bloom — integration and operational flow automation with Node.js, reducing manual back-office tasks.",
    },
    highlights: {
      pt: [
        "Automatizei fluxos de dados entre sistemas com APIs REST e scripts de sincronização.",
        "Implementei tratamento de erros, retry e logs para rastreabilidade de jobs.",
        "Entreguei integrações em produção com documentação para sustentação pelo cliente.",
      ],
      en: [
        "Automated data flows between systems with REST APIs and synchronization scripts.",
        "Implemented error handling, retry, and logs for job traceability.",
        "Delivered production integrations with documentation for client sustainment.",
      ],
    },
    technologies: ["Node.js", "REST APIs", "JavaScript", "MySQL"],
  },
  "beleza-tal": {
    impact: {
      pt: "Freelance na Beleza & Tal — hyperautomation com painéis de análise de vendas e reposição alimentados por IA, integrados a planilhas e Google Cloud para decisão operacional.",
      en: "Freelance at Beleza & Tal — hyperautomation with AI-powered sales and replenishment analysis panels, integrated with spreadsheets and Google Cloud for operational decisions.",
    },
    highlights: {
      pt: [
        "Desenvolvi dashboards de tendências de venda e ruptura com visualizações de IA.",
        "Implementei sugestões automáticas de reposição por categoria e sazonalidade.",
        "Integrei pipelines de dados operacionais a APIs Google Cloud com logs de execução.",
      ],
      en: [
        "Built sales trend and stockout dashboards with AI visualizations.",
        "Implemented automatic replenishment suggestions by category and seasonality.",
        "Integrated operational data pipelines with Google Cloud APIs and execution logs.",
      ],
    },
    technologies: [
      "Python",
      "Google Cloud",
      "REST APIs",
      "LLM Integrations",
    ],
  },
  "maos-livres-0": {
    impact: {
      pt: "Fundador da Mãos Livres (abr/2026) — empresa de automação, RPA e software sob medida com diagnóstico gratuito em 48h e portfólio de produtos SaaS proprietários.",
      en: "Founder of Mãos Livres (Apr 2026) — automation, RPA, and custom software company with a free 48-hour diagnosis and proprietary SaaS product portfolio.",
    },
    highlights: {
      pt: [
        "Entrego automação e RPA ponta a ponta — REST APIs, integrações ERP/WhatsApp, pipelines CI/CD (GitHub Actions, Docker) em AWS.",
        "Ofereço diagnóstico operacional gratuito em até 48h e soluções sob medida para eliminar trabalho repetitivo em back-office.",
        "Lidero estratégia técnica e produtos digitais da empresa com foco em eficiência operacional e hyperautomation.",
        "Atendo clientes com integrações, bots e software customizado sem exigir time técnico interno.",
      ],
      en: [
        "Deliver end-to-end automation and RPA — REST APIs, ERP/WhatsApp integrations, CI/CD pipelines (GitHub Actions, Docker) on AWS.",
        "Provide free operational diagnosis within 48 hours and tailored solutions to remove repetitive back-office work.",
        "Lead technical strategy and digital products with a focus on operational efficiency and hyperautomation.",
        "Serve clients with integrations, bots, and custom software without requiring an in-house tech team.",
      ],
    },
    technologies: [
      "Web Scraping & RPA",
      "Python",
      "Node.js",
      "AWS",
      "LLM Integrations",
      "REST APIs",
      "Docker",
      "GitHub Actions",
      "CI/CD",
    ],
  },
  "minha-agenda-0": {
    impact: {
      pt: "Produto SaaS Minha Agenda (Mãos Livres) — automação de agendamento, notificações e comunicação com clientes via WhatsApp, e-mail e filas de mensagens em produção.",
      en: "Minha Agenda SaaS product (Mãos Livres) — scheduling automation, notifications, and client communication via WhatsApp, email, and message queues in production.",
    },
    highlights: {
      pt: [
        "Desenvolvi orquestração de notificações (e-mail, WhatsApp) com filas e webhooks Stripe em Next.js.",
        "Implementei automação do ciclo de agendamento — confirmações, lembretes e QR Code para captação de clientes.",
        "Construí CRM operacional e arquitetura multi-tenant para dezenas de segmentos de serviços.",
      ],
      en: [
        "Built notification orchestration (email, WhatsApp) with queues and Stripe webhooks in Next.js.",
        "Implemented booking lifecycle automation — confirmations, reminders, and QR codes for client acquisition.",
        "Built operational CRM and multi-tenant architecture for dozens of service segments.",
      ],
    },
    technologies: [
      "Next.js",
      "WhatsApp API",
      "Stripe",
      "REST APIs",
      "PostgreSQL",
      "AWS",
    ],
  },
  "prodia-0": {
    impact: {
      pt: "Produto SaaS Prodia (Mãos Livres) — hyperautomation de anúncios com LLMs, pipelines generativos e backend escalável em AWS para geração de conteúdo em volume.",
      en: "Prodia SaaS product (Mãos Livres) — ad hyperautomation with LLMs, generative pipelines, and scalable AWS backend for high-volume content generation.",
    },
    highlights: {
      pt: [
        "Arquitetei pipelines de IA generativa com LLMs e engenharia de prompt em larga escala.",
        "Desenhei backend escalável para alto volume de geração de textos e ativos de venda.",
        "Integrei orquestração de agentes de IA com APIs e bancos vetoriais em AWS.",
      ],
      en: [
        "Architected generative AI pipelines with LLMs and large-scale prompt engineering.",
        "Designed scalable backend for high-volume sales copy and asset generation.",
        "Integrated AI agent orchestration with APIs and vector databases on AWS.",
      ],
    },
    technologies: [
      "Python",
      "Go",
      "Node.js",
      "LLM Integrations",
      "AWS",
      "OpenAI API",
    ],
  },
  "pop-plus": {
    impact: {
      pt: "Freelance de 3 meses na POP+ — manutenção crítica de WMS legado com automação de marketing, financeiro (AP/AR) e estoque em Vue.js e C# .NET, sem interrupção da operação.",
      en: "3-month freelance at POP+ — critical legacy WMS maintenance with marketing, finance (AP/AR), and inventory automation in Vue.js and C# .NET, without disrupting operations.",
    },
    highlights: {
      pt: [
        "Mantive módulos de marketing automation, financeiro e estoque em ambiente legado de alta criticidade.",
        "Corrigi e evoluí REST APIs e SQL Server com testes de regressão antes de cada deploy.",
        "Estabilizei fluxos comerciais e de conciliação financeira em produção contínua.",
      ],
      en: [
        "Maintained marketing automation, finance, and inventory modules in a mission-critical legacy environment.",
        "Fixed and evolved REST APIs and SQL Server with regression testing before each deploy.",
        "Stabilized sales flows and financial reconciliation in continuous production.",
      ],
    },
    technologies: [
      "C# (.NET)",
      "Vue.js",
      "SQL Server",
      "REST APIs",
      "Web Scraping & RPA",
    ],
  },
  "bbr-toys-0": {
    impact: {
      pt: "BBR Toys (ago/2021–ago/2022) — primeiro emprego na área: suporte a e-commerce, manutenção de sites e automação pontual de rotinas operacionais com PHP, JavaScript e MySQL.",
      en: "BBR Toys (Aug 2021–Aug 2022) — first industry role: e-commerce support, site maintenance, and ad-hoc operational routine automation with PHP, JavaScript, and MySQL.",
    },
    highlights: {
      pt: [
        "Mantive loja e-commerce e corrigi integrações que reduziam trabalho manual do time.",
        "Desenvolvi scripts e ajustes em PHP/JavaScript para rotinas repetitivas do back-office.",
        "Promovido a Web Júnior após 1 ano por consistência nas entregas e autonomia crescente.",
      ],
      en: [
        "Maintained the e-commerce store and fixed integrations that reduced manual team work.",
        "Built scripts and PHP/JavaScript tweaks for repetitive back-office routines.",
        "Promoted to Junior Web Developer after 1 year for consistent delivery and growing autonomy.",
      ],
    },
    technologies: ["PHP", "JavaScript", "MySQL", "HTML/CSS"],
  },
  "bbr-toys-1": {
    impact: {
      pt: "BBR Toys (ago–out/2022) — Web Júnior com maior responsabilidade em front-end e integrações do e-commerce antes da transição para Devnology.",
      en: "BBR Toys (Aug–Oct 2022) — Junior Web Developer with greater ownership of front-end and e-commerce integrations before moving to Devnology.",
    },
    highlights: {
      pt: [
        "Entreguei evoluções no front-end da loja e integrações que automatizavam fluxos de pedido.",
        "Colaborei com o time para reduzir tarefas manuais na operação do e-commerce.",
        "Transição para Devnology como Engenheiro de Software Júnior em setembro/2022.",
      ],
      en: [
        "Delivered store front-end improvements and integrations that automated order flows.",
        "Collaborated with the team to reduce manual tasks in e-commerce operations.",
        "Moved to Devnology as Junior Software Engineer in September 2022.",
      ],
    },
    technologies: ["PHP", "JavaScript", "MySQL", "REST APIs"],
  },
  contmais: {
    impact: {
      pt: "Freelance na ContMais — presença digital com WordPress/Elementor, manutenção de domínios e publicação de conteúdo com rotinas automatizadas de renovação.",
      en: "Freelance at ContMais — digital presence with WordPress/Elementor, domain maintenance, and content publishing with automated renewal routines.",
    },
    highlights: {
      pt: [
        "Publiquei websites com WordPress e Elementor — layout responsivo e formulários de contato.",
        "Automatizei acompanhamento de vencimento e renovação de domínios Registro.br.",
        "Mantive atualizações visuais e conteúdo sob demanda sem indisponibilidade.",
      ],
      en: [
        "Published websites with WordPress and Elementor — responsive layout and contact forms.",
        "Automated Registro.br domain expiration tracking and renewal.",
        "Maintained on-demand visual updates and content without downtime.",
      ],
    },
    technologies: ["WordPress", "Elementor", "PHP", "HTML/CSS"],
  },
};

function sortRpaTechnologies(technologies: string[]): string[] {
  const rank = new Map(
    RPA_TECH_PRIORITY.map((tech, index) => [tech.toLowerCase(), index]),
  );

  return [...technologies].sort((a, b) => {
    const aRank = rank.get(a.toLowerCase()) ?? 999;
    const bRank = rank.get(b.toLowerCase()) ?? 999;
    return aRank - bRank || a.localeCompare(b);
  });
}

function spinGenericRpaOverlay(
  item: PdfExperienceItem | PdfFreelanceItem,
  locale: Locale,
): RpaOverlay {
  return {
    impact: {
      pt: `Atuei em ${item.company} no desenho e sustentação de automações e integrações — orquestração de processos, REST APIs, filas e entrega em produção com foco em redução de trabalho manual.`,
      en: `At ${item.company}, I designed and sustained automations and integrations — process orchestration, REST APIs, queues, and production delivery focused on reducing manual work.`,
    },
    highlights: {
      pt: [
        `Desenvolvi e mantive fluxos de automação em ${item.company} com logs e tratamento de falhas.`,
        "Integrei sistemas via REST APIs com retry, reprocessamento e monitoramento operacional.",
        "Participei de QA e testes para garantir confiabilidade de robôs em produção.",
      ],
      en: [
        `Developed and maintained automation flows at ${item.company} with logging and failure handling.`,
        "Integrated systems via REST APIs with retry, reprocessing, and operational monitoring.",
        "Participated in QA and testing to ensure robot reliability in production.",
      ],
    },
  };
}

function applyRpaOverlay<T extends PdfExperienceItem | PdfFreelanceItem>(
  item: T,
  locale: Locale,
): T {
  const overlay =
    RPA_OVERLAYS[item.id] ?? spinGenericRpaOverlay(item, locale);

  const highlights =
    overlay.highlights[locale]?.map((h) => ensureActionBullet(h, locale)) ??
    item.highlights.map((h) => ensureActionBullet(h, locale));

  return {
    ...item,
    impact: expandAtsAcronyms(overlay.impact?.[locale] ?? item.impact, locale),
    highlights: highlights.slice(0, MAX_RPA_HIGHLIGHTS),
    technologies: sortRpaTechnologies(
      overlay.technologies ?? item.technologies,
    ),
  };
}

function applyAutomationOverlays(
  payload: ResumePdfPayload,
): Pick<ResumePdfPayload, "experiences" | "freelanceProjects"> {
  const { locale } = payload;

  return {
    experiences: payload.experiences.map((exp) =>
      applyRpaOverlay(exp, locale),
    ),
    freelanceProjects: payload.freelanceProjects.map((project) =>
      applyRpaOverlay(project, locale),
    ),
  };
}

function buildRpaSkillPillars(locale: Locale): SkillPillarGroup[] {
  const labels = RPA_SKILL_PILLARS[locale];

  return [
    {
      key: "automation",
      label: labels.automation,
      skills: [...RPA_SKILLS.automation],
    },
    {
      key: "infra",
      label: labels.orchestration,
      skills: [...RPA_SKILLS.orchestration],
    },
  ];
}

function buildRpaCareerNarrative(stepCount: number, locale: Locale): string {
  if (locale === "pt") {
    return `${stepCount} etapas documentadas — de scraping e RPA júnior a Especialista Sênior, com orquestração distribuída, hyperautomation (IA + LLMs), governança de dezenas de bots em produção (MIA/Gomind, Devnology) e fundação da Mãos Livres.`;
  }
  return `${stepCount} documented stages — from junior scraping and RPA to Senior Specialist, with distributed orchestration, hyperautomation (AI + LLMs), governance of dozens of production bots (MIA/Gomind, Devnology), and founding Mãos Livres.`;
}

function buildFullAutomationNarrative(stepCount: number, locale: Locale): string {
  if (locale === "pt") {
    return `${stepCount} etapas de carreira documentadas — trajetória completa de e-commerce e web júnior a Tech Lead, com automação em escala (MIA, Devnology, Gomind), produtos SaaS, freelances e entrega full-stack, IA e cloud AWS.`;
  }
  return `${stepCount} documented career stages — full path from e-commerce and junior web to Tech Lead, with automation at scale (MIA, Devnology, Gomind), SaaS products, freelance work, and full-stack, AI, and AWS cloud delivery.`;
}

export function enrichResumePdfPayloadForFull(
  payload: ResumePdfPayload,
): ResumePdfPayload {
  const { locale } = payload;
  const overlaid = applyAutomationOverlays(payload);

  return {
    ...payload,
    ...overlaid,
    careerNarrative: buildFullAutomationNarrative(
      overlaid.experiences.length,
      locale,
    ),
  };
}

export function enrichResumePdfPayloadForRpa(
  payload: ResumePdfPayload,
): ResumePdfPayload {
  const { locale } = payload;
  const overlaid = applyAutomationOverlays(payload);

  return {
    ...payload,
    headline: RPA_HEADLINE[locale],
    summary: RPA_SUMMARY[locale],
    coreStrengths: [...RPA_STRENGTHS[locale]],
    careerNarrative: buildRpaCareerNarrative(
      overlaid.experiences.length,
      locale,
    ),
    skillPillars: buildRpaSkillPillars(locale),
    ...overlaid,
  };
}
