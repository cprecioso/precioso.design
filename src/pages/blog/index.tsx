import { GetStaticProps } from "next"
import { preloaded, PreloaderProps } from "preswr"
import { PostList } from "../../components/PostList"
import { PreviewProvider } from "../../helpers/preview"

const PostPage = preloaded<{ preview?: boolean }>(({ preview = false }) => (
  <PreviewProvider value={preview}>
    <PostList />
  </PreviewProvider>
))

type Props = PreloaderProps<typeof PostPage>

export default PostPage.Component

export const getStaticProps: GetStaticProps<Props> = async ({
  preview = false,
}) => ({
  props: await PostPage.preloadData({ preview }),
})
