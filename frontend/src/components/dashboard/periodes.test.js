/** Périodes du tableau de bord (UIX-11) : semaine du lundi au dimanche, mois, 14 jours, période en cours. */
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { joursSuivants, moisEnCours, nomPeriode, periodeEnCours, prochainsJours, semaineEnCours } from './periodes.js';

// Midi, heure locale : le jour ne dépend pas du fuseau de la machine qui lance les tests
const le = (a, m, j) => new Date(a, m - 1, j, 12);

test('la semaine d’un mercredi va du lundi au dimanche', () => {
  assert.deepEqual(semaineEnCours(le(2026, 11, 18)), { debut: '2026-11-16', fin: '2026-11-22' });
});

test('un lundi ouvre sa semaine, un dimanche la ferme', () => {
  assert.deepEqual(semaineEnCours(le(2026, 11, 16)), { debut: '2026-11-16', fin: '2026-11-22' });
  assert.deepEqual(semaineEnCours(le(2026, 11, 22)), { debut: '2026-11-16', fin: '2026-11-22' });
});

test('une semaine à cheval sur deux mois et sur deux années', () => {
  assert.deepEqual(semaineEnCours(le(2026, 12, 2)), { debut: '2026-11-30', fin: '2026-12-06' });
  assert.deepEqual(semaineEnCours(le(2027, 1, 1)), { debut: '2026-12-28', fin: '2027-01-03' });
});

test('le jour de début se règle en un seul endroit (PLA-13)', () => {
  // Une école dont la semaine commence le dimanche
  assert.deepEqual(semaineEnCours(le(2026, 11, 18), 0), { debut: '2026-11-15', fin: '2026-11-21' });
  assert.deepEqual(semaineEnCours(le(2026, 11, 15), 0), { debut: '2026-11-15', fin: '2026-11-21' });
});

test('mois en cours au format AAAA-MM', () => {
  assert.equal(moisEnCours(le(2026, 11, 30)), '2026-11');
  assert.equal(moisEnCours(le(2027, 1, 1)), '2027-01');
});

test('les 14 prochains jours comptent aujourd’hui', () => {
  assert.deepEqual(prochainsJours(14, le(2026, 11, 21)), { debut: '2026-11-21', fin: '2026-12-04' });
});

test('le panneau : aujourd’hui et les 2 jours suivants, même au passage de l’année', () => {
  assert.deepEqual(joursSuivants(2, le(2026, 12, 31)), { debut: '2026-12-31', fin: '2027-01-02' });
});

const annees = [
  {
    libelle: '2025-2026',
    active: false,
    periodes: [{ id_periode: 1, code: 'S2', libelle: 'Semestre 2', date_debut: '2026-02-01', date_fin: '2026-06-30' }],
  },
  {
    libelle: '2026-2027',
    active: true,
    periodes: [
      { id_periode: 2, code: 'S1', libelle: 'Semestre 1', date_debut: '2026-09-15', date_fin: '2027-01-31' },
      { id_periode: 3, code: 'S2', libelle: '', date_debut: '2027-02-01', date_fin: '2027-06-30' },
    ],
  },
];

test('la période en cours : celle d’une année active qui contient aujourd’hui', () => {
  assert.equal(periodeEnCours(annees, '2027-03-10').id_periode, 3);
  assert.equal(periodeEnCours(annees, '2026-11-21').libelle_annee, '2026-2027');
});

test('sinon la première période active, sinon aucune', () => {
  // Une date d’une année inactive ne choisit pas sa période
  assert.equal(periodeEnCours(annees, '2026-03-01').id_periode, 2);
  assert.equal(periodeEnCours([annees[0]], '2026-03-01'), null);
  assert.equal(periodeEnCours([], '2026-03-01'), null);
});

test('le nom d’une période : libellé, sinon code, puis l’année', () => {
  assert.equal(nomPeriode(periodeEnCours(annees, '2026-11-21')), 'Semestre 1 · 2026-2027');
  assert.equal(nomPeriode(periodeEnCours(annees, '2027-03-10')), 'S2 · 2026-2027');
  assert.equal(nomPeriode(null), '');
});
