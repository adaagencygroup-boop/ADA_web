"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import Image from "next/image";
import Navbar from "./Navbar";

function ArrowRightIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
      className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5"
      aria-hidden="true"
    >
      <path d="M5 12h14" />
      <path d="m13 6 6 6-6 6" />
    </svg>
  );
}

function MenuIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
      className="h-5 w-5"
      aria-hidden="true"
    >
      <path d="M4 6h16" />
      <path d="M4 12h16" />
      <path d="M4 18h16" />
    </svg>
  );
}

function CloseIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
      className="h-5 w-5"
      aria-hidden="true"
    >
      <path d="M18 6 6 18" />
      <path d="m6 6 12 12" />
    </svg>
  );
}

export default function Header() {
  const pathname = usePathname();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  // Keeps the overlay mounted for the duration of the exit transition.
  const [isMenuRendered, setIsMenuRendered] = useState(false);
  // Tracks scroll position so the header can pick up a subtle elevation
  // once the page is no longer at the very top (no layout/color change,
  // just a border/shadow transition).
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    document.body.style.overflow = isMobileMenuOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [isMobileMenuOpen]);

  useEffect(() => {
    if (isMobileMenuOpen) {
      setIsMenuRendered(true);
      return;
    }
    if (!isMenuRendered) return;
    const timeout = setTimeout(() => setIsMenuRendered(false), 300);
    return () => clearTimeout(timeout);
  }, [isMobileMenuOpen, isMenuRendered]);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 8);
    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const openMobileMenu = () => {
    setIsMenuRendered(true);
    // Mount first, then flip the open state on the next frame so the
    // enter transition actually has a "from" state to animate from.
    requestAnimationFrame(() => requestAnimationFrame(() => setIsMobileMenuOpen(true)));
  };

  return (
    <header
      className={`sticky top-0 z-50 border-b bg-[#ffffff] transition-shadow duration-300 ${
        isScrolled ? "border-zinc-200 shadow-md" : "border-transparent shadow-none"
      }`}
    >
      <div className="mx-auto flex h-16 max-w-360 items-center justify-between px-4 sm:px-6 lg:h-20 lg:px-8">
        <Link href="/" className="group flex items-center gap-2">
          <Image
            src="/images/logo/logo.png"
            alt="ADA Group Logo"
            width={40}
            height={40}
            className="h-8 w-auto object-contain transition-transform duration-300 ease-out group-hover:scale-105"
          />
          <span className="text-lg font-bold tracking-tight text-zinc-900 transition-colors duration-300 lg:text-xl">
            ADA Group
          </span>
        </Link>

        <Navbar
          pathname={pathname}
          className="hidden items-center gap-8 lg:flex"
        />

        <div className="flex items-center gap-2">
          <Link
            href="/lien-he"
            className="group inline-flex items-center gap-1.5 rounded-full bg-blue-950 px-4 py-2 text-sm font-medium text-white transition-all duration-300 ease-out hover:-translate-y-0.5 hover:bg-blue-900 hover:shadow-lg hover:shadow-blue-950/20 active:translate-y-0 active:scale-95 lg:px-5 lg:py-2.5"
          >
            Liên hệ
            <ArrowRightIcon />
          </Link>
          <button
            type="button"
            onClick={openMobileMenu}
            className="relative inline-flex h-9 w-9 items-center justify-center overflow-hidden rounded-lg bg-zinc-100 text-zinc-700 transition-colors duration-300 hover:bg-zinc-200 active:scale-90 lg:hidden"
            aria-label="Mở menu"
            aria-expanded={isMobileMenuOpen}
          >
            <MenuIcon />
          </button>
        </div>
      </div>

      {isMenuRendered && (
        <div
          className={`fixed inset-0 z-50 flex flex-col bg-[#f9fafc] transition-opacity duration-300 ease-out lg:hidden ${
            isMobileMenuOpen ? "opacity-100" : "opacity-0"
          }`}
        >
          <div className="flex items-center justify-between border-b border-zinc-200 px-4 py-4">
            <div className="flex items-center gap-2">
              <Image src="/images/logo/logonobg.png" alt="ADA Group Logo" width={40} height={40} className="h-8 w-auto object-contain" />
              <span className="text-lg font-bold text-zinc-900">ADA Group</span>
            </div>
            <button
              type="button"
              onClick={() => setIsMobileMenuOpen(false)}
              className="inline-flex h-9 w-9 items-center justify-center rounded-lg border border-zinc-200 text-zinc-900 transition-all duration-300 hover:rotate-90 hover:bg-zinc-50 active:scale-90"
              aria-label="Đóng menu"
            >
              <CloseIcon />
            </button>
          </div>

          <div
            className={`flex flex-1 flex-col transition-all duration-300 ease-out ${
              isMobileMenuOpen ? "translate-y-0 opacity-100" : "-translate-y-2 opacity-0"
            }`}
          >
            <Navbar
              pathname={pathname}
              orientation="vertical"
              onNavigate={() => setIsMobileMenuOpen(false)}
              className="flex flex-1 flex-col gap-6 px-4 py-6"
            />

            <div className="border-t border-zinc-200 px-4 py-4">
              <Link
                href="/lien-he"
                onClick={() => setIsMobileMenuOpen(false)}
                className="flex w-full items-center justify-center gap-1.5 rounded-full bg-blue-950 px-5 py-3 text-sm font-medium text-white transition-all duration-300 hover:bg-blue-900 active:scale-95"
              >
                Liên hệ
                <ArrowRightIcon />
              </Link>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
