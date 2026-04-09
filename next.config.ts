import type { NextConfig } from "next";

const isProd = process.env.NODE_ENV === "production";
const basePath = isProd ? "/Thaitraditional" : "";

const nextConfig: NextConfig = {
  devIndicators: false,
  output: "export",
  basePath,
  assetPrefix: isProd ? "/Thaitraditional/" : undefined,
  images: {
    unoptimized: true,
  },
  env: {
    NEXT_PUBLIC_BASE_PATH: basePath,
  },
};

export default nextConfig;
