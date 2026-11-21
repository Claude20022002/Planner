import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

// Garde-fou de l'exception GHSA-fc5q-39xc-vjpf (picomatch, deploy/audit-exceptions.json ; plan
// docs/conception/exploitation/fix-audit-dependances.md, § 2, point 5). La faille demande un motif de
// recherche de fichiers fourni par l'attaquant. Elle reste sans effet tant que :
// - seul migrations/migrator.js emploie umzug, ou ce qui atteint picomatch (tinyglobby, fdir) ;
// - le motif qu'il donne à umzug est une chaîne écrite en dur, cherchée dans le dossier des migrations.
// Si ce test tombe, l'exception ne tient plus : revoir le motif avant de toucher au test.

const RACINE = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "../..");
const MIGRATEUR = path.join("migrations", "migrator.js");
const IGNORES = new Set(["node_modules", "tests", "coverage", "storage"]);
const IMPORT_GLOB = /(?:\bfrom\s*|\bimport\s*\(\s*|\bimport\s+|\brequire\s*\(\s*)["'](umzug|tinyglobby|picomatch|fdir)(?:\/[^"']*)?["']/;

const fichiersDeProduction = (dossier) =>
    fs.readdirSync(dossier, { withFileTypes: true }).flatMap((entree) => {
        const chemin = path.join(dossier, entree.name);
        if (entree.isDirectory()) return IGNORES.has(entree.name) ? [] : fichiersDeProduction(chemin);
        return /\.(m?js|cjs)$/.test(entree.name) ? [chemin] : [];
    });

test("seul migrations/migrator.js importe umzug, tinyglobby, picomatch ou fdir", () => {
    const utilisateurs = fichiersDeProduction(RACINE)
        .filter((fichier) => IMPORT_GLOB.test(fs.readFileSync(fichier, "utf8")))
        .map((fichier) => path.relative(RACINE, fichier));
    expect(utilisateurs).toEqual([MIGRATEUR]);
});

test("le motif des migrations donné à umzug est une constante, cherchée dans le dossier des migrations", () => {
    const source = fs.readFileSync(path.join(RACINE, MIGRATEUR), "utf8");
    const motifs = [...source.matchAll(/\bglob\s*:/g)];
    expect(motifs).toHaveLength(1);
    // Une chaîne entre guillemets droits, sans ${…} ni concaténation, puis le dossier des migrations
    expect(source).toMatch(/\bglob\s*:\s*\[\s*"[^"$`+]+"\s*,\s*\{\s*cwd\s*:\s*migrationsDir\s*\}\s*\]/);
    // Le dossier vient de l'emplacement du fichier lui-même, jamais d'une variable d'environnement ou d'une entrée
    expect(source).toMatch(/const migrationsDir = path\.dirname\(fileURLToPath\(import\.meta\.url\)\);/);
});
