// Tests du lot A de VIT-20 (sources) : « Se connecter » dépend de l'adresse de l'application, la barre garde l'ordre du plan,
// les anciens menus et constantes ont disparu. Le rendu : tests/navigation.rendu.cjs.
import { test } from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import * as langues from '../src/i18n/langues.js';

const SRC = path.join(path.dirname(fileURLToPath(import.meta.url)), '..', 'src');
const lire = (fichier) => fs.readFileSync(path.join(SRC, fichier), 'utf8');

test('« Se connecter » n\'est rendu que si l\'adresse de l\'application est fixée', () => {
  assert.match(lire('components/socle/EnTete.astro'), /ADRESSE_APPLICATION && <a class="connexion"/);
});

test('la barre : Applications, Établissements, Ressources, Contact, puis démonstration', () => {
  const entete = lire('components/socle/EnTete.astro');
  const ordre = ['<MenuApplications', '<MenuEtablissements', '<MenuRessources', 'navigation.contactLien', 'navigation.demonstration'];
  const places = ordre.map((motif) => entete.indexOf(motif));
  assert.ok(places.every((p) => p > 0));
  assert.deepEqual([...places].sort((a, b) => a - b), places);
});

test('les menus sont des <details> : aucun JavaScript pour les ouvrir', () => {
  assert.match(lire('components/navigation/MenuDeroulant.astro'), /<details/);
  for (const menu of ['MenuApplications', 'MenuEtablissements', 'MenuRessources']) {
    assert.match(lire(`components/navigation/${menu}.astro`), /<MenuDeroulant/);
  }
  assert.equal(fs.existsSync(path.join(SRC, 'components/catalogue/MenuFonctions.astro')), false);
});

test('les constantes des anciennes pages de fonction ont disparu de langues.js', () => {
  for (const ancien of ['FONCTIONS', 'BARRE', 'NAVIGATION']) assert.equal(ancien in langues, false, ancien);
  for (const cle of ['emploiDuTemps', 'enClasse', 'quizEtJeux', 'coursEtAnnonces', 'bibliotheque', 'application', 'etablissement']) {
    assert.equal(cle in langues.PAGES, false, cle);
  }
});
