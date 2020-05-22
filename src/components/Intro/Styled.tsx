import styled from "@emotion/styled"
import { breakpoint, theme } from "../../helpers/theme"

export const PageWrapper = styled.div`
  margin: 25px;
  display: flex;
  flex-flow: column nowrap;
  justify-content: center;
  text-align: center;
  max-width: 620px;

  display: flex;
  flex-flow: column nowrap;
  text-align: left;
`

export const Header = styled.header`
  margin-bottom: 1em;
`

export const Name = styled.h1`
  font-family: ${theme.fonts.headers.family};
  font-size: ${theme.fonts.headers.size_pt}pt;
  font-weight: ${theme.fonts.headers.weight};

  text-transform: uppercase;
  margin: 0;
`

export const Main = styled.main`
  display: flex;
  flex-flow: row nowrap;

  @media (max-width: ${breakpoint}) {
    flex-direction: column-reverse;
  }
`

export const Description = styled.div`
  border-top: 1px solid;
  border-bottom: 1px solid;

  b,
  strong {
    text-decoration: underline;
    font-weight: inherit;
  }
`
