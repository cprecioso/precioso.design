import { EmotionApp } from "@cprecioso/next-emotion-ssr/app"
import { css, Global } from "@emotion/core"
import { ThemeProvider } from "emotion-theming"
import Head from "next/head"
import { theme, Theme } from "../helpers/theme"

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
      <link rel="icon" href="/favicon-64.png" sizes="64x64" />
      <link rel="icon" href="/favicon-32.png" sizes="32x32" />
      <link rel="icon" href="/favicon.png" sizes="16x16" />
      <link rel="shortcut icon" href="/favicon.ico" sizes="16x16" />
    </Head>
    <ThemeProvider theme={theme}>
      <Global
        styles={(theme: Theme) => css`
          @import url("https://fonts.googleapis.com/css?family=Zilla+Slab:300,300i&display=swap&subset=latin-ext");

          @font-face {
            font-family: "Fuji";
            src: url("/fonts/Fuji-Bold.woff2") format("woff2"),
              url("/fonts/Fuji-Bold.woff") format("woff"),
              url("/fonts/Fuji-Bold.eot") format("embedded-opentype");
            font-weight: 800;
          }

          body {
            background-color: ${theme.colors.light.background};
            color: ${theme.colors.light.foreground};
            font-family: ${theme.fonts.body.family};
            font-weight: ${theme.fonts.body.weight};
            font-size: ${theme.fonts.body.size_pt}pt;

            transition: background-color ${theme.animation.duration_ms}ms
                ${theme.animation.function},
              color ${theme.animation.duration_ms}ms ${theme.animation.function};

            @media (prefers-color-scheme: dark) {
              background-color: ${theme.colors.dark.background};
              color: ${theme.colors.dark.foreground};
            }
          }
        `}
      />
      <EmotionApp {...props} />
    </ThemeProvider>
  </>
)
