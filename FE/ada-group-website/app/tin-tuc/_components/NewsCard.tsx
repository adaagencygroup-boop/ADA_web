import Image from "next/image";
import Link from "next/link";
import type { NewsArticle } from "@/src/types/news";

function CalendarIcon({ className = "h-3 w-3" }: { className?: string }) {
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
      <rect x="3" y="4" width="18" height="18" rx="2" />
      <path d="M16 2v4M8 2v4M3 10h18" />
    </svg>
  );
}

export default function NewsCard({ article }: { article: NewsArticle }) {
  return (
    <article className="group flex h-[310px] w-full flex-col overflow-hidden rounded-2xl border border-[#F3F4F6] bg-white shadow-sm transition-all hover:border-blue-200 hover:shadow-md sm:h-52 sm:flex-row lg:h-56">
      <Link
        href={`/tin-tuc/${article.slug}`}
        className="relative h-36 w-full shrink-0 overflow-hidden sm:h-full sm:w-60 md:w-64 lg:w-72"
      >
        <Image
          src={article.imageUrl}
          alt={article.title}
          fill
          sizes="(min-width: 1024px) 288px, (min-width: 640px) 256px, 100vw"
          className="object-cover transition-transform duration-300 group-hover:scale-105"
        />
      </Link>
      <div className="flex flex-1 flex-col justify-between p-3.5 sm:p-5 lg:p-6">
        <div className="flex flex-col items-start gap-1 sm:gap-2">
          <span className="text-[11px] font-semibold tracking-[0.5px] text-[#1961E6] uppercase sm:text-xs">
            {article.category}
          </span>
          <h3 className="line-clamp-2 text-base font-semibold leading-snug text-[#111827] sm:text-lg">
            <Link href={`/tin-tuc/${article.slug}`} className="transition-colors hover:text-[#1961E6]">
              {article.title}
            </Link>
          </h3>
          <p className="line-clamp-2 text-xs leading-relaxed text-[#4B5563] sm:text-sm">
            {article.excerpt}
          </p>
        </div>
        <div className="mt-1 flex items-center gap-1.5 text-xs text-[#9CA3AF] sm:mt-2">
          <CalendarIcon className="h-3.5 w-3.5" />
          <span>{article.date}</span>
        </div>
      </div>
    </article>
  );
}
