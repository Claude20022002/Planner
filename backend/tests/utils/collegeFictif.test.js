import { readFileSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { collegeFictif, enTexte, problemePourLeSolveur } from "../fixtures/collegeFictif.js";

// MOT-13b : le collège fictif (réponse 21). Le fichier lu par CollegeFictifTest.java est celui
// qu'écrit le générateur : un générateur changé sans le fichier (node scripts/college-fictif.mjs)
// fait échouer ce test.

const RACINE = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "../../..");
const FICHIER = path.join(RACINE, "solver/src/test/resources/college-fictif.json");

describe("MOT-13b : le collège fictif", () => {
    test("le fichier commité est celui qu'écrit le générateur", () => {
        const commite = readFileSync(FICHIER, "utf8").replace(/\r\n/g, "\n");
        expect(commite).toBe(enTexte(problemePourLeSolveur(collegeFictif())));
    });

    test("4 classes, la 4e et la 3e dédoublées en espagnol et en allemand ; la taille se règle", () => {
        const { probleme } = collegeFictif();
        const classes = new Set(probleme.lecons.flatMap((l) => l.groupesDirects).map((g) => (g > 1000 ? Math.floor(g / 10) : g)));
        expect([...classes].sort()).toEqual([101, 201, 301, 401]);
        expect(probleme.lecons.filter((l) => l.id.includes("-es-")).map((l) => l.feuilles[0])).toEqual([3011, 3011, 3011, 4011, 4011, 4011]);
        // Les langues ne sont pas en conflit entre elles ; le reste de la classe l'est avec les deux
        const francais4e = probleme.lecons.find((l) => l.id === "c301-fr-1");
        expect(francais4e.feuilles).toEqual([3011, 3012]);
        expect(collegeFictif({ classesParNiveau: 3 }).probleme.lecons).toHaveLength(3 * probleme.lecons.length);
    });

    test("chaque contrainte compilée vise quelque chose, et l'alignement des langues porte sur les deux classes dédoublées", () => {
        const fichier = problemePourLeSolveur(collegeFictif());
        expect(fichier.contraintesDeclarees.map((k) => [k.id, k.famille, k.niveau])).toEqual([
            [1, "ENSEMBLE", "DUR"],
            [2, "PLAGE", "DUR"],
            [3, "PLAFOND", "SOUPLE"],
            [4, "REPARTITION", "SOUPLE"],
            [5, "PLAGE", "SOUPLE"],
            [6, "ENSEMBLE", "SOUPLE"],
            [7, "PLAGE", "MOYEN"],
            [8, "PLAFOND", "SOUPLE"],
        ]);
        expect(fichier.contraintesDeclarees[0].paquets).toHaveLength(2);
        expect(fichier.contraintesDeclarees.every((k) => (k.famille === "PLAGE" ? k.creneaux.length && k.lecons.length : k.paquets.length))).toBe(true);
    });
});
