/**
 * FlagshipScrollytelling.tsx
 *
 * UPRIGHT NATURAL DEVICE CASCADE (Zero Lag, 60fps/120fps)
 *
 * Fixes:
 *   1. UPRIGHT PRESENTATION (NOT SLENTY): Removed awkward CSS 3D skewing/tilting.
 *      Phones and laptops stand pristine, upright, and grounded for 100% readable UI.
 *   2. NATURAL LAYERED STACK: Background device mockups stack neatly to the right
 *      (`x: 0, 75px, 150px`) with scale and opacity falloffs for clean depth.
 *   3. ALL 7 BERUANG UI SCREENSHOTS in exact requested order:
 *      Login -> Home -> Expenses -> Chat 1 -> Chat 2 -> Chat 3 -> Profile.
 *   4. ZERO TEXT OVERLAP: AnimatePresence mode="wait" single active text block.
 *
 * Theme: #F5F9FA (bg) · #0E7490 (primary) · #06B6D4 (accent) · #0C1A20 (text)
 */

import React, { useRef, useState } from 'react';
import { motion, useScroll, useTransform, useMotionValueEvent, AnimatePresence, MotionValue } from 'framer-motion';
import { ArrowRight, Sparkles, Zap, Trophy, Cpu, Search, Brain, Lock, Server, CheckCircle2, Star, UserCheck, LayoutDashboard, Wallet, MessageSquareCode, Globe, ShieldCheck } from 'lucide-react';
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
    id: 'login',
    number: '01',
    badge: 'Zero Trust Authentication',
    title: 'Secure Identity Gateway',
    paragraph:
      'Biometric authentication gateway with encrypted JWT session rotation and multi-factor protection.',
    pill: 'Biometric Auth · Encrypted Session Gateway',
    icon: Lock,
    image: '/images/beruang/login.png',
  },
  {
    id: 'home',
    number: '02',
    badge: 'Financial Overview',
    title: 'Real-Time Dashboard',
    paragraph:
      'Consolidated balance tracking, monthly income vs expense analytics, and instant financial health metrics.',
    pill: 'Instant Balance Tracking · Financial Overview',
    icon: LayoutDashboard,
    image: '/images/beruang/home.png',
  },
  {
    id: 'expenses',
    number: '03',
    badge: 'Expense Intelligence',
    title: 'Automated Categorization',
    paragraph:
      'Real-time transaction logging with custom 50/30/20 category breakdowns and historical trend analysis.',
    pill: '50/30/20 Budget Breakdown · Trend Analytics',
    icon: Wallet,
    image: '/images/beruang/expenses.png',
  },
  {
    id: 'chat1',
    number: '04',
    badge: 'Interactive Financial Mirror',
    title: 'Instant Natural Language UI',
    paragraph:
      'Converts natural language queries directly into interactive budget donut charts in milliseconds.',
    pill: 'Dynamic Widget Rendering · Zero-Latency RAG Pipeline',
    icon: Zap,
    image: '/images/beruang/chat-1.png',
  },
  {
    id: 'chat2',
    number: '05',
    badge: 'Behavioural Nudging',
    title: 'Hyper-Localized Advisory',
    paragraph:
      'Routes local food queries to cloud LLMs with smart budget reminders to stop impulse spending.',
    pill: 'Intelligent Intent Routing · Frictionless Accountability',
    icon: Brain,
    image: '/images/beruang/chat-2.png',
  },
  {
    id: 'chat3',
    number: '06',
    badge: 'Opportunity Cost Guardian',
    title: 'Real-Time Web Retrieval',
    paragraph:
      'Performs live internet retrieval for unindexed locations while calculating travel friction against budget.',
    pill: 'Live Web Retrieval · Spatial & Financial Guardian',
    icon: Globe,
    image: '/images/beruang/chat-3.png',
  },
  {
    id: 'profile',
    number: '07',
    badge: 'Account & Security',
    title: 'Profile & Preferences',
    paragraph:
      'Customizable security preferences, financial goal configurations, and personal account management.',
    pill: 'Custom Preferences · Goal Management',
    icon: UserCheck,
    image: '/images/beruang/profile.png',
  },
];

const RENTVERSE_CHAPTERS: Chapter[] = [
  {
    id: 'zerotrust',
    number: '01',
    badge: 'Zero Trust Security Platform',
    title: 'Enterprise Rental Ecosystem',
    paragraph:
      'Zero Trust security platform with AI-driven tenant fraud detection and real-time behavioral monitoring.',
    pill: 'Zero Trust Auth · Real-Time AI Fraud Prevention',
    icon: ShieldCheck,
    image: '/images/rentverse-laptop.jpg',
  },
  {
    id: 'pipeline',
    number: '02',
    badge: '14-Stage DevSecOps Pipeline',
    title: 'Automated Security Pipeline',
    paragraph:
      'Automated 14-stage DevSecOps CI/CD security pipeline with SonarQube static code analysis and Docker.',
    pill: '14-Stage CI/CD · SonarQube & Docker Security',
    icon: Server,
    image: '/images/rentverse-home.jpg',
  },
];

// ─── Right Column: Upright Phone Mockup Item ──────────────────

interface CascadePhoneProps {
  image: string;
  alt: string;
  scrollYProgress: MotionValue<number>;
  index: number;
  total: number;
}

const CascadePhoneItem: React.FC<CascadePhoneProps> = ({
  image,
  alt,
  scrollYProgress,
  index,
  total,
}) => {
  const span = 1 / total;

  const x = useTransform(scrollYProgress, (v) => {
    const step = Math.min(Math.floor(v * total), total - 1);
    const progressInStep = (v - step * span) / span;

    if (index < step) return -150;
    if (index === step) {
      if (progressInStep > 0.7 && index < total - 1) {
        const exitP = (progressInStep - 0.7) / 0.3;
        return -150 * exitP;
      }
      return 0;
    }
    const pos = index - step;
    if (progressInStep > 0.7) {
      const advanceP = (progressInStep - 0.7) / 0.3;
      return (pos - advanceP) * 75;
    }
    return pos * 75;
  });

  const y = useTransform(scrollYProgress, (v) => {
    const step = Math.min(Math.floor(v * total), total - 1);
    const progressInStep = (v - step * span) / span;

    if (index < step) return 80;
    if (index === step) {
      if (progressInStep > 0.7 && index < total - 1) {
        const exitP = (progressInStep - 0.7) / 0.3;
        return 80 * exitP;
      }
      return 0;
    }
    const pos = index - step;
    if (progressInStep > 0.7) {
      const advanceP = (progressInStep - 0.7) / 0.3;
      return -20 * (pos - advanceP);
    }
    return -20 * pos;
  });

  const scale = useTransform(scrollYProgress, (v) => {
    const step = Math.min(Math.floor(v * total), total - 1);
    const progressInStep = (v - step * span) / span;

    if (index < step) return 0.88;
    if (index === step) {
      if (progressInStep > 0.7 && index < total - 1) {
        const exitP = (progressInStep - 0.7) / 0.3;
        return 1 - 0.12 * exitP;
      }
      return index === total - 1 ? 1.03 : 1.0;
    }
    const pos = index - step;
    if (progressInStep > 0.7) {
      const advanceP = (progressInStep - 0.7) / 0.3;
      return Math.max(0.7, 1 - 0.08 * (pos - advanceP));
    }
    return Math.max(0.7, 1 - 0.08 * pos);
  });

  const opacity = useTransform(scrollYProgress, (v) => {
    const step = Math.min(Math.floor(v * total), total - 1);
    const progressInStep = (v - step * span) / span;

    if (index < step) return 0;
    if (index === step) {
      if (progressInStep > 0.7 && index < total - 1) {
        const exitP = (progressInStep - 0.7) / 0.3;
        return 1 - exitP;
      }
      return 1;
    }
    const pos = index - step;
    if (pos === 1) return 0.65;
    if (pos === 2) return 0.35;
    return 0;
  });

  const borderColor = useTransform(scrollYProgress, (v) => {
    const step = Math.min(Math.floor(v * total), total - 1);
    if (index === step) return 'rgba(14,116,144,0.7)';
    if (index === step + 1) return 'rgba(14,116,144,0.25)';
    return 'rgba(14,116,144,0.1)';
  });

  return (
    <motion.div
      style={{
        x,
        y,
        scale,
        opacity,
        borderColor,
      }}
      className="absolute w-[210px] sm:w-[240px] md:w-[260px] aspect-[9/19.2] rounded-[42px] p-2.5 bg-[#0C1A20] shadow-[0_25px_60px_rgba(14,116,144,0.3)] border-[3.5px] ring-1 ring-white/30 transform-gpu transition-shadow"
    >
      {/* Dynamic Island Speaker Notch */}
      <div className="absolute top-4 left-1/2 -translate-x-1/2 w-24 h-5 bg-black rounded-full z-40 flex items-center justify-between px-2 border border-white/10 shadow-md">
        <div className="w-2 h-2 rounded-full bg-slate-900 ring-1 ring-white/20 flex items-center justify-center">
          <div className="w-1 h-1 rounded-full bg-[#06B6D4]" />
        </div>
        <div className="flex items-center gap-1">
          <span className="text-[8px] font-bold text-white/80 tracking-tighter">AI</span>
          <div className="w-1.5 h-1.5 rounded-full bg-[#0E7490] animate-pulse" />
        </div>
      </div>

      {/* Upright Clean Phone Screen */}
      <div className="relative w-full h-full rounded-[34px] overflow-hidden bg-slate-950 border border-white/10 shadow-inner">
        <img
          src={image}
          alt={alt}
          className="w-full h-full object-cover object-top"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0C1A20]/20 via-transparent to-transparent pointer-events-none" />
        <div className="absolute bottom-2 left-1/2 -translate-x-1/2 w-28 h-1 bg-white/70 rounded-full z-40 backdrop-blur-xs" />
      </div>
    </motion.div>
  );
};

// ─── Beruang Showcase Section (Upright Cascade) ────────────────

const BeruangShowcaseSection: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end end'],
  });

  const total = BERUANG_CHAPTERS.length;
  const barWidth = useTransform(scrollYProgress, [0, 1], ['0%', '100%']);

  const [activeIdx, setActiveIdx] = useState(0);

  useMotionValueEvent(scrollYProgress, 'change', (latest) => {
    const idx = Math.min(Math.floor(latest * total), total - 1);
    if (idx !== activeIdx && idx >= 0) {
      setActiveIdx(idx);
    }
  });

  const currentChapter = BERUANG_CHAPTERS[activeIdx] || BERUANG_CHAPTERS[0];
  const IconComponent = currentChapter.icon;
  const reversedChapters = [...BERUANG_CHAPTERS].map((chap, idx) => ({ chap, idx })).reverse();

  return (
    <section
      ref={containerRef}
      style={{ height: `${total * 100}vh` }}
      className="relative w-full border-t border-[#0E7490]/20"
      aria-label="Beruang AI Financial Platform Showcase"
    >
      <div className="sticky top-0 h-screen w-full overflow-hidden bg-[#F5F9FA] flex flex-col justify-between pt-20 pb-4 lg:pt-24 lg:pb-6">
        
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

        {/* Top Simple Brand Header */}
        <div className="container mx-auto px-6 max-w-7xl relative z-40 shrink-0">
          <div className="flex items-center gap-3 pb-4 border-b border-[#0E7490]/15">
            <img
              src="/images/beruang/logo.png"
              alt="Beruang Logo"
              className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl object-cover shadow-xs border border-[#0E7490]/20 shrink-0"
            />
            <span className="text-sm sm:text-base font-black text-[#0C1A20] tracking-tight">Beruang AI Financial Platform</span>
          </div>
        </div>

        {/* Main 2-Column Showcase Grid */}
        <div className="container mx-auto px-6 max-w-7xl relative z-30 grid lg:grid-cols-12 gap-8 lg:gap-12 items-center h-full my-auto py-2">
          
          {/* LEFT COLUMN: Single Active Text Block */}
          <div className="lg:col-span-5 relative flex items-center min-h-[380px] sm:min-h-[420px]">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentChapter.id}
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                transition={{ duration: 0.2, ease: 'easeOut' }}
                className="flex flex-col justify-center space-y-6 sm:space-y-7 transform-gpu max-w-xl w-full"
              >
                {/* Heading */}
                <div>
                  <h4 className="text-3xl sm:text-4xl md:text-5xl lg:text-[52px] font-black text-[#0E7490] tracking-tight leading-[1.05]">
                    {currentChapter.title}
                  </h4>
                </div>

                {/* Crisp Paragraph */}
                <p className="text-base sm:text-lg md:text-xl font-medium text-[#0C1A20]/85 leading-relaxed">
                  {currentChapter.paragraph}
                </p>

                {/* Feature Pill */}
                <div className="pt-2">
                  <div className="inline-flex items-center gap-2.5 px-5 py-3 rounded-2xl bg-white border-2 border-[#0E7490]/20 shadow-xs text-xs sm:text-sm font-black text-[#0E7490]">
                    <CheckCircle2 size={16} className="text-[#06B6D4] shrink-0" />
                    <span>{currentChapter.pill}</span>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* RIGHT COLUMN: Upright Pristine Phone Stage */}
          <div className="lg:col-span-7 flex items-center justify-center relative min-h-[460px] sm:min-h-[520px]">
            <div className="relative w-full h-[460px] sm:h-[520px] flex items-center justify-center">
              <div className="relative w-full h-full flex items-center justify-center">
                {reversedChapters.map(({ chap, idx }) => (
                  <CascadePhoneItem
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
          </div>

        </div>

        {/* Bottom Section Footer */}
        <div className="container mx-auto px-6 max-w-7xl relative z-40 flex items-center justify-between shrink-0 pt-2 border-t border-[#0E7490]/15">
          <div className="flex items-center gap-2 text-xs font-black text-[#0C1A20]/60 uppercase tracking-widest">
            <span>Beruang AI Platform</span>
            <span>•</span>
            <span className="text-[#0E7490]">System Architecture</span>
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

// ─── RentVerse Secondary Showcase Section ─────────────────────

const RentVerseShowcaseSection: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end end'],
  });

  const total = RENTVERSE_CHAPTERS.length;
  const barWidth = useTransform(scrollYProgress, [0, 1], ['0%', '100%']);

  const [activeIdx, setActiveIdx] = useState(0);

  useMotionValueEvent(scrollYProgress, 'change', (latest) => {
    const idx = Math.min(Math.floor(latest * total), total - 1);
    if (idx !== activeIdx && idx >= 0) {
      setActiveIdx(idx);
    }
  });

  const currentChapter = RENTVERSE_CHAPTERS[activeIdx] || RENTVERSE_CHAPTERS[0];
  const IconComponent = currentChapter.icon;

  const l0X = useTransform(scrollYProgress, [0, 0.40, 0.60, 1], [0, 0, -150, -150]);
  const l0Y = useTransform(scrollYProgress, [0, 0.40, 0.60, 1], [0, 0, 80, 80]);
  const l0Opacity = useTransform(scrollYProgress, [0, 0.40, 0.60, 1], [1, 1, 0, 0]);

  const l1X = useTransform(scrollYProgress, [0, 0.40, 0.60, 1], [75, 75, 0, 0]);
  const l1Y = useTransform(scrollYProgress, [0, 0.40, 0.60, 1], [-20, -20, 0, 0]);
  const l1Scale = useTransform(scrollYProgress, [0, 0.40, 0.60, 1], [0.92, 0.92, 1.0, 1.0]);
  const l1Opacity = useTransform(scrollYProgress, [0, 0.40, 0.60, 1], [0.65, 0.65, 1, 1]);

  return (
    <section
      ref={containerRef}
      style={{ height: `${total * 100}vh` }}
      className="relative w-full border-t border-[#0E7490]/20"
      aria-label="RentVerse Rental Ecosystem Showcase"
    >
      <div className="sticky top-0 h-screen w-full overflow-hidden bg-[#F5F9FA] flex flex-col justify-between pt-20 pb-4 lg:pt-24 lg:pb-6">
        
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
          <div className="lg:col-span-5 relative flex items-center min-h-[380px]">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentChapter.id}
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                transition={{ duration: 0.2, ease: 'easeOut' }}
                className="flex flex-col justify-center space-y-6 sm:space-y-7 transform-gpu max-w-xl w-full"
              >
                <h4 className="text-3xl sm:text-4xl md:text-5xl lg:text-[52px] font-black text-[#0E7490] tracking-tight leading-[1.05]">
                  {currentChapter.title}
                </h4>

                <p className="text-base sm:text-lg md:text-xl font-medium text-[#0C1A20]/85 leading-relaxed">
                  {currentChapter.paragraph}
                </p>

                <div className="pt-2">
                  <div className="inline-flex items-center gap-2.5 px-5 py-3 rounded-2xl bg-white border-2 border-[#0E7490]/20 shadow-xs text-xs sm:text-sm font-black text-[#0E7490]">
                    <CheckCircle2 size={16} className="text-[#06B6D4] shrink-0" />
                    <span>{currentChapter.pill}</span>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* RIGHT COLUMN: Upright Pristine Laptop Cascade */}
          <div className="lg:col-span-7 flex items-center justify-center relative min-h-[440px]">
            <div className="relative w-full h-[400px] sm:h-[440px] flex items-center justify-center">
              <div className="relative w-full h-full flex items-center justify-center">
                
                {/* Laptop 1 */}
                <motion.div
                  style={{ x: l1X, y: l1Y, scale: l1Scale, opacity: l1Opacity }}
                  className="absolute w-full max-w-[540px] lg:max-w-[600px] transform-gpu"
                >
                  <div className="w-full aspect-[16/10] rounded-t-3xl p-3 bg-[#0C1A20] border-2 border-[#0E7490]/50 shadow-[0_30px_70px_rgba(14,116,144,0.25)] relative ring-1 ring-white/15">
                    <div className="absolute top-1.5 left-1/2 -translate-x-1/2 w-3 h-3 rounded-full bg-slate-900 border border-slate-700 flex items-center justify-center z-40">
                      <div className="w-1 h-1 rounded-full bg-[#06B6D4]" />
                    </div>
                    <div className="relative w-full h-full rounded-xl overflow-hidden bg-slate-950 border border-white/10 shadow-inner">
                      <img src="/images/rentverse-home.jpg" alt="DevSecOps Pipeline" className="w-full h-full object-cover object-top" />
                    </div>
                  </div>
                  <div className="w-[108%] -ml-[4%] h-5 rounded-b-2xl bg-gradient-to-b from-[#1E293B] to-[#0C1A20] border-t border-[#0E7490]/40 shadow-2xl flex justify-center items-start">
                    <div className="w-20 h-1.5 rounded-b-md bg-[#0C1A20] border-x border-b border-[#0E7490]/30" />
                  </div>
                </motion.div>

                {/* Laptop 0 */}
                <motion.div
                  style={{ x: l0X, y: l0Y, opacity: l0Opacity }}
                  className="absolute w-full max-w-[540px] lg:max-w-[600px] transform-gpu"
                >
                  <div className="w-full aspect-[16/10] rounded-t-3xl p-3 bg-[#0C1A20] border-2 border-[#0E7490]/60 shadow-[0_35px_80px_rgba(14,116,144,0.35)] relative ring-1 ring-white/20">
                    <div className="absolute top-1.5 left-1/2 -translate-x-1/2 w-3 h-3 rounded-full bg-slate-900 border border-slate-700 flex items-center justify-center z-40">
                      <div className="w-1 h-1 rounded-full bg-[#06B6D4]" />
                    </div>
                    <div className="relative w-full h-full rounded-xl overflow-hidden bg-slate-950 border border-white/10 shadow-inner">
                      <img src="/images/rentverse-laptop.jpg" alt="Zero Trust Security" className="w-full h-full object-cover object-top" />
                    </div>
                  </div>
                  <div className="w-[108%] -ml-[4%] h-5 rounded-b-2xl bg-gradient-to-b from-[#1E293B] to-[#0C1A20] border-t border-[#0E7490]/40 shadow-2xl flex justify-center items-start">
                    <div className="w-20 h-1.5 rounded-b-md bg-[#0C1A20] border-x border-b border-[#0E7490]/30" />
                  </div>
                </motion.div>

              </div>
            </div>
          </div>

        </div>

        {/* Bottom Section Footer */}
        <div className="container mx-auto px-6 max-w-7xl relative z-40 flex items-center justify-between shrink-0 pt-2 border-t border-[#0E7490]/15">
          <div className="flex items-center gap-2 text-xs font-black text-[#0C1A20]/60 uppercase tracking-widest">
            <span>RentVerse Platform</span>
            <span>•</span>
            <span className="text-[#0E7490]">DevSecOps Architecture</span>
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
              <div className="text-[13px] font-extrabold uppercase tracking-widest text-[#06B6D4] mb-3 flex items-center gap-2">
                <Sparkles size={14} />
                <span>FEATURED WORK</span>
              </div>
              <h2 className="text-4xl sm:text-5xl md:text-6xl font-black text-[#0C1A20] tracking-tight leading-[1.05]">
                Selected Flagship Projects
              </h2>
              <p className="text-[#0C1A20]/75 text-sm sm:text-base md:text-lg mt-3 max-w-2xl font-normal leading-relaxed">
                High-impact software solutions engineered with robust architecture, AI integration, and enterprise DevSecOps standards.
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

      {/* ── Beruang AI Centerpiece (Upright Natural Cascade) ── */}
      <BeruangShowcaseSection />

      {/* ── RentVerse Secondary Showcase ── */}
      <RentVerseShowcaseSection />

    </div>
  );
};

export default FlagshipScrollytelling;
