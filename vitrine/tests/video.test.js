// Tests de la vidéo de l'accueil (VIT-08) : ses textes (neuf scènes, chacune avec un titre, ses
// lignes et la description de son image pour la transcription, en français et en anglais), la
// langue montrée sur chaque page, et, dès que le rendu final est commité dans public/videos/,
// l'empreinte (une vidéo dont les textes, la charte ou les logos ont changé est périmée) et le poids
// de chaque fichier. Avant le rendu final, qui attend les SVG officiels, ces deux tests sont sautés.
import { test } from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { LANGUES_VIDEO, calculerEmpreinte, fichiersVideo, langueVideo } from '../src/components/accueil/empreinteVideo.js';

const SITE = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const VIDEOS = path.join(SITE, 'public', 'videos');
const textes = (langue) => JSON.parse(fs.readFileSync(path.join(SITE, 'src', 'i18n', langue, 'accueil.json'), 'utf8')).video;
const NOMBRE_SCENES = 9; // plan, § 4

const rendue = fs.existsSync(path.join(VIDEOS, 'empreinte.json'));
const SAUT = rendue ? false : 'rendu final pas encore commité : il attend les SVG officiels (plan, question 4)';

test('neuf scènes, chacune avec un titre, ses lignes et la description de son image', () => {
  for (const langue of LANGUES_VIDEO) {
    const { scenes } = textes(langue);
    assert.equal(scenes.length, NOMBRE_SCENES, `${langue} : ${scenes.length} scènes`);
    scenes.forEach((scene, i) => {
      assert.ok(scene.titre.trim(), `${langue}, scène ${i + 1} : titre vide`);
      assert.ok(scene.lignes.length > 0 && scene.lignes.every((l) => l.trim()), `${langue}, scène ${i + 1} : ligne vide`);
      assert.ok(scene.image.trim(), `${langue}, scène ${i + 1} : description de l'image vide`);
    });
  }
});

test('les scènes anglaises ont autant de lignes que les françaises', () => {
  const fr = textes('fr').scenes;
  textes('en').scenes.forEach((scene, i) => assert.equal(scene.lignes.length, fr[i].lignes.length, `scène ${i + 1}`));
});

test('chaque page montre la vidéo de sa langue, et l’arabe la française', () => {
  assert.equal(langueVideo('fr'), 'fr');
  assert.equal(langueVideo('en'), 'en');
  assert.equal(langueVideo('ar'), 'fr');
});

test('la vidéo rendue est à jour : textes, charte et logos', { skip: SAUT }, () => {
  const rendu = JSON.parse(fs.readFileSync(path.join(VIDEOS, 'empreinte.json'), 'utf8'));
  const { empreinte, charte } = calculerEmpreinte(SITE);
  assert.deepEqual(rendu.langues, [...LANGUES_VIDEO].sort(), 'toutes les langues sont rendues');
  assert.equal(rendu.charte, charte, 'la charte a changé depuis le rendu');
  assert.equal(rendu.empreinte, empreinte, 'textes ou logos changés depuis le rendu : lancer « npm run render:accueil » dans docs/presentation/video');
});

test('les fichiers rendus existent et respectent leur poids', { skip: SAUT }, () => {
  for (const langue of LANGUES_VIDEO) {
    for (const { nom, max } of Object.values(fichiersVideo(langue))) {
      const fichier = path.join(VIDEOS, nom);
      assert.ok(fs.existsSync(fichier), `${nom} manque`);
      assert.ok(fs.statSync(fichier).size <= max, `${nom} dépasse ${max} octets`);
    }
  }
});
