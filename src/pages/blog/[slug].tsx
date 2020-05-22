import { GetStaticPaths, GetStaticProps } from "next"
import { useRouter } from "next/dist/client/router"
import { preloaded, PreloaderProps } from "preswr"
import { gql, request } from "../../api/gql"
import { BlogPost } from "../../components/BlogPost"
import { PreviewProvider } from "../../helpers/preview"

const PostPage = preloaded<{ slug: string; preview?: boolean }>(
  ({ slug, preview = false }) => {
    const router = useRouter()
    if (router?.isFallback) return null

    return (
      <PreviewProvider value={preview}>
        <main>
          <BlogPost slug={slug} changeTitle />
        </main>
      </PreviewProvider>
    )
  }
)

type Props = PreloaderProps<typeof PostPage>
type Params = { slug: string }

export default PostPage.Component

export const getStaticProps: GetStaticProps<Props, Params> = async ({
  preview = false,
  params,
}) => {
  if (params?.slug == null) throw new Error("No slug")
  return { props: await PostPage.preloadData({ slug: params.slug, preview }) }
}

export const getStaticPaths: GetStaticPaths<Params> = async () => {
  const res: { allPosts: { slug: string }[] } = await request(gql`
    query PostList {
      allPosts {
        slug
      }
    }
  `)

  const paths = res.allPosts.map(({ slug }) => ({ params: { slug } }))

  return { paths, fallback: false }
}
