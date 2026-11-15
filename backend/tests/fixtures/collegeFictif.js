import { compilerContraintes } from "../../services/moteur/contraintes/compilation.js";

/**
 * Générateur du collège fictif (MOT-13b, réponse 21) : une classe par niveau (6e, 5e, 4e, 3e) par
 * défaut, la 4e et la 3e dédoublées en espagnol et en allemand, avec les contraintes qu'une école
 * déclarerait. La taille se règle (`classesParNiveau`) : MOT-02 reprend ce générateur pour mesurer
 * à grande échelle. Tout est fictif et déterministe : aucun nom de personne, aucun hasard.
 *
 * Il rend le problème au format du serveur (probleme.js), les contraintes déclarées normalisées
 * (comme enVigueur.js les lit) et le contexte de la compilation. `problemePourLeSolveur` en fait le
 * fichier envoyé au solveur (solver/src/test/resources/college-fictif.json).
 */

const NIVEAUX = ["6e", "5e", "4e", "3e"];
const LETTRES = "ABCDEFGHIJ";
const AVEC_LV2 = new Set(["4e", "3e"]);

/** Heures par semaine de chaque matière, par niveau ; type de salle demandé. */
const MATIERES = [
    { code: "fr", nom: "Français", heures: { "6e": 5, "5e": 4, "4e": 4, "3e": 4 } },
    { code: "ma", nom: "Mathématiques", heures: { "6e": 4, "5e": 4, "4e": 4, "3e": 4 } },
    { code: "hg", nom: "Histoire-géographie", heures: { "6e": 3, "5e": 3, "4e": 3, "3e": 3 } },
    { code: "an", nom: "Anglais", heures: { "6e": 4, "5e": 3, "4e": 3, "3e": 3 } },
    { code: "es", nom: "Espagnol", heures: { "4e": 3, "3e": 3 }, demiGroupe: "es" },
    { code: "al", nom: "Allemand", heures: { "4e": 3, "3e": 3 }, demiGroupe: "al" },
    { code: "sv", nom: "SVT", heures: { "6e": 1, "5e": 2, "4e": 1, "3e": 1 }, salle: "Laboratoire" },
    { code: "pc", nom: "Physique-chimie", heures: { "6e": 1, "5e": 2, "4e": 2, "3e": 2 }, salle: "Laboratoire" },
    { code: "te", nom: "Technologie", heures: { "6e": 1, "5e": 2, "4e": 1, "3e": 1 }, salle: "Technologie" },
    { code: "ap", nom: "Arts plastiques", heures: { "6e": 1, "5e": 1, "4e": 1, "3e": 1 }, salle: "Arts plastiques" },
    { code: "mu", nom: "Musique", heures: { "6e": 1, "5e": 1, "4e": 1, "3e": 1 }, salle: "Musique" },
    { code: "ep", nom: "EPS", heures: { "6e": 4, "5e": 3, "4e": 3, "3e": 3 }, salle: "Gymnase" },
];

/** Grille d'un collège : 7 heures le lundi, mardi, jeudi et vendredi, le matin seulement le mercredi. */
const MATIN = [["08:00", "08:55"], ["09:00", "09:55"], ["10:05", "11:00"], ["11:05", "12:00"]];
const APRES_MIDI = [["13:30", "14:25"], ["14:30", "15:25"], ["15:35", "16:30"]];
const JOURS = [[1, [...MATIN, ...APRES_MIDI]], [2, [...MATIN, ...APRES_MIDI]], [3, MATIN], [4, [...MATIN, ...APRES_MIDI]], [5, [...MATIN, ...APRES_MIDI]]];
const minutes = (h) => Number(h.slice(0, 2)) * 60 + Number(h.slice(3, 5));

const grille = () =>
    JOURS.flatMap(([jour, heures]) =>
        heures.map(([debut, fin], i) => {
            const suivant = heures[i + 1];
            const memeDemiJournee = suivant && minutes(suivant[0]) - minutes(fin) <= 30;
            return {
                id: jour * 100 + i + 1,
                jour,
                debut: minutes(debut),
                fin: minutes(fin),
                rang: i + 1,
                regime: "initiale",
                suivantId: memeDemiJournee ? jour * 100 + i + 2 : null,
                finAvecSuivant: memeDemiJournee ? minutes(suivant[1]) : null,
            };
        })
    );

const salles = (classes) => {
    const nombre = (n) => Math.max(1, Math.ceil(n));
    const liste = [];
    // Une salle de cours par classe, plus une par classe dédoublée (les deux langues en même temps)
    const deCours = classes.length + classes.filter((c) => AVEC_LV2.has(c.niveau)).length;
    for (let i = 1; i <= deCours; i += 1) liste.push({ type: "Salle de cours", nom: `Salle ${i}`, capacite: 30 });
    for (const [type, capacite, n] of [["Laboratoire", 30, classes.length / 4], ["Technologie", 30, classes.length / 6], ["Arts plastiques", 30, classes.length / 6], ["Musique", 30, classes.length / 6], ["Gymnase", 60, classes.length / 4]]) {
        for (let i = 1; i <= nombre(n); i += 1) liste.push({ type, nom: `${type} ${i}`, capacite });
    }
    return liste.map((s, i) => ({ id: i + 1, nom: s.nom, capacite: s.capacite, type: s.type, equipements: [], campusId: 1 }));
};

/**
 * @param {object} [o] classesParNiveau (1 par défaut : 4 classes)
 * @returns {{ probleme: object, contraintes: object[], contexte: object, noms: Map<string,string> }}
 */
export const collegeFictif = ({ classesParNiveau = 1 } = {}) => {
    const classes = NIVEAUX.flatMap((niveau, n) =>
        Array.from({ length: classesParNiveau }, (_, k) => {
            const id = (n + 1) * 100 + k + 1;
            return { id, niveau, nom: `${niveau} ${LETTRES[k]}`, demi: AVEC_LV2.has(niveau) ? { es: id * 10 + 1, al: id * 10 + 2 } : null };
        })
    );
    const coursId = (niveau, m) => (NIVEAUX.indexOf(niveau) + 1) * 100 + MATIERES.indexOf(m) + 1;
    const lecons = [];
    classes.forEach((classe, rangClasse) => {
        const feuilles = classe.demi ? [classe.demi.es, classe.demi.al] : [classe.id];
        MATIERES.forEach((m, rangMatiere) => {
            const heures = m.heures[classe.niveau] ?? 0;
            if (!heures) return;
            const direct = m.demiGroupe ? classe.demi[m.demiGroupe] : classe.id;
            // Un enseignant pour deux classes de la même matière
            const enseignant = (rangMatiere + 1) * 1000 + Math.floor(rangClasse / 2);
            for (let s = 1; s <= heures; s += 1) {
                lecons.push({
                    id: `c${classe.id}-${m.code}-${s}`,
                    enseignementId: classe.id * 100 + rangMatiere + 1,
                    coursId: coursId(classe.niveau, m),
                    type: "CM",
                    regime: "initiale",
                    longueur: 1,
                    enseignants: [enseignant],
                    groupes: m.demiGroupe ? [direct, classe.id] : [classe.id, ...(classe.demi ? feuilles : [])],
                    groupesDirects: [direct],
                    feuilles: m.demiGroupe ? [direct] : feuilles,
                    effectif: m.demiGroupe ? 14 : 28,
                    typeSalleRequis: m.salle ?? null,
                    equipementsRequis: [],
                    distanciel: false,
                    epinglee: false,
                });
            }
        });
    });

    const coursDe = (code, niveaux = NIVEAUX) => niveaux.map((n) => coursId(n, MATIERES.find((m) => m.code === code)));
    const premiereClasse = (niveau) => classes.find((c) => c.niveau === niveau).id;
    const contraintes = [
        { gabarit: "ensemble_ou_separe", nature: "impossible", insistance: null, cibles: [{ type: "ecole", id: null }], parametres: { matieres_a: coursDe("es", ["4e", "3e"]), matieres_b: coursDe("al", ["4e", "3e"]), relation: "en_meme_temps" } },
        { gabarit: "plage_interdite", nature: "impossible", insistance: null, cibles: [{ type: "groupe", id: premiereClasse("6e") }], parametres: { jours: ["vendredi"], debut: "15:30", fin: "17:00" } },
        { gabarit: "plafond_par_jour", nature: "souhait", insistance: "normal", cibles: coursDe("fr").map((id) => ({ type: "matiere", id })), parametres: { quoi: "seances", seuil: 2 } },
        { gabarit: "repartition", nature: "souhait", insistance: "beaucoup", cibles: coursDe("ma").map((id) => ({ type: "matiere", id })), parametres: { ecart_jours: 1 } },
        { gabarit: "moment_de_la_journee", nature: "souhait", insistance: "peu", cibles: coursDe("ma").map((id) => ({ type: "matiere", id })), parametres: { moment: "matin" } },
        { gabarit: "ensemble_ou_separe", nature: "souhait", insistance: "normal", cibles: [{ type: "ecole", id: null }], parametres: { matieres_a: coursDe("ep"), matieres_b: coursDe("ma"), relation: "jamais_a_la_suite" } },
        { gabarit: "plage_a_eviter", nature: "souhait", insistance: "indispensable", cibles: [{ type: "groupe", id: premiereClasse("3e") }], parametres: { jours: ["lundi"], debut: "08:00", fin: "09:00" } },
        { gabarit: "plafond_par_jour", nature: "souhait", insistance: "beaucoup", cibles: [{ type: "enseignant", id: (MATIERES.findIndex((m) => m.code === "ep") + 1) * 1000 }], parametres: { quoi: "seances_a_la_suite", seuil: 3 } },
    ].map((c, i) => ({ id_contrainte: i + 1, ...c }));

    const feuillesDe = (c) => (c.demi ? [c.demi.es, c.demi.al] : [c.id]);
    const contexte = {
        filiereDuCours: new Map(lecons.map((l) => [l.coursId, 1])),
        feuillesDuGroupe: new Map(classes.map((c) => [c.id, new Set(feuillesDe(c))])),
        racineDuGroupe: new Map(classes.flatMap((c) => [c.id, ...feuillesDe(c)].map((g) => [g, c.id]))),
    };
    const noms = new Map([
        ...classes.map((c) => [`groupe:${c.id}`, c.nom]),
        ...classes.flatMap((c) => (c.demi ? [[`groupe:${c.demi.es}`, `${c.nom} espagnol`], [`groupe:${c.demi.al}`, `${c.nom} allemand`]] : [])),
        ...NIVEAUX.flatMap((n) => MATIERES.map((m) => [`matiere:${coursId(n, m)}`, `${m.nom} ${n}`])),
        ...[...new Set(lecons.flatMap((l) => l.enseignants))].map((e) => [`enseignant:${e}`, `l'enseignant ${e % 1000 + 1} de ${MATIERES[Math.floor(e / 1000) - 1].nom}`]),
    ]);
    const probleme = {
        dureeSecondes: 30,
        creneaux: grille(),
        salles: salles(classes),
        voeux: [],
        ressources: [],
        parametres: { maxMinutesJourGroupe: 480, maxMinutesJourEnseignant: 480, trajetDefautMinutes: 30, trajets: {} },
        lecons,
    };
    return { probleme, contraintes, contexte, noms };
};

/** Le fichier envoyé au solveur : le problème, ses contraintes compilées, et les poids par défaut. */
export const problemePourLeSolveur = ({ probleme, contraintes, contexte }) => ({
    ...probleme,
    poidsDesRegles: {},
    contraintesDeclarees: compilerContraintes({ contraintes, probleme, contexte }),
});

/** Texte du fichier, stable et lisible : un créneau, une salle, une leçon ou une contrainte par ligne. */
export const enTexte = (fichier) => {
    const lignes = Object.entries(fichier).map(([cle, valeur]) => {
        if (!Array.isArray(valeur) || !valeur.length) return `  ${JSON.stringify(cle)}: ${JSON.stringify(valeur)}`;
        return `  ${JSON.stringify(cle)}: [\n${valeur.map((v) => `    ${JSON.stringify(v)}`).join(",\n")}\n  ]`;
    });
    return `{\n${lignes.join(",\n")}\n}\n`;
};
