import React from 'react';
import { motion } from 'framer-motion';
import { 
  ExternalLink, 
  Layers, 
  Sparkles, 
  Smartphone, 
  Globe, 
  Cpu, 
  Bot, 
  ArrowRight, 
  Code, 
  Database, 
  Shield, 
  Layout, 
  Award, 
  CheckCircle2, 
  Terminal 
} from 'lucide-react';

interface Project {
  id: string;
  title: string;
  category: string;
  categories: ('web' | 'mobile' | 'ai' | 'enterprise')[];
  description: string;
  tags: string[];
  image: string;
  awards?: string[];
  github?: string;
  demo?: string;
}

const projects: Project[] = [
  {
    id: "beruang",
    title: "Beruang: AI Money Management & Advisor",
    category: "AI / Mobile Application",
    categories: ['mobile', 'ai'],
    description: "Hybrid multi-model AI personal finance app. Trained a Bi-LSTM model on 220,000+ Malaysian transactions (99.61% accuracy) with MiniLM transformer on-device routing and xAI Grok 4.1 RAG advisor. 86.77 SUS usability score.",
    tags: ["React Native", "Node.js", "TensorFlow.js", "Firebase", "xAI Grok 4.1", "RAG"],
    image: '/images/beruang-mobile.jpg',
    awards: ["Best System Architecture Award", "86.77 SUS Score"],
    github: "https://github.com/izwanGit/Beruang",
    demo: "https://beruang-landing.vercel.app/"
  },
  {
    id: "rentverse",
    title: "RentVerse Enterprise Rental Platform",
    category: "DevSecOps / Web Platform",
    categories: ['web'],
    description: "Secure-by-design property rental ecosystem built for the 21-day UiTM Mobile SecOps Challenge. Next.js frontend + hardened Node.js backend featuring Zero-Trust MFA, impossible travel anomaly detection, and 14-stage CI/CD.",
    tags: ["Next.js", "Node.js", "GitHub Actions", "Puppeteer", "Trivy", "Zero-Trust"],
    image: '/images/rentverse/homepage.jpg',
    awards: ["Champion (1st Place)", "Best Automated Security Testing", "Best Zero Trust Logic", "Best Threat Intelligence"],
    github: "https://github.com/izwanGit/uitm-devops-challenge_TeamOne",
    demo: "https://uitm-devops-challenge-team-one.vercel.app/"
  },
  {
    id: "petronas-hub",
    title: "PETRONAS HCSM Operations Hub",
    category: "Enterprise RPA & ITSM Platform",
    categories: ['enterprise'],
    description: "Designed and solo-built the HCSM Operations Hub at PETRONAS Digital. Streamlit platform automating 3 core ITSM workflows for myCareerX (Oracle HCM Cloud) serving 50,000+ employees. Cut processing times by 95%.",
    tags: ["Python", "Streamlit", "PyMuPDF", "Playwright RPA", "OpenPyXL", "Oracle HCM"],
    image: '/images/petronas-hub-main.jpg',
    awards: ["Deployed to Production at PETRONAS Digital", "95% Workflow Time Reduction"],
  },
  {
    id: "batik",
    title: "Batik AI Recognition & Classification",
    category: "Computer Vision / Deep Learning",
    categories: ['ai'],
    description: "Real-time computer vision system classifying Malaysian vs. Indonesian batik patterns using a Vision Transformer (ViT) deep learning model with 94.2% accuracy. Features live brightness/focus quality checks and anti-flicker filters.",
    tags: ["Python", "OpenCV", "Flask", "Vision Transformer (ViT)", "Roboflow"],
    image: '/images/batik-main.jpeg',
    awards: ["Best AI Booth Award — AI Seminar 2025"],
    github: "https://github.com/izwanGit/BatikRecognitionAndClassification"
  },
  {
    id: "montswitzerland",
    title: "Mont Switzerland Corporate & E-Commerce",
    category: "Full-Stack Web / E-Commerce",
    categories: ['web'],
    description: "Architected and deployed corporate website within a 24-hour deadline. Engineered affiliate tracking and ad performance workflows, scaling monthly platform sales from RM100/day to RM100,000/month.",
    tags: ["Web Architecture", "E-Commerce", "Zoho Mail", "Affiliate Tracking", "DNS / Domain"],
    image: '/images/montswitzerland-laptop.jpg',
    awards: ["Exceeded Sales Target (+ Allowance Increment)"],
  },
  {
    id: "play2grow",
    title: "Play2Grow Edutainment Android App",
    category: "Android Application",
    categories: ['mobile'],
    description: "Dual-mode educational Android app preparing children (ages 4-6) for primary school. Features Parent Mode for task assignment/printable reports and Kid Mode for interactive gamified quizzes powered by Firebase Firestore NoSQL.",
    tags: ["Java", "Android Studio", "Firebase Auth", "Firestore NoSQL"],
    image: '/images/play2grow-mobile.jpg',
  },
  {
    id: "uems",
    title: "UiTM Event Management System (UEMS)",
    category: "Java Web Application",
    categories: ['web'],
    description: "Enterprise Java web portal enabling campus admins to manage events and students to register and submit feedback. Server-side logic built using Jakarta Servlets and JSP, persisted in MySQL, and deployed on Apache Tomcat.",
    tags: ["Java", "Jakarta Servlets", "JSP", "MySQL", "Apache Tomcat"],
    image: '/images/uems-laptop.jpg',
    github: "https://github.com/izwanGit/UiTM-Event-Management-System"
  },
  {
    id: "hawker-food",
    title: "Malaysian Hawker Food Recognition & Calorie AI",
    category: "Computer Vision / Deep Learning",
    categories: ['ai'],
    description: "Led AI architecture for a MATLAB-based system recognizing Malaysian hawker food and estimating calorie content. Fine-tuned SqueezeNet CNN (83% accuracy) with 3-stage Gray World CLAHE image preprocessing and MyFCD nutrition mapping.",
    tags: ["MATLAB", "SqueezeNet CNN", "SVM Classifier", "Computer Vision", "MyFCD"],
    image: '/images/food-placeholder.jpg',
    github: "https://github.com/izwanGit/malaysian-food-recognition"
  },
  {
    id: "weekly-report",
    title: "Weekly ITSM Report Automation Pipeline",
    category: "Zero-Touch Workflow Automation",
    categories: ['enterprise'],
    description: "Zero-touch Power Automate pipeline for myCareerX ITSM reporting. Processes 4 raw Excel files with 6 TypeScript Office Scripts every Monday at 7:00 AM. Generates PETRONAS teal HTML emails and sends Teams reminders with @mentions.",
    tags: ["Power Automate", "TypeScript", "Office Scripts", "Outlook HTML", "SharePoint"],
    image: '/images/petronas-weekly-email.jpg',
    awards: ["Replaced 3-4 Hours of Weekly Manual Work"],
  },
  {
    id: "monthly-report",
    title: "Monthly Executive Reporting & DAX Engine",
    category: "Cloud-Native Reporting Pipeline",
    categories: ['enterprise'],
    description: "Automated monthly reporting pipeline pairing a 16:9 Power BI template with Power Automate REST API connectors. Wrote custom DAX measures generating natural-language executive summary bullets directly inside report cards.",
    tags: ["Power BI", "DAX", "Power Automate", "REST API", "SharePoint"],
    image: '/images/petronas-monthly-cover.jpg',
    awards: ["Replaced 1-2 Hours of Monthly Manual Work"],
  },
  {
    id: "predeploy",
    title: "Pre-Deployment Automation & Teams Handoff",
    category: "RPA & Document Automation",
    categories: ['enterprise'],
    description: "Power Automate flow triggered by UAT endorsement emails. Extracts ticket IDs, queries SharePoint details, generates branded PETRONAS OAT Word documents, and posts an interactive Teams card with an 'Open in Ops Hub' launch button.",
    tags: ["Power Automate", "Playwright RPA", "SharePoint", "Adaptive Cards", "BMC Helix"],
    image: '/images/petronas-predeploy-card.jpg',
    awards: ["Cut Deployment Prep from 30 min to <1 min"],
  },
  {
    id: "priority-ticket",
    title: "Priority Ticket 24/7 Teams Listener Bot",
    category: "Real-Time Chat Listener & Bot",
    categories: ['enterprise'],
    description: "System monitoring Teams support chat 24/7, intercepting urgent ticket mentions (REQ / ICT_WO). Auto-logs placeholders in SharePoint, enriches details via TypeScript Office Scripts from daily dumps, and posts weekly reminders.",
    tags: ["Power Automate", "TypeScript", "Teams Bot", "Office 365 Users API"],
    image: '/images/petronas-priority-notif.jpg',
    awards: ["24/7 Autonomous Teams Ticket Listener"],
  },
  {
    id: "crime-analytics",
    title: "Economic Disparities & Crime Analytics",
    category: "Data Science & Visual Analytics",
    categories: ['enterprise'],
    description: "Served as Head of Data Science investigating socioeconomic correlations with Malaysian crime patterns using 2022 Open DOSM datasets. Conducted Python/Pandas normalization in Colab and engineered an interactive Tableau dashboard.",
    tags: ["Python", "Pandas", "Scikit-Learn", "Tableau", "Data Storytelling"],
    image: '/images/petronas-dashboard.jpg',
    github: "https://github.com/izwanGit/EconomicPressureAndSocialPatterns_DataProcessing"
  },
  {
    id: "network-sec",
    title: "Network Service Enumeration & Exploitation",
    category: "Cybersecurity / Penetration Testing",
    categories: ['enterprise'],
    description: "Executed full-chain penetration testing demonstration: SMB reconnaissance via enum4linux to exfiltrate private SSH keys, non-standard Telnet reverse shell execution for root privilege escalation, and FTP dictionary brute-forcing.",
    tags: ["Penetration Testing", "Nmap", "Metasploit", "SMB / Telnet / FTP", "Hydra"],
    image: '/images/rentverse/admin.jpg',
  },
  {
    id: "yulaoshi",
    title: "YuLaoshi: AI Mandarin Conversational Tutor",
    category: "AI Chatbot / Full-Stack Web",
    categories: ['ai', 'web'],
    description: "Full-stack AI chatbot serving as a conversational Mandarin tutor for UiTM students. Combines GPT-4o-mini with a gamified listening quiz module, real-time audio via gTTS, and persistent SQLite progression tracking.",
    tags: ["Python", "Flask", "GPT-4o-mini", "SQLite", "gTTS"],
    image: '/images/yulaoshi-main.jpeg',
    github: "https://github.com/izwanGit/LaoshiYu-Chatbot",
    demo: "https://izwan.pythonanywhere.com/"
  },
  {
    id: "kuehlicious",
    title: "Kuehlicious: Kuih Batang Buruk Portal",
    category: "Full-Stack Web System",
    categories: ['web'],
    description: "Award-winning web-based ordering system digitizing a local Kuih Batang Buruk business. Built solo using PHP/MySQL with dual user scopes (Admin/Customer) across the full SDLC lifecycle. Winner — Youth Innovation Final Project 2023.",
    tags: ["PHP", "MySQL", "JavaScript", "HTML/CSS"],
    image: '/images/kuehlicious-laptop.jpg',
    awards: ["Winner — Youth Innovation Final Project 2023"],
    github: "https://github.com/izwanGit/KuihBatangBurukOrderingSystem"
  },
];

const featuredProjectIds = ["beruang", "rentverse", "petronas-hub", "batik"];
const featuredProjects = projects.filter(p => featuredProjectIds.includes(p.id));

const skillCategories = [
  {
    id: "languages",
    title: "Languages & Core Syntax",
    icon: Code,
    skills: ["TypeScript", "JavaScript (ES6+)", "Python 3.10+", "Java", "PHP", "HTML5", "Vanilla CSS3", "DAX", "SQL", "MATLAB"]
  },
  {
    id: "ai",
    title: "AI & Machine Learning",
    icon: Cpu,
    skills: ["TensorFlow.js", "PyTorch", "Scikit-Learn", "OpenCV", "Vision Transformer (ViT)", "xAI Grok 4.1", "GPT-4o-mini", "Gemini 2.5 Flash", "RAG Pipelines", "Prompt Engineering", "Natural Language Processing (NLP)", "Computer Vision", "gTTS"]
  },
  {
    id: "frameworks",
    title: "Web & Mobile Frameworks",
    icon: Globe,
    skills: ["React Native", "Next.js", "Node.js", "Express.js", "Flask", "Jakarta Servlets", "JSP", "Tailwind CSS", "Bootstrap 5", "Streamlit"]
  },
  {
    id: "enterprise",
    title: "Enterprise Automation & RPA",
    icon: Bot,
    skills: ["Power Automate", "Playwright RPA", "Office Scripts (TypeScript)", "BMC Helix ITSM", "Oracle HCM Cloud", "SharePoint APIs", "Win32com Outlook Engine", "PyMuPDF", "OpenPyXL"]
  },
  {
    id: "devops",
    title: "Cloud, DevOps & Security",
    icon: Shield,
    skills: ["GitHub Actions CI/CD", "Zero Trust Architecture", "Role-Based Access Control (RBAC)", "CodeQL SAST", "Trivy Scanning", "Gitleaks", "Penetration Testing", "Nmap", "Metasploit", "Rate Limiting & HSTS", "Apache Tomcat"]
  },
  {
    id: "data",
    title: "Data & Analytics Architecture",
    icon: Database,
    skills: ["Power BI", "Tableau", "Pandas", "PostgreSQL", "MySQL", "SQLite", "Prisma ORM", "Firebase Firestore", "NoSQL Architecture", "Data Visualization", "Data Storytelling"]
  },
  {
    id: "tools",
    title: "Design & Product Management",
    icon: Layout,
    skills: ["Figma", "Adobe Photoshop", "Final Cut Pro", "Canva", "CapCut", "Product Photography", "Git / GitHub Version Control", "Microsoft Office 365", "E-Commerce Strategy"]
  }
];

const archiveCategories = [
  { id: 'web', title: 'Web Platforms & Full-Stack Systems', icon: Globe },
  { id: 'mobile', title: 'Mobile Applications', icon: Smartphone },
  { id: 'ai', title: 'AI & Deep Learning Models', icon: Cpu },
  { id: 'enterprise', title: 'Enterprise Automation & Analytics', icon: Bot },
] as const;

const Projects = () => {
  return (
    <div className="w-full pt-32 pb-28 bg-[#F5F9FA] min-h-screen">
      <div className="container mx-auto px-6 max-w-7xl">
        
        {/* ============================================================
            SECTION 1: HERO HEADER & STATS
        ============================================================ */}
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="max-w-3xl mb-20"
        >
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white border border-border shadow-2xs text-xs font-bold text-[#0E7490] uppercase tracking-widest mb-6">
            <Layers size={14} className="text-[#06B6D4]" />
            <span>Engineering Portfolio</span>
          </div>
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-tight text-[#0C1A20] leading-[1.12] mb-6">
            Selected Work &<br />
            <span className="text-[#0E7490]">Technical Stack.</span>
          </h1>
          <p className="text-lg sm:text-xl text-muted-foreground leading-relaxed mb-10">
            A curated archive of 16 production systems, AI models, and enterprise workflow automations — engineered for zero-lag performance, robust security, and measurable business impact.
          </p>

          {/* Quick Stats Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 pt-8 border-t border-border">
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
        </motion.div>

        {/* ============================================================
            SECTION 2: FEATURED FLAGSHIP SHOWCASES (ALTERNATING CARDS)
        ============================================================ */}
        <div className="mb-28">
          <div className="flex items-center justify-between mb-10 pb-4 border-b-2 border-border">
            <div>
              <span className="text-xs font-extrabold uppercase tracking-widest text-[#06B6D4] block mb-1">Top Tier Systems</span>
              <h2 className="text-2xl sm:text-3xl font-bold text-[#0C1A20]">Featured Flagship Showcases</h2>
            </div>
            <span className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white border border-border text-xs font-bold text-[#0E7490]">
              <Sparkles size={13} className="text-[#06B6D4]" />
              4 Benchmark Projects
            </span>
          </div>

          <div className="space-y-12">
            {featuredProjects.map((project, idx) => {
              const isEven = idx % 2 !== 0;
              return (
                <motion.div
                  key={project.id}
                  initial={{ opacity: 0, y: 25 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: idx * 0.1 }}
                  className="bg-white border border-border rounded-3xl p-6 sm:p-8 md:p-10 shadow-xs hover:shadow-card transition-all duration-300 group"
                >
                  <div className="grid lg:grid-cols-12 gap-8 lg:gap-12 items-center">
                    
                    {/* Image Column (7 Cols) */}
                    <div className={`lg:col-span-7 ${isEven ? 'lg:order-2' : 'lg:order-1'}`}>
                      <div className="w-full aspect-video rounded-2xl overflow-hidden border border-border bg-tint relative shadow-2xs">
                        <img
                          src={project.image}
                          alt={project.title}
                          className="w-full h-full object-cover group-hover:scale-[1.02] transition-transform duration-500 transform-gpu"
                        />
                      </div>
                    </div>

                    {/* Content Column (5 Cols) */}
                    <div className={`lg:col-span-5 flex flex-col justify-center ${isEven ? 'lg:order-1' : 'lg:order-2'}`}>
                      <div className="text-xs font-extrabold uppercase tracking-widest text-[#0E7490] mb-2">
                        {project.category}
                      </div>
                      <h3 className="text-2xl sm:text-3xl font-bold text-[#0C1A20] mb-4 leading-tight group-hover:text-[#0E7490] transition-colors">
                        {project.title}
                      </h3>
                      <p className="text-sm sm:text-base text-muted-foreground leading-relaxed mb-6">
                        {project.description}
                      </p>

                      {/* Awards */}
                      {project.awards && (
                        <div className="flex flex-wrap gap-2 mb-6">
                          {project.awards.map((award, i) => (
                            <span 
                              key={i} 
                              className="px-3 py-1 bg-[#FFFBEB] text-[#B45309] text-xs font-bold rounded-lg border border-[#FCD34D] flex items-center gap-1.5 shadow-2xs"
                            >
                              <Sparkles size={13} className="text-[#D97706] shrink-0" />
                              <span>{award}</span>
                            </span>
                          ))}
                        </div>
                      )}

                      {/* Tags */}
                      <div className="flex flex-wrap gap-1.5 mb-8">
                        {project.tags.map((tag, i) => (
                          <span 
                            key={i} 
                            className="px-2.5 py-1 bg-[#F5F9FA] text-[#0C1A20] text-xs font-semibold rounded-md border border-borderStrong"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>

                      {/* Actions */}
                      <div className="flex items-center gap-4 pt-2">
                        {project.demo && (
                          <a
                            href={project.demo}
                            target="_blank"
                            rel="noreferrer"
                            className="inline-flex items-center gap-2 px-6 py-3 bg-[#0E7490] text-white text-sm font-bold rounded-xl hover:bg-[#0E7490]/90 shadow-2xs hover:shadow-sm transition-all hover:-translate-y-0.5"
                          >
                            <span>Live Demo</span>
                            <ExternalLink size={15} />
                          </a>
                        )}
                        {project.github && (
                          <a
                            href={project.github}
                            target="_blank"
                            rel="noreferrer"
                            className="inline-flex items-center gap-2 px-6 py-3 bg-white border border-borderStrong text-[#0C1A20] text-sm font-bold rounded-xl hover:bg-tint hover:border-[#0E7490]/40 transition-all hover:-translate-y-0.5"
                          >
                            <span>GitHub Source</span>
                            <Code size={15} />
                          </a>
                        )}
                      </div>
                    </div>

                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>

        {/* ============================================================
            SECTION 3: TECHNICAL SKILLS & DOMAIN SHOWCASE
        ============================================================ */}
        <div className="mb-28 bg-white border border-border rounded-3xl p-6 sm:p-10 md:p-12 shadow-xs">
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="max-w-2xl mb-12"
          >
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#F5F9FA] border border-border text-xs font-bold text-[#0E7490] uppercase tracking-widest mb-4">
              <Terminal size={13} className="text-[#06B6D4]" />
              <span>Verified Capabilities</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold text-[#0C1A20] mb-3">
              Technical Stack & Domain Expertise
            </h2>
            <p className="text-sm sm:text-base text-muted-foreground leading-relaxed">
              A comprehensive breakdown of 60+ specialized languages, AI frameworks, cloud tools, and automation engines deployed across real-world enterprise applications.
            </p>
          </motion.div>

          <div className="divide-y divide-border">
            {skillCategories.map((cat, idx) => {
              const Icon = cat.icon;
              return (
                <motion.div
                  key={cat.id}
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: idx * 0.05 }}
                  className="py-6 sm:py-7 grid md:grid-cols-[240px_1fr] gap-4 sm:gap-8 items-start first:pt-0 last:pb-0"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-xl bg-[#F5F9FA] border border-border flex items-center justify-center text-[#0E7490] shrink-0">
                      <Icon size={18} />
                    </div>
                    <span className="text-sm font-bold text-[#0C1A20]">{cat.title}</span>
                  </div>

                  <div className="flex flex-wrap gap-2">
                    {cat.skills.map((skill, i) => (
                      <span
                        key={i}
                        className="px-3 py-1.5 bg-[#F5F9FA] border border-border hover:border-[#06B6D4]/50 rounded-lg text-xs font-semibold text-[#0C1A20] transition-colors cursor-default"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>

        {/* ============================================================
            SECTION 4: COMPLETE ENGINEERING ARCHIVE (BY CATEGORY)
        ============================================================ */}
        <div>
          <div className="max-w-2xl mb-14">
            <span className="text-xs font-extrabold uppercase tracking-widest text-[#06B6D4] block mb-2">Complete Repository</span>
            <h2 className="text-3xl font-bold text-[#0C1A20] mb-3">Engineering Archive</h2>
            <p className="text-base text-muted-foreground">
              Browse the complete collection of production systems, academic research projects, and specialized automation tools organized by domain.
            </p>
          </div>

          <div className="space-y-20">
            {archiveCategories.map((sec) => {
              const secProjects = projects.filter(p => p.categories.includes(sec.id as any));
              if (secProjects.length === 0) return null;
              const SecIcon = sec.icon;

              return (
                <section key={sec.id} className="scroll-mt-32" id={sec.id}>
                  <div className="flex items-center justify-between pb-4 mb-8 border-b-2 border-border">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-lg bg-white border border-border flex items-center justify-center text-[#0E7490]">
                        <SecIcon size={16} />
                      </div>
                      <h3 className="text-xl sm:text-2xl font-bold text-[#0C1A20]">{sec.title}</h3>
                    </div>
                    <span className="px-3 py-1 rounded-full bg-white border border-border text-xs font-bold text-muted-foreground">
                      {secProjects.length} {secProjects.length === 1 ? 'System' : 'Systems'}
                    </span>
                  </div>

                  <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
                    {secProjects.map((project, idx) => (
                      <motion.div
                        key={`${sec.id}-${project.id}`}
                        initial={{ opacity: 0, y: 15 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.3, delay: idx * 0.05 }}
                        className="bg-white border border-border rounded-2xl p-5 sm:p-6 shadow-2xs hover:shadow-card transition-all duration-300 flex flex-col group"
                      >
                        {/* Static Thumbnail */}
                        <div className="w-full aspect-video rounded-xl overflow-hidden bg-tint border border-border/60 mb-5 relative">
                          <img
                            src={project.image}
                            alt={project.title}
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 transform-gpu"
                          />
                        </div>

                        <div className="flex flex-col flex-grow">
                          <div className="text-[11px] font-extrabold uppercase tracking-wider text-[#0E7490] mb-1.5">
                            {project.category}
                          </div>
                          <h4 className="text-lg font-bold text-[#0C1A20] mb-2 group-hover:text-[#0E7490] transition-colors leading-snug">
                            {project.title}
                          </h4>
                          <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed mb-6 line-clamp-3 flex-grow">
                            {project.description}
                          </p>

                          {/* Tech Tags (Top 4 only to preserve cleanliness) */}
                          <div className="flex flex-wrap gap-1.5 mb-6 pt-2 border-t border-border/60">
                            {project.tags.slice(0, 4).map((tag, i) => (
                              <span
                                key={i}
                                className="px-2 py-0.5 bg-[#F5F9FA] text-muted-foreground text-[11px] font-semibold rounded border border-borderStrong"
                              >
                                {tag}
                              </span>
                            ))}
                            {project.tags.length > 4 && (
                              <span className="px-1.5 py-0.5 text-muted-foreground text-[11px] font-semibold">
                                +{project.tags.length - 4} more
                              </span>
                            )}
                          </div>

                          {/* Action Bar */}
                          <div className="flex items-center justify-between pt-3 border-t border-border mt-auto">
                            {project.github ? (
                              <a
                                href={project.github}
                                target="_blank"
                                rel="noreferrer"
                                className="inline-flex items-center gap-1.5 text-xs font-bold text-[#0C1A20] hover:text-[#0E7490] transition-colors"
                              >
                                <Code size={14} />
                                <span>Source Code</span>
                              </a>
                            ) : (
                              <span className="text-[11px] font-semibold text-muted-foreground/60 italic">Proprietary / Enterprise</span>
                            )}

                            {project.demo && (
                              <a
                                href={project.demo}
                                target="_blank"
                                rel="noreferrer"
                                className="inline-flex items-center gap-1.5 text-xs font-bold text-[#0E7490] hover:underline"
                              >
                                <span>Live Portal</span>
                                <ExternalLink size={13} />
                              </a>
                            )}
                          </div>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </section>
              );
            })}
          </div>
        </div>

      </div>
    </div>
  );
};

export default Projects;
