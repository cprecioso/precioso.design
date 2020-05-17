import { GetStaticProps } from "next"
import { IndexPageProps } from "../components/IndexPage"
import { fetchData } from "../helpers/data"
export { IndexPage as default } from "../components/IndexPage"

export const getStaticProps: GetStaticProps<IndexPageProps> = async () => {
  const props = await fetchData()
  return { props }
}
