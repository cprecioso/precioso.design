// @ts-check

const TOKEN = process.env.DATO_API_TOKEN
const ENDPOINT = "https://graphql.datocms.com/"

/** @type {typeof import("./gql").request} */
export const request = async (query, variables) => {
  const res = await fetch(ENDPOINT, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${TOKEN}`,
    },
    body: JSON.stringify({ query, variables }),
  })

  const { data, errors } = await res.json()

  if (errors) throw new AggregateError(errors, "Errors in GraphQL request")

  return data
}
