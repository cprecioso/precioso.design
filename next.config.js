module.exports = {
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
}
