import styled from "@emotion/styled"
import { FunctionComponent } from "react"
import { gql } from "../api/gql"
import { useGQL } from "../api/hooks"
import { breakpoint } from "../helpers/theme"
import { Button, Props as ButtonProps } from "./Button"

const QUERY = gql`
  query AllButtons {
    allButtons {
      name
      slug
      link
      backgroundColor {
        hex
      }
      accentColor {
        hex
      }
      image {
        url
      }
    }
  }
`

type Response = {
  allButtons: ButtonProps["button"][]
}

const ButtonRowWrapper = styled.section`
  display: flex;
  flex-flow: column nowrap;
  margin-left: 15px;

  @media (max-width: ${breakpoint}) {
    flex-flow: row wrap;
    margin-left: 0;
  }
`

export type Props = {}

export const ButtonRow: FunctionComponent<Props> = () => {
  const { data } = useGQL<Response>(QUERY)

  return (
    <ButtonRowWrapper>
      {data?.allButtons.map((button) => (
        <Button key={button.slug} button={button} />
      ))}
    </ButtonRowWrapper>
  )
}
