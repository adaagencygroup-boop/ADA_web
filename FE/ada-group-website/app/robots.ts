import type { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://adagroup.com.vn";

  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: [
          "/api/",
          "/tuyen-dung/*/ung-tuyen",
        ],
      },
    ],
    sitemap: `${baseUrl}/sitemap.xml`,
  };
}
