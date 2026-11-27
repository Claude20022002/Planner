import { Op } from "sequelize";
import { ContrainteDeclaree, ValeurParametre, VersionParametres } from "../../../models/index.js";
import { ErreurMetier } from "../../planning/enseignements.js";

/**
 * Deux personnes de l'administration qui changent les réglages en même temps (ADM-02, R-4) : l'écran
 * envoie la « base », le plus grand numéro de version appliquée qu'il a lu. Une version appliquée
 * depuis (numéro plus grand) qui touche le même réglage, ou retire la même contrainte, rend la demande
 * dépassée : 409 VERSION_DEPASSEE, et l'écran propose de recharger. Deux ajouts de contraintes ne se
 * gênent pas : leurs contradictions sont dites par l'aperçu.
 * Limite connue : un brouillon créé par l'API avant la lecture et appliqué après n'est pas vu (l'écran
 * n'applique jamais de brouillon).
 */

const cleDe = (l) => `${l.cle}|${l.portee}|${l.id_portee ?? ""}`;

/**
 * Fonction pure.
 * @param {object} o lignes (normalisées), retraits (numéros de contraintes), recentes (versions appliquées après la base,
 *   chacune avec `valeurs` et `contraintes`), nomDe (id → nom du réglage)
 * @returns {object[]} une violation par réglage ou retrait en conflit
 */
export const conflitsAvecLaBase = ({ lignes = [], retraits = [], recentes = [], nomDe = (id) => id }) => {
    const touchees = new Set(lignes.map(cleDe));
    const retirees = new Set(retraits);
    const conflits = [];
    for (const v of recentes) {
        for (const l of v.valeurs ?? []) {
            if (!touchees.has(cleDe(l))) continue;
            conflits.push({ cle: l.cle, portee: l.portee, id_portee: l.id_portee ?? "", id_version: v.id_version, code: "version_depassee", message: `La version ${v.id_version} a changé « ${nomDe(l.cle)} » depuis votre ouverture.` });
        }
        for (const c of v.contraintes ?? []) {
            if (!c.retire_id || !retirees.has(c.retire_id)) continue;
            conflits.push({ retrait: c.retire_id, id_version: v.id_version, code: "version_depassee", message: `La version ${v.id_version} a déjà retiré la contrainte n° ${c.retire_id}.` });
        }
    }
    return conflits;
};

const estInterblocage = (err) => err?.parent?.errno === 1213 || err?.original?.code === "ER_LOCK_DEADLOCK";

/**
 * Rejoue une transaction qu'InnoDB a choisie comme victime d'un interblocage (« try restarting
 * transaction ») : deux applications simultanées. Rejouée, elle voit la version de l'autre et rend 409.
 */
export const avecRepriseSurInterblocage = async (travail, essais = 3) => {
    for (let essai = 1; ; essai += 1) {
        try {
            return await travail();
        } catch (err) {
            if (!estInterblocage(err) || essai >= essais) throw err;
        }
    }
};

/** La base doit être un numéro de version appliquée déjà vu (ou 0 s'il n'y en avait aucune). */
export const exigerBase = (base) => {
    if (!Number.isInteger(base) || base < 0) throw new ErreurMetier("Renvoyez la version lue à l'ouverture (version_courante)", 400, "BASE_INVALIDE");
};

/**
 * Les versions appliquées après la base. Avec une transaction, la dernière version appliquée est verrouillée
 * d'abord : deux applications simultanées passent l'une après l'autre, et la seconde voit la première.
 */
export const versionsApresLaBase = async (base, { transaction } = {}) => {
    exigerBase(base);
    const derniere = await VersionParametres.findOne({ where: { statut: "appliquee" }, order: [["id_version", "DESC"]], attributes: ["id_version"], ...(transaction ? { lock: transaction.LOCK.UPDATE, transaction } : {}) });
    // Une base plus récente que la dernière version appliquée n'a pas été lue : elle ne protège de rien
    if ((derniere?.id_version ?? 0) < base) throw new ErreurMetier("Cette version de départ n'existe pas : rechargez la page", 400, "BASE_INVALIDE");
    return VersionParametres.findAll({
        where: { statut: "appliquee", id_version: { [Op.gt]: base } },
        include: [
            { model: ValeurParametre, as: "valeurs", attributes: ["cle", "portee", "id_portee"] },
            { model: ContrainteDeclaree, as: "contraintes", attributes: ["retire_id"] },
        ],
        transaction,
    });
};
