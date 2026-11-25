// Lecture du registre au build. Le menu et le catalogue partagent les mêmes groupes.
import entrees from '../../donnees/fonctionnalites.json' with { type: 'json' };
import { LANGUE_SECOURS, chemin, pageModule } from '../../i18n/langues.js';
import { MODULES, estDisponible } from '../../donnees/modules.js';

/** Valeurs permises du champ `module` d'une entrée : les 17 modules, plus « socle » (inclus dans tout abonnement, VIT-20 § 4.6) */
export const CLES_REGISTRE = [...MODULES.map((module) => module.cle), 'socle'];

/** Vrai si le module de l'entrée n'a pas de page : l'entrée s'affiche alors avec le badge « Bientôt » */
export const entreeBientot = (entree) =>
  entree.etat === 'bientot' || (entree.module !== 'socle' && !estDisponible(MODULES.find((module) => module.cle === entree.module)));

/** Page où mène une entrée : la page de son module, le socle, ou « Toutes les applications » si le module est « Bientôt » */
export const lienEntree = (langue, entree) => {
  if (entree.module === 'socle') return chemin(langue, 'socle');
  const module = MODULES.find((m) => m.cle === entree.module);
  return estDisponible(module) ? chemin(langue, pageModule(module.cle)) : chemin(langue, 'applications');
};

/** Regroupe les entrées dans leur ordre éditorial, en conservant les clés stables. */
export function regrouper(fonctions, champ) {
  const groupes = new Map();
  for (const fonction of fonctions) {
    const cle = fonction[champ];
    if (!groupes.has(cle)) groupes.set(cle, []);
    groupes.get(cle).push(fonction);
  }
  return groupes;
}

/** Traduit les libellés de chaque entrée avec le repli du site. */
export function fonctionnalites(langue) {
  const traduire = (texte) => texte[langue] || texte[LANGUE_SECOURS];
  return entrees.map((entree) => ({
    ...entree,
    titre: traduire(entree.titre),
    description: traduire(entree.description),
    alternative: entree.alternative && traduire(entree.alternative),
  }));
}
