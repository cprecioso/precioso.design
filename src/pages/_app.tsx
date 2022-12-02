import type { AppProps } from "next/app"
import Head from "next/head"
import Script from "next/script"
import { FormattersProvider } from "../helpers/formatters"
import "../styles/theme.global.css"

const App = ({ Component, pageProps, router }: AppProps) => (
  <FormattersProvider>
    <Head>
      <meta charSet="utf-8" />
      <meta httpEquiv="x-ua-compatible" content="ie=edge" />
      <meta name="viewport" content="width=device-width, initial-scale=1" />
      <meta httpEquiv="content-type" content="text/html; charset=utf-8" />
      <meta name="language" content={router.locale} />
      <meta httpEquiv="content-language" content={router.locale} />
      <meta httpEquiv="cleartype" content="on" />
      <link rel="icon" href="/favicon-64.png" sizes="64x64" />
      <link rel="icon" href="/favicon-32.png" sizes="32x32" />
      <link rel="icon" href="/favicon.png" sizes="16x16" />
      <link rel="shortcut icon" href="/favicon.ico" sizes="16x16" />
    </Head>

    <Script src="https://www.googletagmanager.com/gtag/js?id=G-Y63PG7L4HY" />
    <Script>{`
      window.dataLayer = window.dataLayer || [];
      function gtag(){dataLayer.push(arguments);}
      gtag('js', new Date());
      gtag('config', 'G-Y63PG7L4HY');
    `}</Script>

    <Component {...pageProps} />
  </FormattersProvider>
)

export default App
