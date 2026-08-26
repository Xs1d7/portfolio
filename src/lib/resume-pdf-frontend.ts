import type { Locale } from "@/components/language-provider";
import type {
  PdfExperienceItem,
  PdfFreelanceItem,
  ResumePdfPayload,
  SkillPillarGroup,
} from "@/data/resume-focus";
import { ensureActionBullet, expandAtsAcronyms } from "@/lib/resume-pdf-ats";

const FRONTEND_HEADLINE = {
  pt: "Engenheiro Full Stack Sênior",
  en: "Senior Full-Stack Engineer",
} as const;

const FRONTEND_SUMMARY = {
  pt: "Ampla experiência construindo aplicações modernas de ponta a ponta com React.js, Next.js e TypeScript — interfaces responsivas, painéis administrativos, fluxos multi-etapa, integração com REST APIs, pagamentos (Stripe) e automações (WhatsApp, e-mail). Do protótipo ao deploy em produção, com foco em UX, performance e entrega full stack.",
  en: "Broad experience building modern end-to-end applications with React.js, Next.js, and TypeScript — responsive interfaces, admin panels, multi-step flows, REST API integration, payments (Stripe), and automations (WhatsApp, email). From prototype to production deployment, focused on UX, performance, and full-stack delivery.",
} as const;

const FRONTEND_STRENGTHS = {
  pt: [
    "React & Next.js",
    "TypeScript",
    "Painéis & CRM",
    "Stripe & integrações",
  ],
  en: ["React & Next.js", "TypeScript", "Panels & CRM", "Stripe & integrations"],
} as const;

const FRONTEND_SKILL_PILLARS: Record<
  Locale,
  { frontend: string; integration: string }
> = {
  pt: {
    frontend: "Frontend & UI",
    integration: "Integração & Entrega",
  },
  en: {
    frontend: "Frontend & UI",
    integration: "Integration & Delivery",
  },
};

const FRONTEND_SKILLS = {
  frontend: [
    "React.js",
    "Next.js",
    "TypeScript",
    "JavaScript",
    "HTML & CSS",
    "Vue.js",
    "Tailwind CSS",
  ],
  integration: [
    "Node.js",
    "REST APIs",
    "Stripe",
    "WhatsApp API",
    "NestJS",
    "PostgreSQL",
    "GitHub Actions",
    "CI/CD",
    "Automated Testing",
    "QA",
  ],
} as const;

const FRONTEND_TECH_PRIORITY = [
  "React.js",
  "Next.js",
  "TypeScript",
  "JavaScript",
  "Tailwind CSS",
  "Vue.js",
  "HTML & CSS",
  "Stripe",
  "Node.js",
  "REST APIs",
  "PostgreSQL",
  "WhatsApp API",
  "C# (.NET)",
  "Docker",
] as const;

const MAX_FRONTEND_HIGHLIGHTS = 6;

type FrontendOverlay = {
  impact?: { pt: string; en: string };
  highlights: { pt: string[]; en: string[] };
  technologies?: string[];
};

const FRONTEND_OVERLAYS: Record<string, FrontendOverlay> = {
  "roboteasy-0": {
    impact: {
      pt: "Arquiteto de Software de IA na Roboteasy (desde 27/jul/2026) — foco em entregas e apoio ao backend Java Spring em grande refatoração, com time organizado e mudança para Santa Catarina em 27/set/2026.",
      en: "AI Software Architect at Roboteasy (since 27 Jul 2026) — focused on deliveries and Java Spring backend support on a large-scale refactor, with an organized team and relocation to Santa Catarina on 27 Sep 2026.",
    },
    highlights: {
      pt: [
        "Entreguei evoluções contínuas no projeto Java Spring em grande refatoração.",
        "Prestei apoio ao backend nos primeiros meses, alinhado ao ritmo organizado do time.",
        "Conduzi arquitetura de software de IA em paralelo à sustentação do backend.",
      ],
      en: [
        "Delivered ongoing improvements on a Java Spring project in a large-scale refactor.",
        "Provided backend support in the first months, aligned with the team's organized cadence.",
        "Led AI software architecture alongside backend sustainment.",
      ],
    },
    technologies: ["Java", "Spring", "Spring Boot", "REST APIs"],
  },
  "minha-agenda-0": {
    impact: {
      pt: "Desenvolvi o Minha Agenda — SaaS de agendamento online da Mãos Livres (minhaagenda.maoslivres.com) em Next.js, atendendo barbearias, clínicas estéticas, psicólogos e outros segmentos, com Stripe, WhatsApp, e-mail, QR Code e CRM integrado.",
      en: "I built Minha Agenda — Mãos Livres online scheduling SaaS (minhaagenda.maoslivres.com) in Next.js for barbershops, aesthetic clinics, psychologists, and other segments, with Stripe, WhatsApp, email, QR codes, and built-in CRM.",
    },
    highlights: {
      pt: [
        "Arquitetei o frontend em Next.js e TypeScript com painéis do estabelecimento, agenda visual e fluxos multi-etapa para o cliente final.",
        "Implementei cobrança e confirmação com Stripe (checkout, webhooks e estados de pagamento refletidos na UI em tempo real).",
        "Construí automação de mensagens via WhatsApp e notificações por e-mail em cada etapa do agendamento.",
        "Desenvolvi geração de QR Code para o negócio contratante redirecionar clientes ao formulário de cadastro/agendamento.",
        "Modelei CRM leve — histórico de clientes, serviços, status e visão operacional no painel administrativo.",
        "Entreguei arquitetura multi-tenant reutilizável por vertical (barbearia, clínica, psicologia, etc.) com componentes compartilhados.",
      ],
      en: [
        "Architected the Next.js and TypeScript frontend with business panels, visual calendar, and multi-step end-customer flows.",
        "Implemented Stripe billing and confirmation (checkout, webhooks, and payment states reflected in the UI in real time).",
        "Built WhatsApp message automation and email notifications at each booking stage.",
        "Developed QR code generation so subscribing businesses redirect customers to the registration/booking form.",
        "Modeled lightweight CRM — client history, services, status, and operational view in the admin panel.",
        "Delivered a multi-tenant architecture reusable per vertical (barbershop, clinic, psychology, etc.) with shared components.",
      ],
    },
    technologies: [
      "Next.js",
      "React.js",
      "TypeScript",
      "Stripe",
      "WhatsApp API",
      "PostgreSQL",
      "REST APIs",
      "Tailwind CSS",
      "CRM",
      "QR Code",
      "Email Automation",
    ],
  },
  "maos-livres-0": {
    impact: {
      pt: "Fundei a Mãos Livres e desenvolvi o site institucional, hub de contato e painéis internos em Next.js/React — interface responsiva conectada a REST APIs, diagnóstico em 48h e base para produtos SaaS da empresa.",
      en: "I founded Mãos Livres and built the company website, contact hub, and internal panels in Next.js/React — responsive UI connected to REST APIs, 48-hour diagnosis, and the foundation for the company's SaaS products.",
    },
    highlights: {
      pt: [
        "Implementei maoslivres.com com Next.js, App Router, componentes reutilizáveis e layout mobile-first.",
        "Desenvolvi formulários de diagnóstico e fluxos de captura de lead com validação em TypeScript e feedback visual.",
        "Integrei o frontend a REST APIs e automações AWS com estados de loading, erro e sucesso bem definidos.",
        "Estruturei design system leve (tipografia, cores, cards) para acelerar novos produtos da empresa.",
        "Configurei pipeline CI/CD (GitHub Actions) com preview de deploy e testes antes de produção.",
      ],
      en: [
        "Built maoslivres.com with Next.js, App Router, reusable components, and a mobile-first layout.",
        "Developed diagnosis forms and lead-capture flows with TypeScript validation and clear visual feedback.",
        "Integrated the frontend with REST APIs and AWS automations with well-defined loading, error, and success states.",
        "Structured a lightweight design system (typography, colors, cards) to speed up new company products.",
        "Set up CI/CD pipelines (GitHub Actions) with deploy preview and pre-production testing.",
      ],
    },
    technologies: [
      "Next.js",
      "React.js",
      "TypeScript",
      "Tailwind CSS",
      "REST APIs",
      "Node.js",
      "AWS",
      "GitHub Actions",
    ],
  },
  "prodia-0": {
    impact: {
      pt: "Arquiteto o Prodia (SaaS de anúncios com IA) com frontend em Next.js/React — telas de criação, edição, preview e publicação de campanhas integradas a APIs de geração por LLM.",
      en: "I architect Prodia (AI ads SaaS) with a Next.js/React frontend — creation, editing, preview, and publishing screens integrated with LLM generation APIs.",
    },
    highlights: {
      pt: [
        "Desenhei fluxos de wizard para criação de anúncios com preview em tempo real do conteúdo gerado.",
        "Implementei componentes de editor, galeria de variações e estados assíncronos de geração por IA.",
        "Consumi REST APIs com React Query/SWR patterns para cache, revalidação e UX fluida.",
        "Estruturei layouts responsivos para lojistas gerenciarem campanhas em desktop e mobile.",
      ],
      en: [
        "Designed wizard flows for ad creation with real-time preview of generated content.",
        "Implemented editor components, variation gallery, and async AI generation states.",
        "Consumed REST APIs with React Query/SWR patterns for cache, revalidation, and smooth UX.",
        "Structured responsive layouts for merchants to manage campaigns on desktop and mobile.",
      ],
    },
    technologies: [
      "Next.js",
      "React.js",
      "TypeScript",
      "REST APIs",
      "Tailwind CSS",
      "Node.js",
      "OpenAI API",
    ],
  },
  "devnology-lead-0": {
    impact: {
      pt: "Como Tech Lead na Devnology, conduzi squads full stack — defini padrões de frontend (React/TypeScript), painéis de monitoramento de pipelines e integração com motores Go/Rust em produção.",
      en: "As Tech Lead at Devnology, I led full-stack squads — defined frontend standards (React/TypeScript), pipeline monitoring panels, and integration with Go/Rust engines in production.",
    },
    highlights: {
      pt: [
        "Padronizei componentes React e contratos de API entre squads de extração de dados.",
        "Desenvolvi painéis internos de status de jobs, filas e saúde de pipelines para operação.",
        "Liderei code reviews focados em UX de ferramentas internas e performance de renderização.",
        "Coordenei migração de telas legadas para stacks modernas com TypeScript e testes automatizados.",
      ],
      en: [
        "Standardized React components and API contracts across data-extraction squads.",
        "Built internal panels for job status, queues, and pipeline health for operations.",
        "Led code reviews focused on internal tool UX and rendering performance.",
        "Coordinated migration of legacy screens to modern stacks with TypeScript and automated testing.",
      ],
    },
    technologies: [
      "React.js",
      "TypeScript",
      "Next.js",
      "Go",
      "Rust",
      "REST APIs",
      "Docker",
      "GitHub Actions",
      "AWS",
    ],
  },
  "gomind-2": {
    impact: {
      pt: "Como Líder Técnico na Gomind, conduzi frentes full stack no MIA — painéis contábeis, fluxos de conciliação e integrações SAP com interfaces React/TypeScript em produção crítica.",
      en: "As Tech Lead at Gomind, I led full-stack work on MIA — accounting panels, reconciliation flows, and SAP integrations with React/TypeScript interfaces in mission-critical production.",
    },
    highlights: {
      pt: [
        "Liderei evolução de telas do MIA para escritórios contábeis — dashboards, filtros e tabelas de alto volume.",
        "Implementei fluxos de accounts payable (AP) e accounts receivable (AR) com feedback visual de status.",
        "Conduzi code reviews e testes de regressão em componentes React conectados a workers SAP.",
        "Estabeleci padrões de CI/CD para deploy seguro de frontend e backend em AWS Lambda.",
      ],
      en: [
        "Led MIA screen evolution for accounting firms — dashboards, filters, and high-volume tables.",
        "Implemented accounts payable (AP) and accounts receivable (AR) flows with visual status feedback.",
        "Conducted code reviews and regression testing on React components connected to SAP workers.",
        "Established CI/CD standards for safe frontend and backend deploys on AWS Lambda.",
      ],
    },
    technologies: [
      "React.js",
      "TypeScript",
      "Node.js",
      "REST APIs",
      "SAP Integration",
      "AWS Lambda",
      "PostgreSQL",
      "GitHub Actions",
    ],
  },
  "gomind-1": {
    impact: {
      pt: "Como Fullstack Sênior no MIA (Gomind), desenvolvi interfaces e APIs — telas de automação contábil, formulários complexos e integração REST de alto volume com TypeScript.",
      en: "As Senior Full-Stack on MIA (Gomind), I built interfaces and APIs — accounting automation screens, complex forms, and high-volume REST integration with TypeScript.",
    },
    highlights: {
      pt: [
        "Construí telas de conciliação e rotinas fiscais com validação client-side e estados de progresso.",
        "Desenvolvi componentes reutilizáveis de tabela, modal e formulário multi-step em React.",
        "Integrei frontend a REST APIs Node.js com tratamento de erros e retry visível ao usuário.",
        "Promovido a Líder Técnico em ~3 meses por entrega ponta a ponta consistente.",
      ],
      en: [
        "Built reconciliation and tax routine screens with client-side validation and progress states.",
        "Developed reusable table, modal, and multi-step form components in React.",
        "Integrated frontend with Node.js REST APIs with user-visible error handling and retry.",
        "Promoted to Tech Lead in ~3 months for consistent end-to-end delivery.",
      ],
    },
    technologies: [
      "React.js",
      "TypeScript",
      "Node.js",
      "REST APIs",
      "PostgreSQL",
      "AWS Lambda",
    ],
  },
  "gomind-0": {
    impact: {
      pt: "Como Dev RPA Pleno no MIA, desenvolvi interfaces operacionais e fluxos de automação contábil — telas conectadas a integrações AWS e pipelines de processamento em produção.",
      en: "As Mid-Level RPA Developer on MIA, I built operational interfaces and accounting automation flows — screens connected to AWS integrations and processing pipelines in production.",
    },
    highlights: {
      pt: [
        "Implementei telas de acompanhamento de jobs RPA com status em tempo real para o time contábil.",
        "Desenvolvi formulários e wizards para configurar rotinas de accounts payable (AP) e accounts receivable (AR).",
        "Integrei UI a filas AWS e workers com feedback visual de sucesso, falha e reprocessamento.",
        "Promovido a Fullstack Sênior em ~6 meses por domínio do produto e entregas de interface.",
      ],
      en: [
        "Implemented RPA job tracking screens with real-time status for the accounting team.",
        "Built forms and wizards to configure accounts payable (AP) and accounts receivable (AR) routines.",
        "Integrated UI with AWS queues and workers with visual success, failure, and reprocessing feedback.",
        "Promoted to Senior Full-Stack in ~6 months for product mastery and interface delivery.",
      ],
    },
    technologies: [
      "React.js",
      "TypeScript",
      "Node.js",
      "REST APIs",
      "AWS Lambda",
      "Docker",
    ],
  },
  "devnology-scraping-1": {
    impact: {
      pt: "Como Eng. Pleno na Devnology, evolui painéis de monitoramento de scraping, configuração de motores e visualização de métricas — frontend TypeScript integrado a APIs e Docker em produção.",
      en: "As Mid-Level Engineer at Devnology, I evolved scraping monitoring panels, engine configuration, and metrics views — TypeScript frontend integrated with APIs and Docker in production.",
    },
    highlights: {
      pt: [
        "Desenvolvi dashboards de saúde de extração com gráficos de taxa de sucesso e latência.",
        "Implementei telas de configuração de motores com validação e preview de parâmetros.",
        "Executei QA e testes automatizados em componentes React antes de releases.",
        "Otimizei renderização de listas grandes com paginação e virtualização.",
      ],
      en: [
        "Built extraction health dashboards with success rate and latency charts.",
        "Implemented engine configuration screens with validation and parameter preview.",
        "Executed QA and automated testing on React components before releases.",
        "Optimized large list rendering with pagination and virtualization.",
      ],
    },
    technologies: [
      "React.js",
      "TypeScript",
      "Node.js",
      "REST APIs",
      "Docker",
      "PostgreSQL",
    ],
  },
  "devnology-scraping-0": {
    impact: {
      pt: "Como Eng. Júnior na Devnology, desenvolvi ferramentas internas de apoio a scraping — telas de log, replay de requisições e painéis de plantão integrados a APIs REST.",
      en: "As Junior Engineer at Devnology, I built internal scraping support tools — log screens, request replay, and on-call panels integrated with REST APIs.",
    },
    highlights: {
      pt: [
        "Construí interfaces para visualizar falhas de extração e acionar reprocessamento manual.",
        "Desenvolvi componentes de tabela e filtro para plantões de alta concorrência.",
        "Integrei frontend JavaScript/TypeScript a APIs Python e Node em ambiente de produção.",
        "Promovido a Pleno em 6 meses por impacto em ferramentas internas e confiabilidade.",
      ],
      en: [
        "Built interfaces to view extraction failures and trigger manual reprocessing.",
        "Developed table and filter components for high-concurrency on-call shifts.",
        "Integrated JavaScript/TypeScript frontend with Python and Node APIs in production.",
        "Promoted to Mid-Level in 6 months for internal tooling impact and reliability.",
      ],
    },
    technologies: [
      "JavaScript",
      "TypeScript",
      "React.js",
      "REST APIs",
      "Python",
      "Node.js",
    ],
  },
  "bbr-toys-1": {
    impact: {
      pt: "Como Web Júnior na BBR Toys, entreguei melhorias de front-end no e-commerce — páginas de produto, carrinho e integrações visuais com a loja online.",
      en: "As Junior Web Developer at BBR Toys, I delivered e-commerce front-end improvements — product pages, cart, and visual integrations with the online store.",
    },
    highlights: {
      pt: [
        "Implementei ajustes de layout e componentes JavaScript no front da loja.",
        "Corrigi bugs visuais e de responsividade em páginas de catálogo e checkout.",
        "Integrei scripts de terceiros e tags de conversão mantendo performance aceitável.",
      ],
      en: [
        "Implemented layout tweaks and JavaScript components on the store front end.",
        "Fixed visual and responsiveness bugs on catalog and checkout pages.",
        "Integrated third-party scripts and conversion tags while maintaining acceptable performance.",
      ],
    },
    technologies: ["JavaScript", "HTML/CSS", "PHP", "MySQL", "E-commerce"],
  },
  "bbr-toys-0": {
    impact: {
      pt: "Como Aprendiz na BBR Toys, mantive e evoluí o front-end do e-commerce — base prática em HTML, CSS, JavaScript e integrações da loja online.",
      en: "As Apprentice at BBR Toys, I maintained and improved the e-commerce front end — hands-on foundation in HTML, CSS, JavaScript, and store integrations.",
    },
    highlights: {
      pt: [
        "Atualizei páginas da loja, banners e listagens de produtos com HTML/CSS e JavaScript.",
        "Corrigi inconsistências visuais entre desktop e mobile no catálogo.",
        "Promovido a Web Júnior após 1 ano por consistência nas entregas de interface.",
      ],
      en: [
        "Updated store pages, banners, and product listings with HTML/CSS and JavaScript.",
        "Fixed visual inconsistencies between desktop and mobile in the catalog.",
        "Promoted to Junior Web Developer after 1 year for consistent interface delivery.",
      ],
    },
    technologies: ["JavaScript", "HTML/CSS", "PHP", "MySQL", "E-commerce"],
  },
  "pop-plus": {
    impact: {
      pt: "Freelance full stack na POP+ — evolução de SPA Vue.js em WMS legado (financeiro, comercial, marketing automation, estoque) com dezenas de telas críticas em produção.",
      en: "Full-stack freelance at POP+ — Vue.js SPA evolution on a legacy WMS (finance, sales, marketing automation, inventory) with dozens of mission-critical production screens.",
    },
    highlights: {
      pt: [
        "Refatorei telas Vue.js de módulos financeiros (AP/AR), comercial e estoque sem downtime.",
        "Implementei componentes de grid, filtro avançado e formulários com validação client-side.",
        "Corrigi bugs de estado em SPAs complexas com comunicação síncrona a REST APIs .NET.",
        "Estabilizei fluxos de marketing automation no back-office com testes de regressão visual.",
        "Documentei padrões de componente para acelerar manutenção do legado.",
      ],
      en: [
        "Refactored Vue.js screens for finance (AP/AR), sales, and inventory modules without downtime.",
        "Implemented grid components, advanced filters, and forms with client-side validation.",
        "Fixed state bugs in complex SPAs syncing with .NET REST APIs.",
        "Stabilized marketing automation back-office flows with visual regression testing.",
        "Documented component patterns to speed up legacy maintenance.",
      ],
    },
    technologies: [
      "Vue.js",
      "TypeScript",
      "JavaScript",
      "C# (.NET)",
      "REST APIs",
      "SQL Server",
    ],
  },
  "attus-bloom": {
    impact: {
      pt: "Freelance full stack na Attus Bloom — painéis de estoque e dashboards operacionais em React/Next.js com sincronização quase em tempo real via REST APIs.",
      en: "Full-stack freelance at Attus Bloom — inventory panels and operational dashboards in React/Next.js with near-real-time sync via REST APIs.",
    },
    highlights: {
      pt: [
        "Desenvolvi dashboards de entrada, saída e conciliação de estoque com gráficos e alertas.",
        "Implementei tabelas interativas com filtros, exportação e atualização automática de dados.",
        "Integrei frontend a ERPs e planilhas com estados de sincronização visíveis ao usuário.",
        "Construí telas de reabastecimento com notificações visuais para o time operacional.",
      ],
      en: [
        "Built inbound, outbound, and reconciliation dashboards with charts and alerts.",
        "Implemented interactive tables with filters, export, and automatic data refresh.",
        "Integrated frontend with ERPs and spreadsheets with user-visible sync states.",
        "Built replenishment screens with visual notifications for the operations team.",
      ],
    },
    technologies: [
      "React.js",
      "Next.js",
      "TypeScript",
      "Node.js",
      "REST APIs",
      "PostgreSQL",
    ],
  },
  "andrinno": {
    impact: {
      pt: "Freelance como líder técnico na Andrinno — arquitetei painéis de monitoramento de automação aérea e APIs de alto volume, com time de 4 devs em entrega full stack.",
      en: "Freelance technical lead at Andrinno — I architected airline automation monitoring panels and high-volume APIs, leading a 4-developer full-stack delivery team.",
    },
    highlights: {
      pt: [
        "Desenvolvi painéis internos de status de bots, filas e taxa de sucesso por companhia aérea.",
        "Liderei 4 devs na entrega de interfaces administrativas e microsserviços com Docker.",
        "Implementei componentes de log em tempo real e filtros para debugging de produção.",
        "Modelei UX de ferramentas internas para reduzir tempo de diagnóstico em plantões.",
      ],
      en: [
        "Built internal panels for bot status, queues, and success rate per airline.",
        "Led 4 developers delivering admin interfaces and microservices with Docker.",
        "Implemented real-time log components and filters for production debugging.",
        "Designed internal tool UX to reduce diagnosis time during on-call shifts.",
      ],
    },
    technologies: [
      "React.js",
      "TypeScript",
      "Node.js",
      "Fastify",
      "REST APIs",
      "Docker",
      "PostgreSQL",
    ],
  },
  "grupo-domini-freelance": {
    impact: {
      pt: "Freelance no Grupo Domini — desenvolvi interfaces e orquestração do Sales Bot (chat e voz) com painéis de configuração, fluxos WhatsApp e integração a LLMs.",
      en: "Freelance at Grupo Domini — I built Sales Bot interfaces and orchestration (chat and voice) with configuration panels, WhatsApp flows, and LLM integration.",
    },
    highlights: {
      pt: [
        "Construí painel de configuração de roteiros de venda e qualificação de leads.",
        "Implementei fluxos de chat no WhatsApp com preview de mensagens e estados de conversa.",
        "Desenvolvi telas de monitoramento de campanhas e taxa de conversão do bot.",
        "Integrei frontend a orquestrador serverless AWS (Lambda, SQS, API Gateway).",
      ],
      en: [
        "Built a panel to configure sales scripts and lead qualification.",
        "Implemented WhatsApp chat flows with message preview and conversation states.",
        "Developed campaign monitoring screens and bot conversion rate views.",
        "Integrated frontend with AWS serverless orchestrator (Lambda, SQS, API Gateway).",
      ],
    },
    technologies: [
      "React.js",
      "TypeScript",
      "Next.js",
      "WhatsApp API",
      "REST APIs",
      "AWS Lambda",
      "LLM Integrations",
    ],
  },
  "beleza-tal": {
    impact: {
      pt: "Freelance na Beleza & Tal — painéis de análise de vendas e reposição com visualizações de IA, integrados a planilhas e Google Cloud.",
      en: "Freelance at Beleza & Tal — sales and replenishment analysis panels with AI visualizations, integrated with spreadsheets and Google Cloud.",
    },
    highlights: {
      pt: [
        "Desenvolvi dashboards de tendências de venda e ruptura com gráficos interativos.",
        "Implementei telas de sugestão de reposição com filtros por categoria e sazonalidade.",
        "Integrei frontend a planilhas operacionais e APIs Google Cloud.",
      ],
      en: [
        "Built sales trend and stockout dashboards with interactive charts.",
        "Implemented replenishment suggestion screens with category and seasonality filters.",
        "Integrated frontend with operational spreadsheets and Google Cloud APIs.",
      ],
    },
    technologies: [
      "React.js",
      "TypeScript",
      "Python",
      "Google Cloud",
      "REST APIs",
    ],
  },
  "barrarey-freelance": {
    impact: {
      pt: "Freelance na Barrarey — desenvolvi painel operacional de etiquetas e embalagem com listas de pedidos AWS/Bling e automação visual do fluxo de picking.",
      en: "Freelance at Barrarey — I built an operational label and packing panel with AWS/Bling order lists and visual picking flow automation.",
    },
    highlights: {
      pt: [
        "Construí interface para fila de impressão de etiquetas com status por pedido.",
        "Implementei telas de picking/packing com priorização visual para o time de expedição.",
        "Integrei frontend a scripts Python/PHP e APIs Bling com atualização em tempo real.",
      ],
      en: [
        "Built an interface for the label print queue with per-order status.",
        "Implemented picking/packing screens with visual prioritization for the shipping team.",
        "Integrated frontend with Python/PHP scripts and Bling APIs with real-time updates.",
      ],
    },
    technologies: [
      "React.js",
      "TypeScript",
      "Python",
      "REST APIs",
      "MySQL",
    ],
  },
  "contmais": {
    impact: {
      pt: "Freelance na ContMais — sites WordPress/Elementor com layout responsivo, publicação de conteúdo e manutenção de domínios.",
      en: "Freelance at ContMais — WordPress/Elementor websites with responsive layout, content publishing, and domain maintenance.",
    },
    highlights: {
      pt: [
        "Publiquei websites com WordPress e Elementor — estrutura de páginas, tipografia e responsividade.",
        "Ajustei temas, seções e formulários de contato para conversão.",
        "Mantive domínios Registro.br e suporte a atualizações visuais sob demanda.",
      ],
      en: [
        "Published websites with WordPress and Elementor — page structure, typography, and responsiveness.",
        "Tuned themes, sections, and contact forms for conversion.",
        "Maintained Registro.br domains and on-demand visual update support.",
      ],
    },
    technologies: ["WordPress", "Elementor", "HTML/CSS", "PHP", "JavaScript"],
  },
};

function sortFrontendTechnologies(technologies: string[]): string[] {
  const rank = new Map(
    FRONTEND_TECH_PRIORITY.map((tech, index) => [tech.toLowerCase(), index]),
  );

  return [...technologies].sort((a, b) => {
    const aRank = rank.get(a.toLowerCase()) ?? 999;
    const bRank = rank.get(b.toLowerCase()) ?? 999;
    return aRank - bRank || a.localeCompare(b);
  });
}

function spinGenericFrontendOverlay(
  item: PdfExperienceItem | PdfFreelanceItem,
  locale: Locale,
): FrontendOverlay {
  return {
    impact: {
      pt: `Atuei em ${item.company} no desenvolvimento e evolução de interfaces web — componentes reutilizáveis, integração com REST APIs e entrega full stack com React.js, TypeScript e boas práticas de UX.`,
      en: `At ${item.company}, I developed and evolved web interfaces — reusable components, REST API integration, and full-stack delivery with React.js, TypeScript, and solid UX practices.`,
    },
    highlights: {
      pt: [
        `Desenvolvi e mantive telas e fluxos de usuário em ${item.company} com foco em clareza e performance.`,
        "Integrei frontend a APIs com tratamento de estados de loading, erro e sucesso.",
        "Participei de code reviews e testes para garantir qualidade de interface em produção.",
      ],
      en: [
        `Developed and maintained user screens and flows at ${item.company} with clarity and performance in mind.`,
        "Integrated frontend with APIs handling loading, error, and success states.",
        "Participated in code reviews and testing to ensure production interface quality.",
      ],
    },
  };
}

function applyFrontendOverlay<T extends PdfExperienceItem | PdfFreelanceItem>(
  item: T,
  locale: Locale,
): T {
  const overlay =
    FRONTEND_OVERLAYS[item.id] ?? spinGenericFrontendOverlay(item, locale);

  const highlights =
    overlay.highlights[locale]?.map((h) => ensureActionBullet(h, locale)) ??
    item.highlights.map((h) => ensureActionBullet(h, locale));

  return {
    ...item,
    impact: expandAtsAcronyms(
      overlay.impact?.[locale] ?? item.impact,
      locale,
    ),
    highlights: highlights.slice(0, MAX_FRONTEND_HIGHLIGHTS),
    technologies: sortFrontendTechnologies(
      overlay.technologies ?? item.technologies,
    ),
  };
}

function buildFrontendSkillPillars(locale: Locale): SkillPillarGroup[] {
  const labels = FRONTEND_SKILL_PILLARS[locale];

  return [
    {
      key: "fullstack",
      label: labels.frontend,
      skills: [...FRONTEND_SKILLS.frontend],
    },
    {
      key: "infra",
      label: labels.integration,
      skills: [...FRONTEND_SKILLS.integration],
    },
  ];
}

function buildFrontendCareerNarrative(stepCount: number, locale: Locale): string {
  if (locale === "pt") {
    return `${stepCount} etapas documentadas — de e-commerce e web júnior a full stack sênior, com produtos SaaS em Next.js/React (Minha Agenda, Mãos Livres, Prodia), painéis operacionais e integrações Stripe/WhatsApp em produção.`;
  }
  return `${stepCount} documented stages — from e-commerce and junior web to senior full stack, with Next.js/React SaaS products (Minha Agenda, Mãos Livres, Prodia), operational panels, and Stripe/WhatsApp integrations in production.`;
}

export function enrichResumePdfPayloadForFrontend(
  payload: ResumePdfPayload,
): ResumePdfPayload {
  const { locale } = payload;

  return {
    ...payload,
    headline: FRONTEND_HEADLINE[locale],
    summary: FRONTEND_SUMMARY[locale],
    coreStrengths: [...FRONTEND_STRENGTHS[locale]],
    careerNarrative: buildFrontendCareerNarrative(
      payload.experiences.length,
      locale,
    ),
    skillPillars: buildFrontendSkillPillars(locale),
    experiences: payload.experiences.map((exp) =>
      applyFrontendOverlay(exp, locale),
    ),
    freelanceProjects: payload.freelanceProjects.map((project) =>
      applyFrontendOverlay(project, locale),
    ),
  };
}
