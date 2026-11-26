import { DeleteObjectCommand, GetObjectCommand, PutObjectCommand, S3Client } from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";
import { contexteCourant } from "../../contexte/etablissement.js";
import { FORME_UID } from "../../models/bibliotheque.js";
import { ErreurMetier } from "../planning/enseignements.js";

/**
 * Stockage des fichiers de Planner dans MinIO (BIB-05, plan § 6.2 à 6.4) : le seul fichier qui
 * parle à S3. Un seul seau ; chaque objet est rangé sous le préfixe de l'école du contexte
 * (ecoles/<école>/<domaine>/<uid>), jamais d'après une donnée du client. Toute clé hors du préfixe
 * de l'école courante est refusée comme introuvable : c'est la seconde barrière, après la base de
 * l'école (D-01). Sans configuration, le stockage répond 503 sans rien tenter (échec fermé).
 */

/** Domaines rangés dans le stockage ; BIB-03 et COU-02 en ajouteront. */
export const DOMAINES = ["bibliotheque"];
export const DUREE_LIEN_SECONDES = 300;
const FORME_ECOLE = /^[a-z0-9][a-z0-9-]{0,62}$/;
const FORME_RESTE = new RegExp(`^(${DOMAINES.join("|")})/(${FORME_UID.source.slice(1, -1)})$`);

const lireConfiguration = () => {
    const { S3_ENDPOINT, S3_ADRESSE_PUBLIQUE, S3_REGION, S3_SEAU, S3_CLE_ACCES, S3_CLE_SECRETE } = process.env;
    if (!S3_ENDPOINT || !S3_CLE_ACCES || !S3_CLE_SECRETE) return null;
    return {
        interne: S3_ENDPOINT,
        publique: S3_ADRESSE_PUBLIQUE || S3_ENDPOINT,
        region: S3_REGION || "us-east-1",
        seau: S3_SEAU || "planner",
        identifiants: { accessKeyId: S3_CLE_ACCES, secretAccessKey: S3_CLE_SECRETE },
    };
};

const creerClient = (endpoint, { region, identifiants }) =>
    // forcePathStyle : MinIO sert le seau dans le chemin ; WHEN_REQUIRED : pas de somme de contrôle
    // ajoutée d'office par le SDK (d'anciens MinIO la refusent)
    new S3Client({ endpoint, region, credentials: identifiants, forcePathStyle: true, requestChecksumCalculation: "WHEN_REQUIRED", responseChecksumValidation: "WHEN_REQUIRED" });

// Clients gardés tant que la configuration ne change pas
let memoire = { empreinte: null, clients: null };
const clients = () => {
    const config = lireConfiguration();
    if (!config) throw new ErreurMetier("La Bibliothèque n'est pas encore configurée sur ce serveur", 503);
    const empreinte = JSON.stringify(config);
    if (memoire.empreinte !== empreinte) {
        memoire = { empreinte, clients: { seau: config.seau, interne: creerClient(config.interne, config), publique: creerClient(config.publique, config) } };
    }
    return memoire.clients;
};

// Envoi des commandes de dépôt et de suppression ; remplaçable dans les tests (tests/helpers/fauxS3.js)
let envoiRemplace = null;
export const definirEnvoiS3 = (fn) => {
    envoiRemplace = fn ?? null;
};

const envoyer = async (commande) => {
    const { interne } = clients();
    try {
        return await (envoiRemplace ? envoiRemplace(commande) : interne.send(commande));
    } catch {
        throw new ErreurMetier("Le stockage des fichiers ne répond pas, réessayez dans un instant", 502);
    }
};

/** Préfixe de l'école courante : « ecoles/<nom>/ » (lève HorsContexteError hors contexte, en mode strict). */
export const prefixeEcole = () => {
    const { nom } = contexteCourant();
    if (typeof nom !== "string" || !FORME_ECOLE.test(nom)) throw new Error(`Nom d'école invalide pour le stockage : ${nom}`);
    return `ecoles/${nom}/`;
};

/** Clé d'un objet dans l'école courante ; le domaine et l'uid sont contrôlés. */
export const cleObjet = (domaine, uid) => {
    if (!DOMAINES.includes(domaine)) throw new Error(`Domaine de stockage inconnu : ${domaine}`);
    if (typeof uid !== "string" || !FORME_UID.test(uid)) throw new Error("Identifiant de fichier invalide");
    return `${prefixeEcole()}${domaine}/${uid}`;
};

/** Vrai si la clé désigne un objet de l'école courante, dans un domaine connu. */
export const estDeLEcole = (cle) => {
    const prefixe = prefixeEcole();
    return typeof cle === "string" && cle.startsWith(prefixe) && FORME_RESTE.test(cle.slice(prefixe.length));
};

const exigerCleDeLEcole = (cle) => {
    if (!estDeLEcole(cle)) throw new ErreurMetier("Document introuvable", 404);
};

/**
 * Dépose un contenu vérifié (services/bibliotheque/fichiers.js) et rend sa clé. MinIO contrôle
 * l'empreinte SHA-256 à la réception : un contenu altéré en route est refusé.
 */
export const deposerObjet = async (domaine, uid, { contenu, type_mime: typeMime, empreinte }) => {
    const cle = cleObjet(domaine, uid);
    const { seau } = clients();
    await envoyer(
        new PutObjectCommand({ Bucket: seau, Key: cle, Body: contenu, ContentType: typeMime, ContentLength: contenu.length, ChecksumSHA256: Buffer.from(empreinte, "hex").toString("base64") })
    );
    return cle;
};

/**
 * Lien de téléchargement signé : une seule clé, en GET, valable 5 minutes, servi en pièce jointe
 * sous son nom d'origine. MinIO y répond aux requêtes partielles (Range) : la reprise après coupure.
 */
export const lienSigne = async (cle, { nom, type_mime: typeMime }) => {
    exigerCleDeLEcole(cle);
    const { seau, publique } = clients();
    const commande = new GetObjectCommand({
        Bucket: seau,
        Key: cle,
        ResponseContentDisposition: `attachment; filename*=UTF-8''${encodeURIComponent(nom)}`,
        ResponseContentType: typeMime,
    });
    return getSignedUrl(publique, commande, { expiresIn: DUREE_LIEN_SECONDES });
};

/** Supprime un objet de l'école courante ; un objet déjà absent n'est pas une erreur (S3). */
export const supprimerObjet = async (cle) => {
    exigerCleDeLEcole(cle);
    const { seau } = clients();
    await envoyer(new DeleteObjectCommand({ Bucket: seau, Key: cle }));
};
