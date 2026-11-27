// VIT-23 : première section des pages, côté sources. Chaque image citée existe dans shared/icones/images/ et dans MODULES_ILLUSTRES ;
// chaque passage en relief est un morceau exact du titre de sa page ; l'accueil reprend tels quels les textes C2 visés le 19 nov.
import { test } from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { IMAGE_DU_MODULE, IMAGE_DE_PAGE, TAILLE_ILLUSTRATION } from '../src/components/socle/illustrations.js';
import { MODULES_ILLUSTRES } from '../../shared/icones/index.js';

const ICI = path.dirname(fileURLToPath(import.meta.url));
const I18N = path.join(ICI, '..', 'src', 'i18n');
const IMAGES = path.join(ICI, '..', '..', 'shared', 'icones', 'images');
const charger = (langue, page) => JSON.parse(fs.readFileSync(path.join(I18N, langue, `${page}.json`), 'utf8'));

test('chaque image des ouvertures est une illustration de VIT-09c, présente sur le disque', () => {
  for (const id of [...Object.values(IMAGE_DU_MODULE), ...Object.values(IMAGE_DE_PAGE)]) {
    assert.ok(MODULES_ILLUSTRES.includes(id), id);
    assert.ok(fs.existsSync(path.join(IMAGES, `${id}.webp`)), `${id}.webp`);
  }
  assert.equal(TAILLE_ILLUSTRATION, 512);
});

test('les cinq modules disponibles ont leur illustration', () => {
  assert.deepEqual(Object.keys(IMAGE_DU_MODULE).sort(), ['annoncesEtMessages', 'emploiDuTemps', 'espaceDeCours', 'presences', 'quizEtJeux']);
});

const PAGES_AVEC_RELIEF = ['direction', 'scolarite', 'enseignants', 'etudiants', 'solutions', 'bibliotheque-des-jeux', 'securite'];

for (const langue of ['fr', 'en']) {
  test(`${langue} · chaque relief est un morceau exact du titre de sa page`, () => {
    const accueil = charger(langue, 'accueil').ouverture;
    assert.ok(accueil.relief && accueil.titre.includes(accueil.relief), `accueil : ${accueil.relief}`);
    for (const page of PAGES_AVEC_RELIEF) {
      const { titre, relief } = charger(langue, page).entete;
      assert.ok(relief && titre.includes(relief), `${page} : « ${relief} » absent de « ${titre} »`);
    }
  });
}

test('accueil : les textes C2 visés le 19 nov. sont repris tels quels', () => {
  const fr = charger('fr', 'accueil').ouverture;
  const en = charger('en', 'accueil').ouverture;
  assert.equal(fr.surtitre, 'Planner');
  assert.equal(fr.titre, "L'emploi du temps calculé selon vos règles. Puis toute la classe.");
  assert.equal(en.titre, 'A timetable built from your rules. Then the whole classroom.');
  assert.deepEqual(Object.values(fr.roles), ['Vous êtes :', 'Direction', 'Scolarité', 'Enseignant', 'Étudiant']);
  assert.deepEqual(Object.values(en.roles), ['You are:', 'Leadership', 'Registrar', 'Teacher', 'Student']);
});
