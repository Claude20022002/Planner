// Lecture du registre au build. Le menu et le catalogue partagent les mêmes groupes.
import entrees from '../../donnees/fonctionnalites.json' with { type: 'json' };
import { LANGUE_SECOURS } from '../../i18n/langues.js';

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
