import Head from "next/head"
import { FunctionComponent } from "react"
import { gql } from "../api/gql"
import { useGQL } from "../api/hooks"

const QUERY = gql`
  query GetPost($slug: String) {
    post(filter: { slug: { eq: $slug } }) {
      date
      slug
      text(markdown: true)
      title
    }
  }
`

type Response = {
  post: { date: string; slug: string; text: string; title: string }
}

export type Props = { slug: string; changeTitle?: boolean }

export const BlogPost: FunctionComponent<Props> = ({ slug, changeTitle }) => {
  const { data } = useGQL<Response>(QUERY, { slug })
  if (!data?.post) return null

  const { post } = data

  return (
    <div>
      {changeTitle ? (
        <Head>
          <title>{post.title}</title>
        </Head>
      ) : null}
      <header>
        <h1>{post.title}</h1>
        <time dateTime={post.date}>{post.date}</time>
      </header>
      <article dangerouslySetInnerHTML={{ __html: post.text }} />
    </div>
  )
}
