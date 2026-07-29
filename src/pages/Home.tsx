import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence, useScroll, useTransform } from 'framer-motion';
import { ArrowRight, Building, Trophy, GraduationCap, MapPin, Briefcase } from 'lucide-react';
import { Link } from 'react-router-dom';

import HeroShowcase from '../components/HeroShowcase';
import PetronasShowcase from '../components/PetronasShowcase';
import FlagshipScrollytelling from '../components/FlagshipScrollytelling';


const Home = () => {
  return (
    <div className="w-full">

      {/* ============================================================
          HERO SECTION — PETRONAS Generative Dot Wave System (#F5F9FA + petronas-dot-wave)
      ============================================================ */}
      <section className="relative min-h-[88vh] flex items-center pt-28 pb-16 overflow-hidden bg-[#F5F9FA]">
        
        {/* PETRONAS Generative Halftone Dot Wave Overlay Layer */}
        <div 
          className="absolute right-0 top-0 w-full lg:w-[65%] h-full bg-[url('/images/petronas-dot-wave.png')] bg-cover bg-right-top opacity-[0.38] mix-blend-multiply pointer-events-none" 
        />

        {/* Soft Ambient Radial Lighting & Gradient Mask */}
        <div className="absolute top-1/4 left-1/3 -translate-x-1/2 w-[900px] h-[550px] bg-[radial-gradient(ellipse_at_center,rgba(6,182,212,0.12)_0%,transparent_70%)] pointer-events-none" />
        
        <div className="container mx-auto px-6 max-w-7xl relative z-10">
          <div className="grid lg:grid-cols-12 gap-12 lg:gap-8 items-center">

            {/* Left Column (7 cols) — Calm Authoritative Copywriting */}
            <motion.div
              initial={{ opacity: 0, y: 25 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7 }}
              className="lg:col-span-7 flex flex-col items-start"
            >
              {/* Logo Story & PETRONAS Double-Dot Status Capsule */}
              <div className="inline-flex items-center gap-3 px-4 py-2 rounded-full bg-white/95 border border-slate-200/90 shadow-xs text-xs font-semibold text-[#0C1A20] mb-6 backdrop-blur-md">
                <span className="w-2.5 h-2.5 rounded-full bg-[#06B6D4] animate-pulse shrink-0" />
                <span className="font-mono text-[#0E7490] font-extrabold tracking-wide">● ex-PETRONAS Digital · Generative Dot System ●</span>
                <span className="text-slate-300">|</span>
                <span className="text-slate-600 font-medium">3.9+ CGPA</span>
              </div>

              {/* Headline */}
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-[#0C1A20] leading-[1.1] mb-6">
                Building High-Performance <br className="hidden sm:inline" />
                <span className="bg-gradient-to-r from-[#0E7490] via-[#06B6D4] to-[#0284C7] bg-clip-text text-transparent">Web Systems, AI</span> & Automation.
              </h1>

              {/* Capability Pillar Badges */}
              <div className="flex flex-wrap gap-2 mb-6">
                <span className="px-3.5 py-1.5 bg-white/90 border border-slate-200/90 rounded-full text-xs font-bold text-[#0C1A20] flex items-center gap-2 shadow-2xs backdrop-blur-xs">
                  <span className="w-2 h-2 rounded-full bg-[#06B6D4]" /> Web Engineering
                </span>
                <span className="px-3.5 py-1.5 bg-white/90 border border-slate-200/90 rounded-full text-xs font-bold text-[#0C1A20] flex items-center gap-2 shadow-2xs backdrop-blur-xs">
                  <span className="w-2 h-2 rounded-full bg-[#06B6D4]" /> AI & Computer Vision
                </span>
                <span className="px-3.5 py-1.5 bg-white/90 border border-slate-200/90 rounded-full text-xs font-bold text-[#0C1A20] flex items-center gap-2 shadow-2xs backdrop-blur-xs">
                  <span className="w-2 h-2 rounded-full bg-[#06B6D4]" /> Enterprise Automation
                </span>
              </div>

              {/* Subtitle Bio */}
              <p className="text-base sm:text-lg text-slate-600 leading-relaxed max-w-2xl mb-8 font-medium">
                Hi, I'm <strong className="text-[#0C1A20] font-bold">Izwan Ahmad</strong> — Computer Science graduate (Dean's List, 3.9+ CGPA) & ex-PETRONAS Digital engineer. Architecting production web apps, ViT computer vision models, and zero-touch RPA pipelines.
              </p>

              {/* Action Buttons */}
              <div className="flex flex-wrap items-center gap-4 mb-10">
                <Link
                  to="/projects"
                  className="inline-flex items-center gap-2.5 px-7 py-3.5 bg-[#0E7490] text-white rounded-xl font-bold hover:bg-[#06B6D4] transition-all duration-300 shadow-[0_10px_25px_-5px_rgba(14,116,144,0.3)] hover:shadow-[0_15px_30px_rgba(6,182,212,0.4)] hover:-translate-y-0.5 text-sm"
                >
                  <span>Explore Flagship Works</span>
                  <ArrowRight size={18} />
                </Link>
                <Link
                  to="/freelance"
                  className="inline-flex items-center gap-2.5 px-7 py-3.5 bg-white/90 border border-slate-300 text-[#0C1A20] rounded-xl font-bold hover:bg-slate-50 transition-all duration-300 shadow-xs hover:border-[#06B6D4] hover:-translate-y-0.5 text-sm"
                >
                  <span>Freelance Services</span>
                </Link>
              </div>

              {/* High-Trust Key Metrics Row */}
              <div className="grid grid-cols-3 gap-6 w-full pt-6 border-t border-slate-200/90">
                <div>
                  <div className="text-2xl sm:text-3xl font-black text-[#0C1A20]">3.9+</div>
                  <div className="text-[11px] font-bold text-slate-500 uppercase tracking-wider mt-0.5">CGPA (Dean's List)</div>
                </div>
                <div>
                  <div className="text-2xl sm:text-3xl font-black text-[#0E7490]">10+</div>
                  <div className="text-[11px] font-bold text-slate-500 uppercase tracking-wider mt-0.5">Production Systems</div>
                </div>
                <div>
                  <div className="text-2xl sm:text-3xl font-black text-[#06B6D4]">11+</div>
                  <div className="text-[11px] font-bold text-slate-500 uppercase tracking-wider mt-0.5">Awards & Recognitions</div>
                </div>
              </div>
            </motion.div>

            {/* Right Column (5 cols) — Upright Laptop/Phone Showcase */}
            <motion.div
              initial={{ opacity: 0, x: 25 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.7, delay: 0.2 }}
              className="lg:col-span-5 flex justify-center w-full"
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
          FEATURED PROJECTS — True Sticky Scrollytelling (Dolly Zoom)
      ============================================================ */}
      <FlagshipScrollytelling />

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
