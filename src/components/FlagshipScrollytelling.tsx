/**
 * FlagshipScrollytelling.tsx
 *
 * RECRUITER-OPTIMIZED FLAGSHIP SCROLLYTELLING
 *
 * Architectural & Design Highlights:
 *   1. BERUANG AI PLATFORM: 7 UI Screenshots (Login -> Home -> Expenses -> Chat 1 -> Chat 2 -> Chat 3 -> Profile)
 *      + Official Logos (React, PyTorch, Firebase) + Live Demo Link (https://beruang-landing.vercel.app/).
 *   2. RENTVERSE DEVOPS ECOSYSTEM: 4 Real Screenshots (Homepage -> Explore Map -> Admin Dashboard -> Slack Alerts)
 *      + RentVerse Logo (/images/rentverse/logo.png) + Live Website (https://uitm-devops-challenge-team-one.vercel.app/)
 *      + GitHub Repo Link (https://github.com/izwanGit/uitm-devops-challenge_TeamOne).
 *   3. UPRIGHT NATURAL DEVICE PRESENTATION (Not Slenty).
 *   4. ZERO TEXT CLASHING: AnimatePresence mode="wait" single active text block.
 *
 * Theme: #F5F9FA (bg) · #0E7490 (primary) · #06B6D4 (accent) · #0C1A20 (text)
 */

import React, { useRef, useState } from 'react';
import { motion, useScroll, useTransform, useMotionValueEvent, AnimatePresence, MotionValue } from 'framer-motion';
import { ArrowRight, Sparkles, Zap, Trophy, Brain, Lock, Server, CheckCircle2, UserCheck, LayoutDashboard, Wallet, Globe, ShieldCheck, ExternalLink } from 'lucide-react';
import { Link } from 'react-router-dom';

// ─── Real Official Tech SVG Icons ─────────────────────────────

const ReactIcon = () => (
  <svg className="w-3.5 h-3.5 shrink-0" viewBox="-11.5 -10.23174 23 20.46348" fill="none" xmlns="http://www.w3.org/2000/svg">
    <circle cx="0" cy="0" r="2.05" fill="#61DAFB" />
    <g stroke="#61DAFB" strokeWidth="1" fill="none">
      <ellipse rx="11" ry="4.2" />
      <ellipse rx="11" ry="4.2" transform="rotate(60)" />
      <ellipse rx="11" ry="4.2" transform="rotate(120)" />
    </g>
  </svg>
);

const FirebaseIcon = () => (
  <svg className="w-3.5 h-3.5 shrink-0" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M3.89 15.672L6.16 3.424c.068-.363.547-.456.748-.154l2.585 3.916 4.394-8.324a.428.428 0 01.768.012l5.632 16.8-20.287-15.672z" fill="#FFCA28" />
    <path d="M13.887 7.162l-4.394 8.324-2.585-3.916L3.89 15.672 12 21.9l8.287-6.228-6.4-8.51z" fill="#FFA000" />
    <path d="M12 21.9L3.89 15.672l2.27-12.248c.068-.363.547-.456.748-.154l2.585 3.916L12 21.9z" fill="#F57C00" />
  </svg>
);

const PyTorchIcon = () => (
  <svg className="w-3.5 h-3.5 shrink-0" viewBox="0 0 24 24" fill="#EE4C2C" xmlns="http://www.w3.org/2000/svg">
    <path d="M12 0L9.5 2.5l3.5 3.5H7.5C3.36 6 0 9.36 0 13.5S3.36 21 7.5 21H18v-3H7.5C5.01 18 3 15.99 3 13.5S5.01 9 7.5 9H13l-3.5 3.5L12 15l7.5-7.5L12 0z" />
  </svg>
);

const NextjsIcon = () => (
  <svg className="w-3.5 h-3.5 shrink-0" viewBox="0 0 180 180" fill="none" xmlns="http://www.w3.org/2000/svg">
    <mask id="nextjs-mask" maskUnits="userSpaceOnUse" x="0" y="0" width="180" height="180">
      <circle cx="90" cy="90" r="90" fill="black" />
    </mask>
    <g mask="url(#nextjs-mask)">
      <circle cx="90" cy="90" r="90" fill="#0C1A20" />
      <path d="M149.508 157.52L69.142 54H54V126H67.08V69.756L136.908 160.056C141.48 159.48 145.644 158.616 149.508 157.52Z" fill="white" />
      <path d="M115.2 54H128.28V126H115.2V54Z" fill="white" />
    </g>
  </svg>
);

const DockerIcon = () => (
  <svg className="w-3.5 h-3.5 shrink-0" viewBox="0 0 24 24" fill="#06B6D4" xmlns="http://www.w3.org/2000/svg">
    <path d="M13.983 11.078h2.119a.186.186 0 00.186-.185V9.006a.186.186 0 00-.186-.186h-2.119a.185.185 0 00-.185.186v1.887c0 .102.083.185.185.185zm-2.954-5.43h2.118a.185.185 0 00.186-.186V3.575a.185.185 0 00-.186-.185h-2.118a.185.185 0 00-.185.185v1.887c0 .103.083.186.185.186zm0 5.43h2.118a.185.185 0 00.186-.185V9.006a.185.185 0 00-.186-.186h-2.118a.185.185 0 00-.185.186v1.887c0 .102.083.185.185.185zm-2.955 0h2.119a.186.186 0 00.185-.185V9.006a.185.185 0 00-.185-.186H8.074a.185.185 0 00-.185.186v1.887c0 .102.083.185.185.185zm0-2.715h2.119a.186.186 0 00.185-.186V6.291a.186.186 0 00-.185-.186H8.074a.185.185 0 00-.185.186v1.887c0 .102.083.186.185.186zm-2.955 2.715h2.119a.186.186 0 00.185-.185V9.006a.185.185 0 00-.185-.186H5.119a.185.185 0 00-.185.186v1.887c0 .102.083.185.185.185zm0-2.715h2.119a.186.186 0 00.185-.186V6.291a.186.186 0 00-.185-.186H5.119a.185.185 0 00-.185.186v1.887c0 .102.083.186.185.186zm-2.955 2.715h2.119a.185.185 0 00.185-.185V9.006a.185.185 0 00-.185-.186H2.164a.185.185 0 00-.185.186v1.887c0 .102.083.185.185.185zm-2.955 0h2.119a.186.186 0 00.186-.185V9.006a.186.186 0 00-.186-.186H-.791a.185.185 0 00-.185.186v1.887c0 .102.083.185.185.185z" />
  </svg>
);

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
  device?: 'phone' | 'laptop' | 'raw';
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
    pill: 'Real-Time Financial Health Tracker',
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
    pill: '50/30/20 Budget Breakdown Engine',
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
    pill: 'Natural Language UI Generation',
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
    pill: 'Hyper-Localized Advisory Engine',
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
    pill: 'Encrypted User Profile & Goal System',
    icon: UserCheck,
    image: '/images/beruang/profile.png',
  },
];

const RENTVERSE_CHAPTERS: Chapter[] = [
  {
    id: 'homepage',
    number: '01',
    badge: 'Enterprise Rental Platform',
    title: 'Property Discovery Engine',
    paragraph:
      'Location-aware rental search platform featuring real-time property filter, Malay architecture UI, and instant booking.',
    pill: 'Next.js 14 · Interactive Location Search',
    icon: ShieldCheck,
    image: '/images/rentverse/homepage.jpg',
    device: 'laptop',
  },
  {
    id: 'android',
    number: '02',
    badge: 'Cross-Platform Mobile App',
    title: 'Android Native Client',
    paragraph:
      'Native Android application interface with bottom navigation tabs, category filtering, and nearby property geolocation.',
    pill: 'Android Client · Geolocation Search',
    icon: UserCheck,
    image: '/images/rentverse/android-mobile.png',
    device: 'raw',
  },
  {
    id: 'explore',
    number: '03',
    badge: 'Spatial Property Mapping',
    title: 'Interactive MapTiler Search',
    paragraph:
      'MapTiler spatial cluster mapping across Putrajaya and Cyberjaya with real-time price & sqft filtering.',
    pill: 'MapTiler Geo-Clustering · Real-Time Map Query',
    icon: Globe,
    image: '/images/rentverse/explore.jpg',
    device: 'laptop',
  },
  {
    id: 'admin',
    number: '04',
    badge: 'Security Monitoring Console',
    title: 'Zero-Trust Threat Dashboard',
    paragraph:
      'Real-time threat level monitoring console tracking failed login spikes, critical audit trails, and automated moderation.',
    pill: 'Zero Trust Auth · Threat Monitoring Console',
    icon: Server,
    image: '/images/rentverse/admin.jpg',
    device: 'laptop',
  },
  {
    id: 'slack',
    number: '05',
    badge: 'Real-Time DevSecOps Alerts',
    title: 'Slack Webhook Threat Dispatch',
    paragraph:
      'Automated DevSecOps incident response pushing real-time risk scores (99/100 CRITICAL), IP tracking, and webhooks to Slack.',
    pill: 'Slack Webhooks · Real-Time Incident Response',
    icon: Zap,
    image: '/images/rentverse/slack-alerts.jpg',
    device: 'laptop',
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
      <div className="absolute top-4 left-1/2 -translate-x-1/2 w-24 h-5 bg-black rounded-full z-40 flex items-center justify-between px-2 border border-white/10 shadow-md">
        <div className="w-2 h-2 rounded-full bg-slate-900 ring-1 ring-white/20 flex items-center justify-center">
          <div className="w-1 h-1 rounded-full bg-[#06B6D4]" />
        </div>
        <div className="flex items-center gap-1">
          <span className="text-[8px] font-bold text-white/80 tracking-tighter">AI</span>
          <div className="w-1.5 h-1.5 rounded-full bg-[#0E7490] animate-pulse" />
        </div>
      </div>

      <div className="relative w-full h-full rounded-[34px] overflow-hidden bg-slate-950 border border-white/10 shadow-inner">
        <img
          src={image}
          alt={alt}
          className="w-full h-full object-contain object-top bg-slate-950"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0C1A20]/20 via-transparent to-transparent pointer-events-none" />
        <div className="absolute bottom-2 left-1/2 -translate-x-1/2 w-28 h-1 bg-white/70 rounded-full z-40 backdrop-blur-xs" />
      </div>
    </motion.div>
  );
};

// ─── Direct Pre-framed Mobile Item (No Outer Phone Shell) ────

const CascadeRawItem: React.FC<CascadePhoneProps> = ({
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

  return (
    <motion.div
      style={{ x, y, scale, opacity }}
      className="absolute h-[420px] sm:h-[480px] flex items-center justify-center transform-gpu filter drop-shadow-[0_25px_50px_rgba(14,116,144,0.3)]"
    >
      <img
        src={image}
        alt={alt}
        className="h-full w-auto max-w-[260px] sm:max-w-[300px] object-contain"
        loading="lazy"
      />
    </motion.div>
  );
};

// ─── Dynamic 3D Laptop Item for RentVerse ─────────────────────

interface CascadeLaptopProps {
  image: string;
  alt: string;
  scrollYProgress: MotionValue<number>;
  index: number;
  total: number;
}

const CascadeLaptopItem: React.FC<CascadeLaptopProps> = ({
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

  return (
    <motion.div
      style={{ x, y, scale, opacity }}
      className="absolute w-full max-w-[540px] lg:max-w-[600px] transform-gpu"
    >
      <div className="w-full rounded-t-3xl p-3 bg-[#0C1A20] border-2 border-[#0E7490]/50 shadow-[0_30px_70px_rgba(14,116,144,0.25)] relative ring-1 ring-white/15">
        <div className="absolute top-1.5 left-1/2 -translate-x-1/2 w-3 h-3 rounded-full bg-slate-900 border border-slate-700 flex items-center justify-center z-40">
          <div className="w-1 h-1 rounded-full bg-[#06B6D4]" />
        </div>
        <div className="relative w-full rounded-xl overflow-hidden bg-white border border-white/10 shadow-inner">
          <img src={image} alt={alt} className="w-full h-auto block" loading="lazy" />
        </div>
      </div>
      <div className="w-[108%] -ml-[4%] h-5 rounded-b-2xl bg-gradient-to-b from-[#1E293B] to-[#0C1A20] border-t border-[#0E7490]/40 shadow-2xl flex justify-center items-start">
        <div className="w-20 h-1.5 rounded-b-md bg-[#0C1A20] border-x border-b border-[#0E7490]/30" />
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

        {/* Top Brand Header: Multi-Repo Ecosystem Architecture */}
        <div className="container mx-auto px-6 max-w-7xl relative z-40 shrink-0">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-4 border-b border-[#0E7490]/15">
            
            {/* Left: Brand Identity & Multi-Repo Scope */}
            <div className="flex items-center gap-3.5">
              <img
                src="/images/beruang/logo.png"
                alt="Beruang Logo"
                className="w-10 h-10 sm:w-11 sm:h-11 rounded-2xl object-cover shadow-sm border border-[#0E7490]/25 shrink-0"
              />
              <div>
                <div className="flex items-center gap-2">
                  <span className="text-base sm:text-lg font-black text-[#0C1A20] tracking-tight">Beruang AI Platform</span>
                  <span className="px-2.5 py-0.5 rounded-full bg-[#0E7490]/10 text-[#0E7490] text-[10px] font-black uppercase tracking-wider border border-[#0E7490]/20">
                    5 GitHub Repos
                  </span>
                </div>
                <p className="text-xs font-bold text-[#0E7490] mt-0.5">
                  Mobile App · AI Microservices · Express Server · RAG Engine · 99.61% Accuracy
                </p>
              </div>
            </div>

            {/* Right: Official Tech Logos Grid & Live App Button */}
            <div className="flex items-center gap-2 flex-wrap">
              <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white border border-[#0E7490]/20 text-[#0C1A20] text-xs font-extrabold shadow-2xs">
                <ReactIcon />
                <span>React Native</span>
              </span>
              <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white border border-[#0E7490]/20 text-[#0C1A20] text-xs font-extrabold shadow-2xs">
                <PyTorchIcon />
                <span>PyTorch</span>
              </span>
              <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white border border-[#0E7490]/20 text-[#0C1A20] text-xs font-extrabold shadow-2xs">
                <FirebaseIcon />
                <span>Firebase RAG</span>
              </span>
              <a
                href="https://beruang-landing.vercel.app/"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-[#0E7490] hover:bg-[#06B6D4] text-white text-xs font-black shadow-2xs transition-all hover:scale-105 group shrink-0"
              >
                <span>Live Demo</span>
                <ExternalLink size={13} className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
              </a>
            </div>

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
                  <h4 className="text-3xl sm:text-4xl md:text-5xl lg:text-[52px] font-black text-[#06B6D4] tracking-tight leading-[1.05]">
                    {currentChapter.title}
                  </h4>
                </div>

                {/* Crisp Paragraph */}
                <p className="text-base sm:text-lg md:text-xl font-medium text-[#0C1A20]/85 leading-relaxed">
                  {currentChapter.paragraph}
                </p>

                {/* Original Feature Pill Restored */}
                <div className="pt-2">
                  <div className="inline-flex items-center gap-2.5 px-5 py-3 rounded-2xl bg-[#0E7490] border border-[#06B6D4]/30 shadow-md text-xs sm:text-sm font-black text-white">
                    <CheckCircle2 size={16} className="text-white shrink-0" />
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
  const reversedChapters = [...RENTVERSE_CHAPTERS].map((chap, idx) => ({ chap, idx })).reverse();

  return (
    <section
      ref={containerRef}
      style={{ height: `${total * 100}vh` }}
      className="relative w-full border-t border-[#0E7490]/20"
      aria-label="RentVerse Rental Ecosystem Showcase"
    >
      <div className="sticky top-0 h-screen w-full overflow-hidden bg-[#F5F9FA] flex flex-col justify-between pt-20 pb-4 lg:pt-24 lg:pb-6 transition-colors duration-1000">
        
        {/* Ambient Glows */}
        <div
          className="absolute top-1/2 left-10 -translate-y-1/2 w-[600px] h-[600px] rounded-full pointer-events-none"
          style={{
            background: 'radial-gradient(circle, rgba(14,116,144,0.15) 0%, transparent 70%)',
          }}
        />

        {/* Top Header Bar: DevSecOps Ecosystem with RentVerse Logo */}
        <div className="container mx-auto px-6 max-w-7xl relative z-40 shrink-0">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-4 border-b border-[#0E7490]/15">
            
            <div className="flex items-center gap-3.5">
              <img
                src="/images/rentverse/logo.png"
                alt="RentVerse Logo"
                className="w-10 h-10 sm:w-11 sm:h-11 rounded-2xl object-cover shadow-sm border border-[#0E7490]/25 shrink-0 bg-white"
              />
              <div>
                <div className="flex items-center gap-2">
                  <span className="text-base sm:text-lg font-black text-[#0C1A20] tracking-tight">RentVerse Ecosystem</span>
                  <span className="px-2.5 py-0.5 rounded-full bg-[#0E7490]/10 text-[#0E7490] text-[10px] font-black uppercase tracking-wider border border-[#0E7490]/20">
                    DevSecOps Winner
                  </span>
                </div>
                <p className="text-xs font-bold text-[#0E7490] mt-0.5">
                  14-Stage CI/CD Security Pipeline · Zero Trust Authentication · Docker
                </p>
              </div>
            </div>

            <div className="flex items-center gap-2 flex-wrap">
              <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white border border-[#0E7490]/20 text-[#0C1A20] text-xs font-extrabold shadow-2xs">
                <NextjsIcon />
                <span>Next.js 14</span>
              </span>
              <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white border border-[#0E7490]/20 text-[#0C1A20] text-xs font-extrabold shadow-2xs">
                <DockerIcon />
                <span>Docker CI/CD</span>
              </span>
              <a
                href="https://uitm-devops-challenge-team-one.vercel.app/"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-[#0E7490] hover:bg-[#06B6D4] text-white text-xs font-black shadow-2xs transition-all hover:scale-105 group shrink-0"
              >
                <span>Live Website</span>
                <ExternalLink size={13} className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
              </a>
              <a
                href="https://github.com/izwanGit/uitm-devops-challenge_TeamOne"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-white border border-[#0E7490]/30 hover:border-[#06B6D4] text-[#0C1A20] text-xs font-black shadow-2xs transition-all hover:scale-105 group shrink-0"
              >
                <span>View Repo</span>
                <ExternalLink size={13} className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
              </a>
            </div>

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
                <h4 className="text-3xl sm:text-4xl md:text-5xl lg:text-[52px] font-black text-[#06B6D4] tracking-tight leading-[1.05]">
                  {currentChapter.title}
                </h4>

                <p className="text-base sm:text-lg md:text-xl font-medium text-[#0C1A20]/85 leading-relaxed">
                  {currentChapter.paragraph}
                </p>

                <div className="pt-2">
                  <div className="inline-flex items-center gap-2.5 px-5 py-3 rounded-2xl bg-[#0E7490] border border-[#06B6D4]/30 shadow-md text-xs sm:text-sm font-black text-white">
                    <CheckCircle2 size={16} className="text-white shrink-0" />
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
                {reversedChapters.map(({ chap, idx }) => {
                  if (chap.device === 'raw') {
                    return (
                      <CascadeRawItem
                        key={chap.id}
                        image={chap.image}
                        alt={chap.title}
                        scrollYProgress={scrollYProgress}
                        index={idx}
                        total={total}
                      />
                    );
                  }
                  if (chap.device === 'phone') {
                    return (
                      <CascadePhoneItem
                        key={chap.id}
                        image={chap.image}
                        alt={chap.title}
                        scrollYProgress={scrollYProgress}
                        index={idx}
                        total={total}
                      />
                    );
                  }
                  return (
                    <CascadeLaptopItem
                      key={chap.id}
                      image={chap.image}
                      alt={chap.title}
                      scrollYProgress={scrollYProgress}
                      index={idx}
                      total={total}
                    />
                  );
                })}
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
