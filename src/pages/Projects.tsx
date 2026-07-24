import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ExternalLink, Layers, Sparkles, Smartphone, Globe, Cpu, Bot } from 'lucide-react';

interface Project {
  id: string;
  title: string;
  category: string;
  categories: ('web' | 'mobile' | 'ai' | 'enterprise')[];
  description: string;
  tags: string[];
  images: string[];
  awards?: string[];
  github?: string;
  demo?: string;
}

const filterCategories = [
  { id: 'all', label: 'All Projects', icon: Layers },
  { id: 'web', label: 'Web Platforms', icon: Globe },
  { id: 'mobile', label: 'Mobile Apps', icon: Smartphone },
  { id: 'ai', label: 'AI & ML', icon: Cpu },
  { id: 'enterprise', label: 'Enterprise & Automation', icon: Bot },
] as const;

const categorySections = [
  { id: 'web', title: 'Web Platforms & Systems', icon: Globe, description: 'High-performance web applications, corporate platforms, and full-stack architecture.' },
  { id: 'mobile', title: 'Mobile Applications', icon: Smartphone, description: 'Native & cross-platform mobile apps for iOS & Android.' },
  { id: 'ai', title: 'AI & Deep Learning', icon: Cpu, description: 'Machine learning models, computer vision systems, and intelligent conversational agents.' },
  { id: 'enterprise', title: 'Enterprise Automation & RPA', icon: Bot, description: 'Autonomous workflow pipelines, ITSM tools, and RPA solutions built for enterprise scale.' },
];

const projects: Project[] = [
  {
    id: "beruang",
    title: "Beruang",
    category: "AI / Mobile Application",
    categories: ['mobile', 'ai'],
    description: "AI-powered money management app using a Bi-LSTM model trained on 220,000+ Malaysian transactions (99.61% accuracy). Features a RAG-based financial advisor and Gemini 2.5 Flash for receipt OCR. 86.77 SUS score — 98.2% of testers reported increased financial confidence.",
    tags: ["React Native", "Node.js", "TensorFlow.js", "Firebase", "xAI Grok 4.1", "RAG"],
    images: [
      '/images/beruang-mobile.jpg',
      '/images/beruang-chatbot.jpg',
      '/images/beruang-dashboard.jpg',
      '/images/beruang-expenses.jpeg',
    ],
    awards: ["Best System Architecture Award", "86.77 SUS Score"],
    github: "https://github.com/izwanGit/Beruang"
  },
  {
    id: "rentverse",
    title: "RentVerse Platform",
    category: "DevSecOps / Web Platform",
    categories: ['web'],
    description: "Enterprise-grade secure rental platform for the 21-day UiTM Mobile SecOps Challenge. Next.js frontend + hardened Node.js backend. Zero-Trust MFA, anomaly detection (impossible travel at 800km/h), 14-stage CI/CD pipeline, and tamper-evident SHA-256 digital agreements.",
    tags: ["Next.js", "Node.js", "GitHub Actions", "Puppeteer", "Trivy", "Zero-Trust"],
    images: ['/images/rentverse-laptop.jpg', '/images/rentverse-home.jpg', '/images/rentverse.jpeg'],
    awards: ["Champion (1st Place)", "Best Automated Security Testing", "Best Zero Trust Logic", "Best Threat Intelligence"],
    github: "https://github.com/izwanGit/uitm-devops-challenge_TeamOne"
  },
  {
    id: "montswitzerland",
    title: "Mont Switzerland Corporate & E-Commerce",
    category: "Full-Stack Web / E-Commerce",
    categories: ['web'],
    description: "Architected and deployed corporate website within a 24-hour deadline. Engineered affiliate tracking and ad performance analytical workflows, driving sales from RM100/day to RM100,000/month.",
    tags: ["Web Architecture", "E-Commerce", "Zoho Mail", "Affiliate Tracking", "DNS / Domain"],
    images: ['/images/montswitzerland-laptop.jpg'],
    awards: ["Exceeded Sales Target (+ Allowance Increment)"],
  },
  {
    id: "play2grow",
    title: "Play2Grow Edutainment App",
    category: "Android Application",
    categories: ['mobile'],
    description: "Edutainment Android application assisting Malaysian parents in preparing children (ages 4-6) for primary school. Dual-mode system (Parent Mode for tasks/reports + Kid Mode for interactive quizzes) powered by Firebase Firestore.",
    tags: ["Java", "Android Studio", "Firebase Auth", "Firestore NoSQL"],
    images: ['/images/play2grow-mobile.jpg'],
  },
  {
    id: "uems",
    title: "UiTM Event Management System (UEMS)",
    category: "Java Web Application",
    categories: ['web'],
    description: "Java web application enabling admins to manage events and students to register and submit feedback. Server-side logic built using Jakarta Servlets and JSP, persisted in MySQL, deployed on Apache Tomcat.",
    tags: ["Java", "Jakarta Servlets", "JSP", "MySQL", "Apache Tomcat"],
    images: ['/images/uems-laptop.jpg'],
    github: "https://github.com/izwanGit/UiTM-Event-Management-System"
  },
  {
    id: "batik",
    title: "Batik Recognition System",
    category: "Computer Vision / Deep Learning",
    categories: ['ai'],
    description: "Real-time system that classifies Malaysian vs Indonesian batik patterns using a Vision Transformer (ViT). 94.2% accuracy. Won Best AI Booth at AI Seminar 2025 for the live interactive webcam demo.",
    tags: ["Python", "OpenCV", "Flask", "Vision Transformer (ViT)", "Roboflow"],
    images: ['/images/batik-main.jpeg', '/images/batik-demo.jpeg'],
    awards: ["Best AI Booth Award — AI Seminar 2025"],
    github: "https://github.com/izwanGit/BatikRecognitionAndClassification"
  },
  {
    id: "petronas-hub",
    title: "PETRONAS HCSM Operations Hub",
    category: "Enterprise RPA & ITSM Platform",
    categories: ['enterprise'],
    description: "Designed and built the HCSM Operations Hub end-to-end at PETRONAS Digital. Streamlit platform unifying 3 ITSM workflows for myCareerX (Oracle HCM Cloud) serving 50,000+ employees. PyMuPDF spatial chart extraction, OpenPyXL fast engine, and Playwright SSO subprocess wizard.",
    tags: ["Python", "Streamlit", "PyMuPDF", "Playwright RPA", "OpenPyXL", "Oracle HCM"],
    images: [
      '/images/petronas-hub-main.jpg',
      '/images/petronas-hub-wizard.jpg',
      '/images/petronas-hub-weekly.jpg',
      '/images/petronas-hub-monthly.jpg',
      '/images/petronas-hub-pptx.jpg'
    ],
    awards: ["Deployed to Production at PETRONAS Digital"],
  },
  {
    id: "weekly-report",
    title: "Full Weekly Report Automation",
    category: "Zero-Touch Workflow Automation",
    categories: ['enterprise'],
    description: "Zero-touch Power Automate pipeline for myCareerX ITSM reporting. Processes 4 raw Excel files with 6 TypeScript Office Scripts every Monday at 7:00 AM. Generates PETRONAS teal HTML emails, resolves Office 365 recipients, and sends Teams reminders with @mentions.",
    tags: ["Power Automate", "TypeScript", "Office Scripts", "Outlook HTML", "SharePoint"],
    images: [
      '/images/petronas-weekly-email.jpg',
      '/images/petronas-weekly-reminder.jpg'
    ],
    awards: ["Replaced 3-4 Hours of Weekly Manual Work"],
  },
  {
    id: "monthly-report",
    title: "Full Monthly Report Automation",
    category: "Cloud-Native Reporting Pipeline",
    categories: ['enterprise'],
    description: "Automated monthly reporting pipeline pairing a 16:9 Power BI template with Power Automate REST API connectors. Wrote DAX measures generating natural-language executive summary bullets directly inside report cards. Exports to PPTX, archives to SharePoint, and emails management on the 1st of every month.",
    tags: ["Power BI", "DAX", "Power Automate", "REST API", "SharePoint"],
    images: [
      '/images/petronas-monthly-cover.jpg',
      '/images/petronas-monthly-pbi.jpg',
      '/images/petronas-monthly-email.jpg',
      '/images/petronas-monthly-teams.jpg'
    ],
    awards: ["Replaced 1-2 Hours of Monthly Manual Work"],
  },
  {
    id: "predeploy",
    title: "Pre-Deployment Automation & Teams Handoff",
    category: "RPA & Document Automation",
    categories: ['enterprise'],
    description: "Power Automate flow triggered by UAT endorsement emails. Extracts ticket IDs, queries SharePoint details, generates branded PETRONAS OAT Word documents, and posts an interactive Teams card with an 'Open in Ops Hub' launch button for the Streamlit Playwright RPA wizard.",
    tags: ["Power Automate", "Playwright RPA", "SharePoint", "Adaptive Cards", "BMC Helix"],
    images: [
      '/images/petronas-predeploy-card.jpg',
      '/images/petronas-predeploy-doc.jpg',
      '/images/petronas-predeploy-wizard.jpg'
    ],
    awards: ["Cut Deployment Prep from 30 min to <1 min"],
  },
  {
    id: "priority-ticket",
    title: "Priority Ticket Automation System",
    category: "Real-Time Chat Listener & Bot",
    categories: ['enterprise'],
    description: "System monitoring Teams support chat 24/7, intercepting urgent ticket mentions (REQ / ICT_WO). Auto-logs placeholders in SharePoint, enriches details via TypeScript Office Scripts from daily dumps, and posts weekly Thursday @mention reminders for ticket assignees.",
    tags: ["Power Automate", "TypeScript", "Teams Bot", "Office 365 Users API"],
    images: [
      '/images/petronas-priority-notif.jpg',
      '/images/petronas-priority-list.jpg',
      '/images/petronas-priority-reminder.jpg'
    ],
    awards: ["24/7 Autonomous Teams Ticket Listener"],
  },
  {
    id: "yulaoshi",
    title: "YuLaoshi: AI Mandarin Tutor",
    category: "AI Chatbot / Full-Stack",
    categories: ['ai', 'web'],
    description: "Full-stack AI chatbot serving as a conversational Mandarin tutor for UiTM students. Combines GPT-4o-mini with a gamified listening quiz module and real-time audio via gTTS. Deployed on PythonAnywhere.",
    tags: ["Python", "Flask", "GPT-4o-mini", "SQLite", "gTTS"],
    images: ['/images/yulaoshi-main.jpeg', '/images/yulaoshi-chat.jpeg', '/images/yulaoshi-quiz.jpeg'],
    github: "https://github.com/izwanGit/LaoshiYu-Chatbot",
    demo: "https://izwan.pythonanywhere.com/"
  },
  {
    id: "kuehlicious",
    title: "Kuehlicious",
    category: "Full-Stack Web System",
    categories: ['web'],
    description: "Award-winning web-based ordering system digitizing a local Kuih Batang Buruk business. Built solo using PHP/MySQL with dual user scopes (Admin/Customer) for complete SDLC lifecycle. Winner — Youth Innovation Final Project 2023.",
    tags: ["PHP", "MySQL", "JavaScript", "HTML/CSS"],
    images: ['/images/kuehlicious-laptop.jpg'],
    awards: ["Winner — Youth Innovation Final Project Presentation 2023"],
    github: "https://github.com/izwanGit/KuihBatangBurukOrderingSystem"
  },
];

const ProjectCard = ({ project, idx }: { project: Project; idx: number }) => {
  const [activeImg, setActiveImg] = useState(0);

  React.useEffect(() => {
    if (project.images.length <= 1) return;
    const t = setInterval(() => {
      setActiveImg(i => (i + 1) % project.images.length);
    }, 3500);
    return () => clearInterval(t);
  }, [project.images.length]);

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.95 }}
      transition={{ duration: 0.3, delay: idx * 0.05 }}
      className="flex flex-col bg-white border border-border rounded-2xl overflow-hidden hover:shadow-card transition-all group"
    >
      {/* Image (cycles through screenshots) */}
      <div className="w-full aspect-video bg-tint relative overflow-hidden border-b border-border">
        <img
          key={activeImg}
          src={project.images[activeImg]}
          alt={project.title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
        />
        {/* Image indicator dots */}
        {project.images.length > 1 && (
          <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-1.5 z-10 bg-black/40 backdrop-blur-md px-2 py-1 rounded-full">
            {project.images.map((_, i) => (
              <button
                key={i}
                onClick={() => setActiveImg(i)}
                className={`w-1.5 h-1.5 rounded-full transition-all ${i === activeImg ? 'bg-white w-3' : 'bg-white/50'}`}
              />
            ))}
          </div>
        )}
      </div>

      <div className="p-6 flex flex-col flex-grow">
        <div className="text-xs font-bold uppercase tracking-wider text-primary mb-2">{project.category}</div>
        <h3 className="text-xl font-bold text-foreground mb-3">{project.title}</h3>
        <p className="text-sm text-muted-foreground mb-5 flex-grow leading-relaxed">{project.description}</p>

        {project.awards && (
          <div className="mb-4 flex flex-wrap gap-2">
            {project.awards.map((award, i) => (
              <span key={i} className="px-2.5 py-1 bg-[#FFFBEB] text-[#B45309] text-[11px] font-bold rounded-md border border-[#FCD34D] flex items-center gap-1">
                <Sparkles size={11} className="text-[#D97706]" />
                {award}
              </span>
            ))}
          </div>
        )}

        <div className="flex flex-wrap gap-2 mb-5">
          {project.tags.map((tag, i) => (
            <span key={i} className="px-2 py-1 bg-background text-muted-foreground text-xs font-semibold rounded border border-borderStrong">
              {tag}
            </span>
          ))}
        </div>

        <div className="flex items-center gap-5 mt-auto pt-4 border-t border-border">
          {project.github && (
            <a href={project.github} target="_blank" rel="noreferrer"
              className="flex items-center gap-2 text-sm font-semibold text-foreground hover:text-primary transition-colors">
              GitHub
            </a>
          )}
          {project.demo && (
            <a href={project.demo} target="_blank" rel="noreferrer"
              className="flex items-center gap-2 text-sm font-semibold text-foreground hover:text-primary transition-colors">
              <ExternalLink size={14} /> Live Demo
            </a>
          )}
        </div>
      </div>
    </motion.div>
  );
};

const Projects = () => {
  const [activeFilter, setActiveFilter] = useState<string>('all');

  const getFilteredProjects = (catId: string) => {
    if (catId === 'all') return projects;
    return projects.filter(p => p.categories.includes(catId as any));
  };

  return (
    <div className="w-full pt-32 pb-24">
      <div className="container mx-auto px-6 max-w-7xl">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="max-w-3xl mb-12"
        >
          <div className="text-[13px] font-extrabold uppercase tracking-widest text-accent mb-3 flex items-center gap-2">
            <Layers size={14} />
            Engineering Portfolio
          </div>
          <h1 className="text-4xl md:text-5xl font-bold tracking-tight text-foreground mb-6">
            Engineering Archive
          </h1>
          <p className="text-xl text-muted-foreground leading-relaxed">
            A collection of production systems, AI models, hackathon champions, and enterprise workflow automations — categorized for quick recruiter scan or deep browsing.
          </p>
        </motion.div>

        {/* Filter Navigation Bar */}
        <div className="sticky top-20 z-30 mb-16 py-3 bg-background/85 backdrop-blur-md border-b border-border/80 -mx-6 px-6">
          <div className="flex items-center gap-2 overflow-x-auto no-scrollbar py-1">
            {filterCategories.map((cat) => {
              const Icon = cat.icon;
              const isActive = activeFilter === cat.id;
              const count = cat.id === 'all' 
                ? projects.length 
                : projects.filter(p => p.categories.includes(cat.id as any)).length;

              return (
                <button
                  key={cat.id}
                  onClick={() => setActiveFilter(cat.id)}
                  className={`flex items-center gap-2 px-4 py-2.5 rounded-full text-xs md:text-sm font-bold transition-all whitespace-nowrap ${
                    isActive
                      ? 'bg-primary text-white shadow-sm scale-105'
                      : 'bg-white text-muted-foreground hover:text-foreground border border-border hover:border-borderStrong'
                  }`}
                >
                  <Icon size={15} />
                  <span>{cat.label}</span>
                  <span className={`px-2 py-0.5 rounded-full text-[11px] ${
                    isActive ? 'bg-white/20 text-white' : 'bg-tint text-muted-foreground'
                  }`}>
                    {count}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Dynamic Display Mode */}
        <AnimatePresence mode="wait">
          {activeFilter === 'all' ? (
            /* Categorized Scrolling Sections View */
            <motion.div
              key="categorized-view"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="space-y-20"
            >
              {categorySections.map((sec) => {
                const secProjects = projects.filter(p => p.categories.includes(sec.id as any));
                const SecIcon = sec.icon;

                return (
                  <section key={sec.id} className="scroll-mt-36" id={sec.id}>
                    <div className="flex items-start gap-4 mb-8 pb-4 border-b border-border">
                      <div className="p-3 bg-primary/10 text-primary rounded-xl mt-1">
                        <SecIcon size={24} />
                      </div>
                      <div>
                        <h2 className="text-2xl md:text-3xl font-bold text-foreground flex items-center gap-3">
                          {sec.title}
                          <span className="text-sm font-bold px-2.5 py-1 bg-tint text-primary rounded-full">
                            {secProjects.length}
                          </span>
                        </h2>
                        <p className="text-muted-foreground text-sm mt-1">{sec.description}</p>
                      </div>
                    </div>

                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                      {secProjects.map((project, idx) => (
                        <ProjectCard key={`${sec.id}-${project.id}`} project={project} idx={idx} />
                      ))}
                    </div>
                  </section>
                );
              })}
            </motion.div>
          ) : (
            /* Filtered Single Grid View */
            <motion.div
              key={`filtered-view-${activeFilter}`}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
            >
              <div className="mb-6 flex items-center justify-between">
                <span className="text-sm font-bold text-muted-foreground">
                  Showing {getFilteredProjects(activeFilter).length} projects for <span className="text-primary font-extrabold">{filterCategories.find(c => c.id === activeFilter)?.label}</span>
                </span>
                <button
                  onClick={() => setActiveFilter('all')}
                  className="text-xs font-semibold text-primary hover:underline"
                >
                  View All Sections
                </button>
              </div>

              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                {getFilteredProjects(activeFilter).map((project, idx) => (
                  <ProjectCard key={project.id} project={project} idx={idx} />
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default Projects;
