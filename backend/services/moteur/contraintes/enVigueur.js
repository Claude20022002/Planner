import { ContrainteDeclaree, VersionParametres } from "../../../models/index.js";

/**
 * Contraintes déclarées en vigueur à une date (MOT-13), sur le modèle de lignesEnVigueur (MP-1) :
 * seules comptent les versions appliquées, déjà prises d'effet. Une ligne de retrait en vigueur
 * efface la contrainte qu'elle vise ; une contrainte appliquée n'est jamais modifiée (I-D5).
 */

/**
 * Fonction pure : les lignes viennent de lireLignesDeContraintes.
 * @param {object[]} lignes { id_contrainte, gabarit, retire_id, statut, date_effet, ... }
 * @param {string} date AAAA-MM-JJ
 * @returns {object[]} les contraintes (sans les lignes de retrait), par numéro croissant
 */
export const contraintesEnVigueur = (lignes, date) => {
    const prises = lignes.filter((l) => l.statut === "appliquee" && l.date_effet <= date);
    const retirees = new Set(prises.filter((l) => l.retire_id).map((l) => l.retire_id));
    return prises.filter((l) => l.gabarit && !retirees.has(l.id_contrainte)).sort((a, b) => a.id_contrainte - b.id_contrainte);
};

const versLigne = (c) => ({
    id_contrainte: c.id_contrainte,
    id_version: c.id_version,
    gabarit: c.gabarit,
    cibles: c.cibles,
    parametres: c.parametres,
    nature: c.nature,
    insistance: c.insistance,
    retire_id: c.retire_id,
    statut: c.version.statut,
    date_effet: c.version.date_effet,
});

/** Toutes les lignes des versions appliquées, quelle que soit leur date : contraintesEnVigueur choisit. */
export const lireLignesDeContraintes = async ({ transaction } = {}) => {
    const lignes = await ContrainteDeclaree.findAll({
        include: [{ model: VersionParametres, as: "version", where: { statut: "appliquee" }, attributes: ["statut", "date_effet"] }],
        order: [["id_contrainte", "ASC"]],
        transaction,
    });
    return lignes.map(versLigne);
};

/** Les contraintes en vigueur à cette date, lues en base. */
export const lireContraintesEnVigueur = async (date, options = {}) => contraintesEnVigueur(await lireLignesDeContraintes(options), date);
