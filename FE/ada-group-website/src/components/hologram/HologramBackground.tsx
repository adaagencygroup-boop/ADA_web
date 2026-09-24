"use client";

import dynamic from "next/dynamic";
import { useEffect, useState } from "react";
import { isHologramEligible } from "@/src/utils/deviceCapabilities";
import { useActiveSection } from "./useActiveSection";

const HologramField = dynamic(() => import("./HologramField"), {
  ssr: false,
});

export default function HologramBackground() {
  const activeSection = useActiveSection();
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
      }}
    >
      <HologramField
        activeSection={activeSection}
        onUnsupported={() => setSupported(false)}
      />
    </div>
  );
}