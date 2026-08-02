import { useEffect, useRef, useState, type FocusEvent, type KeyboardEvent } from 'react';
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import { Bot, Building2, CirclePause, CirclePlay, ShieldCheck, Sparkles } from 'lucide-react';
import { Link } from 'react-router-dom';

interface HeroProject {
  id: string;
  shortTitle: string;
  title: string;
  badge: string;
  metric: string;
  image: string;
  imageAlt: string;
  destination: string;
  icon: typeof Building2;
}

const heroProjects: HeroProject[] = [
  {
    id: 'rentverse',
    shortTitle: 'RentVerse',
    title: 'RentVerse Secure Rental Platform',
    badge: 'National Champion · 4 Awards',
    metric: '14-stage CI/CD · Zero Trust security',
    image: '/images/rentverse-home.jpg',
    imageAlt: 'RentVerse secure property rental platform landing page',
    destination: '/projects/rentverse',
    icon: ShieldCheck,
  },
  {
    id: 'beruang',
    shortTitle: 'Beruang',
    title: 'Beruang AI Money Management',
    badge: 'Best System Architecture',
    metric: '99.61% AI accuracy · 86.77 usability score',
    image: '/images/beruang-dashboard.jpg',
    imageAlt: 'Beruang AI money management application screens showing login, dashboard, and savings progress',
    destination: '/projects/beruang',
    icon: Sparkles,
  },
  {
    id: 'batik',
    shortTitle: 'Batik AI',
    title: 'Batik Recognition & Classification',
    badge: 'Best AI Booth Award',
    metric: '94.2% ViT accuracy · Real-time inference',
    image: '/images/batik-main.jpeg',
    imageAlt: 'Batik AI recognition and classification interface',
    destination: '/projects/batik',
    icon: Bot,
  },
  {
    id: 'petronas',
    shortTitle: 'Enterprise',
    title: 'HCSM Operations Hub',
    badge: 'Production Enterprise Automation',
    metric: '10+ systems · Workflows cut to minutes',
    image: '/images/petronas-hub-main.jpg',
    imageAlt: 'HCSM Operations Hub production automation dashboard',
    destination: '/projects/petronas-hub',
    icon: Building2,
  },
];

const journeySteps = ['Understand', 'Design', 'Build', 'Refine', 'Deliver'] as const;

const LogoJourneyIntro = () => (
  <div className="flex h-full w-full items-center justify-center overflow-hidden bg-gradient-to-br from-white via-tint to-background px-5 sm:px-10">
    <div className="w-full max-w-lg text-center">
      <motion.p
        initial={{ opacity: 0, y: 6 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.28, ease: [0.16, 1, 0.3, 1] }}
        className="text-[8px] font-extrabold uppercase tracking-[0.28em] text-primary sm:text-[10px]"
      >
        The two-dot philosophy
      </motion.p>

      <motion.div
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.32, delay: 0.16, ease: [0.16, 1, 0.3, 1] }}
        className="mt-2 text-base font-black tracking-tight text-foreground sm:mt-3 sm:text-2xl"
      >
        An idea begins. <span className="text-accent">Impact arrives.</span>
      </motion.div>

      <div className="relative mt-5 sm:mt-7">
        <div className="absolute left-[8%] right-[8%] top-2 h-px overflow-hidden bg-primary/10">
          <motion.span
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ duration: 0.38, delay: 0.48, ease: [0.16, 1, 0.3, 1] }}
            className="block h-full origin-left bg-gradient-to-r from-accent via-primary to-accent"
          />
        </div>

        <div className="relative grid grid-cols-5 gap-1">
          {journeySteps.map((step, index) => (
            <motion.div
              key={step}
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.24, delay: 0.62 + index * 0.18, ease: [0.16, 1, 0.3, 1] }}
              className="flex flex-col items-center"
            >
              <span
                className={`relative z-10 block rounded-full border-2 border-white bg-accent shadow-journey-dot ${
                  index === 0 || index === journeySteps.length - 1 ? 'h-4 w-4' : 'mt-0.5 h-3 w-3'
                }`}
              />
              <span className="mt-2 text-[7px] font-bold text-muted-foreground sm:text-[9px]">{step}</span>
            </motion.div>
          ))}
        </div>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 6 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3, delay: 1.62, ease: [0.16, 1, 0.3, 1] }}
        className="mt-4 flex items-center justify-center gap-2 sm:mt-6"
      >
        <img src="/images/izwanlogoheader.png" alt="" className="h-4 w-auto sm:h-5" />
        <span className="text-[8px] font-semibold text-muted-foreground sm:text-[10px]">ideas, delivered.</span>
      </motion.div>
    </div>
  </div>
);

interface LaptopFrameProps {
  activeProject: HeroProject;
  showIntro: boolean;
  shouldReduceMotion: boolean;
}

const LaptopFrame = ({ activeProject, showIntro, shouldReduceMotion }: LaptopFrameProps) => (
  <div className="flex w-full max-w-3xl flex-col items-center select-none">
    <div className="relative w-[96%] rounded-t-2xl border border-device-edge bg-device-surface p-1.5 pt-2.5 shadow-device sm:w-[94%] sm:p-2 sm:pt-3">
      <div className="absolute left-1/2 top-1 h-2 w-2 -translate-x-1/2 rounded-full border border-device-edge bg-device-inset">
        <span className="absolute inset-1/4 rounded-full bg-accent" />
      </div>
      <div className="relative aspect-video overflow-hidden rounded-lg border border-device-edge bg-device-inset">
        <AnimatePresence initial={false} mode="sync">
          {showIntro ? (
            <motion.div
              key="brand-journey"
              initial={shouldReduceMotion ? false : { opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={shouldReduceMotion ? undefined : { opacity: 0 }}
              transition={{ duration: shouldReduceMotion ? 0 : 0.26 }}
              className="absolute inset-0"
            >
              <LogoJourneyIntro />
            </motion.div>
          ) : (
            <motion.img
              key={activeProject.id}
              src={activeProject.image}
              alt={activeProject.imageAlt}
              initial={shouldReduceMotion ? false : { opacity: 0, scale: 1.012 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={shouldReduceMotion ? undefined : { opacity: 0, scale: 0.994 }}
              transition={{ duration: shouldReduceMotion ? 0 : 0.26, ease: [0.16, 1, 0.3, 1] }}
              className="absolute inset-0 h-full w-full object-cover object-top transform-gpu"
              loading="eager"
              decoding="async"
            />
          )}
        </AnimatePresence>
      </div>
    </div>
    <div className="flex h-4 w-full items-start justify-center rounded-b-xl border-t border-device-edge bg-gradient-to-b from-device-edge to-device-surface shadow-xl">
      <div className="h-1.5 w-20 rounded-b-md border-x border-b border-device-edge bg-device-inset" />
    </div>
  </div>
);

const HeroShowcase = () => {
  const shouldReduceMotion = useReducedMotion();
  const [activeIndex, setActiveIndex] = useState(0);
  const [showIntro, setShowIntro] = useState(!shouldReduceMotion);
  const [isAutoplaying, setIsAutoplaying] = useState(!shouldReduceMotion);
  const [isInteracting, setIsInteracting] = useState(false);
  const tabRefs = useRef<Array<HTMLButtonElement | null>>([]);
  const activeProject = heroProjects[activeIndex];
  const ActiveIcon = activeProject.icon;

  useEffect(() => {
    heroProjects.forEach((project) => {
      const image = new Image();
      image.src = project.image;
    });
  }, []);

  useEffect(() => {
    if (shouldReduceMotion) {
      setShowIntro(false);
      setIsAutoplaying(false);
      return undefined;
    }

    const introTimer = window.setTimeout(() => setShowIntro(false), 2300);
    return () => window.clearTimeout(introTimer);
  }, [shouldReduceMotion]);

  useEffect(() => {
    if (shouldReduceMotion || showIntro || !isAutoplaying || isInteracting) return undefined;

    const rotationTimer = window.setInterval(() => {
      setActiveIndex((currentIndex) => (currentIndex + 1) % heroProjects.length);
    }, 5600);

    return () => window.clearInterval(rotationTimer);
  }, [isAutoplaying, isInteracting, shouldReduceMotion, showIntro]);

  const selectProject = (index: number, focusTab = false) => {
    setShowIntro(false);
    setActiveIndex(index);
    setIsAutoplaying(false);
    if (focusTab) tabRefs.current[index]?.focus();
  };

  const handleTabKeyDown = (event: KeyboardEvent<HTMLButtonElement>, index: number) => {
    let nextIndex = index;

    if (event.key === 'ArrowRight') nextIndex = (index + 1) % heroProjects.length;
    if (event.key === 'ArrowLeft') nextIndex = (index - 1 + heroProjects.length) % heroProjects.length;
    if (event.key === 'Home') nextIndex = 0;
    if (event.key === 'End') nextIndex = heroProjects.length - 1;
    if (nextIndex === index) return;

    event.preventDefault();
    selectProject(nextIndex, true);
  };

  const handleBlurCapture = (event: FocusEvent<HTMLDivElement>) => {
    if (!event.currentTarget.contains(event.relatedTarget)) setIsInteracting(false);
  };

  return (
    <div
      className="relative mx-auto flex w-full max-w-3xl flex-col items-center"
      onMouseEnter={() => setIsInteracting(true)}
      onMouseLeave={() => setIsInteracting(false)}
      onFocusCapture={() => setIsInteracting(true)}
      onBlurCapture={handleBlurCapture}
    >
      <div
        id="hero-project-panel"
        role={showIntro ? 'group' : 'tabpanel'}
        aria-label={showIntro ? 'Two-dot journey introduction' : undefined}
        aria-labelledby={showIntro ? undefined : `hero-project-tab-${activeProject.id}`}
        className="relative z-10 flex min-h-hero-visual w-full flex-col items-center justify-center"
      >
        <AnimatePresence mode="wait">
          <motion.div
            key={showIntro ? 'journey-proof' : `${activeProject.id}-proof`}
            initial={shouldReduceMotion ? false : { opacity: 0, y: -8, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={shouldReduceMotion ? undefined : { opacity: 0, y: 6, scale: 0.98 }}
            transition={{ duration: shouldReduceMotion ? 0 : 0.26, ease: [0.16, 1, 0.3, 1] }}
            className="mb-3 flex max-w-[92%] items-center gap-3 rounded-full border border-primary/20 bg-white/95 px-3.5 py-2 shadow-card backdrop-blur-md sm:mb-4 sm:px-4"
          >
            <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-tint text-primary">
              {showIntro ? <Sparkles size={16} aria-hidden="true" /> : <ActiveIcon size={16} aria-hidden="true" />}
            </span>
            <span className="min-w-0">
              <span className="block truncate text-[11px] font-bold text-foreground sm:text-xs">
                {showIntro ? 'From the first dot to the final dot' : activeProject.badge}
              </span>
              <span className="block truncate text-[10px] font-medium text-muted-foreground sm:text-xs">
                {showIntro ? 'Understand · Design · Build · Refine · Deliver' : activeProject.metric}
              </span>
            </span>
          </motion.div>
        </AnimatePresence>

        <div className="flex min-h-device-stage w-full items-center justify-center">
          <LaptopFrame
            activeProject={activeProject}
            showIntro={showIntro}
            shouldReduceMotion={Boolean(shouldReduceMotion)}
          />
        </div>
      </div>

      <div className="relative z-20 mt-2 flex w-full max-w-xl items-center gap-2 sm:mt-3">
        <div
          role="tablist"
          aria-label="Featured project reel"
          className="grid min-w-0 flex-1 grid-cols-4 gap-1 rounded-full border border-primary/15 bg-white/95 p-1 shadow-card backdrop-blur-md"
        >
          {heroProjects.map((project, index) => (
            <button
              key={project.id}
              ref={(element) => {
                tabRefs.current[index] = element;
              }}
              id={`hero-project-tab-${project.id}`}
              type="button"
              role="tab"
              aria-selected={!showIntro && index === activeIndex}
              aria-controls="hero-project-panel"
              tabIndex={index === activeIndex ? 0 : -1}
              onClick={() => selectProject(index)}
              onKeyDown={(event) => handleTabKeyDown(event, index)}
              className={`min-h-11 truncate rounded-full px-2 text-[10px] font-bold transition duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 motion-reduce:transition-none sm:px-3 sm:text-xs ${
                !showIntro && index === activeIndex
                  ? 'bg-primary text-white shadow-sm'
                  : 'text-muted-foreground hover:-translate-y-0.5 hover:bg-tint hover:text-foreground'
              }`}
            >
              {project.shortTitle}
            </button>
          ))}
        </div>

        <button
          type="button"
          onClick={() => {
            setShowIntro(false);
            const nextAutoplayState = !isAutoplaying;
            setIsAutoplaying(nextAutoplayState);
            if (nextAutoplayState) setIsInteracting(false);
          }}
          disabled={Boolean(shouldReduceMotion)}
          aria-label={isAutoplaying ? 'Pause featured project reel' : 'Play featured project reel'}
          className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full border border-primary/15 bg-white/95 text-primary shadow-card transition duration-150 hover:-translate-y-0.5 hover:bg-tint focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 motion-reduce:transition-none"
        >
          {isAutoplaying ? <CirclePause size={20} aria-hidden="true" /> : <CirclePlay size={20} aria-hidden="true" />}
        </button>
      </div>

      <div className="relative z-10 mt-2 flex min-h-11 items-center justify-center gap-2 text-center text-xs font-semibold text-muted-foreground">
        {showIntro ? (
          <span className="inline-flex min-h-11 items-center px-2">Your idea, transformed with intention.</span>
        ) : (
          <Link
            to={activeProject.destination}
            className="inline-flex min-h-11 items-center rounded-sm px-2 transition duration-150 hover:text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 motion-reduce:transition-none"
          >
            {activeProject.title}
          </Link>
        )}
        {!showIntro && isAutoplaying && <span className="hidden text-[10px] font-bold uppercase tracking-wider text-primary sm:inline">Auto reel</span>}
      </div>
    </div>
  );
};

export default HeroShowcase;
