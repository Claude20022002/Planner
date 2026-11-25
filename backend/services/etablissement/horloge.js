import { FUSEAU_ECOLE } from "../../config/fuseau.js";

/**
 * Horloge de l'école (M-10) : la table des décalages de son fuseau sur UTC, changements d'heure
 * compris, calculée avec la base de fuseaux du serveur (backend/tzdata), jamais celle du navigateur
 * ou du téléphone. Le site et l'application la reçoivent dans GET /api/etablissement et calculent
 * avec elle la date et l'heure de l'école (shared/dates.js).
 */

const MINUTE_MS = 60 * 1000;
const JOUR_MS = 24 * 60 * MINUTE_MS;
const JOURS_PAR_DEFAUT = 400;

const formats = new Map();
const formatDe = (fuseau) => {
    if (!formats.has(fuseau)) formats.set(fuseau, new Intl.DateTimeFormat("en-US", { timeZone: fuseau, timeZoneName: "longOffset" }));
    return formats.get(fuseau);
};

/** Décalage du fuseau sur UTC à cet instant, en minutes (« GMT+01:00 » donne 60, « GMT » donne 0). */
export const decalageMinutes = (fuseau, instant) => {
    const nom = formatDe(fuseau).formatToParts(instant).find((p) => p.type === "timeZoneName")?.value ?? "GMT";
    const m = /GMT([+-])(\d{1,2})(?::?(\d{2}))?/.exec(nom);
    if (!m) return 0;
    return (m[1] === "-" ? -1 : 1) * (Number(m[2]) * 60 + Number(m[3] ?? 0));
};

/**
 * Table des décalages, de `jours` jours avant `autour` à `jours` jours après. Fonction pure.
 * Le décalage est lu chaque jour, puis chaque changement est cherché à la minute, par dichotomie.
 * @returns {{ depuis: string, minutes: number }[]} le décalage en vigueur à partir de chaque instant
 *   `depuis` (ISO) ; la première ligne vaut aussi pour les instants d'avant
 */
export const decalagesDe = (fuseau, autour = new Date(), jours = JOURS_PAR_DEFAUT) => {
    const debut = Math.floor((autour.getTime() - jours * JOUR_MS) / MINUTE_MS) * MINUTE_MS;
    const fin = autour.getTime() + jours * JOUR_MS;
    let courant = decalageMinutes(fuseau, new Date(debut));
    const lignes = [{ depuis: new Date(debut).toISOString(), minutes: courant }];
    for (let t = debut + JOUR_MS; t <= fin; t += JOUR_MS) {
        const suivant = decalageMinutes(fuseau, new Date(t));
        if (suivant === courant) continue;
        // Le changement est entre t - 1 jour (ancien décalage) et t (nouveau) : on le cherche à la minute
        let avant = (t - JOUR_MS) / MINUTE_MS;
        let apres = t / MINUTE_MS;
        while (apres - avant > 1) {
            const milieu = Math.floor((avant + apres) / 2);
            if (decalageMinutes(fuseau, new Date(milieu * MINUTE_MS)) === courant) avant = milieu;
            else apres = milieu;
        }
        lignes.push({ depuis: new Date(apres * MINUTE_MS).toISOString(), minutes: suivant });
        courant = suivant;
    }
    return lignes;
};

let memoire = null;
/**
 * L'horloge de l'école pour la réponse publique : fuseau, table, date du calcul. Recalculée une
 * fois par jour (UTC) : la table couvre plus d'un an de part et d'autre.
 */
export const horlogeDeLEcole = (maintenant = new Date(), fuseau = FUSEAU_ECOLE) => {
    const jour = maintenant.toISOString().slice(0, 10);
    if (memoire?.jour !== jour || memoire.fuseau !== fuseau) {
        memoire = { jour, fuseau, horloge: { fuseau, decalages: decalagesDe(fuseau, maintenant), calcule_le: maintenant.toISOString() } };
    }
    return memoire.horloge;
};
