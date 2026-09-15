"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

interface GsapHeroRevealProps {
  children: React.ReactNode;
  className?: string;
  leftSelector?: string;
  rightSelector?: string;
}

export default function GsapHeroReveal({
  children,
  className = "",
  leftSelector = ".hero-text-left",
  rightSelector = ".hero-image-right",
}: GsapHeroRevealProps) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const ctx = gsap.context(() => {
      const leftEl = el.querySelector(leftSelector);
      const rightEl = el.querySelector(rightSelector);

      if (leftEl) {
        gsap.fromTo(
          leftEl,
          { opacity: 0, x: -60 },
          {
            opacity: 1,
            x: 0,
            duration: 1,
            ease: "power2.out",
            scrollTrigger: {
              trigger: el,
              start: "top 90%",
              end: "bottom 10%",
              toggleActions: "play reverse play reverse",
            },
          }
        );
      }

      if (rightEl) {
        gsap.fromTo(
          rightEl,
          { opacity: 0, filter: "blur(12px)", scale: 1.04 },
          {
            opacity: 1,
            filter: "blur(0px)",
            scale: 1,
            duration: 1.2,
            ease: "power2.out",
            scrollTrigger: {
              trigger: el,
              start: "top 90%",
              end: "bottom 10%",
              toggleActions: "play reverse play reverse",
            },
          }
        );
      }
    }, ref);

    return () => ctx.revert();
  }, [leftSelector, rightSelector]);

  return (
    <div ref={ref} className={`overflow-x-clip ${className}`}>
      {children}
    </div>
  );
}
