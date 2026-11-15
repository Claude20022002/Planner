/**
 * Reprise des deux anciens réglages de planning en contraintes déclarées (MOT-13b,
 * docs/conception/moteur-planification/mot-13b-solveur.md § 4.5), comme la 0061 l'a fait pour les
 * autres : la pause du vendredi devient une plage interdite, le samedi après-midi une plage à éviter
 * d'insistance « beaucoup » (réponse 17), toutes deux pour le rythme « initiale ».
 *
 * Seulement dans une base qui a des comptes : une base neuve commence sans contrainte (EP-1). Les
 * valeurs viennent de ParametresPlanning, ou des valeurs par défaut d'avant la migration. Ces lignes
 * restent en base (étendre puis contracter) : elles ne sont plus lues, puisque les deux clés quittent
 * config/parametresPlanning.js. Le down retire la version reprise et ses contraintes.
 */

export const LIBELLE = "Reprise des réglages de planning";

// Figées ici : une migration ne dépend pas d'un fichier qui évoluera
const PAUSE_PAR_DEFAUT = { active: true, debut: "12:30", fin: "14:30" };
const SAMEDI_PAR_DEFAUT = false;
const INITIALE = [{ type: "rythme", id: "initiale" }];

const lireJson = (v) => (typeof v === "string" ? JSON.parse(v) : v);

/** Les contraintes à créer, à partir des deux anciens réglages (fonction pure, exportée pour les tests). */
export const contraintesReprises = ({ pause = PAUSE_PAR_DEFAUT, samedi = SAMEDI_PAR_DEFAUT } = {}) => [
    ...(pause?.active
        ? [{ gabarit: "plage_interdite", cibles: INITIALE, parametres: { jours: ["vendredi"], debut: pause.debut, fin: pause.fin }, nature: "impossible", insistance: null }]
        : []),
    ...(samedi ? [] : [{ gabarit: "plage_a_eviter", cibles: INITIALE, parametres: { jours: ["samedi"], debut: "12:30", fin: "23:59" }, nature: "souhait", insistance: "beaucoup" }]),
];

export const up = async ({ queryInterface }) => {
    const sequelize = queryInterface.sequelize;
    const [[{ comptes }]] = await sequelize.query("SELECT COUNT(*) AS comptes FROM Users");
    if (!Number(comptes)) return;

    const [anciens] = await sequelize.query("SELECT cle, valeur FROM ParametresPlanning WHERE cle IN ('pause_vendredi', 'samedi_apres_midi_initiale')");
    const valeur = (cle, defaut) => {
        const ligne = anciens.find((a) => a.cle === cle);
        return ligne ? lireJson(ligne.valeur) : defaut;
    };
    const contraintes = contraintesReprises({ pause: valeur("pause_vendredi", PAUSE_PAR_DEFAUT), samedi: valeur("samedi_apres_midi_initiale", SAMEDI_PAR_DEFAUT) });
    if (!contraintes.length) return;

    const maintenant = new Date();
    await queryInterface.bulkInsert("VersionsParametres", [
        { libelle: LIBELLE, date_effet: maintenant.toISOString().slice(0, 10), statut: "appliquee", appliquee_le: maintenant, createdAt: maintenant, updatedAt: maintenant },
    ]);
    const [[{ id }]] = await sequelize.query("SELECT MAX(id_version) AS id FROM VersionsParametres");
    await queryInterface.bulkInsert(
        "ContraintesDeclarees",
        contraintes.map((c) => ({ id_version: id, gabarit: c.gabarit, cibles: JSON.stringify(c.cibles), parametres: JSON.stringify(c.parametres), nature: c.nature, insistance: c.insistance, retire_id: null }))
    );
};

export const down = async ({ queryInterface }) => {
    const sequelize = queryInterface.sequelize;
    const [versions] = await sequelize.query("SELECT id_version FROM VersionsParametres WHERE libelle = :libelle", { replacements: { libelle: LIBELLE } });
    const ids = versions.map((v) => v.id_version);
    if (!ids.length) return;
    // Un retrait ou une annulation postérieurs renvoient à ces lignes : ces renvois tombent d'abord
    await sequelize.query(
        "UPDATE ContraintesDeclarees SET retire_id = NULL WHERE retire_id IN (SELECT id_contrainte FROM (SELECT id_contrainte FROM ContraintesDeclarees WHERE id_version IN (:ids)) AS reprises)",
        { replacements: { ids } }
    );
    await sequelize.query("UPDATE VersionsParametres SET annule_version = NULL WHERE annule_version IN (:ids)", { replacements: { ids } });
    await sequelize.query("DELETE FROM ContraintesDeclarees WHERE id_version IN (:ids)", { replacements: { ids } });
    await sequelize.query("DELETE FROM VersionsParametres WHERE id_version IN (:ids)", { replacements: { ids } });
};
