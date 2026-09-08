import {
  ALL_CATEGORY,
  getArticles,
  getCategories,
  getFeaturedArticles,
  NEWS_LISTING_ANCHOR,
} from "@/src/lib/api/news";
import FeaturedPosts from "@/app/tin-tuc/_components/FeaturedPosts";
import NewsCard from "@/app/tin-tuc/_components/NewsCard";
import NewsCategories from "@/app/tin-tuc/_components/NewsCategories";
import NewsPagination from "@/app/tin-tuc/_components/NewsPagination";

type NewsListingProps = {
  category?: string;
  page?: string;
  search?: string;
};

export default async function NewsListing({
  category,
  page,
  search,
}: NewsListingProps) {
  const { articles, activeCategory, currentPage, totalPages } =
    await getArticles({ category, page: Number(page) || 1, search });
  const [featuredPosts, categories] = await Promise.all([
    getFeaturedArticles(),
    getCategories(),
  ]);

  return (
    <section id={NEWS_LISTING_ANCHOR} className="scroll-mt-28 scroll-smooth pt-0 pb-6">
      <div className="mx-auto max-w-360 px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col gap-8 lg:flex-row lg:items-start lg:gap-8">
          <div className="flex min-w-0 flex-1 flex-col items-start gap-6">
            <h1 className="text-[28px] lg:text-[36px] font-semibold tracking-wide text-black uppercase">
              {search
                ? `Kết quả tìm kiếm cho "${search}"`
                : activeCategory === ALL_CATEGORY
                  ? "Tin tức"
                  : activeCategory}
            </h1>

            <div className="flex w-full flex-col gap-6">
              {articles.length > 0 ? (
                articles.map((article) => (
                  <NewsCard key={article.slug} article={article} />
                ))
              ) : (
                <div className="rounded-2xl bg-white p-12 text-center shadow-[0_1px_2px_rgba(0,0,0,0.05)]">
                  <p className="text-zinc-500">
                    Không tìm thấy bài viết phù hợp.
                  </p>
                </div>
              )}
            </div>

            <NewsPagination
              activeCategory={activeCategory}
              currentPage={currentPage}
              totalPages={totalPages}
              search={search}
            />
          </div>

          <aside className="flex w-full flex-col gap-8 lg:w-105 lg:shrink-0">
            <NewsCategories
              categories={categories}
              activeCategory={activeCategory}
              search={search}
            />
            <FeaturedPosts posts={featuredPosts} />
          </aside>
        </div>
      </div>
    </section>
  );
}
