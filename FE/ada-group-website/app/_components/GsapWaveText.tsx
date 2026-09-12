"use client";

import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

interface GsapWaveTextProps {
  text: string;
  className?: string;
  as?: React.ElementType;
  duration?: number;
  stagger?: number;
  waveHeight?: number;
  delay?: number;
}

export default function GsapWaveText({
  text,
  className = "",
  as: Component = "h2",
  duration = 0.35,
  stagger = 0.015,
  waveHeight = 14,
  delay = 0,
}: GsapWaveTextProps) {
  const containerRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    const chars = el.querySelectorAll(".gsap-wave-char");
    if (!chars.length) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        chars,
        {
          opacity: 0,
          y: waveHeight,
          scale: 0.96,
        },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: duration,
          delay: delay,
          ease: "power2.out",
          force3D: true,
          stagger: {
            each: stagger,
            ease: "sine.inOut",
          },
          scrollTrigger: {
            trigger: el,
            start: "top 92%",
            end: "bottom 8%",
            toggleActions: "play reverse play reverse",
            fastScrollEnd: true,
          },
        }
      );
    }, containerRef);

    return () => ctx.revert();
  }, [duration, stagger, waveHeight, delay]);

  const lines = text.split("\n");

  return (
    <Component ref={containerRef as any} className={className}>
      {lines.map((line, lIdx) => (
        <React.Fragment key={lIdx}>
          {line.split(" ").map((word, wIdx, wordsArr) => (
            <span key={wIdx} className="inline-block whitespace-nowrap">
              {word.split("").map((char, cIdx) => (
                <span
                  key={cIdx}
                  className="gsap-wave-char inline-block will-change-transform"
                >
                  {char}
                </span>
              ))}
              {wIdx < wordsArr.length - 1 && (
                <span className="inline-block">&nbsp;</span>
              )}
            </span>
          ))}
          {lIdx < lines.length - 1 && <br />}
        </React.Fragment>
      ))}
    </Component>
  );
}
