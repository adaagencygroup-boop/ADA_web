"use client";

import { useEffect, useState } from "react";
import { SECTION_ORDER } from "./sectionConfig";
import type { SectionId } from "./types";

const SELECTOR = "[data-hologram-section]";

/**
 * Tracks which homepage section is currently most visible and returns its id.
 * Sections are marked with `data-hologram-section="<id>"` on their wrapper.
 */
export function useActiveSection(): SectionId {
  const [active, setActive] = useState<SectionId>(SECTION_ORDER[0]);

  useEffect(() => {
    const elements = Array.from(
      document.querySelectorAll<HTMLElement>(SELECTOR),
    );
    if (elements.length === 0) return;

    const ratios = new Map<Element, number>();

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          ratios.set(entry.target, entry.intersectionRatio);
        }
        let best: Element | null = null;
        let bestRatio = 0;
        for (const el of elements) {
          const ratio = ratios.get(el) ?? 0;
          if (ratio > bestRatio) {
            bestRatio = ratio;
            best = el;
          }
        }
        if (best) {
          const id = best.getAttribute("data-hologram-section") as SectionId;
          if (id) setActive((prev) => (prev === id ? prev : id));
        }
      },
      { threshold: [0, 0.25, 0.5, 0.75, 1] },
    );

    for (const el of elements) observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return active;
}
