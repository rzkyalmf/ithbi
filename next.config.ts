import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    formats: ["image/avif", "image/webp"],
    remotePatterns: [
      {
        protocol: "https",
        hostname: "pub-b3bbd8acb34f4f18b3140380b48ae46d.r2.dev",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "pub-c203e6e53e5e4f39abd18a3b25c37b06.r2.dev",
        pathname: "/**",
      },
    ],
  },
  experimental: {
    serverActions: {
      bodySizeLimit: "100mb",
    },
  },
};

export default nextConfig;
