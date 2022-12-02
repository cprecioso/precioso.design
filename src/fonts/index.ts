import { Zilla_Slab } from "@next/font/google"
import localFont from "@next/font/local"

export const zillaSlab = Zilla_Slab({
  variable: "--font-zilla-slab",
  display: "swap",
  weight: ["300"],
  style: ["normal", "italic"],
  subsets: ["latin", "latin-ext"],
})

export const fuji = localFont({
  variable: "--font-fuji",
  display: "swap",
  weight: "800",
  style: "normal",
  src: "./assets/Fuji-Bold.woff2",
})
