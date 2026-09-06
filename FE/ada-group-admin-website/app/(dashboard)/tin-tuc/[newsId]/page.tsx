import { notFound } from "next/navigation";
import { getArticleDetail } from "@/app/(dashboard)/tin-tuc/[newsId]/_components/data";
import ArticleDetailView from "@/app/(dashboard)/tin-tuc/[newsId]/_components/ArticleDetailView";

export default async function NewsDetailPage({
  params,
}: {
  params: Promise<{ newsId: string }>;
}) {
  const { newsId } = await params;
  const id = Number(newsId);
  const article = Number.isFinite(id) ? getArticleDetail(id) : null;

  if (!article) notFound();

  return <ArticleDetailView article={article} />;
}
