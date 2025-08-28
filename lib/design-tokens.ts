// Design System Tokens - Senior UI Engineer approach
export const designTokens = {
  colors: {
    primary: {
      50: "rgb(239 246 255)",
      100: "rgb(219 234 254)",
      500: "rgb(59 130 246)",
      600: "rgb(37 99 235)",
      700: "rgb(29 78 216)",
      900: "rgb(30 58 138)",
    },
    semantic: {
      success: {
        bg: "rgb(240 253 244)",
        border: "rgb(187 247 208)",
        text: "rgb(22 163 74)",
      },
      warning: {
        bg: "rgb(255 251 235)",
        border: "rgb(254 215 170)",
        text: "rgb(217 119 6)",
      },
      danger: {
        bg: "rgb(254 242 242)",
        border: "rgb(254 202 202)",
        text: "rgb(220 38 38)",
      },
    },
  },
  spacing: {
    xs: "0.25rem",
    sm: "0.5rem",
    md: "1rem",
    lg: "1.5rem",
    xl: "2rem",
    "2xl": "3rem",
  },
  typography: {
    fontSizes: {
      xs: "0.75rem",
      sm: "0.875rem",
      base: "1rem",
      lg: "1.125rem",
      xl: "1.25rem",
      "2xl": "1.5rem",
      "3xl": "1.875rem",
      "4xl": "2.25rem",
    },
    fontWeights: {
      normal: "400",
      medium: "500",
      semibold: "600",
      bold: "700",
    },
  },
  shadows: {
    sm: "0 1px 2px 0 rgb(0 0 0 / 0.05)",
    md: "0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)",
    lg: "0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1)",
    xl: "0 20px 25px -5px rgb(0 0 0 / 0.1), 0 8px 10px -6px rgb(0 0 0 / 0.1)",
  },
  borderRadius: {
    sm: "0.375rem",
    md: "0.5rem",
    lg: "0.75rem",
    xl: "1rem",
    "2xl": "1.5rem",
  },
  transitions: {
    fast: "150ms cubic-bezier(0.4, 0, 0.2, 1)",
    normal: "300ms cubic-bezier(0.4, 0, 0.2, 1)",
    slow: "500ms cubic-bezier(0.4, 0, 0.2, 1)",
  },
} as const

export type DesignTokens = typeof designTokens
