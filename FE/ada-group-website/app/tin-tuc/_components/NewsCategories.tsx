import Link from "next/link";
import { ALL_CATEGORY, buildNewsHref } from "@/src/lib/api/news";
import type { NewsCategory } from "@/src/types/news";

export default function NewsCategories({
  categories,
  activeCategory,
  search,
}: {
  categories: NewsCategory[];
  activeCategory: string;
  search?: string;
}) {
  const items: { key: string; label: string }[] = [
    { key: ALL_CATEGORY, label: ALL_CATEGORY },
    ...categories.map((category) => ({ key: category.name, label: category.name })),
  ];

  return (
    <div className="rounded-2xl bg-white p-6 shadow-[0_1px_2px_rgba(0,0,0,0.05)]">
      <h2 className="border-b border-gray-100 pb-2 text-lg font-semibold text-[#111827]">
        Danh mục tin tức
      </h2>
      <ul className="mt-4 flex flex-col gap-1">
        {items.map((item) => (
          <li key={item.key}>
            <Link
              href={buildNewsHref(item.key, 1, search)}
              className={`flex w-full items-center rounded-md px-3 py-2 text-left text-base ${
                activeCategory === item.key
                  ? "bg-[#EFF6FF] font-medium text-[#1961E6]"
                  : "text-[#4B5563] hover:bg-gray-50"
              }`}
            >
              <span>{item.label}</span>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
