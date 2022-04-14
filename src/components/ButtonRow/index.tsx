import type { ButtonModel } from "../../api/homepage"
import { Button } from "../Button"
import styles from "./styles.module.css"

export type Props = { buttons: ButtonModel[] }

export const ButtonRow = ({ buttons }: Props) => (
  <section className={styles.button_row}>
    {buttons.map((button) => (
      <Button key={button.slug} button={button} />
    ))}
  </section>
)
