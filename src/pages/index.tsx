import { GetStaticProps } from "next"
import { fetchHomepageData } from "../api/homepage"
import { Props } from "../components/MainPage"

export { MainPage as default } from "../components/MainPage"

export const getStaticProps: GetStaticProps<Props> = async ({}) => {
  const props = await fetchHomepageData()
  return { props, revalidate: 60 }
}
