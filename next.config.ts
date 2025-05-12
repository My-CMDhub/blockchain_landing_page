import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    unoptimized: true,
  },
  transpilePackages: ['lucide-react'],
  experimental: {
    serverComponentsExternalPackages: ['lucide-react']
  }
};

export default nextConfig;
