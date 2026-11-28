// « Pour qui » : reprend les types d’établissement dont une fonctionnalité mène au module.
import { TYPES } from '../solutions/types.js';
import { traductions } from '../../i18n/index.js';
import { chemin, pageModule } from '../../i18n/langues.js';

/** Liens { href, texte } vers les sections de la page Solutions. */
export function pourQui(langue, cle) {
  const page = pageModule(cle);
  const solutions = traductions(langue, 'solutions');
  return TYPES.filter((type) => type.pages.includes(page)).map(({ cle: type, ancre }) => ({
    href: chemin(langue, 'solutions', ancre),
    texte: solutions('types.' + type + '.surtitre'),
  }));
}
