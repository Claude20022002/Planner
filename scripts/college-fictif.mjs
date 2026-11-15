#!/usr/bin/env node
/**
 * Collège fictif (MOT-13b, réponse 21) : écrit le problème envoyé au solveur, contraintes déclarées
 * compilées comprises, dans solver/src/test/resources/college-fictif.json (lu par CollegeFictifTest
 * et comparé au générateur par le test du serveur). Avec --resoudre, l'envoie à un solveur, attend la
 * fin du calcul et affiche le score et le bilan de chaque contrainte (bilan.js), comme Planner.
 *
 * Lancement :
 *   node scripts/college-fictif.mjs                          écrit le fichier (4 classes)
 *   node scripts/college-fictif.mjs --classes 3 --sortie x   3 classes par niveau, dans le fichier x
 *   SOLVER_TOKEN=… node scripts/college-fictif.mjs --resoudre http://127.0.0.1:8080
 */
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { collegeFictif, enTexte, problemePourLeSolveur } from "../backend/tests/fixtures/collegeFictif.js";
import { bilanDesContraintes } from "../backend/services/moteur/contraintes/bilan.js";
import { phraseDe } from "../backend/services/moteur/contraintes/phrases.js";

const RACINE = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const FICHIER = path.join(RACINE, "solver/src/test/resources/college-fictif.json");

const option = (nom) => {
    const i = process.argv.indexOf(nom);
    return i > 0 ? process.argv[i + 1] : undefined;
};

const resoudre = async (url, fichier, college) => {
    const jeton = process.env.SOLVER_TOKEN ?? "";
    const entetes = { "Content-Type": "application/json", "X-Solver-Token": jeton };
    const lance = await fetch(`${url}/timetables`, { method: "POST", headers: entetes, body: JSON.stringify(fichier) });
    if (lance.status !== 202) throw new Error(`Le solveur refuse le problème (${lance.status}) : ${await lance.text()}`);
    const { id } = await lance.json();
    const debut = Date.now();
    let etat;
    do {
        await new Promise((r) => setTimeout(r, 1000));
        etat = await (await fetch(`${url}/timetables/${id}`, { headers: entetes })).json();
    } while (etat.statut !== "NOT_SOLVING" && etat.statut !== "ECHEC");
    if (etat.statut === "ECHEC") throw new Error(`Calcul en échec : ${etat.erreur}`);
    console.log(`Score : ${etat.score} (dur ${etat.dur}, moyen ${etat.moyen}, souple ${etat.souple}), en ${Math.round((Date.now() - debut) / 1000)} s`);
    const contraintes = college.contraintes.map((c) => ({ ...c, phrase: phraseDe(c, college.noms) }));
    const libelles = new Map(fichier.lecons.map((l) => [l.id, college.noms.get(`matiere:${l.coursId}`) ?? l.id]));
    const bilan = bilanDesContraintes({ compilees: fichier.contraintesDeclarees, contraintes, placements: etat.lecons, probleme: fichier, libelles });
    for (const b of bilan) {
        const etatLisible = { respectee: "respectée", non_respectee: `non respectée ${b.fois} fois`, sans_effet: "sans effet" }[b.etat];
        console.log(`- ${b.phrase} (${b.insistance ?? b.nature}) : ${etatLisible}${b.exemples.length ? ` ; par exemple ${b.exemples.join(" ; ")}` : ""}`);
    }
};

const classesParNiveau = Number(option("--classes") ?? 1);
const college = collegeFictif({ classesParNiveau });
const fichier = problemePourLeSolveur(college);
const url = option("--resoudre");
if (url) {
    await resoudre(url.replace(/\/$/, ""), fichier, college);
} else {
    const sortie = option("--sortie") ?? FICHIER;
    fs.writeFileSync(sortie, enTexte(fichier));
    console.log(`${fichier.lecons.length} séances, ${fichier.contraintesDeclarees.length} contraintes : ${path.relative(RACINE, sortie)}`);
}
