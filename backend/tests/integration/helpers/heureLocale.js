import { FUSEAU_ECOLE as FUSEAU } from "../../../config/fuseau.js";

/**
 * Instants des tests à l'heure de l'école. Le décalage d'un fuseau peut changer (un pays passe à
 * UTC+0 toute l'année, par exemple) : un test qui écrit « +01:00 » en dur passe avec une tzdata
 * ancienne et échoue avec la bonne. Le fuseau est celui du serveur (config/fuseau.js, M-10). On part donc de l'heure locale voulue.
 */

const commeSiUtc = (instant) => {
    const p = Object.fromEntries(
        new Intl.DateTimeFormat("en-CA", { timeZone: FUSEAU, hourCycle: "h23", year: "numeric", month: "2-digit", day: "2-digit", hour: "2-digit", minute: "2-digit", second: "2-digit" })
            .formatToParts(instant)
            .map((x) => [x.type, x.value])
    );
    return Date.UTC(Number(p.year), Number(p.month) - 1, Number(p.day), Number(p.hour), Number(p.minute), Number(p.second));
};

/** Rend l'instant où il est `heure` (« 10:40 ») le `jour` (« 2027-01-04 ») à l'heure de l'école. */
export const aLHeureDeLEcole = (jour, heure) => {
    const naif = Date.parse(`${jour}T${heure}:00Z`);
    return new Date(naif - (commeSiUtc(new Date(naif)) - naif));
};
