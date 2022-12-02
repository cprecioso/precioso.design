import type { GetStaticProps } from "next"
import { retrievePublishedPosts } from "../../api/tumblr/api"
import { NameHeader } from "../../components/NameHeader"
import { PostInfo, PostList } from "../../components/PostList"

interface Props {
  posts: PostInfo[]
}

const BlogPage = ({ posts }: Props) => (
  <div className="wrapper">
    <NameHeader>Carlos Precioso</NameHeader>

    <div className="post_wrapper">
      <PostList posts={posts} />
    </div>

    <style jsx>{`
      .wrapper {
        height: 100vh;
        overflow: hidden;
      }

      .post_wrapper {
        flex: 1 1 auto;
        height: 100%;
        flex: 0 0 auto;
        overflow-x: scroll;
        overflow-y: hidden;
      }
    `}</style>
  </div>
)

export default BlogPage

export const getStaticProps: GetStaticProps<Props> = async () => {
  const data = await retrievePublishedPosts(process.env.TUMBLR_BLOG_UID!)

  const posts = data.posts
    .map((post): PostInfo => {
      if (post.type !== "text") throw new Error("Not a text post")

      return {
        type: post.type,
        id: post.id_string,
        timestamp: 1000 * post.timestamp,
        title: post.title || post.summary,
      }
    })
    .sort((a, b) => b.timestamp - a.timestamp)

  return { props: { posts }, revalidate: 60 }
}
