import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "easylogistics.ru",
      },
    ],
  },
};

export default nextConfig;
