import { FUSEAU_ECOLE } from "../config/fuseau.js";

/**
 * Reprise des écarts entre l'ancienne table ParametresPlanning et les réglages du moteur (ADM-02,
 * docs/conception/administration/adm-02-configuration.md § 7, réponse 15). La 0061 a copié ces
 * réglages dans MP-1 le 10 nov. ; l'ancienne page a pu les changer depuis. Depuis la bascule,
 * services/planning/referentiel.js lit MP-1 : sans cette reprise, une valeur changée après le 10 nov.
 * serait perdue à la mise en ligne.
 *
 * Pour chaque ligne de l'ancienne table, la valeur convertie est comparée à la valeur que MP-1 tient
 * à la portée de l'école, à la date du jour à l'école. Les écarts vont dans une seule version
 * appliquée, datée de ce jour, sans auteur. Aucun écart, ou base neuve : aucune version. L'ancienne
 * table reste (étendre puis contracter). Le down retire cette version, sauf si une version plus
 * récente touche les mêmes réglages. L'un et l'autre se font dans une transaction.
 */

export const LIBELLE = "Reprise des paramètres de planification";

// Figées ici, comme dans la 0061 : une migration ne dépend pas d'un fichier qui évoluera
const CONVERSIONS = {
    max_heures_jour_groupe: ["HOR.REGLE.MAX_H_JOUR_GROUPE", (v) => v * 60],
    max_heures_jour_enseignant: ["ENS.CHARGE.MAX_H_JOUR", (v) => v * 60],
    duree_seance_defaut_minutes: ["MAT.VOL.DUREE_REC", (v) => v],
    ratio_capacite_examen: ["EXA.EPREUVE.RATIO_CAPACITE", (v) => Math.round(v * 100)],
    surveillants_par_salle: ["EXA.EPREUVE.SURVEILLANTS_PAR_SALLE", (v) => v],
    trajet_inter_campus_defaut_minutes: ["LOG.TRAJET.CAMPUS_DEFAUT", (v) => v],
};

// Valeur de ces réglages quand l'école n'a pas de ligne : celle du profil, sinon celle du catalogue
// (catalogue du moteur au 26 nov. 2026, figé ici pour la même raison)
const CATALOGUE = {
    "HOR.REGLE.MAX_H_JOUR_GROUPE": 480,
    "ENS.CHARGE.MAX_H_JOUR": 480,
    "MAT.VOL.DUREE_REC": null,
    "EXA.EPREUVE.RATIO_CAPACITE": 50,
    "EXA.EPREUVE.SURVEILLANTS_PAR_SALLE": 2,
    "LOG.TRAJET.CAMPUS_DEFAUT": 30,
};
const PROFILS = {
    college: { "HOR.REGLE.MAX_H_JOUR_GROUPE": 420, "ENS.CHARGE.MAX_H_JOUR": 420, "MAT.VOL.DUREE_REC": 55 },
    formation: { "MAT.VOL.DUREE_REC": 180 },
    lycee: { "HOR.REGLE.MAX_H_JOUR_GROUPE": 480, "ENS.CHARGE.MAX_H_JOUR": 420, "MAT.VOL.DUREE_REC": 55 },
    primaire: { "HOR.REGLE.MAX_H_JOUR_GROUPE": 360, "ENS.CHARGE.MAX_H_JOUR": 360, "MAT.VOL.DUREE_REC": 45 },
    universite: { "MAT.VOL.DUREE_REC": 90 },
};
const PROFIL = "ETA.ID.PROFIL";

// Les colonnes JSON sont lues en texte (CAST … AS CHAR) : mysql2 en décode certaines et pas d'autres

/** La date du jour à l'école (AAAA-MM-JJ). */
const aujourdhui = () => new Date().toLocaleDateString("en-CA", { timeZone: FUSEAU_ECOLE });

/**
 * Lignes de l'école en vigueur à cette date, pour ces clés : version appliquée, déjà prise d'effet ; la
 * plus récente gagne (à date égale, le plus grand numéro) ; une ligne retirée rend la main au profil.
 * @returns {Map<string, unknown>} clé → valeur
 */
const enVigueur = async (sequelize, cles, jour, transaction) => {
    const [lignes] = await sequelize.query(
        `SELECT v.cle, CAST(v.valeur AS CHAR) AS valeur, v.retiree FROM ValeursParametres v JOIN VersionsParametres s ON s.id_version = v.id_version
         WHERE s.statut = 'appliquee' AND s.date_effet <= :jour AND v.portee = 'etablissement' AND v.id_portee = '' AND v.cle IN (:cles)
         ORDER BY s.date_effet DESC, s.id_version DESC`,
        { replacements: { jour, cles }, transaction }
    );
    const retenues = new Map();
    for (const l of lignes) if (!retenues.has(l.cle)) retenues.set(l.cle, l);
    return new Map([...retenues].filter(([, l]) => !Number(l.retiree)).map(([cle, l]) => [cle, JSON.parse(l.valeur)]));
};

/**
 * Les écarts entre l'ancienne table et MP-1 (fonction pure, exportée pour les tests).
 * @param {object} o anciens ([{ cle, valeur }], valeur en texte JSON), ecole (Map clé → valeur en vigueur), profil (code ou null)
 * @returns {Array<[string, unknown]>} [clé du catalogue, valeur à écrire]
 */
export const ecarts = ({ anciens, ecole, profil }) =>
    anciens
        .filter((a) => CONVERSIONS[a.cle])
        .map((a) => [CONVERSIONS[a.cle][0], CONVERSIONS[a.cle][1](JSON.parse(a.valeur))])
        .filter(([id, valeur]) => {
            const tenue = ecole.has(id) ? ecole.get(id) : (PROFILS[profil]?.[id] ?? CATALOGUE[id]);
            return valeur !== tenue;
        });

// Tout ou rien (relecture du coordinateur, 26 nov.) : une version appliquée sans ses valeurs ne doit
// jamais rester en base, ni une seconde être créée par une nouvelle tentative
export const up = async ({ queryInterface }) => {
    const sequelize = queryInterface.sequelize;
    await sequelize.transaction(async (transaction) => {
        const [anciens] = await sequelize.query("SELECT cle, CAST(valeur AS CHAR) AS valeur FROM ParametresPlanning WHERE cle IN (:cles)", { replacements: { cles: Object.keys(CONVERSIONS) }, transaction });
        if (!anciens.length) return;

        const jour = aujourdhui();
        const ecole = await enVigueur(sequelize, [PROFIL, ...Object.values(CONVERSIONS).map(([id]) => id)], jour, transaction);
        const aReprendre = ecarts({ anciens, ecole, profil: ecole.get(PROFIL) ?? null });
        if (!aReprendre.length) return;

        const maintenant = new Date();
        await queryInterface.bulkInsert("VersionsParametres", [{ libelle: LIBELLE, date_effet: jour, statut: "appliquee", id_auteur: null, appliquee_le: maintenant, createdAt: maintenant, updatedAt: maintenant }], { transaction });
        // La version que cette transaction vient d'insérer : la plus récente des reprises sans auteur
        const [[{ id }]] = await sequelize.query("SELECT MAX(id_version) AS id FROM VersionsParametres WHERE libelle = :libelle AND id_auteur IS NULL", { replacements: { libelle: LIBELLE }, transaction });
        await queryInterface.bulkInsert(
            "ValeursParametres",
            aReprendre.map(([cle, valeur]) => ({ id_version: id, cle, portee: "etablissement", id_portee: "", valeur: JSON.stringify(valeur), retiree: false })),
            { transaction }
        );
    });
};

export const down = async ({ queryInterface }) => {
    const sequelize = queryInterface.sequelize;
    await sequelize.transaction(async (transaction) => {
        const [versions] = await sequelize.query("SELECT id_version FROM VersionsParametres WHERE libelle = :libelle AND id_auteur IS NULL", { replacements: { libelle: LIBELLE }, transaction });
        for (const { id_version } of versions) {
            const [plusRecentes] = await sequelize.query(
                `SELECT DISTINCT s.id_version FROM VersionsParametres s JOIN ValeursParametres v ON v.id_version = s.id_version
                 WHERE s.id_version > :id AND s.statut = 'appliquee' AND v.cle IN (SELECT cle FROM ValeursParametres WHERE id_version = :id)`,
                { replacements: { id: id_version }, transaction }
            );
            if (plusRecentes.length) {
                throw new Error(
                    `Migration 0088 : la version ${id_version} (« ${LIBELLE} ») n'est pas retirée, car la version ${plusRecentes.map((v) => v.id_version).join(", ")} change les mêmes réglages après elle. Annulez-la d'abord.`
                );
            }
            await sequelize.query("DELETE FROM ValeursParametres WHERE id_version = :id", { replacements: { id: id_version }, transaction });
            await sequelize.query("DELETE FROM VersionsParametres WHERE id_version = :id", { replacements: { id: id_version }, transaction });
        }
    });
};
