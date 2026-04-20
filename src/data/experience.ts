export interface MediaItem {
  type: "image" | "video";
  src: string;
  alt?: string;
  poster?: string;
}

export interface ExperienceEntry {
  id: string;
  company: string;
  role: { pt: string; en: string };
  period: { start: string; end: string | null };
  shortDescription: { pt: string; en: string };
  fullDescription: { pt: string; en: string };
  technologies: string[];
  media: MediaItem[];
}

export const experienceEntries: ExperienceEntry[] = [
{
  id: "ondish-foods",
  company: "Ondish Foods",
  role: {
    pt: "Frontend Developer",
    en: "Frontend Developer",
  },
  period: { start: "2025-10", end: null },
  shortDescription: {
    pt: "Desenvolvimento de interfaces web e mobile para plataforma de menu digital com pagamentos integrados e gestão inteligente para restaurantes.",
    en: "Development of web and mobile interfaces for a digital menu platform with integrated payments and smart restaurant management.",
  },
  fullDescription: {
    pt: "Atuo exclusivamente no desenvolvimento frontend da plataforma, sendo responsável pela construção das interfaces web do painel administrativo e do portal do parceiro (restaurantes).\n\nNo painel administrativo, desenvolvi a interface utilizada pelos administradores para aprovação de restaurantes, gestão geral da plataforma e visualização consolidada das operações.\n\nNo portal do parceiro, construí as telas onde os restaurantes realizam seu cadastro e gerenciam todas as informações do estabelecimento, incluindo:\n\n• Cadastro e edição de dados do restaurante\n• Gestão de mesas, pratos e bebidas\n• Cadastro de funcionários\n• Visualização e gerenciamento de pedidos (aceitar, recusar e acompanhar status)\n• Acesso a relatórios semanais\n\nMeu trabalho envolve a criação de componentes reutilizáveis, organização de layouts responsivos e evolução contínua das telas com melhorias de usabilidade, consistência visual e experiência do usuário.\n\nNo aplicativo mobile, atuo realizando ajustes e melhorias visuais conforme demandas do produto, incluindo alterações de cores, tamanhos, imagens e refinamentos de interface para manter a consistência da experiência entre web e mobile.",
    en: "I work exclusively on the frontend development of the platform, being responsible for building the web interfaces for the Admin Dashboard and the Partner Portal (restaurants).\n\nFor the Admin Dashboard, I developed the interface used by administrators to approve restaurants, manage overall platform operations, and maintain a consolidated system overview.\n\nFor the Partner Portal, I built the interfaces where restaurants register and manage all their business information, including:\n\n• Restaurant profile management\n• Tables, menu items, and drinks management\n• Staff registration\n• Order management (accept, reject, and track status)\n• Weekly reports and performance insights\n\nMy work involves building reusable components, structuring responsive layouts, and continuously improving usability, visual consistency, and user experience.\n\nOn the mobile application, I contribute by implementing requested visual adjustments and UI refinements, including updates to colors, spacing, sizing, images, and layout improvements to ensure consistency between web and mobile experiences.",
  },
  technologies: [
    "React",
    "React Native",
    "TypeScript",
    "UI/UX",
    "Responsive Design",
  ],
  media: [
    {
      type: "video",
      src: "/media/projects/ondish-video.mp4",
      alt: "Ondish platform demo",
    },
  ],
},

{
  id: "athena-ti",
  company: "Athena Tecnologia da Informação",
  role: {
    pt: "Full Stack Developer",
    en: "Full Stack Developer",
  },
  period: { start: "2025-04", end: "2026-01" },
  shortDescription: {
    pt: "Desenvolvimento fullstack de plataforma de agentes de IA personalizados com controle de uso e integrações externas.",
    en: "Full-stack development of a customizable AI agents platform with usage control and external integrations.",
  },
  fullDescription: {
    pt: "Assumi o projeto a partir de uma base inicial e fui responsável por estruturar e desenvolver praticamente toda a evolução da plataforma.\n\nInicialmente, recebi a orientação de seguir o design existente e realizar pequenos ajustes, porém o produto passou por três reformulações completas de interface ao longo do desenvolvimento, exigindo reconstruções significativas e adaptação constante às novas diretrizes visuais — todas implementadas por mim de forma independente.\n\nAtuei no desenvolvimento fullstack utilizando NestJS no backend, Prisma como ORM e MySQL como banco de dados, estruturando serviços, regras de negócio e modelagem de dados.\n\nImplementei controle diário e mensal de consumo por plano, sistema de monitoramento e agregação de tokens, além de autenticação baseada em permissões.\n\nFui responsável por estudar e implementar toda a integração com a Stripe, desenvolvendo o fluxo completo de pagamentos e assinaturas: criação de planos, cobrança recorrente automática, cancelamento, alteração de plano e gestão de clientes.\n\nTambém integrei múltiplos provedores de IA, estruturando a lógica de consumo e controle de uso da plataforma.\n\nO projeto exigiu alta capacidade de adaptação, aprendizado contínuo e autonomia técnica para transformar requisitos em uma solução escalável e funcional.",
    en: "I took over the project from an initial foundation and became responsible for building and evolving most of the platform.\n\nInitially, I was asked to follow the existing design and apply minor adjustments, but the product went through three complete UI redesigns during development, requiring significant rebuilds and continuous adaptation — all implemented independently by me.\n\nI worked as a full-stack developer using NestJS for the backend, Prisma as ORM, and MySQL as the database, structuring services, business logic, and data modeling.\n\nI implemented daily and monthly usage control per subscription plan, token monitoring and aggregation systems, and role-based authentication.\n\nI independently learned and implemented the full Stripe integration, building the complete subscription workflow: plan creation, recurring billing, plan upgrades and downgrades, cancellation flows, and customer management.\n\nI also integrated multiple AI providers, designing the consumption logic and usage control mechanisms for the platform.\n\nThe project required strong autonomy, adaptability, continuous learning, and the ability to translate evolving requirements into a scalable and reliable solution.",
  },
  technologies: [
    "NestJS",
    "React",
    "TypeScript",
    "Prisma",
    "Stripe API",
    "OpenAI",
    "Claude",
    "Gemini",
    "REST APIs",
  ],
  media: [
    {
      type: "video",
      src: "/media/projects/hubbia_2.mp4",
      alt: "Hubbia platform demo",
    },
    {
      type: "video",
      src: "/media/projects/hubbia_3.mp4",
      alt: "Hubbia platform demo",
    },
    {
      type: "video",
      src: "/media/projects/hubbia_4.mp4",
      alt: "Hubbia platform demo",
    },
  ],
},

{
  id: "software-precisao",
  company: "Software Precisão",
  role: {
    pt: "Back-End Developer",
    en: "Back-End Developer",
  },
  period: { start: "2024-07", end: "2025-06" },
  shortDescription: {
    pt: "Desenvolvimento backend e automações para múltiplos projetos, atuando na construção de APIs, modelagem de banco de dados e integrações com serviços externos.",
    en: "Backend development and automation across multiple projects, building APIs, designing databases, and integrating external services.",
  },
  fullDescription: {
    pt: "Atuei como desenvolvedora backend utilizando Node.js com TypeScript, sendo responsável pela implementação de APIs, regras de negócio e modelagem de banco de dados em diferentes projetos.\n\nTrabalhei no backend do Ondish Foods, além de participar do desenvolvimento de sistemas para uma funerária e uma plataforma para corretores.\n\nNo projeto voltado para corretores, fui responsável por toda a estrutura backend, desde a escrita do código até a criação e modelagem do banco de dados. Também implementei a integração de pagamentos utilizando a API do Asaas, desenvolvendo fluxos de cobrança e gerenciamento financeiro.\n\nEm outro projeto com proposta semelhante a um aplicativo de transporte, utilizei o Amazon Location Service para implementação de funcionalidades relacionadas à geolocalização e mapeamento.\n\nAlém disso, atuei com MySQL e Sequelize, automação de pipelines CI/CD, monitoramento e manutenção de servidores, e desenvolvimento de automações internas com Python e Selenium.\n\nTambém participei de reuniões técnicas com clientes e atuei na resolução de problemas em produção, garantindo estabilidade e continuidade dos sistemas.",
    en: "I worked as a backend developer using Node.js with TypeScript, being responsible for implementing APIs, business logic, and database modeling across multiple projects.\n\nI contributed to the backend of Ondish Foods and also worked on systems for a funeral services company and a platform for brokers.\n\nIn the brokers platform project, I was fully responsible for the backend structure, from writing the code to designing and creating the database. I also implemented payment integration using the Asaas API, building billing flows and financial management logic.\n\nIn another project similar to a ride-hailing application, I used Amazon Location Service to implement geolocation and mapping functionalities.\n\nAdditionally, I worked with MySQL and Sequelize, automated CI/CD pipelines, handled server monitoring and maintenance, and developed internal automation tools using Python and Selenium.\n\nI also participated in technical meetings with clients and handled production issue resolution, ensuring system stability and reliability.",
  },
  technologies: [
    "Node.js",
    "TypeScript",
    "MySQL",
    "Sequelize",
    "AWS",
    "Amazon Location Service",
    "Python",
    "Selenium",
    "CI/CD",
    "Asaas API",
  ],
  media: [],
},
  {
    id: "andrinno",
    company: "Andrinno Software House",
    role: {
      pt: "Backend Developer",
      en: "Backend Developer",
    },
    period: { start: "2024-08", end: "2024-10" },
    shortDescription: {
      pt: "Desenvolvimento de sistema de busca e comparação de passagens aéreas integrado a APIs de parceiros.",
      en: "Development of a flight search and comparison system integrated with partner APIs.",
    },
    fullDescription: {
      pt: "Desenvolvi um sistema robusto de busca de passagens aéreas integrando APIs como Travellink Wooba e Tk Milhas, permitindo comparação entre diferentes programas de fidelidade. O foco foi criar integrações confiáveis, processamento eficiente de dados e respostas rápidas para consultas complexas.",
      en: "Developed a robust flight search system integrating partner APIs such as Travellink Wooba and Tk Milhas, enabling comparison across different loyalty programs. Focused on reliable integrations, efficient data processing, and fast responses for complex queries.",
    },
    technologies: [
      "Node.js",
      "API Integration",
      "REST",
      "Backend Architecture",
    ],
    media: [],
  },

  {
    id: "devnology",
    company: "Devnology",
    role: {
      pt: "Back-End Developer (RPA)",
      en: "Back-End Developer (RPA)",
    },
    period: { start: "2024-04", end: "2024-07" },
    shortDescription: {
      pt: "Desenvolvimento de automações RPA para emissão de passagens aéreas e extração de dados.",
      en: "Development of RPA automations for airline ticket issuance and data extraction.",
    },
    fullDescription: {
      pt: "Contribuí para soluções de automação de processos robóticos (RPA) para emissão de passagens das principais companhias aéreas do Brasil, incluindo LATAM, utilizadas pela MaxMilhas. Desenvolvi automações para extração de dados de contas, criação de queries MySQL, correção de bugs e refatoração de sistemas existentes utilizando Node.js, Python e TypeScript.",
      en: "Contributed to robotic process automation (RPA) solutions for airline ticket issuance for major Brazilian airlines, including LATAM, used by MaxMilhas. Built automations for account data extraction, created MySQL queries, fixed bugs, and refactored existing systems using Node.js, Python, and TypeScript.",
    },
    technologies: [
      "Node.js",
      "Python",
      "TypeScript",
      "RPA",
      "MySQL",
      "GitLab CI/CD",
    ],
    media: [],
  },
];
