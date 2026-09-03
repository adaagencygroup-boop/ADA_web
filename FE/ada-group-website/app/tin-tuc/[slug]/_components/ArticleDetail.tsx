import Image from "next/image";
import type { NewsArticle } from "@/src/types/news";

type IconProps = { className?: string };

function CalendarIcon({ className = "h-3.5 w-3.5" }: IconProps) {
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

function EyeIcon({ className = "h-3.5 w-3.5" }: IconProps) {
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
      <path d="M2.5 12S6 5 12 5s9.5 7 9.5 7-3.5 7-9.5 7-9.5-7-9.5-7Z" />
      <circle cx="12" cy="12" r="3" />
    </svg>
  );
}

function FacebookIcon({ className = "h-3.5 w-3.5" }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden="true">
      <path d="M13.5 21v-8h2.7l.4-3.1h-3.1V8c0-.9.25-1.5 1.55-1.5H16.8V3.7C16.5 3.66 15.5 3.57 14.35 3.57c-2.4 0-4.05 1.47-4.05 4.16V9.9H7.6V13h2.7v8h3.2Z" />
    </svg>
  );
}

function LinkedInIcon({ className = "h-3.5 w-3.5" }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden="true">
      <path d="M6.94 5a2 2 0 1 1-4 0 2 2 0 0 1 4 0ZM3.2 8.75h3.5V21H3.2V8.75Zm6.4 0h3.35v1.68h.05c.47-.88 1.6-1.8 3.3-1.8 3.53 0 4.18 2.32 4.18 5.35V21h-3.5v-5.6c0-1.34-.03-3.06-1.87-3.06-1.87 0-2.16 1.46-2.16 2.97V21H9.6V8.75Z" />
    </svg>
  );
}

function LinkIcon({ className = "h-3.5 w-3.5" }: IconProps) {
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
      <path d="M10 13a5 5 0 0 0 7.07 0l2.83-2.83a5 5 0 0 0-7.07-7.07L11.5 4.5" />
      <path d="M14 11a5 5 0 0 0-7.07 0l-2.83 2.83a5 5 0 0 0 7.07 7.07L12.5 19.5" />
    </svg>
  );
}

function formatViews(views: number) {
  return `${views.toLocaleString("vi-VN")} lượt xem`;
}

export default function ArticleDetail({ article }: { article: NewsArticle }) {
  const body = article.body ?? [
    { type: "paragraph" as const, text: article.content },
  ];

  return (
    <article className="flex flex-col items-start gap-4 rounded-xl border border-slate-200 bg-white p-6 shadow-[0_1px_2px_rgba(0,0,0,0.05)] sm:p-8">
      <span className="text-xs font-semibold tracking-[0.6px] text-[#2563EB] uppercase">
        {article.category}
      </span>

      <h1 className="text-2xl leading-tight font-semibold text-black sm:text-4xl sm:leading-10">
        {article.title}
      </h1>

      <div className="flex w-full flex-wrap items-center justify-between gap-4 border-b border-slate-200 pb-6">
        <div className="flex items-center gap-6 text-sm text-slate-500">
          <span className="flex items-center gap-2">
            <CalendarIcon className="h-3.5 w-3.5" />
            {article.date}
          </span>
          {article.views !== undefined && (
            <span className="flex items-center gap-2">
              <EyeIcon className="h-3.5 w-3.5" />
              {formatViews(article.views)}
            </span>
          )}
        </div>

        <div className="flex items-center gap-3">
          <span className="text-sm text-slate-500">Chia sẻ:</span>
          <button
            type="button"
            aria-label="Chia sẻ lên Facebook"
            className="flex h-8 w-8 cursor-pointer items-center justify-center rounded-full bg-slate-100 text-[#003274] transition-colors hover:bg-slate-200"
          >
            <FacebookIcon />
          </button>
          <button
            type="button"
            aria-label="Chia sẻ lên LinkedIn"
            className="flex h-8 w-8 cursor-pointer items-center justify-center rounded-full bg-slate-100 text-[#003274] transition-colors hover:bg-slate-200"
          >
            <LinkedInIcon />
          </button>
          <button
            type="button"
            aria-label="Sao chép liên kết"
            className="flex h-8 w-8 cursor-pointer items-center justify-center rounded-full bg-slate-100 text-[#003274] transition-colors hover:bg-slate-200"
          >
            <LinkIcon />
          </button>
        </div>
      </div>

      <div className="relative aspect-790/430 w-full overflow-hidden rounded-lg">
        <Image
          src={article.imageUrl}
          alt={article.title}
          fill
          sizes="(min-width: 1024px) 790px, 100vw"
          className="object-cover"
        />
      </div>

      <div className="flex w-full flex-col items-start gap-4">
        {body.map((block, index) =>
          block.type === "heading" ? (
            <h3
              key={index}
              className="mt-2 text-lg leading-6.75 font-semibold text-black"
            >
              {block.text}
            </h3>
          ) : (
            <p
              key={index}
              className={`text-base leading-6.75 text-[#334155] ${
                block.emphasis ? "font-semibold" : ""
              }`}
            >
              {block.text}
            </p>
          ),
        )}
      </div>
    </article>
  );
}
