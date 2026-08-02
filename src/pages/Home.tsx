import React from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { ArrowRight, Building, Trophy, GraduationCap, MapPin } from 'lucide-react';
import { Link } from 'react-router-dom';

import HeroShowcase from '../components/HeroShowcase';
import FlagshipScrollytelling from '../components/FlagshipScrollytelling';

const Home: React.FC = () => {
  const shouldReduceMotion = useReducedMotion();

  return (
    <div className="w-full">

      {/* ============================================================
          HERO SECTION — SIGNATURE TWO-DOT JOURNEY
      ============================================================ */}
      <section
        aria-labelledby="hero-title"
        className="relative overflow-hidden bg-hero-wash pb-10 pt-20 sm:pb-14 sm:pt-24 lg:flex lg:min-h-screen lg:items-center lg:pb-16 lg:pt-28"
      >
        <div
          className="hero-dot-field-desktop pointer-events-none absolute inset-0 hidden bg-hero-showcase-stage bg-cover bg-center lg:block"
          aria-hidden="true"
        >
          <span className="absolute inset-0 bg-hero-stage-halo" />
        </div>
        <div
          className="hero-dot-field-mobile pointer-events-none absolute inset-x-0 bottom-0 h-3/5 bg-hero-showcase-stage bg-cover bg-right lg:hidden"
          aria-hidden="true"
        >
          <div className="absolute inset-0 bg-hero-stage-halo" />
        </div>

        <div className="container relative z-10 mx-auto max-w-7xl px-6">
          <div className="grid items-center gap-6 lg:grid-cols-12 lg:gap-8 xl:gap-10">
            <motion.div
              initial={shouldReduceMotion ? false : { opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: shouldReduceMotion ? 0 : 0.38, ease: [0.16, 1, 0.3, 1] }}
              className="flex flex-col items-start lg:col-span-5"
            >
              <div className="mb-5 inline-flex min-h-10 items-center gap-3 rounded-full border border-primary/15 bg-white/95 px-4 py-2 text-[11px] font-semibold text-foreground shadow-card backdrop-blur-md sm:mb-6 sm:text-xs">
                <span className="h-2.5 w-2.5 shrink-0 rounded-full bg-accent shadow-journey-dot" />
                <span className="sm:hidden">Open to roles + freelance projects</span>
                <span className="hidden sm:inline">Open to software roles + selected freelance projects</span>
              </div>

              <h1 id="hero-title" className="mb-4 text-3xl font-extrabold leading-tight tracking-tight text-foreground xs:text-4xl sm:mb-6 sm:text-5xl xl:text-6xl">
                Engineering <span className="text-primary">ideas</span> into production <span className="text-accent">impact.</span>
              </h1>

              <p className="mb-5 max-w-xl text-sm font-medium leading-relaxed text-muted-foreground sm:mb-6 sm:text-lg">
                I’m <strong className="font-bold text-foreground">Izwan Ahmad</strong> — a product-minded software engineer turning ambitious ideas into production software, award-winning AI, and digital products people trust.
              </p>

              <ul className="mb-8 hidden flex-wrap items-center gap-4 text-xs font-bold uppercase tracking-wider text-muted-foreground sm:flex" aria-label="Core capabilities">
                {['Web & Mobile Products', 'Applied AI', 'Automation & Data'].map((capability) => (
                  <li key={capability} className="flex items-center gap-3">
                    <span className="h-1.5 w-1.5 rounded-full bg-accent" aria-hidden="true" />
                    {capability}
                  </li>
                ))}
              </ul>

              <div className="mb-7 flex w-full items-center gap-2 sm:w-auto sm:gap-3 lg:mb-10">
                <Link
                  to="/projects"
                  className="inline-flex min-h-12 flex-1 items-center justify-center gap-2 rounded-xl bg-primary px-4 py-3 text-xs font-bold text-white shadow-hero-cta transition duration-150 hover:-translate-y-0.5 hover:bg-primary-hover hover:shadow-hover focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 motion-reduce:transition-none sm:flex-none sm:gap-3 sm:px-6 sm:text-sm"
                >
                  <span className="sm:hidden">Explore Work</span>
                  <span className="hidden sm:inline">Explore Flagship Work</span>
                  <ArrowRight size={18} aria-hidden="true" />
                </Link>
                <Link
                  to="/freelance"
                  className="inline-flex min-h-12 flex-1 items-center justify-center gap-2 rounded-xl border border-primary/20 bg-white/95 px-4 py-3 text-xs font-bold text-foreground shadow-card backdrop-blur-md transition duration-150 hover:-translate-y-0.5 hover:border-primary/40 hover:text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 motion-reduce:transition-none sm:flex-none sm:px-5 sm:text-sm"
                >
                  <span>Work With Me</span>
                  <ArrowRight size={16} aria-hidden="true" />
                </Link>
              </div>

              <div className="grid w-full grid-cols-3 gap-4 border-t border-border pt-6 sm:gap-6">
                <div>
                  <div className="text-2xl font-black text-foreground sm:text-3xl">16+</div>
                  <div className="mt-1 text-xs font-bold uppercase tracking-wider text-muted-foreground">Projects</div>
                </div>
                <div>
                  <div className="text-2xl font-black text-primary sm:text-3xl">11+</div>
                  <div className="mt-1 text-xs font-bold uppercase tracking-wider text-muted-foreground">Awards</div>
                </div>
                <div>
                  <div className="text-2xl font-black text-accent sm:text-3xl">5+</div>
                  <div className="mt-1 text-xs font-bold uppercase tracking-wider text-muted-foreground">Years Coding</div>
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={shouldReduceMotion ? false : { opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: shouldReduceMotion ? 0 : 0.38, ease: [0.16, 1, 0.3, 1], delay: shouldReduceMotion ? 0 : 0.06 }}
              className="flex w-full justify-center lg:col-span-7"
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
      <section className="bg-background py-16 sm:py-24">
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
            <h2 className="text-2xl font-bold tracking-tight text-foreground sm:text-3xl md:text-4xl">Awards & Achievements</h2>
          </motion.div>

          <div className="relative w-full overflow-hidden flex -mx-6 px-6 py-4">
            {/* Left & Right gradient masks for smooth fade effect */}
            <div className="absolute left-0 top-0 z-10 h-full w-12 bg-gradient-to-r from-background to-transparent pointer-events-none sm:w-24" />
            <div className="absolute right-0 top-0 z-10 h-full w-12 bg-gradient-to-l from-background to-transparent pointer-events-none sm:w-24" />
            
            <div className="flex w-max animate-marquee gap-3 hover:pause sm:gap-6">
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
                  className="group w-[150px] flex-shrink-0 overflow-hidden rounded-lg border border-border bg-white shadow-sm transition-shadow hover:shadow-md sm:w-[320px] sm:rounded-xl"
                >
                  <div className="aspect-[4/3] w-full overflow-hidden border-b border-border bg-tint">
                    <img 
                      src={item.img} 
                      alt={item.title} 
                      className={`w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 ${
                        item.title === 'Champion + 4 Awards' ? 'object-[center_20%]' : 'object-center'
                      }`} 
                    />
                  </div>
                  <div className="p-3 sm:p-5">
                    <div className="mb-1 text-[9px] font-bold uppercase tracking-widest text-accent sm:mb-2 sm:text-xs">{item.type}</div>
                    <div className="mb-1 text-[11px] font-bold leading-tight text-foreground sm:text-[15px] sm:leading-normal">{item.title}</div>
                    <div className="line-clamp-2 text-[10px] leading-snug text-muted-foreground sm:text-[13px] sm:leading-relaxed">{item.sub}</div>
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
