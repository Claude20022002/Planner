/**
 * Date du jour à l'école (shared/dates.js, lot B-2, M-10). Lancé par `npm run test:unit`, avec l'horloge
 * de l'école à UTC (scripts/horloge-tests.mjs) ; les tests de M-10 en posent une autre, puis la remettent.
 */
import assert from 'node:assert/strict';
import { afterEach, test } from 'node:test';
import { aujourdhui, configurerHorloge, dansJours, decalageA, fuseauEcole, heureEcole, instantEcole, jourUtc, oublierHorloge } from '../../../shared/dates.js';
import { minutesAvantFin } from '../components/mesClasses/classe.js';

test("date de l'école en UTC+0, y compris entre 23 h et minuit", () => {
  assert.equal(aujourdhui(new Date('2026-10-11T23:30:00Z')), '2026-10-11');
  assert.equal(aujourdhui(new Date('2026-10-12T00:00:00Z')), '2026-10-12');
});

test('dans n jours, et il y a n jours', () => {
  const maintenant = new Date('2026-12-31T12:00:00Z');
  assert.equal(dansJours(1, maintenant), '2027-01-01');
  assert.equal(dansJours(-31, maintenant), '2026-11-30');
  assert.equal(dansJours(0, maintenant), '2026-12-31');
});

test("jour civil UTC d'un instant déjà calculé", () => {
  assert.equal(jourUtc(new Date('2026-11-15T12:00:00Z')), '2026-11-15');
  assert.equal(jourUtc(new Date('2026-11-15T23:30:00Z')), '2026-11-15');
  assert.equal(jourUtc(new Date('2026-03-29T12:00:00Z')), '2026-03-29');
});

test("une heure de l'école est lue en UTC+0, quel que soit le fuseau du navigateur", () => {
  assert.equal(instantEcole('2026-10-29', '23:55').toISOString(), '2026-10-29T23:55:00.000Z');
  assert.equal(instantEcole('2026-10-29T00:00:00', '08:30:00').toISOString(), '2026-10-29T08:30:00.000Z');
});

test("rappel de l'appel : la séance de 23:55 n'est pas finie à 23:26 (bug d'un navigateur en UTC+1)", () => {
  const seance = { date: '2026-10-29', heure_fin: '23:55' };
  assert.equal(minutesAvantFin(seance, new Date('2026-10-29T23:26:00Z')), 29);
  assert.equal(minutesAvantFin(seance, new Date('2026-10-29T23:56:00Z')), -1);
});

// ── M-10 : l'horloge de l'école vient du serveur, changements d'heure compris ─────────────
const UTC = { fuseau: 'UTC', decalages: [{ depuis: '1970-01-01T00:00:00.000Z', minutes: 0 }] };
// Une école à UTC+1 toute l'année (Africa/Kinshasa, Africa/Lagos…)
const UTC_PLUS_1 = { fuseau: 'Africa/Kinshasa', decalages: [{ depuis: '2025-10-18T00:00:00.000Z', minutes: 60 }] };
// Une école à heure d'été, comme le serveur la rend (services/etablissement/horloge.js)
const HEURE_ETE = {
  fuseau: 'Europe/Paris',
  decalages: [
    { depuis: '2025-10-26T01:00:00.000Z', minutes: 60 },
    { depuis: '2026-03-29T01:00:00.000Z', minutes: 120 },
    { depuis: '2026-10-25T01:00:00.000Z', minutes: 60 },
  ],
};

afterEach(() => configurerHorloge(UTC));

test("régression M-10 : à 23 h 30 UTC, une école à UTC+1 est déjà au lendemain", () => {
  // Avec l'ancien décalage figé à 0, ces deux lignes rendaient « 2026-11-22 »
  assert.equal(configurerHorloge(UTC_PLUS_1), true);
  assert.equal(aujourdhui(new Date('2026-11-22T23:30:00Z')), '2026-11-23');
  assert.equal(dansJours(1, new Date('2026-11-22T23:30:00Z')), '2026-11-24');
  assert.deepEqual(heureEcole(new Date('2026-11-22T23:30:00Z')), { heures: 0, minutes: 30 });
  // La fin d'une séance de 23 h 55 à l'école tombe à 22 h 55 UTC
  assert.equal(instantEcole('2026-11-22', '23:55').toISOString(), '2026-11-22T22:55:00.000Z');
  assert.equal(fuseauEcole(), 'Africa/Kinshasa');
});

test("changement d'heure : chaque instant prend le décalage en vigueur à ce moment", () => {
  configurerHorloge(HEURE_ETE);
  assert.equal(decalageA(new Date('2026-03-29T00:59:00Z')), 60);
  assert.equal(decalageA(new Date('2026-03-29T01:00:00Z')), 120);
  // Une séance avant et après le changement de la nuit du 28 au 29 mars
  assert.equal(instantEcole('2026-03-29', '00:30').toISOString(), '2026-03-28T23:30:00.000Z');
  assert.equal(instantEcole('2026-03-29', '03:30').toISOString(), '2026-03-29T01:30:00.000Z');
  assert.equal(instantEcole('2026-07-01', '09:00').toISOString(), '2026-07-01T07:00:00.000Z');
  // À 22 h 30 UTC en été, l'école est déjà au lendemain ; en hiver, pas encore
  assert.equal(aujourdhui(new Date('2026-07-01T22:30:00Z')), '2026-07-02');
  assert.equal(aujourdhui(new Date('2026-12-01T22:30:00Z')), '2026-12-01');
});

test("avant la table, la première ligne vaut pour les instants plus anciens", () => {
  configurerHorloge(HEURE_ETE);
  assert.equal(decalageA(new Date('2024-01-01T12:00:00Z')), 60);
});

test("une horloge absente ou mal formée ne remplace pas la table", () => {
  configurerHorloge(UTC_PLUS_1);
  assert.equal(configurerHorloge(undefined), false);
  assert.equal(configurerHorloge({ fuseau: 'X', decalages: [{ depuis: 'pas une date', minutes: 60 }] }), false);
  assert.equal(configurerHorloge({ fuseau: 'X', decalages: [] }), false);
  assert.equal(decalageA(new Date('2026-11-22T12:00:00Z')), 60);
});

test("sans aucune table : le décalage de l'appareil, faute de mieux, jamais 0 en dur (réponse 4)", () => {
  oublierHorloge();
  const instant = new Date('2026-11-22T12:00:00Z');
  assert.equal(decalageA(instant), -instant.getTimezoneOffset());
  assert.equal(fuseauEcole(), null);
});
