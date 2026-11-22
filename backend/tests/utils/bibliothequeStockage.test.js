import { dansEtablissement, HorsContexteError } from "../../contexte/etablissement.js";
import { DUREE_LIEN_SECONDES, cleObjet, deposerObjet, estDeLEcole, lienSigne, prefixeEcole, supprimerObjet } from "../../services/bibliotheque/stockage.js";
import { empreinte } from "../../services/bibliotheque/fichiers.js";
import { configurerS3DeTest, installerFauxS3 } from "../helpers/fauxS3.js";

// Stockage de la Bibliothèque (BIB-05, plan § 6.2 et § 10) : clés par école, refus hors de l'école,
// liens signés de 5 minutes produits sans réseau, échec fermé sans configuration
const UID = "0f8e6f1c-7a3b-4c2d-9e10-123456789abc";
const UID_B = "6a1d2c3b-4e5f-4a7b-8c9d-0e1f2a3b4c5d";
const ecole = (nom) => ({ nom, sequelize: null, modeles: {} });
const dansA = (fn) => dansEtablissement(ecole("ecole-a"), fn);
const dansB = (fn) => dansEtablissement(ecole("ecole-b"), fn);
const PDF = Buffer.from("%PDF-1.7 contenu");
const fichier = { contenu: PDF, type_mime: "application/pdf", empreinte: empreinte(PDF) };

let retirerConfiguration;
let faux;

beforeEach(() => {
    retirerConfiguration = configurerS3DeTest();
    faux = installerFauxS3();
});

afterEach(() => {
    faux.retirer();
    retirerConfiguration();
    delete process.env.CONTEXTE_STRICT;
});

const statutDe = async (promesse) => {
    try {
        await promesse;
    } catch (e) {
        return e.status;
    }
    throw new Error("aucune erreur levée");
};

describe("clés par école", () => {
    test("ecoles/<école>/bibliotheque/<uid>, d'après le contexte", () => {
        expect(dansA(() => cleObjet("bibliotheque", UID))).toBe(`ecoles/ecole-a/bibliotheque/${UID}`);
        expect(dansB(() => prefixeEcole())).toBe("ecoles/ecole-b/");
    });

    test.each([
        ["domaine inconnu", () => cleObjet("devoirs", UID)],
        ["uid en majuscules", () => cleObjet("bibliotheque", UID.toUpperCase())],
        ["uid qui remonte l'arborescence", () => cleObjet("bibliotheque", "../ecole-b/bibliotheque/x")],
        ["uid absent", () => cleObjet("bibliotheque")],
    ])("%s : refusé", (_, fn) => {
        expect(() => dansA(fn)).toThrow();
    });

    test.each(["../x", "Ecole", "", "a/b", "-a"])("nom d'école invalide « %s » : refusé", (nom) => {
        expect(() => dansEtablissement(ecole(nom), () => prefixeEcole())).toThrow("Nom d'école invalide");
    });

    test("hors contexte, en mode strict : HorsContexteError", () => {
        process.env.CONTEXTE_STRICT = "true";
        expect(() => cleObjet("bibliotheque", UID)).toThrow(HorsContexteError);
    });

    test("seule une clé de l'école courante, dans un domaine connu, est reconnue", () => {
        const cleA = `ecoles/ecole-a/bibliotheque/${UID}`;
        expect(dansA(() => estDeLEcole(cleA))).toBe(true);
        expect(dansB(() => estDeLEcole(cleA))).toBe(false);
        expect(dansA(() => estDeLEcole(`ecoles/ecole-a/bibliotheque/../../ecole-b/bibliotheque/${UID_B}`))).toBe(false);
        expect(dansA(() => estDeLEcole(`ecoles/ecole-a/autre/${UID}`))).toBe(false);
        expect(dansA(() => estDeLEcole(`ecoles/ecole-a/bibliotheque/${UID}/suite`))).toBe(false);
        expect(dansA(() => estDeLEcole(`ecoles/ecole-ab/bibliotheque/${UID}`))).toBe(false);
        expect(dansA(() => estDeLEcole(null))).toBe(false);
    });
});

describe("dépôt et suppression", () => {
    test("le dépôt range l'objet sous l'école, avec son type et son empreinte", async () => {
        const cle = await dansA(() => deposerObjet("bibliotheque", UID, fichier));
        expect(cle).toBe(`ecoles/ecole-a/bibliotheque/${UID}`);
        const objet = faux.objets.get(`planner/${cle}`);
        expect(objet.contenu.equals(PDF)).toBe(true);
        expect(objet).toMatchObject({ type: "application/pdf", empreinte: Buffer.from(fichier.empreinte, "hex").toString("base64") });
    });

    test("une école ne supprime pas l'objet d'une autre : 404, objet intact, aucun appel", async () => {
        const cle = await dansA(() => deposerObjet("bibliotheque", UID, fichier));
        const appels = faux.appels.length;
        expect(await statutDe(dansB(() => supprimerObjet(cle)))).toBe(404);
        expect(faux.appels).toHaveLength(appels);
        expect(faux.objets.has(`planner/${cle}`)).toBe(true);
        await dansA(() => supprimerObjet(cle));
        expect(faux.objets.has(`planner/${cle}`)).toBe(false);
    });

    test("stockage en panne : 502", async () => {
        faux.panne();
        expect(await statutDe(dansA(() => deposerObjet("bibliotheque", UID, fichier)))).toBe(502);
    });

    test("sans configuration : 503, sans aucun appel", async () => {
        retirerConfiguration();
        delete process.env.S3_CLE_ACCES;
        expect(await statutDe(dansA(() => deposerObjet("bibliotheque", UID, fichier)))).toBe(503);
        expect(await statutDe(dansA(() => lienSigne(`ecoles/ecole-a/bibliotheque/${UID}`, { nom: "a.pdf", type_mime: "application/pdf" })))).toBe(503);
        expect(faux.appels).toHaveLength(0);
    });
});

describe("lien signé", () => {
    test("une seule clé, sur l'adresse publique, 5 minutes, en pièce jointe, sans réseau", async () => {
        const cle = `ecoles/ecole-a/bibliotheque/${UID}`;
        const lien = new URL(await dansA(() => lienSigne(cle, { nom: "Cours 1 (été).pdf", type_mime: "application/pdf" })));
        expect(lien.origin).toBe("https://fichiers.planner.test");
        expect(lien.pathname).toBe(`/planner/${cle}`);
        expect(DUREE_LIEN_SECONDES).toBe(300);
        expect(lien.searchParams.get("X-Amz-Expires")).toBe("300");
        expect(lien.searchParams.get("X-Amz-Algorithm")).toBe("AWS4-HMAC-SHA256");
        expect(lien.searchParams.get("X-Amz-SignedHeaders")).toBe("host");
        expect(lien.searchParams.get("X-Amz-Signature")).toMatch(/^[0-9a-f]{64}$/);
        expect(lien.searchParams.get("response-content-disposition")).toBe(`attachment; filename*=UTF-8''${encodeURIComponent("Cours 1 (été).pdf")}`);
        expect(lien.searchParams.get("response-content-type")).toBe("application/pdf");
        expect(lien.searchParams.get("X-Amz-Credential")).toMatch(/^cle-de-test\//);
        expect(faux.appels).toHaveLength(0);
    });

    test("une école ne signe pas le fichier d'une autre : 404", async () => {
        const cleA = `ecoles/ecole-a/bibliotheque/${UID}`;
        expect(await statutDe(dansB(() => lienSigne(cleA, { nom: "a.pdf", type_mime: "application/pdf" })))).toBe(404);
        expect(await statutDe(dansA(() => lienSigne(`ecoles/ecole-a/bibliotheque/${UID}/../x`, { nom: "a.pdf", type_mime: "application/pdf" })))).toBe(404);
    });

    test("deux fichiers, deux signatures différentes", async () => {
        const signature = async (uid) => new URL(await dansA(() => lienSigne(`ecoles/ecole-a/bibliotheque/${uid}`, { nom: "a.pdf", type_mime: "application/pdf" }))).searchParams.get("X-Amz-Signature");
        expect(await signature(UID)).not.toBe(await signature(UID_B));
    });
});
