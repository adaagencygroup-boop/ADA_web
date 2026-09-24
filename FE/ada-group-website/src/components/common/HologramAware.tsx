"use client";

import { useEffect, useState, type ReactNode } from "react";
import { isHologramEligible } from "@/src/utils/deviceCapabilities";

interface HologramAwareProps {
  children?: ReactNode;
  fallback?: ReactNode;
}

/**
 * HologramAware renders `children` when the 3D Hologram is NOT eligible
 * (e.g. running on integrated GPU / card on, mobile device, or WebGPU unsupported),
 * and renders `fallback` (defaults to null) when running on a discrete GPU with WebGPU.
 */
export default function HologramAware({
  children,
  fallback = null,
}: HologramAwareProps) {
  const [isEligible, setIsEligible] = useState<boolean | null>(null);

  useEffect(() => {
    setIsEligible(isHologramEligible());
  }, []);

  // When discrete GPU is detected (3D hologram active), hide the fallback image
  if (isEligible === true) {
    return fallback ? <>{fallback}</> : null;
  }

  // When on integrated GPU, mobile, or during initial SSR, render the image
  return <>{children}</>;
}
