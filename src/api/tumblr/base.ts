export const API_KEY = process.env.TUMBLR_API_KEY!

export const BASE_URL = new URL("https://api.tumblr.com/v2/")

export const applyQueryStringObject = (
  url: URL,
  obj: Record<string, string | number | boolean | undefined | null>
) => {
  url.search = new URLSearchParams(
    Object.entries(obj)
      .filter((pair): pair is [string, string] => pair[1] != null)
      .map(([n, v]) => [n, `${v}`])
  ).toString()
}
