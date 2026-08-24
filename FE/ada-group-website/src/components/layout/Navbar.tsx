"use client";

import Link from "next/link";

export const NAV_LINKS = [
  { label: "Trang chủ", href: "/" },
  { label: "Giới thiệu", href: "/gioi-thieu" },
  { label: "Dịch vụ", href: "/dich-vu" },
  { label: "Lĩnh vực", href: "/linh-vuc" },
  { label: "Tin tức", href: "/tin-tuc" },
  { label: "Tuyển dụng", href: "/tuyen-dung" },
];

type NavbarProps = {
  pathname: string;
  orientation?: "horizontal" | "vertical";
  className?: string;
  onNavigate?: () => void;
};

export default function Navbar({
  pathname,
  orientation = "horizontal",
  className = "",
  onNavigate,
}: NavbarProps) {
  const isVertical = orientation === "vertical";

  return (
    <nav className={className}>
      {NAV_LINKS.map((link) => {
        const isActive =
          link.href === "/" ? pathname === "/" : pathname.startsWith(link.href);

        return (
          <Link
            key={link.href}
            href={link.href}
            onClick={onNavigate}
            className={`font-medium transition-colors ${
              isVertical ? "block text-base" : "text-sm"
            } ${
              isActive
                ? "text-blue-700 underline decoration-2 underline-offset-8"
                : "text-zinc-600 hover:text-zinc-900"
            }`}
          >
            {link.label}
          </Link>
        );
      })}
    </nav>
  );
}
