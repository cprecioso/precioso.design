import styled from "@emotion/styled"
import { GetStaticProps, NextPage } from "next"
import Link from "next/link"

const Input = styled.input`
  color: inherit;
  background-color: inherit;
  border: 1px solid;
  border-color: inherit;
  font: inherit;
  padding: 0.3em;

  &:focus {
    outline: none;
  }
`

const Button = Input.withComponent("button")

type Props = { isPreview: boolean }

const Preview: NextPage<Props> = ({ isPreview }) => (
  <div>
    <h1>Preview mode</h1>
    <p>Preview mode is {isPreview ? "enabled" : "disabled"}</p>
    {isPreview ? (
      <p>
        <Link href="/api/preview">
          <Button type="button">Disable</Button>
        </Link>
      </p>
    ) : (
      <form method="POST" action="/api/preview">
        <label>
          <Input placeholder="Password" name="password" type="password" />
        </label>
        <br />
        <Input type="submit" />
      </form>
    )}
  </div>
)

export default Preview

export const getStaticProps: GetStaticProps<Props> = async ({ preview }) => ({
  props: { isPreview: !!preview },
})
