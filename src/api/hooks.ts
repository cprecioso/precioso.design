import usePreSWR, { ConfigInterface } from "preswr"
import { usePreview } from "../helpers/preview"
import { request } from "./gql"

const options: ConfigInterface = {
  refreshInterval: 0,
  refreshWhenHidden: false,
  refreshWhenOffline: false,
  revalidateOnFocus: false,
  revalidateOnMount: false,
  revalidateOnReconnect: false,
}

const svgFetcher = async (url: string) => await (await fetch(url)).text()
export const useSVG = (url: string) => {
  return usePreSWR<string>(url, svgFetcher, options)
}

export const useGQL = <Data = any>(
  query: string,
  variables: Record<string, string> = {}
) => {
  const variableKey = JSON.stringify(variables)
  const preview = usePreview()
  return usePreSWR<Data>([query, variableKey, preview], request, options)
}
