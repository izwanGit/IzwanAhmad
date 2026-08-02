import React, { lazy, Suspense } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';

const Home = lazy(() => import('./pages/Home'));
const Projects = lazy(() => import('./pages/Projects'));
const ProjectDetail = lazy(() => import('./pages/ProjectDetail'));
const Experience = lazy(() => import('./pages/Experience'));
const Freelance = lazy(() => import('./pages/Freelance'));

// Components
import Navbar from './components/layout/Navbar';
import Footer from './components/layout/Footer';

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
        <Navbar />
        
        <main className="relative z-10 flex-grow">
          <Suspense
            fallback={
              <div className="flex min-h-screen items-center justify-center bg-background" role="status" aria-live="polite">
                <span className="h-3 w-3 rounded-full bg-accent shadow-journey-dot" />
                <span className="sr-only">Loading page</span>
              </div>
            }
          >
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/projects" element={<Projects />} />
              <Route path="/projects/:id" element={<ProjectDetail />} />
              <Route path="/experience" element={<Experience />} />
              <Route path="/freelance" element={<Freelance />} />
            </Routes>
          </Suspense>
        </main>
        
        <Footer />
      </div>
    </Router>
  );
};

export default App;
