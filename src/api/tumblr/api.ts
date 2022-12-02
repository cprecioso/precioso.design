import assert from "node:assert"
import { API_KEY, applyQueryStringObject, BASE_URL } from "./base"
import { BlogObject, PostFormat, PostObject, TumblrResponse } from "./types"

export interface RetrievePublishedPostOptions {
  type?: string
  id?: number | string
  tag?: string
  limit?: number
  offset?: number
  reblog_info?: boolean
  notes_info?: boolean
  filter?: PostFormat
  before?: Date
}

export interface RetrievePublishedPostsResponse
  extends TumblrResponse<{
    blog: BlogObject
    posts: PostObject[]
    total_posts: number
  }> {}

export const retrievePublishedPosts = async (
  blogId: string,
  { type, before: beforeDate, ...options }: RetrievePublishedPostOptions = {}
) => {
  const url = new URL(`blog/${blogId}/posts`, BASE_URL)
  if (type) url.pathname += `/${type}`

  if (Array.isArray(options.tag)) assert(options.tag.length <= 4)
  if (options.limit != null) assert(options.limit >= 1 && options.limit <= 20)

  const before = beforeDate && (+beforeDate / 1000) | 0

  applyQueryStringObject(url, { ...options, before, api_key: API_KEY })

  const res = await fetch(url.href)
  const data = (await res.json()) as RetrievePublishedPostsResponse

  assert.strictEqual(data.meta.status, 200)
  assert(data.response)

  return data.response
}
