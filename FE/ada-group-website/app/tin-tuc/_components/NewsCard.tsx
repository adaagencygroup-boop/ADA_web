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
    <article className="flex w-full flex-col overflow-hidden rounded-2xl bg-white shadow-[0_1px_2px_rgba(0,0,0,0.3)] sm:flex-row">
      <Link
        href={`/tin-tuc/${article.slug}`}
        className="relative h-48 w-full shrink-0 sm:h-auto sm:w-70"
      >
        <Image
          src={article.imageUrl}
          alt={article.title}
          fill
          sizes="(min-width: 640px) 280px, 100vw"
          className="object-cover"
        />
      </Link>
      <div className="flex flex-1 flex-col items-start justify-center gap-2 p-6">
        <span className="text-xs font-semibold tracking-[0.6px] text-[#1961E6] uppercase">
          {article.category}
        </span>
        <h3 className="text-lg leading-snug font-semibold text-[#111827]">
          <Link href={`/tin-tuc/${article.slug}`} className="hover:underline">
            {article.title}
          </Link>
        </h3>
        <p className="line-clamp-2 text-sm leading-5 text-[#4B5563]">
          {article.excerpt}
        </p>
        <div className="flex items-center gap-2 text-xs text-[#9CA3AF]">
          <CalendarIcon className="h-3 w-3" />
          {article.date}
        </div>
      </div>
    </article>
  );
}
