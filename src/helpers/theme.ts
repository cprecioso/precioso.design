export const theme = {
  colors: {
    light: { background: "rebeccapurple", foreground: "white" },
    dark: { background: "#0f080e", foreground: "#a573d6" }
  },
  fonts: {
    body: { family: "Zilla Slab, Rockwell, serif", weight: 300, size_pt: 14 },
    headers: {
      family:
        'Fuji, Impact, Haettenschweiler, "Franklin Gothic Bold", Charcoal, "Helvetica Inserat", "Bitstream Vera Sans Bold", "Arial Black", sans-serif',
      weight: 800,
      size_pt: 50
    }
  },
  animation: {
    duration_ms: 300,
    delay_ms: 600,
    function: "ease"
  }
} as const

export type Theme = typeof theme
