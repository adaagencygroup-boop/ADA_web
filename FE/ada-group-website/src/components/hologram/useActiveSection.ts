"use client";

import { useEffect, useState } from "react";
import { SECTION_ORDER } from "./sectionConfig";
import type { SectionId } from "./types";

const SELECTOR = "[data-hologram-section]";

// Per-section trigger point: a section becomes active the instant its TOP
// EDGE crosses this far down the viewport (0 = very top, 1 = very bottom)
// — not a fraction of the section's own height, so each one fires at a
// fixed, predictable scroll position regardless of how tall it is. Tune
// individual transitions here (e.g. make "people" trigger earlier/later
// than the rest) instead of one shared constant for every section.
const TRIGGER_LINE_FROM_TOP: Record<SectionId, number> = {
  hero: 0.4,
  about: 0.6,
  services: 0.6,
  partners: 0.4,
  people: 0.4,
  techstack: 0.4,
  why: 0.4,
  contact: 0.4,
};

/**
 * Tracks which homepage section is currently active by checking, on every
 * scroll, which section's box currently spans across its own configured
 * trigger line (see TRIGGER_LINE_FROM_TOP). Sections are marked with
 * `data-hologram-section="<id>"` on their wrapper.
 */
export function useActiveSection(): SectionId {
  const [active, setActive] = useState<SectionId>(SECTION_ORDER[0]);

  useEffect(() => {
    const elements = Array.from(
      document.querySelectorAll<HTMLElement>(SELECTOR),
    )
      .map((el) => ({
        el,
        id: el.getAttribute("data-hologram-section") as SectionId | null,
      }))
      .filter((entry): entry is { el: HTMLElement; id: SectionId } =>
        entry.id !== null,
      );
    if (elements.length === 0) return;

    let ticking = false;

    const update = () => {
      ticking = false;
      const winH = window.innerHeight;

      // Sections are stacked top-to-bottom without overlap, so normally at
      // most one spans its own trigger line at once — if more than one
      // somehow does, prefer the furthest down (DOM/scroll order).
      let activeId: SectionId | null = null;
      for (const { el, id } of elements) {
        const triggerFrac = TRIGGER_LINE_FROM_TOP[id] ?? 0.4;
        const lineY = winH * triggerFrac;
        const rect = el.getBoundingClientRect();
        if (rect.top <= lineY && rect.bottom >= lineY) {
          activeId = id;
        }
      }

      if (activeId) {
        const id = activeId;
        setActive((prev) => (prev === id ? prev : id));
      }
    };

    const onScroll = () => {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(update);
    };

    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);

  return active;
}
