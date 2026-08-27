import Link from "next/link";
import { buildNewsHref, getPaginationItems } from "@/src/lib/api/news";

function ChevronRightIcon({ className = "h-3 w-3" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={2.5}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden="true"
    >
      <path d="m9 18 6-6-6-6" />
    </svg>
  );
}

export default function NewsPagination({
  activeCategory,
  currentPage,
  totalPages,
}: {
  activeCategory: string;
  currentPage: number;
  totalPages: number;
}) {
  if (totalPages <= 1) return null;

  const paginationItems = getPaginationItems(currentPage, totalPages);

  return (
    <nav
      aria-label="Phân trang"
      className="flex items-center overflow-hidden rounded-md shadow-[0_1px_2px_rgba(0,0,0,0.05)]"
    >
      {paginationItems.map((item, index) =>
        item === "ellipsis" ? (
          <span
            key={`ellipsis-${index}`}
            className="-ml-px flex h-9.5 min-w-9.5 items-center justify-center border border-gray-300 bg-white px-3 text-sm font-medium text-gray-700"
          >
            …
          </span>
        ) : (
          <Link
            key={item}
            href={buildNewsHref(activeCategory, item)}
            aria-current={item === currentPage ? "page" : undefined}
            className={`-ml-px flex h-9.5 min-w-9.5 items-center justify-center border px-3 text-sm font-medium first:ml-0 ${
              item === currentPage
                ? "z-10 border-[#1961E6] bg-[#1961E6] text-white"
                : "border-gray-300 bg-white text-gray-500 hover:bg-gray-50"
            }`}
          >
            {item}
          </Link>
        ),
      )}
      {currentPage === totalPages ? (
        <span
          aria-hidden="true"
          aria-label="Trang tiếp theo"
          className="-ml-px flex h-9.5 w-9.5 items-center justify-center rounded-r-md border border-gray-300 bg-white text-gray-300"
        >
          <ChevronRightIcon className="h-3 w-3" />
        </span>
      ) : (
        <Link
          href={buildNewsHref(activeCategory, currentPage + 1)}
          aria-label="Trang tiếp theo"
          className="-ml-px flex h-9.5 w-9.5 items-center justify-center rounded-r-md border border-gray-300 bg-white text-gray-500 hover:bg-gray-50"
        >
          <ChevronRightIcon className="h-3 w-3" />
        </Link>
      )}
    </nav>
  );
}
