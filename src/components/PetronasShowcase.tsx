import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const petronasProjects = [
  {
    id: 'ops-hub',
    title: 'HCSM Operations Hub',
    tools: [
      { name: 'Python', icon: 'https://cdn.simpleicons.org/python/ffffff' },
      { name: 'Streamlit', icon: 'https://cdn.simpleicons.org/streamlit/ffffff' },
      { name: 'Playwright', icon: 'https://cdn.simpleicons.org/playwright/ffffff' },
    ],
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
    tools: [
      { name: 'Power Automate', icon: 'https://cdn.simpleicons.org/powerautomate/ffffff' },
      { name: 'TypeScript', icon: 'https://cdn.simpleicons.org/typescript/ffffff' },
      { name: 'SharePoint', icon: 'https://cdn.simpleicons.org/microsoftsharepoint/ffffff' },
    ],
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
    tools: [
      { name: 'Power BI', icon: 'https://cdn.simpleicons.org/powerbi/ffffff' },
      { name: 'Power Automate', icon: 'https://cdn.simpleicons.org/powerautomate/ffffff' },
      { name: 'SharePoint', icon: 'https://cdn.simpleicons.org/microsoftsharepoint/ffffff' },
    ],
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
    tools: [
      { name: 'Power Automate', icon: 'https://cdn.simpleicons.org/powerautomate/ffffff' },
      { name: 'Playwright', icon: 'https://cdn.simpleicons.org/playwright/ffffff' },
      { name: 'Word', icon: 'https://cdn.simpleicons.org/microsoftword/ffffff' },
    ],
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
    tools: [
      { name: 'Power Automate', icon: 'https://cdn.simpleicons.org/powerautomate/ffffff' },
      { name: 'Teams', icon: 'https://cdn.simpleicons.org/microsoftteams/ffffff' },
      { name: 'Office 365', icon: 'https://cdn.simpleicons.org/microsoftoffice/ffffff' },
    ],
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
    tools: [
      { name: 'Power BI', icon: 'https://cdn.simpleicons.org/powerbi/ffffff' },
      { name: 'SharePoint', icon: 'https://cdn.simpleicons.org/microsoftsharepoint/ffffff' },
    ],
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
      <div className="lg:col-span-5 flex flex-col gap-5">
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
              className={`text-left rounded-xl p-5 transition-all duration-300 cursor-pointer flex flex-col justify-center border-[3px] ${
                isActive
                  ? 'border-white shadow-[0_10px_30px_rgba(0,0,0,0.2)] scale-[1.03] z-10'
                  : 'border-transparent shadow-md hover:scale-[1.01]'
              }`}
              style={{
                backgroundColor: p.solidColor,
                color: '#FFFFFF',
              }}
            >
              <h3 className="font-bold text-[17px] text-white tracking-tight mb-3">
                {p.title}
              </h3>
              
              {/* Tool Icons Row */}
              <div className="flex flex-wrap items-center gap-3">
                {p.tools.map((tool, tIdx) => (
                  <div key={tIdx} className="flex items-center gap-1.5 bg-black/15 px-2.5 py-1 rounded-md">
                    <img src={tool.icon} alt={tool.name} className="w-3.5 h-3.5 object-contain" />
                    <span className="text-[11px] font-semibold text-white tracking-wide whitespace-nowrap">{tool.name}</span>
                  </div>
                ))}
              </div>
            </motion.button>
          );
        })}
      </div>

      {/* Right Column: Clean White Presentation Board */}
      <div className="lg:col-span-7 flex flex-col gap-5">
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="w-full bg-white rounded-2xl shadow-xl overflow-hidden flex flex-col"
        >
          {/* Header */}
          <div className="flex items-center justify-between p-5 border-b border-gray-100 bg-white">
            <div className="flex items-center gap-3">
              <span
                className="w-3.5 h-3.5 rounded-full shadow-inner"
                style={{ backgroundColor: active.solidColor }}
              />
              <h2 className="text-lg font-extrabold text-[#00B1A9] tracking-tight">
                {active.title}
              </h2>
            </div>
            
            {active.slides.length > 1 && (
              <div className="flex items-center gap-2">
                {active.slides.map((_, sIdx) => (
                  <button
                    key={sIdx}
                    onClick={() => setSlideIdx(sIdx)}
                    className={`h-2.5 rounded-full transition-all ${
                      sIdx === slideIdx 
                        ? 'w-8 shadow-sm' 
                        : 'w-2.5 bg-gray-200 hover:bg-gray-300'
                    }`}
                    style={{ backgroundColor: sIdx === slideIdx ? active.solidColor : '' }}
                  />
                ))}
              </div>
            )}
          </div>

          {/* Screenshot Display Box - Clean White Background, Object Contain */}
          <div className="relative w-full aspect-[16/10] bg-[#F8FAFC] flex items-center justify-center p-2">
            <AnimatePresence mode="wait">
              <motion.img
                key={`${activeIdx}-${slideIdx}`}
                src={active.slides[slideIdx].src}
                alt={active.slides[slideIdx].title}
                initial={{ opacity: 0, scale: 0.98 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3 }}
                className="w-full h-full object-contain drop-shadow-sm rounded"
              />
            </AnimatePresence>
          </div>

          {/* Clean minimal caption */}
          <div className="py-3 px-5 border-t border-gray-100 bg-white flex items-center justify-between text-xs font-semibold text-slate-500">
            <span>{active.slides[slideIdx].title}</span>
            <span>{slideIdx + 1} / {active.slides.length}</span>
          </div>
        </motion.div>

        {/* Dedicated Description Box in pristine white */}
        <div className="bg-white rounded-xl p-5 shadow-lg border border-gray-50">
          <div className="text-xs font-bold text-[#00B1A9] uppercase tracking-wider mb-2">
            System Overview
          </div>
          <p className="text-[15px] text-slate-700 leading-relaxed font-medium">
            {active.desc}
          </p>
        </div>
      </div>
    </div>
  );
};

export default PetronasShowcase;
