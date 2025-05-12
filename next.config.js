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
  // Set up proper path aliases
  experimental: {
    esmExternals: true
  }
};

module.exports = nextConfig; 