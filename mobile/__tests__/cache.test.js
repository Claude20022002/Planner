import { readFileSync } from 'node:fs';
import path from 'node:path';

const lire = (nom) => readFileSync(path.join(process.cwd(), nom), 'utf8');

test('le préfixe ne porte pas le nom de l\'école pilote', () => {
  const source = lire(path.join('src', 'cache.js'));
  expect(source).toMatch(/export const PREFIXE = 'planner\.cache\.'/);
  expect(source).not.toMatch(/hestim\.cache/);
});

test('le nom affiché et les permissions ne portent pas le nom de l\'école ; les identifiants restent', () => {
  const application = JSON.parse(lire('app.json')).expo;
  expect(application.name).toBe('Planner');
  expect(application.name).not.toMatch(/HESTIM/);
  const permissions = application.plugins.flatMap((plugin) => (Array.isArray(plugin) ? [plugin[1].photosPermission, plugin[1].cameraPermission] : []));
  for (const texte of permissions.filter(Boolean)) expect(texte.startsWith('Planner ')).toBe(true);
  for (const texte of permissions.filter(Boolean)) expect(texte).not.toMatch(/HESTIM/);
  expect(application.slug).toBe('hestim-planner');
  expect(application.scheme).toBe('hestim');
  expect(application.android.package).toBe('com.hestim.planner');
  expect(application.ios.bundleIdentifier).toBe('com.hestim.planner');
});
