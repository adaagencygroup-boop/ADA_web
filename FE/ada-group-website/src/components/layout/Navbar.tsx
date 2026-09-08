"use client";

import Link from "next/link";
import { useState } from "react";

export const NAV_LINKS = [
  { label: "Trang chủ", href: "/" },
  { label: "Giới thiệu", href: "/gioi-thieu" },
  {
    label: "Dịch vụ",
    href: "/dich-vu",
    subLinks: [
      { label: "Web Application", href: "/dich-vu/web" },
      { label: "Mobile Application", href: "/dich-vu/mobile" },
      { label: "Hệ thống doanh nghiệp", href: "/dich-vu/he-thong-doanh-nghiep" },
      { label: "AI & Automation", href: "/dich-vu/ai-automation" },
    ],
  },
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
  const [openMobileMenu, setOpenMobileMenu] = useState<string | null>("Dịch vụ");

  const toggleMobileMenu = (label: string, e: React.MouseEvent) => {
    e.preventDefault();
    setOpenMobileMenu((prev) => (prev === label ? null : label));
  };

  return (
    <nav className={className}>
      {NAV_LINKS.map((link) => {
        const isActive =
          link.href === "/" ? pathname === "/" : pathname.startsWith(link.href);
        const isMobileSubOpen = openMobileMenu === link.label;

        return (
          <div key={link.href} className={`relative group ${!isVertical ? "flex lg:h-20 items-center" : ""}`}>
            <div className={`flex items-center justify-between ${isVertical ? "w-full" : ""}`}>
              <Link
                href={link.href}
                onClick={(e) => {
                  if (link.subLinks && isVertical) {
                    toggleMobileMenu(link.label, e);
                  } else if (onNavigate) {
                    onNavigate();
                  }
                }}
                className={`relative font-medium transition-colors duration-300 inline-flex items-center gap-1 ${
                  isVertical ? "block text-base flex-1 py-2" : "text-sm py-2"
                } ${
                  isActive
                    ? "text-blue-700"
                    : "text-zinc-600 hover:text-blue-700"
                }`}
              >
                {link.label}
                {link.subLinks && !isVertical && (
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className="h-4 w-4 opacity-50 transition-transform duration-300 group-hover:rotate-180">
                    <polyline points="6 9 12 15 18 9" />
                  </svg>
                )}
                {!isVertical && (
                  <span
                    className={`pointer-events-none absolute -bottom-0.5 left-0 h-0.5 bg-blue-700 transition-all duration-300 ease-out ${
                      isActive ? "w-full" : "w-0 group-hover:w-full"
                    }`}
                  />
                )}
              </Link>

              {/* Mobile Chevron Toggle */}
              {link.subLinks && isVertical && (
                <button
                  onClick={(e) => toggleMobileMenu(link.label, e)}
                  className="rounded-full p-2 text-zinc-500 transition-colors duration-300 hover:bg-zinc-100 hover:text-zinc-900 active:scale-90"
                >
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className={`h-4 w-4 transition-transform duration-300 ${isMobileSubOpen ? "rotate-180" : ""}`}>
                    <polyline points="6 9 12 15 18 9" />
                  </svg>
                </button>
              )}
            </div>

            {link.subLinks && !isVertical && (
              <div
                className="pointer-events-none absolute left-0 top-full z-50 min-w-64 origin-top pt-0.4 opacity-0 translate-y-2 scale-[0.98] transition-all duration-300 ease-out group-hover:pointer-events-auto group-hover:opacity-100 group-hover:translate-y-0 group-hover:scale-100"
              >
                <div className="relative flex flex-col gap-1 rounded-2xl border border-zinc-100 bg-white p-2.5 shadow-xl before:absolute before:-top-2 before:left-6 before:h-4 before:w-4 before:rotate-45 before:border-l before:border-t before:border-zinc-100 before:bg-white before:content-['']">
                  {link.subLinks.map((sub) => (
                    <Link
                      key={sub.href}
                      href={sub.href}
                      className={`rounded-xl px-4 py-2.5 text-sm font-medium transition-colors duration-300 hover:bg-slate-50 ${
                        pathname === sub.href ? "bg-blue-50/50 text-blue-600" : "text-zinc-600 hover:text-blue-600"
                      }`}
                    >
                      {sub.label}
                    </Link>
                  ))}
                </div>
              </div>
            )}

            {link.subLinks && isVertical && (
              <div
                className={`grid transition-all duration-300 ease-out ${
                  isMobileSubOpen ? "mb-4 mt-2 grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
                }`}
              >
                <div className="flex flex-col gap-4 overflow-hidden border-l-2 border-zinc-100 pl-4">
                  {link.subLinks.map((sub) => (
                    <Link
                      key={sub.href}
                      href={sub.href}
                      onClick={onNavigate}
                      className={`text-[15px] font-medium transition-colors duration-300 ${
                        pathname === sub.href ? "text-blue-600" : "text-zinc-500 hover:text-zinc-900"
                      }`}
                    >
                      {sub.label}
                    </Link>
                  ))}
                </div>
              </div>
            )}
          </div>
        );
      })}
    </nav>
  );
}