import React from 'react';
import { ArrowRight, Mail, MessageCircle } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-white border-t border-border pt-20 pb-10 relative z-10">
      <div className="container mx-auto px-6 max-w-7xl">
        <div className="max-w-3xl mb-20">
          <h2 className="text-4xl md:text-5xl font-bold tracking-tight text-foreground mb-6">
            Ready to build something?
          </h2>
          <p className="text-lg text-muted-foreground mb-8">
            Tell me about your project. I reply within 24 hours.
          </p>
          <div className="flex flex-wrap gap-4">
            <a
              href="https://wa.me/60100000000"
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 px-6 py-3 bg-[#25D366] text-white rounded-md font-semibold hover:bg-[#20bd5a] transition-all hover:-translate-y-0.5 hover:shadow-hover"
            >
              <MessageCircle size={18} />
              WhatsApp Me
            </a>
            <a
              href="mailto:works.izwan@gmail.com"
              className="inline-flex items-center gap-2 px-6 py-3 bg-white border border-borderStrong text-foreground rounded-md font-semibold hover:bg-tint transition-all hover:-translate-y-0.5 hover:shadow-card"
            >
              <Mail size={18} />
              Send an email
            </a>
          </div>
        </div>

        <div className="flex flex-col md:flex-row items-center justify-between pt-8 border-t border-border gap-6">
          <p className="text-sm text-muted-foreground font-medium">
            Built with intention. © {new Date().getFullYear()} Muhammad Izwan Ahmad.
          </p>
          <div className="flex items-center gap-6 text-muted-foreground">
            <a
              href="https://www.linkedin.com/in/izwanworks/"
              target="_blank"
              rel="noreferrer"
              className="hover:text-primary transition-colors font-bold"
            >
              LinkedIn
            </a>
            <a
              href="https://github.com/izwanGit"
              target="_blank"
              rel="noreferrer"
              className="hover:text-primary transition-colors font-bold"
            >
              GitHub
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
