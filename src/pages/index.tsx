import styled from "@emotion/styled"
import { GetStaticProps, NextPage } from "next"
import Head from "next/head"
import Link from "next/link"
import { renderMetaTags } from "react-datocms"
import { BlogPostMeta } from "../api/blog"
import {
  ButtonModel,
  fetchHomepageData,
  InformationModel,
} from "../api/homepage"
import { ButtonRow } from "../components/ButtonRow"
import {
  Description,
  Header,
  Main,
  Name,
  PageWrapper,
} from "../components/MainPageComponents"
import { PostList } from "../components/PostList"

type Props = {
  information: InformationModel
  posts: BlogPostMeta[]
  buttons: ButtonModel[]
}

const Row = styled.div`
  display: flex;
  flex-flow: row wrap;
`

const PostsContainer = styled.div`
  max-width: 520px;
  width: 100%;
`

const MainPage: NextPage<Props> = ({ information, buttons, posts }) => (
  <PageWrapper>
    <Head>{renderMetaTags(information._seoMetaTags)}</Head>
    <Header>
      <Name>{information.name}</Name>
    </Header>
    <Row>
      <Main>
        <Description
          dangerouslySetInnerHTML={{ __html: information.description }}
        />
        <ButtonRow buttons={buttons} />
      </Main>
      {posts.length > 0 ? (
        <PostsContainer>
          <h2>
            <Link href="/blog">
              <a>Latest posts</a>
            </Link>
          </h2>
          <PostList posts={posts} />
        </PostsContainer>
      ) : null}
    </Row>
  </PageWrapper>
)
export default MainPage

export const getStaticProps: GetStaticProps<Props> = async ({ preview }) => {
  const props = await fetchHomepageData(preview)
  return { props, revalidate: 60 }
}
