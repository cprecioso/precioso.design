import styled from "@emotion/styled"
import { NextPage } from "next"
import Head from "next/head"
import { renderMetaTags, SeoMetaTagType } from "react-datocms"
import { Button, ButtonData } from "../components/Button"
import { fetchData } from "../helpers/data"
import { Theme } from "../helpers/theme"

const PageWrapper = styled.div`
  margin: 25px;
  display: flex;
  flex-flow: column nowrap;
  justify-content: center;
  text-align: center;
`

const Header = styled.header`
  display: flex;
  flex-flow: column nowrap;
  justify-content: center;
  align-items: flex-start;
  margin-bottom: 1em;
  text-align: left;
`

const Name = styled.h1`
  font-family: ${props => (props.theme as Theme).fonts.headers.family};
  font-size: ${props => (props.theme as Theme).fonts.headers.size_pt}pt;
  font-weight: ${props => (props.theme as Theme).fonts.headers.weight};

  text-transform: uppercase;
  margin: 0;
`

const Description = styled.div`
  max-width: 500px;
  border-bottom: 1px solid;

  b,
  strong {
    text-decoration: underline;
    font-weight: inherit;
  }
`

const ButtonRow = styled.section`
  display: flex;
  flex-flow: row wrap;
  justify-content: flex-start;
`

export type IndexPageProps = {
  information: {
    name: string
    description: string
    _seoMetaTags: SeoMetaTagType[]
  }
  allButtons: ButtonData[]
}

const IndexPage: NextPage<IndexPageProps> = ({ information, allButtons }) => (
  <>
    <Head>{renderMetaTags(information._seoMetaTags)}</Head>
    <PageWrapper>
      <Header>
        <Name>{information.name}</Name>
        <Description
          dangerouslySetInnerHTML={{ __html: information.description }}
        />
      </Header>
      <ButtonRow>
        {allButtons.map(button => (
          <Button key={button.slug} button={button} />
        ))}
      </ButtonRow>
    </PageWrapper>
  </>
)

IndexPage.getInitialProps = async () => await fetchData()

export default IndexPage
