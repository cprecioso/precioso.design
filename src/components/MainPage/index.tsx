import { request } from "../../api/gql"
import { ButtonRow } from "../ButtonRow"
import styles from "./styles.module.css"

export const MainPage = async () => {
  const { information } = await request(/* GraphQL */ `
    query MainPage {
      information {
        name
        description
      }
    }
  `)

  return (
    <div className={styles.page_wrapper}>
      <header className={styles.header}>
        <h1 className={styles.name}>{information.name}</h1>
      </header>

      <div className={styles.row}>
        <main className={styles.main}>
          <div
            className={styles.description}
            dangerouslySetInnerHTML={{ __html: information.description }}
          />

          {/* @ts-expect-error Server Component */}
          <ButtonRow />
        </main>
      </div>
    </div>
  )
}
