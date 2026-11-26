/**
 * Amorce des tests unitaires du site (npm run test:unit) : l'horloge de l'école à UTC, comme la CI et
 * les parcours (M-10). Sans elle, shared/dates.js prendrait le décalage du poste qui lance les tests,
 * et un test pourrait changer de résultat d'un poste à l'autre. Les tests de l'horloge la changent
 * eux-mêmes (src/utils/aujourdhui.test.js).
 */
import { configurerHorloge } from '../../shared/dates.js';

configurerHorloge({ fuseau: 'UTC', decalages: [{ depuis: '1970-01-01T00:00:00.000Z', minutes: 0 }] });
