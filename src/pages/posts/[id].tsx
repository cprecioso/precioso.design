import type { GetStaticPaths, GetStaticProps } from "next"
import { retrievePublishedPosts } from "../../api/tumblr/api"

interface PostInfo {
  type: string
  id: string
  timestamp: number
  title?: string
  body: string
}

type Params = { id: string }

interface Props {
  post: PostInfo
}

const BlogPage = ({ post }: Props) => {
  return <article dangerouslySetInnerHTML={{ __html: post.body }} />
}

export default BlogPage

export const getStaticProps: GetStaticProps<Props, Params> = async ({
  params,
}) => {
  const {
    posts: [rawPost],
  } = await retrievePublishedPosts(process.env.TUMBLR_BLOG_UID!, {
    id: params!.id,
  })

  if (rawPost.type !== "text") throw new Error("Not a text post")

  const post: PostInfo = {
    type: rawPost.type,
    id: rawPost.id_string,
    timestamp: 1000 * rawPost.timestamp,
    title: rawPost.title || rawPost.summary,
    body: rawPost.body,
  }

  return { props: { post }, revalidate: 60 }
}

export const getStaticPaths: GetStaticPaths<Params> = async () => {
  const { posts } = await retrievePublishedPosts(process.env.TUMBLR_BLOG_UID!)

  return {
    paths: posts.map((post) => ({ params: { id: post.id_string } })),
    fallback: "blocking",
  }
}
