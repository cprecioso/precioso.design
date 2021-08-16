import { SeoMetaTagType } from "react-datocms"
import { gql, request } from "./_gql"

const HOMEPAGE_QUERY = gql`
  query IndexPage {
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

export interface InformationModel {
  name: string
  description: string
  _seoMetaTags: SeoMetaTagType[]
}

export interface Color {
  hex: string
}

export interface Image {
  url: string
}

type ResponseButtonModel = {
  name: string
  slug: string
  link: string
  backgroundColor: Color
  accentColor: Color
  image: Image
}

export interface ButtonModel extends ResponseButtonModel {
  image: Image & { data: string }
}

type HomepageResponse = {
  information: InformationModel
  allButtons: ResponseButtonModel[]
}

export const fetchHomepageData = async (previewMode?: boolean) => {
  const data = (await request(
    HOMEPAGE_QUERY,
    undefined,
    previewMode
  )) as HomepageResponse

  const buttons = data.allButtons.map(async (button) => {
    const imageData = await (await fetch(button.image.url)).text()

    const buttonModel: ButtonModel = {
      ...button,
      image: { ...button.image, data: imageData },
    }
    return buttonModel
  })

  return {
    information: data.information,
    buttons: await Promise.all(buttons),
  }
}
