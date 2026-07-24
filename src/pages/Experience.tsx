import React from 'react';
import { motion } from 'framer-motion';
import { Briefcase, GraduationCap, Trophy, Award, Building, Sparkles, CheckCircle2, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import PetronasShowcase from '../components/PetronasShowcase';

const experiences = [
  {
    company: "PETRONAS Digital",
    role: "Software Engineer Intern (HCSM Operations)",
    period: "Nov 2024 – Feb 2025",
    location: "Kuala Lumpur, Malaysia",
    logo: "/images/tools/microsoft.svg", // PETRONAS / Corporate context
    summary: "Supported myCareerX (Oracle HCM Cloud) serving 50,000+ PETRONAS employees across Malaysia. Solo-engineered and deployed 10+ production RPA platforms, automated pipelines, and BI dashboards.",
    metrics: [
      { label: "Production Systems", value: "10+" },
      { label: "Solo & End-to-End", value: "3 Months" },
      { label: "Employees Served", value: "50,000+" },
      { label: "Post-Departure", value: "100% Autonomous" },
    ],
    showcase: true, // Renders PetronasShowcase component
  },
  {
    company: "West Malayan Group",
    role: "Corporate Web Architect & Digital Growth Engineer",
    period: "2023 – 2024",
    location: "Malaysia",
    summary: "Architected and deployed corporate e-commerce web platform under strict 24-hour turnaround. Built affiliate performance tracking and analytical workflows.",
    metrics: [
      { label: "Revenue Scaling", value: "RM100/day → RM100k/mo" },
      { label: "Deployment Deadline", value: "24 Hours" },
      { label: "Recognition", value: "Outstanding Performance + Increment" },
    ],
    achievements: [
      "Engineered automated affiliate tracking scripts linking digital ad campaigns to checkout conversion.",
      "Optimized DNS, domain infrastructure, and transactional email deliverability via Zoho Mail.",
      "Awarded Outstanding Performance Award and corporate allowance increment for exceeding targets."
    ],
    showcase: false,
  },
  {
    company: "Independent Software & AI Engineer",
    role: "Freelance Consultant",
    period: "2023 – Present",
    location: "Remote / Malaysia",
    summary: "Delivered custom web applications, AI system integrations, and business process automation for clients and local businesses.",
    metrics: [
      { label: "Client Platforms", value: "Multiple Shipped" },
      { label: "Key Clients", value: "O-Iqra, Mont Switzerland, Kuehlicious" },
    ],
    achievements: [
      "Built O-Iqra Islamic EdTech learning platform with responsive frontend architecture.",
      "Digitized local business operations for Kuehlicious with complete SDLC ordering system.",
      "Integrated LLMs (OpenAI, Gemini, Grok) and Vision Transformers for clients."
    ],
    showcase: false,
  }
];

const education = {
  institution: "Universiti Teknologi MARA (UiTM)",
  degree: "Diploma in Computer Science",
  gpa: "3.9+ CGPA",
  period: "2022 – 2025",
  honors: [
    "Vice Chancellor's Award (Anugerah Naib Canselor)",
    "Dean's List Award (Every Semester)",
    "Best System Architecture Award (Final Year Project — Beruang)",
  ]
};

const Experience = () => {
  return (
    <div className="w-full pt-32 pb-24">
      <div className="container mx-auto px-6 max-w-7xl">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="max-w-3xl mb-16"
        >
          <div className="text-[13px] font-extrabold uppercase tracking-widest text-accent mb-3 flex items-center gap-2">
            <Briefcase size={14} />
            Career & Trajectory
          </div>
          <h1 className="text-4xl md:text-5xl font-bold tracking-tight text-foreground mb-6">
            Work Experience & Impact
          </h1>
          <p className="text-xl text-muted-foreground leading-relaxed">
            Enterprise software engineering, production automation, digital revenue scaling, and academic excellence — proven in high-stakes environments.
          </p>
        </motion.div>

        {/* Corporate Experience Timeline */}
        <div className="space-y-16 mb-24">
          {experiences.map((exp, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1 }}
              className="bg-white border border-border rounded-2xl p-8 shadow-sm hover:shadow-card transition-all"
            >
              {/* Header Info */}
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6 pb-6 border-b border-border">
                <div>
                  <div className="flex items-center gap-3 mb-1">
                    <span className="p-2 bg-tint text-primary rounded-lg">
                      <Building size={20} />
                    </span>
                    <h2 className="text-2xl md:text-3xl font-bold text-foreground">{exp.company}</h2>
                  </div>
                  <div className="text-lg font-semibold text-primary mt-1">{exp.role}</div>
                </div>
                <div className="text-left md:text-right">
                  <div className="text-sm font-bold text-foreground">{exp.period}</div>
                  <div className="text-xs text-muted-foreground">{exp.location}</div>
                </div>
              </div>

              <p className="text-base text-muted-foreground mb-8 leading-relaxed max-w-4xl">
                {exp.summary}
              </p>

              {/* Metrics Grid */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
                {exp.metrics.map((m, mIdx) => (
                  <div key={mIdx} className="p-4 bg-background rounded-xl border border-border">
                    <div className="text-xl md:text-2xl font-black text-primary mb-1">{m.value}</div>
                    <div className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">{m.label}</div>
                  </div>
                ))}
              </div>

              {/* PETRONAS Interactive System Showcase */}
              {exp.showcase && (
                <div className="mt-8 pt-8 border-t border-border">
                  <div className="text-sm font-extrabold uppercase tracking-widest text-[#00B1A9] mb-6 flex items-center gap-2">
                    <Sparkles size={16} />
                    Shipped Systems Showcase
                  </div>
                  <div className="bg-[#00B1A9] p-6 md:p-8 rounded-2xl shadow-inner">
                    <PetronasShowcase />
                  </div>
                </div>
              )}

              {/* Bullet Achievements */}
              {exp.achievements && (
                <ul className="space-y-3 pt-4 border-t border-border">
                  {exp.achievements.map((ach, aIdx) => (
                    <li key={aIdx} className="flex items-start gap-3 text-sm text-foreground leading-relaxed">
                      <CheckCircle2 size={18} className="text-primary shrink-0 mt-0.5" />
                      <span>{ach}</span>
                    </li>
                  ))}
                </ul>
              )}
            </motion.div>
          ))}
        </div>

        {/* Education & Academic Distinction */}
        <section className="mb-24">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-8"
          >
            <div className="text-[13px] font-extrabold uppercase tracking-widest text-accent mb-3 flex items-center gap-2">
              <GraduationCap size={16} />
              Academic Excellence
            </div>
            <h2 className="text-3xl font-bold text-foreground">Education & Honors</h2>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="bg-white border border-border rounded-2xl p-8 shadow-sm"
          >
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6 pb-6 border-b border-border">
              <div>
                <h3 className="text-2xl font-bold text-foreground">{education.institution}</h3>
                <div className="text-lg font-semibold text-primary mt-1">{education.degree}</div>
              </div>
              <div className="text-left md:text-right">
                <div className="inline-block px-3 py-1 bg-tint text-primary text-sm font-extrabold rounded-md mb-1">
                  {education.gpa}
                </div>
                <div className="text-xs text-muted-foreground">{education.period}</div>
              </div>
            </div>

            <div className="space-y-3">
              <div className="text-xs font-bold uppercase tracking-wider text-muted-foreground mb-2">Honors & Recognitions</div>
              {education.honors.map((honor, hIdx) => (
                <div key={hIdx} className="flex items-center gap-3 p-3 bg-background rounded-lg border border-border">
                  <Trophy size={18} className="text-[#FDB924] shrink-0" />
                  <span className="text-sm font-bold text-foreground">{honor}</span>
                </div>
              ))}
            </div>
          </motion.div>
        </section>

        {/* Call to Action */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="p-8 md:p-12 bg-primary text-white rounded-2xl text-center flex flex-col items-center justify-center"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Interested in working together?</h2>
          <p className="text-white/80 max-w-xl mb-8">
            Whether for high-impact software engineering roles or freelance web & AI development, let's build something exceptional.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link
              to="/freelance"
              className="px-6 py-3 bg-white text-primary font-bold rounded-lg hover:bg-slate-100 transition-all flex items-center gap-2"
            >
              Freelance Services <ArrowRight size={16} />
            </Link>
            <a
              href="mailto:works.izwan@gmail.com"
              className="px-6 py-3 bg-transparent border-2 border-white/40 text-white font-bold rounded-lg hover:bg-white/10 transition-all"
            >
              Get In Touch
            </a>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Experience;
