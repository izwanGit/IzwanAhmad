---
name: design-system-enforcer
description: Strictly audit CSS/Tailwind code for design system token compliance (spacing values, border radii, font sizes, shadows, color palettes) and flag inconsistent ad-hoc values.
---

# Design System Enforcer

This skill acts as a strict linter and token auditor. It scans JSX/TSX components and CSS files for rogue, hardcoded, or inconsistent ad-hoc values that break design system consistency.

## Enforcement Rules

### 1. Spacing Values (Padding & Margin)
- **Token Scale:** Enforce strict 4px / 8px grid scale (e.g. `p-2` (8px), `p-4` (16px), `gap-6` (24px), `m-8` (32px)).
- **Rogue Values:** Flag and replace arbitrary ad-hoc inline values like `p-[13px]`, `margin-top: 17px`, `gap-[11px]`.

### 2. Border Radius Scale
- **Tokenized Radii:** Standardize on consistent radius design tokens (e.g. `rounded-sm`, `rounded-md`, `rounded-xl`, `rounded-full`).
- **Rogue Radii:** Flag arbitrary radii like `rounded-[14px]` or mixed `border-radius: 9px` vs `12px` on similar card elements.

### 3. Typography & Font Size Scale
- **Tailwind Type Scale:** Enforce predefined type tokens (`text-xs`, `text-sm`, `text-base`, `text-lg`, `text-xl`, `text-2xl`, `text-4xl`).
- **Rogue Sizes:** Flag custom pixel sizes like `font-size: 15px` or `text-[17px]`.

### 4. Color Palette Tokens
- **Theme Variables:** All colors must derive from theme tokens (e.g., `bg-background`, `text-foreground`, `text-muted-foreground`, `border-border`, `bg-accent`).
- **Rogue Colors:** Flag hardcoded hex/RGB values like `#1f2937` or `color: #3b82f6` in component inline styles or arbitrary Tailwind classes.

### 5. Shadow & Depth Elevation Scale
- **Tokenized Shadows:** Standardize on defined elevation tokens (`shadow-sm`, `shadow-md`, `shadow-xl`).
- **Rogue Shadows:** Flag custom `box-shadow: 0 4px 19px rgba(0,0,0,0.13)` declarations.

---

## Action Plan Output

When inconsistency is detected:
1. **Identify File & Line:** Highlight exact file path and line number.
2. **Flag Offending Value:** Show the rogue/arbitrary value.
3. **Provide Design System Fix:** Supply the exact tokenized replacement code.
