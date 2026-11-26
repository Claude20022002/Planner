import { register } from "node:module";

/**
 * Construit le problème envoyé au solveur comme le code d'avant la bascule d'ADM-02 : lancé dans un
 * processus à part par repriseParametres.test.js, avec la base et l'environnement du test. Un crochet
 * de chargement remplace services/planning/referentiel.js par l'ancienne lecture figée
 * (referentielAvantBascule.js, table ParametresPlanning) ; tout le reste est le code du dépôt.
 * Usage : node problemeAvantBascule.mjs <id_periode>. Écrit une ligne « RESULTAT: <json> ».
 */

const ANCIEN = new URL("./referentielAvantBascule.js", import.meta.url).href;
const crochet = `export const resolve = async (specifier, context, next) => {
    const r = await next(specifier, context);
    return r.url.endsWith("/services/planning/referentiel.js") ? { ...r, url: ${JSON.stringify(ANCIEN)} } : r;
};`;
register(`data:text/javascript,${encodeURIComponent(crochet)}`);

const { construireProbleme, pourLeSolveur } = await import("../../../services/generation/timefold/probleme.js");
const { lireParametres } = await import("../../../services/planning/referentiel.js");
const { default: sequelize } = await import("../../../config/db.js");

try {
    const { probleme } = await construireProbleme({ id_periode: Number(process.argv[2]) });
    const parametres = Object.fromEntries(Object.entries(await lireParametres()).map(([cle, p]) => [cle, p.valeur]));
    process.stdout.write(`RESULTAT:${JSON.stringify({ envoye: pourLeSolveur(probleme), parametres })}\n`);
} finally {
    await sequelize.close();
}
