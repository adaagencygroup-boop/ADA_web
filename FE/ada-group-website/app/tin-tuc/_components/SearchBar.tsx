"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { ALL_CATEGORY, buildNewsHref } from "@/src/lib/api/news";
import type { NewsCategory } from "@/src/types/news";
import NewsCategories from "@/app/tin-tuc/_components/NewsCategories";

type IconProps = { className?: string };

function SearchIcon({ className = "h-4 w-4" }: IconProps) {
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
      <circle cx="11" cy="11" r="8" />
      <path d="m21 21-4.3-4.3" />
    </svg>
  );
}

function RotateCcwIcon({ className = "h-4 w-4" }: IconProps) {
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
      <path d="M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8" />
      <path d="M3 3v5h5" />
    </svg>
  );
}

export default function SearchBar({
  category,
  search,
  categories = [],
  activeCategory,
  isFeatured,
}: {
  category?: string;
  search?: string;
  categories?: NewsCategory[];
  activeCategory?: string;
  isFeatured?: string;
}) {
  const router = useRouter();
  const [keyword, setKeyword] = useState(search ?? "");

  useEffect(() => {
    setKeyword(search ?? "");
  }, [search]);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    router.push(buildNewsHref(category ?? ALL_CATEGORY, 1, keyword.trim() || undefined, isFeatured));
  }

  function handleReset() {
    setKeyword("");
    router.push(buildNewsHref(ALL_CATEGORY, 1, undefined, undefined));
  }

  const currentCategory = activeCategory ?? category ?? ALL_CATEGORY;

  return (
    <section className="section-y py-3!">
      <div className="mx-auto flex max-w-360 flex-col gap-3 px-4 sm:px-6 lg:px-8">
        <form onSubmit={handleSubmit} className="flex flex-col gap-2">
          <div className="flex flex-row items-stretch gap-2">
            <div className="flex flex-1 items-stretch overflow-hidden rounded-md bg-white shadow-[0_1px_2px_rgba(0,0,0,0.1)]">
              <input
                type="text"
                value={keyword}
                onChange={(e) => setKeyword(e.target.value)}
                placeholder="Tìm kiếm tin tức..."
                className="flex-1 px-4 py-3 text-base text-zinc-900 placeholder:text-gray-500 focus:outline-none"
              />
              <button
                type="submit"
                aria-label="Tìm kiếm"
                title="Tìm kiếm"
                className="cursor-pointer flex w-12 items-center justify-center bg-[#1961E6] text-white transition-colors hover:bg-blue-700"
              >
                <SearchIcon className="h-4 w-4" />
              </button>
            </div>

            <button
              type="button"
              onClick={handleReset}
              title="Đặt lại bộ lọc"
              className="cursor-pointer flex shrink-0 items-center justify-center rounded-md bg-white px-3 text-zinc-500 shadow-[0_1px_2px_rgba(0,0,0,0.1)] transition-colors hover:bg-zinc-50 hover:text-blue-600"
            >
              <RotateCcwIcon className="h-4 w-4" />
            </button>
          </div>
        </form>

        {/* Mobile News Categories Dropdown */}
        {categories.length > 0 && (
          <div className="w-full lg:hidden">
            <NewsCategories
              categories={categories}
              activeCategory={currentCategory}
              search={search}
              isFeatured={isFeatured}
            />
          </div>
        )}
      </div>
    </section>
  );
}
