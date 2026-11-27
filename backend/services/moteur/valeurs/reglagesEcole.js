import { activeeParLEcole, peutModifier } from "./ecriture.js";

/**
 * Ce que le panneau de configuration laisse régler à l'école (ADM-02, conception § 5.2) : ce qui est
 * montré est tenu. Deux familles :
 * - cinq réglages, lus par la génération, la saisie manuelle et les examens (liste en données) ;
 * - les règles souples du profil que le solveur lit et qu'une école peut changer. Elles ne sont pas
 *   recopiées : elles se tirent du catalogue par activeeParLEcole et peutModifier (réponse 16).
 * Une règle se règle par un choix en mots (réponse 12), jamais par un poids en chiffres.
 * Fonctions pures.
 */

const ECOLE = "etablissement";

/**
 * Les cinq réglages, dans l'unité du catalogue. `pas` : une saisie en heures entières se stocke en minutes.
 * effet (R-10) : « saisie_et_generation » = tout de suite pour les séances placées à la main, et à la prochaine
 * génération ; « immediat » = tout de suite.
 */
export const REGLAGES_ECOLE = [
    { id: "HOR.REGLE.MAX_H_JOUR_GROUPE", ancien: "max_heures_jour_groupe", unite: "heure", min: 60, max: 720, pas: 60, effet: "saisie_et_generation" },
    { id: "ENS.CHARGE.MAX_H_JOUR", ancien: "max_heures_jour_enseignant", unite: "heure", min: 60, max: 720, pas: 60, effet: "saisie_et_generation" },
    { id: "LOG.TRAJET.CAMPUS_DEFAUT", ancien: "trajet_inter_campus_defaut_minutes", unite: "minute", min: 0, max: 240, pas: 1, effet: "saisie_et_generation" },
    { id: "EXA.EPREUVE.RATIO_CAPACITE", ancien: "ratio_capacite_examen", unite: "pourcentage", min: 1, max: 100, pas: 1, effet: "immediat" },
    { id: "EXA.EPREUVE.SURVEILLANTS_PAR_SALLE", ancien: "surveillants_par_salle", unite: "nombre", min: 1, max: 6, pas: 1, effet: "immediat" },
];

const parId = new Map(REGLAGES_ECOLE.map((r) => [r.id, r]));

/** Ce réglage fait-il partie des cinq ? */
export const estReglageEcole = (id) => parId.has(id);

const LISIBLE = { heure: (v) => `${v / 60} h`, minute: (v) => `${v} min`, pourcentage: (v) => `${v} %`, nombre: (v) => String(v) };

/** Refus d'une valeur hors des bornes de l'écran (code hors_bornes) ; vide si elle est permise ou si ce n'est pas l'un des cinq. */
export const controlerBornes = (id, valeur) => {
    const r = parId.get(id);
    if (!r || valeur === undefined) return [];
    const permise = Number.isInteger(valeur) && valeur >= r.min && valeur <= r.max && valeur % r.pas === 0;
    if (permise) return [];
    const pas = r.pas > 1 ? `, par pas de ${LISIBLE[r.unite](r.pas)}` : "";
    return [{ code: "hors_bornes", message: `La valeur doit être comprise entre ${LISIBLE[r.unite](r.min)} et ${LISIBLE[r.unite](r.max)}${pas}.` }];
};

/** Une règle du catalogue se règle-t-elle depuis le panneau, avec cette force résolue ? */
export const estRegleReglable = (p, force) => activeeParLEcole(p, force) && peutModifier(p, ECOLE);

/** Les identifiants des règles réglables par l'école, pour ces résultats de resoudreTout. */
export const reglesReglables = ({ parametres, resultats }) => parametres.filter((p) => estRegleReglable(p, resultats.get(p.id)?.force)).map((p) => p.id);

export const CHOIX = ["coupee", "peu", "normal", "beaucoup"];

const poidsPeu = (poidsDuProfil) => Math.max(1, Math.round(poidsDuProfil / 3));
const poidsBeaucoup = (poidsDuProfil) => poidsDuProfil * 3;

/** Les choix proposés : « peu » disparaît quand il vaudrait le poids du profil (poids 1). */
export const choixPossibles = (poidsDuProfil) => CHOIX.filter((c) => c !== "peu" || poidsPeu(poidsDuProfil) !== poidsDuProfil);

/**
 * Le choix qui correspond à la valeur et au poids en vigueur ; « particulier » pour un poids posé
 * par l'API qui ne tombe sur aucun choix.
 */
export const choixEnCours = ({ valeur, poids, poidsDuProfil }) => {
    if (valeur === false) return "coupee";
    if (poids === poidsDuProfil) return "normal";
    if (poids === poidsBeaucoup(poidsDuProfil)) return "beaucoup";
    if (poids === poidsPeu(poidsDuProfil) && choixPossibles(poidsDuProfil).includes("peu")) return "peu";
    return "particulier";
};

/**
 * La ligne de version qui pose ce choix. « normal » retire la ligne de l'école : le profil s'applique de nouveau.
 * @returns {object|null} null pour un choix inconnu ou non proposé
 */
export const ligneDuChoix = (id, choix, poidsDuProfil) => {
    if (!choixPossibles(poidsDuProfil).includes(choix)) return null;
    const ligne = { cle: id, portee: ECOLE };
    if (choix === "coupee") return { ...ligne, valeur: false };
    if (choix === "normal") return { ...ligne, retiree: true };
    return { ...ligne, valeur: true, poids: choix === "peu" ? poidsPeu(poidsDuProfil) : poidsBeaucoup(poidsDuProfil) };
};
