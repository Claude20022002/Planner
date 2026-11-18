import { leCatalogue, valeursEnVigueur } from "./lecture.js";

/**
 * Poids des règles souples du profil envoyés au solveur (MOT-13b, mot-13b-solveur.md § 4.3) :
 * pour chaque règle souple que le solveur applique (`regle_solveur`), le poids résolu à la portée
 * de l'école, ou 0 si l'école l'a coupée. Le solveur les applique par ConstraintWeightOverrides.
 * Seul le poids de l'école compte : un poids plus fin est refusé à l'enregistrement
 * (portee_non_tenue, ecriture.js), en attendant MOT-10.
 */

/**
 * Fonction pure.
 * @param {object} o parametres (le catalogue), resultats (resoudreTout, sans cible : portée école)
 * @returns {Record<string, number>} nom de la règle du solveur → poids
 */
export const poidsDesRegles = ({ parametres, resultats }) => {
    const poids = {};
    for (const p of parametres) {
        const r = resultats.get(p.id);
        if (p.role !== "regle" || !p.regle_solveur || p.force !== "souple" || r?.force !== "souple") continue;
        poids[p.regle_solveur] = r.valeur === false ? 0 : r.poids;
    }
    return poids;
};

/** Les poids en vigueur à cette date (AAAA-MM-JJ), lus en base. */
export const lirePoidsDuSolveur = async ({ date, transaction } = {}) => {
    const { resultats } = await valeursEnVigueur({ date, transaction });
    return poidsDesRegles({ parametres: leCatalogue().parametres, resultats });
};
