import { GraphQLClient } from "graphql-request"

export const gql = (literals: TemplateStringsArray, ...values: any[]) => {
  let query = ""
  for (let i = 0; i < literals.length - 1; i++) {
    query += `${literals[i]}${values[i]}`
  }
  query += `${literals[literals.length - 1]}`

  return query
}

const makeClient = (endpoint: string) =>
  new GraphQLClient(endpoint, {
    headers: { Authorization: `Bearer ${process.env.DATO_API_TOKEN}` },
  })

export const request = (
  query: string,
  variables?: Record<string, any>,
  previewMode?: boolean
): Promise<any> => {
  const client = previewMode
    ? makeClient("https://graphql.datocms.com/preview")
    : makeClient("https://graphql.datocms.com/")

  return client.request(query, variables)
}
