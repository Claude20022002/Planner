/**
 * QJE-15 : le rangement d'un module, et la carte qui reste lisible sans image.
 */
import { accrocheDe } from '../src/jeux/accroches.js';
import { cartesRangees } from '../src/jeux/cartes.js';

const CODES = [
  'terminal-linux', 'big-o-lab', 'quete-sql', 'cpu-process', 'robot-route',
  'topo-reseau', 'tri-cyber', 'threshold-lab', 'budget-erp', 'sprint-agile', 'stock-pilot',
];

const progression = { reussis: 1, total: 3, points: 40 };
const aUneVue = (code) => code !== 'big-o-lab' && code !== 'quete-sql';

test('sans image, le titre, le domaine et l\'accroche restent', () => {
  const groupes = cartesRangees([
    { code: 'quete-sql', progression },
    { code: 'big-o-lab', progression: { reussis: 0, total: 3, points: 0 } },
    { code: 'stock-pilot', progression },
  ], 'fr', aUneVue);

  expect(groupes.map((cycle) => cycle.titre)).toEqual(['Supérieur']);
  expect(groupes[0].domaines.map((domaine) => domaine.titre)).toEqual(['Informatique', 'Gestion et logistique']);
  const informatique = groupes[0].domaines[0].jeux;
  expect(informatique.map((jeu) => jeu.code)).toEqual(['big-o-lab', 'quete-sql']);
  expect(informatique.every((jeu) => jeu.image === false)).toBe(true);
  expect(informatique[0].titre).toBe('Labo Big-O');
  expect(informatique[0].accroche).toBe('Devine : à quelle vitesse ce programme grandit ?');
  expect(groupes[0].domaines[1].jeux[0]).toMatchObject({
    code: 'stock-pilot',
    titre: 'Pilote des stocks',
    image: true,
  });
});

test('la langue ne change pas le rang', () => {
  const jeux = CODES.map((code) => ({ code, progression }));
  const francais = cartesRangees(jeux, 'fr', aUneVue).flatMap((cycle) => cycle.domaines.flatMap((domaine) => domaine.jeux.map((jeu) => jeu.code)));
  const anglais = cartesRangees(jeux, 'en', aUneVue);
  const codesAnglais = anglais.flatMap((cycle) => cycle.domaines.flatMap((domaine) => domaine.jeux.map((jeu) => jeu.code)));
  expect(codesAnglais).toEqual(francais);
  expect(anglais[0].titre).toBe('Higher education');
  expect(anglais[0].domaines[0].titre).toBe('Computer science');
  expect(accrocheDe('robot-route', 'en')).toBe("Plot the path: don't hit an obstacle.");
});

test('chaque accroche tient en 60 caractères', () => {
  for (const code of CODES) {
    expect(accrocheDe(code, 'fr').length).toBeLessThanOrEqual(60);
    expect(accrocheDe(code, 'en').length).toBeLessThanOrEqual(60);
    expect(accrocheDe(code, 'fr').length).toBeGreaterThan(0);
  }
});
