// Vérifie les contextes, les textes visés et les sources du bloc d'équipement.
import assert from 'node:assert/strict';
import { readFileSync, statSync } from 'node:fs';
import { test } from 'node:test';
import { EQUIPEMENT } from '../src/donnees/equipement.js';
import { modulesDisponibles } from '../src/donnees/modules.js';
import { LANGUES, LANGUES_PUBLIEES } from '../src/i18n/langues.js';
import { forme } from '../src/i18n/traduire.js';

const RACINE = new URL('../../', import.meta.url);
const PLAN = 'docs/conception/vitrine/vit-20d-equipement.md';
const CONTEXTES = ['s1', 's2', 's3'];
const lire = (fichier) => readFileSync(new URL(fichier, RACINE), 'utf8');
const dictionnaires = Object.fromEntries(LANGUES.map((langue) => [
  langue, JSON.parse(lire(`vitrine/src/i18n/${langue}/equipement.json`)),
]));
const modules = modulesDisponibles();

test('chaque module disponible a trois lignes dans l’ordre S1, S2, S3, avec des sources existantes', () => {
  assert.deepEqual(Object.keys(EQUIPEMENT), modules.map(({ cle }) => cle));
  for (const { cle } of modules) {
    const lignes = EQUIPEMENT[cle];
    assert.deepEqual(lignes.map(({ contexte }) => contexte), CONTEXTES, cle);
    for (const { contexte, texte, etat, sources } of lignes) {
      assert.equal(texte, `modules.${cle}.${contexte}`);
      assert.ok(['marche', 'en partie', 'non', 'bientot'].includes(etat), texte);
      assert.ok(sources.length > 0, texte);
      for (const source of sources) assert.ok(statSync(new URL(source, RACINE)).isFile(), source);
    }
  }
});

test('les phrases et leurs sources reprennent le tableau visé, avec « Bientôt » dans les deux langues', () => {
  const lignesVisees = lire(PLAN).split(/\r?\n/).filter((ligne) => /^\| S[123] \|/.test(ligne));
  assert.equal(lignesVisees.length, modules.length * CONTEXTES.length);

  for (const [index, { cle }] of modules.entries()) {
    for (const [position, ligne] of EQUIPEMENT[cle].entries()) {
      const [, contexte, etat, fr, en, sources] = lignesVisees[index * CONTEXTES.length + position].split('|').map((cellule) => cellule.trim());
      assert.equal(ligne.contexte, contexte.toLowerCase());
      assert.equal(ligne.etat, etat === 'Bientôt' ? 'bientot' : etat);
      assert.deepEqual(ligne.sources, [...sources.matchAll(/`([^`]+)`/g)].map(([, source]) => source));
      assert.equal(dictionnaires.fr.modules[cle][ligne.contexte], fr);
      assert.equal(dictionnaires.en.modules[cle][ligne.contexte], en);

      if (ligne.etat === 'bientot' || /bientôt/i.test(fr) || /coming soon/i.test(en)) {
        assert.match(fr, /bientôt/i);
        assert.match(en, /coming soon/i);
      }
      assert.doesNotMatch(fr + en, /[\p{N}\p{Sc}]/u);
    }
  }
});

test('les dictionnaires partagent les mêmes clés et seuls les textes arabes sont vides', () => {
  assert.deepEqual(Object.keys(dictionnaires.fr.contextes), CONTEXTES);
  assert.deepEqual(Object.keys(dictionnaires.fr.modules), modules.map(({ cle }) => cle));
  for (const langue of LANGUES) {
    const { contextes, modules: textes } = dictionnaires[langue];
    assert.deepEqual(forme(dictionnaires[langue]), forme(dictionnaires.fr));
    const valeurs = [...Object.values(contextes), ...Object.values(textes).flatMap((module) => Object.values(module))];
    for (const valeur of valeurs) assert.equal(valeur.trim().length > 0, LANGUES_PUBLIEES.includes(langue), langue);
  }
});
