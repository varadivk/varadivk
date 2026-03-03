/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  typescript: {
    tsconfigPath: "./tsconfig.json",
  },
  // static export – builds an `out/` directory without needing `next export`
  output: 'export',
  // deploy under GitHub Pages subpath
  basePath: '/thinkverge-web',
  assetPrefix: '/thinkverge-web/',
};

module.exports = nextConfig;
