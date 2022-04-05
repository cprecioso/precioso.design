import { css, Global } from "@emotion/react"

const woff2File = new URL("./Fuji-Bold.woff2", import.meta.url).href
const woffFile = new URL("./Fuji-Bold.woff", import.meta.url).href
const eotFile = new URL("./Fuji-Bold.eot", import.meta.url).href

export const Fonts = () => (
  <Global
    styles={css`
      @font-face {
        font-family: "Fuji";
        src: url(${woff2File}) format("woff2"), url(${woffFile}) format("woff"),
          url(${eotFile}) format("embedded-opentype");
        font-weight: 800;
      }
    `}
  />
)
