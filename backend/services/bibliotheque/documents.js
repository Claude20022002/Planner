import crypto from "node:crypto";
import { Cours, DocumentBibliotheque, TelechargementDocument } from "../../models/index.js";
import { enTransaction } from "../../models/acces.js";
import { FORME_UID } from "../../models/bibliotheque.js";
import { ErreurMetier } from "../planning/enseignements.js";
import { verifierDocument } from "./fichiers.js";
import { DUREE_LIEN_SECONDES, deposerObjet, lienSigne, supprimerObjet } from "./stockage.js";

/**
 * Service interne de la Bibliothèque (BIB-05, plan § 6.1), appelé par l'API (BIB-06) et par l'espace
 * de cours (BIB-07). Tout se passe dans l'école du contexte : la ligne dans sa base (D-01), le
 * fichier sous son préfixe (stockage.js). Les droits complets (qui voit, modère, note) sont dans
 * BIB-06 ; ce service ne garde que deux règles : seuls les trois rôles de Planner déposent, et le
 * statut suit le rôle (publication directe pour l'enseignant et l'administration, comme StudyLib).
 */

const ROLES_DEPOSANTS = ["admin", "enseignant", "etudiant"];

/** Statut d'un dépôt selon le rôle de l'auteur : l'étudiant passe par la modération. */
export const statutDuDepot = (role) => (role === "etudiant" ? "en_attente" : "publie");

/**
 * Enregistre un document : vérifie le fichier et les champs, dépose le fichier, puis écrit la ligne.
 * Si l'écriture échoue, le fichier déposé est effacé. `uid` n'est fourni que par la reprise (BIB-08),
 * pour garder l'identifiant de StudyLib ; sinon il est tiré au hasard.
 * @param {{ id_user: number, role: string }} auteur
 * @param {{ contenu: Buffer, type: string, nom: string }} fichier
 * @param {{ id_cours: number, type: string, titre: string, description?: string, annee_concernee?: number, portee?: string, origine?: string, uid?: string }} donnees
 */
export const enregistrerDocument = async (auteur, fichier, donnees) => {
    if (!ROLES_DEPOSANTS.includes(auteur?.role)) throw new ErreurMetier("Vous ne pouvez pas déposer de document dans la Bibliothèque", 403);
    const verifie = verifierDocument(fichier);
    const cours = Number.isInteger(Number(donnees.id_cours)) ? await Cours.findByPk(Number(donnees.id_cours), { attributes: ["id_cours"] }) : null;
    if (!cours) throw new ErreurMetier("Choisissez un cours de l'école", 400);

    const uid = donnees.uid ?? crypto.randomUUID();
    const document = DocumentBibliotheque.build({
        uid,
        id_cours: cours.id_cours,
        id_user_auteur: auteur.id_user ?? null,
        type: donnees.type,
        titre: typeof donnees.titre === "string" ? donnees.titre.trim() : donnees.titre,
        description: donnees.description?.trim() || null,
        annee_concernee: donnees.annee_concernee ?? null,
        statut: statutDuDepot(auteur.role),
        portee: donnees.portee ?? "ecole",
        origine: donnees.origine ?? null,
        // Clé provisoire : la vraie vient du dépôt, qui n'a lieu qu'après la validation des champs
        cle_fichier: "-",
        nom_fichier: verifie.nom,
        type_mime: verifie.type_mime,
        taille: verifie.taille,
        empreinte_sha256: verifie.empreinte,
    });
    await document.validate();

    document.cle_fichier = await deposerObjet("bibliotheque", uid, verifie);
    try {
        return await document.save();
    } catch (erreur) {
        await supprimerObjet(document.cle_fichier).catch(() => {});
        throw erreur;
    }
};

/** Le document de l'école courante qui porte cet uid, ou null (y compris pour un uid mal formé). */
export const trouverParUid = (uid) => (typeof uid === "string" && FORME_UID.test(uid) ? DocumentBibliotheque.findOne({ where: { uid } }) : Promise.resolve(null));

/**
 * Lien signé du fichier, pour un utilisateur dont l'appelant a vérifié les droits ; note le
 * téléchargement (compte et date, sans IP) et compte un téléchargement de plus. Rend aussi le poids,
 * pour l'afficher avant de télécharger (N3).
 */
export const lienTelechargement = async (document, utilisateur) => {
    const url = await lienSigne(document.cle_fichier, { nom: document.nom_fichier, type_mime: document.type_mime });
    await enTransaction(async (transaction) => {
        await TelechargementDocument.create({ id_document: document.id_document, id_user: utilisateur?.id_user ?? null }, { transaction });
        await DocumentBibliotheque.increment("telechargements", { where: { id_document: document.id_document }, transaction });
    });
    return { url, expire_dans: DUREE_LIEN_SECONDES, nom: document.nom_fichier, type_mime: document.type_mime, taille: document.taille };
};

/**
 * Supprime un document pour de bon (réponse 10) : la ligne, ses notes et ses téléchargements (en
 * cascade dans la base), puis le fichier. Si le stockage refuse, rien n'est supprimé.
 */
export const supprimerDocument = (document) =>
    enTransaction(async (transaction) => {
        await DocumentBibliotheque.destroy({ where: { id_document: document.id_document }, transaction });
        await supprimerObjet(document.cle_fichier);
    });
