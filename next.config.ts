import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  eslint: {
    ignoreDuringBuilds: true, // ✅ This skips ESLint during `next build`
  },
};

export default nextConfig;
