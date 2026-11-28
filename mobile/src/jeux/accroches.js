/**
 * Accroches visées le 28 nov. Le français et l'anglais sont ceux du plan, caractère pour caractère.
 * Une langue autre que le français prend l'anglais.
 */

const ACCROCHES = {
  'terminal-linux': {
    fr: "Tu es l'admin : prouve-le en vraies commandes.",
    en: "You're the admin: prove it with real commands.",
  },
  'big-o-lab': {
    fr: 'Devine : à quelle vitesse ce programme grandit ?',
    en: 'Guess it: how fast does this program grow?',
  },
  'quete-sql': {
    fr: "En vrac : remets cette requête dans l'ordre.",
    en: 'Scrambled: put this query back in order.',
  },
  'cpu-process': {
    fr: 'À toi de choisir quel processus passe en premier.',
    en: 'You pick which process runs first.',
  },
  'robot-route': {
    fr: "Trace le chemin sans heurter d'obstacle.",
    en: "Plot the path: don't hit an obstacle.",
  },
  'topo-reseau': {
    fr: 'Relie ces machines sans jamais les mélanger.',
    en: 'Connect these machines without mixing them.',
  },
  'tri-cyber': {
    fr: "Classe les incidents : l'urgent avant le calme.",
    en: 'Rank the incidents: urgent first, then calm.',
  },
  'threshold-lab': {
    fr: "Règle le seuil, et vois le coût d'une erreur.",
    en: 'Set the threshold, and see what an error costs.',
  },
  'budget-erp': {
    fr: 'Quatre postes, un budget : répartis-le.',
    en: 'Four lines, one budget: you split it.',
  },
  'sprint-agile': {
    fr: 'Choisis le sprint sans casser les dépendances.',
    en: "Pick the sprint: don't break the dependencies.",
  },
  'stock-pilot': {
    fr: 'Tiens trois jours sans une seule rupture.',
    en: 'Last three days without a single stockout.',
  },
};

/** Accroche d'un jeu. Sans phrase, chaîne vide : la carte reste lisible. */
export const accrocheDe = (code, langue = 'fr') => {
  const texte = ACCROCHES[code];
  if (!texte) return '';
  const fr = String(langue || 'fr').toLowerCase().startsWith('fr');
  return fr ? texte.fr : texte.en;
};
