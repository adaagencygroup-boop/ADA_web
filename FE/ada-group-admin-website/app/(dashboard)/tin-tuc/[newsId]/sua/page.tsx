"use client";

import { use } from "react";
import NewsForm from "@/app/(dashboard)/tin-tuc/_components/news-form/NewsForm";

export default function EditNewsPage({
  params,
}: {
  params: Promise<{ newsId: string }>;
}) {
  const { newsId } = use(params);

  return <NewsForm mode="edit" newsId={newsId} />;
}
