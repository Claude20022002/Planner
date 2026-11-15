import { JOURS } from "./gabarits.js";
import { minutesDe } from "./controle.js";
import { citation } from "./phrases.js";

/**
 * Contrôle de place (MOT-13, § 4.4) : les plages interdites laissent-elles assez de créneaux ?
 * Pour chaque groupe le plus fin (les séances que suivent les mêmes élèves ne se chevauchent pas),
 * et pour chaque type de salle, il compare les créneaux qui restent libres au besoin de la semaine.
 * Compté au plus large (une séance de deux créneaux compte deux créneaux libres, n'importe
 * lesquels) : un manque signalé est donc certain. Un manque dû aux seules disponibilités des
 * enseignants n'est pas signalé ici : avertissements.js le dit déjà, sans bloquer.
 * Fonction pure : elle lit le problème construit par probleme.js et les contraintes en vigueur.
 */

const rangsDe = (jours) => new Set(jours.map((j) => JOURS.indexOf(j) + 1));

/** Plages interdites compilées : jours en rangs, heures en minutes. */
const compiler = (contraintes) =>
    contraintes
        .map((c, index) => ({ ...c, index }))
        .filter((c) => c.gabarit === "plage_interdite")
        .map((c) => ({ ...c, rangs: rangsDe(c.parametres.jours), debut: minutesDe(c.parametres.debut), fin: minutesDe(c.parametres.fin) }));

const bloque = (k, creneau) => k.rangs.has(creneau.jour) && creneau.debut < k.fin && creneau.fin > k.debut;

/**
 * La contrainte concerne-t-elle cette séance ? Entre cibles d'un même type : l'une ou l'autre ;
 * entre types : toutes à la fois (« Mathématiques » et « 6e A » : les mathématiques des 6e A).
 * Une contrainte qui ne vise que des salles ne concerne aucune séance.
 */
export const concerne = (k, lecon, ctx) => {
    const parType = new Map();
    for (const x of k.cibles) parType.set(x.type, [...(parType.get(x.type) ?? []), x.id]);
    if (parType.has("salle")) return false;
    if (parType.has("ecole")) return true;
    const VOIT = {
        rythme: (id) => lecon.regime === id,
        filiere: (id) => ctx.filiereDuCours.get(lecon.coursId) === id,
        groupe: (id) => lecon.feuilles.some((f) => ctx.feuillesDuGroupe.get(id)?.has(f)),
        matiere: (id) => lecon.coursId === id,
        enseignant: (id) => lecon.enseignants.includes(id),
    };
    return [...parType].every(([type, ids]) => ids.some((id) => VOIT[type]?.(id)));
};

const phrases = (causes, contraintes) => causes.map((i) => citation(contraintes.find((c) => c.index === i).phrase));
const liste = (mots) => (mots.length <= 1 ? mots.join("") : `${mots.slice(0, -1).join(", ")} et ${mots.at(-1)}`);

/** Manque d'un ensemble de séances qui ne peuvent pas se chevaucher. */
const manqueDe = (seances, grille, plages, indisponible) => {
    const besoin = seances.reduce((t, l) => t + l.longueur, 0);
    const causes = new Set();
    let libres = 0;
    let parDisponibilites = false;
    for (const creneau of grille) {
        const ouvert = seances.some((l) => !plages.some((k) => k.concernees.has(l.id) && bloque(k, creneau)) && !indisponible(l, creneau));
        if (ouvert) {
            libres += 1;
            continue;
        }
        for (const k of plages) if (bloque(k, creneau) && seances.some((l) => k.concernees.has(l.id))) causes.add(k.index);
        if (seances.some((l) => indisponible(l, creneau))) parDisponibilites = true;
    }
    return besoin > libres && causes.size ? { besoin, libres, causes: [...causes].sort((a, b) => a - b), parDisponibilites } : null;
};

const message = (qui, m, plages) =>
    `${qui} : ${m.besoin} créneaux nécessaires par semaine, il en reste ${m.libres} à cause de ${liste(phrases(m.causes, plages))}${m.parDisponibilites ? " et des disponibilités des enseignants" : ""}. Retirez ou réduisez l'une de ces contraintes.`;

const controlerGroupes = ({ lecons, creneaux, plages, indisponible, ctx }) => {
    const refus = new Map();
    const feuilles = [...new Set(lecons.flatMap((l) => l.feuilles))];
    for (const f of feuilles) {
        const siennes = lecons.filter((l) => l.feuilles.includes(f));
        const aPlacer = siennes.filter((l) => !l.epinglee);
        if (!aPlacer.length) continue;
        const prisParEpinglees = new Set(siennes.filter((l) => l.epinglee).map((l) => l.creneau?.id));
        const regimes = new Set(aPlacer.map((l) => l.regime));
        const grille = creneaux.filter((c) => regimes.has(c.regime) && !prisParEpinglees.has(c.id));
        const nomDuGroupe = ctx.noms.get(`groupe:${f}`) ?? `groupe ${f}`;
        // Toute la journée du groupe, puis la part de chaque contrainte qui n'en vise qu'une partie
        const ensembles = [{ seances: aPlacer, qui: `Le groupe ${nomDuGroupe}` }];
        for (const k of plages) {
            const part = aPlacer.filter((l) => k.concernees.has(l.id));
            if (part.length && part.length < aPlacer.length) {
                const cours = liste([...new Set(part.map((l) => ctx.noms.get(`matiere:${l.coursId}`) ?? `matière ${l.coursId}`))]);
                ensembles.push({ seances: part, qui: `Les cours de ${cours} du groupe ${nomDuGroupe}` });
            }
        }
        for (const e of ensembles) {
            const m = manqueDe(e.seances, grille, plages, indisponible);
            if (!m) continue;
            const texte = message(e.qui, m, plages);
            if (!refus.has(texte)) refus.set(texte, { type: "groupe", id: f, besoin: m.besoin, libres: m.libres, contraintes: m.causes, message: texte });
        }
    }
    return [...refus.values()];
};

const controlerSalles = ({ lecons, creneaux, salles, plages }) => {
    const parSalle = plages.filter((k) => k.cibles.some((x) => x.type === "salle"));
    if (!parSalle.length) return [];
    const types = [...new Set(lecons.filter((l) => !l.epinglee && !l.distanciel && l.typeSalleRequis).map((l) => l.typeSalleRequis))];
    const refus = [];
    for (const type of types) {
        const demandes = lecons.filter((l) => !l.epinglee && !l.distanciel && l.typeSalleRequis === type);
        const regimes = new Set(demandes.map((l) => l.regime));
        const unites = [...new Map(creneaux.filter((c) => regimes.has(c.regime)).map((c) => [`${c.jour}|${c.debut}|${c.fin}`, c])).values()];
        const besoin = demandes.reduce((t, l) => t + l.longueur, 0);
        const causes = new Set();
        let libres = 0;
        for (const s of salles.filter((x) => x.type === type)) {
            for (const u of unites) {
                const fermant = parSalle.filter((k) => k.cibles.some((x) => x.type === "salle" && x.id === s.id) && bloque(k, u));
                if (fermant.length) fermant.forEach((k) => causes.add(k.index));
                else libres += 1;
            }
        }
        if (besoin > libres && causes.size) {
            const m = { besoin, libres, causes: [...causes].sort((a, b) => a - b), parDisponibilites: false };
            refus.push({ type: "salle", id: type, besoin, libres, contraintes: m.causes, message: message(`Les salles de type « ${type} »`, m, plages) });
        }
    }
    return refus;
};

/**
 * @param {object} o
 * @param {object[]} o.lecons séances du problème (probleme.js), épinglées comprises
 * @param {object[]} o.creneaux grille du problème ({ id, jour, debut, fin, regime })
 * @param {object[]} o.salles salles du problème ({ id, type })
 * @param {object[]} [o.voeux] vœux du problème : « INDISPONIBLE » ferme le créneau à l'enseignant
 * @param {object[]} o.contraintes contraintes en vigueur, normalisées, chacune avec sa phrase
 * @param {object} o.contexte filiereDuCours (Map), feuillesDuGroupe (Map de Set), noms (Map)
 * @returns {{ type, id, besoin, libres, contraintes: number[], message }[]} les manques certains
 */
export const controlerPlace = ({ lecons, creneaux, salles, voeux = [], contraintes, contexte }) => {
    const plages = compiler(contraintes).map((k) => ({ ...k, concernees: new Set(lecons.filter((l) => concerne(k, l, contexte)).map((l) => l.id)) }));
    if (!plages.length) return [];
    const indispos = new Set(voeux.filter((v) => v.type === "INDISPONIBLE").map((v) => `${v.enseignantId}|${v.creneauId}`));
    const indisponible = (l, c) => l.enseignants.some((e) => indispos.has(`${e}|${c.id}`));
    return [...controlerGroupes({ lecons, creneaux, plages, indisponible, ctx: contexte }), ...controlerSalles({ lecons, creneaux, salles, plages })];
};
