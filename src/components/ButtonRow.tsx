import styled from "@emotion/styled"
import { GetAllButtonsDocument, gql, useData } from "../api/gql"
import { breakpoint } from "../helpers/theme"
import { Button } from "./Button"

/*#__PURE__*/ gql`
  query GetAllButtons {
    allButtons {
      slug
    }
  }
`

export const ButtonRowWrapper = styled.section`
  display: flex;
  flex-flow: column nowrap;
  margin-left: 15px;

  @media (max-width: ${breakpoint}) {
    flex-flow: row wrap;
    margin-left: 0;
  }
`

export const ButtonRow = ({}) => {
  const { allButtons } = useData(GetAllButtonsDocument)

  return (
    <ButtonRowWrapper>
      {allButtons.map((button) =>
        button.slug ? <Button key={button.slug} slug={button.slug} /> : null
      )}
    </ButtonRowWrapper>
  )
}
