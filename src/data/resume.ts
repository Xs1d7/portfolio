export interface Experience {
  company: string;
  role: { pt: string; en: string };
  period: { start: string; end: string | null };
  description: { pt: string; en: string };
  stack: string[];
}

export interface Education {
  institution: string;
  degree: { pt: string; en: string };
  period: { start: string; end: string | null };
}

export interface Course {
  name: { pt: string; en: string };
  institution: string;
  year: string;
  hours: number;
}

export interface Language {
  name: { pt: string; en: string };
  level: "native" | "fluent" | "intermediate" | "basic";
}

export interface Social {
  name: string;
  url: string;
  icon: "github" | "linkedin" | "email";
}

export const experiences: Experience[] = [
  {
    company: "Tech Solutions",
    role: {
      pt: "Desenvolvedora Frontend Pleno",
      en: "Mid-level Frontend Developer",
    },
    period: { start: "2023-03", end: null },
    description: {
      pt: "Desenvolvimento de interfaces modernas com React e Next.js. Implementação de design systems, otimização de performance e integração com APIs REST e GraphQL.",
      en: "Development of modern interfaces with React and Next.js. Implementation of design systems, performance optimization, and integration with REST and GraphQL APIs.",
    },
    stack: ["React", "Next.js", "TypeScript", "Tailwind CSS", "GraphQL"],
  },
  {
    company: "Digital Agency",
    role: {
      pt: "Desenvolvedora Frontend Junior",
      en: "Junior Frontend Developer",
    },
    period: { start: "2021-06", end: "2023-02" },
    description: {
      pt: "Criação de landing pages e aplicações web responsivas. Colaboração com designers para implementação pixel-perfect de layouts complexos.",
      en: "Creation of landing pages and responsive web applications. Collaboration with designers for pixel-perfect implementation of complex layouts.",
    },
    stack: ["React", "JavaScript", "SASS", "Styled Components"],
  },
  {
    company: "Startup XYZ",
    role: {
      pt: "Estagiária de Desenvolvimento Web",
      en: "Web Development Intern",
    },
    period: { start: "2020-08", end: "2021-05" },
    description: {
      pt: "Manutenção e desenvolvimento de features em aplicação web. Primeiro contato com metodologias ágeis e versionamento com Git.",
      en: "Maintenance and feature development in web application. First experience with agile methodologies and version control with Git.",
    },
    stack: ["HTML", "CSS", "JavaScript", "Git"],
  },
];

export const education: Education[] = [
  {
    institution: "Universidade Federal de São Paulo",
    degree: {
      pt: "Bacharelado em Ciência da Computação",
      en: "Bachelor's in Computer Science",
    },
    period: { start: "2018", end: "2022" },
  },
];

export const courses: Course[] = [
  {
    name: {
      pt: "React Avançado — Criando Aplicações com Next.js",
      en: "Advanced React — Building Applications with Next.js",
    },
    institution: "Udemy",
    year: "2024",
    hours: 95,
  },
  {
    name: {
      pt: "Formação TypeScript",
      en: "TypeScript Training",
    },
    institution: "Rocketseat",
    year: "2023",
    hours: 40,
  },
  {
    name: {
      pt: "UX/UI Design Fundamentals",
      en: "UX/UI Design Fundamentals",
    },
    institution: "Coursera",
    year: "2023",
    hours: 30,
  },
  {
    name: {
      pt: "Acessibilidade Web",
      en: "Web Accessibility",
    },
    institution: "W3Cx",
    year: "2022",
    hours: 20,
  },
];

export const languages: Language[] = [
  { name: { pt: "Português", en: "Portuguese" }, level: "native" },
  { name: { pt: "Inglês", en: "English" }, level: "fluent" },
  { name: { pt: "Espanhol", en: "Spanish" }, level: "intermediate" },
];

export const socials: Social[] = [
  {
    name: "GitHub",
    url: "https://github.com/andressa",
    icon: "github",
  },
  {
    name: "LinkedIn",
    url: "https://linkedin.com/in/andressa",
    icon: "linkedin",
  },
  {
    name: "Email",
    url: "mailto:andressa@email.com",
    icon: "email",
  },
];
