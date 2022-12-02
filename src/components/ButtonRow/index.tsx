import { request } from "../../api/gql"
import { Button } from "../Button"
import styles from "./styles.module.css"

export const ButtonRow = async () => {
  const { allButtons } = await request(/* GraphQL */ `
    query ButtonRow {
      allButtons {
        id
      }
    }
  `)

  return (
    <section className={styles.button_row}>
      {allButtons.map((button: any) => (
        /* @ts-expect-error Server Component */
        <Button key={button.id} id={button.id} />
      ))}
    </section>
  )
}
