"use client";

/* eslint-disable @typescript-eslint/no-explicit-any -- three/tsl's node-builder
   API (uniform/material nodes, PointsNodeMaterial's `*Node` properties)
   doesn't ship precise TypeScript types for composed expressions. */

// ─────────────────────────────────────────────────────────────────────────────
// Scroll-scrubbed hologram particle field.
//
// EVERYTHING the particles do between sections is a pure function of the
// scroll position — there is no time-based transition state machine. Each
// frame we read window.scrollY (driven by Lenis, see SmoothScroll), find the
// timeline segment it falls in (A -> B, progress t in [0, 1]) and the shader
// places every particle from that alone. Scrolling fast, flinging, jumping
// with an anchor link or scrolling back up all land on exactly the frame the
// scroll position describes; nothing can be left half-finished.
//
// Timeline: "stations" are the sections that show their own shape (every
// homepage section except JOURNEY.through). Between consecutive stations:
//   - a MORPH segment (default), or
//   - the JOURNEY segment (JOURNEY.from -> JOURNEY.to): particles peel off
//     model 1 into a wave ribbon along an S-curve and land in model 2.
// While holding a station the model may follow its section up the page
// (followScroll), computed here in JS — Lenis + one shared ticker keep the
// DOM and the canvas on the same frame, so no CSS scroll-timeline needed.
//
// All positions are computed in WORLD space in the shader from two per-frame
// model matrices (M1 = station A's pose, M2 = station B's pose, each
// including its rotation and scroll-follow offset), so the mesh itself never
// moves and pose changes interpolate per particle.
// ─────────────────────────────────────────────────────────────────────────────

import { useEffect, useRef } from "react";
import {
  Scene,
  PerspectiveCamera,
  InstancedMesh,
  PlaneGeometry,
  InstancedBufferAttribute,
  Object3D,
  Matrix3,
  Matrix4,
  Euler,
  Quaternion,
  Vector2,
  Vector3,
  Box3,
  Plane,
  Raycaster,
  Mesh,
  Color,
  CatmullRomCurve3,
} from "three";
import {
  WebGPURenderer,
  PointsNodeMaterial,
  PostProcessing,
  StorageInstancedBufferAttribute,
} from "three/webgpu";
import {
  attribute,
  sin,
  cos,
  time,
  uniform,
  uniformArray,
  uv,
  vec2,
  vec3,
  vec4,
  float,
  int,
  floor,
  fract,
  normalize,
  dot,
  clamp,
  min,
  max,
  mix,
  step,
  pow,
  abs,
  smoothstep as tslSmoothstep,
  pass,
  storage,
  instanceIndex,
  Fn,
  mx_noise_float,
  mx_fractal_noise_vec3,
} from "three/tsl";
import { bloom } from "three/addons/tsl/display/BloomNode.js";
import { GLTFLoader } from "three/addons/loaders/GLTFLoader.js";
import { DRACOLoader } from "three/addons/loaders/DRACOLoader.js";
import { MeshSurfaceSampler } from "three/addons/math/MeshSurfaceSampler.js";
import gsap from "gsap";
import type { GeometryData, SectionHologramConfig, SectionId } from "./types";
import { MAX_PARTICLE_COUNT } from "./types";
import {
  HOLOGRAM_LAST_SECTION,
  JOURNEY,
  SECTION_CONFIG,
  SECTION_ORDER,
} from "./sectionConfig";

// ── Tunable constants (no live GUI in production — edit here) ───────────────
// Rendered as camera-facing billboard sprites (PointsNodeMaterial). With
// sizeAttenuation on (default), sizeNode is a WORLD-space size.
const PARTICLE_SIZE = 0.1;
const FLOAT_AMP = 0.01;
const WRAP = 0.35;

// Idle "breathing" noise on every shape (scaled by the current model scale
// so it looks the same as when it lived in model-local space).
const NOISE_AMP = 0.29;
const NOISE_SCALE = 0.9;
const NOISE_SPEED = 1;
const NOISE_GAIN = 0.65;
const MASK_SCALE = 0.95;
const MASK_SPEED = 0.5;
const MASK_CONTRAST = 3.8;
// Lower contrast = the noise mask covers more of the shape; used mid-morph
// so the cloud visibly dissolves while it changes shape.
const TRANSITION_MASK_CONTRAST = 1.65;

// ── Morph segments (scroll ranges) ──────────────────────────────────────────
// A -> B morph runs while station B's TOP edge travels from START to END
// (fractions of viewport height from the top). Purely scroll-driven.
const MORPH_START_LINE = 0.9;
const MORPH_END_LINE = 0.4;
// Per-particle stagger (like JOURNEY_SPREAD) so the morph ripples through the
// cloud instead of every particle moving in lockstep.
const MORPH_SPREAD = 0.35;
// Mid-flight scatter (world units) so the cloud dissolves between shapes.
const MORPH_SCATTER = 0.6;

// ── Page-load entrance (the only time-based transition left) ────────────────
const ENTRANCE_DUR = 1.4; // s, scattered cloud -> first shape

// ── Scroll journey (JOURNEY in sectionConfig) ───────────────────────────────
// Progress p: 0 when the `from` section's centre is at JOURNEY.startAt of
// the viewport, 1 when the `to` section's centre is at the viewport centre.
// Each particle gets its own progress q = clamp(p * (1 + SPREAD) - stagger *
// SPREAD), so part of the cloud is still in model 1, part is in flight along
// the curve and part has landed.
const JOURNEY_SPREAD = 0.5;
const JOURNEY_LEAVE = 0.12;
const JOURNEY_ARRIVE = 0.12;
// ── In-flight shape: a SPIRAL stream along the S-curve ────────────────────
// Particles travel along the curve while orbiting it on helical strands
// (like a twisted rope / DNA). Each particle has a fixed strand, a fixed
// offset inside the strand and its own stagger, so the spiral peels off
// model 1 front-first and winds into model 2.
const SPIRAL_STRANDS = 3; // helical strands around the path
const SPIRAL_RADIUS = 0.35; // orbit radius around the path (world units)
const SPIRAL_TURNS = 5; // full turns along the whole path
const SPIRAL_SPIN = 1.6; // rad/s the whole spiral rotates around the path
const SPIRAL_THICKNESS = 0.3; // strand thickness (world units)
// Radius breathes along the path so the spiral bulges and pinches.
const SPIRAL_PULSE = 0.3; // fraction of SPIRAL_RADIUS
const SPIRAL_PULSE_FREQ = 3; // bulges along the whole path
// Share of particles scattered loosely around the spiral (dust halo).
const SPIRAL_HALO = 0.05;
// Only this many particles fly the spiral; all the others dissolve out of
// model 1 (drift + fade) and condense back into model 2.
const SPIRAL_PARTICLES = 3000;
// How far the dissolving particles drift while fading out / in (world units).
const SPIRAL_DUST_DRIFT = 0.9;
const JOURNEY_GLOW = 0.35;
const JOURNEY_PATH_POINTS = 48;

// ── Mouse pusher (GPU compute, collider cylinder along the view axis) ───────
const PUSHER_RADIUS = 0.05;
const PUSHER_INFLUENCE = 0.4;
const PUSHER_FALLOFF = 2.5;
const PUSHER_DEPTH = 2.0;
const PUSHER_FOLLOW = 12;
const PUSHER_RADIAL = 0;
const PUSHER_MOVE = 121;
const PUSHER_FLOW_BIAS = 1.3;
const PUSHER_SPRING = 27;
const PUSHER_DAMPING = 22.1;
const PUSHER_MAX_OFFSET = 13.8;
const PUSHER_TURBULENCE = 70;
const PUSHER_TURB_SCALE = 2.2;
const PUSHER_TURB_SPEED = 1.85;

// Invisible containment boundary (no rendered cylinder mesh).
const CONTAIN_RADIUS = 10.95;
const CONTAIN_BOUNCE = 0.5;
const CONTAIN_HOLD_TIME = 0.05;

const MOUSE_GLOW_ACTIVE = 6.0;
const MOUSE_GLOW_POW = 6.0;
const GLOW_SENSITIVITY = 1.5;

const BLOOM_STRENGTH = 0.15;
const BLOOM_RADIUS = 0.15;
const BLOOM_THRESHOLD = 0.34;

// modelX offsets / modelScale were tuned by eye on a ~1.9 aspect, ~1600px
// wide desktop window; scale them down (never up) for narrower windows so
// the model keeps its on-screen position and fits width-driven layouts.
const MODEL_X_REFERENCE_ASPECT = 1.9;

// The canvas is hidden (and rendering skipped) once the last hologram
// section's bottom edge is this far (fraction of viewport height) above
// the top of the viewport — by then its model has scrolled away.
const END_HIDE_MARGIN = 0.3;
const MODEL_SCALE_REFERENCE_WIDTH = 1600;

function wrapAngle(angle: number): number {
  return ((angle + Math.PI) % (Math.PI * 2) + Math.PI * 2) % (Math.PI * 2) - Math.PI;
}

function geometryCentroid(g: GeometryData): Vector3 {
  const c = new Vector3();
  let n = 0;
  for (let i = 0; i < g.visible.length; i++) {
    if (g.visible[i] < 0.5) continue;
    c.x += g.positions[i * 3];
    c.y += g.positions[i * 3 + 1];
    c.z += g.positions[i * 3 + 2];
    n++;
  }
  return n > 0 ? c.divideScalar(n) : c;
}

const clamp01 = (v: number) => Math.min(1, Math.max(0, v));
const smooth01 = (v: number) => {
  const x = clamp01(v);
  return x * x * (3 - 2 * x);
};

// ── Module-level geometry cache ───────────────────────────────────────────────

const geometryCache = new Map<string, GeometryData>();
const geometryInflight = new Map<string, Promise<GeometryData>>();

// GLB models are Draco-compressed (see scripts used at build time) — one
// shared decoder instance, reused across loads.
const dracoLoader = new DRACOLoader();
dracoLoader.setDecoderPath("/draco/");
const gltfLoader = new GLTFLoader();
gltfLoader.setDRACOLoader(dracoLoader);

function cacheKey(url: string, maxCount: number, visibleCount: number) {
  return `${url}:${maxCount}:${visibleCount}`;
}

// Packs xyz positions + a per-particle visibility flag into one vec4 array
// (itemSize 4) instead of adding a dedicated instanced attribute — WebGPU
// caps a pipeline at 8 vertex buffers and this field is already at 7 (see
// the comment above sphereGeo.deleteAttribute), so widening an existing
// buffer rather than adding a new one keeps it under the limit. It also
// means the visibility flag automatically blends through the *same*
// mix(instPos, instPosTarget, transitionProgress) node already used for
// position, with no extra shader plumbing.
function packPosVisible(positions: Float32Array, visible: Float32Array): Float32Array {
  const count = visible.length;
  const out = new Float32Array(count * 4);
  for (let i = 0; i < count; i++) {
    out[i * 4] = positions[i * 3];
    out[i * 4 + 1] = positions[i * 3 + 1];
    out[i * 4 + 2] = positions[i * 3 + 2];
    out[i * 4 + 3] = visible[i];
  }
  return out;
}

// Slots beyond a section's `particleCount` still need *some* position (fed
// into the physics/rest buffers), but visibility is what actually hides
// them (GeometryData.visible, packed into instancePos.w / instancePosTarget.w
// and multiplied into opacity) rather than where they sit — a rotating ring
// section's group transform (Z-axis spin + X tilt) can send any local axis
// through the visible frustum, so no fixed "parked" position stays offscreen
// under rotation. A modest scatter close to the section's own shape keeps
// physics well-behaved without visually mattering either way.
function fillFillerSlot(positions: Float32Array, normals: Float32Array, b: number) {
  positions[b] = (Math.random() * 2 - 1) * 4;
  positions[b + 1] = (Math.random() * 2 - 1) * 4;
  positions[b + 2] = (Math.random() * 2 - 1) * 2;
  const x = Math.random() * 2 - 1;
  const y = Math.random() * 2 - 1;
  const z = Math.random() * 2 - 1;
  const len = Math.hypot(x, y, z) || 1;
  normals[b] = x / len;
  normals[b + 1] = y / len;
  normals[b + 2] = z / len;
}

async function sampleGLBGeometry(
  url: string,
  maxCount: number,
  visibleCount: number,
): Promise<GeometryData> {
  const key = cacheKey(url, maxCount, visibleCount);
  if (geometryCache.has(key)) return geometryCache.get(key)!;
  if (geometryInflight.has(key)) return geometryInflight.get(key)!;

  const promise = (async (): Promise<GeometryData> => {
    const gltf = await gltfLoader.loadAsync(url);

    const bbox = new Box3().setFromObject(gltf.scene);
    const centre = new Vector3();
    bbox.getCenter(centre);
    gltf.scene.position.sub(centre);
    gltf.scene.updateMatrixWorld(true);

    const bbox2 = new Box3().setFromObject(gltf.scene);
    const sv = new Vector3();
    bbox2.getSize(sv);
    const maxDim = Math.max(sv.x, sv.y, sv.z);
    gltf.scene.scale.setScalar(maxDim > 0 ? 3 / maxDim : 1);
    gltf.scene.updateMatrixWorld(true);

    const bbox3 = new Box3().setFromObject(gltf.scene);
    gltf.scene.position.y -= bbox3.min.y;
    gltf.scene.updateMatrixWorld(true);

    const meshes: Mesh[] = [];
    gltf.scene.traverse((child: Object3D) => {
      if ((child as Mesh).isMesh) meshes.push(child as Mesh);
    });

    const positions = new Float32Array(maxCount * 3);
    const normals = new Float32Array(maxCount * 3);
    const visible = new Float32Array(maxCount);
    const tempPos = new Vector3();
    const tempNorm = new Vector3();
    const normMatrix = new Matrix3();

    let filled = 0;
    const perMesh = Math.floor(visibleCount / meshes.length);

    for (let m = 0; m < meshes.length; m++) {
      const mesh = meshes[m];
      const count = m < meshes.length - 1 ? perMesh : visibleCount - filled;
      normMatrix.getNormalMatrix(mesh.matrixWorld);
      const sampler = new MeshSurfaceSampler(mesh).build();
      for (let i = 0; i < count; i++) {
        sampler.sample(tempPos, tempNorm);
        mesh.localToWorld(tempPos);
        tempNorm.applyMatrix3(normMatrix).normalize();
        const b = (filled + i) * 3;
        positions[b] = tempPos.x;
        positions[b + 1] = tempPos.y;
        positions[b + 2] = tempPos.z;
        normals[b] = tempNorm.x;
        normals[b + 1] = tempNorm.y;
        normals[b + 2] = tempNorm.z;
        visible[filled + i] = 1;
      }
      filled += count;
    }

    for (let i = visibleCount; i < maxCount; i++) {
      fillFillerSlot(positions, normals, i * 3);
    }

    const data: GeometryData = { positions, normals, visible };
    geometryCache.set(key, data);
    geometryInflight.delete(key);
    return data;
  })();

  geometryInflight.set(key, promise);
  return promise;
}

// Procedural ring formation: a thin circular band instead of a GLB-sampled
// shape, parameterised per section (see SectionHologramConfig's ring* /
// bobAmp fields) so each ring-shaped section can look distinct. The
// "Mexican wave" ripple is baked into the radius once here (a fixed
// sin(angle * count) offset, like a gear) rather than animated by time in
// the shader — the ring's own Z-axis rotation is what carries it past a
// fixed viewpoint, so a static ripple already reads as a travelling wave,
// with far less shader math and no failure mode around per-frame phase math.
interface RingParams {
  radius: number;
  thickness: number;
  depthJitter: number;
  rippleCount: number;
  rippleAmp: number;
}

function makeRingFormation(
  maxCount: number,
  visibleCount: number,
  params: RingParams,
): GeometryData {
  const { radius, thickness, depthJitter, rippleCount, rippleAmp } = params;
  const positions = new Float32Array(maxCount * 3);
  const normals = new Float32Array(maxCount * 3);
  const visible = new Float32Array(maxCount);
  for (let i = 0; i < visibleCount; i++) {
    const b = i * 3;
    const angle = (i / visibleCount) * Math.PI * 2;
    const ripple = Math.sin(angle * rippleCount) * rippleAmp;
    const r = radius + ripple + (Math.random() * 2 - 1) * thickness;
    positions[b] = Math.cos(angle) * r;
    positions[b + 1] = Math.sin(angle) * r;
    positions[b + 2] = (Math.random() * 2 - 1) * depthJitter;

    normals[b] = Math.cos(angle);
    normals[b + 1] = Math.sin(angle);
    normals[b + 2] = 0;
    visible[i] = 1;
  }
  for (let i = visibleCount; i < maxCount; i++) {
    fillFillerSlot(positions, normals, i * 3);
  }
  return { positions, normals, visible };
}

const ringGeometryCache = new Map<string, GeometryData>();
function sampleRingGeometry(
  maxCount: number,
  visibleCount: number,
  params: RingParams,
): GeometryData {
  const key = `${maxCount}:${visibleCount}:${params.radius}:${params.thickness}:${params.depthJitter}:${params.rippleCount}:${params.rippleAmp}`;
  let data = ringGeometryCache.get(key);
  if (!data) {
    data = makeRingFormation(maxCount, visibleCount, params);
    ringGeometryCache.set(key, data);
  }
  return data;
}

function sampleSectionGeometry(
  cfg: SectionHologramConfig,
  maxCount: number,
): Promise<GeometryData> {
  const visibleCount = Math.min(cfg.particleCount, maxCount);
  if (cfg.shape === "ring") {
    return Promise.resolve(
      sampleRingGeometry(maxCount, visibleCount, {
        radius: cfg.ringRadius,
        thickness: cfg.ringThickness,
        depthJitter: cfg.ringDepthJitter,
        rippleCount: cfg.ringRippleCount,
        rippleAmp: cfg.ringRippleAmp,
      }),
    );
  }
  return sampleGLBGeometry(cfg.url, maxCount, visibleCount);
}

// ── Per-particle timeline coordinates (shared by vertex + compute) ──────────
// Built from instanceIndex hashes only, so the vertex shader (drawing) and
// the physics compute shader (mouse pusher rest position) agree exactly on
// where every particle is in the current morph / spiral journey.
function particleCoords(t: any) {
  const pIdx = float(instanceIndex);
  const hash = (k: number, m: number) => fract(sin(pIdx.mul(k)).mul(m));
  const hStagger = hash(91.3458, 47453.5453);
  // Morph: staggered progress + eased blend.
  const qM = clamp(t.mul(1 + MORPH_SPREAD).sub(hStagger.mul(MORPH_SPREAD)), float(0), float(1));
  const eM = tslSmoothstep(float(0), float(1), qM);

  // Spiral: random stagger (front of the stream leaves model 1 first).
  const uBody = hash(41.27, 18337.53);
  const jq = clamp(
    t.mul(1 + JOURNEY_SPREAD).sub(float(1).sub(uBody).mul(JOURNEY_SPREAD)),
    float(0),
    float(1),
  );
  // Particles [0, SPIRAL_PARTICLES) fly the spiral; the rest dissolve.
  const keep = float(1).sub(step(float(SPIRAL_PARTICLES - 0.5), pIdx));
  return { hash, qM, eM, jq, uBody, keep };
}

// ── Scroll timeline types ────────────────────────────────────────────────────
interface SectionBox {
  top: number; // page Y of the top edge (px, scroll-invariant)
  height: number;
}

interface Segment {
  kind: "morph" | "journey";
  from: SectionId;
  to: SectionId;
  start: number; // scrollY where t = 0
  end: number; // scrollY where t = 1
}

// Sections that show their own shape (journey "through" sections don't).
// Nothing after HOLOGRAM_LAST_SECTION gets a station (no particles there).
const STATIONS: SectionId[] = SECTION_ORDER.filter(
  (id, i) =>
    !JOURNEY.through.includes(id) && i <= SECTION_ORDER.indexOf(HOLOGRAM_LAST_SECTION),
);

interface HologramFieldProps {
  onReady?: () => void;
  onUnsupported?: () => void;
}

export default function HologramField({ onReady, onUnsupported }: HologramFieldProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const onReadyRef = useRef(onReady);
  const onUnsupportedRef = useRef(onUnsupported);
  useEffect(() => {
    onReadyRef.current = onReady;
    onUnsupportedRef.current = onUnsupported;
  }, [onReady, onUnsupported]);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    let renderer: WebGPURenderer | null = null;
    let disposed = false;
    let cleanupInner: (() => void) | undefined;

    (async () => {
      if (typeof navigator === "undefined" || !("gpu" in navigator)) {
        onUnsupportedRef.current?.();
        return;
      }

      const r = new WebGPURenderer({ antialias: true, alpha: true });
      renderer = r;
      try {
        await r.init();
      } catch {
        onUnsupportedRef.current?.();
        return;
      }
      if (disposed) return;

      r.setSize(container.clientWidth, container.clientHeight);
      r.setPixelRatio(Math.min(window.devicePixelRatio, 2));
      // Fully transparent clear — the page background shows through.
      r.setClearColor(0x000000, 0);
      container.appendChild(r.domElement);

      const scene = new Scene();
      const camera = new PerspectiveCamera(
        50,
        container.clientWidth / container.clientHeight,
        0.1,
        200,
      );
      camera.position.set(0, 0, 6);

      // ── Layout cache (page coordinates; re-measured on resize) ────────────
      const sectionEls = new Map<SectionId, HTMLElement>();
      const layout = new Map<SectionId, SectionBox>();
      let layoutDirty = true;
      const measureLayout = () => {
        layout.clear();
        const sy = window.scrollY;
        for (const id of SECTION_ORDER) {
          let el = sectionEls.get(id);
          if (!el || !el.isConnected) {
            el =
              document.querySelector<HTMLElement>(`[data-hologram-section="${id}"]`) ??
              undefined;
            if (el) sectionEls.set(id, el);
          }
          if (!el) continue;
          const rect = el.getBoundingClientRect();
          layout.set(id, { top: rect.top + sy, height: rect.height });
        }
        layoutDirty = false;
      };

      const buildSegments = (): Segment[] => {
        const winH = window.innerHeight;
        const stations = STATIONS.filter((id) => layout.has(id));
        const segs: Segment[] = [];
        let prevEnd = -Infinity;
        for (let k = 0; k < stations.length - 1; k++) {
          const a = stations[k];
          const b = stations[k + 1];
          const la = layout.get(a)!;
          const lb = layout.get(b)!;
          let start: number;
          let end: number;
          let kind: Segment["kind"] = "morph";
          if (a === JOURNEY.from && b === JOURNEY.to) {
            kind = "journey";
            start = la.top + la.height / 2 - (JOURNEY.startAt ?? 0.5) * winH;
            end = lb.top + lb.height / 2 - 0.5 * winH;
          } else {
            start = lb.top - MORPH_START_LINE * winH;
            end = lb.top - MORPH_END_LINE * winH;
          }
          // Keep segments ordered and non-overlapping.
          start = Math.max(start, prevEnd);
          end = Math.max(end, start + 1);
          segs.push({ kind, from: a, to: b, start, end });
          prevEnd = end;
        }
        return segs;
      };

      let segments: Segment[] = [];
      const refreshLayout = () => {
        measureLayout();
        segments = buildSegments();
      };
      refreshLayout();

      // Which pair / progress the current scroll position describes.
      const resolveScroll = (scrollY: number) => {
        if (segments.length === 0) {
          const only = STATIONS.find((id) => layout.has(id)) ?? STATIONS[0];
          return { kind: "morph" as const, from: only, to: only, t: 0 };
        }
        let k = 0;
        while (k < segments.length - 1 && scrollY >= segments[k + 1].start) k++;
        const s = segments[k];
        return {
          kind: s.kind,
          from: s.from,
          to: s.to,
          t: clamp01((scrollY - s.start) / (s.end - s.start)),
        };
      };

      // ── Geometry store (all stations preloaded) ───────────────────────────
      const geoStore = new Map<SectionId, GeometryData>();
      const centroids = new Map<SectionId, Vector3>();
      const loadStation = (id: SectionId) =>
        sampleSectionGeometry(SECTION_CONFIG[id], MAX_PARTICLE_COUNT).then((g) => {
          geoStore.set(id, g);
          centroids.set(id, geometryCentroid(g));
          return g;
        });

      const initial = resolveScroll(window.scrollY);
      await Promise.all([loadStation(initial.from), loadStation(initial.to)]);
      if (disposed) return;
      for (const id of STATIONS) {
        if (!geoStore.has(id)) loadStation(id).catch(() => {});
      }

      // ── Particle geometry ─────────────────────────────────────────────────
      // Flat 1x1 quad billboarded by PointsNodeMaterial, masked to a circle.
      // WebGPU caps a pipeline at 8 vertex buffers, so the plane's unused
      // normal is dropped and visibility rides in instancePos.w.
      const sphereGeo = new PlaneGeometry(1, 1);
      sphereGeo.deleteAttribute("normal");
      const posAttr = new InstancedBufferAttribute(
        new Float32Array(MAX_PARTICLE_COUNT * 4),
        4,
      );
      const posAttrTgt = new InstancedBufferAttribute(
        new Float32Array(MAX_PARTICLE_COUNT * 4),
        4,
      );
      const normAttr = new InstancedBufferAttribute(
        new Float32Array(MAX_PARTICLE_COUNT * 3),
        3,
      );
      const normAttrTgt = new InstancedBufferAttribute(
        new Float32Array(MAX_PARTICLE_COUNT * 3),
        3,
      );
      sphereGeo.setAttribute("instancePos", posAttr);
      sphereGeo.setAttribute("instancePosTarget", posAttrTgt);
      sphereGeo.setAttribute("instanceNormal", normAttr);
      sphereGeo.setAttribute("instanceNormalTarget", normAttrTgt);

      const instancedMesh = new InstancedMesh(sphereGeo, null as any, MAX_PARTICLE_COUNT);
      instancedMesh.instanceMatrix.needsUpdate = true;
      instancedMesh.frustumCulled = false;

      // ── Uniforms ──────────────────────────────────────────────────────────
      const cfg0 = SECTION_CONFIG[initial.from];
      const u = {
        // timeline
        t: uniform(0), // segment progress
        mode: uniform(0), // 0 = morph, 1 = journey
        m1: uniform(new Matrix4()), // station A pose (world)
        m2: uniform(new Matrix4()), // station B pose (world)
        scaleMix: uniform(1), // current model scale, for local-space-looking noise
        entrance: uniform(0),
        // look
        color: uniform(new Color(cfg0.color)),
        floatAmp: uniform(FLOAT_AMP),
        particleSize: uniform(PARTICLE_SIZE),
        ambient: uniform(cfg0.ambient),
        wrap: uniform(WRAP),
        light1Pos: uniform(new Vector3(0, 5, 2)),
        light1Color: uniform(new Color(cfg0.light1Color)),
        light1Intensity: uniform(cfg0.light1Intensity),
        light2Pos: uniform(new Vector3(0, -5, -2)),
        light2Color: uniform(new Color(cfg0.light2Color)),
        light2Intensity: uniform(cfg0.light2Intensity),
        noiseAmp: uniform(NOISE_AMP),
        noiseScale: uniform(NOISE_SCALE),
        noiseSpeed: uniform(NOISE_SPEED),
        noiseGain: uniform(NOISE_GAIN),
        maskScale: uniform(MASK_SCALE),
        maskSpeed: uniform(MASK_SPEED),
        maskContrast: uniform(MASK_CONTRAST),
        bobAmp: uniform(cfg0.bobAmp),
        mouseGlowColor: uniform(new Color(cfg0.mouseGlowColor)),
        glowSensitivity: uniform(GLOW_SENSITIVITY),
        // pusher physics
        physDt: uniform(0),
        pusherPos: uniform(new Vector3()),
        pusherVel: uniform(new Vector3()),
        pusherAxis: uniform(new Vector3(0, 0, 1)),
        pusherActive: uniform(0),
        pusherRadius: uniform(PUSHER_RADIUS),
        pusherInfluence: uniform(PUSHER_INFLUENCE),
        pusherFalloff: uniform(PUSHER_FALLOFF),
        pusherDepth: uniform(PUSHER_DEPTH),
        pusherRadial: uniform(PUSHER_RADIAL),
        pusherMove: uniform(PUSHER_MOVE),
        pusherFlowBias: uniform(PUSHER_FLOW_BIAS),
        pusherSpring: uniform(PUSHER_SPRING),
        pusherDamping: uniform(PUSHER_DAMPING),
        pusherMaxOffset: uniform(PUSHER_MAX_OFFSET),
        pusherTurbulence: uniform(PUSHER_TURBULENCE),
        pusherTurbScale: uniform(PUSHER_TURB_SCALE),
        pusherTurbSpeed: uniform(PUSHER_TURB_SPEED),
        containRadius: uniform(CONTAIN_RADIUS),
        containBounce: uniform(CONTAIN_BOUNCE),
        containHoldTime: uniform(CONTAIN_HOLD_TIME),
      };
      // Journey curve samples, world space at the current scroll position.
      const journeyPathPts = Array.from({ length: JOURNEY_PATH_POINTS }, () => new Vector3());
      const journeyPath = uniformArray(journeyPathPts, "vec3");

      // ── Per-particle physics state (GPU compute) ──────────────────────────
      const restSrcBuf = new StorageInstancedBufferAttribute(
        new Float32Array(MAX_PARTICLE_COUNT * 4),
        4,
      );
      const restTgtBuf = new StorageInstancedBufferAttribute(
        new Float32Array(MAX_PARTICLE_COUNT * 4),
        4,
      );
      const physOffBuf = new StorageInstancedBufferAttribute(MAX_PARTICLE_COUNT, 3);
      const physVelBuf = new StorageInstancedBufferAttribute(MAX_PARTICLE_COUNT, 3);
      const physHoldBuf = new StorageInstancedBufferAttribute(MAX_PARTICLE_COUNT, 1);
      const physRandArr = new Float32Array(MAX_PARTICLE_COUNT * 3);
      for (let i = 0; i < MAX_PARTICLE_COUNT; i++) {
        const x = Math.random() * 2 - 1;
        const y = Math.random() * 2 - 1;
        const z = Math.random() * 2 - 1;
        const len = Math.hypot(x, y, z) || 1;
        physRandArr[i * 3] = x / len;
        physRandArr[i * 3 + 1] = y / len;
        physRandArr[i * 3 + 2] = z / len;
      }
      const physRandBuf = new StorageInstancedBufferAttribute(physRandArr, 3);

      const restSrcStorage = storage(restSrcBuf, "vec4", MAX_PARTICLE_COUNT);
      const restTgtStorage = storage(restTgtBuf, "vec4", MAX_PARTICLE_COUNT);
      const physOffStorage = storage(physOffBuf, "vec3", MAX_PARTICLE_COUNT);
      const physVelStorage = storage(physVelBuf, "vec3", MAX_PARTICLE_COUNT);
      const physHoldStorage = storage(physHoldBuf, "float", MAX_PARTICLE_COUNT);
      const physRandStorage = storage(physRandBuf, "vec3", MAX_PARTICLE_COUNT);
      const physOffNode = physOffStorage.toAttribute();

      const computePhysics = Fn(() => {
        const off = physOffStorage.element(instanceIndex);
        const vel = physVelStorage.element(instanceIndex);
        const hold = physHoldStorage.element(instanceIndex);
        const rs = restSrcStorage.toReadOnly().element(instanceIndex) as any;
        const rt = restTgtStorage.toReadOnly().element(instanceIndex) as any;
        const rnd = physRandStorage.toReadOnly().element(instanceIndex);
        // Rest = where the particle is currently drawn (world space).
        // Rest = where this particle's base position currently is (world),
        // using the SAME timeline coords as the vertex shader.
        const pcc = particleCoords(u.t);
        const restA = u.m1.mul(vec4(rs.xyz, 1)).xyz;
        const restB = u.m2.mul(vec4(rt.xyz, 1)).xyz;
        const restMorph = mix(restA, restB, pcc.eM);
        const restJourney = mix(restA, restB, step(float(0.5), pcc.jq));
        const rest = mix(restMorph, restJourney, u.mode) as any;
        // Particles flying in the spiral ignore the pusher (they are still
        // sprung back); the ones sitting in either model stay pushable.
        const inFlight = step(float(1e-4), pcc.jq).mul(
          float(1).sub(step(float(1 - 1e-4), pcc.jq)),
        );
        const pushGate = float(1).sub(u.mode.mul(inFlight));

        const eps = float(1e-5);
        const held = step(float(1e-4), hold);
        const pos = rest.add(off);
        const speed = u.pusherVel.length();
        const moveDir = u.pusherVel.div(speed.add(eps));

        const toParticle = pos.sub(u.pusherPos);
        const axial = dot(toParticle, u.pusherAxis);
        const perp = toParticle.sub(u.pusherAxis.mul(axial));
        const dPerp = perp.length();
        const dirOut = perp.div(dPerp.add(eps));

        // Pusher sizes were tuned in model-local units — scale with the model.
        const pr = u.pusherRadius.mul(u.scaleMix);
        const reach = pr.add(u.pusherInfluence.mul(u.scaleMix));
        const perpFall = float(1).sub(tslSmoothstep(pr, reach, dPerp));
        const halfDepth = u.pusherDepth.mul(float(0.5)).mul(u.scaleMix);
        const axialInfl = float(1).sub(
          tslSmoothstep(halfDepth.mul(float(0.7)), halfDepth, abs(axial)),
        );
        const influence = pow(perpFall, u.pusherFalloff).mul(axialInfl);

        const exitDir = normalize(
          dirOut.add(moveDir.mul(u.pusherFlowBias)).add(rnd.mul(float(0.3))),
        );
        const mag = influence
          .mul(u.pusherRadial)
          .add(influence.mul(speed).mul(u.pusherMove));
        const pushForce = exitDir.mul(mag);

        const nCoord = pos.mul(u.pusherTurbScale).add(
          vec3(
            time.mul(u.pusherTurbSpeed),
            time.mul(u.pusherTurbSpeed).mul(0.7),
            time.mul(u.pusherTurbSpeed).mul(1.3),
          ),
        );
        const turbAmp = u.pusherTurbulence
          .mul(influence)
          .mul(clamp(speed.mul(0.3).add(float(0.1)), float(0), float(1)));
        const turbForce = mx_fractal_noise_vec3(nCoord, 2, 2.0, 0.5).mul(turbAmp);

        const pushAccel = pushForce.add(turbForce).mul(u.pusherActive).mul(pushGate);
        const accel = pushAccel
          .sub(off.mul(u.pusherSpring).mul(float(1).sub(held)))
          .sub(vel.mul(u.pusherDamping));

        vel.addAssign(accel.mul(u.physDt));
        off.addAssign(vel.mul(u.physDt));

        const offLen = off.length();
        const scale = min(float(1), u.pusherMaxOffset.div(offLen.add(eps)));
        off.mulAssign(scale);

        // Invisible containment boundary.
        const cpos = rest.add(off);
        const rXZ = vec2(cpos.x, cpos.z).length();
        const clampF = min(float(1), u.containRadius.div(rXZ.add(eps)));
        off.assign(
          vec3(
            cpos.x.mul(clampF).sub(rest.x),
            cpos.y.sub(rest.y),
            cpos.z.mul(clampF).sub(rest.z),
          ),
        );
        const outAmt = max(rXZ.sub(u.containRadius), float(0));
        const isOut = outAmt.div(outAmt.add(eps));
        const nrm = vec2(cpos.x, cpos.z).div(rXZ.add(eps));
        const vRad = vel.x.mul(nrm.x).add(vel.z.mul(nrm.y));
        const vRemove = max(vRad, float(0))
          .mul(isOut)
          .mul(float(1).add(u.containBounce));
        vel.assign(
          vec3(vel.x.sub(nrm.x.mul(vRemove)), vel.y, vel.z.sub(nrm.y.mul(vRemove))),
        );
        const atWall = step(u.containRadius.add(float(0.01)), rXZ);
        const decremented = max(hold.sub(u.physDt), float(0));
        hold.assign(mix(decremented, u.containHoldTime, atWall));
      })().compute(MAX_PARTICLE_COUNT);

      // ── Material ──────────────────────────────────────────────────────────
      const material = new PointsNodeMaterial() as any;
      // PointsMaterial defaults reset transparent to false (opaque square
      // corners) — force it on, and skip depth writes so overlapping
      // alpha-blended sprites don't occlude each other's corners.
      material.transparent = true;
      material.depthWrite = false;

      const instPos4 = attribute("instancePos", "vec4");
      const instPosTgt4 = attribute("instancePosTarget", "vec4");
      const instNorm = attribute("instanceNormal", "vec3");
      const instNormTgt = attribute("instanceNormalTarget", "vec3");
      const srcLocal = instPos4.xyz;
      const tgtLocal = instPosTgt4.xyz;

      // Both endpoints in world space — poses, rotation and scroll-follow
      // are all inside m1 / m2.
      const W1 = u.m1.mul(vec4(srcLocal, 1)).xyz as any;
      const W2 = u.m2.mul(vec4(tgtLocal, 1)).xyz as any;
      const N1 = normalize(u.m1.mul(vec4(instNorm, 0)).xyz);
      const N2 = normalize(u.m2.mul(vec4(instNormTgt, 0)).xyz);

      const pc = particleCoords(u.t);
      const { hash, qM, eM, jq, keep } = pc;
      const hDep = hash(63.137, 15731.743).mul(2).sub(1);
      const hX = hash(17.913, 39139.317).mul(2).sub(1);
      const hY = hash(53.719, 21557.911).mul(2).sub(1);

      // ── Morph mode ────────────────────────────────────────────────────────
      const envM = sin(qM.mul(Math.PI));
      const morphScatter = mx_fractal_noise_vec3(
        W1.mul(0.35).add(vec3(time.mul(0.15), float(0), time.mul(0.1))),
        2,
        2.0,
        0.5,
      )
        .mul(MORPH_SCATTER)
        .mul(envM);
      const posMorph = mix(W1, W2, eM).add(morphScatter);

      // ── Journey mode: spiral stream along the S-curve ─────────────────────
      const jF = jq.mul(JOURNEY_PATH_POINTS - 1);
      const jI0 = int(min(floor(jF), float(JOURNEY_PATH_POINTS - 2)));
      const jT = jF.sub(float(jI0));
      // (uniformArray elements are untyped in @types/three — cast to any.)
      const jA = journeyPath.element(jI0) as any;
      const jB = journeyPath.element(jI0.add(int(1))) as any;
      const jPathPt = mix(jA, jB, jT) as any;
      const jTan = normalize(jB.sub(jA).add(vec3(0, 1e-5, 0))) as any;
      const jSide = vec3(jTan.y.negate(), jTan.x, 0) as any; // in-plane normal
      const jOut = vec3(0, 0, 1); // towards camera
      const jEnv = sin(jq.mul(Math.PI)); // 0 at both ends, 1 mid-flight

      // Strand + position inside the strand (fixed per particle).
      const sStrand = floor(hash(5.137, 24631.17).mul(SPIRAL_STRANDS - 0.001));
      const sR1 = hash(71.93, 33713.29);
      const sR2 = hash(13.71, 52817.61);
      const sR3 = hash(88.41, 12763.97);
      const isHalo = step(float(1 - SPIRAL_HALO), hash(62.11, 41981.37));
      // Helix angle: winds along the path, strands evenly offset, whole
      // spiral spins over time.
      const sAngle = jq
        .mul(SPIRAL_TURNS * Math.PI * 2)
        .add(sStrand.mul((Math.PI * 2) / SPIRAL_STRANDS))
        .add(time.mul(SPIRAL_SPIN));
      const sRadius = float(SPIRAL_RADIUS)
        .mul(
          float(1).add(
            sin(jq.mul(SPIRAL_PULSE_FREQ * Math.PI * 2).sub(time.mul(0.8))).mul(SPIRAL_PULSE),
          ),
        )
        // halo particles drift further out
        .mul(mix(float(1), sR3.mul(1.6).add(1.2), isHalo));
      const sRadial = jSide.mul(cos(sAngle)).add(jOut.mul(sin(sAngle)));
      // Strand thickness: small disc around the strand centre.
      const sTh = sR1.mul(Math.PI * 2);
      const sThick = jSide
        .mul(cos(sTh))
        .add(jOut.mul(sin(sTh)))
        .add(jTan.mul(sR2.sub(0.5)))
        .mul(float(SPIRAL_THICKNESS).mul(sR2.sqrt()).mul(mix(float(1), float(3), isHalo)));
      const dOffset = sRadial.mul(sRadius).add(sThick);
      const dUnd = vec3(0, 0, 0);

      // Fully formed for almost the whole flight; tiny ramp at the ends.
      const dForm = tslSmoothstep(float(0), float(0.06), jq).mul(
        float(1).sub(tslSmoothstep(float(0.94), float(1), jq)),
      );
      const jStream = jPathPt.add(dUnd.add(dOffset).mul(dForm));
      const jLeave = tslSmoothstep(float(0), float(JOURNEY_LEAVE), jq);
      const jArrive = tslSmoothstep(float(1 - JOURNEY_ARRIVE), float(1), jq);
      // 1 while this particle is out of both models.
      const jPresence = jLeave.mul(float(1).sub(jArrive));
      // Non-spiral particles dissolve: drift outward + fade while leaving
      // model 1, condense back while arriving in model 2 (invisible between).
      const hDust = vec3(
        hash(17.13, 31337.71).sub(0.5),
        hash(29.71, 17717.29).sub(0.5),
        hash(43.19, 27183.11).sub(0.5),
      ).mul(2 * SPIRAL_DUST_DRIFT);
      const posDust = mix(
        W1.add(hDust.mul(jLeave)),
        W2.add(hDust.mul(float(1).sub(jArrive))),
        step(float(0.5), jq),
      );
      const posJourney = mix(posDust, mix(mix(W1, jStream, jLeave), W2, jArrive), keep);
      const dustAlpha = mix(float(1).sub(jPresence), float(1), keep);

      // ── Select mode + page-load entrance ──────────────────────────────────
      const qSel = mix(qM, jq, u.mode);
      const posSel = mix(posMorph, posJourney, u.mode);
      const entranceStart = vec3(hX.mul(6), hY.mul(6), hDep.mul(2.5));
      const basePos = mix(entranceStart, posSel, u.entrance) as any;
      const baseNorm = normalize(mix(N1, N2, qSel));
      const visibility = mix(instPos4.w, instPosTgt4.w, qSel).mul(
        mix(float(1), dustAlpha, u.mode),
      );

      // ── Idle motion (scaled so it reads like model-local units) ───────────
      const localish = basePos.div(u.scaleMix);
      const phase = fract(
        sin(dot(tgtLocal, vec3(12.9898, 78.233, 37.719))).mul(43758.5453),
      ).mul(Math.PI * 2);
      const floatDisp = vec3(
        cos(time.mul(1.3).add(phase)).mul(u.floatAmp).mul(0.6),
        sin(time.mul(1.6).add(phase)).mul(u.floatAmp),
        sin(time.mul(1.1).add(phase.add(1.0))).mul(u.floatAmp).mul(0.6),
      );
      const maskCoord = localish
        .mul(u.maskScale)
        .add(
          vec3(
            time.mul(u.maskSpeed),
            time.mul(u.maskSpeed).mul(0.7),
            time.mul(u.maskSpeed).mul(1.3),
          ),
        );
      const mask = pow(
        clamp(mx_noise_float(maskCoord).mul(0.5).add(0.5), float(0), float(1)),
        u.maskContrast,
      );
      const noiseCoord = localish
        .mul(u.noiseScale)
        .add(vec3(time.mul(u.noiseSpeed), float(0), time.mul(u.noiseSpeed).mul(0.7)));
      const noiseDisp = mx_fractal_noise_vec3(noiseCoord, 2, 2.0, u.noiseGain)
        .mul(u.noiseAmp)
        .mul(mask);
      // Independent per-particle bob (phase + speed hashed from the index).
      const bobPhase = hash(12.9898, 43758.5453).mul(Math.PI * 2);
      const bobFreq = float(0.5).add(hash(78.233, 43758.5453).mul(1.5));
      const bobY = sin(time.mul(bobFreq).add(bobPhase)).mul(u.bobAmp);

      const instCenter = basePos
        .add(floatDisp.add(noiseDisp).add(vec3(0, bobY, 0)).mul(u.scaleMix))
        .add(physOffNode);
      const rCenter = vec2(instCenter.x, instCenter.z).length();
      const centerClampF = min(float(1), u.containRadius.div(rCenter.add(float(1e-5))));
      material.positionNode = vec3(
        instCenter.x.mul(centerClampF),
        instCenter.y,
        instCenter.z.mul(centerClampF),
      );
      material.sizeNode = vec2(u.particleSize);

      // Circular sprite mask.
      const circleMask = float(1).sub(
        tslSmoothstep(float(0.35), float(0.5), uv().sub(0.5).length()),
      );

      // ── Shading (macro normal of the figure, wrap lighting) ───────────────
      const lightContrib = (lightPos: any, lightCol: any, lightInt: any) => {
        const dir = normalize(lightPos.sub(basePos));
        const figW = clamp(
          dot(baseNorm, dir).add(u.wrap).div(float(1.0).add(u.wrap)),
          float(0),
          float(1),
        );
        return lightCol.mul(figW).mul(lightInt);
      };
      const litColor = lightContrib(u.light1Pos, u.light1Color, u.light1Intensity).add(
        lightContrib(u.light2Pos, u.light2Color, u.light2Intensity),
      );
      const shadedColor = u.color.mul(clamp(litColor.add(u.ambient), float(0), float(1)));

      // ── Glow: mouse disturbance + mid-transition + entrance ───────────────
      const mouseGlow = pow(
        clamp(physOffNode.length().mul(u.glowSensitivity), float(0), float(1)),
        MOUSE_GLOW_POW,
      ).mul(MOUSE_GLOW_ACTIVE);
      const morphGlow = clamp(
        W2.sub(W1).length().div(u.scaleMix).mul(float(0.35)),
        float(0),
        float(1),
      )
        .mul(qM.mul(float(1).sub(qM)).mul(4))
        .mul(float(1).sub(u.mode));
      const journeyGlow = jEnv.mul(JOURNEY_GLOW).mul(u.mode).mul(keep);
      const entranceGlow = sin(u.entrance.mul(Math.PI)).mul(0.6);
      const glowFactor = clamp(
        mouseGlow.add(morphGlow).add(journeyGlow).add(entranceGlow),
        float(0),
        float(1),
      );
      material.colorNode = mix(shadedColor, u.mouseGlowColor, glowFactor);
      material.opacityNode = circleMask.mul(visibility);
      instancedMesh.material = material;
      scene.add(instancedMesh);

      // ── Post-processing (bloom, alpha-preserving) ─────────────────────────
      const postProcessing = new PostProcessing(r);
      const scenePass = pass(scene, camera);
      const sceneColor = (scenePass as any).getTextureNode("output");
      const bloomPass: any = bloom(sceneColor, BLOOM_STRENGTH, BLOOM_RADIUS, BLOOM_THRESHOLD);
      // Transparent canvas (premultiplied): alpha must cover the bloom halo.
      const outRgb = sceneColor.rgb.add(bloomPass.rgb);
      const outA = clamp(
        max(sceneColor.a, max(outRgb.r, max(outRgb.g, outRgb.b))),
        float(0),
        float(1),
      );
      postProcessing.outputNode = vec4(outRgb, outA);

      // ── Pair buffers ──────────────────────────────────────────────────────
      let pairFrom: SectionId | null = null;
      let pairTo: SectionId | null = null;
      const writePair = (from: SectionId, to: SectionId) => {
        const ga = geoStore.get(from)!;
        const gb = geoStore.get(to)!;
        const pa = packPosVisible(ga.positions, ga.visible);
        const pb = packPosVisible(gb.positions, gb.visible);
        (posAttr.array as Float32Array).set(pa);
        (posAttrTgt.array as Float32Array).set(pb);
        (normAttr.array as Float32Array).set(ga.normals);
        (normAttrTgt.array as Float32Array).set(gb.normals);
        posAttr.needsUpdate = true;
        posAttrTgt.needsUpdate = true;
        normAttr.needsUpdate = true;
        normAttrTgt.needsUpdate = true;
        (restSrcBuf.array as Float32Array).set(pa);
        (restTgtBuf.array as Float32Array).set(pb);
        restSrcBuf.needsUpdate = true;
        restTgtBuf.needsUpdate = true;
        pairFrom = from;
        pairTo = to;
      };

      // ── Poses ─────────────────────────────────────────────────────────────
      const angles = new Map<SectionId, number>(STATIONS.map((id) => [id, 0]));
      const tmpPos = new Vector3();
      const tmpScale = new Vector3();
      const tmpQuat = new Quaternion();
      const tmpRot = new Matrix4();
      const tmpEuler = new Euler();
      const viewHeight = () =>
        2 * camera.position.z * Math.tan((camera.fov * Math.PI) / 360);

      // Scroll-follow offset (px, upward) for a station at the current scroll.
      // `clampAtZero` = pinned until its anchor line, then rides with the
      // page; unclamped = always page-anchored (journey endpoints).
      const followAnchor = (id: SectionId): number | null => {
        if (SECTION_CONFIG[id].followScroll) return 0.5;
        if (id === JOURNEY.from) return JOURNEY.startAt ?? 0.5;
        if (id === JOURNEY.to) return 0.5;
        return null;
      };
      const followPx = (id: SectionId, scrollY: number, clampAtZero: boolean) => {
        const anchor = followAnchor(id);
        const box = layout.get(id);
        if (anchor === null || !box) return 0;
        const centre = box.top + box.height / 2 - scrollY;
        const off = anchor * window.innerHeight - centre;
        return clampAtZero ? Math.max(0, off) : off;
      };
      const poseMatrix = (id: SectionId, followY: number, out: Matrix4) => {
        const c = SECTION_CONFIG[id];
        const xScale = Math.min(1, camera.aspect / MODEL_X_REFERENCE_ASPECT);
        const sScale = Math.min(1, container.clientWidth / MODEL_SCALE_REFERENCE_WIDTH);
        const s = c.modelScale * sScale;
        tmpPos.set(c.modelX * xScale, c.modelY + followY, 0);
        tmpScale.setScalar(s);
        tmpQuat.identity();
        out.compose(tmpPos, tmpQuat, tmpScale);
        const a = angles.get(id) ?? 0;
        if (c.shape === "ring") tmpEuler.set(c.ringTiltX, 0, a);
        else tmpEuler.set(0, a, 0);
        tmpRot.makeRotationFromEuler(tmpEuler);
        out.multiply(tmpRot);
        return s;
      };

      // ── Journey curve (world space, current scroll) ───────────────────────
      const curvePts: Vector3[] = [];
      const updateJourneyPath = (from: SectionId, to: SectionId, scrollY: number) => {
        const winH = window.innerHeight;
        const vh = viewHeight();
        const wpp = vh / winH;
        const viewW = vh * camera.aspect;
        curvePts.length = 0;
        curvePts.push(
          (centroids.get(from) ?? new Vector3()).clone().applyMatrix4(u.m1.value).setZ(0),
        );
        for (const wp of JOURNEY.waypoints) {
          const box = layout.get(wp.section);
          if (!box) continue;
          const screenY = box.top + wp.at * box.height - scrollY;
          curvePts.push(new Vector3((wp.x - 0.5) * viewW, -(screenY - winH / 2) * wpp, 0));
        }
        curvePts.push(
          (centroids.get(to) ?? new Vector3()).clone().applyMatrix4(u.m2.value).setZ(0),
        );
        const spaced = new CatmullRomCurve3(curvePts, false, "centripetal").getSpacedPoints(
          JOURNEY_PATH_POINTS - 1,
        );
        for (let i = 0; i < JOURNEY_PATH_POINTS; i++) journeyPathPts[i].copy(spaced[i]);
      };

      // ── Mouse (window-level; content sits above the fixed canvas) ─────────
      const raycaster = new Raycaster();
      const mouseNDC = new Vector2();
      const mousePlane = new Plane(new Vector3(0, 0, 1), 0); // z = 0
      const mouseHit = new Vector3();
      const targetMousePos = new Vector3();
      const pusherPos = new Vector3();
      const pusherPrev = new Vector3();
      const pusherVelVec = new Vector3();
      let pusherInit = false;
      let mouseOver = false;
      let mouseEverMoved = false;
      const onMouseMove = (e: MouseEvent) => {
        mouseNDC.set(
          (e.clientX / window.innerWidth) * 2 - 1,
          -(e.clientY / window.innerHeight) * 2 + 1,
        );
        mouseEverMoved = true;
        mouseOver = true;
      };
      const onMouseLeave = () => {
        mouseOver = false;
        pusherInit = false;
      };
      window.addEventListener("mousemove", onMouseMove);
      document.addEventListener("mouseleave", onMouseLeave);

      const onResize = () => {
        if (disposed) return;
        camera.aspect = container.clientWidth / container.clientHeight;
        camera.updateProjectionMatrix();
        r.setSize(container.clientWidth, container.clientHeight);
        layoutDirty = true;
      };
      window.addEventListener("resize", onResize);
      // Sections change height as images/fonts/data load.
      const resizeObserver = new ResizeObserver(() => {
        layoutDirty = true;
      });
      resizeObserver.observe(document.body);

      const tgtColorA = new Color();
      const tgtColorB = new Color();
      let entranceTime = 0;
      let canvasHidden = false;
      let readyFired = false;

      // ── Frame (on GSAP's ticker, after Lenis has applied this frame's scroll)
      const frame = (_time: number, deltaMs: number) => {
        if (disposed) return;
        const delta = Math.min(deltaMs / 1000, 0.1);
        if (layoutDirty) refreshLayout();

        const scrollY = window.scrollY;
        // Past the last hologram section: its model has ridden up and off the
        // top of the viewport — hide the canvas and skip GPU work entirely.
        const lastBox = layout.get(HOLOGRAM_LAST_SECTION);
        const pastEnd =
          !!lastBox &&
          lastBox.top + lastBox.height - scrollY < -END_HIDE_MARGIN * window.innerHeight;
        if (pastEnd !== canvasHidden) {
          canvasHidden = pastEnd;
          r.domElement.style.visibility = pastEnd ? "hidden" : "";
        }
        if (pastEnd) return;
        let { kind, from, to, t } = resolveScroll(scrollY);
        // Geometry not loaded yet (first seconds only): hold the pair we have.
        if (!geoStore.has(from) || !geoStore.has(to)) {
          if (pairFrom && pairTo) {
            from = pairFrom;
            to = pairTo;
          } else {
            return;
          }
        }
        if (from !== pairFrom || to !== pairTo) writePair(from, to);

        // Idle spin per station (time-based, independent of scroll).
        for (const id of STATIONS) {
          const c = SECTION_CONFIG[id];
          const speed = ((2 * Math.PI) / 60) * c.autoRotateSpeed;
          angles.set(id, wrapAngle((angles.get(id) ?? 0) + speed * delta));
        }

        const wpp = viewHeight() / window.innerHeight;
        const journey = kind === "journey";
        const sA = poseMatrix(from, followPx(from, scrollY, !journey) * wpp, u.m1.value);
        const sB = poseMatrix(to, followPx(to, scrollY, !journey) * wpp, u.m2.value);
        if (journey) updateJourneyPath(from, to, scrollY);

        const te = smooth01(t);
        u.t.value = t;
        u.mode.value = journey ? 1 : 0;
        u.scaleMix.value = sA + (sB - sA) * te;
        u.maskContrast.value = journey
          ? MASK_CONTRAST
          : MASK_CONTRAST + (TRANSITION_MASK_CONTRAST - MASK_CONTRAST) * Math.sin(Math.PI * t);

        // Look: straight interpolation between the two stations' configs.
        const ca = SECTION_CONFIG[from];
        const cb = SECTION_CONFIG[to];
        const lerp = (a: number, b: number) => a + (b - a) * te;
        u.color.value.copy(tgtColorA.set(ca.color)).lerp(tgtColorB.set(cb.color), te);
        u.light1Color.value
          .copy(tgtColorA.set(ca.light1Color))
          .lerp(tgtColorB.set(cb.light1Color), te);
        u.light2Color.value
          .copy(tgtColorA.set(ca.light2Color))
          .lerp(tgtColorB.set(cb.light2Color), te);
        u.mouseGlowColor.value
          .copy(tgtColorA.set(ca.mouseGlowColor))
          .lerp(tgtColorB.set(cb.mouseGlowColor), te);
        u.ambient.value = lerp(ca.ambient, cb.ambient);
        u.light1Intensity.value = lerp(ca.light1Intensity, cb.light1Intensity);
        u.light2Intensity.value = lerp(ca.light2Intensity, cb.light2Intensity);
        u.bobAmp.value = lerp(ca.bobAmp, cb.bobAmp);

        // Page-load entrance.
        if (entranceTime < ENTRANCE_DUR) {
          entranceTime += delta;
          u.entrance.value = smooth01(entranceTime / ENTRANCE_DUR);
        }

        // ── Pusher (active everywhere; spiral particles gate themselves) ───
        u.physDt.value = delta;
        if (mouseEverMoved) {
          raycaster.setFromCamera(mouseNDC, camera);
          if (raycaster.ray.intersectPlane(mousePlane, mouseHit)) {
            targetMousePos.copy(mouseHit);
          }
          if (!pusherInit) {
            pusherPos.copy(targetMousePos);
            pusherPrev.copy(targetMousePos);
            pusherInit = true;
          }
          pusherPos.lerp(targetMousePos, 1 - Math.exp(-PUSHER_FOLLOW * delta));
          pusherVelVec
            .subVectors(pusherPos, pusherPrev)
            .divideScalar(Math.max(delta, 0.001))
            .clampLength(0, 40);
          pusherPrev.copy(pusherPos);
          u.pusherPos.value.copy(pusherPos);
          u.pusherVel.value.copy(pusherVelVec);
        }
        u.pusherActive.value = mouseEverMoved && mouseOver ? 1 : 0;

        r.computeAsync(computePhysics);
        postProcessing.renderAsync();

        if (!readyFired) {
          readyFired = true;
          onReadyRef.current?.();
        }
      };
      // Lenis registers its own ticker callback first (prioritised), so by
      // the time this runs window.scrollY is this frame's scroll.
      gsap.ticker.add(frame);

      cleanupInner = () => {
        gsap.ticker.remove(frame);
        window.removeEventListener("resize", onResize);
        window.removeEventListener("mousemove", onMouseMove);
        document.removeEventListener("mouseleave", onMouseLeave);
        resizeObserver.disconnect();
        sphereGeo.dispose();
        material.dispose();
        computePhysics.dispose?.();
        bloomPass?.dispose?.();
        (postProcessing as any)?.dispose?.();
      };
    })();

    return () => {
      disposed = true;
      cleanupInner?.();
      if (renderer) {
        renderer.dispose();
        renderer.domElement?.remove();
      }
    };
  }, []);

  return <div ref={containerRef} style={{ width: "100%", height: "100%" }} />;
}
