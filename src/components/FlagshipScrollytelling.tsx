/**
 * FlagshipScrollytelling.tsx
 *
 * MC+ STYLE 3D LAYERED PHONE CASCADE (Zero Lag, 60fps/120fps)
 *
 * All 7 Beruang UI Screenshots in exact user-requested order:
 *   1. Login Page (`login.png`)
 *   2. Homepage (`home.png`)
 *   3. Expenses Page (`expenses.png`)
 *   4. Chatbot Conversation 1 (`chat-1.png`)
 *   5. Chatbot Conversation 2 (`chat-2.png`)
 *   6. Chatbot Conversation 3 (`chat-3.png`)
 *   7. Profile Page (`profile.png`)
 *
 * TEXT CLASHING ELIMINATION:
 *   Uses AnimatePresence mode="wait" keyed by active chapter index. Guaranteed that ONLY
 *   one chapter text block exists in the DOM at any microsecond. Zero text overlap.
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

// ─── Right Column: Dynamic 3D Phone Item ──────────────────────

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

    if (index < step) return -160;
    if (index === step) {
      if (progressInStep > 0.7 && index < total - 1) {
        const exitP = (progressInStep - 0.7) / 0.3;
        return -160 * exitP;
      }
      return 0;
    }
    const pos = index - step;
    if (progressInStep > 0.7) {
      const advanceP = (progressInStep - 0.7) / 0.3;
      return (pos - advanceP) * 80;
    }
    return pos * 80;
  });

  const y = useTransform(scrollYProgress, (v) => {
    const step = Math.min(Math.floor(v * total), total - 1);
    const progressInStep = (v - step * span) / span;

    if (index < step) return 120;
    if (index === step) {
      if (progressInStep > 0.7 && index < total - 1) {
        const exitP = (progressInStep - 0.7) / 0.3;
        return 120 * exitP;
      }
      return 0;
    }
    const pos = index - step;
    if (progressInStep > 0.7) {
      const advanceP = (progressInStep - 0.7) / 0.3;
      return -25 * (pos - advanceP);
    }
    return -25 * pos;
  });

  const z = useTransform(scrollYProgress, (v) => {
    const step = Math.min(Math.floor(v * total), total - 1);
    const progressInStep = (v - step * span) / span;

    if (index < step) return 50;
    if (index === step) {
      if (progressInStep > 0.7 && index < total - 1) {
        const exitP = (progressInStep - 0.7) / 0.3;
        return 50 * exitP;
      }
      return 0;
    }
    const pos = index - step;
    if (progressInStep > 0.7) {
      const advanceP = (progressInStep - 0.7) / 0.3;
      return -80 * (pos - advanceP);
    }
    return -80 * pos;
  });

  const scale = useTransform(scrollYProgress, (v) => {
    const step = Math.min(Math.floor(v * total), total - 1);
    const progressInStep = (v - step * span) / span;

    if (index < step) return 0.85;
    if (index === step) {
      if (progressInStep > 0.7 && index < total - 1) {
        const exitP = (progressInStep - 0.7) / 0.3;
        return 1 - 0.15 * exitP;
      }
      return index === total - 1 ? 1.04 : 1.0;
    }
    const pos = index - step;
    if (progressInStep > 0.7) {
      const advanceP = (progressInStep - 0.7) / 0.3;
      return Math.max(0.6, 1 - 0.1 * (pos - advanceP));
    }
    return Math.max(0.6, 1 - 0.1 * pos);
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
    if (pos === 1) return 0.7;
    if (pos === 2) return 0.4;
    return 0;
  });

  const borderColor = useTransform(scrollYProgress, (v) => {
    const step = Math.min(Math.floor(v * total), total - 1);
    if (index === step) return 'rgba(14,116,144,0.7)';
    if (index === step + 1) return 'rgba(255,255,255,0.2)';
    return 'rgba(255,255,255,0.08)';
  });

  return (
    <motion.div
      style={{
        x,
        y,
        z,
        scale,
        opacity,
        borderColor,
      }}
      className="absolute w-[260px] sm:w-[300px] md:w-[320px] aspect-[9/19.2] rounded-[48px] p-3 bg-[#0C1A20] shadow-[0_45px_100px_rgba(6,182,212,0.35)] border-4 ring-1 ring-white/30 transform-gpu transition-shadow"
    >
      <div className="absolute top-5 left-1/2 -translate-x-1/2 w-28 h-6 bg-black rounded-full z-40 flex items-center justify-between px-2.5 border border-white/10 shadow-md">
        <div className="w-2.5 h-2.5 rounded-full bg-slate-900 ring-1 ring-white/20 flex items-center justify-center">
          <div className="w-1 h-1 rounded-full bg-[#06B6D4]" />
        </div>
        <div className="flex items-center gap-1.5">
          <span className="text-[9px] font-bold text-white/80 tracking-tighter">AI</span>
          <div className="w-2 h-2 rounded-full bg-[#0E7490] animate-pulse" />
        </div>
      </div>

      <div className="relative w-full h-full rounded-[38px] overflow-hidden bg-slate-950 border border-white/10 shadow-inner">
        <img
          src={image}
          alt={alt}
          className="w-full h-full object-cover object-top"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0C1A20]/25 via-transparent to-transparent pointer-events-none" />
        <div className="absolute bottom-2 left-1/2 -translate-x-1/2 w-32 h-1 bg-white/70 rounded-full z-40 backdrop-blur-xs" />
      </div>
    </motion.div>
  );
};

// ─── Beruang Showcase Section (MC+ 3D Cascade) ────────────────

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

        {/* Top Header Bar */}
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
          
          {/* LEFT COLUMN: Single Active Text Block (AnimatePresence mode="wait") */}
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
                {/* Icon Badge */}
                <div className="flex items-center gap-3 flex-wrap">
                  <span
                    className="inline-flex items-center gap-2 px-4 py-2 rounded-2xl text-xs sm:text-sm font-black tracking-widest uppercase border shadow-sm backdrop-blur-md"
                    style={{
                      background: '#06B6D420',
                      borderColor: '#06B6D460',
                      color: '#0E7490',
                    }}
                  >
                    <div className="p-1.5 rounded-xl bg-white shadow-2xs">
                      <IconComponent size={15} className="text-[#06B6D4]" />
                    </div>
                    <span>{currentChapter.number} — {currentChapter.badge}</span>
                  </span>
                </div>

                {/* Heading */}
                <div>
                  <h4 className="text-3xl sm:text-4xl md:text-5xl lg:text-[52px] font-black text-[#0C1A20] tracking-tight leading-[1.05]">
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

          {/* RIGHT COLUMN: 3D Tilted Phone Cascade Stage */}
          <div className="lg:col-span-7 flex items-center justify-center relative min-h-[460px] sm:min-h-[520px]">
            <div
              className="relative w-full h-[460px] sm:h-[520px] flex items-center justify-center"
              style={{
                perspective: '1400px',
                transformStyle: 'preserve-3d',
              }}
            >
              <div
                className="relative w-full h-full flex items-center justify-center"
                style={{
                  transform: 'rotateY(-18deg) rotateX(10deg) rotate(-5deg)',
                  transformStyle: 'preserve-3d',
                }}
              >
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

  const l0X = useTransform(scrollYProgress, [0, 0.40, 0.60, 1], [0, 0, -160, -160]);
  const l0Y = useTransform(scrollYProgress, [0, 0.40, 0.60, 1], [0, 0, 100, 100]);
  const l0Z = useTransform(scrollYProgress, [0, 0.40, 0.60, 1], [0, 0, 50, 50]);
  const l0Opacity = useTransform(scrollYProgress, [0, 0.40, 0.60, 1], [1, 1, 0, 0]);

  const l1X = useTransform(scrollYProgress, [0, 0.40, 0.60, 1], [80, 80, 0, 0]);
  const l1Y = useTransform(scrollYProgress, [0, 0.40, 0.60, 1], [-25, -25, 0, 0]);
  const l1Z = useTransform(scrollYProgress, [0, 0.40, 0.60, 1], [-80, -80, 0, 0]);
  const l1Scale = useTransform(scrollYProgress, [0, 0.40, 0.60, 1], [0.9, 0.9, 1.02, 1.02]);
  const l1Opacity = useTransform(scrollYProgress, [0, 0.40, 0.60, 1], [0.6, 0.6, 1, 1]);

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
                <div className="flex items-center gap-3 flex-wrap">
                  <span
                    className="inline-flex items-center gap-2 px-4 py-2 rounded-2xl text-xs sm:text-sm font-black tracking-widest uppercase border shadow-sm backdrop-blur-md"
                    style={{
                      background: '#0E749020',
                      borderColor: '#0E749060',
                      color: '#0E7490',
                    }}
                  >
                    <div className="p-1.5 rounded-xl bg-white shadow-2xs">
                      <IconComponent size={15} className="text-[#0E7490]" />
                    </div>
                    <span>{currentChapter.number} — {currentChapter.badge}</span>
                  </span>
                </div>

                <h4 className="text-3xl sm:text-4xl md:text-5xl lg:text-[52px] font-black text-[#0C1A20] tracking-tight leading-[1.05]">
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

          {/* RIGHT COLUMN: 3D Laptop Cascade */}
          <div className="lg:col-span-7 flex items-center justify-center relative min-h-[440px]">
            <div
              className="relative w-full h-[400px] sm:h-[440px] flex items-center justify-center"
              style={{ perspective: '1400px', transformStyle: 'preserve-3d' }}
            >
              <div
                className="relative w-full h-full flex items-center justify-center"
                style={{ transform: 'rotateY(-15deg) rotateX(8deg)', transformStyle: 'preserve-3d' }}
              >
                
                {/* Laptop 1 */}
                <motion.div
                  style={{ x: l1X, y: l1Y, z: l1Z, scale: l1Scale, opacity: l1Opacity }}
                  className="absolute w-full max-w-[540px] lg:max-w-[600px] transform-gpu"
                >
                  <div className="w-full aspect-[16/10] rounded-t-3xl p-3 bg-[#0C1A20] border-2 border-[#0E7490]/50 shadow-[0_35px_80px_rgba(14,116,144,0.3)] relative ring-1 ring-white/15">
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
                  style={{ x: l0X, y: l0Y, z: l0Z, opacity: l0Opacity }}
                  className="absolute w-full max-w-[540px] lg:max-w-[600px] transform-gpu"
                >
                  <div className="w-full aspect-[16/10] rounded-t-3xl p-3 bg-[#0C1A20] border-2 border-[#0E7490]/60 shadow-[0_35px_80px_rgba(14,116,144,0.4)] relative ring-1 ring-white/20">
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

      {/* ── Beruang AI Centerpiece (MC+ Style 3D Layered Cascade) ── */}
      <BeruangShowcaseSection />

      {/* ── RentVerse Secondary Showcase ── */}
      <RentVerseShowcaseSection />

    </div>
  );
};

export default FlagshipScrollytelling;
