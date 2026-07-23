import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

// Laptop Frame Component
export const LaptopFrame = ({ src, title, tag }: { src: string; title: string; tag: string }) => {
  return (
    <div className="w-[340px] sm:w-[460px] md:w-[500px] flex flex-col items-center">
      {/* Laptop Lid / Screen */}
      <div className="w-full bg-[#1E1E24] rounded-t-2xl p-2.5 pt-3 shadow-2xl relative border border-slate-700/60">
        {/* Camera Dot */}
        <div className="absolute top-1.5 left-1/2 -translate-x-1/2 w-2 h-2 rounded-full bg-slate-900 border border-slate-700 flex items-center justify-center">
          <div className="w-0.5 h-0.5 rounded-full bg-blue-400" />
        </div>
        {/* Screen Content */}
        <div className="w-full aspect-[16/10] bg-slate-900 rounded-lg overflow-hidden relative group">
          <img
            src={src}
            alt={title}
            className="w-full h-full object-cover object-top transition-transform duration-700 group-hover:scale-105"
          />
          {/* Overlay Tag */}
          <div className="absolute bottom-3 left-3 bg-slate-900/90 backdrop-blur-md px-3 py-1.5 rounded-md border border-slate-700/80 text-xs font-semibold text-white shadow-lg flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-accent animate-pulse" />
            <span>{title}</span>
            <span className="text-slate-400 text-[10px] uppercase font-mono tracking-wide">({tag})</span>
          </div>
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

// iPhone Frame Component
export const PhoneFrame = ({ src, title, tag }: { src: string; title: string; tag: string }) => {
  return (
    <div className="w-[220px] sm:w-[260px] flex flex-col items-center">
      {/* Phone Outer Shell */}
      <div className="w-full bg-[#1A1B22] rounded-[38px] p-3 shadow-2xl border-2 border-slate-700/80 relative">
        {/* Power / Volume side button accents */}
        <div className="absolute -left-[4px] top-20 w-[2px] h-8 bg-slate-600 rounded-l" />
        <div className="absolute -left-[4px] top-32 w-[2px] h-8 bg-slate-600 rounded-l" />
        <div className="absolute -right-[4px] top-24 w-[2px] h-12 bg-slate-600 rounded-r" />

        {/* Screen Container */}
        <div className="w-full aspect-[9/19.5] bg-slate-950 rounded-[30px] overflow-hidden relative border border-slate-800">
          {/* Dynamic Island Notch */}
          <div className="absolute top-2 left-1/2 -translate-x-1/2 w-20 h-4 bg-black rounded-full z-20 flex items-center justify-end px-2">
            <div className="w-1.5 h-1.5 rounded-full bg-[#0E7490]/80 animate-pulse" />
          </div>

          {/* Screen Image */}
          <img
            src={src}
            alt={title}
            className="w-full h-full object-cover object-top"
          />

          {/* Bottom Overlay Label */}
          <div className="absolute bottom-4 left-3 right-3 bg-slate-900/90 backdrop-blur-md p-2 rounded-xl border border-slate-700/80 text-center text-xs font-semibold text-white shadow-xl">
            <div className="text-white font-bold">{title}</div>
            <div className="text-[10px] text-accent font-mono uppercase tracking-wider">{tag}</div>
          </div>
        </div>
      </div>
    </div>
  );
};

// Polaroid Card Component
export const PolaroidCard = ({ src, caption }: { src: string; caption: string }) => {
  return (
    <div className="bg-white shadow-2xl rounded-sm p-3.5 pb-9 w-[260px] sm:w-[300px] border border-slate-200/80"
      style={{ boxShadow: '0 20px 50px rgba(12,26,32,0.18)' }}>
      <div className="w-full aspect-[4/3] overflow-hidden rounded-sm bg-slate-100">
        <img
          src={src}
          alt={caption}
          className="w-full h-full object-cover"
        />
      </div>
      <p className="text-center text-xs font-semibold text-slate-600 mt-3 font-mono tracking-wide">
        {caption}
      </p>
    </div>
  );
};

type ShowcaseItem =
  | { type: 'laptop'; src: string; title: string; tag: string }
  | { type: 'phone'; src: string; title: string; tag: string }
  | { type: 'polaroid'; src: string; caption: string };

// Combined Showcase Items
const showcaseItems: ShowcaseItem[] = [
  {
    type: 'laptop',
    src: '/images/rentverse-laptop.jpg',
    title: 'RentVerse Platform',
    tag: 'Web / DevSecOps',
  },
  {
    type: 'phone',
    src: '/images/beruang-mobile.jpg',
    title: 'Beruang AI Money App',
    tag: 'Mobile / React Native',
  },
  {
    type: 'laptop',
    src: '/images/kuehlicious-laptop.jpg',
    title: 'Kuehlicious Web System',
    tag: 'Web / Youth Innovation Winner',
  },
  {
    type: 'polaroid',
    src: '/images/award-secops.jpeg',
    caption: 'Champion & 4 Awards @ SecOps Challenge',
  },
  {
    type: 'polaroid',
    src: '/images/izwan-hero.jpg',
    caption: 'Internship @ PETRONAS Digital',
  },
  {
    type: 'polaroid',
    src: '/images/award-ai-booth.jpeg',
    caption: 'Best AI Booth Award @ AI Seminar',
  },
];

const HeroShowcase = () => {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrent((c) => (c + 1) % showcaseItems.length);
    }, 3800);
    return () => clearInterval(timer);
  }, []);

  const activeItem = showcaseItems[current];

  return (
    <div className="relative w-full flex flex-col items-center justify-center min-h-[460px]">
      <AnimatePresence mode="wait">
        <motion.div
          key={current}
          initial={{ opacity: 0, y: 20, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: -20, scale: 0.95 }}
          transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
          className="flex items-center justify-center"
        >
          {activeItem.type === 'laptop' && (
            <LaptopFrame src={activeItem.src} title={activeItem.title} tag={activeItem.tag} />
          )}
          {activeItem.type === 'phone' && (
            <PhoneFrame src={activeItem.src} title={activeItem.title} tag={activeItem.tag} />
          )}
          {activeItem.type === 'polaroid' && (
            <PolaroidCard src={activeItem.src} caption={activeItem.caption} />
          )}
        </motion.div>
      </AnimatePresence>

      {/* Slide Navigation Controls */}
      <div className="flex items-center gap-2 mt-8 z-10">
        {showcaseItems.map((item, i) => (
          <button
            key={i}
            onClick={() => setCurrent(i)}
            title={item.type === 'polaroid' ? item.caption : item.title}
            className={`h-2 rounded-full transition-all duration-300 ${
              i === current ? 'bg-primary w-7' : 'bg-slate-300 w-2 hover:bg-slate-400'
            }`}
          />
        ))}
      </div>
    </div>
  );
};

export default HeroShowcase;
