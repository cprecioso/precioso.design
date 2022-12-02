import Head from "next/head"
import { renderMetaTags } from "react-datocms"
import type { ButtonModel, InformationModel } from "../../api/homepage"
import { ButtonRow } from "../ButtonRow"
import { NameHeader } from "../NameHeader"
import styles from "./styles.module.css"

export type Props = {
  information: InformationModel
  buttons: ButtonModel[]
}

export const MainPage = ({ information, buttons }: Props) => (
  <div className={styles.page_wrapper}>
    <Head>{renderMetaTags(information._seoMetaTags)}</Head>
    <NameHeader>{information.name}</NameHeader>
    <div className={styles.row}>
      <main className={styles.main}>
        <div
          className={styles.description}
          dangerouslySetInnerHTML={{ __html: information.description }}
        />
        <ButtonRow buttons={buttons} />
      </main>
    </div>
  </div>
)
