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
    .filter((e) => e.type === "freelance")
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
    id: "roboteasy",
    type: "fulltime",
    company: "Roboteasy",
    role: {
      pt: "Arquiteto de Software de IA",
      en: "AI Software Architect",
    },
    period: { start: "2026-07", end: null },
    recruiterImpact: {
      pt: "Desde 27/jul/2026: arquitetura de software de IA na Roboteasy, com entregas contínuas e forte atuação no backend Java Spring em uma grande refatoração — time organizado, operação em Santa Catarina a partir de 27/set/2026.",
      en: "Since 27 Jul 2026: AI software architecture at Roboteasy, with ongoing deliveries and heavy backend support on a Java Spring large-scale refactor — organized team, relocating to Santa Catarina on 27 Sep 2026.",
    },
    shortDescription: {
      pt: "Arquiteto de Software de IA (desde 27/jul/2026) — entregas contínuas e apoio ao backend Java Spring em grande refatoração; mudança para Santa Catarina em 27/set/2026.",
      en: "AI Software Architect (since 27 Jul 2026) — ongoing deliveries and Java Spring backend support on a large refactor; relocating to Santa Catarina on 27 Sep 2026.",
    },
    tenures: [
      {
        company: "Roboteasy",
        role: {
          pt: "Arquiteto de Software de IA",
          en: "AI Software Architect",
        },
        period: { start: "2026-07", end: null },
        highlight: {
          pt: "Início em **27 de julho de 2026**. Nos primeiros meses, entregas frequentes e **apoio intenso ao backend** em um projeto **Java Spring** em **grande refatoração**. Time muito organizado. Mudança para **Santa Catarina em 27 de setembro de 2026**.",
          en: "Started on **27 July 2026**. In the first months, frequent deliveries and **heavy backend support** on a **Java Spring** project undergoing a **large-scale refactor**. Very organized team. Relocating to **Santa Catarina on 27 September 2026**.",
        },
      },
    ],
    overview: {
      pt: `Entrei na **Roboteasy** em **27 de julho de 2026** como **Arquiteto de Software de IA**. O time é **muito organizado**; nesses primeiros meses tenho sido muito utilizado para **prestar apoio no backend**, em um projeto **Java Spring** em **grande refatoração**, com diversas entregas já realizadas.

Em **27 de setembro de 2026** me mudo para **Santa Catarina**, mais próximo da operação da empresa.`,
      en: `I joined **Roboteasy** on **27 July 2026** as **AI Software Architect**. The team is **highly organized**; in these first months I have been heavily engaged to **support the backend**, on a **Java Spring** project undergoing a **large-scale refactor**, with multiple deliveries already shipped.

On **27 September 2026** I am relocating to **Santa Catarina**, closer to the company's operation.`,
    },
    fullDescription: {
      pt: `Atuação atual na **Roboteasy** como **Arquiteto de Software de IA**, desde **27 de julho de 2026**.

**Contexto**

- Time **muito organizado**, com ritmo claro de entrega
- Nos primeiros meses, demanda forte de **apoio ao backend** — projeto **Java Spring** em **grande refatoração**
- Diversas entregas já realizadas nesse ciclo inicial

**Foco técnico**

- Arquitetura de software com **IA** alinhada à operação e ao produto
- Sustentação e evolução do backend **Java / Spring** durante a refatoração
- Colaboração próxima com o time para manter qualidade e continuidade em produção

**Próximo passo**

- Mudança para **Santa Catarina em 27 de setembro de 2026**`,
      en: `Current role at **Roboteasy** as **AI Software Architect**, since **27 July 2026**.

**Context**

- **Highly organized** team with a clear delivery cadence
- In the first months, strong demand for **backend support** — a **Java Spring** project in a **large-scale refactor**
- Multiple deliveries already completed in this initial cycle

**Technical focus**

- Software architecture with **AI** aligned to operations and product
- Sustaining and evolving the **Java / Spring** backend through the refactor
- Close collaboration with the team to keep quality and continuity in production

**Next step**

- Relocating to **Santa Catarina on 27 September 2026**`,
    },
    technologies: [
      "Java",
      "Spring",
      "Spring Boot",
      "Arquitetura de Software",
      "IA / LLMs",
      "Refatoração",
      "REST APIs",
    ],
    clients: [{ name: "Roboteasy", relationship: "direct" }],
    media: [],
  },
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
      pt: "Empresa de automação e software sob medida: entrego integrações REST API, RPA e pipelines CI/CD (GitHub Actions, Docker) em AWS para eliminar trabalho repetitivo — com portfólio de produtos SaaS proprietários (Minha Agenda, Prodia).",
      en: "Custom automation and software company: I deliver REST API integrations, RPA, and CI/CD pipelines (GitHub Actions, Docker) on AWS to remove repetitive work — with proprietary SaaS products (Minha Agenda, Prodia).",
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
- **REST APIs**, testes e pipeline **CI/CD** (GitHub Actions, Docker) em **AWS**
- Arquitetura e implementação ponta a ponta — sem depender de equipe técnica interna do cliente

**Produtos SaaS proprietários**

- **Minha Agenda** ([minhaagenda.maoslivres.com](https://minhaagenda.maoslivres.com)) — agendamento online multi-segmento com Stripe, WhatsApp, QR Code e CRM
- **Prodia** (em desenvolvimento) — hyperautomation de anúncios com LLMs e pipelines generativos em AWS`,
      en: `Mãos Livres exists to **automate processes** and **own the technology side** for other companies — from diagnosis to delivery.

**How we work**

- The client describes their operational or systems challenge
- Within **48 hours** we return a **free diagnosis** and action plan
- The solution may be **automation** (RPA, integrations, bots), **custom software** (APIs, dashboards, backends), or a digital **product**, as appropriate

**What we focus on**

- Removing manual, repetitive work across operations, finance, sales, and back office
- Integrations across ERPs, spreadsheets, WhatsApp, e-commerce, and everyday tools
- **REST APIs**, testing, and **CI/CD** pipelines (GitHub Actions, Docker) on **AWS**
- End-to-end architecture and implementation — without requiring an in-house tech team at the client

**Proprietary SaaS products**

- **Minha Agenda** ([minhaagenda.maoslivres.com](https://minhaagenda.maoslivres.com)) — multi-segment online scheduling with Stripe, WhatsApp, QR codes, and CRM
- **Prodia** (in development) — ad hyperautomation with LLMs and generative pipelines on AWS`,
    },
    technologies: [
      "Automação de Processos",
      "RPA",
      "REST APIs",
      "Integrações & APIs",
      "Node.js",
      "TypeScript",
      "Python",
      "Docker",
      "GitHub Actions",
      "CI/CD",
      "AWS",
      "IA / LLMs",
    ],
    link: "https://maoslivres.com",
    media: [],
  },
  {
    id: "minha-agenda",
    type: "personal",
    includeInJourney: false,
    company: "Mãos Livres · Minha Agenda",
    period: { start: "2026-06", end: null },
    role: {
      pt: "Desenvolvedor Full Stack · Produto SaaS",
      en: "Full-Stack Developer · SaaS Product",
    },
    tenures: [
      {
        company: "Mãos Livres · Minha Agenda",
        role: {
          pt: "Desenvolvedor Full Stack · Produto SaaS",
          en: "Full-Stack Developer · SaaS Product",
        },
        period: { start: "2026-06", end: null },
        highlight: {
          pt: "Agendador online multi-segmento (barbearias, clínicas estéticas, psicólogos e outros) — produto SaaS da Mãos Livres em minhaagenda.maoslivres.com, com Next.js, Stripe, WhatsApp e CRM integrado.",
          en: "Multi-segment online scheduler (barbershops, aesthetic clinics, psychologists, and more) — Mãos Livres SaaS at minhaagenda.maoslivres.com, with Next.js, Stripe, WhatsApp, and built-in CRM.",
        },
      },
    ],
    recruiterImpact: {
      pt: "Produto SaaS de agendamento online da Mãos Livres — Next.js, pagamentos Stripe, notificações por e-mail, automação WhatsApp, QR Code e CRM para negócios de serviços.",
      en: "Mãos Livres online scheduling SaaS — Next.js, Stripe payments, email notifications, WhatsApp automation, QR codes, and CRM for service businesses.",
    },
    shortDescription: {
      pt: "Agendador online multi-segmento da Mãos Livres — barbearias, clínicas, psicólogos e outros. Em minhaagenda.maoslivres.com.",
      en: "Mãos Livres multi-segment online scheduler — barbershops, clinics, psychologists, and more. At minhaagenda.maoslivres.com.",
    },
    overview: {
      pt: `O **Minha Agenda** é um produto **SaaS da Mãos Livres** para **agendamento online** — pensado para negócios de serviços como **barbearias, clínicas estéticas, psicólogos** e dezenas de outros segmentos.

Disponível em **[minhaagenda.maoslivres.com](https://minhaagenda.maoslivres.com)** — cada empresa contratante recebe fluxo de cadastro, agenda, pagamentos e comunicação com clientes em um único painel.`,
      en: `**Minha Agenda** is a **Mãos Livres SaaS product** for **online scheduling** — built for service businesses such as **barbershops, aesthetic clinics, psychologists**, and many other segments.

Available at **[minhaagenda.maoslivres.com](https://minhaagenda.maoslivres.com)** — each subscribing business gets scheduling, payments, and client communication in a single panel.`,
    },
    fullDescription: {
      pt: `Desenvolvi o **Minha Agenda** como produto digital da **Mãos Livres** — aplicação **full stack em Next.js** para empresas que vendem horários e precisam de operação enxuta sem planilhas ou WhatsApp manual.

**O que a plataforma faz**

- **Agendamento online** por segmento (barbearia, clínica estética, psicologia, etc.) com fluxos adaptados ao tipo de negócio
- **CRM leve** — histórico de clientes, serviços, status de agendamento e visão operacional para o dono do negócio
- **Pagamentos com Stripe** — cobrança e confirmação integradas ao fluxo de reserva
- **Notificações por e-mail** — confirmações, lembretes e comunicações transacionais
- **Automação via WhatsApp** — mensagens automáticas para cliente e empresa no ciclo do agendamento
- **QR Code** — o negócio contratante expõe um código que leva o cliente final direto ao **formulário de cadastro/agendamento**

**Como foi construído**

- **Frontend:** Next.js, React, TypeScript — painéis do estabelecimento, fluxos do cliente final e componentes reutilizáveis por vertical
- **Backend & integrações:** APIs REST, webhooks Stripe, filas de notificação e orquestração de mensagens
- **Entrega:** arquitetura multi-tenant para atender diversos setores com a mesma base de produto`,
      en: `I built **Minha Agenda** as a **Mãos Livres** digital product — a **full-stack Next.js application** for businesses that sell appointments and need lean operations without spreadsheets or manual WhatsApp.

**What the platform does**

- **Online scheduling** by segment (barbershop, aesthetic clinic, psychology, etc.) with flows adapted to each business type
- **Lightweight CRM** — client history, services, booking status, and an operational view for the business owner
- **Stripe payments** — billing and confirmation integrated into the booking flow
- **Email notifications** — confirmations, reminders, and transactional messages
- **WhatsApp automation** — automated messages to clients and businesses across the booking lifecycle
- **QR Code** — subscribing businesses expose a code that takes end customers straight to the **registration/booking form**

**How it was built**

- **Frontend:** Next.js, React, TypeScript — business panels, end-customer flows, and reusable components per vertical
- **Backend & integrations:** REST APIs, Stripe webhooks, notification queues, and message orchestration
- **Delivery:** multi-tenant architecture serving multiple industries from a single product base`,
    },
    technologies: [
      "Next.js",
      "React.js",
      "TypeScript",
      "Stripe",
      "WhatsApp API",
      "PostgreSQL",
      "REST APIs",
      "QR Code",
      "Email Automation",
      "CRM",
      "Tailwind CSS",
      "AWS",
    ],
    clients: [{ name: "Mãos Livres", relationship: "direct" }],
    link: "https://minhaagenda.maoslivres.com",
    media: [],
  },
  {
    id: "prodia",
    type: "personal",
    includeInJourney: false,
    company: "Mãos Livres · Prodia",
    role: {
      pt: "Cofundador do Produto & Arquiteto Principal de IA",
      en: "Product Co-founder & Lead AI Architect",
    },
    period: { start: "2026-05", end: null },
    tenures: [
      {
        company: "Mãos Livres · Prodia",
        role: {
          pt: "Cofundador do Produto & Arquiteto Principal de IA",
          en: "Product Co-founder & Lead AI Architect",
        },
        period: { start: "2026-05", end: null },
        highlight: {
          pt: "Produto SaaS da Mãos Livres (mai/2026) — criação e otimização de anúncios com IA generativa; em desenvolvimento.",
          en: "Mãos Livres SaaS product (May 2026) — AI-powered ad creation and optimization; in development.",
        },
      },
    ],
    recruiterImpact: {
      pt: "Produto SaaS da Mãos Livres para anúncios com IA generativa — arquitetura full stack com LLMs, pipelines de geração e backend escalável em AWS.",
      en: "Mãos Livres SaaS product for generative AI ads — full-stack architecture with LLMs, generation pipelines, and scalable AWS backend.",
    },
    shortDescription: {
      pt: "SaaS de anúncios com IA da Mãos Livres (mai/2026) — produto digital da empresa, em desenvolvimento.",
      en: "Mãos Livres AI ads SaaS (May 2026) — company digital product, in development.",
    },
    overview: {
      pt: `O **Prodia** é um **produto SaaS da Mãos Livres** para **criação e otimização de anúncios** com IA generativa, **iniciado em maio de 2026** — logo após a fundação da empresa (abril).

O produto **ainda está em desenvolvimento**; dúvidas e parcerias pelo **Hub de contato** em **[maoslivres.com](https://maoslivres.com)**.`,
      en: `**Prodia** is a **Mãos Livres SaaS product** for **creating and optimizing ads** with generative AI, **started in May 2026** — right after the company was founded (April).

The product **is still in development**; inquiries and partnerships via the **contact Hub** at **[maoslivres.com](https://maoslivres.com)**.`,
    },
    fullDescription: {
      pt: `Arquitetei e cofundei o **Prodia** como **produto digital da Mãos Livres** em **maio de 2026** — SaaS de anúncios com IA, no mesmo portfólio de produtos da empresa (como o Minha Agenda).

Principais destaques:

- **Foco em anúncios:** textos e ativos de venda com alto índice de conversão para lojistas
- **Pipelines de IA generativa:** LLMs e engenharia de prompt em larga escala
- **Backend escalável:** preparado para alto volume de geração de conteúdo
- **Stack:** Go, Node.js, Python, OpenAI API, bancos vetoriais e AWS`,
      en: `I architected and co-founded **Prodia** as a **Mãos Livres digital product** in **May 2026** — an AI ads SaaS in the same company product portfolio (alongside Minha Agenda).

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
      pt: "Freelance de 3 meses em WMS legado — manutenção crítica em financeiro (accounts payable/AP e accounts receivable/AR), comercial, marketing automation e estoque.",
      en: "3-month freelance on a legacy WMS — critical maintenance across finance (accounts payable/AP and accounts receivable/AR), sales, marketing automation, and inventory.",
    },
    shortDescription: {
      pt: "Manutenção em sistema legado de larga escala — módulos financeiro, comercial, marketing e estoque (Vue.js e C# .NET).",
      en: "Maintenance on a large-scale legacy system — finance, sales, marketing, and inventory modules (Vue.js and C# .NET).",
    },
    fullDescription: {
      pt: `Projeto freelance de **3 meses** na **POP+** — **manutenção e evolução** de um WMS legado que cobre toda a operação do negócio.

**Módulos atendidos**

- **Financeiro:** rotinas de accounts payable (AP) e accounts receivable (AR), conciliações e relatórios críticos em produção
- **Comercial:** fluxos de vendas, precificação e integrações com canais
- **Marketing automation:** campanhas, promoções e regras de negócio no back-office
- **Estoque:** controle de inventário, movimentações e sincronização operacional

**Entregas**

- Correções e evoluções full-stack em **Vue.js** (front) e **C# (.NET)** (back)
- Manutenção de **REST APIs** e **SQL Server** com testes de regressão, sem interromper a operação
- Estabilização de funcionalidades legadas em ambiente de alta criticidade`,
      en: `A **3-month freelance** project at **POP+** — **maintenance and evolution** of a legacy WMS spanning the entire business operation.

**Modules covered**

- **Finance:** accounts payable (AP) and accounts receivable (AR) routines, reconciliations, and critical production reports
- **Sales:** sales flows, pricing, and channel integrations
- **Marketing automation:** campaigns, promotions, and back-office business rules
- **Inventory:** stock control, movements, and operational synchronization

**Deliverables**

- Full-stack fixes and enhancements in **Vue.js** (front) and **C# (.NET)** (back)
- **REST API** and **SQL Server** maintenance with regression testing, without disrupting operations
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
      pt: "Segunda passagem na Devnology (jan/2025–mar/2026): liderei squads em extração e automação com Go/Rust — orquestração distribuída de workers, DLQ, redução de latência e governança técnica sob alto volume.",
      en: "Second stint at Devnology (Jan 2025–Mar 2026): led extraction and automation squads with Go/Rust — distributed worker orchestration, DLQ, latency reduction, and technical governance under high volume.",
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
          pt: "Recontratado após a Gomind para liderar squads de extração e automação — motores Go/Rust, orquestração distribuída de workers, Dead Letter Queues (DLQ), logs centralizados e migração de legados para throughput extremo.",
          en: "Rehired after Gomind to lead extraction and automation squads — Go/Rust engines, distributed worker orchestration, Dead Letter Queues (DLQ), centralized logs, and legacy migrations for extreme throughput.",
        },
      },
    ],
    fullDescription: {
      pt: `Retornei à Devnology para liderar squads técnicas e a arquitetura de projetos de elite em extração de dados e engenharia reversa.

Principais destaques:

- **Liderança técnica:** definição de arquitetura, padrões, QA e testes automatizados em squads de engenharia
- **Orquestração distribuída:** desenho de arquitetura para workers de extração com filas de reprocessamento (DLQ) e logs centralizados para auditoria
- **Engenharia reversa avançada:** motores em Go e Rust otimizados para contornar Akamai, Cloudflare e CAPTCHA
- **Alta performance:** migração de legados para linguagens compiladas — redução drástica de latência e aumento de throughput sob milhares de requisições concorrentes
- **CI/CD e operação em escala:** pipelines com GitHub Actions e Docker sob volumes massivos de dados`,
      en: `I returned to Devnology to lead technical squads and architecture for elite data extraction and reverse-engineering projects.

Key highlights:

- **Technical leadership:** architecture, standards, QA, and automated testing across engineering squads
- **Distributed orchestration:** architecture for extraction workers with Dead Letter Queue (DLQ) reprocessing and centralized audit logs
- **Advanced reverse engineering:** Go and Rust engines optimized to bypass Akamai, Cloudflare, and CAPTCHA
- **High performance:** legacy migration to compiled languages — drastic latency reduction and throughput increase under thousands of concurrent requests
- **CI/CD and scale operations:** GitHub Actions and Docker pipelines under massive data volumes`,
    },
    technologies: [
      "Go",
      "Rust",
      "Python",
      "Puppeteer",
      "Playwright",
      "Reverse Engineering",
      "Docker",
      "GitHub Actions",
      "CI/CD",
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
      pt: "Três evoluções na Gomind (nov/2023–jan/2025): RPA no MIA (AP/AR), orquestração de workers, hyperautomation com IA/LLMs, Fullstack Sênior e Líder Técnico — SAP, CI/CD e governança de dezenas de bots em produção.",
      en: "Three progressions at Gomind (Nov 2023–Jan 2025): RPA on MIA (AP/AR), worker orchestration, hyperautomation with AI/LLMs, Senior Full-Stack, and Tech Lead — SAP, CI/CD, and governance of dozens of production bots.",
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
          pt: "**Realizado:** plataforma de automação contábil no **MIA** — fluxos AP/AR, integrações AWS e pipeline CI/CD, reduzindo esforço operacional manual de squads parceiras. **Evolução:** promoção a Fullstack Sênior após ~6 meses por volume de entregas RPA e impacto técnico.",
          en: "**Delivered:** accounting automation platform on **MIA** — AP/AR flows, AWS integrations, and CI/CD pipelines, reducing manual operational effort for partner squads. **Growth:** promoted to Senior Full-Stack after ~6 months for RPA delivery volume and technical impact.",
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
          pt: "**Realizado:** orquestração de workers e integrações **REST API** de alto volume no MIA — filas, reprocessamento e monitoramento de jobs. **Evolução:** promoção a Líder Técnico após ~3 meses por liderança informal, QA em code reviews e entregas consistentes.",
          en: "**Delivered:** worker orchestration and high-volume **REST API** integrations on MIA — queues, reprocessing, and job monitoring. **Growth:** promoted to Tech Lead after ~3 months for informal leadership, QA in code reviews, and consistent delivery.",
        },
      },
      {
        company: "Gomind",
        role: { pt: "Líder Técnico", en: "Tech Lead" },
        period: { start: "2024-08", end: "2025-01" },
        highlight: {
          pt: "**Realizado:** governança e sustentação de dezenas de fluxos RPA no MIA — orquestração distribuída, DLQ, logs centralizados, integração de agentes IA/LLMs e automação SAP. **Saída:** retorno à Devnology em janeiro/2025 como Líder Técnico.",
          en: "**Delivered:** governance and sustainment of dozens of RPA flows on MIA — distributed orchestration, DLQ, centralized logs, AI/LLM agent integration, and SAP automation. **Exit:** returned to Devnology in January 2025 as Tech Lead.",
        },
      },
    ],
    fullDescription: {
      pt: `Permanência na **Gomind** com evolução contínua de cargo (veja roadmap acima).

**MIA (produto Gomind)**

- Plataforma focada em **automatizar processos de contabilidade** — accounts payable (AP), accounts receivable (AR), conciliações e rotinas fiscais, **reduzindo esforço operacional manual** de squads parceiras e mitigando erros em produção
- **Orquestração distribuída** de workers com filas SQS, **Dead Letter Queues (DLQ)** para reprocessamento e **logs centralizados** para auditoria
- Integração de **agentes de Inteligência Artificial e LLMs** aos fluxos RPA para análise semântica de documentos fiscais e classificação inteligente de dados operacionais
- Integrações **REST API** e hyperautomation onde reduz trabalho manual repetitivo

**Outros destaques técnicos**

- Automação SAP com workers para fluxos financeiros e logísticos — governança de dezenas de bots simultâneos
- Pipeline **CI/CD** com **GitHub Actions** e **Docker** para deploy seguro em AWS Lambda
- **Testes**, **QA** e testes de regressão em integrações de alto volume; redução de latência e erros em processamento em segundo plano`,
      en: `Tenure at **Gomind** with continuous role progression (see roadmap above).

**MIA (Gomind product)**

- Platform focused on **automating accounting processes** — accounts payable (AP), accounts receivable (AR), reconciliations, and tax routines, **reducing manual operational effort** for partner squads and mitigating production errors
- **Distributed orchestration** of workers with SQS queues, **Dead Letter Queues (DLQ)** for reprocessing, and **centralized logs** for audit
- Integration of **AI agents and LLMs** into RPA flows for semantic analysis of tax documents and intelligent operational data classification
- **REST API** integrations and hyperautomation where it removes repetitive manual work

**Other technical highlights**

- SAP automation with workers for financial and logistics flows — governance of dozens of concurrent bots
- **CI/CD** pipelines with **GitHub Actions** and **Docker** for safe deploys on AWS Lambda
- **Testing**, **QA**, and regression testing on high-volume integrations; lower latency and fewer errors in background processing`,
    },
    technologies: [
      "Node.js",
      "TypeScript",
      "Python",
      "REST APIs",
      "AWS Lambda",
      "SQS",
      "EventBridge",
      "API Gateway",
      "Docker",
      "GitHub Actions",
      "CI/CD",
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
      pt: "Freelance de 7 meses: liderei 4 devs em automação web para companhias aéreas — APIs de alto volume com baixa latência sob milhares de requisições concorrentes.",
      en: "7-month freelance: led 4 developers on web automation for airlines — high-volume APIs with low latency under thousands of concurrent requests.",
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
- Pipelines resilientes com **testes**, **QA** e tratamento de bloqueios, rate-limit e falhas intermitentes
- **REST APIs** e microsserviços com **Docker** para alto volume de requisições concorrentes
- Tuning de **PostgreSQL** e **Redis** para baixa latência sob carga`,
      en: `A **7-month freelance** project at **Andrinno Software House** — hired as a **web automation specialist** for the **airline** sector, one of the most demanding niches in scraping, anti-bot, and high concurrency.

**Role**

- **Technical leadership** of a **4-developer team** — architecture, code review, and delivery prioritization
- Technical reference based on prior experience in high-concurrency extraction

**Deliverables**

- Automation of extraction and integration with airline portals in production
- Resilient pipelines with **testing**, **QA**, and handling of blocks, rate limits, and intermittent failures
- **REST APIs** and microservices with **Docker** for high concurrent request volumes
- **PostgreSQL** and **Redis** tuning for low latency under load`,
    },
    technologies: [
      "Web Scraping",
      "Python",
      "Node.js",
      "TypeScript",
      "Fastify",
      "REST APIs",
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
          pt: "**Realizado:** web scraping, automação e suporte a 123 Milhas/MaxMilhas com testes em plantões de produção. **Evolução:** promoção a Pleno após 6 meses por impacto em entregas, confiabilidade e resolução de incidentes.",
          en: "**Delivered:** web scraping, automation, and support for 123 Milhas/MaxMilhas with on-call production testing. **Growth:** promoted to Mid-Level after 6 months for delivery impact, reliability, and incident resolution.",
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
          pt: "**Realizado:** otimização de pipelines com Docker e REST APIs; QA e testes automatizados antes de releases. **Saída:** layoff em set/2023 pela crise da 123 Milhas — desligamento estrutural, não por desempenho.",
          en: "**Delivered:** pipeline optimization with Docker and REST APIs; QA and automated testing before releases. **Exit:** layoff in Sep 2023 due to the 123 Milhas crisis — structural, not performance-related.",
        },
      },
    ],
    fullDescription: {
      pt: `Primeira passagem na Devnology — **permanência de 1 ano** (set/2022 a set/2023), com evolução de Júnior para Pleno (veja roadmap acima). Em novembro de 2023 iniciei na Gomind.

**Destaques técnicos**

- Extração em larga escala com alta concorrência e **REST APIs**
- Engenharia reversa e contorno de anti-bots (frontend e rede)
- **Docker**, **testes automatizados** e **QA** em motores de scraping antes de releases
- Puppeteer, Selenium, Python, JavaScript e operação na AWS`,
      en: `First stint at Devnology — **1 year total** (Sep 2022 to Sep 2023), with Junior-to-Mid-Level progression (see roadmap above). I joined Gomind in November 2023.

**Technical highlights**

- Large-scale extraction under high concurrency with **REST APIs**
- Reverse engineering and anti-bot bypass (frontend and network)
- **Docker**, **automated testing**, and **QA** on scraping engines before releases
- Puppeteer, Selenium, Python, JavaScript, and AWS operations`,
    },
    technologies: [
      "Python",
      "JavaScript",
      "Puppeteer",
      "Selenium",
      "Web Scraping",
      "REST APIs",
      "Docker",
      "GitHub Actions",
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
