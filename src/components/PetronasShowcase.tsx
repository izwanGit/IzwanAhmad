import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const petronasProjects = [
  {
    id: 'ops-hub',
    title: 'HCSM Operations Hub',
    subtitle: 'Python · Streamlit · Playwright RPA · PyMuPDF',
    solidColor: '#7B8B18', // Solid Lime Green
    desc: 'Unified internal platform automating 3 ITSM workflows. Cut weekly report prep from 3–4 hrs to under 2 min, monthly from 1–2 hrs to under 3 min, and pre-deployment from 30 min to under 1 min.',
    slides: [
      { src: '/images/petronas-hub-main.jpg', title: 'Main Operations Hub UI' },
      { src: '/images/petronas-hub-wizard.jpg', title: '6-Step Pre-Deployment RPA Wizard' },
      { src: '/images/petronas-hub-weekly.jpg', title: 'Weekly Excel Fast Filtering Engine' },
      { src: '/images/petronas-hub-monthly.jpg', title: 'Spatial PDF Chart Extraction Engine' },
      { src: '/images/petronas-hub-pptx.jpg', title: 'Auto-Generated PowerPoint Presentation' },
    ],
  },
  {
    id: 'weekly',
    title: 'Full Weekly Report Automation',
    subtitle: 'Power Automate · TypeScript · Office Scripts · SharePoint',
    solidColor: '#B37E0E', // Solid Amber
    desc: 'Zero-touch pipeline running every Monday 7 AM. Ingests 4 Excel files with 6 TypeScript Office Scripts, builds PETRONAS-branded HTML emails, and sends Teams reminders with @mentions.',
    slides: [
      { src: '/images/petronas-weekly-email.jpg', title: 'Automated Outlook HTML Email' },
      { src: '/images/petronas-weekly-reminder.jpg', title: 'Teams Ageing Ticket Reminder' },
    ],
  },
  {
    id: 'monthly',
    title: 'Full Monthly Report Automation',
    subtitle: 'Power BI · DAX · Power Automate REST API · SharePoint',
    solidColor: '#6B308C', // Solid PETRONAS Purple
    desc: 'Runs on the 1st of every month with zero human touch. Redesigned Power BI template uses DAX to generate executive summaries, then Power Automate exports to PPTX and emails leadership.',
    slides: [
      { src: '/images/petronas-monthly-cover.jpg', title: '16:9 Power BI Executive Template' },
      { src: '/images/petronas-monthly-pbi.jpg', title: 'DAX Natural Language Summary Bullets' },
      { src: '/images/petronas-monthly-email.jpg', title: 'Power Automate REST API Export Flow' },
      { src: '/images/petronas-monthly-teams.jpg', title: 'Teams Management Presentation Reminder' },
    ],
  },
  {
    id: 'predeploy',
    title: 'Pre-Deployment Automation',
    subtitle: 'Power Automate · Playwright · Adaptive Cards · Word',
    solidColor: '#162E70', // Solid PETRONAS Deep Blue
    desc: 'Triggered automatically by UAT endorsement emails. Generates PETRONAS-branded OAT Word documents and posts interactive Teams cards with a 1-click Streamlit RPA launcher.',
    slides: [
      { src: '/images/petronas-predeploy-card.jpg', title: 'Teams Adaptive Card Handoff' },
      { src: '/images/petronas-predeploy-doc.jpg', title: 'Auto-Generated OAT Word Document' },
      { src: '/images/petronas-predeploy-wizard.jpg', title: 'Streamlit Playwright RPA Wizard' },
    ],
  },
  {
    id: 'priority',
    title: 'Priority Ticket Automation',
    subtitle: 'Power Automate · Teams Bot · Office 365 Users API',
    solidColor: '#00605B', // Solid Emerald Dark
    desc: '24/7 Teams chat listener intercepting urgent ticket mentions (REQ / ICT_WO). Auto-logs placeholders in SharePoint, enriches details via Office Scripts, and posts weekly reminders.',
    slides: [
      { src: '/images/petronas-priority-notif.jpg', title: '24/7 Real-Time Teams Chat Listener' },
      { src: '/images/petronas-priority-list.jpg', title: 'SharePoint Tracking & Office Script Data Dump' },
      { src: '/images/petronas-priority-reminder.jpg', title: 'Weekly Thursday @Mention Reminder' },
    ],
  },
  {
    id: 'dashboard',
    title: 'HCSM Ticket Monitoring Dashboard',
    subtitle: 'Power BI · DAX · SharePoint · BMC Helix',
    solidColor: '#026597', // Solid Sky Blue
    desc: 'Maintained production Power BI monitoring dashboard for 50,000+ employee myCareerX operations. Refined data models, corrected legacy filters, and added new DAX metrics.',
    slides: [
      { src: '/images/petronas-dashboard-page.jpg', title: 'Production Executive Monitoring Dashboard' },
    ],
  },
];

export const PetronasShowcase = () => {
  const [activeIdx, setActiveIdx] = useState(0);
  const [slideIdx, setSlideIdx] = useState(0);

  const active = petronasProjects[activeIdx];

  // Auto-cycle slides like a GIF
  useEffect(() => {
    setSlideIdx(0);
  }, [activeIdx]);

  useEffect(() => {
    if (active.slides.length <= 1) return;
    const t = setInterval(() => {
      setSlideIdx((prev) => (prev + 1) % active.slides.length);
    }, 3500);
    return () => clearInterval(t);
  }, [activeIdx, active.slides.length]);

  return (
    <div className="grid lg:grid-cols-12 gap-8 items-start">
      {/* Left Column: 6 Solid Color Cards */}
      <div className="lg:col-span-5 flex flex-col gap-3.5">
        {petronasProjects.map((p, i) => {
          const isActive = activeIdx === i;
          return (
            <motion.button
              key={p.id}
              initial={{ opacity: 0, x: -16 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.04 }}
              onClick={() => setActiveIdx(i)}
              className={`text-left rounded-xl p-4.5 transition-all duration-200 cursor-pointer shadow-md ${
                isActive
                  ? 'ring-4 ring-white shadow-2xl scale-[1.02] z-10'
                  : 'hover:scale-[1.01] hover:brightness-110 opacity-95'
              }`}
              style={{
                backgroundColor: p.solidColor,
                color: '#FFFFFF',
              }}
            >
              <div className="font-bold text-base tracking-tight leading-snug mb-1">
                {p.title}
              </div>
              <div className="text-xs font-mono opacity-85 leading-snug">
                {p.subtitle}
              </div>
            </motion.button>
          );
        })}
      </div>

      {/* Right Column: Clean Showcase Frame with 100% Fully Visible Images */}
      <div className="lg:col-span-7 flex flex-col gap-4">
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="w-full bg-[#12131A] rounded-2xl p-3 md:p-4 shadow-2xl border border-white/20 flex flex-col"
        >
          {/* Top Info Bar inside frame */}
          <div className="flex items-center justify-between pb-3 px-2 border-b border-white/10 mb-3">
            <div className="flex items-center gap-2">
              <span
                className="w-3 h-3 rounded-full"
                style={{ backgroundColor: active.solidColor }}
              />
              <span className="text-sm font-bold text-white tracking-wide">
                {active.title}
              </span>
            </div>
            {active.slides.length > 1 && (
              <div className="flex gap-1.5">
                {active.slides.map((_, sIdx) => (
                  <button
                    key={sIdx}
                    onClick={() => setSlideIdx(sIdx)}
                    className={`h-2 rounded-full transition-all ${
                      sIdx === slideIdx ? 'w-6 bg-white' : 'w-2 bg-white/30 hover:bg-white/50'
                    }`}
                  />
                ))}
              </div>
            )}
          </div>

          {/* Screenshot Display Box - OBJECT CONTAIN ensures 100% full visibility without cropping */}
          <div className="relative w-full aspect-[16/10] bg-[#0A0B0E] rounded-xl overflow-hidden flex items-center justify-center p-2 border border-white/10">
            <AnimatePresence mode="wait">
              <motion.img
                key={`${activeIdx}-${slideIdx}`}
                src={active.slides[slideIdx].src}
                alt={active.slides[slideIdx].title}
                initial={{ opacity: 0, scale: 0.98 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3 }}
                className="w-full h-full object-contain rounded-lg"
              />
            </AnimatePresence>
          </div>

          {/* Caption for current screenshot */}
          <div className="pt-3 px-2 flex items-center justify-between text-xs font-mono text-white/70">
            <span>{active.slides[slideIdx].title}</span>
            <span>{slideIdx + 1} / {active.slides.length}</span>
          </div>
        </motion.div>

        {/* Dedicated Description Box below the image box (Zero overlap!) */}
        <div className="bg-[#12131A] rounded-xl p-4 border border-white/15 shadow-lg">
          <div className="text-xs font-bold text-white/60 uppercase tracking-wider mb-1">
            System Overview
          </div>
          <p className="text-sm text-white/95 leading-relaxed">
            {active.desc}
          </p>
        </div>
      </div>
    </div>
  );
};

export default PetronasShowcase;
