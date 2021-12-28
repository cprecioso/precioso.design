import styled from "@emotion/styled"
import useSWR from "swr"
import { GetButtonDocument, gql, useData } from "../api/gql"
import { hexToRgb, rgbToHsl } from "../helpers/colors"
import { theme } from "../helpers/theme"

/*#__PURE__*/ gql`
  query GetButton($slug: String!) {
    button(filter: { slug: { eq: $slug } }) {
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
      linksToIdentity
    }
  }
`

const lightness = (hex: string) => rgbToHsl(hexToRgb(hex)).l / 100

const ButtonLink = styled.a`
  color: inherit;
  text-decoration: inherit;
`

const ButtonBox = styled.div<{
  frontColor: string
  backColor: string
  shadowColor: string
}>`
  width: 100px;
  height: 100px;
  margin: 0;
  margin-right: 10px;
  margin-bottom: 10px;
  position: relative;
  transition: transform ${theme.animation.duration_ms}ms
      ${theme.animation.function},
    color ${theme.animation.duration_ms}ms ${theme.animation.function},
    background-color ${theme.animation.duration_ms}ms
      ${theme.animation.function},
    box-shadow ${theme.animation.duration_ms}ms ${theme.animation.function};
  border-radius: 2px;
  text-align: center;
  overflow: hidden;

  ${ButtonLink}:hover & {
    color: ${(props) => props.frontColor};
    background-position: center -120%;
    background-color: ${(props) => props.backColor};
    transform: scale(1.1);

    box-shadow: 0 0 50px -15px ${(props) => props.shadowColor};
    border-width: 0px;
  }
`

const SvgContainer = styled.div`
  display: flex;
  flex-flow: column nowrap;
  justify-content: center;
  align-items: center;
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;

  svg {
    height: 50%;
    width: 50%;
  }

  transform: translateY(0);
  transition: transform ${theme.animation.duration_ms}ms
    ${theme.animation.function};
  ${ButtonLink}:hover & {
    transform: translateY(-100%);
    transition: transform ${theme.animation.duration_ms}ms
      ${theme.animation.delay_ms}ms ${theme.animation.function};
  }
`

const ButtonTextContainer = styled.div`
  display: flex;
  flex-flow: column nowrap;
  justify-content: center;
  align-items: center;
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
`

const ButtonText = styled.span`
  opacity: 0;
  transition: opacity ${theme.animation.duration_ms}ms
    ${theme.animation.function};

  ${ButtonLink}:hover & {
    opacity: 1;
    transition: opacity ${theme.animation.duration_ms}ms
      ${theme.animation.delay_ms}ms ${theme.animation.function};
  }
`

const imageDataFetcher = async (url: string) => (await fetch(url)).text()

export const Button = ({ slug }: { slug: string }) => {
  const { button } = useData(GetButtonDocument, { slug })
  const { data: imageData = "" } = useSWR(button?.image?.url, imageDataFetcher)

  if (!button) return null

  const accentColor = button.accentColor?.hex ?? "#FFFFFF"
  const backgroundColor = button.backgroundColor?.hex ?? "#000000"

  const shadowColor =
    lightness(accentColor) === 1 ? backgroundColor : accentColor

  return (
    <ButtonLink
      href={`/go/${button.slug}`}
      rel={button.linksToIdentity ? "me" : undefined}
    >
      <ButtonBox
        backColor={backgroundColor}
        frontColor={accentColor}
        shadowColor={shadowColor}
      >
        <SvgContainer dangerouslySetInnerHTML={{ __html: imageData }} />

        <ButtonTextContainer>
          <ButtonText>{button.name}</ButtonText>
        </ButtonTextContainer>
      </ButtonBox>
    </ButtonLink>
  )
}
