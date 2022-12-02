import { request } from "../../api/gql"
import { isLightColor } from "../../helpers/color"
import styles from "./styles.module.css"

export const Button = async ({ id }: { id: string }) => {
  const { button } = await request(
    /* GraphQL */ `
      query Button($id: ItemId!) {
        button(filter: { id: { eq: $id } }) {
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
          linksToIdentity
        }
      }
    `,
    { id }
  )

  const imageData = await (await fetch(button.image.url)).text()

  const shadowColor = isLightColor(button.accentColor.hex)
    ? button.backgroundColor.hex
    : button.accentColor.hex

  const cssVariables: Record<string, string> = {
    "--button-color-front": button.accentColor.hex,
    "--button-color-back": button.backgroundColor.hex,
    "--button-color-shadow": shadowColor,
  }

  return (
    <a
      className={styles.button_link}
      href={`/go/${button.slug}`}
      rel={button.linksToIdentity ? "me" : undefined}
      style={cssVariables}
    >
      <div className={styles.button_box}>
        <div
          className={styles.svg_container}
          dangerouslySetInnerHTML={{ __html: imageData }}
        />
        <div className={styles.button_text_container}>
          <span className={styles.button_text}>{button.name}</span>
        </div>
      </div>
    </a>
  )
}
