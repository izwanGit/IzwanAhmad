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
                  {/* Device-Aware Mockup Header */}
                  <div 
                    className="p-6 sm:p-8 flex justify-center items-center min-h-[250px] relative overflow-hidden border-b border-border/80"
                    style={{ backgroundColor: project.imageType === 'phone' ? (project.mobileBgColor || '#5C4634') : undefined }}
                  >
                    {project.imageType === 'phone' ? (
                      /* Mobile App UI Brand Background & Phone Mockup */
                      <>
                        <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-transparent to-black/30 pointer-events-none" />
                        <div className="w-[170px] sm:w-[190px] rounded-[28px] bg-slate-950 p-2 border-2 border-white/20 shadow-2xl relative z-10 group-hover:scale-103 transition-transform duration-300">
                          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-16 h-3 bg-slate-900 rounded-b-md z-10" />
                          <div className="rounded-[22px] overflow-hidden aspect-[9/19.5] bg-black">
                            <img 
                              src={project.image} 
                              alt={project.title}
                              className="w-full h-full object-cover object-top"
                            />
                          </div>
                        </div>
                      </>
                    ) : (
                      /* Super Duper Blurred Image Backdrop for Web/Laptop */
                      <>
                        <div className="absolute inset-0 overflow-hidden pointer-events-none">
                          <img 
                            src={project.image} 
                            alt="" 
                            aria-hidden="true" 
                            className="w-full h-full object-cover scale-150 blur-3xl opacity-[0.55] group-hover:opacity-75 transition-opacity duration-500"
                          />
                          <div className="absolute inset-0 bg-slate-950/10 mix-blend-multiply" />
                        </div>
                        <div className="w-full max-w-md rounded-xl bg-white border border-slate-300/80 shadow-2xl overflow-hidden relative z-10 group-hover:scale-102 transition-transform duration-300">
                          <div className="bg-slate-100 px-3 py-2 flex items-center gap-1.5 border-b border-slate-200">
                            <div className="w-2.5 h-2.5 rounded-full bg-[#EF4444]" />
                            <div className="w-2.5 h-2.5 rounded-full bg-[#F59E0B]" />
                            <div className="w-2.5 h-2.5 rounded-full bg-[#10B981]" />
                            <div className="ml-2 flex-grow bg-white rounded px-2 py-0.5 text-[10px] font-mono text-slate-500 truncate border border-slate-200">
                              https://izwan.dev/{project.id}
                            </div>
                          </div>
                          <div className="aspect-[16/10] overflow-hidden bg-slate-50 flex items-center justify-center p-0.5">
                            <img 
                              src={project.image} 
                              alt={project.title}
                              className="w-full h-full object-contain"
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
            
            {/* Compact Category Pills */}
            <div className="flex flex-wrap gap-1.5">
              <button
                onClick={() => setActiveSkillCategory('all')}
                className={`px-3 py-1 rounded-lg text-xs font-bold transition-all ${
                  activeSkillCategory === 'all'
                    ? 'bg-[#0E7490] text-white shadow-2xs'
                    : 'bg-[#F5F9FA] text-muted-foreground hover:text-[#0C1A20] border border-border'
                }`}
              >
                All ({allSkills.length})
              </button>
              {skillCategories.map(cat => (
                <button
                  key={cat.id}
                  onClick={() => setActiveSkillCategory(cat.id)}
                  className={`px-3 py-1 rounded-lg text-xs font-bold transition-all ${
                    activeSkillCategory === cat.id
                      ? 'bg-[#0E7490] text-white shadow-2xs'
                      : 'bg-[#F5F9FA] text-muted-foreground hover:text-[#0C1A20] border border-border'
                  }`}
                >
                  {cat.title}
                </button>
              ))}
            </div>
          </div>

          {/* Compact Skill Chips Grid with Real Colors */}
          <div className="flex flex-wrap gap-2 pt-2">
            <AnimatePresence>
              {filteredSkills.map((skill) => {
                const SkillIcon = skill.icon;
                return (
                  <motion.div
                    layout
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    transition={{ duration: 0.2 }}
                    key={`${skill.categoryId}-${skill.name}`}
                    className="px-3 py-1.5 bg-[#F5F9FA] border border-border hover:border-[#06B6D4] hover:bg-white rounded-lg text-xs font-semibold text-[#0C1A20] transition-all cursor-default flex items-center gap-2 shadow-2xs"
                  >
                    <SkillIcon className="shrink-0 text-sm" style={{ color: skill.color }} />
                    <span>{skill.name}</span>
                  </motion.div>
                );
              })}
            </AnimatePresence>
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
                    style={{ backgroundColor: project.imageType === 'phone' ? (project.mobileBgColor || '#5C4634') : undefined }}
                  >
                    {project.imageType === 'phone' ? (
                      /* Mobile App UI Brand Color Background & Phone Frame */
                      <>
                        <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-transparent to-black/30 pointer-events-none" />
                        <div className="h-full max-h-[200px] sm:max-h-[220px] flex items-center justify-center relative z-10 group-hover:scale-103 transition-transform duration-300">
                          <div className="h-full rounded-[24px] bg-slate-950 p-2 border-2 border-white/20 shadow-2xl relative flex flex-col items-center justify-center">
                            {/* Speaker Notch */}
                            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-12 h-2.5 bg-slate-900 rounded-b-md z-20 flex items-center justify-center">
                              <div className="w-2 h-0.5 bg-slate-700 rounded-full" />
                            </div>
                            <div className="h-full rounded-[18px] overflow-hidden bg-black flex items-center justify-center">
                              <img 
                                src={project.image} 
                                alt={project.title}
                                className="h-full w-auto object-contain"
                              />
                            </div>
                          </div>
                        </div>
                      </>
                    ) : (
                      /* Super Duper Blurred Image Backdrop for Web/Laptop */
                      <>
                        <div className="absolute inset-0 overflow-hidden pointer-events-none">
                          <img 
                            src={project.image} 
                            alt="" 
                            aria-hidden="true" 
                            className="w-full h-full object-cover scale-150 blur-3xl opacity-[0.55] group-hover:opacity-75 transition-opacity duration-500"
                          />
                          <div className="absolute inset-0 bg-slate-950/10 mix-blend-multiply" />
                        </div>
                        <div className="w-full rounded-xl bg-white border border-slate-300 shadow-xl overflow-hidden relative z-10 group-hover:scale-102 transition-transform duration-300">
                          <div className="bg-slate-100 px-3 py-2 flex items-center gap-1.5 border-b border-slate-200">
                            <div className="w-2.5 h-2.5 rounded-full bg-[#EF4444]" />
                            <div className="w-2.5 h-2.5 rounded-full bg-[#F59E0B]" />
                            <div className="w-2.5 h-2.5 rounded-full bg-[#10B981]" />
                            <div className="ml-2 flex-grow bg-white rounded px-2 py-0.5 text-[10px] font-mono text-slate-500 truncate border border-slate-200">
                              https://izwan.dev/{project.id}
                            </div>
                          </div>
                          <div className="aspect-[16/10] overflow-hidden bg-slate-50 flex items-center justify-center p-0.5">
                            <img 
                              src={project.image} 
                              alt={project.title}
                              className="w-full h-full object-contain"
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
                          className="px-2 py-0.5 bg-[#F5F9FA] text-[#0C1A20] text-[10px] font-semibold rounded border border-borderStrong"
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
