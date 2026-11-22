import { jest } from "@jest/globals";
import { Sequelize } from "sequelize";
import sequelize from "../../config/db.js";
import { resetDatabase, closeDatabase, createUser } from "./helpers/testApp.js";
import { creerEtablissement } from "./helpers/fabriqueEtablissement.js";
import { migrateurPour } from "../../migrations/migrator.js";
import { dansEtablissement, etablissementParDefaut } from "../../contexte/etablissement.js";
import { Cours, DocumentBibliotheque, Filiere, NoteDocument, TelechargementDocument } from "../../models/index.js";
import { enregistrerDocument, lienTelechargement, supprimerDocument, trouverParUid } from "../../services/bibliotheque/documents.js";
import { configurerS3DeTest, installerFauxS3 } from "../helpers/fauxS3.js";

/**
 * BIB-05 (plan § 10) : le socle de la Bibliothèque dans deux écoles, deux bases (D-01), un seul seau.
 * L'école A est celle de config/db.js (nom « defaut »), l'école B a sa base. Une école ne lit, ne
 * signe ni ne supprime le document ou le fichier de l'autre, même avec une ligne falsifiée (PLA-04).
 */

const BASE_B = "hestim_test_bib_b";
// Deux bases à migrer en entier dans beforeAll
jest.setTimeout(180000);
const PDF = Buffer.from("%PDF-1.7\nsupport de test\n");
const fichierPdf = (nom = "cours.pdf") => ({ contenu: PDF, type: "application/pdf", nom });

let ecoleA;
let ecoleB;
let connexionB;
let faux;
let retirerConfiguration;
const dansA = (fn) => dansEtablissement(ecoleA, fn);
const dansB = (fn) => dansEtablissement(ecoleB, fn);
const comptes = {};
const cours = {};

const statutDe = async (promesse) => {
    try {
        await promesse;
    } catch (e) {
        return e.status ?? e.name;
    }
    throw new Error("aucune erreur levée");
};

const creerCours = async (code) => {
    const filiere = await Filiere.create({ code_filiere: `F-${code}`, nom_filiere: `Filière ${code}` });
    return Cours.create({ code_cours: code, nom_cours: `Cours ${code}`, niveau: "1A", volume_horaire: 20, type_cours: "CM", semestre: "S1", id_filiere: filiere.id_filiere });
};

const depot = (ecole, role, donnees = {}) => (ecole === "A" ? dansA : dansB)(() => enregistrerDocument(comptes[ecole][role], fichierPdf(), { id_cours: cours[ecole].id_cours, type: "cours", titre: `Support de ${ecole}`, ...donnees }));

beforeAll(async () => {
    retirerConfiguration = configurerS3DeTest();
    await resetDatabase();
    await sequelize.query(`DROP DATABASE IF EXISTS \`${BASE_B}\``);
    await sequelize.query(`CREATE DATABASE \`${BASE_B}\``);
    const { username, password } = sequelize.config;
    connexionB = new Sequelize(BASE_B, username, password, { ...sequelize.options, logging: false });
    await migrateurPour(connexionB).up();
    ecoleA = etablissementParDefaut();
    ecoleB = creerEtablissement("b", connexionB);

    for (const [ecole, dans] of [["A", dansA], ["B", dansB]]) {
        comptes[ecole] = {
            enseignant: await dans(() => createUser("enseignant")),
            etudiant: await dans(() => createUser("etudiant")),
            admin: await dans(() => createUser("admin")),
        };
        cours[ecole] = await dans(() => creerCours(`BIB-${ecole}`));
    }
});

afterAll(async () => {
    retirerConfiguration();
    await sequelize.query(`DROP DATABASE IF EXISTS \`${BASE_B}\``);
    await connexionB?.close();
    await closeDatabase();
});

beforeEach(async () => {
    faux = installerFauxS3();
    for (const dans of [dansA, dansB]) await dans(() => DocumentBibliotheque.destroy({ where: {} }));
});

afterEach(() => faux?.retirer());

describe("dépôt", () => {
    test("enseignant et administration publient ; l'étudiant attend la modération", async () => {
        expect((await depot("A", "enseignant")).statut).toBe("publie");
        expect((await depot("A", "admin")).statut).toBe("publie");
        expect((await depot("A", "etudiant")).statut).toBe("en_attente");
    });

    test("la ligne garde l'uid, le poids, l'empreinte et la clé sous le préfixe de l'école", async () => {
        const document = await depot("A", "enseignant");
        expect(document.uid).toMatch(/^[0-9a-f-]{36}$/);
        expect(document).toMatchObject({ taille: PDF.length, nom_fichier: "cours.pdf", type_mime: "application/pdf", cle_fichier: `ecoles/defaut/bibliotheque/${document.uid}` });
        expect(document.empreinte_sha256).toMatch(/^[0-9a-f]{64}$/);
        expect(faux.objets.has(`planner/${document.cle_fichier}`)).toBe(true);
        const documentB = await depot("B", "enseignant");
        expect(documentB.cle_fichier).toBe(`ecoles/b/bibliotheque/${documentB.uid}`);
    });

    test("un rôle inconnu, un cours d'une autre école ou un champ invalide : refus, aucun fichier déposé", async () => {
        expect(await statutDe(dansA(() => enregistrerDocument({ id_user: 1, role: "parent" }, fichierPdf(), { id_cours: cours.A.id_cours, type: "cours", titre: "x" })))).toBe(403);
        const coursInconnu = Math.max(cours.A.id_cours, cours.B.id_cours) + 100;
        expect(await statutDe(depot("A", "enseignant", { id_cours: coursInconnu }))).toBe(400);
        expect(await statutDe(depot("A", "enseignant", { type: "roman" }))).toBe("SequelizeValidationError");
        expect(await statutDe(depot("A", "enseignant", { titre: "  " }))).toBe("SequelizeValidationError");
        expect(faux.appels).toHaveLength(0);
    });

    test("si l'écriture échoue après le dépôt, le fichier est effacé", async () => {
        await depot("A", "enseignant", { origine: "import:test-1" });
        expect(await statutDe(depot("A", "enseignant", { origine: "import:test-1" }))).toBe("SequelizeUniqueConstraintError");
        expect(faux.appels.map((a) => a.type)).toEqual(["PutObjectCommand", "PutObjectCommand", "DeleteObjectCommand"]);
        expect(faux.objets.size).toBe(1);
    });

    test("la reprise peut garder l'uid d'origine", async () => {
        const uid = "9b2f3c4d-5e6f-7a8b-9c0d-1e2f3a4b5c6d";
        expect((await depot("A", "admin", { uid, origine: `studylib:${uid}` })).cle_fichier).toBe(`ecoles/defaut/bibliotheque/${uid}`);
    });
});

describe("isolation entre deux écoles (PLA-04)", () => {
    test("une école ne trouve pas le document de l'autre", async () => {
        const documentA = await depot("A", "enseignant");
        expect(await dansB(() => trouverParUid(documentA.uid))).toBeNull();
        expect((await dansA(() => trouverParUid(documentA.uid))).id_document).toBe(documentA.id_document);
        expect(await dansA(() => trouverParUid("pas-un-uid"))).toBeNull();
    });

    // Ligne falsifiée : la clé du fichier de A, avec le numéro d'un document de B (le pire cas)
    const falsifiee = (documentA, documentB) => ({ ...documentA.get(), id_document: documentB.id_document });

    test("avec la ligne de A, B ne signe pas : 404, rien n'est noté", async () => {
        const documentA = await depot("A", "enseignant");
        const documentB = await depot("B", "enseignant");
        expect(await statutDe(dansB(() => lienTelechargement(documentA, comptes.B.etudiant)))).toBe(404);
        expect(await statutDe(dansB(() => lienTelechargement(falsifiee(documentA, documentB), comptes.B.etudiant)))).toBe(404);
        expect(await dansB(() => TelechargementDocument.count())).toBe(0);
        expect((await dansB(() => DocumentBibliotheque.findByPk(documentB.id_document))).telechargements).toBe(0);
    });

    test("avec la ligne de A, B ne supprime rien : ni le fichier de A, ni sa propre ligne de même numéro", async () => {
        const documentA = await depot("A", "enseignant");
        const documentB = await depot("B", "enseignant");
        expect(await statutDe(dansB(() => supprimerDocument(documentA)))).toBe(404);
        expect(await statutDe(dansB(() => supprimerDocument(falsifiee(documentA, documentB))))).toBe(404);
        expect(faux.objets.has(`planner/${documentA.cle_fichier}`)).toBe(true);
        expect(await dansB(() => DocumentBibliotheque.findByPk(documentB.id_document))).not.toBeNull();
        expect(await dansA(() => DocumentBibliotheque.findByPk(documentA.id_document))).not.toBeNull();
    });
});

describe("téléchargement et suppression", () => {
    test("le lien est signé, le téléchargement noté sans IP, le compteur augmenté", async () => {
        const document = await depot("A", "enseignant");
        const lien = await dansA(() => lienTelechargement(document, comptes.A.etudiant));
        expect(lien).toMatchObject({ expire_dans: 300, taille: PDF.length, nom: "cours.pdf", type_mime: "application/pdf" });
        expect(new URL(lien.url).pathname).toBe(`/planner/${document.cle_fichier}`);
        const journal = await dansA(() => TelechargementDocument.findAll({ raw: true }));
        expect(journal).toHaveLength(1);
        expect(Object.keys(journal[0]).sort()).toEqual(["createdAt", "id_document", "id_telechargement", "id_user"]);
        expect(journal[0].id_user).toBe(comptes.A.etudiant.id_user);
        expect((await dansA(() => DocumentBibliotheque.findByPk(document.id_document))).telechargements).toBe(1);
    });

    test("la suppression retire la ligne, ses notes, ses téléchargements, puis le fichier", async () => {
        const document = await depot("A", "enseignant");
        await dansA(() => NoteDocument.create({ id_document: document.id_document, id_user: comptes.A.etudiant.id_user, note: 4 }));
        await dansA(() => lienTelechargement(document, comptes.A.etudiant));
        await dansA(() => supprimerDocument(document));
        expect(await dansA(() => DocumentBibliotheque.count())).toBe(0);
        expect(await dansA(() => NoteDocument.count())).toBe(0);
        expect(await dansA(() => TelechargementDocument.count())).toBe(0);
        expect(faux.objets.has(`planner/${document.cle_fichier}`)).toBe(false);
    });

    test("fichier déjà absent : la suppression aboutit ; stockage en panne : rien n'est supprimé", async () => {
        const absent = await depot("A", "enseignant");
        faux.objets.clear();
        await dansA(() => supprimerDocument(absent));
        expect(await dansA(() => DocumentBibliotheque.count())).toBe(0);

        const garde = await depot("A", "enseignant");
        faux.panne();
        expect(await statutDe(dansA(() => supprimerDocument(garde)))).toBe(502);
        expect(await dansA(() => DocumentBibliotheque.count())).toBe(1);
    });

    test("une note hors de 1 à 5 est refusée", async () => {
        const document = await depot("A", "enseignant");
        for (const note of [0, 6, 2.5]) {
            expect(await statutDe(dansA(() => NoteDocument.create({ id_document: document.id_document, id_user: comptes.A.etudiant.id_user, note })))).toBe("SequelizeValidationError");
        }
    });
});

describe("migration 0087", () => {
    test("down puis up sur la base de B : les trois tables partent et reviennent", async () => {
        const tables = async () => (await connexionB.query("SELECT TABLE_NAME AS t FROM information_schema.TABLES WHERE TABLE_SCHEMA = DATABASE() AND TABLE_NAME IN ('DocumentsBibliotheque', 'NotesDocuments', 'TelechargementsDocuments')"))[0].map((l) => l.t).sort();
        expect(await tables()).toEqual(["DocumentsBibliotheque", "NotesDocuments", "TelechargementsDocuments"]);
        await migrateurPour(connexionB).down({ to: "0087-bibliotheque.js" });
        expect(await tables()).toEqual([]);
        await migrateurPour(connexionB).up();
        expect(await tables()).toEqual(["DocumentsBibliotheque", "NotesDocuments", "TelechargementsDocuments"]);
    });
});
