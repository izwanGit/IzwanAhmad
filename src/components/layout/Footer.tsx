import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Mail, MessageCircle } from 'lucide-react';

const LinkedInIcon = ({ size = 18 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
    <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
  </svg>
);

const GithubIcon = ({ size = 18 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
  </svg>
);

const Footer = () => {
  return (
    <div className="relative z-10 w-full">
      {/* ============================================================
          CONTACT SECTION
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
              className="inline-flex items-center gap-2.5 px-8 py-4 bg-white text-primary rounded-md font-bold hover:bg-slate-50 transition-all hover:shadow-lg hover:-translate-y-0.5"
            >
              <MessageCircle size={20} className="text-[#25D366]" />
              WhatsApp me
            </a>

            <a
              href="mailto:works.izwan@gmail.com"
              className="inline-flex items-center gap-2.5 px-8 py-4 bg-transparent border-2 border-white/40 text-white rounded-md font-bold hover:border-white hover:bg-white/10 transition-all hover:-translate-y-0.5"
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
              className="inline-flex items-center gap-2 text-white/80 font-semibold hover:text-white transition-colors"
            >
              <LinkedInIcon size={18} />
              LinkedIn
            </a>
            <a
              href="https://github.com/izwanGit"
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 text-white/80 font-semibold hover:text-white transition-colors"
            >
              <GithubIcon size={18} />
              GitHub
            </a>
          </div>
        </div>
      </section>

      {/* ============================================================
          FOOTER
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
              className="inline-flex items-center gap-1.5 text-white/70 hover:text-accent transition-colors"
            >
              <LinkedInIcon size={15} />
              LinkedIn
            </a>
            <a
              href="https://github.com/izwanGit"
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-1.5 text-white/70 hover:text-accent transition-colors"
            >
              <GithubIcon size={15} />
              GitHub
            </a>
            <a
              href="https://wa.me/60100000000"
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-1.5 text-white/70 hover:text-accent transition-colors"
            >
              <MessageCircle size={15} />
              WhatsApp
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Footer;
