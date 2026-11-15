import { asyncHandler } from "../middleware/asyncHandler.js";
import { decrireGabarits } from "../services/moteur/contraintes/gabarits.js";
import { listeDuProfil } from "../services/moteur/contraintes/profil.js";
import { listerContraintes, verifierContraintes } from "../services/moteur/contraintes/verification.js";
import { leCatalogue, valeursEnVigueur } from "../services/moteur/valeurs/lecture.js";
import { corpsErreur } from "../utils/erreurs.js";

/**
 * Contraintes déclarées par l'école (MOT-13a). Réservé à l'administration, comme les réglages de
 * MP-1 : l'école déclare ses contraintes à partir de six modèles, au lieu de régler les 498
 * paramètres. Leur enregistrement passe par les versions (POST /api/moteur/versions).
 */

const PORTEES_DU_PROFIL = ["filiere", "groupe"];
const DATE = /^\d{4}-\d{2}-\d{2}$/;

// 🔍 Les six modèles : champs, cibles, natures, insistances (codes stables, traduits par le site)
export const getGabarits = asyncHandler(async (req, res) => {
    res.json(decrireGabarits());
});

// 🔍 Les contraintes en vigueur à une date, avec leur phrase
export const getContraintes = asyncHandler(async (req, res) => {
    res.json(await listerContraintes(req.query.date));
});

// 🔍 « Déjà pris en compte » : les règles du profil que le calcul tient, et leur état
export const getProfilContraintes = asyncHandler(async (req, res) => {
    const { date } = req.query;
    if (date !== undefined && !DATE.test(date)) return res.status(400).json(corpsErreur(400, "La date s'écrit AAAA-MM-JJ", { code: "DATE_INVALIDE" }));
    const cible = Object.fromEntries(PORTEES_DU_PROFIL.filter((p) => req.query[p] !== undefined).map((p) => [p, req.query[p]]));
    const r = await valeursEnVigueur({ date, cible });
    const { parametres, dependances } = leCatalogue();
    res.json({ date: r.date, profil: r.profil, regles: listeDuProfil({ parametres, dependances, resultats: r.resultats, valeurs: r.valeurs }) });
});

// 🧪 Vérification à blanc : rien n'est enregistré
export const postVerifierContraintes = asyncHandler(async (req, res) => {
    const { contraintes, id_periode, date } = req.body ?? {};
    res.json(await verifierContraintes({ contraintes, id_periode, date }));
});
