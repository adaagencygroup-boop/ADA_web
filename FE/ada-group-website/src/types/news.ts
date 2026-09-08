export type NewsArticle = {
  id: string;
  slug: string;
  category: string;
  title: string;
  excerpt: string;
  content: string;
  date: string;
  imageUrl: string;
  featured: boolean;
  views?: number;
};

export type NewsCategory = {
  id: string;
  name: string;
};

export type NewsPaginationItem = number | "ellipsis";
