import { AppProps } from "next/app"
import Head from "next/head"
import Script from "next/script"
import "../styles/theme.global.css"

const App = ({ Component, pageProps, router }: AppProps) => (
  <>
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

    <Component {...pageProps} />
  </>
)

export default App
