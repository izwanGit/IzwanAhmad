import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import { 
  ExternalLink, 
  FolderGit2, 
  Trophy, 
  ArrowRight, 
  Code2, 
  Award, 
  Terminal, 
  Layers, 
  Sparkles, 
  LayoutGrid, 
  Search,
  CheckCircle2
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

  // Flattened skill list for the floating icon grid
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
            SECTION 1: HERO HEADER & BRANDED METRICS
        ============================================================ */}
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="relative rounded-3xl bg-[#0C1A20] text-white p-8 sm:p-12 md:p-14 mb-20 overflow-hidden border border-[#0E7490]/40 shadow-2xl"
        >
          {/* Subtle Ambient Radial Glow */}
          <div className="absolute -top-24 -right-24 w-96 h-96 bg-[#0E7490]/30 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute -bottom-24 -left-24 w-96 h-96 bg-[#06B6D4]/20 rounded-full blur-3xl pointer-events-none" />

          <div className="relative z-10 max-w-3xl">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#0E7490]/30 border border-[#06B6D4]/40 text-xs font-extrabold text-[#06B6D4] uppercase tracking-widest mb-6">
              <FolderGit2 size={14} className="text-[#06B6D4]" />
              <span>Flagship Engineering & Systems</span>
            </div>
            
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-black tracking-tight text-white leading-[1.1] mb-6">
              Engineering <span className="text-[#06B6D4]">Systems</span> &<br />
              <span className="text-[#0E7490]">Technical Stack.</span>
            </h1>
            
            <p className="text-base sm:text-lg text-[#94A3B8] font-medium leading-relaxed mb-10 max-w-2xl">
              Explore 16 production applications, computer vision models, and enterprise workflow engines. Click any project card to view complete architecture specs and live screenshots.
            </p>

            {/* Quick Metrics Cards */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 sm:gap-6 pt-6 border-t border-white/10">
              <div className="bg-white/5 backdrop-blur-md rounded-2xl p-4 border border-white/10">
                <div className="text-2xl sm:text-3xl font-black text-white">16+</div>
                <div className="text-[11px] font-bold text-[#06B6D4] uppercase tracking-wider mt-1">Production Systems</div>
              </div>
              <div className="bg-white/5 backdrop-blur-md rounded-2xl p-4 border border-white/10">
                <div className="text-2xl sm:text-3xl font-black text-[#06B6D4]">60+</div>
                <div className="text-[11px] font-bold text-[#94A3B8] uppercase tracking-wider mt-1">Verified Tech Skills</div>
              </div>
              <div className="bg-white/5 backdrop-blur-md rounded-2xl p-4 border border-white/10">
                <div className="text-2xl sm:text-3xl font-black text-white">11+</div>
                <div className="text-[11px] font-bold text-[#06B6D4] uppercase tracking-wider mt-1">Awards & Honors</div>
              </div>
              <div className="bg-white/5 backdrop-blur-md rounded-2xl p-4 border border-white/10">
                <div className="text-2xl sm:text-3xl font-black text-[#06B6D4]">100%</div>
                <div className="text-[11px] font-bold text-[#94A3B8] uppercase tracking-wider mt-1">End-to-End Built</div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* ============================================================
            SECTION 2: FEATURED FLAGSHIP BENCHMARKS (DEVICE MOCKUPS)
        ============================================================ */}
        <div className="mb-28">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-10 pb-4 border-b-2 border-border">
            <div>
              <span className="text-xs font-extrabold uppercase tracking-widest text-[#06B6D4] block mb-1">Top Tier Accomplishments</span>
              <h2 className="text-2xl sm:text-3xl font-bold text-[#0C1A20]">Featured Benchmark Systems</h2>
            </div>
            <span className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-white border border-border text-xs font-bold text-[#0E7490] shadow-2xs">
              <Trophy size={14} className="text-[#06B6D4]" />
              4 Production Showcases
            </span>
          </div>

          <div className="grid lg:grid-cols-2 gap-8">
            {featuredProjects.map((project, idx) => (
              <motion.div
                key={project.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
              >
                <Link 
                  to={`/projects/${project.id}`}
                  className="block h-full group bg-white border border-border hover:border-[#06B6D4] rounded-3xl overflow-hidden shadow-2xs hover:shadow-xl transition-all duration-500 flex flex-col transform-gpu hover:-translate-y-1"
                >
                  {/* Device-Aware Mockup Header */}
                  <div className="bg-gradient-to-br from-[#0C1A20] via-[#0E7490]/30 to-[#0C1A20] p-6 sm:p-8 flex justify-center items-center min-h-[260px] relative overflow-hidden border-b border-border">
                    {/* Ambient Glow */}
                    <div className="absolute inset-0 bg-radial from-[#06B6D4]/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />

                    {project.imageType === 'phone' ? (
                      /* Phone Frame Mockup */
                      <div className="w-[180px] sm:w-[200px] rounded-[32px] bg-[#0C1A20] p-2 border-2 border-slate-700 shadow-2xl relative group-hover:scale-105 transition-transform duration-500">
                        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-20 h-3.5 bg-slate-800 rounded-b-lg z-10" />
                        <div className="rounded-[24px] overflow-hidden aspect-[9/19.5] bg-black">
                          <img 
                            src={project.image} 
                            alt={project.title}
                            className="w-full h-full object-cover"
                          />
                        </div>
                      </div>
                    ) : (
                      /* macOS Window Mockup */
                      <div className="w-full max-w-md rounded-xl bg-[#0C1A20] border border-white/15 shadow-2xl overflow-hidden group-hover:scale-102 transition-transform duration-500">
                        <div className="bg-slate-900 px-3 py-2 flex items-center gap-1.5 border-b border-white/10">
                          <div className="w-2.5 h-2.5 rounded-full bg-[#EF4444]" />
                          <div className="w-2.5 h-2.5 rounded-full bg-[#F59E0B]" />
                          <div className="w-2.5 h-2.5 rounded-full bg-[#10B981]" />
                          <div className="ml-2 flex-grow bg-slate-950 rounded px-2 py-0.5 text-[10px] font-mono text-slate-400 truncate">
                            https://izwan.dev/{project.id}
                          </div>
                        </div>
                        <div className="aspect-[16/10] overflow-hidden bg-slate-950">
                          <img 
                            src={project.image} 
                            alt={project.title}
                            className="w-full h-full object-cover object-top"
                          />
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Card Content Body */}
                  <div className="p-6 sm:p-8 flex flex-col flex-grow">
                    <div className="flex items-center justify-between gap-2 mb-2">
                      <span className="text-xs font-extrabold uppercase tracking-widest text-[#0E7490]">
                        {project.category}
                      </span>
                      <span className="text-xs font-bold text-muted-foreground bg-[#F5F9FA] px-2.5 py-1 rounded-md border border-border">
                        {project.year}
                      </span>
                    </div>

                    <h3 className="text-xl font-bold text-[#0C1A20] group-hover:text-[#0E7490] transition-colors mb-2 leading-snug">
                      {project.title}
                    </h3>

                    <p className="text-sm text-muted-foreground leading-relaxed mb-6 line-clamp-2">
                      {project.tagline}
                    </p>

                    {/* Award Chip inline */}
                    {project.awards && project.awards[0] && (
                      <div className="mb-6">
                        <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-[#FFFBEB] text-[#B45309] text-xs font-bold rounded-lg border border-[#FCD34D]">
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
                    <div className="pt-4 border-t border-border flex items-center justify-between text-xs font-bold text-[#0E7490] group-hover:text-[#06B6D4]">
                      <span>View Full System Details</span>
                      <ArrowRight size={15} className="group-hover:translate-x-1 transition-transform" />
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>

        {/* ============================================================
            SECTION 3: FLOATING ICON SKILLS SHOWCASE (DARK THEME)
        ============================================================ */}
        <div className="mb-28 rounded-3xl bg-[#0C1A20] text-white p-8 sm:p-12 md:p-14 border border-[#0E7490]/40 shadow-2xl relative overflow-hidden">
          {/* Ambient Glow */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full bg-radial from-[#0E7490]/20 to-transparent pointer-events-none" />

          <div className="relative z-10">
            <div className="max-w-2xl mb-10">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#0E7490]/30 border border-[#06B6D4]/40 text-xs font-extrabold text-[#06B6D4] uppercase tracking-widest mb-4">
                <Sparkles size={14} className="text-[#06B6D4]" />
                <span>Interactive Capabilities Grid</span>
              </div>
              <h2 className="text-3xl sm:text-4xl font-black text-white mb-4">
                Technical Stack & Domain Expertise
              </h2>
              <p className="text-[#94A3B8] text-sm sm:text-base leading-relaxed">
                60+ verified technologies across languages, AI models, cloud frameworks, and enterprise automation engines. Select a category below to filter.
              </p>
            </div>

            {/* Category Filter Pills */}
            <div className="flex flex-wrap gap-2 mb-10 pb-4 border-b border-white/10">
              <button
                onClick={() => setActiveSkillCategory('all')}
                className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
                  activeSkillCategory === 'all'
                    ? 'bg-[#0E7490] text-white shadow-lg shadow-[#0E7490]/30'
                    : 'bg-white/5 hover:bg-white/10 text-slate-300 border border-white/10'
                }`}
              >
                All Skills ({allSkills.length})
              </button>
              {skillCategories.map(cat => (
                <button
                  key={cat.id}
                  onClick={() => setActiveSkillCategory(cat.id)}
                  className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
                    activeSkillCategory === cat.id
                      ? 'bg-[#0E7490] text-white shadow-lg shadow-[#0E7490]/30'
                      : 'bg-white/5 hover:bg-white/10 text-slate-300 border border-white/10'
                  }`}
                >
                  {cat.title}
                </button>
              ))}
            </div>

            {/* Floating Glassmorphic Icon Cards Grid */}
            <motion.div 
              layout
              className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4"
            >
              <AnimatePresence>
                {filteredSkills.map((skill, idx) => {
                  const SkillIcon = skill.icon;
                  return (
                    <motion.div
                      layout
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.9 }}
                      transition={{ duration: 0.3, delay: idx * 0.02 }}
                      key={`${skill.categoryId}-${skill.name}`}
                      className="group bg-white/5 hover:bg-white/10 border border-white/10 hover:border-[#06B6D4]/60 rounded-2xl p-4 flex flex-col items-center justify-center text-center backdrop-blur-md transition-all duration-300 hover:-translate-y-1 shadow-lg hover:shadow-[#06B6D4]/10 cursor-default"
                    >
                      {/* Big Brand Icon with Glow */}
                      <div className="w-12 h-12 rounded-xl bg-white/5 flex items-center justify-center mb-3 group-hover:scale-110 transition-transform duration-300 border border-white/5">
                        <SkillIcon className="text-2xl transition-transform" style={{ color: skill.color }} />
                      </div>
                      <span className="text-xs font-bold text-slate-200 group-hover:text-white leading-tight">
                        {skill.name}
                      </span>
                    </motion.div>
                  );
                })}
              </AnimatePresence>
            </motion.div>
          </div>
        </div>

        {/* ============================================================
            SECTION 4: COMPLETE ENGINEERING ARCHIVE (FILTERABLE GRID)
        ============================================================ */}
        <div>
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10 pb-6 border-b-2 border-border">
            <div>
              <span className="text-xs font-extrabold uppercase tracking-widest text-[#06B6D4] block mb-2">Complete Archive</span>
              <h2 className="text-3xl font-bold text-[#0C1A20] mb-2">All 16 Engineering Projects</h2>
              <p className="text-sm text-muted-foreground">Click any card to open the complete system design, metrics, and screenshots.</p>
            </div>

            {/* Filter Tabs & Search */}
            <div className="flex flex-col sm:flex-row gap-3 items-stretch sm:items-center">
              {/* Search input */}
              <div className="relative">
                <Search size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-muted-foreground" />
                <input
                  type="text"
                  placeholder="Search projects or stack..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-9 pr-4 py-2 text-xs font-semibold bg-white border border-border rounded-xl focus:outline-none focus:border-[#0E7490] w-full sm:w-56 shadow-2xs"
                />
              </div>

              {/* Category Filter */}
              <div className="flex items-center gap-1.5 bg-white p-1 rounded-xl border border-border shadow-2xs overflow-x-auto">
                {(['all', 'web', 'mobile', 'ai', 'enterprise'] as const).map(cat => (
                  <button
                    key={cat}
                    onClick={() => setActiveCategory(cat)}
                    className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all capitalize whitespace-nowrap ${
                      activeCategory === cat
                        ? 'bg-[#0E7490] text-white shadow-sm'
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
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {filteredProjects.map((project, idx) => (
              <motion.div
                key={project.id}
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.3, delay: idx * 0.04 }}
              >
                <Link
                  to={`/projects/${project.id}`}
                  className="bg-white border border-border rounded-2xl p-6 shadow-2xs hover:shadow-xl hover:border-[#06B6D4] transition-all duration-300 flex flex-col h-full group hover:-translate-y-1"
                >
                  {/* Thumbnail Mockup */}
                  <div className="w-full aspect-video rounded-xl overflow-hidden bg-[#0C1A20] border border-border mb-5 relative group-hover:scale-102 transition-transform duration-500">
                    <img
                      src={project.image}
                      alt={project.title}
                      className="w-full h-full object-cover object-top opacity-90 group-hover:opacity-100 transition-opacity"
                    />
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

                    <p className="text-xs text-muted-foreground leading-relaxed mb-6 line-clamp-2 flex-grow">
                      {project.tagline}
                    </p>

                    {/* Tech Tags */}
                    <div className="flex flex-wrap gap-1 mb-6 pt-3 border-t border-border">
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
                    <div className="flex items-center justify-between pt-3 border-t border-border text-xs font-bold text-[#0E7490] group-hover:text-[#06B6D4] mt-auto">
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
