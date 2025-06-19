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
  // Enhanced JavaScript minification and optimization
  compiler: {
    removeConsole: process.env.NODE_ENV === 'production', // Remove console.logs in production
  },
  // Turbopack configuration for development
  experimental: {
    turbo: {
      // Turbopack-specific optimizations can go here if needed
    },
  },
  // Webpack optimization for production builds only
  webpack: (config, { dev, isServer, webpack }) => {
    // Only apply webpack optimizations in production builds
    // Turbopack is used in development, webpack in production
    if (!dev && !isServer) {
      // Additional minification for production client-side bundles
      config.optimization = {
        ...config.optimization,
        minimize: true,
        sideEffects: false,
      }
    }
    return config
  },
}

export default nextConfig