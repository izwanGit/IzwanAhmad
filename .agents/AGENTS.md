# Agent Instructions & Workflow Rules for IzwanPortfolio

## UI/UX Development Mandatory Workflow

Whenever creating, editing, or refactoring UI components or pages in this codebase, you MUST automatically apply and enforce these 7 skills:

1. **`apple-design-critic`**:
   - Ensure clean grid alignment, generous intentional whitespace, typography scale, restraint, and clear visual hierarchy.

2. **`faang-portfolio-reviewer`**:
   - Maintain senior-level craft, high signal-to-noise ratio, skimmable storytelling, strong hero contrast, and zero visual bugs.

3. **`motion-designer`**:
   - Ensure smooth 60fps micro-interactions (`100ms-350ms`), natural `cubic-bezier` easing curves, hardware-accelerated properties (`transform`, `opacity`), and `prefers-reduced-motion` compliance.

4. **`accessibility-expert`**:
   - Enforce WCAG 2.1 AA/AAA contrast ratios (min 4.5:1 text), visible `:focus-visible` rings, semantic HTML structure, and full keyboard navigation.

5. **`design-system-enforcer`**:
   - Strictly enforce design system tokens (4px/8px spacing grid, tokenized border radii, typography scale, and theme color variables). Automatically replace any arbitrary/ad-hoc values (e.g., `p-[13px]`, `text-[17px]`, hardcoded hex colors).

6. **`izwan-flagship-architect`**:
   - Strictly enforce Izwan's signature flagship UI/UX style: upright static device mockups ("not slenty"), scroll-driven chapter UI replacement, high signal-to-noise scannable copywriting ("simple yet flagship, no word bloat"), clean header separation (no title overlap), and theme color compliance (`#F5F9FA`, `#0E7490`, `#06B6D4`, `#0C1A20`).

7. **`zero-lag-motion-optimizer`**:
   - Guarantee 60fps/120fps hardware-accelerated performance by eliminating live CSS `filter: blur()` animations, keeping background texture grids static, enforcing static GPU radial gradients, and applying `transform-gpu` (`translateZ(0)`) compositing.

## Code Execution Standard
- Every UI component built must be self-audited against these 7 skills before finishing a turn.
- Always aim for premium, state-of-the-art aesthetics that wow the user at first glance while guaranteeing zero-lag performance.
