import { createRequire } from 'module'
const require = createRequire(import.meta.url)

/** @type {import('next').NextConfig} */
const nextConfig = {
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    // 启用图片优化
    formats: ['image/avif', 'image/webp'],
    // 定义响应式断点
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
  },
  // Optimize package imports for better tree shaking
  experimental: {
    optimizePackageImports: ['lucide-react', 'framer-motion'],
  },
  // Empty turbopack config to silence warning (Turbopack is default in Next.js 16)
  turbopack: {},
  // Enable bundle analyzer in development (only works with webpack mode)
  webpack: (config, { isServer }) => {
    if (process.env.ANALYZE === 'true') {
      const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer')
      config.plugins.push(
        new BundleAnalyzerPlugin({
          analyzerMode: 'static',
          reportFilename: isServer
            ? '../analyze/server.html'
            : './analyze/client.html',
          openAnalyzer: false,
        })
      )
    }
    return config
  },
}

export default nextConfig
