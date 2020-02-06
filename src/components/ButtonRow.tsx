import styled from "@emotion/styled"
import { breakpoint } from "../helpers/theme"

export const ButtonRow = styled.section`
  display: flex;
  flex-flow: column nowrap;
  margin-left: 15px;

  @media (max-width: ${breakpoint}) {
    flex-flow: row wrap;
    margin-left: 0;
  }
`
