"use client";

import { useEffect, useRef, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { ALL_CATEGORY, buildNewsHref } from "@/src/lib/api/news";
import type { NewsCategory } from "@/src/types/news";

function FolderIcon({ className = "w-4 h-4" }: { className?: string }) {
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
      <path d="M4 20h16a2 2 0 0 0 2-2V8a2 2 0 0 0-2-2h-7.93a2 2 0 0 1-1.66-.9l-.82-1.2A2 2 0 0 0 7.93 3H4a2 2 0 0 0-2 2v13c0 1.1.9 2 2 2Z" />
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

export default function NewsCategories({
  categories,
  activeCategory,
  search,
  isFeatured,
}: {
  categories: NewsCategory[];
  activeCategory: string;
  search?: string;
  isFeatured?: string | boolean;
}) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const sort = searchParams?.get("sort") || undefined;
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const items: { key: string; label: string }[] = [
    { key: ALL_CATEGORY, label: ALL_CATEGORY },
    ...categories.map((category) => ({ key: category.name, label: category.name })),
  ];

  const currentItem = items.find((item) => item.key === activeCategory) ?? items[0];

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  function handleSelect(key: string) {
    setIsOpen(false);
    const href = buildNewsHref(key, 1, search, isFeatured, sort);
    router.push(href);
  }

  const isChecked = isFeatured === true || isFeatured === "true";

  return (
    <div className="rounded-2xl border border-[#F3F4F6] bg-white p-4 sm:p-5 lg:p-6 shadow-sm">
      <h2 className="mb-2.5 text-base font-semibold text-[#111827] lg:text-lg">
        Danh mục tin tức
      </h2>

      <div ref={containerRef} className="relative w-full">
        <button
          type="button"
          onClick={() => setIsOpen(!isOpen)}
          className="cursor-pointer flex h-11 w-full items-center justify-between rounded-xl border border-zinc-200 bg-zinc-50/60 px-4 text-left text-sm font-medium text-zinc-900 transition-all hover:border-blue-500 hover:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500/20"
        >
          <div className="flex items-center gap-2.5 truncate">
            <FolderIcon className="w-4 h-4 shrink-0 text-blue-600" />
            <span className="truncate">{currentItem.label}</span>
          </div>
          <ChevronDownIcon
            className={`w-4 h-4 shrink-0 text-zinc-500 transition-transform duration-200 ${
              isOpen ? "rotate-180" : ""
            }`}
          />
        </button>

        {isOpen && (
          <div className="absolute left-0 right-0 top-full z-30 mt-2 max-h-60 overflow-y-auto rounded-xl border border-zinc-100 bg-white p-1.5 shadow-xl ring-1 ring-black/5">
            {items.map((item) => {
              const isSelected = activeCategory === item.key;
              return (
                <button
                  key={item.key}
                  type="button"
                  onClick={() => handleSelect(item.key)}
                  className={`cursor-pointer flex w-full items-center justify-between rounded-lg px-3.5 py-2.5 text-left text-sm font-medium transition-colors ${
                    isSelected
                      ? "bg-blue-50 text-blue-600 font-semibold"
                      : "text-zinc-700 hover:bg-zinc-50 hover:text-zinc-900"
                  }`}
                >
                  <span className="truncate">{item.label}</span>
                  {isSelected && <CheckIcon className="w-4 h-4 shrink-0 text-blue-600" />}
                </button>
              );
            })}
          </div>
        )}
      </div>

      <div className="mt-3.5 border-t border-zinc-100 pt-3">
        <label className="group flex cursor-pointer items-center gap-2.5 text-sm font-medium text-zinc-700 select-none transition-colors hover:text-blue-600">
          <input
            type="checkbox"
            checked={isChecked}
            onChange={(e) => {
              const href = buildNewsHref(activeCategory, 1, search, e.target.checked, sort);
              router.push(href);
            }}
            className="h-4 w-4 cursor-pointer rounded border-zinc-300 accent-blue-600 text-blue-600 focus:ring-blue-500/20"
          />
          <span>Tin nổi bật</span>
        </label>
      </div>
    </div>
  );
}
