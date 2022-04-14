/**
 * Input is a 6-digit hex code starting with #
 */
export const isLightColor = (hex: string) => {
  const THRESHOLD = 0.8

  const parseHexPart = (n: number) => parseInt(hex.slice(n, 2 + n), 16)

  const r = parseHexPart(1)
  const g = parseHexPart(3)
  const b = parseHexPart(5)

  const l = Math.max(r, g, b)
  const s = l - Math.min(r, g, b)

  const lightness = 2 * l - s

  return lightness >= 2 * 255 * THRESHOLD
}
