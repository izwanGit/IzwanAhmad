---
name: accessibility-expert
description: Audit UI components for WCAG 2.1 AA/AAA compliance, contrast ratios, keyboard navigation, focus management, and screen reader accessibility (ARIA attributes).
---

# Accessibility Expert

Audits web portfolio pages and UI components for WCAG 2.1 AA/AAA accessibility standards. Ensures the portfolio is fully usable via keyboard, screen readers, and across various visual needs.

## Audit Criteria

### 1. Color Contrast Ratios
- **Normal Text:** Minimum contrast ratio of **4.5:1** against the background.
- **Large Text / Headlines:** Minimum contrast ratio of **3:1**.
- **Interactive Controls:** Minimum contrast ratio of **3:1** for buttons, borders, and input fields.
- **Dark Mode Check:** Ensure subtle slate/gray text on dark backgrounds meets contrast thresholds.

### 2. Keyboard Navigation & Tab Order
- **Focusability:** Every interactive element (`<button>`, `<a>`, `<input>`) must be tab-reachable.
- **Logical Tab Order:** Tab sequence matches visual reading order.
- **No Keyboard Traps:** Focus can move in and out of modal dialogs and dropdown menus cleanly.

### 3. Focus Indicator States
- **Visible Focus Rings:** Never set `outline: none` without providing a clear, high-contrast `:focus-visible` ring.
- **Consistent Styling:** Focus rings should match the design system accent palette.

### 4. Screen Reader Friendliness (Semantic HTML & ARIA)
- **Semantic Tags:** Use `<header>`, `<nav>`, `<main>`, `<section>`, `<article>`, `<footer>` instead of unsemantic `<div>` salad.
- **Image Alt Text:** Decorative images use `alt=""`, informative images have descriptive `alt` tags.
- **ARIA Attributes:** Correct usage of `aria-expanded`, `aria-controls`, `aria-label`, and `role` attributes on custom interactive widgets.
- **Form Labels:** Every input has an associated `<label>` or explicit `aria-label`.
