import { ButtonModel } from "../../api/homepage"
import { isLightColor } from "../../helpers/color"
import styles from "./styles.module.css"

export const Button = ({ button }: { button: ButtonModel }) => {
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
          dangerouslySetInnerHTML={{ __html: button.image.data }}
        />
        <div className={styles.button_text_container}>
          <span className={styles.button_text}>{button.name}</span>
        </div>
      </div>
    </a>
  )
}
