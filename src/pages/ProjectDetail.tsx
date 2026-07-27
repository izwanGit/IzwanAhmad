import React, { useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  ArrowLeft, 
  ExternalLink, 
  Code2, 
  Award, 
  CheckCircle2, 
  Sparkles, 
  Terminal, 
  Cpu, 
  ShieldCheck, 
  ArrowRight 
} from 'lucide-react';
import { projects, type Project } from '../data/projectData';

const ProjectDetail = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const project = projects.find(p => p.id === id);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [id]);

  if (!project) {
    return (
      <div className="w-full min-h-screen pt-36 pb-20 bg-[#F5F9FA] flex flex-col items-center justify-center px-6">
        <div className="text-center max-w-md">
          <h1 className="text-3xl font-extrabold text-[#0C1A20] mb-4">Project Not Found</h1>
          <p className="text-muted-foreground mb-8">The project you are looking for does not exist or has been moved.</p>
          <Link 
            to="/projects"
            className="inline-flex items-center gap-2 px-6 py-3 bg-[#0E7490] text-white font-bold rounded-xl hover:bg-[#0E7490]/90 transition-all"
          >
            <ArrowLeft size={16} />
            <span>Back to Projects</span>
          </Link>
        </div>
      </div>
    );
  }

  // Find next and previous projects for navigation
  const currentIndex = projects.findIndex(p => p.id === id);
  const prevProject = projects[(currentIndex - 1 + projects.length) % projects.length];
  const nextProject = projects[(currentIndex + 1) % projects.length];

  // Helper images for showcase gallery
  const getGalleryImages = (p: Project) => {
    if (p.id === 'beruang') {
      return [
        { src: '/images/beruang-mobile.jpg', caption: 'Mobile App Interface & Budget Tracker' },
        { src: '/images/beruang-chatbot.jpg', caption: 'AI Personal Advisor Chatbot (Grok 4.1)' },
        { src: '/images/beruang-dashboard.jpg', caption: 'Visual Analytics & 50/30/20 Breakdown' },
        { src: '/images/beruang-receipt.jpeg', caption: 'Smart OCR Receipt Scanner' }
      ];
    }
    if (p.id === 'petronas-hub') {
      return [
        { src: '/images/petronas-hub-main.jpg', caption: 'PETRONAS HCSM Hub Dashboard' },
        { src: '/images/petronas-hub-monthly.jpg', caption: 'Monthly Automated Report Generator' },
        { src: '/images/petronas-hub-weekly.jpg', caption: 'Weekly ITSM Digest Execution' }
      ];
    }
    if (p.id === 'rentverse') {
      return [
        { src: '/images/rentverse/homepage.jpg', caption: 'RentVerse Marketplace Homepage' },
        { src: '/images/rentverse-home.jpg', caption: 'Property Listings & Zero-Trust Portal' }
      ];
    }
    if (p.id === 'batik') {
      return [
        { src: '/images/batik-main.jpeg', caption: 'Vision Transformer Pattern Classifier' },
        { src: '/images/batik-demo.jpeg', caption: 'Live Camera Quality & Anti-Flicker Check' }
      ];
    }
    if (p.id === 'yulaoshi') {
      return [
        { src: '/images/yulaoshi-main.jpeg', caption: 'YuLaoshi Mandarin AI Tutor Interface' },
        { src: '/images/yulaoshi-chat.jpeg', caption: 'Interactive Listening & Quiz Module' }
      ];
    }
    return [{ src: p.image, caption: p.title }];
  };

  const gallery = getGalleryImages(project);

  return (
    <div className="w-full min-h-screen bg-[#F5F9FA] pt-28 pb-24">
      {/* Top Banner / Hero Header */}
      <section className="bg-[#0C1A20] text-white border-b border-[#0E7490]/30 relative overflow-hidden pt-12 pb-16">
        <div className="absolute inset-0 bg-gradient-to-r from-[#0C1A20] via-[#0E7490]/20 to-[#0C1A20] opacity-70 pointer-events-none" />
        <div className="container mx-auto px-6 max-w-7xl relative z-10">
          {/* Back Button */}
          <Link
            to="/projects"
            className="inline-flex items-center gap-2 text-xs font-extrabold uppercase tracking-widest text-[#06B6D4] hover:text-white transition-colors mb-8 group"
          >
            <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform" />
            <span>Back to Engineering Portfolio</span>
          </Link>

          <div className="grid lg:grid-cols-12 gap-8 items-end">
            <div className="lg:col-span-8">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#0E7490]/20 border border-[#06B6D4]/30 text-xs font-bold text-[#06B6D4] uppercase tracking-widest mb-4">
                <span>{project.category}</span>
                <span className="text-[#0E7490]">•</span>
                <span>{project.year}</span>
              </div>

              <h1 className="text-3xl sm:text-4xl md:text-5xl font-black text-white tracking-tight leading-[1.15] mb-4">
                {project.title}
              </h1>

              <p className="text-lg sm:text-xl text-[#94A3B8] font-medium leading-relaxed max-w-3xl">
                {project.tagline}
              </p>
            </div>

            {/* Quick Actions */}
            <div className="lg:col-span-4 flex flex-wrap lg:justify-end gap-3">
              {project.demo && (
                <a
                  href={project.demo}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-2 px-6 py-3 bg-[#0E7490] text-white font-bold text-sm rounded-xl hover:bg-[#06B6D4] shadow-lg shadow-[#0E7490]/20 transition-all hover:-translate-y-0.5"
                >
                  <span>Launch Live Portal</span>
                  <ExternalLink size={16} />
                </a>
              )}
              {project.github && (
                <a
                  href={project.github}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-2 px-6 py-3 bg-white/10 border border-white/20 text-white font-bold text-sm rounded-xl hover:bg-white/20 hover:border-white/40 transition-all hover:-translate-y-0.5"
                >
                  <Code2 size={16} />
                  <span>GitHub Repository</span>
                </a>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Main Content Area */}
      <section className="container mx-auto px-6 max-w-7xl pt-12">
        <div className="grid lg:grid-cols-12 gap-12 items-start">
          
          {/* Left Column (40%): Metadata, Problem, Solution, Awards, Tech */}
          <div className="lg:col-span-5 space-y-10">
            
            {/* Impact Highlights Grid */}
            {project.impact && project.impact.length > 0 && (
              <div className="bg-white border border-border rounded-2xl p-6 shadow-2xs">
                <div className="text-xs font-extrabold uppercase tracking-widest text-[#0E7490] mb-4 flex items-center gap-2">
                  <Sparkles size={14} className="text-[#06B6D4]" />
                  <span>Key Performance Metrics</span>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  {project.impact.map((metric, idx) => (
                    <div key={idx} className="bg-[#F5F9FA] border border-border rounded-xl p-3.5">
                      <div className="text-lg font-black text-[#0C1A20]">{metric}</div>
                      <div className="text-[11px] font-bold text-muted-foreground uppercase tracking-wider mt-0.5">Verified Result</div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Awards & Recognition */}
            {project.awards && project.awards.length > 0 && (
              <div className="bg-[#FFFBEB] border border-[#FCD34D] rounded-2xl p-6 shadow-2xs">
                <div className="text-xs font-extrabold uppercase tracking-widest text-[#B45309] mb-3 flex items-center gap-2">
                  <Award size={16} className="text-[#D97706]" />
                  <span>Honors & Awards</span>
                </div>
                <ul className="space-y-2">
                  {project.awards.map((award, i) => (
                    <li key={i} className="flex items-start gap-2 text-xs font-bold text-[#92400E]">
                      <CheckCircle2 size={15} className="text-[#D97706] shrink-0 mt-0.5" />
                      <span>{award}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Comprehensive Brief & Technical Architecture */}
            <div className="bg-white border border-border rounded-2xl p-6 sm:p-8 shadow-2xs space-y-6">
              <div>
                <h3 className="text-xs font-extrabold uppercase tracking-widest text-[#0E7490] mb-2 flex items-center gap-2">
                  <Terminal size={14} className="text-[#06B6D4]" />
                  <span>Project Overview & Architecture</span>
                </h3>
                <h2 className="text-xl font-bold text-[#0C1A20] mb-3">System Background</h2>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {project.description}
                </p>
              </div>

              <div className="pt-6 border-t border-border">
                <h3 className="text-xs font-extrabold uppercase tracking-widest text-[#0E7490] mb-3">
                  Technologies Deployed
                </h3>
                <div className="flex flex-wrap gap-2">
                  {project.tags.map((tag, idx) => (
                    <span 
                      key={idx}
                      className="px-3 py-1.5 bg-[#F5F9FA] border border-borderStrong rounded-lg text-xs font-bold text-[#0C1A20]"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* Action Bar Card */}
            <div className="bg-[#0C1A20] text-white rounded-2xl p-6 border border-[#0E7490]/30 flex flex-col gap-4">
              <div>
                <div className="text-xs font-extrabold uppercase tracking-widest text-[#06B6D4] mb-1">Source & Deployment</div>
                <div className="text-sm font-bold text-white">Need complete repository access or architecture walkthrough?</div>
              </div>
              <div className="flex flex-wrap gap-3 pt-2">
                {project.github ? (
                  <a
                    href={project.github}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-2 px-5 py-2.5 bg-[#0E7490] hover:bg-[#06B6D4] text-white font-bold text-xs rounded-xl transition-colors"
                  >
                    <Code2 size={15} />
                    <span>View GitHub Repo</span>
                  </a>
                ) : (
                  <span className="text-xs font-bold text-muted-foreground italic px-3 py-2 bg-white/5 rounded-lg border border-white/10">
                    Proprietary Enterprise System
                  </span>
                )}
              </div>
            </div>

          </div>

          {/* Right Column (60%): Device Mockups & Visual Screenshots */}
          <div className="lg:col-span-7 space-y-10">
            <div className="flex items-center justify-between pb-2 border-b border-border">
              <h3 className="text-lg font-bold text-[#0C1A20]">Visual Proof & Interface Screenshots</h3>
              <span className="text-xs font-bold text-[#0E7490] uppercase tracking-wider">{gallery.length} Display Views</span>
            </div>

            {gallery.map((item, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                className="space-y-3"
              >
                {project.imageType === 'phone' ? (
                  /* Upright Static Phone Mockup Frame */
                  <div className="bg-gradient-to-b from-[#0C1A20] to-[#0E7490]/20 p-8 sm:p-12 rounded-3xl border border-border shadow-xl flex justify-center items-center">
                    <div className="w-[280px] sm:w-[320px] rounded-[44px] bg-[#0C1A20] p-3 border-4 border-[#1E293B] shadow-2xl relative overflow-hidden">
                      {/* Phone Notch */}
                      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-32 h-5 bg-[#1E293B] rounded-b-xl z-20 flex items-center justify-center">
                        <div className="w-3 h-3 rounded-full bg-black/60 mr-2" />
                        <div className="w-10 h-1 bg-black/40 rounded-full" />
                      </div>
                      
                      <div className="rounded-[36px] overflow-hidden aspect-[9/19.5] bg-black relative">
                        <img 
                          src={item.src} 
                          alt={item.caption}
                          className="w-full h-full object-cover"
                        />
                      </div>
                    </div>
                  </div>
                ) : (
                  /* macOS Style Browser Window Frame */
                  <div className="bg-[#0C1A20] rounded-2xl border border-[#0E7490]/40 shadow-2xl overflow-hidden">
                    {/* Window Controls Header */}
                    <div className="bg-[#1E293B] px-4 py-3 flex items-center gap-2 border-b border-white/10">
                      <div className="w-3 h-3 rounded-full bg-[#EF4444]" />
                      <div className="w-3 h-3 rounded-full bg-[#F59E0B]" />
                      <div className="w-3 h-3 rounded-full bg-[#10B981]" />
                      <div className="ml-4 flex-grow bg-[#0C1A20]/80 rounded-md px-3 py-1 text-[11px] font-mono text-muted-foreground truncate border border-white/5">
                        https://izwan.dev/projects/{project.id}
                      </div>
                    </div>
                    {/* Window Body Image */}
                    <div className="bg-slate-950 overflow-hidden">
                      <img 
                        src={item.src} 
                        alt={item.caption}
                        className="w-full h-auto object-top max-h-[500px] object-cover"
                      />
                    </div>
                  </div>
                )}
                
                <div className="text-center text-xs font-semibold text-muted-foreground italic">
                  Figure {idx + 1}: {item.caption}
                </div>
              </motion.div>
            ))}
          </div>

        </div>

        {/* Bottom Pagination / Project Switching */}
        <div className="mt-24 pt-12 border-t-2 border-border grid sm:grid-cols-2 gap-6">
          <Link
            to={`/projects/${prevProject.id}`}
            className="p-6 bg-white border border-border rounded-2xl hover:border-[#0E7490] hover:shadow-card transition-all group flex flex-col justify-between"
          >
            <div className="text-xs font-bold text-muted-foreground uppercase tracking-widest mb-2 flex items-center gap-1">
              <ArrowLeft size={14} className="group-hover:-translate-x-1 transition-transform" />
              <span>Previous System</span>
            </div>
            <div className="text-lg font-bold text-[#0C1A20] group-hover:text-[#0E7490] transition-colors">
              {prevProject.title}
            </div>
          </Link>

          <Link
            to={`/projects/${nextProject.id}`}
            className="p-6 bg-white border border-border rounded-2xl hover:border-[#0E7490] hover:shadow-card transition-all group flex flex-col justify-between sm:text-right"
          >
            <div className="text-xs font-bold text-muted-foreground uppercase tracking-widest mb-2 flex items-center justify-end gap-1">
              <span>Next System</span>
              <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
            </div>
            <div className="text-lg font-bold text-[#0C1A20] group-hover:text-[#0E7490] transition-colors">
              {nextProject.title}
            </div>
          </Link>
        </div>

      </section>
    </div>
  );
};

export default ProjectDetail;
