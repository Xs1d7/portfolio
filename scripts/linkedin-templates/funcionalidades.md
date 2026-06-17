# Funcionalidades do portfolio — inventário para o post

Use este arquivo como referência ao montar o carrossel e responder comentários.

## Experiência do recrutador (UX)

| Funcionalidade | O que faz | Por que importa |
|---|---|---|
| **Navegação por seções** | Header sticky com âncoras (Sobre, Experiência, Freelances, Skills, etc.) + barra de progresso de scroll | Recrutador encontra o que precisa em segundos |
| **PT / EN** | Toggle de idioma em tempo real (JSON i18n) | Mesmo site para vagas BR e internacionais |
| **Tema claro / escuro** | Toggle com persistência local | Conforto visual; detalhe de polish |
| **Scroll livre** | Sem scroll-jacking na jornada de experiência | Respeita o tempo do recrutador — não prende na timeline |

## Conteúdo profissional

| Funcionalidade | O que faz | Por que importa |
|---|---|---|
| **Hero + posicionamento** | Tech Lead · Sênior, automação, Go/Rust, IA | Primeira impressão clara em 5 segundos |
| **Jornada de carreira** | Timeline interativa — um marco por cargo (CLT, PJ, pessoal) | Conta a evolução sem PDF genérico |
| **Lista de experiências** | Modo alternativo com filtros (Todos / Pessoal / Full-time) | Quem prefere scan rápido |
| **Painel de detalhe** | Slide-over com overview, contribuição, tecnologias, clientes, galeria | Profundidade sem sair da página |
| **Destaque Mãos Livres** | Card com link direto para maoslivres.com | Mostra empresa própria de forma simples |
| **Freelances** | Projetos por cliente com tempo de produção | Prova entrega ponta a ponta |
| **Skills, educação, cursos, idiomas** | Seções dedicadas com dados estruturados | CV web completo |
| **Contato + redes** | Links diretos para LinkedIn, GitHub, e-mail | Conversão no fim do funil |

## Diferenciais técnicos (wow factor)

| Funcionalidade | Stack | O que faz |
|---|---|---|
| **Planeta de partículas 3D** | Three.js + React Three Fiber | Silhueta pessoal vira “planeta” que dissolve e reforma conforme a seção ativa |
| **Cursor customizado** | CSS + RAF | Anel suave que segue o mouse (desktop) |
| **Animações de seção** | Framer Motion | Entradas, transições da jornada, painéis |
| **Capivara mascote** | Framer Motion + SVG | Easter egg ao abrir painéis de detalhe |
| **Currículo PDF inteligente** | @react-pdf/renderer | PDF gerado no browser com foco de vaga (Backend, Tech Lead, IA…) e filtro de tech |
| **Acessibilidade** | prefers-reduced-motion, aria | Partículas e cursor desligam em mobile / reduced motion |
| **Performance** | Next.js 16, dynamic import, subsample de partículas | WebGL só carrega quando faz sentido |

## Stack principal

- **Framework:** Next.js 16 (App Router) + React 19 + TypeScript
- **Estilo:** Tailwind CSS 4
- **Motion:** Framer Motion
- **3D:** Three.js, @react-three/fiber
- **PDF:** @react-pdf/renderer
- **Conteúdo:** Markdown nos detalhes, dados tipados em `src/data/`

## Imagens geradas (mapeamento sugerido para carrossel)

| Arquivo | Mostrar no slide |
|---|---|
| `01-hero-light.png` | Capa — “Portfolio que respira código e cuidado com quem lê” |
| `02-hero-dark.png` | Tema escuro — polish visual |
| `03-planeta-particulas.png` | Planeta 3D — o diferencial visual |
| `04-experiencia-jornada.png` | Jornada de carreira interativa |
| `05-maos-livres.png` | Empresa própria (Mãos Livres) |
| `06-curriculo-pdf.png` | CV PDF personalizado por vaga |
| `07-experiencia-detalhe.png` | Profundidade sem sair da página |
| `08-skills.png` | Stack técnica organizada |
| `carousel/01-hero-light-1080.png` | Versões 1080×1080 prontas para carrossel LinkedIn |
