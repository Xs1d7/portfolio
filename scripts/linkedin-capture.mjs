#!/usr/bin/env node
/**
 * Gera screenshots do portfolio para post no LinkedIn.
 *
 * Uso:
 *   npm run linkedin:setup    # primeira vez — instala Chromium do Playwright
 *   npm run linkedin:capture  # gera imagens + copia templates para ./linkedin/
 *
 * Opções (env):
 *   LINKEDIN_BASE_URL=http://localhost:3000  — URL do site (default)
 *   LINKEDIN_SKIP_SERVER=1                   — não inicia o dev server
 *   LINKEDIN_PORT=3000
 */
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { spawn } from "node:child_process";
import http from "node:http";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.join(__dirname, "..");
const OUT = path.join(ROOT, "linkedin");
const IMAGES = path.join(OUT, "images");
const CAROUSEL = path.join(IMAGES, "carousel");
const WIDE = path.join(IMAGES, "linkedin-wide");
const COPY = path.join(OUT, "copy");
const TEMPLATES = path.join(__dirname, "linkedin-templates");

const PORT = Number(process.env.LINKEDIN_PORT || 3000);
const BASE_URL = process.env.LINKEDIN_BASE_URL || `http://localhost:${PORT}`;
const SKIP_SERVER = process.env.LINKEDIN_SKIP_SERVER === "1";

const VIEWPORT = { width: 1440, height: 900 };
const WAIT_PARTICLES_MS = 2800;
const WAIT_ANIM_MS = 600;

function log(msg) {
  console.log(`[linkedin] ${msg}`);
}

function ensureDirs() {
  for (const dir of [OUT, IMAGES, CAROUSEL, WIDE, COPY]) {
    fs.mkdirSync(dir, { recursive: true });
  }
}

function copyTemplates() {
  if (!fs.existsSync(TEMPLATES)) return;
  for (const file of fs.readdirSync(TEMPLATES)) {
    if (!file.endsWith(".md")) continue;
    fs.copyFileSync(
      path.join(TEMPLATES, file),
      path.join(COPY, file),
    );
  }
  log(`Copy templates → ${COPY}`);
}

function writeReadme() {
  const readme = `# Assets LinkedIn (local — não vai pro GitHub)

Gerado em: ${new Date().toISOString()}

## Comandos

\`\`\`bash
npm run linkedin:setup    # primeira vez
npm run linkedin:capture  # regerar imagens + copy
\`\`\`

## Pastas

- \`copy/\` — textos do post (edite \`post-pt.md\` antes de publicar)
- \`images/\` — screenshots desktop (1440×900)
- \`images/carousel/\` — recortes 1080×1080 para carrossel
- \`images/linkedin-wide/\` — recortes 1200×627 para posts paisagem

## Fluxo sugerido

1. Rode \`npm run linkedin:capture\`
2. Abra \`copy/post-pt.md\` e substitua \`[SEU-LINK-AQUI]\`
3. Escolha 5–8 imagens de \`images/carousel/\`
4. Siga \`copy/guia-carrossel.md\` para ordem dos slides
5. Publique no LinkedIn + primeiro comentário com link

## Servidor

Por padrão o script sobe \`npm run dev\` se nada estiver rodando na porta ${PORT}.
Para usar produção: \`npm run build && npm run start\` e \`LINKEDIN_SKIP_SERVER=1 npm run linkedin:capture\`
`;
  fs.writeFileSync(path.join(OUT, "README.md"), readme, "utf8");
}

function wait(ms) {
  return new Promise((r) => setTimeout(r, ms));
}

function ping(url) {
  return new Promise((resolve) => {
    const req = http.get(url, (res) => {
      res.resume();
      resolve(res.statusCode && res.statusCode < 500);
    });
    req.on("error", () => resolve(false));
    req.setTimeout(2000, () => {
      req.destroy();
      resolve(false);
    });
  });
}

async function waitForServer(url, maxAttempts = 60) {
  for (let i = 0; i < maxAttempts; i++) {
    if (await ping(url)) return true;
    await wait(500);
  }
  return false;
}

function startDevServer() {
  const isWin = process.platform === "win32";
  const child = spawn(isWin ? "npm.cmd" : "npm", ["run", "dev", "--", "-p", String(PORT)], {
    cwd: ROOT,
    stdio: "pipe",
    shell: isWin,
    env: { ...process.env, PORT: String(PORT) },
  });
  child.stdout?.on("data", () => {});
  child.stderr?.on("data", () => {});
  return child;
}

async function scrollTo(page, selector) {
  await page.locator(selector).scrollIntoViewIfNeeded();
  await wait(WAIT_ANIM_MS);
}

async function shot(page, name, opts = {}) {
  const file = path.join(IMAGES, name);
  await page.screenshot({ path: file, type: "png", ...opts });
  log(`  ✓ ${name}`);
  return file;
}

async function cropVariants(sharp, sourcePath, baseName) {
  const img = sharp(sourcePath);
  const meta = await img.metadata();
  const w = meta.width || VIEWPORT.width;
  const h = meta.height || VIEWPORT.height;

  // 1080×1080 — centro superior (hero-friendly)
  const sq = 1080;
  const topCrop = {
    left: Math.max(0, Math.round((w - sq) / 2)),
    top: 0,
    width: Math.min(sq, w),
    height: Math.min(sq, h),
  };
  await sharp(sourcePath)
    .extract(topCrop)
    .resize(sq, sq, { fit: "cover", position: "top" })
    .png()
    .toFile(path.join(CAROUSEL, `${baseName}-1080.png`));

  // 1200×627 — LinkedIn link preview ratio
  const lw = 1200;
  const lh = 627;
  await sharp(sourcePath)
    .resize(lw, lh, { fit: "cover", position: "top" })
    .png()
    .toFile(path.join(WIDE, `${baseName}-1200x627.png`));
}

async function captureScreenshots() {
  let playwright;
  try {
    playwright = await import("playwright");
  } catch {
    console.error(`
Erro: Playwright não instalado.

Rode primeiro:
  npm run linkedin:setup

Ou:
  npm install -D playwright
  npx playwright install chromium
`);
    process.exit(1);
  }

  const browser = await playwright.chromium.launch({ headless: true });
  const context = await browser.newContext({
    viewport: VIEWPORT,
    deviceScaleFactor: 2,
    locale: "pt-BR",
  });
  const page = await context.newPage();

  log(`Abrindo ${BASE_URL} …`);
  await page.goto(BASE_URL, { waitUntil: "networkidle", timeout: 120_000 });
  await wait(WAIT_PARTICLES_MS);

  // 01 Hero light
  await shot(page, "01-hero-light.png");

  // 02 Hero dark
  await page.locator('[aria-label="Alternar tema"]').click();
  await wait(WAIT_ANIM_MS);
  await shot(page, "02-hero-dark.png");
  await page.locator('[aria-label="Alternar tema"]').click();
  await wait(WAIT_ANIM_MS);

  // 03 Particles — hero com planeta visível
  await wait(1200);
  await shot(page, "03-planeta-particulas.png");

  // 04 Experience journey
  await scrollTo(page, "#experience");
  await wait(WAIT_PARTICLES_MS);
  await shot(page, "04-experiencia-jornada.png");

  // 05 Maos Livres highlight (top of experience)
  await shot(page, "05-maos-livres.png", {
    clip: { x: 0, y: 120, width: VIEWPORT.width, height: 520 },
  });

  // 06 Resume PDF panel
  await scrollTo(page, "#about");
  const resumeBtn = page.locator('[aria-controls="resume-export-panel"]');
  await resumeBtn.click();
  await wait(WAIT_ANIM_MS);
  await shot(page, "06-curriculo-pdf.png");

  // 07 Experience detail panel — avança até um marco com experiência vinculada
  await scrollTo(page, "#experience");
  const nextBtn = page.getByRole("button", { name: /Próximo/i });
  for (let i = 0; i < 15; i++) {
    const explore = page.getByRole("button", { name: /Explorar esta etapa/i });
    if (await explore.count()) break;
    if (await nextBtn.isDisabled()) break;
    await nextBtn.click();
    await wait(450);
  }
  const exploreBtn = page.getByRole("button", { name: /Explorar esta etapa/i }).first();
  if (await exploreBtn.count()) {
    await exploreBtn.click();
    await wait(1200);
    await shot(page, "07-experiencia-detalhe.png");
    await page.locator(".fixed.inset-0.bg-black\\/60").click({ force: true });
    await wait(400);
  } else {
    log("  ⚠ painel de detalhe não aberto — pulando 07");
  }

  // 08 Skills
  await scrollTo(page, "#skills");
  await wait(WAIT_PARTICLES_MS);
  await shot(page, "08-skills.png");

  // 09 Full page
  await page.goto(BASE_URL, { waitUntil: "networkidle" });
  await wait(1500);
  await shot(page, "09-pagina-completa.png", { fullPage: true });

  await browser.close();
}

async function buildCarouselCrops() {
  let sharp;
  try {
    sharp = (await import("sharp")).default;
  } catch {
    log("sharp não disponível — pulando recortes carousel/wide");
    return;
  }

  const map = [
    ["01-hero-light.png", "01-hero-light"],
    ["02-hero-dark.png", "02-hero-dark"],
    ["03-planeta-particulas.png", "03-planeta"],
    ["04-experiencia-jornada.png", "04-jornada"],
    ["05-maos-livres.png", "05-maos-livres"],
    ["06-curriculo-pdf.png", "06-curriculo"],
    ["07-experiencia-detalhe.png", "07-detalhe"],
    ["08-skills.png", "08-skills"],
  ];

  log("Gerando recortes carousel (1080²) e wide (1200×627)…");
  for (const [file, base] of map) {
    const src = path.join(IMAGES, file);
    if (!fs.existsSync(src)) continue;
    try {
      await cropVariants(sharp, src, base);
      log(`  ✓ carousel/${base}-1080.png`);
    } catch (e) {
      log(`  ⚠ recorte falhou para ${file}: ${e.message}`);
    }
  }
}

async function main() {
  ensureDirs();
  copyTemplates();
  writeReadme();

  let serverChild = null;
  const up = await ping(BASE_URL);

  if (!up && !SKIP_SERVER) {
    log(`Servidor não detectado em ${BASE_URL} — iniciando npm run dev…`);
    serverChild = startDevServer();
    const ready = await waitForServer(BASE_URL);
    if (!ready) {
      serverChild.kill();
      console.error(`Timeout: servidor não respondeu em ${BASE_URL}`);
      process.exit(1);
    }
    log("Servidor pronto.");
  } else if (!up) {
    console.error(`Servidor offline em ${BASE_URL}. Rode npm run dev ou remova LINKEDIN_SKIP_SERVER.`);
    process.exit(1);
  }

  try {
    log("Capturando screenshots…");
    await captureScreenshots();
    await buildCarouselCrops();
    log(`
Concluído!

  Copy:   ${COPY}/post-pt.md
  Imagens: ${IMAGES}/
  Carrossel: ${CAROUSEL}/

Edite o copy, escolha as imagens e publique.`);
  } finally {
    if (serverChild) {
      log("Encerrando dev server…");
      serverChild.kill("SIGTERM");
    }
  }
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
