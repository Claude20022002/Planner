/**
 * Témoin A-2 : référence avant toute charge, puis contrôle régulier et garde finale.
 * Les fonctions injectées permettent une recette complète en mémoire, sans réseau ni attente réelle.
 */
import { constituerReference, mesurerSonde, comparerSonde, PERIODE_SONDE } from "./sonde.mjs";
import { surveiller } from "./local.mjs";

/** Prépare la référence et démarre la sonde ; rend une clôture qui exige un dernier contrôle sain. */
export async function demarrerTemoin({
    url, bilan, noter, verifier, echouer, attendre,
    mesurer = () => mesurerSonde(url), maintenant = () => performance.now(), planifier = surveiller,
}) {
    bilan.sonde = { reference_ok: false, mesures: 0, surveillance_terminee: false, echec: false };
    try {
        bilan.sonde.reference = await constituerReference({ mesurer, attendre, verifier, noter, maintenant });
        bilan.sonde.reference_ok = true;
        const fenetre = [];
        const controle = async () => {
            verifier();
            const mesure = await mesurer();
            noter({ phase: "surveillance", ...mesure });
            fenetre.push(mesure);
            if (fenetre.length > 4) fenetre.shift();
            bilan.sonde.mesures++;
            bilan.sonde.dernier = comparerSonde(bilan.sonde.reference, fenetre);
        };
        // Ne pas démarrer de charge avant une première sonde saine après la référence.
        await controle();
        const stopper = planifier({
            controle, delai: PERIODE_SONDE, immediat: false,
            arreter: async (erreur) => { bilan.sonde.echec = true; await echouer(erreur); },
        });
        return async () => {
            await stopper();
            if (!bilan.sonde.echec) {
                try { await controle(); }
                catch (erreur) { bilan.sonde.echec = true; throw erreur; }
            }
            bilan.sonde.surveillance_terminee = true;
        };
    } catch (erreur) { bilan.sonde.echec = true; throw erreur; }
}
