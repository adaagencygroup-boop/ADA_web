export type NewsContentBlock =
  | { type: "paragraph"; text: string; emphasis?: boolean }
  | { type: "heading"; text: string };

export type NewsArticle = {
  slug: string;
  category: string;
  title: string;
  excerpt: string;
  content: string;
  date: string;
  imageUrl: string;
  featured: boolean;
  views?: number;
  body?: NewsContentBlock[];
};

export type NewsCategoryCount = {
  label: string;
  count: number;
};

export type NewsPaginationItem = number | "ellipsis";
