#!/usr/bin/env node
/**
 * Renders the abstract hero mark SVG and exports particle coordinates for the hero scene.
 */
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import sharp from "sharp";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.join(__dirname, "..");
const INPUT = path.join(ROOT, "public/data/hero-mark.svg");
const OUT_DIR = path.join(ROOT, "public/data");
const OUT_JSON = path.join(OUT_DIR, "silhouette-points.json");
const OUT_MASK = path.join(OUT_DIR, "silhouette-mask.png");
const STEP = 7;
const LUMINANCE_THRESHOLD = 128;

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

function buildMaskFromLuminance(data, width, height, channels) {
  const mask = new Uint8Array(width * height);
  for (let y = 0; y < height; y++) {
    for (let x = 0; x < width; x++) {
      const i = (y * width + x) * channels;
      const r = data[i];
      const g = data[i + 1];
      const b = data[i + 2];
      const luminance = 0.2126 * r + 0.7152 * g + 0.0722 * b;
      mask[y * width + x] = luminance > LUMINANCE_THRESHOLD ? 255 : 0;
    }
  }
  return mask;
}

function samplePoints(mask, width, height, bbox, step) {
  const points = [];
  const centerX = (bbox.minX + bbox.maxX) / 2;

  for (let y = bbox.minY; y <= bbox.maxY; y += step) {
    for (let x = bbox.minX; x <= bbox.maxX; x += step) {
      if (mask[y * width + x] === 0) continue;
      const nx = (x - bbox.minX) / bbox.w;
      const ny = (y - bbox.minY) / bbox.h;
      const z = (Math.abs(x - centerX) / (bbox.w / 2)) * 0.08;
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
    .resize(800, 600, { fit: "fill" })
    .ensureAlpha()
    .raw()
    .toBuffer({ resolveWithObject: true });

  const { width, height, channels } = info;
  const mask = buildMaskFromLuminance(data, width, height, channels);
  const bbox = boundingBox(mask, width, height);

  if (bbox.w < 10 || bbox.h < 10) {
    console.error("Hero mark mask too small — check SVG input.");
    process.exit(1);
  }

  const points = samplePoints(mask, width, height, bbox, STEP);
  const mobilePoints = samplePoints(mask, width, height, bbox, STEP * 2);

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
