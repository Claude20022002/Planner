import crypto from "node:crypto";
import { ErreurMetier } from "../planning/enseignements.js";
import { SIGNATURES, nomSur } from "../../utils/fichiers.js";

/**
 * Vérification d'un fichier déposé dans la Bibliothèque (BIB-05, plan § 6.1), reçu en corps brut :
 * PDF, Word ou PowerPoint (règle de StudyLib, StoreDocumentRequest), 20 Mo au plus. Le contenu doit
 * porter la signature de son type : un exécutable renommé en « .pdf » est refusé. Les formats
 * anciens (.doc, .ppt) sont des fichiers OLE, que utils/fichiers.js ne connaît pas.
 */

export const TAILLE_MAX_DOCUMENT = 20 * 1024 * 1024;

// En-tête des fichiers composés OLE (Word 97-2003, PowerPoint 97-2003)
const ENTETE_OLE = Buffer.from([0xd0, 0xcf, 0x11, 0xe0, 0xa1, 0xb1, 0x1a, 0xe1]);
const ole = (b) => b.length >= ENTETE_OLE.length && b.subarray(0, ENTETE_OLE.length).equals(ENTETE_OLE);

const DOCX = "application/vnd.openxmlformats-officedocument.wordprocessingml.document";
const PPTX = "application/vnd.openxmlformats-officedocument.presentationml.presentation";

export const SIGNATURES_DOCUMENT = {
    "application/pdf": SIGNATURES["application/pdf"],
    "application/msword": ole,
    [DOCX]: SIGNATURES[DOCX],
    "application/vnd.ms-powerpoint": ole,
    [PPTX]: SIGNATURES[PPTX],
};

export const TYPES_FICHIER_DOCUMENT = Object.keys(SIGNATURES_DOCUMENT);

/** Empreinte SHA-256 d'un contenu, en hexadécimal (64 caractères). */
export const empreinte = (contenu) => crypto.createHash("sha256").update(contenu).digest("hex");

/**
 * Vérifie un fichier reçu et rend { nom, type_mime, taille, contenu, empreinte }.
 * @param {{ contenu: Buffer, type: string, nom: string }} fichier
 */
export const verifierDocument = ({ contenu, type, nom }) => {
    const typeMime = String(type ?? "").split(";")[0].trim().toLowerCase();
    const signature = Object.hasOwn(SIGNATURES_DOCUMENT, typeMime) ? SIGNATURES_DOCUMENT[typeMime] : null;
    if (!signature) throw new ErreurMetier("Fichier : PDF, Word ou PowerPoint seulement", 415);
    if (!Buffer.isBuffer(contenu) || !contenu.length) throw new ErreurMetier("Le fichier est vide");
    if (contenu.length > TAILLE_MAX_DOCUMENT) throw new ErreurMetier("Fichier trop volumineux : 20 Mo au plus", 413);
    if (!signature(contenu)) throw new ErreurMetier("Le contenu du fichier ne correspond pas à son type", 415);
    return { nom: nomSur(nom), type_mime: typeMime, taille: contenu.length, contenu, empreinte: empreinte(contenu) };
};
