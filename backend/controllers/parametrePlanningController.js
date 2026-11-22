import { asyncHandler } from "../middleware/asyncHandler.js";
import { lireParametres } from "../services/planning/referentiel.js";
import { corpsErreur } from "../utils/erreurs.js";

/**
 * Anciens paramètres de planification. Depuis ADM-02, ils se lisent et s'écrivent dans les réglages du
 * moteur (MP-1), par le panneau de configuration : une seule source. La lecture garde sa forme (la page
 * des salles la lit encore) ; l'écriture et la remise à zéro répondent 410 et disent où aller.
 */

const DEPLACE = "Ce réglage se change maintenant dans Configuration, avec son aperçu et son historique.";

// 🔍 Tous les paramètres : valeur en vigueur, valeur de départ, description
export const getParametresPlanning = asyncHandler(async (req, res) => {
    res.json(await lireParametres());
});

// ✏️ Plus d'écriture ici : 410 REGLAGE_DEPLACE (POST /api/moteur/versions)
export const updateParametrePlanning = asyncHandler(async (req, res) => {
    res.status(410).json(corpsErreur(410, DEPLACE, { code: "REGLAGE_DEPLACE" }));
});

// ↩️ Plus de remise à zéro ici : 410 REGLAGE_DEPLACE (choix « Normal », ou annulation d'une version)
export const resetParametrePlanning = asyncHandler(async (req, res) => {
    res.status(410).json(corpsErreur(410, DEPLACE, { code: "REGLAGE_DEPLACE" }));
});
