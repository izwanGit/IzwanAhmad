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
import { ArrowRight, Sparkles, Zap, Brain, Lock, Server, CheckCircle2, UserCheck, LayoutDashboard, Wallet, Globe, ShieldCheck, ExternalLink } from 'lucide-react';
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
      className="absolute aspect-[9/19.2] w-[130px] rounded-[26px] border-[2.5px] bg-[#0C1A20] p-1 shadow-[0_20px_50px_rgba(14,116,144,0.25)] ring-1 ring-white/30 transform-gpu transition-shadow sm:w-[190px] sm:rounded-[36px] sm:border-[3px] sm:p-2 md:w-[210px] lg:w-[220px]"
    >
      <div className="absolute left-1/2 top-2.5 z-40 flex h-4 w-16 -translate-x-1/2 items-center justify-between rounded-full border border-white/10 bg-black px-1.5 shadow-md sm:top-4 sm:h-5 sm:w-24 sm:px-2">
        <div className="w-2 h-2 rounded-full bg-slate-900 ring-1 ring-white/20 flex items-center justify-center">
          <div className="w-1 h-1 rounded-full bg-[#06B6D4]" />
        </div>
        <div className="flex items-center gap-1">
          <span className="text-[8px] font-bold text-white/80 tracking-tighter">AI</span>
          <div className="w-1.5 h-1.5 rounded-full bg-[#0E7490] animate-pulse" />
        </div>
      </div>

      <div className="relative h-full w-full overflow-hidden rounded-[24px] border border-white/10 bg-slate-950 shadow-inner sm:rounded-[34px]">
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
      className="absolute flex h-[260px] items-center justify-center transform-gpu drop-shadow-[0_25px_50px_rgba(14,116,144,0.3)] sm:h-[480px]"
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
      className="absolute w-full max-w-[280px] transform-gpu sm:max-w-[420px] md:max-w-[460px] lg:max-w-[480px]"
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

// ─── Project Introductions (Normal Document Flow) ──────────────

interface ProjectIntroProof {
  value: string;
  label: string;
}

interface ProjectIntroAction {
  label: string;
  href: string;
  primary?: boolean;
}

interface ProjectIntroProps {
  id: string;
  eyebrow: string;
  title: string;
  description: string;
  logo: string;
  logoAlt: string;
  awardImage: string;
  proofIcon: React.ElementType;
  proofs: [ProjectIntroProof, ProjectIntroProof];
  stack: string;
  actions: ProjectIntroAction[];
}

const ProjectIntro: React.FC<ProjectIntroProps> = ({
  id,
  eyebrow,
  title,
  description,
  logo,
  logoAlt,
  awardImage,
  proofIcon: ProofIcon,
  proofs,
  stack,
  actions,
}) => (
  <section
    aria-labelledby={`${id}-title`}
    className="relative overflow-hidden border-t border-border bg-background"
  >
    <div className="pointer-events-none absolute inset-0 bg-hero-wash opacity-80" aria-hidden="true" />

    <div className="container relative mx-auto grid max-w-7xl items-center gap-8 px-4 py-12 sm:px-6 sm:py-16 lg:grid-cols-12 lg:gap-12 lg:py-20">
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.35 }}
        transition={{ duration: 0.32, ease: [0.22, 1, 0.36, 1] }}
        className="relative flex min-h-52 items-center justify-center transform-gpu sm:min-h-64 lg:col-span-4 lg:min-h-72"
      >
        <div className="pointer-events-none absolute inset-0 bg-hero-journey-halo" aria-hidden="true" />
        <div className="relative h-52 w-full max-w-sm sm:h-64 lg:h-72">
          <img
            src={awardImage}
            alt=""
            aria-hidden="true"
            className="absolute bottom-0 right-2 h-40 w-40 object-contain sm:right-4 sm:h-52 sm:w-52 lg:right-0 lg:h-60 lg:w-60"
          />
          <img
            src={logo}
            alt={logoAlt}
            className="absolute bottom-6 left-4 z-10 h-28 w-28 object-contain drop-shadow-xl sm:bottom-8 sm:left-6 sm:h-36 sm:w-36 lg:left-0 lg:h-40 lg:w-40"
          />
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.25 }}
        transition={{ duration: 0.32, delay: 0.06, ease: [0.22, 1, 0.36, 1] }}
        className="transform-gpu lg:col-span-8"
      >
        <div className="flex items-center gap-2 text-xs font-extrabold uppercase tracking-widest text-primary">
          <ProofIcon className="h-4 w-4 text-accent" aria-hidden="true" />
          <span>{eyebrow}</span>
        </div>

        <h3
          id={`${id}-title`}
          className="mt-3 max-w-3xl text-3xl font-black leading-tight tracking-tight text-foreground sm:text-4xl lg:text-5xl"
        >
          {title}
        </h3>

        <p className="mt-4 max-w-2xl text-sm font-medium leading-relaxed text-muted-foreground sm:text-base lg:text-lg">
          {description}
        </p>

        <dl className="mt-6 grid grid-cols-2 border-y border-border sm:mt-8">
          {proofs.map((proof, index) => (
            <div
              key={proof.label}
              className={`min-w-0 py-4 ${index === 0 ? 'border-r border-border pr-4' : 'pl-4 sm:pl-6'}`}
            >
              <dt className="text-xs font-bold uppercase tracking-wider text-muted-foreground">
                {proof.label}
              </dt>
              <dd className="mt-1 text-lg font-black leading-snug tracking-tight text-foreground sm:text-2xl">
                {proof.value}
              </dd>
            </div>
          ))}
        </dl>

        <div className="mt-6 flex flex-col gap-4 sm:mt-8 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-xs font-extrabold uppercase tracking-wider text-primary sm:text-sm">
            {stack}
          </p>

          <div className="flex gap-2">
            {actions.map((action) => (
              <a
                key={action.label}
                href={action.href}
                target="_blank"
                rel="noopener noreferrer"
                className={`group inline-flex min-h-11 flex-1 items-center justify-center gap-2 rounded-full px-4 text-xs font-black transition duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 sm:flex-none sm:text-sm ${
                  action.primary
                    ? 'bg-primary text-primary-foreground shadow-hero-cta hover:-translate-y-0.5 hover:bg-primary-hover'
                    : 'border border-borderStrong bg-card text-foreground hover:-translate-y-0.5 hover:border-primary hover:text-primary'
                }`}
              >
                <span>{action.label}</span>
                <ExternalLink className="h-4 w-4 transition-transform duration-150 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" aria-hidden="true" />
              </a>
            ))}
          </div>
        </div>
      </motion.div>
    </div>
  </section>
);

const BeruangProjectHeader: React.FC = () => (
  <ProjectIntro
    id="beruang-project"
    eyebrow="Beruang · Award-winning AI finance"
    title="Financial intelligence, built to feel human."
    description="A mobile finance ecosystem that turns everyday spending data into clear, personal guidance through secure AI services and retrieval-augmented advice."
    logo="/images/beruang/logo.png"
    logoAlt="Beruang AI"
    awardImage="/images/showcase-awards/beruang-award.webp"
    proofIcon={Sparkles}
    proofs={[
      { value: '99.61%', label: 'AI accuracy' },
      { value: 'Best System Architecture', label: 'Award recognition' },
    ]}
    stack="React Native · PyTorch · Firebase RAG"
    actions={[
      { label: 'Explore live demo', href: 'https://beruang-landing.vercel.app/', primary: true },
    ]}
  />
);

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
      <div className="sticky top-0 flex h-[100svh] w-full flex-col overflow-hidden bg-[#F5F9FA] px-4 pb-2 pt-14 sm:px-6 sm:pb-3 sm:pt-16 lg:px-8 lg:pb-4 lg:pt-16">
        
        {/* Shared background atmosphere */}
        <div
          className="pointer-events-none absolute inset-0"
          style={{
            background:
              'radial-gradient(circle at 14% 16%, rgba(6,182,212,0.12), transparent 28%), radial-gradient(circle at 84% 48%, rgba(14,116,144,0.12), transparent 34%)',
          }}
        />
        <div
          className="pointer-events-none absolute inset-0 opacity-35"
          style={{
            backgroundImage: 'radial-gradient(circle, rgba(14,116,144,0.22) 1px, transparent 1.5px)',
            backgroundSize: '22px 22px',
            maskImage: 'linear-gradient(to bottom, black, transparent 82%)',
          }}
        />

        {/* Top Header inside Sticky Stage — Clean Chapter Header Bar */}
        <div className="container relative z-40 mx-auto max-w-7xl shrink-0 mb-2 pb-1.5 border-b border-[#0E7490]/10 sm:mb-3 sm:pb-2">
          <div className="flex items-center justify-between text-[10px] font-black uppercase tracking-wider text-[#0E7490] sm:text-xs">
            <div className="flex items-center gap-1.5 sm:gap-2">
              <span className="h-2 w-2 rounded-full bg-[#06B6D4] animate-pulse" />
              <span className="hidden xs:inline">Beruang AI Architecture</span>
              <span className="xs:hidden">Beruang AI</span>
            </div>
            <div className="rounded-full bg-[#0E7490]/10 px-2.5 py-0.5 text-[10px] font-black text-[#0E7490] sm:text-xs">
              Chapter 0{activeIdx + 1} / 0{total}
            </div>
          </div>
        </div>

        {/* Main Showcase Grid */}
        <div className="container relative z-30 mx-auto flex min-h-0 max-w-7xl flex-1 flex-col gap-2 sm:gap-4 lg:grid lg:grid-cols-12 lg:grid-rows-1 lg:items-center lg:gap-12">
          
          {/* LEFT / TOP: Active Text Block */}
          <div className="relative flex shrink-0 flex-col items-center text-center lg:items-start lg:text-left lg:col-span-5">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentChapter.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.2, ease: 'easeOut' }}
                className="flex w-full max-w-xl flex-col items-center text-center lg:items-start lg:text-left space-y-1 sm:space-y-3 lg:space-y-5 transform-gpu"
              >
                {/* Badge */}
                <div>
                  <span className="inline-flex items-center gap-1.5 text-[9px] font-black uppercase tracking-widest text-[#0E7490] sm:text-xs">
                    <span className="h-1.5 w-1.5 rounded-full bg-[#06B6D4]" />
                    {currentChapter.badge}
                  </span>
                </div>

                {/* Title */}
                <h4 className="text-xl font-black leading-tight tracking-tight text-[#06B6D4] sm:text-3xl md:text-4xl lg:text-[48px] lg:leading-[1.08]">
                  {currentChapter.title}
                </h4>

                {/* Paragraph */}
                <p className="text-xs font-medium leading-relaxed text-[#0C1A20]/80 sm:text-base md:text-lg max-w-md lg:max-w-none">
                  {currentChapter.paragraph}
                </p>

                {/* Feature Pill */}
                <div>
                  <div className="inline-flex items-center gap-1.5 rounded-xl border border-[#06B6D4]/30 bg-[#0E7490] px-3 py-1.5 text-[10px] font-black text-white shadow-md sm:gap-2.5 sm:rounded-2xl sm:px-4 sm:py-2.5 sm:text-xs md:text-sm">
                    <CheckCircle2 size={14} className="text-white shrink-0 sm:size-[16px]" />
                    <span>{currentChapter.pill}</span>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* RIGHT / BOTTOM: Upright Phone Stage */}
          <div className="relative flex min-h-0 flex-1 items-center justify-center lg:col-span-7">
            <div className="relative flex h-full w-full items-center justify-center sm:h-[360px] md:h-[400px] lg:h-[420px]">
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
        <div className="container relative z-40 mx-auto mt-auto flex max-w-7xl shrink-0 items-center justify-between border-t border-[#0E7490]/15 pt-1.5 sm:pt-2">
          <div className="flex items-center gap-1.5 text-[9px] font-black uppercase tracking-wider text-[#0C1A20]/60 sm:gap-2 sm:text-xs sm:tracking-widest">
            <span>Beruang AI Platform</span>
            <span>•</span>
            <span className="text-[#0E7490]">System Architecture</span>
          </div>
          <div className="w-28 xs:w-36 sm:w-56 h-1 rounded-full bg-[#0E7490]/20 overflow-hidden">
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

// ─── RentVerse Project Header (Normal Document Flow) ───────────

const RentVerseProjectHeader: React.FC = () => (
  <ProjectIntro
    id="rentverse-project"
    eyebrow="RentVerse · National champion platform"
    title="Secure renting, engineered end to end."
    description="A full-stack rental ecosystem where calm product design meets zero-trust authentication, automated delivery, and production-grade security."
    logo="/images/rentverse/logo.png"
    logoAlt="RentVerse"
    awardImage="/images/showcase-awards/rentverse-award.webp"
    proofIcon={ShieldCheck}
    proofs={[
      { value: '4 awards', label: 'National champion' },
      { value: '14 stages', label: 'Secure CI/CD pipeline' },
    ]}
    stack="Next.js 14 · Docker · Zero Trust"
    actions={[
      { label: 'Visit live website', href: 'https://uitm-devops-challenge-team-one.vercel.app/', primary: true },
      { label: 'View source', href: 'https://github.com/izwanGit/uitm-devops-challenge_TeamOne' },
    ]}
  />
);

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
      <div className="sticky top-0 flex h-[100svh] w-full flex-col overflow-hidden bg-[#F5F9FA] px-4 pb-2 pt-14 sm:px-6 sm:pb-3 sm:pt-16 lg:px-8 lg:pb-4 lg:pt-16">
        
        {/* Shared background atmosphere */}
        <div
          className="pointer-events-none absolute inset-0"
          style={{
            background:
              'radial-gradient(circle at 14% 16%, rgba(6,182,212,0.12), transparent 28%), radial-gradient(circle at 84% 48%, rgba(14,116,144,0.12), transparent 34%)',
          }}
        />
        <div
          className="pointer-events-none absolute inset-0 opacity-35"
          style={{
            backgroundImage: 'radial-gradient(circle, rgba(14,116,144,0.22) 1px, transparent 1.5px)',
            backgroundSize: '22px 22px',
            maskImage: 'linear-gradient(to bottom, black, transparent 82%)',
          }}
        />

        {/* Top Header inside Sticky Stage — Clean Chapter Header Bar */}
        <div className="container relative z-40 mx-auto max-w-7xl shrink-0 mb-2 pb-1.5 border-b border-[#0E7490]/10 sm:mb-3 sm:pb-2">
          <div className="flex items-center justify-between text-[10px] font-black uppercase tracking-wider text-[#0E7490] sm:text-xs">
            <div className="flex items-center gap-1.5 sm:gap-2">
              <span className="h-2 w-2 rounded-full bg-[#06B6D4] animate-pulse" />
              <span className="hidden xs:inline">RentVerse Ecosystem Architecture</span>
              <span className="xs:hidden">RentVerse</span>
            </div>
            <div className="rounded-full bg-[#0E7490]/10 px-2.5 py-0.5 text-[10px] font-black text-[#0E7490] sm:text-xs">
              Chapter 0{activeIdx + 1} / 0{total}
            </div>
          </div>
        </div>

        {/* Main Grid */}
        <div className="container relative z-30 mx-auto flex min-h-0 max-w-7xl flex-1 flex-col gap-2 sm:gap-4 lg:grid lg:grid-cols-12 lg:grid-rows-1 lg:items-center lg:gap-12">
          
          {/* LEFT / TOP: Active Text Block */}
          <div className="relative flex shrink-0 flex-col items-center text-center lg:items-start lg:text-left lg:col-span-5">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentChapter.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.2, ease: 'easeOut' }}
                className="flex w-full max-w-xl flex-col items-center text-center lg:items-start lg:text-left space-y-1 sm:space-y-3 lg:space-y-5 transform-gpu"
              >
                {/* Badge */}
                <div>
                  <span className="inline-flex items-center gap-1.5 text-[9px] font-black uppercase tracking-widest text-[#0E7490] sm:text-xs">
                    <span className="h-1.5 w-1.5 rounded-full bg-[#06B6D4]" />
                    {currentChapter.badge}
                  </span>
                </div>

                {/* Title */}
                <h4 className="text-xl font-black leading-tight tracking-tight text-[#06B6D4] sm:text-3xl md:text-4xl lg:text-[48px] lg:leading-[1.08]">
                  {currentChapter.title}
                </h4>

                {/* Paragraph */}
                <p className="text-xs font-medium leading-relaxed text-[#0C1A20]/80 sm:text-base md:text-lg max-w-md lg:max-w-none">
                  {currentChapter.paragraph}
                </p>

                {/* Feature Pill */}
                <div>
                  <div className="inline-flex items-center gap-1.5 rounded-xl border border-[#06B6D4]/30 bg-[#0E7490] px-3 py-1.5 text-[10px] font-black text-white shadow-md sm:gap-2.5 sm:rounded-2xl sm:px-4 sm:py-2.5 sm:text-xs md:text-sm">
                    <CheckCircle2 size={14} className="text-white shrink-0 sm:size-[16px]" />
                    <span>{currentChapter.pill}</span>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* RIGHT / BOTTOM: Upright Laptop Stage */}
          <div className="relative flex min-h-0 flex-1 items-center justify-center lg:col-span-7">
            <div className="relative flex h-full w-full items-center justify-center sm:h-[320px] lg:h-[340px]">
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
        <div className="container relative z-40 mx-auto mt-auto flex max-w-7xl shrink-0 items-center justify-between border-t border-[#0E7490]/15 pt-1.5 sm:pt-2">
          <div className="flex items-center gap-1.5 text-[9px] font-black uppercase tracking-wider text-[#0C1A20]/60 sm:gap-2 sm:text-xs sm:tracking-widest">
            <span>RentVerse Platform</span>
            <span>•</span>
            <span className="text-[#0E7490]">DevSecOps Architecture</span>
          </div>
          <div className="w-28 xs:w-36 sm:w-56 h-1 rounded-full bg-[#0E7490]/20 overflow-hidden">
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
      <div className="pt-20 pb-10 sm:pt-24 sm:pb-16 relative overflow-hidden">
        <div className="container mx-auto px-6 max-w-7xl relative z-10">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 md:gap-8">
            <div>
              <div className="text-[12px] sm:text-[13px] font-extrabold uppercase tracking-widest text-[#06B6D4] mb-2 sm:mb-3 flex items-center gap-2">
                <Sparkles size={14} />
                <span>FEATURED WORK</span>
              </div>
              <h2 className="text-3xl sm:text-5xl md:text-6xl font-black text-[#0C1A20] tracking-tight leading-[1.05]">
                Selected Flagship Projects
              </h2>
              <p className="text-[#0C1A20]/75 text-xs sm:text-base md:text-lg mt-2 sm:mt-3 max-w-2xl font-normal leading-relaxed">
                High-impact software solutions engineered with robust architecture, AI integration, and enterprise DevSecOps standards.
              </p>
            </div>
            <Link
              to="/projects"
              className="inline-flex items-center gap-2 px-6 py-3 sm:px-7 sm:py-3.5 rounded-full bg-white border border-[#0E7490]/25 shadow-xs hover:shadow-md hover:border-[#06B6D4] text-xs font-bold text-[#0C1A20] hover:text-[#0E7490] transition-all group shrink-0 self-start md:self-auto"
            >
              <span>View All Projects</span>
              <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
        </div>
      </div>

      {/* ── Beruang AI Project Header (Document Flow) ── */}
      <BeruangProjectHeader />

      {/* ── Beruang AI Showcase Stage ── */}
      <BeruangShowcaseSection />

      {/* ── RentVerse DevSecOps Project Header (Document Flow) ── */}
      <RentVerseProjectHeader />

      {/* ── RentVerse Secondary Showcase Stage ── */}
      <RentVerseShowcaseSection />

    </div>
  );
};

export default FlagshipScrollytelling;
