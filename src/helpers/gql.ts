import { GraphQLClient } from "graphql-request"

const client = new GraphQLClient("https://graphql.datocms.com/", {
  headers: { Authorization: process.env.DATO_API_TOKEN! }
})

export const gql = (literals: TemplateStringsArray, ...values: any[]) => {
  let query = ""
  for (let i = 0; i < literals.length - 1; i++) {
    query += `${literals[i]}${values[i]}`
  }
  query += `${literals[literals.length - 1]}`

  return client.request(query)
}
