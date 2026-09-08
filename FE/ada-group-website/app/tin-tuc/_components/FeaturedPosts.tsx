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

export default function FeaturedPosts({ posts }: { posts: NewsArticle[] }) {
  return (
    <div className="rounded-2xl bg-white p-6 shadow-[0_1px_2px_rgba(0,0,0,0.3)]">
      <h2 className="border-b border-gray-100 pb-2 text-lg font-semibold text-[#111827]">
        Bài viết nổi bật
      </h2>
      <ul className="mt-4 flex flex-col gap-4">
        {posts.map((post) => (
          <li key={post.slug}>
            <Link href={`/tin-tuc/${post.slug}`} className="flex items-start gap-4">
              <div className="relative h-20 w-20 shrink-0 overflow-hidden rounded-md">
                <Image
                  src={post.imageUrl}
                  alt={post.title}
                  fill
                  sizes="80px"
                  className="object-cover"
                />
              </div>
              <div className="flex flex-col justify-center gap-1">
                <h3 className="line-clamp-2 text-sm font-semibold text-[#1F2937]">
                  {post.title}
                </h3>
                <div className="flex items-center gap-1.5 text-xs text-[#9CA3AF]">
                  <CalendarIcon className="h-3 w-3" />
                  {post.date}
                </div>
              </div>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
