/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    unoptimized: true,
  },
  // Exclude certain directories from the build process
  pageExtensions: ['tsx', 'ts', 'jsx', 'js'],
  // Only allow Next.js to process the app directory and components directory
  experimental: {
    appDir: true,
  }
};

module.exports = nextConfig; 