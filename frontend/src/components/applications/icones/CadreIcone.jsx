/** Cadre commun des tracés adaptés de lucide-animated. Voir LICENSE. */
import { motion } from 'motion/react';
import { transitionIcone } from './transitionIcone';

export default function CadreIcone({ size = 24, strokeWidth = 2, variants, children, ...props }) {
  return (
    <motion.svg
      viewBox="0 0 24 24"
      width={size}
      height={size}
      fill="none"
      stroke="currentColor"
      strokeWidth={strokeWidth}
      strokeLinecap="round"
      strokeLinejoin="round"
      variants={variants}
      transition={transitionIcone}
      {...props}
    >
      {children}
    </motion.svg>
  );
}
