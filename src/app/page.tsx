import { MainPage } from "../components/MainPage"

const IndexPage = async () => (
  /* @ts-expect-error Server Component */
  <MainPage />
)

export default IndexPage

export const revalidate = 60
