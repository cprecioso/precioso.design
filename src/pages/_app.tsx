import { EmotionApp } from "@cprecioso/next-emotion-ssr/app"
import { css, Global } from "@emotion/core"
import Head from "next/head"

export default (props: any) => (
  <>
    <Head>
      <meta charSet="utf-8" />
      <meta httpEquiv="x-ua-compatible" content="ie=edge" />
      <meta name="viewport" content="width=device-width, initial-scale=1" />
      <meta httpEquiv="content-type" content="text/html; charset=utf-8" />
      <meta name="language" content="en-US" />
      <meta httpEquiv="content-language" content="en-US" />
      <meta httpEquiv="cleartype" content="on" />
      <link rel="icon" href="/favicon-32x32.png" sizes="32x32" />
      <link rel="icon" href="/favicon.png" sizes="16x16" />
      <link rel="shortcut icon" href="/favicon.ico" sizes="16x16" />
    </Head>
    <Global
      styles={css`
        @import url("https://fonts.googleapis.com/css?family=Zilla+Slab:300,300i&display=swap&subset=latin-ext");

        body {
          background: rebeccapurple;
          color: white;
          font-family: "Zilla Slab";
          font-weight: 300;
        }
      `}
    />
    <EmotionApp {...props} />
  </>
)
