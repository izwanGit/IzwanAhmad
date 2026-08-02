import { useRef, useState, type KeyboardEvent } from 'react';
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import { Building2, ShieldCheck, Sparkles } from 'lucide-react';

import TwoDotJourney from './ui/TwoDotJourney';

type DeviceType = 'laptop' | 'phone';

interface HeroProject {
  id: string;
  shortTitle: string;
  title: string;
  badge: string;
  metric: string;
  image: string;
  imageAlt: string;
  deviceType: DeviceType;
  icon: typeof Building2;
}

const heroProjects: HeroProject[] = [
  {
    id: 'petronas',
    shortTitle: 'PETRONAS',
    title: 'HCSM Operations Hub',
    badge: 'Production at PETRONAS Digital',
    metric: '10+ systems · 95% faster workflows',
    image: '/images/petronas-hub-main.jpg',
    imageAlt: 'PETRONAS HCSM Operations Hub production dashboard',
    deviceType: 'laptop',
    icon: Building2,
  },
  {
    id: 'beruang',
    shortTitle: 'Beruang',
    title: 'Beruang AI Money',
    badge: 'Best System Architecture',
    metric: '99.61% accuracy · 86.77 SUS',
    image: '/images/beruang/home.png',
    imageAlt: 'Beruang AI money management mobile application home screen',
    deviceType: 'phone',
    icon: Sparkles,
  },
  {
    id: 'rentverse',
    shortTitle: 'RentVerse',
    title: 'RentVerse Platform',
    badge: 'National Champion · 4 Awards',
    metric: '14-stage CI/CD · Zero Trust',
    image: '/images/rentverse-laptop.jpg',
    imageAlt: 'RentVerse secure property rental platform interface',
    deviceType: 'laptop',
    icon: ShieldCheck,
  },
];

const LaptopFrame = ({ project }: { project: HeroProject }) => (
  <div className="flex w-full max-w-2xl flex-col items-center select-none">
    <div className="relative w-11/12 rounded-t-2xl border border-device-edge bg-device-surface p-2 pt-3 shadow-device">
      <div className="absolute left-1/2 top-1 h-2 w-2 -translate-x-1/2 rounded-full border border-device-edge bg-device-inset">
        <span className="absolute inset-1/4 rounded-full bg-accent" />
      </div>
      <div className="aspect-video overflow-hidden rounded-lg border border-device-edge bg-device-inset">
        <img
          src={project.image}
          alt={project.imageAlt}
          className="h-full w-full object-cover object-top"
          loading="eager"
          decoding="async"
        />
      </div>
    </div>
    <div className="flex h-4 w-full items-start justify-center rounded-b-xl border-t border-device-edge bg-gradient-to-b from-device-edge to-device-surface shadow-xl">
      <div className="h-1.5 w-20 rounded-b-md border-x border-b border-device-edge bg-device-inset" />
    </div>
  </div>
);

const PhoneFrame = ({ project }: { project: HeroProject }) => (
  <div className="w-40 select-none sm:w-48">
    <div className="relative rounded-3xl border-2 border-device-edge bg-device-surface p-2 shadow-device">
      <div className="relative aspect-phone overflow-hidden rounded-3xl border border-device-edge bg-device-inset">
        <div className="absolute left-1/2 top-2 z-10 flex h-4 w-16 -translate-x-1/2 items-center justify-end rounded-full bg-device-inset px-2">
          <span className="h-1.5 w-1.5 rounded-full bg-accent" />
        </div>
        <img
          src={project.image}
          alt={project.imageAlt}
          className="h-full w-full object-cover object-top"
          loading="eager"
          decoding="async"
        />
      </div>
    </div>
  </div>
);

const HeroShowcase = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const tabRefs = useRef<Array<HTMLButtonElement | null>>([]);
  const shouldReduceMotion = useReducedMotion();
  const activeProject = heroProjects[activeIndex];
  const ActiveIcon = activeProject.icon;

  const selectProject = (index: number) => {
    setActiveIndex(index);
    tabRefs.current[index]?.focus();
  };

  const handleTabKeyDown = (event: KeyboardEvent<HTMLButtonElement>, index: number) => {
    let nextIndex = index;

    if (event.key === 'ArrowRight') nextIndex = (index + 1) % heroProjects.length;
    if (event.key === 'ArrowLeft') nextIndex = (index - 1 + heroProjects.length) % heroProjects.length;
    if (event.key === 'Home') nextIndex = 0;
    if (event.key === 'End') nextIndex = heroProjects.length - 1;
    if (nextIndex === index) return;

    event.preventDefault();
    selectProject(nextIndex);
  };

  return (
    <div className="relative mx-auto flex w-full max-w-3xl flex-col items-center">
      <TwoDotJourney activeIndex={activeIndex} />

      <div
        id="hero-project-panel"
        role="tabpanel"
        aria-labelledby={`hero-project-tab-${activeProject.id}`}
        className="relative z-10 flex min-h-hero-visual w-full flex-col items-center justify-center px-2 sm:px-6"
      >
        <AnimatePresence mode="wait">
          <motion.div
            key={`${activeProject.id}-proof`}
            initial={shouldReduceMotion ? false : { opacity: 0, y: -8, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={shouldReduceMotion ? undefined : { opacity: 0, y: 6, scale: 0.98 }}
            transition={{ duration: shouldReduceMotion ? 0 : 0.26, ease: [0.16, 1, 0.3, 1] }}
            className="mb-4 flex max-w-full items-center gap-3 rounded-full border border-primary/20 bg-white/90 px-4 py-2 shadow-card backdrop-blur-md"
          >
            <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-tint text-primary">
              <ActiveIcon size={16} aria-hidden="true" />
            </span>
            <span className="min-w-0">
              <span className="block truncate text-xs font-bold text-foreground">{activeProject.badge}</span>
              <span className="block truncate text-xs font-medium text-muted-foreground">{activeProject.metric}</span>
            </span>
          </motion.div>
        </AnimatePresence>

        <div className="flex min-h-device-stage w-full items-center justify-center">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeProject.id}
              initial={shouldReduceMotion ? false : { opacity: 0, y: 12, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={shouldReduceMotion ? undefined : { opacity: 0, y: -8, scale: 0.98 }}
              transition={{ duration: shouldReduceMotion ? 0 : 0.26, ease: [0.16, 1, 0.3, 1] }}
              className="flex w-full transform-gpu items-center justify-center"
            >
              {activeProject.deviceType === 'laptop' ? (
                <LaptopFrame project={activeProject} />
              ) : (
                <PhoneFrame project={activeProject} />
              )}
            </motion.div>
          </AnimatePresence>
        </div>
      </div>

      <div
        role="tablist"
        aria-label="Featured project proof"
        className="relative z-20 grid w-full max-w-md grid-cols-3 gap-1 rounded-full border border-primary/15 bg-white/90 p-1 shadow-card backdrop-blur-md"
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
            aria-selected={index === activeIndex}
            aria-controls="hero-project-panel"
            tabIndex={index === activeIndex ? 0 : -1}
            onClick={() => selectProject(index)}
            onKeyDown={(event) => handleTabKeyDown(event, index)}
            className={`min-h-11 rounded-full px-3 text-xs font-bold transition duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 motion-reduce:transition-none ${
              index === activeIndex
                ? 'bg-primary text-white shadow-sm'
                : 'text-muted-foreground hover:-translate-y-0.5 hover:bg-tint hover:text-foreground'
            }`}
          >
            {project.shortTitle}
          </button>
        ))}
      </div>

      <p className="relative z-10 mt-3 text-center text-xs font-semibold text-muted-foreground" aria-live="polite">
        {activeProject.title}
      </p>
    </div>
  );
};

export default HeroShowcase;
