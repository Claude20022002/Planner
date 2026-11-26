/**
 * Garde de M-10 (T-6) : aucun fuseau ni pays écrit en dur pour l'heure de l'école. Le fuseau vient
 * d'APP_TIMEZONE (config/fuseau.js), et le site comme l'application reçoivent ses décalages du
 * serveur (shared/dates.js). Les tests, la base des fuseaux et le catalogue du moteur sont exclus.
 */
import { readdirSync, readFileSync, statSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const RACINE = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "../../..");
const DOSSIERS = ["backend", "frontend/src", "mobile/src", "shared"];
const EXCLUS = ["node_modules", "tests", "__tests__", "tzdata", path.join("moteur", "catalogue"), "dist", "coverage"];
const EXTENSIONS = /\.(js|jsx|mjs|cjs|ts|tsx)$/;
const INTERDITS = [
    { motif: /["'`]Africa\/Casablanca["'`]/, raison: "un fuseau de pays écrit en dur" },
    { motif: /DECALAGE_ECOLE_MINUTES\s*=\s*-?\d/, raison: "un décalage de l'école figé" },
    { motif: /APP_TIMEZONE\s*\|\|/, raison: "un fuseau par défaut derrière APP_TIMEZONE" },
];

const fichiers = (dossier) =>
    readdirSync(dossier).flatMap((nom) => {
        const chemin = path.join(dossier, nom);
        if (EXCLUS.some((e) => chemin.includes(`${path.sep}${e}${path.sep}`) || chemin.endsWith(`${path.sep}${e}`))) return [];
        if (statSync(chemin).isDirectory()) return fichiers(chemin);
        return EXTENSIONS.test(nom) ? [chemin] : [];
    });

test("aucun fuseau ni décalage de l'école écrit en dur dans le code (M-10)", () => {
    const trouves = DOSSIERS.flatMap((d) => fichiers(path.join(RACINE, d))).flatMap((f) => {
        const texte = readFileSync(f, "utf8");
        return INTERDITS.filter(({ motif }) => motif.test(texte)).map(({ raison }) => `${path.relative(RACINE, f)} : ${raison}`);
    });
    expect(trouves).toEqual([]);
});
