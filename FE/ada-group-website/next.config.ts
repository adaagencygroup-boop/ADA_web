import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "standalone",
  images: {
    dangerouslyAllowSVG: true,
    dangerouslyAllowLocalIP: true,
    remotePatterns: [
      {
        protocol: "https",
        hostname: "picsum.photos",
      },
      {
        protocol: "https",
        hostname: "adagroup.com.vn",
      },
      {
        protocol: "http",
        hostname: "localhost",
      },
      {
        protocol: "https",
        hostname: "localhost",
      },
      {
        protocol: "https",
        hostname: "wtxsbaavzdvpzogiwoei.supabase.co",
      },
    ],
  },
  async rewrites() {
    return [
      {
        source: "/files/:path*",
        destination: process.env.NEXT_PUBLIC_API_BASE_URL
          ? `${process.env.NEXT_PUBLIC_API_BASE_URL.replace("/api/v1", "")}/files/:path*`
          : "http://localhost:8080/files/:path*",
      },
    ];
  },
};

export default nextConfig;
