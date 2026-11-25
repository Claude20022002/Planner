import { DeleteObjectCommand, PutObjectCommand } from "@aws-sdk/client-s3";
import { definirEnvoiS3 } from "../../services/bibliotheque/stockage.js";

/**
 * Faux S3 en mémoire pour les tests de la Bibliothèque (BIB-05, réponse 11 du plan) : il reçoit les
 * commandes de dépôt et de suppression de services/bibliotheque/stockage.js, garde les objets par
 * « seau/clé » et note chaque appel. Les liens signés n'en ont pas besoin : le SDK les signe sans réseau.
 */

const CONFIGURATION = {
    S3_ENDPOINT: "http://minio.test:9000",
    S3_ADRESSE_PUBLIQUE: "https://fichiers.planner.test",
    S3_REGION: "us-east-1",
    S3_SEAU: "planner",
    S3_CLE_ACCES: "cle-de-test",
    S3_CLE_SECRETE: "secret-de-test-0123456789",
};

/** Pose la configuration S3 de test dans process.env et rend une fonction qui la retire. */
export const configurerS3DeTest = () => {
    const avant = Object.fromEntries(Object.keys(CONFIGURATION).map((cle) => [cle, process.env[cle]]));
    Object.assign(process.env, CONFIGURATION);
    return () => {
        for (const [cle, valeur] of Object.entries(avant)) {
            if (valeur === undefined) delete process.env[cle];
            else process.env[cle] = valeur;
        }
    };
};

/** Installe un faux S3 et le rend : { objets, appels, panne(bool), retirer() }. */
export const installerFauxS3 = () => {
    const faux = { objets: new Map(), appels: [], enPanne: false };
    faux.panne = (etat = true) => {
        faux.enPanne = etat;
    };
    definirEnvoiS3(async (commande) => {
        const { Bucket, Key } = commande.input;
        faux.appels.push({ type: commande.constructor.name, seau: Bucket, cle: Key });
        if (faux.enPanne) throw new Error("faux S3 en panne");
        if (commande instanceof PutObjectCommand) {
            faux.objets.set(`${Bucket}/${Key}`, { contenu: Buffer.from(commande.input.Body), type: commande.input.ContentType, empreinte: commande.input.ChecksumSHA256 });
            return {};
        }
        if (commande instanceof DeleteObjectCommand) {
            faux.objets.delete(`${Bucket}/${Key}`);
            return {};
        }
        throw new Error(`Commande inattendue : ${commande.constructor.name}`);
    });
    faux.retirer = () => definirEnvoiS3(null);
    return faux;
};
