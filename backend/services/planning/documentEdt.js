/**
 * En-tête du document « Emploi du temps du mois », selon le modèle réglé par l'école (EDT-04, D-21).
 * Pur : ni base, ni modèle Sequelize, pour être éprouvé seul et employé aussi par la version publiée.
 *
 * - « hestim » : format officiel — « 2ème année du cycle Ingénieur d'État en … » et « 4A | IIIA (S7) »,
 *   calqué sur l'EDT d'octobre 2026 de l'école d'origine ;
 * - « planner » : format neutre — le nom du groupe tel quel, aucun code de classe, donc aucun mot
 *   propre au supérieur (filière, cycle, semestre) dans le document d'une école scolaire.
 *
 * Un réglage absent ou inconnu retombe sur le neutre, comme le défaut d'une base neuve (migration 0055).
 */

export const MODELES_DOCUMENT = ["planner", "hestim"];

/** Modèle du document : « hestim » seulement s'il est réglé tel quel ; tout le reste est neutre. */
export const modeleDuDocument = (etablissement) => (etablissement?.modele_edt === "hestim" ? "hestim" : "planner");

const ordinal = (n) => (n === 1 ? "1ère" : `${n}ème`);

/**
 * Intitulé et code de la classe.
 * @param {{ nom_groupe: string, annee?: number, niveau?: string, filiere?: object }} groupe
 * @param {{ code?: string } | null} periode
 * @param {"planner" | "hestim"} modele
 */
export const intitules = (groupe, periode, modele = "planner") => {
    if (modele !== "hestim") return { intitule_classe: groupe.nom_groupe, code_classe: null };
    const filiere = groupe.filiere;
    const annee = groupe.annee ?? (Number(String(groupe.niveau).match(/\d/)?.[0]) || null);
    const anneeCycle = annee && filiere?.premiere_annee_cycle ? annee - filiere.premiere_annee_cycle + 1 : annee;
    const semestre = annee && periode ? (periode.code === "S1" ? 2 * annee - 1 : 2 * annee) : null;
    return {
        intitule_classe: filiere?.intitule_cycle && anneeCycle ? `${ordinal(anneeCycle)} année du ${filiere.intitule_cycle} en ${filiere.nom_filiere}` : filiere?.nom_filiere ?? groupe.nom_groupe,
        code_classe: `${annee ? `${annee}A` : groupe.nom_groupe} | ${filiere?.code_filiere ?? ""}${semestre ? ` (S${semestre})` : ""}`,
    };
};
