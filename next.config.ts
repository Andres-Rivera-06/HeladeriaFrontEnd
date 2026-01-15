import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  experimental: {
    // Enable any experimental features if needed
  },
  // Configure image domains if you'll use next/image
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "**",
      },
    ],
  },
};

export default nextConfig;
