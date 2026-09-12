"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

interface GsapScrollRevealProps {
  children: React.ReactNode;
  className?: string;
  y?: number;
  duration?: number;
  delay?: number;
  staggerSelector?: string;
  staggerAmount?: number;
}

export default function GsapScrollReveal({
  children,
  className = "",
  y = 35,
  duration = 0.8,
  delay = 0,
  staggerSelector,
  staggerAmount = 0.1,
}: GsapScrollRevealProps) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const ctx = gsap.context(() => {
      if (staggerSelector) {
        const targets = el.querySelectorAll(staggerSelector);
        if (targets.length > 0) {
          gsap.fromTo(
            targets,
            { opacity: 0, y: y },
            {
              opacity: 1,
              y: 0,
              duration: duration,
              delay: delay,
              ease: "power2.out",
              stagger: staggerAmount,
              scrollTrigger: {
                trigger: el,
                start: "top 90%",
                end: "bottom 10%",
                toggleActions: "play reverse play reverse",
              },
            }
          );
          return;
        }
      }

      gsap.fromTo(
        el,
        { opacity: 0, y: y },
        {
          opacity: 1,
          y: 0,
          duration: duration,
          delay: delay,
          ease: "power2.out",
          scrollTrigger: {
            trigger: el,
            start: "top 90%",
            end: "bottom 10%",
            toggleActions: "play reverse play reverse",
          },
        }
      );
    }, ref);

    return () => ctx.revert();
  }, [y, duration, delay, staggerSelector, staggerAmount]);

  return (
    <div ref={ref} className={className}>
      {children}
    </div>
  );
}
