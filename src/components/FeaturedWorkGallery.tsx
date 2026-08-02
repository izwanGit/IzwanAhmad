import { useEffect, useId, useState, type KeyboardEvent } from 'react';
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import { ArrowRight, Bot, Building2, CirclePause, CirclePlay, ExternalLink, ShieldCheck, Sparkles } from 'lucide-react';
import { Link } from 'react-router-dom';

type Project = {
  id: string;
  eyebrow: string;
  title: string;
  description: string;
  metric: string;
  tech: string[];
  image: string;
  imageAlt: string;
  route: string;
  device: 'laptop' | 'phones';
  screens?: Array<{ image: string; alt: string }>;
  icon: typeof Sparkles;
  external?: string;
};

const projects: Project[] = [
  {
    id: 'beruang',
    eyebrow: 'AI financial companion',
    title: 'Beruang AI Platform',
    description: 'A mobile finance product with an AI advisor, RAG intelligence, and a five-repository product ecosystem.',
    metric: '99.61% AI accuracy',
    tech: ['Mobile product', 'RAG engine', 'AI microservices'],
    image: '/images/beruang/hero-home.webp',
    imageAlt: 'Beruang AI finance dashboard on mobile',
    route: '/projects/beruang',
    device: 'phones',
    screens: [
      { image: '/images/beruang/hero-expenses.webp', alt: 'Beruang expense breakdown screen' },
      { image: '/images/beruang/hero-home.webp', alt: 'Beruang finance dashboard' },
      { image: '/images/beruang/hero-chat.webp', alt: 'Beruang AI advisor chat screen' },
    ],
    icon: Sparkles,
    external: 'https://beruang-landing.vercel.app/',
  },
  {
    id: 'rentverse',
    eyebrow: 'Secure rental ecosystem',
    title: 'RentVerse',
    description: 'A national-winning rental platform engineered with a deliberate DevSecOps pipeline from code to deployment.',
    metric: 'National champion · 4 awards',
    tech: ['14-stage CI/CD', 'Zero trust', 'Docker delivery'],
    image: '/images/rentverse-home.jpg',
    imageAlt: 'RentVerse property rental platform on desktop',
    route: '/projects/rentverse',
    device: 'laptop',
    icon: ShieldCheck,
    external: 'https://uitm-devops-challenge-team-one.vercel.app/',
  },
  {
    id: 'batik',
    eyebrow: 'Computer vision product',
    title: 'Batik AI Recognition',
    description: 'A real-time visual intelligence experience that makes cultural pattern recognition simple, useful, and approachable.',
    metric: 'Best AI Booth Award',
    tech: ['Vision transformer', 'Real-time inference', 'Product UX'],
    image: '/images/batik-main.jpeg',
    imageAlt: 'Batik AI recognition interface',
    route: '/projects/batik',
    device: 'laptop',
    icon: Bot,
  },
  {
    id: 'systems',
    eyebrow: 'Enterprise automation',
    title: 'HCSM Operations Hub',
    description: 'A production automation hub that turns complex operational work into reliable, repeatable digital workflows.',
    metric: '10+ systems in production',
    tech: ['Workflow automation', 'Enterprise delivery', 'Data operations'],
    image: '/images/petronas-hub-main.jpg',
    imageAlt: 'HCSM Operations Hub enterprise dashboard',
    route: '/projects/petronas-hub',
    device: 'laptop',
    icon: Building2,
  },
];

const PhoneFrame = ({ screen, position }: { screen: { image: string; alt: string }; position: 'back' | 'front' | 'far' }) => (
  <div className={`relative aspect-[9/19.5] overflow-hidden rounded-[1.8rem] border-[5px] border-slate-950 bg-slate-950 shadow-[0_22px_45px_rgba(12,26,32,0.24)] ${position === 'front' ? 'z-20 w-[37%]' : position === 'back' ? 'z-10 -mr-[6%] w-[31%] translate-y-4 opacity-95' : 'z-10 -ml-[6%] w-[31%] translate-y-4 opacity-95'}`}>
    <div className="absolute left-1/2 top-1.5 z-10 h-3.5 w-[42%] -translate-x-1/2 rounded-full bg-slate-950" />
    <img src={screen.image} alt={screen.alt} className="h-full w-full object-cover object-top" loading="lazy" />
  </div>
);

const LaptopFrame = ({ image, alt }: { image: string; alt: string }) => (
  <div className="w-full max-w-[48rem]">
    <div className="rounded-t-[1.35rem] border border-slate-700 bg-[#151920] p-2 pt-3 shadow-[0_26px_58px_rgba(12,26,32,0.25)]">
      <div className="mx-auto mb-1 h-1.5 w-1.5 rounded-full bg-accent shadow-[0_0_0_2px_rgba(6,182,212,0.16)]" />
      <div className="aspect-[16/10] overflow-hidden rounded-lg border border-slate-700/80 bg-white">
        <img src={image} alt={alt} className="h-full w-full object-cover object-top" loading="lazy" />
      </div>
    </div>
    <div className="relative -mx-[4%] h-4 rounded-b-[1.35rem] border-t border-slate-600 bg-gradient-to-b from-slate-700 to-[#151920] shadow-[0_18px_30px_rgba(12,26,32,0.22)]">
      <span className="absolute left-1/2 top-0 h-1.5 w-20 -translate-x-1/2 rounded-b-md bg-slate-950" />
    </div>
  </div>
);

export default function FeaturedWorkGallery() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);
  const shouldReduceMotion = useReducedMotion();
  const tabId = useId();
  const activeProject = projects[activeIndex];
  const ActiveIcon = activeProject.icon;

  useEffect(() => {
    if (shouldReduceMotion || !isPlaying) return;
    const timer = window.setInterval(() => setActiveIndex((index) => (index + 1) % projects.length), 6200);
    return () => window.clearInterval(timer);
  }, [isPlaying, shouldReduceMotion]);

  const selectProject = (index: number) => {
    setActiveIndex(index);
    setIsPlaying(false);
  };

  const onTabKeyDown = (event: KeyboardEvent<HTMLButtonElement>, index: number) => {
    if (!['ArrowRight', 'ArrowLeft', 'Home', 'End'].includes(event.key)) return;
    event.preventDefault();
    const nextIndex = event.key === 'ArrowRight' ? (index + 1) % projects.length : event.key === 'ArrowLeft' ? (index - 1 + projects.length) % projects.length : event.key === 'Home' ? 0 : projects.length - 1;
    selectProject(nextIndex);
    document.getElementById(`${tabId}-${projects[nextIndex].id}`)?.focus();
  };

  return (
    <section className="relative overflow-hidden bg-[#f5f9fa] py-20 sm:py-28" aria-labelledby="featured-work-title">
      <div className="pointer-events-none absolute inset-x-0 top-0 h-80 bg-[radial-gradient(ellipse_at_72%_0%,rgba(6,182,212,0.13),transparent_58%)]" aria-hidden="true" />
      <div className="container relative mx-auto max-w-7xl px-6">
        <motion.div initial={shouldReduceMotion ? false : { opacity: 0, y: 18 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.25 }} transition={{ duration: 0.36, ease: [0.16, 1, 0.3, 1] }} className="mb-10 flex flex-col justify-between gap-6 lg:mb-14 lg:flex-row lg:items-end">
          <div className="max-w-3xl">
            <div className="mb-3 flex items-center gap-2 text-xs font-extrabold uppercase tracking-[0.19em] text-accent">
              <span className="h-2 w-2 rounded-full bg-accent shadow-journey-dot" />
              Featured work
            </div>
            <h2 id="featured-work-title" className="text-4xl font-black tracking-[-0.045em] text-foreground sm:text-5xl lg:text-6xl">Selected flagship projects.</h2>
            <p className="mt-4 max-w-2xl text-base leading-relaxed text-muted-foreground sm:text-lg">Beautiful on the surface. Rigorous underneath. Each project is a real product built around a meaningful problem.</p>
          </div>
          <Link to="/projects" className="inline-flex min-h-12 items-center justify-center gap-2 self-start rounded-xl border border-primary/20 bg-white px-5 text-sm font-bold text-foreground shadow-card transition duration-150 hover:-translate-y-0.5 hover:border-primary/45 hover:text-primary hover:shadow-hover focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 lg:self-auto">
            View all projects <ArrowRight size={16} aria-hidden="true" />
          </Link>
        </motion.div>

        <div className="overflow-hidden rounded-[2rem] border border-primary/15 bg-white shadow-[0_28px_80px_rgba(14,116,144,0.12)]">
          <div className="grid lg:grid-cols-[0.92fr_1.08fr]">
            <div className="flex min-h-[30rem] flex-col justify-between p-7 sm:p-10 lg:min-h-[36rem] lg:p-12">
              <AnimatePresence mode="wait" initial={false}>
                <motion.article key={activeProject.id} initial={shouldReduceMotion ? false : { opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} exit={shouldReduceMotion ? undefined : { opacity: 0, y: -10 }} transition={{ duration: shouldReduceMotion ? 0 : 0.26, ease: [0.16, 1, 0.3, 1] }}>
                  <div className="mb-8 inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-tint text-primary"><ActiveIcon size={22} aria-hidden="true" /></div>
                  <p className="text-xs font-extrabold uppercase tracking-[0.17em] text-primary">{activeProject.eyebrow}</p>
                  <h3 className="mt-3 max-w-md text-3xl font-black tracking-[-0.04em] text-foreground sm:text-4xl">{activeProject.title}</h3>
                  <p className="mt-5 max-w-md text-base leading-relaxed text-muted-foreground">{activeProject.description}</p>
                  <div className="mt-7 flex items-center gap-3">
                    <span className="h-2.5 w-2.5 rounded-full bg-accent shadow-journey-dot" aria-hidden="true" />
                    <span className="text-sm font-bold text-foreground">{activeProject.metric}</span>
                  </div>
                  <ul className="mt-7 flex flex-wrap gap-2" aria-label={`${activeProject.title} technologies`}>
                    {activeProject.tech.map((item) => <li key={item} className="rounded-full border border-primary/15 bg-tint px-3 py-1.5 text-xs font-bold text-primary">{item}</li>)}
                  </ul>
                </motion.article>
              </AnimatePresence>
              <div className="mt-10 flex flex-wrap gap-3">
                <Link to={activeProject.route} className="inline-flex min-h-11 items-center gap-2 rounded-xl bg-primary px-4 text-sm font-bold text-white shadow-hero-cta transition duration-150 hover:-translate-y-0.5 hover:bg-primary-hover hover:shadow-hover focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2">Explore case study <ArrowRight size={16} aria-hidden="true" /></Link>
                {activeProject.external && <a href={activeProject.external} target="_blank" rel="noreferrer" className="inline-flex min-h-11 items-center gap-2 rounded-xl border border-primary/20 px-4 text-sm font-bold text-foreground transition duration-150 hover:-translate-y-0.5 hover:border-primary/45 hover:text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2">Live product <ExternalLink size={15} aria-hidden="true" /></a>}
              </div>
            </div>

            <div id={`${tabId}-stage`} role="tabpanel" aria-label={`${activeProject.title} project preview`} className="relative flex min-h-[24rem] items-center justify-center overflow-hidden border-t border-primary/10 bg-[radial-gradient(circle_at_50%_52%,rgba(6,182,212,0.20),rgba(14,116,144,0.07)_34%,transparent_66%)] px-8 py-12 lg:min-h-[36rem] lg:border-l lg:border-t-0">
              <div className="pointer-events-none absolute inset-0 opacity-50 [background-image:radial-gradient(rgba(14,116,144,0.3)_1px,transparent_1px)] [background-size:18px_18px]" aria-hidden="true" />
              <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-white/65 via-transparent to-primary/10" aria-hidden="true" />
              <AnimatePresence mode="wait" initial={false}>
                <motion.div key={activeProject.id} initial={shouldReduceMotion ? false : { opacity: 0, scale: 0.975, y: 12 }} animate={{ opacity: 1, scale: 1, y: 0 }} exit={shouldReduceMotion ? undefined : { opacity: 0, scale: 1.015, y: -8 }} transition={{ duration: shouldReduceMotion ? 0 : 0.28, ease: [0.16, 1, 0.3, 1] }} className="relative z-10 flex w-full items-center justify-center">
                  {activeProject.device === 'phones' && activeProject.screens ? <div className="flex w-full max-w-md items-center justify-center"><PhoneFrame screen={activeProject.screens[0]} position="back" /><PhoneFrame screen={activeProject.screens[1]} position="front" /><PhoneFrame screen={activeProject.screens[2]} position="far" /></div> : <LaptopFrame image={activeProject.image} alt={activeProject.imageAlt} />}
                </motion.div>
              </AnimatePresence>
              <div className="absolute bottom-6 left-1/2 z-20 -translate-x-1/2 whitespace-nowrap rounded-full border border-white/80 bg-white/85 px-4 py-2 text-[11px] font-extrabold uppercase tracking-[0.14em] text-primary shadow-card backdrop-blur-md">Real product interface</div>
            </div>
          </div>

          <div className="flex flex-col gap-4 border-t border-primary/10 bg-white px-5 py-5 sm:flex-row sm:items-center sm:justify-between sm:px-7">
            <div role="tablist" aria-label="Featured projects" className="grid flex-1 grid-cols-2 gap-2 sm:flex sm:flex-wrap">
              {projects.map((project, index) => (
                <button key={project.id} id={`${tabId}-${project.id}`} type="button" role="tab" aria-selected={index === activeIndex} aria-controls={`${tabId}-stage`} tabIndex={index === activeIndex ? 0 : -1} onClick={() => selectProject(index)} onKeyDown={(event) => onTabKeyDown(event, index)} className={`min-h-11 rounded-lg px-3 text-left text-xs font-bold transition duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 sm:text-center ${index === activeIndex ? 'bg-primary text-white shadow-sm' : 'text-muted-foreground hover:bg-tint hover:text-primary'}`}>
                  {project.title}
                </button>
              ))}
            </div>
            <button type="button" onClick={() => setIsPlaying((playing) => !playing)} aria-pressed={isPlaying} className="inline-flex min-h-11 shrink-0 items-center justify-center gap-2 rounded-lg border border-primary/15 px-3 text-xs font-bold text-primary transition duration-150 hover:bg-tint focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2">
              {isPlaying ? <CirclePause size={17} aria-hidden="true" /> : <CirclePlay size={17} aria-hidden="true" />}
              <span>{isPlaying ? 'Pause rotation' : 'Play rotation'}</span>
            </button>
          </div>
        </div>

        <div className="mt-6 grid gap-4 md:grid-cols-3">
          {[['Built for real use', 'Products designed to be understood, trusted, and used.'], ['Architecture with intent', 'AI, automation, and delivery systems shaped around the problem.'], ['Evidence over hype', 'Awards, production systems, and public product work.']].map(([title, description], index) => (
            <motion.div key={title} initial={shouldReduceMotion ? false : { opacity: 0, y: 12 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.35 }} transition={{ duration: 0.3, delay: shouldReduceMotion ? 0 : index * 0.06, ease: [0.16, 1, 0.3, 1] }} className="rounded-2xl border border-primary/10 bg-white/75 p-5 shadow-xs">
              <div className="mb-3 h-2 w-2 rounded-full bg-accent shadow-journey-dot" aria-hidden="true" />
              <h3 className="text-base font-black text-foreground">{title}</h3>
              <p className="mt-1.5 text-sm leading-relaxed text-muted-foreground">{description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
