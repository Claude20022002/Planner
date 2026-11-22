import { asyncHandler } from "../middleware/asyncHandler.js";
import { valeursEnVigueur } from "../services/moteur/valeurs/lecture.js";
import { decrireReglages } from "../services/moteur/valeurs/valeursDeLEcole.js";
import { apercuVersion } from "../services/moteur/valeurs/apercu.js";
import { detailVersion, listerVersionsAllegees } from "../services/moteur/valeurs/historique.js";
import { annulerVersion } from "../services/moteur/valeurs/annulation.js";
import { abandonnerVersion, appliquerVersion, creerVersion, ErreurReglages } from "../services/moteur/valeurs/versions.js";
import { corpsErreur } from "../utils/erreurs.js";

/**
 * Réglages du moteur de planification (lot MP-1). Ces routes sont réservées à l'administration, qui
 * écrit au niveau « établissement ». Le niveau « plateforme » (force d'une règle, règles d'un pays)
 * n'a pas de route : il attend la Plateforme (ME-4). Une version porte aussi les contraintes déclarées
 * par l'école (MOT-13) : `contraintes` (ajouts) et `retirer` (numéros des contraintes en vigueur).
 */

const AUTEUR = "etablissement";
const PORTEES_DE_CIBLE = ["cycle", "niveau", "filiere", "groupe", "matiere", "enseignant", "salle"];

// Les refus détaillés suivent le format commun de l'API : { message, code, violations }
const avecRefus = (travail) =>
    asyncHandler(async (req, res) => {
        try {
            await travail(req, res);
        } catch (err) {
            if (!(err instanceof ErreurReglages)) throw err;
            res.status(err.status).json(corpsErreur(err.status, err.message, { code: err.code, violations: err.violations }));
        }
    });

// 🔍 Valeurs en vigueur pour une cible, à une date
export const getValeursMoteur = asyncHandler(async (req, res) => {
    const { date } = req.query;
    if (date !== undefined && !/^\d{4}-\d{2}-\d{2}$/.test(date)) {
        return res.status(400).json(corpsErreur(400, "La date s'écrit AAAA-MM-JJ", { code: "DATE_INVALIDE" }));
    }
    const cible = Object.fromEntries(PORTEES_DE_CIBLE.filter((p) => req.query[p] !== undefined).map((p) => [p, req.query[p]]));
    const r = await valeursEnVigueur({ date, cible });
    res.json({
        date: r.date,
        profil: r.profil,
        valeurs: [...r.resultats.values()].map(({ id, force, poids, origine }) => ({ id, valeur: r.valeurs.get(id), force, poids, origine })),
        actives: r.actives,
        alertes: r.alertes,
    });
});

// 🔍 Ce que le panneau de configuration laisse régler à l'école (ADM-02, R-1) : cinq réglages et les règles réglables
export const getReglagesMoteur = asyncHandler(async (req, res) => {
    const { date } = req.query;
    if (date !== undefined && !/^\d{4}-\d{2}-\d{2}$/.test(date)) {
        return res.status(400).json(corpsErreur(400, "La date s'écrit AAAA-MM-JJ", { code: "DATE_INVALIDE" }));
    }
    res.json(await decrireReglages({ date }));
});

// 🔍 Historique des versions, sans leurs lignes (R-3)
export const getVersionsMoteur = asyncHandler(async (req, res) => {
    res.json(await listerVersionsAllegees());
});

// 🔍 Détail d'une version : réglages, contraintes ajoutées et retirées (R-3)
export const getVersionMoteur = asyncHandler(async (req, res) => {
    res.json(await detailVersion(req.params.id));
});

// ➕ Préparer un brouillon, sans effet tant qu'il n'est pas appliqué ; ou, avec `appliquer` et `base`, créer et appliquer (ADM-02, R-4)
export const postVersionMoteur = avecRefus(async (req, res) => {
    const { libelle, date_effet, lignes, regles, contraintes, retirer, base } = req.body;
    const appliquer = req.body.appliquer === true;
    const version = await creerVersion({ libelle, date_effet, lignes, regles, contraintes, retirer, appliquer, base, id_auteur: req.user.id_user, auteur: AUTEUR });
    res.status(201).json(version);
});

// 👁️ Aperçu à blanc de ce que changerait une version : rien n'est écrit (ADM-02)
export const postApercuVersionMoteur = avecRefus(async (req, res) => {
    res.json(await apercuVersion(req.body ?? {}, AUTEUR));
});

// ✅ Appliquer un brouillon
export const appliquerVersionMoteur = avecRefus(async (req, res) => {
    res.json(await appliquerVersion(req.params.id, { auteur: AUTEUR }));
});

// 🗑️ Abandonner un brouillon
export const abandonnerVersionMoteur = asyncHandler(async (req, res) => {
    res.json(await abandonnerVersion(req.params.id));
});

// ↩️ Annuler une version appliquée : crée sa version inverse
export const annulerVersionMoteur = asyncHandler(async (req, res) => {
    res.status(201).json(await annulerVersion(req.params.id, { id_auteur: req.user.id_user, auteur: AUTEUR }));
});
