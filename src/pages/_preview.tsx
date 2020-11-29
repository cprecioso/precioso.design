import styled from "@emotion/styled"
import { GetStaticProps, NextPage } from "next"
import Head from "next/head"
import Link from "next/link"
import { theme } from "../helpers/theme"

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

const Hr = styled.hr`
  border: 1px solid ${theme.currentColor.foreground};
`

const Button = Input.withComponent("button")

type Props = { isPreview: boolean }

const Preview: NextPage<Props> = ({ isPreview }) => (
  <div>
    <Head>
      <title>Preview mode</title>
    </Head>
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
    <Hr />
    <p>Go to:</p>
    <ul>
      <Link href="/">
        <a>
          <li>Home</li>
        </a>
      </Link>
      <Link href="/blog">
        <a>
          <li>Blog</li>
        </a>
      </Link>
    </ul>
  </div>
)

export default Preview

export const getStaticProps: GetStaticProps<Props> = async ({ preview }) => ({
  props: { isPreview: !!preview },
})
