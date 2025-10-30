import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // ✔ Зураг аюулгүй байдлын шинэ тохиргоо (domains орлох)
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "apex26.mn",
      },
      {
        protocol: "https",
        hostname: "www.apex26.mn",
      },
    ],
  },
};

export default nextConfig;