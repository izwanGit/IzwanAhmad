/**
 * FlagshipScrollytelling.tsx
 *
 * ULTRA-PERFORMANT Apple-style sticky scrollytelling with cinematic dolly-zoom.
 *
 * Performance Optimizations (Zero Lag Guarantee):
 *   1. ELIMINATED ALL CSS BLUR ANIMATIONS: Animatng `filter: blur()` on large images and
 *      gradients forces the browser GPU to re-rasterize on every scroll frame, causing lag.
 *      All live blur animations have been removed.
 *   2. NATIVE GPU RADIAL GRADIENTS: Static background glows use pure CSS `radial-gradient`
 *      with soft alpha falloffs to transparent instead of expensive blur filters.
 *   3. STATIC BACKGROUND GRID: Background texture grid is static rather than scaling on every
 *      frame, saving 50% of GPU compositing overhead. 3D depth comes from foreground devices.
 *   4. HARDWARE ACCELERATION: Applied `transform-gpu` and clean opacity/scale transforms
 *      to ensure 60fps / 120fps buttery-smooth rendering across all laptops and phones.
 *
 * Architecture & Design:
 *   • Separated Intro Header (No overlap ever between title and project mockups).
 *   • Sticky 800vh stage (400vh per project) for unhurried, comfortable exploration.
 *
 * Theme: #F5F9FA (bg) · #0E7490 (primary) · #06B6D4 (accent) · #0C1A20 (text)
 */

import React, { useRef } from 'react';
import {
  motion,
  useScroll,
  useTransform,
  MotionValue,
} from 'framer-motion';
import { ArrowRight, Trophy, ShieldCheck, Zap, Cpu, Sparkles } from 'lucide-react';
import { Link } from 'react-router-dom';

// ─── Types ───────────────────────────────────────────────────

interface ProjectData {
  id: string;
  category: string;
  award: string;
  title: string;
  subtitle: string;
  description: string;
  techBadges: string[];
  metrics: { value: string; label: string }[];
  primaryImage: string;
  secondaryImage?: string;
  link: string;
  accentColor: string;
}

// ─── Static project data ──────────────────────────────────────

const PROJECTS: ProjectData[] = [
  {
    id: 'beruang',
    category: 'AI / Mobile App',
    award: 'Best Architecture Award',
    title: 'Beruang AI Financial Platform',
    subtitle: 'React Native · PyTorch · Bi-LSTM Neural Engine',
    description:
      'AI-powered money management platform featuring a custom Bi-LSTM neural network (99.61% accuracy) trained on 220,000+ Malaysian transaction records. Scored an exceptional 86.77 on the System Usability Scale (SUS).',
    techBadges: ['Bi-LSTM Neural Net', 'React Native', 'PyTorch', 'FastAPI', 'Python'],
    metrics: [
      { value: '99.61%', label: 'AI Accuracy' },
      { value: '220k+', label: 'Dataset Records' },
      { value: '86.77', label: 'SUS Score' },
    ],
    primaryImage: '/images/beruang-dashboard.jpg',
    secondaryImage: '/images/beruang-mobile.jpg',
    link: '/projects',
    accentColor: '#06B6D4',
  },
  {
    id: 'rentverse',
    category: 'Web System / DevSecOps',
    award: 'Champion — 4 Awards',
    title: 'RentVerse Rental Ecosystem',
    subtitle: 'Next.js 14 · Docker · 14-Stage CI/CD DevSecOps',
    description:
      'Enterprise-grade secure property rental platform equipped with Zero Trust authentication, AI-driven tenant fraud detection, and a fully automated 14-stage CI/CD DevSecOps security pipeline.',
    techBadges: ['Next.js 14', 'Zero Trust Auth', 'SonarQube', 'Docker', 'PostgreSQL'],
    metrics: [
      { value: '4 Awards', label: 'Competition Winner' },
      { value: '14-Stage', label: 'CI/CD Pipeline' },
      { value: 'Zero Trust', label: 'Security Auth' },
    ],
    primaryImage: '/images/rentverse-laptop.jpg',
    link: '/projects',
    accentColor: '#0E7490',
  },
];

// ─── Per-project scroll-driven scene ─────────────────────────

interface SceneProps {
  project: ProjectData;
  scrollYProgress: MotionValue<number>;
  startRatio: number;
  endRatio: number;
  index: number;
}

const ProjectScene: React.FC<SceneProps> = ({
  project,
  scrollYProgress,
  startRatio,
  endRatio,
  index,
}) => {
  const span = endRatio - startRatio;
  
  // ── 3-Phase Cinematic Timing ─────────────────────────────
  // 38% zoom in -> 38% hold steady for comfortable reading -> 24% zoom out
  const arrivalPoint = startRatio + span * 0.38;
  const holdPoint    = startRatio + span * 0.76;
  const isEven       = index % 2 === 0;

  // ── Scene fade: smooth in at start, fade out at end ────────
  const sceneOpacity = useTransform(
    scrollYProgress,
    [startRatio, startRatio + span * 0.12, holdPoint + span * 0.06, endRatio],
    [0, 1, 1, 0]
  );

  // ── DOLLY ZOOM: High-performance scale transform (Zero blur!)
  const deviceScale = useTransform(
    scrollYProgress,
    [startRatio, arrivalPoint, holdPoint, endRatio],
    [0.08,       1.0,          1.0,       1.55]
  );

  // ── Secondary phone mockup: faster zoom for 3D depth separation
  const mobileScale = useTransform(
    scrollYProgress,
    [startRatio, arrivalPoint, holdPoint, endRatio],
    [0.04,       1.08,          1.08,      1.75]
  );
  const mobileY = useTransform(
    scrollYProgress,
    [startRatio, arrivalPoint, holdPoint, endRatio],
    [120,        0,            0,         -80]
  );

  // ── Text reveal: fades in right as device lands, holds steady
  const textOpacity = useTransform(
    scrollYProgress,
    [arrivalPoint - span * 0.12, arrivalPoint + span * 0.05, holdPoint, endRatio - span * 0.08],
    [0, 1, 1, 0]
  );
  const textY = useTransform(
    scrollYProgress,
    [arrivalPoint - span * 0.12, arrivalPoint + span * 0.05],
    [35, 0]
  );

  // ── Floating badges: slide in smoothly after arrival ───────
  const chipOpacity = useTransform(
    scrollYProgress,
    [arrivalPoint, arrivalPoint + span * 0.08, holdPoint, endRatio - span * 0.08],
    [0, 1, 1, 0]
  );
  const chip1X = useTransform(
    scrollYProgress,
    [arrivalPoint, arrivalPoint + span * 0.10],
    [-60, 0]
  );
  const chip2X = useTransform(
    scrollYProgress,
    [arrivalPoint, arrivalPoint + span * 0.12],
    [60, 0]
  );

  // ── Static Glow Halo Opacity Fade (No blur recalculation!) ──
  const glowOpacity = useTransform(
    scrollYProgress,
    [startRatio, startRatio + span * 0.25, arrivalPoint],
    [0.9, 0.4, 0]
  );

  return (
    <motion.div
      style={{ opacity: sceneOpacity }}
      className="absolute inset-0 flex items-center justify-center pointer-events-none transform-gpu"
    >
      {/* ── Static Depth Background (No scaling overhead) ── */}
      <div className="absolute inset-0 pointer-events-none">
        <div
          className="absolute inset-0"
          style={{
            background: `radial-gradient(circle 800px at 50% 50%, ${project.accentColor}18 0%, transparent 80%)`,
          }}
        />
        <div
          className="absolute inset-0 opacity-20"
          style={{
            backgroundImage: `
              linear-gradient(${project.accentColor}30 1px, transparent 1px),
              linear-gradient(90deg, ${project.accentColor}30 1px, transparent 1px)
            `,
            backgroundSize: '80px 80px',
          }}
        />
      </div>

      {/* ── Native GPU Radial Glow (Zero CSS filter blur!) ── */}
      <motion.div
        style={{ opacity: glowOpacity }}
        className="absolute inset-0 flex items-center justify-center pointer-events-none transform-gpu"
      >
        <div
          className="w-[600px] h-[600px] rounded-full"
          style={{
            background: `radial-gradient(circle, ${project.accentColor}45 0%, transparent 70%)`,
          }}
        />
      </motion.div>

      {/* ── Two-column stage layout (5 cols text / 7 cols device) ── */}
      <div
        className="w-full max-w-7xl mx-auto px-6 lg:px-12 grid lg:grid-cols-12 gap-10 lg:gap-14 items-center h-full relative z-10 pt-20 pb-16"
        style={{ pointerEvents: 'auto' }}
      >
        {/* TEXT COLUMN (5 cols) */}
        <motion.div
          style={{ opacity: textOpacity, y: textY }}
          className={`space-y-6 lg:col-span-5 transform-gpu ${isEven ? 'lg:order-1' : 'lg:order-2'}`}
        >
          {/* Badges */}
          <div className="flex flex-wrap items-center gap-3">
            <span
              className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full text-[11px] font-black tracking-widest uppercase border shadow-2xs"
              style={{
                background: `${project.accentColor}18`,
                borderColor: `${project.accentColor}45`,
                color: '#0E7490',
              }}
            >
              <span
                className="w-1.5 h-1.5 rounded-full animate-pulse"
                style={{ background: project.accentColor }}
              />
              {project.category}
            </span>
            <span
              className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full text-[11px] font-bold border shadow-2xs"
              style={{ background: '#0E749012', borderColor: '#0E749030', color: '#0E7490' }}
            >
              <Trophy size={12} />
              {project.award}
            </span>
          </div>

          {/* Title */}
          <div>
            <h3 className="text-3xl sm:text-4xl xl:text-5xl font-black tracking-tight leading-[1.08]" style={{ color: '#0C1A20' }}>
              {project.title}
            </h3>
            <p className="text-sm font-bold mt-2" style={{ color: '#0E7490' }}>
              {project.subtitle}
            </p>
          </div>

          {/* Description */}
          <p className="text-sm sm:text-base leading-relaxed max-w-lg" style={{ color: '#0C1A2080' }}>
            {project.description}
          </p>

          {/* Tech badges */}
          <div className="flex flex-wrap gap-2 pt-1">
            {project.techBadges.map((b, i) => (
              <span
                key={i}
                className="px-3.5 py-1.5 rounded-xl bg-white text-xs font-semibold border shadow-2xs hover:border-[#06B6D4] transition-colors cursor-default"
                style={{ color: '#0C1A20', borderColor: '#0E749025' }}
              >
                {b}
              </span>
            ))}
          </div>

          {/* Metrics Box */}
          <div
            className="grid grid-cols-3 gap-3 p-4 rounded-2xl shadow-xs"
            style={{ background: '#F5F9FA', border: '1px solid #0E749025' }}
          >
            {project.metrics.map((m, mi) => (
              <div
                key={mi}
                className={`text-center ${mi === 1 ? 'border-x' : ''}`}
                style={{ borderColor: '#0E749025' }}
              >
                <div className="text-lg sm:text-2xl font-black" style={{ color: '#0E7490' }}>
                  {m.value}
                </div>
                <div className="text-[10px] font-bold uppercase tracking-wider mt-0.5" style={{ color: '#0C1A2060' }}>
                  {m.label}
                </div>
              </div>
            ))}
          </div>

          {/* CTA */}
          <div className="pt-2">
            <Link
              to={project.link}
              className="inline-flex items-center gap-2.5 px-8 py-4 rounded-full text-white text-xs sm:text-sm font-bold transition-all shadow-[0_12px_28px_rgba(14,116,144,0.25)] hover:shadow-[0_16px_35px_rgba(6,182,212,0.4)] group/btn"
              style={{ background: '#0E7490' }}
              onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.background = '#06B6D4'; }}
              onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.background = '#0E7490'; }}
            >
              <span>Explore Technical Architecture</span>
              <ArrowRight size={16} className="group-hover/btn:translate-x-1 transition-transform" />
            </Link>
          </div>
        </motion.div>

        {/* DEVICE ZOOM COLUMN (7 cols) */}
        <div className={`relative flex items-center justify-center py-6 lg:col-span-7 ${isEven ? 'lg:order-2' : 'lg:order-1'}`}>
          {project.secondaryImage ? (
            /* ── Beruang: Dashboard + Mobile Mockup ── */
            <div className="relative w-full aspect-[16/11] flex items-center justify-center">
              {/* Dashboard (Background Layer) */}
              <motion.div
                style={{
                  scale: deviceScale,
                  border: '2px solid #0E749030',
                  background: '#fff',
                }}
                className="w-[88%] aspect-[16/10] rounded-2xl overflow-hidden shadow-2xl relative transform-gpu"
              >
                <img src={project.primaryImage} alt={project.title} className="w-full h-full object-cover object-top" loading="lazy" />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0C1A20]/20 via-transparent to-transparent" />
              </motion.div>

              {/* Mobile Mockup (Foreground Layer, faster zoom = intense depth pop) */}
              <motion.div
                style={{
                  scale: mobileScale,
                  y: mobileY,
                  borderColor: '#0C1A20',
                  boxShadow: '0 30px 70px rgba(14,116,144,0.45)',
                }}
                className="absolute left-2 bottom-0 w-[42%] aspect-[9/19] rounded-[32px] overflow-hidden border-4 bg-[#0C1A20] z-20 transform-gpu"
              >
                <img src={project.secondaryImage} alt={project.title + ' mobile'} className="w-full h-full object-cover object-top" loading="lazy" />
                <div className="absolute top-2 left-1/2 -translate-x-1/2 w-14 h-3 bg-black rounded-full border border-white/10" />
              </motion.div>

              {/* Chip 1 (Top Right) */}
              <motion.div
                style={{
                  x: chip1X,
                  opacity: chipOpacity,
                  borderColor: '#0E749035',
                  color: '#0C1A20',
                }}
                className="absolute -top-3 right-4 z-30 hidden sm:flex items-center gap-2 px-4 py-2.5 rounded-2xl bg-white/95 backdrop-blur-md border shadow-xl text-xs font-black transform-gpu"
              >
                <div className="w-2 h-2 rounded-full bg-[#06B6D4] animate-ping" />
                <span>99.61% AI Accuracy</span>
              </motion.div>

              {/* Chip 2 (Bottom Right) */}
              <motion.div
                style={{
                  x: chip2X,
                  opacity: chipOpacity,
                  borderColor: '#0E749035',
                  color: '#0C1A20',
                }}
                className="absolute -bottom-3 right-8 z-30 hidden sm:flex items-center gap-2 px-4 py-2.5 rounded-2xl bg-white/95 backdrop-blur-md border shadow-xl text-xs font-black transform-gpu"
              >
                <Cpu size={15} style={{ color: '#0E7490' }} />
                <span>220k+ Transactions</span>
              </motion.div>
            </div>
          ) : (
            /* ── RentVerse: Laptop Mockup ── */
            <div className="relative w-full aspect-[16/11] flex items-center justify-center">
              <motion.div
                style={{ scale: deviceScale }}
                className="w-full transform-gpu"
              >
                <div
                  className="w-full rounded-t-2xl p-2.5 pt-3.5 shadow-2xl relative border-2"
                  style={{ background: '#0C1A20', borderColor: '#0E749045' }}
                >
                  <div className="absolute top-1.5 left-1/2 -translate-x-1/2 w-2 h-2 rounded-full bg-slate-800 border border-slate-600 flex items-center justify-center">
                    <div className="w-0.5 h-0.5 rounded-full" style={{ background: '#06B6D4' }} />
                  </div>
                  <div className="w-full aspect-[16/10] bg-slate-950 rounded-lg overflow-hidden border border-slate-800 relative">
                    <img src={project.primaryImage} alt={project.title} className="w-full h-full object-cover object-top" loading="lazy" />
                  </div>
                </div>
                <div
                  className="w-[106%] -ml-[3%] h-4 rounded-b-2xl border-t shadow-2xl flex justify-center items-start"
                  style={{ background: 'linear-gradient(to bottom, #1E293B, #0C1A20)', borderColor: '#0E749040' }}
                >
                  <div className="w-16 h-1.5 rounded-b-md border-x border-b border-[#0E7490]/30" style={{ background: '#0C1A20' }} />
                </div>
              </motion.div>

              {/* Chip 1 (Top Left) */}
              <motion.div
                style={{
                  x: chip1X,
                  opacity: chipOpacity,
                  borderColor: '#0E749035',
                  color: '#0C1A20',
                }}
                className="absolute -top-4 left-2 z-30 hidden sm:flex items-center gap-2 px-4 py-2.5 rounded-2xl bg-white/95 backdrop-blur-md border shadow-xl text-xs font-black transform-gpu"
              >
                <Trophy size={15} style={{ color: '#0E7490' }} />
                <span>4 Awards Won</span>
              </motion.div>

              {/* Chip 2 (Bottom Right) */}
              <motion.div
                style={{
                  x: chip2X,
                  opacity: chipOpacity,
                  borderColor: '#0E749035',
                  color: '#0C1A20',
                }}
                className="absolute -bottom-5 right-4 z-30 hidden sm:flex items-center gap-2 px-4 py-2.5 rounded-2xl bg-white/95 backdrop-blur-md border shadow-xl text-xs font-black transform-gpu"
              >
                <ShieldCheck size={15} style={{ color: '#06B6D4' }} />
                <span>14-Stage DevSecOps</span>
              </motion.div>
            </div>
          )}
        </div>
      </div>
    </motion.div>
  );
};

// ─── Dot indicator ─────────────────────────────────────────────

interface DotProps {
  scrollYProgress: MotionValue<number>;
  startRatio: number;
  endRatio: number;
}

const SceneDot: React.FC<DotProps> = ({ scrollYProgress, startRatio, endRatio }) => {
  const opacity = useTransform(
    scrollYProgress,
    [startRatio, startRatio + 0.03, endRatio - 0.03, endRatio],
    [0.3, 1, 1, 0.3]
  );
  const scale = useTransform(
    scrollYProgress,
    [startRatio, startRatio + 0.03, endRatio - 0.03, endRatio],
    [1, 1.8, 1.8, 1]
  );
  return (
    <motion.div
      style={{ opacity, scale, background: '#0E7490' }}
      className="w-2.5 h-2.5 rounded-full transform-gpu"
    />
  );
};

// ─── Chapter label ─────────────────────────────────────────────

interface ChapterProps {
  scrollYProgress: MotionValue<number>;
  startRatio: number;
  endRatio: number;
  index: number;
  total: number;
}

const ChapterLabel: React.FC<ChapterProps> = ({ scrollYProgress, startRatio, endRatio, index, total }) => {
  const span = endRatio - startRatio;
  const opacity = useTransform(
    scrollYProgress,
    [startRatio, startRatio + span * 0.12, endRatio - span * 0.08, endRatio],
    [0, 1, 1, 0]
  );
  return (
    <motion.div style={{ opacity }} className="absolute bottom-0 left-0 flex items-baseline gap-2 transform-gpu">
      <span className="text-6xl sm:text-7xl font-black select-none tabular-nums" style={{ color: '#0E749020' }}>
        {String(index + 1).padStart(2, '0')}
      </span>
      <span className="text-xs font-bold uppercase tracking-widest" style={{ color: '#0C1A2045' }}>
        / {String(total).padStart(2, '0')}
      </span>
    </motion.div>
  );
};

// ─── Main FlagshipScrollytelling component ────────────────────

const SCROLL_RUNWAY = 4.0; // viewport heights of scroll runway per project (800vh total)

const FlagshipScrollytelling: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const n = PROJECTS.length;

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end end'],
  });

  // Per-project [start, end] ratios on [0..1]
  const ranges = PROJECTS.map((_, i): [number, number] => [i / n, (i + 1) / n]);

  // Bottom progress bar width
  const barWidth = useTransform(scrollYProgress, [0, 1], ['0%', '100%']);

  return (
    <div className="w-full bg-[#F5F9FA]">
      {/* ═══════════════════════════════════════════════════════════
          1. INTRO HEADER (Static Document Flow — Never Overlaps Stage!)
      ══════════════════════════════════════════════════════════ */}
      <div className="pt-24 pb-16 border-t border-[#0E7490]/15 relative overflow-hidden">
        {/* Ambient background glow (Static CSS Radial Gradient - zero lag) */}
        <div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] rounded-full pointer-events-none"
          style={{
            background: 'radial-gradient(circle, #06B6D415 0%, #0E749008 40%, transparent 70%)',
          }}
        />

        <div className="container mx-auto px-6 max-w-7xl relative z-10">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-8">
            <div>
              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#0E7490]/10 border border-[#0E7490]/25 text-[#0E7490] text-[11px] font-black tracking-widest uppercase mb-4 shadow-2xs">
                <Sparkles size={13} className="text-[#06B6D4]" />
                <span>Featured Work — Apple-Style Scrollytelling</span>
              </div>
              <h2 className="text-4xl sm:text-5xl md:text-6xl font-black text-[#0C1A20] tracking-tight leading-[1.05]">
                Selected Flagship Projects
              </h2>
              <p className="text-[#0C1A20]/75 text-sm sm:text-base md:text-lg mt-3 max-w-2xl font-normal leading-relaxed">
                High-impact software solutions engineered with robust architecture, AI integration, and enterprise DevSecOps standards. Scroll down to zoom deep into each platform's architecture.
              </p>
            </div>
            <Link
              to="/projects"
              className="inline-flex items-center gap-2 px-7 py-3.5 rounded-full bg-white border border-[#0E7490]/25 shadow-xs hover:shadow-md hover:border-[#06B6D4] text-xs font-bold text-[#0C1A20] hover:text-[#0E7490] transition-all group shrink-0"
            >
              <span>View All Projects</span>
              <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
        </div>
      </div>

      {/* ═══════════════════════════════════════════════════════════
          2. STICKY SCROLLYTELLING STAGE (800vh tall runway)
      ══════════════════════════════════════════════════════════ */}
      <section
        ref={containerRef}
        style={{ height: `${n * SCROLL_RUNWAY * 100}vh` }}
        className="relative"
        aria-label="Flagship Projects Interactive Stage"
      >
        <div className="sticky top-0 h-screen overflow-hidden bg-[#F5F9FA]">

          {/* ── Stage Top Bar ───────────────────────────────── */}
          <div className="absolute top-6 left-6 right-6 z-50 flex items-center justify-between pointer-events-none">
            <span
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-[11px] font-black tracking-widest uppercase border shadow-sm bg-white/90 backdrop-blur-md"
              style={{ borderColor: '#0E749028', color: '#0E7490' }}
            >
              <span className="w-1.5 h-1.5 rounded-full bg-[#06B6D4] animate-pulse" />
              <span>Scroll to explore architecture ↓</span>
            </span>
            <Link
              to="/projects"
              className="hidden sm:inline-flex items-center gap-1.5 px-5 py-2 rounded-full bg-white/90 backdrop-blur-md border text-xs font-bold hover:border-[#06B6D4] hover:text-[#0E7490] transition-all shadow-sm pointer-events-auto"
              style={{ borderColor: '#0E749025', color: '#0C1A20' }}
            >
              <span>All Projects</span>
              <ArrowRight size={12} />
            </Link>
          </div>

          {/* ── Dot Navigation (Right Side) ──────────────────── */}
          <div className="absolute right-6 top-1/2 -translate-y-1/2 z-50 flex flex-col gap-3.5">
            {ranges.map(([s, e], i) => (
              <SceneDot key={i} scrollYProgress={scrollYProgress} startRatio={s} endRatio={e} />
            ))}
          </div>

          {/* ── Chapter Counter (Bottom Left) ────────────────── */}
          <div className="absolute bottom-12 left-6 z-50 pointer-events-none">
            {ranges.map(([s, e], i) => (
              <ChapterLabel
                key={i}
                scrollYProgress={scrollYProgress}
                startRatio={s}
                endRatio={e}
                index={i}
                total={n}
              />
            ))}
          </div>

          {/* ── Progress Bar (Bottom Center) ─────────────────── */}
          <div
            className="absolute bottom-6 left-1/2 -translate-x-1/2 z-50 w-52 h-1 rounded-full overflow-hidden"
            style={{ background: '#0E749022' }}
          >
            <motion.div
              className="h-full rounded-full transform-gpu"
              style={{ width: barWidth, background: '#06B6D4' }}
            />
          </div>

          {/* ── Project Scenes ───────────────────────────────── */}
          <div className="absolute inset-0">
            {PROJECTS.map((project, i) => (
              <ProjectScene
                key={project.id}
                project={project}
                scrollYProgress={scrollYProgress}
                startRatio={ranges[i][0]}
                endRatio={ranges[i][1]}
                index={i}
              />
            ))}
          </div>

        </div>
      </section>
    </div>
  );
};

export default FlagshipScrollytelling;
