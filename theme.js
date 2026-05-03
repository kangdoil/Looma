/**
 * Looma Design Tokens
 * Source: Figma – Looma / node 158:8692
 * Auto-extracted from Figma variables. CSS custom properties are defined in app/globals.css.
 */

export const primitives = {
  black: "var(--looma-black)",
  white: "var(--looma-white)",
  gray: {
    950: "var(--looma-gray-950)",
    900: "var(--looma-gray-900)",
    850: "var(--looma-gray-850)",
    800: "var(--looma-gray-800)",
    750: "var(--looma-gray-750)",
    700: "var(--looma-gray-700)",
    650: "var(--looma-gray-650)",
    400: "var(--looma-gray-400)",
    200: "var(--looma-gray-200)",
    100: "var(--looma-gray-100)",
    50: "var(--looma-gray-50)",
  },
  blue: {
    800: "var(--looma-blue-800)",
    400: "var(--looma-blue-400)",
    200: "var(--looma-blue-200)",
  },
  yellow: {
    100: "var(--looma-yellow-100)",
    200: "var(--looma-yellow-200)",
  },
};

export const colors = {
  bg: {
    primary: "var(--color-bg-primary)",
    surface: "var(--color-bg-surface)",
    elevated: "var(--color-bg-elevated)",
    card: "var(--color-bg-card)",
    input: "var(--color-bg-input)",
    glass: "var(--color-bg-glass)",
    mainBlur: "var(--color-bg-main-blur)",
    blackBlur: "var(--color-bg-black-blur)",
  },
  text: {
    primary: "var(--color-text-primary)",
    secondary: "var(--color-text-secondary)",
    tertiary: "var(--color-text-tertiary)",
    disabled: "var(--color-text-disabled)",
  },
  component: {
    primary: "var(--color-component-primary)",
    secondary: "var(--color-component-secondary)",
    tertiary: "var(--color-component-tertiary)",
    highlight: "var(--color-component-highlight)",
  },
  border: {
    default: "var(--color-border-default)",
    subtle: "var(--color-border-subtle)",
    accent: "var(--color-border-accent)",
    highlight: "var(--color-border-highlight)",
  },
};

export const typography = {
  fontFamily: "Pretendard Variable",
  scale: {
    displayLg: {
      fontSize: "48px",
      fontWeight: 700,
      lineHeight: "56px",
      letterSpacing: "-2px",
    },
    headingSm: {
      fontSize: "24px",
      fontWeight: 600,
      lineHeight: "32px",
      letterSpacing: "-2px",
    },
    bodyLg: {
      fontSize: "17px",
      fontWeight: 600,
      lineHeight: "24px",
      letterSpacing: "-2px",
    },
    bodyMd: {
      fontSize: "16px",
      fontWeight: 400,
      lineHeight: "24px",
      letterSpacing: "-2px",
    },
    bodySm: {
      fontSize: "14px",
      fontWeight: 400,
      lineHeight: "20px",
      letterSpacing: "-2px",
    },
    caption: {
      fontSize: "12px",
      fontWeight: 400,
      lineHeight: "16px",
      letterSpacing: "-2px",
    },
  },
};

export const spacing = {
  1: "4px",
  "6px": "6px",
  2: "8px",
  "10px": "10px",
  3: "12px",
  4: "16px",
  5: "20px",
  6: "24px",
  8: "32px",
  10: "40px",
  12: "48px",
};

export const radius = {
  xs: "var(--radius-xs)",
  sm: "var(--radius-sm)",
  md: "var(--radius-md)",
  lg: "var(--radius-lg)",
  full: "var(--radius-full)",
};

export const shadows = {
  card: "var(--shadow-card)",
  overlay: "var(--shadow-overlay)",
  subtle: "var(--shadow-subtle)",
  accentBlue: "var(--shadow-accent-blue)",
  float: "var(--shadow-float)",
  sm: "var(--shadow-sm)",
  md: "var(--shadow-md)",
  image: "var(--shadow-image)",
  innerHighlight: "var(--shadow-inner-highlight)",
  innerGlow: "var(--shadow-inner-glow)",
};
