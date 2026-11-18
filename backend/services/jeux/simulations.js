/** Vérifie les essais de simulation contre les scénarios de référence et les droits du module. */
import { simulationParCode } from '../../../shared/simulations/catalogue.js';
import { evaluerSimulation } from '../../../shared/simulations/moteur.js';
import { ErreurMetier } from '../planning/enseignements.js';
import { jeuAccessible, sauvegarderReussite } from './jeux.js';
import { avecEtatDefi, vueEtatDefi } from './etatsDefis.js';
import { solutionReference } from './solutionsReference.js';

const defiAccessible = async (user, code, idDefi) => {
    const jeu = simulationParCode(code);
    if (!jeu) throw new ErreurMetier('Simulation inconnue', 404);
    await jeuAccessible(user, jeu);
    const defi = jeu.defis.find((d) => d.id === idDefi);
    if (!defi) throw new ErreurMetier('Défi inconnu', 404);
    return { jeu, defi };
};

/** Renvoie le retour calculé ; seule une réussite crée une maîtrise, de façon idempotente. */
export async function essayerSimulation(user, code, idDefi, reponse) {
    const { jeu, defi } = await defiAccessible(user, code, idDefi);
    const resultat = evaluerSimulation(jeu, defi, reponse);
    if (!resultat) throw new ErreurMetier('Saisie de simulation invalide', 400);
    return avecEtatDefi(user, jeu, defi, async ({ etat, reussite, transaction }) => {
        if (!resultat.ok) {
            await etat.update({ echecs: Math.min(etat.echecs + 1, 4294967295) }, { transaction });
            return { ...resultat, ...vueEtatDefi(etat, reussite), enregistre: false };
        }
        const progression = await sauvegarderReussite(user, jeu, defi, 0, { transaction, avec_solution: Boolean(etat.solution_vue_le) });
        return { ...resultat, ...progression, ...vueEtatDefi(etat, progression), enregistre: true };
    });
}

/** Record solution viewing before returning an answer; storage errors fail closed. */
export async function voirSolutionSimulation(user, code, idDefi, body = {}) {
    const { jeu, defi } = await defiAccessible(user, code, idDefi);
    if (!body || typeof body !== 'object' || Array.isArray(body) || Object.keys(body).length) {
        throw new ErreurMetier('La demande de solution ne doit contenir aucun champ', 400);
    }
    const reponse = solutionReference(jeu, defi);
    return avecEtatDefi(user, jeu, defi, async ({ etat, reussite, transaction }) => {
        if (!etat.solution_vue_le) await etat.update({ solution_vue_le: new Date() }, { transaction });
        return { reponse, ...vueEtatDefi(etat, reussite) };
    });
}
