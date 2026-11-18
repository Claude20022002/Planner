/** Éclat et étoiles, adaptés de lucide-animated (sparkles.tsx, MIT). */
import { motion } from 'motion/react';
import CadreIcone from './CadreIcone';
import { transitionIcone } from './transitionIcone';

const ETOILE = { repos: { opacity: 1 }, survol: { opacity: [1, 0.3, 1] } };
const ECLAT = { repos: { y: 0 }, survol: { y: [0, -2, 0] } };

export default function EtincellesAnimees(props) {
  return (
    <CadreIcone {...props}>
      <motion.path
        d="M10 2l2.1 6.3L18.5 10l-6.4 2.1L10 18.5l-2.1-6.4L1.5 10l6.4-1.7L10 2z"
        variants={ECLAT}
        transition={transitionIcone}
      />
      <motion.path d="M20 3v4m-2-2h4M4 17v2m-1-1h2" variants={ETOILE} transition={transitionIcone} />
    </CadreIcone>
  );
}
