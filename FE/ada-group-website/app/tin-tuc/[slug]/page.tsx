import type { Metadata } from "next";
import { notFound } from "next/navigation";
import {
  getArticleBySlug,
  getFeaturedArticles,
  getRelatedArticles,
} from "@/src/lib/api/news";
import Breadcrumb from "@/app/tin-tuc/_components/Breadcrumb";
import CallToAction from "@/app/tin-tuc/_components/CallToAction";
import FeaturedPosts from "@/app/tin-tuc/_components/FeaturedPosts";
import AISolutionBanner from "@/app/tin-tuc/[slug]/_components/AISolutionBanner";
import ArticleDetail from "@/app/tin-tuc/[slug]/_components/ArticleDetail";
import RelatedArticles from "@/app/tin-tuc/[slug]/_components/RelatedArticles";
import GsapScrollReveal from "@/app/_components/GsapScrollReveal";

export const revalidate = 0;

type ArticlePageProps = {
  params: Promise<{ slug: string }>;
};

export async function generateMetadata({
  params,
}: ArticlePageProps): Promise<Metadata> {
  const { slug } = await params;
  const article = await getArticleBySlug(slug);

  if (!article) return { title: "Tin tức" };

  const title = `${article.title} | Tin tức`;
  const description = article.excerpt || article.title;

  return {
    title,
    description,
    alternates: {
      canonical: `/tin-tuc/${slug}`,
    },
    openGraph: {
      title,
      description,
      url: `/tin-tuc/${slug}`,
      siteName: "ADA Group",
      locale: "vi_VN",
      type: "article",
      images: [
        {
          url: article.imageUrl,
          width: 1200,
          height: 630,
          alt: article.title,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [article.imageUrl],
    },
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

  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "NewsArticle",
    headline: article.title,
    description: article.excerpt,
    image: [article.imageUrl],
    datePublished: article.date,
    dateModified: article.date,
    author: {
      "@type": "Organization",
      name: "ADA Group",
      url: "https://adaagencygroup.online",
    },
    publisher: {
      "@type": "Organization",
      name: "ADA Group",
      logo: {
        "@type": "ImageObject",
        url: "https://adaagencygroup.online/images/logo/logo.webp",
      },
    },
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": `https://adaagencygroup.online/tin-tuc/${slug}`,
    },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }}
      />
      <Breadcrumb current={article.title} />

      <section className="section-y pt-0!">
        <div className="mx-auto max-w-360 px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col gap-5 lg:flex-row lg:items-start lg:gap-8">
            <div className="flex min-w-0 flex-1 flex-col items-start gap-6 lg:gap-8">
              <ArticleDetail article={article} />
              <RelatedArticles articles={relatedArticles} />
            </div>

            <aside className="hidden w-full flex-col gap-5 lg:sticky lg:top-24 lg:self-start lg:flex lg:w-105 lg:shrink-0 lg:gap-8">
              <FeaturedPosts posts={featuredPosts} />
              <AISolutionBanner />
            </aside>
          </div>
        </div>
      </section>

      <GsapScrollReveal>
        <CallToAction />
      </GsapScrollReveal>
    </>
  );
}
