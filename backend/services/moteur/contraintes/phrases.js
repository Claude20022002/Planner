/**
 * Phrase en français d'une contrainte déclarée (MOT-13) : la même phrase sert à l'écran, dans les
 * refus du contrôle et dans le bilan de la génération. Elle se calcule à la lecture, avec les noms
 * actuels des cibles : elle n'est jamais stockée. Fonctions pures.
 * Ton du plan (§ 5) : phrases courtes, ni « (s) » ni abréviation.
 */

/** Clé d'une cible dans la table des noms : « groupe:12 », « rythme:initiale », « ecole ». */
export const cleDeNom = (type, id) => (id === undefined || id === null ? type : `${type}:${id}`);

/** « 12:30 » devient « 12 h 30 », « 08:00 » devient « 8 h ». */
export const heureLisible = (h) => {
    const [heures, minutes] = String(h).split(":").map(Number);
    return minutes ? `${heures} h ${String(minutes).padStart(2, "0")}` : `${heures} h`;
};

/** « a », « a et b », « a, b et c ». */
export const enumeration = (mots) => (mots.length <= 1 ? mots.join("") : `${mots.slice(0, -1).join(", ")} et ${mots.at(-1)}`);

/** Une phrase citée dans une autre : entre guillemets, sans son point final. */
export const citation = (phrase) => `« ${String(phrase).replace(/\.$/, "")} »`;

const pluriel = (n, singulier, plurielForme = `${singulier}s`) => `${n} ${n > 1 ? plurielForme : singulier}`;

const joursLisibles = (jours) => enumeration(jours.map((j) => `le ${j}`));

const nomDe = (noms, type, id) => noms.get(cleDeNom(type, id)) ?? `${type} ${id}`;

const FORMES = {
    rythme: (n) => (n.length > 1 ? `les rythmes ${enumeration(n.map((x) => `« ${x} »`))}` : `le rythme « ${n[0]} »`),
    filiere: (n) => (n.length > 1 ? `les filières ${enumeration(n)}` : `la filière ${n[0]}`),
    groupe: (n) => (n.length > 1 ? `les groupes ${enumeration(n)}` : `le groupe ${n[0]}`),
    enseignant: (n) => enumeration(n),
    salle: (n) => (n.length > 1 ? `les salles ${enumeration(n)}` : `la salle ${n[0]}`),
};

/**
 * « les cours de Mathématiques pour le groupe 6e A », « toute l'école », « la salle B12 ».
 * Les matières passent en tête : la contrainte porte sur elles, les autres cibles en limitent la portée.
 */
export const qui = (cibles, noms) => {
    if (!cibles.length || cibles.some((c) => c.type === "ecole")) return "toute l'école";
    const parType = new Map();
    for (const c of cibles) parType.set(c.type, [...(parType.get(c.type) ?? []), nomDe(noms, c.type, c.id)]);
    const reste = [...parType].filter(([t]) => t !== "matiere").map(([t, n]) => FORMES[t](n));
    const matieres = parType.get("matiere");
    if (!matieres) return enumeration(reste);
    const cours = `les cours de ${enumeration(matieres)}`;
    return reste.length ? `${cours} pour ${enumeration(reste)}` : cours;
};

const majuscule = (texte) => texte.charAt(0).toUpperCase() + texte.slice(1);
const plage = (p) => `${joursLisibles(p.jours)}, de ${heureLisible(p.debut)} à ${heureLisible(p.fin)}`;
const matieresDe = (ids, noms) => enumeration((ids ?? []).map((id) => nomDe(noms, "matiere", id)));

const PHRASES = {
    plage_interdite: (c, q) => `Pas de cours pour ${q} ${plage(c.parametres)}.`,
    plage_a_eviter: (c, q) => `Éviter les cours pour ${q} ${plage(c.parametres)}.`,
    moment_de_la_journee: (c, q) =>
        ({
            matin: `${majuscule(q)} : plutôt le matin.`,
            apres_midi: `${majuscule(q)} : plutôt l'après-midi.`,
            pas_en_fin_de_journee: `${majuscule(q)} : pas en fin de journée.`,
        })[c.parametres.moment],
    plafond_par_jour: (c, q) => {
        const n = c.parametres.seuil;
        const quoi = { heures: `${pluriel(n, "heure")} de cours`, seances: pluriel(n, "séance"), seances_a_la_suite: `${pluriel(n, "séance")} à la suite` }[c.parametres.quoi];
        return `Pas plus de ${quoi} par jour pour ${q}.`;
    },
    repartition: (c, q) => {
        const n = c.parametres.ecart_jours;
        return n > 1 ? `${majuscule(q)} : au moins ${pluriel(n, "jour")} d'écart entre deux séances.` : `${majuscule(q)} : des séances sur des jours différents.`;
    },
    ensemble_ou_separe: (c, q, noms) => {
        const a = matieresDe(c.parametres.matieres_a, noms);
        const b = matieresDe(c.parametres.matieres_b, noms);
        const pour = q === "toute l'école" ? "" : ` pour ${q}`;
        return {
            en_meme_temps: `${a} et ${b} en même temps${pour}.`,
            jamais_le_meme_jour: `Jamais ${a} et ${b} le même jour${pour}.`,
            jamais_a_la_suite: `Jamais ${a} et ${b} à la suite${pour}.`,
        }[c.parametres.relation];
    },
};

/**
 * @param {object} contrainte { gabarit, cibles, parametres }
 * @param {Map<string,string>} [noms] libellés des cibles et des matières, par cleDeNom
 * @returns {string} la phrase, ou une phrase générique si le modèle est inconnu
 */
export const phraseDe = (contrainte, noms = new Map()) => {
    const faire = PHRASES[contrainte.gabarit];
    if (!faire) return "Contrainte d'un modèle inconnu.";
    return faire(contrainte, qui(contrainte.cibles ?? [], noms), noms);
};
