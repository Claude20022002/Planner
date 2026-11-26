import dotenv from "dotenv";

/**
 * Fuseau horaire de l'école (M-10, plan docs/conception/qualite/qua-decalage-ecole.md) : lu une
 * seule fois dans APP_TIMEZONE, sans aucun défaut de pays. En production, une variable absente ou
 * inconnue arrête le démarrage : une date fausse et silencieuse est pire qu'un serveur arrêté
 * (réponse 2 du chef). Hors production, UTC, avec un avertissement hors des tests (réponse 5).
 * Le fuseau choisi par chaque école, quand une installation en servira de plusieurs fuseaux, est PLA-13.
 * Le fichier .env est lu ici, comme dans config/db.js : les modules sont évalués avant le
 * dotenv.config() de server.js, et dotenv ne remplace jamais une variable déjà posée.
 */
dotenv.config();

/** Vrai si le nom est un fuseau connu de la base du serveur (backend/tzdata). */
export const estFuseau = (nom) => {
    try {
        new Intl.DateTimeFormat("en-US", { timeZone: nom });
        return true;
    } catch {
        return false;
    }
};

/**
 * Le fuseau à utiliser, d'après l'environnement.
 * @param {object} [env] les variables d'environnement (process.env par défaut)
 * @param {(message: string) => void} [avertir] où écrire l'avertissement hors production
 * @returns {string} un nom de fuseau (« Africa/Kinshasa », « UTC »…)
 */
export const lireFuseau = (env = process.env, avertir = console.warn) => {
    const nom = String(env.APP_TIMEZONE ?? "").trim();
    if (nom) {
        if (!estFuseau(nom)) throw new Error(`APP_TIMEZONE inconnu : « ${nom} ». Donnez un nom de fuseau, par exemple Africa/Kinshasa.`);
        return nom;
    }
    if (env.NODE_ENV === "production") throw new Error("APP_TIMEZONE manque : donnez le fuseau de l'école, par exemple Africa/Kinshasa.");
    if (env.NODE_ENV !== "test") avertir("APP_TIMEZONE manque : l'heure de l'école est celle d'UTC (hors production seulement).");
    return "UTC";
};

/** Le fuseau de l'école, pour tout le serveur. */
export const FUSEAU_ECOLE = lireFuseau();
