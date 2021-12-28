export const gql = String.raw

const publicEndpoint = "https://graphql.datocms.com/"
const previewEndpoint = "https://graphql.datocms.com/preview"

export const request = async (
  query: string,
  variables?: Record<string, any>,
  previewMode?: boolean
) => {
  const endpoint = previewMode ? previewEndpoint : publicEndpoint

  const res = await fetch(endpoint, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${process.env.DATO_API_TOKEN}`,
    },
    body: JSON.stringify({ query, variables }),
  })

  const { data, errors }: { data?: any; errors?: string[] } = await res.json()

  if (errors) throw errors

  return data
}
