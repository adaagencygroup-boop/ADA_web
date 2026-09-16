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
        hostname: "wtxsbaavzdvpzogiwoei.supabase.co",
        pathname: "/storage/v1/object/public/**",
      },
      {
        protocol: "https",
        hostname: "images.unsplash.com",
      },
      {
        protocol: "https",
        hostname: "adaagencygroup.online",
        pathname: "/files/**",
      },
      {
        protocol: "https",
        hostname: "*.adaagencygroup.online",
        pathname: "/files/**",
      },
      {
        protocol: "https",
        hostname: "localhost",
        pathname: "/files/**",
      },
      {
        protocol: "http",
        hostname: "localhost",
        pathname: "/files/**",
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