import { ContrainteDeclaree } from "../../../models/index.js";
import { ErreurMetier } from "../../planning/enseignements.js";
import { leCatalogue, valeursEnVigueur } from "../valeurs/lecture.js";
import { ciblesInexistantes } from "./cibles.js";
import { controlerContrainte } from "./controle.js";
import { lireContraintesEnVigueur, lireLignesDeContraintes } from "./enVigueur.js";

/**
 * Les contraintes déclarées dans le cycle d'une version de paramètres (MOT-13, lot MP-1) : contrôle
 * à la création et à l'application, enregistrement, version inverse à l'annulation. versions.js
 * appelle ces fonctions ; il garde la main sur la version elle-même.
 */

const nomDe = (id) => leCatalogue().parametres.find((p) => p.id === id)?.nom ?? id;

/**
 * Contrôle les contraintes ajoutées et les retraits d'une version.
 * @param {object} o contraintes (telles que reçues), retirer (numéros de contraintes en vigueur)
 * @param {object} options date (date d'effet), transaction
 * @returns {Promise<{ ajouts: object[], retraits: number[], violations: object[] }>}
 */
export const preparerContraintes = async ({ contraintes = [], retirer = [] }, { date, transaction } = {}) => {
    const violations = [];
    if (!Array.isArray(contraintes) || !Array.isArray(retirer)) {
        return { ajouts: [], retraits: [], violations: [{ code: "forme_invalide", message: "« contraintes » et « retirer » sont des listes." }] };
    }
    const { valeurs } = contraintes.length ? await valeursEnVigueur({ date, transaction }) : { valeurs: new Map() };
    const ajouts = contraintes.map((brute, index) => {
        const r = controlerContrainte(brute, { valeurs, dependances: leCatalogue().dependances, nomDe });
        for (const v of r.violations) violations.push({ contrainte: index, ...v });
        return r.contrainte;
    });
    if (!violations.length && ajouts.length) {
        for (const v of await ciblesInexistantes(ajouts, { transaction })) violations.push({ contrainte: v.index, champ: v.champ, code: v.code, message: v.message });
    }

    const enVigueur = new Set((await lireContraintesEnVigueur(date, { transaction })).map((c) => c.id_contrainte));
    const vus = new Set();
    for (const id of retirer) {
        if (vus.has(id)) violations.push({ retrait: id, code: "doublon", message: "Cette contrainte est retirée deux fois." });
        else if (!Number.isInteger(id) || !enVigueur.has(id)) violations.push({ retrait: id, code: "contrainte_introuvable", message: `La contrainte n° ${id} n'est pas en vigueur à cette date : rien à retirer.` });
        vus.add(id);
    }
    return { ajouts, retraits: retirer, violations };
};

/** Enregistre les ajouts et les retraits d'une version, dans sa transaction. */
export const enregistrerContraintes = (id_version, { ajouts, retraits }, transaction) =>
    ContrainteDeclaree.bulkCreate(
        [
            ...ajouts.map((c) => ({ id_version, gabarit: c.gabarit, cibles: c.cibles, parametres: c.parametres, nature: c.nature, insistance: c.insistance })),
            ...retraits.map((retire_id) => ({ id_version, retire_id })),
        ],
        { transaction }
    );

/** Ce qu'une version enregistrée ajoute et retire, sous la forme qu'attend preparerContraintes. */
export const contenuDeLaVersion = (version) => ({
    contraintes: (version.contraintes ?? []).filter((c) => c.gabarit).map((c) => ({ gabarit: c.gabarit, cibles: c.cibles, parametres: c.parametres, nature: c.nature, insistance: c.insistance })),
    retirer: (version.contraintes ?? []).filter((c) => c.retire_id).map((c) => c.retire_id),
});

/**
 * Lignes de la version inverse : chaque ajout est retiré, chaque retrait remet une copie de la
 * contrainte retirée. Refusé si une version appliquée plus récente a déjà retiré l'un des ajouts.
 */
export const inversesDesContraintes = async (version, transaction) => {
    const lignes = version.contraintes ?? [];
    if (!lignes.length) return [];
    const ajouts = lignes.filter((c) => c.gabarit).map((c) => c.id_contrainte);
    const toutes = await lireLignesDeContraintes({ transaction });
    if (toutes.some((l) => l.id_version !== version.id_version && ajouts.includes(l.retire_id))) {
        throw new ErreurMetier("Une version plus récente retire déjà une contrainte de celle-ci : annulez-la d'abord", 409, "VERSION_PLUS_RECENTE");
    }
    const retirees = lignes.filter((c) => c.retire_id).map((c) => c.retire_id);
    const originaux = retirees.length ? await ContrainteDeclaree.findAll({ where: { id_contrainte: retirees }, transaction }) : [];
    return [
        ...ajouts.map((retire_id) => ({ retire_id })),
        ...originaux.map((o) => ({ gabarit: o.gabarit, cibles: o.cibles, parametres: o.parametres, nature: o.nature, insistance: o.insistance })),
    ];
};

/** Enregistre les lignes inverses sous la version qui annule. */
export const enregistrerInverses = (id_version, inverses, transaction) => ContrainteDeclaree.bulkCreate(inverses.map((l) => ({ ...l, id_version })), { transaction });

/** Inclusion Sequelize des contraintes d'une version. */
export const AVEC_CONTRAINTES = () => ({ model: ContrainteDeclaree, as: "contraintes" });
