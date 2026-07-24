import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight, Building, Trophy, GraduationCap, MapPin, Briefcase } from 'lucide-react';
import { Link } from 'react-router-dom';

import HeroShowcase from '../components/HeroShowcase';
import PetronasShowcase from '../components/PetronasShowcase';



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
      <section className="py-20 bg-background border-t border-border">
        <div className="container mx-auto px-4 sm:px-6 max-w-5xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <div className="text-[13px] font-extrabold uppercase tracking-widest text-accent mb-2">
              Trajectory
            </div>
            <h2 className="text-3xl sm:text-4xl font-bold text-foreground">Experience & Education</h2>
          </motion.div>

          <div className="relative">
            {/* Center Bar for Desktop */}
            <div className="absolute left-1/2 top-0 bottom-0 w-0.5 bg-primary/20 -translate-x-1/2 hidden md:block" />
            {/* Left Bar for Mobile */}
            <div className="absolute left-[17px] top-0 bottom-0 w-0.5 bg-primary/20 md:hidden" />

            <div className="space-y-6 md:space-y-8">
              {[
                {
                  type: "study",
                  period: "2025 – Present",
                  title: "Bachelor of Computer Science (Hons)",
                  org: "Universiti Teknologi MARA (UiTM)",
                  desc: "Currently in 4th semester. Actively seeking Software Engineering & AI internship/role opportunities."
                },
                {
                  type: "work",
                  period: "2025 – Present",
                  title: "Freelance Software & AI Engineer",
                  org: "Independent Consultant",
                  desc: "Building live client systems and integrating LLM AI agents."
                },
                {
                  type: "work",
                  period: "Nov 2024 – Feb 2025",
                  title: "Software Engineer Intern",
                  org: "PETRONAS Digital",
                  desc: "Shipped 10+ autonomous RPA platforms serving 50,000+ employees."
                },
                {
                  type: "study",
                  period: "May 2025",
                  title: "Diploma in Computer Science",
                  org: "Universiti Teknologi MARA (UiTM)",
                  desc: "3.9+ CGPA. Vice Chancellor's Award & Best System Architecture Award."
                },
                {
                  type: "work",
                  period: "Sept 2023 – Mar 2024",
                  title: "IT Specialist Intern",
                  org: "West Malayan Group",
                  desc: "Scaled corporate digital sales to RM100,000/month."
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
                    className={`relative flex flex-col md:flex-row items-center justify-between ${
                      isWork ? "md:flex-row-reverse" : ""
                    }`}
                  >
                    {/* Timeline Node Dot */}
                    <div className="absolute left-[17px] md:left-1/2 w-3.5 h-3.5 rounded-full border-2 border-primary bg-background md:-translate-x-1/2 z-10 shadow-sm" />

                    {/* Empty spacer for opposite side on desktop */}
                    <div className="hidden md:block w-[45%]" />

                    {/* Content Card */}
                    <div className="w-full md:w-[45%] pl-10 md:pl-0">
                      <div
                        className={`p-4 bg-white border border-border rounded-xl shadow-xs hover:shadow-sm transition-shadow group ${
                          isWork ? "md:text-right" : "md:text-left"
                        }`}
                      >
                        <div
                          className={`text-[10px] font-extrabold uppercase tracking-widest mb-1 ${
                            isWork ? "text-primary" : "text-amber-600"
                          }`}
                        >
                          {item.period}
                        </div>
                        <h3 className="font-bold text-foreground text-sm sm:text-base mb-0.5 group-hover:text-primary transition-colors">
                          {item.title}
                        </h3>
                        <div className="text-xs font-semibold text-muted-foreground mb-1.5">
                          {item.org}
                        </div>
                        <p className="text-[11px] sm:text-xs text-muted-foreground/80 leading-relaxed">
                          {item.desc}
                        </p>
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </div>
          
          <div className="mt-16 flex justify-center">
            <Link
              to="/experience"
              className="inline-flex items-center gap-2 text-sm font-semibold text-primary hover:text-primary-hover transition-colors"
            >
              <span>View Full Experience Breakdown</span>
              <ArrowRight size={16} />
            </Link>
          </div>
        </div>
      </section>

      {/* ============================================================
          FEATURED PROJECTS TEASER
      ============================================================ */}
      <section className="py-24 bg-background">
        <div className="container mx-auto px-6 max-w-7xl">
          <div className="flex justify-between items-end mb-12">
            <div>
              <div className="text-[13px] font-extrabold uppercase tracking-widest text-accent mb-2">Featured Work</div>
              <h2 className="text-3xl md:text-4xl font-bold text-foreground">Selected Projects</h2>
            </div>
            <Link to="/projects" className="hidden sm:inline-flex items-center gap-2 font-semibold text-primary hover:text-primary-hover">
              View all <ArrowRight size={16} />
            </Link>
          </div>

          <div className="grid md:grid-cols-2 gap-10">
            {/* Beruang */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="group cursor-pointer"
            >
              <div className="w-full aspect-[4/3] bg-white border border-border rounded-2xl mb-6 overflow-hidden shadow-sm group-hover:shadow-hover transition-all">
                <img
                  src="/images/beruang-dashboard.jpg"
                  alt="Beruang App"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
              </div>
              <div className="flex items-center gap-3 mb-3">
                <span className="px-3 py-1 bg-tint text-primary text-xs font-bold rounded-full border border-border">AI / Mobile</span>
                <span className="px-3 py-1 bg-[#FFFBEB] text-[#B45309] text-xs font-bold rounded-full border border-[#FCD34D]">Best Architecture Award</span>
              </div>
              <h3 className="text-2xl font-bold text-foreground mb-2 group-hover:text-primary transition-colors">Beruang</h3>
              <p className="text-muted-foreground leading-relaxed">AI-powered money management app with Bi-LSTM (99.61% accuracy) trained on 220k+ Malaysian transactions. 86.77 SUS score.</p>
            </motion.div>

            {/* RentVerse */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="group cursor-pointer md:mt-14"
            >
              <div className="w-full aspect-[4/3] bg-white border border-border rounded-2xl mb-6 overflow-hidden shadow-sm group-hover:shadow-hover transition-all">
                <img
                  src="/images/rentverse.jpeg"
                  alt="RentVerse"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
              </div>
              <div className="flex items-center gap-3 mb-3">
                <span className="px-3 py-1 bg-tint text-primary text-xs font-bold rounded-full border border-border">Web / DevSecOps</span>
                <span className="px-3 py-1 bg-[#FFFBEB] text-[#B45309] text-xs font-bold rounded-full border border-[#FCD34D]">Champion — 4 Awards</span>
              </div>
              <h3 className="text-2xl font-bold text-foreground mb-2 group-hover:text-primary transition-colors">RentVerse</h3>
              <p className="text-muted-foreground leading-relaxed">Enterprise-grade secure rental platform. Zero Trust Auth, AI fraud detection, 14-stage CI/CD DevSecOps pipeline.</p>
            </motion.div>
          </div>

          <div className="mt-10 sm:hidden flex justify-center">
            <Link to="/projects" className="inline-flex items-center gap-2 font-semibold text-primary">
              View all projects <ArrowRight size={16} />
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
