import { css, Global } from "@emotion/react"
import { AppProps } from "next/app"
import Head from "next/head"
import Script from "next/script"
import { FunctionComponent } from "react"
import { theme } from "../helpers/theme"

const App: FunctionComponent<AppProps> = ({ Component, pageProps }) => (
  <>
    <Head>
      <meta charSet="utf-8" />
      <meta httpEquiv="x-ua-compatible" content="ie=edge" />
      <meta name="viewport" content="width=device-width, initial-scale=1" />
      <meta httpEquiv="content-type" content="text/html; charset=utf-8" />
      <meta name="language" content="en-US" />
      <meta httpEquiv="content-language" content="en-US" />
      <meta httpEquiv="cleartype" content="on" />
      <meta name="theme-color" content={theme.colorSchemes.light.background} />
      <link rel="icon" href="/favicon-64.png" sizes="64x64" />
      <link rel="icon" href="/favicon-32.png" sizes="32x32" />
      <link rel="icon" href="/favicon.png" sizes="16x16" />
      <link rel="shortcut icon" href="/favicon.ico" sizes="16x16" />
      <meta name="monetization" content="$precioso.design" />

      <link
        href="https://fonts.googleapis.com/css2?family=Zilla+Slab:ital,wght@0,300;1,300&display=swap"
        rel="stylesheet"
      />
    </Head>

    <Script
      id="analytics"
      src="https://www.googletagmanager.com/gtag/js?id=UA-60468768-4"
    />
    <Script id="analytics-setup">{`
        window.dataLayer = window.dataLayer || [];
        function gtag(){dataLayer.push(arguments);}
        gtag('js', new Date());
        gtag('config', 'UA-60468768-4');
      `}</Script>

    <Global
      styles={css`
        @font-face {
          font-family: "Fuji";
          src: url("/fonts/Fuji-Bold.woff2") format("woff2"),
            url("/fonts/Fuji-Bold.woff") format("woff"),
            url("/fonts/Fuji-Bold.eot") format("embedded-opentype");
          font-weight: 800;
        }

        html {
          --background-color: ${theme.colorSchemes.light.background};
          --foreground-color: ${theme.colorSchemes.light.foreground};

          @media (prefers-color-scheme: dark) {
            --background-color: ${theme.colorSchemes.dark.background};
            --foreground-color: ${theme.colorSchemes.dark.foreground};
          }
        }

        body {
          background-color: ${theme.currentColor.background};
          color: ${theme.currentColor.foreground};
          font-family: ${theme.fonts.body.family};
          font-weight: ${theme.fonts.body.weight};
          font-size: ${theme.fonts.body.size_pt}pt;

          transition: background-color ${theme.animation.duration_ms}ms
              ${theme.animation.function},
            color ${theme.animation.duration_ms}ms ${theme.animation.function};
        }

        ::selection {
          background-color: ${theme.colorSchemes.dark.background};
          color: ${theme.colorSchemes.light.foreground};

          @media (prefers-color-scheme: dark) {
            background-color: ${theme.colorSchemes.dark.foreground};
            color: ${theme.colorSchemes.light.foreground};
          }
        }

        a {
          color: inherit;
        }
      `}
    />
    <Component {...pageProps} />
  </>
)

export default App
