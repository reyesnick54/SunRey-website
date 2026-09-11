/** @type {import('next').NextConfig} */

/**
 * CLAUDE.md §3.
 *
 * `output: 'export'` emits the whole site as static HTML into `out/`.
 * Cloudflare Pages serves `out/`; the Pages Function in `functions/`
 * decides who may reach it (§4). There is no SSR and no route handler,
 * so there is no Next runtime on the edge to misconfigure.
 */
const nextConfig = {
  output: 'export',
  // Static export has no image optimizer — assets are pre-sized at build time.
  images: {
    unoptimized: true,
  },
  // Pages resolves /vault to /vault/index.html cleanly with this on.
  trailingSlash: true,
  reactStrictMode: true,
  poweredByHeader: false,
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
