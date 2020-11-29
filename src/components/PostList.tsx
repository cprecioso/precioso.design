import styled from "@emotion/styled"
import Link from "next/link"
import { FunctionComponent } from "react"
import { BlogPostMeta } from "../api/blog"
import { theme } from "../helpers/theme"

export const PostDate: FunctionComponent<{ date: string }> = ({
  date: _date,
}) => {
  const date = new Date(_date)
  const dateStr = new Intl.DateTimeFormat().format(date)

  return (
    <time dateTime={date.toISOString()}>
      <em>{dateStr}</em>
    </time>
  )
}

const Ul = styled.ul`
  display: flex;
  flex-flow: row nowrap;
  padding: 0;

  a {
    text-decoration: none;
  }
`

const Li = styled.li`
  display: contents;
`

const Card = styled.div`
  color: ${theme.currentColor.background};
  background-color: ${theme.currentColor.foreground};
  width: 620px;

  padding: 1em;
  border-radius: 2px;

  display: flex;
  flex-flow: row nowrap;

  h3 {
    margin: 0;
    text-overflow: ellipsis;
    overflow: hidden;
    width: 100%;
  }

  time {
    margin-left: 1em;
  }
`

export const PostListItem: FunctionComponent<{ post: BlogPostMeta }> = ({
  post,
}) => {
  return (
    <Link href={`/blog/${post.slug}`}>
      <a>
        <Card>
          <h3>{post.title}</h3>
          <PostDate date={post.date} />
        </Card>
      </a>
    </Link>
  )
}

export type PostListProps = {
  posts: BlogPostMeta[]
}

export const PostList: FunctionComponent<PostListProps> = ({ posts }) => (
  <Ul>
    {posts.map((post) => (
      <Li key={post.slug}>
        <PostListItem post={post} />
      </Li>
    ))}
  </Ul>
)
