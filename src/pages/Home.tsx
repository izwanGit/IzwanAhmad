import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight, Building, Trophy, GraduationCap, MapPin } from 'lucide-react';
import { Link } from 'react-router-dom';

/* ─── Slideshow images for the hero polaroid carousel ─── */
const slidePhotos = [
  { src: '/images/izwan-hero.jpg', caption: 'Internship @ PETRONAS Digital' },
  { src: '/images/izwan-p3.jpg', caption: 'Award Night' },
  { src: '/images/izwan-p4.jpg', caption: 'At the Lab' },
  { src: '/images/izwan-p5.jpg', caption: 'Competition Day' },
  { src: '/images/izwan-p6.jpg', caption: 'Presenting Beruang' },
  { src: '/images/izwan-p7.jpg', caption: 'SecOps Challenge Win' },
  { src: '/images/izwan-p8.jpg', caption: 'Out & About' },
  { src: '/images/izwan-p9.jpg', caption: 'Campus Life' },
];

const awards = [
  { img: '/images/award-secops.jpeg', title: 'Champion + 4 Awards', sub: 'UiTM Mobile SecOps Challenge (RentVerse)', color: '#FDB924' },
  { img: '/images/award-ai-booth.jpeg', title: 'Best AI Booth Award', sub: 'AI Seminar 2025 — Batik Recognition', color: '#BFD730' },
  { img: '/images/award-vc.jpeg', title: "Vice Chancellor's Award", sub: 'Diploma in Computer Science, UiTM', color: '#763F98' },
];

const PolaroidCarousel = () => {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrent(c => (c + 1) % slidePhotos.length);
    }, 3000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="relative w-full flex items-center justify-center" style={{ height: 440 }}>
      {slidePhotos.map((photo, i) => {
        const offset = (i - current + slidePhotos.length) % slidePhotos.length;
        const isActive = offset === 0;
        const isNext = offset === 1;
        const isPrev = offset === slidePhotos.length - 1;

        if (!isActive && !isNext && !isPrev) return null;

        const rotate = isActive ? 0 : isNext ? 4 : -4;
        const x = isActive ? 0 : isNext ? 60 : -60;
        const scale = isActive ? 1 : 0.88;
        const zIndex = isActive ? 30 : isNext ? 20 : 10;
        const opacity = isActive ? 1 : 0.6;

        return (
          <motion.div
            key={photo.src}
            animate={{ rotate, x, scale, opacity, zIndex }}
            transition={{ duration: 0.5, ease: 'easeInOut' }}
            className="absolute"
            style={{ zIndex }}
          >
            {/* Polaroid frame */}
            <div className="bg-white shadow-2xl rounded-sm p-3 pb-10 w-64"
              style={{ boxShadow: '0 8px 40px rgba(12,26,32,0.18)' }}>
              <div className="w-full h-60 overflow-hidden rounded-sm">
                <img
                  src={photo.src}
                  alt={photo.caption}
                  className="w-full h-full object-cover"
                  loading="lazy"
                />
              </div>
              <p className="text-center text-xs font-medium text-muted-foreground mt-3 font-mono tracking-wide">
                {photo.caption}
              </p>
            </div>
          </motion.div>
        );
      })}
      {/* Dot indicators */}
      <div className="absolute -bottom-8 flex gap-2">
        {slidePhotos.map((_, i) => (
          <button
            key={i}
            onClick={() => setCurrent(i)}
            className={`w-1.5 h-1.5 rounded-full transition-all ${i === current ? 'bg-primary w-4' : 'bg-border'}`}
          />
        ))}
      </div>
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
                Open to full-time opportunities
              </div>

              <h1 className="text-5xl md:text-6xl font-bold tracking-tight text-foreground leading-[1.1] mb-6">
                Software Engineer<br />
                building{' '}
                <span className="text-primary">high-impact</span>{' '}
                systems.
              </h1>

              <p className="text-lg text-muted-foreground leading-relaxed max-w-lg mb-10">
                Graduating Computer Science student at UiTM. I build end-to-end web apps, AI systems, and workflow automation — turning complex challenges into scalable, autonomous solutions.
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
                  <div className="text-2xl font-black text-foreground">3.93</div>
                  <div className="text-xs font-semibold text-muted-foreground uppercase tracking-wide">CGPA (Dean's List)</div>
                </div>
                <div>
                  <div className="text-2xl font-black text-foreground">10+</div>
                  <div className="text-xs font-semibold text-muted-foreground uppercase tracking-wide">Production Systems</div>
                </div>
                <div>
                  <div className="text-2xl font-black text-foreground">11+</div>
                  <div className="text-xs font-semibold text-muted-foreground uppercase tracking-wide">Awards</div>
                </div>
              </div>
            </motion.div>

            {/* Right — Polaroid Carousel */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.7, delay: 0.2 }}
              className="hidden lg:flex justify-center"
            >
              <PolaroidCarousel />
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
                <div className="text-2xl font-black">3.93</div>
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
                  Bachelor's in Computer Science, UiTM (CGPA 3.93 — graduating Aug 2026)
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

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
            {awards.map((award, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="bg-white border border-border rounded-xl overflow-hidden hover:shadow-card transition-all group"
              >
                <div className="aspect-video overflow-hidden bg-tint">
                  <img
                    src={award.img}
                    alt={award.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                </div>
                <div className="p-5">
                  <div
                    className="inline-block text-[11px] font-black uppercase tracking-wider px-2 py-1 rounded mb-2"
                    style={{ backgroundColor: award.color + '22', color: award.color }}
                  >
                    Award
                  </div>
                  <h3 className="font-bold text-foreground mb-1">{award.title}</h3>
                  <p className="text-sm text-muted-foreground">{award.sub}</p>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Text-based remaining awards */}
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {[
              { title: 'Best System Architecture', sub: 'Final Year Project (Beruang)' },
              { title: 'Best Website GUI', sub: 'UiTM Website Competition' },
              { title: "Dean's List", sub: 'Every semester — Diploma & Degree' },
              { title: 'Outstanding Performance', sub: 'West Malayan Group (+ Increment)' },
            ].map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.05 }}
                className="p-5 bg-white border border-border rounded-xl"
              >
                <div className="text-xs font-bold uppercase tracking-widest text-[#FDB924] mb-2">Award</div>
                <div className="font-bold text-foreground mb-1 text-sm">{item.title}</div>
                <div className="text-xs text-muted-foreground">{item.sub}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ============================================================
          PETRONAS SHOWCASE
      ============================================================ */}
      <section
        className="py-24 relative overflow-hidden"
        style={{ background: '#00B1A9' }}
      >
        <div className="container mx-auto px-6 max-w-7xl relative z-10">
          {/* Header with PETRONAS logo */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="flex flex-col md:flex-row md:items-center gap-6 mb-16"
          >
            <div className="flex-1">
              <div className="text-[13px] font-extrabold uppercase tracking-widest text-white/60 mb-3 flex items-center gap-2">
                <Building size={14} />
                Corporate Experience
              </div>
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
                PETRONAS Digital
              </h2>
              <p className="text-white/75 max-w-xl leading-relaxed">
                Software Engineer Intern at the Human Capital Solution Management team, supporting myCareerX (Oracle HCM Cloud) for 50,000+ employees across Malaysia.
              </p>
            </div>
            <div className="shrink-0">
              <img
                src="https://companieslogo.com/img/orig/5183.KL_BIG.D-a824ccc5.png?t=1720244490"
                alt="PETRONAS Logo"
                className="w-24 h-auto object-contain"
              />
            </div>
          </motion.div>

          {/* Stats Row */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-14">
            {[
              { num: '10+', label: 'Production Systems Shipped' },
              { num: '3mo', label: 'Solo. End-to-End.' },
              { num: '50k+', label: 'Employees Served' },
              { num: 'All running', label: 'Post-Departure Autonomously' },
            ].map((stat, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08 }}
                className="rounded-xl px-5 py-4 text-center"
                style={{ background: 'rgba(255,255,255,0.1)', backdropFilter: 'blur(8px)', border: '1px solid rgba(255,255,255,0.2)' }}
              >
                <div className="text-2xl font-black text-white mb-1">{stat.num}</div>
                <div className="text-xs font-semibold text-white/70">{stat.label}</div>
              </motion.div>
            ))}
          </div>

          {/* System Cards */}
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {[
              {
                color: '#BFD730',
                title: 'HCSM Operations Hub',
                desc: 'Unified Streamlit platform automating 3 workflows. Cut report prep from 3-4 hrs to under 2 min.',
              },
              {
                color: '#FDB924',
                title: 'Zero-Touch Weekly Pipeline',
                desc: 'Power Automate + 6 TypeScript Office Scripts. Runs every Monday 7AM, fully autonomous.',
              },
              {
                color: '#763F98',
                title: 'Monthly Report Automation',
                desc: 'Cloud-native Power BI → PowerPoint pipeline. Runs on the 1st of every month with zero human touch.',
              },
              {
                color: '#20419A',
                title: 'Priority Ticket System',
                desc: '24/7 Teams monitoring, auto-logging, enrichment & weekly reminders for urgent ITSM tickets.',
              },
            ].map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="rounded-xl p-5 hover:scale-[1.02] transition-transform cursor-default"
                style={{ background: 'rgba(255,255,255,0.1)', backdropFilter: 'blur(8px)', border: '1px solid rgba(255,255,255,0.2)' }}
              >
                <div
                  className="w-3 h-3 rounded-full mb-4"
                  style={{ background: item.color, boxShadow: `0 0 12px ${item.color}` }}
                />
                <h3 className="text-base font-bold text-white mb-2">{item.title}</h3>
                <p className="text-sm text-white/65 leading-relaxed">{item.desc}</p>
              </motion.div>
            ))}
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
