/** Vérifie la traduction des refus de la configuration par leur code, et le repli sur la phrase du serveur. */
import test from 'node:test';
import assert from 'node:assert/strict';
import { refusDeLErreur, texteDuRefus } from './refus.js';

const TEXTES = {
    'configuration.refus.hors_bornes': 'Choose a value between {{min}} and {{max}}.',
    'configuration.refus.mal_forme': 'This change is malformed.',
    'configuration.refus.non_modifiable': 'This setting cannot be changed by your school.',
    'configuration.refus.version_depassee': 'Version {{version}} changed this setting.',
    'configuration.refus.DATE_EFFET_PASSEE': 'Choose today or a later date.',
    'configuration.refus.inconnu': 'Refused.',
};
// Traduction minimale : clé connue avec ses paramètres, sinon defaultValue (comme i18next)
const t = (cle, o = {}) => (TEXTES[cle] ? TEXTES[cle].replace(/\{\{(\w+)\}\}/g, (_, n) => o[n]) : (o.defaultValue ?? cle));

test('un code connu donne son texte, avec ses paramètres', () => {
    assert.equal(texteDuRefus({ code: 'hors_bornes', message: 'fr' }, t, { bornes: { min: '1 h', max: '12 h' } }), 'Choose a value between 1 h and 12 h.');
    assert.equal(texteDuRefus({ code: 'version_depassee', id_version: 7, message: 'fr' }, t), 'Version 7 changed this setting.');
    assert.equal(texteDuRefus({ code: 'DATE_EFFET_PASSEE', message: 'fr' }, t), 'Choose today or a later date.');
});

test('les codes d’une même famille disent la même chose', () => {
    for (const code of ['type_invalide', 'ligne_vide', 'doublon', 'parametre_inconnu', 'cible_invalide', 'forme_invalide']) {
        assert.equal(texteDuRefus({ code, message: 'fr' }, t), 'This change is malformed.', code);
    }
    for (const code of ['non_modifiable', 'droit_insuffisant', 'portee_interdite']) {
        assert.equal(texteDuRefus({ code, message: 'fr' }, t), 'This setting cannot be changed by your school.', code);
    }
});

test('un code inconnu, ou hors bornes sans bornes lisibles : la phrase du serveur', () => {
    assert.equal(texteDuRefus({ code: 'NOUVEAU_CODE', message: 'Phrase du serveur' }, t), 'Phrase du serveur');
    assert.equal(texteDuRefus({ code: 'hors_bornes', message: 'Entre 1 h et 12 h' }, t), 'Entre 1 h et 12 h');
    assert.equal(texteDuRefus({ message: 'Sans code' }, t), 'Sans code');
    assert.equal(texteDuRefus({}, t), 'Refused.');
});

test('le refus se lit dans l’erreur de l’API', () => {
    const erreur = Object.assign(new Error('Erreur 409'), { response: { data: { code: 'VERSION_DEPASSEE', message: 'fr', violations: [{ cle: 'X' }] } } });
    assert.deepEqual(refusDeLErreur(erreur), { code: 'VERSION_DEPASSEE', message: 'fr', violations: [{ cle: 'X' }] });
    assert.deepEqual(refusDeLErreur(new Error('Réseau')), { code: null, message: 'Réseau', violations: [] });
});
