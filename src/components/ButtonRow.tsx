import styled from "@emotion/styled"
import { FunctionComponent } from "react"
import { ButtonModel } from "../api/homepage"
import { breakpoint } from "../helpers/theme"
import { Button } from "./Button"

export const ButtonRowWrapper = styled.section`
  display: flex;
  flex-flow: column nowrap;
  margin-left: 15px;

  @media (max-width: ${breakpoint}) {
    flex-flow: row wrap;
    margin-left: 0;
  }
`

export type Props = { buttons: ButtonModel[] }

export const ButtonRow: FunctionComponent<Props> = ({ buttons }) => (
  <ButtonRowWrapper>
    {buttons.map((button) => (
      <Button key={button.slug} button={button} />
    ))}
  </ButtonRowWrapper>
)
