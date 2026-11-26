import path from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";

// Le script vit à la racine du dépôt, comme scripts/verifier-neutre.mjs
const RACINE = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "../../..");
const { chainesFautives, verifierTon } = await import(
    pathToFileURL(path.join(RACINE, "scripts/verifier-ton.mjs")).href
);

/**
 * Ton des messages du serveur (UIX-05) : aucune forme « (s) », « (e) », « (es) », « (x) » ni « pts »
 * dans une chaîne de backend/, hors backend/tests/. C'est le critère de « terminé » de la fonction.
 */
describe("ton des messages du serveur", () => {
    test("aucune forme fautive dans les chaînes du serveur", () => {
        const trouves = verifierTon(RACINE);
        expect(trouves.map((t) => `${t.chemin}:${t.ligne}  ${t.texte}`)).toEqual([]);
    });

    test("le détecteur voit une chaîne fautive et ignore un commentaire", () => {
        const source = [
            "// 3 séance(s) en commentaire : sans objet",
            "/* 2 compte(s) aussi */",
            "const message = `1 événement(s) créé(s)`;",
            'const autre = accorder(n, "séance", "séances");',
            "const rang = `${j.score} pts`;",
        ].join("\n");
        expect(chainesFautives(source).map(({ ligne }) => ligne)).toEqual([3, 5]);
    });
});
