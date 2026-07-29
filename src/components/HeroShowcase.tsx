import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Trophy, ExternalLink, Sparkles, Layers, ShieldCheck } from 'lucide-react';

export interface ProjectShowcase {
  id: string;
  title: string;
  tagline: string;
  badge: string;
  webImg: string;
  mobileImg?: string;
  tech: string[];
}

export const showcaseProjects: ProjectShowcase[] = [
  {
    id: 'rentverse',
    title: 'RentVerse Platform',
    tagline: 'Property Discovery & Rental Ecosystem',
    badge: 'DevSecOps Champion',
    webImg: '/images/rentverse-laptop.jpg',
    mobileImg: '/images/beruang/home.png',
    tech: ['Next.js 14', 'Docker', 'DevSecOps'],
  },
  {
    id: 'beruang',
    title: 'Beruang AI Money',
    tagline: 'Autonomous AI Personal Finance Tracker',
    badge: 'Best Architecture (FYP)',
    webImg: '/images/kuehlicious-laptop.jpg',
    mobileImg: '/images/beruang/home.png',
    tech: ['React Native', 'GPT-4o', 'Python'],
  },
  {
    id: 'kuehlicious',
    title: 'Kuehlicious Web',
    tagline: 'E-Commerce System & Real-Time Orders',
    badge: 'Best Website GUI Award',
    webImg: '/images/kuehlicious-laptop.jpg',
    mobileImg: '/images/play2grow-mobile.jpg',
    tech: ['React', 'Node.js', 'PostgreSQL'],
  },
  {
    id: 'batik',
    title: 'Batik AI Recognition',
    tagline: 'Vision Transformer Pattern Classifier',
    badge: '94.2% ViT Accuracy',
    webImg: '/images/batik-main.jpeg',
    mobileImg: '/images/beruang/home.png',
    tech: ['ViT', 'PyTorch', 'OpenCV'],
  },
  {
    id: 'play2grow',
    title: 'Play2Grow Edutainment',
    tagline: 'Android Learning Platform for Kids',
    badge: 'UiTM Innovation Winner',
    webImg: '/images/rentverse-laptop.jpg',
    mobileImg: '/images/play2grow-mobile.jpg',
    tech: ['Android', 'Firebase', 'Java'],
  },
];

const HeroShowcase = () => {
  const [activeIdx, setActiveIdx] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setActiveIdx((prev) => (prev + 1) % showcaseProjects.length);
    }, 4500);
    return () => clearInterval(timer);
  }, []);

  const active = showcaseProjects[activeIdx];

  return (
    <div className="relative w-full max-w-[560px] mx-auto flex flex-col items-center select-none py-2">
      
      {/* Ambient Lighting Halo */}
      <div className="absolute -inset-4 bg-gradient-to-tr from-[#06B6D4]/15 via-transparent to-[#0E7490]/15 rounded-3xl blur-2xl pointer-events-none" />

      {/* 3D Composition Stage Container */}
      <div className="relative w-full aspect-[16/11] flex items-center justify-center">
        
        <AnimatePresence mode="wait">
          <motion.div
            key={active.id}
            initial={{ opacity: 0, y: 15, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -15, scale: 0.96 }}
            transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
            className="relative w-full h-full flex items-center justify-center"
          >
            
            {/* Primary Device: macOS Studio Window Frame */}
            <div className="w-[90%] sm:w-[92%] bg-[#0C1A20] rounded-2xl p-2.5 sm:p-3 shadow-[0_25px_60px_-15px_rgba(12,26,32,0.4)] border border-[#0E7490]/40 relative z-10 transition-all duration-500 hover:border-[#06B6D4]">
              
              {/* Window Controls Bar */}
              <div className="flex items-center justify-between pb-2 px-1 border-b border-slate-800/80 mb-2">
                <div className="flex items-center gap-1.5">
                  <span className="w-2.5 h-2.5 rounded-full bg-[#FF5F56] inline-block" />
                  <span className="w-2.5 h-2.5 rounded-full bg-[#FFBD2E] inline-block" />
                  <span className="w-2.5 h-2.5 rounded-full bg-[#27C93F] inline-block" />
                </div>
                <div className="text-[10px] font-mono text-slate-400 bg-slate-900/80 px-3 py-0.5 rounded-full border border-slate-800 tracking-wider truncate max-w-[200px]">
                  {active.id}.izwan.dev
                </div>
                <div className="w-4" />
              </div>

              {/* Web Screenshot Viewport */}
              <div className="relative w-full aspect-[16/10] bg-slate-950 rounded-lg overflow-hidden group">
                <img
                  src={active.webImg}
                  alt={active.title}
                  className="w-full h-full object-cover object-top transition-transform duration-700 group-hover:scale-105"
                />
                
                {/* Bottom Title Bar Overlay */}
                <div className="absolute bottom-2.5 left-2.5 right-2.5 bg-[#0C1A20]/90 backdrop-blur-md px-3 py-2 rounded-lg border border-[#0E7490]/40 flex items-center justify-between shadow-lg">
                  <div>
                    <div className="text-xs font-extrabold text-white leading-tight">{active.title}</div>
                    <div className="text-[10px] text-slate-400 font-medium">{active.tagline}</div>
                  </div>
                  <span className="px-2 py-0.5 rounded bg-[#06B6D4]/15 border border-[#06B6D4]/30 text-[#06B6D4] text-[9px] font-extrabold uppercase tracking-wider">
                    {active.tech[0]}
                  </span>
                </div>
              </div>
            </div>

            {/* Floating Device: Overlapping iPhone 16 Pro Frame */}
            {active.mobileImg && (
              <motion.div
                initial={{ opacity: 0, x: 20, y: 20, rotate: 6 }}
                animate={{ opacity: 1, x: 0, y: 0, rotate: -4 }}
                transition={{ duration: 0.5, delay: 0.15 }}
                className="absolute -bottom-2 -right-1 sm:right-1 w-[130px] sm:w-[155px] z-20 shadow-[0_20px_50px_rgba(0,0,0,0.5)] transform-gpu hover:rotate-0 transition-transform duration-300"
              >
                <div className="w-full bg-[#1A1B22] rounded-[28px] p-2 border-2 border-slate-700/90 relative">
                  {/* Dynamic Island Notch */}
                  <div className="absolute top-2 left-1/2 -translate-x-1/2 w-12 h-2.5 bg-black rounded-full z-30" />
                  
                  {/* Phone Screen Viewport */}
                  <div className="w-full aspect-[9/19] bg-slate-950 rounded-[22px] overflow-hidden relative">
                    <img
                      src={active.mobileImg}
                      alt="Mobile Preview"
                      className="w-full h-full object-cover object-top"
                    />
                  </div>
                </div>
              </motion.div>
            )}

            {/* Floating Glassmorphism Badge */}
            <motion.div
              initial={{ opacity: 0, y: -15, scale: 0.9 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ duration: 0.4, delay: 0.2 }}
              className="absolute -top-3 -left-2 sm:left-2 z-30 bg-[#0C1A20]/90 backdrop-blur-md border border-[#06B6D4]/40 px-3 py-1.5 rounded-full shadow-[0_10px_25px_rgba(6,182,212,0.25)] flex items-center gap-2"
            >
              <Trophy size={13} className="text-[#06B6D4] animate-bounce" />
              <span className="text-[11px] font-extrabold text-white tracking-wide">{active.badge}</span>
            </motion.div>

          </motion.div>
        </AnimatePresence>

      </div>

      {/* Interactive Project Switcher Pill Tabs */}
      <div className="flex flex-wrap items-center justify-center gap-1.5 mt-4 z-30 bg-white/90 p-1.5 rounded-full border border-slate-200 shadow-xs backdrop-blur-md">
        {showcaseProjects.map((p, idx) => (
          <button
            key={p.id}
            onClick={() => setActiveIdx(idx)}
            className={`px-3 py-1 rounded-full text-xs font-bold transition-all duration-300 cursor-pointer ${
              idx === activeIdx
                ? 'bg-[#0E7490] text-white shadow-xs scale-105'
                : 'text-slate-600 hover:text-[#0C1A20] hover:bg-slate-100'
            }`}
          >
            {p.title.split(' ')[0]}
          </button>
        ))}
      </div>

    </div>
  );
};

export default HeroShowcase;
