/** Silhouette latérale animée, adaptée de lucide-animated (users-round.tsx, MIT). */
import { motion } from 'motion/react';
import CadreIcone from './CadreIcone';
import { transitionIcone } from './transitionIcone';

const SILHOUETTE = { repos: { x: 0, opacity: 1 }, survol: { x: [-3, 0], opacity: [0.4, 1] } };

export default function PersonnesAnimees(props) {
  return (
    <CadreIcone {...props}>
      <path d="M18 21a8 8 0 0 0-16 0" />
      <circle cx="10" cy="8" r="5" />
      <motion.path
        d="M22 20c0-3.37-2-6.5-4-8a5 5 0 0 0-.45-8.3"
        variants={SILHOUETTE}
        transition={transitionIcone}
      />
    </CadreIcone>
  );
}
