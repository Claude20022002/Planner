import { coherenceDesValeurs, valeurDuBonType } from "../catalogue/verifier.js";
import { porteeAdmise } from "./resolution.js";

/**
 * Contrôle d'une valeur avant son écriture (lot MP-1). Fonction pure : la route rend ces erreurs
 * telles quelles, chacune avec un code et une phrase qui dit quoi faire.
 * Une école ne rend jamais une règle stricte : un profil ou la Plateforme seuls le peuvent (D-09,
 * amendée le 4 novembre 2026). Une règle stricte de trop rend le calcul impossible sans dire pourquoi.
 * Le solveur n'applique que le poids de l'école (MOT-13b) : un poids plus fin, pour une règle qu'il
 * applique, est refusé (portee_non_tenue), en attendant MOT-10. De même pour la valeur (coupée ou
 * remise) d'une règle souple qu'il applique et qu'une école règle (réponses 23 à 25 de MOT-13).
 */

// Qui peut modifier quoi, du plus restreint au plus large : chacun peut aussi ce qu'un rang inférieur peut
const RANGS = ["personne", "responsable", "etablissement", "plateforme"];

const erreur = (code, message) => ({ code, message });

/** Cet auteur (personne, responsable, etablissement, plateforme) a-t-il le droit de modifier ce paramètre ? */
export const peutModifier = (p, auteur) => p.modifiable !== "non" && RANGS.indexOf(auteur) >= RANGS.indexOf(p.modifiable);

/**
 * Règle souple que le solveur applique et qu'une école règle : il n'en lit que la portée de l'école.
 * Les vœux d'un enseignant (niveau « personne » seul) en sont exclus : leur valeur est le vœu (réponse 25).
 * Partagée avec le panneau de configuration (ADM-02, réponse 16) : ne pas la recopier.
 */
export const activeeParLEcole = (p, force) => p.role === "regle" && Boolean(p.regle_solveur) && (force ?? p.force) === "souple" && p.niveaux.includes("G");

/**
 * @param {object} o
 * @param {object} o.parametre le paramètre, tel que le catalogue le décrit
 * @param {string} o.portee etablissement, cycle, niveau, filiere, ou la cible individuelle
 * @param {*} [o.valeur] la nouvelle valeur (absente si on ne change que le poids)
 * @param {string} [o.force] strict ou souple
 * @param {number} [o.poids] poids d'une règle souple
 * @param {string} o.auteur personne, responsable, etablissement, plateforme
 * @param {Map} [o.valeurs] valeurs résolues pour cette cible, pour contrôler les bornes
 * @param {object[]} [o.dependances]
 * @returns {{ code: string, message: string }[]} vide si l'écriture est permise
 */
export const controlerEcriture = ({ parametre: p, portee, valeur, force, poids, auteur, valeurs, dependances = [] }) => {
    const erreurs = [];
    if (p.modifiable === "non") return [erreur("non_modifiable", `${p.nom} ne se modifie pas : c'est une règle ou une valeur calculée par Planner.`)];
    if (!peutModifier(p, auteur)) erreurs.push(erreur("droit_insuffisant", `${p.nom} ne peut être modifié qu'au niveau « ${p.modifiable} ».`));
    if (!porteeAdmise(p, portee)) erreurs.push(erreur("portee_interdite", `${p.nom} ne se règle pas au niveau « ${portee} ».`));

    if (valeur !== undefined) {
        if (!valeurDuBonType(p, valeur)) erreurs.push(erreur("type_invalide", `${p.nom} attend une valeur de type « ${p.type} ».`));
        if (p.type === "enum" && valeur !== null && !p.valeurs.includes(valeur)) erreurs.push(erreur("hors_liste", `${p.nom} : valeurs admises : ${p.valeurs.join(", ")}.`));
        if (p.role === "regle" && p.obligatoire && (valeur === false || valeur === null)) erreurs.push(erreur("regle_obligatoire", `${p.nom} est obligatoire et ne peut pas être désactivée.`));
        if (activeeParLEcole(p, force) && portee !== "etablissement") erreurs.push(erreur("portee_non_tenue", `Le calcul applique « ${p.nom} » à toute l'école : réglez-la au niveau de l'établissement.`));
    }

    if (force !== undefined) {
        if (!p.force_reglable) erreurs.push(erreur("force_figee", `La force de ${p.nom} est fixée par Planner.`));
        else if (auteur !== "plateforme") erreurs.push(erreur("force_interdite", `Une école ne rend pas ${p.nom} stricte : choisissez « indispensable », un poids très fort que le rapport signale s'il n'est pas tenu.`));
    }

    if (poids !== undefined) {
        const souple = (force ?? p.force) === "souple";
        if (p.role !== "regle" || !souple) erreurs.push(erreur("poids_interdit", `${p.nom} n'est pas une règle souple : elle n'a pas de poids.`));
        else if (!Number.isInteger(poids) || poids <= 0) erreurs.push(erreur("poids_invalide", "Un poids est un entier supérieur à zéro."));
        else if (p.regle_solveur && portee !== "etablissement" && !erreurs.some((e) => e.code === "portee_non_tenue")) erreurs.push(erreur("portee_non_tenue", `Le calcul applique un seul poids de ${p.nom} pour toute l'école. Réglez ce poids au niveau de l'établissement.`));
    }

    // Bornes : la valeur demandée est essayée sur les valeurs en vigueur, loi du pays comprise
    if (valeurs && valeur !== undefined && !erreurs.length) {
        const essai = new Map(valeurs).set(p.id, valeur);
        const miennes = dependances.filter((d) => ["borne", "exclut"].includes(d.type) && (d.de === p.id || d.vers === p.id));
        for (const message of coherenceDesValeurs(essai, miennes)) erreurs.push(erreur("borne_depassee", message));
    }
    return erreurs;
};
