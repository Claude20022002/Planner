import express from "express";
import { authenticateToken } from "../middleware/authMiddleware.js";
import { planification } from "../utils/erreursPlanning.js";
import {
    compterSansCompte,
    creerPersonne,
    creerResponsable,
    delierEleve,
    dossier,
    enfantsDuResponsable,
    inscrireFamille,
    lierEleve,
    modifierPersonne,
    personnes,
    responsables,
    supprimerPersonne,
} from "../services/vie-scolaire/dossiers.js";
import { anneesScolaires, changerEtatInscription, creerInscription, inscriptions, reinscrire } from "../services/vie-scolaire/inscriptions.js";

/**
 * Dossiers élèves et familles (VSC-02) :
 *  - GET    /api/vie-scolaire/personnes                    recherche par nom, prénom, code Massar
 *  - POST   /api/vie-scolaire/personnes                    { nom, prenom, … } — sans compte
 *  - GET    /api/vie-scolaire/personnes/:id                le dossier : liens et inscriptions
 *  - PUT    /api/vie-scolaire/personnes/:id                modification de l'état civil
 *  - DELETE /api/vie-scolaire/personnes/:id                refusé dès qu'une inscription existe
 *  - POST   /api/vie-scolaire/personnes/:id/responsables   { id_responsable, lien, titulaire }
 *  - DELETE /api/vie-scolaire/personnes/:id/responsables/:idResponsable
 *  - POST   /api/vie-scolaire/personnes/:id/inscriptions   { id_annee, niveau, date_entree }
 *  - GET    /api/vie-scolaire/responsables                 responsables et nombre d'enfants
 *  - POST   /api/vie-scolaire/responsables                 { personne, profession }
 *  - GET    /api/vie-scolaire/responsables/:id/enfants     les enfants et leurs inscriptions
 *  - POST   /api/vie-scolaire/familles                     une fratrie en une transaction
 *  - GET    /api/vie-scolaire/inscriptions                 ?id_annee=&etat=&niveau=&recherche=
 *  - PUT    /api/vie-scolaire/inscriptions/:id/etat        { etat, date_sortie }
 *  - POST   /api/vie-scolaire/inscriptions/:id/reinscription  { id_annee, niveau }
 *  - GET    /api/vie-scolaire/annees                       années scolaires connues
 *  - GET    /api/vie-scolaire/comptes                      personnes avec et sans compte (reprise 0065)
 */
const router = express.Router();

router.use(authenticateToken);

const identifiant = (valeur) => {
    const id = Number(valeur);
    return Number.isInteger(id) && id > 0 ? id : -1;
};

router.get("/personnes", planification(async (req, res) => {
    res.json(await personnes(req.user, { recherche: req.query.recherche, limite: req.query.limite }));
}));

router.post("/personnes", planification(async (req, res) => {
    res.status(201).json(await creerPersonne(req.user, req.body ?? {}));
}));

router.get("/personnes/:id", planification(async (req, res) => {
    res.json(await dossier(req.user, identifiant(req.params.id)));
}));

router.put("/personnes/:id", planification(async (req, res) => {
    res.json(await modifierPersonne(req.user, identifiant(req.params.id), req.body ?? {}));
}));

router.delete("/personnes/:id", planification(async (req, res) => {
    await supprimerPersonne(req.user, identifiant(req.params.id));
    res.status(204).end();
}));

router.post("/personnes/:id/responsables", planification(async (req, res) => {
    const { id_responsable, lien, titulaire } = req.body ?? {};
    res.status(201).json(await lierEleve(req.user, identifiant(req.params.id), { id_responsable: identifiant(id_responsable), lien, titulaire }));
}));

router.delete("/personnes/:id/responsables/:idResponsable", planification(async (req, res) => {
    await delierEleve(req.user, identifiant(req.params.id), identifiant(req.params.idResponsable));
    res.status(204).end();
}));

router.post("/personnes/:id/inscriptions", planification(async (req, res) => {
    const { id_annee, niveau, date_entree } = req.body ?? {};
    res.status(201).json(await creerInscription(req.user, identifiant(req.params.id), { id_annee, niveau, date_entree }));
}));

router.get("/responsables", planification(async (req, res) => {
    res.json(await responsables(req.user, { recherche: req.query.recherche, limite: req.query.limite }));
}));

router.post("/responsables", planification(async (req, res) => {
    res.status(201).json(await creerResponsable(req.user, { personne: req.body?.personne ?? req.body, profession: req.body?.profession }));
}));

router.get("/responsables/:id/enfants", planification(async (req, res) => {
    res.json(await enfantsDuResponsable(req.user, identifiant(req.params.id)));
}));

router.post("/familles", planification(async (req, res) => {
    const { responsable, enfants, id_annee } = req.body ?? {};
    res.status(201).json(await inscrireFamille(req.user, { responsable, enfants, id_annee }));
}));

router.get("/inscriptions", planification(async (req, res) => {
    const { id_annee, etat, niveau, recherche, limite } = req.query;
    res.json(await inscriptions(req.user, { id_annee, etat, niveau, recherche, limite }));
}));

router.put("/inscriptions/:id/etat", planification(async (req, res) => {
    res.json(await changerEtatInscription(req.user, identifiant(req.params.id), { etat: req.body?.etat, date_sortie: req.body?.date_sortie }));
}));

router.post("/inscriptions/:id/reinscription", planification(async (req, res) => {
    res.status(201).json(await reinscrire(req.user, identifiant(req.params.id), { id_annee: req.body?.id_annee, niveau: req.body?.niveau }));
}));

router.get("/annees", planification(async (req, res) => {
    res.json(await anneesScolaires(req.user));
}));

router.get("/comptes", planification(async (req, res) => {
    res.json(await compterSansCompte(req.user));
}));

export default router;
