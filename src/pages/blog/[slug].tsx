import { GetStaticPaths, GetStaticProps, NextPage } from "next"
import Head from "next/head"
import { BlogPost, getPost, listPosts } from "../../api/blog"

type Props = { post: BlogPost }
type Query = { slug: string }

export default (({ post }) => (
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
)) as NextPage<Props>

export const getStaticProps: GetStaticProps<Props, Query> = async ({
  params,
  preview,
}) => {
  if (params?.slug == null) throw new Error("No slug")
  const post = await getPost(params.slug, preview)
  return { props: { post } }
}

export const getStaticPaths: GetStaticPaths<Query> = async () => {
  const posts = await listPosts()
  const paths = posts.map(({ slug }) => ({ params: { slug } }))
  return { paths, fallback: false }
}
