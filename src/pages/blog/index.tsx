import { GetStaticProps } from "next"
import { listPosts } from "../../api/blog"
import { PostList, PostListProps } from "../../components/PostList"

export default PostList

export const getStaticProps: GetStaticProps<PostListProps> = async ({
  preview,
}) => ({
  props: { posts: await listPosts(preview) },
})
