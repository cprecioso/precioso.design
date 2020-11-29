import styled from "@emotion/styled"
import { GetStaticPaths, GetStaticProps, NextPage } from "next"
import Head from "next/head"
import Link from "next/link"
import { useRouter } from "next/router"
import { BlogPost, getPost, listPosts } from "../../api/blog"
import {
  Description,
  Header,
  Main,
  Name,
  PageWrapper,
} from "../../components/MainPageComponents"
import { PostDate } from "../../components/PostList"

type Props = { post?: BlogPost }
type Query = { slug: string }

const Article = styled(Description.withComponent("article"))`
  img {
    max-width: 100%;
    position: sticky;
  }

  strong {
    text-decoration: none;
    font-weight: bold;

    &::after,
    &::before {
      content: "*";
      opacity: 0.5;
    }
  }

  em {
    &::after,
    &::before {
      content: "_";
      opacity: 0.5;
    }
  }
`

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
    <PageWrapper>
      <Head>
        <title>{post.title}</title>
      </Head>
      <Header>
        <Link href="/">
          <a>&larr;&nbsp;Carlos Precioso</a>
        </Link>
        <Name>{post.title}</Name>
        <PostDate date={post.date} />
      </Header>
      <Main>
        <Article
          dangerouslySetInnerHTML={{
            __html: post.text,
          }}
        />
      </Main>
    </PageWrapper>
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
