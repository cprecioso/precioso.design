import { hex2hsl } from "@csstools/convert-colors"
import { FunctionComponent, useMemo } from "react"
import { ButtonModel } from "../../api/homepage"
import styles from "./styles.module.css"

const lightness = (hex: string) => hex2hsl(hex)[2] / 100

export const Button: FunctionComponent<{ button: ButtonModel }> = ({
  button,
}) => {
  const cssVariables: Record<string, string> = useMemo(() => {
    const shadowColor =
      lightness(button.accentColor.hex) >= 0.8
        ? button.backgroundColor.hex
        : button.accentColor.hex

    return {
      "--button-color-front": button.accentColor.hex,
      "--button-color-back": button.backgroundColor.hex,
      "--button-color-shadow": shadowColor,
    }
  }, [button])

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
