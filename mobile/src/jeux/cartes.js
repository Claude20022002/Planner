/**
 * Cartes d'un module déjà filtré : cycle, puis domaine, puis rang du catalogue.
 * L'image peut manquer : le titre, le domaine, l'accroche et la progression restent.
 */
import { jeuParCode, libelle, rangerJeux } from '../../../shared/jeux/catalogue.js';
import { accrocheDe } from './accroches.js';

/** Complète chaque jeu avec le cycle et le domaine du catalogue. Un code inconnu est omis. */
export const preparerJeux = (jeux) => (Array.isArray(jeux) ? jeux : []).flatMap((jeu) => {
  const ref = jeuParCode(jeu?.code);
  if (!ref) return [];
  return [{ ...jeu, cycles: ref.cycles, domaine: ref.domaine, titre: ref.titre }];
});

/**
 * Groupes à afficher. `aUneVue(code)` dit si le fichier WebP est là.
 * Un cycle ou un domaine sans jeu n'apparaît pas : `rangerJeux` l'omet.
 */
export const cartesRangees = (jeux, langue, aUneVue) => rangerJeux(preparerJeux(jeux)).map((cycle) => ({
  cycle: cycle.cycle,
  titre: libelle(cycle.titre, langue),
  domaines: cycle.domaines.map((domaine) => ({
    domaine: domaine.domaine,
    titre: libelle(domaine.titre, langue),
    jeux: domaine.jeux.map((jeu) => ({
      code: jeu.code,
      titre: libelle(jeu.titre, langue),
      domaine: libelle(domaine.titre, langue),
      accroche: accrocheDe(jeu.code, langue),
      progression: jeu.progression ?? { reussis: 0, total: 0, points: 0 },
      image: Boolean(aUneVue?.(jeu.code)),
    })),
  })),
}));
