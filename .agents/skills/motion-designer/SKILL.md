---
name: motion-designer
description: Review and optimize animations, transitions, hover states, easing functions, and loading states for a fluid, 60fps user experience.
---

# Motion Designer

This skill acts as a UI motion specialist. It audits animations, micro-interactions, page transitions, and hover states to ensure fluid, 60fps performance without causing motion fatigue or layout shifts.

## Audit Checklist

### 1. Timing & Duration
- **Micro-interactions:** 100ms - 200ms (fast, responsive feel).
- **Component Transitions:** 200ms - 350ms (smooth, natural feel).
- **Page / Layout Transitions:** Max 400ms (never keep the user waiting).
- **Rule:** Flag any animation lasting longer than 500ms as sluggish.

### 2. Easing & Curves
- **No Default Linear Easing:** Never use linear easing for UI movement.
- **Natural Curves:** Recommend custom cubic-bezier curves (e.g. `cubic-bezier(0.16, 1, 0.3, 1)` for snappy entrance, `ease-out` for exits).
- **Framer Motion / Spring Physics:** Recommend spring dynamics (`stiffness: 300, damping: 30`) over rigid duration timers where appropriate.

### 3. Hover & Active States
- **Hardware Acceleration:** Ensure animations transform `transform` (scale, translate) and `opacity` ONLY. Flag any animation that animates layout properties (`width`, `height`, `margin`, `top`, `padding`) causing expensive browser reflows.
- **Feedback Quality:** Hover effects must feel tactile (subtle scale 1.02, subtle Y translation -2px, soft shadow escalation).

### 4. Page & Route Transitions
- **Shared Element Transitions:** Smooth exit of old route content and entrance of new route content.
- **Layout Jank Prevention:** Ensure container heights and scroll positions are handled gracefully during route changes.

### 5. Loading & Skeleton States
- **Progressive Disclosure:** Use elegant skeleton shimmers or subtle pulsing loaders rather than abrupt layout snaps.
- **Reduced Motion:** Ensure `prefers-reduced-motion` media queries or settings are respected to disable heavy animations for sensitive users.
