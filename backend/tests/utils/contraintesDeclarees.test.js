import { chargerDependances, chargerParametres } from "../../services/moteur/catalogue/charger.js";
import { contradictions } from "../../services/moteur/contraintes/contradictions.js";
import { controlerContrainte } from "../../services/moteur/contraintes/controle.js";
import { GABARITS, decrireGabarits, natureAdmise, poidsDe } from "../../services/moteur/contraintes/gabarits.js";
import { controlerPlace } from "../../services/moteur/contraintes/place.js";
import { heureLisible, phraseDe } from "../../services/moteur/contraintes/phrases.js";

// MOT-13a : modèles, phrases, contrôles, contradictions et contrôle de place (fonctions pures).

const parametres = chargerParametres();
const dependances = chargerDependances();
const plage = (cibles, jours, debut, fin, plus = {}) => ({ gabarit: "plage_interdite", cibles, parametres: { jours, debut, fin }, ...plus });
const refusDe = (c, ctx) => controlerContrainte(c, ctx).violations.map((v) => v.code);

describe("MOT-13a : les modèles", () => {
    test("chaque règle citée par un modèle existe dans le catalogue, et c'est bien une règle", () => {
        const ids = new Map(parametres.map((p) => [p.id, p]));
        for (const [code, g] of Object.entries(GABARITS)) {
            for (const r of g.regles) {
                expect([code, r, ids.get(r)?.role]).toEqual([code, r, "regle"]);
            }
        }
    });

    test("les six modèles couvrent 22 règles distinctes du catalogue", () => {
        expect(Object.keys(GABARITS)).toHaveLength(6);
        expect(new Set(Object.values(GABARITS).flatMap((g) => g.regles)).size).toBe(22);
    });

    test("aucun modèle ne double les disponibilités ni les vœux d'un enseignant (EP-5)", () => {
        for (const code of ["plage_interdite", "plage_a_eviter", "moment_de_la_journee"]) expect(GABARITS[code].cibles).not.toContain("enseignant");
        expect(Object.values(GABARITS).flatMap((g) => g.regles).filter((r) => r.startsWith("PRF.ENS."))).toEqual([]);
    });

    test("impossibilité : seulement un plafond d'heures, ou « en même temps »", () => {
        expect(natureAdmise("plage_interdite", "impossible")).toBe(true);
        expect(natureAdmise("plage_a_eviter", "impossible")).toBe(false);
        expect(natureAdmise("plafond_par_jour", "impossible", { quoi: "heures" })).toBe(true);
        expect(natureAdmise("plafond_par_jour", "impossible", { quoi: "seances" })).toBe(false);
        expect(natureAdmise("ensemble_ou_separe", "impossible", { relation: "en_meme_temps" })).toBe(true);
        expect(natureAdmise("ensemble_ou_separe", "impossible", { relation: "jamais_a_la_suite" })).toBe(false);
    });

    test("poids : départ × insistance ; rien pour « indispensable » ni pour une impossibilité", () => {
        expect(poidsDe({ gabarit: "plage_a_eviter", nature: "souhait", insistance: "peu" })).toBe(10);
        expect(poidsDe({ gabarit: "plage_a_eviter", nature: "souhait", insistance: "beaucoup" })).toBe(100);
        expect(poidsDe({ gabarit: "plage_a_eviter", nature: "souhait", insistance: "indispensable" })).toBeNull();
        expect(poidsDe({ gabarit: "plage_interdite", nature: "impossible" })).toBeNull();
    });

    test("la description publique donne les champs et les insistances", () => {
        const d = decrireGabarits().find((g) => g.code === "plage_interdite");
        expect(d.champs.map((c) => c.cle)).toEqual(["jours", "debut", "fin"]);
        expect(d.insistances).toEqual([]);
        expect(decrireGabarits().find((g) => g.code === "repartition").insistances).toEqual(["peu", "normal", "beaucoup", "indispensable"]);
    });
});

describe("MOT-13a : les phrases", () => {
    const noms = new Map([["groupe:1", "6e A"], ["groupe:2", "6e B"], ["matiere:5", "Mathématiques"], ["matiere:6", "Espagnol"], ["matiere:7", "Allemand"], ["salle:3", "B12"], ["enseignant:9", "Mme Martin"]]);

    test("heures lisibles", () => {
        expect(heureLisible("08:00")).toBe("8 h");
        expect(heureLisible("12:30")).toBe("12 h 30");
    });

    test("une phrase par modèle, sans « (s) »", () => {
        const cas = [
            [plage([{ type: "groupe", id: 1 }], ["mercredi"], "12:00", "18:00"), "Pas de cours pour le groupe 6e A le mercredi, de 12 h à 18 h."],
            [{ gabarit: "plage_a_eviter", cibles: [{ type: "ecole", id: null }], parametres: { jours: ["vendredi", "samedi"], debut: "16:30", fin: "19:00" } }, "Éviter les cours pour toute l'école le vendredi et le samedi, de 16 h 30 à 19 h."],
            [{ gabarit: "moment_de_la_journee", cibles: [{ type: "matiere", id: 5 }, { type: "groupe", id: 1 }, { type: "groupe", id: 2 }], parametres: { moment: "matin" } }, "Les cours de Mathématiques pour les groupes 6e A et 6e B : plutôt le matin."],
            [{ gabarit: "plafond_par_jour", cibles: [{ type: "enseignant", id: 9 }], parametres: { quoi: "seances_a_la_suite", seuil: 1 } }, "Pas plus de 1 séance à la suite par jour pour Mme Martin."],
            [{ gabarit: "plafond_par_jour", cibles: [{ type: "groupe", id: 1 }], parametres: { quoi: "heures", seuil: 6 } }, "Pas plus de 6 heures de cours par jour pour le groupe 6e A."],
            [{ gabarit: "repartition", cibles: [{ type: "matiere", id: 5 }], parametres: { ecart_jours: 2 } }, "Les cours de Mathématiques : au moins 2 jours d'écart entre deux séances."],
            [{ gabarit: "ensemble_ou_separe", cibles: [{ type: "groupe", id: 1 }], parametres: { matieres_a: [6], matieres_b: [7], relation: "en_meme_temps" } }, "Espagnol et Allemand en même temps pour le groupe 6e A."],
            [plage([{ type: "salle", id: 3 }], ["lundi"], "08:00", "10:00"), "Pas de cours pour la salle B12 le lundi, de 8 h à 10 h."],
        ];
        for (const [c, attendu] of cas) expect(phraseDe(c, noms)).toBe(attendu);
    });
});

describe("MOT-13a : le contrôle d'une contrainte", () => {
    test("une plage interdite valide passe, en impossibilité, sans insistance", () => {
        const r = controlerContrainte(plage([{ type: "groupe", id: 1 }], ["mercredi"], "12:00", "18:00"));
        expect(r.violations).toEqual([]);
        expect(r.contrainte).toMatchObject({ nature: "impossible", insistance: null });
    });

    test("un souhait prend « normal » par défaut", () => {
        const r = controlerContrainte({ gabarit: "repartition", cibles: [{ type: "matiere", id: "5" }], parametres: { ecart_jours: 1 } });
        expect(r.violations).toEqual([]);
        expect(r.contrainte).toMatchObject({ nature: "souhait", insistance: "normal", cibles: [{ type: "matiere", id: 5 }] });
    });

    test("chaque refus a son code", () => {
        expect(refusDe({ gabarit: "inconnu" })).toEqual(["gabarit_inconnu"]);
        expect(refusDe(plage([], ["lundi"], "08:00", "10:00"))).toContain("cibles_vides");
        expect(refusDe(plage([{ type: "enseignant", id: 9 }], ["lundi"], "08:00", "10:00"))).toContain("cible_interdite");
        expect(refusDe(plage([{ type: "groupe", id: 0 }], ["lundi"], "08:00", "10:00"))).toContain("cible_invalide");
        expect(refusDe(plage([{ type: "groupe", id: 1 }, { type: "groupe", id: 1 }], ["lundi"], "08:00", "10:00"))).toContain("doublon");
        expect(refusDe(plage([{ type: "ecole", id: null }, { type: "groupe", id: 1 }], ["lundi"], "08:00", "10:00"))).toContain("cibles_incompatibles");
        expect(refusDe(plage([{ type: "salle", id: 3 }, { type: "groupe", id: 1 }], ["lundi"], "08:00", "10:00"))).toContain("cibles_incompatibles");
        expect(refusDe(plage([{ type: "groupe", id: 1 }], ["lundi", "lundi"], "08:00", "10:00"))).toContain("champ_invalide");
        expect(refusDe(plage([{ type: "groupe", id: 1 }], ["lundi"], "8h", "10:00"))).toContain("champ_invalide");
        expect(refusDe(plage([{ type: "groupe", id: 1 }], ["lundi"], "10:00", "08:00"))).toContain("plage_inversee");
        expect(refusDe({ gabarit: "plage_interdite", cibles: [{ type: "groupe", id: 1 }], parametres: { jours: ["lundi"], debut: "08:00" } })).toContain("champ_manquant");
        expect(refusDe(plage([{ type: "groupe", id: 1 }], ["lundi"], "08:00", "10:00", { parametres: { jours: ["lundi"], debut: "08:00", fin: "10:00", couleur: "bleu" } }))).toContain("champ_inconnu");
        expect(refusDe({ gabarit: "moment_de_la_journee", cibles: [{ type: "matiere", id: 5 }], parametres: { moment: "soir" } })).toContain("hors_liste");
        expect(refusDe({ gabarit: "repartition", cibles: [{ type: "matiere", id: 5 }], parametres: { ecart_jours: 9 } })).toContain("champ_invalide");
        expect(refusDe({ gabarit: "ensemble_ou_separe", cibles: [{ type: "groupe", id: 1 }], parametres: { matieres_a: [6], matieres_b: [6], relation: "en_meme_temps" } })).toContain("matieres_communes");
    });

    test("nature et insistance : D-09 tient", () => {
        expect(refusDe({ gabarit: "plage_a_eviter", nature: "impossible", cibles: [{ type: "groupe", id: 1 }], parametres: { jours: ["lundi"], debut: "08:00", fin: "10:00" } })).toContain("nature_interdite");
        expect(refusDe({ gabarit: "plafond_par_jour", nature: "impossible", cibles: [{ type: "groupe", id: 1 }], parametres: { quoi: "seances", seuil: 2 } })).toContain("nature_interdite");
        expect(refusDe(plage([{ type: "groupe", id: 1 }], ["lundi"], "08:00", "10:00", { insistance: "beaucoup" }))).toContain("insistance_interdite");
        expect(refusDe({ gabarit: "repartition", cibles: [{ type: "matiere", id: 5 }], parametres: { ecart_jours: 1 }, insistance: "énormément" })).toContain("hors_liste");
    });

    test("un plafond d'heures ne dépasse pas la borne en vigueur", () => {
        const valeurs = new Map([["REG.TRAVAIL.MAX_JOUR", 480]]);
        const plafond = (seuil) => ({ gabarit: "plafond_par_jour", nature: "impossible", cibles: [{ type: "enseignant", id: 9 }], parametres: { quoi: "heures", seuil } });
        expect(refusDe(plafond(9), { valeurs, dependances, nomDe: () => "Durée maximale de travail par jour" })).toEqual(["borne_depassee"]);
        expect(refusDe(plafond(8), { valeurs, dependances })).toEqual([]);
    });

    test("une plage hors de la grille est signalée sans effet, sans être refusée", () => {
        const creneaux = [{ jour: 1, debut: 480, fin: 600 }];
        const r = controlerContrainte(plage([{ type: "groupe", id: 1 }], ["dimanche"], "08:00", "10:00"), { creneaux });
        expect(r.violations).toEqual([]);
        expect(r.avertissements.map((a) => a.code)).toEqual(["plage_sans_effet"]);
        expect(controlerContrainte(plage([{ type: "groupe", id: 1 }], ["lundi"], "09:00", "09:30"), { creneaux }).avertissements).toEqual([]);
    });
});

describe("MOT-13a : les contradictions", () => {
    const avecPhrase = (c) => ({ ...controlerContrainte(c).contrainte, phrase: phraseDe(c) });
    const moment = (m, cibles = [{ type: "matiere", id: 5 }]) => avecPhrase({ gabarit: "moment_de_la_journee", cibles, parametres: { moment: m } });

    test("le matin et l'après-midi pour la même cible", () => {
        expect(contradictions([moment("matin"), moment("apres_midi")]).map((c) => [c.code, c.indices])).toEqual([["moments_opposes", [0, 1]]]);
        expect(contradictions([moment("matin"), moment("apres_midi", [{ type: "matiere", id: 6 }])])).toEqual([]);
    });

    test("une plage à éviter qui couvre tout le matin préféré", () => {
        const creneaux = [1, 2, 3, 4, 5].flatMap((jour) => [{ jour, debut: 480, fin: 600 }, { jour, debut: 840, fin: 960 }]);
        const eviter = avecPhrase({ gabarit: "plage_a_eviter", cibles: [{ type: "ecole", id: null }], parametres: { jours: ["lundi", "mardi", "mercredi", "jeudi", "vendredi"], debut: "08:00", fin: "12:30" } });
        expect(contradictions([moment("matin"), eviter], creneaux).map((c) => c.code)).toEqual(["moment_evite"]);
        expect(contradictions([moment("apres_midi"), eviter], creneaux)).toEqual([]);
    });

    test("en même temps et jamais le même jour, pour les mêmes matières", () => {
        const e = (relation, a, b) => avecPhrase({ gabarit: "ensemble_ou_separe", cibles: [{ type: "groupe", id: 1 }], parametres: { matieres_a: a, matieres_b: b, relation } });
        expect(contradictions([e("jamais_le_meme_jour", [7], [6]), e("en_meme_temps", [6], [7])]).map((c) => c.code)).toEqual(["ensemble_et_separe"]);
    });
});

describe("MOT-13a : le contrôle de place", () => {
    // Une grille de 2 jours × 3 créneaux ; le groupe 10 a deux sous-groupes 11 et 12
    const creneaux = [1, 3].flatMap((jour) => [480, 600, 840].map((debut, i) => ({ id: jour * 10 + i, jour, debut, fin: debut + 110, regime: "initiale" })));
    const lecon = (id, coursId, feuilles, plus = {}) => ({ id, coursId, feuilles, regime: "initiale", longueur: 1, enseignants: [100 + coursId], typeSalleRequis: null, distanciel: false, epinglee: false, ...plus });
    const contexte = {
        filiereDuCours: new Map([[5, 1], [6, 1]]),
        feuillesDuGroupe: new Map([[10, new Set([11, 12])], [11, new Set([11])], [12, new Set([12])]]),
        noms: new Map([["groupe:11", "6e A1"], ["groupe:12", "6e A2"], ["matiere:5", "Mathématiques"]]),
    };
    const avec = (c) => ({ ...controlerContrainte(c).contrainte, phrase: phraseDe(c, new Map([["groupe:10", "6e A"], ["matiere:5", "Mathématiques"]])) });
    const cinqSeances = [1, 2, 3, 4, 5].map((n) => lecon(`l${n}`, n === 1 ? 5 : 6, [11]));

    test("assez de place : rien à signaler", () => {
        const contraintes = [avec(plage([{ type: "groupe", id: 10 }], ["mercredi"], "14:00", "18:00"))];
        expect(controlerPlace({ lecons: cinqSeances, creneaux, salles: [], contraintes, contexte })).toEqual([]);
    });

    test("place insuffisante : refus nommé, sous-groupe compté avec son groupe", () => {
        const contraintes = [avec(plage([{ type: "groupe", id: 10 }], ["mercredi"], "08:00", "18:00"))];
        const [refus, ...reste] = controlerPlace({ lecons: cinqSeances, creneaux, salles: [], contraintes, contexte });
        expect(reste).toEqual([]);
        expect(refus).toMatchObject({ type: "groupe", id: 11, besoin: 5, libres: 3, contraintes: [0] });
        expect(refus.message).toBe("Le groupe 6e A1 : 5 créneaux nécessaires par semaine, il en reste 3 à cause de « Pas de cours pour le groupe 6e A le mercredi, de 8 h à 18 h ». Retirez ou réduisez l'une de ces contraintes.");
    });

    test("une plage sur une matière ne prive que ses séances", () => {
        const maths = [1, 2, 3, 4].map((n) => lecon(`m${n}`, 5, [11]));
        const contraintes = [avec(plage([{ type: "matiere", id: 5 }], ["lundi"], "08:00", "18:00"))];
        const [refus] = controlerPlace({ lecons: maths.concat(lecon("x", 6, [11])), creneaux, salles: [], contraintes, contexte });
        expect(refus).toMatchObject({ besoin: 4, libres: 3 });
        expect(refus.message.startsWith("Les cours de Mathématiques du groupe 6e A1")).toBe(true);
    });

    test("un manque dû aux seules disponibilités n'est pas signalé ici", () => {
        const voeux = creneaux.slice(0, 4).map((c) => ({ enseignantId: 106, creneauId: c.id, type: "INDISPONIBLE" }));
        const seances = [1, 2, 3].map((n) => lecon(`d${n}`, 6, [11]));
        const contraintes = [avec(plage([{ type: "groupe", id: 12 }], ["lundi"], "08:00", "18:00"))];
        expect(controlerPlace({ lecons: seances, creneaux, salles: [], voeux, contraintes, contexte })).toEqual([]);
    });

    test("les disponibilités s'ajoutent à une plage interdite, et le message le dit", () => {
        const voeux = creneaux.filter((c) => c.jour === 1).map((c) => ({ enseignantId: 106, creneauId: c.id, type: "INDISPONIBLE" }));
        const seances = [1, 2, 3].map((n) => lecon(`d${n}`, 6, [11]));
        const contraintes = [avec(plage([{ type: "groupe", id: 10 }], ["mercredi"], "08:00", "09:00"))];
        const [refus] = controlerPlace({ lecons: seances, creneaux, salles: [], voeux, contraintes, contexte });
        expect(refus).toMatchObject({ besoin: 3, libres: 2 });
        expect(refus.message).toContain("et des disponibilités des enseignants");
    });

    test("une séance épinglée occupe son créneau", () => {
        const seances = [lecon("e", 6, [11], { epinglee: true, creneau: { id: 30 } }), ...[1, 2, 3].map((n) => lecon(`p${n}`, 6, [11]))];
        const contraintes = [avec(plage([{ type: "groupe", id: 10 }], ["lundi"], "08:00", "18:00"))];
        expect(controlerPlace({ lecons: seances, creneaux, salles: [], contraintes, contexte })[0]).toMatchObject({ besoin: 3, libres: 2 });
    });

    test("salles d'un type : les plages interdites sur une salle comptent", () => {
        const labo = [1, 2, 3, 4].map((n) => lecon(`t${n}`, 6, [11 + (n % 2)], { typeSalleRequis: "labo" }));
        const contraintes = [avec(plage([{ type: "salle", id: 3 }], ["lundi"], "08:00", "18:00"))];
        const [refus] = controlerPlace({ lecons: labo, creneaux, salles: [{ id: 3, type: "labo" }], contraintes, contexte });
        expect(refus).toMatchObject({ type: "salle", id: "labo", besoin: 4, libres: 3 });
    });
});
