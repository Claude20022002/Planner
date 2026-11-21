import { resetDatabase, closeDatabase, createUser } from "./helpers/testApp.js";
import sequelize from "../../config/db.js";
import { Campus, ContrainteDeclaree, Cours, Creneau, Filiere, Groupe, ParametrePlanning, Salle, ValeurParametre, VersionParametres } from "../../models/index.js";
import { GRILLE_HESTIM } from "../../seed.js";
import { LIBELLE, contraintesReprises, down, up } from "../../migrations/0081-plages-reprises.js";
import { compilerContraintes } from "../../services/moteur/contraintes/compilation.js";
import { validerAffectation } from "../../services/planning/affectationRules.js";

/**
 * MOT-13b : la migration 0081 reprend la pause du vendredi et le samedi après-midi en contraintes
 * déclarées ; elles ne visent aucun créneau de la grille de démonstration ; la saisie manuelle les
 * lit (interdite → bloquant, à éviter → avertissement).
 */

let prof;
let ref;
const queryInterface = () => sequelize.getQueryInterface();

const reprises = async () =>
    (await ContrainteDeclaree.findAll({ include: [{ model: VersionParametres, as: "version", where: { libelle: LIBELLE } }], order: [["id_contrainte", "ASC"]] })).map((c) => ({
        gabarit: c.gabarit,
        cibles: c.cibles,
        parametres: c.parametres,
        nature: c.nature,
        insistance: c.insistance,
        statut: c.version.statut,
    }));

beforeAll(async () => {
    await resetDatabase();
    prof = await createUser("enseignant");
    const campus = await Campus.findOne({ where: { actif: true } });
    const filiere = await Filiere.create({ code_filiere: "PLR", nom_filiere: "Plages reprises" });
    const groupe = await Groupe.create({ nom_groupe: "PLR-1", niveau: "1ère année", annee: 1, effectif: 20, annee_scolaire: "2026-2027", type_groupe: "promotion", id_filiere: filiere.id_filiere });
    const salle = await Salle.create({ nom_salle: "S-PLR", type_salle: "Salle de cours", capacite: 30, id_campus: campus.id_campus });
    const cours = await Cours.create({ code_cours: "PLR-1", nom_cours: "Histoire", niveau: "1ère année", volume_horaire: 20, type_cours: "CM", semestre: "S2", id_filiere: filiere.id_filiere });
    const creneau = (jour_semaine, heure_debut, heure_fin, rang) => Creneau.create({ jour_semaine, heure_debut, heure_fin, duree_minutes: 90, rang });
    ref = {
        seance: { id_groupe: groupe.id_groupe, id_salle: salle.id_salle, id_cours: cours.id_cours, id_user_enseignant: prof.id_user },
        venMidi: await creneau("vendredi", "12:00", "13:30", 3),
        venMatin: await creneau("vendredi", "09:00", "10:30", 1),
        samApresMidi: await creneau("samedi", "14:00", "15:30", 3),
    };
});
afterAll(closeDatabase);
afterEach(async () => {
    await down({ queryInterface: queryInterface() });
    await ParametrePlanning.destroy({ where: {} });
});

describe("Migration 0081", () => {
    test("une base avec des comptes, sans réglage modifié : la pause du vendredi et le samedi après-midi", async () => {
        await up({ queryInterface: queryInterface() });
        const initiale = [{ type: "rythme", id: "initiale" }];
        expect(await reprises()).toEqual([
            { gabarit: "plage_interdite", cibles: initiale, parametres: { jours: ["vendredi"], debut: "12:30", fin: "14:30" }, nature: "impossible", insistance: null, statut: "appliquee" },
            { gabarit: "plage_a_eviter", cibles: initiale, parametres: { jours: ["samedi"], debut: "12:30", fin: "23:59" }, nature: "souhait", insistance: "beaucoup", statut: "appliquee" },
        ]);
    });

    test("les valeurs en base sont respectées ; rien à reprendre, aucune version", async () => {
        await ParametrePlanning.upsert({ cle: "pause_vendredi", valeur: { active: true, debut: "13:00", fin: "14:00" } });
        await ParametrePlanning.upsert({ cle: "samedi_apres_midi_initiale", valeur: true });
        await up({ queryInterface: queryInterface() });
        expect((await reprises()).map((c) => [c.gabarit, c.parametres])).toEqual([["plage_interdite", { jours: ["vendredi"], debut: "13:00", fin: "14:00" }]]);
        await down({ queryInterface: queryInterface() });

        await ParametrePlanning.upsert({ cle: "pause_vendredi", valeur: { active: false, debut: "12:30", fin: "14:30" } });
        await up({ queryInterface: queryInterface() });
        expect(await VersionParametres.count({ where: { libelle: LIBELLE } })).toBe(0);
    });

    test("le down retire la version reprise et ses contraintes, même retirées depuis", async () => {
        await up({ queryInterface: queryInterface() });
        const [premiere] = await ContrainteDeclaree.findAll();
        const retrait = await VersionParametres.create({ libelle: "Retrait", date_effet: "2026-11-15", statut: "appliquee" });
        await ContrainteDeclaree.create({ id_version: retrait.id_version, retire_id: premiere.id_contrainte });
        await down({ queryInterface: queryInterface() });
        expect(await reprises()).toEqual([]);
        expect(await VersionParametres.count({ where: { libelle: LIBELLE } })).toBe(0);
        await ContrainteDeclaree.destroy({ where: {} });
        await VersionParametres.destroy({ where: {} });
    });

    test("une base neuve (sans compte) ne reçoit rien", async () => {
        await sequelize.query("SET FOREIGN_KEY_CHECKS = 0");
        const [comptes] = await sequelize.query("SELECT * FROM Users");
        await sequelize.query("DELETE FROM Users");
        await up({ queryInterface: queryInterface() });
        await sequelize.getQueryInterface().bulkInsert("Users", comptes);
        await sequelize.query("SET FOREIGN_KEY_CHECKS = 1");
        expect(await VersionParametres.count()).toBe(0);
        expect(await ValeurParametre.count()).toBe(0);
    });
});

describe("La grille de démonstration", () => {
    test("les deux plages reprises ne visent aucun de ses créneaux", () => {
        const JOURS = { lundi: 1, mardi: 2, mercredi: 3, jeudi: 4, vendredi: 5, samedi: 6 };
        const minutes = (h) => Number(h.slice(0, 2)) * 60 + Number(h.slice(3, 5));
        const creneaux = Object.entries(GRILLE_HESTIM).flatMap(([jour, slots], j) =>
            slots.map((s, rang) => ({ id: 10 * j + rang, jour: JOURS[jour], debut: minutes(s.heure_debut), fin: minutes(s.heure_fin), rang: rang + 1, regime: "initiale" }))
        );
        expect(creneaux.length).toBeGreaterThan(20);
        const compilees = compilerContraintes({
            contraintes: contraintesReprises().map((c, i) => ({ ...c, id_contrainte: i + 1 })),
            probleme: { lecons: [], creneaux },
            contexte: { filiereDuCours: new Map(), feuillesDuGroupe: new Map(), racineDuGroupe: new Map() },
        });
        expect(compilees.map((k) => [k.famille, k.niveau, k.creneaux])).toEqual([
            ["PLAGE", "DUR", []],
            ["PLAGE", "SOUPLE", []],
        ]);
        expect(compilees[1].poids).toBe(100);
    });
});

describe("La saisie manuelle lit les plages déclarées (réponse 18)", () => {
    const valider = (date, creneau) => validerAffectation({ ...ref.seance, date_seance: date, id_creneau: creneau.id_creneau });

    test("plage interdite : bloquant ; plage à éviter : avertissement ; hors plage : rien", async () => {
        expect((await valider("2027-03-05", ref.venMidi)).violations).toEqual([]);
        await up({ queryInterface: queryInterface() });

        const vendredi = await valider("2027-03-05", ref.venMidi);
        expect(vendredi.bloquant).toBe(true);
        expect(vendredi.violations).toEqual([
            expect.objectContaining({ code: "plage_interdite", bloquant: true, message: "Cette séance tombe sur une plage interdite par l'école : « Pas de cours pour le rythme « initiale » le vendredi, de 12 h 30 à 14 h 30 »." }),
        ]);
        const samedi = await valider("2027-03-06", ref.samApresMidi);
        expect(samedi.bloquant).toBe(false);
        expect(samedi.violations).toEqual([expect.objectContaining({ code: "plage_a_eviter", bloquant: false })]);
        expect(samedi.violations[0].message).toMatch(/C'est un avertissement : vous pouvez la garder\.$/);
        expect((await valider("2027-03-05", ref.venMatin)).violations).toEqual([]);
    });
});
