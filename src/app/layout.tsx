import Script from "next/script"
import type { ReactNode } from "react"
import { fuji, zillaSlab } from "../fonts"
import "../styles/theme.global.css"

const favicon64 = new URL("./assets/favicon-64.png", import.meta.url).href
const favicon32 = new URL("./assets/favicon-32.png", import.meta.url).href
const favicon16 = new URL("./assets/favicon.png", import.meta.url).href
const favicon = new URL("./assets/favicon.ico", import.meta.url).href

const locale = "en"

const RootLayout = ({ children }: { children?: ReactNode }) => (
  <html lang={locale} className={`${zillaSlab.variable} ${fuji.variable}`}>
    <head>
      <meta charSet="utf-8" />
      <meta httpEquiv="x-ua-compatible" content="ie=edge" />
      <meta name="viewport" content="width=device-width, initial-scale=1" />
      <meta httpEquiv="content-type" content="text/html; charset=utf-8" />
      <meta name="language" content={locale} />
      <meta httpEquiv="content-language" content={locale} />
      <meta httpEquiv="cleartype" content="on" />
      <link rel="icon" href={favicon64} sizes="64x64" />
      <link rel="icon" href={favicon32} sizes="32x32" />
      <link rel="icon" href={favicon16} sizes="16x16" />
      <link rel="shortcut icon" href={favicon} />
    </head>

    <body>{children}</body>

    <Script src="https://www.googletagmanager.com/gtag/js?id=G-Y63PG7L4HY" />
    <Script id="gtm-config">{`
        window.dataLayer = window.dataLayer || [];
        function gtag(){dataLayer.push(arguments);}
        gtag('js', new Date());
        gtag('config', 'G-Y63PG7L4HY');
      `}</Script>
  </html>
)

export default RootLayout
