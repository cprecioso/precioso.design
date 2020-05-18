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

const MainPage: NextPage<Props> = ({ information, buttons }) => (
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
  </PageWrapper>
)
export default MainPage

export const getStaticProps: GetStaticProps<Props> = async () => {
  const props = await fetchHomepageData()
  return { props }
}
