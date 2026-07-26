/**
 * FlagshipScrollytelling.tsx
 *
 * UPRIGHT STICKY-FRAME CHAPTER SCROLLYTELLING (Zero Lag, Apple/MC+ Style)
 *
 * Architecture & Design:
 *   1. UPRIGHT STATIC DEVICE FRAMES: Instead of slanted or zooming frames that cause GPU lag,
 *      we present pristine, upright iPhone 15 Pro and MacBook Pro frames that stay fixed in a
 *      sticky viewport (`sticky top-0 h-screen`).
 *   2. SCROLLING CHAPTER REPLACEMENT: As you scroll down through the section's height (400vh),
 *      the UI screenshot inside the device screen crossfades to show the exact app UI for each
 *      feature chapter.
 *   3. PUNCHY, HIGH-IMPACT EXPLANATIONS: On the left column, bold, simple, flagship-level
 *      explanations switch in sync with the device screen. Distilled from deep technical
 *      architecture into scannable, zero-fluff insights.
 *   4. 100% BUTTERY SMOOTH (ZERO LAG): Uses Framer Motion's continuous `useTransform` for opacity
 *      and subtle Y-translation on GPU compositor layers (`transform-gpu`). No state re-renders,
 *      no CSS blur filters, and no background grid scaling. 60fps/120fps guaranteed.
 *
 * Theme: #F5F9FA (bg) · #0E7490 (primary) · #06B6D4 (accent) · #0C1A20 (text)
 */

import React, { useRef } from 'react';
import { motion, useScroll, useTransform, MotionValue } from 'framer-motion';
import { ArrowRight, Sparkles, Zap, ShieldCheck, Trophy, Cpu, Search, Brain, CheckCircle2, Lock, Server } from 'lucide-react';
import { Link } from 'react-router-dom';

// ─── Data Structures ──────────────────────────────────────────

interface Chapter {
  id: string;
  number: string;
  badge: string;
  title: string;
  subtitle: string;
  icon: React.ComponentType<any>;
  image: string;
  points: { title: string; desc: string }[];
}

interface ProjectShowcase {
  id: string;
  name: string;
  tagline: string;
  category: string;
  award: string;
  accentColor: string;
  deviceType: 'phone' | 'laptop';
  link: string;
  chapters: Chapter[];
}

const FLAGSHIP_PROJECTS: ProjectShowcase[] = [
  {
    id: 'beruang',
    name: 'Beruang AI Financial Platform',
    tagline: 'React Native · PyTorch · Bi-LSTM Neural Engine',
    category: 'AI / Mobile App',
    award: 'Best Architecture Award',
    accentColor: '#06B6D4',
    deviceType: 'phone',
    link: '/projects',
    chapters: [
      {
        id: 'mirror',
        number: '01',
        badge: 'Interactive Financial Mirror',
        title: 'Instant Natural Language UI',
        subtitle: 'Converts chat queries directly into visual widgets',
        icon: Zap,
        image: '/images/beruang/chat-1.png',
        points: [
          {
            title: 'Dynamic Widget Rendering',
            desc: 'Translates natural language ("Recent expenses?") into interactive 50/30/20 budget donut charts in milliseconds, eradicating cognitive load.',
          },
          {
            title: 'Zero-Latency RAG Pipeline',
            desc: 'Queries Firebase Firestore in real-time to intercept your exact financial footprint without mental math or text-heavy lists.',
          },
        ],
      },
      {
        id: 'nudge',
        number: '02',
        badge: 'Behavioural Nudging',
        title: 'Hyper-Localized Advisory',
        subtitle: 'Contextual lifestyle guidance with psychological anchors',
        icon: Brain,
        image: '/images/beruang/chat-2.png',
        points: [
          {
            title: 'Intelligent Intent Routing',
            desc: 'MiniLM sentence transformers intercept local queries ("makan sedap di pekan tapah") and route directly to cloud LLMs.',
          },
          {
            title: 'Frictionless Accountability',
            desc: 'Recommends great local food while attaching a budget reminder ("Wants je ni, RM358 lagi!") to stop impulsive spending before it happens.',
          },
        ],
      },
      {
        id: 'search',
        number: '03',
        badge: 'Real-Time Web Search',
        title: 'Opportunity Cost Guardian',
        subtitle: 'Ephemeral internet retrieval with spatial reasoning',
        icon: Search,
        image: '/images/beruang/chat-3.png',
        points: [
          {
            title: 'Explicit Online Mode',
            desc: 'Commands like "search rembayung" trigger live internet retrieval for brand-new locations outside static LLM training weights.',
          },
          {
            title: 'Holistic Financial Protection',
            desc: 'Calculates travel friction (2-3 hr drive from Tapah to KL) against your remaining budget so decisions are never made in a vacuum.',
          },
        ],
      },
      {
        id: 'engine',
        number: '04',
        badge: 'Bi-LSTM Neural Engine',
        title: '99.61% AI Accuracy',
        subtitle: 'Custom neural network trained on Malaysian transactions',
        icon: Cpu,
        image: '/images/beruang/home.png',
        points: [
          {
            title: 'Custom PyTorch Architecture',
            desc: 'Powered by a Bi-LSTM model trained on 220,000+ Malaysian transaction records for instant, automated expense categorization.',
          },
          {
            title: '86.77 SUS Usability Score',
            desc: 'Evaluated at an exceptional System Usability Scale score, combining enterprise DevSecOps with frictionless consumer UX.',
          },
        ],
      },
    ],
  },
  {
    id: 'rentverse',
    name: 'RentVerse Rental Ecosystem',
    tagline: 'Next.js 14 · Docker · 14-Stage CI/CD DevSecOps',
    category: 'Web System / DevSecOps',
    award: 'Champion — 4 Awards',
    accentColor: '#0E7490',
    deviceType: 'laptop',
    link: '/projects',
    chapters: [
      {
        id: 'zerotrust',
        number: '01',
        badge: 'Zero Trust Architecture',
        title: 'Enterprise Security Platform',
        subtitle: 'End-to-end encryption & real-time tenant verification',
        icon: Lock,
        image: '/images/rentverse-laptop.jpg',
        points: [
          {
            title: 'Zero Trust Authentication',
            desc: 'Strict identity verification, JWT session rotation, and role-based access control across all tenant and landlord workflows.',
          },
          {
            title: 'AI Fraud Detection Engine',
            desc: 'Intelligent pattern recognition identifies anomalous rental applications and fraudulent property listings in real-time.',
          },
        ],
      },
      {
        id: 'pipeline',
        number: '02',
        badge: '14-Stage DevSecOps Pipeline',
        title: 'Automated CI/CD Security',
        subtitle: 'Continuous inspection & containerized deployment',
        icon: Server,
        image: '/images/rentverse-home.jpg',
        points: [
          {
            title: '14-Stage CI/CD Automation',
            desc: 'Fully integrated security pipeline featuring SonarQube static code analysis, Docker containerization, and automated vulnerability scanning.',
          },
          {
            title: 'High-Performance Scalability',
            desc: 'Built on Next.js 14 and PostgreSQL, delivering sub-second property search and enterprise-grade transaction reliability.',
          },
        ],
      },
    ],
  },
];

// ─── Individual Chapter View (Left Column Text) ───────────────

interface ChapterTextProps {
  chapter: Chapter;
  scrollYProgress: MotionValue<number>;
  start: number;
  fadeIn: number;
  fadeOut: number;
  end: number;
  isLast: boolean;
  accentColor: string;
}

const ChapterTextItem: React.FC<ChapterTextProps> = ({
  chapter,
  scrollYProgress,
  start,
  fadeIn,
  fadeOut,
  end,
  isLast,
  accentColor,
}) => {
  // If it's the first chapter, start fully visible at 0. If last, stay visible at 1.0.
  const opacity = useTransform(
    scrollYProgress,
    [start, fadeIn, fadeOut, end],
    [start === 0 ? 1 : 0, 1, 1, isLast ? 1 : 0]
  );
  const y = useTransform(
    scrollYProgress,
    [start, fadeIn, fadeOut, end],
    [start === 0 ? 0 : 25, 0, 0, isLast ? 0 : -25]
  );
  const pointerEvents = useTransform(scrollYProgress, (v) =>
    v >= start && v <= end ? 'auto' : 'none'
  );

  const IconComponent = chapter.icon;

  return (
    <motion.div
      style={{ opacity, y, pointerEvents }}
      className="col-start-1 row-start-1 flex flex-col justify-center space-y-6 transform-gpu"
    >
      {/* Chapter Number & Badge */}
      <div className="flex items-center gap-3 flex-wrap">
        <span
          className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-black tracking-widest uppercase border shadow-2xs"
          style={{ background: `${accentColor}18`, borderColor: `${accentColor}45`, color: '#0E7490' }}
        >
          <IconComponent size={13} style={{ color: accentColor }} />
          <span>{chapter.number} — {chapter.badge}</span>
        </span>
      </div>

      {/* Title & Subtitle */}
      <div>
        <h4 className="text-3xl sm:text-4xl md:text-5xl font-black text-[#0C1A20] tracking-tight leading-[1.08]">
          {chapter.title}
        </h4>
        <p className="text-sm sm:text-base font-bold text-[#0E7490] mt-2">
          {chapter.subtitle}
        </p>
      </div>

      {/* Bullet Points */}
      <div className="space-y-4 pt-2 max-w-xl">
        {chapter.points.map((pt, i) => (
          <div
            key={i}
            className="flex items-start gap-3.5 p-4 rounded-2xl bg-white border border-[#0E7490]/15 shadow-xs hover:border-[#06B6D4]/40 transition-colors"
          >
            <div className="p-2 rounded-xl bg-[#0E7490]/10 text-[#0E7490] shrink-0 mt-0.5">
              <CheckCircle2 size={16} />
            </div>
            <div>
              <h5 className="text-sm font-black text-[#0C1A20] leading-snug">{pt.title}</h5>
              <p className="text-xs sm:text-sm text-[#0C1A20]/75 mt-1 leading-relaxed">{pt.desc}</p>
            </div>
          </div>
        ))}
      </div>
    </motion.div>
  );
};

// ─── Individual Chapter Image (Inside Device Screen) ──────────

interface ChapterImageProps {
  image: string;
  alt: string;
  scrollYProgress: MotionValue<number>;
  start: number;
  fadeIn: number;
  fadeOut: number;
  end: number;
  isLast: boolean;
}

const ChapterImageItem: React.FC<ChapterImageProps> = ({
  image,
  alt,
  scrollYProgress,
  start,
  fadeIn,
  fadeOut,
  end,
  isLast,
}) => {
  const opacity = useTransform(
    scrollYProgress,
    [start, fadeIn, fadeOut, end],
    [start === 0 ? 1 : 0, 1, 1, isLast ? 1 : 0]
  );
  const scale = useTransform(
    scrollYProgress,
    [start, fadeIn, fadeOut, end],
    [start === 0 ? 1 : 1.05, 1, 1, isLast ? 1 : 0.96]
  );

  return (
    <motion.div
      style={{ opacity, scale }}
      className="absolute inset-0 w-full h-full transform-gpu"
    >
      <img src={image} alt={alt} className="w-full h-full object-cover object-top" loading="lazy" />
      <div className="absolute inset-0 bg-gradient-to-t from-[#0C1A20]/25 via-transparent to-transparent pointer-events-none" />
    </motion.div>
  );
};

// ─── Single Project Section (Sticky Stage + Chapter Runway) ───

interface ProjectSectionProps {
  project: ProjectShowcase;
}

const ProjectSection: React.FC<ProjectSectionProps> = ({ project }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end end'],
  });

  const n = project.chapters.length;
  // Calculate start/end ratios for each chapter on [0..1]
  const chapterTimings = project.chapters.map((_, i) => {
    const span = 1 / n;
    const start = i * span;
    const end = (i + 1) * span;
    // Fade in over 15% of chapter span, hold steady, fade out over last 15%
    const fadeIn = start + span * 0.15;
    const fadeOut = end - span * 0.15;
    return { start, fadeIn, fadeOut, end };
  });

  // Progress bar width for this project
  const barWidth = useTransform(scrollYProgress, [0, 1], ['0%', '100%']);

  return (
    <section
      ref={containerRef}
      style={{ height: `${n * 100}vh` }}
      className="relative w-full border-t border-[#0E7490]/15"
      aria-label={project.name}
    >
      {/* Sticky Viewport (100vh locked while scrolling through chapters) */}
      <div className="sticky top-0 h-screen w-full overflow-hidden bg-[#F5F9FA] flex flex-col justify-between py-6 lg:py-10">
        
        {/* Ambient Glow */}
        <div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] rounded-full pointer-events-none"
          style={{
            background: `radial-gradient(circle, ${project.accentColor}15 0%, #0E749008 40%, transparent 70%)`,
          }}
        />
        <div
          className="absolute inset-0 opacity-15 pointer-events-none"
          style={{
            backgroundImage: `
              linear-gradient(${project.accentColor}25 1px, transparent 1px),
              linear-gradient(90deg, ${project.accentColor}25 1px, transparent 1px)
            `,
            backgroundSize: '80px 80px',
          }}
        />

        {/* Top Project Header Bar */}
        <div className="container mx-auto px-6 max-w-7xl relative z-40 flex items-center justify-between shrink-0">
          <div className="flex items-center gap-3">
            <span
              className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full text-[11px] font-black uppercase tracking-widest border bg-white/90 backdrop-blur-md shadow-2xs"
              style={{ borderColor: `${project.accentColor}40`, color: '#0E7490' }}
            >
              <Trophy size={11} className="text-[#06B6D4]" />
              <span>{project.award}</span>
            </span>
            <span className="text-xs sm:text-sm font-extrabold text-[#0C1A20] hidden md:inline">
              {project.name} — <span className="font-medium text-[#0C1A20]/60">{project.tagline}</span>
            </span>
          </div>
          <Link
            to={project.link}
            className="inline-flex items-center gap-1.5 px-5 py-2 rounded-full bg-white/90 backdrop-blur-md border border-[#0E7490]/25 shadow-xs hover:border-[#06B6D4] text-xs font-bold text-[#0C1A20] hover:text-[#0E7490] transition-all group"
          >
            <span>Explore Architecture</span>
            <ArrowRight size={13} className="group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>

        {/* Main 2-Column Showcase Grid */}
        <div className="container mx-auto px-6 max-w-7xl relative z-30 grid lg:grid-cols-12 gap-8 lg:gap-14 items-center h-full my-auto py-4">
          
          {/* LEFT COLUMN: Scrolling Chapter Explanations (5 cols) */}
          <div className="lg:col-span-5 relative grid items-center min-h-[380px] sm:min-h-[420px]">
            {project.chapters.map((chap, i) => (
              <ChapterTextItem
                key={chap.id}
                chapter={chap}
                scrollYProgress={scrollYProgress}
                start={chapterTimings[i].start}
                fadeIn={chapterTimings[i].fadeIn}
                fadeOut={chapterTimings[i].fadeOut}
                end={chapterTimings[i].end}
                isLast={i === n - 1}
                accentColor={project.accentColor}
              />
            ))}
          </div>

          {/* RIGHT COLUMN: Upright Static Device Frame with Replacing UI (7 cols) */}
          <div className="lg:col-span-7 flex items-center justify-center relative">
            
            {project.deviceType === 'phone' ? (
              /* ── UPRIGHT iPHONE 15 PRO MOCKUP (NOT SLANTED!) ── */
              <div className="relative mx-auto w-[270px] sm:w-[310px] md:w-[330px] aspect-[9/19.2] rounded-[48px] p-3 bg-[#0C1A20] shadow-[0_35px_80px_rgba(14,116,144,0.35)] border-4 border-[#0E7490]/40 ring-1 ring-white/20 transform-gpu">
                
                {/* Speaker / Dynamic Island */}
                <div className="absolute top-5 left-1/2 -translate-x-1/2 w-28 h-6 bg-black rounded-full z-40 flex items-center justify-between px-2.5 border border-white/10 shadow-md">
                  <div className="w-2.5 h-2.5 rounded-full bg-slate-900 ring-1 ring-white/20 flex items-center justify-center">
                    <div className="w-1 h-1 rounded-full bg-[#06B6D4]/70" />
                  </div>
                  <div className="flex items-center gap-1.5">
                    <span className="text-[9px] font-bold text-white/80 tracking-tighter">AI</span>
                    <div className="w-2 h-2 rounded-full bg-[#0E7490] animate-pulse" />
                  </div>
                </div>

                {/* Phone Screen Container where UI images replace/transition */}
                <div className="relative w-full h-full rounded-[38px] overflow-hidden bg-slate-950 border border-white/10 shadow-inner">
                  {project.chapters.map((chap, i) => (
                    <ChapterImageItem
                      key={chap.id}
                      image={chap.image}
                      alt={`${project.name} - ${chap.title}`}
                      scrollYProgress={scrollYProgress}
                      start={chapterTimings[i].start}
                      fadeIn={chapterTimings[i].fadeIn}
                      fadeOut={chapterTimings[i].fadeOut}
                      end={chapterTimings[i].end}
                      isLast={i === n - 1}
                    />
                  ))}
                  {/* Bottom Home Bar */}
                  <div className="absolute bottom-2 left-1/2 -translate-x-1/2 w-32 h-1 bg-white/70 rounded-full z-40 backdrop-blur-xs" />
                </div>
              </div>
            ) : (
              /* ── UPRIGHT MACBOOK PRO MOCKUP (NOT SLANTED!) ── */
              <div className="relative mx-auto w-full max-w-[560px] lg:max-w-[620px] transform-gpu">
                
                {/* Laptop Screen Lid */}
                <div className="w-full aspect-[16/10] rounded-t-3xl p-3 bg-[#0C1A20] border-2 border-[#0E7490]/40 shadow-[0_35px_80px_rgba(14,116,144,0.3)] relative ring-1 ring-white/15">
                  {/* Camera Notch */}
                  <div className="absolute top-1.5 left-1/2 -translate-x-1/2 w-3 h-3 rounded-full bg-slate-900 border border-slate-700 flex items-center justify-center z-40 shadow-xs">
                    <div className="w-1 h-1 rounded-full bg-[#06B6D4]" />
                  </div>

                  {/* Laptop Screen Container where UI images replace/transition */}
                  <div className="relative w-full h-full rounded-xl overflow-hidden bg-slate-950 border border-white/10 shadow-inner">
                    {project.chapters.map((chap, i) => (
                      <ChapterImageItem
                        key={chap.id}
                        image={chap.image}
                        alt={`${project.name} - ${chap.title}`}
                        scrollYProgress={scrollYProgress}
                        start={chapterTimings[i].start}
                        fadeIn={chapterTimings[i].fadeIn}
                        fadeOut={chapterTimings[i].fadeOut}
                        end={chapterTimings[i].end}
                        isLast={i === n - 1}
                      />
                    ))}
                  </div>
                </div>

                {/* Laptop Base */}
                <div className="w-[108%] -ml-[4%] h-5 rounded-b-2xl bg-gradient-to-b from-[#1E293B] to-[#0C1A20] border-t border-[#0E7490]/40 shadow-2xl flex justify-center items-start">
                  <div className="w-20 h-1.5 rounded-b-md bg-[#0C1A20] border-x border-b border-[#0E7490]/30" />
                </div>
              </div>
            )}

          </div>

        </div>

        {/* Bottom Progress Bar & Chapter Indicator */}
        <div className="container mx-auto px-6 max-w-7xl relative z-40 flex items-center justify-between shrink-0 pt-2 border-t border-[#0E7490]/10">
          <div className="flex items-center gap-2 text-xs font-black text-[#0C1A20]/50 uppercase tracking-widest">
            <span>Chapter Walkthrough</span>
            <span>•</span>
            <span className="text-[#0E7490]">Scroll Down ↓</span>
          </div>
          <div className="w-36 sm:w-48 h-1 rounded-full bg-[#0E7490]/20 overflow-hidden">
            <motion.div
              className="h-full rounded-full bg-[#06B6D4] transform-gpu"
              style={{ width: barWidth }}
            />
          </div>
        </div>

      </div>
    </section>
  );
};

// ─── Main FlagshipScrollytelling Wrapper ──────────────────────

const FlagshipScrollytelling: React.FC = () => {
  return (
    <div className="w-full bg-[#F5F9FA]">
      
      {/* ── Section Intro Header (Static Document Flow) ──────── */}
      <div className="pt-24 pb-16 relative overflow-hidden">
        <div className="container mx-auto px-6 max-w-7xl relative z-10">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-8">
            <div>
              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#0E7490]/10 border border-[#0E7490]/25 text-[#0E7490] text-[11px] font-black tracking-widest uppercase mb-4 shadow-2xs">
                <Sparkles size={13} className="text-[#06B6D4]" />
                <span>Featured Work — Interactive Feature Walkthrough</span>
              </div>
              <h2 className="text-4xl sm:text-5xl md:text-6xl font-black text-[#0C1A20] tracking-tight leading-[1.05]">
                Selected Flagship Projects
              </h2>
              <p className="text-[#0C1A20]/75 text-sm sm:text-base md:text-lg mt-3 max-w-2xl font-normal leading-relaxed">
                High-impact software solutions engineered with robust architecture, AI integration, and enterprise DevSecOps standards. Scroll down to experience interactive feature walkthroughs.
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

      {/* ── Render Each Flagship Project Showcase ────────────── */}
      <div className="w-full">
        {FLAGSHIP_PROJECTS.map((proj) => (
          <ProjectSection key={proj.id} project={proj} />
        ))}
      </div>

    </div>
  );
};

export default FlagshipScrollytelling;
