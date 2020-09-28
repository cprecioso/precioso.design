import { GetStaticProps, NextPage } from "next"
import Head from "next/head"
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
import PostList from "./blog"

type Props = {
  information: InformationModel
  posts: BlogPostMeta[]
  buttons: ButtonModel[]
}

const MainPage: NextPage<Props> = ({ information, buttons, posts }) => (
  <PageWrapper>
    <Head>{renderMetaTags(information._seoMetaTags)}</Head>
    <Header>
      <Name>{information.name}</Name>
    </Header>
    <Main>
      <Description
        dangerouslySetInnerHTML={{ __html: information.description }}
      />
      <ButtonRow buttons={buttons} />
    </Main>
    <PostList posts={posts} />
  </PageWrapper>
)
export default MainPage

export const getStaticProps: GetStaticProps<Props> = async ({ preview }) => {
  const props = await fetchHomepageData(preview)
  return { props, revalidate: 60 }
}
