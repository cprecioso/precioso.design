import styled from "@emotion/styled"
import { GetStaticPaths, GetStaticProps, NextPage } from "next"
import hydrate from "next-mdx-remote/hydrate"
import renderToString, {
  IntrinsicComponentDictionary,
  RenderedMDX,
} from "next-mdx-remote/render-to-string"
import Head from "next/head"
import Image from "next/image"
import Link from "next/link"
import { useRouter } from "next/router"
import { renderMetaTags } from "react-datocms"
import addImageDimensions, {
  Options as AddImageDimensionsOptions,
} from "rehype-add-image-dimensions"
import { BlogPost, getPost, listPosts } from "../../api/blog"
import {
  Description,
  Header,
  Main,
  Name,
  PageWrapper,
} from "../../components/MainPageComponents"
import { PostDate } from "../../components/PostList"

type Props = Partial<{ post: Omit<BlogPost, "text">; content: RenderedMDX }>
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

  del {
    &::after,
    &::before {
      content: "~";
      opacity: 0.5;
    }
  }
`

const PostPage: NextPage<Props> = ({ post, content }) => {
  const router = useRouter()

  if (router.isFallback) {
    return (
      <main>
        <p>Loading...</p>
      </main>
    )
  }

  if (!post || !content) {
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
        {renderMetaTags(post._seoMetaTags)}
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
        <Article>{hydrate(content, { components })}</Article>
      </Main>
    </PageWrapper>
  )
}

export default PostPage

const allowedDomains = require("../../config").images_domains
const components: IntrinsicComponentDictionary = {
  img: (props) => {
    if (
      props.src &&
      allowedDomains.includes(new URL(props.src).hostname) &&
      props.width &&
      props.height
    ) {
      // @ts-expect-error
      return <Image {...props} />
    } else {
      return <img {...props} />
    }
  },
}

export const getStaticProps: GetStaticProps<Props, Query> = async ({
  params,
  preview,
}) => {
  if (params?.slug == null)
    return { redirect: { destination: "/blog", permanent: true } }

  const rawPost = await getPost(params.slug, preview)
  if (!rawPost) return { notFound: true, revalidate: 60 }

  const post = { ...rawPost, text: null }
  const content = await renderToString(rawPost.text, {
    components,
    mdxOptions: {
      rehypePlugins: [
        [addImageDimensions, { allowedDomains } as AddImageDimensionsOptions],
      ],
    },
  })

  return { props: { post, content }, revalidate: 60 }
}

export const getStaticPaths: GetStaticPaths<Query> = async () => {
  const posts = await listPosts()
  const paths = posts.map(({ slug }) => ({ params: { slug } }))
  return { paths, fallback: true }
}
