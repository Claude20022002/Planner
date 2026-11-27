import { execFile } from "node:child_process";
import { fileURLToPath } from "node:url";
import { promisify } from "node:util";
import { jest } from "@jest/globals";
import { resetDatabase, closeDatabase, createUser } from "./helpers/testApp.js";
import sequelize from "../../config/db.js";
import {
    AnneeUniversitaire,
    Campus,
    Cours,
    CoursComposante,
    Creneau,
    Enseignant,
    Enseignement,
    EnseignementEnseignant,
    Filiere,
    Groupe,
    ParametrePlanning,
    Periode,
    Salle,
    ValeurParametre,
    VersionParametres,
} from "../../models/index.js";
import { LIBELLE, down, up } from "../../migrations/0088-reprise-parametres-planning.js";
import { construireProbleme, pourLeSolveur } from "../../services/generation/timefold/probleme.js";
import { lireParametres } from "../../services/planning/referentiel.js";
import { aujourdhui } from "../../services/moteur/valeurs/lecture.js";
import { poserReglages } from "./helpers/reglagesMoteur.js";

/**
 * ADM-02a, migration 0088 (conception § 7, réponse 15) : les écarts entre l'ancienne table
 * ParametresPlanning et MP-1 sont repris dans une version appliquée du jour ; et le problème envoyé au
 * solveur pour une base d'essai est identique avant la bascule (ancienne lecture, figée dans
 * helpers/referentielAvantBascule.js, lancée par helpers/problemeAvantBascule.mjs) et après (lecture de MP-1, migration passée) : critère 2 du § 1.
 */

jest.setTimeout(60000);

const GROUPE = "HOR.REGLE.MAX_H_JOUR_GROUPE";
const ENSEIGNANT = "ENS.CHARGE.MAX_H_JOUR";
const TRAJET = "LOG.TRAJET.CAMPUS_DEFAUT";
const queryInterface = () => sequelize.getQueryInterface();
let ref;

/** Une version appliquée posée comme la 0061 le faisait : sans auteur, à la portée de l'école. */
const versionDirecte = async (libelle, date_effet, valeurs) => {
    const v = await VersionParametres.create({ libelle, date_effet, statut: "appliquee", appliquee_le: new Date() });
    await ValeurParametre.bulkCreate(Object.entries(valeurs).map(([cle, valeur]) => ({ id_version: v.id_version, cle, portee: "etablissement", id_portee: "", valeur })));
};

/**
 * L'état de la base d'origine le jour de la mise en ligne : la 0061 a copié le plafond d'un groupe (7 h)
 * le 10 nov. ; l'ancienne page a changé depuis ce plafond (6 h), celui d'un enseignant (7 h) et le trajet
 * (45 min), et a posé deux valeurs égales à celles de départ.
 */
const etatDeMiseEnLigne = async () => {
    await versionDirecte("Version initiale : réglages existants", "2026-11-10", { "ETA.ID.PROFIL": "universite", [GROUPE]: 420 });
    await ParametrePlanning.bulkCreate([
        { cle: "max_heures_jour_groupe", valeur: 6 },
        { cle: "max_heures_jour_enseignant", valeur: 7 },
        { cle: "trajet_inter_campus_defaut_minutes", valeur: 45 },
        { cle: "ratio_capacite_examen", valeur: 0.5 },
        { cle: "surveillants_par_salle", valeur: 2 },
    ]);
};

const reprises = () => VersionParametres.findAll({ where: { libelle: LIBELLE } });
const lignesDe = async (id_version) => Object.fromEntries((await ValeurParametre.findAll({ where: { id_version } })).map((l) => [l.cle, l.valeur]));
const valeurs = (parametres) => Object.fromEntries(Object.entries(parametres).map(([cle, p]) => [cle, p.valeur]));

/**
 * Le problème et les paramètres tels que le code d'avant la bascule les lisait (ParametresPlanning) :
 * dans un processus à part (helpers/problemeAvantBascule.mjs), sur la même base. Le registre isolé de
 * Jest (isolateModulesAsync) a été essayé : il charge deux fois certains modules et casse les tests suivants.
 */
const avantLaBascule = async () => {
    const script = fileURLToPath(new URL("./helpers/problemeAvantBascule.mjs", import.meta.url));
    const { stdout } = await promisify(execFile)(process.execPath, [script, String(ref.periode.id_periode)], { env: process.env, maxBuffer: 20e6 });
    return JSON.parse(stdout.split(/\r?\n/).find((l) => l.startsWith("RESULTAT:")).slice("RESULTAT:".length));
};

// Passé par JSON, comme le résultat du processus d'avant la bascule
const apresLaBascule = async () =>
    JSON.parse(
        JSON.stringify({
            envoye: pourLeSolveur((await construireProbleme({ id_periode: ref.periode.id_periode })).probleme),
            parametres: valeurs(await lireParametres()),
        })
    );

beforeAll(async () => {
    await resetDatabase();
    const [prof, vacataire] = [await createUser("enseignant"), await createUser("enseignant")];
    await Enseignant.update({ statut: "vacataire" }, { where: { id_user: vacataire.id_user } });
    const [nord, sud] = await Promise.all(["N", "S"].map((code) => Campus.findOne({ where: { code } })));
    const filiere = await Filiere.create({ code_filiere: "REP", nom_filiere: "Reprise" });
    const promo = await Groupe.create({ nom_groupe: "3A REP", niveau: "3ème année", annee: 3, effectif: 40, annee_scolaire: "2026-2027", type_groupe: "promotion", id_filiere: filiere.id_filiere });
    const td = await Groupe.create({ nom_groupe: "REP-TD1", niveau: "3ème année", annee: 3, effectif: 20, annee_scolaire: "2026-2027", type_groupe: "td", id_groupe_parent: promo.id_groupe, id_filiere: filiere.id_filiere });
    await Salle.create({ nom_salle: "N-REP", type_salle: "Salle de cours", capacite: 50, id_campus: nord.id_campus });
    await Salle.create({ nom_salle: "S-REP", type_salle: "Salle de cours", capacite: 30, id_campus: sud.id_campus });
    for (const [jour_semaine, heure_debut, heure_fin, rang] of [["lundi", "09:00", "10:30", 1], ["lundi", "10:45", "12:15", 2], ["mardi", "09:00", "10:30", 1], ["mardi", "10:45", "12:15", 2]]) {
        await Creneau.create({ jour_semaine, heure_debut, heure_fin, duree_minutes: 90, rang });
    }
    const annee = await AnneeUniversitaire.create({ libelle: "2026-2027", date_debut: "2026-09-01", date_fin: "2027-07-31", active: true });
    const periode = await Periode.create({ id_annee: annee.id_annee, code: "S2", date_debut: "2027-03-01", date_fin: "2027-05-22", nb_semaines: 12 });
    const cours = await Cours.create({ code_cours: "REP-1", nom_cours: "Réseaux", niveau: "3ème année", volume_horaire: 30, type_cours: "CM", semestre: "S6", id_filiere: filiere.id_filiere });
    for (const [type, niveau_groupe, groupe, enseignant] of [["CM", "promotion", promo, prof], ["TD", "td", td, vacataire]]) {
        const composante = await CoursComposante.create({ id_cours: cours.id_cours, type, volume_heures: 15, niveau_groupe });
        const ens = await Enseignement.create({ id_composante: composante.id_composante, id_periode: periode.id_periode, heures_prevues: 15 });
        await ens.setGroupes([groupe.id_groupe]);
        await EnseignementEnseignant.create({ id_enseignement: ens.id_enseignement, id_user: enseignant.id_user, role: "principal", statut_service: "accepte" });
    }
    ref = { periode };
});
afterAll(closeDatabase);
beforeEach(async () => {
    await ParametrePlanning.destroy({ where: {} });
    await ValeurParametre.destroy({ where: {} });
    // Une version inverse renvoie à celle qu'elle annule : ces renvois tombent d'abord
    await VersionParametres.update({ annule_version: null }, { where: {} });
    await VersionParametres.destroy({ where: {} });
});

describe("Migration 0088", () => {
    test("une valeur changée par l'ancienne page est reprise dans une version appliquée du jour, sans auteur", async () => {
        await etatDeMiseEnLigne();
        await up({ queryInterface: queryInterface() });
        const [version, ...autres] = await reprises();
        expect(autres).toEqual([]);
        expect(version).toMatchObject({ statut: "appliquee", date_effet: aujourdhui(), id_auteur: null });
        // Seulement les écarts : le ratio et les surveillants valent déjà ce que tient MP-1
        expect(await lignesDe(version.id_version)).toEqual({ [GROUPE]: 360, [ENSEIGNANT]: 420, [TRAJET]: 45 });
        expect(await lireParametres()).toMatchObject({
            max_heures_jour_groupe: { valeur: 6, modifie: true },
            max_heures_jour_enseignant: { valeur: 7 },
            trajet_inter_campus_defaut_minutes: { valeur: 45 },
            ratio_capacite_examen: { valeur: 0.5, modifie: false },
        });
    });

    test("aucune version sans écart, y compris pour une valeur tenue par le profil de l'école", async () => {
        // Profil collège : 7 h pour un enseignant, sans ligne de l'école (420 min dans le profil)
        await versionDirecte("Version initiale : réglages existants", "2026-11-10", { "ETA.ID.PROFIL": "college", [GROUPE]: 360 });
        await ParametrePlanning.bulkCreate([
            { cle: "max_heures_jour_groupe", valeur: 6 },
            { cle: "max_heures_jour_enseignant", valeur: 7 },
            { cle: "ratio_capacite_examen", valeur: 0.5 },
            { cle: "pause_vendredi", valeur: { active: true, debut: "12:30", fin: "14:30" } },
        ]);
        await up({ queryInterface: queryInterface() });
        expect(await reprises()).toEqual([]);
    });

    test("down retire la version reprise et ses lignes : les valeurs reviennent à celles d'avant", async () => {
        await etatDeMiseEnLigne();
        await up({ queryInterface: queryInterface() });
        await down({ queryInterface: queryInterface() });
        expect(await reprises()).toEqual([]);
        expect(await ValeurParametre.count({ where: { cle: TRAJET } })).toBe(0);
        expect(valeurs(await lireParametres())).toMatchObject({ max_heures_jour_groupe: 7, max_heures_jour_enseignant: 8, trajet_inter_campus_defaut_minutes: 30 });
    });

    test("down s'arrête si une version plus récente change les mêmes réglages", async () => {
        await etatDeMiseEnLigne();
        await up({ queryInterface: queryInterface() });
        await poserReglages([{ cle: TRAJET, valeur: 50 }]);
        await expect(down({ queryInterface: queryInterface() })).rejects.toThrow(/change les mêmes réglages après elle\. Annulez-la d'abord/);
        expect(await reprises()).toHaveLength(1);
    });

    test("tout ou rien : si l'insertion des valeurs échoue, aucune version n'est créée, et une nouvelle tentative réussit", async () => {
        await etatDeMiseEnLigne();
        const qi = queryInterface();
        const enPanne = {
            sequelize: qi.sequelize,
            bulkInsert: (table, lignes, options) => (table === "ValeursParametres" ? Promise.reject(new Error("panne simulée")) : qi.bulkInsert(table, lignes, options)),
        };
        await expect(up({ queryInterface: enPanne })).rejects.toThrow("panne simulée");
        expect(await reprises()).toEqual([]);
        await up({ queryInterface: qi });
        const [version, ...autres] = await reprises();
        expect(autres).toEqual([]);
        expect(await lignesDe(version.id_version)).toEqual({ [GROUPE]: 360, [ENSEIGNANT]: 420, [TRAJET]: 45 });
    });
});

describe("Problème envoyé au solveur (critère 2)", () => {
    test("identique avant et après la bascule, pour la base d'essai à l'état de la mise en ligne", async () => {
        await etatDeMiseEnLigne();
        const avant = await avantLaBascule();
        expect(avant.envoye.parametres).toMatchObject({ maxMinutesJourGroupe: 360, maxMinutesJourEnseignant: 420, trajetDefautMinutes: 45 });

        // Sans la reprise, la bascule changerait ce que reçoit le solveur (divergence E-1)
        expect((await apresLaBascule()).envoye).not.toEqual(avant.envoye);

        await up({ queryInterface: queryInterface() });
        const apres = await apresLaBascule();
        expect(apres.envoye.lecons.length).toBeGreaterThan(0);
        expect(apres.envoye).toEqual(avant.envoye);
        // La saisie manuelle, les examens, les salles et les campus lisent les mêmes valeurs
        expect(apres.parametres).toEqual(avant.parametres);
    });
});

describe("Base neuve (PLA-03)", () => {
    beforeAll(() => resetDatabase({ neuve: true }));

    test("la migration passe sans créer de version, et ne fait rien si on la rejoue", async () => {
        const [passees] = await sequelize.query("SELECT name FROM SequelizeMeta WHERE name = '0088-reprise-parametres-planning.js'");
        expect(passees).toHaveLength(1);
        expect(await VersionParametres.count()).toBe(0);
        await up({ queryInterface: queryInterface() });
        expect(await VersionParametres.count()).toBe(0);
    });
});
