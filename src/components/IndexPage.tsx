import styled from "@emotion/styled"
import Head from "next/head"
import { FunctionComponent } from "react"
import { renderMetaTags, SeoMetaTagType } from "react-datocms"
import { breakpoint, theme } from "../helpers/theme"
import { Button, ButtonData } from "./Button"
import { ButtonRow } from "./ButtonRow"

const PageWrapper = styled.div`
  margin: 25px;
  display: flex;
  flex-flow: column nowrap;
  justify-content: center;
  text-align: center;
  max-width: 620px;

  display: flex;
  flex-flow: column nowrap;
  text-align: left;
`

const Header = styled.header`
  margin-bottom: 1em;
`

const Name = styled.h1`
  font-family: ${theme.fonts.headers.family};
  font-size: ${theme.fonts.headers.size_pt}pt;
  font-weight: ${theme.fonts.headers.weight};

  text-transform: uppercase;
  margin: 0;
`

const Main = styled.main`
  display: flex;
  flex-flow: row nowrap;

  @media (max-width: ${breakpoint}) {
    flex-direction: column-reverse;
  }
`

const Description = styled.div`
  border-top: 1px solid;
  border-bottom: 1px solid;

  b,
  strong {
    text-decoration: underline;
    font-weight: inherit;
  }
`

export type IndexPageProps = {
  information: {
    name: string
    description: string
    _seoMetaTags: SeoMetaTagType[]
  }
  allButtons: ButtonData[]
}

export const IndexPage: FunctionComponent<IndexPageProps> = ({
  information,
  allButtons,
}) => (
  <PageWrapper>
    <Head>{renderMetaTags(information._seoMetaTags)}</Head>
    <Header>
      <Name>{information.name}</Name>
    </Header>
    <Main>
      <Description
        dangerouslySetInnerHTML={{ __html: information.description }}
      />
      <ButtonRow>
        {allButtons.map((button) => (
          <Button key={button.slug} button={button} />
        ))}
      </ButtonRow>
    </Main>
  </PageWrapper>
)
