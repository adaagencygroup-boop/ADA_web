"use client";

import Image from "next/image";
import { useEffect, useState } from "react";

type LoadingScreenProps = {
  fullScreen?: boolean;
  text?: string;
  className?: string;
};

export default function LoadingScreen({
  fullScreen = true,
  text = "ADA GROUP",
  className = "",
}: LoadingScreenProps) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted && fullScreen) return null;

  return (
    <div
      className={`${
        fullScreen
          ? "fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-white/95 backdrop-blur-md"
          : "flex flex-col items-center justify-center p-8"
      } ${className}`}
    >
      <div className="relative flex flex-col items-center">
        {/* Logo container with outer spinning gradient ring */}
        <div className="relative flex h-32 w-32 items-center justify-center">
          {/* Outer glowing spinning ring */}
          <div className="absolute inset-0 rounded-full border-4 border-slate-100 border-t-blue-600 border-r-blue-500 animate-spin" />
          
          {/* Secondary counter-rotating inner ring */}
          <div className="absolute inset-2.5 rounded-full border-3 border-transparent border-b-sky-400 border-l-blue-400 animate-[spin_1.5s_linear_infinite_reverse] opacity-70" />

          {/* Pulse aura */}
          <div className="absolute inset-0 rounded-full bg-blue-500/10 animate-ping opacity-30" />

          {/* Logo */}
          <div className="relative flex h-16 w-16 items-center justify-center">
            <Image
              src="/images/logo/logo.webp"
              alt="ADA Group Logo"
              width={64}
              height={64}
              priority
              className="h-full w-full object-contain"
            />
          </div>
        </div>

        {/* Brand Text */}
        <div className="mt-6 flex flex-col items-center gap-2">
          <span className="text-xl sm:text-2xl font-bold tracking-widest text-slate-900 uppercase">
            {text}
          </span>
          
          {/* Loading Indicator */}
          <div className="flex items-center gap-2">
            <span className="h-2 w-2 rounded-full bg-blue-600 animate-bounce [animation-delay:-0.3s]" />
            <span className="h-2 w-2 rounded-full bg-blue-600 animate-bounce [animation-delay:-0.15s]" />
            <span className="h-2 w-2 rounded-full bg-blue-600 animate-bounce" />
          </div>
        </div>
      </div>
    </div>
  );
}
