/**
 * FlagshipScrollytelling.tsx
 *
 * TRUE Apple-style sticky scrollytelling with cinematic infinite dolly-zoom.
 *
 * Architecture:
 *   • Outer <section> is 800vh tall (400vh per project = plenty of scroll runway).
 *   • Inner div is `position:sticky; top:0; height:100vh` — stays pinned in the
 *     viewport the entire time the outer section is scrolled.
 *   • useScroll tracks [0→1] progress across the full tall container.
 *   • Each project owns a sub-range of that progress.
 *   • Device starts at scale 0.04 (tiny dot far away) and zooms to 1.0 (full size),
 *     then continues to 1.6 (flies past — parallax overshoot).
 *   • Blur goes 12px → 0 (camera-pulling-focus effect).
 *   • Text fades in AFTER device arrives → cinematic reveal order.
 *
 * Theme: #F5F9FA (bg) · #0E7490 (primary) · #06B6D4 (accent) · #0C1A20 (text)
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
      'AI-powered money management platform with a custom Bi-LSTM neural network (99.61% accuracy) trained on 220,000+ Malaysian transactions. Scored 86.77 on the System Usability Scale.',
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
      'Enterprise-grade secure property rental platform with Zero Trust authentication, AI fraud detection, and a fully automated 14-stage CI/CD DevSecOps security pipeline.',
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
  startRatio: number;   // e.g. 0.0 for project 0, 0.5 for project 1
  endRatio: number;     // e.g. 0.5 for project 0, 1.0 for project 1
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
  const arrivalPoint = startRatio + span * 0.50; // device "fully arrives" here
  const holdPoint    = startRatio + span * 0.72; // text starts to fade
  const isEven       = index % 2 === 0;

  // ── Scene fade: in at start, out at end ───────────────────
  const sceneOpacity = useTransform(
    scrollYProgress,
    [startRatio, startRatio + span * 0.10, holdPoint + 0.03, endRatio],
    [0, 1, 1, 0]
  );

  // ── DOLLY ZOOM: device zooms from tiny dot to full screen ─
  const deviceScale = useTransform(
    scrollYProgress,
    [startRatio, arrivalPoint, holdPoint, endRatio],
    [0.04,       1.0,          1.0,       1.65]
  );

  // ── Camera pull-focus blur (12px → 0) ────────────────────
  const blurPx = useTransform(
    scrollYProgress,
    [startRatio, startRatio + span * 0.38, arrivalPoint],
    [14, 4, 0]
  );
  const deviceFilter = useMotionTemplate`blur(${blurPx}px)`;

  // ── Secondary device: even faster zoom (depth separation) ─
  const mobileScale = useTransform(
    scrollYProgress,
    [startRatio, arrivalPoint, holdPoint, endRatio],
    [0.02,       1.08,          1.08,      1.85]
  );
  const mobileY = useTransform(
    scrollYProgress,
    [startRatio, arrivalPoint, holdPoint, endRatio],
    [130,        0,            0,         -90]
  );

  // ── Text: fades in after device arrives ──────────────────
  const textOpacity = useTransform(
    scrollYProgress,
    [arrivalPoint - span * 0.10, arrivalPoint + span * 0.05, holdPoint + 0.02, endRatio],
    [0, 1, 1, 0]
  );
  const textY = useTransform(
    scrollYProgress,
    [arrivalPoint - span * 0.10, arrivalPoint + span * 0.05],
    [48, 0]
  );

  // ── Floating chips slide in from sides after device ───────
  const chipOpacity = useTransform(
    scrollYProgress,
    [arrivalPoint, arrivalPoint + span * 0.07, holdPoint + 0.02, endRatio],
    [0, 1, 1, 0]
  );
  const chip1X = useTransform(
    scrollYProgress,
    [arrivalPoint, arrivalPoint + span * 0.09],
    [-80, 0]
  );
  const chip2X = useTransform(
    scrollYProgress,
    [arrivalPoint, arrivalPoint + span * 0.11],
    [80, 0]
  );

  // ── Background depth-haze zooms OUT as device zooms IN ───
  const bgScale = useTransform(scrollYProgress, [startRatio, arrivalPoint], [2.6, 1]);

  // ── Glow halo shrinks as device arrives ──────────────────
  const glowOpacity = useTransform(scrollYProgress, [startRatio, startRatio + span * 0.28, arrivalPoint], [0.85, 0.35, 0]);
  const glowScale   = useTransform(scrollYProgress, [startRatio, arrivalPoint], [4, 1]);

  return (
    <motion.div
      style={{ opacity: sceneOpacity }}
      className="absolute inset-0 flex items-center justify-center pointer-events-none"
    >
      {/* ── Depth-receding background ────────────────────── */}
      <motion.div style={{ scale: bgScale }} className="absolute inset-0 pointer-events-none">
        <div
          className="absolute inset-0"
          style={{
            background: `radial-gradient(ellipse 90% 70% at 50% 50%, ${project.accentColor}1C 0%, #F5F9FA 62%)`,
          }}
        />
        <div
          className="absolute inset-0 opacity-20"
          style={{
            backgroundImage: `
              linear-gradient(${project.accentColor}35 1px, transparent 1px),
              linear-gradient(90deg, ${project.accentColor}35 1px, transparent 1px)
            `,
            backgroundSize: '80px 80px',
          }}
        />
      </motion.div>

      {/* ── Radial glow (vanishes as device arrives) ──────── */}
      <motion.div
        style={{ scale: glowScale, opacity: glowOpacity }}
        className="absolute inset-0 flex items-center justify-center pointer-events-none"
      >
        <div
          className="w-[500px] h-[500px] rounded-full"
          style={{
            background: `radial-gradient(circle, ${project.accentColor}60 0%, transparent 70%)`,
            filter: 'blur(40px)',
          }}
        />
      </motion.div>

      {/* ── Two-column content layout ─────────────────────── */}
      <div
        className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-12 grid lg:grid-cols-2 gap-8 lg:gap-16 items-center h-full relative z-10 pt-20 pb-16"
        style={{ pointerEvents: 'auto' }}
      >
        {/* TEXT COLUMN */}
        <motion.div
          style={{ opacity: textOpacity, y: textY }}
          className={`space-y-5 ${isEven ? 'lg:order-1' : 'lg:order-2'}`}
        >
          {/* Badges */}
          <div className="flex flex-wrap items-center gap-3">
            <span
              className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full text-[11px] font-black tracking-widest uppercase border"
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
              className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full text-[11px] font-bold border"
              style={{ background: '#0E749012', borderColor: '#0E749030', color: '#0E7490' }}
            >
              <Trophy size={11} />
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
          <p className="text-sm sm:text-base leading-relaxed max-w-lg" style={{ color: '#0C1A2075' }}>
            {project.description}
          </p>

          {/* Tech badges */}
          <div className="flex flex-wrap gap-2">
            {project.techBadges.map((b, i) => (
              <span
                key={i}
                className="px-3 py-1.5 rounded-xl bg-white text-xs font-semibold border hover:border-[#06B6D4] transition-colors cursor-default"
                style={{ color: '#0C1A20', borderColor: '#0E749025' }}
              >
                {b}
              </span>
            ))}
          </div>

          {/* Metrics */}
          <div
            className="grid grid-cols-3 gap-4 p-4 rounded-2xl"
            style={{ background: '#F5F9FA', border: '1px solid #0E749022' }}
          >
            {project.metrics.map((m, mi) => (
              <div
                key={mi}
                className={`text-center ${mi === 1 ? 'border-x' : ''}`}
                style={{ borderColor: '#0E749022' }}
              >
                <div className="text-xl sm:text-2xl font-black" style={{ color: '#0E7490' }}>
                  {m.value}
                </div>
                <div className="text-[10px] font-bold uppercase tracking-wider mt-0.5" style={{ color: '#0C1A2055' }}>
                  {m.label}
                </div>
              </div>
            ))}
          </div>

          {/* CTA */}
          <Link
            to={project.link}
            className="inline-flex items-center gap-2 px-7 py-4 rounded-full text-white text-sm font-bold transition-colors group/btn"
            style={{ background: '#0E7490', boxShadow: '0 12px 28px rgba(14,116,144,0.22)' }}
            onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.background = '#06B6D4'; }}
            onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.background = '#0E7490'; }}
          >
            <span>Explore Case Study</span>
            <ArrowRight size={16} className="group-hover/btn:translate-x-1 transition-transform" />
          </Link>
        </motion.div>

        {/* DEVICE ZOOM COLUMN */}
        <div className={`relative flex items-center justify-center ${isEven ? 'lg:order-2' : 'lg:order-1'}`}>
          {project.secondaryImage ? (
            /* ── Beruang: Dashboard + Phone ── */
            <div className="relative w-full aspect-[4/3] flex items-center justify-center">
              {/* Dashboard (BG layer) */}
              <motion.div
                style={{ scale: deviceScale, filter: deviceFilter, willChange: 'transform, filter', border: '2px solid #0E749028', background: '#fff' }}
                className="w-[90%] aspect-[16/10] rounded-2xl overflow-hidden shadow-2xl"
              >
                <img src={project.primaryImage} alt={project.title} className="w-full h-full object-cover object-top" loading="lazy" />
                <div className="absolute inset-0" style={{ background: 'linear-gradient(to top, #0C1A2028, transparent)' }} />
              </motion.div>

              {/* Phone (FG layer, faster zoom) */}
              <motion.div
                style={{ scale: mobileScale, y: mobileY, willChange: 'transform', borderColor: '#0C1A20', boxShadow: '0 30px 70px rgba(14,116,144,0.38)' }}
                className="absolute left-0 bottom-0 w-[43%] aspect-[9/19] rounded-[30px] overflow-hidden border-4 z-20"
              >
                <img src={project.secondaryImage} alt={project.title + ' mobile'} className="w-full h-full object-cover object-top" loading="lazy" />
                <div className="absolute top-2 left-1/2 -translate-x-1/2 w-14 h-3 bg-black rounded-full" />
              </motion.div>

              {/* Chip 1 */}
              <motion.div
                style={{ x: chip1X, opacity: chipOpacity }}
                className="absolute -top-3 right-0 z-30 hidden sm:flex items-center gap-2 px-4 py-2 rounded-2xl bg-white/95 backdrop-blur border shadow-xl text-xs font-black"
                
              >
                <Zap size={13} style={{ color: '#06B6D4' }} />
                99.61% AI Accuracy
              </motion.div>

              {/* Chip 2 */}
              <motion.div
                style={{ x: chip2X, opacity: chipOpacity }}
                className="absolute -bottom-2 right-4 z-30 hidden sm:flex items-center gap-2 px-4 py-2 rounded-2xl bg-white/95 backdrop-blur border shadow-xl text-xs font-black"
                
              >
                <Cpu size={13} style={{ color: '#0E7490' }} />
                220k+ Transactions
              </motion.div>
            </div>
          ) : (
            /* ── RentVerse: Laptop mockup ── */
            <div className="relative w-full">
              <motion.div
                style={{ scale: deviceScale, filter: deviceFilter, willChange: 'transform, filter' }}
                className="w-full"
              >
                <div
                  className="w-full rounded-t-2xl p-2.5 pt-4 shadow-2xl relative border-2"
                  style={{ background: '#0C1A20', borderColor: '#0E749042' }}
                >
                  <div className="absolute top-1.5 left-1/2 -translate-x-1/2 w-2 h-2 rounded-full bg-slate-800 border border-slate-600 flex items-center justify-center">
                    <div className="w-0.5 h-0.5 rounded-full" style={{ background: '#06B6D4' }} />
                  </div>
                  <div className="w-full aspect-[16/10] bg-slate-950 rounded-lg overflow-hidden border border-slate-800">
                    <img src={project.primaryImage} alt={project.title} className="w-full h-full object-cover object-top" loading="lazy" />
                  </div>
                </div>
                <div
                  className="w-[108%] -ml-[4%] h-4 rounded-b-2xl border-t flex justify-center items-start"
                  style={{ background: 'linear-gradient(to bottom, #1E293B, #0C1A20)', borderColor: '#0E749038' }}
                >
                  <div className="w-16 h-1.5 rounded-b-md" style={{ background: '#0C1A20' }} />
                </div>
              </motion.div>

              {/* Chip 1 */}
              <motion.div
                style={{ x: chip1X, opacity: chipOpacity }}
                className="absolute -top-4 -left-4 z-30 hidden sm:flex items-center gap-2 px-4 py-2 rounded-2xl bg-white/95 backdrop-blur border shadow-xl text-xs font-black"
                
              >
                <Trophy size={13} style={{ color: '#0E7490' }} />
                4 Awards Won
              </motion.div>

              {/* Chip 2 */}
              <motion.div
                style={{ x: chip2X, opacity: chipOpacity }}
                className="absolute -bottom-4 -right-4 z-30 hidden sm:flex items-center gap-2 px-4 py-2 rounded-2xl bg-white/95 backdrop-blur border shadow-xl text-xs font-black"
                
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

// ─── Dot indicator (one per project) — rendered at fixed positions ──

interface DotProps {
  scrollYProgress: MotionValue<number>;
  startRatio: number;
  endRatio: number;
}

const SceneDot: React.FC<DotProps> = ({ scrollYProgress, startRatio, endRatio }) => {
  const opacity = useTransform(
    scrollYProgress,
    [startRatio, startRatio + 0.03, endRatio - 0.03, endRatio],
    [0.25, 1, 1, 0.25]
  );
  const scale = useTransform(
    scrollYProgress,
    [startRatio, startRatio + 0.03, endRatio - 0.03, endRatio],
    [1, 1.7, 1.7, 1]
  );
  return (
    <motion.div
      style={{ opacity, scale }}
      className="w-2 h-2 rounded-full"
      
    />
  );
};

// ─── Chapter label (one per project) ────────────────────────────

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
    [startRatio, startRatio + span * 0.10, endRatio - span * 0.05, endRatio],
    [0, 1, 1, 0]
  );
  return (
    <motion.div style={{ opacity }} className="absolute bottom-0 left-0 flex items-baseline gap-1.5">
      <span className="text-6xl font-black select-none tabular-nums" style={{ color: '#0E749018' }}>
        {String(index + 1).padStart(2, '0')}
      </span>
      <span className="text-xs font-bold uppercase tracking-widest" style={{ color: '#0C1A2038' }}>
        / {String(total).padStart(2, '0')}
      </span>
    </motion.div>
  );
};

// ─── Main FlagshipScrollytelling component ────────────────────

const SCROLL_RUNWAY = 4.5; // viewport heights of scroll runway per project

const FlagshipScrollytelling: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const n = PROJECTS.length;

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end end'],
  });

  // Per-project [start, end] ratios on [0..1]
  const ranges = PROJECTS.map((_, i): [number, number] => [i / n, (i + 1) / n]);

  // Title fade (fades out right before first project zooms in)
  const titleOpacity = useTransform(scrollYProgress, [0, 0.06], [1, 0]);
  const titleY       = useTransform(scrollYProgress, [0, 0.06], [0, -50]);

  // Progress bar
  const barWidth = useTransform(scrollYProgress, [0, 1], ['0%', '100%']);

  return (
    <section
      ref={containerRef}
      style={{ height: `${n * SCROLL_RUNWAY * 100}vh` }}
      className="relative"
      aria-label="Flagship Projects"
    >
      {/* ═══════════════════════════════════════════════════════════
          STICKY VIEWPORT — stays pinned while outer section scrolls
      ══════════════════════════════════════════════════════════ */}
      <div className="sticky top-0 h-screen overflow-hidden" style={{ background: '#F5F9FA' }}>

        {/* ── Top bar ──────────────────────────────────────── */}
        <div className="absolute top-6 left-6 right-6 z-50 flex items-center justify-between">
          <span
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-[11px] font-black tracking-widest uppercase border"
            style={{ background: '#0E749012', borderColor: '#0E749028', color: '#0E7490' }}
          >
            ✦ Featured Work — scroll to explore ↓
          </span>
          <Link
            to="/projects"
            className="hidden sm:inline-flex items-center gap-1.5 px-5 py-2 rounded-full bg-white border text-xs font-bold hover:border-[#06B6D4] hover:text-[#0E7490] transition-all shadow-sm"
            style={{ borderColor: '#0E749025', color: '#0C1A20' }}
          >
            View All <ArrowRight size={12} />
          </Link>
        </div>

        {/* ── Dot navigation (right side) ─────────────────── */}
        <div className="absolute right-5 top-1/2 -translate-y-1/2 z-50 flex flex-col gap-3">
          {ranges.map(([s, e], i) => (
            <SceneDot key={i} scrollYProgress={scrollYProgress} startRatio={s} endRatio={e} />
          ))}
        </div>

        {/* ── Chapter counter (bottom-left) ────────────────── */}
        <div className="absolute bottom-14 left-6 z-50">
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

        {/* ── Progress bar (bottom-centre) ─────────────────── */}
        <div
          className="absolute bottom-5 left-1/2 -translate-x-1/2 z-50 w-48 h-1 rounded-full overflow-hidden"
          style={{ background: '#0E749022' }}
        >
          <motion.div
            className="h-full rounded-full"
            style={{ width: barWidth, background: '#06B6D4' }}
          />
        </div>

        {/* ── Section title (fades out before first project) ── */}
        <motion.div
          style={{ opacity: titleOpacity, y: titleY }}
          className="absolute inset-0 flex flex-col items-center justify-center text-center z-40 pointer-events-none px-4"
        >
          <h2
            className="text-4xl sm:text-6xl lg:text-7xl font-black tracking-tight leading-[1.05]"
            style={{ color: '#0C1A20' }}
          >
            Selected<br />
            <span style={{ color: '#0E7490' }}>Flagship</span> Projects
          </h2>
          <p className="text-base sm:text-lg mt-5 max-w-lg leading-relaxed" style={{ color: '#0C1A2060' }}>
            High-impact software solutions — scroll to zoom deep into each one.
          </p>
          <motion.div
            className="mt-10 flex flex-col items-center gap-2"
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
          >
            <span className="text-xs font-bold uppercase tracking-widest" style={{ color: '#0E749065' }}>
              Scroll
            </span>
            <svg width="22" height="32" viewBox="0 0 22 32" fill="none">
              <rect x="2" y="2" width="18" height="28" rx="9" stroke="#0E7490" strokeWidth="2" strokeOpacity="0.32"/>
              <rect x="9" y="6" width="4" height="7" rx="2" fill="#0E7490" fillOpacity="0.55"/>
            </svg>
          </motion.div>
        </motion.div>

        {/* ── Project scenes (layered, driven by scroll) ────── */}
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
  );
};

export default FlagshipScrollytelling;
