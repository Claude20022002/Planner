/** Vérifie le brouillon de la page « Configuration » : changements, retours, compte et corps envoyé. */
import test from 'node:test';
import assert from 'node:assert/strict';
import { BROUILLON_VIDE, compter, corpsDe, poserReglage, reduireBrouillon, retirerReglage, revenirAuDepart, viderBrouillon } from './brouillon.js';

const TRAJET = 'LOG.TRAJET.CAMPUS_DEFAUT';
const GROUPE = 'HOR.REGLE.MAX_H_JOUR_GROUPE';

test('poser une valeur la met au brouillon ; la valeur en vigueur l’en retire', () => {
    const b = poserReglage(BROUILLON_VIDE, TRAJET, 30, 45);
    assert.deepEqual(b.reglages, { [TRAJET]: { valeur: 30 } });
    assert.equal(compter(b), 1);
    const remis = poserReglage(b, TRAJET, 45, 45);
    assert.deepEqual(remis.reglages, {});
    assert.equal(compter(remis), 0);
});

test('une valeur hors bornes reste au brouillon : le serveur tranche à l’aperçu', () => {
    const b = poserReglage(BROUILLON_VIDE, GROUPE, 780, 360);
    assert.deepEqual(b.reglages[GROUPE], { valeur: 780 });
});

test('revenir au départ pose une ligne retirée et remet les champs', () => {
    const b = revenirAuDepart(BROUILLON_VIDE, TRAJET);
    assert.deepEqual(b.reglages, { [TRAJET]: { retiree: true } });
    assert.equal(b.tour, 1);
    // Une saisie après le retour remplace la ligne retirée
    assert.deepEqual(poserReglage(b, TRAJET, 20, 45).reglages, { [TRAJET]: { valeur: 20 } });
});

test('retirer garde le tour pendant la saisie, le change sur demande', () => {
    const b = poserReglage(BROUILLON_VIDE, TRAJET, 30, 45);
    const pendantLaSaisie = retirerReglage(b, TRAJET);
    assert.deepEqual(pendantLaSaisie.reglages, {});
    assert.equal(pendantLaSaisie.tour, 0);
    assert.equal(retirerReglage(b, TRAJET, { remettre: true }).tour, 1);
});

test('vider efface tout et remet les champs', () => {
    const b = poserReglage(poserReglage(BROUILLON_VIDE, TRAJET, 30, 45), GROUPE, 420, 360);
    const vide = viderBrouillon(b);
    assert.equal(compter(vide), 0);
    assert.equal(vide.tour, 1);
});

test('le corps envoyé : lignes, date, base, libellé nettoyé', () => {
    const b = revenirAuDepart(poserReglage(BROUILLON_VIDE, TRAJET, 30, 45), GROUPE);
    assert.deepEqual(corpsDe(b, { date_effet: '2026-12-01', base: 4, libelle: '  Rentrée  ' }), {
        libelle: 'Rentrée',
        date_effet: '2026-12-01',
        base: 4,
        lignes: [{ cle: TRAJET, valeur: 30 }, { cle: GROUPE, retiree: true }],
        regles: [],
        contraintes: [],
        retirer: [],
    });
    assert.equal('libelle' in corpsDe(b, { date_effet: '2026-12-01', base: 0, libelle: '   ' }), false);
});

test('le réducteur suit les actions et ignore les inconnues', () => {
    let b = reduireBrouillon(BROUILLON_VIDE, { type: 'poser', id: TRAJET, valeur: 30, enVigueur: 45 });
    b = reduireBrouillon(b, { type: 'revenir', id: GROUPE });
    assert.equal(compter(b), 2);
    assert.equal(reduireBrouillon(b, { type: 'inconnue' }), b);
    b = reduireBrouillon(b, { type: 'retirer', id: TRAJET, remettre: true });
    assert.equal(compter(b), 1);
    assert.equal(compter(reduireBrouillon(b, { type: 'vider' })), 0);
});
