import { SeoMetaTagType } from "react-datocms"
import { gql, request } from "./_gql"

export interface BlogPostMeta {
  slug: string
  date: string
  title: string
}

export interface BlogPost extends BlogPostMeta {
  text: string
  _seoMetaTags: SeoMetaTagType[]
}

const POST_LIST_QUERY = gql`
  query PostList {
    allPosts {
      date
      slug
      title
    }
  }
`

type PostListResponse = { allPosts: BlogPostMeta[] }

export const listPosts = async (previewMode?: boolean) =>
  ((await request(POST_LIST_QUERY, undefined, previewMode)) as PostListResponse)
    .allPosts

const POST_GET_QUERY = gql`
  query GetPost($slug: String) {
    post(filter: { slug: { eq: $slug } }) {
      date
      slug
      text(markdown: true)
      title
      _seoMetaTags {
        attributes
        content
        tag
      }
    }
  }
`

type PostGetResponse = { post: BlogPost | null }

export const getPost = async (slug: string, previewMode?: boolean) =>
  ((await request(POST_GET_QUERY, { slug }, previewMode)) as PostGetResponse)
    .post
