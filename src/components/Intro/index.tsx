import Head from "next/head"
import { FunctionComponent } from "react"
import { renderMetaTags, SeoMetaTagType } from "react-datocms"
import { gql } from "../../api/gql"
import { useGQL } from "../../api/hooks"
import { ButtonRow } from "../ButtonRow"
import { Description, Header, Main, Name } from "./Styled"

const QUERY = gql`
  query IndexPage {
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

type Response = {
  information: {
    name: string
    description: string
    _seoMetaTags: SeoMetaTagType[]
  }
}

export const Intro: FunctionComponent = () => {
  const { data } = useGQL<Response>(QUERY)

  if (!data) return null
  const { information } = data

  return (
    <>
      <Head>{renderMetaTags(information._seoMetaTags)}</Head>
      <Header>
        <Name>{information.name}</Name>
      </Header>
      <Main>
        <Description
          dangerouslySetInnerHTML={{
            __html: information.description,
          }}
        />
        <ButtonRow />
      </Main>
    </>
  )
}
