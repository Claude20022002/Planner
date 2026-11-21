/** Curseurs animés, adaptés de lucide-animated (sliders-horizontal.tsx, MIT). */
import { motion } from 'motion/react';
import CadreIcone from './CadreIcone';
import { transitionIcone } from './transitionIcone';

const CURSEURS = [[4, 14, 9], [12, 8, 14], [20, 16, 8]];

export default function ReglagesAnimes(props) {
  return (
    <CadreIcone {...props}>
      {CURSEURS.map(([y, depart, arrivee]) => (
        <motion.path
          key={y}
          d={tracer(y, depart)}
          variants={{ repos: { d: tracer(y, depart) }, survol: { d: tracer(y, arrivee) } }}
          transition={transitionIcone}
        />
      ))}
    </CadreIcone>
  );
}

function tracer(y, x) {
  return 'M3 ' + y + 'H' + (x - 2) + 'M' + (x + 2) + ' ' + y + 'H21M' + x + ' ' + (y - 2) + 'v4';
}
