---
name: zero-lag-motion-optimizer
description: Guarantee 60fps/120fps hardware-accelerated performance in React and Framer Motion by eliminating live CSS blur animations, optimizing GPU compositing, and preventing layout thrashing.
---

# Zero-Lag Motion Optimizer

This skill acts as a specialized frontend performance engineer. It audits and enforces strict technical rules to guarantee buttery-smooth 60fps and 120fps animations across all laptops, mobile devices, and high-resolution displays without any stutter, jank, or frame drops.

## Mandatory Performance Rules

Whenever creating, editing, or optimizing animations, scrollytelling sections, or interactive UI components, you MUST enforce these 4 performance rules:

### 1. Strict Ban on Live CSS `filter: blur()` Animations
- **The Bottleneck:** Animatng CSS `filter: blur()` (e.g., `filter: blur(${blurPx}px)` or animating scale on elements with a blur filter) forces the browser's graphics engine to re-rasterize the blur matrix on every single scroll frame. On Retina/4K displays or mobile GPUs, this causes severe frame drops and stuttering ("very lagging").
- **The Rule:** **NEVER** animate CSS `filter: blur()` on scrolling images, large gradients, or container divs.
- **The Solution:** For background glow halos or soft focus effects, use static CSS radial gradients with built-in alpha falloffs (`radial-gradient(circle, rgba(6,182,212,0.3) 0%, transparent 70%)`). A CSS radial gradient fades softly to transparent natively without filter overhead!

### 2. Static Background Grids & Textures
- **The Bottleneck:** Scaling or animating full-screen background textures or grid patterns on every scroll frame forces the browser to repaint the background grid across every pixel of the viewport during scroll.
- **The Rule:** Keep background grid lines, dots, and texture overlays **static** (or animate only simple static opacity once).
- **The Solution:** Direct all 3D motion and scale transformations to foreground elements (device mockups, floating badges, chapter text), saving 50% of GPU compositing overhead.

### 3. Hardware Acceleration (`transform-gpu` / `translateZ(0)`)
- **Compositor Promotion:** Always apply `transform-gpu` (Tailwind) or `will-change: transform` to animated containers so the browser promotes them to dedicated GPU compositor layers at page load, avoiding layout reflows during scroll.
- **Compositor-Only Properties:** Animate **ONLY** `opacity` and `transform` (`scale`, `translate`, `rotate`). Never animate layout properties (`width`, `height`, `top`, `left`, `margin`, `padding`, `border-width`), as they trigger CPU layout recalculations and repaint thrashing.

### 4. Continuous Framer Motion `useTransform` & Zero State Re-renders
- **No React State in Scroll Loops:** NEVER call React `setState` inside scroll event listeners or during scroll animations. React component re-render cycles cannot keep up with 120Hz display refresh rates and will cause jank.
- **Direct Animation Thread:** Bind scroll animations directly to continuous `scrollYProgress` using Framer Motion's `useTransform`. This calculates values directly on the animation thread, bypassing React re-renders completely.

---

## Performance Audit Checklist
- [ ] Are there zero animated CSS `filter: blur()` calls in the component?
- [ ] Do background glow halos use static CSS `radial-gradient` instead of blur filters?
- [ ] Are full-screen background texture grids static rather than scaling on scroll?
- [ ] Are animated elements promoted to GPU layers using `transform-gpu`?
- [ ] Is the animation driven purely by `useTransform` (opacity/scale/translate) without triggering React re-renders?
