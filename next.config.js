// @ts-check

module.exports = /** @type {import('next').NextConfig} */ ({
  i18n: {
    locales: ["en"],
    defaultLocale: "en",
  },
  images: {
    domains: require("./src/config").images_domains,
  },
  reactStrictMode: true,
})
