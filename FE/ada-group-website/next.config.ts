import type { NextConfig } from "next";
const nextConfig: NextConfig = {
  output: "standalone",
  images: {
    unoptimized: true,
    dangerouslyAllowSVG: true,
    dangerouslyAllowLocalIP: true,
    remotePatterns: [
      {
        protocol: "https",
        hostname: "picsum.photos",
      },
      {
        protocol: "https",
        hostname: "adaagencygroup.online",
      },
      {
        protocol: "https",
        hostname: "*.adaagencygroup.online",
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
        destination: process.env.API_BASE_URL
          ? `${process.env.API_BASE_URL.replace("/api/v1", "")}/files/:path*`
          : (process.env.NEXT_PUBLIC_API_BASE_URL
              ? `${process.env.NEXT_PUBLIC_API_BASE_URL.replace("/api/v1", "")}/files/:path*`
              : "http://app:8080/files/:path*"),
      },
    ];
  },
};
export default nextConfig;