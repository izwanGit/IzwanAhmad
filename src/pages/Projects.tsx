import React from 'react';
import { motion } from 'framer-motion';
import { ExternalLink } from 'lucide-react';

const projects = [
  {
    title: "Beruang",
    category: "AI / Mobile Application",
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
    title: "RentVerse Platform",
    category: "DevSecOps / Web Platform",
    description: "Enterprise-grade secure rental platform for the 21-day UiTM Mobile SecOps Challenge. Next.js frontend + hardened Node.js backend. Zero-Trust MFA, anomaly detection (impossible travel at 800km/h), 14-stage CI/CD pipeline, and tamper-evident SHA-256 digital agreements.",
    tags: ["Next.js", "Node.js", "GitHub Actions", "Puppeteer", "Trivy", "Zero-Trust"],
    images: ['/images/rentverse-laptop.jpg', '/images/rentverse-home.jpg', '/images/rentverse.jpeg'],
    awards: ["Champion (1st Place)", "Best Automated Security Testing", "Best Zero Trust Logic", "Best Threat Intelligence"],
    github: "https://github.com/izwanGit/uitm-devops-challenge_TeamOne"
  },
  {
    title: "Mont Switzerland Corporate & E-Commerce",
    category: "Full-Stack Web / E-Commerce",
    description: "Architected and deployed corporate website within a 24-hour deadline. Engineered affiliate tracking and ad performance analytical workflows, driving sales from RM100/day to RM100,000/month.",
    tags: ["Web Architecture", "E-Commerce", "Zoho Mail", "Affiliate Tracking", "DNS / Domain"],
    images: ['/images/montswitzerland-laptop.jpg'],
    awards: ["Exceeded Sales Target (+ Allowance Increment)"],
  },
  {
    title: "Play2Grow Edutainment App",
    category: "Android Application",
    description: "Edutainment Android application assisting Malaysian parents in preparing children (ages 4-6) for primary school. Dual-mode system (Parent Mode for tasks/reports + Kid Mode for interactive quizzes) powered by Firebase Firestore.",
    tags: ["Java", "Android Studio", "Firebase Auth", "Firestore NoSQL"],
    images: ['/images/play2grow-mobile.jpg'],
  },
  {
    title: "UiTM Event Management System (UEMS)",
    category: "Java Web Application",
    description: "Java web application enabling admins to manage events and students to register and submit feedback. Server-side logic built using Jakarta Servlets and JSP, persisted in MySQL, deployed on Apache Tomcat.",
    tags: ["Java", "Jakarta Servlets", "JSP", "MySQL", "Apache Tomcat"],
    images: ['/images/uems-laptop.jpg'],
    github: "https://github.com/izwanGit/UiTM-Event-Management-System"
  },
  {
    title: "Batik Recognition System",
    category: "Computer Vision / Deep Learning",
    description: "Real-time system that classifies Malaysian vs Indonesian batik patterns using a Vision Transformer (ViT). 94.2% accuracy. Won Best AI Booth at AI Seminar 2025 for the live interactive webcam demo.",
    tags: ["Python", "OpenCV", "Flask", "Vision Transformer (ViT)", "Roboflow"],
    images: ['/images/batik-main.jpeg', '/images/batik-demo.jpeg'],
    awards: ["Best AI Booth Award — AI Seminar 2025"],
    github: "https://github.com/izwanGit/BatikRecognitionAndClassification"
  },
  {
    title: "PETRONAS HCSM Operations Hub",
    category: "Enterprise RPA & ITSM Platform",
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
    title: "Full Weekly Report Automation",
    category: "Zero-Touch Workflow Automation",
    description: "Zero-touch Power Automate pipeline for myCareerX ITSM reporting. Processes 4 raw Excel files with 6 TypeScript Office Scripts every Monday at 7:00 AM. Generates PETRONAS teal HTML emails, resolves Office 365 recipients, and sends Teams reminders with @mentions.",
    tags: ["Power Automate", "TypeScript", "Office Scripts", "Outlook HTML", "SharePoint"],
    images: [
      '/images/petronas-weekly-email.jpg',
      '/images/petronas-weekly-reminder.jpg'
    ],
    awards: ["Replaced 3-4 Hours of Weekly Manual Work"],
  },
  {
    title: "Full Monthly Report Automation",
    category: "Cloud-Native Reporting Pipeline",
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
    title: "Pre-Deployment Automation & Teams Handoff",
    category: "RPA & Document Automation",
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
    title: "Priority Ticket Automation System",
    category: "Real-Time Chat Listener & Bot",
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
    title: "YuLaoshi: AI Mandarin Tutor",
    category: "AI Chatbot / Full-Stack",
    description: "Full-stack AI chatbot serving as a conversational Mandarin tutor for UiTM students. Combines GPT-4o-mini with a gamified listening quiz module and real-time audio via gTTS. Deployed on PythonAnywhere.",
    tags: ["Python", "Flask", "GPT-4o-mini", "SQLite", "gTTS"],
    images: ['/images/yulaoshi-main.jpeg', '/images/yulaoshi-chat.jpeg', '/images/yulaoshi-quiz.jpeg'],
    github: "https://github.com/izwanGit/LaoshiYu-Chatbot",
    demo: "https://izwan.pythonanywhere.com/"
  },
  {
    title: "Kuehlicious",
    category: "Full-Stack Web System",
    description: "Award-winning web-based ordering system digitizing a local Kuih Batang Buruk business. Built solo using PHP/MySQL with dual user scopes (Admin/Customer) for complete SDLC lifecycle. Winner — Youth Innovation Final Project 2023.",
    tags: ["PHP", "MySQL", "JavaScript", "HTML/CSS"],
    images: ['/images/kuehlicious-laptop.jpg'],
    awards: ["Winner — Youth Innovation Final Project Presentation 2023"],
    github: "https://github.com/izwanGit/KuihBatangBurukOrderingSystem"
  },
];

const ProjectCard = ({ project, idx }: { project: typeof projects[0]; idx: number }) => {
  const [activeImg, setActiveImg] = React.useState(0);

  React.useEffect(() => {
    if (project.images.length <= 1) return;
    const t = setInterval(() => {
      setActiveImg(i => (i + 1) % project.images.length);
    }, 3500);
    return () => clearInterval(t);
  }, [project.images.length]);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: idx * 0.08 }}
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
          <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-1.5">
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
              <span key={i} className="px-2 py-1 bg-[#FFFBEB] text-[#B45309] text-[11px] font-bold rounded border border-[#FCD34D]">
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
  return (
    <div className="w-full pt-32 pb-24">
      <div className="container mx-auto px-6 max-w-7xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="max-w-3xl mb-16"
        >
          <div className="text-[13px] font-extrabold uppercase tracking-widest text-accent mb-3">Work</div>
          <h1 className="text-4xl md:text-5xl font-bold tracking-tight text-foreground mb-6">
            Engineering Archive
          </h1>
          <p className="text-xl text-muted-foreground">
            A collection of my production systems, hackathon builds, research projects, and academic capstones — each one shipped and real.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project, idx) => (
            <ProjectCard key={idx} project={project} idx={idx} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Projects;
