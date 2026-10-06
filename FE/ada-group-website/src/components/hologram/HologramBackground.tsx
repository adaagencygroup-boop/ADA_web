"use client";

import dynamic from "next/dynamic";
import { useEffect, useState } from "react";
import { isHologramEligible } from "@/src/utils/deviceCapabilities";
import { HOLOGRAM_BG } from "./sectionConfig";

const HologramField = dynamic(() => import("./HologramField"), {
  ssr: false,
});

export default function HologramBackground() {
  const [eligible, setEligible] = useState(false);
  const [supported, setSupported] = useState(true);

  useEffect(() => {
    setEligible(isHologramEligible());
  }, []);

  if (!eligible || !supported) return null;

  return (
    <div
      aria-hidden
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 0,
        pointerEvents: "none",
        // Same look as the old in-scene CanvasTexture gradient (radius 0.8 of
        // each axis, centred slightly above middle). Lives here, not in the
        // canvas, so the canvas can scroll-follow without moving the bg.
        // background: `radial-gradient(80% 80% at 50% 45%, ${HOLOGRAM_BG.center} 0%, ${HOLOGRAM_BG.mid} 50%, ${HOLOGRAM_BG.edge} 100%)`,
      }}
    >
      {/* Fully scroll-driven: HologramField reads the scroll position itself
          every frame (see its header comment), no active-section prop. */}
      <HologramField
        onUnsupported={() => setSupported(false)}
      />
    </div>
  );
}