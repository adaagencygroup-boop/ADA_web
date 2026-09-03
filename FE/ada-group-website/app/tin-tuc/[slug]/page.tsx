import type { Metadata } from "next";
import { notFound } from "next/navigation";
import {
  getArticleBySlug,
  getFeaturedArticles,
  getRelatedArticles,
} from "@/src/lib/api/news";
import Breadcrumb from "@/app/tin-tuc/_components/Breadcrumb";
import FeaturedPosts from "@/app/tin-tuc/_components/FeaturedPosts";
import SearchBar from "@/app/tin-tuc/_components/SearchBar";
import AISolutionBanner from "@/app/tin-tuc/[slug]/_components/AISolutionBanner";
import ArticleDetail from "@/app/tin-tuc/[slug]/_components/ArticleDetail";
import CallToAction from "@/app/tin-tuc/[slug]/_components/CallToAction";
import RelatedArticles from "@/app/tin-tuc/[slug]/_components/RelatedArticles";

type ArticlePageProps = {
  params: Promise<{ slug: string }>;
};

export async function generateMetadata({
  params,
}: ArticlePageProps): Promise<Metadata> {
  const { slug } = await params;
  const article = await getArticleBySlug(slug);

  if (!article) return { title: "Tin tức | ADA Group" };

  return {
    title: `${article.title} | ADA Group`,
    description: article.excerpt,
  };
}

export default async function ArticlePage({ params }: ArticlePageProps) {
  const { slug } = await params;
  const article = await getArticleBySlug(slug);

  if (!article) notFound();

  const [featuredPosts, relatedArticles] = await Promise.all([
    getFeaturedArticles(),
    getRelatedArticles(article),
  ]);

  return (
    <>
      <div className="hidden sm:block">
        <SearchBar />
      </div>
      <Breadcrumb current={article.title} />

      <section className="section-y pt-2! bg-white">
        <div className="mx-auto max-w-360 px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col gap-8 lg:flex-row lg:items-start lg:gap-8">
            <div className="flex min-w-0 flex-1 flex-col items-start gap-8">
              <ArticleDetail article={article} />
              <RelatedArticles articles={relatedArticles} />
            </div>

            <aside className="hidden w-full flex-col gap-8 lg:flex lg:w-105 lg:shrink-0">
              <FeaturedPosts posts={featuredPosts} />
              <AISolutionBanner />
            </aside>
          </div>
        </div>
      </section>

      <CallToAction />
    </>
  );
}
