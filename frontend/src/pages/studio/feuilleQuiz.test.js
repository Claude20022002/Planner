/**
 * La feuille imprimée montre les questions et cache la correction (EP-18, M-2a).
 */
import { test } from "node:test";
import assert from "node:assert/strict";
import { contenuFeuille } from "../../../../shared/quiz/studio/feuille.js";
import { htmlFeuille } from "./feuilleQuiz.js";

const SECRET = "reponse-secrete-ne-pas-imprimer";

test("un choix unique liste les options et oublie laquelle est bonne", () => {
    const feuille = contenuFeuille({
        type: "choix_unique",
        enonce: "Quelle commande liste les fichiers ?",
        points: 1,
        explication: SECRET,
        donnees: { options: [{ id: "o1", texte: "pwd" }, { id: "o2", texte: "ls" }], bonne: "o2" },
    });
    const brut = JSON.stringify(feuille);
    assert.deepEqual(feuille.choix, ["pwd", "ls"]);
    assert.equal(brut.includes(SECRET), false);
    assert.equal(brut.includes("bonne"), false);
});

test("une réponse courte ne montre pas les mots acceptés", () => {
    const brut = JSON.stringify(contenuFeuille({
        type: "reponse_courte",
        enonce: "Nommez la commande.",
        points: 2,
        donnees: { acceptees: [SECRET], casse: false },
    }));
    assert.equal(brut.includes(SECRET), false);
    assert.equal(brut.includes("ligne"), true);
});

test("un texte à trous montre les pointillés et cache les mots acceptés", () => {
    const feuille = contenuFeuille({
        type: "texte_trous",
        enonce: "Complétez.",
        points: 1,
        explication: SECRET,
        donnees: { texte: "La commande {{1}} liste.", trous: [{ id: "1", acceptees: [SECRET] }] },
    });
    assert.equal(feuille.texte.includes("________"), true);
    assert.equal(JSON.stringify(feuille).includes(SECRET), false);
});

test("les paires imprimées ne suivent pas la solution", () => {
    const feuille = contenuFeuille({
        type: "association",
        enonce: "Reliez.",
        points: 1,
        donnees: { paires: [{ gauche: "chat", droite: "cat" }, { gauche: "chien", droite: "dog" }] },
    });
    assert.deepEqual(feuille.gauches, ["chat", "chien"]);
    assert.equal(feuille.droites[0], "dog");
});

test("l'ordre imprimé n'est pas l'ordre solution", () => {
    const feuille = contenuFeuille({
        type: "ordre",
        enonce: "Remettez dans l'ordre.",
        points: 1,
        donnees: { elements: [{ id: "e1", texte: "un" }, { id: "e2", texte: "deux" }, { id: "e3", texte: "trois" }] },
    });
    assert.deepEqual(feuille.elements, ["trois", "deux", "un"]);
});

test("le HTML de la feuille ne contient pas la correction", () => {
    const html = htmlFeuille({
        titre: "Contrôle",
        questions: [{
            type: "numerique",
            enonce: "Combien ?",
            points: 1,
            explication: SECRET,
            donnees: { valeur: 42, tolerance: 0, unite: "m" },
        }],
    }, {
        langue: "fr", nom: "Nom", vrai: "Vrai", faux: "Faux", nombre: (n) => `Cochez ${n}`,
        ligne: "Réponse", ordre: "Numérotez", associer: "Reliez", image: "Marquez", points: (n) => `${n} pt`,
    });
    assert.equal(html.includes("Combien ?"), true);
    assert.equal(html.includes(SECRET), false);
    assert.equal(html.includes("42"), false);
    assert.equal(html.includes("(m)"), true);
});
