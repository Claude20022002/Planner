import { Op } from "sequelize";
import { Creneau } from "../../../models/index.js";
import { construireProbleme } from "../../generation/timefold/probleme.js";
import { ErreurMetier } from "../../planning/enseignements.js";
import { aujourdhui, leCatalogue, valeursEnVigueur } from "../valeurs/lecture.js";
import { ciblesInexistantes, lireNoms } from "./cibles.js";
import { contradictions } from "./contradictions.js";
import { controlerContrainte } from "./controle.js";
import { lireContraintesEnVigueur } from "./enVigueur.js";
import { GABARITS, poidsDe } from "./gabarits.js";
import { manquesDePlace } from "./avantGeneration.js";
import { phraseDe } from "./phrases.js";

/**
 * Lectures et vérification à blanc des contraintes déclarées (MOT-13a, § 4.5) : ce que rendent les
 * routes GET /api/moteur/contraintes et POST /api/moteur/contraintes/verifier. Rien n'est écrit ici.
 */

const JOURS = { lundi: 1, mardi: 2, mercredi: 3, jeudi: 4, vendredi: 5, samedi: 6, dimanche: 7 };
const minutes = (h) => {
    const [a, b] = String(h).split(":").map(Number);
    return a * 60 + (b || 0);
};

/** La grille de l'école, toutes rythmes confondus, en minutes : pour dire qu'une plage est sans effet. */
const lireGrille = async () =>
    (await Creneau.findAll({ where: { variante: "normale", rang: { [Op.ne]: null } }, attributes: ["jour_semaine", "heure_debut", "heure_fin"] })).map((c) => ({ jour: JOURS[c.jour_semaine], debut: minutes(c.heure_debut), fin: minutes(c.heure_fin) }));

const nomDe = (id) => leCatalogue().parametres.find((p) => p.id === id)?.nom ?? id;

const exigerDate = (date) => {
    if (date !== undefined && !/^\d{4}-\d{2}-\d{2}$/.test(date)) throw new ErreurMetier("La date s'écrit AAAA-MM-JJ", 400, "DATE_INVALIDE");
    return date ?? aujourdhui();
};

/** Les contraintes en vigueur à une date, avec leur phrase et leur état. */
export const listerContraintes = async (dateDemandee) => {
    const date = exigerDate(dateDemandee);
    const [contraintes, grille] = await Promise.all([lireContraintesEnVigueur(date), lireGrille()]);
    const noms = await lireNoms(contraintes);
    return {
        date,
        contraintes: contraintes.map((c) => ({
            id_contrainte: c.id_contrainte,
            id_version: c.id_version,
            gabarit: c.gabarit,
            cibles: c.cibles,
            parametres: c.parametres,
            nature: c.nature,
            insistance: c.insistance,
            poids: poidsDe(c),
            phrase: phraseDe(c, noms),
            // Le calcul ne tient les contraintes déclarées qu'à partir de MOT-13b : l'écran doit le dire
            tenue_par_le_calcul: GABARITS[c.gabarit]?.tenu ?? false,
            avertissements: controlerContrainte(c, { creneaux: grille }).avertissements,
        })),
    };
};

/**
 * Vérification à blanc : refus, avertissements, phrases, contradictions (avec celles déjà en vigueur),
 * et contrôle de place si une période est donnée.
 * @param {object} o contraintes (telles que reçues), id_periode (facultatif), date (facultative)
 */
export const verifierContraintes = async ({ contraintes, id_periode, date: dateDemandee }) => {
    if (!Array.isArray(contraintes) || !contraintes.length) throw new ErreurMetier("Donnez au moins une contrainte à vérifier", 400, "CONTRAINTES_VIDES");
    const date = exigerDate(dateDemandee);
    const [{ valeurs }, grille, enVigueur] = await Promise.all([valeursEnVigueur({ date }), lireGrille(), lireContraintesEnVigueur(date)]);
    const resultats = contraintes.map((brute) => controlerContrainte(brute, { valeurs, dependances: leCatalogue().dependances, nomDe, creneaux: grille }));
    const valides = resultats.map((r, index) => ({ ...r, index })).filter((r) => !r.violations.length);
    for (const v of await ciblesInexistantes(valides.map((r) => r.contrainte))) resultats[valides[v.index].index].violations.push({ champ: v.champ, code: v.code, message: v.message });

    const retenues = resultats.map((r, index) => ({ ...r, index })).filter((r) => !r.violations.length);
    const noms = await lireNoms([...retenues.map((r) => r.contrainte), ...enVigueur]);
    const nouvelles = retenues.map((r) => ({ ...r.contrainte, phrase: phraseDe(r.contrainte, noms), index: r.index }));
    const existantes = enVigueur.map((c) => ({ ...c, phrase: phraseDe(c, noms) }));
    const ensemble = [...nouvelles, ...existantes];
    // Une contradiction entre deux contraintes déjà en vigueur n'est pas l'objet de cette vérification
    const conflits = contradictions(ensemble, grille)
        .filter((x) => x.indices.some((i) => i < nouvelles.length))
        .map((x) => ({ code: x.code, message: x.message, contraintes: x.indices.filter((i) => i < nouvelles.length).map((i) => nouvelles[i].index), en_vigueur: x.indices.filter((i) => i >= nouvelles.length).map((i) => ensemble[i].id_contrainte) }));

    let place = null;
    if (id_periode !== undefined && id_periode !== null) {
        const { probleme } = await construireProbleme({ id_periode });
        place = await manquesDePlace({ probleme, date, contraintesEnPlus: nouvelles.map((c) => ({ ...c, index: undefined })) });
        place = place.map((m) => ({ ...m, contraintes_en_plus: m.contraintes_en_plus.map((i) => nouvelles[i].index) }));
    }
    return {
        date,
        contraintes: resultats.map((r, index) => ({
            index,
            contrainte: r.contrainte,
            phrase: r.violations.length ? null : nouvelles.find((n) => n.index === index).phrase,
            violations: r.violations,
            avertissements: r.avertissements,
        })),
        contradictions: conflits,
        place,
    };
};
