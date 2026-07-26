# 🚀 Izwan Ahmad — Developer & AI Portfolio

[![React](https://img.shields.io/badge/React-19-blue.svg?logo=react)](https://react.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.0+-3178C6.svg?logo=typescript)](https://www.typescriptlang.org/)
[![Vite](https://img.shields.io/badge/Vite-8.0-646CFF.svg?logo=vite)](https://vitejs.dev/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-3.4-38B2AC.svg?logo=tailwind-css)](https://tailwindcss.com/)
[![Three.js](https://img.shields.io/badge/Three.js-0.185-black.svg?logo=three.js)](https://threejs.org/)
[![Framer Motion](https://img.shields.io/badge/Framer_Motion-12.4-0055FF.svg?logo=framer)](https://www.framer.com/motion/)
[![Oxlint](https://img.shields.io/badge/Linted_with-Oxlint-orange.svg)](https://oxc.rs/)

Welcome to the official repository of **Izwan Ahmad's Developer & AI Engineer Portfolio**. This web application is engineered for maximum performance and visual impact, featuring Apple-style 3D scrollytelling, dynamic particle backgrounds, responsive interactive cards, and comprehensive project showcases.

---

## ✨ Features

- **🎨 Apple-Style 3D Scrollytelling**: Parallax scroll-driven transformations, 3D object zooming, and depth separation powered by Framer Motion.
- **⚡ Next-Gen Performance**: Vite 8 build toolchain combined with React 19 for blazing fast HMR and sub-second cold starts.
- **🌌 Interactive Particle Visualizations**: Canvas-based interactive ambient particles with responsive particle density and cursor interaction.
- **💼 Comprehensive Project & Career Showcase**: Dedicated pages for flagship Enterprise software (PETRONAS digital solutions), AI/ML tools, Freelance work, and Career milestones.
- **📱 Fully Responsive Design System**: Modern, accessible UI tailored with custom cyan/teal color tokens, smooth dark-mode accents, and subtle typography scales.
- **🛡️ Type-Safe & Linted Codebase**: Written in strict TypeScript with high-performance linting via Oxlint.

---

## 🛠️ Tech Stack

### Core Frameworks & Libraries
- **[React 19](https://react.dev/)** — UI Component Framework
- **[React Router DOM v7](https://reactrouter.com/)** — Single-Page Application Routing & Navigation
- **[TypeScript](https://www.typescriptlang.org/)** — Static Type Checking

### Graphics & Motion
- **[Framer Motion 12](https://www.framer.com/motion/)** — Complex 3D Parallax & Scroll-driven Animations
- **[Three.js](https://threejs.org/)** / **[@react-three/fiber](https://github.com/pmndrs/react-three-fiber)** / **[@react-three/drei](https://github.com/pmndrs/drei)** — 3D WebGL Rendering
- **[Lucide React](https://lucide.dev/)** — Modern SVG Icons

### Styling & Design System
- **[Tailwind CSS v3.4](https://tailwindcss.com/)** — Utility-First Styling
- **[PostCSS](https://postcss.org/)** & **[Autoprefixer](https://github.com/postcss/autoprefixer)** — CSS Processing
- **[clsx](https://github.com/lukeed/clsx)** & **[tailwind-merge](https://github.com/dcastil/tailwind-merge)** — Dynamic Class Construction

### Build Tools & Quality
- **[Vite 8](https://vitejs.dev/)** — Dev Server & Production Bundler
- **[Oxlint](https://oxc.rs/docs/guide/usage/linter.html)** — Ultra-fast JavaScript/TypeScript Linter

---

## 📁 Directory Structure

```text
IzwanPortfolio/
├── public/                # Static assets, logos, and images
├── src/
│   ├── assets/            # Project images, graphics, and media
│   ├── components/        # Reusable UI & Showcase Components
│   │   ├── layout/        # Navbar, Footer, and layout structures
│   │   ├── FlagshipScrollytelling.tsx # Apple-style scrollytelling card
│   │   ├── HeroShowcase.tsx           # Hero section visual component
│   │   ├── ParticleBackground.tsx     # Canvas ambient particles
│   │   └── PetronasShowcase.tsx       # Enterprise showcase section
│   ├── lib/               # Utility functions (cn helper, formatters)
│   ├── pages/             # Main Application Views
│   │   ├── Home.tsx       # Hero, Flagship Projects, Skills & Bio
│   │   ├── Projects.tsx   # Detailed Project Gallery & Case Studies
│   │   ├── Experience.tsx # Career History & Milestones
│   │   └── Freelance.tsx  # Client Contracts & Consultancy Services
│   ├── App.tsx            # Main Application Shell & Route Provider
│   ├── main.tsx           # React DOM Entrypoint
│   └── index.css          # Global Tailwind Directives & CSS Tokens
├── package.json           # Dependencies & Scripts
├── tailwind.config.js     # Tailwind Theme & Color Customization
└── vite.config.ts         # Vite Configuration & Path Aliases
```

---

## 🚦 Getting Started

### Prerequisites

Ensure you have the following installed on your machine:
- **Node.js**: `v18.0.0` or higher
- **npm**: `v9.0.0` or higher

### Installation

1. **Clone the Repository**
   ```bash
   git clone https://github.com/izwanGit/IzwanAhmad.git
   cd IzwanAhmad
   ```

2. **Install Dependencies**
   ```bash
   npm install
   ```

3. **Start Development Server**
   ```bash
   npm run dev
   ```
   Open your browser and navigate to `http://localhost:5173`.

---

## 📜 Available Scripts

In the project directory, you can run:

| Command | Description |
| :--- | :--- |
| `npm run dev` | Starts the local Vite development server with HMR. |
| `npm run build` | Compiles TypeScript and builds the production bundle in `dist/`. |
| `npm run preview` | Previews the production build locally. |
| `npm run lint` | Runs `oxlint` to check code quality and static rules. |

---

## 📬 Contact & Connect

- **Portfolio**: [Izwan Ahmad Portfolio](https://github.com/izwanGit/IzwanAhmad)
- **GitHub**: [@izwanGit](https://github.com/izwanGit)

---

&copy; 2026 Izwan Ahmad. All rights reserved.
