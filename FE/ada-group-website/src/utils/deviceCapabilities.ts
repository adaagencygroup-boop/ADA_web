import { UAParser } from "ua-parser-js";

/**
 * Returns true if running on a real mobile/tablet device (including when
 * Android/iOS is in "Desktop Mode" — ua-parser-js reads the real OS/device,
 * not the faked viewport width).
 */
export function isMobileOrTablet(): boolean {
  if (typeof navigator === "undefined") return false;
  const parser = new UAParser(navigator.userAgent);
  const deviceType = parser.getDevice().type; // "mobile" | "tablet" | "console" | "smarttv" | "wearable" | "embedded" | undefined
  return deviceType === "mobile" || deviceType === "tablet";
}

/**
 * Heuristically detects integrated GPUs by probing the WebGL RENDERER
 * string. Returns true when a discrete (dedicated) GPU is found.
 * Integrated GPUs (Intel HD/UHD/Iris, AMD Radeon Vega, Apple Silicon GPU,
 * etc.) produce lower-quality output and may stutter with heavy WebGPU work.
 */
export function hasDiscreteGpu(): boolean {
  if (typeof window === "undefined") return false;
  try {
    const canvas = document.createElement("canvas");
    const gl =
      canvas.getContext("webgl2") ??
      canvas.getContext("webgl") ??
      (canvas.getContext("experimental-webgl") as WebGLRenderingContext | null);

    if (!gl) return false;

    const ext = gl.getExtension("WEBGL_debug_renderer_info");
    if (!ext) return false;

    const renderer = (
      gl.getParameter(ext.UNMASKED_RENDERER_WEBGL) as string
    ).toLowerCase();

    // Integrated GPU / software renderer signatures to block
    const integratedPatterns = [
      /intel.*(hd|uhd|iris|graphics)/, // Intel integrated
      /amd.*vega/, // AMD APU / Ryzen iGPU
      /radeon.*vega/,
      /apple.*gpu/, // Apple Silicon iGPU (M-series)
      /llvmpipe/, // Software renderer (Mesa)
      /swiftshader/, // Google's software renderer
      /microsoft basic render/, // Windows fallback renderer
    ];

    const isIntegrated = integratedPatterns.some((re) => re.test(renderer));
    return !isIntegrated; // discrete = NOT integrated
  } catch {
    return false;
  }
}

/**
 * Returns true if the device is eligible for rendering the 3D Hologram
 * (WebGPU supported + Desktop/non-mobile + Discrete GPU).
 */
export function isHologramEligible(): boolean {
  if (typeof window === "undefined" || typeof navigator === "undefined") {
    return false;
  }
  const hasWebGpu = "gpu" in navigator;
  return hasWebGpu && !isMobileOrTablet() && hasDiscreteGpu();
}
