import { GetStaticPaths, GetStaticProps, NextPage } from "next"
import Head from "next/head"
import Link from "next/link"
import { useRouter } from "next/router"
import { BlogPost, getPost, listPosts } from "../../api/blog"

type Props = { post?: BlogPost }
type Query = { slug: string }

export default (({ post }) => {
  const router = useRouter()

  if (router.isFallback) {
    return (
      <main>
        <p>Loading...</p>
      </main>
    )
  }

  if (!post) {
    return (
      <main>
        <p>
          Not found.{" "}
          <Link href="/blog">
            <a>Go back</a>
          </Link>
        </p>
      </main>
    )
  }

  return (
    <main>
      <Head>
        <title>{post.title}</title>
      </Head>
      <header>
        <h1>{post.title}</h1>
        <time dateTime={post.date}>{post.date}</time>
      </header>
      <article dangerouslySetInnerHTML={{ __html: post.text }} />
    </main>
  )
}) as NextPage<Props>

export const getStaticProps: GetStaticProps<Props, Query> = async ({
  params,
  preview,
}) => {
  try {
    if (params?.slug == null) throw new Error("No slug")
    const post = await getPost(params.slug, preview)
    return { props: { post }, revalidate: 60 }
  } catch (e) {
    return { props: {}, revalidate: 60 }
  }
}

export const getStaticPaths: GetStaticPaths<Query> = async () => {
  const posts = await listPosts()
  const paths = posts.map(({ slug }) => ({ params: { slug } }))
  return { paths, fallback: true }
}
