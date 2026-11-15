import { JOURS } from "./gabarits.js";
import { minutesDe } from "./controle.js";
import { citation } from "./phrases.js";

/**
 * Contradictions directes entre contraintes déclarées (MOT-13, § 4.4). Ce sont des avertissements :
 * le calcul arbitre deux souhaits contraires, mais l'école doit savoir qu'elle les a demandés tous
 * les deux. Fonction pure ; les contraintes sont déjà contrôlées et normalisées.
 * Ce qu'elle ne voit pas (place insuffisante au total) est l'affaire du contrôle de place.
 */

const DEBUT_APRES_MIDI = 12 * 60 + 30; // HOR.GRILLE.DEBUT_APRES_MIDI par défaut

const cleDesCibles = (cibles) =>
    cibles
        .map((x) => `${x.type}:${x.id}`)
        .sort()
        .join("|");

const memePortee = (a, b) => cleDesCibles(a.cibles) === cleDesCibles(b.cibles);

// Deux portées se recouvrent si l'une est l'école, ou si elles partagent une cible
const portesSeRecouvrent = (a, b) => {
    if ([a, b].some((c) => c.cibles.some((x) => x.type === "ecole"))) return true;
    const cles = new Set(a.cibles.map((x) => `${x.type}:${x.id}`));
    return b.cibles.some((x) => cles.has(`${x.type}:${x.id}`));
};

const paireDe = (c) => [c.parametres.matieres_a, c.parametres.matieres_b].map((l) => [...l].sort().join(",")).sort().join("/");

/** La plage à éviter couvre-t-elle tout le moment préféré, chaque jour de la grille ? */
const couvreLeMoment = (eviter, moment, creneaux) => {
    if (!creneaux?.length) return false;
    const jours = [...new Set(creneaux.map((x) => x.jour))];
    const rangs = new Set(eviter.parametres.jours.map((j) => JOURS.indexOf(j) + 1));
    if (!jours.every((j) => rangs.has(j))) return false;
    const debut = minutesDe(eviter.parametres.debut);
    const fin = minutesDe(eviter.parametres.fin);
    const premier = Math.min(...creneaux.map((x) => x.debut));
    const dernier = Math.max(...creneaux.map((x) => x.fin));
    if (moment === "matin") return debut <= premier && fin >= DEBUT_APRES_MIDI;
    if (moment === "apres_midi") return debut <= DEBUT_APRES_MIDI && fin >= dernier;
    return false;
};

const REGLES = [
    {
        code: "moments_opposes",
        voir: (a, b) =>
            a.gabarit === "moment_de_la_journee" && b.gabarit === "moment_de_la_journee" && memePortee(a, b) && new Set([a.parametres.moment, b.parametres.moment]).size === 2 && ["matin", "apres_midi"].includes(a.parametres.moment) && ["matin", "apres_midi"].includes(b.parametres.moment),
    },
    {
        code: "moment_evite",
        voir: (a, b, creneaux) => a.gabarit === "moment_de_la_journee" && b.gabarit === "plage_a_eviter" && portesSeRecouvrent(a, b) && couvreLeMoment(b, a.parametres.moment, creneaux),
    },
    {
        code: "ensemble_et_separe",
        voir: (a, b) =>
            a.gabarit === "ensemble_ou_separe" && b.gabarit === "ensemble_ou_separe" && a.parametres.relation === "en_meme_temps" && b.parametres.relation === "jamais_le_meme_jour" && paireDe(a) === paireDe(b) && portesSeRecouvrent(a, b),
    },
];

/**
 * @param {object[]} contraintes normalisées, chacune avec sa phrase (champ `phrase`)
 * @param {object[]} [creneaux] grille ({ jour: 1..7, debut, fin } en minutes), pour « moment_evite »
 * @returns {{ code, indices: number[], message }[]}
 */
export const contradictions = (contraintes, creneaux = []) => {
    const trouvees = [];
    for (let i = 0; i < contraintes.length; i += 1) {
        for (let j = 0; j < contraintes.length; j += 1) {
            if (i === j) continue;
            const [a, b] = [contraintes[i], contraintes[j]];
            for (const r of REGLES) {
                // Les règles symétriques ne se signalent qu'une fois
                if (r.code !== "moment_evite" && r.code !== "ensemble_et_separe" && j < i) continue;
                if (r.voir(a, b, creneaux)) trouvees.push({ code: r.code, indices: [i, j], message: `${citation(a.phrase)} et ${citation(b.phrase)} se contredisent.` });
            }
        }
    }
    return trouvees;
};
