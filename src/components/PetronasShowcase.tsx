import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const petronasProjects = [
  {
    id: 'ops-hub',
    title: 'HCSM Operations Hub',
    subtitle: 'Python · Streamlit · Playwright RPA · PyMuPDF',
    color: '#9aad1e',
    desc: 'Unified internal platform automating 3 ITSM workflows. Cut weekly report prep from 3–4 hrs to under 2 min, monthly from 1–2 hrs to under 3 min.',
    slides: [
      '/images/petronas-hub-main.jpg',
      '/images/petronas-hub-wizard.jpg',
      '/images/petronas-hub-weekly.jpg',
      '/images/petronas-hub-monthly.jpg',
      '/images/petronas-hub-pptx.jpg',
    ],
  },
  {
    id: 'weekly',
    title: 'Full Weekly Report Automation',
    subtitle: 'Power Automate · TypeScript · Office Scripts · SharePoint',
    color: '#c8920a',
    desc: 'Zero-touch pipeline running every Monday 7 AM. Processes 4 Excel files, builds PETRONAS-branded HTML emails, and sends Teams @mention reminders.',
    slides: [
      '/images/petronas-weekly-email.jpg',
      '/images/petronas-weekly-reminder.jpg',
    ],
  },
  {
    id: 'monthly',
    title: 'Full Monthly Report Automation',
    subtitle: 'Power BI · DAX · Power Automate REST API · SharePoint',
    color: '#5c2e77',
    desc: 'Runs on the 1st of every month. DAX measures generate executive summary bullets. Power Automate exports to PPTX, archives, and emails leadership.',
    slides: [
      '/images/petronas-monthly-cover.jpg',
      '/images/petronas-monthly-pbi.jpg',
      '/images/petronas-monthly-email.jpg',
      '/images/petronas-monthly-teams.jpg',
    ],
  },
  {
    id: 'predeploy',
    title: 'Pre-Deployment Automation',
    subtitle: 'Power Automate · Playwright · Adaptive Cards · Word',
    color: '#162e70',
    desc: 'Triggered by UAT endorsement emails. Auto-generates OAT Word docs and posts a Teams card with a 1-click Streamlit RPA launcher.',
    slides: [
      '/images/petronas-predeploy-card.jpg',
      '/images/petronas-predeploy-doc.jpg',
      '/images/petronas-predeploy-wizard.jpg',
    ],
  },
  {
    id: 'priority',
    title: 'Priority Ticket Automation',
    subtitle: 'Power Automate · Teams Bot · Office 365 Users API',
    color: '#005e59',
    desc: '24/7 Teams chat listener intercepting urgent ticket mentions. Auto-logs, enriches via Office Scripts, and sends Thursday @mention reminders.',
    slides: [
      '/images/petronas-priority-notif.jpg',
      '/images/petronas-priority-list.jpg',
      '/images/petronas-priority-reminder.jpg',
    ],
  },
  {
    id: 'dashboard',
    title: 'HCSM Ticket Monitoring Dashboard',
    subtitle: 'Power BI · DAX · SharePoint · BMC Helix',
    color: '#016099',
    desc: 'Production Power BI dashboard for 50,000+ employee myCareerX operations. Refined data models, corrected legacy filters, and added new DAX metrics.',
    slides: [
      '/images/petronas-dashboard-page.jpg',
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
    }, 3200);
    return () => clearInterval(t);
  }, [activeIdx, active.slides.length]);

  return (
    <div className="grid lg:grid-cols-12 gap-6 items-start">

      {/* Left: 6 solid-color project cards */}
      <div className="lg:col-span-4 flex flex-col gap-3">
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
              className="text-left rounded-xl px-4 py-3.5 transition-all duration-200 border"
              style={{
                background: isActive ? p.color : `${p.color}30`,
                borderColor: isActive ? `${p.color}` : `${p.color}50`,
                opacity: isActive ? 1 : 0.75,
              }}
            >
              <div className="font-bold text-sm text-white leading-snug mb-0.5">
                {p.title}
              </div>
              <div className="text-[11px] text-white/65 font-mono leading-snug">
                {p.subtitle}
              </div>
            </motion.button>
          );
        })}
      </div>

      {/* Right: Clean browser window with auto-cycling screenshots */}
      <div className="lg:col-span-8">
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="rounded-xl overflow-hidden shadow-2xl border border-white/10"
          style={{ background: '#111217' }}
        >
          {/* Browser chrome */}
          <div className="flex items-center gap-1.5 px-4 py-2.5 border-b border-white/8" style={{ background: '#0a0b0f' }}>
            <span className="w-2.5 h-2.5 rounded-full bg-[#ef4444]/80" />
            <span className="w-2.5 h-2.5 rounded-full bg-[#f59e0b]/80" />
            <span className="w-2.5 h-2.5 rounded-full bg-[#10b981]/80" />
            <div className="mx-auto text-[11px] text-white/40 font-mono px-3 py-1 rounded bg-white/5 border border-white/8">
              {active.id}.hcsm.petronas.internal
            </div>
            <div className="w-12" />
          </div>

          {/* Screenshot area — seamless crossfade */}
          <div className="relative" style={{ aspectRatio: '16/10' }}>
            <AnimatePresence mode="wait">
              <motion.img
                key={`${activeIdx}-${slideIdx}`}
                src={active.slides[slideIdx]}
                alt={active.title}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.35 }}
                className="absolute inset-0 w-full h-full object-cover object-top"
              />
            </AnimatePresence>

            {/* Subtle bottom gradient with project info — clean, no labels */}
            <div className="absolute bottom-0 left-0 right-0 h-24 pointer-events-none"
              style={{ background: 'linear-gradient(to top, rgba(0,0,0,0.82) 0%, transparent 100%)' }}
            />
            <div className="absolute bottom-0 left-0 right-0 px-5 pb-4">
              <div className="text-white font-bold text-sm">{active.title}</div>
              <div className="text-white/60 text-xs leading-relaxed mt-0.5 max-w-xl">{active.desc}</div>
            </div>

            {/* Thin progress bar at very bottom */}
            {active.slides.length > 1 && (
              <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-white/10">
                <motion.div
                  key={`${activeIdx}-${slideIdx}`}
                  className="h-full"
                  style={{ background: active.color }}
                  initial={{ width: '0%' }}
                  animate={{ width: '100%' }}
                  transition={{ duration: 3.2, ease: 'linear' }}
                />
              </div>
            )}
          </div>
        </motion.div>
      </div>

    </div>
  );
};

export default PetronasShowcase;
