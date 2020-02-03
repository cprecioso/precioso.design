import { css, Global } from "@emotion/core"
import { NextPage } from "next"
import Head from "next/head"
import { renderMetaTags, SeoMetaTagType } from "react-datocms"
import { Button, ButtonData } from "../components/Button"
import { gql } from "../helpers/gql"

const IndexPage: NextPage<{
  information: {
    name: string
    description: string
    _seoMetaTags: SeoMetaTagType[]
  }
  allButtons: ButtonData[]
}> = ({ information, allButtons }) => (
  <>
    <Head>{renderMetaTags(information._seoMetaTags)}</Head>
    <Global
      styles={css`
        body {
          font-family: system-ui, "Helvetica Neue", Helvetica, Arial, sans-serif;
          font-weight: 300;
          margin: 25px;
          display: flex;
          flex-flow: column nowrap;
          justify-content: center;
          text-align: center;
        }
      `}
    />
    <header
      css={css`
        content: "";
        color: #f00;
        font-size: 4vw;
        height: 70vh;
        display: flex;
        flex-flow: column nowrap;
        justify-content: center;
        align-items: center;
        min-height: 200px;
      `}
    >
      <h1
        css={css`
          margin: 0;
          font-weight: 500;
        `}
      >
        {information.name}
      </h1>
      <div
        css={css`
          p {
            font-size: 15px;
            max-width: 500px;
          }
        `}
        dangerouslySetInnerHTML={{ __html: information.description }}
      />
    </header>
    <section
      css={css`
        display: flex;
        flex-flow: row wrap;
        justify-content: center;
      `}
    >
      {allButtons.map(button => (
        <Button key={button.slug} button={button} />
      ))}
    </section>
  </>
)

IndexPage.getInitialProps = async () => {
  return await gql`
    {
      information {
        name
        description
        _seoMetaTags {
          attributes
          content
          tag
        }
      }
      allButtons {
        name
        slug
        link
        backgroundColor {
          hex
        }
        accentColor {
          hex
        }
        image {
          url
        }
      }
    }
  `
}

export default IndexPage
