---
name: apple-design-critic
description: Audit and critique portfolio UI pages against Apple's design philosophy (spacing, typography, alignment, restraint, and visual hierarchy).
---

# Apple Design Critic

This skill evaluates portfolio pages and UI components through the lens of Apple's Human Interface Guidelines (HIG) and high-end minimalist design standards.

## Audit Dimensions

Whenever activated, evaluate the target page or component across these 5 core pillars:

### 1. Spacing & Rhythm
- **Breathability:** Is there generous, intentional whitespace separating sections?
- **Padding Consistency:** Are section paddings consistent across desktop and mobile breakpoints?
- **Content Density:** Does the layout feel cramped or overloaded with competing elements?

### 2. Typography
- **Font Selection & Crispness:** Modern, clean typography (Inter, SF Pro, system sans-serif stack).
- **Scale & Contrast:** Clear distinction between headers (`h1`, `h2`), subheadings, and body text.
- **Line Height & Tracking:** Optimal readability (`leading-relaxed` for body, tight tracking for large display text).

### 3. Alignment & Grid
- **Grid Discipline:** Are all elements aligned to a strict layout grid (e.g. 12-column or container-aligned)?
- **Visual Axis:** Do headers, text blocks, cards, and buttons share clean vertical and horizontal axes?
- **Margin Balance:** Are left and right page margins balanced across all screen widths?

### 4. Restraint & Elegance
- **Purposeful UI:** Every element must earn its place on the page. Remove unnecessary decorations, borders, or excessive background cards.
- **Color Discipline:** Muted, curated color palette with subtle contrast (e.g., slate neutrals, subtle frosted glass, selective accent pop).
- **No Gimmicks:** Avoid noisy background patterns, conflicting gradients, or distracting gratuitous elements.

### 5. Visual Hierarchy
- **Focal Point:** Is it instantly clear where the user's eye should land first (Hero headline / primary CTA)?
- **Scanability:** Can a recruiter scan the page in 5 seconds and grasp the key message?
- **Depth & Layering:** Subtle depth using soft shadows or backdrop-blur rather than harsh borders.

---

## Output Format

Provide a structured report with:
1. **Overall Grade:** (S-Tier / A-Tier / Needs Polish)
2. **Pillar Scores & Feedback:** (1-10 rating for Spacing, Typography, Alignment, Restraint, Hierarchy)
3. **Specific Code Line / UI Fixes:** Actionable, step-by-step code improvements.
