"use client";

import { useState } from "react";
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

export default function SearchBar({
  category,
  search,
  categories = [],
  activeCategory,
}: {
  category?: string;
  search?: string;
  categories?: NewsCategory[];
  activeCategory?: string;
}) {
  const router = useRouter();
  const [keyword, setKeyword] = useState(search ?? "");

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    router.push(buildNewsHref(category ?? ALL_CATEGORY, 1, keyword.trim() || undefined));
  }

  const currentCategory = activeCategory ?? category ?? ALL_CATEGORY;

  return (
    <section className="section-y py-3!">
      <div className="mx-auto flex max-w-360 flex-col gap-3 px-4 sm:px-6 lg:px-8">
        <form onSubmit={handleSubmit} className="flex flex-col gap-4 sm:flex-row sm:items-stretch">
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
              className="flex w-16 items-center justify-center bg-[#1961E6] text-white transition-colors hover:bg-blue-700"
            >
              <SearchIcon className="h-4 w-4" />
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
            />
          </div>
        )}
      </div>
    </section>
  );
}
