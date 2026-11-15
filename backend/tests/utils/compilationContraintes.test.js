import { aUnEffet, compilerContraintes, niveauDe } from "../../services/moteur/contraintes/compilation.js";

// MOT-13b : compilation des contraintes déclarées pour le solveur (fonction pure, § 4.2).

// Grille : lundi (1) et mardi (2), rangs 1 et 2 le matin, 3 et 4 l'après-midi ; vendredi (5) rangs 1 et 3
const creneau = (id, jour, debut, fin, rang, regime = "initiale") => ({ id, jour, debut, fin, rang, regime });
const creneaux = [
    creneau(1, 1, 510, 615, 1),
    creneau(2, 1, 630, 720, 2),
    creneau(3, 1, 810, 915, 3),
    creneau(4, 1, 930, 1020, 4),
    creneau(5, 2, 510, 615, 1),
    creneau(6, 2, 630, 720, 2),
    creneau(7, 2, 810, 915, 3),
    creneau(8, 5, 750, 840, 3),
];

// Classe 10 (racine) : demi-groupes 11 (espagnol) et 12 (allemand). Classe 20 : une seule feuille.
// Matières : 100 français, 200 espagnol, 300 allemand, 400 mathématiques
const lecon = (id, coursId, feuilles, plus = {}) => ({ id, coursId, feuilles, enseignants: [7], regime: "initiale", groupesDirects: [feuilles[0]], longueur: 1, ...plus });
const lecons = [
    lecon("fr-1", 100, [11, 12]),
    lecon("fr-2", 100, [11, 12]),
    lecon("es-1", 200, [11], { enseignants: [8] }),
    lecon("al-1", 300, [12], { enseignants: [9] }),
    lecon("ma-1", 400, [21], { regime: "continue" }),
    lecon("ma-2", 400, [21], { regime: "continue" }),
    lecon("occ-1", 100, [11, 12], { epinglee: true }),
];
const contexte = {
    filiereDuCours: new Map([[100, 1], [200, 1], [300, 1], [400, 2]]),
    feuillesDuGroupe: new Map([[10, new Set([11, 12])], [20, new Set([21])]]),
    racineDuGroupe: new Map([[10, 10], [11, 10], [12, 10], [20, 20], [21, 20]]),
};
const compiler = (...contraintes) =>
    compilerContraintes({ contraintes: contraintes.map((c, i) => ({ id_contrainte: i + 1, nature: "souhait", insistance: "normal", ...c })), probleme: { lecons, creneaux }, contexte });
const une = (c) => compiler(c)[0];

describe("MOT-13b : niveau et poids", () => {
    test("impossibilité → DUR, indispensable → MOYEN, souhait → SOUPLE au poids de départ × insistance", () => {
        expect(niveauDe({ nature: "impossible" })).toBe("DUR");
        expect(niveauDe({ nature: "souhait", insistance: "indispensable" })).toBe("MOYEN");
        const souhait = une({ gabarit: "plage_a_eviter", cibles: [{ type: "ecole", id: null }], parametres: { jours: ["lundi"], debut: "08:00", fin: "10:00" }, insistance: "beaucoup" });
        expect(souhait).toMatchObject({ id: 1, niveau: "SOUPLE", poids: 100 });
        const dur = une({ gabarit: "plage_interdite", nature: "impossible", insistance: null, cibles: [{ type: "ecole", id: null }], parametres: { jours: ["lundi"], debut: "08:00", fin: "10:00" } });
        expect(dur.niveau).toBe("DUR");
        expect(dur).not.toHaveProperty("poids");
    });
});

describe("MOT-13b : plages", () => {
    test("les créneaux qui touchent la plage, et les séances visées par chaque type de cible", () => {
        const p = { jours: ["lundi"], debut: "10:00", fin: "14:00" };
        // 10 h - 14 h touche les rangs 1 (8 h 30 - 10 h 15), 2 et 3 (13 h 30 - 15 h 15), pas le rang 4
        expect(une({ gabarit: "plage_interdite", cibles: [{ type: "ecole", id: null }], parametres: p }).creneaux).toEqual([1, 2, 3]);
        const visees = (cibles) => une({ gabarit: "plage_interdite", cibles, parametres: p }).lecons;
        expect(visees([{ type: "ecole", id: null }])).toEqual(["fr-1", "fr-2", "es-1", "al-1", "ma-1", "ma-2"]);
        expect(visees([{ type: "rythme", id: "continue" }])).toEqual(["ma-1", "ma-2"]);
        expect(visees([{ type: "filiere", id: 1 }])).toEqual(["fr-1", "fr-2", "es-1", "al-1"]);
        expect(visees([{ type: "groupe", id: 10 }])).toEqual(["fr-1", "fr-2", "es-1", "al-1"]);
        expect(visees([{ type: "matiere", id: 200 }])).toEqual(["es-1"]);
        // Une séance épinglée n'est jamais visée : elle ne bouge pas
        expect(visees([{ type: "matiere", id: 100 }])).not.toContain("occ-1");
    });

    test("une plage de salle vise des salles, aucune séance ; une plage hors de la grille est sans effet", () => {
        const salle = une({ gabarit: "plage_interdite", cibles: [{ type: "salle", id: 5 }], parametres: { jours: ["mardi"], debut: "08:00", fin: "12:00" } });
        expect(salle).toMatchObject({ famille: "PLAGE", lecons: [], salles: [5], creneaux: [5, 6] });
        expect(aUnEffet(salle)).toBe(true);
        const dimanche = une({ gabarit: "plage_a_eviter", cibles: [{ type: "ecole", id: null }], parametres: { jours: ["dimanche"], debut: "08:00", fin: "12:00" } });
        expect(dimanche.creneaux).toEqual([]);
        expect(aUnEffet(dimanche)).toBe(false);
        const personne = une({ gabarit: "plage_a_eviter", cibles: [{ type: "matiere", id: 999 }], parametres: { jours: ["lundi"], debut: "08:00", fin: "12:00" } });
        expect(personne.lecons).toEqual([]);
        expect(aUnEffet(personne)).toBe(false);
    });

    test("moment de la journée : sur deux grilles, l'autre moment ou le dernier rang de chaque jour", () => {
        const moment = (m) => une({ gabarit: "moment_de_la_journee", cibles: [{ type: "matiere", id: 400 }], parametres: { moment: m } });
        expect(moment("matin")).toMatchObject({ famille: "PLAGE", lecons: ["ma-1", "ma-2"], creneaux: [3, 4, 7, 8] });
        expect(moment("apres_midi").creneaux).toEqual([1, 2, 5, 6]);
        expect(moment("pas_en_fin_de_journee").creneaux).toEqual([4, 7, 8]);
        // Une autre grille : un seul rang par jour, qui est donc le dernier
        const autre = compilerContraintes({
            contraintes: [{ id_contrainte: 1, nature: "souhait", gabarit: "moment_de_la_journee", cibles: [{ type: "matiere", id: 400 }], parametres: { moment: "pas_en_fin_de_journee" } }],
            probleme: { lecons, creneaux: [creneau(30, 1, 480, 600, 1, "continue"), creneau(31, 2, 480, 600, 1, "continue")] },
            contexte,
        });
        expect(autre[0].creneaux).toEqual([30, 31]);
    });
});

describe("MOT-13b : paquets", () => {
    test("plafond : un paquet par feuille, sans doublon ; un par enseignant si la cible est un enseignant", () => {
        const parFeuille = une({ gabarit: "plafond_par_jour", cibles: [{ type: "groupe", id: 10 }], parametres: { quoi: "seances", seuil: 2 } });
        expect(parFeuille).toMatchObject({ famille: "PLAFOND", quoi: "SEANCES", seuil: 2 });
        expect(parFeuille.paquets).toEqual([{ a: ["fr-1", "fr-2", "es-1"] }, { a: ["fr-1", "fr-2", "al-1"] }]);
        const francais = une({ gabarit: "plafond_par_jour", cibles: [{ type: "matiere", id: 100 }], parametres: { quoi: "heures", seuil: 3 } });
        // Les deux demi-groupes suivent les mêmes séances de français : un seul paquet
        expect(francais.paquets).toEqual([{ a: ["fr-1", "fr-2"] }]);
        const prof = une({ gabarit: "plafond_par_jour", cibles: [{ type: "enseignant", id: 7 }], parametres: { quoi: "seances_a_la_suite", seuil: 2 } });
        expect(prof).toMatchObject({ quoi: "SEANCES_A_LA_SUITE", paquets: [{ a: ["fr-1", "fr-2", "ma-1", "ma-2"] }] });
    });

    test("répartition : un paquet par feuille et par matière, à partir de deux séances", () => {
        const r = une({ gabarit: "repartition", cibles: [{ type: "groupe", id: 10 }], parametres: { ecart_jours: 2 } });
        expect(r).toEqual(expect.objectContaining({ famille: "REPARTITION", ecart: 2, paquets: [{ a: ["fr-1", "fr-2"] }] }));
    });

    test("ensemble : par classe pour l'école ou une filière, par groupe visé ; seuls les paquets à deux côtés", () => {
        const langues = { matieres_a: [200], matieres_b: [300], relation: "en_meme_temps" };
        const ecole = une({ gabarit: "ensemble_ou_separe", nature: "impossible", cibles: [{ type: "ecole", id: null }], parametres: langues });
        // La classe 20 n'a ni espagnol ni allemand : pas de paquet
        expect(ecole).toMatchObject({ famille: "ENSEMBLE", niveau: "DUR", relation: "EN_MEME_TEMPS", paquets: [{ a: ["es-1"], b: ["al-1"] }] });
        const groupe = une({ gabarit: "ensemble_ou_separe", cibles: [{ type: "groupe", id: 10 }], parametres: { ...langues, relation: "jamais_a_la_suite" } });
        expect(groupe).toMatchObject({ relation: "JAMAIS_A_LA_SUITE", paquets: [{ a: ["es-1"], b: ["al-1"] }] });
        const sansEffet = une({ gabarit: "ensemble_ou_separe", cibles: [{ type: "groupe", id: 20 }], parametres: langues });
        expect(sansEffet.paquets).toEqual([]);
        expect(aUnEffet(sansEffet)).toBe(false);
    });
});
