import { jsx } from "@emotion/core"
import React, { FunctionComponent } from "react"

const wrapTextNode = (node: Text, className: string) => {
  const newNodes = node.textContent?.split(" ").flatMap(word => {
    const span = document.createElement("span")
    span.textContent = word
    span.className = className

    const space = document.createTextNode(" ")

    return [span, space]
  })

  if (!newNodes) return

  node.replaceWith(...newNodes)
}

const wrapElementNodes = (el: Element, className: string) => {
  el.childNodes.forEach(node => {
    switch (node.nodeType) {
      case Node.TEXT_NODE:
        wrapTextNode(node as Text, className)
        break
      case Node.ELEMENT_NODE:
        wrapElementNodes(node as Element, className)
        break
    }
  })
}

export const wrapWords = (htmlStr = "", className: string) => {
  const div = document.createElement("div")
  div.innerHTML = htmlStr

  wrapElementNodes(div, className)

  return div.innerHTML
}

export const TextEffect: FunctionComponent<JSX.IntrinsicElements["div"] & {
  effectClassName: string
  dangerouslySetInnerHTML: { __html: string }
}> = ({ dangerouslySetInnerHTML, effectClassName, ...props }) => {
  const [__html, setHtml] = React.useState(dangerouslySetInnerHTML.__html)
  React.useEffect(() => {
    setHtml(wrapWords(dangerouslySetInnerHTML.__html, effectClassName))
  }, [dangerouslySetInnerHTML.__html])

  return <div {...props} dangerouslySetInnerHTML={{ __html }}></div>
}
