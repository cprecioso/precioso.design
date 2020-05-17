import "isomorphic-fetch"
import { SeoMetaTagType } from "react-datocms"
import { IndexPageProps } from "../pages/index"
import { gql } from "./gql"

type ResponseData = {
  information: {
    name: string
    description: string
    _seoMetaTags: SeoMetaTagType[]
  }
  allButtons: {
    name: string
    slug: string
    link: string
    backgroundColor: { hex: string }
    accentColor: { hex: string }
    image: { url: string }
  }[]
}

export const fetchData = async (): Promise<IndexPageProps> => {
  const res: ResponseData = await gql`
    {
      information {
        name
        description
        _seoMetaTags {
          attributes
          content
          tag
        }
      }
      allButtons {
        name
        slug
        link
        backgroundColor {
          hex
        }
        accentColor {
          hex
        }
        image {
          url
        }
      }
    }
  `

  return {
    ...res,
    allButtons: await Promise.all(
      res.allButtons.map(async (button) => ({
        ...button,
        image: {
          data: await (await fetch(button.image.url)).text(),
        },
      }))
    ),
  }
}
