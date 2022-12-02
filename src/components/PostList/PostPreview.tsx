import Link from "next/link"
import { DateFormatter } from "../../helpers/formatters"
import styles from "./styles.module.css"

export interface PostInfo {
  type: string
  id: string
  timestamp: number
  title?: string
}

interface Props {
  post: PostInfo
}

export const PostPreview = ({ post }: Props) => (
  <article className={styles.post_preview}>
    <Link href={`/posts/${post.id}`}>
      <a>
        <p>{post.title}</p>
      </a>
    </Link>
    <DateFormatter>{post.timestamp}</DateFormatter>
  </article>
)
