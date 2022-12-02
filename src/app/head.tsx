import { renderMetaTags } from "react-datocms/dist/esm/Seo/renderMetaTags"
import { request } from "../api/gql"

const Head = async () => {
  const HOLA = /* GraphQL */ `
    query RootHead {
      information {
        _seoMetaTags {
          attributes
          content
          tag
        }
      }
    }
  `
  const { information } = await request(HOLA)

  return <>{renderMetaTags(information._seoMetaTags)}</>
}

export default Head
