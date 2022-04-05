import { makeEmotionDocument } from "@cprecioso/next-emotion-ssr"
import NextDocument, { Head, Html, Main, NextScript } from "next/document"

export default makeEmotionDocument(
  class Document extends NextDocument {
    render(): JSX.Element {
      return (
        <Html>
          <Head>
            <link
              href="https://fonts.googleapis.com/css2?family=Zilla+Slab:ital,wght@0,300;1,300&display=swap"
              rel="stylesheet"
            />
          </Head>
          <body>
            <Main />
            <NextScript />
          </body>
        </Html>
      )
    }
  }
)
