import { PARAMETRES_PLANNING } from "../../config/parametresPlanning.js";
import { chargerParametres } from "../../services/moteur/catalogue/charger.js";
import { ANCIENS_PARAMETRES } from "../../services/moteur/valeurs/anciensParametres.js";
import { peutModifier } from "../../services/moteur/valeurs/ecriture.js";
import { conflitsAvecLaBase } from "../../services/moteur/valeurs/concurrence.js";
import { choixEnCours, choixPossibles, controlerBornes, ligneDuChoix, REGLAGES_ECOLE } from "../../services/moteur/valeurs/reglagesEcole.js";

// ADM-02 : les cinq réglages du panneau (bornes, lien avec l'ancienne table) et les choix d'une règle souple.

const parametres = chargerParametres();

describe("ADM-02 : les cinq réglages", () => {
    test.each(REGLAGES_ECOLE.map((r) => [r.id, r]))("%s existe, l'école peut le modifier, et il correspond à son ancienne clé", (id, r) => {
        const p = parametres.find((x) => x.id === id);
        expect(p).toBeDefined();
        expect(peutModifier(p, "etablissement")).toBe(true);
        expect(ANCIENS_PARAMETRES[r.ancien].id).toBe(id);
    });

    test.each(REGLAGES_ECOLE.map((r) => [r.id, r]))("%s : les bornes sont celles de l'ancienne table", (id, r) => {
        const { valider } = PARAMETRES_PLANNING[r.ancien];
        const versAncien = (v) => (r.unite === "heure" ? v / 60 : r.unite === "pourcentage" ? v / 100 : v);
        expect([valider(versAncien(r.min)), valider(versAncien(r.max))]).toEqual([true, true]);
        expect(controlerBornes(id, r.min)).toEqual([]);
        expect(controlerBornes(id, r.max)).toEqual([]);
        expect(controlerBornes(id, r.max + r.pas)[0].code).toBe("hors_bornes");
        expect(controlerBornes(id, r.min - r.pas)[0].code).toBe("hors_bornes");
    });

    test("un plafond se saisit en heures entières", () => {
        expect(controlerBornes("HOR.REGLE.MAX_H_JOUR_GROUPE", 450)[0].message).toMatch(/par pas de 1 h/);
        expect(controlerBornes("HOR.REGLE.MAX_H_JOUR_GROUPE", "480")[0].code).toBe("hors_bornes");
    });

    test("un réglage hors des cinq n'a pas de bornes d'écran", () => {
        expect(controlerBornes("HOR.REGLE.TROUS", 999)).toEqual([]);
    });
});

describe("ADM-02 : les choix d'une règle souple (réponse 12)", () => {
    test.each([
        [1, ["coupee", "normal", "beaucoup"]],
        [2, ["coupee", "peu", "normal", "beaucoup"]],
        [20, ["coupee", "peu", "normal", "beaucoup"]],
    ])("poids du profil %i : choix %j", (poids, attendus) => {
        expect(choixPossibles(poids)).toEqual(attendus);
    });

    test.each([
        [{ valeur: false, poids: 5, poidsDuProfil: 5 }, "coupee"],
        [{ valeur: true, poids: 5, poidsDuProfil: 5 }, "normal"],
        [{ valeur: true, poids: 2, poidsDuProfil: 5 }, "peu"],
        [{ valeur: true, poids: 15, poidsDuProfil: 5 }, "beaucoup"],
        [{ valeur: true, poids: 7, poidsDuProfil: 5 }, "particulier"],
        [{ valeur: true, poids: 1, poidsDuProfil: 1 }, "normal"],
        [{ valeur: true, poids: 7, poidsDuProfil: 20 }, "peu"],
    ])("%j → %s", (etat, attendu) => {
        expect(choixEnCours(etat)).toBe(attendu);
    });

    test("la ligne de chaque choix", () => {
        expect(ligneDuChoix("HOR.REGLE.TROUS", "coupee", 5)).toEqual({ cle: "HOR.REGLE.TROUS", portee: "etablissement", valeur: false });
        expect(ligneDuChoix("HOR.REGLE.TROUS", "normal", 5)).toEqual({ cle: "HOR.REGLE.TROUS", portee: "etablissement", retiree: true });
        expect(ligneDuChoix("HOR.REGLE.TROUS", "peu", 5)).toEqual({ cle: "HOR.REGLE.TROUS", portee: "etablissement", valeur: true, poids: 2 });
        expect(ligneDuChoix("HOR.REGLE.TROUS", "beaucoup", 5)).toEqual({ cle: "HOR.REGLE.TROUS", portee: "etablissement", valeur: true, poids: 15 });
    });

    test("un choix non proposé ne donne pas de ligne", () => {
        expect(ligneDuChoix("SAL.REGLE.TAILLE_ADAPTEE", "peu", 1)).toBeNull();
        expect(ligneDuChoix("HOR.REGLE.TROUS", "indispensable", 5)).toBeNull();
    });
});

describe("ADM-02 : une version appliquée depuis la base (R-4)", () => {
    const ligne = (cle, portee = "etablissement", id_portee = "") => ({ cle, portee, id_portee });
    const recente = (id_version, valeurs = [], contraintes = []) => ({ id_version, valeurs: valeurs.map((v) => ({ ...v, id_portee: v.id_portee || null })), contraintes });

    test("même réglage, même portée : conflit nommé", () => {
        const conflits = conflitsAvecLaBase({ lignes: [ligne("HOR.REGLE.TROUS")], recentes: [recente(42, [ligne("HOR.REGLE.TROUS")])], nomDe: () => "Éviter les trous" });
        expect(conflits).toEqual([expect.objectContaining({ cle: "HOR.REGLE.TROUS", id_version: 42, code: "version_depassee", message: expect.stringMatching(/42.*Éviter les trous/) })]);
    });

    test("autre réglage, ou même réglage à une autre portée : pas de conflit", () => {
        expect(conflitsAvecLaBase({ lignes: [ligne("HOR.REGLE.TROUS")], recentes: [recente(42, [ligne("HOR.REGLE.CHANGEMENT_SALLE"), ligne("HOR.REGLE.TROUS", "filiere", "3")])] })).toEqual([]);
    });

    test("même contrainte retirée : conflit ; deux ajouts : pas de conflit", () => {
        expect(conflitsAvecLaBase({ retraits: [7], recentes: [recente(43, [], [{ retire_id: 7 }])] })).toEqual([expect.objectContaining({ retrait: 7, id_version: 43 })]);
        expect(conflitsAvecLaBase({ retraits: [], recentes: [recente(43, [], [{ retire_id: null }])] })).toEqual([]);
    });
});
