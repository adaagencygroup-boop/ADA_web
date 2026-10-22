import type { MetadataRoute } from "next";
import { getSectors } from "@/app/linh-vuc/_lib/sectors";
import { apiGet, type PageResponse } from "@/src/lib/api/http";
import { getRecruitments } from "@/src/lib/api/recruitments";

const BASE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://adaagencygroup.online";

type NewsItemSummary = {
  id: string;
  slug: string;
  updatedAt?: string;
  createdAt?: string;
};

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  // 1. Static Pages
  const staticPaths = [
    "",
    "/gioi-thieu",
    "/dich-vu",
    "/dich-vu/web",
    "/dich-vu/mobile",
    "/dich-vu/he-thong-doanh-nghiep",
    "/dich-vu/ai-automation",
    "/linh-vuc",
    "/tin-tuc",
    "/tuyen-dung",
    "/lien-he",
    "/dieu-khoan-su-dung",
    "/chinh-sach-bao-mat",
  ];

  const staticRoutes: MetadataRoute.Sitemap = staticPaths.map((path) => ({
    url: `${BASE_URL}${path}`,
    lastModified: new Date(),
    changeFrequency: path === "" ? "daily" : "weekly",
    priority: path === "" ? 1.0 : 0.8,
  }));

  // 2. Dynamic Sectors
  const sectors = getSectors();
  const sectorRoutes: MetadataRoute.Sitemap = sectors.map((sector) => ({
    url: `${BASE_URL}/linh-vuc/${sector.slug}`,
    lastModified: new Date(),
    changeFrequency: "weekly",
    priority: 0.8,
  }));

  // 3. Dynamic News from Backend API
  let newsRoutes: MetadataRoute.Sitemap = [];
  try {
    const res = await apiGet<PageResponse<NewsItemSummary>>(
      "/public/news",
      { page: 1, size: 200 },
      3600
    );
    if (res?.items && Array.isArray(res.items)) {
      newsRoutes = res.items.map((item) => ({
        url: `${BASE_URL}/tin-tuc/${item.slug}`,
        lastModified: item.updatedAt ? new Date(item.updatedAt) : item.createdAt ? new Date(item.createdAt) : new Date(),
        changeFrequency: "weekly",
        priority: 0.7,
      }));
    }
  } catch {
    // Graceful fallback if backend is not reachable at build time
  }

  // 4. Dynamic Recruitments from Backend API
  let recruitmentRoutes: MetadataRoute.Sitemap = [];
  try {
    const res = await getRecruitments({ page: 1, size: 200 });
    if (res?.items && Array.isArray(res.items)) {
      recruitmentRoutes = res.items.map((job) => ({
        url: `${BASE_URL}/tuyen-dung/${job.slug}`,
        lastModified: job.updatedAt ? new Date(job.updatedAt) : new Date(),
        changeFrequency: "daily",
        priority: 0.7,
      }));
    }
  } catch {
    // Graceful fallback if backend is not reachable at build time
  }

  return [...staticRoutes, ...sectorRoutes, ...newsRoutes, ...recruitmentRoutes];
}
