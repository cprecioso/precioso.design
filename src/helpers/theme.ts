export const theme = {
  colors: {
    light: { background: "rebeccapurple", foreground: "white" },
    dark: { background: "#181a1b", foreground: "rebeccapurple" }
  },
  fonts: {
    body: { family: "Zilla Slab, serif", weight: 300, size_pt: 14 },
    headers: { family: "Fuji, sans-serif", weight: 800, size_pt: 50 }
  },
  animation: {
    duration_ms: 300,
    delay_ms: 600,
    function: "ease"
  }
} as const

export type Theme = typeof theme
