/**
 * FlagshipScrollytelling.tsx
 *
 * TRUE Apple-style scrollytelling: sticky pinned viewport + cinematic infinite dolly-zoom.
 *
 * How it works:
 *   1. The outer <section> is VERY tall (e.g. 700vh for 2 projects).
 *   2. An inner div is position:sticky top:0 height:100vh — it stays fixed
 *      in the viewport the entire time the outer section is scrolled past.
 *   3. We track scrollYProgress [0→1] across the full tall container.
 *   4. Each project owns a sub-range of that progress.
 *   5. Inside each "chapter", the device image zooms from scale 0.05 (tiny, far away)
 *      → scale 1 (fills the screen) → scale 1.6 (flies past).
 *      Blur transitions from 10px → 0 (camera-pulling-focus effect).
 *   6. Text fades in AFTER the device has arrived (cinematic reveal order).
 *
 * Theme colors: #F5F9FA (bg) · #0E7490 (primary) · #06B6D4 (accent) · #0C1A20 (text)
 */

import React, { useRef } from 'react';
import {
  motion,
  useScroll,
  useTransform,
  MotionValue,
  useMotionTemplate,
} from 'framer-motion';
import { ArrowRight, Trophy, ShieldCheck, Zap, Cpu } from 'lucide-react';
import { Link } from 'react-router-dom';

// ─── Types ───────────────────────────────────────────────────

interface Project {
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

// ─── Project data ─────────────────────────────────────────────

const PROJECTS: Project[] = [
  {
    id: 'beruang',
    category: 'AI / Mobile App',
    award: 'Best Architecture Award',
    title: 'Beruang AI Financial Platform',
    subtitle: 'React Native · PyTorch · Bi-LSTM Neural Engine',
    description:
      'AI-powered money management platform with custom Bi-LSTM neural networks (99.61% accuracy) trained on 220,000+ Malaysian transaction records. 86.77 System Usability Scale score.',
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
      'Enterprise-grade secure property rental platform with Zero Trust authentication, AI-driven tenant fraud detection, and a fully automated 14-stage CI/CD DevSecOps security pipeline.',
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

// ─── Per-project scene ────────────────────────────────────────

interface SceneProps {
  project: Project;
  scrollYProgress: MotionValue<number>;
  range: [number, number];
  index: number;
}

const ProjectScene: React.FC<SceneProps> = ({ project, scrollYProgress, range, index }) => {
  const [s, e] = range;
  const mid   = s + (e - s) * 0.50; // device "arrives" at midpoint
  const hold  = s + (e - s) * 0.70; // text holds until here
  const isEven = index % 2 === 0;

  // ── Scene opacity: fade in / out around this chapter ──────
  const sceneOpacity = useTransform(
    scrollYProgress,
    [s, s + (e - s) * 0.10, hold + 0.02, e],
    [0, 1, 1, 0]
  );

  // ── Cinematic DOLLY ZOOM on the primary device ────────────
  // Starts very small (far away) and zooms into full size
  const deviceScale = useTransform(
    scrollYProgress,
    [s,    mid,  hold, e],
    [0.04, 1.0,  1.0,  1.6]
  );

  // Camera-pull blur: blurry when far, sharp on arrival
  const blurRaw = useTransform(
    scrollYProgress,
    [s, s + (e - s) * 0.40, mid],
    [12, 3, 0]
  );
  const filterVal = useMotionTemplate`blur(${blurRaw}px)`;

  // ── Secondary mobile phone (zooms faster — depth separation) ──
  const mobileScale = useTransform(
    scrollYProgress,
    [s,    mid,  hold, e],
    [0.02, 1.08, 1.08, 1.8]
  );
  const mobileY = useTransform(
    scrollYProgress,
    [s,  mid, hold, e],
    [120, 0,   0,  -80]
  );

  // ── Text column: fades in AFTER device arrives ────────────
  const textOpacity = useTransform(
    scrollYProgress,
    [mid - (e - s) * 0.12, mid + (e - s) * 0.04, hold + 0.02, e],
    [0, 1, 1, 0]
  );
  const textY = useTransform(
    scrollYProgress,
    [mid - (e - s) * 0.12, mid + (e - s) * 0.04],
    [50, 0]
  );

  // ── Floating chips slide in from outside after device ─────
  const chipsOpacity = useTransform(
    scrollYProgress,
    [mid, mid + (e - s) * 0.07, hold + 0.02, e],
    [0, 1, 1, 0]
  );
  const chip1X = useTransform(scrollYProgress, [mid, mid + (e - s) * 0.08], [-70, 0]);
  const chip2X = useTransform(scrollYProgress, [mid, mid + (e - s) * 0.10], [70, 0]);

  // ── Background depth haze (zooms OUT as device zooms IN) ──
  const bgScale = useTransform(scrollYProgress, [s, mid], [2.8, 1]);

  // ── Radial glow (shrinks as device arrives) ───────────────
  const glowOpacity = useTransform(scrollYProgress, [s, s + (e - s) * 0.25, mid], [0.9, 0.4, 0]);
  const glowScale   = useTransform(scrollYProgress, [s, mid], [3.5, 1]);

  return (
    <motion.div
      style={{ opacity: sceneOpacity }}
      className="absolute inset-0 flex items-center justify-center"
    >
      {/* ── Depth-receding background ── */}
      <motion.div style={{ scale: bgScale }} className="absolute inset-0 pointer-events-none">
        <div
          className="absolute inset-0"
          style={{
            background: `radial-gradient(ellipse 90% 70% at 50% 50%, ${project.accentColor}1A 0%, #F5F9FA 65%)`,
          }}
        />
        {/* Perspective grid lines */}
        <div
          className="absolute inset-0 opacity-25"
          style={{
            backgroundImage: `linear-gradient(${project.accentColor}30 1px, transparent 1px),
                              linear-gradient(90deg, ${project.accentColor}30 1px, transparent 1px)`,
            backgroundSize: '80px 80px',
          }}
        />
      </motion.div>

      {/* ── Radial glow (vanishes as device arrives) ── */}
      <motion.div
        style={{ scale: glowScale, opacity: glowOpacity }}
        className="absolute inset-0 flex items-center justify-center pointer-events-none"
      >
        <div
          className="w-[500px] h-[500px] rounded-full"
          style={{
            background: `radial-gradient(circle, ${project.accentColor}55 0%, transparent 70%)`,
            filter: 'blur(40px)',
          }}
        />
      </motion.div>

      {/* ── Main two-column layout ── */}
      <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-12 grid lg:grid-cols-2 gap-8 lg:gap-16 items-center h-full relative z-10 pt-20 pb-16">

        {/* TEXT COLUMN */}
        <motion.div
          style={{ opacity: textOpacity, y: textY }}
          className={`space-y-5 ${isEven ? 'lg:order-1' : 'lg:order-2'}`}
        >
          <div className="flex flex-wrap items-center gap-3">
            <span
              className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full text-[11px] font-black tracking-widest uppercase border"
              style={{
                background: `${project.accentColor}18`,
                borderColor: `${project.accentColor}45`,
                color: '#0E7490',
              }}
            >
              <span className="w-1.5 h-1.5 rounded-full animate-pulse" style={{ background: project.accentColor }} />
              {project.category}
            </span>
            <span className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full bg-[#0E7490]/10 border border-[#0E7490]/30 text-[#0E7490] text-[11px] font-bold">
              <Trophy size={11} />
              {project.award}
            </span>
          </div>

          <div>
            <h3 className="text-3xl sm:text-4xl xl:text-5xl font-black text-[#0C1A20] tracking-tight leading-[1.08]">
              {project.title}
            </h3>
            <p className="text-sm font-bold mt-2" style={{ color: '#0E7490' }}>
              {project.subtitle}
            </p>
          </div>

          <p className="text-sm sm:text-base text-[#0C1A20]/70 leading-relaxed max-w-lg">
            {project.description}
          </p>

          <div className="flex flex-wrap gap-2">
            {project.techBadges.map((badge, i) => (
              <span
                key={i}
                className="px-3 py-1.5 rounded-xl bg-white border text-[#0C1A20] text-xs font-semibold hover:border-[#06B6D4] transition-colors cursor-default"
                style={{ borderColor: '#0E749025' }}
              >
                {badge}
              </span>
            ))}
          </div>

          <div
            className="grid grid-cols-3 gap-4 p-4 rounded-2xl"
            style={{ background: '#F5F9FA', border: '1px solid #0E749025' }}
          >
            {project.metrics.map((m, mi) => (
              <div
                key={mi}
                className={`text-center ${mi === 1 ? 'border-x' : ''}`}
                style={{ borderColor: '#0E749020' }}
              >
                <div className="text-xl sm:text-2xl font-black" style={{ color: '#0E7490' }}>{m.value}</div>
                <div className="text-[10px] font-bold text-[#0C1A20]/55 uppercase tracking-wider mt-0.5">{m.label}</div>
              </div>
            ))}
          </div>

          <Link
            to={project.link}
            className="inline-flex items-center gap-2 px-7 py-4 rounded-full text-white text-sm font-bold transition-all group/btn"
            style={{ background: '#0E7490', boxShadow: '0 12px 28px rgba(14,116,144,0.25)' }}
          >
            <span>Explore Case Study</span>
            <ArrowRight size={16} className="group-hover/btn:translate-x-1 transition-transform" />
          </Link>
        </motion.div>

        {/* DEVICE ZOOM COLUMN */}
        <div className={`relative flex items-center justify-center ${isEven ? 'lg:order-2' : 'lg:order-1'}`}>
          {project.secondaryImage ? (
            /* Beruang: Dashboard + Mobile phone with depth separation */
            <div className="relative w-full aspect-[4/3] flex items-center justify-center">
              {/* Dashboard (background layer) */}
              <motion.div
                style={{
                  scale: deviceScale,
                  filter: filterVal,
                  willChange: 'transform, filter',
                  border: '2px solid #0E749030',
                  background: '#fff',
                }}
                className="w-[90%] aspect-[16/10] rounded-2xl overflow-hidden shadow-2xl"
              >
                <img
                  src={project.primaryImage}
                  alt={project.title}
                  className="w-full h-full object-cover object-top"
                  loading="lazy"
                />
                <div className="absolute inset-0" style={{ background: 'linear-gradient(to top, #0C1A2030, transparent)' }} />
              </motion.div>

              {/* Mobile phone (foreground layer, faster zoom = depth pop) */}
              <motion.div
                style={{
                  scale: mobileScale,
                  y: mobileY,
                  willChange: 'transform',
                  borderColor: '#0C1A20',
                  boxShadow: '0 30px 70px rgba(14,116,144,0.4)',
                }}
                className="absolute left-0 bottom-0 w-[43%] aspect-[9/19] rounded-[30px] overflow-hidden border-4 z-20"
              >
                <img
                  src={project.secondaryImage}
                  alt={project.title + ' mobile'}
                  className="w-full h-full object-cover object-top"
                  loading="lazy"
                />
                <div className="absolute top-2 left-1/2 -translate-x-1/2 w-14 h-3 bg-black rounded-full" />
              </motion.div>

              {/* Chip 1 */}
              <motion.div
                style={{ x: chip1X, opacity: chipsOpacity }}
                className="absolute -top-3 right-0 z-30 hidden sm:flex items-center gap-2 px-4 py-2 rounded-2xl bg-white/95 backdrop-blur border border-[#0E7490]/20 shadow-xl text-xs font-black text-[#0C1A20]"
              >
                <Zap size={13} style={{ color: '#06B6D4' }} />
                99.61% AI Accuracy
              </motion.div>

              {/* Chip 2 */}
              <motion.div
                style={{ x: chip2X, opacity: chipsOpacity }}
                className="absolute -bottom-2 right-4 z-30 hidden sm:flex items-center gap-2 px-4 py-2 rounded-2xl bg-white/95 backdrop-blur border border-[#0E7490]/20 shadow-xl text-xs font-black text-[#0C1A20]"
              >
                <Cpu size={13} style={{ color: '#0E7490' }} />
                220k+ Transactions
              </motion.div>
            </div>
          ) : (
            /* RentVerse: Laptop mockup */
            <div className="relative w-full">
              <motion.div
                style={{
                  scale: deviceScale,
                  filter: filterVal,
                  willChange: 'transform, filter',
                }}
                className="w-full"
              >
                <div
                  className="w-full rounded-t-2xl p-2.5 pt-4 shadow-2xl relative border-2"
                  style={{ background: '#0C1A20', borderColor: '#0E749045' }}
                >
                  <div className="absolute top-1.5 left-1/2 -translate-x-1/2 w-2 h-2 rounded-full bg-slate-800 border border-slate-600 flex items-center justify-center">
                    <div className="w-0.5 h-0.5 rounded-full" style={{ background: '#06B6D4' }} />
                  </div>
                  <div className="w-full aspect-[16/10] bg-slate-950 rounded-lg overflow-hidden border border-slate-800">
                    <img
                      src={project.primaryImage}
                      alt={project.title}
                      className="w-full h-full object-cover object-top"
                      loading="lazy"
                    />
                  </div>
                </div>
                <div
                  className="w-[108%] -ml-[4%] h-4 rounded-b-2xl border-t flex justify-center items-start"
                  style={{ background: 'linear-gradient(to bottom, #1E293B, #0C1A20)', borderColor: '#0E749040' }}
                >
                  <div className="w-16 h-1.5 rounded-b-md" style={{ background: '#0C1A20' }} />
                </div>
              </motion.div>

              {/* Chip 1 */}
              <motion.div
                style={{ x: chip1X, opacity: chipsOpacity }}
                className="absolute -top-4 -left-4 z-30 hidden sm:flex items-center gap-2 px-4 py-2 rounded-2xl bg-white/95 backdrop-blur border border-[#0E7490]/20 shadow-xl text-xs font-black text-[#0C1A20]"
              >
                <Trophy size={13} style={{ color: '#0E7490' }} />
                4 Awards
              </motion.div>

              {/* Chip 2 */}
              <motion.div
                style={{ x: chip2X, opacity: chipsOpacity }}
                className="absolute -bottom-4 -right-4 z-30 hidden sm:flex items-center gap-2 px-4 py-2 rounded-2xl bg-white/95 backdrop-blur border border-[#0E7490]/20 shadow-xl text-xs font-black text-[#0C1A20]"
              >
                <ShieldCheck size={13} style={{ color: '#06B6D4' }} />
                14-Stage DevSecOps
              </motion.div>
            </div>
          )}
        </div>
      </div>
    </motion.div>
  );
};

// ─── Main scrollytelling section ──────────────────────────────

const SCROLL_RUNWAY = 4; // viewport heights per project (more = slower, more cinematic)

const FlagshipScrollytelling: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const n = PROJECTS.length;

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end end'],
  });

  const ranges: [number, number][] = PROJECTS.map((_, i) => [i / n, (i + 1) / n]);

  // Title fades out before first project starts
  const titleOpacity = useTransform(scrollYProgress, [0, 0.07], [1, 0]);
  const titleY       = useTransform(scrollYProgress, [0, 0.07], [0, -50]);

  // Chapter number per project
  const makeChapterOpacity = (i: number) =>
    useTransform(
      scrollYProgress,
      [ranges[i][0], ranges[i][0] + 0.02, ranges[i][1] - 0.04, ranges[i][1]],
      [0, 1, 1, 0]
    );

  // Dot opacity per project
  const makeDotOpacity = (i: number) =>
    useTransform(
      scrollYProgress,
      [ranges[i][0], ranges[i][0] + 0.03, ranges[i][1] - 0.03, ranges[i][1]],
      [0.25, 1, 1, 0.25]
    );

  // Dot scale per project
  const makeDotScale = (i: number) =>
    useTransform(
      scrollYProgress,
      [ranges[i][0], ranges[i][0] + 0.03, ranges[i][1] - 0.03, ranges[i][1]],
      [1, 1.6, 1.6, 1]
    );

  // Progress bar width
  const progressWidth = useTransform(scrollYProgress, [0, 1], ['0%', '100%']);

  return (
    <section
      ref={containerRef}
      style={{ height: `${n * SCROLL_RUNWAY * 100}vh` }}
      className="relative"
      aria-label="Flagship Projects"
    >
      {/* ══ STICKY VIEWPORT ══════════════════════════════════════════ */}
      <div className="sticky top-0 h-screen overflow-hidden" style={{ background: '#F5F9FA' }}>

        {/* Top bar */}
        <div className="absolute top-6 left-6 right-6 z-50 flex items-center justify-between">
          <span
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-[11px] font-black tracking-widest uppercase border"
            style={{ background: '#0E749012', borderColor: '#0E749030', color: '#0E7490' }}
          >
            ✦ Featured Work — Scroll to explore ↓
          </span>
          <Link
            to="/projects"
            className="hidden sm:inline-flex items-center gap-1.5 px-5 py-2 rounded-full bg-white border text-xs font-bold text-[#0C1A20] hover:border-[#06B6D4] hover:text-[#0E7490] transition-all shadow-sm"
            style={{ borderColor: '#0E749025' }}
          >
            View All <ArrowRight size={12} />
          </Link>
        </div>

        {/* Dot navigation (right side) */}
        <div className="absolute right-5 top-1/2 -translate-y-1/2 z-50 flex flex-col gap-3">
          {PROJECTS.map((p, i) => (
            <motion.div
              key={p.id}
              style={{ opacity: makeDotOpacity(i), scale: makeDotScale(i) }}
              className="w-2 h-2 rounded-full bg-[#0E7490]"
            />
          ))}
        </div>

        {/* Chapter counter (bottom-left) */}
        <div className="absolute bottom-14 left-6 z-50">
          {PROJECTS.map((p, i) => (
            <motion.div
              key={p.id}
              style={{ opacity: makeChapterOpacity(i) }}
              className="absolute bottom-0 left-0 flex items-baseline gap-1.5"
            >
              <span className="text-6xl font-black select-none tabular-nums" style={{ color: '#0E749020' }}>
                {String(i + 1).padStart(2, '0')}
              </span>
              <span className="text-xs font-bold uppercase tracking-widest" style={{ color: '#0C1A2040' }}>
                / {String(n).padStart(2, '0')}
              </span>
            </motion.div>
          ))}
        </div>

        {/* Scroll progress bar (bottom centre) */}
        <div className="absolute bottom-5 left-1/2 -translate-x-1/2 z-50 w-48 h-1 rounded-full overflow-hidden" style={{ background: '#0E749025' }}>
          <motion.div className="h-full rounded-full" style={{ width: progressWidth, background: '#06B6D4' }} />
        </div>

        {/* Hero title (fades out as first project zooms in) */}
        <motion.div
          style={{ opacity: titleOpacity, y: titleY }}
          className="absolute inset-0 flex flex-col items-center justify-center text-center z-40 pointer-events-none px-4"
        >
          <h2 className="text-4xl sm:text-6xl lg:text-7xl font-black tracking-tight leading-[1.05]" style={{ color: '#0C1A20' }}>
            Selected<br />
            <span style={{ color: '#0E7490' }}>Flagship</span> Projects
          </h2>
          <p className="text-base sm:text-lg mt-5 max-w-lg leading-relaxed" style={{ color: '#0C1A2060' }}>
            High-impact software solutions — scroll to zoom into each one.
          </p>
          <div className="mt-10 flex flex-col items-center gap-2">
            <span className="text-xs font-bold uppercase tracking-widest" style={{ color: '#0E749070' }}>Scroll</span>
            <motion.div
              animate={{ y: [0, 8, 0] }}
              transition={{ duration: 1.4, repeat: Infinity, ease: 'easeInOut' }}
            >
              <svg width="22" height="32" viewBox="0 0 22 32" fill="none">
                <rect x="2" y="2" width="18" height="28" rx="9" stroke="#0E7490" strokeWidth="2" strokeOpacity="0.35"/>
                <rect x="9" y="6" width="4" height="7" rx="2" fill="#0E7490" fillOpacity="0.6"/>
              </svg>
            </motion.div>
          </div>
        </motion.div>

        {/* Project scenes */}
        <div className="absolute inset-0">
          {PROJECTS.map((project, i) => (
            <ProjectScene
              key={project.id}
              project={project}
              scrollYProgress={scrollYProgress}
              range={ranges[i]}
              index={i}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default FlagshipScrollytelling;
