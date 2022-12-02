export interface TumblrResponse<T> {
  meta: { status: number; msg: string }
  response?: T
}

export interface BlogObject {
  title: string
  posts: number
  name: string
  updated: string
  description: string
  ask: boolean
  ask_anon: boolean
  likes: number
  is_blocked_from_primary: boolean
  avatar: unknown[]
  theme: unknown
  timezone?: string
  timezone_offset?: string
}

export type PostType =
  | "text"
  | "quote"
  | "link"
  | "answer"
  | "video"
  | "audio"
  | "photo"
  | "chat"
  | "blocks"

export type PostFormat = "text" | "raw"

export type PostState = "published" | "queued" | "draft" | "private"

interface BasePostObject {
  blog_name: string
  /** @deprecated Do not use from JS, as it doesn't play well with 64-bit integers. Use `id_string`. */
  id: number
  id_string: string
  genesis_post_id?: string
  post_url: string
  type: PostType
  timestamp: number
  date: string
  format: "html" | "markdown"
  reblog_key: string
  tags: string[]
  bookmarklet?: boolean
  mobile?: boolean
  source_url?: string
  source_title?: string
  liked?: boolean
  state: PostState
  total_posts: number
}

export interface TextPostObject extends BasePostObject {
  type: "text"
  title: string
  body: string
  summary?: string
}

export interface LinkPostObject extends BasePostObject {
  type: "link"
  title: string
  description: string
  url: string
  link_author: string
  excerpt: string
  publisher: string
  photos: unknown[]
}

export type PostObject = TextPostObject | LinkPostObject
