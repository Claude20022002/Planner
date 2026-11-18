/** Points du calendrier, adaptés de lucide-animated (calendar-days.tsx, MIT). */
import { motion } from 'motion/react';
import CadreIcone from './CadreIcone';

const POINTS = [[8, 14], [12, 14], [16, 14], [8, 18], [12, 18], [16, 18]];
const pulsation = {
  repos: { opacity: 1 },
  survol: (index) => ({ opacity: [1, 0.35, 1], transition: { duration: 0.2, delay: index * 0.025 } }),
};

export default function CalendrierAnime(props) {
  return (
    <CadreIcone {...props}>
      <path d="M8 2v4M16 2v4M3 10h18" />
      <rect x="3" y="4" width="18" height="18" rx="2" />
      {POINTS.map(([cx, cy], index) => (
        <motion.circle key={cx + ':' + cy} custom={index} cx={cx} cy={cy} r="1" fill="currentColor" stroke="none" variants={pulsation} />
      ))}
    </CadreIcone>
  );
}
