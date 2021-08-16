import styled from "@emotion/styled"
import { GetStaticProps, NextPage } from "next"
import Head from "next/head"
import { renderMetaTags } from "react-datocms"
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

type Props = {
  information: InformationModel
  buttons: ButtonModel[]
}

const Row = styled.div`
  display: flex;
  flex-flow: row wrap;
`

const MainPage: NextPage<Props> = ({ information, buttons }) => (
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
    </Row>
  </PageWrapper>
)
export default MainPage

export const getStaticProps: GetStaticProps<Props> = async ({ preview }) => {
  const props = await fetchHomepageData(preview)
  return { props, revalidate: 60 }
}
