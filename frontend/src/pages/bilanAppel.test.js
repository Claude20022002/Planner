/**
 * Régression : l'écran d'appel disait « 1 absents ».
 * La phrase d'avant correctif échoue ; « 1 absent » passe.
 */
import { before, test } from 'node:test';
import assert from 'node:assert/strict';
import i18next from 'i18next';
import fr from '../i18n/fr.js';
import en from '../i18n/en.js';
import { texteBilanAppel } from './bilanAppel.js';

let tFr;
let tEn;

before(async () => {
  const i18n = i18next.createInstance();
  await i18n.init({
    lng: 'fr',
    fallbackLng: 'fr',
    resources: {
      fr: { translation: fr },
      en: { translation: en },
    },
    interpolation: { escapeValue: false },
  });
  tFr = i18n.getFixedT('fr');
  tEn = i18n.getFixedT('en');
});

test('un seul absent est au singulier', () => {
  assert.equal(texteBilanAppel(tFr, { presents: 4, absents: 1 }), '4 présents · 1 absent');
});

test('un seul présent est au singulier, plusieurs absents restent au pluriel', () => {
  assert.equal(texteBilanAppel(tFr, { presents: 1, absents: 2 }), '1 présent · 2 absents');
});

test('zéro est au singulier en français', () => {
  assert.equal(texteBilanAppel(tFr, { presents: 0, absents: 0 }), '0 présent · 0 absent');
});

test('un retard laisse l’absent au singulier', () => {
  assert.equal(
    texteBilanAppel(tFr, { presents: 2, absents: 1, retards: 1 }),
    '2 présents dont 1 en retard · 1 absent',
  );
});

test('l’anglais garde l’adjectif, au singulier comme au pluriel', () => {
  assert.equal(texteBilanAppel(tEn, { presents: 1, absents: 1 }), '1 present · 1 absent');
  assert.equal(texteBilanAppel(tEn, { presents: 2, absents: 3 }), '2 present · 3 absent');
});
