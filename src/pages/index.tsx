import { GetStaticProps } from "next"
import { preloaded, PreloaderProps } from "preswr"
import { Intro } from "../components/Intro"
import { PostList } from "../components/PostList"
import { PreviewProvider } from "../helpers/preview"

const MainPage = preloaded<{ preview?: boolean }>(({ preview = false }) => (
  <PreviewProvider value={preview}>
    <Intro />
    <PostList limit={5} />
  </PreviewProvider>
))

type Props = PreloaderProps<typeof MainPage>

export default MainPage.Component

export const getStaticProps: GetStaticProps<Props> = async ({
  preview = false,
}) => {
  const props = await MainPage.preloadData({ preview })
  return { props }
}
