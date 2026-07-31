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
  ArrowRight 
} from 'lucide-react';
import { projects, type Project } from '../data/projectData';
import PentestTerminal from '../components/PentestTerminal';

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
            className="inline-flex items-center gap-2 px-6 py-3 bg-[#0E7490] text-white font-bold rounded-xl hover:bg-[#0E7490]/90 transition-all shadow-sm"
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
      {/* Light Flagship Header */}
      <section className="bg-white border-b border-border pt-10 pb-14 shadow-2xs">
        <div className="container mx-auto px-6 max-w-7xl">
          {/* Back Link */}
          <Link
            to="/projects"
            className="inline-flex items-center gap-2 text-xs font-extrabold uppercase tracking-widest text-[#0E7490] hover:text-[#06B6D4] transition-colors mb-6 group"
          >
            <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform" />
            <span>Back to Engineering Portfolio</span>
          </Link>

          <div className="grid lg:grid-cols-12 gap-8 items-end">
            <div className="lg:col-span-8">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#F5F9FA] border border-border text-xs font-bold text-[#0E7490] uppercase tracking-widest mb-4">
                <span>{project.category}</span>
                <span className="text-[#06B6D4]">•</span>
                <span>{project.year}</span>
              </div>

              <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-[#0C1A20] tracking-tight leading-[1.15] mb-4">
                {project.title}
              </h1>

              <p className="text-base sm:text-lg text-muted-foreground font-medium leading-relaxed max-w-3xl">
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
                  className="inline-flex items-center gap-2 px-6 py-3 bg-[#0E7490] text-white font-bold text-sm rounded-xl hover:bg-[#06B6D4] shadow-xs hover:shadow-md transition-all hover:-translate-y-0.5"
                >
                  <span>Launch Live Portal</span>
                  <ExternalLink size={15} />
                </a>
              )}
              {project.github && (
                <a
                  href={project.github}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-2 px-6 py-3 bg-white border border-borderStrong text-[#0C1A20] font-bold text-sm rounded-xl hover:bg-[#F5F9FA] hover:border-[#0E7490]/50 transition-all hover:-translate-y-0.5"
                >
                  <Code2 size={15} />
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
          
          {/* Left Column (40%): Overview, Metrics, Awards, Tech Stack */}
          <div className="lg:col-span-5 space-y-8">
            
            {/* Impact Highlights Grid */}
            {project.impact && project.impact.length > 0 && (
              <div className="bg-white border border-border rounded-2xl p-6 shadow-xs">
                <div className="text-xs font-extrabold uppercase tracking-widest text-[#0E7490] mb-4 flex items-center gap-2">
                  <Sparkles size={14} className="text-[#06B6D4]" />
                  <span>Verified Key Metrics</span>
                </div>
                <div className="grid grid-cols-2 gap-3.5">
                  {project.impact.map((metric, idx) => (
                    <div key={idx} className="bg-[#F5F9FA] border border-border rounded-xl p-3.5">
                      <div className="text-lg font-extrabold text-[#0C1A20]">{metric}</div>
                      <div className="text-[11px] font-bold text-muted-foreground uppercase tracking-wider mt-0.5">Benchmark</div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Honors & Awards */}
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

            {/* Overview & System Background */}
            <div className="bg-white border border-border rounded-2xl p-6 sm:p-7 shadow-xs space-y-6">
              <div>
                <div className="text-xs font-extrabold uppercase tracking-widest text-[#0E7490] mb-2 flex items-center gap-2">
                  <Terminal size={14} className="text-[#06B6D4]" />
                  <span>System Architecture & Overview</span>
                </div>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {project.description}
                </p>
              </div>

              <div className="pt-5 border-t border-border">
                <div className="text-xs font-extrabold uppercase tracking-widest text-[#0E7490] mb-3">
                  Technologies Deployed
                </div>
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
            <div className="bg-white rounded-2xl p-6 border border-border shadow-xs flex flex-col gap-4">
              <div>
                <div className="text-xs font-extrabold uppercase tracking-widest text-[#0E7490] mb-1">Source Code & Access</div>
                <div className="text-sm font-bold text-[#0C1A20]">Repository and live deployment access</div>
              </div>
              <div className="flex flex-wrap gap-3 pt-1">
                {project.github ? (
                  <a
                    href={project.github}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-2 px-5 py-2.5 bg-[#0E7490] hover:bg-[#06B6D4] text-white font-bold text-xs rounded-xl transition-colors shadow-2xs"
                  >
                    <Code2 size={15} />
                    <span>View GitHub Repo</span>
                  </a>
                ) : (
                  <span className="text-xs font-bold text-muted-foreground italic px-3 py-2 bg-[#F5F9FA] rounded-lg border border-border">
                    Proprietary Enterprise System
                  </span>
                )}
              </div>
            </div>

          </div>

          {/* Right Column (60%): Light Device Mockups & Visual Screenshots */}
          <div className="lg:col-span-7 space-y-8">
            <div className="flex items-center justify-between pb-2 border-b border-border">
              <h3 className="text-lg font-bold text-[#0C1A20]">Interface Screenshots</h3>
              <span className="text-xs font-bold text-[#0E7490] uppercase tracking-wider">{gallery.length} Display Views</span>
            </div>

            {gallery.map((item, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: idx * 0.08 }}
                className="space-y-3"
              >
                {project.imageType === 'phone' ? (
                  /* Mobile App UI Brand Color Background & Phone Frame */
                  <div 
                    className="p-8 sm:p-12 rounded-3xl border border-border shadow-md flex justify-center items-center relative overflow-hidden"
                    style={{ backgroundColor: project.mobileBgColor || '#5C4634' }}
                  >
                    <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-transparent to-black/30 pointer-events-none" />
                    <div className="w-full h-full flex items-center justify-center p-2 relative z-10">
                      <div className="h-[480px] sm:h-[530px] aspect-[9/19.5] rounded-[38px] bg-[#1A1B22] p-2.5 border-4 border-slate-700/80 shadow-2xl relative flex flex-col items-center justify-center">
                        {/* Side Buttons */}
                        {project.id === 'play2grow' ? (
                          /* Android Side Buttons */
                          <>
                            <div className="absolute -right-[3px] top-24 w-[3px] h-8 bg-slate-600 rounded-r" />
                            <div className="absolute -right-[3px] top-36 w-[3px] h-14 bg-slate-600 rounded-r" />
                          </>
                        ) : (
                          /* iPhone Side Buttons */
                          <>
                            <div className="absolute -left-[3px] top-24 w-[3px] h-9 bg-slate-600 rounded-l" />
                            <div className="absolute -left-[3px] top-36 w-[3px] h-9 bg-slate-600 rounded-l" />
                            <div className="absolute -right-[3px] top-28 w-[3px] h-14 bg-slate-600 rounded-r" />
                          </>
                        )}

                        {/* Top Notch / Camera Punch-hole */}
                        {project.id === 'play2grow' ? (
                          /* Android Layout: Top Speaker Slit & Camera Punch-hole */
                          <>
                            <div className="absolute top-2 left-1/2 -translate-x-1/2 w-14 h-[3px] bg-[#09090b] rounded-full z-20" />
                            <div className="absolute top-5 left-1/2 -translate-x-1/2 w-4 h-4 bg-black border border-slate-800 rounded-full z-20 flex items-center justify-center">
                              <div className="w-1 h-1 rounded-full bg-[#1e293b]" />
                            </div>
                          </>
                        ) : (
                          /* iPhone Layout: Dynamic Island Notch */
                          <div className="absolute top-2.5 left-1/2 -translate-x-1/2 w-20 h-4 bg-black rounded-full z-20 flex items-center justify-end px-2">
                            <div className="w-1.5 h-1.5 rounded-full bg-[#0E7490]/80 animate-pulse" />
                          </div>
                        )}

                        {/* Screen Viewport */}
                        <div className="w-full h-full rounded-[28px] overflow-hidden bg-black flex items-center justify-center">
                          <img 
                            src={item.src} 
                            alt={item.caption}
                            className="w-full h-full object-cover object-top"
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                ) : (
                  /* Super Duper Blurred Image Backdrop for Web/Laptop */
                  <div 
                    className="p-6 sm:p-8 rounded-3xl border border-border shadow-md relative overflow-hidden bg-slate-900"
                    style={{ backgroundColor: project.mobileBgColor || undefined }}
                  >
                    {/* Dynamic Background: Solid Brand Color or Blurred Image Backdrop */}
                    {project.mobileBgColor ? (
                      <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-transparent to-black/30 pointer-events-none" />
                    ) : (
                      <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
                        <img 
                          src={item.src} 
                          alt="" 
                          aria-hidden="true" 
                          className="w-full h-full object-cover scale-105 blur-[6px] opacity-90"
                        />
                        <div className="absolute inset-0 bg-black/15" />
                      </div>
                    )}
                    
                    {/* Laptop Frame */}
                    <div className="bg-white rounded-2xl border border-slate-300 shadow-xl overflow-hidden relative z-10">
                      <div className="bg-slate-100 px-4 py-3 flex items-center gap-2 border-b border-slate-200">
                        <div className="w-3 h-3 rounded-full bg-[#EF4444]" />
                        <div className="w-3 h-3 rounded-full bg-[#F59E0B]" />
                        <div className="w-3 h-3 rounded-full bg-[#10B981]" />
                        <div className="ml-4 flex-grow bg-white rounded-md px-3 py-1 text-[11px] font-mono text-slate-500 truncate border border-slate-200">
                          https://izwan.dev/projects/{project.id}
                        </div>
                      </div>
                      <div className="w-full overflow-hidden bg-white">
                        {project.id === 'network-sec' ? (
                          <div className="min-h-[420px] sm:min-h-[520px]">
                            <PentestTerminal />
                          </div>
                        ) : (
                          <img 
                            src={item.src} 
                            alt={item.caption}
                            className="w-full h-auto block"
                          />
                        )}
                      </div>
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
        <div className="mt-20 pt-10 border-t-2 border-border grid sm:grid-cols-2 gap-6">
          <Link
            to={`/projects/${prevProject.id}`}
            className="p-6 bg-white border border-border rounded-2xl hover:border-[#0E7490] hover:shadow-card transition-all group flex flex-col justify-between shadow-2xs"
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
            className="p-6 bg-white border border-border rounded-2xl hover:border-[#0E7490] hover:shadow-card transition-all group flex flex-col justify-between sm:text-right shadow-2xs"
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
