/** Vérifie les unités, la valeur lisible et le contrôle local des réglages de l'école. */
import test from 'node:test';
import assert from 'node:assert/strict';
import { cleTexte, controlerSaisie, depuisSaisie, valeurLisible, versSaisie } from './reglages.js';

const HEURES = { id: 'HOR.REGLE.MAX_H_JOUR_GROUPE', unite: 'heure', min: 60, max: 720, pas: 60 };
const MINUTES = { id: 'LOG.TRAJET.CAMPUS_DEFAUT', unite: 'minute', min: 0, max: 240, pas: 1 };
const POURCENT = { id: 'EXA.EPREUVE.RATIO_CAPACITE', unite: 'pourcentage', min: 1, max: 100, pas: 1 };
const NOMBRE = { id: 'EXA.EPREUVE.SURVEILLANTS_PAR_SALLE', unite: 'nombre', min: 1, max: 6, pas: 1 };
const t = (cle) => ({ 'configuration.unites.heure': 'h', 'configuration.unites.minute': 'min', 'configuration.unites.pourcentage': '%' })[cle] ?? cle;

test('une saisie en heures se stocke en minutes, et inversement', () => {
    assert.equal(versSaisie(HEURES, 360), '6');
    assert.equal(depuisSaisie(HEURES, '7'), 420);
    assert.equal(depuisSaisie(MINUTES, ' 45 '), 45);
    assert.equal(depuisSaisie(POURCENT, '90'), 90);
    assert.equal(versSaisie(NOMBRE, null), '');
});

test('une saisie vide, décimale ou négative n’a pas de valeur', () => {
    for (const saisie of ['', '7.5', '7,5', '-1', 'abc', null]) assert.equal(depuisSaisie(HEURES, saisie), null, String(saisie));
});

test('la valeur lisible porte son unité traduite', () => {
    assert.equal(valeurLisible(HEURES, 360, t), '6 h');
    assert.equal(valeurLisible(MINUTES, 45, t), '45 min');
    assert.equal(valeurLisible(POURCENT, 90, t), '90 %');
    assert.equal(valeurLisible(NOMBRE, 2, t), '2');
    assert.equal(valeurLisible(NOMBRE, undefined, t), '—');
});

test('le contrôle local suit les bornes reçues', () => {
    assert.equal(controlerSaisie(HEURES, '12'), null);
    assert.equal(controlerSaisie(HEURES, '1'), null);
    assert.deepEqual(controlerSaisie(HEURES, '13'), { code: 'hors_bornes' });
    assert.deepEqual(controlerSaisie(HEURES, '0'), { code: 'hors_bornes' });
    assert.equal(controlerSaisie(MINUTES, '0'), null);
    assert.deepEqual(controlerSaisie(NOMBRE, '7'), { code: 'hors_bornes' });
    assert.deepEqual(controlerSaisie(MINUTES, ''), { code: 'saisie_invalide' });
});

test('la clé de texte remplace les points', () => {
    assert.equal(cleTexte('HOR.REGLE.MAX_H_JOUR_GROUPE'), 'HOR_REGLE_MAX_H_JOUR_GROUPE');
});
