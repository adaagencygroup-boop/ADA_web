import Link from "next/link";
import { buildNewsHref } from "@/src/lib/api/news";
import type { NewsCategoryCount } from "@/src/types/news";

export default function NewsCategories({
  categories,
  activeCategory,
}: {
  categories: NewsCategoryCount[];
  activeCategory: string;
}) {
  return (
    <div className="rounded-2xl bg-white p-6 shadow-[0_1px_2px_rgba(0,0,0,0.05)]">
      <h2 className="border-b border-gray-100 pb-2 text-lg font-semibold text-[#111827]">
        Danh mục tin tức
      </h2>
      <ul className="mt-4 flex flex-col gap-1">
        {categories.map((category) => (
          <li key={category.label}>
            <Link
              href={buildNewsHref(category.label, 1)}
              className={`flex w-full items-center justify-between rounded-md px-3 py-2 text-left text-base ${
                activeCategory === category.label
                  ? "bg-[#EFF6FF] font-medium text-[#1961E6]"
                  : "text-[#4B5563] hover:bg-gray-50"
              }`}
            >
              <span>{category.label}</span>
              <span>{category.count}</span>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
