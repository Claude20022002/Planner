import { lireNoms } from "../contraintes/cibles.js";
import { lireContraintesEnVigueur } from "../contraintes/enVigueur.js";
import { phraseDe } from "../contraintes/phrases.js";
import { verifierContraintes } from "../contraintes/verification.js";
import { conflitsAvecLaBase, versionsApresLaBase } from "./concurrence.js";
import { aujourdhui, leCatalogue, lireLignes } from "./lecture.js";
import { choixEnCours, REGLAGES_ECOLE } from "./reglagesEcole.js";
import { resoudreALEcole } from "./valeursDeLEcole.js";
import { exigerDate, preparerVersion } from "./versions.js";

/**
 * Aperçu d'une version avant « Appliquer » (ADM-02, réponses 3 et 7) : ce qui change à la portée de
 * l'école (avant, après, et quand cela vaut), les refus, les phrases des contraintes ajoutées et
 * retirées, leurs contradictions, le contrôle de place si une période est donnée, et les conflits avec
 * une version appliquée depuis la base. **Rien n'est écrit.**
 */

const ECOLE = "etablissement";
const PROFIL = "ETA.ID.PROFIL";
const PLUS_RECENTE = Number.MAX_SAFE_INTEGER;
// Une règle du profil vaut à la prochaine génération ; les cinq réglages disent leur effet (R-10)
const effetDe = (id) => REGLAGES_ECOLE.find((r) => r.id === id)?.effet ?? "prochaine_generation";

const etat = (p, r) => ({
    valeur: r.valeur,
    poids: r.poids,
    ...(p.role === "regle" && r.force === "souple" ? { choix: choixEnCours({ valeur: r.valeur, poids: r.poids, poidsDuProfil: r.poids_du_profil }) } : {}),
});

/** Avant → après, pour chaque réglage de l'école que la version touche. */
const changementsDe = async (normalisees, date) => {
    const { parametres, profils } = leCatalogue();
    const parId = new Map(parametres.map((p) => [p.id, p]));
    const ecole = normalisees.filter((l) => l.portee === ECOLE && parId.has(l.cle));
    const ids = [...new Set(ecole.map((l) => l.cle))];
    if (!ids.length) return [];
    const lues = await lireLignes({ cles: [...ids, PROFIL] });
    const posees = ecole.map((l) => ({ ...l, id_portee: null, statut: "appliquee", date_effet: date, id_version: PLUS_RECENTE }));
    const avant = resoudreALEcole({ parametres, profils, lignes: lues, date, ids });
    const apres = resoudreALEcole({ parametres, profils, lignes: [...lues, ...posees], date, ids });
    return ids.map((id) => ({ id, nom: parId.get(id).nom, avant: etat(parId.get(id), avant.get(id)), apres: etat(parId.get(id), apres.get(id)), effet: effetDe(id) }));
};

const retireesDe = async (retirer, date) => {
    if (!Array.isArray(retirer) || !retirer.length) return [];
    const visees = (await lireContraintesEnVigueur(date)).filter((c) => retirer.includes(c.id_contrainte));
    const noms = await lireNoms(visees);
    return visees.map((c) => ({ id_contrainte: c.id_contrainte, phrase: phraseDe(c, noms) }));
};

/**
 * @param {object} corps date_effet, lignes, regles ([{ id, choix }]), contraintes, retirer, id_periode, base
 * @param {string} auteur
 */
export const apercuVersion = async ({ date_effet = aujourdhui(), lignes = [], regles = [], contraintes = [], retirer = [], id_periode, base }, auteur) => {
    exigerDate(date_effet);
    const { normalisees, preparees, violations } = await preparerVersion({ date_effet, lignes, contraintes, retirer, regles }, auteur);
    const nomDe = (id) => leCatalogue().parametres.find((p) => p.id === id)?.nom ?? id;
    const conflits = base === undefined || base === null ? [] : conflitsAvecLaBase({ lignes: normalisees, retraits: preparees.retraits, recentes: await versionsApresLaBase(base), nomDe });
    const formeValide = Array.isArray(contraintes) && !preparees.violations.some((v) => v.code === "forme_invalide");
    return {
        date_effet,
        changements: await changementsDe(normalisees, date_effet),
        contraintes: formeValide && contraintes.length ? await verifierContraintes({ contraintes, id_periode, date: date_effet }) : null,
        retirees: await retireesDe(retirer, date_effet),
        violations,
        conflits,
        peut_appliquer: !violations.length && !conflits.length,
    };
};
