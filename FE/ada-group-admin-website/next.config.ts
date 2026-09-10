import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "standalone",
  images: {
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
        hostname: "adagroup.com.vn",
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
        destination: process.env.NEXT_PUBLIC_API_BASE_URL
          ? `${process.env.NEXT_PUBLIC_API_BASE_URL.replace("/api/v1", "")}/files/:path*`
          : "http://localhost:8080/files/:path*",
      },
    ];
  },
};

export default nextConfig;
