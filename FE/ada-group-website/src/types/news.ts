export type NewsArticle = {
  slug: string;
  category: string;
  title: string;
  excerpt: string;
  content: string;
  date: string;
  imageUrl: string;
  featured: boolean;
};

export type NewsCategoryCount = {
  label: string;
  count: number;
};

export type NewsPaginationItem = number | "ellipsis";
