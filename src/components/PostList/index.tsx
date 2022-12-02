import { Fragment } from "react"
import { PostInfo, PostPreview } from "./PostPreview"
import styles from "./styles.module.css"
export type { PostInfo } from "./PostPreview"

interface Props {
  posts: PostInfo[]
}

export const PostList = ({ posts }: Props) => (
  <div className={styles.post_list}>
    {posts.map((post) => (
      <Fragment key={post.id}>
        <PostPreview post={post} />
        <PostPreview post={post} />
        <PostPreview post={post} />
        <PostPreview post={post} />
        <PostPreview post={post} />
        <PostPreview post={post} />
        <PostPreview post={post} />
        <PostPreview post={post} />
      </Fragment>
    ))}
  </div>
)
