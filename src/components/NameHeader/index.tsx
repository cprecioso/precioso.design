import type { ReactNode } from "react"
import styles from "./styles.module.css"

export const NameHeader = ({
  children,
  rotated,
}: {
  children?: ReactNode
  rotated?: boolean
}) => (
  <header className={`${styles.header} ${rotated ? styles.rotated : ""}`}>
    <h1 className={styles.name}>{children}</h1>
  </header>
)
