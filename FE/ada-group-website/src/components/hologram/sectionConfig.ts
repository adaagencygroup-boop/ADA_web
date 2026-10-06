import type { JourneyConfig, SectionHologramConfig, SectionId } from "./types";
import { MAX_PARTICLE_COUNT } from "./types";

// Page background behind the (transparent) hologram canvas. Kept as the
// light pastel gradient on purpose — the dark trio from the
// hologram-particles panel (#495155/#495258/#305269) was tried and reverted
// because it broke text contrast across every section (dark-on-dark).
export const HOLOGRAM_BG = {
  center: "#fbfcfe",
  mid: "#f2f6fb",
  edge: "#e2eaf5",
};

const ADA_GLB = "/glb/ada.glb";
const ADA_GLB1 = "/glb/bb8.glb";
const EARTH_GLB = "/glb/earth.glb";
const VIETNAM_GLB = "/glb/vietnam.glb";

/**
 * One entry per homepage section, in scroll order. All sections currently
 * point at the same model (`ada.glb`) — swap `url` per entry once per-service
 * GLBs (Web / Mobile / Enterprise / AI) exist; the transition machinery
 * already supports morphing between different models.
 */
/**
 * Last section that shows particles. Sections after it have no hologram:
 * this section's model (with followScroll) rides up with the page as you
 * scroll on and simply leaves the top of the viewport.
 */
export const HOLOGRAM_LAST_SECTION: SectionId = "people";

export const SECTION_ORDER: SectionId[] = [
  "hero",
  "about",
  "services",
  "partners",
  "people",
  "techstack",
  "why",
  "contact",
];

// Ring params only apply when shape: "ring" — glb sections keep this
// harmless placeholder since every section shares one config shape.
const UNUSED_RING = {
  ringRadius: 3,
  ringThickness: 0.3,
  ringDepthJitter: 0.15,
  ringRippleCount: 10,
  ringRippleAmp: 0.08,
  ringTiltX: -0.5,
};

export const SECTION_CONFIG: Record<SectionId, SectionHologramConfig> = {
  hero: {
    shape: "glb",
    url: ADA_GLB,
    color: "#3f6099",
    particleCount: 35000,
    ambient: 0.2,
    light1Color: "#ffffff",
    light1Intensity: 1.6,
    light2Color: "#8bb4d5",
    light2Intensity: 1.0,
    modelX: 2.6,
    modelY: -2.2,
    modelScale: 1.5,
    autoRotateSpeed: 8,
    bobAmp: 0,
    ...UNUSED_RING,
    mouseGlowColor: "#ffada7",
    followScroll: true,
  },
  about: {
    shape: "glb",
    url: EARTH_GLB,
    color: "#3d5c92",
    particleCount: MAX_PARTICLE_COUNT,
    ambient: 0.2,
    light1Color: "#ffffff",
    light1Intensity: 1.5,
    light2Color: "#8bb4d5",
    light2Intensity: 1.05,
    modelX: -2.8,
    modelY: -2.6,
    modelScale: 1.5,
    autoRotateSpeed: 8,
    bobAmp: 0,
    ...UNUSED_RING,
    mouseGlowColor: "#aecaff",
  },
  services: {
    shape: "ring",
    url: ADA_GLB,
    color: "#4a7fd0",
    particleCount: 6000,
    // Ambient floor high enough to avoid dark patches on the side facing
    // away from both lights, but not so high everything flattens to near-
    // max brightness (that read as pale/washed out with a light color).
    ambient: 0.7,
    light1Color: "#ffffff",
    light1Intensity: 1.55,
    light2Color: "#7fb0e0",
    light2Intensity: 1.15,
    modelX: -0,
    modelY: 0.5,
    modelScale: 1,
    autoRotateSpeed: 2.2,
    bobAmp: 0.16,
    ringRadius: 3,
    ringThickness: 0.8,
    ringDepthJitter: 0.2,
    ringRippleCount: 14,
    ringRippleAmp: 0.09,
    ringTiltX: -Math.PI / 3,
    // bgLineColor: "#6f9be0",
    mouseGlowColor: "#a7c4ff",
  },
  partners: {
    shape: "ring",
    url: ADA_GLB,
    color: "#4a7fd0",
    particleCount: 6000,
    // Ambient floor high enough to avoid dark patches on the side facing
    // away from both lights, but not so high everything flattens to near-
    // max brightness (that read as pale/washed out with a light color).
    ambient: 0.7,
    light1Color: "#ffffff",
    light1Intensity: 1.55,
    light2Color: "#7fb0e0",
    light2Intensity: 1.15,
    modelX: -0,
    modelY: 0.5,
    modelScale: 1,
    autoRotateSpeed: 2.2,
    bobAmp: 0.16,
    ringRadius: 3,
    ringThickness: 0.8,
    ringDepthJitter: 0.2,
    ringRippleCount: 14,
    ringRippleAmp: 0.09,
    ringTiltX: -Math.PI / 3,
    // bgLineColor: "#6f9be0",
    mouseGlowColor: "#a7c4ff",
  },
  people: {
    shape: "glb",
    url: VIETNAM_GLB,
    color: "#3a5e97",
    particleCount: MAX_PARTICLE_COUNT,
    ambient: 0.2,
    light1Color: "#ffffff",
    light1Intensity: 1.55,
    light2Color: "#8bb4d5",
    light2Intensity: 1.1,
    modelX: -2.6,
    modelY: -1.3,
    modelScale: 1,
    autoRotateSpeed: 0,
    bobAmp: 0,
    ...UNUSED_RING,
    mouseGlowColor: "#aecaff",
    followScroll: true,
  },
  techstack: {
    shape: "ring",
    url: ADA_GLB1,
    color: "#38609f",
    particleCount: 1000,
    ambient: 0.2,
    light1Color: "#ffffff",
    light1Intensity: 1.6,
    light2Color: "#7fb0e0",
    light2Intensity: 1.2,
    modelX: 0,
    modelY: -0.5,
    modelScale: 1,
    autoRotateSpeed: 0.6,
    bobAmp: 0.18,
    ringRadius: 3.6,
    ringThickness: 0.8,
    ringDepthJitter: 10.12,
    ringRippleCount: 18,
    ringRippleAmp: 0.15,
    ringTiltX: Math.PI / 2,
    mouseGlowColor: "#a7c4ff",
  },
  why: {
    shape: "ring",
    url: ADA_GLB1,
    color: "#38609f",
    particleCount: 1000,
    ambient: 0.2,
    light1Color: "#ffffff",
    light1Intensity: 1.6,
    light2Color: "#7fb0e0",
    light2Intensity: 1.2,
    modelX: 0,
    modelY: -0.5,
    modelScale: 1,
    autoRotateSpeed: 0.6,
    bobAmp: 0.18,
    ringRadius: 3.6,
    ringThickness: 0.8,
    ringDepthJitter: 10.12,
    ringRippleCount: 18,
    ringRippleAmp: 0.15,
    ringTiltX: Math.PI / 2,
    mouseGlowColor: "#a7c4ff",
  },
  contact: {
    shape: "ring",
    url: ADA_GLB1,
    color: "#38609f",
    particleCount: 1000,
    ambient: 0.2,
    light1Color: "#ffffff",
    light1Intensity: 1.6,
    light2Color: "#7fb0e0",
    light2Intensity: 1.2,
    modelX: 0,
    modelY: -0.5,
    modelScale: 1,
    autoRotateSpeed: 0.6,
    bobAmp: 0.18,
    ringRadius: 3.6,
    ringThickness: 0.8,
    ringDepthJitter: 10.12,
    ringRippleCount: 18,
    ringRippleAmp: 0.15,
    ringTiltX: Math.PI / 2,
    mouseGlowColor: "#a7c4ff",
  },
};

/**
 * about -> people scroll journey (see JourneyConfig). The ribbon starts at the
 * Earth model's centre, swings right through services, touches the right
 * edge at the services/partners boundary, curls back left through partners
 * and drops into the Vietnam model in people. `about` has no followScroll —
 * the journey itself carries the Earth up with the page once about's centre
 * passes the viewport centre.
 */
export const JOURNEY: JourneyConfig = {
  from: "about",
  to: "people",
  through: ["services", "partners"],
  // Start a bit before about's centre reaches the viewport centre.
  startAt: 0.65,
  waypoints: [
    { section: "services", at: 0.55, x: 0.58 },
    { section: "partners", at: 0.02, x: 0.88 },
    { section: "partners", at: 0.6, x: 0.42 },
    { section: "people", at: 0.0, x: 0.3 },
  ],
};
