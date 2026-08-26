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
    ]
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
    setOpenMobileMenu(prev => prev === label ? null : label);
  };

  return (
    <nav className={className}>
      {NAV_LINKS.map((link) => {
        const isActive =
          link.href === "/" ? pathname === "/" : pathname.startsWith(link.href);

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
                className={`font-medium transition-colors inline-flex items-center gap-1 ${
                  isVertical ? "block text-base flex-1 py-2" : "text-sm"
                } ${
                  isActive
                    ? "text-blue-700 underline decoration-2 underline-offset-8"
                    : "text-zinc-600 hover:text-zinc-900"
                }`}
              >
                {link.label}
                {link.subLinks && !isVertical && (
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className="h-4 w-4 opacity-50 group-hover:rotate-180 transition-transform">
                    <polyline points="6 9 12 15 18 9" />
                  </svg>
                )}
              </Link>

              {/* Mobile Chevron Toggle */}
              {link.subLinks && isVertical && (
                <button 
                  onClick={(e) => toggleMobileMenu(link.label, e)}
                  className="p-2 text-zinc-500"
                >
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className={`h-4 w-4 transition-transform ${openMobileMenu === link.label ? 'rotate-180' : ''}`}>
                    <polyline points="6 9 12 15 18 9" />
                  </svg>
                </button>
              )}
            </div>

            {/* Desktop Dropdown */}
            {link.subLinks && !isVertical && (
              <div className="absolute left-0 top-full hidden pt-0.4 group-hover:block z-50 min-w-64">
                <div className="bg-[#f9fafc] rounded-2xl shadow-xl border border-zinc-100 p-2.5 flex flex-col gap-1 relative before:absolute before:content-[''] before:-top-2 before:left-6 before:w-4 before:h-4 before:bg-[#f9fafc] before:border-l before:border-t before:border-zinc-100 before:rotate-45">
                  {link.subLinks.map(sub => (
                    <Link 
                      key={sub.href} 
                      href={sub.href} 
                      className={`px-4 py-2.5 hover:bg-slate-50 rounded-xl text-sm font-medium transition-colors ${
                        pathname === sub.href ? 'text-blue-600 bg-blue-50/50' : 'text-zinc-600 hover:text-blue-600'
                      }`}
                    >
                      {sub.label}
                    </Link>
                  ))}
                </div>
              </div>
            )}

            {/* Mobile Sublinks */}
            {link.subLinks && isVertical && openMobileMenu === link.label && (
              <div className="flex flex-col gap-4 pl-4 mt-2 mb-4 border-l-2 border-zinc-100">
                {link.subLinks.map(sub => (
                  <Link 
                    key={sub.href} 
                    href={sub.href} 
                    onClick={onNavigate} 
                    className={`text-[15px] font-medium transition-colors ${
                      pathname === sub.href ? 'text-blue-600' : 'text-zinc-500 hover:text-zinc-900'
                    }`}
                  >
                    {sub.label}
                  </Link>
                ))}
              </div>
            )}
          </div>
        );
      })}
    </nav>
  );
}
