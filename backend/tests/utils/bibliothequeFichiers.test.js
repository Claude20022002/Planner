import { TAILLE_MAX_DOCUMENT, TYPES_FICHIER_DOCUMENT, empreinte, verifierDocument } from "../../services/bibliotheque/fichiers.js";

// Fichiers déposés dans la Bibliothèque (BIB-05, plan § 6.1 et § 10) : cinq formats, 20 Mo, signature
const PDF = Buffer.from("%PDF-1.7\n%contenu de test\n");
const ZIP = Buffer.from([0x50, 0x4b, 0x03, 0x04, 0x14, 0x00, 0x06, 0x00]);
const OLE = Buffer.from([0xd0, 0xcf, 0x11, 0xe0, 0xa1, 0xb1, 0x1a, 0xe1, 0x00, 0x00]);
const EXE = Buffer.from("MZ\x90\x00\x03\x00\x00\x00");
const DOCX = "application/vnd.openxmlformats-officedocument.wordprocessingml.document";
const PPTX = "application/vnd.openxmlformats-officedocument.presentationml.presentation";

const statut = (fn) => {
    try {
        fn();
    } catch (e) {
        return { status: e.status, message: e.message };
    }
    throw new Error("aucune erreur levée");
};

describe("formats acceptés", () => {
    test("exactement PDF, DOC, DOCX, PPT et PPTX", () => {
        expect([...TYPES_FICHIER_DOCUMENT].sort()).toEqual(["application/msword", "application/pdf", "application/vnd.ms-powerpoint", DOCX, PPTX].sort());
    });

    test.each([
        ["PDF", "application/pdf", PDF],
        ["Word récent", DOCX, ZIP],
        ["PowerPoint récent", PPTX, ZIP],
        ["Word 97-2003", "application/msword", OLE],
        ["PowerPoint 97-2003", "application/vnd.ms-powerpoint", OLE],
    ])("%s accepté, avec son poids et son empreinte", (_, type, contenu) => {
        const fichier = verifierDocument({ contenu, type, nom: "support.bin" });
        expect(fichier).toMatchObject({ type_mime: type, taille: contenu.length, contenu, empreinte: empreinte(contenu) });
    });

    test("le type annoncé est lu sans ses paramètres ni sa casse", () => {
        expect(verifierDocument({ contenu: PDF, type: "Application/PDF; charset=binary", nom: "a.pdf" }).type_mime).toBe("application/pdf");
    });
});

describe("refus", () => {
    test.each([
        ["une image", "image/png"],
        ["un tableur", "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"],
        ["aucun type", undefined],
        ["un nom de propriété d'objet", "constructor"],
    ])("%s : 415", (_, type) => {
        expect(statut(() => verifierDocument({ contenu: PDF, type, nom: "a" })).status).toBe(415);
    });

    test("fichier vide : 400", () => {
        expect(statut(() => verifierDocument({ contenu: Buffer.alloc(0), type: "application/pdf", nom: "a.pdf" })).status).toBe(400);
        expect(statut(() => verifierDocument({ contenu: "%PDF", type: "application/pdf", nom: "a.pdf" })).status).toBe(400);
    });

    test("20 Mo exactement : accepté ; un octet de plus : 413", () => {
        const juste = Buffer.concat([PDF, Buffer.alloc(TAILLE_MAX_DOCUMENT - PDF.length)]);
        expect(verifierDocument({ contenu: juste, type: "application/pdf", nom: "a.pdf" }).taille).toBe(20 * 1024 * 1024);
        const trop = Buffer.concat([juste, Buffer.alloc(1)]);
        expect(statut(() => verifierDocument({ contenu: trop, type: "application/pdf", nom: "a.pdf" })).status).toBe(413);
    });

    test.each([
        ["exécutable renommé en PDF", "application/pdf", EXE],
        ["PDF annoncé comme Word 97-2003", "application/msword", PDF],
        ["fichier OLE annoncé comme DOCX", DOCX, OLE],
        ["PDF annoncé comme PowerPoint 97-2003", "application/vnd.ms-powerpoint", PDF],
    ])("%s : 415", (_, type, contenu) => {
        const erreur = statut(() => verifierDocument({ contenu, type, nom: "a" }));
        expect(erreur).toEqual({ status: 415, message: "Le contenu du fichier ne correspond pas à son type" });
    });
});

describe("nom et empreinte", () => {
    test("le nom perd son chemin et ses caractères de contrôle", () => {
        expect(verifierDocument({ contenu: PDF, type: "application/pdf", nom: "C:\\perso\\..\\cours\u0007 1.pdf" }).nom).toBe("cours 1.pdf");
        expect(verifierDocument({ contenu: PDF, type: "application/pdf", nom: "" }).nom).toBe("fichier");
    });

    test("SHA-256 en hexadécimal", () => {
        expect(empreinte(Buffer.from("abc"))).toBe("ba7816bf8f01cfea414140de5dae2223b00361a396177a9cb410ff61f20015ad");
    });
});
