import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Terminal, Database, Sparkles, Building } from 'lucide-react';
import { Link } from 'react-router-dom';

const fadeInUp = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1 }
  }
};

const Home = () => {
  return (
    <div className="w-full">
      {/* ================= HERO SECTION ================= */}
      <section className="relative min-h-[90vh] flex items-center pt-20 pb-16">
        <div className="container mx-auto px-6 max-w-7xl">
          <motion.div 
            variants={staggerContainer}
            initial="hidden"
            animate="visible"
            className="max-w-4xl"
          >
            <motion.div variants={fadeInUp} className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white border border-border shadow-sm text-sm font-semibold text-primary mb-8">
              <span className="w-2 h-2 rounded-full bg-statusGreen animate-pulse" />
              Open to full-time opportunities
            </motion.div>
            
            <motion.h1 variants={fadeInUp} className="text-5xl md:text-7xl font-bold tracking-tight text-foreground leading-[1.1] mb-6">
              Software Engineer building <br className="hidden md:block"/>
              <span className="text-primary">high-impact systems.</span>
            </motion.h1>
            
            <motion.p variants={fadeInUp} className="text-xl text-muted-foreground leading-relaxed max-w-2xl mb-10">
              Graduating Computer Science student at UiTM. I specialize in building end-to-end web apps, AI systems, and workflow automation. Transforming complex challenges into scalable, autonomous solutions.
            </motion.p>
            
            <motion.div variants={fadeInUp} className="flex flex-wrap gap-4">
              <Link to="/projects" className="inline-flex items-center gap-2 px-8 py-4 bg-primary text-white rounded-md font-bold hover:bg-primary-hover transition-all hover:shadow-hover hover:-translate-y-0.5">
                View My Work
                <ArrowRight size={18} />
              </Link>
              <Link to="/freelance" className="inline-flex items-center gap-2 px-8 py-4 bg-white border border-borderStrong text-foreground rounded-md font-bold hover:bg-tint transition-all hover:shadow-card hover:-translate-y-0.5">
                Freelance Services
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* ================= PETRONAS SHOWCASE ================= */}
      <section className="py-24 bg-white border-y border-border relative overflow-hidden">
        {/* Subtle PETRONAS colored ambient glows */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-[#00B1A9] rounded-full blur-[120px] opacity-[0.03] pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-[#763F98] rounded-full blur-[120px] opacity-[0.03] pointer-events-none" />
        
        <div className="container mx-auto px-6 max-w-7xl relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            className="flex flex-col md:flex-row gap-16 items-start"
          >
            <div className="md:w-1/3">
              <div className="text-[13px] font-extrabold uppercase tracking-widest text-[#00B1A9] mb-4 flex items-center gap-2">
                <Building size={16} />
                Corporate Impact
              </div>
              <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-6">
                PETRONAS Digital
              </h2>
              <p className="text-muted-foreground leading-relaxed mb-6">
                During my internship with the Human Capital Solution Management team, I supported myCareerX (Oracle HCM Cloud) serving 50,000+ employees.
              </p>
              <div className="flex gap-4">
                <div className="p-4 bg-tint rounded-lg border border-border">
                  <div className="text-2xl font-black text-primary mb-1">10+</div>
                  <div className="text-sm font-semibold text-muted-foreground">Production Systems Shipped</div>
                </div>
                <div className="p-4 bg-tint rounded-lg border border-border">
                  <div className="text-2xl font-black text-primary mb-1">3mo</div>
                  <div className="text-sm font-semibold text-muted-foreground">Development Timeline</div>
                </div>
              </div>
            </div>
            
            <div className="md:w-2/3 grid grid-cols-1 sm:grid-cols-2 gap-6">
              {[
                { title: "HCSM Operations Hub", desc: "Enterprise ITSM Reporting & RPA Platform built with Python & Streamlit. Cut deployment prep from 30 min to under 1 min." },
                { title: "Zero-Touch Weekly Pipeline", desc: "Power Automate + Office Scripts (TypeScript) eliminating 3-4 hours of manual weekly work for ticket ageing reports." },
                { title: "Monthly Report Automation", desc: "Cloud-native Power BI to PowerPoint pipeline running autonomously on the 1st of every month." },
                { title: "Priority Ticket System", desc: "24/7 Teams monitoring system that auto-logs, enriches, and tracks urgent tickets." }
              ].map((item, i) => (
                <div key={i} className="p-6 bg-white border border-border rounded-xl shadow-sm hover:shadow-card transition-all hover:-translate-y-1 group">
                  <h3 className="text-lg font-bold text-foreground mb-3 group-hover:text-[#00B1A9] transition-colors">{item.title}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">{item.desc}</p>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* ================= PROJECTS TEASER ================= */}
      <section className="py-24">
        <div className="container mx-auto px-6 max-w-7xl">
          <div className="flex justify-between items-end mb-12">
            <div>
              <div className="text-[13px] font-extrabold uppercase tracking-widest text-accent mb-2">Featured Work</div>
              <h2 className="text-3xl md:text-4xl font-bold text-foreground">Selected Projects</h2>
            </div>
            <Link to="/projects" className="hidden sm:inline-flex items-center gap-2 font-semibold text-primary hover:text-primary-hover">
              View all projects <ArrowRight size={16} />
            </Link>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {/* Project 1 */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="group cursor-pointer"
            >
              <div className="w-full aspect-[4/3] bg-white border border-border rounded-xl mb-6 overflow-hidden shadow-sm group-hover:shadow-hover transition-all">
                <img src="/images/beruang-placeholder.jpg" alt="Beruang App" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
              </div>
              <div className="flex items-center gap-3 mb-3">
                <span className="px-3 py-1 bg-tint text-primary text-xs font-bold rounded-full border border-[#E2EEF1]">AI / Mobile</span>
                <span className="px-3 py-1 bg-[#FFFBEB] text-[#B45309] text-xs font-bold rounded-full border border-[#FCD34D]">Best Architecture Award</span>
              </div>
              <h3 className="text-2xl font-bold text-foreground mb-2 group-hover:text-primary transition-colors">Beruang</h3>
              <p className="text-muted-foreground leading-relaxed">AI-powered money management app using a Bi-LSTM model trained on 220k+ Malaysian transactions.</p>
            </motion.div>

            {/* Project 2 */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="group cursor-pointer mt-0 md:mt-12"
            >
              <div className="w-full aspect-[4/3] bg-white border border-border rounded-xl mb-6 overflow-hidden shadow-sm group-hover:shadow-hover transition-all">
                <img src="/images/rentverse-placeholder.jpg" alt="RentVerse" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
              </div>
              <div className="flex items-center gap-3 mb-3">
                <span className="px-3 py-1 bg-tint text-primary text-xs font-bold rounded-full border border-[#E2EEF1]">Web / DevSecOps</span>
                <span className="px-3 py-1 bg-[#FFFBEB] text-[#B45309] text-xs font-bold rounded-full border border-[#FCD34D]">Champion (4 Awards)</span>
              </div>
              <h3 className="text-2xl font-bold text-foreground mb-2 group-hover:text-primary transition-colors">RentVerse</h3>
              <p className="text-muted-foreground leading-relaxed">Enterprise-grade secure rental platform with Shift-Left security and AI-driven fraud detection.</p>
            </motion.div>
          </div>
          
          <div className="mt-12 sm:hidden flex justify-center">
             <Link to="/projects" className="inline-flex items-center gap-2 font-semibold text-primary">
              View all projects <ArrowRight size={16} />
            </Link>
          </div>
        </div>
      </section>

    </div>
  );
};

export default Home;
