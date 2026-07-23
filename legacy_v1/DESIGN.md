---
version: 1.0.0
name: izwan-portfolio-design-system
description: "Design specification for Muhammad Izwan Ahmad's single-page freelance software engineer portfolio website. Built with strict brand color compliance (#F5F9FA canvas, #0E7490 primary cyan, #06B6D4 accent cyan, #0C1A20 text), Plus Jakarta Sans typography, clean card elevation without side-strokes or left borders, zero emojis, and high-contrast readable layouts."

colors:
  primary: "#0E7490"
  primary-hover: "#0C637B"
  accent: "#06B6D4"
  accent-hover: "#0891B2"
  text: "#0C1A20"
  text-muted: "#64748B"
  canvas: "#F5F9FA"
  canvas-tint: "#EBF6F8"
  card-bg: "#FFFFFF"
  border: "#E2EEF1"
  border-strong: "#CBD5E1"
  status-green: "#22C55E"
  badge-award-bg: "#FFFBEB"
  badge-award-text: "#B45309"
  badge-award-border: "#FCD34D"

typography:
  font-family: "'Plus Jakarta Sans', -apple-system, BlinkMacSystemFont, sans-serif"
  font-mono: "'Fira Code', Consolas, Monaco, monospace"
  hero-heading:
    fontSize: "clamp(2.5rem, 5vw + 1rem, 4.25rem)" # 68px
    fontWeight: 800
    lineHeight: 1.1
    letterSpacing: "-1px"
  section-heading:
    fontSize: "clamp(2rem, 3.5vw, 2.5rem)" # 40px
    fontWeight: 700
    lineHeight: 1.25
    letterSpacing: "-0.5px"
  section-label:
    fontSize: "13px"
    fontWeight: 800
    letterSpacing: "0.1em"
    textTransform: "uppercase"
  card-title:
    fontSize: "20px"
    fontWeight: 700
    lineHeight: 1.3
  body:
    fontSize: "17px"
    fontWeight: 400
    lineHeight: 1.75
  body-sm:
    fontSize: "15px"
    fontWeight: 400
    lineHeight: 1.6
  caption:
    fontSize: "13px"
    fontWeight: 600
    lineHeight: 1.4

rounded:
  xs: "4px"
  sm: "6px"
  md: "12px"
  lg: "20px"
  pill: "9999px"

spacing:
  xs: "8px"
  sm: "12px"
  md: "16px"
  lg: "24px"
  xl: "32px"
  section: "100px"

elevation:
  card: "0 2px 16px rgba(14, 116, 144, 0.07)"
  card-hover: "0 12px 32px rgba(14, 116, 144, 0.14)"
  nav-scrolled: "0 4px 20px rgba(12, 26, 32, 0.06)"

components:
  card:
    backgroundColor: "{colors.card-bg}"
    border: "1px solid {colors.border}"
    borderLeft: "NONE — do not use left accent lines or vertical strokes"
    rounded: "{rounded.md}"
    boxShadow: "{elevation.card}"
    transition: "all 0.2s ease"

  card-hover:
    transform: "translateY(-6px)"
    boxShadow: "{elevation.card-hover}"
    borderLeft: "NONE — retain standard subtle border"

  button-primary:
    backgroundColor: "{colors.primary}"
    textColor: "#FFFFFF"
    rounded: "{rounded.md}"
    padding: "14px 28px"
    fontWeight: 600

  button-outline:
    backgroundColor: "transparent"
    borderColor: "{colors.primary}"
    textColor: "{colors.primary}"
    rounded: "{rounded.md}"
    padding: "14px 28px"

  service-card:
    backgroundColor: "{colors.card-bg}"
    border: "1px solid {colors.border}"
    borderLeft: "NONE — do not use left accent strokes"
    rounded: "{rounded.md}"
    padding: "32px"

  service-card-hover:
    backgroundColor: "{colors.canvas-tint}"
    transform: "translateY(-6px)"
    boxShadow: "{elevation.card-hover}"
    borderLeft: "NONE"

---

# DESIGN.md Specifications

## 1. Visual Theme & Atmosphere
The portfolio employs a modern, high-craft SaaS layout. The canvas (`#F5F9FA`) is clean and open, featuring a subtle geometric dot pattern (`#0E7490` at 8% opacity) in the Hero section. Content is presented in clean white surface cards (`#FFFFFF`) with subtle 1px structural borders (`#E2EEF1`) and soft cyan-tinted elevation shadows.

## 2. Strict Design Rules & Anti-Patterns
- **NO Left-Border Accent Lines**: Under NO circumstances should any card, feature box, quote, or service container use a `border-left` line/stroke. All cards must use clean, uniform 1px structural borders on all four sides.
- **NO Inline Emojis**: Emojis are strictly banned. Use crisp inline SVG vector icons instead.
- **Strict Brand Color Enforcement**: Use only the designated palette (`#F5F9FA` bg, `#0E7490` primary, `#06B6D4` accent, `#0C1A20` dark text, `#FFFFFF` cards, `#64748B` muted text, `#EBF6F8` light tint).
- **Responsive Typography**: Font sizes use `clamp()` logic for smooth scaling from mobile to ultra-wide displays.
