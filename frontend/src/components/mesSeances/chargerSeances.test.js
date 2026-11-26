/** Vérifie le nombre d’appels et l’invalidation du chargement de Mes affectations. */
import assert from 'node:assert/strict';
import { test } from 'node:test';
import { chargerSeances } from './chargerSeances.js';

test('un identifiant absent ne déclenche aucune requête', async () => {
    let appels = 0;
    const api = { getByEnseignant: () => { appels += 1; return []; } };

    const annuler = chargerSeances(undefined, api, { surSucces: assert.fail, surErreur: assert.fail });
    await new Promise((fin) => setTimeout(fin, 0));

    assert.equal(appels, 0);
    annuler();
});

test('un identifiant parcourt exactement les deux pages de ses séances', async () => {
    const appels = [];
    const api = {
        getByEnseignant: (id, params) => {
            appels.push([id, params]);
            return { data: [{ id_affectation: params.page }], pagination: { hasNext: params.page === 1 } };
        },
    };
    const seances = await new Promise((surSucces, surErreur) => {
        chargerSeances(42, api, { surSucces, surErreur });
    });

    assert.deepEqual(seances, [{ id_affectation: 1 }, { id_affectation: 2 }]);
    assert.deepEqual(appels, [[42, { page: 1, limit: 100 }], [42, { page: 2, limit: 100 }]]);
});

test('une réponse après annulation est ignorée et les pages suivantes ne sont pas demandées', async () => {
    const { promise: enAttente, resolve: repondre } = Promise.withResolvers();
    const appels = [];
    const api = { getByEnseignant: (id, params) => { appels.push([id, params]); return enAttente; } };
    const misesAJour = [];
    const annuler = chargerSeances(42, api, {
        surSucces: (seances) => misesAJour.push(seances),
        surErreur: () => misesAJour.push('erreur'),
    });

    annuler();
    repondre({ data: [{ id_affectation: 1 }], pagination: { hasNext: true } });
    await new Promise((fin) => setTimeout(fin, 0));

    assert.deepEqual(appels, [[42, { page: 1, limit: 100 }]]);
    assert.deepEqual(misesAJour, []);
});
