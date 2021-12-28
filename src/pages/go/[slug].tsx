import { GetStaticPaths, GetStaticProps, NextPage } from "next"
import { useRouter } from "next/router"
import { GetButtonPathDocument, gql, request } from "../../api/gql"

type Props = {}
type Params = { slug: string }

const Page: NextPage<Props> = () => {
  const router = useRouter()

  return <>{router.isFallback ? <p>Loading...</p> : <p>Not found</p>}</>
}
export default Page

/*#__PURE__*/ gql`
  query GetButtonPath($slug: String!) {
    button(filter: { slug: { eq: $slug } }) {
      link
    }
  }
`

export const getStaticProps: GetStaticProps<Props, Params> = async ({
  params,
}) => {
  if (!params) return { notFound: true }

  const destination = (
    await request(GetButtonPathDocument, { slug: params.slug })
  ).button?.link

  if (!destination) return { notFound: true }

  return { redirect: { permanent: false, destination } }
}

export const getStaticPaths: GetStaticPaths<Params> = async ({}) => ({
  paths: [],
  fallback: "blocking",
})
