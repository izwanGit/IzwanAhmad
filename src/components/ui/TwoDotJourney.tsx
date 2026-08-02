import { motion, useReducedMotion } from 'framer-motion';

const journeyDots = [
  { cx: 536, cy: 82, r: 5, opacity: 0.18 },
  { cx: 576, cy: 106, r: 7, opacity: 0.2 },
  { cx: 620, cy: 76, r: 4, opacity: 0.16 },
  { cx: 662, cy: 118, r: 9, opacity: 0.2 },
  { cx: 704, cy: 88, r: 5, opacity: 0.18 },
  { cx: 566, cy: 408, r: 6, opacity: 0.18 },
  { cx: 610, cy: 438, r: 10, opacity: 0.2 },
  { cx: 652, cy: 402, r: 5, opacity: 0.16 },
  { cx: 700, cy: 448, r: 8, opacity: 0.2 },
  { cx: 724, cy: 392, r: 4, opacity: 0.16 },
] as const;

const milestoneDots = [
  { cx: 232, cy: 106 },
  { cx: 430, cy: 116 },
  { cx: 612, cy: 94 },
] as const;

interface TwoDotJourneyProps {
  activeIndex: number;
}

const TwoDotJourney = ({ activeIndex }: TwoDotJourneyProps) => {
  const shouldReduceMotion = useReducedMotion();

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none" aria-hidden="true">
      <div className="absolute inset-0 bg-hero-journey-halo" />

      <motion.svg
        viewBox="0 0 760 520"
        preserveAspectRatio="xMidYMid meet"
        className="absolute inset-0 h-full w-full text-primary"
        initial={shouldReduceMotion ? false : { opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: shouldReduceMotion ? 0 : 0.32, ease: [0.16, 1, 0.3, 1] }}
      >
        <path
          d="M34 406C108 122 272 52 430 116C544 162 624 92 728 54"
          fill="none"
          stroke="currentColor"
          strokeWidth="3"
          strokeLinecap="round"
          className="opacity-25"
        />
        <path
          d="M34 406C108 122 272 52 430 116C544 162 624 92 728 54"
          fill="none"
          stroke="currentColor"
          strokeWidth="1"
          strokeLinecap="round"
          strokeDasharray="4 10"
          className="opacity-50"
        />

        {journeyDots.map((dot) => (
          <circle
            key={`${dot.cx}-${dot.cy}`}
            cx={dot.cx}
            cy={dot.cy}
            r={dot.r}
            fill="currentColor"
            opacity={dot.opacity}
          />
        ))}

        <g className="text-accent">
          <circle cx="34" cy="406" r="24" fill="currentColor" opacity="0.1" />
          <circle cx="34" cy="406" r="8" fill="currentColor" />
          <circle cx="728" cy="54" r="30" fill="currentColor" opacity="0.12" />
          <circle cx="728" cy="54" r="10" fill="currentColor" />
          <text x="22" y="448" fill="currentColor" fontSize="14" fontWeight="700" letterSpacing="2" opacity="0.7">
            IDEA
          </text>
          <text x="642" y="28" fill="currentColor" fontSize="14" fontWeight="700" letterSpacing="2" opacity="0.7">
            IMPACT
          </text>
        </g>

        {milestoneDots.map((dot, index) => {
          const isActive = index === activeIndex;

          return (
            <g key={`${dot.cx}-${dot.cy}`} className={isActive ? 'text-accent' : 'text-primary'}>
              <circle cx={dot.cx} cy={dot.cy} r={isActive ? 20 : 14} fill="currentColor" opacity={isActive ? 0.18 : 0.1} />
              <circle cx={dot.cx} cy={dot.cy} r={isActive ? 7 : 5} fill="currentColor" opacity={isActive ? 1 : 0.72} />
            </g>
          );
        })}

        {!shouldReduceMotion && (
          <motion.g
            initial={{ opacity: 0, x: 34, y: 406, scale: 0.7 }}
            animate={{ opacity: [0, 1, 1, 0], x: [34, 232, 430, 728], y: [406, 106, 116, 54], scale: [0.7, 1, 1, 0.7] }}
            transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1], delay: 0.08 }}
            className="text-accent"
          >
            <circle cx="0" cy="0" r="7" fill="currentColor" />
          </motion.g>
        )}
      </motion.svg>
    </div>
  );
};

export default TwoDotJourney;
