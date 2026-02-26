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
    id: "tech-solutions",
    company: "Tech Solutions",
    role: {
      pt: "Desenvolvedora Frontend Pleno",
      en: "Mid-level Frontend Developer",
    },
    period: { start: "2023-03", end: null },
    shortDescription: {
      pt: "Desenvolvimento de interfaces modernas com React e Next.js. Implementação de design systems e otimização de performance.",
      en: "Development of modern interfaces with React and Next.js. Implementation of design systems and performance optimization.",
    },
    fullDescription: {
      pt: "Liderança técnica no desenvolvimento do design system interno utilizado por 4 squads. Responsável pela migração da aplicação principal de CRA para Next.js App Router, resultando em 40% de melhoria no LCP. Implementação de integração com APIs GraphQL, sistema de cache otimizado e testes automatizados com Testing Library.",
      en: "Technical lead in the development of the internal design system used by 4 squads. Responsible for migrating the main application from CRA to Next.js App Router, resulting in a 40% LCP improvement. Implementation of GraphQL API integration, optimized caching system, and automated tests with Testing Library.",
    },
    technologies: ["React", "Next.js", "TypeScript", "Tailwind CSS", "GraphQL", "Testing Library", "Storybook"],
    media: [
      { type: "image", src: "/media/projects/dashboard-1.svg", alt: "Dashboard principal" },
      { type: "image", src: "/media/projects/dashboard-2.svg", alt: "Design system components" },
      { type: "image", src: "/media/projects/dashboard-3.svg", alt: "Analytics view" },
    ],
  },
  {
    id: "digital-agency",
    company: "Digital Agency",
    role: {
      pt: "Desenvolvedora Frontend Junior",
      en: "Junior Frontend Developer",
    },
    period: { start: "2021-06", end: "2023-02" },
    shortDescription: {
      pt: "Criação de landing pages e aplicações web responsivas com foco em conversão e performance.",
      en: "Creation of landing pages and responsive web applications focused on conversion and performance.",
    },
    fullDescription: {
      pt: "Desenvolvimento de mais de 20 landing pages de alta conversão para clientes dos setores de fintech, saúde e e-commerce. Colaboração direta com equipe de design para implementação pixel-perfect. Criação de componentes reutilizáveis que reduziram o tempo de desenvolvimento em 30%. Implementação de animações complexas e micro-interações.",
      en: "Development of over 20 high-conversion landing pages for clients in fintech, healthcare, and e-commerce sectors. Direct collaboration with design team for pixel-perfect implementation. Creation of reusable components that reduced development time by 30%. Implementation of complex animations and micro-interactions.",
    },
    technologies: ["React", "JavaScript", "SASS", "Styled Components", "GSAP", "Webpack"],
    media: [
      { type: "image", src: "/media/projects/landing-1.svg", alt: "Landing page hero" },
      { type: "image", src: "/media/projects/landing-2.svg", alt: "Pricing section" },
    ],
  },
  {
    id: "startup-xyz",
    company: "Startup XYZ",
    role: {
      pt: "Estagiária de Desenvolvimento Web",
      en: "Web Development Intern",
    },
    period: { start: "2020-08", end: "2021-05" },
    shortDescription: {
      pt: "Manutenção e desenvolvimento de features em aplicação SaaS. Primeiro contato com metodologias ágeis.",
      en: "Maintenance and feature development in SaaS application. First experience with agile methodologies.",
    },
    fullDescription: {
      pt: "Desenvolvimento de features para plataforma SaaS de gestão empresarial. Participação ativa em sprints, code reviews e cerimônias ágeis. Implementação de formulários dinâmicos, dashboard de métricas e sistema de notificações em tempo real. Responsável pela documentação técnica de componentes.",
      en: "Feature development for a business management SaaS platform. Active participation in sprints, code reviews, and agile ceremonies. Implementation of dynamic forms, metrics dashboard, and real-time notification system. Responsible for technical component documentation.",
    },
    technologies: ["HTML", "CSS", "JavaScript", "jQuery", "Bootstrap", "Git"],
    media: [
      { type: "image", src: "/media/projects/webapp-1.svg", alt: "Web application" },
    ],
  },
  {
    id: "freelance-2020",
    company: "Freelancer",
    role: {
      pt: "Desenvolvedora Web Freelancer",
      en: "Freelance Web Developer",
    },
    period: { start: "2019-06", end: "2020-07" },
    shortDescription: {
      pt: "Desenvolvimento de sites institucionais e lojas virtuais para pequenos negócios locais.",
      en: "Development of institutional websites and online stores for local small businesses.",
    },
    fullDescription: {
      pt: "Criação de websites completos para 8 clientes, desde o levantamento de requisitos até o deploy. Desenvolvimento de e-commerce com integração de pagamento, sites institucionais responsivos e sistemas de agendamento. Gestão completa de projetos incluindo comunicação com clientes e prazos.",
      en: "Creation of complete websites for 8 clients, from requirements gathering to deployment. E-commerce development with payment integration, responsive institutional sites, and scheduling systems. Complete project management including client communication and deadlines.",
    },
    technologies: ["HTML", "CSS", "JavaScript", "WordPress", "PHP", "MySQL"],
    media: [],
  },
  {
    id: "volunteer-ngo",
    company: "ONG EducaTech",
    role: {
      pt: "Voluntária de Tecnologia",
      en: "Technology Volunteer",
    },
    period: { start: "2019-01", end: "2019-12" },
    shortDescription: {
      pt: "Ensino de programação básica para jovens em comunidades e manutenção do site da ONG.",
      en: "Teaching basic programming to youth in communities and maintaining the NGO website.",
    },
    fullDescription: {
      pt: "Instrutora voluntária ensinando HTML, CSS e lógica de programação para turmas de 15-20 jovens entre 14 e 18 anos. Reformulação completa do site institucional da ONG, melhorando a acessibilidade e performance. Criação de material didático adaptado para iniciantes.",
      en: "Volunteer instructor teaching HTML, CSS, and programming logic to classes of 15-20 young people ages 14-18. Complete redesign of the NGO institutional website, improving accessibility and performance. Creation of educational material adapted for beginners.",
    },
    technologies: ["HTML", "CSS", "JavaScript", "WordPress"],
    media: [],
  },
];
