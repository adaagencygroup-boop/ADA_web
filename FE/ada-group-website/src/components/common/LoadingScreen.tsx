"use client";

import Image from "next/image";
import { Suspense, useEffect, useRef, useState } from "react";
import { usePathname, useSearchParams } from "next/navigation";

// Nhóm 1: Các trang tĩnh / giới thiệu / dịch vụ / điều khoản -> load đúng 0.3s
const STATIC_ROUTES = [
  "/",
  "/gioi-thieu",
  "/dich-vu/web",
  "/dich-vu/mobile",
  "/dich-vu/he-thong-doanh-nghiep",
  "/dich-vu/ai-automation",
  "/linh-vuc",
  "/dieu-khoan-su-dung",
  "/chinh-sach-bao-mat",
];

// Nhóm 2: Các trang cần dữ liệu backend -> load tối thiểu 0.3s và chờ backend trả về xong
const DYNAMIC_ROUTES = [
  "/tin-tuc",
  "/tuyen-dung",
  "/lien-he",
];

function isStaticRoute(path: string | null): boolean {
  if (!path) return false;
  const cleanPath = path.split("?")[0].replace(/\/$/, "") || "/";
  if (cleanPath === "/") return true;
  return STATIC_ROUTES.filter((r) => r !== "/").some(
    (route) => cleanPath === route || cleanPath.startsWith(`${route}/`)
  );
}

function isDynamicRoute(path: string | null): boolean {
  if (!path) return false;
  const cleanPath = path.split("?")[0].replace(/\/$/, "") || "/";
  return DYNAMIC_ROUTES.some(
    (route) => cleanPath === route || cleanPath.startsWith(`${route}/`)
  );
}

function shouldShowLoader(path: string | null): boolean {
  return isStaticRoute(path) || isDynamicRoute(path);
}

type LoadingScreenProps = {
  fullScreen?: boolean;
  text?: string;
  className?: string;
  forceShow?: boolean;
};

function LoadingScreenContent({
  fullScreen = true,
  text = "ADA GROUP",
  className = "",
  forceShow,
}: LoadingScreenProps) {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [isLoading, setIsLoading] = useState(() => forceShow ?? shouldShowLoader(pathname));
  const [isFadingOut, setIsFadingOut] = useState(false);

  useEffect(() => {
    if (forceShow) {
      setIsLoading(true);
      setIsFadingOut(false);
      return;
    }

    if (!shouldShowLoader(pathname)) {
      setIsLoading(false);
      setIsFadingOut(false);
      return;
    }

    // Hiển thị loading ngay khi vào trang hoặc chuyển trang
    setIsLoading(true);
    setIsFadingOut(false);

    // Đảm bảo hiển thị đúng 0.3s (300ms)
    const fadeTimer = setTimeout(() => {
      setIsFadingOut(true);
    }, 300);

    // Hoàn tất ẩn sau hiệu ứng mờ dần (200ms)
    const finishTimer = setTimeout(() => {
      setIsLoading(false);
      setIsFadingOut(false);
    }, 500);

    return () => {
      clearTimeout(fadeTimer);
      clearTimeout(finishTimer);
    };
  }, [pathname, searchParams, forceShow]);

  // Bắt sự kiện click link chuyển trang thực sự (bỏ qua click mở dropdown Dịch vụ)
  useEffect(() => {
    if (forceShow) return;

    const handleLinkClick = (e: MouseEvent) => {
      if (e.defaultPrevented) return;

      const target = (e.target as HTMLElement).closest("a");
      if (!target) return;

      const href = target.getAttribute("href");
      if (
        href &&
        href.startsWith("/") &&
        !href.startsWith("//") &&
        !href.includes("#") &&
        href !== "/dich-vu"
      ) {
        const cleanHref = href.split("?")[0].replace(/\/$/, "") || "/";
        if (shouldShowLoader(cleanHref)) {
          setIsLoading(true);
          setIsFadingOut(false);
        }
      }
    };

    document.addEventListener("click", handleLinkClick, false);
    return () => {
      document.removeEventListener("click", handleLinkClick, false);
    };
  }, [pathname, forceShow]);

  if (!isLoading) return null;

  return (
    <div
      className={`${
        fullScreen
          ? "fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-white/95 backdrop-blur-md"
          : "flex flex-col items-center justify-center p-8"
      } transition-opacity duration-200 ease-out ${
        isFadingOut ? "opacity-0 pointer-events-none" : "opacity-100"
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

export default function LoadingScreen(props: LoadingScreenProps) {
  return (
    <Suspense fallback={null}>
      <LoadingScreenContent {...props} />
    </Suspense>
  );
}


