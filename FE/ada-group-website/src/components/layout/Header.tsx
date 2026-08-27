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
      className="h-4 w-4"
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

  useEffect(() => {
    document.body.style.overflow = isMobileMenuOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [isMobileMenuOpen]);

  return (
    <header className="sticky top-0 z-50 border-b border-zinc-200 bg-[#f9fafc]">
      <div className="mx-auto flex h-16 max-w-360 items-center justify-between px-4 sm:px-6 lg:h-20 lg:px-8">
        <Link href="/" className="flex items-center gap-2">
          <Image src="/images/logo/logo.png" alt="ADA Group Logo" width={40} height={40} className="h-8 w-auto object-contain" />
          <span className="text-lg font-bold tracking-tight text-zinc-900 lg:text-xl">
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
            className="inline-flex items-center gap-1.5 rounded-full bg-blue-950 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-blue-900 lg:px-5 lg:py-2.5"
          >
            Liên hệ
            <ArrowRightIcon />
          </Link>
          <button
            type="button"
            onClick={() => setIsMobileMenuOpen(true)}
            className="inline-flex h-9 w-9 items-center justify-center rounded-lg bg-zinc-100 text-zinc-700 transition-colors hover:bg-zinc-200 lg:hidden"
            aria-label="Mở menu"
            aria-expanded={isMobileMenuOpen}
          >
            <MenuIcon />
          </button>
        </div>
      </div>

      {isMobileMenuOpen && (
        <div className="fixed inset-0 z-50 flex flex-col bg-[#f9fafc] lg:hidden">
          <div className="flex items-center justify-between border-b border-zinc-200 px-4 py-4">
            <div className="flex items-center gap-2">
              <Image src="/images/logo/logonobg.png" alt="ADA Group Logo" width={40} height={40} className="h-8 w-auto object-contain" />
              <span className="text-lg font-bold text-zinc-900">ADA Group</span>
            </div>
            <button
              type="button"
              onClick={() => setIsMobileMenuOpen(false)}
              className="inline-flex h-9 w-9 items-center justify-center rounded-lg border border-zinc-200 text-zinc-900 transition-colors hover:bg-zinc-50"
              aria-label="Đóng menu"
            >
              <CloseIcon />
            </button>
          </div>

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
              className="flex w-full items-center justify-center gap-1.5 rounded-full bg-blue-950 px-5 py-3 text-sm font-medium text-white transition-colors hover:bg-blue-900"
            >
              Liên hệ
              <ArrowRightIcon />
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
