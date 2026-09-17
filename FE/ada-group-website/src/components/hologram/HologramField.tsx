"use client";

/* eslint-disable @typescript-eslint/no-explicit-any -- three/tsl's node-builder
   API (uniform/material nodes, PointsNodeMaterial's `*Node` properties)
   doesn't ship precise TypeScript types for composed expressions. */

import { useEffect, useRef } from "react";
import {
  Scene,
  PerspectiveCamera,
  InstancedMesh,
  PlaneGeometry,
  InstancedBufferAttribute,
  Object3D,
  Group,
  Matrix3,
  Vector2,
  Vector3,
  Quaternion,
  Box3,
  Plane,
  Raycaster,
  Mesh,
  Color,
  CanvasTexture,
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
  uv,
  vec2,
  vec3,
  float,
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
import type { GeometryData, SectionHologramConfig, SectionId } from "./types";
import { MAX_PARTICLE_COUNT } from "./types";
import { SECTION_CONFIG } from "./sectionConfig";

// ── Tunable constants (no live GUI in production — edit here) ───────────────
// Rendered as camera-facing billboard sprites (PointsNodeMaterial). With
// sizeAttenuation on (default), sizeNode is a WORLD-space size — it's
// converted to screen pixels via size * canvasHeight/2 / distanceToCamera,
// the same perspective-shrink-with-distance rule the old mesh radius had.
const PARTICLE_SIZE = 0.085;
const FLOAT_AMP = 0.01;
const WRAP = 0.35;

const NOISE_AMP = 0.29;
const NOISE_SCALE = 0.9;
const NOISE_SPEED = 1;
const NOISE_GAIN = 0.65;
const MASK_SCALE = 0.95;
const MASK_SPEED = 0.5;
const MASK_CONTRAST = 3.8;
const TRANSITION_MASK_CONTRAST = 1.65;

const TRANSITION_DEFORM_DUR = 0.4;
const TRANSITION_MORPH_DUR = 2.05;
const TRANSITION_REFORM_DUR = 0.45;
const ENTRANCE_MORPH_DUR = 1.4;
const ENTRANCE_REFORM_DUR = 1.1;

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

// NOTE: left as the light pastel gradient on purpose — the dark trio from
// the hologram-particles panel (#495155/#495258/#305269) was tried and
// reverted earlier in this session because it broke text contrast across
// every section (dark-on-dark). See chat before applying it again.
const BG_COLOR_CENTER = "#fbfcfe";
const BG_COLOR_MID = "#f2f6fb";
const BG_COLOR_EDGE = "#e2eaf5";

// Exponential-smoothing rate used to ease color/light/position toward a new
// section's config instead of snapping instantly.
const UNIFORM_LERP_SPEED = 2.5;

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

// Entrance start state: particles begin scattered across a generous volume
// (roughly screen-covering, in local space around the Hero model's origin)
// instead of collapsed at a point, so the very first paint gathers them in
// from everywhere rather than growing outward from the centre.
function makeScatteredStart(count: number): GeometryData {
  const positions = new Float32Array(count * 3);
  const normals = new Float32Array(count * 3);
  // All visible at the start: any slot that is filler in the very first
  // section's real target geometry fades to invisible as transitionProgress
  // blends instancePos -> instancePosTarget (see visCur/visTgt below), so
  // the entrance scatter itself doesn't need to know that split in advance.
  const visible = new Float32Array(count).fill(1);
  for (let i = 0; i < count; i++) {
    const b = i * 3;
    positions[b] = (Math.random() * 2 - 1) * 6;
    positions[b + 1] = (Math.random() * 2 - 1) * 6;
    positions[b + 2] = (Math.random() * 2 - 1) * 2.5;

    const x = Math.random() * 2 - 1;
    const y = Math.random() * 2 - 1;
    const z = Math.random() * 2 - 1;
    const len = Math.hypot(x, y, z) || 1;
    normals[b] = x / len;
    normals[b + 1] = y / len;
    normals[b + 2] = z / len;
  }
  return { positions, normals, visible };
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

interface HologramFieldProps {
  activeSection: SectionId;
  onReady?: () => void;
  onUnsupported?: () => void;
}

export default function HologramField({
  activeSection,
  onReady,
  onUnsupported,
}: HologramFieldProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const groupRef = useRef<Group | null>(null);
  const uniformsRef = useRef<Record<string, any> | null>(null);
  const restPosBufRef = useRef<StorageInstancedBufferAttribute | null>(null);
  const physOffBufRef = useRef<StorageInstancedBufferAttribute | null>(null);
  const physVelBufRef = useRef<StorageInstancedBufferAttribute | null>(null);
  const physHoldBufRef = useRef<StorageInstancedBufferAttribute | null>(null);
  const bloomNodeRef = useRef<any>(null);
  const bgCtxRef = useRef<CanvasRenderingContext2D | null>(null);
  const bgTexRef = useRef<CanvasTexture | null>(null);

  const autoRotateSpeedRef = useRef(SECTION_CONFIG[activeSection].autoRotateSpeed);
  const onReadyRef = useRef(onReady);
  const onUnsupportedRef = useRef(onUnsupported);
  useEffect(() => {
    onReadyRef.current = onReady;
    onUnsupportedRef.current = onUnsupported;
  }, [onReady, onUnsupported]);

  // Target config the per-frame loop eases uniforms toward (no live GUI —
  // values only change when `activeSection` changes).
  const sectionTargetRef = useRef(SECTION_CONFIG[activeSection]);
  const activeSectionRef = useRef(activeSection);
  useEffect(() => {
    sectionTargetRef.current = SECTION_CONFIG[activeSection];
  }, [activeSection]);

  const transitionStateRef = useRef<
    "idle" | "deform-out" | "morphing" | "deform-in"
  >("idle");
  const transitionTimeRef = useRef(0);
  const isEntranceRef = useRef(true);
  const posAttrRef = useRef<InstancedBufferAttribute | null>(null);
  const normAttrRef = useRef<InstancedBufferAttribute | null>(null);
  const posAttrTargetRef = useRef<InstancedBufferAttribute | null>(null);
  const normAttrTargetRef = useRef<InstancedBufferAttribute | null>(null);
  const isFirstSectionRef = useRef(true);

  const redrawBg = () => {
    const ctx = bgCtxRef.current;
    const tex = bgTexRef.current;
    if (!ctx || !tex) return;
    const { width, height } = ctx.canvas;
    const grad = ctx.createRadialGradient(
      width * 0.5,
      height * 0.45,
      0,
      width * 0.5,
      height * 0.5,
      width * 0.8,
    );
    grad.addColorStop(0, BG_COLOR_CENTER);
    grad.addColorStop(0.5, BG_COLOR_MID);
    grad.addColorStop(1, BG_COLOR_EDGE);
    ctx.fillStyle = grad;
    ctx.fillRect(0, 0, width, height);
    tex.needsUpdate = true;
  };

  // ── Full init — runs once ─────────────────────────────────────────────────
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    let animId: number;
    let renderer: WebGPURenderer;
    let disposed = false;
    let cleanupInner: (() => void) | undefined;

    (async () => {
      if (typeof navigator === "undefined" || !("gpu" in navigator)) {
        onUnsupportedRef.current?.();
        return;
      }

      renderer = new WebGPURenderer({ antialias: true, alpha: true });
      try {
        await renderer.init();
      } catch {
        onUnsupportedRef.current?.();
        return;
      }
      if (disposed) return;

      renderer.setSize(container.clientWidth, container.clientHeight);
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
      container.appendChild(renderer.domElement);

      const scene = new Scene();

      {
        const bgCanvas = document.createElement("canvas");
        bgCanvas.width = bgCanvas.height = 512;
        const bgCtx = bgCanvas.getContext("2d")!;
        bgCtxRef.current = bgCtx;
        const bgTex = new CanvasTexture(bgCanvas);
        bgTexRef.current = bgTex;
        scene.background = bgTex;
        redrawBg();
      }

      const camera = new PerspectiveCamera(
        50,
        container.clientWidth / container.clientHeight,
        0.1,
        200,
      );
      camera.position.set(0, 0, 6);

      const { positions, normals, visible } = await sampleSectionGeometry(
        sectionTargetRef.current,
        MAX_PARTICLE_COUNT,
      );
      if (disposed) return;

      // ── Particle geometry ─────────────────────────────────────────────────
      // A flat 1x1 quad — PointsNodeMaterial (via its SpriteNodeMaterial
      // base) billboards each instance to face the camera and masks it into
      // a circle (see opacityNode below), so particles read as true round
      // dots at any viewing/rotation angle instead of a faceted mesh shape.
      const sphereGeo = new PlaneGeometry(1, 1);
      // WebGPU caps a pipeline at 8 vertex buffers. The plane's own "normal"
      // attribute is dead weight now (no per-facet lighting on a billboard),
      // so drop it to make room for the 4 custom instanced attributes below
      // plus the physics-offset storage buffer bound as an attribute.
      sphereGeo.deleteAttribute("normal");
      const scatterStart = makeScatteredStart(MAX_PARTICLE_COUNT);
      sphereGeo.setAttribute(
        "instanceNormal",
        new InstancedBufferAttribute(scatterStart.normals, 3),
      );
      sphereGeo.setAttribute(
        "instancePos",
        new InstancedBufferAttribute(
          packPosVisible(scatterStart.positions, scatterStart.visible),
          4,
        ),
      );
      sphereGeo.setAttribute(
        "instanceNormalTarget",
        new InstancedBufferAttribute(normals.slice(), 3),
      );
      sphereGeo.setAttribute(
        "instancePosTarget",
        new InstancedBufferAttribute(packPosVisible(positions, visible), 4),
      );

      const instancedMesh = new InstancedMesh(
        sphereGeo,
        null as any,
        MAX_PARTICLE_COUNT,
      );
      instancedMesh.instanceMatrix.needsUpdate = true;

      posAttrRef.current = sphereGeo.getAttribute(
        "instancePos",
      ) as InstancedBufferAttribute;
      normAttrRef.current = sphereGeo.getAttribute(
        "instanceNormal",
      ) as InstancedBufferAttribute;
      posAttrTargetRef.current = sphereGeo.getAttribute(
        "instancePosTarget",
      ) as InstancedBufferAttribute;
      normAttrTargetRef.current = sphereGeo.getAttribute(
        "instanceNormalTarget",
      ) as InstancedBufferAttribute;

      transitionStateRef.current = "morphing";
      transitionTimeRef.current = 0;

      // ── TSL uniforms ──────────────────────────────────────────────────────
      const cfg0 = sectionTargetRef.current;
      const u = {
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
        maskContrast: uniform(TRANSITION_MASK_CONTRAST),
        // Pusher physics (GPU compute, collider cylinder along view axis).
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
        // Invisible containment boundary (no rendered mesh).
        containRadius: uniform(CONTAIN_RADIUS),
        containBounce: uniform(CONTAIN_BOUNCE),
        containHoldTime: uniform(CONTAIN_HOLD_TIME),
        mouseGlowColor: uniform(new Color(cfg0.mouseGlowColor)),
        glowSensitivity: uniform(GLOW_SENSITIVITY),
        transitionProgress: uniform(0),
        entranceGlow: uniform(1),
        bobAmp: uniform(cfg0.bobAmp),
      };
      uniformsRef.current = u;

      // ── Per-particle physics state (GPU compute) ──────────────────────────
      const restPosBuf = new StorageInstancedBufferAttribute(
        positions.slice(),
        3,
      );
      const physOffBuf = new StorageInstancedBufferAttribute(MAX_PARTICLE_COUNT, 3);
      const physVelBuf = new StorageInstancedBufferAttribute(MAX_PARTICLE_COUNT, 3);
      const physHoldBuf = new StorageInstancedBufferAttribute(MAX_PARTICLE_COUNT, 1);
      const physRandArr = new Float32Array(MAX_PARTICLE_COUNT * 3);
      for (let i = 0; i < MAX_PARTICLE_COUNT; i++) {
        let x = Math.random() * 2 - 1;
        let y = Math.random() * 2 - 1;
        let z = Math.random() * 2 - 1;
        const len = Math.hypot(x, y, z) || 1;
        x /= len;
        y /= len;
        z /= len;
        physRandArr[i * 3] = x;
        physRandArr[i * 3 + 1] = y;
        physRandArr[i * 3 + 2] = z;
      }
      const physRandBuf = new StorageInstancedBufferAttribute(physRandArr, 3);

      restPosBufRef.current = restPosBuf;
      physOffBufRef.current = physOffBuf;
      physVelBufRef.current = physVelBuf;
      physHoldBufRef.current = physHoldBuf;

      const restPosStorage = storage(restPosBuf, "vec3", MAX_PARTICLE_COUNT);
      const physOffStorage = storage(physOffBuf, "vec3", MAX_PARTICLE_COUNT);
      const physVelStorage = storage(physVelBuf, "vec3", MAX_PARTICLE_COUNT);
      const physHoldStorage = storage(physHoldBuf, "float", MAX_PARTICLE_COUNT);
      const physRandStorage = storage(physRandBuf, "vec3", MAX_PARTICLE_COUNT);

      const physOffNode = physOffStorage.toAttribute();

      const computePhysics = Fn(() => {
        const off = physOffStorage.element(instanceIndex);
        const vel = physVelStorage.element(instanceIndex);
        const hold = physHoldStorage.element(instanceIndex);
        const rest = restPosStorage.toReadOnly().element(instanceIndex);
        const rnd = physRandStorage.toReadOnly().element(instanceIndex);

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

        const reach = u.pusherRadius.add(u.pusherInfluence);
        const perpFall = float(1).sub(tslSmoothstep(u.pusherRadius, reach, dPerp));
        const halfDepth = u.pusherDepth.mul(float(0.5));
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

        const pushAccel = pushForce.add(turbForce).mul(u.pusherActive);

        const accel = pushAccel
          .sub(off.mul(u.pusherSpring).mul(float(1).sub(held)))
          .sub(vel.mul(u.pusherDamping));

        vel.addAssign(accel.mul(u.physDt));
        off.addAssign(vel.mul(u.physDt));

        const offLen = off.length();
        const scale = min(float(1), u.pusherMaxOffset.div(offLen.add(eps)));
        off.mulAssign(scale);

        // ── Invisible containment boundary ──────────────────────────────────
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

      // ── TSL material ──────────────────────────────────────────────────────
      const material = new PointsNodeMaterial() as any;
      // PointsNodeMaterial's own defaults (PointsMaterial) reset transparent
      // to false, which renders the quad's corners as an opaque white square
      // instead of a soft circular cutout — force it back on, and skip depth
      // writes so overlapping alpha-blended particles don't occlude each
      // other's transparent corners.
      material.transparent = true;
      material.depthWrite = false;

      const instNorm = attribute("instanceNormal", "vec3");
      const instNormTgt = attribute("instanceNormalTarget", "vec3");
      // xyz + a visibility flag packed into .w (see packPosVisible) — split
      // back out here so the rest of the shader below reads plain vec3
      // positions same as before.
      const instPos4 = attribute("instancePos", "vec4");
      const instPosTgt4 = attribute("instancePosTarget", "vec4");
      const instPos = instPos4.xyz;
      const instPosTgt = instPosTgt4.xyz;
      const visibility = mix(instPos4.w, instPosTgt4.w, u.transitionProgress);

      const blendPos = mix(instPos, instPosTgt, u.transitionProgress);
      const blendNorm = normalize(
        mix(instNorm, instNormTgt, u.transitionProgress),
      );

      const phase = fract(
        sin(dot(instPosTgt, vec3(12.9898, 78.233, 37.719))).mul(43758.5453),
      ).mul(Math.PI * 2);

      const floatDisp = vec3(
        cos(time.mul(1.3).add(phase)).mul(u.floatAmp).mul(0.6),
        sin(time.mul(1.6).add(phase)).mul(u.floatAmp),
        sin(time.mul(1.1).add(phase.add(1.0)))
          .mul(u.floatAmp)
          .mul(0.6),
      );

      const maskCoord = blendPos
        .mul(u.maskScale)
        .add(
          vec3(
            time.mul(u.maskSpeed),
            time.mul(u.maskSpeed).mul(0.7),
            time.mul(u.maskSpeed).mul(1.3),
          ),
        );

      const rawMask = mx_noise_float(maskCoord);
      const mask = pow(
        clamp(rawMask.mul(0.5).add(0.5), float(0), float(1)),
        u.maskContrast,
      );

      const noiseCoord = blendPos
        .mul(u.noiseScale)
        .add(
          vec3(
            time.mul(u.noiseSpeed),
            float(0),
            time.mul(u.noiseSpeed).mul(0.7),
          ),
        );

      const noiseDisp = mx_fractal_noise_vec3(noiseCoord, 2, 2.0, u.noiseGain)
        .mul(u.noiseAmp)
        .mul(mask);

      // Independent up/down bob per particle: phase AND speed are both
      // hashed from instanceIndex (two different magic constants so they
      // don't correlate), so particles drift out of sync with each other
      // instead of moving as one coordinated wave — reads as random
      // bobbing rather than a mechanically perfect motion.
      const bobIndexF = float(instanceIndex);
      const bobPhase = fract(sin(bobIndexF.mul(12.9898)).mul(43758.5453)).mul(
        Math.PI * 2,
      );
      const bobFreqJitter = fract(sin(bobIndexF.mul(78.233)).mul(43758.5453));
      const bobFreq = float(0.5).add(bobFreqJitter.mul(1.5));
      const bobY = sin(time.mul(bobFreq).add(bobPhase)).mul(u.bobAmp);

      const instCenter = blendPos
        .add(floatDisp)
        .add(noiseDisp)
        .add(physOffNode)
        .add(vec3(float(0), bobY, float(0)));
      const rCenter = vec2(instCenter.x, instCenter.z).length();
      const centerClampF = min(float(1), u.containRadius.div(rCenter.add(float(1e-5))));
      const containedCenter = vec3(
        instCenter.x.mul(centerClampF),
        instCenter.y,
        instCenter.z.mul(centerClampF),
      );

      // Sprite/point centre in object space — SpriteNodeMaterial billboards
      // the quad to face the camera and applies size/perspective itself, so
      // no per-vertex offset (no `positionLocal`) is added here.
      material.positionNode = containedCenter;
      material.sizeNode = vec2(u.particleSize);

      // Circular mask: a flat billboard quad renders as a square by
      // default, so cut it down to a soft-edged circle using the quad's own
      // UV (0..1) distance from centre.
      const particleUV = uv();
      const distFromCenter = particleUV.sub(0.5).length();
      const circleMask = float(1).sub(
        tslSmoothstep(float(0.35), float(0.5), distFromCenter),
      );

      // ── Shading ───────────────────────────────────────────────────────────
      // No per-facet local normal on a flat billboard (unlike the old
      // icosahedron mesh), so lighting uses only the figure's macro normal.
      const lightContrib = (lightPos: any, lightCol: any, lightInt: any) => {
        const dir = normalize(lightPos.sub(blendPos));
        const figW = clamp(
          dot(blendNorm, dir).add(u.wrap).div(float(1.0).add(u.wrap)),
          float(0),
          float(1),
        );
        return lightCol.mul(figW).mul(lightInt);
      };

      const litColor = lightContrib(
        u.light1Pos,
        u.light1Color,
        u.light1Intensity,
      ).add(lightContrib(u.light2Pos, u.light2Color, u.light2Intensity));

      const shadedColor = u.color.mul(
        clamp(litColor.add(u.ambient), float(0), float(1)),
      );

      // ── Glow (touch + transition) ──────────────────────────────────────────
      const physDispMag = physOffNode.length();
      const mouseGlowFactor = pow(
        clamp(physDispMag.mul(u.glowSensitivity), float(0), float(1)),
        MOUSE_GLOW_POW,
      ).mul(MOUSE_GLOW_ACTIVE);

      const morphActivity = u.transitionProgress
        .mul(float(1).sub(u.transitionProgress))
        .mul(float(4));
      const transDispMag = instPosTgt.sub(instPos).length();
      const transNorm = clamp(transDispMag.mul(float(0.35)), float(0), float(1));
      const transGlow = transNorm.mul(morphActivity);

      const glowFactor = clamp(
        mouseGlowFactor.add(transGlow),
        float(0),
        float(1),
      ).mul(u.entranceGlow);
      material.colorNode = mix(shadedColor, u.mouseGlowColor, glowFactor);
      material.opacityNode = circleMask.mul(visibility);

      instancedMesh.material = material;

      const posGroup = new Group();
      posGroup.position.set(cfg0.modelX, cfg0.modelY, 0);
      posGroup.scale.setScalar(cfg0.modelScale);
      const rotGroup = new Group();
      rotGroup.add(instancedMesh);
      posGroup.add(rotGroup);

      scene.add(posGroup);
      groupRef.current = posGroup;
      onReadyRef.current?.();

      // ── Post-processing (bloom) ─────────────────────────────────────────────
      let postProcessing: PostProcessing | null = null;
      {
        const pp = new PostProcessing(renderer);
        const scenePass = pass(scene, camera);
        const sceneColor = (scenePass as any).getTextureNode("output");
        const bloomPass = bloom(sceneColor, BLOOM_STRENGTH, BLOOM_RADIUS, BLOOM_THRESHOLD);
        bloomNodeRef.current = bloomPass;
        pp.outputNode = sceneColor.add(bloomPass);
        postProcessing = pp;
      }

      const onResize = () => {
        if (disposed || !container) return;
        camera.aspect = container.clientWidth / container.clientHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(container.clientWidth, container.clientHeight);
      };
      window.addEventListener("resize", onResize);

      // ── Mouse interaction (listens on window — page content sits visually
      // on top of this fixed background canvas, so events must be captured
      // globally rather than on the canvas container itself) ─────────────────
      const raycaster = new Raycaster();
      const mouseNDC = new Vector2();
      const mousePlane = new Plane();
      const mouseHit = new Vector3();
      const modelCenter = new Vector3();
      const cameraDir = new Vector3();
      const targetMousePos = new Vector3();
      const pusherPos = new Vector3();
      const pusherPrev = new Vector3();
      const pusherVelVec = new Vector3();
      const invRotQ = new Quaternion();
      const localAxisVec = new Vector3();
      let pusherInit = false;
      let mouseOver = false;
      let mouseEverMoved = false;
      let lastFrameTime = performance.now();
      const smoothstep = (p: number) => p * p * (3 - 2 * p);

      const onMouseMove = (e: MouseEvent) => {
        mouseNDC.set(
          (e.clientX / window.innerWidth) * 2 - 1,
          -(e.clientY / window.innerHeight) * 2 + 1,
        );
        raycaster.setFromCamera(mouseNDC, camera);
        if (raycaster.ray.intersectPlane(mousePlane, mouseHit)) {
          const localPos = mouseHit
            .clone()
            .sub(posGroup.position)
            .applyQuaternion(rotGroup.quaternion.clone().invert())
            .divideScalar(posGroup.scale.x);
          targetMousePos.copy(localPos);
          mouseEverMoved = true;
        }
        mouseOver = true;
      };

      const onMouseLeave = () => {
        mouseOver = false;
        pusherInit = false;
      };

      window.addEventListener("mousemove", onMouseMove);
      document.addEventListener("mouseleave", onMouseLeave);

      const animate = () => {
        if (disposed) return;
        animId = requestAnimationFrame(animate);

        const now = performance.now();
        const delta = Math.min((now - lastFrameTime) / 1000, 0.1);
        lastFrameTime = now;

        // ── Ease per-section params (color/light/position) toward target ─────
        const cfg = sectionTargetRef.current;
        const alpha = 1 - Math.exp(-UNIFORM_LERP_SPEED * delta);
        u.color.value.lerp(new Color(cfg.color), alpha);
        u.ambient.value += (cfg.ambient - u.ambient.value) * alpha;
        u.light1Color.value.lerp(new Color(cfg.light1Color), alpha);
        u.light2Color.value.lerp(new Color(cfg.light2Color), alpha);
        u.mouseGlowColor.value.lerp(new Color(cfg.mouseGlowColor), alpha);
        u.light1Intensity.value +=
          (cfg.light1Intensity - u.light1Intensity.value) * alpha;
        u.light2Intensity.value +=
          (cfg.light2Intensity - u.light2Intensity.value) * alpha;
        u.bobAmp.value += (cfg.bobAmp - u.bobAmp.value) * alpha;
        posGroup.position.x += (cfg.modelX - posGroup.position.x) * alpha;
        posGroup.position.y += (cfg.modelY - posGroup.position.y) * alpha;
        posGroup.scale.setScalar(
          posGroup.scale.x + (cfg.modelScale - posGroup.scale.x) * alpha,
        );
        autoRotateSpeedRef.current +=
          (cfg.autoRotateSpeed - autoRotateSpeedRef.current) * alpha;

        // ── Transition state machine ──────────────────────────────────────────
        const tState = transitionStateRef.current;

        if (tState === "deform-out") {
          transitionTimeRef.current += delta;
          const p = Math.min(transitionTimeRef.current / TRANSITION_DEFORM_DUR, 1);
          u.maskContrast.value =
            MASK_CONTRAST + (TRANSITION_MASK_CONTRAST - MASK_CONTRAST) * smoothstep(p);
          if (p >= 1) {
            u.maskContrast.value = TRANSITION_MASK_CONTRAST;
            transitionTimeRef.current = 0;
            transitionStateRef.current = "morphing";
          }
        } else if (tState === "morphing") {
          transitionTimeRef.current += delta;
          const morphDur = isEntranceRef.current
            ? ENTRANCE_MORPH_DUR
            : TRANSITION_MORPH_DUR;
          const p = Math.min(transitionTimeRef.current / morphDur, 1);
          u.transitionProgress.value = smoothstep(p);
          if (p >= 1) {
            const srcPos = posAttrRef.current!.array as Float32Array;
            const tgtPos = posAttrTargetRef.current!.array as Float32Array;
            const srcNorm = normAttrRef.current!.array as Float32Array;
            const tgtNorm = normAttrTargetRef.current!.array as Float32Array;
            srcPos.set(tgtPos);
            srcNorm.set(tgtNorm);
            posAttrRef.current!.needsUpdate = true;
            normAttrRef.current!.needsUpdate = true;
            u.transitionProgress.value = 0;
            transitionTimeRef.current = 0;
            transitionStateRef.current = "deform-in";
          }
        } else if (tState === "deform-in") {
          transitionTimeRef.current += delta;
          const reformDur = isEntranceRef.current
            ? ENTRANCE_REFORM_DUR
            : TRANSITION_REFORM_DUR;
          const p = Math.min(transitionTimeRef.current / reformDur, 1);
          u.maskContrast.value =
            TRANSITION_MASK_CONTRAST + (MASK_CONTRAST - TRANSITION_MASK_CONTRAST) * smoothstep(p);
          if (isEntranceRef.current) {
            u.entranceGlow.value = 1 - smoothstep(p);
          }
          if (p >= 1) {
            u.maskContrast.value = MASK_CONTRAST;
            transitionStateRef.current = "idle";
            if (isEntranceRef.current) isEntranceRef.current = false;
            onReadyRef.current?.();
          }
        }

        if (!isEntranceRef.current && mouseEverMoved && u.entranceGlow.value < 1) {
          u.entranceGlow.value = Math.min(u.entranceGlow.value + delta / 1.0, 1);
        }

        // The ring formation lies flat in the XY plane (facing the camera).
        // Spinning it around Y like a 3-D model would tumble it edge-on
        // twice per revolution, so ring sections spin around Z instead
        // (like a wheel) while easing any residual Y-tilt back to 0; GLB
        // sections do the opposite so a leftover ring Z-spin unwinds away.
        const rotDelta = ((2 * Math.PI) / 60) * autoRotateSpeedRef.current * delta;
        if (cfg.shape === "ring") {
          rotGroup.rotation.z += rotDelta;
          rotGroup.rotation.y += (0 - rotGroup.rotation.y) * alpha;
          // Fixed tilt around X (doesn't accumulate over time like the Z
          // spin) so the ring reads as an inclined hoop instead of a flat
          // coin — tilting around X keeps it face-enough-on since the spin
          // itself stays on Z.
          rotGroup.rotation.x += (cfg.ringTiltX - rotGroup.rotation.x) * alpha;
        } else {
          rotGroup.rotation.y += rotDelta;
          rotGroup.rotation.z += (0 - rotGroup.rotation.z) * alpha;
          rotGroup.rotation.x += (0 - rotGroup.rotation.x) * alpha;
        }

        posGroup.getWorldPosition(modelCenter);
        camera.getWorldDirection(cameraDir);
        mousePlane.setFromNormalAndCoplanarPoint(cameraDir, modelCenter);

        invRotQ.copy(rotGroup.quaternion).invert();
        localAxisVec.copy(cameraDir).applyQuaternion(invRotQ).normalize();
        u.pusherAxis.value.copy(localAxisVec);

        if (mouseEverMoved) {
          raycaster.setFromCamera(mouseNDC, camera);
          if (raycaster.ray.intersectPlane(mousePlane, mouseHit)) {
            mouseHit
              .sub(posGroup.position)
              .applyQuaternion(invRotQ)
              .divideScalar(posGroup.scale.x);
            targetMousePos.copy(mouseHit);
          }
        }

        // ── Pusher (collider cylinder) physics input ────────────────────────
        u.physDt.value = delta;
        if (mouseEverMoved) {
          if (!pusherInit) {
            pusherPos.copy(targetMousePos);
            pusherPrev.copy(targetMousePos);
            pusherInit = true;
          }
          const pa = 1 - Math.exp(-PUSHER_FOLLOW * delta);
          pusherPos.lerp(targetMousePos, pa);
          pusherVelVec
            .subVectors(pusherPos, pusherPrev)
            .divideScalar(Math.max(delta, 0.001))
            .clampLength(0, 40);
          pusherPrev.copy(pusherPos);
          u.pusherPos.value.copy(pusherPos);
          u.pusherVel.value.copy(pusherVelVec);
        }
        u.pusherActive.value = mouseEverMoved && mouseOver ? 1 : 0;

        renderer.computeAsync(computePhysics);

        if (postProcessing) {
          postProcessing.renderAsync();
        } else {
          renderer.renderAsync(scene, camera);
        }
      };
      animate();

      cleanupInner = () => {
        window.removeEventListener("resize", onResize);
        window.removeEventListener("mousemove", onMouseMove);
        document.removeEventListener("mouseleave", onMouseLeave);
        sphereGeo.dispose();
        material.dispose();
        bgCtxRef.current = null;
        bgTexRef.current = null;
      };
    })();

    return () => {
      disposed = true;
      cancelAnimationFrame(animId);
      cleanupInner?.();
      groupRef.current = null;
      uniformsRef.current = null;
      restPosBufRef.current = null;
      physOffBufRef.current = null;
      physVelBufRef.current = null;
      physHoldBufRef.current = null;
      if (renderer) {
        renderer.dispose();
        renderer.domElement?.remove();
      }
    };
  }, []);

  // ── Trigger dissolve/morph/reform pulse on section change ────────────────
  useEffect(() => {
    if (isFirstSectionRef.current) {
      isFirstSectionRef.current = false;
      activeSectionRef.current = activeSection;
      return;
    }
    if (activeSectionRef.current === activeSection) return;
    activeSectionRef.current = activeSection;

    if (
      !uniformsRef.current ||
      !posAttrTargetRef.current ||
      !normAttrTargetRef.current
    )
      return;

    const cfg = SECTION_CONFIG[activeSection];
    const wasIdle = transitionStateRef.current === "idle";

    sampleSectionGeometry(cfg, MAX_PARTICLE_COUNT).then(
      ({ positions: newPos, normals: newNorm, visible: newVisible }) => {
        if (
          !posAttrTargetRef.current ||
          !normAttrTargetRef.current ||
          !uniformsRef.current
        )
          return;

        const prog = uniformsRef.current.transitionProgress.value as number;
        if (prog > 0) {
          const srcPos = posAttrRef.current!.array as Float32Array;
          const tgtPos = posAttrTargetRef.current.array as Float32Array;
          const srcNorm = normAttrRef.current!.array as Float32Array;
          const tgtNorm = normAttrTargetRef.current.array as Float32Array;
          for (let i = 0; i < srcPos.length; i++) {
            srcPos[i] = srcPos[i] * (1 - prog) + tgtPos[i] * prog;
            srcNorm[i] = srcNorm[i] * (1 - prog) + tgtNorm[i] * prog;
          }
          posAttrRef.current!.needsUpdate = true;
          normAttrRef.current!.needsUpdate = true;
          uniformsRef.current.transitionProgress.value = 0;
        }

        (posAttrTargetRef.current.array as Float32Array).set(
          packPosVisible(newPos, newVisible),
        );
        (normAttrTargetRef.current.array as Float32Array).set(newNorm);
        posAttrTargetRef.current.needsUpdate = true;
        normAttrTargetRef.current.needsUpdate = true;
        transitionTimeRef.current = 0;

        if (restPosBufRef.current) {
          (restPosBufRef.current.array as Float32Array).set(newPos);
          restPosBufRef.current.needsUpdate = true;
        }

        if (wasIdle) {
          transitionStateRef.current = "deform-out";
        } else {
          uniformsRef.current.maskContrast.value = TRANSITION_MASK_CONTRAST;
          transitionStateRef.current = "morphing";
        }
      },
    );
  }, [activeSection]);

  return <div ref={containerRef} style={{ width: "100%", height: "100%" }} />;
}
