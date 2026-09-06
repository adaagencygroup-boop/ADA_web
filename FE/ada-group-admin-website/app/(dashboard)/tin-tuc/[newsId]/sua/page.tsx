import { notFound } from "next/navigation";
import { getNewsArticle } from "@/app/(dashboard)/tin-tuc/_components/data";
import NewsForm from "@/app/(dashboard)/tin-tuc/_components/news-form/NewsForm";

export default async function EditNewsPage({
  params,
}: {
  params: Promise<{ newsId: string }>;
}) {
  const { newsId } = await params;
  const id = Number(newsId);
  const article = Number.isFinite(id) ? getNewsArticle(id) : null;

  if (!article) notFound();

  return <NewsForm mode="edit" newsId={id} />;
}
