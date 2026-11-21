/** Coiffe et gland animés, adaptés de lucide-animated (graduation-cap.tsx, MIT). */
import { motion } from 'motion/react';
import CadreIcone from './CadreIcone';
import { transitionIcone } from './transitionIcone';

const COIFFE = { repos: { y: 0 }, survol: { y: [0, -2, 0] } };
const GLAND = { repos: { rotate: 0 }, survol: { rotate: [0, 15, -8, 0] } };

export default function DiplomeAnime(props) {
  return (
    <CadreIcone {...props} variants={COIFFE}>
      <path d="M2 10l10-5 10 5-10 5zM6 12v5c3 3 9 3 12 0v-5" />
      <motion.path
        d="M22 10v6"
        style={{ transformBox: 'fill-box', transformOrigin: 'top center' }}
        variants={GLAND}
        transition={transitionIcone}
      />
    </CadreIcone>
  );
}
