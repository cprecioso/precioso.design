import styled from "@emotion/styled"
import { NextPage } from "next"
import Head from "next/head"
import { renderMetaTags } from "react-datocms"
import { GetHomepageDataDocument, gql, useData } from "../api/gql"
import { ButtonRow } from "../components/ButtonRow"
import {
  Description,
  Header,
  Main,
  Name,
  PageWrapper,
} from "../components/MainPageComponents"

/*#__PURE__*/ gql`
  query GetHomepageData {
    information {
      name
      description
      _seoMetaTags {
        attributes
        content
        tag
      }
    }
  }
`

const Row = styled.div`
  display: flex;
  flex-flow: row wrap;
`

const MainPage: NextPage = ({}) => {
  const { information } = useData(GetHomepageDataDocument)

  return (
    <PageWrapper>
      {information?._seoMetaTags ? (
        <Head>{renderMetaTags(information!._seoMetaTags)}</Head>
      ) : null}
      <Header>
        {information?.name ? <Name>{information!.name}</Name> : null}
      </Header>
      <Row>
        <Main>
          {information?.description ? (
            <Description
              dangerouslySetInnerHTML={{ __html: information!.description! }}
            />
          ) : null}
          <ButtonRow />
        </Main>
      </Row>
    </PageWrapper>
  )
}
export default MainPage
