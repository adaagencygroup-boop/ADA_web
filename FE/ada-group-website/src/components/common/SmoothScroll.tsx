"use client";

import { useEffect } from "react";
import Lenis from "lenis";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

/**
 * Site-wide smooth scroll (Lenis) driven by GSAP's ticker.
 *
 * Why: the homepage hologram is scrubbed by scroll position. With native
 * scrolling the browser moves the page on its compositor thread while
 * WebGL/WebGPU reads the scroll in rAF, so the two drift a frame apart and a
 * hard fling jumps hundreds of px in one frame. Lenis applies the scroll
 * inside the ticker instead, so:
 *   - DOM and canvas update in the SAME frame (HologramField's ticker
 *     callback runs right after this one), and
 *   - big wheel deltas are eased over a few frames, so fast scrolling plays
 *     through the animation instead of skipping it.
 * ScrollTrigger (GsapScrollReveal etc.) is kept in sync via lenis "scroll".
 *
 * Touch scrolling stays native (Lenis default). Inner scrollable elements
 * can opt out with the `data-lenis-prevent` attribute. Respects
 * prefers-reduced-motion by not smoothing at all.
 */
export default function SmoothScroll() {
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    gsap.registerPlugin(ScrollTrigger);
    const lenis = new Lenis({
      lerp: 0.1, // lower = smoother/heavier, higher = snappier
      smoothWheel: true,
      anchors: true, // in-page #hash links scroll smoothly too
      autoRaf: false, // driven by gsap.ticker below
    });
    lenis.on("scroll", ScrollTrigger.update);

    const tick = (time: number) => lenis.raf(time * 1000);
    // prioritize = true: run before any other ticker callback (the hologram),
    // so they all see this frame's scroll position.
    gsap.ticker.add(tick, false, true);
    gsap.ticker.lagSmoothing(0);

    return () => {
      gsap.ticker.remove(tick);
      lenis.destroy();
    };
  }, []);

  return null;
}
