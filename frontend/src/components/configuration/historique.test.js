/** Vérifie l'état, les actions, le libellé, l'auteur, le compte et la date des versions de l'historique. */
import test from 'node:test';
import assert from 'node:assert/strict';
import { actionsDe, auteurDe, compteDe, dateLisible, etatDe, libelleDe } from './historique.js';

const JOUR = '2026-11-28';
const version = (plus = {}) => ({ id_version: 3, statut: 'appliquee', date_effet: JOUR, annule_version: null, annulee_par: null, libelle: null, auteur: null, nb_reglages: 0, nb_contraintes: 0, nb_retraits: 0, ...plus });
const t = (cle, o = {}) => `${cle}${o.n ? `:${o.n}` : ''}${o.count ? `:${o.count}` : ''}`;

test('les cinq états d’une version', () => {
    assert.equal(etatDe(version({ statut: 'brouillon' }), JOUR), 'brouillon');
    assert.equal(etatDe(version({ statut: 'annulee' }), JOUR), 'abandonnee');
    assert.equal(etatDe(version({ annulee_par: 5 }), JOUR), 'annulee');
    assert.equal(etatDe(version({ date_effet: '2026-11-29' }), JOUR), 'prevue');
    assert.equal(etatDe(version(), JOUR), 'appliquee');
    assert.equal(etatDe(version({ date_effet: '2026-01-01' }), JOUR), 'appliquee');
});

test('une version appliquée ou prévue s’annule, un brouillon s’abandonne', () => {
    assert.deepEqual(actionsDe(version(), JOUR), { annuler: true, abandonner: false });
    assert.deepEqual(actionsDe(version({ date_effet: '2026-12-15' }), JOUR), { annuler: true, abandonner: false });
    assert.deepEqual(actionsDe(version({ statut: 'brouillon' }), JOUR), { annuler: false, abandonner: true });
    assert.deepEqual(actionsDe(version({ annulee_par: 4 }), JOUR), { annuler: false, abandonner: false });
    assert.deepEqual(actionsDe(version({ statut: 'annulee' }), JOUR), { annuler: false, abandonner: false });
});

test('le libellé d’une annulation est composé par l’écran ; sinon celui de la version', () => {
    assert.equal(libelleDe(version({ annule_version: 2, libelle: 'Annulation de la version 2' }), t), 'configuration.historique.annulationDe:2');
    assert.equal(libelleDe(version({ libelle: ' Rentrée ' }), t), 'Rentrée');
    assert.equal(libelleDe(version({ libelle: '  ' }), t), 'configuration.historique.sansLibelle');
});

test('l’auteur, ou Planner pour une version sans auteur', () => {
    assert.equal(auteurDe(version({ auteur: { id_user: 1, nom: 'Admin Essai' } }), t), 'Admin Essai');
    assert.equal(auteurDe(version(), t), 'configuration.historique.sansAuteur');
});

test('le compte ne dit que ce qui change', () => {
    assert.equal(compteDe(version({ nb_reglages: 2, nb_retraits: 1 }), t), 'configuration.historique.reglages:2 · configuration.historique.retraits:1');
    assert.equal(compteDe(version(), t), '—');
});

test('une date seule garde son jour, en français et en anglais', () => {
    assert.equal(dateLisible('2026-12-01', 'fr'), '1 décembre 2026');
    assert.equal(dateLisible('2026-12-01', 'en'), '1 December 2026');
    assert.equal(dateLisible('', 'fr'), '');
});
