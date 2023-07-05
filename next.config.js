/** @type {import('next').NextConfig} */
const nextConfig = {
  i18n: {
    locales: ["en"],
    defaultLocale: "en",
  },
  images: {
    domains: [process.env.NEXT_IMAGE_DOMAIN],
  },
  async rewrites() {
    return [
      {
        source: "/news",
        destination: "/news/page/0",
      },
    ]
  },
}

module.exports = nextConfig
