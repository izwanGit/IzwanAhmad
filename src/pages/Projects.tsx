import React from 'react';
import { motion } from 'framer-motion';
import { ExternalLink } from 'lucide-react';

const projects = [
  {
    title: "Beruang",
    category: "AI / Mobile Application",
    description: "AI-powered money management app using a Bi-LSTM model trained on 220,000+ Malaysian transactions (99.61% accuracy). Features a RAG-based financial advisor and Gemini 2.5 Flash for receipt OCR.",
    tags: ["React Native", "Node.js", "TensorFlow.js", "Firebase", "xAI Grok 4.1"],
    image: "/images/beruang-placeholder.jpg",
    awards: ["Best System Architecture Award", "86.77 SUS Score"],
    github: "https://github.com/izwanGit/Beruang"
  },
  {
    title: "RentVerse",
    category: "DevSecOps / Web Platform",
    description: "Enterprise-grade secure rental platform bridging a Next.js frontend with a hardened Node.js backend. Features Zero-Trust MFA, anomaly detection (impossible travel), and tamper-evident digital agreements.",
    tags: ["Next.js", "Node.js", "GitHub Actions", "Puppeteer", "Trivy"],
    image: "/images/rentverse-placeholder.jpg",
    awards: ["Champion", "Best Automated Security Testing", "Best Zero Trust", "Best Threat Intel"],
    github: "https://github.com/izwanGit/uitm-devops-challenge_TeamOne"
  },
  {
    title: "Kuehlicious",
    category: "Full-Stack Web System",
    description: "Award-winning web-based information system designed to digitize a local Kuih Batang Buruk business. Features dual scopes (Admin/Customer) for complete order lifecycle management.",
    tags: ["PHP", "MySQL", "JavaScript", "HTML/CSS"],
    image: "/images/kuehlicious-placeholder.jpg",
    awards: ["Winner - Youth Innovation Final Project Presentation"],
    github: "https://github.com/izwanGit/KuihBatangBurukOrderingSystem"
  },
  {
    title: "Batik Recognition System",
    category: "Computer Vision",
    description: "Real-time CV system to accurately classify traditional batik patterns as Malaysian or Indonesian using a Vision Transformer (ViT) deep learning model.",
    tags: ["Python", "OpenCV", "Flask", "Vision Transformer"],
    image: "/images/batik-placeholder.jpg",
    awards: ["Best AI Booth Award"],
    github: "https://github.com/izwanGit/BatikRecognitionAndClassification"
  },
  {
    title: "Malaysian Hawker Food Recognition",
    category: "Deep Learning",
    description: "System built in MATLAB that recognizes Malaysian hawker food and estimates calories. Fine-tuned SqueezeNet CNN via transfer learning on custom-collected dataset.",
    tags: ["MATLAB", "SqueezeNet", "Computer Vision"],
    image: "/images/food-placeholder.jpg",
    github: "https://github.com/izwanGit/malaysian-food-recognition"
  },
  {
    title: "YuLaoshi: AI Mandarin Tutor",
    category: "AI Chatbot",
    description: "Full-stack AI chatbot serving as a conversational Mandarin tutor combining GPT-4o-mini intelligence with a gamified listening quiz module and text-to-speech.",
    tags: ["Python", "Flask", "GPT-4o-mini", "SQLite"],
    image: "/images/yulaoshi-placeholder.jpg",
    github: "https://github.com/izwanGit/LaoshiYu-Chatbot",
    demo: "https://izwan.pythonanywhere.com/"
  }
];

const Projects = () => {
  return (
    <div className="w-full pt-32 pb-24">
      <div className="container mx-auto px-6 max-w-7xl">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="max-w-3xl mb-16"
        >
          <h1 className="text-4xl md:text-5xl font-bold tracking-tight text-foreground mb-6">
            Engineering Archive
          </h1>
          <p className="text-xl text-muted-foreground">
            A comprehensive collection of my production systems, hackathon builds, and academic capstones.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.1 }}
              className="flex flex-col bg-white border border-border rounded-xl overflow-hidden hover:shadow-card transition-all group"
            >
              <div className="w-full aspect-video bg-tint relative overflow-hidden border-b border-border">
                <img 
                  src={project.image} 
                  alt={project.title} 
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" 
                />
              </div>
              <div className="p-6 flex flex-col flex-grow">
                <div className="text-xs font-bold uppercase tracking-wider text-primary mb-2">
                  {project.category}
                </div>
                <h3 className="text-xl font-bold text-foreground mb-3">{project.title}</h3>
                <p className="text-sm text-muted-foreground mb-6 flex-grow leading-relaxed">
                  {project.description}
                </p>
                
                {project.awards && (
                  <div className="mb-4 flex flex-wrap gap-2">
                    {project.awards.map((award, i) => (
                      <span key={i} className="px-2 py-1 bg-[#FFFBEB] text-[#B45309] text-[11px] font-bold rounded border border-[#FCD34D]">
                        {award}
                      </span>
                    ))}
                  </div>
                )}

                <div className="flex flex-wrap gap-2 mb-6">
                  {project.tags.map((tag, i) => (
                    <span key={i} className="px-2 py-1 bg-background text-muted-foreground text-xs font-semibold rounded border border-borderStrong">
                      {tag}
                    </span>
                  ))}
                </div>

                <div className="flex items-center gap-4 mt-auto pt-4 border-t border-border">
                  {project.github && (
                    <a href={project.github} target="_blank" rel="noreferrer" className="flex items-center gap-2 text-sm font-semibold text-foreground hover:text-primary transition-colors">
                      Code
                    </a>
                  )}
                  {project.demo && (
                    <a href={project.demo} target="_blank" rel="noreferrer" className="flex items-center gap-2 text-sm font-semibold text-foreground hover:text-primary transition-colors">
                      <ExternalLink size={16} /> Live Demo
                    </a>
                  )}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Projects;
