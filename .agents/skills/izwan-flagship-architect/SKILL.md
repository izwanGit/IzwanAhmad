---
name: izwan-flagship-architect
description: Enforce Izwan's signature flagship UI/UX style (upright static device mockups, scroll-driven chapter UI replacement, high signal-to-noise scannable copywriting, clean header separation, and theme compliance).
---

# Izwan Flagship Architect

This skill enforces Izwan Ahmad's signature UI/UX aesthetic and presentation philosophy across all frontend components, landing pages, and interactive feature showcases.

## Mandatory Architectural & Design Pillars

Whenever creating, editing, or reviewing UI components or scrollytelling sections, you MUST audit and enforce the following 5 pillars:

### 1. Upright Device Presentation ("Not Slenty")
- **Zero Slanted / Isometric Angles:** Never use tilted, slanted, diagonal, or awkward 3D perspective distortion for device mockups (iPhone 15 Pro, MacBook Pro, iPad).
- **Pristine & Upright:** Present device mockups straight-on, sharp, and upright. Frames must look ultra-clean, modern, and grounded in a sticky viewport (`sticky top-0 h-screen`).
- **Realistic Details:** Include authentic device details (e.g., Dynamic Island with camera lens reflection and AI indicator for mobile; sleek camera notch and titanium hinge base for laptops).

### 2. Scroll-Driven Chapter UI Replacement (Apple / MC+ Style)
- **Static Device Frame, Dynamic Screen Content:** For feature walkthroughs and flagship product showcases, keep the outer device frame locked steady in place.
- **Chapter Crossfading:** As the user scrolls through the vertical runway (e.g., 100vh per chapter), crossfade or slide the UI screenshot *inside* the device screen container to reveal each feature chapter sequentially.
- **Progress Runway:** Provide generous scroll runway (e.g., 400vh for a 4-chapter walkthrough) so users can comfortably explore features without rushing. Include clean dot indicators and progress bars.

### 3. High Signal-to-Noise Copywriting ("Simple Yet Flagship")
- **No Word Bloat / Fluff:** Strictly avoid long paragraphs, walls of text, or verbose academic descriptions ("NO NEED TO PUT ALL THOSE WORD INSIDE. PRIORITIZE SIMPLICITY YET. JUST SIMPLE").
- **Scannable Bullet Points:** Distill deep technical architecture (e.g., Bi-LSTM Neural Networks, Zero-Latency RAG Pipelines, Zero Trust Auth, 14-Stage CI/CD DevSecOps, Opportunity Cost Guardians) into bold, scannable 2-line bullet points with icons.
- **Left Column / Right Column Harmony:** On desktop layouts (`grid-cols-12`), allocate 5 columns to clean chapter text and 7 columns to the prominent device mockup.

### 4. Zero Title Overlap & Clean Header Separation
- **No Background Text Clashing:** Never place section titles (e.g., "Selected Flagship Projects") behind scrolling or sticky device mockups where they can clash with project details or cause visual clutter.
- **Normal Document Flow Intro:** Section headers MUST reside in normal document flow *above* the sticky scrollytelling stage. As the user enters the stage, the intro header scrolls smoothly out of view, dedicating 100% of the viewport to the interactive showcase.

### 5. Theme & Glassmorphic Compliance
- **Strict Color Palette:**
  - **Background:** `#F5F9FA` (Clean, crisp ice-blue tint)
  - **Primary:** `#0E7490` (Deep cyan / teal)
  - **Accent:** `#06B6D4` (Vibrant cyan pop)
  - **Text:** `#0C1A20` (Deep slate / near-black)
- **Glassmorphism & Halos:** Use high-end frosted glass (`bg-white/90 backdrop-blur-md border border-[#0E7490]/25 shadow-xs`) for floating chips and badges. Use soft, static CSS radial gradients for ambient background glows.

---

## Self-Audit Checklist Before Execution
- [ ] Is the device mockup 100% upright and straight-on (no tilted/slented angles)?
- [ ] Does the UI image inside the screen crossfade/replace cleanly as the user scrolls?
- [ ] Is the copywriting punchy, simple, and scannable without unnecessary word bloat?
- [ ] Is the section title separated above the sticky stage so it never overlaps with project cards?
- [ ] Does the component strictly use Izwan's `#F5F9FA`, `#0E7490`, `#06B6D4`, and `#0C1A20` theme?
