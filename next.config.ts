import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "immobilien-garten.ro",
      },
    ],
  },
};

export default nextConfig;
