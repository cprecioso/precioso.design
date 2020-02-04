interface ColorBase {
  type: string
  /** 0.0 to 1.0 */ a: number
}

export interface RGBColor extends ColorBase {
  type: "rgb"
  /** 0 to 255 */ r: number
  /** 0 to 255 */ g: number
  /** 0 to 255 */ b: number
}

export interface HSLColor extends ColorBase {
  type: "hsl"
  /** 0 to 360 */ h: number
  /** 0 to 100 */ s: number
  /** 0 to 100 */ l: number
}

export type Color = RGBColor | HSLColor

export const rgb = (
  /** 0 to 255 */ r: number,
  /** 0 to 255 */ g: number,
  /** 0 to 255 */ b: number,
  /** 0.0 to 1.0 */ a = 1.0
): RGBColor => ({ type: "rgb", r, g, b, a })

export const hsl = (
  /** 0 to 360 */ h: number,
  /** 0 to 100 */ s: number,
  /** 0 to 100 */ l: number,
  /** 0.0 to 1.0 */ a = 1.0
): HSLColor => ({ type: "hsl", h, s, l, a })

export const hexToRgb = (hex: string) => {
  const startsWithPound = hex[0] === "#"

  let r1 = "0",
    r2 = "0",
    g1 = "0",
    g2 = "0",
    b1 = "0",
    b2 = "0"
  if (hex.length === (startsWithPound ? 4 : 3)) {
    const [r, g, b] = startsWithPound ? hex.slice(1) : hex
    r1 = r2 = r
    g1 = g2 = g
    b1 = b2 = b
  } else {
    ;[r1, r2, g1, g2, b1, b2] = startsWithPound ? hex.slice(1) : hex
  }

  return rgb(
    Number.parseInt(r1 + r2, 16),
    Number.parseInt(g1 + g2, 16),
    Number.parseInt(b1 + b2, 16),
    1.0
  )
}

export const rgbToHsl = ({ r, g, b, a }: RGBColor) => {
  ;(r /= 255), (g /= 255), (b /= 255)

  let max = Math.max(r, g, b),
    min = Math.min(r, g, b)
  let h = 0,
    s,
    l = (max + min) / 2

  if (max == min) {
    h = s = 0 // achromatic
  } else {
    let d = max - min
    s = l > 0.5 ? d / (2 - max - min) : d / (max + min)

    switch (max) {
      case r:
        h = (g - b) / d + (g < b ? 6 : 0)
        break
      case g:
        h = (b - r) / d + 2
        break
      case b:
        h = (r - g) / d + 4
        break
    }

    h /= 6
  }

  return hsl(h * 360, s * 100, l * 100, a)
}

export const mix = (
  source: HSLColor,
  target: HSLColor,
  /** 0.0 to 1.0 */ ratio: number
) => {
  const h = source.h + (target.h - source.h) * ratio
  const s = source.s + (target.s - source.s) * ratio
  const l = source.l + (target.l - source.l) * ratio
  const a = source.a + (target.a - source.a) * ratio
  return hsl(h, s, l, a)
}

export const hslToCss = ({ h, s, l, a }: HSLColor) =>
  `hsla(${h}deg,${s}%,${l}%,${a})`
