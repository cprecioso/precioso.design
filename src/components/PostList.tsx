import Link from "next/link"
import { FunctionComponent } from "react"
import { BlogPostMeta } from "../api/blog"

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

export type PostListProps = {
  posts: BlogPostMeta[]
}

export const PostList: FunctionComponent<PostListProps> = ({ posts }) => (
  <ul>
    {posts.map((post) => (
      <PostListItem key={post.slug} post={post} />
    ))}
  </ul>
)
