"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import LoadingScreen from "@/src/components/common/LoadingScreen";

const TARGET_ROUTES = [
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

function isTargetRoute(path: string | null): boolean {
  if (!path) return false;
  const cleanPath = path.split("?")[0].replace(/\/$/, "") || "/";
  if (cleanPath === "/") return true;
  return TARGET_ROUTES.filter((r) => r !== "/").some(
    (route) => cleanPath === route || cleanPath.startsWith(`${route}/`)
  );
}

export default function PageLoaderProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  // Khởi tạo mặc định là true ngay từ đầu nếu trang hiện tại thuộc danh sách
  const [isLoading, setIsLoading] = useState(() => isTargetRoute(pathname));
  const [isFadingOut, setIsFadingOut] = useState(false);

  useEffect(() => {
    if (!isTargetRoute(pathname)) {
      setIsLoading(false);
      setIsFadingOut(false);
      return;
    }

    setIsLoading(true);
    setIsFadingOut(false);

    // Mặc định hiển thị loading đúng 0.5s (500ms)
    const fadeTimer = setTimeout(() => {
      setIsFadingOut(true);
    }, 300);

    // Ẩn hoàn toàn sau khi kết thúc hiệu ứng mờ dần (250ms)
    const finishTimer = setTimeout(() => {
      setIsLoading(false);
      setIsFadingOut(false);
    }, 750);

    return () => {
      clearTimeout(fadeTimer);
      clearTimeout(finishTimer);
    };
  }, [pathname]);

  // Bắt sự kiện click link chuyển sang target routes để kích hoạt loading tức thì
  useEffect(() => {
    const handleLinkClick = (e: MouseEvent) => {
      const target = (e.target as HTMLElement).closest("a");
      if (!target) return;

      const href = target.getAttribute("href");
      if (href && href.startsWith("/") && !href.startsWith("//") && !href.includes("#")) {
        const cleanHref = href.split("?")[0];
        if (isTargetRoute(cleanHref) && cleanHref !== pathname) {
          setIsLoading(true);
          setIsFadingOut(false);
        }
      }
    };

    document.addEventListener("click", handleLinkClick, true);
    return () => {
      document.removeEventListener("click", handleLinkClick, true);
    };
  }, [pathname]);

  return (
    <>
      {children}
      {isLoading && (
        <LoadingScreen
          fullScreen
          className={`transition-opacity duration-250 ease-out ${
            isFadingOut ? "opacity-0 pointer-events-none" : "opacity-100"
          }`}
        />
      )}
    </>
  );
}


