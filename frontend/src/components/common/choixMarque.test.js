/** Régression du kit : SVG intacts, logo complet sans école, mot seul avec école. */
import assert from 'node:assert/strict';
import test from 'node:test';
import { readFileSync } from 'node:fs';
import { createHash } from 'node:crypto';
import { estSansEcole, fichierMarque, hauteurMot } from './choixMarque.js';

test('Planner générique et identité d’école ne sont pas confondus', () => {
  const generique = { nom: 'Planner', nom_court: 'Planner', logo: null, couleur_principale: null };
  assert.equal(estSansEcole(generique), true);
  assert.equal(estSansEcole({ ...generique, nom: 'École fictive', nom_court: 'École' }), false);
  assert.equal(estSansEcole({ ...generique, logo: { version: 1 } }), false);
  assert.equal(estSansEcole({ ...generique, couleur_principale: '#334155' }), false);
  assert.match(fichierMarque(true, false), /horizontal.svg$/);
  assert.match(fichierMarque(true, true), /horizontal-fonce.svg$/);
  assert.match(fichierMarque(false, false), /mot.svg$/);
  assert.match(fichierMarque(false, true), /mot-blanc.svg$/);
});

test('capitales à 40 % du logo école selon les tracés du SVG', () => {
  for (const hauteur of [26, 28, 32, 42]) assert.ok(Math.abs(hauteurMot(hauteur) * 100 / 108 - hauteur * 0.4) < 0.001);
});

const empreintesApprouvees = {
  "favicon.ico": "5c615801719e5621da1388543e16344337ccd8d49e338097f63fc1631e408e22",
  "favicon.svg": "fbddb80aed2255321643281691939c160224101c32667f2199ebee1edd602d5f",
  "planner-horizontal-fonce.svg": "a6d49499e407df3e6ea7f362bf73b75b9dc45848dee94f60525ef7897981479b",
  "planner-horizontal.svg": "b8b3e86726877403c1242fde767e632b5bb95694d877c857ee25152d15414eb2",
  "planner-mot-blanc.svg": "baac27d672d71782ef69b649926bc18c179d7202bb8ca2bac0d2d7f93af1ec56",
  "planner-mot.svg": "05356f294cdaee948688e0999cef64f5b2d6f95cb82a12dfc6cf77d5bad5effc"
};
test('les six assets restent identiques au kit approuvé du 11 novembre', () => {
  for (const [fichier, empreinte] of Object.entries(empreintesApprouvees)) {
    const donnees = readFileSync(new URL('../../../public/marque/' + fichier, import.meta.url));
    assert.equal(createHash('sha256').update(donnees).digest('hex'), empreinte, fichier);
  }
});
