/// <reference types="next" />
/// <reference types="next/types/global" />

declare module "next-mdx-remote/render-to-string" {
  import { ComponentType } from "react"

  export type AnyComponentDictionary = Record<string, ComponentType>
  export type IntrinsicComponentDictionary = {
    [P in keyof JSX.IntrinsicElements]?: ComponentType<JSX.IntrinsicElements[P]>
  }

  export interface RenderedMDX {
    compiledSource: string
    renderedOutput: string
    scope: any
  }

  function renderToString(
    source: string,
    options?: {
      components?: IntrinsicComponentDictionary
      mdxOptions?: any
      scope?: AnyComponentDictionary
    }
  ): Promise<RenderedMDX>

  export default renderToString
}

declare module "next-mdx-remote/hydrate" {
  import {
    IntrinsicComponentDictionary,
    RenderedMDX,
  } from "next-mdx-remote/render-to-string"
  import { ReactElement } from "react"

  function hydrate(
    source: RenderedMDX,
    options?: { components?: IntrinsicComponentDictionary }
  ): ReactElement

  export default hydrate
}
