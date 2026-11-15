import { chargerDependances, chargerParametres } from "../../services/moteur/catalogue/charger.js";
import { ciblesDuProbleme, validerValeurs } from "../../services/moteur/valeurs/validation.js";

// MOT-03 : chaque famille de liaison refuse avec une phrase, et aucune liaison du catalogue n'est oubliée.

const parametres = chargerParametres();
const dependances = chargerDependances();
const parId = new Map(parametres.map((p) => [p.id, p]));
const P = (id, etat = "saisie") => ({ ...parId.get(id), etat });

const resultatEcole = (id, valeur) => new Map([[id, { origine: "etablissement", valeur }]]);

describe("MOT-03 : requiert", () => {
    const A = "CAL.REGLE.FERMETURE";
    const B = "CAL.DATES.VACANCES";
    const base = {
        parametres: [P(A), P(B)],
        dependances: [{ type: "requiert", de: A, vers: B }],
        actives: [A],
        resultats: resultatEcole(A, true),
    };

    test("A actif, B sans valeur : refus qui nomme et dit quoi faire", () => {
        const [r] = validerValeurs({ ...base, valeurs: new Map([[A, true]]) });
        expect(r).toMatchObject({ code: "requiert_manquant", de: A, vers: B });
        expect(r.message).toMatch(/Pas de séance pendant une fermeture/);
        expect(r.message).toMatch(/Vacances/);
        expect(r.message).toMatch(/Renseignez/);
    });

    test("B encore absent du code : pas de refus", () => {
        expect(validerValeurs({ ...base, parametres: [P(A), P(B, "absent")], valeurs: new Map([[A, true]]) })).toEqual([]);
    });

    test("A règle inactive : pas de refus", () => {
        expect(validerValeurs({ ...base, actives: [], valeurs: new Map([[A, false]]) })).toEqual([]);
    });

    test("A encore au défaut catalogue : pas de refus", () => {
        expect(validerValeurs({ ...base, resultats: new Map(), valeurs: new Map([[A, true]]) })).toEqual([]);
    });
});

describe("MOT-03 : borne", () => {
    const A = "ENS.CHARGE.MAX_H_JOUR";
    const B = "REG.TRAVAIL.MAX_JOUR";
    const dep = [{ type: "borne", de: A, op: "<=", vers: B }];

    test("plafond école au-dessus du légal : refus nommé", () => {
        const [r] = validerValeurs({ parametres, dependances: dep, valeurs: new Map([[A, 600], [B, 480]]) });
        expect(r).toMatchObject({ code: "borne_depassee", de: A, vers: B });
        expect(r.message).toMatch(/Maximum d'heures par jour \(600\) doit être au plus Durée maximale quotidienne \(480\)/);
        expect(r.message).toMatch(/Abaissez/);
    });

    test("une valeur manquante : pas de refus", () => {
        expect(validerValeurs({ parametres, dependances: dep, valeurs: new Map([[A, 600]]) })).toEqual([]);
    });
});

describe("MOT-03 : exclut", () => {
    const A = "PRF.ENS.MATIN";
    const B = "PRF.ENS.APRES_MIDI";
    const dep = [{ type: "exclut", de: A, vers: B }];

    test("les deux actifs : refus", () => {
        const [r] = validerValeurs({ parametres, dependances: dep, valeurs: new Map([[A, true], [B, true]]) });
        expect(r).toMatchObject({ code: "exclusion_mutuelle" });
        expect(r.message).toMatch(/Préférence pour le matin/);
        expect(r.message).toMatch(/Désactivez/);
    });

    test("un seul actif : pas de refus", () => {
        expect(validerValeurs({ parametres, dependances: dep, valeurs: new Map([[A, true], [B, false]]) })).toEqual([]);
    });
});

describe("MOT-03 : catalogue entier", () => {
    const jeuQuiViole = (d) => {
        const a = P(d.de);
        const b = P(d.vers);
        if (d.type === "requiert") {
            return {
                parametres: [a, b],
                dependances: [d],
                valeurs: new Map([[d.de, a.role === "regle" ? true : 1]]),
                actives: a.role === "regle" ? [d.de] : [],
                resultats: resultatEcole(d.de, true),
            };
        }
        if (d.type === "exclut") return { parametres, dependances: [d], valeurs: new Map([[d.de, true], [d.vers, true]]) };
        const haut = d.op === ">=" || d.op === "!=" ? 1 : 2;
        const bas = 1;
        return { parametres, dependances: [d], valeurs: new Map([[d.de, haut], [d.vers, d.op === ">=" ? 2 : bas]]) };
    };

    const jeuSain = (d) => {
        const a = P(d.de);
        if (d.type === "requiert") {
            return {
                parametres: [a, P(d.vers)],
                dependances: [d],
                valeurs: new Map([[d.de, 1], [d.vers, 1]]),
                actives: a.role === "regle" ? [d.de] : [],
                resultats: resultatEcole(d.de, true),
            };
        }
        if (d.type === "exclut") return { parametres, dependances: [d], valeurs: new Map([[d.de, true], [d.vers, false]]) };
        return { parametres, dependances: [d], valeurs: new Map([[d.de, 1], [d.vers, d.op === "!=" ? 2 : 1]]) };
    };

    test("chaque requiert, borne et exclut a un refus et un jeu sain", () => {
        const liaisons = dependances.filter((d) => ["requiert", "borne", "exclut"].includes(d.type));
        expect(liaisons.filter((d) => d.type === "requiert")).toHaveLength(468);
        expect(liaisons.filter((d) => d.type === "borne")).toHaveLength(29);
        expect(liaisons.filter((d) => d.type === "exclut")).toHaveLength(3);
        const manques = [];
        for (const d of liaisons) {
            const refus = validerValeurs(jeuQuiViole(d)).filter((r) => r.de === d.de && r.vers === d.vers);
            const ok = validerValeurs(jeuSain(d));
            if (!refus.length) manques.push(`pas de refus : ${d.type} ${d.de} -> ${d.vers}`);
            if (ok.length) manques.push(`jeu sain refusé : ${d.type} ${d.de} -> ${d.vers}`);
        }
        expect(manques).toEqual([]);
    });
});

describe("MOT-03 : cibles du problème", () => {
    test("établissement plus les individus des leçons et des salles", () => {
        expect(ciblesDuProbleme({
            lecons: [{ enseignants: [7, 7], groupesDirects: [3], coursId: 9, salle: { id: 4 } }],
            salles: [{ id: 4 }, { id: 5 }],
        })).toEqual([{}, { enseignant: "7" }, { groupe: "3" }, { salle: "4" }, { matiere: "9" }, { salle: "5" }]);
    });
});
