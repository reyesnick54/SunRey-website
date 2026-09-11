/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  poweredByHeader: false,
  images: {
    formats: ['image/avif', 'image/webp'],
  },
  typescript: {
    // Type errors fail the build. Never set this to true.
    ignoreBuildErrors: false,
  },
  eslint: {
    // Lint errors fail the build. Never set this to true.
    ignoreDuringBuilds: false,
  },
};

export default nextConfig;
