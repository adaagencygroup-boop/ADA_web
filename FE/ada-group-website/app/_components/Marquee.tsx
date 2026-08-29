"use client";

import type { PointerEvent, ReactNode } from "react";
import { useEffect, useRef } from "react";

type MarqueeProps = {
  children: ReactNode;
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
  const dragStartXRef = useRef(0);
  const dragStartScrollLeftRef = useRef(0);

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

    const speed =
      (reverse ? -1 : 1) *
      (60 / durationSeconds);

    let frameId: number;

    const step = () => {
      if (!isInteractingRef.current) {
        track.scrollLeft += speed;
      }

      recenter();
      frameId = requestAnimationFrame(step);
    };

    frameId = requestAnimationFrame(step);

    track.addEventListener("scroll", recenter, {
      passive: true,
    });

    return () => {
      cancelAnimationFrame(frameId);
      track.removeEventListener("scroll", recenter);
    };
  }, [draggable, durationSeconds, reverse]);

  if (draggable) {
    const handlePointerDown = (
      e: PointerEvent<HTMLDivElement>
    ) => {
      const track = trackRef.current;

      if (!track) return;

      isInteractingRef.current = true;
      dragStartXRef.current = e.clientX;
      dragStartScrollLeftRef.current = track.scrollLeft;

      track.setPointerCapture(e.pointerId);
    };

    const handlePointerMove = (
      e: PointerEvent<HTMLDivElement>
    ) => {
      const track = trackRef.current;

      if (!track || !isInteractingRef.current) {
        return;
      }

      const deltaX =
        e.clientX - dragStartXRef.current;

      track.scrollLeft =
        dragStartScrollLeftRef.current - deltaX;
    };

    const handlePointerUp = (
      e: PointerEvent<HTMLDivElement>
    ) => {
      const track = trackRef.current;

      if (!track) return;

      isInteractingRef.current = false;

      if (track.hasPointerCapture(e.pointerId)) {
        track.releasePointerCapture(e.pointerId);
      }
    };

    return (
      <div
        ref={trackRef}
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={handlePointerUp}
        onPointerCancel={handlePointerUp}
        className={`
          scrollbar-none
          overflow-x-auto
          cursor-grab
          active:cursor-grabbing
          touch-pan-x
          [-ms-overflow-style:none]
          ${className}
        `}
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
      className={`
        group
        relative
        overflow-hidden
        mask-[linear-gradient(to_right,transparent,black_5%,black_95%,transparent)]
        ${className}
      `}
    >
      <div
        className="
          animate-marquee
          flex
          w-max
          items-center
          group-hover:[animation-play-state:paused]
        "
        style={{
          animationDuration: `${durationSeconds}s`,
          animationDirection: reverse
            ? "reverse"
            : "normal",
        }}
      >
        {children}
        {children}
      </div>
    </div>
  );
}