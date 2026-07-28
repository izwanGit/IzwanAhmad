import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import { 
  FolderGit2, 
  Trophy, 
  ArrowRight, 
  Award, 
  Sparkles, 
  Search,
  CheckCircle2,
  Terminal,
  Layers
} from 'lucide-react';
import { projects, featuredProjectIds, skillCategories, type Project } from '../data/projectData';

const Projects = () => {
  const [activeCategory, setActiveCategory] = useState<'all' | 'web' | 'mobile' | 'ai' | 'enterprise'>('all');
  const [activeSkillCategory, setActiveSkillCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [skillViewMode, setSkillViewMode] = useState<'bubble' | 'chips'>('bubble');

  // Filter projects by category and search term
  const filteredProjects = projects.filter(p => {
    const matchesCategory = activeCategory === 'all' || p.categories.includes(activeCategory);
    const matchesSearch = searchQuery === '' || 
      p.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
      p.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.tags.some(t => t.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesCategory && matchesSearch;
  });

  const featuredProjects = projects.filter(p => featuredProjectIds.includes(p.id));

  // Flattened skill list for compact showcase
  const allSkills = skillCategories.flatMap(cat => 
    cat.skills.map(s => ({ ...s, categoryId: cat.id, categoryTitle: cat.title }))
  );

  const filteredSkills = activeSkillCategory === 'all' 
    ? allSkills 
    : allSkills.filter(s => s.categoryId === activeSkillCategory);

  return (
    <div className="w-full pt-28 pb-28 bg-[#F5F9FA] min-h-screen">
      <div className="container mx-auto px-6 max-w-7xl">
        
        {/* ============================================================
            SECTION 1: HERO HEADER & BRANDED METRICS (LIGHT FLAGSHIP)
        ============================================================ */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="bg-white border border-border rounded-3xl p-8 sm:p-10 md:p-12 mb-16 shadow-xs relative overflow-hidden"
        >
          {/* Subtle Accent Glow */}
          <div className="absolute top-0 right-0 w-80 h-80 bg-gradient-to-bl from-[#06B6D4]/10 via-[#0E7490]/5 to-transparent rounded-full blur-2xl pointer-events-none" />

          <div className="relative z-10 max-w-3xl">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#F5F9FA] border border-border shadow-2xs text-xs font-bold text-[#0E7490] uppercase tracking-widest mb-5">
              <FolderGit2 size={14} className="text-[#06B6D4]" />
              <span>Flagship Engineering Portfolio</span>
            </div>
            
            <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight text-[#0C1A20] leading-[1.15] mb-5">
              Selected Work &<br />
              <span className="text-[#0E7490]">Technical Stack.</span>
            </h1>
            
            <p className="text-base sm:text-lg text-muted-foreground leading-relaxed mb-8 max-w-2xl">
              A curated archive of 16 production systems, AI models, and enterprise workflow automations — engineered for zero-lag performance, robust security, and measurable business impact.
            </p>

            {/* Quick Metrics Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 sm:gap-6 pt-6 border-t border-border">
              <div>
                <div className="text-2xl sm:text-3xl font-black text-[#0C1A20]">16+</div>
                <div className="text-xs font-bold text-muted-foreground uppercase tracking-wider mt-0.5">Production Systems</div>
              </div>
              <div>
                <div className="text-2xl sm:text-3xl font-black text-[#0E7490]">60+</div>
                <div className="text-xs font-bold text-muted-foreground uppercase tracking-wider mt-0.5">Verified Tech Skills</div>
              </div>
              <div>
                <div className="text-2xl sm:text-3xl font-black text-[#0C1A20]">11+</div>
                <div className="text-xs font-bold text-muted-foreground uppercase tracking-wider mt-0.5">Awards & Honors</div>
              </div>
              <div>
                <div className="text-2xl sm:text-3xl font-black text-[#06B6D4]">100%</div>
                <div className="text-xs font-bold text-muted-foreground uppercase tracking-wider mt-0.5">Solo & End-to-End</div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* ============================================================
            SECTION 2: FEATURED FLAGSHIP SHOWCASES (LIGHT DEVICE MOCKUPS)
        ============================================================ */}
        <div className="mb-20">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8 pb-4 border-b-2 border-border">
            <div>
              <span className="text-xs font-extrabold uppercase tracking-widest text-[#06B6D4] block mb-1">Top Tier Systems</span>
              <h2 className="text-2xl sm:text-3xl font-bold text-[#0C1A20]">Featured Flagship Showcases</h2>
            </div>
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white border border-border text-xs font-bold text-[#0E7490] shadow-2xs">
              <Trophy size={13} className="text-[#06B6D4]" />
              4 Benchmark Projects
            </span>
          </div>

          <div className="grid lg:grid-cols-2 gap-8">
            {featuredProjects.map((project, idx) => (
              <motion.div
                key={project.id}
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: idx * 0.08 }}
              >
                <Link 
                  to={`/projects/${project.id}`}
                  className="block h-full group bg-white border border-border hover:border-[#06B6D4] rounded-3xl overflow-hidden shadow-xs hover:shadow-card transition-all duration-300 flex flex-col hover:-translate-y-0.5"
                >
                  {/* Device-Aware Mockup Header — Equal Height for Both Beruang & RentVerse */}
                  <div 
                    className="p-5 sm:p-6 flex justify-center items-center h-[300px] sm:h-[330px] relative overflow-hidden border-b border-border/80"
                    style={{ backgroundColor: (project.imageType === 'phone' || project.mobileBgColor) ? (project.mobileBgColor || '#5C4634') : undefined }}
                  >
                    {project.imageType === 'phone' ? (
                      /* Mobile App UI Brand Background & Phone Mockup */
                      <>
                        <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-transparent to-black/30 pointer-events-none" />
                        <div className="w-[140px] sm:w-[155px] rounded-[26px] bg-slate-950 p-1.5 border-2 border-white/20 shadow-2xl relative z-10 group-hover:scale-103 transition-transform duration-300">
                          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-14 h-2.5 bg-slate-900 rounded-b-md z-10" />
                          <div className="rounded-[20px] overflow-hidden aspect-[9/19.5] bg-black">
                            <img 
                              src={project.image} 
                              alt={project.title}
                              className="w-full h-full object-cover object-top"
                            />
                          </div>
                        </div>
                      </>
                    ) : (
                      /* Brand Color Background OR Vibrant Blurred Image Backdrop */
                      <>
                        {project.mobileBgColor ? (
                          <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-transparent to-black/30 pointer-events-none" />
                        ) : (
                          <div className="absolute inset-0 overflow-hidden pointer-events-none">
                            <img 
                              src={project.image} 
                              alt="" 
                              aria-hidden="true" 
                              className="w-full h-full object-cover scale-105 blur-[6px] opacity-90 group-hover:scale-110 transition-transform duration-500"
                            />
                            <div className="absolute inset-0 bg-black/15 group-hover:bg-black/10 transition-colors duration-500" />
                          </div>
                        )}
                        <div className="w-full max-w-[400px] sm:max-w-[440px] rounded-xl bg-white border border-slate-300/80 shadow-2xl overflow-hidden relative z-10 group-hover:scale-102 transition-transform duration-300">
                          <div className="bg-slate-100 px-3 py-2 flex items-center gap-1.5 border-b border-slate-200">
                            <div className="w-2.5 h-2.5 rounded-full bg-[#EF4444]" />
                            <div className="w-2.5 h-2.5 rounded-full bg-[#F59E0B]" />
                            <div className="w-2.5 h-2.5 rounded-full bg-[#10B981]" />
                            <div className="ml-2 flex-grow bg-white rounded px-2 py-0.5 text-[10px] font-mono text-slate-500 truncate border border-slate-200">
                              https://izwan.dev/{project.id}
                            </div>
                          </div>
                          <div className="w-full overflow-hidden bg-white">
                            <img 
                              src={project.image} 
                              alt={project.title}
                              className="w-full h-auto block"
                            />
                          </div>
                        </div>
                      </>
                    )}
                  </div>

                  {/* Card Content Body */}
                  <div className="p-6 sm:p-7 flex flex-col flex-grow">
                    <div className="flex items-center justify-between gap-2 mb-2">
                      <span className="text-xs font-extrabold uppercase tracking-widest text-[#0E7490]">
                        {project.category}
                      </span>
                      <span className="text-[11px] font-bold text-muted-foreground bg-[#F5F9FA] px-2.5 py-0.5 rounded border border-border">
                        {project.year}
                      </span>
                    </div>

                    <h3 className="text-xl font-bold text-[#0C1A20] group-hover:text-[#0E7490] transition-colors mb-2 leading-snug">
                      {project.title}
                    </h3>

                    <p className="text-sm text-muted-foreground leading-relaxed mb-5 line-clamp-2">
                      {project.tagline}
                    </p>

                    {/* Award Chip inline */}
                    {project.awards && project.awards[0] && (
                      <div className="mb-5">
                        <span className="inline-flex items-center gap-1.5 px-2.5 py-1 bg-[#FFFBEB] text-[#B45309] text-xs font-bold rounded-lg border border-[#FCD34D] shadow-2xs">
                          <Award size={13} className="text-[#D97706] shrink-0" />
                          <span>{project.awards[0]}</span>
                        </span>
                      </div>
                    )}

                    {/* Tech Tags */}
                    <div className="flex flex-wrap gap-1.5 mb-6 mt-auto">
                      {project.tags.slice(0, 4).map((tag, i) => (
                        <span key={i} className="px-2.5 py-1 bg-[#F5F9FA] text-[#0C1A20] text-xs font-semibold rounded-md border border-borderStrong">
                          {tag}
                        </span>
                      ))}
                    </div>

                    {/* Click CTA */}
                    <div className="pt-3.5 border-t border-border flex items-center justify-between text-xs font-bold text-[#0E7490] group-hover:text-[#06B6D4]">
                      <span>View Project Details</span>
                      <ArrowRight size={15} className="group-hover:translate-x-1 transition-transform" />
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>

        {/* ============================================================
            SECTION 3: COMPACT & REFINED SKILLS SHOWCASE (LIGHT THEME)
        ============================================================ */}
        <div className="mb-20 bg-white border border-border rounded-3xl p-6 sm:p-8 shadow-xs">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#F5F9FA] border border-border text-xs font-bold text-[#0E7490] uppercase tracking-widest mb-2">
                <Terminal size={13} className="text-[#06B6D4]" />
                <span>Verified Capabilities</span>
              </div>
              <h2 className="text-xl sm:text-2xl font-bold text-[#0C1A20]">
                Technical Stack & Domain Expertise
              </h2>
            </div>
            
            {/* Bubble Category Pills */}
            <div className="flex flex-wrap gap-2">
              <button
                onClick={() => setActiveSkillCategory('all')}
                className={`px-4 py-1.5 rounded-full text-xs font-bold transition-all cursor-pointer ${
                  activeSkillCategory === 'all'
                    ? 'bg-[#0E7490] text-white shadow-xs scale-102'
                    : 'bg-white text-muted-foreground hover:text-[#0C1A20] border border-border shadow-2xs hover:border-[#06B6D4]'
                }`}
              >
                All ({allSkills.length})
              </button>
              {skillCategories.map(cat => (
                <button
                  key={cat.id}
                  onClick={() => setActiveSkillCategory(cat.id)}
                  className={`px-4 py-1.5 rounded-full text-xs font-bold transition-all cursor-pointer ${
                    activeSkillCategory === cat.id
                      ? 'bg-[#0E7490] text-white shadow-xs scale-102'
                      : 'bg-white text-muted-foreground hover:text-[#0C1A20] border border-border shadow-2xs hover:border-[#06B6D4]'
                  }`}
                >
                  {cat.title}
                </button>
              ))}
            </div>
          </div>

          {/* Authentic Circle Bubble Cloud (Organically Scattered Packed Chart) */}
          <div className="relative p-6 sm:p-12 rounded-3xl bg-[#F5F9FA]/80 border border-border overflow-hidden min-h-[520px] flex items-center justify-center">
            {/* Ambient Background Radial Glow */}
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(6,182,212,0.12)_0%,transparent_70%)] pointer-events-none" />

            {/* Floating Decorative Accent Micro-Bubbles in Gaps */}
            <motion.div 
              animate={{ y: [-8, 8, -8], x: [-5, 5, -5] }}
              transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
              className="absolute top-12 left-16 w-8 h-8 rounded-full bg-[#F43F5E]/60 shadow-[0_4px_12px_rgba(244,63,94,0.4)] pointer-events-none" 
            />
            <motion.div 
              animate={{ y: [6, -6, 6], x: [4, -4, 4] }}
              transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
              className="absolute bottom-14 left-20 w-10 h-10 rounded-full bg-[#10B981]/60 shadow-[0_4px_12px_rgba(16,185,129,0.4)] pointer-events-none" 
            />
            <motion.div 
              animate={{ y: [-6, 10, -6], x: [-6, 4, -6] }}
              transition={{ duration: 5.5, repeat: Infinity, ease: "easeInOut" }}
              className="absolute top-16 right-20 w-9 h-9 rounded-full bg-[#3B82F6]/60 shadow-[0_4px_12px_rgba(59,130,246,0.4)] pointer-events-none" 
            />
            <motion.div 
              animate={{ y: [8, -8, 8], x: [5, -5, 5] }}
              transition={{ duration: 4.8, repeat: Infinity, ease: "easeInOut" }}
              className="absolute bottom-12 right-24 w-7 h-7 rounded-full bg-[#8B5CF6]/60 shadow-[0_4px_12px_rgba(139,92,246,0.4)] pointer-events-none" 
            />

            <div className="flex flex-wrap items-center justify-center -space-x-3 sm:-space-x-6 -space-y-4 sm:-space-y-6 max-w-5xl relative z-10 py-8 px-2">
              <AnimatePresence>
                {filteredSkills.map((skill, idx) => {
                  const SkillIcon = skill.icon;
                  
                  // Use exact original brand color for each skill logo
                  const rawColor = skill.color || '#06B6D4';
                  const isWhite = rawColor.toUpperCase() === '#FFFFFF' || rawColor.toUpperCase() === '#FFF';
                  const isYellow = rawColor.toUpperCase() === '#F7DF1E' || rawColor.toUpperCase() === '#E6AD00';

                  const bubbleBg = isWhite ? '#0C1A20' : rawColor;
                  const textColor = isYellow ? '#0C1A20' : '#FFFFFF';

                  // Proficiency-driven bubble sizes matching D3 circle packing reference
                  const lvl = skill.level || 1;
                  const sizeClass = 
                    lvl === 3
                      ? 'w-32 h-32 sm:w-40 sm:h-40 text-xs sm:text-base font-black p-3'
                      : lvl === 2
                      ? 'w-20 h-20 sm:w-26 sm:h-26 text-[11px] sm:text-xs font-bold p-2'
                      : 'w-14 h-14 sm:w-18 sm:h-18 text-[9px] sm:text-[10px] font-semibold p-1';

                  // Staggered negative nesting margins so bubbles tuck into each other
                  const staggerMargin = 
                    idx % 6 === 0 ? '-mt-6 sm:-mt-10 -ml-3' :
                    idx % 5 === 0 ? 'mt-6 sm:mt-8 -ml-4' :
                    idx % 4 === 0 ? '-mt-4 sm:-mt-7 ml-3' :
                    idx % 3 === 0 ? 'mt-4 sm:mt-6 -mr-3' :
                    idx % 2 === 0 ? '-mt-6 sm:-mt-8 ml-2' : 'mt-2 -ml-2';

                  const floatDuration = 3.5 + (idx % 5) * 0.4;
                  const floatY = idx % 2 === 0 ? [-5, 5, -5] : [5, -5, 5];
                  const floatX = idx % 3 === 0 ? [-3, 3, -3] : [3, -3, 3];

                  return (
                    <motion.div
                      layout
                      initial={{ opacity: 0, scale: 0.4 }}
                      animate={{ 
                        opacity: 1, 
                        scale: 1,
                        y: floatY,
                        x: floatX,
                      }}
                      exit={{ opacity: 0, scale: 0.4 }}
                      transition={{ 
                        layout: { duration: 0.3 },
                        opacity: { duration: 0.25 },
                        scale: { duration: 0.25 },
                        y: { duration: floatDuration, repeat: Infinity, ease: 'easeInOut' },
                        x: { duration: floatDuration * 1.2, repeat: Infinity, ease: 'easeInOut' }
                      }}
                      key={`${skill.categoryId}-${skill.name}`}
                      style={{ 
                        backgroundColor: bubbleBg,
                        color: textColor,
                        boxShadow: `0 10px 28px -4px ${isWhite ? 'rgba(12,26,32,0.45)' : rawColor + '88'}`,
                      }}
                      className={`${sizeClass} ${staggerMargin} rounded-full transition-all duration-300 cursor-pointer flex flex-col items-center justify-center text-center hover:scale-125 hover:z-50 border-2 sm:border-4 border-white/35 group relative ring-1 ring-black/10`}
                    >
                      <SkillIcon 
                        className={`shrink-0 mb-1 group-hover:scale-125 transition-transform ${
                          lvl === 3 ? 'text-2xl sm:text-3xl' : lvl === 2 ? 'text-lg sm:text-xl' : 'text-sm sm:text-base'
                        }`}
                        style={{ color: textColor }}
                      />
                      <span className="leading-tight tracking-tight font-extrabold px-1 truncate max-w-full">
                        {skill.name}
                      </span>
                    </motion.div>
                  );
                })}
              </AnimatePresence>
            </div>
          </div>
        </div>

        {/* ============================================================
            SECTION 4: COMPLETE ENGINEERING ARCHIVE (LIGHT GRID)
        ============================================================ */}
        <div>
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-8 pb-4 border-b-2 border-border">
            <div>
              <span className="text-xs font-extrabold uppercase tracking-widest text-[#06B6D4] block mb-1">Complete Collection</span>
              <h2 className="text-2xl sm:text-3xl font-bold text-[#0C1A20]">Engineering Archive (16 Systems)</h2>
            </div>

            {/* Filter Tabs & Search */}
            <div className="flex flex-col sm:flex-row gap-3 items-stretch sm:items-center">
              {/* Search input */}
              <div className="relative">
                <Search size={15} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-muted-foreground" />
                <input
                  type="text"
                  placeholder="Search projects or stack..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-9 pr-4 py-1.5 text-xs font-semibold bg-white border border-border rounded-xl focus:outline-none focus:border-[#0E7490] w-full sm:w-56 shadow-2xs"
                />
              </div>

              {/* Category Filter */}
              <div className="flex items-center gap-1 bg-white p-1 rounded-xl border border-border shadow-2xs overflow-x-auto">
                {(['all', 'web', 'mobile', 'ai', 'enterprise'] as const).map(cat => (
                  <button
                    key={cat}
                    onClick={() => setActiveCategory(cat)}
                    className={`px-3 py-1 rounded-lg text-xs font-bold transition-all capitalize whitespace-nowrap ${
                      activeCategory === cat
                        ? 'bg-[#0E7490] text-white shadow-2xs'
                        : 'text-muted-foreground hover:text-[#0C1A20] hover:bg-slate-100'
                    }`}
                  >
                    {cat}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Grid View */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredProjects.map((project, idx) => (
              <motion.div
                key={project.id}
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.3, delay: idx * 0.03 }}
              >
                <Link
                  to={`/projects/${project.id}`}
                  className="bg-white border border-border rounded-2xl p-5 shadow-2xs hover:shadow-card hover:border-[#06B6D4] transition-all duration-300 flex flex-col h-full group hover:-translate-y-0.5"
                >
                  {/* Device Mockup Thumbnail */}
                  <div 
                    className="p-5 sm:p-6 flex justify-center items-center h-[240px] sm:h-[260px] relative overflow-hidden rounded-2xl border border-border mb-5"
                    style={{ backgroundColor: (project.imageType === 'phone' || project.mobileBgColor) ? (project.mobileBgColor || '#5C4634') : undefined }}
                  >
                    {project.imageType === 'phone' ? (
                      /* Mobile App UI Brand Color Background & Dynamic Phone Layout (iPhone vs Android) */
                      <>
                        <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-transparent to-black/30 pointer-events-none" />
                        <div className="h-[200px] sm:h-[220px] aspect-[9/19.5] rounded-[22px] bg-[#1A1B22] p-1.5 border-2 border-slate-700/80 shadow-2xl relative z-10 group-hover:scale-103 transition-transform duration-300 flex flex-col items-center justify-center">
                          {/* Side Buttons */}
                          {project.id === 'play2grow' ? (
                            /* Android Side Buttons */
                            <>
                              <div className="absolute -right-[2px] top-10 w-[2px] h-4 bg-slate-600 rounded-r" />
                              <div className="absolute -right-[2px] top-16 w-[2px] h-8 bg-slate-600 rounded-r" />
                            </>
                          ) : (
                            /* iPhone Side Buttons */
                            <>
                              <div className="absolute -left-[2px] top-10 w-[2px] h-5 bg-slate-600 rounded-l" />
                              <div className="absolute -left-[2px] top-16 w-[2px] h-5 bg-slate-600 rounded-l" />
                              <div className="absolute -right-[2px] top-12 w-[2px] h-8 bg-slate-600 rounded-r" />
                            </>
                          )}

                          {/* Top Notch / Camera Punch-hole */}
                          {project.id === 'play2grow' ? (
                            /* Android Layout: Top Speaker Slit & Camera Punch-hole */
                            <>
                              <div className="absolute top-1 left-1/2 -translate-x-1/2 w-8 h-[2px] bg-[#09090b] rounded-full z-20" />
                              <div className="absolute top-2.5 left-1/2 -translate-x-1/2 w-2.5 h-2.5 bg-black border border-slate-800 rounded-full z-20 flex items-center justify-center">
                                <div className="w-0.5 h-0.5 rounded-full bg-[#1e293b]" />
                              </div>
                            </>
                          ) : (
                            /* iPhone Layout: Dynamic Island Notch */
                            <div className="absolute top-1.5 left-1/2 -translate-x-1/2 w-12 h-2.5 bg-black rounded-full z-20 flex items-center justify-end px-1.5">
                              <div className="w-1 h-1 rounded-full bg-[#0E7490]/80 animate-pulse" />
                            </div>
                          )}

                          {/* Screen Viewport */}
                          <div className="w-full h-full rounded-[16px] overflow-hidden bg-black flex items-center justify-center">
                            <img 
                              src={project.image} 
                              alt={project.title}
                              className="w-full h-full object-cover object-top"
                            />
                          </div>
                        </div>
                      </>
                    ) : (
                      /* Brand Color Background OR Vibrant Blurred Image Backdrop */
                      <>
                        {project.mobileBgColor ? (
                          <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-transparent to-black/30 pointer-events-none" />
                        ) : (
                          <div className="absolute inset-0 overflow-hidden pointer-events-none">
                            <img 
                              src={project.image} 
                              alt="" 
                              aria-hidden="true" 
                              className="w-full h-full object-cover scale-105 blur-[6px] opacity-90 group-hover:scale-110 transition-transform duration-500"
                            />
                            <div className="absolute inset-0 bg-black/15 group-hover:bg-black/10 transition-colors duration-500" />
                          </div>
                        )}
                        <div className="w-full rounded-xl bg-white border border-slate-300 shadow-xl overflow-hidden relative z-10 group-hover:scale-102 transition-transform duration-300">
                          <div className="bg-slate-100 px-3 py-2 flex items-center gap-1.5 border-b border-slate-200">
                            <div className="w-2.5 h-2.5 rounded-full bg-[#EF4444]" />
                            <div className="w-2.5 h-2.5 rounded-full bg-[#F59E0B]" />
                            <div className="w-2.5 h-2.5 rounded-full bg-[#10B981]" />
                            <div className="ml-2 flex-grow bg-white rounded px-2 py-0.5 text-[10px] font-mono text-slate-500 truncate border border-slate-200">
                              https://izwan.dev/{project.id}
                            </div>
                          </div>
                          <div className="w-full overflow-hidden bg-white max-h-[190px] sm:max-h-[210px] flex items-start justify-center">
                            <img 
                              src={project.image} 
                              alt={project.title}
                              className="w-full h-auto block"
                            />
                          </div>
                        </div>
                      </>
                    )}
                  </div>

                  <div className="flex flex-col flex-grow">
                    <div className="flex items-center justify-between gap-2 mb-1.5">
                      <span className="text-[11px] font-extrabold uppercase tracking-wider text-[#0E7490]">
                        {project.category}
                      </span>
                      <span className="text-[11px] font-bold text-muted-foreground">
                        {project.year}
                      </span>
                    </div>

                    <h3 className="text-base font-bold text-[#0C1A20] mb-2 group-hover:text-[#0E7490] transition-colors leading-snug">
                      {project.title}
                    </h3>

                    <p className="text-xs text-muted-foreground leading-relaxed mb-5 line-clamp-2 flex-grow">
                      {project.tagline}
                    </p>

                    {/* Tech Tags */}
                    <div className="flex flex-wrap gap-1 mb-4 pt-2.5 border-t border-border">
                      {project.tags.slice(0, 3).map((tag, i) => (
                        <span
                          key={i}
                          className="px-2.5 py-0.5 bg-[#F5F9FA] text-[#0C1A20] text-[10px] font-bold rounded-full border border-borderStrong"
                        >
                          {tag}
                        </span>
                      ))}
                      {project.tags.length > 3 && (
                        <span className="px-1.5 py-0.5 text-muted-foreground text-[10px] font-semibold">
                          +{project.tags.length - 3}
                        </span>
                      )}
                    </div>

                    {/* Footer */}
                    <div className="flex items-center justify-between pt-2.5 border-t border-border text-xs font-bold text-[#0E7490] group-hover:text-[#06B6D4] mt-auto">
                      <span>View Details</span>
                      <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
};

export default Projects;
