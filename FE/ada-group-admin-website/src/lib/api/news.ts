import apiClient, { unwrap } from "@/src/lib/api/client";
import type { PageResponse } from "@/src/lib/api/types";

export type NewsStatus = "draft" | "published";

export type NewsItem = {
  id: string;
  title: string;
  slug: string;
  coverImageURL: string | null;
  status: NewsStatus;
  isFeatured: boolean;
  viewCount: number;
  categoryId: string | null;
  categoryName: string | null;
  createdAt: string;
  updatedAt: string;
};

export type NewsCategory = {
  id: string;
  name: string;
  isActive: boolean;
  createdAt: string;
};

export type GetNewsParams = {
  page?: number;
  size?: number;
  search?: string;
  status?: NewsStatus;
  categoryId?: string;
  isFeatured?: boolean;
  fromDate?: string;
  toDate?: string;
};

export type NewsDetail = NewsItem & {
  content: string;
  authorName: string | null;
};

export type NewsPayload = {
  title: string;
  categoryId?: string | null;
  content: string;
  coverImageURL?: string | null;
  status: NewsStatus;
  isFeatured?: boolean;
};

export type MediaUploadResult = {
  fileURL: string;
  fileSizeBytes: number;
  mimeType: string;
  uploadedAt: string;
};

export function getNews(params: GetNewsParams, signal?: AbortSignal) {
  return unwrap<PageResponse<NewsItem>>(
    apiClient.get("/admin/news", { params, signal })
  );
}

export function getNewsById(id: string, signal?: AbortSignal) {
  return unwrap<NewsDetail>(apiClient.get(`/admin/news/${id}`, { signal }));
}

export function createNews(payload: NewsPayload) {
  return unwrap<NewsDetail>(apiClient.post("/admin/news", payload));
}

export function updateNews(id: string, payload: NewsPayload) {
  return unwrap<NewsDetail>(apiClient.put(`/admin/news/${id}`, payload));
}

export function deleteNews(id: string) {
  return unwrap<void>(apiClient.delete(`/admin/news/${id}`));
}

export function uploadMedia(file: File) {
  const formData = new FormData();
  formData.append("file", file);
  return unwrap<MediaUploadResult>(
    apiClient.post("/admin/media/upload", formData, {
      headers: { "Content-Type": "multipart/form-data" },
    })
  );
}

export function getNewsCategories(search?: string, signal?: AbortSignal) {
  return unwrap<NewsCategory[]>(
    apiClient.get("/admin/newsCategories", { params: { search }, signal })
  );
}

export type NewsCategoryPayload = {
  name: string;
  isActive: boolean;
};

export function createNewsCategory(payload: NewsCategoryPayload) {
  return unwrap<NewsCategory>(
    apiClient.post("/admin/newsCategories", payload)
  );
}

export function updateNewsCategory(id: string, payload: NewsCategoryPayload) {
  return unwrap<NewsCategory>(
    apiClient.put(`/admin/newsCategories/${id}`, payload)
  );
}

export function deleteNewsCategory(id: string) {
  return unwrap<void>(apiClient.delete(`/admin/newsCategories/${id}`));
}
