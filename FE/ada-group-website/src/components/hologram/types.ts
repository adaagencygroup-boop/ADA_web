export type GeometryData = {
  positions: Float32Array;
  normals: Float32Array;
  /** One entry per particle slot: 1 for a real sampled/formation position,
   * 0 for a filler slot beyond the section's `particleCount`. Packed into
   * the .w channel of the instancePos/instancePosTarget GPU attributes and
   * multiplied into final opacity — this is what actually hides filler
   * particles (rather than only moving them), since it works regardless of
   * where a rotating/tilted section's group transform sends their xyz. */
  visible: Float32Array;
};

// Fixed allocation size for every GPU buffer / the InstancedMesh itself —
// recreating these per section (to match a smaller visible count exactly)
// would mean tearing down and rebuilding the whole WebGPU scene on every
// scroll-triggered section change, causing a visible hitch. Instead each
// section's `particleCount` (<= this max) controls how many of the fixed
// slots get a real sampled position; the rest are filled with a sparse wide
// scatter so they're generally invisible instead of clustering into a
// bright hot-spot.
export const MAX_PARTICLE_COUNT = 20_000;

export type SectionId =
  | "hero"
  | "about"
  | "services"
  | "partners"
  | "people"
  | "techstack"
  | "why"
  | "contact";

export interface SectionHologramConfig {
  /** "glb" samples `url` into a particle cloud; "ring" ignores `url` and
   * generates a procedural circular ring formation instead (no model file). */
  shape: "glb" | "ring";
  /** GLB model sampled into the particle cloud for this section (shape: "glb" only). */
  url: string;
  /** Base particle color. */
  color: string;
  /** How many of the fixed particle slots get a real sampled position and
   * render for this section (<= the field's fixed max allocation) — the
   * rest are marked invisible (see GeometryData.visible) rather than
   * resized, since buffers are sized once for the max across all sections
   * and lowering this only needs to thin out a section's shape, never
   * resize/recreate the InstancedMesh. */
  particleCount: number;
  /** Minimum brightness floor (0-1) even where a particle faces away from
   * both lights — shadedColor = color * clamp(lit + ambient, 0, 1), so a
   * light base color needs a higher floor here or its unlit side reads as a
   * dark, muddy patch instead of just a dimmer version of the same color. */
  ambient: number;
  light1Color: string;
  light1Intensity: number;
  light2Color: string;
  light2Intensity: number;
  /** Horizontal offset of the model within the fixed viewport (center/left/right). */
  modelX: number;
  /** Vertical offset of the model within the fixed viewport. */
  modelY: number;
  /** Uniform scale multiplier applied to the whole particle cloud (1 = default sampled size). */
  modelScale: number;
  autoRotateSpeed: number;
  /** Amplitude of each particle's independent up/down bob (randomized phase
   * and speed per particle — 0 = off, only meaningful for shape: "ring"). */
  bobAmp: number;
  /** Ring formation parameters — only meaningful for shape: "ring", ignored
   * for shape: "glb" (still required so every section shares one config
   * shape). */
  ringRadius: number;
  /** Random radial jitter (band thickness) applied around ringRadius. */
  ringThickness: number;
  /** Random Z-depth jitter, giving the band a bit of volume. */
  ringDepthJitter: number;
  /** Number of ripple crests baked around the circumference. */
  ringRippleCount: number;
  /** Radial amplitude of the baked ripple. */
  ringRippleAmp: number;
  /** Fixed incline around X (radians) — the ring's own spin stays on Z, so
   * this doesn't accumulate/tumble, it just sets a constant viewing angle. */
  ringTiltX: number;
  /** Glow color particles flash toward when disturbed by the pusher. */
  mouseGlowColor: string;
}
