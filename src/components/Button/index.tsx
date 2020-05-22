import { jsx } from "@emotion/core"
import { FunctionComponent } from "react"
import { useSVG } from "../../api/hooks"
import { hexToRgb, rgbToHsl } from "../../helpers/colors"
import {
  ButtonBox,
  ButtonLink,
  ButtonText,
  ButtonTextContainer,
  SvgContainer,
} from "./Styled"

export type Props = {
  button: {
    name: string
    slug: string
    link: string
    backgroundColor: { hex: string }
    accentColor: { hex: string }
    image: { url: string }
  }
}

const lightness = (hex: string) => rgbToHsl(hexToRgb(hex)).l / 100

export const Button: FunctionComponent<Props> = ({ button }) => {
  const shadowColor =
    lightness(button.accentColor.hex) === 1
      ? button.backgroundColor.hex
      : button.accentColor.hex

  const { data: svgData } = useSVG(button.image.url)

  return (
    <ButtonLink href={button.link}>
      <ButtonBox
        backColor={button.backgroundColor.hex}
        frontColor={button.accentColor.hex}
        shadowColor={shadowColor}
      >
        <SvgContainer
          dangerouslySetInnerHTML={{ __html: svgData ?? "Not loaded" }}
        />
        <ButtonTextContainer>
          <ButtonText>{button.name}</ButtonText>
        </ButtonTextContainer>
      </ButtonBox>
    </ButtonLink>
  )
}
