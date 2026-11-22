import express from "express";
import { abandonnerVersionMoteur, annulerVersionMoteur, appliquerVersionMoteur, getReglagesMoteur, getValeursMoteur, getVersionMoteur, getVersionsMoteur, postVersionMoteur } from "../controllers/index.js";
import { authenticateToken, requireAdmin, asyncHandler } from "../middleware/index.js";

const router = express.Router();

// Réglages du moteur de planification : réservés à l'administration
router.use(authenticateToken, requireAdmin);

router.get("/valeurs", asyncHandler(getValeursMoteur));
router.get("/reglages", asyncHandler(getReglagesMoteur));
router.get("/versions", asyncHandler(getVersionsMoteur));
router.get("/versions/:id", asyncHandler(getVersionMoteur));
router.post("/versions", asyncHandler(postVersionMoteur));
router.post("/versions/:id/appliquer", asyncHandler(appliquerVersionMoteur));
router.post("/versions/:id/abandonner", asyncHandler(abandonnerVersionMoteur));
router.post("/versions/:id/annuler", asyncHandler(annulerVersionMoteur));

export default router;
