import { GraphQLClient } from "graphql-request"

export const gql = String.raw

const makeClient = (endpoint: string) =>
  new GraphQLClient(endpoint, {
    headers: { Authorization: `Bearer ${process.env.DATO_API_TOKEN}` },
  })

const publicClient = makeClient("https://graphql.datocms.com/")
const previewClient = makeClient("https://graphql.datocms.com/preview")

export const request = (
  query: string,
  variables?: Record<string, any>,
  previewMode?: boolean
): Promise<any> => {
  const client = previewMode ? previewClient : publicClient
  return client.request(query, variables)
}
