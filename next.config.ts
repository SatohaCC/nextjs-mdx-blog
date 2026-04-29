import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  cacheComponents: true,
  experimental: {
    viewTransition: true,
    // lucide-reactのbarrelインポートを最適化
    optimizePackageImports: ['lucide-react', 'react-aria-components'],
  },
};

export default nextConfig;
