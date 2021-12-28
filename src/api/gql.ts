import type { TypedDocumentNode } from "@graphql-typed-document-node/core"
import type { DocumentNode } from "graphql"
import useSWR, { SWRConfiguration } from "swr"

export const gql = String.raw

const endpoint = process.env.DATO_ENDPOINT!

type EmptyObject = { [key: string]: never }

export const request: {
  <Result, Variables extends EmptyObject>(
    query: TypedDocumentNode<Result, Variables>,
    variables?: Variables
  ): Promise<Result>

  <Result, Variables>(
    query: TypedDocumentNode<Result, Variables>,
    variables: Variables
  ): Promise<Result>
} = async (query: string | DocumentNode, variables?: any) => {
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

const swrConfig: SWRConfiguration = {
  fetcher: request,
}

export const useData: {
  <Result, Variables extends EmptyObject>(
    query: TypedDocumentNode<Result, Variables>,
    variables?: Variables
  ): Result

  <Result, Variables>(
    query: TypedDocumentNode<Result, Variables>,
    variables: Variables
  ): Result
} = (query: string | DocumentNode, variables?: any) =>
  useSWR([query, variables], swrConfig).data!

export * from "../__generated__/graphql"
