import { apiGet, ApiError, type PageResponse } from "@/src/lib/api/http";
import type { NewsArticle, NewsCategory, NewsPaginationItem } from "@/src/types/news";

export const ALL_CATEGORY = "Tất cả";
export const PAGE_SIZE = 4;
export const NEWS_BASE_PATH = "/tin-tuc";
export const NEWS_LISTING_ANCHOR = "tin-tuc-listing";

const FALLBACK_IMAGE = "https://picsum.photos/seed/ada-news-fallback/700/500";
const REVALIDATE_SECONDS = 60;

type NewsResponseDTO = {
  id: string;
  title: string;
  slug: string;
  content: string | null;
  coverImageURL: string | null;
  status: string | null;
  viewCount: number | null;
  isFeatured: boolean | null;
  categoryId: string | null;
  categoryName: string | null;
  authorName: string | null;
  updatedAt: string;
  createdAt: string;
};

function stripHtml(html: string): string {
  return html.replace(/<[^>]*>/g, " ").replace(/\s+/g, " ").trim();
}

function excerptFrom(content: string | null, maxLength = 160): string {
  if (!content) return "";
  const text = stripHtml(content);
  return text.length > maxLength ? `${text.slice(0, maxLength).trim()}…` : text;
}

function mapNews(n: NewsResponseDTO): NewsArticle {
  return {
    id: n.id,
    slug: n.slug,
    category: n.categoryName ?? "Khác",
    title: n.title,
    excerpt: excerptFrom(n.content),
    content: n.content ?? "",
    date: new Date(n.createdAt).toLocaleDateString("vi-VN"),
    imageUrl: n.coverImageURL ?? FALLBACK_IMAGE,
    featured: n.isFeatured ?? false,
    views: n.viewCount ?? undefined,
  };
}

export async function getCategories(): Promise<NewsCategory[]> {
  return apiGet<NewsCategory[]>("/public/newsCategories", undefined, REVALIDATE_SECONDS * 5);
}

export async function getArticles(options: { category?: string; page?: number; search?: string }) {
  const categories = await getCategories();
  const activeCategory =
    options.category && categories.some((c) => c.name === options.category)
      ? options.category
      : ALL_CATEGORY;
  const categoryId =
    activeCategory === ALL_CATEGORY
      ? undefined
      : categories.find((c) => c.name === activeCategory)?.id;

  const page = Math.max(1, options.page ?? 1);
  const result = await apiGet<PageResponse<NewsResponseDTO>>(
    "/public/news",
    { page, size: PAGE_SIZE, categoryId, search: options.search || undefined },
    REVALIDATE_SECONDS
  );

  return {
    articles: result.items.map(mapNews),
    activeCategory,
    currentPage: result.pagination.page,
    totalPages: result.pagination.totalPages,
  };
}

export async function getFeaturedArticles(limit = 3): Promise<NewsArticle[]> {
  const items = await apiGet<NewsResponseDTO[]>(
    "/public/news/featured",
    { limit },
    REVALIDATE_SECONDS * 5
  );
  return items.map(mapNews);
}

export async function getArticleBySlug(slug: string): Promise<NewsArticle | undefined> {
  try {
    const item = await apiGet<NewsResponseDTO>(`/public/news/${slug}`, undefined, REVALIDATE_SECONDS);
    return mapNews(item);
  } catch (error) {
    if (error instanceof ApiError && error.status === 404) return undefined;
    throw error;
  }
}

export async function getRelatedArticles(
  current: NewsArticle,
  limit = 3,
): Promise<NewsArticle[]> {
  const items = await apiGet<NewsResponseDTO[]>(
    "/public/news/relevant",
    { limit: limit + 1 },
    REVALIDATE_SECONDS
  );
  return items.map(mapNews).filter((article) => article.slug !== current.slug).slice(0, limit);
}

export function buildNewsHref(category: string, page: number, search?: string) {
  const params = new URLSearchParams();
  if (category !== ALL_CATEGORY) params.set("category", category);
  if (page > 1) params.set("page", String(page));
  if (search) params.set("search", search);
  const query = params.toString();
  return `${NEWS_BASE_PATH}${query ? `?${query}` : ""}#${NEWS_LISTING_ANCHOR}`;
}

export function getPaginationItems(
  currentPage: number,
  totalPages: number,
): NewsPaginationItem[] {
  const keep = new Set(
    [1, totalPages, currentPage - 1, currentPage, currentPage + 1].filter(
      (page) => page >= 1 && page <= totalPages,
    ),
  );
  const sorted = Array.from(keep).sort((a, b) => a - b);

  const items: NewsPaginationItem[] = [];
  let previous = 0;
  for (const page of sorted) {
    if (previous && page - previous > 1) items.push("ellipsis");
    items.push(page);
    previous = page;
  }
  return items;
}
