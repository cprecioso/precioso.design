import Link from "next/link"
import { FunctionComponent } from "react"
import { gql } from "../api/gql"
import { useGQL } from "../api/hooks"

const QUERY = gql`
  query PostList($limit: IntType) {
    allPosts(first: $limit, orderBy: date_ASC) {
      date
      slug
      title
    }
  }
`
export type BlogPostMeta = {
  slug: string
  date: string
  title: string
}

export type Response = { allPosts: BlogPostMeta[] }

export const PostListItem: FunctionComponent<{ post: BlogPostMeta }> = ({
  post,
}) => (
  <Link href={`/blog/${post.slug}`}>
    <a>
      <li>
        <span>{post.title}</span> <em>{post.date}</em>
      </li>
    </a>
  </Link>
)

export interface PostListProps {
  limit?: number
}

export const PostList: FunctionComponent<PostListProps> = ({ limit = 20 }) => {
  const { data } = useGQL<Response>(QUERY, { limit: "" + limit })

  return (
    <ul>
      {data?.allPosts.map((post) => (
        <PostListItem key={post.slug} post={post} />
      ))}
    </ul>
  )
}
