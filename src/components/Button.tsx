import { jsx } from "@emotion/core"
import styled from "@emotion/styled"
import { FunctionComponent } from "react"
import { hexToRgb, rgbToHsl } from "../helpers/colors"
import { Theme } from "../helpers/theme"

export type ButtonData = {
  name: string
  slug: string
  link: string
  backgroundColor: { hex: string }
  accentColor: { hex: string }
  image: { data: string }
}

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
  margin: 0 10px;
  margin-left: 0;
  position: relative;
  transition: transform
      ${props =>
        `${(props.theme as Theme).animation.duration_ms}ms ${
          (props.theme as Theme).animation.function
        }`},
    color
      ${props =>
        `${(props.theme as Theme).animation.duration_ms}ms ${
          (props.theme as Theme).animation.function
        }`},
    background-color
      ${props =>
        `${(props.theme as Theme).animation.duration_ms}ms ${
          (props.theme as Theme).animation.function
        }`},
    box-shadow
      ${props =>
        `${(props.theme as Theme).animation.duration_ms}ms ${
          (props.theme as Theme).animation.function
        }`};
  border-radius: 2px;
  text-align: center;
  overflow: hidden;

  ${ButtonLink}:hover & {
    color: ${props => props.frontColor};
    background-position: center -120%;
    background-color: ${props => props.backColor};
    transform: scale(1.1);

    box-shadow: 0 0 50px -15px ${props => props.shadowColor};
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
  transition: transform
    ${props =>
      `${(props.theme as Theme).animation.duration_ms}ms ${
        (props.theme as Theme).animation.function
      }`};
  ${ButtonLink}:hover & {
    transform: translateY(-100%);
    transition: transform
      ${props =>
        `${(props.theme as Theme).animation.duration_ms}ms ${
          (props.theme as Theme).animation.delay_ms
        }ms ${(props.theme as Theme).animation.function}`};
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
  filter: opacity(0);
  transition: filter
    ${props =>
      `${(props.theme as Theme).animation.duration_ms}ms ${
        (props.theme as Theme).animation.function
      }`};

  ${ButtonLink}:hover & {
    filter: opacity(1);
    transition: filter
      ${props =>
        `${(props.theme as Theme).animation.duration_ms}ms ${
          (props.theme as Theme).animation.delay_ms
        }ms ${(props.theme as Theme).animation.function}`};
  }
`

export const Button: FunctionComponent<{ button: ButtonData }> = ({
  button
}) => {
  const shadowColor =
    lightness(button.accentColor.hex) === 1
      ? button.backgroundColor.hex
      : button.accentColor.hex

  return (
    <ButtonLink href={button.link}>
      <ButtonBox
        backColor={button.backgroundColor.hex}
        frontColor={button.accentColor.hex}
        shadowColor={shadowColor}
      >
        <SvgContainer dangerouslySetInnerHTML={{ __html: button.image.data }} />
        <ButtonTextContainer>
          <ButtonText>{button.name}</ButtonText>
        </ButtonTextContainer>
      </ButtonBox>
    </ButtonLink>
  )
}
