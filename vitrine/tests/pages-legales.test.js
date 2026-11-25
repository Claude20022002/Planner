// VIT-12 : mentions légales et confidentialité du site. Adresses, liens du pied de page, liens nommés
// des paragraphes, aucun pays ni loi nommés, aucun lien vers un autre site, et aucun champ
// « à compléter » : ce dernier test reste rouge tant que le chef n'a pas donné les valeurs, et bloque
// ainsi la mise en ligne (condition 2 de VIT-06).
import { test } from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { PAGES, chemin } from '../src/i18n/langues.js';

const RACINE = path.join(path.dirname(fileURLToPath(import.meta.url)), '..', 'src');
const lire = (...parties) => fs.readFileSync(path.join(RACINE, ...parties), 'utf8');
const charger = (langue, page) => JSON.parse(lire('i18n', langue, `${page}.json`));
const PAGES_LEGALES = { mentionsLegales: 'mentions-legales', confidentialite: 'confidentialite' };
const PUBLIEES = ['fr', 'en'];

/** Tous les textes d'un dictionnaire, à plat */
const textes = (noeud) => (typeof noeud === 'string' ? [noeud] : Object.values(noeud ?? {}).flatMap(textes));

test('les deux pages ont une adresse dans chaque langue', () => {
  for (const [cle, segment] of Object.entries(PAGES_LEGALES)) {
    assert.equal(PAGES[cle], segment);
    assert.equal(chemin('fr', cle), `/fr/${segment}/`);
    assert.equal(chemin('en', cle), `/en/${segment}/`);
    assert.ok(fs.existsSync(path.join(RACINE, 'pages', '[lang]', `${segment}.astro`)), segment);
  }
});

test('le pied de page lie les deux pages dans sa barre du bas (plan de VIT-20, § 4.5)', () => {
  const pied = lire('components', 'socle', 'PiedDePage.astro');
  const ressources = pied.slice(pied.indexOf('<div class="bas">'));
  for (const cle of Object.keys(PAGES_LEGALES)) {
    assert.match(ressources, new RegExp(`chemin\\(langue, '${cle}'\\)`), cle);
    for (const langue of PUBLIEES) assert.notEqual(charger(langue, 'commun').navigation[cle], '', `${langue} ${cle}`);
  }
});

test('chaque lien nommé d’un paragraphe est fourni par sa page', () => {
  const fournis = { 'mentions-legales': ['email', 'confidentialite'], confidentialite: ['email', 'mentionsLegales'] };
  for (const [page, noms] of Object.entries(fournis)) {
    const source = lire('pages', '[lang]', `${page}.astro`);
    for (const nom of noms) assert.match(source, new RegExp(`${nom}: \\{ href`), `${page} ${nom}`);
    for (const langue of PUBLIEES) {
      for (const texte of textes(charger(langue, page).sections)) {
        for (const [, nom] of texte.matchAll(/\{(\w+)\}/g)) assert.ok(noms.includes(nom), `${langue}/${page} : {${nom}}`);
      }
    }
  }
});

test('aucun pays ni aucune loi nommés, aucun lien vers un autre site', () => {
  const interdits = /Maroc|Morocco|09-08|CNDP|RGPD|GDPR|France|https?:\/\//i;
  for (const segment of Object.values(PAGES_LEGALES)) {
    for (const langue of PUBLIEES) {
      for (const texte of textes(charger(langue, segment))) assert.doesNotMatch(texte, interdits, `${langue}/${segment}`);
    }
    assert.doesNotMatch(lire('pages', '[lang]', `${segment}.astro`), /https?:\/\//, segment);
  }
});

test('l’arabe affiche le français (textes vides)', () => {
  for (const segment of Object.values(PAGES_LEGALES)) {
    assert.deepEqual(textes(charger('ar', segment)).filter(Boolean), [], segment);
  }
});

test('aucun champ à compléter : bloque la mise en ligne tant que le chef n’a pas donné les valeurs', () => {
  const champ = /\[(NOM|E-MAIL|HÉBERGEUR|N|DATE)\]/;
  const restants = PUBLIEES.flatMap((langue) => [
    ...Object.values(PAGES_LEGALES).flatMap((segment) => textes(charger(langue, segment)).map((t) => [`${langue}/${segment}`, t])),
    [`${langue}/commun contact.email`, charger(langue, 'commun').contact.email],
  ]).filter(([, texte]) => champ.test(texte)).map(([ou, texte]) => `${ou} : ${texte.match(champ)[0]}`);
  assert.deepEqual([...new Set(restants)], []);
});
