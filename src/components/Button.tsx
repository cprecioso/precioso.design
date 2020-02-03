import { jsx } from "@emotion/core"
import styled from "@emotion/styled"
import { FunctionComponent } from "react"
import tc2 from "tinycolor2"

export type ButtonData = {
  name: string
  slug: string
  link: string
  backgroundColor: { hex: string }
  accentColor: { hex: string }
  image: { url: string }
}

const lightness = (hex: string) => new tc2(hex).toHsl().l

const ButtonLink = styled.a`
  color: inherit;
  text-decoration: inherit;
`

const ButtonBox = styled.div<{
  image: string
  frontColor: string
  backColor: string
  shadowColor: string
}>`
  width: 100px;
  height: 100px;
  margin: 5px;
  background-repeat: no-repeat;
  background-position: center center;
  background-size: 50%;
  display: flex;
  flex-flow: column nowrap;
  justify-content: center;
  border-radius: 2px;
  transition: background-position 0.3s ease, transform 0.3s ease,
    box-shadow 0.3s ease;
  text-align: center;

  background-image: url(${props => props.image});
  background-color: ${props => props.backColor};
  color: ${props => props.frontColor};
  box-shadow: 0 15px 30px -15px ${props => props.shadowColor};

  ${ButtonLink}:hover & {
    background-position: center -120%;
    transform: scale(1.1);

    box-shadow: 0 0 50px -15px ${props => props.shadowColor};
  }
`

const ButtonText = styled.span`
  opacity: 0;
  transition: opacity 0.3s ease;

  ${ButtonLink}:hover & {
    opacity: 1;
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
        image={button.image.url}
        backColor={button.backgroundColor.hex}
        frontColor={button.accentColor.hex}
        shadowColor={shadowColor}
      >
        <ButtonText>{button.name}</ButtonText>
      </ButtonBox>
    </ButtonLink>
  )
}
