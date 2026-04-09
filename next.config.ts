import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  devIndicators: false,
  output: "export",
  basePath: "/Thaitraditional",
  assetPrefix: "/Thaitraditional/",
  images: {
    unoptimized: true,
  },
};

export default nextConfig;
