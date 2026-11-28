import { MODELES_DOCUMENT, intitules, modeleDuDocument } from "../../services/planning/documentEdt.js";

/**
 * EDT-04 — en-tête du document « Emploi du temps du mois » : le modèle réglé par l'école décide du
 * vocabulaire. Critère du module : une école de collège n'obtient ni « filière » ni « semestre ».
 */

// École du supérieur : filière, cycle et semestre, comme la fiche de l'école d'origine
const GROUPE_SUPERIEUR = { nom_groupe: "IIIA", niveau: "4ème année", annee: 4, filiere: { nom_filiere: "Génie informatique", code_filiere: "IIIA", intitule_cycle: "cycle Ingénieur d'État", premiere_annee_cycle: 3 } };
// École scolaire : un groupe nommé, aucun cycle ni semestre
const GROUPE_SCOLAIRE = { nom_groupe: "6e B", niveau: "6ème", annee: 6, filiere: null };

describe("modèle du document", () => {
    test("« hestim » seulement s'il est réglé tel quel ; tout le reste tombe sur le neutre", () => {
        expect(modeleDuDocument({ modele_edt: "hestim" })).toBe("hestim");
        expect(modeleDuDocument({ modele_edt: "planner" })).toBe("planner");
        expect(modeleDuDocument({ modele_edt: "autre" })).toBe("planner");
        expect(modeleDuDocument({})).toBe("planner");
        expect(modeleDuDocument(null)).toBe("planner");
        expect(MODELES_DOCUMENT).toEqual(["planner", "hestim"]);
    });
});

describe("intitulés du format officiel (hestim)", () => {
    test("année du cycle, filière et semestre, comme l'EDT d'origine", () => {
        expect(intitules(GROUPE_SUPERIEUR, { code: "S1" }, "hestim")).toEqual({
            intitule_classe: "2ème année du cycle Ingénieur d'État en Génie informatique",
            code_classe: "4A | IIIA (S7)",
        });
    });

    test("sans période : le code s'arrête au code de filière", () => {
        expect(intitules(GROUPE_SUPERIEUR, null, "hestim").code_classe).toBe("4A | IIIA");
    });

    test("sans modèle indiqué, l'en-tête est neutre", () => {
        expect(intitules(GROUPE_SUPERIEUR, { code: "S1" })).toEqual({ intitule_classe: "IIIA", code_classe: null });
    });
});

describe("intitulés du format neutre (planner)", () => {
    test("le nom du groupe tel quel, sans code de classe", () => {
        expect(intitules(GROUPE_SUPERIEUR, { code: "S1" }, "planner")).toEqual({ intitule_classe: "IIIA", code_classe: null });
        expect(intitules(GROUPE_SCOLAIRE, { code: "S1" }, "planner")).toEqual({ intitule_classe: "6e B", code_classe: null });
    });

    test("aucun mot du supérieur dans l'en-tête d'une école scolaire", () => {
        const entete = intitules(GROUPE_SCOLAIRE, null, "planner");
        const texte = JSON.stringify(entete).toLowerCase();
        expect(texte).not.toContain("filière");
        expect(texte).not.toContain("semestre");
        expect(texte).not.toContain("cycle");
    });
});
