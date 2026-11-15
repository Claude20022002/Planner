/** Recette A-2 sans réseau, Docker ou serveur ; horloge simulée pour les dix minutes. */
import { test } from "node:test";
import assert from "node:assert/strict";
import { verifierUrlSonde, medianeSonde, mesurerSonde, constituerReference, comparerSonde } from "../lib/sonde.mjs";
import { demarrerTemoin } from "../lib/temoin.mjs";

test("URL de sonde locale seulement, sans secret ou protocole inattendu", () => {
    assert.match(verifierUrlSonde("http://127.0.0.1:5678/healthz"), /healthz/);
    for (const u of ["invalide", "file:///etc/passwd", "http://exemple.invalid/health", "http://identifiant:secret@localhost/health", "http://localhost/health#fragment"]) assert.throws(() => verifierUrlSonde(u));
});

test("GET sans redirection, HTTP 2xx et erreur expurgée au moindre échec", async () => {
    let temps = 0, annulations = 0;
    const resultat = await mesurerSonde("http://localhost/health", {
        maintenant: () => (temps += 5),
        requete: async (_url, options) => {
            assert.equal(options.method, "GET"); assert.equal(options.redirect, "manual");
            assert.ok(options.signal instanceof AbortSignal);
            return { status: 204, body: { cancel: async () => { annulations++; } } };
        },
    });
    assert.equal(resultat.duree_ms, 5); assert.equal(annulations, 1);
    for (const statut of [301, 401, 500]) await assert.rejects(mesurerSonde("http://localhost/health", { requete: async () => ({ status: statut }) }), /sonde n8n en échec/);
    await assert.rejects(mesurerSonde("http://localhost/chemin-prive", { requete: async () => { throw new Error("détail privé"); } }), (e) => !e.message.includes("privé") && /5 s/.test(e.message));
});

const simulation = () => {
    let temps = 0, appels = 0;
    const instants = [], notes = [];
    return {
        mesurer: async () => { appels++; instants.push(temps); temps += 1; return { statut: 200, duree_ms: 5 }; },
        attendre: async (ms) => { temps += ms; }, verifier: () => {},
        maintenant: () => temps, noter: (m) => notes.push(m), notes, instants, appels: () => appels,
    };
};
test("référence : 40 points à 15 s, attente réelle simulée jusqu'à 10 min, aucune phase raccourcie", async () => {
    const s = simulation();
    const r = await constituerReference(s);
    assert.equal(r.echantillons, 40); assert.equal(r.duree_ms, 600000); assert.equal(r.mediane_ms, 5);
    assert.equal(s.notes.length, 40);
    assert.deepEqual(s.instants, Array.from({ length: 40 }, (_, i) => i * 15000));
});
test("échec de référence : aucun témoin démarré, référence jamais marquée complète", async () => {
    const s = simulation(), bilan = {};
    let appels = 0;
    await assert.rejects(demarrerTemoin({
        ...s, bilan, echouer: async () => {}, url: "non utilisée",
        mesurer: async () => { if (++appels === 3) throw new Error("sonde en échec"); return { duree_ms: 5 }; },
    }), /échec/);
    assert.equal(appels, 3); assert.equal(bilan.sonde.reference_ok, false); assert.equal(bilan.sonde.echec, true);
});
test("médiane arithmétique et double de référence atteint : arrêt dès quatre mesures", () => {
    const r = { mediane_ms: 10, echantillons: 40, duree_ms: 600000 };
    assert.equal(medianeSonde([8, 10, 12, 14]), 11);
    assert.throws(() => medianeSonde([]));
    assert.throws(() => comparerSonde({ ...r, echantillons: 39 }, []), /incomplète/);
    assert.equal(comparerSonde(r, [{ duree_ms: 100 }]).echantillons, 1);
    assert.equal(comparerSonde(r, [8, 12, 15, 20].map((duree_ms) => ({ duree_ms }))).mediane_ms, 13.5);
    assert.throws(() => comparerSonde(r, [12, 20, 20, 25].map((duree_ms) => ({ duree_ms }))), /double/);
});
test("témoin complet : sonde saine avant charge et contrôle final après arrêt du minuteur", async () => {
    const s = simulation(), bilan = {};
    const stop = await demarrerTemoin({ ...s, bilan, echouer: async () => {}, url: "non utilisée" });
    assert.equal(s.appels(), 41); assert.equal(bilan.sonde.surveillance_terminee, false);
    await stop();
    assert.equal(s.appels(), 42); assert.equal(bilan.sonde.surveillance_terminee, true);
    assert.equal(bilan.sonde.echec, false);
});
test("échec de la sonde finale : impossible de valider la surveillance", async () => {
    const s = simulation(), bilan = {};
    let appels = 0;
    const stop = await demarrerTemoin({
        ...s, bilan, echouer: async () => {}, url: "non utilisée",
        mesurer: async () => { if (++appels === 42) throw new Error("échec final"); return s.mesurer(); },
    });
    await assert.rejects(stop(), /échec final/);
    assert.equal(bilan.sonde.echec, true); assert.equal(bilan.sonde.surveillance_terminee, false);
});

test("ralentissement pendant la charge : la garde appelle l'arrêt et reste invalidante", async () => {
    const s = simulation(), bilan = {};
    let tour, arrets = 0, lente = false;
    const stop = await demarrerTemoin({
        ...s, bilan, url: "non utilisée",
        mesurer: async () => lente ? { duree_ms: 20 } : s.mesurer(),
        echouer: async (e) => { assert.match(e.message, /double/); arrets++; },
        planifier: ({ controle, arreter, delai, immediat }) => {
            assert.equal(delai, 15000); assert.equal(immediat, false);
            tour = async () => { try { await controle(); } catch (e) { await arreter(e); } };
            return async () => {};
        },
    });
    lente = true;
    await tour(); await tour(); await tour();
    assert.equal(arrets, 1); assert.equal(bilan.sonde.echec, true);
    await stop();
    assert.equal(bilan.sonde.echec, true);
});
