import { VersionParametres } from "../../../models/index.js";
import { aujourdhui, leCatalogue, lireLignes } from "./lecture.js";
import { CHOIX, choixEnCours, choixPossibles, REGLAGES_ECOLE, reglesReglables } from "./reglagesEcole.js";
import { lignesEnVigueur, profilDeLaCible, resoudreParametre } from "./resolution.js";

/**
 * Lecture des réglages à la portée de l'école (ADM-02, conception § 5.3 et § 5.5) : quelques
 * paramètres seulement, sans lire toute la table ni compter les données. Sert à `GET /reglages`
 * et à la lecture des anciens paramètres de planification (referentiel.js), appelée dans des boucles.
 * La résolution est celle de MP-1 (resolution.js) : le même profil, les mêmes lignes, le même ordre.
 */

const PROFIL = "ETA.ID.PROFIL";

/**
 * Fonction pure : résout ces paramètres à la portée de l'école, à une date.
 * @returns {Map<string, object>} id → { valeur, force, poids, origine, valeur_du_profil, poids_du_profil }
 */
export const resoudreALEcole = ({ parametres, profils, lignes, date, ids }) => {
    const enVigueur = lignesEnVigueur(lignes, date);
    const profil = profilDeLaCible(parametres, profils, enVigueur, {});
    const parId = new Map(parametres.map((p) => [p.id, p]));
    return new Map(
        ids.map((id) => {
            const p = parId.get(id);
            const sansLEcole = resoudreParametre(p, { profil });
            const r = resoudreParametre(p, { profil, lignes: enVigueur });
            return [id, { valeur: r.valeur, force: r.force, poids: r.poids, origine: r.origine, valeur_du_profil: sansLEcole.valeur, poids_du_profil: sansLEcole.poids }];
        })
    );
};

/** Ces paramètres à la portée de l'école, lus en base, à une date (aujourd'hui à l'école par défaut). */
export const lireALEcole = async (ids, { date = aujourdhui(), transaction } = {}) => {
    const { parametres, profils } = leCatalogue();
    const lignes = await lireLignes({ cles: [...ids, PROFIL], transaction });
    return { profil: profilDeLaCible(parametres, profils, lignesEnVigueur(lignes, date), {})?.code ?? null, resultats: resoudreALEcole({ parametres, profils, lignes, date, ids }) };
};

/** Le plus grand numéro de version appliquée : la « base » qu'un écran renvoie à l'application (R-4). */
export const versionCourante = async ({ transaction } = {}) => (await VersionParametres.max("id_version", { where: { statut: "appliquee" }, transaction })) ?? 0;

// Les règles dont l'école pourrait changer le choix : celles que le solveur lit (le tri fin est dans reglesReglables)
const reglesCandidates = (parametres) => parametres.filter((p) => p.role === "regle" && p.regle_solveur).map((p) => p.id);

/** Ce que rend GET /api/moteur/reglages : les cinq réglages et les règles réglables, avec leur choix. */
export const decrireReglages = async ({ date = aujourdhui() } = {}) => {
    const { parametres } = leCatalogue();
    const ids = [...REGLAGES_ECOLE.map((r) => r.id), ...reglesCandidates(parametres)];
    const [{ profil, resultats }, version_courante] = await Promise.all([lireALEcole(ids, { date }), versionCourante()]);
    return {
        date,
        aujourdhui: aujourdhui(),
        profil,
        version_courante,
        choix: CHOIX,
        reglages: REGLAGES_ECOLE.map(({ id, unite, min, max, pas, effet }) => {
            const r = resultats.get(id);
            return { id, valeur: r.valeur, valeur_du_profil: r.valeur_du_profil, origine: r.origine, unite, min, max, pas, effet };
        }),
        regles: reglesReglables({ parametres, resultats }).map((id) => {
            const r = resultats.get(id);
            return { id, choix: choixEnCours({ valeur: r.valeur, poids: r.poids, poidsDuProfil: r.poids_du_profil }), poids: r.poids, poids_du_profil: r.poids_du_profil, choix_possibles: choixPossibles(r.poids_du_profil) };
        }),
    };
};
