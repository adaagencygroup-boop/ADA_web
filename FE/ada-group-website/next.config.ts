import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "standalone",
  images: {
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
        protocol: "https",
        hostname: "wtxsbaavzdvpzogiwoei.supabase.co",
      },
    ],
  },
};

export default nextConfig;
