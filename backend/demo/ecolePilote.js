import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { Campus, ConfigurationEtablissement } from "../models/index.js";
import { CAMPUS_HESTIM } from "../utils/campus.js";
import { oublierIdentite } from "../services/etablissement/identite.js";

/**
 * Campus et identité du jeu de démonstration (seed.js). Les migrations ne les donnent plus à une
 * base neuve (PLA-03) : la démonstration les écrit elle-même, avec les valeurs de l'école pilote.
 */

const LOGO = path.join(path.dirname(fileURLToPath(import.meta.url)), "..", "assets", "ecole", "logo-hestim.png");

// Les valeurs que la migration 0055 donne à la base d'origine
const IDENTITE = {
    nom: "HESTIM Engineering & Business School",
    nom_court: "HESTIM",
    couleur_principale: "#001861",
    couleur_accent: "#F26322",
    modele_edt: "hestim",
};

/** Crée les campus de la démonstration qui manquent, et écrit son identité si celle de la base est encore neutre. */
export const installerEcolePilote = async () => {
    for (const campus of CAMPUS_HESTIM) {
        await Campus.findOrCreate({ where: { code: campus.code }, defaults: campus });
    }
    const ligne = await ConfigurationEtablissement.unscoped().findByPk(1);
    if (!ligne || ligne.nom_court !== "Planner") return;
    const logo = fs.existsSync(LOGO) ? fs.readFileSync(LOGO) : null;
    await ligne.update({ ...IDENTITE, logo, logo_type: logo ? "image/png" : null, logo_maj_le: logo ? new Date() : null });
    oublierIdentite();
};
