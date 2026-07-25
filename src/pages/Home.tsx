import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence, useScroll, useTransform } from 'framer-motion';
import { ArrowRight, Building, Trophy, GraduationCap, MapPin, Briefcase, Sparkles, ArrowUpRight, ShieldCheck, Cpu, Layers, ExternalLink } from 'lucide-react';
import { Link } from 'react-router-dom';

import HeroShowcase from '../components/HeroShowcase';
import PetronasShowcase from '../components/PetronasShowcase';



interface Apple3DCardProps {
  category: string;
  techSubtitle: string;
  award: string;
  title: string;
  description: string;
  techBadges: string[];
  metrics: { value: string; label: string }[];
  primaryImage: string;
  secondaryImage?: string;
  link: string;
}

const Apple3DProjectCard: React.FC<Apple3DCardProps> = ({
  category,
  techSubtitle,
  award,
  title,
  description,
  techBadges,
  metrics,
  primaryImage,
  secondaryImage,
  link,
}) => {
  const cardRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: cardRef,
    offset: ["start end", "end start"],
  });

  // Apple-style 3D Scroll Transforms
  const rotateX = useTransform(scrollYProgress, [0, 0.35, 0.75, 1], [16, 0, 0, -12]);
  const scale = useTransform(scrollYProgress, [0, 0.35, 0.75, 1], [0.92, 1, 1, 0.95]);
  const opacity = useTransform(scrollYProgress, [0, 0.25, 0.8, 1], [0.4, 1, 1, 0.6]);
  const shineY = useTransform(scrollYProgress, [0, 1], ["-120%", "220%"]);

  return (
    <div ref={cardRef} className="py-6 sm:py-10 perspective-[1200px]">
      <motion.div
        style={{
          rotateX,
          scale,
          opacity,
          transformStyle: "preserve-3d",
        }}
        className="w-full bg-gradient-to-b from-[#0F172A] via-[#090D16] to-[#0B0F19] border border-slate-800/80 rounded-[32px] sm:rounded-[40px] p-6 sm:p-10 md:p-12 shadow-[0_30px_90px_-15px_rgba(0,0,0,0.7)] backdrop-blur-2xl relative overflow-hidden group hover:border-[#06B6D4]/50 transition-colors duration-500"
      >
        {/* Dynamic 3D Glossy Light Reflection Sweep */}
        <motion.div
          style={{ y: shineY }}
          className="absolute inset-0 bg-gradient-to-b from-transparent via-[#06B6D4]/15 to-transparent pointer-events-none opacity-40 group-hover:opacity-80 transition-opacity"
        />

        {/* Ambient Top Glow */}
        <div className="absolute -top-24 left-1/2 -translate-x-1/2 w-96 h-48 bg-[#06B6D4]/15 blur-3xl pointer-events-none rounded-full" />

        <div className="grid lg:grid-cols-12 gap-8 lg:gap-12 items-center relative z-10">
          {/* Left Text & Metrics Column (7 cols on lg) */}
          <div className="lg:col-span-7 space-y-6">
            {/* Badges Row */}
            <div className="flex flex-wrap items-center gap-3">
              <span className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-[#06B6D4]/15 border border-[#06B6D4]/30 text-[#06B6D4] text-[11px] font-black tracking-widest uppercase">
                <span className="w-1.5 h-1.5 rounded-full bg-[#06B6D4] animate-pulse" />
                {category}
              </span>
              <span className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-400 text-[11px] font-bold shadow-xs">
                <Trophy size={13} className="text-amber-400" />
                {award}
              </span>
            </div>

            {/* Title & Subtitle */}
            <div>
              <h3 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-white tracking-tight group-hover:text-[#06B6D4] transition-colors leading-tight">
                {title}
              </h3>
              <p className="text-xs sm:text-sm font-semibold text-slate-400 mt-1">
                {techSubtitle}
              </p>
            </div>

            {/* Description */}
            <p className="text-sm text-slate-300 leading-relaxed font-normal">
              {description}
            </p>

            {/* Tech Badges */}
            <div className="flex flex-wrap gap-2 pt-1">
              {techBadges.map((badge, bIdx) => (
                <span
                  key={bIdx}
                  className="px-3 py-1 rounded-lg bg-slate-900/90 border border-slate-800 text-slate-300 text-xs font-semibold shadow-xs"
                >
                  {badge}
                </span>
              ))}
            </div>

            {/* Metrics Bar */}
            <div className="grid grid-cols-3 gap-3 p-4 bg-slate-900/90 border border-slate-800 rounded-2xl">
              {metrics.map((m, mIdx) => (
                <div key={mIdx} className={`text-center ${mIdx === 1 ? 'border-x border-slate-800' : ''}`}>
                  <div className="text-lg sm:text-xl font-black text-white group-hover:text-[#06B6D4] transition-colors">
                    {m.value}
                  </div>
                  <div className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mt-0.5">
                    {m.label}
                  </div>
                </div>
              ))}
            </div>

            {/* CTA Button */}
            <div className="pt-2">
              <Link
                to={link}
                className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-[#06B6D4] hover:bg-[#0891B2] text-white text-xs font-bold transition-all shadow-[0_0_20px_rgba(6,182,212,0.3)] hover:shadow-[0_0_30px_rgba(6,182,212,0.5)] group/btn"
              >
                <span>Read Full Technical Architecture</span>
                <ArrowRight size={15} className="group-hover/btn:translate-x-1 transition-transform" />
              </Link>
            </div>
          </div>

          {/* Right Image Showcase Column (5 cols on lg) */}
          <div className="lg:col-span-5 relative flex justify-center items-center">
            {secondaryImage ? (
              /* Dual Overlay Phone/Dashboard Collage (for Beruang) */
              <div className="relative w-full aspect-[4/3] sm:aspect-[16/11] flex items-center justify-center">
                {/* Background Dashboard Card */}
                <div className="w-[88%] aspect-[16/10] rounded-2xl overflow-hidden border border-slate-700/60 shadow-2xl relative translate-x-3 -translate-y-2 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform duration-700">
                  <img
                    src={primaryImage}
                    alt={title}
                    className="w-full h-full object-cover object-top"
                  />
                  <div className="absolute inset-0 bg-slate-950/20" />
                </div>
                {/* Foreground Overlay Phone Card */}
                <div className="absolute left-1 bottom-0 w-[44%] aspect-[9/19] rounded-[24px] overflow-hidden border-2 border-slate-700 bg-slate-950 shadow-[0_25px_60px_rgba(0,0,0,0.85)] -translate-x-2 translate-y-3 group-hover:translate-x-0 group-hover:translate-y-0 transition-transform duration-700">
                  <img
                    src={secondaryImage}
                    alt={`${title} Mobile`}
                    className="w-full h-full object-cover object-top"
                  />
                  {/* Dynamic Notch */}
                  <div className="absolute top-1.5 left-1/2 -translate-x-1/2 w-12 h-2.5 bg-black rounded-full" />
                </div>
              </div>
            ) : (
              /* Laptop Mockup Frame (for RentVerse) */
              <div className="w-full relative group/laptop">
                <div className="w-full bg-[#1E1E24] rounded-t-2xl p-2.5 pt-3 shadow-2xl relative border border-slate-700/60">
                  {/* Camera */}
                  <div className="absolute top-1.5 left-1/2 -translate-x-1/2 w-2 h-2 rounded-full bg-slate-900 border border-slate-700 flex items-center justify-center">
                    <div className="w-0.5 h-0.5 rounded-full bg-[#06B6D4]" />
                  </div>
                  {/* Screen Content */}
                  <div className="w-full aspect-[16/10] bg-slate-900 rounded-lg overflow-hidden relative">
                    <img
                      src={primaryImage}
                      alt={title}
                      className="w-full h-full object-cover object-top group-hover/laptop:scale-105 transition-transform duration-700"
                    />
                  </div>
                </div>
                {/* Laptop Base */}
                <div className="w-[106%] -ml-[3%] h-3.5 bg-gradient-to-b from-[#2C2D35] to-[#1A1B22] rounded-b-xl shadow-2xl relative border-t border-slate-600/40 flex justify-center items-start">
                  <div className="w-14 h-1 bg-[#14151B] rounded-b-md border-x border-b border-slate-700/50" />
                </div>
              </div>
            )}
          </div>
        </div>
      </motion.div>
    </div>
  );
};

const Home = () => {
  return (
    <div className="w-full">

      {/* ============================================================
          HERO SECTION
      ============================================================ */}
      <section className="relative min-h-[90vh] flex items-center pt-24 pb-20">
        <div className="container mx-auto px-6 max-w-7xl">
          <div className="grid lg:grid-cols-2 gap-16 items-center">

            {/* Left — Text */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7 }}
            >
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white border border-border shadow-sm text-sm font-semibold text-primary mb-8">
                <span className="w-2 h-2 rounded-full bg-statusGreen animate-pulse" />
                Open to full-time & freelance opportunities
              </div>

              <h1 className="text-4xl md:text-6xl font-bold tracking-tight text-foreground leading-[1.15] mb-6">
                Building web apps,<br className="hidden sm:inline" />
                <span className="text-primary">AI & automation.</span>
              </h1>

              <p className="text-lg text-muted-foreground leading-relaxed max-w-xl mb-10">
                Hi, I'm <strong className="text-foreground font-semibold">Izwan Ahmad</strong> — a Computer Science graduate (3.9+ CGPA) and ex-PETRONAS Digital engineer. I build high-performance web applications, AI systems, and workflow automation.
              </p>

              <div className="flex flex-wrap gap-4">
                <Link
                  to="/projects"
                  className="inline-flex items-center gap-2 px-8 py-4 bg-primary text-white rounded-md font-bold hover:bg-primary-hover transition-all hover:shadow-hover hover:-translate-y-0.5"
                >
                  View My Work
                  <ArrowRight size={18} />
                </Link>
                <Link
                  to="/freelance"
                  className="inline-flex items-center gap-2 px-8 py-4 bg-white border border-borderStrong text-foreground rounded-md font-bold hover:bg-tint transition-all hover:shadow-card hover:-translate-y-0.5"
                >
                  Freelance Services
                </Link>
              </div>

              {/* Quick stats */}
              <div className="flex flex-wrap gap-6 mt-10 pt-10 border-t border-border">
                <div>
                  <div className="text-2xl font-black text-foreground">3.9+</div>
                  <div className="text-xs font-semibold text-muted-foreground uppercase tracking-wide">CGPA (Dean's List)</div>
                </div>
                <div>
                  <div className="text-2xl font-black text-foreground">10+</div>
                  <div className="text-xs font-semibold text-muted-foreground uppercase tracking-wide">Production Systems</div>
                </div>
                <div>
                  <div className="text-2xl font-black text-foreground">11+</div>
                  <div className="text-xs font-semibold text-muted-foreground uppercase tracking-wide">Awards & Recognitions</div>
                </div>
              </div>
            </motion.div>

            {/* Right — Interactive Device Showcase (Laptop, Phone, Polaroid) */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.7, delay: 0.2 }}
              className="hidden lg:flex justify-center"
            >
              <HeroShowcase />
            </motion.div>
          </div>
        </div>
      </section>

      {/* ============================================================
          ABOUT ME
      ============================================================ */}
      <section className="py-24 bg-white border-y border-border">
        <div className="container mx-auto px-6 max-w-7xl">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            {/* Photo */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="relative"
            >
              <div className="rounded-2xl overflow-hidden shadow-hover aspect-[3/4] max-w-md mx-auto">
                <img
                  src="/images/izwan-about.jpg"
                  alt="Muhammad Izwan Ahmad"
                  className="w-full h-full object-cover"
                />
              </div>
              {/* Floating info badge */}
              <div className="absolute -bottom-6 -right-2 lg:right-0 bg-primary text-white px-6 py-4 rounded-xl shadow-hover">
                <div className="text-2xl font-black">3.9+</div>
                <div className="text-xs font-semibold opacity-80">CGPA · Dean's List</div>
              </div>
            </motion.div>

            {/* Content */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <div className="text-[13px] font-extrabold uppercase tracking-widest text-accent mb-3">About Me</div>
              <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-6 leading-tight">
                A curious mind who ships real things.
              </h2>
              <p className="text-muted-foreground leading-relaxed mb-5">
                Since I was young, I've been someone who wonders about everything — and that mindset shaped how I build software. I pick up new things fast, adapt, and always push until the problem is solved.
              </p>
              <p className="text-muted-foreground leading-relaxed mb-5">
                Over the years, I've worn many hats: service crew, content creator, digital marketer, IT specialist, e-commerce strategist, and now software engineer. I'm not just versatile — I turn challenges into opportunities.
              </p>
              <p className="text-muted-foreground leading-relaxed mb-8">
                I love reading philosophical, fiction, self-development, and financial literature. I believe great software starts with curiosity about the world beyond code.
              </p>

              <div className="flex flex-col gap-3">
                <div className="flex items-center gap-3 text-sm font-semibold text-foreground">
                  <GraduationCap size={18} className="text-primary shrink-0" />
                  Bachelor's in Computer Science, UiTM (CGPA 3.9+ — graduating Aug 2026)
                </div>
                <div className="flex items-center gap-3 text-sm font-semibold text-foreground">
                  <MapPin size={18} className="text-primary shrink-0" />
                  Based in Malaysia · Remote-friendly
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ============================================================
          ACHIEVEMENTS / AWARDS
      ============================================================ */}
      <section className="py-24 bg-background">
        <div className="container mx-auto px-6 max-w-7xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-12"
          >
            <div className="text-[13px] font-extrabold uppercase tracking-widest text-accent mb-3 flex items-center gap-2">
              <Trophy size={14} />
              Recognitions
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-foreground">Awards & Achievements</h2>
          </motion.div>

          <div className="relative w-full overflow-hidden flex -mx-6 px-6 py-4">
            {/* Left & Right gradient masks for smooth fade effect */}
            <div className="absolute left-0 top-0 w-24 h-full bg-gradient-to-r from-background to-transparent z-10 pointer-events-none" />
            <div className="absolute right-0 top-0 w-24 h-full bg-gradient-to-l from-background to-transparent z-10 pointer-events-none" />
            
            <div className="flex animate-marquee gap-6 w-max hover:pause">
              {[
                { img: '/images/awards/Champion National Cybersecurity Competition.jpeg', title: 'Champion + 4 Awards', sub: 'National Mobile SecOps Challenge', type: 'Award' },
                { img: '/images/awards/Gemini Certificate.jpeg', title: 'Gemini Certified University Student', sub: 'Google (Dec 2025 - Dec 2028)', type: 'Certificate' },
                { img: '/images/awards/Best System Architecture (FYP).jpg', title: 'Best System Architecture', sub: 'Final Year Project (Beruang)', type: 'Award' },
                { img: '/images/awards/Best AI Booth Award.jpeg', title: 'Best AI Booth Award', sub: 'AI Seminar 2025 — Batik Recognition', type: 'Award' },
                { img: '/images/awards/Vice Chancellor Award.jpeg', title: "Vice Chancellor's Award", sub: 'Diploma in Computer Science, UiTM', type: 'Award' },
                { img: '/images/awards/Best Website GUI Award.jpeg', title: 'Best Website GUI', sub: 'UiTM Website Competition', type: 'Award' },
                { img: '/images/awards/Dean List.jpeg', title: "Dean's List", sub: 'Every semester — Diploma & Degree', type: 'Award' },
                { img: '/images/awards/Outstanding Performance.jpeg', title: 'Outstanding Performance', sub: 'West Malayan Group (+ Increment)', type: 'Award' },
                // Duplicate for seamless infinite scroll
                { img: '/images/awards/Champion National Cybersecurity Competition.jpeg', title: 'Champion + 4 Awards', sub: 'National Mobile SecOps Challenge', type: 'Award' },
                { img: '/images/awards/Gemini Certificate.jpeg', title: 'Gemini Certified University Student', sub: 'Google (Dec 2025 - Dec 2028)', type: 'Certificate' },
                { img: '/images/awards/Best System Architecture (FYP).jpg', title: 'Best System Architecture', sub: 'Final Year Project (Beruang)', type: 'Award' },
                { img: '/images/awards/Best AI Booth Award.jpeg', title: 'Best AI Booth Award', sub: 'AI Seminar 2025 — Batik Recognition', type: 'Award' },
                { img: '/images/awards/Vice Chancellor Award.jpeg', title: "Vice Chancellor's Award", sub: 'Diploma in Computer Science, UiTM', type: 'Award' },
                { img: '/images/awards/Best Website GUI Award.jpeg', title: 'Best Website GUI', sub: 'UiTM Website Competition', type: 'Award' },
                { img: '/images/awards/Dean List.jpeg', title: "Dean's List", sub: 'Every semester — Diploma & Degree', type: 'Award' },
                { img: '/images/awards/Outstanding Performance.jpeg', title: 'Outstanding Performance', sub: 'West Malayan Group (+ Increment)', type: 'Award' },
              ].map((item, i) => (
                <div
                  key={i}
                  className="w-[320px] bg-white border border-border rounded-xl flex-shrink-0 shadow-sm transition-shadow hover:shadow-md cursor-default overflow-hidden group"
                >
                  <div className="w-full aspect-[4/3] bg-tint overflow-hidden border-b border-border">
                    <img 
                      src={item.img} 
                      alt={item.title} 
                      className={`w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 ${
                        item.title === 'Champion + 4 Awards' ? 'object-[center_20%]' : 'object-center'
                      }`} 
                    />
                  </div>
                  <div className="p-5">
                    <div className="text-xs font-bold uppercase tracking-widest text-accent mb-2">{item.type}</div>
                    <div className="font-bold text-foreground mb-1 text-[15px]">{item.title}</div>
                    <div className="text-[13px] text-muted-foreground leading-relaxed">{item.sub}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ============================================================
          PETRONAS SUMMARY TEASER
      ============================================================ */}
      <section
        className="py-20 relative overflow-hidden"
        style={{ background: '#00B1A9' }}
      >
        <div className="container mx-auto px-6 max-w-7xl relative z-10">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-8">
            <div className="flex-1">
              <div className="text-[13px] font-extrabold uppercase tracking-widest text-white/70 mb-3 flex items-center gap-2">
                <Building size={14} />
                Corporate Experience
              </div>
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
                PETRONAS Digital
              </h2>
              <p className="text-white/85 max-w-2xl text-base md:text-lg leading-relaxed mb-6">
                Software Engineer Intern at Human Capital Solution Management. Architected, solo-built, and deployed 10+ production ITSM RPA platforms serving 50,000+ employees across Malaysia.
              </p>
              
              <Link
                to="/experience"
                className="inline-flex items-center gap-2.5 px-6 py-3 bg-white text-[#00B1A9] rounded-xl font-bold hover:bg-slate-50 transition-all shadow-md hover:shadow-lg hover:-translate-y-0.5"
              >
                <span>Explore Full PETRONAS & Corporate Breakdown</span>
                <ArrowRight size={16} />
              </Link>
            </div>

            {/* Quick Stats Grid */}
            <div className="grid grid-cols-2 gap-4 shrink-0 w-full md:w-auto">
              {[
                { num: '10+', label: 'Production Systems' },
                { num: '3mo', label: 'Solo & End-to-End' },
                { num: '50k+', label: 'Employees Served' },
                { num: '100%', label: 'Autonomous Today' },
              ].map((stat, i) => (
                <div
                  key={i}
                  className="rounded-xl px-5 py-4 text-center min-w-[130px]"
                  style={{ background: 'rgba(255,255,255,0.12)', backdropFilter: 'blur(8px)', border: '1px solid rgba(255,255,255,0.25)' }}
                >
                  <div className="text-2xl font-black text-white mb-0.5">{stat.num}</div>
                  <div className="text-xs font-semibold text-white/80">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ============================================================
          CENTRAL TIMELINE (WORK ON LEFT, STUDY ON RIGHT)
      ============================================================ */}
      <section className="py-16 bg-background border-t border-border">
        <div className="container mx-auto px-4 sm:px-6 max-w-4xl">
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <div className="text-[12px] font-extrabold uppercase tracking-widest text-accent mb-1.5">
              Trajectory
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold text-foreground">Experience & Education</h2>
          </motion.div>

          {/* Column labels */}
          <div className="hidden md:flex justify-between mb-6 px-2">
            <div className="w-[45%] flex items-center gap-2">
              <Building size={14} className="text-[#06B6D4]" />
              <span className="text-[11px] font-extrabold uppercase tracking-widest text-[#06B6D4]">Work Experience</span>
            </div>
            <div className="w-[45%] flex items-center justify-end gap-2">
              <span className="text-[11px] font-extrabold uppercase tracking-widest text-[#06B6D4]">Education</span>
              <GraduationCap size={14} className="text-[#06B6D4]" />
            </div>
          </div>

          <div className="relative pt-6">
            {/* Center Bar for Desktop — 2px line perfectly centered */}
            <div className="absolute left-1/2 top-7 bottom-0 w-[2px] -translate-x-[1px] hidden md:block bg-gradient-to-b from-[#06B6D4] via-[#06B6D4]/50 to-transparent opacity-50" />
            
            {/* NOW Badge + Arrowhead pointing UP at top of bar (Desktop) */}
            <div className="absolute left-1/2 top-0 -translate-x-1/2 hidden md:flex flex-col items-center z-10">
              <span className="text-[10px] font-black tracking-widest uppercase px-2.5 py-0.5 rounded-full bg-[#06B6D4]/15 text-[#06B6D4] border border-[#06B6D4]/30 shadow-2xs mb-1">
                NOW
              </span>
              <svg width="10" height="7" viewBox="0 0 10 7" fill="none">
                <path d="M5 0L10 7H0L5 0Z" fill="#06B6D4" fillOpacity="0.9"/>
              </svg>
            </div>

            {/* Left Bar for Mobile */}
            <div className="absolute left-[16px] top-7 bottom-0 w-[2px] -translate-x-[1px] md:hidden bg-gradient-to-b from-[#06B6D4] to-transparent opacity-50" />
            
            {/* NOW Badge + Arrowhead pointing UP at top of bar (Mobile) */}
            <div className="absolute left-[16px] top-0 -translate-x-1/2 md:hidden flex flex-col items-center z-10">
              <span className="text-[9px] font-black tracking-widest uppercase px-2 py-0.5 rounded-full bg-[#06B6D4]/15 text-[#06B6D4] border border-[#06B6D4]/30 shadow-2xs mb-1">
                NOW
              </span>
              <svg width="10" height="7" viewBox="0 0 10 7" fill="none">
                <path d="M5 0L10 7H0L5 0Z" fill="#06B6D4" fillOpacity="0.9"/>
              </svg>
            </div>

            <div className="space-y-4 md:space-y-4 pt-3 pb-4">
              {[
                {
                  type: "work",
                  period: "Mar 2026 – Present",
                  title: "Freelance Software Engineer",
                  org: "Independent Consultant",
                  logo: "/images/freelance-logo.jpeg"
                },
                {
                  type: "work",
                  period: "Mar 2026 – Jul 2026",
                  title: "Software Engineer Intern",
                  org: "PETRONAS Digital Sdn Bhd",
                  logo: "/images/petronas-logo.png"
                },
                {
                  type: "study",
                  period: "Mar 2024 – Aug 2026",
                  title: "Bachelor of Computer Science (Hons)",
                  org: "Universiti Teknologi MARA (UiTM)",
                  logo: "/images/uitm-logo.png"
                },
                {
                  type: "work",
                  period: "Sep 2023 – Mar 2024",
                  title: "IT Specialist, Digital Marketing And E-Commerce Intern",
                  org: "West Malayan Group",
                  logo: "/images/wmg-logo.png"
                },
                {
                  type: "study",
                  period: "Oct 2021 – Mar 2024",
                  title: "Diploma in Computer Science",
                  org: "Universiti Teknologi MARA (UiTM)",
                  logo: "/images/uitm-logo.png"
                }
              ].map((item, idx) => {
                const isWork = item.type === "work";
                return (
                  <motion.div
                    key={idx}
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: idx * 0.05 }}
                    className={`relative flex flex-col md:flex-row items-center justify-between min-h-[84px] ${
                      isWork ? "md:flex-row-reverse" : ""
                    }`}
                  >
                    {/* Uniform Solid Node Dot strictly using #06B6D4 */}
                    <div className="absolute left-[16px] md:left-1/2 -translate-x-1/2 z-10 w-3.5 h-3.5 rounded-full bg-[#06B6D4] border-2 border-white shadow-xs" />

                    {/* Empty spacer for opposite side on desktop */}
                    <div className="hidden md:block w-[45%]" />

                    {/* Content Card — Compact & Sleek */}
                    <div className="w-full md:w-[45%] pl-8 md:pl-0">
                      <div className="group flex items-center gap-3 p-3 bg-white border border-border rounded-lg shadow-xs hover:shadow-sm transition-all">
                        {/* Free-floating logo */}
                        {item.logo && (
                          <img
                            src={item.logo}
                            alt={item.org}
                            className="w-10 h-10 object-contain shrink-0 drop-shadow-xs"
                          />
                        )}
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2 mb-0.5">
                            <span className="text-[10px] font-extrabold uppercase tracking-wider text-[#06B6D4]">
                              {item.period}
                            </span>
                          </div>
                          <h3 className="font-bold text-foreground text-xs sm:text-sm mb-0.5 group-hover:text-[#06B6D4] transition-colors leading-snug">
                            {item.title}
                          </h3>
                          <div className="text-[11px] font-medium text-muted-foreground truncate">
                            {item.org}
                          </div>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </div>

          <div className="mt-8 flex justify-center">
            <Link
              to="/experience"
              className="inline-flex items-center gap-1.5 text-xs font-semibold text-primary hover:text-primary-hover transition-colors"
            >
              <span>View Full Experience Breakdown</span>
              <ArrowRight size={14} />
            </Link>
          </div>
        </div>
      </section>

      {/* ============================================================
          FEATURED PROJECTS TEASER (APPLE 3D SCROLL EXPERIENCE)
      ============================================================ */}
      <section className="py-24 bg-gradient-to-b from-background via-slate-950/40 to-background border-t border-border/60 relative overflow-hidden">
        {/* Subtle background glow */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-[#06B6D4]/5 rounded-full blur-3xl pointer-events-none" />

        <div className="container mx-auto px-6 max-w-7xl relative z-10">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
            <div>
              <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#06B6D4]/10 border border-[#06B6D4]/20 text-[#06B6D4] text-[11px] font-black tracking-widest uppercase mb-3">
                <Sparkles size={12} />
                Featured Work
              </div>
              <h2 className="text-3xl md:text-5xl font-black text-foreground tracking-tight">
                Selected Flagship Projects
              </h2>
              <p className="text-muted-foreground text-sm sm:text-base mt-2 max-w-xl">
                High-impact software solutions engineered with robust architecture, AI integration, and enterprise DevSecOps standards.
              </p>
            </div>
            <Link
              to="/projects"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-white border border-border shadow-xs hover:shadow-md hover:border-[#06B6D4]/50 text-xs font-bold text-foreground hover:text-[#06B6D4] transition-all group"
            >
              <span>View All Projects</span>
              <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>

          <div className="space-y-6">
            {/* Project 1: Beruang AI Financial Platform */}
            <Apple3DProjectCard
              category="AI / Mobile App"
              award="Best Architecture Award"
              title="Beruang AI Financial Platform"
              techSubtitle="React Native & PyTorch & Bi-LSTM Neural Engine"
              description="AI-powered money management platform featuring custom Bi-LSTM neural networks (99.61% accuracy) trained on 220k+ Malaysian transaction records. Evaluated at 86.77 System Usability Scale (SUS)."
              techBadges={['Bi-LSTM Neural Net', 'React Native', 'PyTorch', 'FastAPI', 'SUS Score: 86.77', 'Python']}
              metrics={[
                { value: '99.61%', label: 'AI Accuracy' },
                { value: '220k+', label: 'Dataset Records' },
                { value: '86.77', label: 'SUS Score' }
              ]}
              primaryImage="/images/beruang-dashboard.jpg"
              secondaryImage="/images/beruang-mobile.jpg"
              link="/projects"
            />

            {/* Project 2: RentVerse Rental Ecosystem */}
            <Apple3DProjectCard
              category="Web System / DevSecOps"
              award="Champion — 4 Awards"
              title="RentVerse Rental Ecosystem"
              techSubtitle="Next.js 14 & Docker & Automated CI/CD DevSecOps"
              description="Enterprise-grade secure property rental platform equipped with Zero Trust authentication, AI-driven tenant fraud detection, and an automated 14-stage CI/CD DevSecOps security pipeline."
              techBadges={['Next.js 14', 'Zero Trust Auth', 'SonarQube & Trivy', '14-Stage CI/CD', 'Docker', 'PostgreSQL']}
              metrics={[
                { value: '4 Awards', label: 'Competition Winner' },
                { value: '14-Stage', label: 'CI/CD Pipeline' },
                { value: 'Zero Trust', label: 'Security Auth' }
              ]}
              primaryImage="/images/rentverse-laptop.jpg"
              link="/projects"
            />
          </div>

          <div className="mt-12 text-center sm:hidden">
            <Link
              to="/projects"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-[#06B6D4] text-white text-xs font-bold shadow-md"
            >
              <span>View All Projects</span>
              <ArrowRight size={14} />
            </Link>
          </div>
        </div>
      </section>

      {/* ============================================================
          FREELANCE CTA BANNER
      ============================================================ */}
      <section className="py-20 bg-white border-t border-border">
        <div className="container mx-auto px-6 max-w-7xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="flex flex-col md:flex-row items-center justify-between gap-8 p-10 bg-tint rounded-2xl border border-border"
          >
            <div>
              <div className="text-[13px] font-extrabold uppercase tracking-widest text-accent mb-2">Freelance</div>
              <h3 className="text-2xl md:text-3xl font-bold text-foreground mb-3">Need a website built?</h3>
              <p className="text-muted-foreground max-w-md">
                I'm taking on freelance projects — web development, AI integration, and business automation. Let's build something great together.
              </p>
            </div>
            <div className="shrink-0">
              <Link
                to="/freelance"
                className="inline-flex items-center gap-2 px-8 py-4 bg-primary text-white rounded-md font-bold hover:bg-primary-hover transition-all hover:shadow-hover hover:-translate-y-0.5 whitespace-nowrap"
              >
                See My Services
                <ArrowRight size={18} />
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

    </div>
  );
};

export default Home;
