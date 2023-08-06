/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: [process.env.NEXT_IMAGE_DOMAIN],
  },
  experimental: {
    largePageDataBytes: 800 * 1000,
  },
  async rewrites() {
    return [
      {
        source: "/",
        destination: "/home",
      },
      {
        source: "/news",
        destination: "/news/page/0",
      },
      {
        source: "/stallions",
        destination: "/stallions/page/0",
      },
      {
        source: "/mares",
        destination: "/mares/page/0",
      },
      {
        source: "/show-horses",
        destination: "/show-horses/page/0",
      },
      {
        source: "/for-sale",
        destination: "/for-sale/page/0",
      },
      {
        source: "/horses",
        destination: "/horses/page/0",
      },
      {
        source: "/donkeys",
        destination: "/donkeys/page/0",
      },
      {
        source: "/livestock",
        destination: "/livestock/page/0",
      },
    ];
  },
};

module.exports = nextConfig;
