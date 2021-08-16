// @ts-check

module.exports = /** @type {import('next').NextConfig} */ ({
  i18n: {
    locales: ["en"],
    defaultLocale: "en",
  },
  redirects: async () => [
    {
      source: "/.well-known/pay",
      destination: "https://ilp.uphold.com/87WqJA3KRDbF",
      permanent: false,
    },
  ],
  images: {
    domains: require("./src/config").images_domains,
  },
})
