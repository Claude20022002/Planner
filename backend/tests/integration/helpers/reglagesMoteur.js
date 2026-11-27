import { annulerVersion } from "../../../services/moteur/valeurs/annulation.js";
import { appliquerVersion, creerVersion } from "../../../services/moteur/valeurs/versions.js";

/**
 * Aide des tests d'intégration : depuis ADM-02, les anciens paramètres de planification se règlent dans
 * MP-1 (une version appliquée à la portée de l'école), et plus dans la table ParametresPlanning.
 */

const AUTEUR = { auteur: "etablissement" };

/** Pose ces réglages (clés du catalogue, unités du catalogue) dans une version appliquée ; rend son numéro. */
export const poserReglages = async (lignes) => {
    const version = await creerVersion({ lignes, ...AUTEUR });
    await appliquerVersion(version.id_version, AUTEUR);
    return version.id_version;
};

/** Annule la version posée : les réglages reprennent leur valeur d'avant. */
export const retirerReglages = (id_version) => annulerVersion(id_version, AUTEUR);
