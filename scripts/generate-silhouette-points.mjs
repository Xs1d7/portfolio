#!/usr/bin/env node
/**
 * Segments jefferson_picture.png and exports particle coordinates for the silhouette scene.
 * Uses corner-sampled background removal (no runtime ML dependency).
 */
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import sharp from "sharp";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.join(__dirname, "..");
const INPUT = path.join(ROOT, "public/jefferson_picture.png");
const OUT_DIR = path.join(ROOT, "public/data");
const OUT_JSON = path.join(OUT_DIR, "silhouette-points.json");
const OUT_MASK = path.join(OUT_DIR, "silhouette-mask.png");
const STEP = 12;
const ALPHA_THRESHOLD = 128;

function colorDistance(r1, g1, b1, r2, g2, b2) {
  return Math.sqrt((r1 - r2) ** 2 + (g1 - g2) ** 2 + (b1 - b2) ** 2);
}

function sampleCorners(data, width, height, channels) {
  const samples = [];
  const points = [
    [2, 2],
    [width - 3, 2],
    [2, height - 3],
    [width - 3, height - 3],
    [width >> 1, 2],
    [width >> 1, height - 3],
  ];
  for (const [x, y] of points) {
    const i = (y * width + x) * channels;
    samples.push([data[i], data[i + 1], data[i + 2]]);
  }
  const avg = [0, 0, 0];
  for (const s of samples) {
    avg[0] += s[0];
    avg[1] += s[1];
    avg[2] += s[2];
  }
  return avg.map((v) => v / samples.length);
}

function buildForegroundMask(data, width, height, channels) {
  const bg = sampleCorners(data, width, height, channels);
  const mask = new Uint8Array(width * height);
  let threshold = 42;

  // Adapt threshold until foreground is a reasonable fraction of the image
  for (let attempt = 0; attempt < 8; attempt++) {
    let count = 0;
    for (let y = 0; y < height; y++) {
      for (let x = 0; x < width; x++) {
        const i = (y * width + x) * channels;
        const r = data[i];
        const g = data[i + 1];
        const b = data[i + 2];
        const a = channels === 4 ? data[i + 3] : 255;
        const dist = colorDistance(r, g, b, bg[0], bg[1], bg[2]);
        const isFg =
          a > ALPHA_THRESHOLD && dist > threshold && !(r > 240 && g > 240 && b > 240);
        mask[y * width + x] = isFg ? 255 : 0;
        if (isFg) count++;
      }
    }
    const ratio = count / (width * height);
    if (ratio > 0.08 && ratio < 0.55) break;
    threshold = ratio > 0.55 ? threshold + 12 : threshold - 8;
  }

  return mask;
}

function boundingBox(mask, width, height) {
  let minX = width;
  let minY = height;
  let maxX = 0;
  let maxY = 0;
  for (let y = 0; y < height; y++) {
    for (let x = 0; x < width; x++) {
      if (mask[y * width + x] > 0) {
        minX = Math.min(minX, x);
        minY = Math.min(minY, y);
        maxX = Math.max(maxX, x);
        maxY = Math.max(maxY, y);
      }
    }
  }
  return { minX, minY, maxX, maxY, w: maxX - minX + 1, h: maxY - minY + 1 };
}

function samplePoints(mask, width, height, bbox) {
  const points = [];
  const centerX = (bbox.minX + bbox.maxX) / 2;

  for (let y = bbox.minY; y <= bbox.maxY; y += STEP) {
    for (let x = bbox.minX; x <= bbox.maxX; x += STEP) {
      if (mask[y * width + x] === 0) continue;
      const nx = (x - bbox.minX) / bbox.w;
      const ny = (y - bbox.minY) / bbox.h;
      const z = Math.abs(x - centerX) / (bbox.w / 2) * 0.12;
      points.push({
        x: Math.round(nx * 1000) / 1000,
        y: Math.round((1 - ny) * 1000) / 1000,
        z: Math.round(z * 1000) / 1000,
      });
    }
  }

  return points;
}

async function main() {
  if (!fs.existsSync(INPUT)) {
    console.error(`Input not found: ${INPUT}`);
    process.exit(1);
  }

  fs.mkdirSync(OUT_DIR, { recursive: true });

  const { data, info } = await sharp(INPUT)
    .ensureAlpha()
    .raw()
    .toBuffer({ resolveWithObject: true });

  const { width, height, channels } = info;
  const mask = buildForegroundMask(data, width, height, channels);
  const bbox = boundingBox(mask, width, height);

  if (bbox.w < 10 || bbox.h < 10) {
    console.error("Foreground mask too small — check input image.");
    process.exit(1);
  }

  const points = samplePoints(mask, width, height, bbox);
  const mobileStep = STEP * 2;
  const mobilePoints = [];
  for (let y = bbox.minY; y <= bbox.maxY; y += mobileStep) {
    for (let x = bbox.minX; x <= bbox.maxX; x += mobileStep) {
      if (mask[y * width + x] === 0) continue;
      const nx = (x - bbox.minX) / bbox.w;
      const ny = (y - bbox.minY) / bbox.h;
      const centerX = (bbox.minX + bbox.maxX) / 2;
      const z = Math.abs(x - centerX) / (bbox.w / 2) * 0.12;
      mobilePoints.push({
        x: Math.round(nx * 1000) / 1000,
        y: Math.round((1 - ny) * 1000) / 1000,
        z: Math.round(z * 1000) / 1000,
      });
    }
  }

  const payload = {
    bounds: { width: 1, height: 1 },
    count: points.length,
    points,
    mobile: { count: mobilePoints.length, points: mobilePoints },
  };

  fs.writeFileSync(OUT_JSON, JSON.stringify(payload));

  const maskRgba = Buffer.alloc(width * height * 4);
  for (let i = 0; i < width * height; i++) {
    const v = mask[i];
    maskRgba[i * 4] = v;
    maskRgba[i * 4 + 1] = v;
    maskRgba[i * 4 + 2] = v;
    maskRgba[i * 4 + 3] = 255;
  }
  await sharp(maskRgba, { raw: { width, height, channels: 4 } })
    .png()
    .toFile(OUT_MASK);

  console.log(`Wrote ${points.length} points → ${OUT_JSON}`);
  console.log(`Preview mask → ${OUT_MASK}`);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
