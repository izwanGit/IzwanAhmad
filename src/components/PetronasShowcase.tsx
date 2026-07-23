import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Building, ChevronLeft, ChevronRight, Play, Pause } from 'lucide-react';

export interface PetronasProject {
  id: string;
  title: string;
  subtitle: string;
  period: string;
  color: string;
  activeBg: string;
  inactiveBg: string;
  desc: string;
  slides: {
    src: string;
    label: string;
    story: string;
  }[];
}

const petronasProjects: PetronasProject[] = [
  {
    id: 'ops-hub',
    title: 'HCSM Operations Hub',
    subtitle: 'Enterprise ITSM Reporting & RPA Platform (Python & Streamlit)',
    period: 'Apr 2026 – Jul 2026',
    color: '#BFD730',
    activeBg: 'bg-[#7B8B18] text-white border-white/50 shadow-xl',
    inactiveBg: 'bg-[#BFD730]/20 text-white/90 border-[#BFD730]/30 hover:bg-[#BFD730]/35',
    desc: 'Unified Streamlit platform automating 3 core ITSM workflows. Cut weekly prep from 3-4 hrs to <2 min, monthly prep from 1-2 hrs to <3 min, and pre-deployment from 30 min to <1 min.',
    slides: [
      {
        src: '/images/petronas-hub-main.jpg',
        label: 'Ops Hub Main UI',
        story: 'Main Streamlit interface unifying Weekly Reports, Monthly Presentations, and Pre-Deployment RPA.',
      },
      {
        src: '/images/petronas-hub-wizard.jpg',
        label: '6-Step RPA Wizard',
        story: 'Pre-deployment wizard auto-filling RFC & RDM form fields in myGenie+ via Playwright SSO subprocess.',
      },
      {
        src: '/images/petronas-hub-weekly.jpg',
        label: 'Weekly Excel Engine',
        story: 'OpenPyXL fast-filtering raw Excel data 50x faster than row-by-row deletion & building Jinja2 HTML emails.',
      },
      {
        src: '/images/petronas-hub-monthly.jpg',
        label: 'Spatial PDF Engine',
        story: 'PyMuPDF extracting Power BI chart bounding boxes & converting them to native PPTX slides lossless.',
      },
      {
        src: '/images/petronas-hub-pptx.jpg',
        label: 'Generated PPTX Deck',
        story: '16:9 executive PowerPoint presentation auto-generated with month-over-month trend bullets.',
      },
    ],
  },
  {
    id: 'weekly-automation',
    title: 'Full Weekly Report Automation',
    subtitle: 'Zero-Touch Pipeline for HCSM ITSM Reporting',
    period: 'May 2026 – Jul 2026',
    color: '#FDB924',
    activeBg: 'bg-[#B37E0E] text-white border-white/50 shadow-xl',
    inactiveBg: 'bg-[#FDB924]/20 text-white/90 border-[#FDB924]/30 hover:bg-[#FDB924]/35',
    desc: 'Power Automate pipeline running every Monday 7 AM. Ingests 4 raw Excel files, executes 6 TypeScript Office Scripts, builds branded HTML emails, and sends Teams reminders.',
    slides: [
      {
        src: '/images/petronas-weekly-email.jpg',
        label: 'Production Outlook Email',
        story: 'Autonomous 7:00 AM email with PETRONAS teal HTML tables, rolling 4-week trend & attached Excel reports.',
      },
      {
        src: '/images/petronas-weekly-reminder.jpg',
        label: 'Teams Ageing Reminder',
        story: 'Follow-up Teams notification with @mentions targeting assignees who own tickets older than 30 days.',
      },
    ],
  },
  {
    id: 'monthly-automation',
    title: 'Full Monthly Report Automation',
    subtitle: 'Cloud-Native Power BI to PowerPoint Pipeline',
    period: 'May 2026 – Jul 2026',
    color: '#763F98',
    activeBg: 'bg-[#5C2E77] text-white border-white/50 shadow-xl',
    inactiveBg: 'bg-[#763F98]/25 text-white/90 border-[#763F98]/40 hover:bg-[#763F98]/40',
    desc: 'Runs on the 1st of every month with zero human intervention. Pairs a redesigned 16:9 Power BI template with DAX executive summary generators and Power Automate REST API connectors.',
    slides: [
      {
        src: '/images/petronas-monthly-cover.jpg',
        label: 'Power BI Slide Template',
        story: '16:9 presentation-ready Power BI report template matching PETRONAS corporate slide containers.',
      },
      {
        src: '/images/petronas-monthly-pbi.jpg',
        label: 'DAX Natural Language Bullets',
        story: 'DAX measures calculating MoM volume shifts and generating executive summary bullets dynamically.',
      },
      {
        src: '/images/petronas-monthly-email.jpg',
        label: 'Power Automate REST API Flow',
        story: 'Recurrence flow triggering Power BI Export-To-File API, archiving deck to SharePoint & emailing leadership.',
      },
      {
        src: '/images/petronas-monthly-teams.jpg',
        label: 'Teams Management Reminder',
        story: 'Automated Teams Adaptive Card posted 3 days prior to monthly leadership meetings.',
      },
    ],
  },
  {
    id: 'pre-deployment',
    title: 'Pre-Deployment Automation',
    subtitle: 'UAT Endorsement to OAT Document & Teams Handoff',
    period: 'Jun 2026 – Jul 2026',
    color: '#20419A',
    activeBg: 'bg-[#162E70] text-white border-white/50 shadow-xl',
    inactiveBg: 'bg-[#20419A]/25 text-white/90 border-[#20419A]/40 hover:bg-[#20419A]/40',
    desc: 'Triggered when UAT endorsement emails arrive. Pulls SharePoint details, generates branded OAT Word docs, and posts Teams card with a 1-click Streamlit RPA launcher button.',
    slides: [
      {
        src: '/images/petronas-predeploy-card.jpg',
        label: 'Teams Adaptive Card Handoff',
        story: 'Interactive Teams card with ticket details and "Open in Ops Hub" button launching RPA wizard.',
      },
      {
        src: '/images/petronas-predeploy-doc.jpg',
        label: 'Auto-Generated OAT Doc',
        story: 'PETRONAS-branded Word OAT document populated automatically from SharePoint UAT Online list.',
      },
      {
        src: '/images/petronas-predeploy-wizard.jpg',
        label: 'Playwright RPA Auto-Fill',
        story: 'Streamlit wizard executing Playwright SSO subprocess to populate RFC & RDM tickets in myGenie+.',
      },
    ],
  },
  {
    id: 'priority-tickets',
    title: 'Priority Ticket Automation System',
    subtitle: 'Real-Time Teams Logger, Enricher & Reminder',
    period: 'May 2026 – Jul 2026',
    color: '#008781',
    activeBg: 'bg-[#00605B] text-white border-white/50 shadow-xl',
    inactiveBg: 'bg-[#008781]/25 text-white/90 border-[#008781]/40 hover:bg-[#008781]/40',
    desc: '24/7 Teams chat listener intercepting urgent ticket mentions (REQ / ICT_WO). Auto-logs placeholders, enriches details via Office Scripts, and posts weekly @mention reminders.',
    slides: [
      {
        src: '/images/petronas-priority-notif.jpg',
        label: 'Real-Time Teams Listener',
        story: 'Flow 1 listening 24/7 to Teams support chat, isolating ticket IDs, and auto-logging placeholder rows.',
      },
      {
        src: '/images/petronas-priority-list.jpg',
        label: 'SharePoint Tracking List',
        story: 'TypeScript Office Script enriching ticket details from daily BMC Helix dumps into tracking list.',
      },
      {
        src: '/images/petronas-priority-reminder.jpg',
        label: 'Weekly @Mention Reminder',
        story: 'Thursday reminder flow resolving assignee emails & posting adaptive card with real Teams @mentions.',
      },
    ],
  },
  {
    id: 'ticket-dashboard',
    title: 'HCSM Ticket Monitoring Dashboard',
    subtitle: 'Power BI Maintenance & Sourcing Pipeline',
    period: 'Mar 2026 – Jul 2026',
    color: '#0284C7',
    activeBg: 'bg-[#026597] text-white border-white/50 shadow-xl',
    inactiveBg: 'bg-[#0284C7]/25 text-white/90 border-[#0284C7]/40 hover:bg-[#0284C7]/40',
    desc: 'Maintained and enhanced team production Power BI dashboard for 50,000+ employee myCareerX operations. Refined data models, corrected legacy filters, and added new DAX metrics.',
    slides: [
      {
        src: '/images/petronas-dashboard-page.jpg',
        label: 'Executive Monitoring Page',
        story: 'Production Power BI dashboard tracking ticket volume trends, SLA compliance, and ageing breakdowns.',
      },
    ],
  },
];

export const PetronasShowcase = () => {
  const [activeProjectIdx, setActiveProjectIdx] = useState(0);
  const [activeSlideIdx, setActiveSlideIdx] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);

  const activeProject = petronasProjects[activeProjectIdx];
  const activeSlide = activeProject.slides[activeSlideIdx] || activeProject.slides[0];

  // Auto-play slideshow for the active project
  useEffect(() => {
    if (!isPlaying || activeProject.slides.length <= 1) return;
    const timer = setInterval(() => {
      setActiveSlideIdx((prev) => (prev + 1) % activeProject.slides.length);
    }, 3800);
    return () => clearInterval(timer);
  }, [isPlaying, activeProjectIdx, activeProject.slides.length]);

  // Reset slide index when changing project
  const handleSelectProject = (index: number) => {
    setActiveProjectIdx(index);
    setActiveSlideIdx(0);
  };

  const handleNextSlide = () => {
    setActiveSlideIdx((prev) => (prev + 1) % activeProject.slides.length);
  };

  const handlePrevSlide = () => {
    setActiveSlideIdx((prev) => (prev - 1 + activeProject.slides.length) % activeProject.slides.length);
  };

  return (
    <div className="w-full">
      {/* 6 Project Cards Grid on Left + Browser Story Showcase on Right */}
      <div className="grid lg:grid-cols-12 gap-8 items-stretch">
        
        {/* Left Column: All 6 PETRONAS Projects (Full Brand Colored Cards) */}
        <div className="lg:col-span-5 flex flex-col gap-3.5">
          <div className="text-xs font-extrabold uppercase tracking-widest text-white/60 mb-1">
            6 Production Projects (Click to Explore Story)
          </div>

          {petronasProjects.map((project, i) => {
            const isActive = activeProjectIdx === i;
            return (
              <motion.div
                key={project.id}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.04 }}
                onClick={() => handleSelectProject(i)}
                className={`rounded-xl p-4.5 cursor-pointer transition-all duration-300 border ${
                  isActive ? project.activeBg : project.inactiveBg
                }`}
              >
                <div className="flex items-center justify-between gap-2 mb-1.5">
                  <div className="flex items-center gap-2.5">
                    <span
                      className="w-3 h-3 rounded-full shrink-0"
                      style={{ background: project.color, boxShadow: `0 0 10px ${project.color}` }}
                    />
                    <h3 className="text-base font-bold tracking-tight">{project.title}</h3>
                  </div>
                  <span className="text-[10px] font-mono font-semibold opacity-75 px-2 py-0.5 rounded bg-black/20 shrink-0">
                    {project.slides.length} {project.slides.length === 1 ? 'Slide' : 'Slides'}
                  </span>
                </div>
                <p className="text-xs leading-relaxed opacity-90 pl-5 line-clamp-2">
                  {project.desc}
                </p>
              </motion.div>
            );
          })}
        </div>

        {/* Right Column: Animated GIF-Like Browser Window Story Showcase */}
        <div className="lg:col-span-7 flex flex-col justify-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.98 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="w-full bg-[#1E1E24] rounded-2xl overflow-hidden shadow-2xl border border-white/15 flex flex-col"
          >
            {/* Browser Header Bar */}
            <div className="bg-[#14151B] px-4 py-3 flex items-center justify-between border-b border-white/10 select-none">
              {/* Traffic light dots */}
              <div className="flex items-center gap-1.5 shrink-0">
                <span className="w-3 h-3 rounded-full bg-[#EF4444] opacity-85" />
                <span className="w-3 h-3 rounded-full bg-[#F59E0B] opacity-85" />
                <span className="w-3 h-3 rounded-full bg-[#10B981] opacity-85" />
              </div>

              {/* URL Address */}
              <div className="mx-auto w-3/5 max-w-sm bg-[#1E1E24] text-[11px] text-white/70 text-center py-1.5 rounded-md border border-white/10 font-mono select-none overflow-hidden text-ellipsis whitespace-nowrap">
                petronas.{activeProject.id}.hcsm.internal
              </div>

              {/* Pause/Play Toggle */}
              <button
                onClick={() => setIsPlaying(!isPlaying)}
                className="text-white/60 hover:text-white transition-colors p-1"
                title={isPlaying ? 'Pause Story Slideshow' : 'Play Story Slideshow'}
              >
                {isPlaying ? <Pause size={14} /> : <Play size={14} />}
              </button>
            </div>

            {/* Story Banner Header */}
            <div className="bg-[#181920] px-5 py-3 border-b border-white/10 flex items-center justify-between">
              <div>
                <div className="text-xs font-bold text-white flex items-center gap-2">
                  <span
                    className="w-2.5 h-2.5 rounded-full inline-block"
                    style={{ background: activeProject.color }}
                  />
                  {activeProject.title}
                </div>
                <div className="text-[11px] text-white/60 font-mono">
                  {activeProject.subtitle}
                </div>
              </div>
              <div className="text-xs font-mono font-bold text-accent px-2.5 py-1 rounded bg-accent/10 border border-accent/20">
                Frame {activeSlideIdx + 1} / {activeProject.slides.length}
              </div>
            </div>

            {/* Browser Content Image View */}
            <div className="relative aspect-[16/10] bg-[#0E0F14] overflow-hidden flex flex-col group">
              <AnimatePresence mode="wait">
                <motion.div
                  key={`${activeProjectIdx}-${activeSlideIdx}`}
                  initial={{ opacity: 0, scale: 0.98 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.3 }}
                  className="w-full h-full"
                >
                  <img
                    src={activeSlide.src}
                    alt={activeSlide.label}
                    className="w-full h-full object-cover object-top"
                  />
                </motion.div>
              </AnimatePresence>

              {/* Prev / Next Controls on Hover */}
              {activeProject.slides.length > 1 && (
                <>
                  <button
                    onClick={handlePrevSlide}
                    className="absolute left-3 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-black/60 backdrop-blur-md text-white flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity hover:bg-black/80"
                  >
                    <ChevronLeft size={18} />
                  </button>
                  <button
                    onClick={handleNextSlide}
                    className="absolute right-3 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-black/60 backdrop-blur-md text-white flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity hover:bg-black/80"
                  >
                    <ChevronRight size={18} />
                  </button>
                </>
              )}

              {/* Story Narrative Overlay Bar */}
              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/95 via-black/85 to-transparent p-4 pt-8 text-white z-10">
                <div className="flex items-center gap-2 mb-1">
                  <span className="text-[11px] font-bold uppercase tracking-wider text-accent font-mono">
                    Story Frame {activeSlideIdx + 1}:
                  </span>
                  <span className="text-xs font-bold text-white">{activeSlide.label}</span>
                </div>
                <p className="text-xs text-white/80 leading-relaxed font-sans">
                  {activeSlide.story}
                </p>
              </div>
            </div>

            {/* Footer Slide Navigation Thumbnails */}
            <div className="bg-[#14151B] px-4 py-3 border-t border-white/10 flex items-center justify-between">
              <div className="flex items-center gap-2 overflow-x-auto py-1">
                {activeProject.slides.map((slide, idx) => (
                  <button
                    key={idx}
                    onClick={() => setActiveSlideIdx(idx)}
                    className={`px-3 py-1.5 rounded text-xs font-semibold transition-all whitespace-nowrap flex items-center gap-1.5 ${
                      idx === activeSlideIdx
                        ? 'bg-white text-slate-900 font-bold shadow'
                        : 'bg-white/10 text-white/70 hover:bg-white/20 hover:text-white'
                    }`}
                  >
                    <span
                      className="w-1.5 h-1.5 rounded-full"
                      style={{ background: idx === activeSlideIdx ? activeProject.color : 'rgba(255,255,255,0.4)' }}
                    />
                    {slide.label}
                  </button>
                ))}
              </div>
            </div>
          </motion.div>
        </div>

      </div>
    </div>
  );
};

export default PetronasShowcase;
