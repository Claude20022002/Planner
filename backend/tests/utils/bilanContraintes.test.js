import { readFileSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { bilanDesContraintes, excesPlafond, occurrences, placer } from "../../services/moteur/contraintes/bilan.js";

// MOT-13b : bilan des contraintes déclarées après une génération (fonction pure, § 4.4), et
// concordance avec le solveur sur le fichier commun lu aussi par ConcordanceTest.java.

const RACINE = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "../../..");
const CONCORDANCE = JSON.parse(readFileSync(path.join(RACINE, "solver/src/test/resources/concordance-declarees.json"), "utf8"));

/** Le fichier commun, lu comme le serveur lit la réponse du solveur. */
const depuisLeFichier = (f) => ({
    probleme: { lecons: f.lecons, creneaux: f.creneaux },
    placements: f.lecons.map((l) => ({ id: l.id, creneauId: l.creneau?.id ?? null, salleId: l.salle?.id ?? null })),
});

describe("MOT-13b : concordance avec le solveur", () => {
    test("chaque contrainte du fichier commun compte les occurrences attendues", () => {
        const { probleme, placements } = depuisLeFichier(CONCORDANCE);
        const placees = placer({ placements, probleme });
        const comptes = Object.fromEntries(CONCORDANCE.contraintesDeclarees.map((k) => [String(k.id), occurrences(k, placees).fois]));
        expect(comptes).toEqual(CONCORDANCE.attendus);
    });
});

describe("MOT-13b : calculs du bilan", () => {
    const journee = (...plages) => plages.map(([debut, fin], i) => ({ id: `l${i}`, jour: 1, debut, fin }));

    test("plafond : séances, heures arrondies à l'heure supérieure, séances à la suite", () => {
        const trois = journee([480, 540], [550, 610], [840, 900]);
        expect(excesPlafond("SEANCES", 2, trois)).toBe(1);
        // 60 + 60 + 60 = 180 min pour un seuil de 2 h : 1 h de trop ; 181 min : 2 h
        expect(excesPlafond("HEURES", 2, trois)).toBe(1);
        expect(excesPlafond("HEURES", 2, journee([480, 541], [550, 610], [840, 900]))).toBe(2);
        // 8 h - 9 h puis 9 h 10 : à la suite ; 14 h : non
        expect(excesPlafond("SEANCES_A_LA_SUITE", 1, trois)).toBe(1);
        expect(excesPlafond("SEANCES_A_LA_SUITE", 2, trois)).toBe(0);
    });

    test("une leçon non placée n'est pas comptée ; une séance épinglée ne compte pas dans une plage de salle", () => {
        const probleme = {
            creneaux: [{ id: 1, jour: 1, debut: 480, fin: 540 }],
            lecons: [{ id: "a", longueur: 1 }, { id: "b", longueur: 1 }, { id: "pub", longueur: 1, epinglee: true }],
        };
        const placees = placer({ placements: [{ id: "a", creneauId: 1, salleId: 3 }, { id: "b", creneauId: null }, { id: "pub", creneauId: 1, salleId: 3 }], probleme });
        expect([...placees.keys()]).toEqual(["a", "pub"]);
        expect(occurrences({ famille: "PLAGE", lecons: ["a", "b"], salles: [], creneaux: [1] }, placees).fois).toBe(1);
        expect(occurrences({ famille: "PLAGE", lecons: [], salles: [3], creneaux: [1] }, placees).fois).toBe(1);
    });
});

describe("MOT-13b : le bilan d'une génération", () => {
    test("une ligne par contrainte : respectée, non respectée avec des exemples lisibles, ou sans effet", () => {
        const { probleme, placements } = depuisLeFichier(CONCORDANCE);
        const choisies = [4, 1, 12].map((id) => CONCORDANCE.contraintesDeclarees.find((k) => k.id === id));
        const contraintes = [
            { id_contrainte: 4, phrase: "Pas plus de 2 séances par jour pour les cours de Français.", nature: "souhait", insistance: "normal" },
            { id_contrainte: 1, phrase: "Pas de cours pour le groupe 6e A le lundi.", nature: "impossible", insistance: null },
            { id_contrainte: 12, phrase: "Éviter les cours le lundi matin.", nature: "souhait", insistance: "peu" },
        ];
        const libelles = new Map([["a1", "Français (6e A)"], ["a2", "Français (6e A)"], ["a3", "Français (6e A)"], ["b2", "Anglais (6e A)"]]);
        const bilan = bilanDesContraintes({ compilees: choisies, contraintes, placements, probleme, libelles });

        expect(bilan[0]).toEqual({
            id_contrainte: 4,
            phrase: "Pas plus de 2 séances par jour pour les cours de Français.",
            nature: "souhait",
            insistance: "normal",
            etat: "non_respectee",
            fois: 1,
            exemples: ["Français (6e A), lundi : trop de séances"],
        });
        expect(bilan[1]).toMatchObject({ id_contrainte: 1, etat: "non_respectee", fois: 3 });
        expect(bilan[1].exemples).toEqual(["Français (6e A), lundi 9 h", "Français (6e A), lundi 13 h 30", "Anglais (6e A), mardi 11 h"]);
        expect(bilan[2]).toMatchObject({ id_contrainte: 12, etat: "sans_effet", fois: 0, exemples: [] });
    });

    test("cinq exemples au plus ; une contrainte tenue est « respectée »", () => {
        const probleme = { creneaux: [1, 2, 3, 4, 5, 6].map((j) => ({ id: j, jour: j, debut: 480, fin: 540 })), lecons: [1, 2, 3, 4, 5, 6].map((j) => ({ id: `l${j}`, longueur: 1 })) };
        const placements = probleme.lecons.map((l, i) => ({ id: l.id, creneauId: i + 1 }));
        const toutes = { id: 1, famille: "PLAGE", niveau: "SOUPLE", poids: 10, lecons: probleme.lecons.map((l) => l.id), salles: [], creneaux: [1, 2, 3, 4, 5, 6] };
        const [ligne] = bilanDesContraintes({ compilees: [toutes], placements, probleme });
        expect(ligne).toMatchObject({ etat: "non_respectee", fois: 6 });
        expect(ligne.exemples).toHaveLength(5);
        const [tenue] = bilanDesContraintes({ compilees: [{ ...toutes, creneaux: [99] }], placements, probleme });
        expect(tenue).toMatchObject({ etat: "respectee", fois: 0 });
    });
});
