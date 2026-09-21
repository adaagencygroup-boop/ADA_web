"use client";

import { useTransition } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { ALL_CATEGORY, NEWS_LISTING_ANCHOR } from "@/src/lib/api/news";

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

export default function NewsSortSelect({
  currentSort = "desc",
  activeCategory,
  search,
  isFeatured,
}: {
  currentSort?: string;
  activeCategory?: string;
  search?: string;
  isFeatured?: string;
}) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [isPending, startTransition] = useTransition();

  const selectedSort =
    searchParams.get("sort") || currentSort || "desc";

  function handleSortChange(nextSort: string) {
    const params = new URLSearchParams(searchParams.toString());
    if (nextSort === "asc") {
      params.set("sort", "asc");
    } else {
      params.delete("sort");
    }
    // Reset page to 1 on sort change
    params.delete("page");

    if (activeCategory && activeCategory !== ALL_CATEGORY) {
      params.set("category", activeCategory);
    }
    if (search) {
      params.set("search", search);
    }
    if (isFeatured === "true" || isFeatured === "1") {
      params.set("isFeatured", "true");
    }

    const queryString = params.toString();
    const targetUrl = `${pathname}${queryString ? `?${queryString}` : ""}#${NEWS_LISTING_ANCHOR}`;

    startTransition(() => {
      router.push(targetUrl);
      router.refresh();
    });
  }

  return (
    <div className="relative inline-flex items-center gap-2">
      <label htmlFor="news-sort-select" className="sr-only">
        Sắp xếp bài viết
      </label>
      <div className="relative flex items-center">
        <div className="pointer-events-none absolute left-3 flex items-center text-zinc-400">
          <ArrowUpDownIcon className="h-3.5 w-3.5" />
        </div>
        <select
          id="news-sort-select"
          value={selectedSort === "asc" ? "asc" : "desc"}
          onChange={(e) => handleSortChange(e.target.value)}
          disabled={isPending}
          className="h-9.5 appearance-none rounded-lg border border-zinc-200 bg-white pr-8 pl-8.5 text-xs font-medium text-zinc-700 shadow-xs transition-all hover:border-zinc-300 focus:border-[#1961E6] focus:ring-2 focus:ring-[#1961E6]/10 focus:outline-none disabled:opacity-50 sm:text-sm"
        >
          <option value="desc">Mới nhất</option>
          <option value="asc">Cũ nhất</option>
        </select>
        <div className="pointer-events-none absolute right-2.5 flex items-center text-zinc-400">
          <ChevronDownIcon className="h-3.5 w-3.5" />
        </div>
      </div>
    </div>
  );
}
