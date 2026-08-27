"use client";

import { useEffect, useRef } from "react";

type MarqueeProps = {
  children: React.ReactNode;
  className?: string;
  durationSeconds?: number;
  reverse?: boolean;
  draggable?: boolean;
};

export default function Marquee({
  children,
  className = "",
  durationSeconds = 30,
  reverse = false,
  draggable = false,
}: MarqueeProps) {
  const trackRef = useRef<HTMLDivElement>(null);
  const isInteractingRef = useRef(false);

  useEffect(() => {
    if (!draggable) return;
    const track = trackRef.current;
    if (!track) return;

    const copyWidth = () => track.scrollWidth / 3;

    const recenter = () => {
      const width = copyWidth();
      if (width <= 0) return;
      if (track.scrollLeft < width * 0.5) {
        track.scrollLeft += width;
      } else if (track.scrollLeft > width * 1.5) {
        track.scrollLeft -= width;
      }
    };

    track.scrollLeft = copyWidth();

    const speed = (reverse ? -1 : 1) * (60 / durationSeconds);
    let frameId: number;

    const step = () => {
      if (!isInteractingRef.current) {
        track.scrollLeft += speed;
      }
      recenter();
      frameId = requestAnimationFrame(step);
    };
    frameId = requestAnimationFrame(step);

    track.addEventListener("scroll", recenter, { passive: true });

    return () => {
      cancelAnimationFrame(frameId);
      track.removeEventListener("scroll", recenter);
    };
  }, [draggable, durationSeconds, reverse]);

  if (draggable) {
    return (
      <div
        ref={trackRef}
        onPointerDown={() => {
          isInteractingRef.current = true;
        }}
        onPointerUp={() => {
          isInteractingRef.current = false;
        }}
        onPointerCancel={() => {
          isInteractingRef.current = false;
        }}
        onPointerLeave={() => {
          isInteractingRef.current = false;
        }}
        className={`scrollbar-none cursor-grab overflow-x-auto [-ms-overflow-style:none] active:cursor-grabbing ${className}`}
      >
        <div className="flex w-max items-center">
          {children}
          {children}
          {children}
        </div>
      </div>
    );
  }

  return (
    <div
      className={`group relative overflow-hidden mask-[linear-gradient(to_right,transparent,black_5%,black_95%,transparent)] ${className}`}
    >
      <div
        className="animate-marquee flex w-max items-center group-hover:[animation-play-state:paused]"
        style={{
          animationDuration: `${durationSeconds}s`,
          animationDirection: reverse ? "reverse" : "normal",
        }}
      >
        {children}
        {children}
      </div>
    </div>
  );
}
