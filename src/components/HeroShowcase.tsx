import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Trophy } from 'lucide-react';

export interface ShowcaseProject {
  id: string;
  title: string;
  badge: string;
  image: string;
  type: 'laptop' | 'phone';
}

export const showcaseProjects: ShowcaseProject[] = [
  {
    id: 'rentverse',
    title: 'RentVerse Platform',
    badge: 'DevSecOps Champion',
    image: '/images/rentverse-laptop.jpg',
    type: 'laptop',
  },
  {
    id: 'beruang',
    title: 'Beruang AI Money',
    badge: 'Best Architecture (FYP)',
    image: '/images/beruang/home.png',
    type: 'phone',
  },
  {
    id: 'petronas',
    title: 'PETRONAS HCSM Hub',
    badge: '95% Time Reduction',
    image: '/images/petronas-hub-main.jpg',
    type: 'laptop',
  },
  {
    id: 'batik',
    title: 'Batik AI Recognition',
    badge: '94.2% ViT Accuracy',
    image: '/images/batik-main.jpeg',
    type: 'laptop',
  },
  {
    id: 'kuehlicious',
    title: 'Kuehlicious Web',
    badge: 'Best GUI Award',
    image: '/images/kuehlicious-laptop.jpg',
    type: 'laptop',
  },
];

// Pristine Upright Laptop Frame
const LaptopFrame = ({ src, title }: { src: string; title: string }) => {
  return (
    <div className="w-[320px] sm:w-[420px] lg:w-[480px] flex flex-col items-center select-none">
      {/* Laptop Lid / Screen */}
      <div className="w-full bg-[#1E1E24] rounded-t-2xl p-2.5 pt-3 shadow-[0_30px_70px_-15px_rgba(0,0,0,0.7)] relative border border-slate-700/80 ring-1 ring-[#06B6D4]/20">
        {/* Camera Dot */}
        <div className="absolute top-1.5 left-1/2 -translate-x-1/2 w-2 h-2 rounded-full bg-slate-900 border border-slate-700 flex items-center justify-center">
          <div className="w-0.5 h-0.5 rounded-full bg-[#06B6D4]" />
        </div>
        {/* Screen Content */}
        <div className="w-full aspect-[16/10] bg-slate-950 rounded-lg overflow-hidden relative group">
          <img
            src={src}
            alt={title}
            className="w-full h-full object-cover object-top transition-transform duration-700 group-hover:scale-105"
          />
        </div>
      </div>
      {/* Laptop Base / Keyboard Lip */}
      <div className="w-[108%] h-4 bg-gradient-to-b from-[#2C2D35] to-[#1A1B22] rounded-b-xl shadow-2xl relative border-t border-slate-600/40 flex justify-center items-start">
        {/* Thumb Opening Notch */}
        <div className="w-16 h-1.5 bg-[#14151B] rounded-b-md border-x border-b border-slate-700/50" />
      </div>
    </div>
  );
};

// Pristine Upright Phone Frame
const PhoneFrame = ({ src, title }: { src: string; title: string }) => {
  return (
    <div className="w-[200px] sm:w-[230px] flex flex-col items-center select-none py-4">
      <div className="w-full bg-[#1A1B22] shadow-[0_30px_70px_-15px_rgba(0,0,0,0.7)] border-2 border-slate-700/90 rounded-[38px] p-3 relative ring-1 ring-[#06B6D4]/20">
        {/* iPhone Buttons */}
        <div className="absolute -left-[3px] top-20 w-[3px] h-8 bg-slate-600 rounded-l" />
        <div className="absolute -left-[3px] top-32 w-[3px] h-8 bg-slate-600 rounded-l" />
        <div className="absolute -right-[3px] top-24 w-[3px] h-12 bg-slate-600 rounded-r" />

        {/* Screen Container */}
        <div className="w-full aspect-[9/19.5] bg-slate-950 overflow-hidden relative rounded-[30px] border border-slate-800">
          {/* Dynamic Island Notch */}
          <div className="absolute top-2 left-1/2 -translate-x-1/2 w-20 h-4 bg-black rounded-full z-20 flex items-center justify-end px-2">
            <div className="w-1.5 h-1.5 rounded-full bg-[#06B6D4] animate-pulse" />
          </div>
          {/* Screen Image */}
          <img
            src={src}
            alt={title}
            className="w-full h-full object-cover object-top"
          />
        </div>
      </div>
    </div>
  );
};

const HeroShowcase = () => {
  const [activeIdx, setActiveIdx] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setActiveIdx((prev) => (prev + 1) % showcaseProjects.length);
    }, 4200);
    return () => clearInterval(timer);
  }, []);

  const active = showcaseProjects[activeIdx];

  return (
    <div className="relative w-full max-w-[520px] mx-auto flex flex-col items-center select-none">
      
      {/* Static GPU Ambient Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[480px] h-[320px] bg-[radial-gradient(ellipse_at_center,rgba(6,182,212,0.12)_0%,transparent_70%)] pointer-events-none" />

      {/* Frame Container */}
      <div className="relative w-full min-h-[340px] sm:min-h-[380px] flex items-center justify-center">
        
        {/* Floating Award Badge */}
        <motion.div
          key={`badge-${active.id}`}
          initial={{ opacity: 0, y: -10, scale: 0.9 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.4 }}
          className="absolute -top-3 left-2 sm:left-4 z-30 bg-[#0C1A20]/95 backdrop-blur-md border border-[#06B6D4]/30 px-3.5 py-1.5 rounded-full shadow-[0_8px_24px_rgba(6,182,212,0.25)] flex items-center gap-2"
        >
          <Trophy size={13} className="text-[#06B6D4]" />
          <span className="text-[11px] font-extrabold text-white tracking-wide">{active.badge}</span>
        </motion.div>

        {/* Animated Frame Display */}
        <AnimatePresence mode="wait">
          <motion.div
            key={active.id}
            initial={{ opacity: 0, y: 15, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -15, scale: 0.96 }}
            transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
            className="flex items-center justify-center w-full"
          >
            {active.type === 'laptop' ? (
              <LaptopFrame src={active.image} title={active.title} />
            ) : (
              <PhoneFrame src={active.image} title={active.title} />
            )}
          </motion.div>
        </AnimatePresence>

      </div>

      {/* Dark Glass Project Switcher Pills */}
      <div className="flex flex-wrap items-center justify-center gap-1.5 mt-6 z-20 bg-white/5 p-1.5 rounded-full border border-white/10 backdrop-blur-md">
        {showcaseProjects.map((p, idx) => (
          <button
            key={p.id}
            onClick={() => setActiveIdx(idx)}
            className={`px-3 py-1 rounded-full text-xs font-bold transition-all duration-300 cursor-pointer ${
              idx === activeIdx
                ? 'bg-[#06B6D4] text-[#0C1A20] shadow-[0_0_15px_rgba(6,182,212,0.4)] scale-105'
                : 'text-slate-400 hover:text-white hover:bg-white/10'
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
