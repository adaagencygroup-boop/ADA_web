"use client";

import dynamic from "next/dynamic";
import { useEffect, useState } from "react";
import { useActiveSection } from "./useActiveSection";

const HologramField = dynamic(() => import("./HologramField"), {
  ssr: false,
});

const MOBILE_QUERY = "(max-width: 767px)";

export default function HologramBackground() {
  const activeSection = useActiveSection();
  const [eligible, setEligible] = useState(false);
  const [supported, setSupported] = useState(true);

  useEffect(() => {
    const hasGpu = typeof navigator !== "undefined" && "gpu" in navigator;
    const mql = window.matchMedia(MOBILE_QUERY);
    const update = () => setEligible(hasGpu && !mql.matches);
    update();
    mql.addEventListener("change", update);
    return () => mql.removeEventListener("change", update);
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
      }}
    >
      <HologramField
        activeSection={activeSection}
        onUnsupported={() => setSupported(false)}
      />
    </div>
  );
}
