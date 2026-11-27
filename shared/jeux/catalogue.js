import { challengeList } from '../terminal/moteur.js';
import { SIMULATIONS } from '../simulations/catalogue.js';

/**
 * Catalogue des jeux de la plateforme, commun au serveur (validation de la progression), au web
 * et au mobile (affichage). ClassQuiz n'y figure pas : ses quiz vivent dans son propre service.
 *
 * Ajouter un jeu : une entrée ici (code stable, il est enregistré en base ; `modes` dit s'il se
 * joue seul sur téléphone ou au tableau avec la classe), son moteur dans shared/<jeu>/ et son
 * écran sur le web et le mobile. `cycles` et `domaine` restent dans les deux listes fermées.
 */

/** Ordre des cycles visé le 27 nov. Le titre français est celui du plan ; l'anglais vient avec les écrans. */
export const CYCLES = [
  { code: 'college', titre: { fr: 'Collège' } },
  { code: 'lycee', titre: { fr: 'Lycée' } },
  { code: 'superieur', titre: { fr: 'Supérieur' } },
  { code: 'formation-professionnelle', titre: { fr: 'Formation professionnelle' } },
];

/** Ordre des domaines visé le 27 nov. Les titres d'écran sont ceux du tableau. */
export const DOMAINES = [
  { code: 'informatique', titre: { fr: 'Informatique', en: 'Computer science' } },
  { code: 'reseaux-cybersecurite', titre: { fr: 'Réseaux et cybersécurité', en: 'Networks and cybersecurity' } },
  { code: 'intelligence-artificielle', titre: { fr: 'Intelligence artificielle', en: 'Artificial intelligence' } },
  { code: 'gestion-logistique', titre: { fr: 'Gestion et logistique', en: 'Business and logistics' } },
];

/** Rang du tableau à l'intérieur d'un domaine. Cette liste ne réordonne ni JEUX ni SIMULATIONS. */
const RANG = [
  'terminal-linux', 'big-o-lab', 'quete-sql', 'cpu-process', 'robot-route',
  'topo-reseau', 'tri-cyber', 'threshold-lab',
  'budget-erp', 'sprint-agile', 'stock-pilot',
];

export const JEUX = [
  {
    code: 'terminal-linux',
    type: 'terminal',
    // individuel : chacun joue sur son téléphone ; collectif : la classe propose, l'enseignant joue au tableau
    modes: ['individuel', 'collectif'],
    discipline: 'informatique',
    cycles: ['superieur'],
    domaine: 'informatique',
    titre: { fr: 'Terminal Linux', en: 'Linux terminal' },
    resume: {
      fr: "Naviguer, chercher, rediriger, gérer droits et processus, jusqu'à une astreinte sur un serveur : de vraies commandes, dans un terminal simulé.",
      en: 'Navigate, search, redirect, manage permissions and processes, up to an on-call shift on a server: real commands in a simulated terminal.',
    },
    source: { nom: 'Terminal Quest', auteur: 'Bruno Zapico', url: 'https://github.com/brunozapico/terminal_quest', licence: 'MIT' },
    defis: challengeList.map((d) => ({ id: d.id, niveau: d.level, xp: d.xp, boss: Boolean(d.boss) })),
  },
  ...SIMULATIONS,
];

export const MODES_JEU = ['individuel', 'collectif'];

/** Façons de lancer un jeu en classe ; un jeu qui n'en déclare pas se joue seul */
export const modesDuJeu = (jeu) => (Array.isArray(jeu?.modes) && jeu.modes.length ? jeu.modes : ['individuel']);

export const jeuParCode =(code) => JEUX.find((j) => j.code === code) ?? null;

export const defiDuJeu = (jeu, idDefi) => jeu?.defis.find((d) => d.id === idDefi) ?? null;

/** Points maximum d'un jeu (tous les défis réussis sans aide) */
export const pointsMax = (jeu) => jeu.defis.reduce((total, d) => total + d.xp, 0);

/** Libellé dans la langue de l'interface */
export const libelle = (texte, langue = 'fr') =>
  texte?.[String(langue || 'fr').toLowerCase().startsWith('fr') ? 'fr' : 'en'] ?? texte?.fr ?? '';

const indexDuRang = (code) => {
  const index = RANG.indexOf(code);
  return index === -1 ? RANG.length : index;
};

/**
 * Groupe une liste déjà fournie : cycle, puis domaine, puis rang du tableau.
 * Un groupe vide est omis. L'ordre suit CYCLES et DOMAINES, pas une langue.
 * Ni JEUX ni SIMULATIONS ne sont réordonnés.
 */
export const rangerJeux = (jeux) => {
  const liste = Array.isArray(jeux) ? jeux : [];
  return CYCLES.flatMap((cycle) => {
    const domaines = DOMAINES.flatMap((domaine) => {
      const duGroupe = liste
        .filter((jeu) => Array.isArray(jeu?.cycles) && jeu.cycles.includes(cycle.code) && jeu.domaine === domaine.code)
        .sort((a, b) => indexDuRang(a.code) - indexDuRang(b.code));
      return duGroupe.length ? [{ domaine: domaine.code, titre: domaine.titre, jeux: duGroupe }] : [];
    });
    return domaines.length ? [{ cycle: cycle.code, titre: cycle.titre, domaines }] : [];
  });
};
