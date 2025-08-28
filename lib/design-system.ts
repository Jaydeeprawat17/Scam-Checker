// Sophisticated Design System - Minimal & Elegant
export const designSystem = {
  colors: {
    // Monochromatic with single accent
    neutral: {
      50: "rgb(250 250 250)",
      100: "rgb(245 245 245)",
      200: "rgb(229 229 229)",
      300: "rgb(212 212 212)",
      400: "rgb(163 163 163)",
      500: "rgb(115 115 115)",
      600: "rgb(82 82 82)",
      700: "rgb(64 64 64)",
      800: "rgb(38 38 38)",
      900: "rgb(23 23 23)",
      950: "rgb(9 9 9)",
    },
    // Single sophisticated accent
    accent: {
      50: "rgb(248 250 252)",
      100: "rgb(241 245 249)",
      500: "rgb(100 116 139)", // Sophisticated blue-gray
      600: "rgb(71 85 105)",
      900: "rgb(15 23 42)",
    },
    // Semantic colors - very subtle
    success: "rgb(34 197 94)",
    warning: "rgb(251 146 60)",
    danger: "rgb(239 68 68)",
  },
  typography: {
    fontFamily: {
      sans: ["Inter", "system-ui", "sans-serif"],
      mono: ["JetBrains Mono", "monospace"],
    },
    fontSize: {
      xs: ["0.75rem", { lineHeight: "1rem" }],
      sm: ["0.875rem", { lineHeight: "1.25rem" }],
      base: ["1rem", { lineHeight: "1.5rem" }],
      lg: ["1.125rem", { lineHeight: "1.75rem" }],
      xl: ["1.25rem", { lineHeight: "1.75rem" }],
      "2xl": ["1.5rem", { lineHeight: "2rem" }],
      "3xl": ["1.875rem", { lineHeight: "2.25rem" }],
      "4xl": ["2.25rem", { lineHeight: "2.5rem" }],
      "5xl": ["3rem", { lineHeight: "1" }],
    },
    fontWeight: {
      normal: "400",
      medium: "500",
      semibold: "600",
    },
  },
  spacing: {
    px: "1px",
    0.5: "0.125rem",
    1: "0.25rem",
    2: "0.5rem",
    3: "0.75rem",
    4: "1rem",
    6: "1.5rem",
    8: "2rem",
    12: "3rem",
    16: "4rem",
    24: "6rem",
  },
  borderRadius: {
    none: "0",
    sm: "0.25rem",
    md: "0.375rem",
    lg: "0.5rem",
    xl: "0.75rem",
    full: "9999px",
  },
} as const
