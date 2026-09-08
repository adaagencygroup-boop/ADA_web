"use client";

import { use } from "react";
import { useNewsById } from "@/src/hooks/useNews";
import ArticleDetailView from "@/app/(dashboard)/tin-tuc/[newsId]/_components/ArticleDetailView";

export default function NewsDetailPage({
  params,
}: {
  params: Promise<{ newsId: string }>;
}) {
  const { newsId } = use(params);
  const { data: article, isLoading, isError } = useNewsById(newsId);

  if (isLoading) {
    return (
      <div className="flex flex-1 items-center justify-center py-20 text-sm text-[#64748B]">
        Đang tải bài viết...
      </div>
    );
  }

  if (isError || !article) {
    return (
      <div className="flex flex-1 items-center justify-center py-20 text-sm text-red-600">
        Không thể tải bài viết. Vui lòng thử lại.
      </div>
    );
  }

  return <ArticleDetailView article={article} />;
}
