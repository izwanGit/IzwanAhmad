import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X } from 'lucide-react';
import { cn } from '@/lib/utils';

const navLinks = [
  { name: 'Home', path: '/' },
  { name: 'Projects', path: '/projects' },
  { name: 'Freelance', path: '/freelance' },
];

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header
      className={cn(
        'fixed top-0 w-full z-50 transition-all duration-300',
        isScrolled
          ? 'bg-white/90 backdrop-blur-md border-b border-border shadow-sm py-3'
          : 'bg-transparent py-5'
      )}
    >
      <div className="container mx-auto px-6 max-w-7xl flex items-center justify-between">
        {/* Logo — use real logo image */}
        <Link to="/" className="relative z-10 flex items-center gap-3 group">
          <img
            src="/images/izwanlogoheader.png"
            alt="Izwan Ahmad Logo"
            className="h-20 w-auto object-contain"
          />
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <Link
              key={link.path}
              to={link.path}
              className={cn(
                'text-sm font-semibold transition-colors',
                location.pathname === link.path
                  ? 'text-primary'
                  : 'text-muted-foreground hover:text-foreground'
              )}
            >
              {link.name}
            </Link>
          ))}
          <a
            href="mailto:works.izwan@gmail.com"
            className="px-5 py-2.5 bg-primary text-white text-sm font-semibold rounded-md hover:bg-primary-hover transition-all hover:shadow-hover hover:-translate-y-0.5"
          >
            Let's Talk
          </a>
        </nav>

        {/* Mobile Toggle */}
        <button
          className="md:hidden relative z-50 p-2 -mr-2 text-foreground"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        >
          {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>

        {/* Mobile Menu */}
        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
              className="fixed inset-0 bg-white/97 backdrop-blur-md z-40 flex flex-col items-center justify-center gap-8 md:hidden"
            >
              <img src="/images/izwanlogoheader.png" alt="Izwan Ahmad Logo" className="h-20 mb-4" />
              {navLinks.map((link) => (
                <Link
                  key={link.path}
                  to={link.path}
                  onClick={() => setMobileMenuOpen(false)}
                  className={cn(
                    'text-2xl font-bold tracking-tight transition-colors',
                    location.pathname === link.path ? 'text-primary' : 'text-foreground hover:text-primary'
                  )}
                >
                  {link.name}
                </Link>
              ))}
              <a
                href="mailto:works.izwan@gmail.com"
                onClick={() => setMobileMenuOpen(false)}
                className="mt-4 px-8 py-4 bg-primary text-white text-lg font-bold rounded-lg shadow-card"
              >
                Let's Talk
              </a>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </header>
  );
};

export default Navbar;
