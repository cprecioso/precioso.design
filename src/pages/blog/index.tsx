import { GetStaticProps, NextPage } from "next"
import Link from "next/link"
import { listPosts } from "../../api/blog"
import {
  Header,
  Main,
  Name,
  PageWrapper,
} from "../../components/MainPageComponents"
import { PostList, PostListProps } from "../../components/PostList"

const BlogPage: NextPage<PostListProps> = (props) => (
  <PageWrapper>
    <Header>
      <Link href="/">
        <a>&larr;&nbsp;Back</a>
      </Link>
      <Name>Blog</Name>
    </Header>
    <Main>
      <PostList {...props} />
    </Main>
  </PageWrapper>
)

export default BlogPage

export const getStaticProps: GetStaticProps<PostListProps> = async ({
  preview,
}) => ({
  props: { posts: await listPosts(preview) },
  revalidate: 60,
})
