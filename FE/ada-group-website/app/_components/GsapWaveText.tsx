"use client";

import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

interface GsapWaveTextProps {
  text?: string;
  children?: React.ReactNode;
  className?: string;
  as?: React.ElementType;
  duration?: number;
  stagger?: number;
  waveHeight?: number;
  delay?: number;
  start?: string;
  toggleActions?: string;
}

function splitDOMTextNodes(el: HTMLElement) {
  const walk = (node: Node) => {
    if (node.nodeType === Node.TEXT_NODE) {
      const text = node.nodeValue || "";
      if (!text.trim()) return;

      const fragment = document.createDocumentFragment();
      const words = text.split(/(\s+)/);

      words.forEach((word) => {
        if (/^\s+$/.test(word)) {
          fragment.appendChild(document.createTextNode(word));
        } else if (word) {
          const wordSpan = document.createElement("span");
          wordSpan.className = "inline-block whitespace-nowrap";
          word.split("").forEach((char) => {
            const charSpan = document.createElement("span");
            charSpan.className = "gsap-wave-char inline-block will-change-transform";
            charSpan.textContent = char;
            wordSpan.appendChild(charSpan);
          });
          fragment.appendChild(wordSpan);
        }
      });

      node.parentNode?.replaceChild(fragment, node);
    } else if (node.nodeType === Node.ELEMENT_NODE) {
      const elem = node as HTMLElement;
      if (elem.tagName !== "BR" && !elem.classList.contains("gsap-wave-char")) {
        Array.from(elem.childNodes).forEach(walk);
      }
    }
  };

  Array.from(el.childNodes).forEach(walk);
}

export default function GsapWaveText({
  text,
  children,
  className = "",
  as: Component = "h2",
  duration = 0.4,
  stagger = 0.011,
  waveHeight = 12,
  delay = 0,
  start = "top 90%",
  toggleActions = "play none none none",
}: GsapWaveTextProps) {
  const containerRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    // Tách chữ thành từng ký tự trực tiếp trên DOM sau khi React đã Hydrate xong
    splitDOMTextNodes(el);

    const chars = el.querySelectorAll(".gsap-wave-char");
    if (!chars.length) return;

    const ctx = gsap.context(() => {
      const rect = el.getBoundingClientRect();
      const isInView = rect.top < window.innerHeight * 0.95 && rect.bottom > 0;

      if (isInView) {
        gsap.fromTo(
          chars,
          {
            opacity: 0,
            y: waveHeight,
            scale: 0.95,
          },
          {
            opacity: 1,
            y: 0,
            scale: 1,
            duration: duration,
            delay: delay,
            ease: "power3.out",
            force3D: true,
            stagger: {
              each: stagger,
              ease: "power1.out",
            },
          }
        );
      } else {
        gsap.fromTo(
          chars,
          {
            opacity: 0,
            y: waveHeight,
            scale: 0.95,
          },
          {
            opacity: 1,
            y: 0,
            scale: 1,
            duration: duration,
            delay: delay,
            ease: "power3.out",
            force3D: true,
            stagger: {
              each: stagger,
              ease: "power1.out",
            },
            scrollTrigger: {
              trigger: el,
              start: start,
              end: "bottom 15%",
              toggleActions: toggleActions,
              fastScrollEnd: true,
            },
          }
        );
      }
    }, containerRef);

    return () => ctx.revert();
  }, [duration, stagger, waveHeight, delay, start, toggleActions]);

  return (
    <Component ref={containerRef as any} className={className}>
      {children ?? text}
    </Component>
  );
}
