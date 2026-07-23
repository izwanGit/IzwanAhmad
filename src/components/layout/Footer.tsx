import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Mail, MessageCircle } from 'lucide-react';

const Footer = () => {
  return (
    <div className="relative z-10 w-full">
      {/* ============================================================
          7. SOCIAL PROOF / PROVEN RESULTS SECTION
      ============================================================ */}
      <section className="py-20 bg-white border-t border-border">
        <div className="container mx-auto px-6 max-w-7xl">
          <div className="text-center mb-12">
            <span className="text-[13px] font-extrabold uppercase tracking-widest text-accent mb-2 block">
              PROVEN RESULTS
            </span>
            <h2 className="text-3xl md:text-4xl font-bold text-foreground">
              The work speaks for itself
            </h2>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="bg-white border border-border border-t-4 border-t-accent rounded-xl p-8 text-center shadow-card hover:shadow-hover hover:-translate-y-1 transition-all"
            >
              <div className="text-4xl md:text-5xl font-black text-primary mb-2">596</div>
              <div className="text-sm font-semibold text-muted-foreground">
                LinkedIn reactions on PETRONAS announcement
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="bg-white border border-border border-t-4 border-t-accent rounded-xl p-8 text-center shadow-card hover:shadow-hover hover:-translate-y-1 transition-all"
            >
              <div className="text-4xl md:text-5xl font-black text-primary mb-2">849</div>
              <div className="text-sm font-semibold text-muted-foreground">
                LinkedIn reactions on Beruang launch
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="bg-white border border-border border-t-4 border-t-accent rounded-xl p-8 text-center shadow-card hover:shadow-hover hover:-translate-y-1 transition-all"
            >
              <div className="text-4xl md:text-5xl font-black text-primary mb-2">19,923</div>
              <div className="text-sm font-semibold text-muted-foreground">
                Impressions on a single post
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ============================================================
          8. CONTACT SECTION
      ============================================================ */}
      <section className="py-24 bg-primary text-white text-center" id="contact">
        <div className="container mx-auto px-6 max-w-4xl">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-4xl md:text-5xl font-bold tracking-tight text-white mb-4"
          >
            Ready to build something?
          </motion.h2>
          
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-lg text-white/85 max-w-md mx-auto mb-10"
          >
            Tell me about your project. I reply within 24 hours.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="flex flex-wrap justify-center gap-5 mb-12"
          >
            <a
              href="https://wa.me/60100000000"
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 px-8 py-4 bg-white text-primary rounded-md font-bold hover:bg-slate-50 transition-all hover:shadow-lg hover:-translate-y-0.5"
            >
              <MessageCircle size={20} className="text-[#25D366]" />
              WhatsApp me
            </a>

            <a
              href="mailto:works.izwan@gmail.com"
              className="inline-flex items-center gap-2 px-8 py-4 bg-transparent border-2 border-white/40 text-white rounded-md font-bold hover:border-white hover:bg-white/10 transition-all hover:-translate-y-0.5"
            >
              <Mail size={20} />
              Send an email
            </a>
          </motion.div>

          <div className="flex justify-center items-center gap-8">
            <a
              href="https://www.linkedin.com/in/izwanworks/"
              target="_blank"
              rel="noreferrer"
              className="text-white/80 font-semibold hover:text-white transition-colors"
            >
              LinkedIn
            </a>
            <a
              href="https://github.com/izwanGit"
              target="_blank"
              rel="noreferrer"
              className="text-white/80 font-semibold hover:text-white transition-colors"
            >
              GitHub
            </a>
          </div>
        </div>
      </section>

      {/* ============================================================
          9. FOOTER
      ============================================================ */}
      <footer className="bg-[#0C1A20] text-white/60 py-9 text-sm">
        <div className="container mx-auto px-6 max-w-7xl flex flex-col sm:flex-row items-center justify-between gap-6">
          <Link to="/" className="flex items-center">
            <img
              src="/images/logo-full.png"
              alt="Izwan Ahmad Logo"
              className="h-[38px] object-contain"
            />
          </Link>

          <div className="text-center font-medium">
            Built with intention. © 2026 Muhammad Izwan Ahmad.
          </div>

          <div className="flex items-center gap-6 font-semibold">
            <a
              href="https://www.linkedin.com/in/izwanworks/"
              target="_blank"
              rel="noreferrer"
              className="text-white/70 hover:text-accent transition-colors"
            >
              LinkedIn
            </a>
            <a
              href="https://github.com/izwanGit"
              target="_blank"
              rel="noreferrer"
              className="text-white/70 hover:text-accent transition-colors"
            >
              GitHub
            </a>
            <a
              href="https://wa.me/60100000000"
              target="_blank"
              rel="noreferrer"
              className="text-white/70 hover:text-accent transition-colors"
            >
              WhatsApp
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Footer;
