import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';

// Pages
import Home from './pages/Home';
import Projects from './pages/Projects';
import Freelance from './pages/Freelance';

// Components
import Navbar from './components/layout/Navbar';
import Footer from './components/layout/Footer';
import ParticleBackground from './components/ParticleBackground';

function ScrollToTop() {
  const { pathname } = useLocation();
  React.useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
}

const App = () => {
  return (
    <Router>
      <ScrollToTop />
      <div className="min-h-screen flex flex-col bg-background font-sans text-foreground selection:bg-primary selection:text-white">
        <ParticleBackground />
        
        <Navbar />
        
        <main className="flex-grow z-10 relative">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/projects" element={<Projects />} />
            <Route path="/freelance" element={<Freelance />} />
          </Routes>
        </main>
        
        <Footer />
      </div>
    </Router>
  );
};

export default App;
