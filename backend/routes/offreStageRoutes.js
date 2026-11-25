import express from "express";
import { authenticateToken } from "../middleware/authMiddleware.js";
import { createRateLimiter } from "../middleware/rateLimiterMiddleware.js";
import { planification } from "../utils/erreursPlanning.js";
import {
    changerStatutOffre,
    creerOffre,
    detailOffre,
    modifierOffre,
    offrePublique,
    offresVisibles,
    supprimerOffre,
} from "../services/stages/offres.js";

/**
 * Offres de stage (STA-01, espace Carrière) :
 *  - GET    /api/offres-stage                    les offres (étudiant : publiées ; personnel : toutes)
 *  - GET    /api/offres-stage/:id                une offre (brouillon ou offre close : 404 pour un étudiant)
 *  - POST   /api/offres-stage                    { titre, entreprise, ville, description, … } en brouillon
 *  - PUT    /api/offres-stage/:id                modification (auteur ou administration ; autre auteur : 404)
 *  - POST   /api/offres-stage/:id/publication    { statut: "publiee" | "close" }
 *  - DELETE /api/offres-stage/:id                suppression (refusée tant que l'offre est publiée)
 */
const router = express.Router();

router.use(authenticateToken);

const idOffre = (req) => {
    const id = Number(req.params.id);
    return Number.isInteger(id) && id > 0 ? id : -1;
};

router.get("/", planification(async (req, res) => {
    res.json({ data: await offresVisibles(req.user, req.query) });
}));

router.post("/", planification(async (req, res) => {
    res.status(201).json(await creerOffre(req.user, req.body ?? {}));
}));

router.get("/:id", planification(async (req, res) => {
    res.json(await detailOffre(req.user, idOffre(req)));
}));

router.put("/:id", planification(async (req, res) => {
    res.json(await modifierOffre(req.user, idOffre(req), req.body ?? {}));
}));

router.post("/:id/publication", planification(async (req, res) => {
    res.json(await changerStatutOffre(req.user, idOffre(req), req.body?.statut));
}));

router.delete("/:id", planification(async (req, res) => {
    await supprimerOffre(req.user, idOffre(req));
    res.status(204).end();
}));

export default router;

/**
 * Fiche partagée d'une offre publiée : sans compte, donc montée avant CSRF et avant les gardes de
 * session (app.js). Un lien de partage ne doit ni s'indexer, ni se balayer indéfiniment : 60
 * lectures par quart d'heure et par adresse, réponse non mise en cache, en-tête noindex.
 */
export const offreStagePubliques = express.Router();

const limiteurPartage = createRateLimiter({
    nom: "offres-stage-partage",
    persistant: true,
    windowMs: 15 * 60 * 1000,
    max: 60,
    message: "Trop de consultations de cette offre, veuillez réessayer dans quelques minutes.",
});

offreStagePubliques.get(
    "/:jeton",
    limiteurPartage,
    (req, res, next) => {
        res.set("Cache-Control", "no-store");
        res.set("X-Robots-Tag", "noindex");
        next();
    },
    planification(async (req, res) => {
        res.json(await offrePublique(req.params.jeton));
    })
);
