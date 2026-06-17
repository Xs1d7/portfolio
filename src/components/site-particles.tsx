"use client";

import { useEffect, useMemo, useRef } from "react";
import * as THREE from "three";
import { useFrame, useThree } from "@react-three/fiber";
import type { SectionId } from "@/hooks/use-active-section";
import type { SilhouetteAnchorRect } from "@/hooks/use-silhouette-anchor";
import type { SilhouettePoint } from "@/lib/silhouette-data";

const MAX_POINTS = 1200;
const AMBIENT_MAX_POINTS = 750;
const REPULSE_RADIUS = 0.1;
const REPULSE_STRENGTH = 0.055;
const AMBIENT_REPULSE_RADIUS = 0.07;
const AMBIENT_REPULSE_STRENGTH = 0.028;
const SHAPE_NORMALIZE = 1.35;
const PLANET_SCALE_START = 0.34;
const PLANET_SCALE_HERO = 0.48;
const AMBIENT_SCALE = 0.68;
const PAGE_DRIFT = 0.2;
const MODE_LERP = 0.1;
const MODE_LERP_LOWER = 0.14;
const DISSOLVE_LERP = 0.12;
const DISSOLVE_DURATION = 0.85;
const AMBIENT_DISSOLVE_THRESHOLD = 0.55;
const SCALE_LERP = 0.08;
const BURST_LERP = 0.09;
const BURST_MAX = 7.5;
const REFORM_DURATION = 0.6;

const LOWER_SECTIONS = new Set<SectionId>([
  "freelances",
  "skills",
  "education",
  "courses",
  "languages",
  "contact",
]);

type ParticlePhase = "portrait" | "expanding" | "dissolving" | "ambient";

type Attractor =
  | "silhouette"
  | "timeline"
  | "wide"
  | "grid"
  | "ambient"
  | "center-bottom";

interface SectionMode {
  opacity: number;
  scatter: number;
  drift: number;
  attractor: Attractor;
}

const SECTION_MODES: Record<SectionId, SectionMode> = {
  about: { opacity: 0.78, scatter: 0, drift: 0.00015, attractor: "silhouette" },
  experience: {
    opacity: 0.5,
    scatter: 0.5,
    drift: 0.0004,
    attractor: "timeline",
  },
  freelances: {
    opacity: 0.44,
    scatter: 0.65,
    drift: 0.00075,
    attractor: "wide",
  },
  skills: { opacity: 0.4, scatter: 0.78, drift: 0.0008, attractor: "grid" },
  education: {
    opacity: 0.38,
    scatter: 0.72,
    drift: 0.0006,
    attractor: "ambient",
  },
  courses: { opacity: 0.4, scatter: 0.72, drift: 0.00065, attractor: "ambient" },
  languages: {
    opacity: 0.42,
    scatter: 0.72,
    drift: 0.0007,
    attractor: "ambient",
  },
  contact: {
    opacity: 0.48,
    scatter: 0.52,
    drift: 0.00055,
    attractor: "center-bottom",
  },
};

type ExperienceVariant = "stream" | "orbit" | "cascade" | "ripple" | "weave";

const EXPERIENCE_VARIANTS: ExperienceVariant[] = [
  "stream",
  "orbit",
  "cascade",
  "ripple",
  "weave",
];

interface Props {
  points: SilhouettePoint[];
  activeSection: SectionId;
  sectionProgress: number;
  scaleProgress: number;
  heroScrollProgress: number;
  pageScrollProgress: number;
  anchor: SilhouetteAnchorRect;
  mouse: { x: number; y: number };
  interactive: boolean;
  ambientRepulse: boolean;
  accentColor: string;
}

function createCircleParticleTexture() {
  const size = 64;
  const canvas = document.createElement("canvas");
  canvas.width = size;
  canvas.height = size;
  const ctx = canvas.getContext("2d");
  if (!ctx) return null;

  const center = size / 2;
  const gradient = ctx.createRadialGradient(center, center, 0, center, center, center);
  gradient.addColorStop(0, "rgba(255,255,255,1)");
  gradient.addColorStop(0.45, "rgba(255,255,255,0.8)");
  gradient.addColorStop(1, "rgba(255,255,255,0)");

  ctx.fillStyle = gradient;
  ctx.beginPath();
  ctx.arc(center, center, center, 0, Math.PI * 2);
  ctx.fill();

  const texture = new THREE.CanvasTexture(canvas);
  texture.needsUpdate = true;
  return texture;
}

function subsample(points: SilhouettePoint[], max: number): SilhouettePoint[] {
  if (points.length <= max) return points;
  const step = points.length / max;
  const result: SilhouettePoint[] = [];
  for (let i = 0; i < max; i++) {
    result.push(points[Math.floor(i * step)]);
  }
  return result;
}

function toWorld(p: SilhouettePoint): THREE.Vector3 {
  const x = (p.x - 0.5) * SHAPE_NORMALIZE;
  const y = (p.y - 0.5) * SHAPE_NORMALIZE;
  const z = p.z * 0.5;
  return new THREE.Vector3(x, y, z);
}

function lerp(a: number, b: number, t: number) {
  return a + (b - a) * t;
}

function clamp01(v: number) {
  return Math.min(1, Math.max(0, v));
}

function easeInOutCubic(t: number) {
  const x = clamp01(t);
  return x < 0.5 ? 4 * x * x * x : 1 - Math.pow(-2 * x + 2, 3) / 2;
}

function anchorToWorld(anchor: SilhouetteAnchorRect, aspect: number) {
  return {
    x: (anchor.centerX - 0.5) * aspect * 1.85,
    y: (anchor.centerY - 0.5) * 1.85,
  };
}

function computeDissolveTarget(
  activeSection: SectionId,
  scaleProgress: number,
  elapsedInExperience: number | null,
): number {
  if (activeSection === "about" || scaleProgress < 0.92) return 0;
  if (activeSection === "experience") {
    if (elapsedInExperience === null) return 0;
    return easeInOutCubic(elapsedInExperience / DISSOLVE_DURATION);
  }
  return 1;
}

function resolvePhase(
  scaleProgress: number,
  dissolve: number,
  activeSection: SectionId,
): ParticlePhase {
  if (dissolve > AMBIENT_DISSOLVE_THRESHOLD) return "ambient";
  if (activeSection === "experience" && scaleProgress > 0.92) return "dissolving";
  if (scaleProgress > 0.02) return "expanding";
  return "portrait";
}

function computeBurstIntensity(
  activeSection: SectionId,
  heroScrollProgress: number,
  scaleProgress: number,
): number {
  if (activeSection === "about") {
    if (scaleProgress < 0.85) return 0;
    const p = clamp01((heroScrollProgress - 0.72) / 0.28);
    if (p < 0.2) return easeInOutCubic(p / 0.2);
    return 1;
  }

  return 0;
}

function applyLowerSectionAttractor(
  section: SectionId,
  x: number,
  y: number,
  i: number,
  time: number,
  sectionProgress: number,
): [number, number] {
  const scroll = sectionProgress * Math.PI * 4;

  switch (section) {
    case "freelances":
      return [
        x + Math.sin(time * 0.5 + i * 0.035 + scroll) * 0.22,
        y + Math.cos(time * 0.35 + i * 0.025 + scroll * 0.5) * 0.08,
      ];
    case "skills": {
      const pulse = 0.5 + 0.5 * Math.sin(time * 0.8 + scroll);
      const gx = Math.round(x * 7) / 7;
      const gy = Math.round(y * 7) / 7;
      return [
        lerp(x, gx, 0.38 * pulse),
        lerp(y, gy, 0.38 * pulse),
      ];
    }
    case "education":
      return [
        x + Math.sin(i * 0.15 + scroll) * 0.06,
        y + Math.sin(time * 0.45 + i * 0.04 + scroll) * 0.18,
      ];
    case "courses":
      return [
        x + Math.sin(time * 0.4 + i * 0.03 + scroll) * 0.14,
        y + Math.cos(time * 0.35 + i * 0.025 + scroll) * 0.14,
      ];
    case "languages": {
      const cluster = Math.sin(i * 0.08 + scroll * 2) * 0.2;
      return [
        x + cluster + Math.sin(time * 0.55 + i * 0.05) * 0.1,
        y + Math.cos(time * 0.45 + i * 0.04) * 0.12,
      ];
    }
    case "contact": {
      const pulse = Math.sin(time * 0.9 + scroll * 2) * 0.05;
      return [
        lerp(x, 0, 0.18) + pulse,
        lerp(y, -0.38, 0.18) + pulse,
      ];
    }
    default:
      return [x, y];
  }
}

function computeLowerAmbientTarget(
  section: SectionId,
  base: THREE.Vector3,
  centroid: THREE.Vector3,
  centerX: number,
  centerY: number,
  scaleFactor: number,
  i: number,
  time: number,
  sectionProgress: number,
): [number, number] {
  const coreX = centerX + (base.x - centroid.x) * scaleFactor;
  const coreY = centerY + (base.y - centroid.y) * scaleFactor;
  const dx = coreX - centerX;
  const dy = coreY - centerY;
  const dist = Math.sqrt(dx * dx + dy * dy) || 0.001;
  const scatter = 0.45 + SECTION_MODES[section].scatter * 0.35;
  const sx = coreX + (dx / dist) * scatter;
  const sy = coreY + (dy / dist) * scatter;
  return applyLowerSectionAttractor(section, sx, sy, i, time, sectionProgress);
}

function applyAttractor(
  x: number,
  y: number,
  baseX: number,
  baseY: number,
  i: number,
  mode: SectionMode,
  time: number,
): [number, number] {
  switch (mode.attractor) {
    case "timeline": {
      const bandY = Math.sin(time * 0.35 + i * 0.02) * 0.04;
      return [
        baseX + Math.sin(time * 0.25 + i * 0.05) * 0.18,
        lerp(y, bandY, 0.45),
      ];
    }
    case "wide": {
      return [
        x + Math.sin(time * 0.45 + i * 0.03) * 0.28,
        y + Math.cos(time * 0.35 + i * 0.02) * 0.06,
      ];
    }
    case "grid": {
      const gx = Math.round(x * 7) / 7;
      const gy = Math.round(y * 7) / 7;
      return [lerp(x, gx, 0.35), lerp(y, gy, 0.35)];
    }
    case "center-bottom": {
      return [lerp(x, 0, 0.12), lerp(y, -0.38, 0.12)];
    }
    case "ambient": {
      return [
        x + Math.sin(time * 0.2 + i * 0.012) * 0.05,
        y + Math.cos(time * 0.24 + i * 0.015) * 0.05,
      ];
    }
    default:
      return [x, y];
  }
}

function applyExperienceVariant(
  x: number,
  y: number,
  i: number,
  variant: ExperienceVariant,
  journey: {
    milestoneIndex: number;
    milestoneProgress: number;
    journeyProgress: number;
  },
  time: number,
): [number, number] {
  const scrollPhase =
    journey.journeyProgress * Math.PI * 6 + journey.milestoneIndex * 0.85;
  const micro = journey.milestoneProgress * Math.PI * 2;

  switch (variant) {
    case "stream":
      return [
        x +
          Math.sin(time * 0.55 + i * 0.045 + scrollPhase) *
            (0.16 + journey.journeyProgress * 0.1),
        y + Math.sin(scrollPhase * 0.75 + i * 0.035 + time * 0.2) * 0.16,
      ];
    case "orbit": {
      const radius = 0.18 + (i % 9) * 0.014;
      const angle = time * 0.7 + i * 0.04 + scrollPhase;
      return [
        lerp(x, Math.cos(angle) * radius, 0.6),
        lerp(y, Math.sin(angle) * radius * 0.75, 0.6),
      ];
    }
    case "cascade":
      return [
        x + Math.cos(time * 0.4 + i * 0.025 + micro) * 0.14,
        y + Math.sin(journey.journeyProgress * 9 + i * 0.05 + time * 0.25) * 0.2,
      ];
    case "ripple": {
      const wave = Math.sin(time * 0.95 + journey.journeyProgress * 5 + i * 0.06);
      return [
        x + wave * 0.15,
        y + Math.cos(time * 0.65 + i * 0.04 + scrollPhase) * 0.13,
      ];
    }
    case "weave": {
      const gx = Math.sin(i * 0.11 + scrollPhase) * 0.32;
      const gy = Math.cos(i * 0.09 + journey.journeyProgress * 5) * 0.28;
      return [lerp(x, gx, 0.42), lerp(y, gy, 0.42)];
    }
  }
}

function applyExperienceAttractor(
  x: number,
  y: number,
  i: number,
  time: number,
): [number, number] {
  const effective = {
    milestoneCount: EXPERIENCE_VARIANTS.length,
    milestoneIndex: Math.floor(time * 0.12) % EXPERIENCE_VARIANTS.length,
    milestoneProgress: (time * 0.12) % 1,
    journeyProgress: (time * 0.06) % 1,
  };

  const len = EXPERIENCE_VARIANTS.length;
  const current = EXPERIENCE_VARIANTS[effective.milestoneIndex % len];
  const next = EXPERIENCE_VARIANTS[(effective.milestoneIndex + 1) % len];
  const blend = effective.milestoneCount > 1 ? effective.milestoneProgress : 0;

  const [cx, cy] = applyExperienceVariant(x, y, i, current, effective, time);
  const [nx, ny] = applyExperienceVariant(x, y, i, next, effective, time);

  return [lerp(cx, nx, blend), lerp(cy, ny, blend)];
}

export function SiteParticles({
  points,
  activeSection,
  sectionProgress,
  scaleProgress,
  heroScrollProgress,
  pageScrollProgress,
  anchor,
  mouse,
  interactive,
  ambientRepulse,
  accentColor,
}: Props) {
  const ref = useRef<THREE.Points>(null);
  const modeRef = useRef(SECTION_MODES.about);
  const opacityRef = useRef(SECTION_MODES.about.opacity);
  const dissolveRef = useRef(0);
  const scaleRef = useRef(PLANET_SCALE_START);
  const frozenAnchorRef = useRef({ x: 0, y: 0 });
  const centerRef = useRef({ x: 0, y: 0 });
  const experienceEnterTimeRef = useRef<number | null>(null);
  const lastSectionRef = useRef<SectionId>("about");
  const burstRef = useRef(0);
  const reformRef = useRef(1);
  const reformStartRef = useRef<number | null>(null);
  const sampled = useMemo(() => subsample(points, MAX_POINTS), [points]);
  const ambientIndices = useMemo(() => {
    const indices = sampled.map((_, i) => i);
    if (indices.length <= AMBIENT_MAX_POINTS) return indices;
    const step = indices.length / AMBIENT_MAX_POINTS;
    const picked: number[] = [];
    for (let i = 0; i < AMBIENT_MAX_POINTS; i++) {
      picked.push(Math.floor(i * step));
    }
    return picked;
  }, [sampled]);

  const { viewport } = useThree();
  const aspect = viewport.width / Math.max(viewport.height, 1);

  const basePositions = useMemo(() => {
    return sampled.map((p) => toWorld(p));
  }, [sampled]);

  const centroid = useMemo(() => {
    const c = new THREE.Vector3();
    for (const p of basePositions) c.add(p);
    return c.divideScalar(basePositions.length || 1);
  }, [basePositions]);

  const positions = useMemo(() => {
    const arr = new Float32Array(sampled.length * 3);
    basePositions.forEach((v, i) => {
      arr[i * 3] = v.x;
      arr[i * 3 + 1] = v.y;
      arr[i * 3 + 2] = v.z;
    });
    return arr;
  }, [basePositions, sampled.length]);

  const geometry = useMemo(() => {
    const geo = new THREE.BufferGeometry();
    geo.setAttribute("position", new THREE.BufferAttribute(positions, 3));
    return geo;
  }, [positions]);

  const circleMap = useMemo(() => createCircleParticleTexture(), []);

  const material = useMemo(
    () =>
      new THREE.PointsMaterial({
        color: new THREE.Color(accentColor),
        map: circleMap ?? undefined,
        size: 0.011,
        sizeAttenuation: true,
        transparent: true,
        opacity: 0.9,
        depthWrite: false,
        alphaTest: 0.02,
      }),
    [accentColor, circleMap],
  );

  useEffect(() => {
    material.color.set(accentColor);
  }, [accentColor, material]);

  useEffect(() => {
    return () => {
      circleMap?.dispose();
    };
  }, [circleMap]);

  useFrame((state) => {
    const attr = ref.current?.geometry.getAttribute("position") as
      | THREE.BufferAttribute
      | undefined;
    if (!attr) return;

    const time = state.clock.elapsedTime;

    if (activeSection !== lastSectionRef.current) {
      const prev = lastSectionRef.current;
      if (activeSection === "experience") {
        experienceEnterTimeRef.current = time;
      } else if (activeSection === "about") {
        experienceEnterTimeRef.current = null;
      }
      if (prev === "experience" && LOWER_SECTIONS.has(activeSection)) {
        reformRef.current = 0;
        reformStartRef.current = time;
      }
      lastSectionRef.current = activeSection;
    }

    if (reformRef.current < 1 && reformStartRef.current !== null) {
      const elapsed = time - reformStartRef.current;
      reformRef.current = easeInOutCubic(elapsed / REFORM_DURATION);
      if (reformRef.current >= 0.999) {
        reformRef.current = 1;
        reformStartRef.current = null;
        if (LOWER_SECTIONS.has(activeSection)) {
          const target = SECTION_MODES[activeSection];
          modeRef.current = { ...target };
        }
      }
    }

    const reform = reformRef.current;
    const inLower = LOWER_SECTIONS.has(activeSection);
    const isReforming = reform < 1 && inLower;

    const elapsedInExperience =
      activeSection === "experience" && experienceEnterTimeRef.current !== null
        ? time - experienceEnterTimeRef.current
        : null;

    const dissolveTarget = computeDissolveTarget(
      activeSection,
      scaleProgress,
      elapsedInExperience,
    );
    dissolveRef.current = lerp(
      dissolveRef.current,
      dissolveTarget,
      DISSOLVE_LERP,
    );

    const dissolve = dissolveRef.current;
    const phase = resolvePhase(scaleProgress, dissolve, activeSection);

    const burstTarget = computeBurstIntensity(
      activeSection,
      heroScrollProgress,
      scaleProgress,
    );
    burstRef.current = lerp(burstRef.current, burstTarget, BURST_LERP);
    const burst = burstRef.current;

    const anchorWorld = anchorToWorld(anchor, aspect);
    void anchorWorld;

    const pageDriftY = (pageScrollProgress - 0.5) * PAGE_DRIFT;
    centerRef.current.x = 0;
    centerRef.current.y = pageDriftY;
    frozenAnchorRef.current = { x: 0, y: 0 };

    const centerX = centerRef.current.x;
    const centerY = centerRef.current.y;

    let targetScale = PLANET_SCALE_START;

    if (phase === "portrait") {
      targetScale = PLANET_SCALE_START;
    } else if (phase === "expanding" && activeSection === "about") {
      targetScale = lerp(
        PLANET_SCALE_START,
        PLANET_SCALE_HERO,
        easeInOutCubic(scaleProgress),
      );
    } else if (phase === "dissolving") {
      targetScale = lerp(PLANET_SCALE_HERO, AMBIENT_SCALE, dissolve);
    } else if (phase === "ambient") {
      targetScale = AMBIENT_SCALE;
    } else {
      targetScale = PLANET_SCALE_HERO;
    }

    scaleRef.current = lerp(scaleRef.current, targetScale, SCALE_LERP);

    const targetMode =
      phase === "portrait" ||
      (phase === "expanding" && activeSection === "about")
        ? SECTION_MODES.about
        : SECTION_MODES[activeSection];

    const modeLerp = LOWER_SECTIONS.has(activeSection)
      ? MODE_LERP_LOWER
      : MODE_LERP;

    modeRef.current = {
      opacity: lerp(modeRef.current.opacity, targetMode.opacity, modeLerp),
      scatter: lerp(modeRef.current.scatter, targetMode.scatter, modeLerp),
      drift: lerp(modeRef.current.drift, targetMode.drift, modeLerp),
      attractor: targetMode.attractor,
    };

    const mode = modeRef.current;
    const scaleFactor = scaleRef.current;
    const rotY = interactive && phase !== "ambient" ? (mouse.x - 0.5) * 0.18 : 0;
    const ambientSet = new Set(ambientIndices);

    const mouseWorldX = (mouse.x - 0.5) * aspect * 1.85;
    const mouseWorldY = (mouse.y - 0.5) * 1.85;

    const inBurst = burst > 0.02 && !isReforming;

    opacityRef.current = lerp(
      opacityRef.current,
      inBurst
        ? lerp(mode.opacity, 0.03, burst)
        : phase === "ambient" || phase === "dissolving"
          ? mode.opacity
          : mode.opacity,
      modeLerp,
    );

    material.size =
      phase === "portrait"
        ? 0.012
        : inBurst
          ? 0.007
          : inLower && phase === "ambient"
            ? 0.01
            : phase === "ambient"
              ? 0.009
              : 0.01;

    for (let i = 0; i < sampled.length; i++) {
      if (phase === "ambient" && !ambientSet.has(i) && !inBurst) {
        attr.setXYZ(i, 999, 999, 0);
        continue;
      }

      const base = basePositions[i];
      let x = centerX + (base.x - centroid.x) * scaleFactor;
      let y = centerY + (base.y - centroid.y) * scaleFactor;
      let z = base.z * scaleFactor;

      if (!inBurst && (phase === "dissolving" || phase === "ambient")) {
        const dx = x - centerX;
        const dy = y - centerY;
        const dist = Math.sqrt(dx * dx + dy * dy) || 0.001;
        const scatterStrength =
          phase === "dissolving"
            ? dissolve * 0.55
            : 0.45 + mode.scatter * 0.35;
        x += (dx / dist) * scatterStrength;
        y += (dy / dist) * scatterStrength;
        z += dissolve * 0.1;
      }

      if (isReforming) {
        const coreX = centerX + (base.x - centroid.x) * scaleFactor;
        const coreY = centerY + (base.y - centroid.y) * scaleFactor;
        const bdx = coreX - centerX;
        const bdy = coreY - centerY;
        const burstX = centerX + bdx * (1 + BURST_MAX);
        const burstY = centerY + bdy * (1 + BURST_MAX);
        const [targetX, targetY] = computeLowerAmbientTarget(
          activeSection,
          base,
          centroid,
          centerX,
          centerY,
          scaleFactor,
          i,
          time,
          sectionProgress,
        );
        x = lerp(burstX, targetX, reform);
        y = lerp(burstY, targetY, reform);
      } else if (inBurst) {
        const dx = x - centerX;
        const dy = y - centerY;
        const burstScale = 1 + burst * BURST_MAX;
        x = centerX + dx * burstScale;
        y = centerY + dy * burstScale;
        z += burst * 0.12;
      } else {
        let ambientX = x;
        let ambientY = y;

        const attractorBlend =
          phase === "ambient"
            ? 1
            : phase === "dissolving"
              ? clamp01((dissolve - 0.2) / 0.45)
              : 0;

        if (attractorBlend > 0) {
          let ax: number;
          let ay: number;
          if (activeSection === "experience") {
            [ax, ay] = applyExperienceAttractor(x, y, i, time);
          } else if (inLower) {
            [ax, ay] = computeLowerAmbientTarget(
              activeSection,
              base,
              centroid,
              centerX,
              centerY,
              scaleFactor,
              i,
              time,
              sectionProgress,
            );
          } else {
            [ax, ay] = applyAttractor(x, y, base.x, base.y, i, mode, time);
          }
          ambientX = lerp(x, ax, attractorBlend);
          ambientY = lerp(y, ay, attractorBlend);
        }

        if (activeSection === "experience" && phase === "ambient") {
          const jp = (time * 0.06) % 1;
          const mp = (time * 0.12) % 1;
          ambientX += Math.sin(jp * 16 + i * 0.07 + time * 0.3) * 0.045;
          ambientY += Math.cos(jp * 13 + i * 0.05 + mp * 4) * 0.04;
        }

        x = ambientX;
        y = ambientY;
      }

      if (
        ambientRepulse &&
        phase === "ambient" &&
        !inBurst &&
        !isReforming
      ) {
        const mdx = x - mouseWorldX;
        const mdy = y - mouseWorldY;
        const mdist = Math.sqrt(mdx * mdx + mdy * mdy);
        if (mdist < AMBIENT_REPULSE_RADIUS && mdist > 0.001) {
          const force =
            (1 - mdist / AMBIENT_REPULSE_RADIUS) * AMBIENT_REPULSE_STRENGTH;
          x += (mdx / mdist) * force;
          y += (mdy / mdist) * force;
        }
      }

      if (interactive && (phase === "portrait" || phase === "expanding") && !inBurst) {
        const mdx = x - mouseWorldX;
        const mdy = y - mouseWorldY;
        const mdist = Math.sqrt(mdx * mdx + mdy * mdy);
        if (mdist < REPULSE_RADIUS && mdist > 0.001) {
          const force = (1 - mdist / REPULSE_RADIUS) * REPULSE_STRENGTH;
          x += (mdx / mdist) * force;
          y += (mdy / mdist) * force;
        }
      }

      const cos = Math.cos(rotY);
      const sin = Math.sin(rotY);
      const rx = x * cos - z * sin;
      const rz = x * sin + z * cos;

      const drift = inBurst ? 0.00015 : mode.drift;
      x = rx + Math.sin(time * drift * 1000 + i) * drift * 45;
      y = y + Math.cos(time * drift * 1000 + i * 1.3) * drift * 45;

      attr.setXYZ(i, x, y, rz);
    }
    attr.needsUpdate = true;

    material.opacity = opacityRef.current;
  });

  return <points ref={ref} geometry={geometry} material={material} />;
}
