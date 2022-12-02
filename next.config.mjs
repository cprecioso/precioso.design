// @ts-check

import { request } from "./src/api/gql.mjs"

export default /** @type {import('next').NextConfig} */ ({
  reactStrictMode: true,
  experimental: {
    appDir: true,
  },
  async redirects() {
    const { allButtons } = await request(/* GraphQL */ `
      query Redirects {
        allButtons {
          slug
          link
        }
      }
    `)

    return allButtons.map((button) => ({
      source: `/go/${button.slug}`,
      destination: button.link,
      permanent: false,
    }))
  },
})
