"use client";

import { useEffect, useRef, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { ALL_CATEGORY, buildNewsHref } from "@/src/lib/api/news";

function ArrowUpDownIcon({ className = "w-4 h-4" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden="true"
    >
      <path d="m3 16 4 4 4-4" />
      <path d="M7 20V4" />
      <path d="m21 8-4-4-4 4" />
      <path d="M17 4v16" />
    </svg>
  );
}

function ChevronDownIcon({ className = "w-4 h-4" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden="true"
    >
      <path d="m6 9 6 6 6-6" />
    </svg>
  );
}

function CheckIcon({ className = "w-4 h-4" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden="true"
    >
      <polyline points="20 6 9 17 4 12" />
    </svg>
  );
}

const SORT_OPTIONS = [
  { key: "desc", label: "Mới nhất" },
  { key: "asc", label: "Cũ nhất" },
];

export default function NewsSortSelect({
  currentSort = "desc",
  activeCategory = ALL_CATEGORY,
  search,
  isFeatured,
}: {
  currentSort?: string;
  activeCategory?: string;
  search?: string;
  isFeatured?: string | boolean;
}) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const selectedSort = searchParams.get("sort") || currentSort || "desc";
  const currentItem =
    SORT_OPTIONS.find((item) => item.key === selectedSort) ?? SORT_OPTIONS[0];

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        containerRef.current &&
        !containerRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  function handleSelect(nextSort: string) {
    setIsOpen(false);
    const href = buildNewsHref(
      activeCategory,
      1,
      search,
      isFeatured,
      nextSort
    );
    router.push(href);
  }

  return (
    <div ref={containerRef} className="relative w-36">
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="cursor-pointer flex h-10 w-full items-center justify-between gap-2 rounded-xl border border-zinc-200 bg-zinc-50/60 px-3.5 text-left text-sm font-medium text-zinc-900 transition-all hover:border-blue-500 hover:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500/20 shadow-2xs"
      >
        <div className="flex items-center gap-2 truncate">
          <ArrowUpDownIcon className="w-4 h-4 shrink-0 text-blue-600" />
          <span className="truncate">{currentItem.label}</span>
        </div>
        <ChevronDownIcon
          className={`w-4 h-4 shrink-0 text-zinc-500 transition-transform duration-200 ${
            isOpen ? "rotate-180" : ""
          }`}
        />
      </button>

      {isOpen && (
        <div className="absolute left-0 right-0 top-full z-30 mt-1.5 w-full overflow-hidden rounded-xl border border-zinc-100 bg-white p-1.5 shadow-xl ring-1 ring-black/5">
          {SORT_OPTIONS.map((item) => {
            const isSelected = selectedSort === item.key;
            return (
              <button
                key={item.key}
                type="button"
                onClick={() => handleSelect(item.key)}
                className={`cursor-pointer flex w-full items-center justify-between rounded-lg px-2.5 py-2 text-left text-sm font-medium transition-colors ${
                  isSelected
                    ? "bg-blue-50 text-blue-600 font-semibold"
                    : "text-zinc-700 hover:bg-zinc-50 hover:text-zinc-900"
                }`}
              >
                <span className="truncate">{item.label}</span>
                {isSelected && (
                  <CheckIcon className="w-4 h-4 shrink-0 text-blue-600" />
                )}
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
}
