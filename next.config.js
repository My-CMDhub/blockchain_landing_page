const path = require('path');

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
    domains: [
      'images.unsplash.com',
      'plus.unsplash.com',
      'placehold.co',
      'images.pexels.com'
    ],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**',
      },
    ],
  },
  env: {
    NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY: process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY,
  },
  webpack: (config, { buildId, dev, isServer, defaultLoaders, webpack }) => {
    config.resolve.alias = {
      ...config.resolve.alias,
      '@': path.resolve(__dirname, './'),
    };
    return config;
  },
  // Add Content Security Policy headers to allow Stripe to load properly
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          {
            key: 'Content-Security-Policy',
            value:
              "default-src 'self'; script-src 'self' 'unsafe-inline' 'unsafe-eval' https://js.stripe.com; connect-src 'self' https://api.stripe.com; frame-src 'self' https://js.stripe.com https://hooks.stripe.com https://checkout.stripe.com; img-src 'self' https://*.stripe.com https://images.unsplash.com https://plus.unsplash.com https://placehold.co https://images.pexels.com https://* data:; style-src 'self' 'unsafe-inline'",
          },
        ],
      },
    ];
  },
};

module.exports = nextConfig; 