// « Pour qui » d'un module : les types d'établissement (VIT-13) dont un point « Aujourd'hui » mène à la page du module, et
// les rôles (VIT-10) dont une carte y mène. Tiré des pages existantes : aucune affirmation nouvelle sur qui utilise quoi.
import { TYPES } from '../solutions/types.js';
import { traductions } from '../../i18n/index.js';
import { ROLES, chemin, pageModule } from '../../i18n/langues.js';

/** Liens { href, texte } des types et des rôles concernés par un module */
export function pourQui(langue, cle) {
  const page = pageModule(cle);
  const solutions = traductions(langue, 'solutions');
  const commun = traductions(langue, 'commun');
  const types = TYPES.filter((type) => type.pages.includes(page)).map(({ cle: type, ancre }) => ({
    href: chemin(langue, 'solutions', ancre),
    texte: solutions(`types.${type}.surtitre`),
  }));
  const roles = ROLES.filter((role) => traductions(langue, role)('cartes').some((carte) => carte.page === page)).map((role) => ({
    href: chemin(langue, role),
    texte: commun(`navigation.${role}`),
  }));
  return { types, roles };
}
