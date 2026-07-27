/**
 * FlagshipScrollytelling.tsx
 *
 * MC+ STYLE 3D TILTED PHONE WITH SLIDING UI REPLACEMENT (Zero Lag, 60fps/120fps)
 *
 * Architecture & Design Fixes:
 *   1. MC+ STYLE TILTED 3D PHONE COMPOSITION: Tilted primary phone in the foreground
 *      (`rotateY(-20deg) rotateX(10deg) rotate(-6deg)`) with layered background screens
 *      floating in perspective for jaw-dropping depth.
 *   2. SLIDING UI REPLACEMENT: As the user scrolls down through the chapters, the new UI image
 *      slides in from the bottom (`translateY: 100% -> 0%`), pushing and replacing the previous UI
 *      image (`translateY: 0% -> -100%`), exactly like mcplus.my and Apple feature walkthroughs.
 *   3. CLEAN LEFT COLUMN HIERARCHY: Replaced cluttered bullet lists with MC+'s clean structure:
 *      Icon Badge -> Massive Feature Heading -> Single Crisp Paragraph -> Feature Pill.
 *   4. BERUANG CENTERPIECE: Features the Beruang iOS logo (`/images/beruang/logo.png`), star rating
 *      badges (`99.61% AI Accuracy ★★★★★`, `86.77 SUS Score ★★★★★`), and 4 dedicated chapters.
 *   5. ZERO LAG GUARANTEE: Uses continuous Framer Motion `useTransform` for `translateY` and
 *      `opacity` on GPU compositor layers (`transform-gpu`). Zero CSS blur animations, zero
 *      background grid scaling, and zero React state re-renders during scroll.
 *
 * Theme: #F5F9FA (bg) · #0E7490 (primary) · #06B6D4 (accent) · #0C1A20 (text)
 */

import React, { useRef } from 'react';
import { motion, useScroll, useTransform, MotionValue } from 'framer-motion';
import { ArrowRight, Sparkles, Zap, Trophy, Cpu, Search, Brain, Lock, Server, CheckCircle2, ShieldCheck, Star } from 'lucide-react';
import { Link } from 'react-router-dom';

// ─── Data Structures ──────────────────────────────────────────

interface Chapter {
  id: string;
  number: string;
  badge: string;
  title: string;
  paragraph: string;
  pill: string;
  icon: React.ComponentType<any>;
  image: string;
}

const BERUANG_CHAPTERS: Chapter[] = [
  {
    id: 'mirror',
    number: '01',
    badge: 'Interactive Financial Mirror',
    title: 'Instant Natural Language UI',
    paragraph:
      'Converts natural language queries ("Recent expenses?") directly into interactive 50/30/20 budget donut charts in milliseconds. Powered by a real-time RAG pipeline querying Firebase Firestore, it intercepts your exact financial footprint without mental math or text-heavy lists.',
    pill: '⚡ Dynamic Widget Rendering · Zero-Latency RAG Pipeline',
    icon: Zap,
    image: '/images/beruang/chat-1.png',
  },
  {
    id: 'nudge',
    number: '02',
    badge: 'Behavioural Nudging',
    title: 'Hyper-Localized Advisory',
    paragraph:
      'Intelligent MiniLM sentence transformers route complex local food queries ("makan sedap di pekan tapah") directly to cloud LLMs. It recommends great local dining while attaching a budget reminder ("Wants je ni, RM358 lagi!") to stop impulsive spending before it happens.',
    pill: '🧠 Intelligent Intent Routing · Frictionless Accountability',
    icon: Brain,
    image: '/images/beruang/chat-2.png',
  },
  {
    id: 'search',
    number: '03',
    badge: 'Opportunity Cost Guardian',
    title: 'Real-Time Web Retrieval',
    paragraph:
      'Commands like "search rembayung" trigger live internet retrieval for brand-new locations outside static LLM weights. It calculates travel friction (a 2-3 hr drive from Tapah to KL) against your remaining budget so decisions are never made in a vacuum.',
    pill: '🌍 Live Web Retrieval · Spatial & Financial Guardian',
    icon: Search,
    image: '/images/beruang/chat-3.png',
  },
  {
    id: 'engine',
    number: '04',
    badge: 'Bi-LSTM Neural Engine',
    title: '99.61% AI Accuracy Engine',
    paragraph:
      'Powered by a custom PyTorch Bi-LSTM neural network trained on 220,000+ Malaysian transaction records for instant expense categorization. Evaluated at an exceptional 86.77 System Usability Scale score, combining enterprise security with frictionless consumer UX.',
    pill: '📊 99.61% AI Accuracy · 220k+ Malaysian Dataset',
    icon: Cpu,
    image: '/images/beruang/home.png',
  },
];

const RENTVERSE_CHAPTERS: Chapter[] = [
  {
    id: 'zerotrust',
    number: '01',
    badge: 'Zero Trust Security Platform',
    title: 'Enterprise Rental Ecosystem',
    paragraph:
      'Strict identity verification, JWT session rotation, and end-to-end encryption across all tenant and landlord workflows. An intelligent AI fraud detection engine analyzes behavioral patterns to block anomalous rental applications and fraudulent property listings in real-time.',
    pill: '🔒 Zero Trust Auth · Real-Time AI Fraud Prevention',
    icon: Lock,
    image: '/images/rentverse-laptop.jpg',
  },
  {
    id: 'pipeline',
    number: '02',
    badge: '14-Stage DevSecOps Pipeline',
    title: 'Automated Security Pipeline',
    paragraph:
      'Fully integrated DevSecOps automation featuring SonarQube static code analysis, Docker containerization, and automated vulnerability scanning. Built on Next.js 14 and PostgreSQL, delivering sub-second search and enterprise-grade transaction reliability.',
    pill: '🚀 14-Stage CI/CD · SonarQube & Docker Security',
    icon: Server,
    image: '/images/rentverse-home.jpg',
  },
];

// ─── Left Column: Single Chapter Text Transition ──────────────

interface ChapterTextProps {
  chapter: Chapter;
  scrollYProgress: MotionValue<number>;
  index: number;
  total: number;
  accentColor: string;
}

const ChapterTextItem: React.FC<ChapterTextProps> = ({
  chapter,
  scrollYProgress,
  index,
  total,
  accentColor,
}) => {
  const span = 1 / total;
  const start = index * span;
  const end = (index + 1) * span;

  // Stagger text fade slightly so it syncs perfectly with phone screen sliding
  const fadeIn = start + span * 0.12;
  const fadeOut = end - span * 0.12;

  // If first chapter, start visible at progress 0. If last, stay visible at 1.0.
  const opacity = useTransform(
    scrollYProgress,
    [start, fadeIn, fadeOut, end],
    [index === 0 ? 1 : 0, 1, 1, index === total - 1 ? 1 : 0]
  );

  const y = useTransform(
    scrollYProgress,
    [start, fadeIn, fadeOut, end],
    [index === 0 ? 0 : 35, 0, 0, index === total - 1 ? 0 : -35]
  );

  const pointerEvents = useTransform(scrollYProgress, (v) =>
    v >= start && v <= end ? 'auto' : 'none'
  );

  const IconComponent = chapter.icon;

  return (
    <motion.div
      style={{ opacity, y, pointerEvents }}
      className="col-start-1 row-start-1 flex flex-col justify-center space-y-6 sm:space-y-7 transform-gpu max-w-xl"
    >
      {/* Icon Badge & Chapter Number */}
      <div className="flex items-center gap-3 flex-wrap">
        <span
          className="inline-flex items-center gap-2 px-4 py-2 rounded-2xl text-xs sm:text-sm font-black tracking-widest uppercase border shadow-sm backdrop-blur-md"
          style={{
            background: `${accentColor}20`,
            borderColor: `${accentColor}60`,
            color: '#0E7490',
          }}
        >
          <div className="p-1.5 rounded-xl bg-white shadow-2xs">
            <IconComponent size={15} style={{ color: accentColor }} />
          </div>
          <span>{chapter.number} — {chapter.badge}</span>
        </span>
      </div>

      {/* Massive Feature Heading */}
      <div>
        <h4 className="text-3xl sm:text-4xl md:text-5xl lg:text-[52px] font-black text-[#0C1A20] tracking-tight leading-[1.05]">
          {chapter.title}
        </h4>
      </div>

      {/* Single Crisp Descriptive Paragraph (MC+ Style) */}
      <p className="text-base sm:text-lg md:text-xl font-medium text-[#0C1A20]/85 leading-relaxed">
        {chapter.paragraph}
      </p>

      {/* Feature Pill / Metric Tag */}
      <div className="pt-2">
        <div className="inline-flex items-center gap-2.5 px-5 py-3 rounded-2xl bg-white border-2 border-[#0E7490]/20 shadow-xs text-xs sm:text-sm font-black text-[#0E7490]">
          <CheckCircle2 size={16} className="text-[#06B6D4] shrink-0" />
          <span>{chapter.pill}</span>
        </div>
      </div>
    </motion.div>
  );
};

// ─── Right Column: Sliding Image Inside Phone Screen ──────────

interface SlidingScreenProps {
  image: string;
  alt: string;
  scrollYProgress: MotionValue<number>;
  index: number;
  total: number;
}

const SlidingScreenItem: React.FC<SlidingScreenProps> = ({
  image,
  alt,
  scrollYProgress,
  index,
  total,
}) => {
  const span = 1 / total;
  const start = index * span;
  const end = (index + 1) * span;

  // The sliding transition takes 15% of the chapter span at the boundaries
  const transSpan = span * 0.15;
  const slideInEnd = start + transSpan;
  const slideOutStart = end - transSpan;

  // Calculate translateY (100% waiting below -> 0% active in center -> -100% exited above)
  const translateY = useTransform(
    scrollYProgress,
    [
      index === 0 ? 0 : start,
      index === 0 ? 0 : slideInEnd,
      index === total - 1 ? 1 : slideOutStart,
      index === total - 1 ? 1 : end,
    ],
    [
      index === 0 ? '0%' : '100%',
      '0%',
      '0%',
      index === total - 1 ? '0%' : '-100%',
    ]
  );

  const opacity = useTransform(
    scrollYProgress,
    [
      index === 0 ? 0 : start - transSpan * 0.5,
      index === 0 ? 0 : start,
      index === total - 1 ? 1 : end,
      index === total - 1 ? 1 : end + transSpan * 0.5,
    ],
    [index === 0 ? 1 : 0, 1, 1, index === total - 1 ? 1 : 0]
  );

  return (
    <motion.div
      style={{ translateY, opacity }}
      className="absolute inset-0 w-full h-full transform-gpu"
    >
      <img src={image} alt={alt} className="w-full h-full object-cover object-top" loading="lazy" />
      <div className="absolute inset-0 bg-gradient-to-t from-[#0C1A20]/30 via-transparent to-transparent pointer-events-none" />
    </motion.div>
  );
};

// ─── Beruang Centerpiece Showcase Section (Tilted 3D Phones) ──

const BeruangShowcaseSection: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end end'],
  });

  const total = BERUANG_CHAPTERS.length;
  const barWidth = useTransform(scrollYProgress, [0, 1], ['0%', '100%']);

  // Background layered screens advance smoothly as user scrolls
  const bgLayer1Y = useTransform(scrollYProgress, [0, 1], ['0%', '-50%']);
  const bgLayer2Y = useTransform(scrollYProgress, [0, 1], ['-20%', '-70%']);

  return (
    <section
      ref={containerRef}
      style={{ height: `${total * 100}vh` }}
      className="relative w-full border-t border-[#0E7490]/20"
      aria-label="Beruang AI Financial Platform Showcase"
    >
      {/* Sticky Viewport */}
      <div className="sticky top-0 h-screen w-full overflow-hidden bg-[#F5F9FA] flex flex-col justify-between py-6 lg:py-10">
        
        {/* Ambient Glows & Grid */}
        <div
          className="absolute top-1/2 right-10 -translate-y-1/2 w-[650px] h-[650px] rounded-full pointer-events-none"
          style={{
            background: 'radial-gradient(circle, rgba(6,182,212,0.18) 0%, rgba(14,116,144,0.06) 40%, transparent 70%)',
          }}
        />
        <div
          className="absolute inset-0 opacity-20 pointer-events-none"
          style={{
            backgroundImage: `
              linear-gradient(rgba(14,116,144,0.2) 1px, transparent 1px),
              linear-gradient(90deg, rgba(14,116,144,0.2) 1px, transparent 1px)
            `,
            backgroundSize: '70px 70px',
          }}
        />

        {/* Top Header Bar with iOS Logo & Rating Badges (MC+ Style) */}
        <div className="container mx-auto px-6 max-w-7xl relative z-40 shrink-0">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-4 border-b border-[#0E7490]/15">
            <div className="flex items-center gap-3.5">
              <img
                src="/images/beruang/logo.png"
                alt="Beruang iOS Logo"
                className="w-10 h-10 sm:w-12 sm:h-12 rounded-2xl object-cover shadow-md border border-[#0E7490]/30 shrink-0"
              />
              <div>
                <div className="flex items-center gap-2">
                  <span className="text-sm sm:text-base font-black text-[#0C1A20]">Beruang AI App</span>
                  <span className="px-2 py-0.5 rounded-md bg-[#0E7490]/10 text-[#0E7490] text-[10px] font-extrabold uppercase tracking-wider">
                    iOS & Android
                  </span>
                </div>
                <p className="text-xs font-bold text-[#0E7490]">Best Architecture Award · 86.77 SUS Score</p>
              </div>
            </div>

            {/* Rating Stars Bar */}
            <div className="flex items-center gap-3 sm:gap-6 flex-wrap">
              <div className="flex items-center gap-2 bg-white px-3.5 py-1.5 rounded-xl border border-[#0E7490]/20 shadow-2xs">
                <span className="text-sm font-black text-[#0C1A20]">99.61%</span>
                <div className="flex text-amber-400 text-xs">
                  <Star size={12} fill="currentColor" />
                  <Star size={12} fill="currentColor" />
                  <Star size={12} fill="currentColor" />
                  <Star size={12} fill="currentColor" />
                  <Star size={12} fill="currentColor" />
                </div>
                <span className="text-[11px] font-bold text-[#0E7490]">AI Accuracy</span>
              </div>
              <div className="flex items-center gap-2 bg-white px-3.5 py-1.5 rounded-xl border border-[#0E7490]/20 shadow-2xs">
                <span className="text-sm font-black text-[#0C1A20]">220k+</span>
                <span className="text-[11px] font-bold text-[#0E7490]">Transactions Dataset</span>
              </div>
            </div>
          </div>
        </div>

        {/* Main 2-Column Showcase Grid */}
        <div className="container mx-auto px-6 max-w-7xl relative z-30 grid lg:grid-cols-12 gap-8 lg:gap-12 items-center h-full my-auto py-2">
          
          {/* LEFT COLUMN: Clean MC+ Style Explanations (5 cols) */}
          <div className="lg:col-span-5 relative grid items-center min-h-[400px] sm:min-h-[440px]">
            {BERUANG_CHAPTERS.map((chap, idx) => (
              <ChapterTextItem
                key={chap.id}
                chapter={chap}
                scrollYProgress={scrollYProgress}
                index={idx}
                total={total}
                accentColor="#06B6D4"
              />
            ))}
          </div>

          {/* RIGHT COLUMN: Tilted 3D Phones with Sliding Replacement (7 cols) */}
          <div className="lg:col-span-7 flex items-center justify-center relative min-h-[460px] sm:min-h-[520px]">
            
            {/* 3D Perspective Stage */}
            <div
              className="relative w-full h-full flex items-center justify-center"
              style={{ perspective: '1400px' }}
            >
              
              {/* ── BACKGROUND LAYER 2 (Far Right / Deepest Phone) ── */}
              <motion.div
                style={{ y: bgLayer2Y }}
                className="absolute right-2 sm:right-10 top-12 sm:top-16 w-[200px] sm:w-[240px] aspect-[9/19.2] rounded-[40px] p-2.5 bg-slate-900/60 border border-white/10 shadow-2xl overflow-hidden pointer-events-none opacity-35 hidden md:block transform-gpu"
                initial={{ rotateY: -22, rotateX: 12, rotate: -7, x: 80, z: -140 }}
              >
                <div className="w-full h-full rounded-[32px] overflow-hidden bg-slate-950 relative">
                  <img src="/images/beruang/chat-3.png" alt="Background Screen 2" className="w-full h-full object-cover object-top opacity-60" />
                </div>
              </motion.div>

              {/* ── BACKGROUND LAYER 1 (Mid Right / Ghost Phone) ── */}
              <motion.div
                style={{ y: bgLayer1Y }}
                className="absolute right-8 sm:right-24 top-6 sm:top-8 w-[230px] sm:w-[270px] aspect-[9/19.2] rounded-[44px] p-3 bg-slate-900/80 border border-white/20 shadow-2xl overflow-hidden pointer-events-none opacity-70 hidden sm:block transform-gpu"
                initial={{ rotateY: -22, rotateX: 12, rotate: -7, x: 40, z: -70 }}
              >
                <div className="w-full h-full rounded-[34px] overflow-hidden bg-slate-950 relative">
                  <img src="/images/beruang/chat-2.png" alt="Background Screen 1" className="w-full h-full object-cover object-top opacity-80" />
                </div>
              </motion.div>

              {/* ── FOREGROUND MAIN TILTED PHONE (Prominent Showcase) ── */}
              <div
                className="relative z-30 w-[260px] sm:w-[300px] md:w-[320px] aspect-[9/19.2] rounded-[48px] p-3.5 bg-[#0C1A20] shadow-[0_45px_100px_rgba(6,182,212,0.38)] border-4 border-[#0E7490]/50 ring-1 ring-white/30 transform-gpu transition-all"
                style={{
                  transform: 'rotateY(-18deg) rotateX(10deg) rotate(-5deg)',
                }}
              >
                {/* Dynamic Island Speaker Notch */}
                <div className="absolute top-5 left-1/2 -translate-x-1/2 w-28 h-6 bg-black rounded-full z-40 flex items-center justify-between px-2.5 border border-white/10 shadow-md">
                  <div className="w-2.5 h-2.5 rounded-full bg-slate-900 ring-1 ring-white/20 flex items-center justify-center">
                    <div className="w-1 h-1 rounded-full bg-[#06B6D4]" />
                  </div>
                  <div className="flex items-center gap-1.5">
                    <span className="text-[9px] font-bold text-white/80 tracking-tighter">LIVE</span>
                    <div className="w-2 h-2 rounded-full bg-[#0E7490] animate-pulse" />
                  </div>
                </div>

                {/* Phone Screen Container with Sliding UI Replacement */}
                <div className="relative w-full h-full rounded-[38px] overflow-hidden bg-slate-950 border border-white/10 shadow-inner">
                  {BERUANG_CHAPTERS.map((chap, idx) => (
                    <SlidingScreenItem
                      key={chap.id}
                      image={chap.image}
                      alt={chap.title}
                      scrollYProgress={scrollYProgress}
                      index={idx}
                      total={total}
                    />
                  ))}
                  {/* Bottom Home Indicator Bar */}
                  <div className="absolute bottom-2 left-1/2 -translate-x-1/2 w-32 h-1 bg-white/70 rounded-full z-40 backdrop-blur-xs" />
                </div>
              </div>

            </div>

          </div>

        </div>

        {/* Bottom Progress Bar */}
        <div className="container mx-auto px-6 max-w-7xl relative z-40 flex items-center justify-between shrink-0 pt-2 border-t border-[#0E7490]/15">
          <div className="flex items-center gap-2 text-xs font-black text-[#0C1A20]/60 uppercase tracking-widest">
            <span>Beruang Walkthrough</span>
            <span>•</span>
            <span className="text-[#0E7490] font-extrabold animate-bounce">Scroll Down ↓</span>
          </div>
          <div className="w-36 sm:w-56 h-1 rounded-full bg-[#0E7490]/20 overflow-hidden">
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

// ─── RentVerse Secondary Showcase Section (Upright/Sleek Laptop) ──

const RentVerseShowcaseSection: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end end'],
  });

  const total = RENTVERSE_CHAPTERS.length;
  const barWidth = useTransform(scrollYProgress, [0, 1], ['0%', '100%']);

  return (
    <section
      ref={containerRef}
      style={{ height: `${total * 100}vh` }}
      className="relative w-full border-t border-[#0E7490]/20"
      aria-label="RentVerse Rental Ecosystem Showcase"
    >
      <div className="sticky top-0 h-screen w-full overflow-hidden bg-[#F5F9FA] flex flex-col justify-between py-6 lg:py-10">
        
        {/* Ambient Glows */}
        <div
          className="absolute top-1/2 left-10 -translate-y-1/2 w-[600px] h-[600px] rounded-full pointer-events-none"
          style={{
            background: 'radial-gradient(circle, rgba(14,116,144,0.15) 0%, transparent 70%)',
          }}
        />

        {/* Top Header Bar */}
        <div className="container mx-auto px-6 max-w-7xl relative z-40 shrink-0">
          <div className="flex items-center justify-between pb-4 border-b border-[#0E7490]/15">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-xl bg-[#0E7490]/10 text-[#0E7490]">
                <Trophy size={18} />
              </div>
              <div>
                <span className="text-base font-black text-[#0C1A20]">RentVerse Rental Platform</span>
                <p className="text-xs font-bold text-[#0E7490]">Champion — 4 Competition Awards · Next.js 14</p>
              </div>
            </div>
            <Link
              to="/projects"
              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-white border border-[#0E7490]/25 shadow-2xs hover:border-[#06B6D4] text-xs font-bold text-[#0C1A20] transition-all"
            >
              <span>View Case Study</span>
              <ArrowRight size={13} />
            </Link>
          </div>
        </div>

        {/* Main Grid */}
        <div className="container mx-auto px-6 max-w-7xl relative z-30 grid lg:grid-cols-12 gap-8 lg:gap-12 items-center h-full my-auto py-2">
          
          {/* LEFT COLUMN */}
          <div className="lg:col-span-5 relative grid items-center min-h-[380px]">
            {RENTVERSE_CHAPTERS.map((chap, idx) => (
              <ChapterTextItem
                key={chap.id}
                chapter={chap}
                scrollYProgress={scrollYProgress}
                index={idx}
                total={total}
                accentColor="#0E7490"
              />
            ))}
          </div>

          {/* RIGHT COLUMN: Upright Laptop with Sliding UI */}
          <div className="lg:col-span-7 flex items-center justify-center relative">
            <div className="relative mx-auto w-full max-w-[580px] lg:max-w-[640px] transform-gpu">
              {/* Laptop Lid */}
              <div className="w-full aspect-[16/10] rounded-t-3xl p-3 bg-[#0C1A20] border-2 border-[#0E7490]/40 shadow-[0_35px_80px_rgba(14,116,144,0.3)] relative ring-1 ring-white/15">
                <div className="absolute top-1.5 left-1/2 -translate-x-1/2 w-3 h-3 rounded-full bg-slate-900 border border-slate-700 flex items-center justify-center z-40">
                  <div className="w-1 h-1 rounded-full bg-[#06B6D4]" />
                </div>
                <div className="relative w-full h-full rounded-xl overflow-hidden bg-slate-950 border border-white/10 shadow-inner">
                  {RENTVERSE_CHAPTERS.map((chap, idx) => (
                    <SlidingScreenItem
                      key={chap.id}
                      image={chap.image}
                      alt={chap.title}
                      scrollYProgress={scrollYProgress}
                      index={idx}
                      total={total}
                    />
                  ))}
                </div>
              </div>
              {/* Laptop Base */}
              <div className="w-[108%] -ml-[4%] h-5 rounded-b-2xl bg-gradient-to-b from-[#1E293B] to-[#0C1A20] border-t border-[#0E7490]/40 shadow-2xl flex justify-center items-start">
                <div className="w-20 h-1.5 rounded-b-md bg-[#0C1A20] border-x border-b border-[#0E7490]/30" />
              </div>
            </div>
          </div>

        </div>

        {/* Bottom Progress Bar */}
        <div className="container mx-auto px-6 max-w-7xl relative z-40 flex items-center justify-between shrink-0 pt-2 border-t border-[#0E7490]/15">
          <div className="flex items-center gap-2 text-xs font-black text-[#0C1A20]/60 uppercase tracking-widest">
            <span>RentVerse Walkthrough</span>
            <span>•</span>
            <span className="text-[#0E7490]">Scroll Down ↓</span>
          </div>
          <div className="w-36 sm:w-56 h-1 rounded-full bg-[#0E7490]/20 overflow-hidden">
            <motion.div
              className="h-full rounded-full bg-[#0E7490] transform-gpu"
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

      {/* ── Beruang AI Centerpiece (MC+ Style Tilted 3D Phones) ── */}
      <BeruangShowcaseSection />

      {/* ── RentVerse Secondary Showcase ── */}
      <RentVerseShowcaseSection />

    </div>
  );
};

export default FlagshipScrollytelling;
