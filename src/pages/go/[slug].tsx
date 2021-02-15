import { GetStaticPaths, GetStaticProps, NextPage } from "next"
import { useRouter } from "next/router"
import { fetchHomepageData } from "../../api/homepage"

type Props = {}
type Params = { slug: string }

const Page: NextPage<Props> = () => {
  const router = useRouter()

  return <>{router.isFallback ? <p>Loading...</p> : <p>Not found</p>}</>
}
export default Page

export const getStaticProps: GetStaticProps<Props, Params> = async ({
  params,
}) => {
  if (!params) return { notFound: true }

  const destination = (await fetchHomepageData(false)).buttons.find(
    (button) => button.slug === params.slug
  )?.link

  if (!destination) return { notFound: true }

  return { redirect: { permanent: false, destination } }
}

export const getStaticPaths: GetStaticPaths<Params> = async ({}) => {
  const data = await fetchHomepageData(false)
  const paths = data.buttons.map(({ slug }) => ({ params: { slug } }))
  return { paths, fallback: true }
}
