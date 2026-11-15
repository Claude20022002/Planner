/**
 * Saisie locale de l'URL de santé n8n. Aucun appel réseau ; le fichier est hors Git et privé.
 */
import { createInterface } from "node:readline/promises";
import { writeFileSync } from "node:fs";
import { join } from "node:path";
import { LOCAL } from "./lib/config.mjs";
import { verifierUrlSonde } from "./lib/sonde.mjs";

/** Demande l'URL au chef et la conserve uniquement dans .local/sonde.json. */
export async function configurerSonde() {
    const lecteur = createInterface({ input: process.stdin, output: process.stdout });
    try {
        const url = verifierUrlSonde(await lecteur.question("URL locale de santé n8n (hors Git) : "));
        writeFileSync(join(LOCAL, "sonde.json"), JSON.stringify({ url }, null, 2), { mode: 0o600 });
        console.log("Configuration de la sonde conservée localement ; aucun appel réseau effectué.");
    } finally { lecteur.close(); }
}
