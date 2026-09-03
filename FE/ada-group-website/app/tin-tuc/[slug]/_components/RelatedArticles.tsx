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

export default function RelatedArticles({
  articles,
}: {
  articles: NewsArticle[];
}) {
  if (articles.length === 0) return null;

  return (
    <section className="flex flex-col items-start gap-4">
      <h2 className="text-xl font-semibold text-[#003274]">Bài viết liên quan</h2>

      <div className="grid w-full grid-cols-1 gap-4 sm:gap-6 sm:grid-cols-3">
        {articles.map((article) => (
          <Link
            key={article.slug}
            href={`/tin-tuc/${article.slug}`}
            className="flex items-start gap-4 overflow-hidden rounded-lg border border-slate-200 bg-white p-3 shadow-[0_1px_2px_rgba(0,0,0,0.05)] transition-shadow hover:shadow-md sm:flex-col sm:items-stretch sm:gap-0 sm:p-0"
          >
            <div className="relative aspect-square w-20 shrink-0 overflow-hidden rounded-md bg-slate-200 sm:aspect-249/135 sm:w-full sm:shrink sm:rounded-none">
              <Image
                src={article.imageUrl}
                alt={article.title}
                fill
                sizes="(min-width: 640px) 33vw, 80px"
                className="object-cover"
              />
            </div>
            <div className="flex min-w-0 flex-1 flex-col items-start gap-2 sm:p-4">
              <h3 className="line-clamp-2 text-sm font-semibold text-[#1E293B]">
                {article.title}
              </h3>
              <span className="flex items-center gap-2 text-xs text-slate-500">
                <CalendarIcon className="h-3 w-3" />
                {article.date}
              </span>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}
